import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
const gui=resolve('stretch3-base/scratch-gui-3.6.18');
const steps=[['stretch3-base/prepare.mjs',process.cwd()]];
if(!existsSync(resolve(gui,'src/generated/microbit-hex-url.cjs')))steps.push(['scripts/prepublish.mjs',gui]);
steps.push(['stretch3-base/webpack-editor.cjs',process.cwd()]);
for(const [script,cwd] of steps){
 const result=spawnSync(process.execPath,['--use-system-ca',resolve(cwd,script)],{cwd,stdio:'inherit',env:{...process.env,CI:'1',NODE_ENV:'production',NODE_OPTIONS:'--openssl-legacy-provider'}});
 if(result.status!==0)process.exit(result.status||1);
}
