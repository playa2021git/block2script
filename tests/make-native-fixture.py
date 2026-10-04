import json, zipfile, pathlib, copy
root=pathlib.Path(__file__).resolve().parent.parent
assets=root/'native-scratch/vendor/package/src/lib/default-project'
def costume(id,name):return dict(assetId=id,name=name,bitmapResolution=1,md5ext=id+'.svg',dataFormat='svg',rotationCenterX=48,rotationCenterY=50)
stage=dict(isStage=True,name='Stage',variables={'score':['score',0]},lists={'items':['items',['A','B']]},broadcasts={'hello':'hello'},blocks={},comments={},currentCostume=0,costumes=[dict(assetId='cd21514d0531fdffb22204e0ec5ed84a',name='backdrop1',md5ext='cd21514d0531fdffb22204e0ec5ed84a.svg',dataFormat='svg',rotationCenterX=240,rotationCenterY=180)],sounds=[],volume=100,layerOrder=0)
sprite=dict(isStage=False,name='NativeTest',variables={},lists={},broadcasts={},blocks={},comments={},currentCostume=0,costumes=[costume('bcf454acf82e4504149f7ffe07081dbc','costume1'),costume('0fb9be3e8397c983338cb71dc84d0b25','costume2')],sounds=[dict(assetId='83c36d806dc92327b9e7049a565c6bff',name='Meow',dataFormat='wav',format='',rate=22050,sampleCount=18688,md5ext='83c36d806dc92327b9e7049a565c6bff.wav')],volume=100,visible=True,x=0,y=0,size=100,direction=90,draggable=False,rotationStyle='all around',layerOrder=1)
def block(op,parent=None,next=None,inputs=None,fields=None,**extra):return dict(opcode=op,next=next,parent=parent,inputs=inputs or {},fields=fields or {},shadow=False,topLevel=parent is None,**extra)
sprite['blocks']={
 'flag':block('event_whenflagclicked',next='set',x=50,y=50),
 'set':block('data_setvariableto','flag','add',{'VALUE':[1,[4,5]]},{'VARIABLE':['score','score']}),
 'add':block('data_addtolist','set','pen',{'ITEM':[1,[10,'C']]},{'LIST':['items','items']}),
 'pen':block('pen_penDown','add','call'),
 'call':block('procedures_call','pen','sound',{'arg1':[1,[10,'Native']]},mutation=dict(tagName='mutation',children=[],proccode='greet %s',argumentids='["arg1"]',warp='false')),
 'sound':block('sound_playuntildone','call',inputs={'SOUND_MENU':[1,'sound-menu']}),
 'sound-menu':dict(opcode='sound_sounds_menu',next=None,parent='sound',inputs={},fields={'SOUND_MENU':['Meow',None]},shadow=True,topLevel=False),
 'define':block('procedures_definition',next='say',inputs={'custom_block':[1,'proto']},x=360,y=60),
 'proto':dict(opcode='procedures_prototype',next=None,parent='define',inputs={'arg1':[1,'argument']},fields={},shadow=True,topLevel=False,mutation=dict(tagName='mutation',children=[],proccode='greet %s',argumentids='["arg1"]',argumentnames='["name"]',argumentdefaults='[""]',warp='false')),
 'argument':dict(opcode='argument_reporter_string_number',next=None,parent='proto',inputs={},fields={'VALUE':['name',None]},shadow=True,topLevel=False),
 'say':block('looks_say','define',inputs={'MESSAGE':[3,'read-arg',[10,'Hello']]}),
 'read-arg':block('argument_reporter_string_number','say',fields={'VALUE':['name',None]}),
 'clone':block('control_start_as_clone',next='move',x=50,y=400),
 'move':block('motion_movesteps','clone',inputs={'STEPS':[1,[4,20]]},comment='comment1'),
}
sprite['comments']={'comment1':dict(blockId='move',x=160,y=410,width=200,height=100,minimized=False,text='コメント保持の検証')}
second=copy.deepcopy(sprite);second['name']='SecondSprite';second['blocks']={'receive':block('event_whenbroadcastreceived',next='say2',fields={'BROADCAST_OPTION':['hello','hello']},x=20,y=20),'say2':block('looks_say','receive',inputs={'MESSAGE':[1,[10,'second sprite']]})};second['comments']={};second['layerOrder']=2;second['x']=100
project=dict(targets=[stage,sprite,second],monitors=[],extensions=['pen'],meta=dict(semver='3.0.0',vm='15.2.0',agent='ScratchPlus integration fixture'))
out=root/'tests/fixtures';out.mkdir(exist_ok=True)
with zipfile.ZipFile(out/'native-integration.sb3','w',zipfile.ZIP_DEFLATED) as z:
 z.writestr('project.json',json.dumps(project,ensure_ascii=False))
 for name in ['cd21514d0531fdffb22204e0ec5ed84a.svg','bcf454acf82e4504149f7ffe07081dbc.svg','0fb9be3e8397c983338cb71dc84d0b25.svg','83c36d806dc92327b9e7049a565c6bff.wav']:z.write(assets/name,name)
print(out/'native-integration.sb3')

