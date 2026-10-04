import {parse} from 'acorn';
const clone=v=>structuredClone(v);
const own=(o,k)=>Object.hasOwn(o,k);
const primitive={math_number:'NUM',math_integer:'NUM',math_whole_number:'NUM',math_positive_number:'NUM',math_angle:'NUM',text:'TEXT',colour_picker:'COLOUR'};
const literalCode=v=>JSON.stringify(v);
const method=opcode=>/^[a-zA-Z_$][\w$]*$/.test(opcode)?`scratch.${opcode}`:`scratch[${literalCode(opcode)}]`;
const cleanMeta=b=>Object.fromEntries(Object.entries(b).filter(([k])=>!['opcode','inputs','fields','next','parent','topLevel','x','y','shadow'].includes(k)));
export function exportCode(blocks,scripts){
 const visited=new Set();
 function call(id,depth,chainSeen=new Set()){
  const b=blocks[id];if(!b)throw new Error(`接続先ブロック ${id} がありません`);
  if(chainSeen.has(id))throw new Error('循環したブロック接続を検出しました');chainSeen.add(id);visited.add(id);
  const args=[];
  for(const [key,input] of Object.entries(b.inputs??{})){
   let code='null';const child=blocks[input.block];
   if(child){
    if(key.startsWith('SUBSTACK'))code=`() => {\n${stack(input.block,depth+1,new Set(chainSeen))}\n${'  '.repeat(depth)}}`;
    else if(child.shadow&&primitive[child.opcode]){visited.add(child.id);code=literalCode(child.fields[primitive[child.opcode]].value);}
    else code=call(input.block,depth,new Set(chainSeen));
   }
   args.push(`${JSON.stringify(key)}: ${code}`);
  }
  for(const [key,field] of Object.entries(b.fields??{}))args.push(`${JSON.stringify(key)}: ${literalCode(field.value)}`);
  const meta=cleanMeta(b);delete meta.id;meta.id=b.id;
  if(b.shadow)meta.shadow=true;
  // Keep shadow definitions in the source too, so pasted code remains self-contained.
  const shadows={};for(const [key,input] of Object.entries(b.inputs??{}))if(input.shadow&&blocks[input.shadow]){
   const ids=new Set();const collect=id=>{if(!id||ids.has(id)||!blocks[id])return;ids.add(id);for(const i of Object.values(blocks[id].inputs??{})){collect(i.block);collect(i.shadow);}collect(blocks[id].next);};collect(input.shadow);
   shadows[key]=Object.fromEntries([...ids].map(id=>[id,clone(blocks[id])]));
  }
  if(Object.keys(shadows).length)meta.shadows=shadows;
  const compactMeta=JSON.stringify(meta).replaceAll('*/','*\\u002f');
  return `${method(b.opcode)}({${args.join(', ')}}) /*@scratch ${compactMeta}*/`;
 }
 function stack(id,depth,seen=new Set()){
  const lines=[];while(id){if(seen.has(id))throw new Error('循環したブロック接続を検出しました');lines.push('  '.repeat(depth)+call(id,depth,new Set(seen))+';');seen.add(id);id=blocks[id].next;}return lines.join('\n');
 }
 const roots=scripts?.length?scripts:Object.values(blocks).filter(b=>b.topLevel&&!b.shadow).map(b=>b.id);
 return roots.filter(id=>blocks[id]).map(id=>`scratch.script(${JSON.stringify({x:blocks[id].x??30,y:blocks[id].y??30})}, () => {\n${stack(id,1)}\n});`).join('\n\n');
}

