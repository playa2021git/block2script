import {chromium} from './qa/node_modules/playwright/index.mjs';
const browser=await chromium.launch({executablePath:process.env.BLOCK2SCRIPT_BROWSER||(process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined),headless:true});
try{
 const page=await browser.newPage({viewport:{width:1500,height:950}});
 await page.goto(process.env.BLOCK2SCRIPT_TEST_URL||'http://127.0.0.1:5173/');
 await page.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow?.scratchNative?.vm?.editingTarget,{timeout:90000});
 const frame=page.frameLocator('#scratch-frame');
 await frame.locator('[class*="extension-button_"]').click();
 await frame.getByText('micro:bit More (v2-0.3.2)',{exact:true}).waitFor();
 await frame.getByText('micro:bitのセンサーやLEDなど、さまざまな機能を使います。',{exact:true}).waitFor();
 await frame.getByText('Speech2Scratch',{exact:true}).waitFor();
 await frame.getByText('話した言葉を文字に変換します。',{exact:true}).waitFor();
 await frame.getByText('カメラセレクター',{exact:true}).waitFor();
 await frame.getByText('使うカメラを選ぶ。',{exact:true}).waitFor();
 const text=await frame.locator('body').innerText();if(text.includes('undefined'))throw new Error('Extension card contains undefined');
 await page.screenshot({path:'stretch3-base/qa/extensions-fixed.png'});
 console.log('Extension name and description verified; no undefined in library.');
}finally{await browser.close();}
