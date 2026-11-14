import extensionPolicies from './extension-policies.json' with {type:'json'};
import {applyGraph} from './bridge.js';
import {variableIsReferenced} from './references.js';
function variableSnapshot(vm,target){
 const targets=[...new Set([...(vm.runtime.targets??[]).filter(t=>t.isOriginal!==false),target])];
 return targets.map(owner=>({owner,variables:Object.fromEntries(Object.entries(owner.variables??{}).map(([id,v])=>[id,{original:v,state:structuredClone(v)}]))}));
}
function restoreVariables(snapshot){
 for(const {owner,variables} of snapshot){
  for(const id of Object.keys(owner.variables))if(!Object.hasOwn(variables,id))owner.deleteVariable(id);
  for(const [id,{original,state}] of Object.entries(variables)){
   owner.variables[id]=original;Object.assign(original,structuredClone(state));
  }
 }
}
function rollback(vm,target,graph,variables){
 restoreVariables(variables);
 target.blocks._blocks=structuredClone(graph.blocks);target.blocks._scripts=[...graph.scripts];target.blocks.resetCache();
 vm.emitWorkspaceUpdate();vm.runtime.emitProjectChanged();
}
export function commitGraph(vm,target,graph,pending=[]){
 const item={targetId:target.id,graph:{blocks:structuredClone(target.blocks._blocks),scripts:[...target.blocks._scripts]},variables:[]};
 const variables=variableSnapshot(vm,target);
 try{
  // Never let a stale plan overwrite an existing asset, even if an ID was taken
  // by a different sprite after validation.
  const ids=new Set(variables.flatMap(v=>Object.keys(v.variables))),names=new Map();
  for(const variable of pending){
   if(!names.has(variable.target))names.set(variable.target,new Set());
   const key=JSON.stringify([variable.name,variable.type]);
   const stale=!variables.some(v=>v.owner===variable.target)||names.get(variable.target).has(key)||ids.has(variable.id)||Object.values(variable.target.variables).some(v=>v.name===variable.name&&v.type===variable.type);
   if(stale){const error=new Error('作品が変わりました。もう一度検証してください');error.code='STALE_PREVIEW';throw error;}
   ids.add(variable.id);names.get(variable.target).add(key);
  }
  for(const variable of pending){
   variable.target.createVariable(variable.id,variable.name,variable.type);
   const created=variable.target.variables[variable.id];
   if(!created||created.name!==variable.name||created.type!==variable.type)throw new Error('変数・リストを作成できませんでした');
   item.variables.push(variable);
  }
  applyGraph(vm,target,graph);
  item.appliedGraph={blocks:structuredClone(target.blocks._blocks),scripts:[...target.blocks._scripts]};
  return item;
 }catch(error){
  try{rollback(vm,target,item.graph,variables);}catch(rollbackError){error.rollbackError=rollbackError;}
  if(error.rollbackError)error.code='ROLLBACK_FAILED';else if(!error.code)error.code='APPLY_FAILED';
  throw error;
 }
}
export function undoGraph(vm,target,item){
 const before={blocks:structuredClone(target.blocks._blocks),scripts:[...target.blocks._scripts]},variables=variableSnapshot(vm,target),retained=[];
 const stable=value=>JSON.stringify(value,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
 if(item.appliedGraph&&stable(before)!==stable(item.appliedGraph)){const error=new Error('反映後にブロックが編集されたため、安全に戻せません。現在の作品を保存して確認してください');error.code='STALE_UNDO';throw error;}
 try{
  applyGraph(vm,target,item.graph);
  for(const asset of item.variables??[]){
   const owner=vm.runtime.getTargetById?.(asset.target.id)??asset.target,variable=owner.variables[asset.id];
   if(!variable)continue;
   if(variable.name!==asset.name||variable.type!==asset.type||variableIsReferenced(vm,asset)){retained.push(asset);continue;}
   owner.deleteVariable(asset.id);
  }
  vm.emitWorkspaceUpdate();vm.runtime.emitProjectChanged();return retained;
 }catch(error){try{rollback(vm,target,before,variables);}catch(rollbackError){error.rollbackError=rollbackError;}if(error.rollbackError)error.code='ROLLBACK_FAILED';throw error;}
}
export function assertPreview(preview,{source,targetId,context}){
 if(!preview||preview.source!==source||preview.targetId!==targetId||preview.context!==context){const error=new Error('コードまたは反映先が変わりました。もう一度検証してください');error.code='STALE_PREVIEW';throw error;}
 return preview;
}
export function studentError(error,dslName,{isExtensionLoaded}={}){
 const message=String(error?.message||error);
 let reason='構文や命令、入力値が、このアプリで使える形と異なる可能性があります。',next='コードを確認し、現在の命令一覧を使って書き直してから「検証」を押してください。';
 if(error.code==='BACKUP_FAILED'){reason='反映前の作品をブラウザーに保存できませんでした。';next='.sb3と未反映コードをファイルに保存し、ブラウザーの空き容量を確認してから再度試してください。';}
 else if(error.code==='STALE_PREVIEW'){reason='検証後にコード、スプライト、またはブロックが変更されました。';next='反映先を確認して、もう一度「検証」を押してください。';}
 else if(error.code==='APPLY_FAILED'){reason='変数・リストの作成やコード反映を完了できなかったため、作品を反映前の状態に戻しました。';next='現在の作品を保存してから、もう一度検証・反映してください。';}
 else if(error.code==='ROLLBACK_FAILED'){reason='反映に失敗し、画面の復元も完了できませんでした。';next='再実行せず、Scriptを保存して「復旧」から反映前の世代を選んでください。';}
 else if(error.code==='STALE_UNDO'){reason=message;next='現在の.sb3とScriptを保存し、必要なら「復旧」から反映前の世代を確認してください。';}
 else if(error.code==='MISSING_VARIABLE'){reason='必要な変数やリスト'+(error.names?.length?'「'+error.names.join('、')+'」':'')+'が反映先にありません。';next='ブロック画面で必要な変数やリストを作成してから、もう一度検証してください。';}
 else if(error.code==='AMBIGUOUS_REFERENCE'){reason=message;next='使いたい変数やリストをブロック側で選び、そのブロックから取り出したScriptを使って、もう一度検証してください。';}
 else if(error.code==='REFERENCE_CONFLICT'){reason=message;next='対象スプライトと変数・リストの名前を確認し、使いたいものを選んだブロックからScriptを取り出してください。';}
 else if(error.code==='INVALID_REFERENCE'){reason=message;next='変数・リスト・メッセージに空欄ではない名前を指定して、もう一度検証してください。';}
 else if(['SCRIPT_VALIDATION','SCRIPT_SYNTAX','UNKNOWN_ARGUMENT','INVALID_MENU','INVALID_CONNECTION'].includes(error.code)){
  reason=message.replace(/^\d+行目:\s*/,'');
  next=error.suggestions?.length?`「${error.argument}」の修正候補: ${error.suggestions.map(name=>'「'+name+'」').join('、')}。使える引数と照合して修正し、もう一度「検証」を押してください。`:error.code==='SCRIPT_SYNTAX'?'表示された位置の括弧・引用符・カンマを確認し、修正してからもう一度「検証」を押してください。':'上記の命令・引数・選択肢に合わせてコードを修正し、もう一度「検証」を押してください。';
 }
 else if(error.code==='TOO_LARGE'){reason='一度に反映するコードやブロックの量が多すぎます。';next='コードを小さく分けてから、もう一度検証してください。';}
 else if(error.code==='UNKNOWN_OPCODE'){
  const extension=extensionPolicies.find(info=>typeof error.opcode==='string'&&error.opcode.startsWith(info.id+'_'));
  if(extension&&isExtensionLoaded?.(extension.id)===false){
   reason=`「${error.opcode}」を使うための拡張機能「${extension.name}」がまだ追加されていません。`;
   next=`Scratch画面の左下にある「拡張機能」ボタンを押して、「${extension.name}」を選択してください。追加後、もう一度「検証」を押してください。`;
  }else{
   reason=`命令「${error.opcode}」が見つかりません。`;
   next=extension&&isExtensionLoaded?.(extension.id)===true?`拡張機能「${extension.name}」は追加済みです。AI用の命令一覧で命令名を確認し、修正してからもう一度「検証」を押してください。`:'AI用の命令一覧で命令名と必要な拡張機能を確認し、もう一度「検証」を押してください。';
  }
  if(error.suggestions?.length)next+=` 命令名の修正候補: ${error.suggestions.map(name=>'scratch.'+name).join('、')}。候補の引数もAI用の命令一覧で確認してください。`;
 }
 else if(/登録されていません|定義を確認できません/.test(message)){reason='必要な拡張がまだ追加されていないか、命令名が間違っています。';next='使用する拡張を追加し、命令名を確認してから、もう一度検証してください。';}
 const line=message.match(/^(\d+)行目/);
 const diagnostics=error.diagnostics?.length?error.diagnostics:[];
 const related=diagnostics.length?'\n検出した未登録命令（構文・入力値の全検査は再検証時）:\n'+diagnostics.map(item=>`${item.lines.join('・')}行目: ${item.opcode}${item.suggestions.length?' → 修正候補: '+item.suggestions.join('、'):''}`).join('\n'):'';
 const summary=`${line?line[1]+'行目: ':''}${reason}\n次にすること: ${next}${related}`;
 const ai=error.code==='UNKNOWN_OPCODE'&&reason.includes('まだ追加されていません')?`${summary}\nコードの修正前に、この追加手順を案内してください。`:`${dslName}の検証結果:\n${summary}`;
 return {text:`${line?line[1]+'行目の':''}コードを反映できませんでした。\n理由: ${reason}\n次にすること: ${next}${related}`,ai,summary};
}
