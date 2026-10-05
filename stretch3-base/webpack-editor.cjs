const fs = require('fs');
const path = require('path');
process.env.CI='1';process.env.NODE_ENV='production';
const gui=path.resolve('stretch3-base/scratch-gui-3.6.18');process.chdir(gui);
const webpack=require(path.join(gui,'node_modules/webpack'));
const config=require(path.join(gui,'webpack.config.js'))[0];
config.devtool=false;
if(process.env.BLOCK2SCRIPT_PUBLIC_BUILD==='1'){
 config.output.path=path.resolve('../../.public-build/editor');
 config.output.publicPath=(process.env.BLOCK2SCRIPT_BASE||'/block2script/')+'stretch3-dist/';
 config.entry={'lib.min':['react','react-dom'],gui:'./src/playground/index.jsx'};
 config.module.rules.unshift({test:/(?:extension-manager\.js|libraries[\\/]extensions[\\/]index\.jsx|libraries[\\/](?:sprites|costumes)\.json)$/,enforce:'pre',loader:path.resolve('../../scripts/public-filter-loader.cjs')});
}

webpack(config,(error,stats)=>{
 const report=error?{errors:[error.message]}:stats.toJson({all:false,errors:true,warnings:true,timings:true,hash:true,modules:true});
 fs.writeFileSync(path.join(gui,'../build-result.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify({hash:report.hash,time:report.time,errors:report.errors,warnings:report.warnings?.length}));
 process.exit(error||stats.hasErrors()?1:0);
});
