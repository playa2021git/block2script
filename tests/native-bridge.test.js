import test from 'node:test';
import assert from 'node:assert/strict';
import {exportCode,compileCode} from '../native-scratch/bridge.js';
const number=(id,parent,value)=>({id,opcode:'math_number',fields:{NUM:{name:'NUM',value}},inputs:{},next:null,parent,topLevel:false,shadow:true});
const schemas={
 motion_movesteps:{STEPS:{shadow:number('tmp',null,10)}},
 control_repeat:{TIMES:{shadow:number('tmp',null,10)},SUBSTACK:{statement:true}},
 looks_say:{MESSAGE:{shadow:{opcode:'text',fields:{TEXT:{name:'TEXT',value:''}},inputs:{}}}},
};
const schema=opcode=>({fields:opcode==='event_whenkeypressed'?{KEY_OPTION:{name:'KEY_OPTION',value:'space'}}:{},inputs:schemas[opcode]??{}});
test('native block graph round trip preserves IDs, shadows, positions and fields',()=>{
 const blocks={
  flag:{id:'flag',opcode:'event_whenflagclicked',inputs:{},fields:{},next:'loop',parent:null,topLevel:true,shadow:false,x:88,y:99},
  loop:{id:'loop',opcode:'control_repeat',inputs:{TIMES:{name:'TIMES',block:'num',shadow:'num'},SUBSTACK:{name:'SUBSTACK',block:'move',shadow:null}},fields:{},next:null,parent:'flag',topLevel:false,shadow:false},
  num:number('num','loop','10'),
  move:{id:'move',opcode:'motion_movesteps',inputs:{STEPS:{name:'STEPS',block:'steps',shadow:'steps'}},fields:{},next:null,parent:'loop',topLevel:false,shadow:false,comment:'c1'},steps:number('steps','move','20'),
 };
 const code=exportCode(blocks,['flag']);const graph=compileCode(code,{base:blocks,schema});assert.deepEqual(JSON.parse(JSON.stringify(graph.blocks)),blocks);assert.deepEqual(graph.scripts,['flag']);
 const changed=compileCode(code.replace('"STEPS": "20"','"STEPS": 50'),{base:blocks,schema});assert.equal(changed.blocks.steps.fields.NUM.value,50);assert.equal(changed.blocks.move.comment,'c1');
});
test('generic extensions, procedure mutation and variable identifiers are preserved',()=>{
 const blocks={custom:{id:'custom',opcode:'extension-special',inputs:{},fields:{VARIABLE:{name:'VARIABLE',id:'v123',value:'score',variableType:''}},mutation:{tagName:'mutation',children:[],proccode:'test %s',argumentids:'["arg"]',warp:'true'},shadow:false,topLevel:true,parent:null,next:null,x:30,y:40,disabled:false}};
 assert.deepEqual(JSON.parse(JSON.stringify(compileCode(exportCode(blocks,['custom']),{base:blocks,schema}).blocks)),blocks);
});
test('new AI-authored JavaScript creates real Scratch opcodes and shadows',()=>{
 let count=0;const graph=compileCode('scratch.script({x: 40, y: 50}, () => { scratch.event_whenflagclicked({}); scratch.motion_movesteps({STEPS: 50}); });',{schema,uid:()=>String(++count)});
 assert.equal(graph.blocks['1'].opcode,'event_whenflagclicked');assert.equal(graph.blocks['2'].opcode,'motion_movesteps');assert.equal(graph.blocks['3'].fields.NUM.value,50);assert.equal(graph.blocks['1'].next,'2');assert.equal(graph.blocks['1'].x,40);
});
test('annotated source is self-contained without baseline',()=>{
 const blocks={say:{id:'say',opcode:'looks_say',inputs:{MESSAGE:{name:'MESSAGE',block:'text',shadow:'text'}},fields:{},next:null,parent:null,topLevel:true,shadow:false,x:40,y:60},text:{id:'text',opcode:'text',inputs:{},fields:{TEXT:{name:'TEXT',value:'hello */ world'}},next:null,parent:'say',topLevel:false,shadow:true}};
 const code=exportCode(blocks,['say']);assert.doesNotThrow(()=>compileCode(code,{schema}));assert.deepEqual(JSON.parse(JSON.stringify(compileCode(code,{schema}).blocks)),blocks);
});
test('reject arbitrary JavaScript and duplicate block IDs before mutation',()=>{
 for(const code of ['alert(1);','scratch.script({}, () => { fetch("url"); });','scratch.script({}, () => { let x = 1; });','scratch.script({}, () => { scratch.motion_movesteps({STEPS: 10}, {id:"x"}); scratch.motion_movesteps({STEPS: 20},{id:"x"}); });'])assert.throws(()=>compileCode(code,{schema}));
});
