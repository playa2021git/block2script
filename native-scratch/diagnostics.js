// Candidates always come from the current editor's real block definitions.
export function suggestNames(name,names){
 if(typeof name!=='string')return [];
 const distance=(a,b)=>{
  let row=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){
   const next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));row=next;
  }return row[b.length];
 };
 const prefix=name.includes('_')?name.split('_')[0]+'_':null;
 return [...new Set(names)].filter(n=>typeof n==='string'&&n!==name&&(!prefix||n.startsWith(prefix)))
  .map(n=>({name:n,score:distance(name.toLowerCase(),n.toLowerCase())}))
  .filter(n=>n.score<=Math.max(2,Math.floor(name.length*.3)))
  .sort((a,b)=>a.score-b.score||a.name.localeCompare(b.name)).slice(0,3).map(n=>n.name);
}
