import * as Blockly from 'blockly';
import * as Ja from 'blockly/msg/ja';
import {commands,literal} from './model.js';
Blockly.setLocale(Ja);
const value=name=>({type:'input_value',name});
const text=(name,text)=>({type:'field_input',name,text});
const statement=name=>({type:'input_statement',name});
const dropdown=(name,options)=>({type:'field_dropdown',name,options});
const defs=[];
for(const [name,c] of Object.entries(commands))defs.push({type:`sp_${name}`,message0:c.label,args0:c.args.map((_,i)=>value(`A${i}`)),previousStatement:null,nextStatement:null,colour:c.color,inputsInline:true});
defs.push(
 {type:'sp_flag',message0:'🚩 が押されたとき',nextStatement:null,colour:'#ffbf00'},
 {type:'sp_key',message0:'%1 キーが押されたとき',args0:[text('KEY','ArrowRight')],nextStatement:null,colour:'#ffbf00'},
 {type:'sp_message',message0:'メッセージ %1 を受け取ったとき',args0:[text('KEY','スタート')],nextStatement:null,colour:'#ffbf00'},
 {type:'sp_repeat',message0:'%1 回繰り返す',args0:[value('COUNT')],message1:'%1',args1:[statement('BODY')],previousStatement:null,nextStatement:null,colour:'#ffab19'},
 {type:'sp_forever',message0:'ずっと',message1:'%1',args1:[statement('BODY')],previousStatement:null,nextStatement:null,colour:'#ffab19'},
 {type:'sp_if',message0:'もし %1 なら',args0:[value('TEST')],message1:'%1',args1:[statement('BODY')],message2:'でなければ %1',args2:[statement('ELSE')],previousStatement:null,nextStatement:null,colour:'#ffab19'},
 {type:'sp_num',message0:'%1',args0:[{type:'field_number',name:'VALUE',value:10}],output:null,colour:'#ffffff'},
 {type:'sp_text',message0:'%1',args0:[text('VALUE','こんにちは！')],output:null,colour:'#ffffff'},
 {type:'sp_bool',message0:'%1',args0:[dropdown('VALUE',[['真','true'],['偽','false']])],output:null,colour:'#59c059'},
 {type:'sp_binary',message0:'%1 %2 %3',args0:[value('LEFT'),dropdown('OP',['+','-','*','/','%','<','>','<=','>=','===','!==','&&','||'].map(v=>[v,v])),value('RIGHT')],inputsInline:true,output:null,colour:'#59c059'},
 {type:'sp_unary',message0:'%1 %2',args0:[dropdown('OP',[['マイナス','-'],['ではない','!']]),value('VALUE')],output:null,colour:'#59c059'},
 {type:'sp_variable',message0:'変数 %1',args0:[value('A0')],output:null,colour:'#ff8c1a'},
 {type:'sp_random',message0:'%1 から %2 までの乱数',args0:[value('A0'),value('A1')],output:null,inputsInline:true,colour:'#59c059'},
 {type:'sp_keyPressed',message0:'%1 キーが押されている',args0:[value('A0')],output:null,colour:'#5cb1d6'},
 ...[['xPosition','x座標'],['yPosition','y座標'],['direction','向き']].map(([name,label])=>({type:`sp_${name}`,message0:label,output:null,colour:'#4c97ff'}))
);
Blockly.defineBlocksWithJsonArray(defs);
function exprState(e){
 if(e.kind==='literal')return {type:typeof e.value==='number'?'sp_num':typeof e.value==='boolean'?'sp_bool':'sp_text',fields:{VALUE:typeof e.value==='boolean'?String(e.value):e.value}};
 if(e.kind==='binary')return {type:'sp_binary',fields:{OP:e.op},inputs:{LEFT:{block:exprState(e.left)},RIGHT:{block:exprState(e.right)}}};
 if(e.kind==='unary')return {type:'sp_unary',fields:{OP:e.op},inputs:{VALUE:{block:exprState(e.value)}}};
 return {type:`sp_${e.name}`,inputs:Object.fromEntries(e.args.map((a,i)=>[`A${i}`,{block:exprState(a)}]))};
}
const input=(e,shadow=false)=>({[shadow?'shadow':'block']:exprState(e)});
function chain(nodes){let next;for(const n of [...nodes].reverse()){
 let b={type:`sp_${n.kind}`,inputs:{}};
 if(n.kind==='command'){b.type=`sp_${n.name}`;n.args.forEach((a,i)=>b.inputs[`A${i}`]=input(a,a.kind==='literal'&&typeof a.value!=='boolean'));}
 if(n.kind==='repeat')b.inputs.COUNT=input(n.count,n.count.kind==='literal');
 if(n.kind==='if'){b.inputs.TEST=input(n.test);if(n.elseBody.length)b.inputs.ELSE={block:chain(n.elseBody)};}
 if(n.body?.length)b.inputs.BODY={block:chain(n.body)};
 if(next)b.next={block:next};next=b;
 }return next;
}
export function programState(program){return {blocks:{languageVersion:0,blocks:program.map((e,i)=>({type:e.name==='whenGreenFlag'?'sp_flag':e.name==='onKey'?'sp_key':'sp_message',fields:e.trigger?{KEY:e.trigger}:undefined,x:45+i*330,y:40,next:e.body.length?{block:chain(e.body)}:undefined}))}};}
function readExpr(b){
 if(!b)return literal(0);
 const t=b.type.slice(3),f=n=>b.getFieldValue(n),a=n=>readExpr(b.getInputTargetBlock(n));
 if(t==='num')return literal(Number(f('VALUE')));
 if(t==='text')return literal(f('VALUE'));
 if(t==='bool')return literal(f('VALUE')==='true');
 if(t==='binary')return {kind:'binary',op:f('OP'),left:a('LEFT'),right:a('RIGHT')};
 if(t==='unary')return {kind:'unary',op:f('OP'),value:a('VALUE')};
 const count={variable:1,random:2,keyPressed:1,xPosition:0,yPosition:0,direction:0}[t];
 if(count===undefined)throw new Error('式に使えないブロックです');
 return {kind:'reporter',name:t,args:Array.from({length:count},(_,i)=>a(`A${i}`))};
}
function readChain(b){const out=[];while(b){
 const t=b.type.slice(3),a=n=>readExpr(b.getInputTargetBlock(n));
 if(commands[t])out.push({kind:'command',name:t,args:commands[t].args.map((_,i)=>a(`A${i}`))});
 else if(t==='repeat'||t==='forever')out.push({kind:t,...(t==='repeat'?{count:a('COUNT')}:{}),body:readChain(b.getInputTargetBlock('BODY'))});
 else if(t==='if')out.push({kind:'if',test:a('TEST'),body:readChain(b.getInputTargetBlock('BODY')),elseBody:readChain(b.getInputTargetBlock('ELSE'))});
 else throw new Error('イベントの下には命令ブロックをつなげてください');
 b=b.getNextBlock();
 }return out;}
