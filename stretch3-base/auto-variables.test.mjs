import {chromium} from './qa/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const source=await readFile('tests/fixtures/sierpinski-gem.b2s','utf8');
const names=['辺の長さ','x','y','色','xリスト','yリスト','長さリスト'];
const url=process.env.BLOCK2SCRIPT_TEST_URL||'http://127.0.0.1:5173/';
const browser=await chromium.launch({executablePath:process.env.BLOCK2SCRIPT_BROWSER||(process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined),headless:true,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1600,height:1050},acceptDownloads:true});
const page=await context.newPage(),errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));
async function ready(p){await p.goto(url);await p.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow?.scratchNative?.vm?.editingTarget,null,{timeout:120000});await p.waitForFunction(()=>document.querySelector('#target').textContent.includes('スプライト'));}
async function state(p){return p.evaluate(()=>{const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;return JSON.stringify(vm.runtime.targets.filter(t=>t.isOriginal).map(t=>({id:t.id,blocks:t.blocks._blocks,scripts:t.blocks._scripts,variables:t.variables})));});}
async function type(p,code){await p.locator('.cm-content').click();await p.keyboard.press('Control+a');await p.keyboard.insertText(code);}
async function apply(p){await p.locator('#validate').click();assert.equal(await p.locator('#apply').isEnabled(),true,await p.locator('#status').textContent());await p.locator('#apply').click();await p.waitForFunction(()=>document.querySelector('#status').textContent.includes('反映しました'));}
async function refs(p){return p.evaluate(()=>{const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm,t=vm.editingTarget,s=vm.runtime.getTargetForStage();return{local:Object.values(t.variables).map(v=>({id:v.id,name:v.name,type:v.type,value:v.value})).sort((a,b)=>a.id.localeCompare(b.id)),stage:Object.values(s.variables).map(v=>({id:v.id,name:v.name,type:v.type,value:v.value})).sort((a,b)=>a.id.localeCompare(b.id)),fields:Object.values(t.blocks._blocks).flatMap(b=>Object.entries(b.fields).filter(([k])=>['VARIABLE','LIST'].includes(k)).map(([k,v])=>({key:k,...v}))),blocks:t.blocks._blocks};});}
try{
 await ready(page);console.log('READY');
 await page.evaluate(async()=>{const n=document.querySelector('#scratch-frame').contentWindow.scratchNative;n.state.store.dispatch({type:'scratch-gui/locales/SELECT_LOCALE',locale:'ja'});await n.vm.extensionManager.loadExtensionURL('pen');});
 await page.waitForFunction(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.getController().ScratchBlocks.Blocks.pen_clear);
 assert.equal((await refs(page)).local.filter(v=>names.includes(v.name)).length,0);
 const before=await state(page);await type(page,source);assert.equal(await state(page),before,'Pasting changed project');await page.locator('#validate').click();assert.equal(await state(page),before,'Validation changed project');assert.equal(await page.locator('#apply').isEnabled(),true,await page.locator('#status').textContent());
 const preview=await page.locator('#preview').innerText();assert.match(preview,/新しく作る変数：4個/);assert.match(preview,/新しく作るリスト：3個/);for(const name of names)assert.ok(preview.includes(name));
 await page.screenshot({path:'stretch3-base/qa/auto-variables-preview.png'});checks.push('provided fixture: paste and validation do not mutate VM; preview 4 variables + 3 lists');
 await page.locator('#apply').click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('反映しました'));
 const created=await refs(page);assert.equal(created.local.filter(v=>names.includes(v.name)).length,7);assert.equal(created.stage.filter(v=>names.includes(v.name)).length,0);
 for(const field of created.fields){const v=created.local.find(v=>v.id===field.id);assert.ok(v,'Missing field reference ID');assert.equal(v.name,field.value);assert.equal(v.type,field.key==='LIST'?'list':'');}
 await page.locator('#verify').click();assert.match(await page.locator('#status').textContent(),/差はありません/);checks.push('explicit apply creates seven sprite-local assets with correct IDs; exact graph roundtrip');console.log('CREATED + ROUNDTRIP');
 // Undo before execution removes only the assets created by the apply.
 await page.locator('#undo').click();assert.equal(await state(page),before,'Undo did not return to initial project');checks.push('Undo restores initial project, including removing seven unused creations');
 await type(page,source);await apply(page);
 const b2sEvent=page.waitForEvent('download');await page.locator('#save-code').click();const b2sDownload=await b2sEvent;await b2sDownload.saveAs('stretch3-base/qa/auto-variables.b2s');const b2s=await readFile('stretch3-base/qa/auto-variables.b2s','utf8');assert.match(b2s,/references/);
 // Observe real primitives and the real pen renderer while executing the exact fixture.
 await page.evaluate(()=>{const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;window.penDownCount=0;window.penLineCount=0;const down=vm.runtime._primitives.pen_penDown,line=vm.renderer.penLine.bind(vm.renderer);vm.runtime._primitives.pen_penDown=(...args)=>{window.penDownCount++;return down(...args);};vm.renderer.penLine=(...args)=>{window.penLineCount++;return line(...args);};vm.greenFlag();});
 await page.waitForFunction(()=>{const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;const t=vm.editingTarget;return Object.values(t.variables).find(v=>v.name==='色')?.value===162&&vm.runtime.threads.length===0;},null,{timeout:120000});
 const drawing=await page.evaluate(()=>({triangles:window.penDownCount,lines:window.penLineCount}));assert.equal(drawing.triangles,81);assert.equal(drawing.lines,243);
 const drawn=await refs(page);assert.ok(drawn.local.filter(v=>v.type==='list').every(v=>v.value.length===0));await page.screenshot({path:'stretch3-base/qa/auto-variables-drawing.png'});checks.push('exact provided drawing code executes: 81 pen-down triangles, 243 rendered lines, hue counter 162, empty stacks');console.log('DRAWN',drawing);
 // Wait for the applied project to reach the actual IndexedDB autosave store.
 await page.evaluate(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime.emitProjectChanged());await page.waitForTimeout(1800);
 const savedId=await page.evaluate(async()=>{const db=await new Promise((resolve,reject)=>{const q=indexedDB.open('block2script-recovery',1);q.onsuccess=()=>resolve(q.result);q.onerror=()=>reject(q.error);});const records=await new Promise(resolve=>{const q=db.transaction('snapshots').objectStore('snapshots').getAll();q.onsuccess=()=>resolve(q.result);});db.close();return records.filter(r=>r.reason==='自動保存'||r.reason==='定期保存').sort((a,b)=>b.id-a.id)[0]?.id;});assert.ok(savedId);

 // Native sb3 bytes, also consumed by an independent fresh page.
 const bytes=await page.evaluate(async()=>Array.from(new Uint8Array(await (await document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.saveProjectSb3()).arrayBuffer())));
 await writeFile('stretch3-base/qa/auto-variables.sb3',Buffer.from(bytes));
 const restored=await context.newPage();await ready(restored);await restored.evaluate(async bytes=>{const w=document.querySelector('#scratch-frame').contentWindow;await w.scratchNative.vm.loadProject(new w.Uint8Array(bytes));},bytes);await restored.waitForFunction(()=>document.querySelector('.cm-content').textContent.includes('長さリスト'));
 const loaded=await refs(restored);assert.deepEqual(loaded.local,drawn.local);assert.equal(Object.keys(loaded.blocks).length,Object.keys(drawn.blocks).length);await restored.locator('#verify').click();assert.match(await restored.locator('#status').textContent(),/差はありません/);checks.push('sb3 fresh-page reload keeps local asset IDs, values and graph roundtrip');
 // Saved b2s in a fresh project can create the assets again without hand setup.
 const fresh=await context.newPage();await ready(fresh);await fresh.evaluate(async()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.extensionManager.loadExtensionURL('pen'));await fresh.waitForFunction(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.getController().ScratchBlocks.Blocks.pen_clear);await type(fresh,b2s);await apply(fresh);assert.equal((await refs(fresh)).local.filter(v=>names.includes(v.name)).length,7);checks.push('saved b2s with explicit references reapplies to a fresh project without hand-created variables');
 // Restore the exact autosaved post-drawing generation captured above.
 const savedAssets=await refs(page);
 await type(page,'scratch.script({},()=>{scratch.event_whenflagclicked({});scratch.looks_say({MESSAGE:"復旧テスト"});});');await apply(page);
 await page.locator('#recover').click();await page.locator(`.recovery-row[data-snapshot-id="${savedId}"] button`).click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('作品と未反映コードを復旧しました'));
 const recovered=await refs(page);assert.deepEqual(recovered.local,savedAssets.local);assert.equal(Object.keys(recovered.blocks).length,Object.keys(savedAssets.blocks).length);checks.push('IndexedDB autosave + UI recovery restores created assets, values and original drawing blocks');console.log('SAVED + RECOVERED');
 // Existing safety remains active and unsuccessful validation never creates assets.
 const protectedState=await state(page);
 for(const invalid of ['scratch.script({},()=>{scratch.not_registered({});});','scratch.script({},()=>{scratch.event_whenkeypressed({KEY_OPTION:"not-a-key"});});','scratch.script({},()=>{scratch.data_setvariableto({VARIABLE:"",VALUE:0});});']){await type(page,invalid);await page.locator('#validate').click();assert.equal(await page.locator('#apply').isDisabled(),true);assert.equal(await state(page),protectedState);}
 checks.push('unknown opcode, invalid menu and blank variable still rejected without mutation');
 assert.deepEqual(errors,[]);
 await writeFile('stretch3-base/qa/auto-variables-result.json',JSON.stringify({pass:true,url,fixtureSHA256:createHash('sha256').update(source).digest('hex'),checks,drawing,errors},null,2));console.log('PASS',checks.length,'checks');
}finally{await browser.close();}
