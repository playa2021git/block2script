import test from 'node:test';
import assert from 'node:assert/strict';
import {installStretchLoader,supported} from '../public/stretch-loader.js';
function fixture(){
 const registered=[],requests=[],cameraPromises=[];
 let starts=0,updates=0;
 const video={provider:{video:{srcObject:null}},enableVideo:async()=>{starts++;video.provider.video.srcObject={};}};
 const manager={_loadedExtensions:new Map(),isExtensionLoaded(id){return this._loadedExtensions.has(id);},_registerInternalExtension(instance){registered.push(instance);return 'service-'+instance.getInfo().id;},loadExtensionURL:async id=>requests.push(id)};
 const vm={runtime:{ioDevices:{video}},extensionManager:manager,emitWorkspaceUpdate(){assert.ok(this.editingTarget);updates++;}};
 const imported=[];
 const loader=installStretchLoader(vm,async url=>{
  imported.push(url);const id=Object.keys(supported).find(id=>url.endsWith(supported[id].file));
  class Extension{
   static EXTENSION_ID=id;
   constructor(runtime){this.runtime=runtime;if(supported[id].camera)cameraPromises.push(runtime.ioDevices.video.enableVideo());}
   getInfo(){return {id,blocks:[]};}
  }
  return {blockClass:Extension};
 });
 return {vm,loader,imported,registered,requests,cameraPromises,get starts(){return starts;},get updates(){return updates;}};
}
test('project restoration registers only supported IDs before targets exist',async()=>{
 const f=fixture();await Promise.all(Object.keys(supported).map(id=>f.vm.extensionManager.loadExtensionURL(id)));
 assert.equal(f.registered.length,3);assert.equal(f.updates,0);assert.equal(f.starts,0);
 for(const id of Object.keys(supported))assert.equal(f.vm.extensionManager.isExtensionLoaded(id),true);
 await f.vm.extensionManager.loadExtensionURL('pen');assert.deepEqual(f.requests,['pen']);
 await assert.rejects(f.loader.load('unknown'),/対象外/);
});
test('concurrent and repeated loads create a single extension instance',async()=>{
 const f=fixture();f.vm.editingTarget={};await Promise.all([f.loader.load('microbitMore'),f.loader.load('microbitMore')]);await f.loader.load('microbitMore');
 assert.equal(f.registered.length,1);assert.equal(f.imported.length,1);assert.equal(f.updates,1);
});
test('camera acquisition stays deferred until explicit start and restores original video method',async()=>{
 const f=fixture(),original=f.vm.runtime.ioDevices.video.enableVideo;
 await f.loader.load('ml2scratch');await f.loader.load('posenet2scratch');
 assert.equal(f.starts,0);assert.equal(f.vm.runtime.ioDevices.video.enableVideo,original);
 await f.loader.startCamera();await Promise.all(f.cameraPromises);assert.equal(f.starts,1);
});
