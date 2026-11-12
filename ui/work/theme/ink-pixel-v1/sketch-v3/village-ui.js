// Presentation prototypes. No Unity scene, profile, wallet, or story flags are modified.
let villageReturn=false,villageTarget=0,dialogueLine=0,recordSeen=false,wellInk=1;
const villageSites=[
 {name:'기록 농가',verb:'기록 읽기',view:'records'},
 {name:'우물',verb:'살펴보기',view:'well'},
 {name:'장인의 공방',verb:'공방 열기',view:'permanent'},
 {name:'출발 이정표',verb:'출발하기',view:'village'}
];
const villageDialogue=[
 '여기가 내 공방이야. 안료로 출발 자금을 챙기거나 몸을 단련할 수 있어.',
 '필요한 준비는 내 공방에서 한 번에 도와줄게.',
 '작업대에서 필요한 걸 골라 줘. 안료가 모자라면 나중에 와도 괜찮아.'
];
function closeVillageView(){villageReturn=false;view='village';stage='browse';render()}
function advanceDialogue(){if(dialogueLine<villageDialogue.length-1){dialogueLine++;render()}else closeVillageView()}
function dialogueScreen(){return `<section class="dialoguePanel" aria-label="마을 장인과 대화"><div class="dialogueSpeaker">마을 장인</div><p class="dialogueText">${villageDialogue[dialogueLine]}</p><div class="dialogueBottom"><span class="muted">${dialogueLine+1} / ${villageDialogue.length}</span><div class="actions">${action(dialogueLine===villageDialogue.length-1?'대화 마치기':'다음','advanceDialogue()')}${action('닫기','closeVillageView()',false,true)}</div></div></section>`}
function openVillageSite(){const site=villageSites[villageTarget];if(villageTarget===3){stage='closed';receiptNext();foot.innerHTML='<span>1챕터로 출발 · 실제 씬 이동은 Unity에서 연결</span>';return}if(villageTarget===0)recordSeen=true;villageReturn=true;go(site.view)}
function villageScreen(){const site=villageSites[villageTarget],fresh=villageTarget===0&&!recordSeen||villageTarget===1&&wellInk>0;return `<div class="worldPrompt"><p class="siteName">${fresh?'<span class="siteNews" aria-label="새 소식">!</span>':''}${site.name}</p><div class="actions">${action(site.verb,'openVillageSite()')}</div></div>`}
function recordsScreen(){return `<div class="recordSpread" aria-label="조사 기록"><section class="scroll"><h2>조사 기록</h2><p>신고를 받고 마을에 왔다. 지붕도 길도 색이 빠져 있었다.</p><p>길에서 마주친 두 사람이 눈앞에서 지워졌다. 우물까지 도망쳤지만 더 갈 곳이 없었다.</p><p>그때 누군가 나를 감싸고 자기 잉크를 쏟아부었다. 그 사람은 사라졌고, 나는 살아남았다. 몸은 잉크로 변해 있었다.</p></section><section class="scroll"><p>쓰러지면 우물가에서 다시 깨어난다. 아직 잉크가 남아 있어서라고 한다.</p><p>색을 빼앗은 놈을 찾아야 한다. 다시 이정표 너머로 가 봐야겠다.</p><p>시계탑 집행자에게서 붉은 잉크를 가져왔다. 장인의 말대로 우물에 부었더니 마을에 붉은색이 돌아왔다.</p><p>다른 색도 같은 방법으로 되찾을 수 있을 것 같다.</p></section></div><div class="recordFooter actions">${action('닫기','closeVillageView()')}</div>`}
function pourVillageInk(){if(!wellInk)return;wellInk--;stage='poured';render()}
function wellScreen(){return `<section class="wellPanel" role="dialog" aria-label="우물"><h2>우물</h2>${wellInk?`<div class="identity"><img class="weapon" src="${A}ink3_red_02-jar.png" alt="붉은 마을 잉크"><div><h3>붉은 마을 잉크</h3><small>아직 사용하지 않은 잉크</small></div></div><p>우물에 부어 마을의 색을 되찾습니다.</p>`:`<p>${stage==='poured'?'붉은 마을 잉크를 사용했습니다.':'아직 사용하지 않은 마을 잉크가 없습니다.'}</p>`}<div class="actions">${wellInk?action('잉크 붓기','pourVillageInk()'):''}${action('닫기','closeVillageView()',false,!!wellInk)}</div></section>`}
