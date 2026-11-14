import {compileCode} from '../native-scratch/bridge.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {commitGraph,assertPreview,studentError} from '../native-scratch/safety.js';
function fixture(fail){
 const original={a:{id:'a',opcode:'event_whenflagclicked',inputs:{},fields:{},next:null,parent:null,topLevel:true}};
 const target={id:'sprite',variables:{},blocks:{_blocks:structuredClone(original),_scripts:['a'],resetCache(){}},createVariable(id,name,type){this.variables[id]={id,name,type};},deleteVariable(id){delete this.variables[id];}};
 let calls=0;const vm={stopAll(){},emitWorkspaceUpdate(){if(fail&&++calls===1)throw new Error('workspace failure');},runtime:{emitProjectChanged(){}}};
 return {original,target,vm,pending:[{target,id:'new-var',name:'score',type:''}]};
}
test('failed graph commit restores blocks and removes newly created variables',()=>{const f=fixture(true);assert.throws(()=>commitGraph(f.vm,f.target,{blocks:{},scripts:[]},f.pending),/workspace failure/);assert.deepEqual(f.target.blocks._blocks,f.original);assert.deepEqual(f.target.blocks._scripts,['a']);assert.deepEqual(f.target.variables,{});});
test('successful commit returns the pre-change graph for Undo',()=>{const f=fixture(false);const undo=commitGraph(f.vm,f.target,{blocks:{},scripts:[]},f.pending);assert.deepEqual(undo.graph.blocks,f.original);assert.deepEqual(undo.graph.scripts,['a']);assert.equal(undo.variables.length,1);assert.equal(f.target.variables['new-var'].name,'score');});
test('preview cannot apply changed code, another target, or changed block state',()=>{const p={source:'code',targetId:'sprite',context:'before'};assert.equal(assertPreview(p,{source:'code',targetId:'sprite',context:'before'}),p);for(const context of [{source:'changed',targetId:'sprite',context:'before'},{source:'code',targetId:'stage',context:'before'},{source:'code',targetId:'sprite',context:'after'}])assert.throws(()=>assertPreview(p,context),e=>e.code==='STALE_PREVIEW');});
test('student errors include cause, next action and AI repair request',()=>{const error=new Error('internal detail');error.code='MISSING_VARIABLE';const result=studentError(error,'Block2Script Script');assert.match(result.text,/理由:/);assert.match(result.text,/次にすること:/);assert.match(result.text,/AIに相談:/);assert.doesNotMatch(result.text,/internal detail/);assert.match(result.ai,/Block2Script Script/);});

test('missing extensions give named setup steps at the failing line',()=>{
 for(const [id,name] of [['pen','ペン'],['music','音楽'],['translate','翻訳'],['tm2scratch','TM2Scratch']]){
  const opcode=id==='pen'?'pen_clear':`${id}_example`;
  const source=`scratch.script({x:40,y:40},()=>{\n\n\n scratch.${opcode}({});\n});`;
  let error;try{compileCode(source);}catch(caught){error=caught;}
  assert.equal(error.code,'UNKNOWN_OPCODE');assert.equal(error.opcode,opcode);
  const result=studentError(error,'Block2Script Script',{isExtensionLoaded:()=>false});
  assert.match(result.text,/4行目/);assert.ok(result.text.includes(`「${name}」を選択してください`));
  assert.match(result.text,/左下.*拡張機能/);assert.match(result.text,/追加後、もう一度「検証」/);
  assert.match(result.ai,/コードの修正前に/);
 }
});
test('loaded extensions and unknown commands do not instruct redundant extension setup',()=>{
 for(const [opcode,loaded] of [['pen_typo',true],['unknown_command',false],['motion_typo',false]]){
  const error=Object.assign(new Error('4行目: unknown'),{code:'UNKNOWN_OPCODE',opcode});
  const result=studentError(error,'Block2Script Script',{isExtensionLoaded:()=>loaded});
  assert.doesNotMatch(result.text,/を選択してください|まだ追加されていません/);
  assert.match(result.text,/命令名/);
  if(loaded)assert.match(result.text,/ペン.*追加済み/);
 }
});

test('unknown opcode suggests a real registered command and includes it in AI repair text',()=>{
 const source='scratch.script({},()=>{\n scratch.pen_setPenParamTo({});\n});';
 let error;try{compileCode(source,{knownOpcodes:['pen_setPenColorParamTo','motion_movesteps']});}catch(e){error=e;}
 const result=studentError(error,'Block2Script Script',{isExtensionLoaded:()=>true});
 assert.match(result.text,/2行目/);assert.match(result.text,/scratch.pen_setPenColorParamTo/);
 assert.match(result.ai,/scratch.pen_setPenColorParamTo/);
 assert.doesNotMatch(result.text,/scratch.motion_movesteps/);
});
test('incorrect arguments report actual and accepted names, including existing blocks',()=>{
 for(const base of [{},{saved:{id:'saved',opcode:'motion_movesteps',inputs:{STEPS:{}},fields:{}}}]){
  const source='scratch.script({},()=>{\n scratch.motion_movesteps({STEP:10},{id:"saved"});\n});';
  let error;try{compileCode(source,{base,schema:()=>({inputs:{STEPS:{}},fields:{}})});}catch(e){error=e;}
  const result=studentError(error,'Block2Script Script');
  assert.match(result.text,/2行目/);assert.match(result.text,/STEP」はありません/);
  assert.match(result.text,/使える引数: STEPS/);assert.match(result.text,/修正候補: 「STEPS」/);
 }
});
test('missing inputs and syntax errors keep actionable details in student mode',()=>{
 for(const [source,pattern] of [
  ['scratch.script({},()=>{scratch.motion_movesteps({});});',/必要な引数「STEPS」/],
  ['scratch.script({},()=>{',/構文エラー.*文字目/]
 ]){
  let error;try{compileCode(source,{schema:()=>({inputs:{STEPS:{}},fields:{}})});}catch(e){error=e;}
  const result=studentError(error,'Block2Script Script');assert.match(result.text,pattern);assert.match(result.ai,pattern);
 }
});
