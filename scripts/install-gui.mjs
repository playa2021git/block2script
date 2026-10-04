import {copyFile} from 'node:fs/promises';import {spawnSync} from 'node:child_process';import {resolve,dirname} from 'node:path';
const gui='stretch3-base/scratch-gui-3.6.18';await copyFile('build-support/gui-package.json',gui+'/package.json');await copyFile('build-support/gui-package-lock.json',gui+'/package-lock.json');
const npm=process.env.npm_execpath||resolve(dirname(process.execPath),'node_modules/npm/bin/npm-cli.js');const result=spawnSync(process.execPath,['--use-system-ca',npm,'ci','--legacy-peer-deps','--audit=false'],{cwd:gui,stdio:'inherit'});process.exit(result.status||0);
