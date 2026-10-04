import test from 'node:test';
import assert from 'node:assert/strict';
import {captureDrafts,mapDrafts} from '../native-scratch/recovery.js';
const target=(id,name,isStage=false)=>({id,getName:()=>name,isStage});
test('drafts map to regenerated VM target IDs including duplicate names',()=>{
 const before=[target('stage','Stage',true),target('a','Sprite'),target('b','Sprite')];
 const entries=captureDrafts(before,new Map([['a','invalid unfinished draft'],['b','another draft']]),'b');
 const after=[target('new-stage','Stage',true),target('new-a','Sprite'),target('new-b','Sprite')];
 const result=mapDrafts(after,entries);assert.equal(result.drafts.get('new-a'),'invalid unfinished draft');assert.equal(result.drafts.get('new-b'),'another draft');assert.equal(result.activeId,'new-b');
});
test('drafts are not assigned to a different project target',()=>{const result=mapDrafts([target('stage','Stage',true)], [{index:0,name:'Sprite',isStage:false,source:'wrong code',active:true}]);assert.equal(result.drafts.size,0);assert.equal(result.activeId,undefined);});
