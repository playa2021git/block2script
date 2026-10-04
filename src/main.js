import './style.css';
import {Blockly,toolbox,programState,readProgram} from './blocks.js';
import {parseCode,generateCode,examples,commands} from './model.js';
import {Runtime} from './runtime.js';
import {EditorView,keymap} from '@codemirror/view';
import {EditorState} from '@codemirror/state';
import {javascript} from '@codemirror/lang-javascript';
import {basicSetup} from 'codemirror';
import {HighlightStyle,syntaxHighlighting} from '@codemirror/language';
import {tags} from '@lezer/highlight';

const $=s=>document.querySelector(s);
$('#app').innerHTML=`
<header><a class="brand" href="#"><span class="brand-icon">S<span>＋</span></span>Scratch<span class="plus">＋</span></a><span class="version">試作版 0.1</span><div class="divider"></div><input id="title" aria-label="プロジェクト名" value="こんにちは、Scratch＋"><div class="header-actions"><button id="save">↓ 保存</button><button id="load">↑ 読み込み</button><button id="help">使い方</button></div></header>
<div class="toolbar"><div class="workspace-label"><span class="block-icon">▧</span> ブロック <span class="muted">ドラッグして組み立てる</span></div><div class="sync-wrap"><span id="sync" role="status">⇄ 同期済み</span></div><label class="example-label">サンプル <select id="example" aria-label="サンプルを選ぶ"><option value="">選んで開く</option>${Object.entries(examples).map(([key,e])=>`<option value="${key}">${e.title}</option>`).join('')}</select></label></div>
<main><section class="blocks-panel" aria-label="ブロックエディター"><div id="blockly"></div><div class="block-footer"><span id="block-count">0 ブロック</span><span>右のコードからも編集できます</span><button id="fit">全体を表示</button></div></section>
<aside><section class="code-panel"><div class="panel-title"><span><b class="js-badge">JS</b> JavaScript</span><span class="live-label">双方向編集</span><button id="format" title="コードの書式を整える">整形</button></div><div id="editor"></div><div id="error" role="status"></div></section>
<section class="stage-panel"><div class="panel-title"><span>ステージ</span><div class="run-controls"><button id="run" class="run" title="緑の旗で実行">⚑ 実行</button><button id="stop" title="すべて止める">■ 停止</button><button id="reset" title="猫の位置を戻す">↺</button></div></div><div class="stage-wrap"><canvas id="stage" width="960" height="720" tabindex="0" aria-label="実行ステージ。クリックして矢印キーで操作できます"></canvas><div id="speech"></div><div id="variables"></div></div><div class="sprite-info"><span class="sprite-tag">🐱 ネコ</span><span>x <b id="x">0</b></span><span>y <b id="y">0</b></span><span>向き <b id="direction">90</b></span><span id="run-state">停止中</span></div></section></aside></main>
<footer><span><b>Scratch＋</b> ブロックから、文字のプログラミングへ。</span><span>基本ブロック対応 · この端末に自動保存</span></footer>
<input id="file" type="file" accept=".json,.scratchplus,application/json" hidden>
<dialog id="help-dialog"><div class="dialog-head"><h2>ブロックとコードを、行ったり来たり。</h2><button id="close-help" aria-label="閉じる">✕</button></div><p>左のカテゴリからブロックをドラッグすると、右のJavaScriptも変わります。右のコードを書き換えると、少し待ってブロックに反映されます。</p><p>まずは <code>move(20)</code> の数字を変えてみてください。「実行」を押すと、猫が動きます。</p><h3>使える書き方</h3><pre>whenGreenFlag(async () => {\n  await repeat(10, async () => {\n    move(10);\n    await wait(0.2);\n  });\n});</pre><p><code>onKey("ArrowRight", async () => { ... });</code> でキー操作、<code>if (variable("score") &gt; 10) { ... }</code> で条件を指定できます。</p><p>変数は <code>setVariable("score", 0)</code>、<code>changeVariable("score", 1)</code>、<code>variable("score")</code> で使えます。キー名は ArrowRight・ArrowLeft・ArrowUp・ArrowDown・スペースなら " " です。</p><details><summary>命令一覧</summary><pre>${Object.entries(commands).map(([k,c])=>`${k}(${c.args.map(a=>JSON.stringify(a)).join(', ')})`).join('\n')}\nrandom(1, 10)\nxPosition() / yPosition() / direction()\nkeyPressed("ArrowRight")\nawait forever(async () => { ... })\nonMessage("スタート", async () => { ... })</pre></details><p class="help-note">Scratch風の独自エディターです。公式Scratchの全機能・.sb3ファイルには未対応です。JavaScriptは上記の対応する書き方を使ってください。保存ファイルにはブロックと編集中のコードが含まれます。</p></dialog>`;

