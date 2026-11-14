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

// Inspect the parsed source, never strings/comments or executable JavaScript.
export function unknownCommands(ast,{knownOpcodes,schema}){
 const known=new Set([...knownOpcodes,'script']),groups=new Map();
 function visit(node){
  if(!node||typeof node!=='object')return;
  if(node.type==='CallExpression'&&node.callee.type==='MemberExpression'&&node.callee.object.type==='Identifier'&&node.callee.object.name==='scratch'){
   const property=node.callee.property;
   const opcode=node.callee.computed?property.type==='Literal'?property.value:null:property.name;
   if(typeof opcode==='string'&&!known.has(opcode)){
    const args=node.arguments[0];
    const keys=args?.type==='ObjectExpression'?args.properties.filter(p=>p.type==='Property'&&!p.computed).map(p=>p.key.name??p.key.value):[];
    let candidates=suggestNames(opcode,knownOpcodes);
    if(keys.length&&schema){
     const compatible=candidates.filter(name=>{const def=schema(name,{});return def&&keys.every(key=>Object.hasOwn(def.inputs??{},key)||Object.hasOwn(def.fields??{},key));});
     if(compatible.length)candidates=compatible;
    }
    if(!groups.has(opcode))groups.set(opcode,{opcode,lines:[],suggestions:candidates});
    const group=groups.get(opcode);group.lines.push(node.loc.start.line);
    group.suggestions=group.suggestions.filter(name=>candidates.includes(name));
   }
  }
  for(const [key,value] of Object.entries(node))if(key!=='loc'){
   if(Array.isArray(value))value.forEach(visit);else if(value&&typeof value==='object')visit(value);
  }
 }
 visit(ast);for(const group of groups.values())group.lines=[...new Set(group.lines)];return [...groups.values()];
}
