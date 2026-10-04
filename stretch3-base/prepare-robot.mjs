import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
const dir=resolve('stretch3-base/scratch-gui-3.6.18/src/lib/default-project');
const costumes=[];
for(let i=1;i<=2;i++){
 const data=await readFile('block2script_robot_costume_'+i+'.png'),id=createHash('md5').update(data).digest('hex');
 const width=data.readUInt32BE(16),height=data.readUInt32BE(20);
 await writeFile(resolve(dir,id+'.png'),data);
 costumes.push({id,width,height});
}
let index=await readFile(resolve(dir,'index.js'),'utf8');
index=index.replace(/import costume1 from [^;]+;/,"import costume1 from '!arraybuffer-loader!./"+costumes[0].id+".png';").replace(/import costume2 from [^;]+;/,"import costume2 from '!arraybuffer-loader!./"+costumes[1].id+".png';");
for(let i=0;i<2;i++)index=index.replace(new RegExp("id: '[^']+',\\s*assetType: 'Image(?:Vector|Bitmap)',\\s*dataFormat: '(?:SVG|PNG)',\\s*data: (?:encoder.encode\\(costume"+(i+1)+"\\)|new Uint8Array\\(costume"+(i+1)+"\\))"),"id: '"+costumes[i].id+"',\n        assetType: 'ImageBitmap',\n        dataFormat: 'PNG',\n        data: new Uint8Array(costume"+(i+1)+")");
await writeFile(resolve(dir,'index.js'),index);
let project=await readFile(resolve(dir,'project-data.js'),'utf8');
const sprite=project.indexOf('isStage: false');
let part=project.slice(sprite);
part=part.replace(/name: (?:translator\(messages.sprite, \{index: 1\}\)|'Block2Bot')/,"name: 'Block2Bot'");
const start=part.indexOf('costumes: ['),end=part.indexOf('sounds: [',start);
part=part.slice(0,start)+'costumes: '+JSON.stringify(costumes.map((c,i)=>({assetId:c.id,name:'Block2Bot-'+(i+1),bitmapResolution:2,md5ext:c.id+'.png',dataFormat:'png',rotationCenterX:c.width/2,rotationCenterY:c.height/2})),null,4)+',\n                '+part.slice(end);
part=part.replace(/size: \d+/, 'size: 40');
await writeFile(resolve(dir,'project-data.js'),project.slice(0,sprite)+part);
console.log('Block2Bot default project prepared with two original PNG costumes.');
