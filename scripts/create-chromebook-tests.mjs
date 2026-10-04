import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const JSZip=require('../stretch3-base/scratch-gui-3.6.18/node_modules/jszip');
const specs=JSON.parse(await fs.readFile('scripts/chromebook-extension-blocks.json','utf8'));
const out='docs/chromebook-tests';await fs.mkdir(out,{recursive:true});
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const robot=await fs.readFile('block2script_robot_costume_1.png');const robotId=createHash('md5').update(robot).digest('hex');
const cases=[
 {n:1,title:'基本動作・標準拡張',ext:['pen','music','text2speech','translate'],lines:['緑の旗：四角形を描き、音を鳴らす','S：日本語で「こんにちは」と読み上げる','T：hello を日本語に翻訳する','合格：四角形・音・読み上げ・「こんにちは」','各操作は分けて確認。赤い停止ボタンで終了。']},
 {n:2,title:'音声認識',ext:['speech2scratch'],lines:['緑の旗：準備。R：音声認識を開始','マイクを許可し「こんにちは」と話す','合格：「認識した言葉」に発話内容が出る','マイク音量も表示。0のままなら設定を確認。','終了：赤い停止ボタン後、タブを閉じる。']},
 {n:3,title:'カメラ・画像学習',ext:['ml2scratch'],lines:['緑の旗：カメラ開始。モデル読込を待つ','顔/物Aを映し1を数回、物Bを映し2を数回','C：分類開始。A/Bを交互にカメラへ向ける','合格：学習枚数が増え、ラベルが1/2に変わる','学習データはsb3に含まれない。終了はタブを閉じる。']},
 {n:4,title:'姿勢認識・TMモデル',ext:['posenet2scratch','tm2scratch'],lines:['P：姿勢認識。カメラを許可して顔を動かす','合格：人数が1以上、鼻の座標が変わる','I：TM画像モデル読込・分類（姿勢テスト後）','A：TM音声モデル読込。マイクを許可し音を出す','TM画像=グー/チョキ/パー。TM音声=拍手/口笛。','各モデルの初回取得は数十秒待つ。']},
 {n:5,title:'micro:bit More',ext:['microbitMore'],lines:['専用ファームウェア導入済みmicro:bitが必要','拡張の接続ボタンでBluetooth接続後、緑の旗','合格：micro:bitに B2S が流れる','ボタンA/B：画面表示。傾ける：角度が変わる','接続なしの0表示だけでは合格にしない。']}
];
for(const c of cases){
let seq=0;const blocks={},variables={},monitors=[];
function block(op,args={},fields={},shadow=false){const id='b'+(++seq);const b=blocks[id]={opcode:op,next:null,parent:null,inputs:{},fields,shadow,topLevel:false};
for(const [key,val] of Object.entries(args)){
 if(val&&typeof val==='object'&&val.ref){b.inputs[key]=[2,val.ref];blocks[val.ref].parent=id;continue;}
 const [ext,...parts]=op.split('_');const def=specs[ext]?.[parts.join('_')]?.[key];
 if(def?.field){b.fields[key]=[String(val),null];}
 else if(def?.menu){const child=block(ext+'_menu_'+def.menu,{}, {[def.menu]:[String(val),null]},true);blocks[child].parent=id;b.inputs[key]=[1,child];}
 else b.inputs[key]=[1,[typeof val==='number'?4:10,String(val)]];
}return id;}
const ref=(op,args={})=>({ref:block(op,args)});
function chain(ids,parent=null){ids.forEach((id,i)=>{blocks[id].parent=i?ids[i-1]:parent;blocks[id].next=ids[i+1]||null;});return ids[0];}
function script(key,ids,x=35,y=40){const h=key==='flag'?block('event_whenflagclicked'):block('event_whenkeypressed',{}, {KEY_OPTION:[key,null]});blocks[h].topLevel=true;blocks[h].x=x;blocks[h].y=y;blocks[h].next=chain(ids,h);return h;}
const say=t=>block('looks_say',{MESSAGE:t});const wait=n=>block('control_wait',{DURATION:n});
function value(name,report){const v='v'+name;variables[v]=[name,0];if(!monitors.some(m=>m.id===v))monitors.push({id:v,mode:'default',opcode:'data_variable',params:{VARIABLE:name},spriteName:'Block2Bot',value:0,width:0,height:0,x:8,y:185+monitors.length*26,visible:true,sliderMin:0,sliderMax:100,isDiscrete:true});return block('data_setvariableto',{VALUE:report},{VARIABLE:[name,v]});}
function loop(ids){const b=block('control_forever');blocks[b].inputs.SUBSTACK=[2,chain(ids,b)];return b;}
if(c.n===1){const repeat=block('control_repeat',{TIMES:4});blocks[repeat].inputs.SUBSTACK=[2,chain([block('motion_movesteps',{STEPS:80}),block('motion_turnright',{DEGREES:90})],repeat)];
script('flag',[block('motion_gotoxy',{X:40,Y:-40}),block('motion_pointindirection',{DIRECTION:90}),block('pen_clear'),block('pen_setPenSizeTo',{SIZE:3}),block('pen_penDown'),repeat,block('pen_penUp'),block('music_setTempo',{TEMPO:100}),block('music_playNoteForBeats',{NOTE:60,BEATS:0.5}),say('四角形と音を確認。S=読み上げ T=翻訳')]);
script('s',[block('text2speech_setLanguage',{LANGUAGE:'ja'}),block('text2speech_setVoice',{VOICE:'ALTO'}),block('text2speech_speakAndWait',{WORDS:'こんにちは。クロームブックのテストです。'}),say('読み上げが聞こえたら合格')],450);
script('t',[say('翻訳を取得中…'),value('翻訳結果',ref('translate_getTranslate',{WORDS:'hello',LANGUAGE:'ja'})),say('左下の翻訳結果を確認')],850);
}
if(c.n===2){script('flag',[say('Rを押してマイクを許可。「こんにちは」と話してください')]);script('r',[block('speech2scratch_startRecognition'),loop([value('認識した言葉',ref('speech2scratch_getSpeech')),value('マイク音量',ref('sensing_loudness')),wait(0.3)])],450);}
if(c.n===3){script('flag',[block('ml2scratch_toggleClassification',{CLASSIFICATION_STATE:'off'}),block('ml2scratch_reset',{LABEL:'all'}),block('ml2scratch_videoToggle',{VIDEO_STATE:'on'}),say('モデル読込を待ち、物Aで1、物Bで2を数回押す'),loop([value('ラベル1枚数',ref('ml2scratch_getCountByLabel1')),value('ラベル2枚数',ref('ml2scratch_getCountByLabel2')),value('画像ラベル',ref('ml2scratch_getLabel')),wait(0.3)])]);script('1',[block('ml2scratch_addExample1')],450);script('2',[block('ml2scratch_addExample2')],650);script('c',[block('ml2scratch_toggleClassification',{CLASSIFICATION_STATE:'on'}),say('物A/物Bを映して画像ラベルの変化を確認')],850);}
if(c.n===4){script('flag',[say('P=姿勢 I=TM画像 A=TM音声。順に試してください')]);script('p',[block('posenet2scratch_videoToggle',{VIDEO_STATE:'on'}),loop([value('人数',ref('posenet2scratch_getPeopleCount')),value('鼻X',ref('posenet2scratch_getNoseX')),value('鼻Y',ref('posenet2scratch_getNoseY')),wait(0.3)])],450);
script('i',[say('TM画像モデルを取得中…'),block('tm2scratch_setImageClassificationModelURL',{URL:'https://teachablemachine.withgoogle.com/models/0rX_3hoH/'}),block('tm2scratch_videoToggle',{VIDEO_STATE:'on'}),block('tm2scratch_toggleClassification',{CLASSIFICATION_STATE:'on'}),loop([value('TM画像ラベル',ref('tm2scratch_getImageLabel')),wait(0.4)])],850);
script('a',[say('TM音声モデルを取得中…'),block('tm2scratch_setSoundClassificationModelURL',{URL:'https://teachablemachine.withgoogle.com/models/xP0spGSB/'}),loop([value('TM音声ラベル',ref('tm2scratch_getSoundLabel')),wait(0.4)])],1250);}
if(c.n===5){script('flag',[block('microbitMore_displayText',{TEXT:'B2S',DELAY:120}),loop([value('ボタンA',ref('microbitMore_isButtonPressed',{NAME:'A'})),value('ボタンB',ref('microbitMore_isButtonPressed',{NAME:'B'})),value('明るさ',ref('microbitMore_getLightLevel')),value('傾き',ref('microbitMore_getPitch')),wait(0.2)])]);}
const standardMenus={text2speech_setLanguage:['LANGUAGE','text2speech_menu_languages','languages'],text2speech_setVoice:['VOICE','text2speech_menu_voices','voices'],translate_getTranslate:['LANGUAGE','translate_menu_languages','languages']};
for(const b of Object.values(blocks)){const m=standardMenus[b.opcode];if(m){const old=b.inputs[m[0]][1][1];const id=block(m[1],{},{[m[2]]:[old,null]},true);blocks[id].parent=Object.entries(blocks).find(([,v])=>v===b)[0];b.inputs[m[0]]=[1,id];}}
const svg=Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360"><rect width="480" height="360" fill="#eef5ff"/><g font-family="sans-serif" fill="#16324f"><text x="12" y="30" font-size="21">テスト'+c.n+'：'+escape(c.title)+'</text>'+c.lines.map((l,i)=>'<text x="12" y="'+(58+i*22)+'" font-size="13">'+escape(l)+'</text>').join('')+'</g></svg>');const assetId=createHash('md5').update(svg).digest('hex');
const common={variables:{},lists:{},broadcasts:{},blocks:{},comments:{},currentCostume:0,sounds:[],volume:100};
const project={targets:[{...common,isStage:true,name:'Stage',costumes:[{assetId,name:'確認手順',bitmapResolution:1,md5ext:assetId+'.svg',dataFormat:'svg',rotationCenterX:240,rotationCenterY:180}],tempo:60,videoTransparency:65,videoState:'off',textToSpeechLanguage:'ja'},{...common,isStage:false,name:'Block2Bot',blocks,variables,comments:{instructions:{blockId:null,x:30,y:850,width:420,height:200,minimized:false,text:c.lines.join('\n')}},costumes:[{assetId:robotId,name:'Block2Bot',bitmapResolution:1,md5ext:robotId+'.png',dataFormat:'png',rotationCenterX:512,rotationCenterY:512}],visible:true,x:155,y:-90,size:12,direction:90,draggable:false,rotationStyle:'all around'}],monitors,extensions:c.ext,meta:{semver:'3.0.0',vm:'0.2.0',agent:'Block2Script Chromebook tests'}};
const zip=new JSZip();zip.file('project.json',JSON.stringify(project));zip.file(assetId+'.svg',svg);zip.file(robotId+'.png',robot);await fs.writeFile(out+'/テストプログラム'+c.n+'.sb3',await zip.generateAsync({type:'nodebuffer',compression:'DEFLATE'}));console.log('Created test '+c.n+' '+c.ext.join(','));
}
