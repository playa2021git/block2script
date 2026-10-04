import {chromium} from './qa/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:process.env.BLOCK2SCRIPT_BROWSER||(process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined),headless:true});
const page=await browser.newPage(),errors=[],remoteML=[];
page.on('request',r=>{if(r.url().includes('stretch3.github.io/ml5-library'))remoteML.push(r.url());});
page.on('pageerror',e=>errors.push(e.message));
const url=process.env.BLOCK2SCRIPT_TEST_URL||'http://127.0.0.1:5173/';
const source=`scratch.script({x:40,y:40}, () => {
 scratch.event_whenflagclicked({});
 scratch.tm2scratch_setImageClassificationModelURL({URL:"https://teachablemachine.withgoogle.com/models/0rX_3hoH/"});
 scratch.tm2scratch_setSoundClassificationModelURL({URL:"https://teachablemachine.withgoogle.com/models/xP0spGSB/"});
 scratch.looks_say({MESSAGE:scratch.tm2scratch_getImageLabel({})});
});`;
try{
 await page.goto(url);await page.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow?.scratchNative?.vm?.editingTarget,{timeout:120000});
 await page.waitForFunction(()=>document.querySelector('#target').textContent.includes('スプライト'));
 await page.evaluate(()=>{const w=document.querySelector('#scratch-frame').contentWindow;w.cameraRequests=0;w.navigator.mediaDevices.getUserMedia=()=>{w.cameraRequests++;return Promise.reject(new Error('Camera mocked'));};});
 await page.locator('#stretch').click();await page.locator('#stretch-choices button').filter({hasText:'TM2Scratch'}).click();
 await page.waitForFunction(()=>document.querySelector('#stretch-status').textContent.includes('追加しました'));
 assert.equal(await page.evaluate(()=>document.querySelector('#scratch-frame').contentWindow.cameraRequests),0,'Camera requested while adding extension');
 await page.locator('#close-stretch').click();
 await page.locator('.cm-content').click();await page.keyboard.press('Control+a');await page.keyboard.insertText(source);
 await page.locator('#validate').click();assert.equal(await page.locator('#apply').isEnabled(),true,await page.locator('#status').textContent());
 await page.locator('#apply').click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('反映しました'));
 await page.locator('#verify').click();assert.match(await page.locator('#status').textContent(),/差はありません/);
 const downloadPending=page.waitForEvent('download');await page.locator('#save').click();const download=await downloadPending;await download.saveAs('stretch3-base/qa/tm2-project.sb3');
 const fresh=await browser.newPage();fresh.on('pageerror',e=>errors.push(e.message));await fresh.goto(url);await fresh.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow?.scratchNative?.vm?.editingTarget,{timeout:120000});
 await fresh.locator('#file').setInputFiles('stretch3-base/qa/tm2-project.sb3');await fresh.waitForFunction(()=>document.querySelector('#status').textContent==='Scratchプロジェクトを読み込みました',{timeout:90000});
 const result=await fresh.evaluate(()=>{const n=document.querySelector('#scratch-frame').contentWindow.scratchNative;return {loaded:n.vm.extensionManager.isExtensionLoaded('tm2scratch'),blocks:n.vm.editingTarget.blocks._blocks};});
 assert.equal(result.loaded,true);const texts=JSON.stringify(result.blocks);assert.ok(texts.includes('0rX_3hoH/'));assert.ok(texts.includes('xP0spGSB/'));
 await fresh.locator('#verify').click();assert.match(await fresh.locator('#status').textContent(),/差はありません/);
 await fresh.screenshot({path:'stretch3-base/qa/tm2.png'});assert.deepEqual(errors,[]);assert.deepEqual(remoteML,[]);
 await writeFile('stretch3-base/qa/tm2-result.json',JSON.stringify({pass:true,checks:['extension UI loading','camera deferred','image and sound model URL blocks','Script roundtrip','sb3 fresh-page automatic loading and URL preservation'],recognition:'UNTESTED',errors},null,2));
 console.log('TM2Scratch integration checks passed. Camera/audio recognition remains untested.');
}finally{await browser.close();}