export function compileCode(code,{base={},schema=()=>null,uid=()=>crypto.randomUUID()}={}){
 const comments=[];let ast;try{ast=parse(code,{ecmaVersion:'latest',locations:true,onComment:comments});}catch(e){throw new Error(`${e.loc?.line??1}行目: JavaScriptの構文を確認してください`);}
 const result=Object.create(null),scripts=[],used=new Set();
 const fail=(n,msg)=>{throw new Error(`${n?.loc?.start?.line??1}行目: ${msg}`);};
 function staticValue(n){
  if(!n) return undefined;
  if(n.type==='Literal'&&['string','number','boolean'].includes(typeof n.value)||n?.type==='Literal'&&n.value===null)return n.value;
  if(n.type==='UnaryExpression'&&n.operator==='-'&&n.argument.type==='Literal'&&typeof n.argument.value==='number')return -n.argument.value;
  if(n.type==='ArrayExpression')return n.elements.map(staticValue);
  if(n.type==='ObjectExpression'){const o=Object.create(null);for(const p of n.properties){if(p.type!=='Property'||p.computed||p.kind!=='init'||p.method)fail(p,'通常のオブジェクトプロパティを使ってください');const key=p.key.name??p.key.value;if(own(o,key))fail(p,`「${key}」が重複しています`);o[key]=staticValue(p.value);}return o;}
  return fail(n,'この値には数値・文字列・配列・オブジェクトを使ってください');
 }
 function properties(n){if(n?.type!=='ObjectExpression')fail(n,'引数は {STEPS: 10} のようなオブジェクトで指定してください');return Object.fromEntries(n.properties.map(p=>{if(p.type!=='Property'||p.computed||p.kind!=='init'||p.method)fail(p,'通常のプロパティを使ってください');return [p.key.name??p.key.value,p.value];}));}
 function callName(n){if(n?.type!=='CallExpression'||n.callee.type!=='MemberExpression'||n.callee.object.name!=='scratch')fail(n,'scratch.ブロック名(...) の形で書いてください');return n.callee.computed?staticValue(n.callee.property):n.callee.property.name;}
 const isCallback=n=>['ArrowFunctionExpression','FunctionExpression'].includes(n?.type);
 function callback(n,parent){if(!isCallback(n)||n.params.length||n.body.type!=='BlockStatement'||n.async)fail(n,'() => { ... } の形で書いてください');return stack(n.body.body,parent);}
 function adoptShadow(shadowMap,parent){for(const [id,b] of Object.entries(shadowMap??{})){if(!result[id])result[id]=clone(b);}const roots=Object.values(shadowMap??{}).filter(b=>!own(shadowMap,b.parent));for(const b of roots)if(result[b.id])result[b.id].parent=parent;return roots[0]?.id;}
 function block(n,parent,topLevel=false){
  const opcode=callName(n);if(opcode==='script')fail(n,'script は一番外側に書いてください');
  if(n.arguments.length<1||n.arguments.length>2)fail(n,'第1引数に入力値、第2引数にブロック情報を指定してください');
  const annotation=comments.find(c=>c.start>=n.end&&c.value.trimStart().startsWith('@scratch ')&&/^\s*$/.test(code.slice(n.end,c.start)));
  let storedMeta;try{storedMeta=annotation?JSON.parse(annotation.value.trimStart().slice(9)):undefined;}catch{fail(n,'Scratchメタデータのコメントが不正です');}
  const args=properties(n.arguments[0]),meta=staticValue(n.arguments[1])??storedMeta??{},id=meta.id??uid();
  if(typeof id!=='string'||used.has(id))fail(n,'ブロックIDが重複しているか不正です');used.add(id);
  const old=base[id],def=schema(opcode,meta);
  if(!old&&!def)fail(n,`「${opcode}」はScratchに登録されていません。拡張機能を先に読み込んでください`);
  if(old&&old.opcode!==opcode)fail(n,'ブロックの種類を変える場合は第2引数の id を削除してください');
  const b=old?clone(old):{id,opcode,inputs:{},fields:{},next:null,parent:null,shadow:false,topLevel:false};
  const {shadows,...rest}=meta;Object.assign(b,rest,{id,opcode,next:null,parent,topLevel,inputs:{},fields:clone(old?.fields??def?.fields??{})});
  delete b.x;delete b.y;
  if(meta.mutation)b.mutation=clone(meta.mutation);
  const fields=new Set([...Object.keys(old?.fields??{}),...Object.keys(def?.fields??{})]);
  const inputs=new Set(Object.keys(old?.inputs??def?.inputs??{}));
  if(opcode==='procedures_call'&&b.mutation?.argumentids)for(const key of JSON.parse(b.mutation.argumentids))inputs.add(key);
  result[id]=b;
  for(const key of Object.keys(args)){
   if(fields.has(key)){
    const value=staticValue(args[key]);if(value===null||typeof value==='object')fail(args[key],`${key} のフィールドには文字列か数値を指定してください`);
    b.fields[key]={...b.fields[key],name:key,value};continue;
   }
   if(!inputs.has(key)&&!old)fail(args[key],`ブロック「${opcode}」に入力「${key}」はありません`);
   const value=args[key],prior=old?.inputs?.[key],template=def?.inputs?.[key];
   let shadow=adoptShadow(shadows?.[key],id);
   if(!shadow&&prior?.shadow){const collect=child=>{if(!child||!base[child]||result[child])return;result[child]=clone(base[child]);for(const i of Object.values(base[child].inputs??{})){collect(i.block);collect(i.shadow);}};collect(prior.shadow);shadow=prior.shadow;if(result[shadow])result[shadow].parent=id;}
   let child=null;
   if(isCallback(value)){child=callback(value,id);if(shadow)fail(value,'命令の中にはシャドーブロックを置けません');}
   else if(value.type==='CallExpression')child=block(value,id);
   else {
    const v=staticValue(value);
    if(v!==null){
     const templateBlock=shadow&&result[shadow]?result[shadow]:template?.shadow;
     const op=templateBlock?.opcode??(typeof v==='number'?'math_number':'text');
     const fieldName=primitive[op]??Object.keys(templateBlock?.fields??{})[0];
     if(!fieldName)fail(value,`${key} はブロック式で指定してください`);
     child=shadow??uid();const shadowBlock=templateBlock?clone(templateBlock):{opcode:op,fields:{},inputs:{}};
     Object.assign(shadowBlock,{id:child,parent:id,next:null,topLevel:false,shadow:true});shadowBlock.fields[fieldName]={...shadowBlock.fields[fieldName],name:fieldName,value:v};result[child]=shadowBlock;shadow=child;
    }
   }
   b.inputs[key]={name:key,block:child,shadow:shadow??null};
  }
  for(const key of inputs)if(!own(b.inputs,key)){
   if(key.startsWith('SUBSTACK'))b.inputs[key]={name:key,block:null,shadow:null};
   else fail(n,`入力「${key}」がありません。既存の入力を省略せず指定してください`);
  }
  return id;
 }
 function stack(nodes,parent){let first=null,previous=null;for(const n of nodes){if(n.type==='EmptyStatement')continue;if(n.type!=='ExpressionStatement')fail(n,'scratchの命令を並べてください。通常のJavaScript文はブロック変換できません');const id=block(n.expression,previous??parent,!previous&&!parent);if(!first)first=id;if(previous)result[previous].next=id;previous=id;}return first;}
 for(const n of ast.body){if(n.type==='EmptyStatement')continue;if(n.type!=='ExpressionStatement'||callName(n.expression)!=='script')fail(n,'scratch.script({x: 30, y: 30}, () => { ... }); の中にブロックを書いてください');const c=n.expression;if(c.arguments.length!==2)fail(n,'scriptには位置と命令の関数を指定してください');const pos=staticValue(c.arguments[0]);const id=callback(c.arguments[1],null);if(id){result[id].x=pos.x??30;result[id].y=pos.y??30;scripts.push(id);}}
 const reachable=new Set();function walk(id){if(!id||reachable.has(id))return;if(!result[id])throw new Error(`ブロック ${id} の接続が不正です`);reachable.add(id);const b=result[id];for(const i of Object.values(b.inputs)){walk(i.block);walk(i.shadow);}walk(b.next);}scripts.forEach(walk);
 for(const id of Object.keys(result))if(!reachable.has(id))delete result[id];
 return {blocks:result,scripts};
}

export function applyGraph(vm,target,graph){
 const before={blocks:clone(target.blocks._blocks),scripts:[...target.blocks._scripts]};
 vm.stopAll();
 try{target.blocks._blocks=clone(graph.blocks);target.blocks._scripts=[...graph.scripts];target.blocks.resetCache();vm.emitWorkspaceUpdate();vm.runtime.emitProjectChanged();}
 catch(e){target.blocks._blocks=before.blocks;target.blocks._scripts=before.scripts;target.blocks.resetCache();vm.emitWorkspaceUpdate();throw e;}
 return before;
}