export function readProgram(ws){return ws.getTopBlocks(true).filter(b=>['sp_flag','sp_key','sp_message'].includes(b.type)).map(b=>({kind:'event',name:{sp_flag:'whenGreenFlag',sp_key:'onKey',sp_message:'onMessage'}[b.type],trigger:b.getFieldValue('KEY')??undefined,body:readChain(b.getNextBlock())}));}
function toolboxCommand(name){return {kind:'block',type:`sp_${name}`,inputs:Object.fromEntries(commands[name].args.map((v,i)=>[`A${i}`,input(literal(v),true)]))};}
const block=type=>({kind:'block',type:`sp_${type}`});
const cat=(name,colour,contents)=>({kind:'category',name,colour,contents});
export const toolbox={kind:'categoryToolbox',contents:[
 cat('動き','#4c97ff',['move','turn','goTo','point','changeX','changeY','bounce'].map(toolboxCommand)),
 cat('見た目','#9966ff',['say','sayFor','setSize','show','hide'].map(toolboxCommand)),
 cat('イベント','#ffbf00',[block('flag'),block('key'),block('message'),toolboxCommand('broadcast')]),
 cat('制御','#ffab19',[toolboxCommand('wait'),{...block('repeat'),inputs:{COUNT:input(literal(10),true)}},block('forever'),block('if'),toolboxCommand('stop')]),
 cat('調べる','#5cb1d6',[{...block('keyPressed'),inputs:{A0:input(literal('ArrowRight'),true)}},block('xPosition'),block('yPosition'),block('direction')]),
 cat('演算','#59c059',[block('num'),block('text'),block('bool'),{...block('binary'),inputs:{LEFT:input(literal(10),true),RIGHT:input(literal(5),true)}},block('unary'),{...block('random'),inputs:{A0:input(literal(1),true),A1:input(literal(10),true)}}]),
 cat('変数','#ff8c1a',[toolboxCommand('setVariable'),toolboxCommand('changeVariable'),{...block('variable'),inputs:{A0:input(literal('score'),true)}}])
]};
export {Blockly};
