// Use Scratch's own menus: the duplicate Block2Script controls have been removed.
export async function mockCamera(context){
 await context.addInitScript(()=>{
  if(!navigator.mediaDevices)return;
  navigator.mediaDevices.getUserMedia=async()=>{
   const canvas=document.createElement('canvas');canvas.width=640;canvas.height=480;
   const draw=()=>{const ctx=canvas.getContext('2d');ctx.fillStyle='#24b7ab';ctx.fillRect(0,0,640,480);};
   draw();setInterval(draw,65);return canvas.captureStream(15);
  };
 });
}
export async function saveNative(page){
 const frame=page.frameLocator('#scratch-frame');
 await frame.locator('[class*="menu-bar_menu-bar-item_"]').filter({hasText:/^(ファイル|File)$/}).click();
 await frame.getByText(/^(コンピューターに保存する|Save to your computer)$/).click();
}
export async function loadNative(page,path){
 const frame=page.frameLocator('#scratch-frame');
 await frame.locator('[class*="menu-bar_menu-bar-item_"]').filter({hasText:/^(ファイル|File)$/}).click();
 const chooser=page.waitForEvent('filechooser');
 await page.evaluate(()=>{
  window.nativeLoadCompleted=false;
  document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.runtime.once('PROJECT_LOADED',()=>{window.nativeLoadCompleted=true;});
 });
 page.once('dialog',dialog=>dialog.accept());
 await frame.getByText(/^(コンピューターから読み込む|Load from your computer)$/).click();
 await (await chooser).setFiles(path);
 await page.waitForFunction(()=>window.nativeLoadCompleted,null,{timeout:90000});
 await page.waitForFunction(()=>{
  const target=document.querySelector('#scratch-frame').contentWindow.scratchNative.vm.editingTarget;
  return target&&document.querySelector('#target').textContent===`${target.isStage?'ステージ':'スプライト'}: ${target.getName()} · ${Object.keys(target.blocks._blocks).length} ブロック`;
 },null,{timeout:90000});
}
export async function addNative(page,name){
 const frame=page.frameLocator('#scratch-frame');
 await frame.locator('[class*="gui_extension-button_"]').click();
 const label=name==='Camera Selector'?/^(Camera Selector|カメラセレクター)$/:name==='ペン'?/^(Pen|ペン)$/:name;
 await frame.getByText(label,{exact:true}).click();
}
