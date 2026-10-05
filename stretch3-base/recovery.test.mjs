import {loadNative,mockCamera} from '../tests/browser-native-ui.mjs';
import {chromium} from './qa/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {resolve} from 'node:path';
import {writeFile} from 'node:fs/promises';
const profile=resolve('stretch3-base/qa/recovery-profile');
const options={executablePath:process.env.BLOCK2SCRIPT_BROWSER||(process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined),headless:true,viewport:{width:1550,height:1000}};
const appURL=process.env.BLOCK2SCRIPT_TEST_URL||'http://127.0.0.1:5173/';
const moduleURL=new URL(new URL(appURL).pathname.includes('/block2script/')?'source/recovery.js':'native-scratch/recovery.js',appURL).href;
let context=await chromium.launchPersistentContext(profile,options);await mockCamera(context);let page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
// Scratch/Blockly normalizes numeric shadow values from numbers to strings.
// Keep the full project comparison, canonicalizing only numeric input descriptors.
function normalizeProject(project){
 const result=structuredClone(project);
 function input(value){if(!Array.isArray(value))return;if(value.length===2&&typeof value[0]==='number'&&value[0]>=4&&value[0]<=8&&['number','string'].includes(typeof value[1])){value[1]=String(value[1]);return;}value.forEach(input);}
 for(const target of result.targets)for(const block of Object.values(target.blocks))if(block.inputs)Object.values(block.inputs).forEach(input);
 return result;
}
async function ready(){await page.goto(appURL);await page.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow?.scratchNative?.vm?.editingTarget,{timeout:90000});await page.waitForFunction(()=>document.querySelector('#target').textContent.includes('スプライト'));}
async function records(){return page.evaluate(async()=>{const db=await new Promise((resolve,reject)=>{const req=indexedDB.open('block2script-recovery',1);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});try{return await new Promise((resolve,reject)=>{const req=db.transaction('snapshots','readonly').objectStore('snapshots').getAll();req.onsuccess=()=>resolve(req.result.map(s=>({id:s.id,reason:s.reason,entries:s.entries})));req.onerror=()=>reject(req.error);});}finally{db.close();}});}
try{
 await ready();
 await page.evaluate(()=>new Promise((resolve,reject)=>{const req=indexedDB.deleteDatabase('block2script-recovery');req.onsuccess=()=>resolve();req.onerror=()=>reject(req.error);req.onblocked=()=>reject(new Error('blocked'));}));
 await loadNative(page,'tests/fixtures/stretch-three.sb3');
 await page.locator('#demo').click();await page.locator('#apply').click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('反映しました'));
 const original=await page.evaluate(()=>JSON.parse(document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.toJSON()));
 const draft='let unfinished =';await page.locator('.cm-content').click();await page.keyboard.press('Control+a');await page.keyboard.insertText(draft);await page.waitForTimeout(2000);
 await page.waitForFunction(async draft=>{const db=await new Promise(resolve=>{const request=indexedDB.open('block2script-recovery',1);request.onsuccess=()=>resolve(request.result);});try{return await new Promise(resolve=>{const request=db.transaction('snapshots','readonly').objectStore('snapshots').getAll();request.onsuccess=()=>resolve(request.result.some(snapshot=>snapshot.entries.some(entry=>entry.source===draft)));});}finally{db.close();}},draft,{timeout:30000});
 const saved=(await records()).filter(s=>s.entries.some(e=>e.source===draft)).sort((a,b)=>b.id-a.id)[0];assert.ok(saved,'Unapplied draft was not autosaved');
 await context.close();context=await chromium.launchPersistentContext(profile,options);await mockCamera(context);page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await ready();
 await page.locator('#recover').click();const row=page.locator('[data-snapshot-id="'+saved.id+'"]');await row.locator('button').click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('作品と未反映コードを復旧しました'),{timeout:90000});
 assert.equal(await page.locator('.cm-content').innerText(),draft);assert.equal(await page.locator('#apply').isDisabled(),true);assert.equal(await page.locator('#mode').inputValue(),'student');
 const restored=await page.evaluate(()=>JSON.parse(document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.toJSON()));assert.deepEqual(normalizeProject(restored),normalizeProject(original),'Project changed on recovery');
 const loaded=await page.evaluate(ids=>{const n=document.querySelector('#scratch-frame').contentWindow.scratchNative;return ids.every(id=>n.vm.extensionManager.isExtensionLoaded(id));},original.extensions);assert.ok(original.extensions.length>=3);assert.equal(loaded,true);
 const retention=await page.evaluate(async url=>{const {RecoveryStore}=await import(url);const store=new RecoveryStore();const existing=(await store.list())[0];for(let i=0;i<12;i++)await store.save({...existing,id:undefined,createdAt:Date.now(),reason:'retention-test-'+i});const values=await store.list();return {count:values.length,newest:values[0].reason,oldest:values.at(-1).reason};},moduleURL);
 assert.deepEqual(retention,{count:10,newest:'retention-test-11',oldest:'retention-test-2'});

 const brokenId=await page.evaluate(async url=>{const {RecoveryStore}=await import(url);const store=new RecoveryStore();return (await store.save({formatVersion:1,createdAt:Date.now(),reason:'broken-test',sb3:new Blob(['broken ZIP']),entries:[]})).id;},moduleURL);
 await page.locator('#recover').click();await page.locator('[data-snapshot-id="'+brokenId+'"]').locator('button').click();
 await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('現在の作品を残しました'),{timeout:90000});
 assert.deepEqual(normalizeProject(await page.evaluate(()=>JSON.parse(document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.toJSON()))),normalizeProject(original),'Broken snapshot destroyed project');
 assert.equal(await page.locator('.cm-content').innerText(),draft,'Failed recovery lost draft');await page.locator('#close-recovery').click();
 const valid='scratch.script({}, () => { scratch.event_whenflagclicked({}); scratch.motion_movesteps({STEPS: 20}); });';
 await page.locator('.cm-content').click();await page.keyboard.press('Control+a');await page.keyboard.insertText(valid);await page.locator('#validate').click();
 await page.evaluate(()=>{window.originalIDBTransaction=IDBDatabase.prototype.transaction;IDBDatabase.prototype.transaction=function(name,mode,...args){if(name==='snapshots'&&mode==='readwrite')throw new DOMException('full','QuotaExceededError');return window.originalIDBTransaction.call(this,name,mode,...args);};});
 try{await page.locator('#apply').click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('ブラウザーに保存できません'));assert.deepEqual(normalizeProject(await page.evaluate(()=>JSON.parse(document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.toJSON()))),normalizeProject(original),'Failed backup allowed mutation');}
 finally{await page.evaluate(()=>{IDBDatabase.prototype.transaction=window.originalIDBTransaction;});}
 await page.screenshot({path:'stretch3-base/qa/recovery.png'});assert.deepEqual(errors,[]);
 await writeFile('stretch3-base/qa/recovery-result.json',JSON.stringify({pass:true,checks:['dated filenames separately verified','draft autosave','disk persistence after browser restart','full project JSON identical','three extensions restored','draft remains unapplied','ten generations retained','corrupt snapshot rolls back project and draft','failed checkpoint blocks mutation'],retention,errors},null,2));console.log('Recovery verified after browser restart: full project and draft preserved; 10 generations; errors 0.');
}finally{await context.close();}

