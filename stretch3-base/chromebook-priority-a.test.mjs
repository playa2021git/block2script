import {chromium} from './qa/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';

// Exercise the shipped iframe, native VM, browser media API and renderer together.
// Canvas camera only: physical Chromebook and ML inference remain manual checks.
const browser=await chromium.launch({
 executablePath:process.env.BLOCK2SCRIPT_BROWSER||(process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined),
 headless:true
});
const url=process.env.BLOCK2SCRIPT_TEST_URL||'http://127.0.0.1:5173/';
const checks=[];
async function ready(page){
 await page.goto(url);
 await page.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow?.scratchNative?.vm?.editingTarget,null,{timeout:120000});
 await page.waitForFunction(()=>document.querySelector('#target').textContent.includes('スプライト'));
}
try{
 for(const id of ['videoSensing','ml2scratch','tm2scratch']){
  console.log('Checking camera:',id);
  const context=await browser.newContext();
  await context.addInitScript(()=>{
   if(!navigator.mediaDevices)return;
   window.testVideos=[];
   const create=document.createElement.bind(document);
   document.createElement=(name,...args)=>{
    const element=create(name,...args);
    if(name==='video')window.testVideos.push(element);
    return element;
   };
   navigator.mediaDevices.getUserMedia=async()=>{
    const canvas=document.createElement('canvas');canvas.width=640;canvas.height=480;
    const draw=()=>{const ctx=canvas.getContext('2d');ctx.fillStyle='#24b7ab';ctx.fillRect(0,0,640,480);};
    draw();setInterval(draw,65);
    return canvas.captureStream(15);
   };
  });
  const page=await context.newPage();
  await ready(page);
  await page.evaluate(async id=>{
   const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;
   await vm.extensionManager.loadExtensionURL(id);
   vm.runtime._primitives[id+'_videoToggle']({VIDEO_STATE:'on'});
  },id);
  await page.waitForFunction(()=>{
   const video=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime.ioDevices.video;
   return video.videoReady&&video.provider.video.srcObject?.active&&video._skinId!==-1&&video._drawable!==-1&&video.getFrame({})?.data.some(value=>value!==0);
  },null,{timeout:30000});
  const state=await page.evaluate(id=>{
   const runtime=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime;
   const video=runtime.ioDevices.video;
   const extension=runtime._primitives[id+'_videoToggle'];
   return {stream:video.provider.video.srcObject.active,preview:Boolean(video._renderPreviewFrame),primitive:typeof extension};
  },id);
  assert.deepEqual(state,{stream:true,preview:true,primitive:'function'});
  if(id==='tm2scratch'){
   await page.waitForFunction(()=>document.querySelector('#scratch-frame').contentWindow.testVideos.filter(video=>video.srcObject?.active&&video.videoWidth>0).length>=2,null,{timeout:30000});
   checks.push('tm2scratch: independent classification video also receives frames');
  }
  // Off/on must work without ever pressing Block2Script's start-camera button.
  await page.evaluate(id=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime._primitives[id+'_videoToggle']({VIDEO_STATE:'off'}),id);
  await page.waitForFunction(()=>!document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime.ioDevices.video.provider.enabled);
  await page.evaluate(id=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime._primitives[id+'_videoToggle']({VIDEO_STATE:'on'}),id);
  await page.waitForFunction(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime.ioDevices.video.videoReady,null,{timeout:30000});
  checks.push(id+': native camera on/off/on, nonempty frame, renderer preview without custom start');
  await context.close();
 }
 const context=await browser.newContext();
 const page=await context.newPage();
 const requests=[];
 await page.route('https://scratch-translate-proxy.junya-119.workers.dev/**',route=>{
  requests.push(route.request().url());
  return route.fulfill({contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify({result:'こんにちは'})});
 });
 await ready(page);
 const translate=()=>page.evaluate(async()=>{
  const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;
  await vm.extensionManager.loadExtensionURL('translate');
  return vm.runtime._primitives.translate_getTranslate({WORDS:'hello & good morning',LANGUAGE:'ja'});
 });
 assert.equal(await translate(),'こんにちは');
 assert.equal(await translate(),'こんにちは');
 assert.equal(requests.length,1,'Repeat translations must still use upstream cache');
 const request=new URL(requests[0]);
 assert.equal(request.pathname,'/translate');
 assert.equal(request.searchParams.get('text'),'hello & good morning');
 assert.equal(request.searchParams.get('language'),'ja');
 checks.push('translate: official proxy URL, encoded inputs, reporter result and upstream cache');
 await context.close();
 await writeFile('stretch3-base/qa/chromebook-priority-a-result.json',JSON.stringify({pass:true,url,checks,physicalChromebook:'UNTESTED',MLInference:'UNTESTED',liveTranslation:'UNTESTED'},null,2));
 console.log('Priority A browser regression checks passed:',checks);
}finally{await browser.close();}
