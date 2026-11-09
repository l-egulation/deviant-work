/* Prototype navigation: selection is distinct from execution. No Unity input changes. */
(()=>{
 const path=location.pathname;let group=0,index=0,trail=[],busy=false,started=false;
 const action='.equipAction button,.taskDecision button,.actionRow .action';
 function definitions(){
  if(path.includes('screen-set'))return document.querySelector('.grid')?[
   ['header button','x'],['.tabs button','x'],['.grid .item','grid']]:[
   ['header button','x'],['.weapons button','x'],['.slots .slot','x'],['.candidateRow button','x'],[action,'x',true]];
  if(path.includes('maintenance-palette'))return [['nav a,nav span.active','x'],['.weapons button','x'],['.slots button','x'],['.services button','x'],['.payment button,.candidateRow button','x'],[action,'x',true]];
  if(path.includes('maintenance-stamp'))return [['nav a,nav span.selected','x'],['.weapons button','x'],['.types button','x'],['.inventory button','y'],[action,'x',true]];
  return [['nav a,nav span.wash','x'],['.product','y'],[action,'x',true]];
 }
 function groups(){return definitions().map(([selector,axis,execute])=>({selector,axis,execute,els:[...document.querySelectorAll(selector)].filter(e=>!e.disabled&&!e.closest('[hidden]')&&e.getClientRects().length)})).filter(g=>g.els.length)}
 function paint(activate=false){let gs=groups();group=Math.max(0,Math.min(group,gs.length-1));let g=gs[group];if(!g)return;index=Math.max(0,Math.min(index,g.els.length-1));let el=g.els[index];
  if(activate&&!g.execute&&el.tagName==='BUTTON'){busy=true;el.click();busy=false;gs=groups();g=gs[Math.min(group,gs.length-1)];el=g?.els[Math.min(index,g.els.length-1)];}if(!el)return;
  document.querySelectorAll('.keyboard-current').forEach(x=>x.classList.remove('keyboard-current'));el.classList.add('keyboard-current');el.setAttribute('tabindex','0');el.focus({preventScroll:true});if(el.closest('.grid'))el.scrollIntoView({block:'nearest',inline:'nearest'});
  let hint=document.querySelector('#navigationHint');if(!hint){hint=document.createElement('div');hint.id='navigationHint';document.querySelector('.screen').append(hint)}hint.textContent=g.execute?'F 적용 · Esc 이전 선택으로':'방향키 이동 · F 선택 확정 · Esc 이전 선택으로';
 }
 function enter(){const gs=groups(),g=gs[group];if(!g)return;const el=g.els[index];if(g.execute){if(el&&!el.disabled){busy=true;el.click();busy=false;paint()}return}if(el?.tagName==='A'){el.click();return}if(group<gs.length-1){trail.push([group,index]);group++;index=0;paint(true)}}
 document.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Enter','f','F','Escape','Tab'].includes(e.key))return;e.preventDefault();e.stopImmediatePropagation();if(e.repeat)return;
  if(!started){started=true;group=groups().length>1?1:0;index=0;paint(true);return}
  if(e.key==='Escape'){if(trail.length)[group,index]=trail.pop();else{group=Math.max(0,group-1);index=0}paint(false);return}
  if(['f','F','Enter'].includes(e.key)){enter();return}
  if(e.key==='Tab'){group=(group+(e.shiftKey?-1:1)+groups().length)%groups().length;index=0;paint(true);return}
  const g=groups()[group];if(!g)return;let dx=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0,dy=e.key==='ArrowDown'?1:e.key==='ArrowUp'?-1:0;
  if(g.axis==='grid'){let next=index+dx+dy*4;if(next>=0&&next<g.els.length){index=next;paint(true)}return}
  const delta=g.axis==='x'?dx:dy;
  if(delta&&index+delta>=0&&index+delta<g.els.length){index+=delta;paint(true);return}
  if(e.key==='ArrowRight'||e.key==='ArrowDown'){if(!g.execute)enter()}
  else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){if(trail.length)[group,index]=trail.pop();else{group=Math.max(0,group-1);index=0}paint(false)}
 },true);
 document.addEventListener('click',e=>{if(busy)return;const gs=groups();for(let i=0;i<gs.length;i++){const n=gs[i].els.findIndex(x=>x===e.target||x.contains(e.target));if(n>=0){group=i;index=n;started=true;trail=[];setTimeout(()=>paint(false),0);break}}},true);
 const style=document.createElement('style');style.textContent=`.keyboard-current{outline:none!important;filter:brightness(1.22)}.keyboard-current:not(.item):not(.slot){text-shadow:0 0 12px #b5d8e430}.keyboard-current.item img{transform:scale(1.13)}#navigationHint{position:absolute;left:150px;bottom:16px;font-size:21px;color:#b3bbc4;pointer-events:none}.keyboard-current:focus-visible{outline:none!important}`;document.head.append(style);
})();
