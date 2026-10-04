import {chromium} from './qa/node_modules/playwright/index.mjs';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:process.env.BLOCK2SCRIPT_BROWSER||(process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined),headless:true});
const page=await browser.newPage();const errors=[];
const appURL=process.env.BLOCK2SCRIPT_TEST_URL||'http://127.0.0.1:5173/';
page.on('pageerror',error=>errors.push(error.message));
page.on('console',message=>{if(message.type()==='error')errors.push(message.text().slice(0,400));});
try{
 await page.goto(appURL);
 const iframe=page.frameLocator('#scratch-frame');
 await page.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow?.scratchNative?.vm?.editingTarget,{timeout:120000});
 await page.waitForFunction(()=>document.querySelector('#target').textContent.includes('スプライト'),{timeout:30000});
 console.log('CONNECTED',await page.locator('#target').textContent());
 await page.locator('#file').setInputFiles('tests/fixtures/stretch-three.sb3');
 await page.waitForFunction(()=>document.querySelector('#status').textContent==='Scratchプロジェクトを読み込みました',{timeout:90000});
 console.log('FIXTURE_LOADED');
 await page.locator('#demo').click();await page.locator('#apply').click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('反映しました'));
 console.log('APPLY',await page.locator('#status').textContent());
 if(!(await page.locator('#status').textContent()).includes('反映しました'))throw new Error('Script apply failed');
 await page.locator('#verify').click();console.log('ROUNDTRIP',await page.locator('#status').textContent());
 if(!(await page.locator('#status').textContent()).includes('差はありません'))throw new Error('Roundtrip failed');
 const registration=await page.evaluate(async()=>{const n=document.querySelector('#scratch-frame').contentWindow.scratchNative;const result={};for(const id of Object.keys(n.stretch.supported)){await n.stretch.load(id);result[id]=n.vm.extensionManager.isExtensionLoaded(id);}return result;});
 console.log('EXTENSIONS',registration);
 await page.waitForTimeout(1000);
 await page.locator('#verify').click();console.log('EXTENSION_ROUNDTRIP',await page.locator('#status').textContent());
 const downloadPromise=page.waitForEvent('download');await page.locator('#save').click();const download=await downloadPromise;
 await download.saveAs('stretch3-base/qa/saved-project.sb3');
 const before=await page.evaluate(()=>{const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;return vm.runtime.targets.filter(t=>t.isOriginal).map(t=>({name:t.getName(),count:Object.keys(t.blocks._blocks).length}));});
 await page.locator('#file').setInputFiles('stretch3-base/qa/saved-project.sb3');
 await page.waitForFunction(()=>document.querySelector('#status').textContent==='Scratchプロジェクトを読み込みました',{timeout:60000});
 const after=await page.evaluate(()=>{const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;return vm.runtime.targets.filter(t=>t.isOriginal).map(t=>({name:t.getName(),count:Object.keys(t.blocks._blocks).length}));});
 if(JSON.stringify(before)!==JSON.stringify(after))throw new Error('Save/reload counts mismatch');
 console.log('SAVE_RELOAD',after);
 const fresh=await browser.newPage();await fresh.goto(appURL);
 await fresh.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow?.scratchNative?.vm?.editingTarget,{timeout:120000});
 await fresh.locator('#file').setInputFiles('stretch3-base/qa/saved-project.sb3');
 await fresh.waitForFunction(()=>document.querySelector('#status').textContent==='Scratchプロジェクトを読み込みました',{timeout:90000});
 const restored=await fresh.evaluate(()=>{const n=document.querySelector('#scratch-frame').contentWindow.scratchNative;return Object.fromEntries(Object.keys(n.stretch.supported).map(id=>[id,n.vm.extensionManager.isExtensionLoaded(id)]));});
 if(['ml2scratch','posenet2scratch','microbitMore'].some(id=>!restored[id]))throw new Error('Extension auto-restore failed');
 console.log('FRESH_AUTO_RESTORE',restored);await fresh.close();
 await page.screenshot({path:'stretch3-base/qa/preview.png'});
 await writeFile('stretch3-base/qa/result.json',JSON.stringify({registration,before,after,errors},null,2));
 console.log('ERRORS',errors);
}finally{await browser.close();}


