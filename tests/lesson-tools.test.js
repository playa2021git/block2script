import {test} from 'node:test';
import assert from 'node:assert/strict';
import {diagnoseEnvironment} from '../native-scratch/lesson-tools.js';
test('diagnostics neither request devices nor write snapshots, and report unsupported APIs',async()=>{
 let reads=0;const win={isSecureContext:true,navigator:{onLine:false,mediaDevices:{getUserMedia(){throw Error('Must not request media');}}}};
 const checks=await diagnoseEnvironment(win,{list:async()=>{reads++;return [];},save(){throw Error('Must not save');}});
 assert.equal(reads,1);assert.equal(checks.find(c=>c.name==='音声認識API').state,'未対応');assert.equal(checks.find(c=>c.name==='Bluetooth API').state,'未対応');assert.equal(checks.find(c=>c.name==='自動保存の読込').state,'確認済み');
});
test('storage failure yields an actionable diagnostic',async()=>{
 const checks=await diagnoseEnvironment({navigator:{},isSecureContext:false},{list:async()=>{throw Error('denied');}});
 assert.equal(checks.find(c=>c.name==='自動保存の読込').state,'利用不可');assert.match(checks.at(-1).detail,/ファイル/);
});
