import {applyGraph} from './bridge.js';
export function commitGraph(vm,target,graph,pending=[]){
 const item={targetId:target.id,graph:{blocks:structuredClone(target.blocks._blocks),scripts:[...target.blocks._scripts]},variables:[]};
 try{
  for(const variable of pending){variable.target.createVariable(variable.id,variable.name,variable.type);item.variables.push(variable);}
  applyGraph(vm,target,graph);
  return item;
 }catch(error){
  for(const variable of pending)if(variable.target.variables?.[variable.id])variable.target.deleteVariable(variable.id);
  throw error;
 }
}
export function assertPreview(preview,{source,targetId,context}){
 if(!preview||preview.source!==source||preview.targetId!==targetId||preview.context!==context){const error=new Error('コードまたは反映先が変わりました。もう一度検証してください');error.code='STALE_PREVIEW';throw error;}
 return preview;
}
export function studentError(error,dslName){
 const message=String(error?.message||error);
 let reason='構文や命令、入力値が、このアプリで使える形と異なる可能性があります。',next='コードを確認し、現在の命令一覧を使って書き直してから「検証」を押してください。';
 if(error.code==='BACKUP_FAILED'){reason='反映前の作品をブラウザーに保存できませんでした。';next='.sb3と未反映コードをファイルに保存し、ブラウザーの空き容量を確認してから再度試してください。';}
 else if(error.code==='STALE_PREVIEW'){reason='検証後にコード、スプライト、またはブロックが変更されました。';next='反映先を確認して、もう一度「検証」を押してください。';}
 else if(error.code==='MISSING_VARIABLE'){reason='必要な変数やリスト'+(error.names?.length?'「'+error.names.join('、')+'」':'')+'が反映先にありません。';next='ブロック画面で必要な変数やリストを作成してから、もう一度検証してください。';}
 else if(error.code==='INVALID_MENU'){reason='選択肢にない値がメニューに指定されています。';next='AI用の命令一覧を確認し、ブロックのメニューにある値を使ってください。';}
 else if(error.code==='TOO_LARGE'){reason='一度に反映するコードやブロックの量が多すぎます。';next='コードを小さく分けてから、もう一度検証してください。';}
 else if(/登録されていません|定義を確認できません/.test(message)){reason='必要な拡張がまだ追加されていないか、命令名が間違っています。';next='使用する拡張を追加し、命令名を確認してから、もう一度検証してください。';}
 const line=message.match(/^(\d+)行目/);
 const ai=error.code==='BACKUP_FAILED'?'ブラウザーの自動保存が失敗しました。作品と未反映コードを失わずに保存する方法と、空き容量の確認・再試行手順を教えてください。':`現在ロードされている命令だけを使い、${dslName}としてコードを修正してください。${reason}通常のJavaScriptや外部APIは使わないでください。`;
 return {text:`${line?line[1]+'行目の':''}コードを反映できませんでした。\n理由: ${reason}\n次にすること: ${next}\nAIに相談: ${ai}`,ai};
}

