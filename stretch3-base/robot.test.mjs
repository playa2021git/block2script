import {saveNative,loadNative,mockCamera} from '../tests/browser-native-ui.mjs';
import {chromium} from './qa/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:process.env.BLOCK2SCRIPT_BROWSER||(process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined),headless:true});
const context=await browser.newContext({viewport:{width:1500,height:1000}});await mockCamera(context);const page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));
const url=process.env.BLOCK2SCRIPT_TEST_URL||'http://127.0.0.1:5173/';
async function ready(p){await p.goto(url);await p.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow?.scratchNative?.vm?.editingTarget,{timeout:120000});}
async function sprite(p){return p.evaluate(()=>{const t=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime.targets.find(t=>t.isOriginal&&!t.isStage);return {name:t.getName(),size:t.size,costumes:t.getCostumes().map(c=>({name:c.name,assetId:c.assetId,dataFormat:c.dataFormat,bytes:c.asset.data.length})),current:t.currentCostume};});}
try{
 await ready(page);const bot=await sprite(page);assert.equal(bot.name,'Block2Bot');assert.equal(bot.costumes.length,2);assert.ok(bot.costumes.every(c=>c.dataFormat==='png'&&c.bytes>100000));assert.notEqual(bot.costumes[0].assetId,bot.costumes[1].assetId);
 await page.evaluate(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.editingTarget.setCostume(1));assert.equal((await sprite(page)).current,1);
 const pending=page.waitForEvent('download');await saveNative(page);await (await pending).saveAs('stretch3-base/qa/robot.sb3');const saved=await sprite(page);
 const fresh=await context.newPage();fresh.on('pageerror',e=>errors.push(e.message));await ready(fresh);await loadNative(fresh,'stretch3-base/qa/robot.sb3');assert.deepEqual(await sprite(fresh),saved);
 await loadNative(fresh,'tests/fixtures/stretch-three.sb3');assert.notEqual((await sprite(fresh)).name,'Block2Bot','Existing project replaced by robot');
 await page.screenshot({path:'stretch3-base/qa/robot.png'});assert.deepEqual(errors,[]);await writeFile('stretch3-base/qa/robot-result.json',JSON.stringify({pass:true,checks:['robot initial sprite','two bitmap assets','costume switch','sb3 fresh page preservation','existing project not replaced'],errors},null,2));console.log('Block2Bot default project checks passed.');
}finally{await browser.close();}
