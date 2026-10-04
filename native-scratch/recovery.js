export class RecoveryStore {
 constructor({name='block2script-recovery',limit=10}={}){this.name=name;this.limit=limit;this.connection=null;}
 async open(){
  if(!this.connection)this.connection=new Promise((resolve,reject)=>{
   const request=indexedDB.open(this.name,1);
   request.onupgradeneeded=()=>{request.result.createObjectStore('snapshots',{keyPath:'id',autoIncrement:true});};
   request.onsuccess=()=>{const db=request.result;db.onversionchange=()=>{db.close();this.connection=null;};resolve(db);};
   request.onerror=()=>{this.connection=null;reject(request.error);};
   request.onblocked=()=>{this.connection=null;reject(new Error('ほかの画面で自動保存領域が使用されています'));};
  });return this.connection;
 }
 async save(snapshot){
  const {id:previousId,...record}=snapshot;
  const db=await this.open();return new Promise((resolve,reject)=>{
   const tx=db.transaction('snapshots','readwrite'),store=tx.objectStore('snapshots');let id;
   store.add(record).onsuccess=e=>{id=e.target.result;};
   const all=store.getAll();all.onsuccess=()=>{all.result.sort((a,b)=>b.id-a.id).slice(this.limit).forEach(item=>store.delete(item.id));};
   tx.oncomplete=()=>resolve({...record,id});tx.onabort=()=>reject(tx.error||new Error('自動保存を完了できませんでした'));
  });
 }
 async list(){const db=await this.open();return new Promise((resolve,reject)=>{const tx=db.transaction('snapshots','readonly');let values=[];tx.objectStore('snapshots').getAll().onsuccess=e=>{values=e.target.result;};tx.oncomplete=()=>resolve(values.sort((a,b)=>b.id-a.id));tx.onabort=()=>reject(tx.error);});}
}
export function captureDrafts(targets,drafts,activeId){
 return targets.map((target,index)=>({index,name:target.getName(),isStage:target.isStage,source:drafts.get(target.id),active:target.id===activeId}));
}
export function mapDrafts(targets,entries){
 const drafts=new Map();let activeId;
 for(const entry of entries){const target=targets[entry.index];if(!target||target.isStage!==entry.isStage||target.getName()!==entry.name)continue;if(typeof entry.source==='string')drafts.set(target.id,entry.source);if(entry.active)activeId=target.id;}
 return {drafts,activeId};
}

