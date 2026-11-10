// Test the actual generated extension source, with classifier/media boundaries mocked.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const source=readFileSync('stretch3-base/scratch-gui-3.6.18/node_modules/scratch-vm/src/extensions/scratch3_tm2scratch/index.js','utf8');
const labels=['Cat1','Cat2','Dog1','Dog2','none'];
let prediction=[],resets=[];
const classifier={classify:async()=>prediction};
const context={module:{exports:{}},require:name=>{
 if(name==='ml5')return {imageClassifier:async()=>classifier};
 if(name==='format-message')return {setup:()=>({locale:'en'})};
 if(name.endsWith('/log'))return {info(){},warn(){}};
 return {};
},document:{createElement:()=>({})},navigator:{mediaDevices:{getUserMedia:async()=>({}),enumerateDevices:async()=>[]}},setInterval:()=>1,clearTimeout(){},setTimeout:fn=>resets.push(fn),console,fetch:async()=>({json:async()=>({labels,timeStamp:'2026-11-10'})})};
runInNewContext(source,context);
const extension=new context.module.exports({ioDevices:{video:{enableVideo(){}}}});
await extension.setImageClassificationModelURL({URL:'https://example.test/model/'});
assert.deepEqual(Array.from(extension.getLabelsMenu()).slice(1),labels);
for(const label of labels){
 prediction=[{label,confidence:0.99}];
 await extension.classifyVideoImage();
 assert.equal(extension.getImageLabel(),label);
 assert.equal(extension.whenReceived({LABEL:label}),true);
 assert.equal(extension.whenReceived({LABEL:'invalid'}),false);
 resets.splice(0).forEach(fn=>fn());
 assert.equal(extension.whenReceived({LABEL:label}),false,'Reset allows the next edge to trigger');
}
console.log('PASS: production TM2 source loads metadata, retains all five labels, classifies mocked results, evaluates Cat1 hat and resets edges. Inference engine and native VM execution are covered separately by browser test.');
