import {spawnSync} from 'node:child_process';
for(const script of ['stretch3-base/build.mjs','native-scratch/build.mjs','scripts/license-inventory.mjs']){const r=spawnSync(process.execPath,['--use-system-ca',script],{stdio:'inherit',env:{...process.env,BLOCK2SCRIPT_PUBLIC_BUILD:'1',BLOCK2SCRIPT_BASE:'/block2script/'}});if(r.status!==0)process.exit(r.status||1);}
