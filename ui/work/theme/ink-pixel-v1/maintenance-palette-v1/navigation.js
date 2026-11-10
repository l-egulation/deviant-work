// Directions browse the active region; F enters or executes; Esc backs out.
let activeRegion=new URLSearchParams(location.search).get('region')||(task?'detail':'weapon');
if(!['weapon','slot','task','detail'].includes(activeRegion))activeRegion='weapon';
let taskCursor=task||'ink';
const baseRender=render;
function confirmRegion(){
 if(activeRegion==='weapon'){activeRegion='slot';slot=Math.max(0,slot);task=null;}
 else if(activeRegion==='slot'){activeRegion='task';task=taskCursor;candidate=available()[0]?.index??-1;}
 else if(activeRegion==='task'){activeRegion='detail';}
 else{const b=document.querySelector('.taskDecision button');if(!b||b.disabled)return;executeTask();return;}
 render();
}
function backRegion(){
 if(activeRegion==='detail')activeRegion='task';
 else if(activeRegion==='task'){activeRegion='slot';task=null;}
 else if(activeRegion==='slot'){activeRegion='weapon';task=null;}
 else return;
 message='';render();
}
render=function(){
 baseRender();document.body.dataset.region=activeRegion;
 const detail=document.getElementById('detail');
 const weapons=document.querySelectorAll('.weapons button');
 weapons.forEach((b,i)=>{b.disabled=activeRegion!=='weapon';b.onclick=()=>{weapon=i;slot=-1;task=null;render()};});
 const slots=document.querySelectorAll('.slot');
 slots.forEach((b,i)=>{b.disabled=activeRegion!=='slot';b.onclick=()=>{slot=i;task=null;message='';render()};});
 const tasks=document.querySelectorAll('.taskOption');
 tasks.forEach((b,i)=>{b.disabled=activeRegion!=='task';b.onclick=()=>{taskCursor=['ink','upgrade','color'][i];task=taskCursor;candidate=available()[0]?.index??-1;message='';render()};});
 detail.querySelectorAll('.candidateRow button,.paymentOption').forEach(b=>b.disabled=activeRegion!=='detail');
 const old=detail.querySelector('.taskDecision');
 if(activeRegion!=='detail'){
  old?.remove();
  if(activeRegion==='weapon')detail.innerHTML='<p class="label">무기를 선택하세요</p>';
  if(activeRegion==='slot'){
   const ink=inks[sets[weapon][slot]];
   detail.innerHTML=`<p class="label">현재 장착 · ${slot+1}번 칸</p><h2>${ink?.name||'빈 칸'}</h2><p class="effect">${ink?.desc||'장착된 잉크 없음'}</p>`;
  }
  const action=document.createElement('div');action.className='taskDecision regionAction';
  action.innerHTML='<button><kbd>F</kbd>'+({weapon:'팔레트 선택',slot:'작업 선택',task:'선택한 작업으로'})[activeRegion]+'</button>';
  action.querySelector('button').onclick=confirmRegion;detail.append(action);
 }else if(old){old.querySelector('button').onclick=confirmRegion;}
 document.getElementById('escLabel').textContent={weapon:'탭 이동: Tab',slot:'무기 선택으로',task:'팔레트 선택으로',detail:'작업 선택으로'}[activeRegion];
 if(activeRegion==='weapon')document.querySelector('header aside>span:last-child').innerHTML='<span id="escLabel">Tab · 탭 이동</span>';
 else document.querySelector('header aside>span:last-child').innerHTML='<kbd>Esc</kbd><span id="escLabel">'+({slot:'무기 선택으로',task:'팔레트 선택으로',detail:'작업 선택으로'})[activeRegion]+'</span>';
 document.querySelector('.foot').innerHTML='<span id="fLabel" hidden></span><span>'+({weapon:'← → 무기 선택',slot:'← → 팔레트 선택',task:'↑ ↓ 작업 선택',detail:task==='upgrade'?'F 강화 실행':task==='color'?'← → 결제 방법 선택':'← → 잉크 선택'})[activeRegion]+'</span><span class="note">테마 시안 · Unity에는 반영되지 않습니다</span>';
 const focus=activeRegion==='weapon'?weapons[weapon]:activeRegion==='slot'?slots[slot]:activeRegion==='task'?document.querySelector('.selectedTask'):detail.querySelector('.candidateRow .mark,.paymentOption.isSelected,.taskDecision button');
 focus?.focus({preventScroll:true});
};
document.addEventListener('keydown',e=>{
 if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','f','F','Enter','Escape'].includes(e.key))return;
 if(document.activeElement?.closest('nav'))return;
 e.preventDefault();e.stopImmediatePropagation();if(e.repeat)return;
 if(['f','F','Enter'].includes(e.key)){confirmRegion();return;}
 if(e.key==='Escape'){backRegion();return;}
 const delta=['ArrowRight','ArrowDown'].includes(e.key)?1:-1;
 if(activeRegion==='task'){
  if(!['ArrowUp','ArrowDown'].includes(e.key))return;
  const all=['ink','upgrade','color'];taskCursor=all[(all.indexOf(taskCursor)+delta+3)%3];task=taskCursor;candidate=available()[0]?.index??-1;
 }else{
  if(!['ArrowLeft','ArrowRight'].includes(e.key))return;
  if(activeRegion==='weapon'){weapon=1-weapon;slot=-1;task=null;}
  else if(activeRegion==='slot'){slot=(slot+delta+colors.length)%colors.length;task=null;}
  else if(task==='color')payment=payment==='gold'?'ticket':'gold';
  else if(task==='ink'){const a=available();if(a.length)candidate=a[(a.findIndex(x=>x.index===candidate)+delta+a.length)%a.length].index;}
 }
 message='';render();
},true);
// Preserve native Tab navigation; suppress the legacy Tab weapon shortcut.
document.addEventListener('keydown',e=>{if(e.key==='Tab')e.stopImmediatePropagation()},true);
render();
