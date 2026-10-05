import test from 'node:test';
import assert from 'node:assert/strict';
import {exportCode,exportCodeWithMap} from '../native-scratch/bridge.js';
import {rangeAt} from '../native-scratch/correspondence.js';

function block(id,opcode,inputs={},next=null){return {id,opcode,inputs,fields:{},next,parent:null,topLevel:true,shadow:false};}
const input=id=>({block:id,shadow:null});
test('emission maps repeated commands and nested reporters to distinct VM IDs',()=>{
 const blocks={
  if:block('if','control_if',{CONDITION:input('sensor'),SUBSTACK:input('say1')}),
  sensor:block('sensor','microbitMore_isButtonPressed'),
  say1:block('say1','looks_say',{MESSAGE:input('literal')},'say2'),
  say2:block('say2','looks_say'),
  literal:{...block('literal','text'),shadow:true,fields:{TEXT:{value:'こんにちは 🌸'}}}
 };
 const result=exportCodeWithMap(blocks,['if'],'sprite1');
 assert.equal(result.code,exportCode(blocks,['if']));
 assert.equal(result.ranges.length,5);
 const byId=id=>result.ranges.find(range=>range.blockId===id);
 for(const range of result.ranges){
  assert.equal(range.targetId,'sprite1');
  assert.ok(range.startOffset<range.endOffset);
  assert.equal(range.startLine,result.code.slice(0,range.startOffset).split('\n').length);
 }
 const first=byId('say1'),second=byId('say2'),condition=byId('sensor'),parent=byId('if'),literal=byId('literal');
 assert.notEqual(first.startOffset,second.startOffset);
 assert.ok(result.code.slice(first.startOffset,first.endOffset).startsWith('scratch.looks_say('));
 assert.ok(parent.startOffset<condition.startOffset&&parent.endOffset>second.endOffset);
 assert.equal(rangeAt(result.ranges,'sprite1',condition.startOffset,condition.startLine).blockId,'sensor');
 assert.equal(rangeAt(result.ranges,'sprite1',second.startOffset,second.startLine).blockId,'say2');
 assert.equal(rangeAt(result.ranges,'sprite1',literal.startOffset,literal.startLine).blockId,'literal');
 assert.equal(rangeAt(result.ranges,'sprite2',first.startOffset,first.startLine),null);
 assert.equal(rangeAt(result.ranges,'sprite1',0,1),null);
});
test('regeneration shifts positions, excludes deleted IDs and scopes targets',()=>{
 const blocks={a:block('a','looks_say',{},'b'),b:block('b','looks_say')};
 const before=exportCodeWithMap(blocks,['a'],'one');
 blocks.a.inputs={MESSAGE:input('long')};
 blocks.long={...block('long','text'),shadow:true,fields:{TEXT:{value:'long input value'}}};
 const after=exportCodeWithMap(blocks,['a'],'one');
 assert.ok(after.ranges.find(r=>r.blockId==='b').startOffset>before.ranges.find(r=>r.blockId==='b').startOffset);
 delete blocks.b;blocks.a.next=null;
 assert.ok(!exportCodeWithMap(blocks,['a'],'two').ranges.some(r=>r.blockId==='b'));
 assert.ok(exportCodeWithMap(blocks,['a'],'two').ranges.every(r=>r.targetId==='two'));
});
