// Only Scratch variable fields are references; extension arguments named LIST,
// procedure arguments, and ordinary text are not variable declarations.
export function referenceType(opcode,key){
 if(key==='VARIABLE'&&(opcode.startsWith('data_')||opcode==='control_for_each'))return '';
 if(key==='LIST'&&opcode.startsWith('data_'))return 'list';
 if(key==='BROADCAST_OPTION'&&['event_broadcast_menu','event_whenbroadcastreceived'].includes(opcode))return 'broadcast_msg';
 return null;
}
const originals=vm=>(vm.runtime.targets??[]).filter(t=>t.isOriginal!==false);
const problem=(code,message,name)=>Object.assign(new Error(message),{code,names:[name]});

// Mutate only the proposed graph, never a VM target or Blockly's variable map.
export function planReferences(vm,target,graph,{uid=()=>crypto.randomUUID()}={}){
 const stage=vm.runtime.getTargetForStage(),targets=[...new Set([...originals(vm),target,stage].filter(Boolean))];
 const reserved=new Set(targets.flatMap(t=>Object.keys(t.variables))),pending=[];
 for(const block of Object.values(graph.blocks))for(const [key,field] of Object.entries(block.fields??{})){
  const type=referenceType(block.opcode,key);if(type===null)continue;
  if(typeof field.value!=='string'||!field.value.trim())throw problem('INVALID_REFERENCE','変数・リスト・メッセージには、空欄ではない名前を指定してください',String(field.value??''));
  if(/[\u0000-\u001f\u007f\ufffe\uffff]/.test(field.value)||[...field.value].some(c=>c.codePointAt(0)>=0xd800&&c.codePointAt(0)<=0xdfff))throw problem('INVALID_REFERENCE','名前には改行や制御文字、読み取れない文字を使えません',field.value);
  const name=field.value,containers=[...new Set(type==='broadcast_msg'?[stage]:[target,stage])];
  let variable;
  if(field.id){
   const matches=containers.map(t=>Object.hasOwn(t.variables,field.id)?t.variables[field.id]:null).filter(Boolean);
   if(matches.length>1)throw problem('AMBIGUOUS_REFERENCE',`「${name}」の参照先を一つに決められません`,name);
   variable=matches[0];
   if(variable&&(variable.name!==name||variable.type!==type))throw problem('REFERENCE_CONFLICT',`「${name}」の名前・種類と、保存されている参照先が一致しません`,name);
   if(!variable&&targets.some(t=>!containers.includes(t)&&Object.hasOwn(t.variables,field.id)))throw problem('REFERENCE_CONFLICT',`「${name}」は別のスプライト専用です。現在の対象からは使えません`,name);
  }
  if(!variable){
   const matches=containers.flatMap(t=>Object.values(t.variables).filter(v=>v.name===name&&v.type===type));
   if(matches.length>1)throw problem('AMBIGUOUS_REFERENCE',`「${name}」がこのスプライト用と全体用などに複数あります。使うものを選んだブロックからScriptを取り出してください`,name);
   variable=matches[0];
  }
  if(!variable){
   const owner=type==='broadcast_msg'?stage:target;
   variable=pending.find(p=>p.target===owner&&p.name===name&&p.type===type);
   if(!variable){
    let id;for(let attempts=0;attempts<100;attempts++){id=uid();if(typeof id==='string'&&id&&!reserved.has(id))break;id=null;}
    if(!id)throw problem('REFERENCE_CONFLICT','新しい名前を安全に登録できません。もう一度検証してください',name);
    reserved.add(id);variable={id,name,type,target:owner};pending.push(variable);
   }
  }
  field.id=variable.id;if(type!=='broadcast_msg')field.variableType=type;
 }
 return pending;
}

export function variableIsReferenced(vm,asset){
 for(const target of vm.runtime.targets??[])for(const block of Object.values(target.blocks?._blocks??{})){
  for(const [key,field] of Object.entries(block.fields??{}))if(referenceType(block.opcode,key)===asset.type&&field.id===asset.id)return true;
  // "attribute of sprite" can read a variable by name, including via a dynamic
  // target reporter. Conservatively keep the asset when that name is in use.
  if(asset.type===''&&block.opcode==='sensing_of'&&String(block.fields.PROPERTY?.value)===asset.name)return true;
 }
 return false;
}

// Scratch Blocks 1.1.6 normally coalesces equal names before checking IDs.
// During a VM->workspace import only, match verified VM assets by ID instead.
// Use its public creation API; do not rename assets or patch global prototypes.
export function withWorkspaceReferenceIds(vm,workspace,action){
 const map=workspace?.getVariableMap();if(!map||!vm.editingTarget)return action();
 const create=map.createVariable,ownCreate=Object.hasOwn(map,'createVariable');
 map.createVariable=function(name,type,id,...rest){
  const expectedType=type||'',owners=[vm.editingTarget,vm.runtime.getTargetForStage()].filter(Boolean);
  const verified=id&&owners.some(t=>Object.hasOwn(t.variables,id)&&t.variables[id].name===name&&t.variables[id].type===expectedType);
  if(!verified)return create.call(this,name,type,id,...rest);
  const lookup=this.getVariable,ownLookup=Object.hasOwn(this,'getVariable');
  this.getVariable=function(searchName,searchType){return searchName===name&&(searchType||'')===expectedType?this.getVariableById(id):lookup.call(this,searchName,searchType);};
  try{return create.call(this,name,type,id,...rest);}
  finally{if(ownLookup)this.getVariable=lookup;else delete this.getVariable;}
 };
 try{return action();}finally{if(ownCreate)map.createVariable=create;else delete map.createVariable;}
}
