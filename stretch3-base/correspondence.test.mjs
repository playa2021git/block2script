import {chromium} from './qa/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {saveNative,loadNative,addNative} from '../tests/browser-native-ui.mjs';
const browser=await chromium.launch({executablePath:process.env.BLOCK2SCRIPT_BROWSER||(process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined),headless:true});
const context=await browser.newContext({viewport:{width:1600,height:1000}});
const page=await context.newPage(),errors=[];
page.on('pageerror',error=>errors.push(error.message));
const url=process.env.BLOCK2SCRIPT_TEST_URL||'http://127.0.0.1:5173/';
const source=`scratch.script({x:40,y:40},()=>{
 scratch.event_whenflagclicked({}, {id:"flag"});
 scratch.looks_say({MESSAGE:"A"}, {id:"say-a"});
 scratch.looks_say({MESSAGE:"B"}, {id:"say-b"});
 scratch.control_if({CONDITION:scratch.operator_equals({OPERAND1:1,OPERAND2:1},{id:"equals"}),SUBSTACK:()=>{
  scratch.looks_say({MESSAGE:"inside"},{id:"inside"});
 }},{id:"if"});
});`;
async function ready(p){await p.goto(url);await p.waitForFunction(()=>document.querySelector('#target').textContent.includes('スプライト'),null,{timeout:120000});}
async function type(text){await page.locator('.cm-content').click();await page.keyboard.press('Control+a');await page.keyboard.insertText(text);}
async function selected(){return page.evaluate(()=>[...document.querySelector('#scratch-frame').contentDocument.querySelectorAll('.b2s-block-correspondence')].map(root=>root.getAttribute('data-id')));}
async function selectBlock(id){await page.evaluate(id=>document.querySelector('#scratch-frame').contentWindow.scratchNative.getController().workspace.getBlockById(id).select(),id);}
try{
 await ready(page);
 assert.equal(await page.locator('header #stretch,header #load,header #save').count(),0);
 await type(source);await page.locator('#validate').click();assert.equal(await page.locator('#apply').isEnabled(),true);
 await page.locator('#apply').click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('反映しました'));
 await selectBlock('say-b');await page.waitForSelector('.b2s-code-correspondence');
 assert.match(await page.locator('.b2s-code-correspondence').innerText(),/"B"/);
 assert.deepEqual(await selected(),['say-b']);
 await page.locator('.cm-line').filter({hasText:'"MESSAGE": "A"'}).click({position:{x:55,y:8}});
 assert.deepEqual(await selected(),['say-a']);
 await selectBlock('equals');await page.waitForSelector('.b2s-code-correspondence');
 assert.match(await page.locator('.b2s-code-correspondence').innerText(),/^scratch\.operator_equals/);
 assert.deepEqual(await selected(),['equals']);
 await selectBlock('if');await page.waitForFunction(()=>document.querySelector('.b2s-code-correspondence')?.textContent.includes('scratch.control_if'));
 assert.ok((await page.locator('.b2s-code-correspondence').allTextContents()).join('').includes('inside'));
 await page.screenshot({path:'stretch3-base/qa/correspondence.png'});
 // Selection must never execute the script or change the VM graph.
 const graph=await page.evaluate(()=>JSON.stringify(document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.editingTarget.blocks._blocks));
 await selectBlock('say-a');await page.waitForSelector('.b2s-code-correspondence');
 assert.equal(await page.evaluate(()=>JSON.stringify(document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.editingTarget.blocks._blocks)),graph);
 // Move the source by editing a field, then resolve the same ID in regenerated code.
 await page.evaluate(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.getController().workspace.getBlockById('say-a').getInput('MESSAGE').connection.targetBlock().setFieldValue('new A value','TEXT'));
 await page.waitForFunction(()=>document.querySelector('.cm-content').textContent.includes('new A value'));
 assert.deepEqual(await selected(),[]);
 await page.evaluate(()=>{
  const controller=document.querySelector('#scratch-frame').contentWindow.scratchNative.getController();
  controller.ScratchBlocks.Events.fire(new controller.ScratchBlocks.Events.Ui(controller.workspace.getBlockById('say-a'),'click',undefined,undefined));
 });
 await page.waitForSelector('.b2s-code-correspondence');assert.match(await page.locator('.b2s-code-correspondence').innerText(),/new A value/);
 await selectBlock('say-b');await page.waitForSelector('.b2s-code-correspondence');assert.match(await page.locator('.b2s-code-correspondence').innerText(),/"B"/);
 // Sprite changes clear prior highlights, including structurally identical code.
 const originalTarget=await page.evaluate(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.editingTarget.id);
 await page.evaluate(async()=>{const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;const ids=new Set(vm.runtime.targets.map(target=>target.id));await vm.duplicateSprite(vm.editingTarget.id);vm.setEditingTarget(vm.runtime.targets.find(target=>target.isOriginal&&!ids.has(target.id)).id);});
 await page.waitForFunction(id=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.editingTarget.id!==id,originalTarget);
 await page.waitForFunction(()=>document.querySelector('#target').textContent.includes('Block2Bot2'));
 assert.deepEqual(await selected(),[]);assert.equal(await page.locator('.b2s-code-correspondence').count(),0);
 await page.evaluate(id=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.setEditingTarget(id),originalTarget);
 await page.waitForFunction(()=>document.querySelector('#target').textContent.includes('Block2Bot ·'));
 await selectBlock('say-a');await page.waitForSelector('.b2s-code-correspondence');
 await page.locator('.cm-content').click();await page.keyboard.press('Control+End');await page.keyboard.insertText('\n// draft');
 assert.deepEqual(await selected(),[]);assert.equal(await page.locator('.b2s-code-correspondence').count(),0);
 await selectBlock('say-b');await page.waitForTimeout(200);assert.equal(await page.locator('.b2s-code-correspondence').count(),0,'Dirty draft used stale ranges');
 const download=page.waitForEvent('download');await saveNative(page);await (await download).saveAs('stretch3-base/qa/correspondence.sb3');
 const fresh=await context.newPage();await ready(fresh);await loadNative(fresh,'stretch3-base/qa/correspondence.sb3');
 await fresh.waitForFunction(()=>document.querySelector('.cm-content').textContent.includes('new A value'));
 await fresh.evaluate(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.getController().workspace.getBlockById('say-b').select());
 await fresh.waitForSelector('.b2s-code-correspondence');assert.match(await fresh.locator('.b2s-code-correspondence').innerText(),/"B"/);
 await addNative(fresh,'ペン');
 await fresh.waitForFunction(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.extensionManager.isExtensionLoaded('pen'));
 assert.deepEqual(errors,[]);
 await writeFile('stretch3-base/qa/correspondence-result.json',JSON.stringify({pass:true,url,checks:['three duplicate header controls removed','Scratch to Script by exact block ID','Script to Scratch with repeated opcode','nested reporter and parent ranges','selection leaves graph unchanged','regeneration shifts mapping','sprite switch clears','dirty draft rejects stale map','native file save/reload preserves mapping','native extension addition'],errors},null,2));
 console.log('Bidirectional correspondence and native UI regression checks passed.');
}finally{await browser.close();}
