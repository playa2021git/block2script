import {readFile,writeFile,cp,mkdir,access} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
const publicBuild=process.env.BLOCK2SCRIPT_PUBLIC_BUILD==='1';
const base=resolve('stretch3-base'), gui=resolve(base,'scratch-gui-3.6.18');
async function patch(file,marker,change){const path=resolve(gui,file);let text=await readFile(path,'utf8');if(text.includes(marker))return;await writeFile(path,change(text));}
const extensions=[
 {id:'speech2scratch',name:'Speech2Scratch',repo:'champierre/speech2scratch',commit:'b6d0f4ed9d349d620c0ccba74acf75e90505d09b',license:'AGPL-3.0',camera:false,microphone:true},
 {id:'tm2scratch',name:'TM2Scratch',repo:'champierre/tm2scratch',commit:'d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e',license:'AGPL-3.0',camera:true},
 {id:'ml2scratch',name:'ML2Scratch',repo:'champierre/ml2scratch',commit:'ba1ad68ebd04ec06f4992390b3ad91c1e36486cc',license:'AGPL-3.0',camera:true},
 {id:'posenet2scratch',name:'PoseNet2Scratch',repo:'champierre/posenet2scratch',commit:'94f396d749010353bc7254af0be92a2e0ef52559',license:'AGPL-3.0',camera:true}
];
for(const ext of extensions){
 const source=resolve(base,`${ext.id}-${ext.commit}`);
 await cp(resolve(source,`scratch-vm/src/extensions/scratch3_${ext.id}`),resolve(gui,`node_modules/scratch-vm/src/extensions/scratch3_${ext.id}`),{recursive:true});
 await cp(resolve(source,`scratch-gui/src/lib/libraries/extensions/${ext.id}`),resolve(gui,`src/lib/libraries/extensions/${ext.id}`),{recursive:true});
}
// TM2Scratch shares the pinned local ml5 dependency and explicit camera start.
const tmPath=resolve(gui,'node_modules/scratch-vm/src/extensions/scratch3_tm2scratch/index.js');
let tm=await readFile(tmPath,'utf8');
tm=tm.replace("const formatMessage = require('format-message');", "const formatMessage = require('format-message');\nconst ml5 = require('ml5');");
tm=tm.replace('const media = navigator.mediaDevices.getUserMedia({', 'const media = this.runtime.ioDevices.video.enableVideo().then(() => navigator.mediaDevices.getUserMedia({').replace('audio: false\n        });','audio: false\n        }));');
tm=tm.replace('this.video.srcObject = stream;\n        });',"this.video.srcObject = stream;\n        }).catch(error => log.warn('TM2Scratch camera: ' + error.message));");
tm=tm.replace(/        let script = document\.createElement\('script'\);[\s\S]*?document\.head\.appendChild\(script\);/, '        // ml5 is bundled locally at the pinned version.');
await writeFile(tmPath,tm);
// Register each source extension independently so adding one survives reruns.
for(const ext of extensions){
 await patch('node_modules/scratch-vm/src/extension-support/extension-manager.js', "builtinExtensions['"+ext.id+"']", text=>text.replace('class ExtensionManager {', "builtinExtensions['"+ext.id+"'] = () => require('../extensions/scratch3_"+ext.id+"');\nclass ExtensionManager {"));
 await patch('src/lib/libraries/extensions/index.jsx', 'import '+ext.id+'Icon', text=>text.replace('export default [', "import "+ext.id+"Icon from './"+ext.id+"/"+ext.id+".png';\nimport "+ext.id+"Inset from './"+ext.id+"/"+ext.id+"-small.png';\nexport default [\n {name:"+JSON.stringify(ext.name)+",extensionId:"+JSON.stringify(ext.id)+",collaborator:'champierre',iconURL:"+ext.id+"Icon,insetIconURL:"+ext.id+"Inset,description:"+JSON.stringify(ext.id==='speech2scratch'?'話した言葉を文字に変換します。':ext.id==='tm2scratch'?'画像や音声の学習モデルを使って認識します。':ext.name)+",featured:true,disabled:false,internetConnectionRequired:true,bluetoothRequired:false},"));
}
const speechPath=resolve(gui,'node_modules/scratch-vm/src/extensions/scratch3_speech2scratch/index.js');
let speech=await readFile(speechPath,'utf8');
speech=speech.replace('const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;', 'const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;');
speech=speech.replace("        this.speech = '';\n    }", "        this.speech = '';\n        this.recognition = null;\n        runtime.on('PROJECT_STOP_ALL', () => { if (this.recognition) this.recognition.abort(); });\n    }");
speech=speech.replace('        const recognition = new SpeechRecognition();', "        if (!SpeechRecognition) { this.speech = 'このブラウザーは音声認識に対応していません'; return; }\n        if (this.recognition) return;\n        const recognition = this.recognition = new SpeechRecognition();\n        recognition.onend = () => { this.recognition = null; };\n        recognition.onerror = event => { this.speech = '音声認識エラー: ' + event.error; this.recognition = null; };");
speech=speech.replace('        recognition.start();', "        try { recognition.start(); } catch (error) { this.recognition = null; this.speech = '音声認識を開始できません: ' + error.message; }");
await writeFile(speechPath,speech);
if(!publicBuild){
// Camera Selector: build readable fixed upstream source against the native VM.
const cameraSource=resolve(base,'xcx-cameraselector-8ada859f8d6b2e978a3c1bd5cebc5f1af8ce2088');
const cameraPath=resolve(gui,'node_modules/scratch-vm/src/extensions/cameraselector');
await cp(resolve(cameraSource,'src/vm/extensions/block'),cameraPath,{recursive:true});
let camera=await readFile(resolve(cameraPath,'index.js'),'utf8');
camera=camera.replace("navigator.permissions.query({ name: \"camera\" }).then(p => p.addEventListener('change', () => this._onChangeMediaDevice()))", "if (navigator.permissions && navigator.permissions.query) navigator.permissions.query({ name: 'camera' }).then(p => p.addEventListener('change', () => this._onChangeMediaDevice())).catch(() => {});");
camera=camera.replace('if (video == null) {', 'if (video == null || !this._videoProvider || !this._videoProvider.enabled) {');
camera=camera.replace('this._openVideoStream(this._video)\n', 'this._openVideoStream(this._video).catch(() => {})\n').replace('this._openVideoStream(newVideo)\n', 'this._openVideoStream(newVideo).catch(() => {})\n');
await writeFile(resolve(cameraPath,'index.js'),camera);
await cp(resolve(cameraSource,'src/gui/lib/libraries/extensions/entry'),resolve(gui,'src/lib/libraries/extensions/cameraselector'),{recursive:true});
await patch('node_modules/scratch-vm/src/extension-support/extension-manager.js', "builtinExtensions['cameraselector']", text=>text.replace('class ExtensionManager {', "builtinExtensions['cameraselector'] = () => { const extension = require('../extensions/cameraselector').blockClass; extension.formatMessage = require('format-message'); return extension; };\nclass ExtensionManager {"));
await patch('src/lib/libraries/extensions/index.jsx', 'import cameraselectorEntry', text=>text.replace('export default [', "import cameraselectorEntry from './cameraselector/index-stretch3.jsx';\nexport default [\n cameraselectorEntry,"));
}
const more=resolve(base,'mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877');
await mkdir(resolve(gui,'node_modules/scratch-vm/src/extensions/microbitMore'),{recursive:true});
await cp(resolve(more,'dist/microbitMore.mjs'),resolve(gui,'node_modules/scratch-vm/src/extensions/microbitMore/microbitMore.mjs'));
await cp(resolve(more,'src/gui/lib/libraries/extensions/entry'),resolve(gui,'src/lib/libraries/extensions/microbitMore'),{recursive:true});
await cp(resolve(more,'src/gui/lib/libraries/extensions/entry/index-stretch3.jsx'),resolve(gui,'src/lib/libraries/extensions/microbitMore/index.jsx'));
// format-message expects 'default', whereas React Intl expects 'defaultMessage'.
const moreEntryPath=resolve(gui,'src/lib/libraries/extensions/microbitMore/index.jsx');
let moreEntry=await readFile(moreEntryPath,'utf8');
moreEntry=moreEntry.replaceAll('defaultMessage:', 'default:').replace("'MicroBit More'", "'micro:bit More'").replace("'Play with all functions of micro:bit.'", "'micro:bitのセンサーやLEDなど、さまざまな機能を使います。'").replace("'Connecting'", "'接続しています…'");
await writeFile(moreEntryPath,moreEntry);
await patch('node_modules/scratch-vm/src/extension-support/extension-manager.js','// Block2Script Stretch3 builtins',text=>text.replace('class ExtensionManager {',"// Block2Script Stretch3 builtins\nbuiltinExtensions.microbitMore = () => {const extension = require('../extensions/microbitMore/microbitMore.mjs').blockClass; extension.formatMessage = require('format-message'); return extension;};\nclass ExtensionManager {"));
await patch('src/lib/libraries/extensions/index.jsx','// Block2Script Stretch3 library',text=>text.replace('export default [',"// Block2Script Stretch3 library\nimport microbitMoreEntry from './microbitMore/index.jsx';\nexport default [\n microbitMoreEntry,"));
const bridge=`// Explicit Block2Script connection to Stretch3's own VM and workspace.\nlet store, controller;\nconst waiters=[];\nlet enableVideo, cameraStarted=false;\nconst supported={speech2scratch:{name:'Speech2Scratch',camera:false,microphone:true},cameraselector:{name:'Camera Selector',camera:true},tm2scratch:{name:'TM2Scratch',camera:true},ml2scratch:{name:'ML2Scratch',camera:true},posenet2scratch:{name:'PoseNet2Scratch',camera:true},microbitMore:{name:'micro:bit More',camera:false}};\nfunction publish(){\n if(!store||!controller)return;\n const vm=store.getState().scratchGui.vm;\n if(!enableVideo){const video=vm.runtime.ioDevices.video;enableVideo=video.enableVideo.bind(video);video.enableVideo=()=>cameraStarted?enableVideo():new Promise(resolve=>waiters.push(resolve));}\n window.scratchNative={state:{store},vm,getController:()=>controller,stretch:{supported,load:id=>{if(!supported[id])return Promise.reject(new Error('未対応の拡張です'));return vm.extensionManager.loadExtensionURL(id);},startCamera:async()=>{await enableVideo();if(!vm.runtime.ioDevices.video.provider?.video?.srcObject&&!vm.runtime.ioDevices.video.provider?._video?.srcObject)throw new Error('カメラの許可を確認してください');cameraStarted=true;waiters.splice(0).forEach(resolve=>resolve());}}};\n window.parent.postMessage({type:'scratch-native-ready'},window.location.origin);\n}\nexport function connectStore(value){store=value;publish();}\nexport function connectBlocks(value){controller=value;publish();}\nexport function disconnectBlocks(value){if(controller===value)controller=null;}\n`;
await writeFile(resolve(gui,'src/lib/block2script-bridge.js'),publicBuild?bridge.replace("cameraselector:{name:'Camera Selector',camera:true},",''):bridge);
await patch('src/lib/app-state-hoc.jsx','import {connectStore}',text=>text.replace("import React from 'react';","import React from 'react';\nimport {connectStore} from './block2script-bridge';").replace('        componentDidUpdate (prevProps) {','        componentDidMount () {\n            if (!localesOnly) connectStore(this.store);\n        }\n        componentDidUpdate (prevProps) {'));
await patch('src/containers/blocks.jsx','import {connectBlocks',text=>text.replace("import VMScratchBlocks from '../lib/blocks';","import VMScratchBlocks from '../lib/blocks';\nimport {connectBlocks, disconnectBlocks} from '../lib/block2script-bridge';").replace('this.workspace = this.ScratchBlocks.inject(this.blocks, workspaceConfig);','this.workspace = this.ScratchBlocks.inject(this.blocks, workspaceConfig);\n        connectBlocks(this);').replace('    componentWillUnmount () {','    componentWillUnmount () {\n        disconnectBlocks(this);'));
await patch('src/playground/render-gui.jsx','// Block2Script local editor',text=>text.replace('                backpackVisible','                // Block2Script local editor\n                backpackVisible={false}').replace('                showComingSoon','                showComingSoon={false}').replace('                onClickLogo={onClickLogo}','                onClickLogo={() => {}}'));
// Webpack 4 needs the upstream-pinned version of peculiar/webcrypto.
const pkg=JSON.parse(await readFile(resolve(gui,'package.json'),'utf8'));
pkg.dependencies.ml5='0.12.2';pkg.overrides={...pkg.overrides,'@peculiar/webcrypto':'1.5.0'};
await writeFile(resolve(gui,'package.json'),JSON.stringify(pkg,null,2)+'\n');
let previousRecords=[];try{previousRecords=JSON.parse(await readFile(resolve(base,'extensions-manifest.json'),'utf8'));}catch{}
const records=[...extensions,{id:'cameraselector',archiveName:'xcxCameraSelector',name:'Camera Selector',repo:'tfabworks/xcx-cameraselector',commit:'8ada859f8d6b2e978a3c1bd5cebc5f1af8ce2088',license:'UNSPECIFIED_IN_UPSTREAM',camera:true},{id:'microbitMore',name:'micro:bit More',repo:'microbit-more/mbit-more-v2',commit:'7d7b216ac046f03472cfe5de267ca7db9ae0e877',license:'MIT'}];
for(const ext of records.filter(ext=>!publicBuild||ext.id!=='cameraselector')){ext.sourceURL='https://github.com/'+ext.repo+'/tree/'+ext.commit;ext.archiveSha256=createHash('sha256').update(await readFile(resolve(base,(ext.archiveName||ext.id)+'.tar.gz'))).digest('hex');const prior=previousRecords.find(record=>record.id===ext.id&&record.commit===ext.commit&&record.archiveSha256===ext.archiveSha256);ext.implementationStatus=prior?.implementationStatus??'BUILTIN_SOURCE_REGISTERED';ext.testStatus=prior?.testStatus??'PENDING';ext.hardwareTestStatus=prior?.hardwareTestStatus??'UNTESTED';}
await writeFile(resolve(base,'extensions-manifest.json'),JSON.stringify(records.filter(ext=>!publicBuild||ext.id!=='cameraselector'),null,2)+'\n');
console.log('Stretch3 builtins and explicit VM/workspace connection prepared.');

import './prepare-robot.mjs';
