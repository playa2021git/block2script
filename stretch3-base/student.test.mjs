import {saveNative} from '../tests/browser-native-ui.mjs';
import {chromium} from './qa/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:process.env.BLOCK2SCRIPT_BROWSER||(process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined),headless:true});
const page=await browser.newPage({viewport:{width:1550,height:1000}}),errors=[],requests=[];
page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
const appURL=process.env.BLOCK2SCRIPT_TEST_URL||'http://127.0.0.1:5173/';
async function graph(){return page.evaluate(()=>{const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;return JSON.stringify(vm.runtime.targets.filter(t=>t.isOriginal).map(t=>({id:t.id,blocks:t.blocks._blocks,scripts:t.blocks._scripts,variables:t.variables})));});}
async function type(source){await page.locator('.cm-content').click();await page.keyboard.press('Control+a');await page.keyboard.insertText(source);await page.waitForTimeout(950);}
try{
 await page.goto(appURL);await page.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow?.scratchNative?.vm?.editingTarget,{timeout:90000});
 await page.waitForFunction(()=>document.querySelector('#target').textContent.includes('スプライト'));
 assert.equal(await page.locator('#mode').inputValue(),'student');
 const before=await graph();await page.locator('#demo').click();
 assert.equal(await graph(),before,'Sample/validation changed VM');assert.equal(await page.locator('#preview').isVisible(),true);assert.equal(await page.locator('#apply').isEnabled(),true);
 const downloadPromise=page.waitForEvent('download');await saveNative(page);await downloadPromise;assert.equal(await graph(),before,'Save applied draft');
 await page.locator('#apply').click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('反映しました'));assert.notEqual(await graph(),before);assert.match(await page.locator('#status').textContent(),/反映しました/);
 await page.locator('#undo').click();assert.equal(await graph(),before,'Undo did not restore previous graph');
 await type('fetch("https://should-never-run.invalid/");');assert.equal(await graph(),before,'Paste changed VM');assert.equal(await page.locator('#apply').isDisabled(),true);
 await page.locator('#validate').click();assert.equal(await graph(),before);assert.match(await page.locator('#status').textContent(),/理由:.*[\s\S]*次にすること:.*[\s\S]*AIに相談:/);assert.equal(requests.some(url=>url.includes('should-never-run.invalid')),false);
 await type('scratch.script({}, () => { scratch.event_whenkeypressed({KEY_OPTION: "not-a-key"}); });');await page.locator('#validate').click();assert.equal(await page.locator('#apply').isDisabled(),true);assert.match(await page.locator('#status').textContent(),/メニュー/);assert.equal(await graph(),before);
 await type('scratch.script({}, () => { scratch.data_setvariableto({VARIABLE: "missing-score", VALUE: 1}); });');await page.locator('#validate').click();assert.equal(await page.locator('#apply').isDisabled(),true);assert.match(await page.locator('#status').textContent(),/変数/);assert.equal(await graph(),before);
 await page.locator('#demo').click(); // invalid source plus sample remains invalid; replace with valid source.
 const valid='scratch.script({x:40,y:50}, () => { scratch.event_whenflagclicked({}); scratch.motion_movesteps({STEPS: 10}); });';
 await type(valid);await page.locator('#validate').click();assert.equal(await page.locator('#apply').isEnabled(),true);
 await page.evaluate(()=>{const n=document.querySelector('#scratch-frame').contentWindow.scratchNative;n.vm.setEditingTarget(n.vm.runtime.getTargetForStage().id);});
 await page.waitForTimeout(350);assert.equal(await page.locator('#apply').isDisabled(),true,'Preview applied to different sprite');
 await page.evaluate(()=>{const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;vm.setEditingTarget(vm.runtime.targets.find(t=>t.isOriginal&&!t.isStage).id);});await page.waitForTimeout(350);
 await page.locator('#mode').selectOption('teacher');await type(valid);assert.equal(await graph(),before,'Teacher auto-sync enabled without opt-in');
 await page.locator('#auto-sync').check();await page.waitForTimeout(1000);assert.notEqual(await graph(),before,'Teacher opt-in auto-sync failed');
 await page.locator('#mode').selectOption('student');assert.equal(await page.locator('#auto-sync').isChecked(),false);assert.equal(await page.locator('#auto-sync').isDisabled(),true);
 await page.locator('#verify').click();assert.match(await page.locator('#status').textContent(),/差はありません/);
 await page.screenshot({path:'stretch3-base/qa/student-mode.png'});
 assert.deepEqual(errors,[]);await writeFile('stretch3-base/qa/student-result.json',JSON.stringify({pass:true,checks:['student default','sample/validation/save do not mutate VM','explicit apply and Undo','arbitrary fetch rejection','menu rejection','missing variable rejection','target change invalidates preview','teacher auto-sync opt-in','roundtrip'],errors},null,2));
 console.log('Student Mode safety checks passed; browser errors: 0.');
}finally{await browser.close();}
