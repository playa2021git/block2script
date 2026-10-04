module.exports=function(source){
 if(this.resourcePath.endsWith('extension-manager.js'))source=source.replace(/^builtinExtensions\['cameraselector'\].*$/gm,'');
 if(this.resourcePath.endsWith('index.jsx'))source=source.replace(/^import cameraselectorEntry.*$/gm,'').replace(/^ cameraselectorEntry,.*$/gm,'');
 return source;
};
