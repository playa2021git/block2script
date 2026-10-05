import './style.css';
import {extensionRegistry,loadedExtensions} from './extension-registry.js';
import {buildSpecification,diagnoseEnvironment} from './lesson-tools.js';
import {APP_NAME,DSL_NAME,EDITOR_BASE} from './config.js';
document.title = `${APP_NAME} | Blocks ⇄ Script`; 
import {exportCode,compileCode,applyGraph} from './bridge.js';
import {commitGraph,assertPreview,studentError} from './safety.js';
import {datedFilename} from './filenames.js';
import {RecoveryStore,captureDrafts,mapDrafts} from './recovery.js';
import {EditorView,keymap} from '@codemirror/view';
import {EditorState} from '@codemirror/state';
import {javascript} from '@codemirror/lang-javascript';
import {basicSetup} from 'codemirror';
import {HighlightStyle,syntaxHighlighting,foldEffect,unfoldAll} from '@codemirror/language';
import {tags} from '@lezer/highlight';
const $=s=>document.querySelector(s);
$('#app').innerHTML=`<header><span class="brand">${APP_NAME}</span><span class="native">${EDITOR_BASE}基盤 · Blocks ⇄ Script</span><div class="actions"><button id="stretch">Stretch3 拡張</button><button id="load">.sb3 を開く</button><button id="save">.sb3 を保存</button><button id="undo">コード反映を戻す</button><button id="recover">復旧</button><button id="toggle">パネルを隠す</button><button id="diagnose">授業前診断</button><button id="help">使い方</button></div></header><main><iframe id="scratch-frame" src="${import.meta.env.BASE_URL}stretch3-dist/index.html" title="${EDITOR_BASE}エディター" allow="microphone; camera; autoplay"></iframe><div id="resize" role="separator" aria-label="コードパネルの幅" aria-orientation="vertical" tabindex="0"></div><aside id="panel"><div class="panel-head"><b class="js">Script</b><b>${DSL_NAME}</b><button id="validate">検証</button><button id="apply" disabled>Scratchへ反映</button></div><div id="mode-controls"><label>使い方 <select id="mode"><option value="student">生徒モード</option><option value="teacher">先生・開発モード</option></select></label><label><input id="auto-sync" type="checkbox" disabled>自動反映</label></div><div id="target">Scratchを読み込み中…</div><div id="editor"></div><div id="preview" hidden></div><div id="status" role="status">本物のScratchエディターを起動しています</div><div id="backup-status" role="status">自動保存を準備しています</div><div class="panel-foot">Scratchで編集 ⇄ コードで編集<br><span id="mode-help">貼り付け → 検証 → 反映。実行は緑の旗。</span><br><button id="demo">連動サンプルを追加</button> <button id="verify">往復を検証</button> <button id="metadata">メタ情報を表示</button> <button id="save-code">コードを保存</button><button id="copy-repair" hidden>AIへの修正依頼をコピー</button></div><details id="save-scope"><summary>保存されるデータ</summary><p>.sb3：反映済みのブロック、スプライト、衣装、音、変数・リスト、拡張のブロックと設定を保存します。</p><p>.b2s：「コードを保存」で現在のスプライトのScriptを保存します。未反映コードは.sb3には入りません。</p><p>自動保存：作品全体と未反映コードを、このブラウザー・このアドレスに直近10世代保存します。「復旧」で戻せます。</p><p>別途保存：ML2Scratchの学習データ、TM2Scratchなどの外部モデル本体、実機の状態。外部モデルURLはブロックに保存されます。音声合成・翻訳は実行時に外部サービスへの通信が必要です。</p></details><details id="api"><summary>AI用の命令一覧・仕様</summary><button id="copy-guide">AI用仕様をコピー</button><button id="save-spec">仕様JSONを保存</button><pre id="api-list"></pre></details></aside></main><input id="file" type="file" accept=".sb3" hidden><dialog id="help-dialog"><button class="close" id="close-help">閉じる</button><h2>${EDITOR_BASE}のブロックとScriptをつなぐ</h2>${import.meta.env.VITE_PUBLIC_BUILD?'<p>Development / Chromebook Test · v1.0.0 <a href="source/index.html" target="_blank" rel="noopener">対応ソース</a> · <a href="licenses/THIRD_PARTY_NOTICES.md" target="_blank" rel="noopener">第三者ライセンス</a></p>':''}<p>${DSL_NAME}は、JavaScript風の記法でブロックを表現する${APP_NAME}専用のテキスト記法です。</p><p>${APP_NAME}はScratch EditorとStretch3のオープンソース実装を基盤とする非公式プロジェクトです。各名称・商標は各権利者に帰属します。Scratch FoundationおよびMITの公式製品・公認製品ではありません。</p><p>左は${EDITOR_BASE}のエディター・VM・ブロック・ペイントを読み込んだものです。衣装や音、複数スプライト、独自ブロック、Scratchの拡張機能もScratch自身が管理・実行します。</p><p>右のコードは、現在選択しているスプライトのブロックを表します。Scratchのブロックを変更するとコードが更新され、生徒モードでは「検証」で対象と変更内容を確認した後、「Scratchへ反映」を押します。先生・開発モードでは自動反映を選べます。</p><pre>scratch.script({x: 40, y: 40}, () => {\n  scratch.event_whenflagclicked({});\n  scratch.motion_movesteps({STEPS: 50});\n  scratch.control_repeat({TIMES: 10,\n    SUBSTACK: () => {\n      scratch.motion_turnright({DEGREES: 15});\n      scratch.control_wait({DURATION: 0.1});\n    }\n  });\n});</pre><p>命令名・入力名はScratch本体の定義を使います。<code>scratch.operator_add({NUM1: 10, NUM2: 20})</code> のようにレポーターを入力に入れられます。拡張機能のブロックも、読み込まれた定義を命令一覧へ追加します。</p><p>「AI用仕様をコピー」の内容をAIへ渡し、生成されたコードを右に貼り付け、「検証」で確認してから「Scratchへ反映」を押します。AIの自動呼び出しはまだ接続していません。既存の <code>/*@scratch ...*/</code> コメントはブロックIDやシャドー・独自ブロックの情報です。普段は折りたたんでいます。</p><p>入力途中や未対応のJavaScript構文では最後のブロックを残します。コードが不正な間はScratch側からコードを上書きしません。スプライトを切り替えても編集中のコードをスプライト別に保持します。コードを反映すると実行中のスクリプトは停止します。</p><p class="warning">Scratch全機能の双方向編集を目指す開発版です。任意のJavaScriptの関数・ライブラリ・文法をScratchへ変換するものではありません。ブロック定義に対応する呼び出し形式を使います。ハードウェア拡張や一部特殊な独自ブロックは別途実機検証が必要です。公式Scratchサイトのログイン・共有・クラウド変数サービスは接続していません。</p></dialog>`;
const stretchDialog=document.createElement('dialog');
stretchDialog.id='stretch-dialog';
stretchDialog.innerHTML=`<button id="close-stretch" class="close">閉じる</button><h2>Stretch3の拡張を追加</h2><p>作者配布の拡張を、左のScratch本体へ追加します。追加後は拡張ブロックもBlock2Script Scriptと連動します。</p><p>カメラを使う拡張の追加や「ビデオを入にする」ブロックの実行時に、ブラウザーからカメラの許可を求められます。ML2Scratchの学習データは拡張の保存機能で別途保存してください。</p><div id="stretch-choices"></div><details id="extension-information"><summary>拡張の保存範囲・通信・機器</summary><div id="extension-information-list"></div></details><p><button id="start-camera" disabled>カメラを開始</button></p><p>Speech2Scratchは「音声認識開始」ブロックでマイクを使います。ブラウザーによっては認識に外部通信が必要です。Camera Selectorは他のカメラ拡張と組み合わせて使えます。</p><p>micro:bit Moreは対応ファームウェアとChrome / Edgeが必要です。<a href="https://microbit-more.github.io/" target="_blank" rel="noopener">公式サイト・ファームウェア</a></p><button id="connect-more" disabled>micro:bit Moreを接続</button> <button id="disconnect-more" disabled>切断</button><p id="stretch-status" role="status"></p>`;
document.body.appendChild(stretchDialog);
$('#stretch').onclick=()=>{if(native?.stretch)updateStretchChoices();stretchDialog.showModal();};
$('#close-stretch').onclick=()=>stretchDialog.close();
function updateStretchChoices(){
 const choices=$('#stretch-choices');choices.replaceChildren();
 for(const [id,info] of Object.entries(native.stretch.supported)){
  const loaded=vm.extensionManager.isExtensionLoaded(id),button=document.createElement('button');
  button.textContent=info.name+(loaded?' ✓ 追加済み':' を追加');button.disabled=loaded;
  button.onclick=async()=>{button.disabled=true;$('#stretch-status').textContent=info.name+'を読み込み中…';try{await native.stretch.load(id);schemaCache.clear();refresh();updateStretchChoices();$('#stretch-status').textContent=info.name+'をScratch本体へ追加しました';}catch(error){button.disabled=false;$('#stretch-status').textContent=error.message;}};
  choices.appendChild(button);
 }
 const list=$('#extension-information-list');list.replaceChildren();
 for(const info of extensionRegistry(id=>vm.extensionManager.isExtensionLoaded(id))){const row=document.createElement('section'),title=document.createElement('h3');title.textContent=info.name+(info.loaded?'（読み込み済み）':'（未読込）');row.appendChild(title);for(const text of ['機器：'+(info.permissions.join('、')||'追加機器なし'),'通信：'+info.network,'保存：'+info.externalSave,'併用：'+info.compatibility]){const p=document.createElement('p');p.textContent=text;row.appendChild(p);}list.appendChild(row);}
 $('#start-camera').disabled=!Object.entries(native.stretch.supported).some(([id,info])=>info.camera&&vm.extensionManager.isExtensionLoaded(id));
 $('#connect-more').disabled=!vm.extensionManager.isExtensionLoaded('microbitMore');
 $('#disconnect-more').disabled=!vm.extensionManager.isExtensionLoaded('microbitMore');
}
$('#start-camera').onclick=async()=>{try{await native.stretch.startCamera();$('#stretch-status').textContent='カメラを開始しました';}catch(error){$('#stretch-status').textContent=error.message;}};
$('#connect-more').onclick=()=>{try{vm.scanForPeripheral('microbitMore');$('#stretch-status').textContent='ブラウザーの機器選択画面からmicro:bitを選んでください';}catch(error){$('#stretch-status').textContent=error.message;}};
$('#disconnect-more').onclick=()=>vm.disconnectPeripheral('microbitMore');
let studentMode=true,preview=null,repairText="";
const recoveryStore=new RecoveryStore();
let checkpointQueue=Promise.resolve(),backupTimer,revision=0,savedRevision=0,restoring=false,operationBusy=false,connectedVM;
let vm,native,controller,currentId,base={},updating=false,dirty=false,timer,changeTimer,undoStack=[],schemaCache=new Map(),drafts=new Map();
const editor=new EditorView({state:EditorState.create({doc:'',extensions:[basicSetup,javascript(),EditorView.lineWrapping,syntaxHighlighting(HighlightStyle.define([{tag:tags.keyword,color:'#c6a0f6'},{tag:tags.string,color:'#a6da95'},{tag:tags.number,color:'#f5a97f'},{tag:tags.comment,color:'#75839e'},{tag:tags.function(tags.variableName),color:'#8bd5ff'}])),EditorView.theme({'&':{backgroundColor:'#182030',color:'#e2e8f0'},'.cm-scroller':{fontFamily:'Consolas,monospace',fontSize:'14px',lineHeight:'1.75'},'.cm-gutters':{backgroundColor:'#182030',color:'#71809b',border:0},'.cm-activeLine':{backgroundColor:'#ffffff08'},'.cm-activeLineGutter':{backgroundColor:'#ffffff08'},'.cm-selectionBackground, &.cm-focused .cm-selectionBackground':{backgroundColor:'#4c4674'},'.cm-cursor':{borderLeftColor:'#c6a0f6'}},{dark:true}),keymap.of([{key:'Mod-Enter',run:()=>{studentMode?validate():apply();return true;}}]),EditorView.updateListener.of(u=>{if(u.docChanged&&!updating){draftChanged();}})]}),parent:$('#editor')});
function status(text,kind='ok'){$('#status').textContent=text;$('#status').dataset.kind=kind;}
function setCode(code){updating=true;editor.dispatch({changes:{from:0,to:editor.state.doc.length,insert:code}});updating=false;foldMetadata();}
function foldMetadata(){const source=editor.state.doc.toString();const effects=[...source.matchAll(/\/\*@scratch [\s\S]*?\*\//g)].map(m=>foldEffect.of({from:m.index+2,to:m.index+m[0].length-2}));if(effects.length)editor.dispatch({effects});}
function refresh(){
 if(!vm?.editingTarget)return;
 const target=vm.editingTarget;let changed=false;
 if(currentId!==target.id){invalidatePreview();clearTimeout(timer);if(dirty&&currentId)drafts.set(currentId,editor.state.doc.toString());currentId=target.id;schemaCache.clear();dirty=drafts.has(currentId);base=structuredClone(target.blocks._blocks);setCode(dirty?drafts.get(currentId):exportCode(base,target.blocks._scripts));changed=true;}
 else if(!dirty){base=structuredClone(target.blocks._blocks);const code=exportCode(base,target.blocks._scripts);if(editor.state.doc.toString()!==code){setCode(code);changed=true;}}
 if(preview&&preview.context!==targetContext(target))invalidatePreview();
 $('#target').textContent=`${target.isStage?'ステージ':'スプライト'}: ${target.getName()} · ${Object.keys(target.blocks._blocks).length} ブロック`;
 if(!dirty&&changed)status('⇄ Scratch本体と同期済み');
 controller=native.getController();
 if(controller)updateCatalog();
}
function xmlTemplate(el){
 const id=crypto.randomUUID();const b={id,opcode:el.getAttribute('type'),fields:{},inputs:{},next:null,parent:null,shadow:el.tagName.toLowerCase()==='shadow',topLevel:false};
 for(const child of el.children){const tag=child.tagName.toLowerCase();if(tag==='field')b.fields[child.getAttribute('name')]={name:child.getAttribute('name'),value:child.textContent,...(child.hasAttribute('id')?{id:child.getAttribute('id')}:{})};else if(tag==='mutation'){
 b.mutation={tagName:'mutation',children:[],...Object.fromEntries([...child.attributes].map(a=>[a.name,a.value]))};
 }else if(tag==='value'){const shadow=[...child.children].find(c=>c.tagName.toLowerCase()==='shadow');b.inputs[child.getAttribute('name')]={shadow:shadow?xmlTemplate(shadow):null};}}
 return b;
}
function schema(opcode,meta){
 controller=native?.getController();if(!controller)return null;
 const SB=controller.ScratchBlocks;if(!SB.Blocks[opcode])return null;
 const key=opcode+JSON.stringify(meta?.mutation??{});if(schemaCache.has(key))return schemaCache.get(key);
 const temp=controller.workspace;
 const priorIds=new Set(temp.getAllBlocks(false).map(b=>b.id));
 const priorVariables=new Set(temp.getVariableMap().getAllVariables().map(v=>v.getId()));
 SB.Events.disable();let b;
 try{
 b=temp.newBlock(opcode);
 if(meta?.mutation&&b.domToMutation){const dom=document.createElement('mutation');for(const [k,v]of Object.entries(meta.mutation))if(k!=='children'&&k!=='tagName')dom.setAttribute(k,String(v));b.domToMutation(dom);}
 const def={fields:{},menus:{},inputs:{},output:!!b.outputConnection,previous:!!b.previousConnection,next:!!b.nextConnection};
 for(const input of b.inputList){for(const f of input.fieldRow??[])if(f.name){if(f.getOptions&&!f.getVariable){try{def.menus[f.name]=f.getOptions(false).map(option=>String(option[1]));}catch{}}const variable=f.getVariable?.();def.fields[f.name]={name:f.name,value:variable?.name??f.getValue(),...(variable?{id:variable.getId(),variableType:variable.type}:{})};}
 if(input.name&&input.connection)def.inputs[input.name]={statement:input.connection.type===3,checks:input.connection.getCheck?.()??null};}
 try{const toolbox=new DOMParser().parseFromString(controller.getToolboxXML(),'text/xml');const el=[...toolbox.querySelectorAll('block,shadow')].find(e=>e.getAttribute('type')===opcode);if(el){const t=xmlTemplate(el);for(const [name,data]of Object.entries(t.inputs))if(def.inputs[name]&&data.shadow)def.inputs[name].shadow=data.shadow;}}catch{}
 schemaCache.set(key,def);return def;
 }catch(error){console.warn('Scratch schema:',opcode,error);return null;}finally{try{for(const created of temp.getAllBlocks(false))if(!priorIds.has(created.id)&&!created.isDisposed?.())created.dispose(false);for(const variable of temp.getVariableMap().getAllVariables())if(!priorVariables.has(variable.getId()))temp.getVariableMap().deleteVariable(variable);}catch(error){console.warn('Scratch schema disposal:',opcode,error);}SB.Events.enable();}
}
function updateCatalog(){
 const opcodes=Object.keys(controller.ScratchBlocks.Blocks).sort();
 const text=opcodes.filter(n=>!n.startsWith('math_')&&n!=='text').map(n=>`scratch.${n}(...)`).join('\n');
 if($('#api-list').textContent!==text)$('#api-list').textContent=text;
}
function normalizeReferences(graph,target){
 const stage=vm.runtime.getTargetForStage(),pending=[];
 for(const b of Object.values(graph.blocks))for(const [key,field]of Object.entries(b.fields))if(['VARIABLE','LIST','BROADCAST_OPTION'].includes(key)){
  const type=key==='LIST'?'list':key==='BROADCAST_OPTION'?'broadcast_msg':'';
  const containers=type==='broadcast_msg'?[stage]:[target,stage];
  let variable=containers.map(t=>t.variables[field.id]).find(v=>v&&v.name===String(field.value)&&v.type===type)??containers.map(t=>Object.values(t.variables).find(v=>v.name===String(field.value)&&v.type===type)).find(Boolean);
  if(!variable){const queued=pending.find(p=>p.name===String(field.value)&&p.type===type);const collision=containers.some(t=>field.id&&t.variables[field.id]);const id=queued?.id??(!collision&&field.id?field.id:crypto.randomUUID());if(!queued)pending.push({id,name:String(field.value),type,target:type==='broadcast_msg'?stage:target});variable={id};}
  field.id=variable.id;if(type!=='broadcast_msg')field.variableType=type;
 }
 return pending;
}
function validateConnections(graph){
 for(const b of Object.values(graph.blocks)){
 const def=schema(b.opcode,{mutation:b.mutation});if(!def)throw new Error(`ブロック「${b.opcode}」の定義を確認できません`);
 for(const [name,options] of Object.entries(def.menus??{}))if(options.length&&b.fields[name]&&!options.includes(String(b.fields[name].value))){const error=new Error('不正なメニュー値: '+name);error.code='INVALID_MENU';throw error;}
 if(b.next&&!def.next)throw new Error(`「${b.opcode}」の下には命令をつなげられません`);
 for(const [name,i] of Object.entries(b.inputs)){const child=graph.blocks[i.block];if(!child)continue;const childDef=schema(child.opcode,{mutation:child.mutation});if(def.inputs[name]?.statement){if(!childDef?.previous)throw new Error(`「${name}」には命令ブロックを指定してください`);}else if(!childDef?.output)throw new Error(`「${name}」には数値・文字列・レポーターを指定してください`);}
 }
}
function targetContext(target){
 const stage=vm.runtime.getTargetForStage();
 return JSON.stringify({blocks:target.blocks._blocks,scripts:target.blocks._scripts,variables:[target,stage].map(t=>Object.values(t.variables).map(v=>[v.id,v.name,v.type]).sort((a,b)=>String(a[0]).localeCompare(String(b[0]))))});
}
function invalidatePreview(){preview=null;$('#preview').hidden=true;$('#apply').disabled=studentMode;}
function draftChanged(){
 revision++;scheduleCheckpoint();
 dirty=true;drafts.set(currentId,editor.state.doc.toString());invalidatePreview();repairText='';$('#copy-repair').hidden=true;
 status('コードはまだ反映されていません。「検証」で確認してください','pending');
 clearTimeout(timer);if(!studentMode&&$('#auto-sync').checked)timer=setTimeout(apply,700);
}
function showError(error){
 const help=studentError(error,DSL_NAME);repairText=help.ai;$('#copy-repair').hidden=false;
 status(studentMode?help.text:help.text+'\n詳細: '+error.message,'error');
}
function prepareGraph(){
 const source=editor.state.doc.toString();
 if(source.length>200000){const error=new Error('コードが長すぎます');error.code='TOO_LARGE';throw error;}
 const target=vm.editingTarget,graph=compileCode(source,{base,schema});
 if(Object.keys(graph.blocks).length>3000){const error=new Error('ブロックが多すぎます');error.code='TOO_LARGE';throw error;}
 validateConnections(graph);const pending=normalizeReferences(graph,target);
 if(studentMode&&pending.some(p=>p.type!=='broadcast_msg')){const error=new Error('必要な変数またはリストがありません');error.code='MISSING_VARIABLE';error.names=pending.filter(p=>p.type!=='broadcast_msg').map(p=>p.name);throw error;}
 return {source,targetId:target.id,context:targetContext(target),graph,pending};
}
function validate(){
 clearTimeout(timer);invalidatePreview();if(!vm?.editingTarget)return false;
 if(vm.editingTarget.id!==currentId){refresh();return false;}
 try{
  preview=prepareGraph();const target=vm.editingTarget;
  const count=Object.keys(preview.graph.blocks).length,oldCount=Object.keys(target.blocks._blocks).length;
  const warning=count===0?'空のコードです。現在のブロックをすべて取り除きます。':Object.values(preview.graph.blocks).some(b=>b.opcode==='control_forever')?'ずっと繰り返す処理があります。必要なときは赤い停止ボタンで止めてください。':'';
  $('#preview').textContent=(target.isStage?'ステージ':'スプライト')+'「'+target.getName()+'」の '+oldCount+' ブロックを '+count+' ブロックに置き換えます。'+(preview.pending.length?' 新しいメッセージを '+preview.pending.length+' 件作成します。':'')+' '+warning;
  $('#preview').hidden=false;$('#apply').disabled=false;$('#copy-repair').hidden=true;
  status('検証できました。反映先と内容を確認して「Scratchへ反映」を押してください');return true;
 }catch(error){showError(error);return false;}
}
async function apply(){
 clearTimeout(timer);if(!vm?.editingTarget||operationBusy)return false;
 try{
  const target=vm.editingTarget;if(target.id!==currentId){invalidatePreview();const error=new Error('反映先が変わりました');error.code='STALE_PREVIEW';throw error;}
  const result=studentMode?assertPreview(preview,{source:editor.state.doc.toString(),targetId:target.id,context:targetContext(target)}):prepareGraph();
  operationBusy=true;$('#apply').disabled=true;await saveCheckpoint('反映前');
  assertPreview(result,{source:editor.state.doc.toString(),targetId:vm.editingTarget.id,context:targetContext(vm.editingTarget)});
  updating=true;const snapshot=commitGraph(vm,target,result.graph,result.pending);
  undoStack.push(snapshot);if(undoStack.length>30)undoStack.shift();
  updating=false;dirty=false;drafts.delete(currentId);base=structuredClone(target.blocks._blocks);invalidatePreview();
  status('⇄ ScriptをScratch本体へ反映しました');$('#target').textContent=(target.isStage?'ステージ':'スプライト')+': '+target.getName()+' · '+Object.keys(base).length+' ブロック';return true;
 }catch(error){updating=false;dirty=true;drafts.set(currentId,editor.state.doc.toString());invalidatePreview();showError(error);return false;}finally{operationBusy=false;}
}
$('#mode').onchange=()=>{studentMode=$('#mode').value==='student';clearTimeout(timer);$('#auto-sync').checked=false;$('#auto-sync').disabled=studentMode;invalidatePreview();$('#mode-help').textContent=studentMode?'貼り付け → 検証 → 反映。実行は緑の旗。':'自動反映は選択したときだけ有効です。';status(studentMode?'生徒モードです。コードは検証してから反映します':'先生・開発モードです。必要に応じて自動反映を選べます');};
$('#auto-sync').onchange=()=>{clearTimeout(timer);if(!studentMode&&$('#auto-sync').checked&&dirty)timer=setTimeout(apply,700);};
$('#validate').onclick=validate;
$('#copy-repair').onclick=async()=>{try{await navigator.clipboard.writeText(repairText);status('AIへの修正依頼をコピーしました');}catch{status('コピーできませんでした。エラー欄の「AIに相談」の文章を選択してコピーしてください','error');}};
$('#save-code').onclick=()=>download(new Blob([editor.state.doc.toString()],{type:'text/plain;charset=utf-8'}),datedFilename(APP_NAME+'-'+(vm?.editingTarget?.getName()??'code'),'b2s'));
window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==$('#scratch-frame').contentWindow||e.data?.type!=='scratch-native-ready')return;
 native=e.source.scratchNative;vm=native.vm;
 if(connectedVM===vm){refresh();return;}connectedVM=vm;installRecovery();
 const changed=()=>{if(updating)return;clearTimeout(changeTimer);changeTimer=setTimeout(refresh,180);};
 vm.runtime.on('PROJECT_CHANGED',changed);vm.on('targetsUpdate',changed);vm.on('workspaceUpdate',changed);vm.on('BLOCKSINFO_UPDATE',()=>{schemaCache.clear();changed();});
 vm.runtime.on('PROJECT_LOADED',()=>{drafts.clear();currentId=null;dirty=false;undoStack=[];invalidatePreview();changed();});
 native.state.store.subscribe(changed);refresh();updateStretchChoices();
});
$('#apply').onclick=apply;
$('#undo').onclick=()=>{const item=undoStack.pop();if(!item){status('戻せるコード反映はありません','pending');return;}const target=vm.runtime.getTargetById(item.targetId);if(!target)return;vm.setEditingTarget(target.id);updating=true;applyGraph(vm,target,item.graph);for(const p of item.variables??[])p.target.deleteVariable(p.id);updating=false;dirty=false;drafts.delete(target.id);currentId=null;refresh();status('前のScratchブロックに戻しました');};
$('#metadata').onclick=()=>{unfoldAll(editor);};
$('#demo').onclick=()=>{
 if(!vm?.editingTarget)return;const source=`scratch.script({x: 60, y: 60}, () => {\n  scratch.event_whenflagclicked({});\n  scratch.looks_say({MESSAGE: "本物のScratchと連動したよ！"});\n  scratch.control_repeat({TIMES: 10, SUBSTACK: () => {\n    scratch.motion_movesteps({STEPS: 10});\n    scratch.motion_turnright({DEGREES: 15});\n    scratch.control_wait({DURATION: 0.15});\n  }});\n});`;
 setCode(editor.state.doc.toString()+'\n\n'+source);draftChanged();validate();
};
$('#verify').onclick=()=>{try{let count=0;for(const target of vm.runtime.targets.filter(t=>t.isOriginal)){
 const original=structuredClone(target.blocks._blocks),text=exportCode(original,target.blocks._scripts),graph=compileCode(text,{base:original,schema});
 const normalize=g=>Object.fromEntries(Object.keys(g).sort().map(k=>[k,g[k]]));
 const stable=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.keys(x).sort().map(k=>[k,x[k]])):x);
 if(stable(normalize(original))!==stable(normalize(graph.blocks)))throw new Error(`${target.getName()} のブロック情報に差があります`);count+=Object.keys(original).length;
 }status(`✓ 全スプライトの ${count} ブロックを往復検証。ブロックデータの差はありません`);}catch(e){status(e.message,'error');}};
