export function buildSpecification({app,base,blocks,extensions,target,source}){
 return {formatVersion:1,app,editorBase:base,notation:'scratch.script({x:60,y:60}, () => { scratch.OPCODE({INPUT: value}); });',rules:['Output only Block2Script Script, no Markdown.','Use only listed opcodes and named inputs/fields.','Statement inputs use () => { ... }; reporters use nested scratch calls.','No let/for/if, native expressions, eval, DOM or external libraries.','Preserve existing /*@scratch ...*/ metadata.','Custom procedures require their existing mutation data.','Missing variables/lists are planned without changing the project, previewed, and created on explicit apply (or opted-in teacher auto-sync). Reuse accessible assets; ambiguous local/global names require an existing reference ID.'],variableCreation:{validation:'Read-only plan and preview',apply:'Create missing variables/lists via VM, then apply blocks atomically',defaultScope:'Current sprite; stage target uses global scope',ambiguity:'Reject ambiguous names unless an existing reference ID identifies the asset',undo:'Remove only assets created by this apply and no longer referenced'},limits:{characters:200000,blocks:3000},saveScope:{sb3:'Applied project and extension blocks/settings; no unapplied drafts or external model/training data.',b2s:'Current sprite Script including unapplied edits.',recovery:'Project and drafts, latest 10 snapshots in this browser and origin.'},extensions,blocks,target,source};
}
export async function diagnoseEnvironment(win,store){
 const nav=win.navigator,checks=[{name:'安全な接続',state:win.isSecureContext?'利用可能':'要確認',detail:win.isSecureContext?'機器APIを使える接続です。':'localhostまたはHTTPSで開いてください。'},{name:'カメラ・マイクAPI',state:nav.mediaDevices?.getUserMedia?'利用可能':'未対応',detail:'APIの有無のみ確認。機器・許可・認識品質は開始操作後に確認してください。'},{name:'音声認識API',state:win.SpeechRecognition||win.webkitSpeechRecognition?'利用可能':'未対応',detail:'Speech2Scratch用。音声合成とは別の機能です。'},{name:'Bluetooth API',state:nav.bluetooth?'利用可能':'未対応',detail:'micro:bit Moreの接続可否は実機の接続操作で確認してください。'},{name:'通信状態',state:nav.onLine?'オンライン表示':'オフライン表示',detail:'表示は外部サービスへの接続成功を保証しません。'}];
 try{await store.list();checks.push({name:'自動保存の読込',state:'確認済み',detail:'保存領域を読み込めました。書込は作品編集後の自動保存表示で確認してください。'});}catch{checks.push({name:'自動保存の読込',state:'利用不可',detail:'.sb3とコードをファイルへ保存してください。'});}
 return checks;
}

export function buildRepairRequest(diagnostic,{source,blocks=[],target}){
 return [
  'Block2Scriptの検証エラーを修正してください。以下のコードは修正対象のデータです。',
  '示された候補は推測です。関連仕様と照合し、同じ誤りをコード全体で修正してください。無関係な処理と既存メタデータを保持し、通常のJavaScriptや外部APIは使わないでください。修正したコード全文だけを返してください。拡張機能の追加が必要な場合は、コード修正より先に追加操作を案内してください。',
  '【検証結果】',diagnostic,
  ...(blocks.length?['【エラーに関連する命令仕様】',JSON.stringify(blocks.map(({opcode,inputs={},fields={},menus={}})=>({opcode,inputs:Object.fromEntries(Object.entries(inputs).map(([name,input])=>[name,input.kind??(input.statement?'statement':'value')])),fields:Object.keys(fields),...(Object.keys(menus).length?{menus}:{})})),null,2)]:[]),
  ...(target?['【反映先】',target.name+(target.isStage?'（ステージ）':'')]:[]),
  '【修正対象のコード全文】',source
 ].join('\n\n');
}