const ws=Blockly.inject('blockly',{toolbox,renderer:'zelos',trashcan:true,scrollbars:true,move:{scrollbars:true,drag:true,wheel:true},zoom:{controls:true,wheel:true,startScale:0.85,maxScale:1.5,minScale:0.35,scaleSpeed:1.1},grid:{spacing:24,length:2,colour:'#d9deeb',snap:false},theme:Blockly.Theme.defineTheme('scratchplus',{base:Blockly.Themes.Classic,componentStyles:{workspaceBackgroundColour:'#f8faff',toolboxBackgroundColour:'#fff',flyoutBackgroundColour:'#eef2fa',flyoutOpacity:0.97,scrollbarColour:'#bac4d8'},fontStyle:{family:'"Noto Sans JP", system-ui, sans-serif',size:12}})});
let syncing=false,timer,valid=true,program=[],lastState;
const editor=new EditorView({state:EditorState.create({doc:'',extensions:[basicSetup,javascript(),syntaxHighlighting(HighlightStyle.define([{tag:tags.keyword,color:'#c6a0f6'},{tag:tags.string,color:'#a6da95'},{tag:tags.number,color:'#f5a97f'},{tag:tags.comment,color:'#8994ad'},{tag:tags.function(tags.variableName),color:'#8bd5ff'},{tag:tags.operator,color:'#91d7e3'}])),EditorView.lineWrapping,EditorView.theme({'&':{height:'100%',backgroundColor:'#182030',color:'#e2e8f0'},'.cm-scroller':{fontFamily:'Consolas, monospace',fontSize:'14px',lineHeight:'1.8'},'.cm-gutters':{backgroundColor:'#182030',color:'#72809a',border:'none'},'.cm-activeLine':{backgroundColor:'#ffffff07'},'.cm-activeLineGutter':{backgroundColor:'#ffffff07'},'.cm-cursor':{borderLeftColor:'#b6a2ff'},'.cm-selectionBackground, &.cm-focused .cm-selectionBackground':{backgroundColor:'#494273'}},{dark:true}),keymap.of([{key:'Mod-Enter',run:()=>{run();return true;}},{key:'Mod-s',run:()=>{save();return true;}}]),EditorView.updateListener.of(u=>{if(u.docChanged&&!syncing){clearTimeout(timer);valid=false;status('入力中…','pending');$('#run').disabled=true;timer=setTimeout(fromCode,500);persist();}})]}),parent:$('#editor')});
const status=(msg,type='ok')=>{$('#sync').textContent=type==='ok'?`⇄ ${msg}`:msg;$('#sync').dataset.type=type;};
function persist(){try{localStorage.setItem('scratchplus-v1',JSON.stringify({version:1,title:$('#title').value,code:editor.state.doc.toString(),workspace:Blockly.serialization.workspaces.save(ws)}));}catch{status('自動保存できません。保存ボタンを使ってください','pending');}}
function setCode(code){syncing=true;editor.dispatch({changes:{from:0,to:editor.state.doc.length,insert:code}});syncing=false;}
function updateCount(){$('#block-count').textContent=`${ws.getAllBlocks(false).filter(b=>!b.isShadow()).length} ブロック`;}
function loadProgram(next){
 const oldPositions=ws.getTopBlocks(true).map(b=>b.getRelativeToSurfaceXY());
 const state=programState(next);state.blocks.blocks.forEach((b,i)=>{if(oldPositions[i]){b.x=oldPositions[i].x;b.y=oldPositions[i].y;}});
 syncing=true;Blockly.Events.disable();try{Blockly.serialization.workspaces.load(state,ws);}finally{Blockly.Events.enable();syncing=false;}
 program=next;lastState=Blockly.serialization.workspaces.save(ws);updateCount();
}
function fromCode(){clearTimeout(timer);try{
 const next=parseCode(editor.state.doc.toString());loadProgram(next);valid=true;$('#run').disabled=false;$('#error').textContent='';status('同期済み');persist();return true;
 }catch(e){valid=false;$('#run').disabled=true;$('#error').textContent=e.message;status('コードを確認してください','error');return false;}}
