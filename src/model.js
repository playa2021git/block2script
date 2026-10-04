import {parse} from 'acorn';

export const commands = {
  move: {label:'%1 歩動かす', color:'#4c97ff', args:[10]},
  turn: {label:'%1 度回す', color:'#4c97ff', args:[15]},
  goTo: {label:'x座標を %1 y座標を %2 にする', color:'#4c97ff', args:[0,0]},
  point: {label:'%1 度に向ける', color:'#4c97ff', args:[90]},
  changeX: {label:'x座標を %1 ずつ変える', color:'#4c97ff', args:[10]},
  changeY: {label:'y座標を %1 ずつ変える', color:'#4c97ff', args:[10]},
  bounce: {label:'もし端に着いたら、跳ね返る', color:'#4c97ff', args:[]},
  say: {label:'%1 と言う', color:'#9966ff', args:['こんにちは！']},
  sayFor: {label:'%1 と %2 秒言う', color:'#9966ff', args:['こんにちは！',2]},
  setSize: {label:'大きさを %1 %% にする', color:'#9966ff', args:[100]},
  show: {label:'表示する', color:'#9966ff', args:[]},
  hide: {label:'隠す', color:'#9966ff', args:[]},
  wait: {label:'%1 秒待つ', color:'#ffab19', args:[0.5]},
  setVariable: {label:'変数 %1 を %2 にする', color:'#ff8c1a', args:['score',0]},
  changeVariable: {label:'変数 %1 を %2 ずつ変える', color:'#ff8c1a', args:['score',1]},
  broadcast: {label:'メッセージ %1 を送る', color:'#ffbf00', args:['スタート']},
  stop: {label:'このスクリプトを止める', color:'#ffab19', args:[]},
};
const reporterArity={variable:1,random:2,keyPressed:1,xPosition:0,yPosition:0,direction:0};
const operators=['+','-','*','/','%','<','>','<=','>=','===','!==','&&','||'];
export const literal=value=>({kind:'literal',value});
const error=(node,message)=>{throw new Error(`${node?.loc?.start.line ?? 1}行目: ${message}`);};
export function parseCode(code){
  let tree;
  try{tree=parse(code,{ecmaVersion:'latest',locations:true});}catch(e){throw new Error(`${e.loc?.line??1}行目: コードの書き方を確認してください（括弧・引用符・カンマなど）`);}
  const callName=n=>n?.type==='CallExpression'&&n.callee.type==='Identifier'?n.callee.name:null;
  function expr(n){
    if(n.type==='Literal'&&['string','number','boolean'].includes(typeof n.value))return literal(n.value);
    if(n.type==='UnaryExpression'&&['-','!'].includes(n.operator))return {kind:'unary',op:n.operator,value:expr(n.argument)};
    if(['BinaryExpression','LogicalExpression'].includes(n.type)&&operators.includes(n.operator))return {kind:'binary',op:n.operator,left:expr(n.left),right:expr(n.right)};
    const name=callName(n);
    if(Object.hasOwn(reporterArity,name)){if(n.arguments.length!==reporterArity[name])error(n,`${name} の引数の数が違います`);return {kind:'reporter',name,args:n.arguments.map(expr)};}
    return error(n,'この式にはまだ対応していません。数値・文字列・演算・レポーターを使ってください');
  }
  function callback(n){
    if(!n||!['ArrowFunctionExpression','FunctionExpression'].includes(n.type)||n.params.length||n.body.type!=='BlockStatement')error(n,'async () => { ... } の形で書いてください');
    return statements(n.body.body);
  }
  function statements(list){return list.filter(n=>n.type!=='EmptyStatement').map(n=>{
    if(n.type==='IfStatement')return {kind:'if',test:expr(n.test),body:statements(n.consequent.type==='BlockStatement'?n.consequent.body:[n.consequent]),elseBody:n.alternate?statements(n.alternate.type==='BlockStatement'?n.alternate.body:[n.alternate]):[]};
    if(n.type!=='ExpressionStatement')error(n,'命令の呼び出し、repeat、forever、if を使ってください');
    const c=n.expression.type==='AwaitExpression'?n.expression.argument:n.expression,name=callName(c);
    if(name==='repeat'){if(c.arguments.length!==2)error(n,'repeat(回数, async () => { ... }) と書いてください');return {kind:'repeat',count:expr(c.arguments[0]),body:callback(c.arguments[1])};}
    if(name==='forever'){if(c.arguments.length!==1)error(n,'forever(async () => { ... }) と書いてください');return {kind:'forever',body:callback(c.arguments[0])};}
    if(!Object.hasOwn(commands,name))error(n,`命令「${name??'この書き方'}」にはまだ対応していません`);
    if(c.arguments.length!==commands[name].args.length)error(n,`${name} の引数の数が違います`);
    return {kind:'command',name,args:c.arguments.map(expr)};
  });}
  return tree.body.filter(n=>n.type!=='EmptyStatement').map(n=>{
    if(n.type!=='ExpressionStatement')error(n,'whenGreenFlag、onKey、onMessage の中に命令を書いてください');
    const c=n.expression,name=callName(c);
    if(!['whenGreenFlag','onKey','onMessage'].includes(name))error(n,'スクリプトは whenGreenFlag、onKey、onMessage から始めてください');
    const argc=name==='whenGreenFlag'?1:2;
    if(c.arguments.length!==argc)error(n,`${name} の引数の数が違います`);
    const trigger=argc===2?expr(c.arguments[0]):null;
    if(trigger&& (trigger.kind!=='literal'||typeof trigger.value!=='string'))error(n,'キー名・メッセージ名は文字列で指定してください');
    return {kind:'event',name,trigger:trigger?.value,body:callback(c.arguments[argc-1])};
  });
}
export function expressionCode(e){
  if(e.kind==='literal')return JSON.stringify(e.value);
  if(e.kind==='binary')return `(${expressionCode(e.left)} ${e.op} ${expressionCode(e.right)})`;
  if(e.kind==='unary')return `(${e.op}${expressionCode(e.value)})`;
  if(e.kind==='reporter')return `${e.name}(${e.args.map(expressionCode).join(', ')})`;
  throw new Error('不明な式');
}
export function generateCode(program){
  function body(nodes,level){const pad='  '.repeat(level);return nodes.map(n=>{
    if(n.kind==='command')return `${pad}${['wait','sayFor'].includes(n.name)?'await ':''}${n.name}(${n.args.map(expressionCode).join(', ')});`;
    if(n.kind==='repeat'||n.kind==='forever')return `${pad}await ${n.kind}(${n.kind==='repeat'?expressionCode(n.count)+', ':''}async () => {\n${body(n.body,level+1)}\n${pad}});`;
    if(n.kind==='if')return `${pad}if (${expressionCode(n.test)}) {\n${body(n.body,level+1)}\n${pad}}${n.elseBody.length?` else {\n${body(n.elseBody,level+1)}\n${pad}}`:''}`;
  }).join('\n');}
  return program.map(n=>`${n.name}(${n.name==='whenGreenFlag'?'':JSON.stringify(n.trigger)+', '}async () => {\n${body(n.body,1)}\n});`).join('\n\n');
}
export const examples={
  hello:{title:'こんにちは、Scratch＋',code:`whenGreenFlag(async () => {\n  goTo(-140, 0);\n  point(90);\n  say("こんにちは！右のコードも編集してみてね");\n  await repeat(10, async () => {\n    move(20);\n    turn(15);\n    await wait(0.15);\n  });\n  await sayFor("ブロックとコードがつながった！", 2);\n});`},
  keys:{title:'矢印キーでお散歩',code:`whenGreenFlag(async () => {\n  goTo(0, 0);\n  say("矢印キーで動かしてね");\n});\n\nonKey("ArrowRight", async () => {\n  changeX(10);\n});\n\nonKey("ArrowLeft", async () => {\n  changeX(-10);\n});\n\nonKey("ArrowUp", async () => {\n  changeY(10);\n});\n\nonKey("ArrowDown", async () => {\n  changeY(-10);\n});`},
  bounce:{title:'ずっと跳ね返る',code:`whenGreenFlag(async () => {\n  goTo(0, 0);\n  point(65);\n  setVariable("score", 0);\n  await forever(async () => {\n    move(5);\n    bounce();\n    changeVariable("score", 1);\n    if (variable("score") > 100) {\n      say("100歩をこえたよ！");\n    }\n    await wait(0.03);\n  });\n});`},
};
