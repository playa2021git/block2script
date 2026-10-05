import {saveNative,loadNative} from '../tests/browser-native-ui.mjs';
import {chromium} from './qa/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const url=process.env.BLOCK2SCRIPT_TEST_URL||'http://127.0.0.1:5173/';
const ids=['pen','music','text2speech','translate'];
const browser=await chromium.launch({executablePath:process.env.BLOCK2SCRIPT_BROWSER||(process.platform==='win32'?'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe':undefined),headless:true});
const context=await browser.newContext({viewport:{width:1550,height:1000}}),errors=[];
context.on('page',p=>p.on('pageerror',e=>errors.push(e.message)));
// Keep the test independent of the translation service language-list endpoint.
await context.route('**/translate-service.scratch.mit.edu/**',route=>route.fulfill({json:{result:[],languages:[]}}));
async function ready(p){await p.goto(url);await p.waitForFunction(()=>document.querySelector('#scratch-frame')?.contentWindow?.scratchNative?.vm?.editingTarget,{timeout:90000});await p.waitForFunction(()=>document.querySelector('#target').textContent.includes('スプライト'));}
async function graph(p){return p.evaluate(()=>JSON.stringify(document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.editingTarget.blocks._blocks));}
async function type(p,s){await p.locator('.cm-content').click();await p.keyboard.press('Control+a');await p.keyboard.insertText(s);}
function canonical(blocks){
 const names=new Map();
 for(const b of Object.values(blocks))for(const [name,input] of Object.entries(b.inputs))for(const id of [input.block,input.shadow])if(id&&blocks[id]?.shadow&&['math_number','math_integer','math_positive_number','math_whole_number','math_angle','text','colour_picker'].includes(blocks[id].opcode))names.set(id,b.id+':'+name+':literal');
 const ref=id=>names.get(id)??id;
 return Object.fromEntries(Object.values(blocks).map(original=>{const b=structuredClone(original);b.id=ref(b.id);b.parent=ref(b.parent);b.next=ref(b.next);for(const input of Object.values(b.inputs)){input.block=ref(input.block);input.shadow=ref(input.shadow);}return [b.id,b];}));
}
const source='scratch.script({x:40,y:40},()=>{scratch.event_whenflagclicked({});scratch.pen_clear({});scratch.pen_setPenSizeTo({SIZE:3});scratch.pen_penDown({});scratch.motion_movesteps({STEPS:30});scratch.pen_penUp({});scratch.music_setTempo({TEMPO:90});scratch.music_playNoteForBeats({NOTE:60,BEATS:0.25});scratch.looks_say({MESSAGE:scratch.music_getTempo({})});scratch.text2speech_setVoice({VOICE:"ALTO"});scratch.text2speech_setLanguage({LANGUAGE:"ja"});scratch.text2speech_speakAndWait({WORDS:"こんにちは"});scratch.looks_say({MESSAGE:scratch.translate_getTranslate({WORDS:"hello",LANGUAGE:"ja"})});scratch.looks_say({MESSAGE:scratch.translate_getViewerLanguage({})});});';
try{
 const page=await context.newPage();await ready(page);
 await page.locator('#save-scope summary').click();assert.match(await page.locator('#save-scope').innerText(),/未反映コードは.sb3には入りません/);assert.match(await page.locator('#save-scope').innerText(),/学習データ/);
 const unloaded=await graph(page);await type(page,source);await page.locator('#validate').click();assert.equal(await page.locator('#apply').isDisabled(),true,'Unloaded extensions accepted');assert.equal(await graph(page),unloaded);
 await page.evaluate(async ids=>{const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;for(const id of ids)await vm.extensionManager.loadExtensionURL(id);},ids);
 await page.waitForFunction(()=>document.querySelector('#scratch-frame').contentWindow.scratchNative.getController()?.ScratchBlocks.Blocks.translate_getTranslate);
 const before=await graph(page);await page.locator('#validate').click();assert.equal(await page.locator('#apply').isEnabled(),true,await page.locator('#status').textContent());assert.equal(await graph(page),before,'Validation changed graph');
 await page.locator('#apply').click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('反映しました'));
 await page.locator('#verify').click();assert.match(await page.locator('#status').textContent(),/差はありません/);
 const applied=await graph(page);
 const pending=page.waitForEvent('download');await saveNative(page);const download=await pending;await download.saveAs('stretch3-base/qa/standard-extensions.sb3');
 const fresh=await context.newPage();await ready(fresh);await loadNative(fresh,'stretch3-base/qa/standard-extensions.sb3');
 const restored=await fresh.evaluate(ids=>{const vm=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm;return {loaded:ids.map(id=>vm.extensionManager.isExtensionLoaded(id)),blocks:vm.editingTarget.blocks._blocks};},ids);
 assert.ok(restored.loaded.every(Boolean));assert.deepEqual(canonical(restored.blocks),canonical(JSON.parse(applied)));
 await fresh.locator('#verify').click();assert.match(await fresh.locator('#status').textContent(),/差はありません/);
 await type(fresh,source.replace('VOICE:"ALTO"','VOICE:"invalid-voice"'));const original=await graph(fresh);await fresh.locator('#validate').click();assert.equal(await fresh.locator('#apply').isDisabled(),true);assert.equal(await graph(fresh),original);
 await fresh.screenshot({path:'stretch3-base/qa/standard-extensions.png'});
 assert.deepEqual(errors,[]);
 await writeFile('stretch3-base/qa/standard-extensions-result.json',JSON.stringify({pass:true,extensions:ids,checks:['save scope visible','unloaded opcode rejected','validation leaves graph unchanged','representative commands and nested reporters','Script roundtrip','sb3 fresh-page automatic extension loading and graph preservation with literal shadow IDs normalized','invalid voice rejected'],execution:'Audio playback and online speech/translation execution UNTESTED',errors},null,2));
 console.log('Standard extension Script/save/reload checks passed.');
}finally{await browser.close();}
