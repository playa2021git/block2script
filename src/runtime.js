const halted=Symbol('halted');
const scriptStopped=Symbol('scriptStopped');
export class Runtime {
 constructor(update,log){this.update=update;this.log=log;this.keys=new Set();this.state={x:0,y:0,direction:90,size:100,visible:true,speech:'',variables:{}};this.token=0;this.active=new Set();this.running=false;}
 notify(){this.update(this.state,this.running);}
 stop(){this.token++;this.running=false;this.active.clear();this.notify();}
 start(program){this.stop();this.program=program;this.running=true;this.notify();this.emit('whenGreenFlag');}
 keyDown(key){this.keys.add(key);if(this.running)this.emit('onKey',key);}
 emit(name,trigger){for(const e of this.program??[])if(e.name===name&&(name==='whenGreenFlag'||e.trigger===trigger)&&!this.active.has(e)){
 const token=this.token;this.active.add(e);
 this.execute(e.body,token).catch(err=>{if(err!==halted&&err!==scriptStopped)this.log(err.message);}).finally(()=>{if(token===this.token)this.active.delete(e);});
 }}
 check(token){if(token!==this.token)throw halted;}
 async delay(ms,token){const end=performance.now()+Math.max(0,ms);do{this.check(token);await new Promise(r=>setTimeout(r,Math.min(20,Math.max(0,end-performance.now()))));}while(performance.now()<end);this.check(token);}
 numeric(v){const n=Number(v);if(!Number.isFinite(n))throw new Error('数値が必要な命令に、有効な数値を指定してください');return n;}
 evaluate(e){
 if(e.kind==='literal')return e.value;
 if(e.kind==='unary')return e.op==='-'?-this.numeric(this.evaluate(e.value)):!this.evaluate(e.value);
 if(e.kind==='binary'){
 const a=this.evaluate(e.left);if(e.op==='&&')return a&&this.evaluate(e.right);if(e.op==='||')return a||this.evaluate(e.right);
 const b=this.evaluate(e.right);switch(e.op){case '+':return typeof a==='string'||typeof b==='string'?String(a)+String(b):a+b;case '-':return a-b;case '*':return a*b;case '/':return a/b;case '%':return a%b;case '<':return a<b;case '>':return a>b;case '<=':return a<=b;case '>=':return a>=b;case '===':return a===b;case '!==':return a!==b;}
 }
 const a=e.args.map(v=>this.evaluate(v));
 switch(e.name){case 'variable':return this.state.variables[String(a[0])]??0;case 'keyPressed':return this.keys.has(String(a[0]));case 'xPosition':return this.state.x;case 'yPosition':return this.state.y;case 'direction':return this.state.direction;case 'random':{let min=this.numeric(a[0]),max=this.numeric(a[1]);if(min>max)[min,max]=[max,min];return Number.isInteger(min)&&Number.isInteger(max)?Math.floor(Math.random()*(max-min+1))+min:Math.random()*(max-min)+min;}}
 }
 async execute(nodes,token){
 for(const n of nodes){this.check(token);
 if(n.kind==='repeat'||n.kind==='forever'){
 const count=n.kind==='forever'?Infinity:Math.max(0,Math.floor(this.numeric(this.evaluate(n.count))));
 for(let i=0;i<count;i++){await this.execute(n.body,token);await this.delay(0,token);}continue;
 }
 if(n.kind==='if'){await this.execute(this.evaluate(n.test)?n.body:n.elseBody,token);continue;}
 const a=n.args.map(e=>this.evaluate(e)),s=this.state,num=i=>this.numeric(a[i]);
 switch(n.name){
 case 'move':s.x+=num(0)*Math.sin(s.direction*Math.PI/180);s.y+=num(0)*Math.cos(s.direction*Math.PI/180);break;
 case 'turn':s.direction+=num(0);break;
 case 'point':s.direction=num(0);break;
 case 'goTo':s.x=num(0);s.y=num(1);break;
 case 'changeX':s.x+=num(0);break;case 'changeY':s.y+=num(0);break;
 case 'bounce':{const hx=Math.min(220,24*s.size/100),hy=Math.min(160,27*s.size/100);if(Math.abs(s.x)>240-hx){s.x=Math.sign(s.x)*(240-hx);s.direction=-s.direction;}if(Math.abs(s.y)>180-hy){s.y=Math.sign(s.y)*(180-hy);s.direction=180-s.direction;}break;}
 case 'say':s.speech=String(a[0]);break;
 case 'sayFor':s.speech=String(a[0]);this.notify();await this.delay(Math.max(0,num(1))*1000,token);s.speech='';break;
 case 'wait':await this.delay(Math.max(0,num(0))*1000,token);break;
 case 'setSize':s.size=Math.max(5,Math.min(300,num(0)));break;
 case 'show':s.visible=true;break;case 'hide':s.visible=false;break;
 case 'setVariable':Object.defineProperty(s.variables,String(a[0]),{value:a[1],writable:true,enumerable:true,configurable:true});break;
 case 'changeVariable':Object.defineProperty(s.variables,String(a[0]),{value:this.numeric(s.variables[String(a[0])]??0)+num(1),writable:true,enumerable:true,configurable:true});break;
 case 'broadcast':this.emit('onMessage',String(a[0]));break;
 case 'stop':throw scriptStopped;
 }
 s.direction=((s.direction+180)%360+360)%360-180;this.notify();await this.delay(0,token);
 }
 }
}
