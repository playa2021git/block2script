import {defineConfig} from 'vite';
import {readFile} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
export default defineConfig({plugins:[{name:'editor-assets',configureServer(server){
 for(const [route,directory] of Object.entries({'/scratch-dist':'native-scratch/vendor/package/dist','/stretch3-dist':'stretch3-base/scratch-gui-3.6.18/build'}))server.middlewares.use(route,async(req,res,next)=>{
  try{const root=resolve(directory);let relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(relative==='/'||relative==='')relative='/index.html';const path=resolve(root,'.'+relative);
   if(!path.startsWith(root+sep)){res.statusCode=403;res.end();return;}
   res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.css':'text/css','.woff2':'font/woff2','.json':'application/json'})[extname(path)]||'application/octet-stream');res.end(await readFile(path));
  }catch{next();}
 });
}}]});
