// Reproducible branding changes. Upstream copyright and license files are untouched.
import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const gui=resolve('stretch3-base/scratch-gui-3.6.18');
const icon="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40' viewBox='0 0 100 40'%3E%3Crect width='100' height='40' rx='8' fill='%23123fa0'/%3E%3Ctext x='50' y='28' text-anchor='middle' font-family='sans-serif' font-size='26' font-weight='bold' fill='white'%3EB2S%3C/text%3E%3C/svg%3E";
const menu=resolve(gui,'src/components/menu-bar/menu-bar.jsx');
let source=await readFile(menu,'utf8');
source=source.replace('alt="Scratch"','alt="Block2Script"').replace('src={this.props.logo}','src={'+JSON.stringify(icon)+'}');
// Theme changes previously reassigned trademark logos to the menu image.
source=source.replace(/document\.getElementById\('logo_img'\)\.src = (?:ninetiesLogo|catLogo|oldtimeyLogo|prehistoricLogo|this\.props\.logo);/g,"document.getElementById('logo_img').src = "+JSON.stringify(icon)+';');
await writeFile(menu,source);
const template=resolve(gui,'src/playground/index.ejs');
source=await readFile(template,'utf8');
source=source.replace('href="static/favicon.ico"','href="'+icon+'"').replace('<%= htmlWebpackPlugin.options.title %>','Block2Script');
await writeFile(template,source);
console.log('Independent B2S menu, title and favicon prepared.');
