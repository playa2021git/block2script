import {saveNative,loadNative,addNative} from '../tests/browser-native-ui.mjs';
import {chromium} from './qa/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:process.env.BLOCK2SCRIPT_BROWSER||(process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined),headless:true});
const context=await browser.newContext({viewport:{width:1500,height:1000}});
await context.addInitScript(()=>{
 window.testDevices={mediaRequests:[],speechStarts:0,streams:[]};
 class Recognition {
  start(){window.testDevices.speechStarts++;setTimeout(()=>{this.onresult?.({results:[[{transcript:'音声認識のテスト'}]]});this.onend?.();},30);}
  abort(){this.onend?.();}
 }
 window.SpeechRecognition=Recognition;window.webkitSpeechRecognition=Recognition;
 if (!navigator.mediaDevices) return; // Empty about:blank frames have no media API.
 const devices=[{kind:'videoinput',label:'授業カメラ A',deviceId:'aaaa11112222'},{kind:'videoinput',label:'授業カメラ B',deviceId:'bbbb22223333'}];
 navigator.mediaDevices.enumerateDevices=async()=>devices.map(d=>({...d,getCapabilities:()=>({facingMode:['user']})}));
 const query=navigator.permissions.query.bind(navigator.permissions);
 navigator.permissions.query=descriptor=>descriptor.name==='camera'?Promise.reject(new Error('Permission query not supported in test')):query(descriptor);
 navigator.mediaDevices.getUserMedia=async constraints=>{
  window.testDevices.mediaRequests.push(constraints);
  const canvas=document.createElement('canvas');canvas.width=640;canvas.height=480;
  const draw=()=>{const ctx=canvas.getContext('2d');ctx.fillStyle='#24b7ab';ctx.fillRect(0,0,640,480);};draw();
  const stream=canvas.captureStream(15);const id=constraints.video?.deviceId||'aaaa11112222';
  stream.getVideoTracks()[0].getCapabilities=()=>({deviceId:id});
  window.testDevices.streams.push({canvas,stream,timer:setInterval(draw,65)});
  return stream;
 };
});
const page=await context.newPage(),errors=[],remoteML=[];
context.on('page',p=>{p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(r.url().includes('stretch3.github.io/ml5-library'))remoteML.push(r.url());});});
page.on('pageerror',e=>errors.push(e.message));
const url=process.env.BLOCK2SCRIPT_TEST_URL||'http://127.0.0.1:5173/';
async function ready(p){await p.goto(url);await p.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow?.scratchNative?.vm?.editingTarget,{timeout:120000});await p.waitForFunction(()=>document.querySelector('#target').textContent.includes('スプライト'));}
async function add(p,name){await addNative(p,name);await p.waitForFunction(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.extensionManager.isExtensionLoaded('speech2scratch'));}
try{
 await ready(page);await add(page,'Speech2Scratch');await add(page,'Camera Selector');
 await page.waitForTimeout(500);
 const label=await page.evaluate(()=>document.querySelector('#scratch-frame').contentWindow.cameraselector.getVideoDevicesMenu().find(item=>item.text.includes('授業カメラ B')).value);
 assert.equal(await page.evaluate(()=>document.querySelector('#scratch-frame').contentWindow.testDevices.mediaRequests.length),0,'Extension addition requested camera');
 assert.equal(await page.evaluate(()=>document.querySelector('#scratch-frame').contentWindow.testDevices.speechStarts),0,'Extension addition started speech recognition');
 const source=`scratch.script({x:40,y:40}, () => {
 scratch.event_whenflagclicked({});
 scratch.speech2scratch_startRecognition({});
 scratch.looks_say({MESSAGE:scratch.speech2scratch_getSpeech({})});
 scratch.cameraselector_selectCamera({LIST:${JSON.stringify(label)}});
});`;
 await page.locator('.cm-content').click();await page.keyboard.press('Control+a');await page.keyboard.insertText(source);await page.locator('#validate').click();
 assert.equal(await page.locator('#apply').isEnabled(),true,await page.locator('#status').textContent());
 await page.locator('#apply').click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('反映しました'));
 await page.locator('#verify').click();assert.match(await page.locator('#status').textContent(),/差はありません/);
 await page.evaluate(()=>{const runtime=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime;runtime._primitives.speech2scratch_startRecognition({});runtime._primitives.speech2scratch_startRecognition({});});
 await page.waitForTimeout(100);
 const speech=await page.evaluate(()=>{const w=document.querySelector('#scratch-frame').contentWindow;return {starts:w.testDevices.speechStarts,text:w.scratchNative.vm.runtime._primitives.speech2scratch_getSpeech({})};});
 assert.equal(speech.starts,1);assert.equal(speech.text,'音声認識のテスト');
 await page.evaluate(label=>{const w=document.querySelector('#scratch-frame').contentWindow;w.testCameraSelection=w.scratchNative.vm.runtime._primitives.cameraselector_selectCamera({LIST:label});},label);
 await page.waitForTimeout(250);
 assert.ok(await page.evaluate(()=>document.querySelector('#scratch-frame').contentWindow.testDevices.mediaRequests.length)>0,'Camera selection should start the native camera');

 await page.waitForFunction(()=>{const w=document.querySelector('#scratch-frame').contentWindow;return w.scratchNative.vm.runtime.ioDevices.video.provider._track?.getCapabilities().deviceId==='bbbb22223333';},{timeout:20000});
 await page.evaluate(()=>document.querySelector('#scratch-frame').contentWindow.testCameraSelection);

 // Native enableVideo remains callable after camera selection and optional start.
 await page.evaluate(()=>Promise.race([document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime.ioDevices.video.enableVideo(),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Video gate did not open')),3000))]));
 const dlPromise=page.waitForEvent('download');await saveNative(page);const dl=await dlPromise;await dl.saveAs('stretch3-base/qa/speech-camera-project.sb3');
 const fresh=await context.newPage();await ready(fresh);await loadNative(fresh,'stretch3-base/qa/speech-camera-project.sb3');
 const restored=await fresh.evaluate(()=>{const w=document.querySelector('#scratch-frame').contentWindow;return {speech:w.scratchNative.vm.extensionManager.isExtensionLoaded('speech2scratch'),camera:w.scratchNative.vm.extensionManager.isExtensionLoaded('cameraselector'),blocks:w.scratchNative.vm.editingTarget.blocks._blocks,requests:w.testDevices.mediaRequests.length,starts:w.testDevices.speechStarts};});
 assert.ok(restored.speech&&restored.camera);assert.ok(JSON.stringify(restored.blocks).includes(label));assert.equal(restored.requests,0);assert.equal(restored.starts,0);
 await fresh.locator('#verify').click();assert.match(await fresh.locator('#status').textContent(),/差はありません/);
 await fresh.screenshot({path:'stretch3-base/qa/speech-camera.png'});
 // Browsers without speech recognition can still load/edit saved projects.
 const unsupported=await browser.newContext();await unsupported.addInitScript(()=>{window.SpeechRecognition=undefined;window.webkitSpeechRecognition=undefined;});
 const noSpeech=await unsupported.newPage();noSpeech.on('pageerror',e=>errors.push(e.message));await ready(noSpeech);await add(noSpeech,'Speech2Scratch');
 const unsupportedText=await noSpeech.evaluate(()=>{const r=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime;r._primitives.speech2scratch_startRecognition({});return r._primitives.speech2scratch_getSpeech({});});
 assert.match(unsupportedText,/対応していません/);await unsupported.close();
 assert.deepEqual(errors,[]);assert.deepEqual(remoteML,[]);
 await writeFile('stretch3-base/qa/speech-camera-result.json',JSON.stringify({pass:true,checks:['both extension dialogs','Script conversion and roundtrip','speech and Camera Selector do not request devices on add/reload','mock speech result and duplicate-start guard','camera selection starts native video without custom start','optional camera start remains callable','fresh-page sb3 native extension restoration and camera label preservation','unsupported speech API','unsupported camera permission query'],realMicrophoneRecognition:'UNTESTED',physicalCameraSwitch:'UNTESTED',errors},null,2));
 console.log('Speech2Scratch and Camera Selector browser integration checks passed; mocked devices only.');
}finally{await browser.close();}
