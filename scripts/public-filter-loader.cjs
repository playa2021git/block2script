module.exports=function(source){
 if(this.resourcePath.endsWith('extension-manager.js'))source=source.replace(/^builtinExtensions\['cameraselector'\].*$/gm,'');
 if(this.resourcePath.endsWith('index.jsx'))source=source.replace(/^import cameraselectorEntry.*$/gm,'').replace(/^ cameraselectorEntry,.*$/gm,'');
 if(/libraries[\\/](sprites|costumes)\.json$/.test(this.resourcePath)){
  const policy=require('./brand-library-policy.json');
  const sprites=require('../stretch3-base/scratch-gui-3.6.18/src/lib/libraries/sprites.json');
  const ids=new Set(sprites.filter(s=>policy.sprites.includes(s.name)).flatMap(s=>s.costumes.map(c=>c.md5ext)));
  const list=JSON.parse(source);
  source=JSON.stringify(list.filter(item=>this.resourcePath.endsWith('sprites.json')?!policy.sprites.includes(item.name):!ids.has(item.md5ext)));
 }
 return source;
};
