import {test} from 'node:test';
import assert from 'node:assert/strict';
import {diagnoseEnvironment,buildRepairRequest} from '../native-scratch/lesson-tools.js';
test('diagnostics neither request devices nor write snapshots, and report unsupported APIs',async()=>{
 let reads=0;const win={isSecureContext:true,navigator:{onLine:false,mediaDevices:{getUserMedia(){throw Error('Must not request media');}}}};
 const checks=await diagnoseEnvironment(win,{list:async()=>{reads++;return [];},save(){throw Error('Must not save');}});
 assert.equal(reads,1);assert.equal(checks.find(c=>c.name==='音声認識API').state,'未対応');assert.equal(checks.find(c=>c.name==='Bluetooth API').state,'未対応');assert.equal(checks.find(c=>c.name==='自動保存の読込').state,'確認済み');
});
test('storage failure yields an actionable diagnostic',async()=>{
 const checks=await diagnoseEnvironment({navigator:{},isSecureContext:false},{list:async()=>{throw Error('denied');}});
 assert.equal(checks.find(c=>c.name==='自動保存の読込').state,'利用不可');assert.match(checks.at(-1).detail,/ファイル/);
});

test('repair request bundles error line, candidate, complete source and real argument specification',()=>{
 const specification={source:'scratch.script({},()=>{scratch.pen_setPenParamTo({});});',target:{name:'Block2Bot'},blocks:[{opcode:'pen_setPenColorParamTo',inputs:{VALUE:{}},fields:{COLOR_PARAM:{}}}]};
 const diagnostic='36行目: pen_setPenParamTo はありません。修正候補: pen_setPenColorParamTo';
 const request=buildRepairRequest(diagnostic,specification);
 assert.ok(request.includes(diagnostic));assert.ok(request.includes(specification.source));assert.match(request,/pen_setPenColorParamTo/);assert.match(request,/COLOR_PARAM/);
 assert.match(request,/コード全文/);assert.match(request,/拡張機能の追加が必要/);assert.match(request,/メタデータを保持/);
});

 test('repair request excludes unrelated specs, storage policies and verbose defaults',()=>{
 const source='scratch.script({},()=>{scratch.pen_setPenParamTo({COLOR_PARAM:"color",VALUE:50});});';
 const request=buildRepairRequest('36行目: pen_setPenParamTo → pen_setPenColorParamTo',{
 source,saveScope:{sb3:'STORAGE_POLICY'},variableCreation:{apply:'VARIABLE_POLICY'},extensions:[{network:'NETWORK_POLICY'}],
 blocks:[{opcode:'pen_setPenColorParamTo',inputs:{COLOR_PARAM:{kind:'value',defaultShadow:'SHADOW_INTERNAL'},VALUE:{kind:'value'}},fields:{},menus:{},previous:true}],target:{name:'Block2Bot'}
 });
 assert.doesNotMatch(request,/STORAGE_POLICY|VARIABLE_POLICY|NETWORK_POLICY|SHADOW_INTERNAL|previous/);
 assert.equal(request.split(source).length-1,1);assert.equal(request.split('36行目').length-1,1);
 assert.ok(request.length<1500);
 });
