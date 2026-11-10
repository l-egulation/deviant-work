/* Equipment navigation: arrows browse; F enters/commits; Escape backs out. */
let equipmentStage=new URLSearchParams(location.search).get('stage') || (new URLSearchParams(location.search).has('slot')?'ink':'weapon');
if(!['weapon','palette','ink'].includes(equipmentStage))equipmentStage='weapon';
const originalRender=render;
const originalCandidates=candidatesForSlot;
candidatesForSlot=()=>originalCandidates().filter(x=>x.id!==loadouts[weapon][slot]);
function flowConfirm(){
 if(equipmentStage==='weapon'){equipmentStage='palette';page=0;}
 else if(equipmentStage==='palette'){
  const choices=candidatesForSlot();if(!choices.length)return;
  equipmentStage='ink';selected=choices[0].index;page=0;
 }else{
  const choice=candidatesForSlot().find(x=>x.index===selected);if(!choice)return;
  const old=loadouts[weapon][slot];owned=owned.filter(id=>id!==choice.id);
  if(old&&!owned.includes(old))owned.push(old);
  loadouts[weapon][slot]=choice.id;equipmentStage='palette';page=0;
 }
 render();
}
function flowBack(){
 if(equipmentStage==='ink')equipmentStage='palette';
 else if(equipmentStage==='palette')equipmentStage='weapon';
 else {view='bag';}
 render();
}
render=function(){
 if(view==='equipment')stamp=equipmentStage==='weapon'?'weapon':'';
 originalRender();document.querySelector('.screen').dataset.flow=view==='equipment'?equipmentStage:'';
 document.querySelector('header aside').innerHTML=view==='equipment'?'일시정지':'일시정지 | <kbd>I / Esc</kbd>닫기';
 if(view!=='equipment')return;
 const columns=content.querySelector('.columns');
 const weapons=content.querySelectorAll('.weapons button');
 weapons.forEach((b,i)=>{b.disabled=false;b.onclick=()=>{weapon=i;equipmentStage='weapon';render()};});
 content.querySelectorAll('.slot').forEach((b,i)=>{b.disabled=equipmentStage!=='palette';b.onclick=()=>{slot=i;page=0;render()};});
 content.querySelector('.hint').textContent=equipmentStage==='weapon'?'선택한 무기의 팔레트로 이동합니다.':equipmentStage==='palette'?'바꿀 칸을 선택하세요.':'선택한 무기와 칸에 장착합니다.';
 const right=columns.children[1];
 if(equipmentStage==='weapon'){
  const headings=right.querySelectorAll('.infoHeading');
  if(headings[0])headings[0].innerHTML='무기 스탬프 <span>'+(hasStamps&&weapon===0?'장착 중':'미장착 · 기본 무기')+'</span>';
  if(headings[1])headings[1].innerHTML='스킬 스탬프 <span>'+(hasStamps&&weapon===0?'범위 · 장착 중':'미장착 · 기본 스킬')+'</span>';
 }

 if(equipmentStage==='palette'){
  right.querySelectorAll('.transition,.candidateRow,.candidateDetail').forEach(x=>x.remove());
  [...right.children].filter(x=>x.classList.contains('label')).forEach(x=>x.remove());
 }
 let action=right.querySelector('.equipAction');
 if(!action){action=document.createElement('div');action.className='equipAction';right.append(action);}
 const available=candidatesForSlot().length>0;
 const label=equipmentStage==='weapon'?'팔레트 선택':equipmentStage==='palette'?(available?'잉크 선택':'보유 잉크 없음'):(loadouts[weapon][slot]?'교체':'장착');
 action.innerHTML=`<button class="flowAction" ${equipmentStage!=='weapon'&&!available?'disabled':''}><kbd>F</kbd>${label}</button>${equipmentStage==='ink'?'<span class="actionCost">무료</span><p class="equipStatus">'+(loadouts[weapon][slot]?'기존 잉크는 가방으로 반환':'선택한 잉크를 소모해 장착')+'</p>':''}`;
 action.querySelector('button').onclick=flowConfirm;
 content.querySelectorAll('.candidateRow .item').forEach(b=>{b.onclick=()=>{selected=data.findIndex(x=>x.name===b.getAttribute('aria-label'));render()};});
 footer.innerHTML=`<span>← → ${equipmentStage==='weapon'?'무기':equipmentStage==='palette'?'팔레트':'잉크'} 이동</span><span><kbd>Esc</kbd>${equipmentStage==='weapon'?'가방으로':equipmentStage==='palette'?'무기·스킬 설명으로':'팔레트 선택으로'}</span>`;
 const focus=equipmentStage==='weapon'?weapons[weapon]:equipmentStage==='palette'?content.querySelectorAll('.slot')[slot]:content.querySelector('.candidateRow .selected');
 focus?.focus({preventScroll:true});
};
document.addEventListener('keydown',e=>{
 if(view!=='equipment')return;
 if(!['f','F','Escape','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Enter',' '].includes(e.key))return;
 e.preventDefault();e.stopImmediatePropagation();if(e.repeat)return;
 if(e.key.toLowerCase()==='f'||e.key==='Enter'){flowConfirm();return;}
 if(e.key==='Escape'){flowBack();return;}
 if(!['ArrowLeft','ArrowRight'].includes(e.key))return;
 const direction=e.key==='ArrowRight'?1:-1;
 if(equipmentStage==='weapon')weapon=(weapon+direction+2)%2;
 else if(equipmentStage==='palette')slot=(slot+direction+5)%5;
 else{const list=candidatesForSlot();if(!list.length)return;const i=list.findIndex(x=>x.index===selected);const next=(i+direction+list.length)%list.length;selected=list[next].index;page=Math.floor(next/4);}
 render();
},true);
equip.onclick=()=>{view='equipment';equipmentStage='weapon';render()};
render();
