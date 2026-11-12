import test from 'node:test';
import assert from 'node:assert/strict';
import {planReferences,withWorkspaceReferenceIds} from '../native-scratch/references.js';
import {commitGraph,undoGraph,assertPreview} from '../native-scratch/safety.js';
import {compileCode,exportCode} from '../native-scratch/bridge.js';
function fixture(){
 const make=(id,isStage=false)=>({id,isStage,isOriginal:true,variables:Object.create(null),blocks:{_blocks:{},_scripts:[],resetCache(){}},createVariable(id,name,type){this.variables[id]={id,name,type,value:type==='list'?[]:0};},deleteVariable(id){delete this.variables[id];}});
 const stage=make('stage',true),target=make('sprite'),other=make('other');
 const vm={stopAll(){},emitWorkspaceUpdate(){},runtime:{targets:[stage,target,other],getTargetForStage:()=>stage,getTargetById:id=>[stage,target,other].find(t=>t.id===id),emitProjectChanged(){}}};return {vm,stage,target,other};
}
function graph(...refs){return {blocks:Object.fromEntries(refs.map(([opcode,key,value,id],i)=>[String(i),{id:String(i),opcode,fields:{[key]:{name:key,value,...(id?{id}:{})}},inputs:{},next:null,parent:null,topLevel:true,shadow:false}])),scripts:refs.map((_,i)=>String(i))};}
const v=(name,id)=>['data_variable','VARIABLE',name,id],l=(name,id)=>['data_listcontents','LIST',name,id];
const snapshot=f=>JSON.stringify(f.vm.runtime.targets.map(t=>({id:t.id,variables:t.variables,blocks:t.blocks._blocks,scripts:t.blocks._scripts})));
const schema=()=>({fields:{VARIABLE:{name:'VARIABLE',value:'同名',id:'schema-default',variableType:''}},inputs:{},output:true,previous:false,next:false});
for(const [label,ref,type] of [['variable',v('得点'),''],['list',l('記録'),'list']])test('plan/apply one '+label+' without preview mutations',()=>{
 const f=fixture(),g=graph(ref),before=snapshot(f),p=planReferences(f.vm,f.target,g);assert.equal(snapshot(f),before);assert.equal(p.length,1);assert.equal(p[0].type,type);assert.equal(p[0].target,f.target);commitGraph(f.vm,f.target,g,p);assert.equal(Object.keys(f.target.variables).length,1);assert.equal(Object.values(g.blocks)[0].fields[type?'LIST':'VARIABLE'].id,p[0].id);
});
test('four variables and three lists are deduplicated across repeated Japanese references',()=>{
 const f=fixture(),g=graph(...['辺の長さ','x','y','色'].map(n=>v(n)),...['xリスト','yリスト','長さリスト'].flatMap(n=>[l(n),l(n),l(n)])),before=snapshot(f),p=planReferences(f.vm,f.target,g);assert.equal(p.filter(x=>x.type==='').length,4);assert.equal(p.filter(x=>x.type==='list').length,3);assert.equal(snapshot(f),before);commitGraph(f.vm,f.target,g,p);assert.equal(Object.keys(f.target.variables).length,7);
});
test('reuse accessible variables/lists without resetting existing contents',()=>{
 const f=fixture();f.target.createVariable('local','得点','');f.target.variables.local.value=42;f.stage.createVariable('global','ログ','list');f.stage.variables.global.value=['保存済み',7];const before=snapshot(f),g=graph(v('得点'),l('ログ')),p=planReferences(f.vm,f.target,g);assert.equal(p.length,0);assert.equal(snapshot(f),before);commitGraph(f.vm,f.target,g,p);assert.equal(f.target.variables.local.value,42);assert.deepEqual(f.stage.variables.global.value,['保存済み',7]);assert.equal(g.blocks['1'].fields.LIST.id,'global');
});
test('same-name variable/list and Japanese names with spaces preserve names and types',()=>{
 const f=fixture(),name=' 日本語 abc の 記録 ',g=graph(v(name),l(name),v(name),l(name)),p=planReferences(f.vm,f.target,g);assert.equal(p.length,2);assert.ok(p.every(a=>a.name===name));assert.notEqual(p[0].id,p[1].id);
});
test('stage creates global assets and reuses them without duplicate scope matches',()=>{
 const f=fixture(),g=graph(v('全体'),l('全体')),p=planReferences(f.vm,f.stage,g);assert.ok(p.every(a=>a.target===f.stage));commitGraph(f.vm,f.stage,g,p);assert.equal(planReferences(f.vm,f.stage,g).length,0);
});
test('ambiguous local/global names fail; existing IDs identify either scope',()=>{
 const f=fixture();f.target.createVariable('local','同名','');f.stage.createVariable('global','同名','');const before=snapshot(f);assert.throws(()=>planReferences(f.vm,f.target,graph(v('同名'))),e=>e.code==='AMBIGUOUS_REFERENCE');assert.equal(snapshot(f),before);const g=graph(v('同名','local'),v('同名','global'));assert.equal(planReferences(f.vm,f.target,g).length,0);assert.equal(g.blocks['0'].fields.VARIABLE.id,'local');assert.equal(g.blocks['1'].fields.VARIABLE.id,'global');
});
test('handwritten code cannot accidentally inherit the schema default variable ID',()=>{
 const f=fixture();f.target.createVariable('local','同名','');f.stage.createVariable('schema-default','同名','');const g=compileCode('scratch.script({},()=>{scratch.data_variable({VARIABLE:"同名"});});',{schema});assert.equal(Object.values(g.blocks)[0].fields.VARIABLE.id,undefined);assert.throws(()=>planReferences(f.vm,f.target,g),e=>e.code==='AMBIGUOUS_REFERENCE');
});
test('self-contained b2s preserves an explicit reference despite ambiguous names',()=>{
 const f=fixture();f.target.createVariable('local','同名','');f.stage.createVariable('global','同名','');const g=graph(v('同名','global')),text=exportCode(g.blocks,g.scripts),rebuilt=compileCode(text,{schema});assert.match(text,/references/);assert.equal(planReferences(f.vm,f.target,rebuilt).length,0);assert.equal(Object.values(rebuilt.blocks)[0].fields.VARIABLE.id,'global');
});
test('editing a reference name does not silently retain the previous ID',()=>{
 const f=fixture();f.target.createVariable('old','同名','');f.stage.createVariable('new','新しい名前','');const g=graph(v('同名','old')),text=exportCode(g.blocks,g.scripts).replace('"VARIABLE": "同名"','"VARIABLE": "新しい名前"'),rebuilt=compileCode(text,{base:g.blocks,schema});assert.equal(planReferences(f.vm,f.target,rebuilt).length,0);assert.equal(Object.values(rebuilt.blocks)[0].fields.VARIABLE.id,'new');
});
test('wrong reference ID/name/type or another sprite private ID fails clearly',()=>{
 const f=fixture();f.target.createVariable('list','名前','list');f.other.createVariable('private','他の専用','');for(const g of [graph(v('名前','list')),graph(v('違う名前','list')),graph(v('他の専用','private'))])assert.throws(()=>planReferences(f.vm,f.target,g),e=>e.code==='REFERENCE_CONFLICT');
});
test('new IDs avoid all project IDs and invalid names leave the VM unchanged',()=>{
 const f=fixture();f.other.createVariable('taken','別の変数','');const ids=['taken','fresh'],p=planReferences(f.vm,f.target,graph(v('新規')),{uid:()=>ids.shift()});assert.equal(p[0].id,'fresh');const before=snapshot(f);for(const name of ['', ' ', '\n\t',null,'不正\u0000名','不正\ud800名'])assert.throws(()=>planReferences(f.vm,f.target,graph(v(name))),e=>e.code==='INVALID_REFERENCE');assert.equal(snapshot(f),before);
});
test('extension labels/procedure arguments are not variables; broadcasts are stage-owned',()=>{
 const f=fixture(),g=graph(['tm2scratch_example','LIST','ラベル'],['argument_reporter_string_number','VALUE','引数'],v('開始'),l('開始'),['event_broadcast_menu','BROADCAST_OPTION','開始']),p=planReferences(f.vm,f.target,g);assert.equal(p.length,3);assert.ok(p.every(a=>a.name==='開始'));assert.equal(p.find(a=>a.type==='broadcast_msg').target,f.stage);
});
test('partially failing creation restores existing data and removes all new assets',()=>{
 const f=fixture();f.target.createVariable('keep','既存','list');f.target.variables.keep.value=['保持'];const before=snapshot(f),g=graph(v('追加1'),l('追加2')),p=planReferences(f.vm,f.target,g),create=f.target.createVariable.bind(f.target);let count=0;f.target.createVariable=(...args)=>{create(...args);f.target.variables.keep.value.push('変更');if(++count===2)throw Error('create failed after insert');};assert.throws(()=>commitGraph(f.vm,f.target,g,p),/create failed/);assert.equal(snapshot(f),before);
});
test('workspace failure restores blocks and both existing and new variable data',()=>{
 const f=fixture();f.stage.createVariable('keep','既存','');f.stage.variables.keep.value=99;const before=snapshot(f),g=graph(v('追加'),l('追加一覧')),p=planReferences(f.vm,f.target,g);let count=0;f.vm.emitWorkspaceUpdate=()=>{if(++count===1){f.stage.variables.keep.value=-1;throw Error('workspace failed');}};assert.throws(()=>commitGraph(f.vm,f.target,g,p),/workspace failed/);assert.equal(snapshot(f),before);
});
test('stale plans never overwrite an existing asset, even in another sprite',()=>{
 const f=fixture(),g=graph(v('新規')),p=planReferences(f.vm,f.target,g);f.other.createVariable(p[0].id,'別の名前','');f.other.variables[p[0].id].value=123;const before=snapshot(f);assert.throws(()=>commitGraph(f.vm,f.target,g,p),e=>e.code==='STALE_PREVIEW');assert.equal(snapshot(f),before);
});
test('Undo removes only unused creations, preserving existing values',()=>{
 const f=fixture();f.target.createVariable('keep','既存','');f.target.variables.keep.value=9;const before=snapshot(f),g=graph(v('新規'),l('新規リスト')),item=commitGraph(f.vm,f.target,g,planReferences(f.vm,f.target,g));assert.deepEqual(undoGraph(f.vm,f.target,item),[]);assert.equal(snapshot(f),before);
});
test('Undo keeps assets now referenced by another sprite or sensing_of by name',()=>{
 for(const byName of [false,true]){const f=fixture(),g=graph(v('共有された変数')),item=commitGraph(f.vm,f.target,g,planReferences(f.vm,f.target,g)),asset=item.variables[0];f.other.blocks._blocks=byName?{of:{opcode:'sensing_of',fields:{PROPERTY:{value:asset.name}},inputs:{}}}:graph(v(asset.name,asset.id)).blocks;assert.equal(undoGraph(f.vm,f.target,item).length,1);assert.ok(f.target.variables[asset.id]);assert.deepEqual(f.target.blocks._blocks,{});}
});
test('Undo refuses to overwrite later block edits and rolls back rendering failure',()=>{
 const f=fixture(),g=graph(v('新規')),item=commitGraph(f.vm,f.target,g,planReferences(f.vm,f.target,g));f.target.blocks._blocks.extra={opcode:'looks_say',fields:{},inputs:{}};const before=snapshot(f);assert.throws(()=>undoGraph(f.vm,f.target,item),e=>e.code==='STALE_UNDO');assert.equal(snapshot(f),before);delete f.target.blocks._blocks.extra;const applied=snapshot(f);let count=0;f.vm.emitWorkspaceUpdate=()=>{if(++count===1)throw Error('undo render failed');};assert.throws(()=>undoGraph(f.vm,f.target,item),/undo render failed/);assert.equal(snapshot(f),applied);
});
test('source/target/project changes still invalidate previews',()=>{
 const p={source:'code',targetId:'sprite',context:'before'};for(const update of [{source:'changed'},{targetId:'stage'},{context:'changed'}])assert.throws(()=>assertPreview(p,{...p,...update}),e=>e.code==='STALE_PREVIEW');
});
test('many existing variables do not duplicate a reused or repeated missing name',()=>{
 const f=fixture();for(let i=0;i<1000;i++)f.target.createVariable('id'+i,'変数 '+i,'');f.target.variables.id999.value=999;const g=graph(...Array.from({length:100},()=>v('変数 999')),...Array.from({length:100},()=>l('新規リスト'))),before=snapshot(f),p=planReferences(f.vm,f.target,g);assert.equal(p.length,1);assert.equal(p[0].name,'新規リスト');assert.equal(snapshot(f),before);
});
test('compact sb3 reporter optional flags survive both baseline and self-contained roundtrips',()=>{
 const blocks={s:{id:'s',opcode:'looks_say',fields:{},inputs:{MESSAGE:{name:'MESSAGE',block:'v',shadow:null}},next:null,parent:null,topLevel:true,shadow:false,x:30,y:30},v:{id:'v',opcode:'data_variable',fields:{VARIABLE:{name:'VARIABLE',value:'同名',id:'saved-id'}},inputs:{},next:null,parent:'s',shadow:false}};
 const code=exportCode(blocks,['s']),definitions=op=>op==='looks_say'?{fields:{},inputs:{MESSAGE:{}}}:{fields:{VARIABLE:{name:'VARIABLE',value:'同名'}},inputs:{}};
 for(const base of [blocks,{}]){const result=compileCode(code,{base,schema:definitions});assert.deepEqual(JSON.parse(JSON.stringify(result.blocks)),blocks);assert.equal(Object.hasOwn(result.blocks.v,'topLevel'),false);}
});

test('workspace imports preserve verified duplicate-name IDs and restore public API methods',()=>{
 const f=fixture();f.target.createVariable('local','同名','');f.stage.createVariable('global','同名','');
 const models=[],prototype={getVariable(name,type=''){return models.find(v=>v.name===name&&v.type===type);},getVariableById(id){return models.find(v=>v.id===id);},createVariable(name,type='',id){let v=this.getVariable(name,type);if(v)return v;v={name,type,id};models.push(v);return v;}};
 const map=Object.create(prototype),workspace={getVariableMap:()=>map};
 withWorkspaceReferenceIds(f.vm={...f.vm,editingTarget:f.target},workspace,()=>{map.createVariable('同名','','global');map.createVariable('同名','','local');});
 assert.deepEqual(models.map(v=>v.id),['global','local']);assert.equal(Object.hasOwn(map,'createVariable'),false);assert.equal(Object.hasOwn(map,'getVariable'),false);
 assert.throws(()=>withWorkspaceReferenceIds(f.vm,workspace,()=>{throw Error('import failed');}),/import failed/);assert.equal(Object.hasOwn(map,'createVariable'),false);
});
