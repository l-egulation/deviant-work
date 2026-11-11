const A='../screen-set-v6/assets/';
const sketches=[
{id:'a',name:'레이피어',art:'rapier',skill:'범위 · 장침',attack:'좁은 전방을 빠르게 찌릅니다.',desc:'긴 찌르기로 전방의 적을 공격합니다.',colors:['red','blue','yellow'],dur:100},
{id:'b',name:'발사기',art:'launcher',skill:'기본 · 모아쏘기',attack:'직선으로 탄환을 발사합니다.',desc:'힘을 모아 강한 탄환을 발사합니다.',colors:['blue','green','purple'],dur:100},
{id:'c',name:'레이피어',art:'rapier',skill:'이동 · 흘려찌르기',attack:'좁은 전방을 빠르게 찌릅니다.',desc:'가까운 적 앞으로 이동한 뒤 찌릅니다.',colors:['yellow','red','green'],dur:100}
];
let inventory=[{...sketches[0],id:'owned-a',dur:43,effects:true},{...sketches[1],id:'owned-b',dur:76},...Array.from({length:5},(_,i)=>({...sketches[i%3],id:'owned-'+i,dur:[100,28,65,91,52][i]}))];
let view=new URLSearchParams(location.search).get('view')==='bag'?'bag':'reward',pick=0,stage='browse',target=0,notice='';let equipped=['owned-a','owned-b'];
const app=document.getElementById('app'),foot=document.getElementById('foot');
function palette(s){return '<div class="palettes">'+s.colors.map((c,i)=>`<img src="${A}${s.effects&&i<2?'filled':'empty'}-${c}.png" alt="${c} ${s.effects&&i<2?'적용된 칸':'빈 칸'}">`).join('')+'</div>'}
function durability(s){return `<div class="durability"><span>내구도 ${s.dur}%</span><span class="bar"><i style="width:${s.dur}%"></i></span></div>`}
function choose(i){pick=i;notice='';render()}
function render(){
 if(view==='reward'){
 app.innerHTML=`<header><h1>스케치 선택</h1><small>3개 중 하나를 선택하세요</small></header><div class="cards">${sketches.map((s,i)=>`<button class="card ${i===pick?'selected':''}" onclick="choose(${i})"><img class="weapon" src="${A}weapon-${s.art}.png"><h2><span class="name">${s.name}</span></h2><p>${s.attack}</p><div class="rule"></div><h3>${s.skill}</h3><p style="min-height:75px">${s.desc}</p><div class="rule"></div><p class="muted">팔레트</p>${palette(s)}</button>`).join('')}</div><div class="actions"><button class="action" onclick="confirm()"><kbd>F</kbd>선택한 스케치 획득</button><span class="muted">가방에 보관</span></div>`;
 foot.innerHTML='<span>← → 후보 선택</span><span>구성·수치는 UI 검토용 예시</span>';
 }else if(view==='received'){
 app.innerHTML=`<header><h1>스케치 획득</h1></header><div class="result"><h2>${inventory[inventory.length-1].name}</h2><p>가방에 보관했습니다.</p><button class="action" onclick="confirm()"><kbd>F</kbd>가방 보기</button></div>`;foot.innerHTML='';
 }else{
 const s=inventory[pick];
 app.innerHTML=`<header><h1>가방 <span class="wash" style="font-size:30px;margin-left:42px">스케치</span></h1><small>일시정지</small></header><div class="columns"><section><div class="list">${inventory.map((x,i)=>`<button ${stage==='target'?'disabled':''} class="row ${i===pick?'selected':''}" onclick="choose(${i})"><img class="weapon" src="${A}weapon-${x.art}.png"><div><h2><span class="name">${x.name}</span> <small>${equipped.includes(x.id)?'무기 '+(equipped.indexOf(x.id)+1)+' 장착 중':''}</small></h2><small>${x.skill}</small>${durability(x)}${palette(x)}</div></button>`).join('')}</div><p class="muted">스케치 ${inventory.length}개　·　↕ 스크롤</p></section><section class="detail"><div class="detailTop"><img class="weapon" src="${A}weapon-${s.art}.png"><div><h2>${s.name}</h2>${durability(s)}</div></div><div class="rule"></div><h3>기본 공격</h3><p>${s.attack}</p><h3>${s.skill}</h3><p>${s.desc}</p><div class="rule"></div><h3>팔레트 적용 효과</h3>${s.effects?`<p class="muted">적용된 잉크 2개</p><div class="summary"><small>종합 효과 · 스킬 사용 시</small><p>자신에게 기절 0.5초</p><p class="gain">3초 동안 기본 공격 피해 증가</p><div class="source">개별 구성: 기절 1.5초 / 기절 효과 시간 −2초 → 피해 증가</div></div>`:`${palette(s)}<p class="muted">적용된 잉크 없음</p>`}${stage==='target'?`<div class="destinations">${equipped.map((id,i)=>{let x=inventory.find(a=>a.id===id);return `<button class="${target===i?'wash':''}" onclick="target=${i};render()">무기 ${i+1}<p>${x?.name||'빈 자리'}</p><small>${x?x.dur+'%':''}</small></button>`}).join('')}</div><div class="actions"><button class="action" onclick="confirm()"><kbd>F</kbd>이 자리에 장착</button></div>`:`<div class="actions"><button class="action" ${equipped.includes(s.id)?'disabled':''} onclick="confirm()"><kbd>F</kbd>${equipped.includes(s.id)?'장착 중인 스케치':'장착 자리 선택'}</button></div>`}<p class="notice" role="status">${notice}</p></section></div>`;
 foot.innerHTML=stage==='target'?'<span>← → 장착 자리 선택　·　Esc 목록으로</span><span>기존 스케치는 가방에 유지</span>':'<span>↑ ↓ 스케치 선택　·　F 장착 자리 선택</span><span>시안 · 새로고침하면 초기화</span>';
 const row=app.querySelector('.row.selected');if(stage==='browse')row?.scrollIntoView({block:'nearest'});
 }
}
function confirm(){if(view==='reward'){inventory.push({...sketches[pick],id:'reward'});view='received'}else if(view==='received'){view='bag';pick=inventory.length-1}else if(stage==='browse'){if(equipped.includes(inventory[pick].id))return;stage='target';target=0}else{equipped[target]=inventory[pick].id;stage='browse';notice='무기 '+(target+1)+'에 장착됨'}render()}
document.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','f','F','Escape'].includes(e.key))return;e.preventDefault();if(e.repeat)return;if(e.key.toLowerCase()==='f'){confirm();return}if(e.key==='Escape'){stage='browse';render();return}if(view==='reward'&&['ArrowLeft','ArrowRight'].includes(e.key))pick=(pick+(e.key==='ArrowRight'?1:2))%3;else if(view==='bag'&&stage==='target'&&['ArrowLeft','ArrowRight'].includes(e.key))target=1-target;else if(view==='bag'&&stage==='browse'&&['ArrowUp','ArrowDown'].includes(e.key))pick=(pick+(e.key==='ArrowDown'?1:inventory.length-1))%inventory.length;render()});
function fit(){document.querySelector('.screen').style.transform=`scale(${Math.min(innerWidth/1920,innerHeight/1080)})`}onresize=fit;fit();render();