function download(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('#save').onclick=async()=>{if(!vm)return;if(!studentMode&&dirty&&!(await apply()))return;try{download(await vm.saveProjectSb3(),datedFilename(APP_NAME,'sb3'));status(dirty?'反映済みのブロックを.sb3に保存しました。未反映のコードは「コードを保存」で別に保存してください':'Scratchの標準 .sb3 ファイルを保存しました');}catch(e){status(e.message,'error');}};
$('#load').onclick=()=>$('#file').click();$('#file').onchange=async e=>{const file=e.target.files[0];if(!file||!vm)return;try{vm.stopAll();status('Scratchプロジェクトを読み込み中…','pending');const Bytes=$('#scratch-frame').contentWindow.Uint8Array;const bytes=new Bytes(await file.arrayBuffer());await vm.loadProject(bytes);drafts.clear();dirty=false;currentId=null;undoStack=[];invalidatePreview();refresh();updateStretchChoices();status('Scratchプロジェクトを読み込みました');}catch(err){console.error('Scratch project load:',err);status(err.message,'error');}finally{e.target.value='';}};
$('#toggle').onclick=()=>{const show=$('#panel').hidden;$('#panel').hidden=!show;$('#panel').style.display=show?'flex':'none';$('#resize').hidden=!show;$('#toggle').textContent=show?'パネルを隠す':'パネルを表示';};
let resizing=false;$('#resize').onpointerdown=e=>{resizing=true;e.target.setPointerCapture(e.pointerId);};$('#resize').onpointermove=e=>{if(resizing)$('#panel').style.width=Math.max(310,Math.min(innerWidth*0.65,innerWidth-e.clientX))+'px';};$('#resize').onpointerup=()=>resizing=false;$('#resize').onkeydown=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight')$('#panel').style.width=Math.max(310,$('#panel').getBoundingClientRect().width+(e.key==='ArrowLeft'?30:-30))+'px';};
$('#help').onclick=()=>$('#help-dialog').showModal();$('#close-help').onclick=()=>$('#help-dialog').close();
function currentSpecification(){
 const blocks=Object.keys(controller.ScratchBlocks.Blocks).sort().filter(opcode=>!opcode.startsWith('math_')&&opcode!=='text').map(opcode=>{const def=schema(opcode,{});if(!def)return null;return {opcode,inputs:Object.fromEntries(Object.entries(def.inputs).map(([name,input])=>[name,{kind:input.statement?'statement':'value',checks:input.checks??null,defaultShadow:input.shadow?.opcode??null}])),fields:def.fields,menus:def.menus,output:def.output,previous:def.previous,next:def.next};}).filter(Boolean);
 const extensions=loadedExtensions(id=>vm.extensionManager.isExtensionLoaded(id));
 return buildSpecification({app:APP_NAME,base:EDITOR_BASE,blocks,extensions,target:{name:vm.editingTarget.getName(),isStage:vm.editingTarget.isStage},source:editor.state.doc.toString()});
}
$('#copy-guide').onclick=async()=>{if(!controller)return;try{await navigator.clipboard.writeText(JSON.stringify(currentSpecification(),null,2));status('AI用仕様と現在のコードをコピーしました');}catch{status('クリップボードへコピーできません。「仕様JSONを保存」を使ってください','error');}};
$('#save-spec').onclick=()=>{if(!controller)return;try{download(new Blob([JSON.stringify(currentSpecification(),null,2)],{type:'application/json'}),datedFilename(APP_NAME+'-spec','json'));status('現在使える命令と拡張仕様を保存しました');}catch(error){showError(error);}};
const diagnosticDialog=document.createElement('dialog');diagnosticDialog.id='diagnostic-dialog';
diagnosticDialog.innerHTML='<button id="close-diagnostic" class="close">閉じる</button><h2>授業前診断</h2><p>この端末のAPIと保存領域を確認します。</p><div id="diagnostic-results" role="status"></div><p>音声・カメラ・実機の動作と学校ネットワークでの外部サービス接続は、授業で使う機能を実行して確認してください。</p>';
document.body.appendChild(diagnosticDialog);$('#close-diagnostic').onclick=()=>diagnosticDialog.close();
$('#diagnose').onclick=async()=>{diagnosticDialog.showModal();const list=$('#diagnostic-results');list.textContent='確認しています…';if(!native){list.textContent='エディターの読み込み完了後に開き直してください。';return;}try{const checks=await diagnoseEnvironment($('#scratch-frame').contentWindow,recoveryStore);list.replaceChildren();for(const check of checks){const row=document.createElement('p');row.textContent=check.name+'：'+check.state+' — '+check.detail;list.appendChild(row);}const row=document.createElement('p');row.textContent='読み込み済み拡張：'+currentSpecification().extensions.map(e=>e.name).join('、');list.appendChild(row);}catch{list.textContent='診断できませんでした。エディターの読み込み完了後に再度確認してください。';}};



function backupStatus(text){$('#backup-status').textContent=text;}
function scheduleCheckpoint(){
 clearTimeout(backupTimer);if(restoring)return;
 backupTimer=setTimeout(()=>{if(operationBusy){scheduleCheckpoint();return;}saveCheckpoint('自動保存').catch(()=>{});},1200);
}
function saveCheckpoint(reason){
 const work=async()=>{
  if(!vm?.editingTarget)throw new Error('作品の準備ができていません');
  const capturedRevision=revision,targets=vm.runtime.targets.filter(t=>t.isOriginal);
  const entries=captureDrafts(targets,drafts,currentId);
  const sb3=await vm.saveProjectSb3();
  const snapshot=await recoveryStore.save({formatVersion:1,createdAt:Date.now(),reason,sb3,entries});
  savedRevision=capturedRevision;backupStatus('このブラウザーに保存済み: '+new Date(snapshot.createdAt).toLocaleTimeString('ja-JP')+'（.sb3ファイルも保存してください）');return snapshot;
 };
 const task=checkpointQueue.then(work,work);checkpointQueue=task.catch(()=>{});
 return task.catch(error=>{backupStatus('自動保存できません。.sb3と「コードを保存」でファイルに保存してください。');const wrapped=new Error('自動保存を完了できません',{cause:error});wrapped.code='BACKUP_FAILED';throw wrapped;});
}
function restoreDrafts(snapshot){
 const mapped=mapDrafts(vm.runtime.targets.filter(t=>t.isOriginal),snapshot.entries??[]);
 drafts=mapped.drafts;if(mapped.activeId)vm.setEditingTarget(mapped.activeId);
 currentId=null;dirty=false;undoStack=[];invalidatePreview();refresh();
}
async function restoreSnapshot(snapshot){
 if(operationBusy)return;
 if(snapshot.formatVersion!==1||typeof snapshot.sb3?.arrayBuffer!=='function'){status('この保存データは復旧できません。別の世代を選んでください','error');return;}
 operationBusy=true;clearTimeout(backupTimer);clearTimeout(timer);
 let before;
 try{
  before=await saveCheckpoint('復旧前');restoring=true;vm.stopAll();
  const Bytes=$('#scratch-frame').contentWindow.Uint8Array;await vm.loadProject(new Bytes(await snapshot.sb3.arrayBuffer()));
  restoreDrafts(snapshot);studentMode=true;$('#mode').value='student';$('#auto-sync').checked=false;$('#auto-sync').disabled=true;invalidatePreview();$('#mode-help').textContent='貼り付け → 検証 → 反映。実行は緑の旗。';
  updateStretchChoices();recoveryDialog.close();status('作品と未反映コードを復旧しました。コードは自動反映されません。');revision++;
 }catch(error){
  if(before&&restoring){try{const Bytes=$('#scratch-frame').contentWindow.Uint8Array;await vm.loadProject(new Bytes(await before.sb3.arrayBuffer()));restoreDrafts(before);}catch{status('復旧に失敗しました。「復旧前」の世代か、保存した.sb3を開いてください','error');return;}}
  status('復旧できませんでした。現在の作品を残しました。別の世代か保存した.sb3を選んでください','error');
 }finally{restoring=false;operationBusy=false;}
}
const recoveryDialog=document.createElement('dialog');recoveryDialog.id='recovery-dialog';
recoveryDialog.innerHTML='<button id="close-recovery" class="close">閉じる</button><h2>自動保存から復旧</h2><p>このブラウザーに保存した直近10世代から選べます。作品全体と未反映コードを戻します。復旧前の状態も保存します。</p><p>カメラの学習データや外部モデルなど、.sb3に含まれないデータは別途保存してください。</p><div id="recovery-list"></div>';
document.body.appendChild(recoveryDialog);$('#close-recovery').onclick=()=>recoveryDialog.close();
$('#recover').onclick=async()=>{
 recoveryDialog.showModal();const list=$('#recovery-list');list.textContent='保存データを確認しています…';
 try{const snapshots=await recoveryStore.list();list.replaceChildren();if(!snapshots.length)list.textContent='まだ自動保存データがありません。作品を編集すると保存されます。';
 for(const snapshot of snapshots){const row=document.createElement('div'),button=document.createElement('button'),label=document.createElement('span');row.className='recovery-row';row.dataset.snapshotId=String(snapshot.id);label.textContent=new Date(snapshot.createdAt).toLocaleString('ja-JP')+' · '+snapshot.reason+' · 未反映コード '+(snapshot.entries??[]).filter(e=>typeof e.source==='string').length+' 件';button.textContent='この世代を復旧';button.onclick=async()=>{button.disabled=true;await restoreSnapshot(snapshot);button.disabled=false;};row.append(label,button);list.append(row);}
 }catch{list.textContent='自動保存データを読み込めません。.sb3ファイルから作品を開いてください。';}
};
function installRecovery(){
 const originalLoad=vm.loadProject.bind(vm);
 vm.loadProject=async data=>{
  if(restoring||!vm.editingTarget)return originalLoad(data);
  const before=await saveCheckpoint('作品読込前');
  try{return await originalLoad(data);}catch(error){
   restoring=true;try{const Bytes=$('#scratch-frame').contentWindow.Uint8Array;await originalLoad(new Bytes(await before.sb3.arrayBuffer()));restoreDrafts(before);}finally{restoring=false;}throw error;
  }
 };
 vm.runtime.on('PROJECT_CHANGED',()=>{if(!restoring){revision++;scheduleCheckpoint();}});
 recoveryStore.list().then(snapshots=>backupStatus(snapshots.length?'復旧できる保存データがあります。「復旧」で選べます':'編集後に作品と未反映コードを自動保存します。')).catch(()=>backupStatus('自動保存を使用できません。.sb3とコードをファイルに保存してください。'));
}
setInterval(()=>{if(vm?.editingTarget&&!restoring&&!operationBusy&&revision!==savedRevision)saveCheckpoint('定期保存').catch(()=>{});},30000);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&vm?.editingTarget&&!restoring&&revision!==savedRevision)saveCheckpoint('画面を離れる前').catch(()=>{});});