ws.addChangeListener(e=>{if(syncing||e.isUiEvent||e.type===Blockly.Events.FINISHED_LOADING)return;
 updateCount();if(e.type===Blockly.Events.BLOCK_MOVE&&!e.oldParentId&&!e.newParentId&&e.oldCoordinate&&e.newCoordinate){persist();return;}
 if(!valid){status('コードを確認してください','error');$('#error').textContent='コードを修正してからブロックを編集してください。最後の同期状態を保っています。';syncing=true;Blockly.Events.disable();try{if(lastState)Blockly.serialization.workspaces.load(lastState,ws);}finally{Blockly.Events.enable();syncing=false;}return;}
 try{program=readProgram(ws);setCode(generateCode(program));lastState=Blockly.serialization.workspaces.save(ws);status('同期済み');$('#error').textContent='';persist();}catch(e){$('#error').textContent=e.message;status('ブロックを確認してください','error');}
});
new ResizeObserver(()=>Blockly.svgResize(ws)).observe($('#blockly'));
const canvas=$('#stage'),ctx=canvas.getContext('2d');
function draw(s,running){
 ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,480,360);ctx.fillStyle='#fff';ctx.fillRect(0,0,480,360);ctx.strokeStyle='#f0f2f7';ctx.lineWidth=1;
 for(let x=0;x<=480;x+=30){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,360);ctx.stroke();}for(let y=0;y<=360;y+=30){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(480,y);ctx.stroke();}
 ctx.strokeStyle='#dce2ed';ctx.beginPath();ctx.moveTo(240,0);ctx.lineTo(240,360);ctx.moveTo(0,180);ctx.lineTo(480,180);ctx.stroke();
 const px=240+s.x,py=180-s.y;
 if(s.visible){ctx.save();ctx.translate(px,py);ctx.rotate((s.direction-90)*Math.PI/180);ctx.scale(s.size/100,s.size/100);ctx.font='56px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🐈',0,0);ctx.restore();}
 const speech=$('#speech');speech.textContent=s.speech;speech.hidden=!s.speech||!s.visible;speech.style.left=`${Math.max(8,Math.min(75,px/480*100))}%`;speech.style.top=`${Math.max(8,Math.min(80,(py-45)/360*100))}%`;
 $('#variables').replaceChildren(...Object.entries(s.variables).map(([key,v])=>{const el=document.createElement('div');el.className='variable-pill';el.textContent=`${key}　${v}`;return el;}));
 for(const key of ['x','y','direction'])$(`#${key}`).textContent=Math.round(s[key]);$('#run-state').textContent=running?'実行中':'停止中';$('#run-state').classList.toggle('running',running);
}
const runtime=new Runtime(draw,message=>{$('#error').textContent=`実行エラー: ${message}`;runtime.stop();});runtime.notify();
function run(){if(!fromCode())return;runtime.start(program);canvas.focus();}
$('#run').onclick=run;$('#stop').onclick=()=>runtime.stop();$('#reset').onclick=()=>{runtime.stop();Object.assign(runtime.state,{x:0,y:0,direction:90,size:100,visible:true,speech:'',variables:{}});runtime.notify();};
window.addEventListener('keydown',e=>{if(e.target!==canvas)return;if(['ArrowRight','ArrowLeft','ArrowUp','ArrowDown',' '].includes(e.key))e.preventDefault();if(!e.repeat)runtime.keyDown(e.key);});window.addEventListener('keyup',e=>runtime.keys.delete(e.key));window.addEventListener('blur',()=>runtime.keys.clear());
$('#format').onclick=()=>{if(fromCode()){setCode(generateCode(program));persist();}};$('#fit').onclick=()=>ws.zoomToFit();
$('#title').addEventListener('input',persist);
$('#example').onchange=e=>{const example=examples[e.target.value];if(!example)return;runtime.stop();$('#title').value=example.title;setCode(example.code);fromCode();ws.scrollCenter();e.target.value='';};
function save(){const data={version:1,title:$('#title').value,code:editor.state.doc.toString(),workspace:Blockly.serialization.workspaces.save(ws)};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=($('#title').value||'ScratchPlus').replace(/[\\/:*?"<>|]/g,'_')+'.scratchplus.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('#save').onclick=save;$('#load').onclick=()=>$('#file').click();
$('#file').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>2_000_000)throw new Error('ファイルは2MB以内にしてください');const data=JSON.parse(await file.text());if(data.version!==1||typeof data.code!=='string')throw new Error('Scratch＋の保存ファイルを選んでください');const next=parseCode(data.code);runtime.stop();$('#title').value=data.title||'読み込んだプロジェクト';setCode(data.code);loadProgram(next);fromCode();ws.scrollCenter();}catch(err){$('#error').textContent=`読み込みできません: ${err.message}`;}finally{e.target.value='';}};
$('#help').onclick=()=>$('#help-dialog').showModal();$('#close-help').onclick=()=>$('#help-dialog').close();$('#help-dialog').addEventListener('click',e=>{if(e.target===$('#help-dialog'))$('#help-dialog').close();});
try{const data=JSON.parse(localStorage.getItem('scratchplus-v1'));if(data&&typeof data.code==='string'){
 $('#title').value=data.title||examples.hello.title;if(data.workspace){syncing=true;Blockly.serialization.workspaces.load(data.workspace,ws);syncing=false;lastState=Blockly.serialization.workspaces.save(ws);}setCode(data.code);fromCode();
}else{setCode(examples.hello.code);fromCode();}}catch{syncing=false;setCode(examples.hello.code);fromCode();}
// Expose a narrow diagnostics surface for automated editor verification.
window.scratchPlus={get code(){return editor.state.doc.toString();},setCode(code){setCode(code);return fromCode();},get program(){return program;},workspace:ws,runtime,examples};
