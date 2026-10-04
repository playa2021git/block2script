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
