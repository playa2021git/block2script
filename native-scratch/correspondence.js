import {StateEffect,StateField} from '@codemirror/state';
import {Decoration,EditorView} from '@codemirror/view';

export const highlightRange=StateEffect.define();
export const correspondenceField=StateField.define({
 create:()=>Decoration.none,
 update(value,transaction){
  if(transaction.docChanged)value=Decoration.none;
  for(const effect of transaction.effects)if(effect.is(highlightRange)){
   const range=effect.value;
   value=range?Decoration.set([Decoration.mark({class:'b2s-code-correspondence'}).range(range.startOffset,range.endOffset)]):Decoration.none;
  }
  return value;
 },
 provide:field=>EditorView.decorations.from(field)
});

// Nested reporters win over their enclosing command. Indentation can use its line.
export function rangeAt(ranges,targetId,offset,line){
 const candidates=ranges.filter(range=>range.targetId===targetId&&offset>=range.startOffset&&offset<range.endOffset);
 if(candidates.length)return candidates.sort((a,b)=>(a.endOffset-a.startOffset)-(b.endOffset-b.startOffset))[0];
 const onLine=ranges.filter(range=>range.targetId===targetId&&range.startLine===line);
 return onLine.sort((a,b)=>a.startOffset-b.startOffset)[0]??null;
}

export function connectCorrespondence({editor,getNative,isDirty,getTargetId}){
 let source='',ranges=[],context='',workspace=null,listener=null,root=null,selectedId=null;
 const currentContext=()=>JSON.stringify(getNative()?.vm.editingTarget?.blocks._blocks);
 function clear(clearCode=true){
  root?.classList.remove('b2s-block-correspondence');root=null;selectedId=null;
  if(clearCode)editor.dispatch({effects:highlightRange.of(null)});
 }
 function valid(){return !isDirty()&&editor.state.doc.toString()===source&&currentContext()===context&&getNative()?.vm.editingTarget?.id===getTargetId();}
 function show(range,scroll){
  clear();if(!range||!valid()||range.targetId!==getTargetId())return;
  const block=workspace?.getBlockById(range.blockId);
  if(!block)return;
  root=block.getSvgRoot();selectedId=range.blockId;
  root?.classList.add('b2s-block-correspondence');
  editor.dispatch({effects:[highlightRange.of(range),...(scroll?[EditorView.scrollIntoView(range.startOffset,{y:'center'})]:[])]});
 }
 function attach(){
  const next=getNative()?.getController()?.workspace;
  if(next===workspace)return;
  if(workspace&&listener)workspace.removeChangeListener(listener);
  clear();workspace=next;
  if(!workspace)return;
  const document=workspace.getParentSvg().ownerDocument;
  if(!document.getElementById('b2s-correspondence-style')){
   const style=document.createElement('style');style.id='b2s-correspondence-style';
   style.textContent='.b2s-block-correspondence > .blocklyPath {stroke:#ffe08a !important;stroke-width:3px !important;filter:drop-shadow(0 0 3px #d39436);transition:stroke-width .15s;}';
   document.head.appendChild(style);
  }
  listener=event=>{
   if(event.type==='ui'&&['selected','click'].includes(event.element)){
    const id=event.element==='selected'?event.newValue:event.blockId;
    show(ranges.find(range=>range.blockId===id&&range.targetId===getTargetId()),true);
   }
   else if(event.type!=='ui')clear();
  };
  workspace.addChangeListener(listener);
 }
 return {
  clear,
  update(mapping){
   const nextContext=currentContext();
   if(source!==mapping.code||context!==nextContext||ranges[0]?.targetId!==mapping.ranges[0]?.targetId)clear();
   source=mapping.code;ranges=mapping.ranges;context=nextContext;attach();
  },
  attach,
  click(event){
   attach();if(!valid()){clear();return;}
   const offset=editor.posAtCoords({x:event.clientX,y:event.clientY});
   show(offset===null?null:rangeAt(ranges,getTargetId(),offset,editor.state.doc.lineAt(offset).number),false);
  },
  // Useful to verify identity without modifying VM graphs or running blocks.
  get selectedBlockId(){return selectedId;}
 };
}
