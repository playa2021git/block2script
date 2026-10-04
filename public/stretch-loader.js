// Genuine author-distributed Xcratch modules, registered in the real Scratch VM.
export const supported = {
 ml2scratch: {name:'ML2Scratch', file:'ml2scratch.js', camera:true},
 posenet2scratch: {name:'PoseNet2Scratch', file:'posenet2scratch.js', camera:true},
 microbitMore: {name:'micro:bit More', file:'microbitMore.js', camera:false}
};
export function installStretchLoader(vm, importer=url=>import(url)) {
 const pending=new Map();
 const cameraWaiters=[];
 const video=vm.runtime.ioDevices.video;
 const enableVideo=video.enableVideo.bind(video);
 async function startCamera(){
  await enableVideo();
  if(!video.provider?.video?.srcObject)throw new Error('カメラを開始できません。ブラウザーのカメラ許可を確認してください');
  for(const resolve of cameraWaiters.splice(0))resolve();
 }
 const translations={ja:{}};
 const formatter=(message,args={})=>{
  const text=translations.ja[message.id]??message.defaultMessage??message.default??message.id??'';
  return String(text).replace(/\{([^{}]+)\}/g,(_,key)=>args[key]??`{${key}}`);
 };
 formatter.setup=()=>({locale:'ja',translations});
 vm.runtime.formatMessage=formatter;
 async function load(id) {
  if(!supported[id])throw new Error('対象外のStretch3拡張です: '+id);
  if(vm.extensionManager.isExtensionLoaded(id))return;
  if(pending.has(id))return pending.get(id);
  const task=(async()=>{
   const module=await importer('/stretch-extensions/'+supported[id].file);
   const Extension=module.blockClass;
   if(Extension.EXTENSION_ID!==id)throw new Error('拡張IDが一致しません');
   if(id==='microbitMore')Extension.formatMessage=formatter;
   // Upstream constructors immediately enable the camera. Defer that single
   // request until the user explicitly presses Start camera, including on .sb3 load.
   const previous=video.enableVideo;
   let extension;
   try{
    if(supported[id].camera)video.enableVideo=()=>new Promise(resolve=>cameraWaiters.push(resolve));
    extension=new Extension(vm.runtime);
   }finally{video.enableVideo=previous;}
   const info=extension.getInfo();
   if(info.id!==id)throw new Error('拡張定義のIDが一致しません');
   const service=vm.extensionManager._registerInternalExtension(extension);
   vm.extensionManager._loadedExtensions.set(id,service);
   await Promise.resolve();
   // During .sb3 deserialization VM targets have not been installed yet.
   if(vm.editingTarget)vm.emitWorkspaceUpdate();
  })();
  pending.set(id,task);
  try{await task;}finally{pending.delete(id);}
 }
 const original=vm.extensionManager.loadExtensionURL.bind(vm.extensionManager);
 vm.extensionManager.loadExtensionURL=id=>supported[id]?load(id):original(id);
 return {load,supported,startCamera};
}
