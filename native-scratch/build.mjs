import {build} from 'vite';
import {cp,writeFile,mkdir,access} from 'node:fs/promises';
import {resolve,sep} from 'node:path';
const publicBuild=process.env.BLOCK2SCRIPT_PUBLIC_BUILD==='1';
const out=publicBuild?'pages-dist':'dist';
const gui=resolve('stretch3-base/scratch-gui-3.6.18');
const editor=publicBuild?resolve('.public-build/editor'):resolve(gui,'build');
if(publicBuild)process.env.VITE_PUBLIC_BUILD='1';
await access(resolve(editor,'index.html'));
await build({plugins:publicBuild?[{name:'compiled-license-modules',async generateBundle(){await writeFile('.public-build/panel-modules.json',JSON.stringify([...this.getModuleIds()]));}}]:[],configFile:false,publicDir:publicBuild?false:'public',base:publicBuild?(process.env.BLOCK2SCRIPT_BASE||'/block2script/'):'/',build:{outDir:out}});
await cp(editor,resolve(out,'stretch3-dist'),{recursive:true,filter:path=>!path.endsWith('.map')});
await mkdir(out+'/licenses',{recursive:true});
for(const [file,label] of [['LICENSE','SCRATCH-GUI-LICENSE.txt'],['node_modules/scratch-vm/LICENSE','SCRATCH-VM-LICENSE.txt'],['node_modules/scratch-blocks/LICENSE','SCRATCH-BLOCKS-LICENSE.txt']])await cp(resolve(gui,file),resolve(out+'/licenses',label));
await cp('LICENSE',out+'/licenses/BLOCK2SCRIPT-LICENSE.txt');
await cp('stretch3-base/NOTICE.md',out+'/licenses/NOTICE.md');
for(const [directory,label] of [['speech2scratch-b6d0f4ed9d349d620c0ccba74acf75e90505d09b','Speech2Scratch'],['tm2scratch-d018790a8afbb2bfc793ea6b8b5ef4b4e5abbd1e','TM2Scratch'],['ml2scratch-ba1ad68ebd04ec06f4992390b3ad91c1e36486cc','ML2Scratch'],['posenet2scratch-94f396d749010353bc7254af0be92a2e0ef52559','PoseNet2Scratch'],['mbit-more-v2-7d7b216ac046f03472cfe5de267ca7db9ae0e877','microbitMore']])await cp(resolve('stretch3-base',directory,'LICENSE'),resolve(out+'/licenses',label+'-LICENSE.txt'));
await mkdir(out+'/source',{recursive:true});
if(!publicBuild){
await cp('stretch3-base/xcx-cameraselector-8ada859f8d6b2e978a3c1bd5cebc5f1af8ce2088/README.md',out+'/licenses/CameraSelector-UPSTREAM-README.md');
await cp(resolve(gui,'node_modules/scratch-vm/src/extensions/cameraselector'),out+'/source/cameraselector',{recursive:true});
await writeFile(out+'/licenses/CameraSelector-SOURCE-NOTICE.txt','Camera Selector, tfabworks/xcx-cameraselector, commit 8ada859f8d6b2e978a3c1bd5cebc5f1af8ce2088. No project license file or package license declaration was found in the fixed source archive. Used in this local development build; public redistribution requires resolving upstream licensing. Upstream README and source are preserved.\n');
}
for(const file of ['main.js','bridge.js','correspondence.js','style.css','config.js','safety.js','filenames.js','recovery.js','lesson-tools.js','extension-registry.js','extension-policies.json','build.mjs'])await cp(resolve('native-scratch',file),resolve(out+'/source',file));
for(const file of ['prepare.mjs','prepare-robot.mjs','prepare-brand.mjs','build.mjs','webpack-editor.cjs','manifest.json','extensions-manifest.json','NOTICE.md'])await cp(resolve('stretch3-base',file),resolve(out+'/source','stretch3-'+file));
await writeFile(out+'/source/NOTICE.txt','Block2Script uses a locally built Stretch3 editor. See ../licenses/NOTICE.md. This source folder is a reference subset; full corresponding runnable sources and dependency licenses must accompany any public release. The complete development workspace contains the fixed upstream sources, package-lock files, tests and build configuration.\n');
console.log('Stretch3 editor, Script panel and license records included.');

if(publicBuild){
 await writeFile(resolve(out,'.nojekyll'),'');
 await cp('THIRD_PARTY_NOTICES.md',resolve(out,'licenses/THIRD_PARTY_NOTICES.md'));
 await cp('docs',resolve(out,'docs'),{recursive:true});
 await mkdir(resolve(out,'source/upstream'),{recursive:true});
 for(const name of ['scratch-gui-v3.6.18','stretch3-source','speech2scratch','tm2scratch','ml2scratch','posenet2scratch','microbitMore'])await cp('stretch3-base/'+name+'.tar.gz',resolve(out,'source/upstream',name+'.tar.gz'));
 await writeFile(resolve(out,'source/index.html'),'<meta charset="utf-8"><h1>Block2Script corresponding source</h1><p><a href="https://github.com/playa2021git/block2script">Application source, pinned lockfiles, modification and build scripts</a></p><p>Upstream source archives and checksums: <a href="../licenses/THIRD_PARTY_NOTICES.md">third-party notices</a>. Camera Selector is excluded.</p>'+['scratch-gui-v3.6.18','stretch3-source','speech2scratch','tm2scratch','ml2scratch','posenet2scratch','microbitMore'].map(n=>'<p><a href="upstream/'+n+'.tar.gz">'+n+'</a></p>').join(''));
}
