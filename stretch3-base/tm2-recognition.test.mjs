import {chromium} from './qa/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {resolve} from 'node:path';
import {mkdtemp,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {execFileSync} from 'node:child_process';
// Serve unchanged remote model bytes locally to keep Chromium proxy settings independent.
const modelURL=process.env.TM2_MODEL_URL||'https://teachablemachine.withgoogle.com/models/_nHoqUy_a/';
const modelDir=process.env.TM2_MODEL_DIR||await mkdtemp(resolve(tmpdir(),'b2s-tm2-'));
if(!process.env.TM2_MODEL_DIR){
 const download=name=>execFileSync('curl',['--fail','--location','--silent','--show-error',new URL(name,modelURL).href,'-o',resolve(modelDir,name)]);
 download('model.json');download('metadata.json');
 const model=JSON.parse(await readFile(resolve(modelDir,'model.json'),'utf8'));
 for(const group of model.weightsManifest)for(const path of group.paths)download(path);
}
const browser=await chromium.launch({executablePath:process.env.BLOCK2SCRIPT_BROWSER||'/usr/bin/chromium',args:['--no-sandbox']});const context=await browser.newContext();
await context.addInitScript(()=>{if(!navigator.mediaDevices)return;window.videos=[];const create=document.createElement.bind(document);document.createElement=(name,...args)=>{const e=create(name,...args);if(name==='video')window.videos.push(e);return e;};navigator.mediaDevices.getUserMedia=async()=>{const c=create('canvas');c.width=360;c.height=360;const draw=()=>c.getContext('2d').fillRect(0,0,360,360);draw();setInterval(draw,60);return c.captureStream(15);};});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await context.route(modelURL+'**',r=>r.fulfill({path:resolve(modelDir,new URL(r.request().url()).pathname.split('/').pop()),headers:{'access-control-allow-origin':'*'}}));
await page.goto(process.env.BLOCK2SCRIPT_TEST_URL||'http://127.0.0.1:5173');await page.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow.scratchNative?.vm?.editingTarget,null,{timeout:120000});
await page.waitForFunction(()=>document.querySelector('#target').textContent.includes('スプライト'));
const labels=['Cat1','Cat2','Dog1','Dog2','none'];
async function enter(source){await page.locator('.cm-content').click();await page.keyboard.press('Control+a');await page.keyboard.insertText(source);assert.equal((await page.locator('.cm-content').textContent()).replaceAll('\n',''),source.replaceAll('\n',''));await page.locator('#validate').click();}
const source=`scratch.script({x:300,y:30},()=>{scratch.event_whenflagclicked({});scratch.tm2scratch_setImageClassificationModelURL({URL:${JSON.stringify(modelURL)}});});\n`+labels.map(label=>`scratch.script({x:30,y:30},()=>{scratch.tm2scratch_whenReceived({LABEL:scratch.tm2scratch_menu_received_menu({received_menu:${JSON.stringify(label)}})});scratch.looks_say({MESSAGE:${JSON.stringify('received:'+label)}});});`).join('\n');
try{
 await page.evaluate(async()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.extensionManager.loadExtensionURL('tm2scratch'));
 // Extension loading resolves before the workspace finishes installing its dropdowns.
 await page.waitForFunction(()=>{
  const c=document.querySelector('#scratch-frame').contentWindow.scratchNative.getController();
  if(!c?.ScratchBlocks.Blocks.tm2scratch_menu_received_menu)return false;
  c.ScratchBlocks.Events.disable();let b;
  try{b=c.workspace.newBlock('tm2scratch_menu_received_menu');return b.getField('received_menu').getOptions().length>0;}finally{b?.dispose(false);c.ScratchBlocks.Events.enable();}
 });
 // Prime schema with the pre-load menu, then load metadata without BLOCKSINFO_UPDATE.
 await enter(source);assert.equal(await page.locator('#apply').isEnabled(),false,'Unknown labels before model load must not bypass validation');
 await page.evaluate(async url=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime._primitives.tm2scratch_setImageClassificationModelURL({URL:url}),modelURL);
 await enter(source);assert.equal(await page.locator('#apply').isEnabled(),true,await page.locator('#status').textContent());
 await page.locator('#apply').click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('反映しました'));
 await page.locator('#verify').click();assert.match(await page.locator('#status').textContent(),/差はありません/);
 await page.waitForFunction(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime._primitives.tm2scratch_getImageLabel({})==='none',null,{timeout:30000});
 await page.waitForFunction(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime.targets.some(t=>t.getCustomState?.('Scratch.looks')?.text==='received:none'),null,{timeout:10000});
 // Mock only classifier output; execute the production extension's result handling
 // and native VM's edge-activated hat stack for Cat1.
 await page.evaluate(async source=>{
  const w=document.querySelector('#scratch-frame').contentWindow,runtime=w.scratchNative.vm.runtime;
  const module={exports:{}};
  const require=name=>name==='format-message'?{setup:()=>({locale:'en'})}:name.endsWith('/log')?{warn(){},info(){}}:{};
  const create=new w.Function('require','module','setInterval',source+';return module.exports;');
  const Extension=create(require,module,()=>0),extension=new Extension(runtime);
  extension.imageMetadata={labels:['Cat1','Cat2','Dog1','Dog2','none']};
  extension.imageClassifier={classify:async()=>[{label:'Cat1',confidence:0.99}]};
  runtime._primitives.tm2scratch_whenReceived=extension.whenReceived.bind(extension);
  for(const target of runtime.targets)target.blocks.resetCache();
  await extension.classifyImage(w.document.createElement('canvas'));
 },await readFile('stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_tm2scratch/index.js','utf8'));
 await page.waitForFunction(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime.targets.some(t=>t.getCustomState?.('Scratch.looks')?.text==='received:Cat1'),null,{timeout:10000});
 await enter(source.replaceAll('Cat1','invalid-label'));assert.equal(await page.locator('#apply').isEnabled(),false,'Invalid dynamic option must still be rejected');
 // A project restores URL blocks and saved labels, but metadata is not in sb3.
 const saved=await page.evaluate(async()=>{const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;return Array.from(new Uint8Array(await (await vm.saveProjectSb3()).arrayBuffer()));});
 const fresh=await context.newPage();await fresh.goto(process.env.BLOCK2SCRIPT_TEST_URL||'http://127.0.0.1:5173');await fresh.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow.scratchNative?.vm?.editingTarget,null,{timeout:120000});
 await fresh.waitForFunction(()=>document.querySelector('#target').textContent.includes('スプライト'));
 await fresh.evaluate(async bytes=>{const w=document.querySelector('#scratch-frame').contentWindow;await w.scratchNative.vm.loadProject(new w.Uint8Array(bytes));},saved);
 await fresh.waitForFunction(()=>document.querySelector('.cm-content').textContent.includes('Cat1'));
 await fresh.locator('#verify').click();assert.match(await fresh.locator('#status').textContent(),/差はありません/);
 assert.ok((await fresh.locator('.cm-content').textContent()).includes(modelURL),'Model URL survives save/reload');
 await fresh.evaluate(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.greenFlag());
 await fresh.waitForFunction(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime._primitives.tm2scratch_getImageLabel({})==='none',null,{timeout:30000});
 assert.deepEqual(errors,[]);
 console.log('PASS: real model + synthetic camera -> none label -> native VM hat body; mocked Cat1 classifier -> native VM hat body; five-label roundtrip, stale-cache/invalid-option checks, fresh sb3 roundtrip before metadata load. Cat1 semantic image recognition and physical Chromebook UNTESTED.');
}finally{await browser.close();}
