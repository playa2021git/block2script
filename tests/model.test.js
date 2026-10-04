import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCode,generateCode,examples} from '../src/model.js';
import {Blockly,programState,readProgram} from '../src/blocks.js';
import {Runtime} from '../src/runtime.js';

for(const [name,example] of Object.entries(examples))test(`${name}: code → blocks → code round trip`,()=>{
 const p=parseCode(example.code),ws=new Blockly.Workspace();
 try{Blockly.serialization.workspaces.load(programState(p),ws);assert.deepEqual(parseCode(generateCode(readProgram(ws))),p);}finally{ws.dispose();}
});
test('nested conditions, expressions, broadcast and negative numbers survive round trip',()=>{
 const code=`onMessage("go", async () => {\n if (!(xPosition() >= 100) && keyPressed("ArrowRight")) {\n setVariable("score", random(-5, 10) + 2);\n } else {\n await repeat(3, async () => { say(variable("score") + "点"); });\n }\n});`;
 const p=parseCode(code),ws=new Blockly.Workspace();try{Blockly.serialization.workspaces.load(programState(p),ws);assert.deepEqual(parseCode(generateCode(readProgram(ws))),p);}finally{ws.dispose();}
});
test('reject unsupported or executable arbitrary JavaScript',()=>{
 for(const code of ['alert("x")','whenGreenFlag(async () => { fetch("https://example.com"); });','let x = 1;','whenGreenFlag(async () => { move(); });','onKey(random(1, 2), async () => {});'])assert.throws(()=>parseCode(code));
});
test('repeat, variables, position and branch execute correctly',async()=>{
 const runtime=new Runtime(()=>{},()=>{});const p=parseCode(`whenGreenFlag(async () => { setVariable("score", 0); await repeat(3, async () => { move(10); changeVariable("score", 1); }); if (variable("score") === 3) { say("OK"); } });`);
 await runtime.execute(p[0].body,runtime.token);assert.equal(runtime.state.x,30);assert.equal(runtime.state.variables.score,3);assert.equal(runtime.state.speech,'OK');
});
test('stop interrupts empty forever and long wait promptly',async()=>{
 for(const body of ['await forever(async () => {});','await wait(100);']){
 const runtime=new Runtime(()=>{},()=>{});runtime.start(parseCode(`whenGreenFlag(async () => { ${body} move(999); });`));await new Promise(r=>setTimeout(r,30));runtime.stop();await new Promise(r=>setTimeout(r,30));assert.equal(runtime.state.x,0);assert.equal(runtime.running,false);
 }
});
test('stop in a nested repeat ends its entire script',async()=>{
 const runtime=new Runtime(()=>{},()=>{});runtime.start(parseCode('whenGreenFlag(async () => { await repeat(3, async () => { stop(); }); move(999); });'));await new Promise(r=>setTimeout(r,30));assert.equal(runtime.state.x,0);
});
test('key events respond once running and stop detaches behavior',async()=>{
 const r=new Runtime(()=>{},()=>{});r.start(parseCode(examples.keys.code));await new Promise(resolve=>setTimeout(resolve,25));r.keyDown('ArrowRight');await new Promise(resolve=>setTimeout(resolve,25));assert.equal(r.state.x,10);r.stop();r.keyDown('ArrowRight');assert.equal(r.state.x,10);
});
