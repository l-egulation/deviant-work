// Presentation prototypes. No Unity scene, profile, wallet, or story flags are modified.
let notebookFound=true,recordPage=0,recordStage=2;
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
function dialogueScreen(){return `${villageScene(2,true)}<section class="dialoguePanel" aria-label="마을 장인과 대화">${speechFrame()}<div class="dialogueSpeaker">마을 장인</div><p class="dialogueText">${villageDialogue[dialogueLine]}</p><div class="dialogueBottom"><span class="muted">${dialogueLine+1} / ${villageDialogue.length}</span><div class="actions">${action(dialogueLine===villageDialogue.length-1?'대화 마치기':'다음','advanceDialogue()')}${action('닫기','closeVillageView()',false,true)}</div></div></section>`}
function openVillageSite(){const site=villageSites[villageTarget];if(villageTarget===3){stage='closed';receiptNext();foot.innerHTML='<span>1챕터로 출발 · 실제 씬 이동은 Unity에서 연결</span>';return}if(villageTarget===0){recordSeen=true;recordPage=0;}villageReturn=true;go(site.view)}
function villageScreen(){const site=villageSites[villageTarget],fresh=villageTarget===0&&!recordSeen||villageTarget===1&&wellInk>0;return `${villageScene(villageTarget)}<div class="worldPrompt" style="${villageAnchor(villageTarget)}">${speechFrame()}<p class="siteName">${fresh?'<span class="siteNews"><img src="assets/village-news.png" alt="새 소식"></span>':''}${site.name}</p><div class="actions">${action(site.verb,'openVillageSite()')}</div></div>`}
function turnRecordPage(page){if(page===1&&!notebookFound)return;recordPage=page;render()}
const recordNote={"schemaVersion": 1, "id": "record_note", "title": "조사 기록", "source": "docs/design/world/village/starting-village.md; knowledge is appended only after the corresponding village scene", "lines": ["신고를 받고 마을에 왔다. 지붕도 길도 색이 빠져 있었다.", "길에서 마주친 두 사람이 눈앞에서 지워졌다. 우물까지 도망쳤지만 더 갈 곳이 없었다.", "그때 누군가 나를 감싸고 자기 잉크를 쏟아부었다. 그 사람은 사라졌고, 나는 살아남았다. 몸은 잉크로 변해 있었다."], "afterFirstRun": ["쓰러지면 우물가에서 다시 깨어난다. 아직 잉크가 남아 있어서라고 한다.", "색을 빼앗은 놈을 찾아야 한다. 다시 이정표 너머로 가 봐야겠다."], "afterFirstInk": ["시계탑 집행자에게서 붉은 잉크를 가져왔다. 장인의 말대로 우물에 부었더니 마을에 붉은색이 돌아왔다.", "다른 색도 같은 방법으로 되찾을 수 있을 것 같다."]};
function recordsScreen(){const footer=`<div class="recordFooter actions">${action('이전','turnRecordPage(0)',recordPage===0,true)}<span class="recordPageCount">${recordPage+1} / ${notebookFound?2:1}</span>${action('다음','turnRecordPage(1)',!notebookFound||recordPage===1,true)}${action('닫기','closeVillageView()',false,true)}</div>`;if(recordPage===1)return `<div class="notebookSpread" aria-label="발견한 수첩"><section><h2>침식자</h2><img src="assets/eroders-notebook.png" alt="시계 집행자와 네 미확인 침식자"><p>마을의 색을 빼앗아 몸에 가두는 존재.<br>쓰러뜨리면 품고 있던 잉크를 뱉어낸다.</p></section><section><h2>마을 잉크</h2><img src="assets/well-ink-notebook.png" alt="마을 잉크를 우물에 붓는 삽화"><p>우물은 마을 곳곳의 물길과 이어져 있다.<br>잉크를 흘려보내면 물길을 따라<br>마을에 색이 돌아온다.</p></section></div>${footer}`;const additions=[...(recordStage>=1?recordNote.afterFirstRun:[]),...(recordStage>=2?recordNote.afterFirstInk:[])];return `<div class="recordSpread" aria-label="조사 기록"><section class="scroll"><h2>조사 기록</h2>${recordNote.lines.map(t=>`<p>${t}</p>`).join('')}</section><section class="scroll">${additions.length?additions.map(t=>`<p>${t}</p>`).join(''):'<p class="muted">이야기는 계속된다.</p>'}</section></div>${footer}`}
function pourVillageInk(){if(!wellInk)return;wellInk--;stage='poured';render()}
function wellScreen(){return `${villageScene(1)}<section class="wellPanel" role="dialog" aria-label="우물">${speechFrame()}<h2>우물</h2>${wellInk?`<div class="identity"><img class="weapon" src="${A}ink3_red_02-jar.png" alt="붉은 마을 잉크"><div><h3>붉은 마을 잉크</h3><small>아직 사용하지 않은 잉크</small></div></div><p>우물에 부어 마을의 색을 되찾습니다.</p>`:`<p>${stage==='poured'?'붉은 마을 잉크를 사용했습니다.':'아직 사용하지 않은 마을 잉크가 없습니다.'}</p>`}<div class="actions">${wellInk?action('잉크 붓기','pourVillageInk()'):''}${action('닫기','closeVillageView()',false,!!wellInk)}</div></section>`}

// Screen-space review anchors. Runtime should project each station/NPC's opaque top.
const villageAnchors=[{x:560,y:550,file:'farm',height:330},{x:1190,y:630,file:'well',height:250},{x:850,y:480,file:'workshop',height:400},{x:1370,y:730,file:'sign',height:150}];
function villageAnchor(i){const a=villageAnchors[i];return `left:${a.x-130}px;top:${a.y-18}px`}
function villageScene(i,talking=false){const a=villageAnchors[i];return `<div class="villageScene" aria-hidden="true"><div class="villageScenery"></div><div class="villageGround"></div><img class="stationArt" src="assets/village-${a.file}.png" style="left:${a.x}px;height:${a.height}px">${talking?'<img class="artisanArt" src="assets/village-artisan.png">':''}</div>`}

function speechFrame(){const part=(x,y,w,h)=>`<svg viewBox="${x} ${y} ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><image href="assets/speech-frame-v1.png" width="1983" height="793"/></svg>`;return `<div class="speechSkin" aria-hidden="true"><div class="skinTop">${part(0,0,220,180)}${part(220,0,1543,180)}${part(1763,0,220,180)}</div><div class="skinMiddle">${part(0,180,220,390)}${part(220,180,1543,390)}${part(1763,180,220,390)}</div><div class="skinBottom">${part(0,570,220,223)}${part(220,570,680,223)}${part(900,570,180,223)}${part(1080,570,683,223)}${part(1763,570,220,223)}</div></div>`}
