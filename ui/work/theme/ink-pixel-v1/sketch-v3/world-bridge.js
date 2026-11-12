// Optional same-session review integration. Standalone gallery screens are unchanged.
(()=>{
 if(!new URLSearchParams(location.search).has('worldBridge')||parent===window)return;
 const handledAlerts=new Set();
 let kind='',lastRequest=0,eventState=null,weaponCount=0;
 const send=()=>parent.postMessage({type:'deviant-world-close',bank:chances,crafted:weapons.length>weaponCount},'*');
 const priorVillageClose=closeVillageView;closeVillageView=function(){if(kind==='records'){send();return}priorVillageClose()};
 const priorRender=render,priorTake=takeReward,priorReceipt=receiptNext,priorBack=back,priorAugment=augmentScreen;
 window.worldReviewClose=()=>{if(['event','seal','boss','normal','first'].includes(kind)&&stage==='choose')return;send()};
 takeReward=function(){if(stage!=='choose')return;priorTake();if(kind==='event'&&eventState){chances=eventState.chances;rewardRound=eventState.round;inkOpportunities=eventState.opportunities;earned=eventState.earned;eventState=null;render()}};
 receiptNext=function(){if(['event','normal','first'].includes(kind)&&stage==='receipt'){send();return}if(kind==='boss'&&stage==='receipt'){if(bossPending){continueRewards();return}send();return}priorReceipt()};
 augmentScreen=function(){let html=priorAugment();if(kind==='seal'&&stage==='choose')html=html.replace(/<button[^>]*onclick="stage='browse';render\(\)"[^>]*>[\s\S]*?<\/button>/g,'');if(kind==='seal'&&stage==='receipt')html=html.replace('onclick="stage=\'browse\';render()"','onclick="worldReviewClose()"');return html};
 back=function(){if(['event','seal','boss'].includes(kind)&&stage==='choose'&&['reward','boss','augment'].includes(view))return;if(['equipment','craft','village','records'].includes(kind)&&stage==='browse'){send();return}priorBack()};
 render=function(){priorRender();if(kind==='event'&&stage==='receipt'){const actions=app.querySelector('.actions');if(actions){actions.innerHTML=action('닫기','worldReviewClose()');focusControl(actions.querySelector('button'))}}if(kind==='seal'&&stage==='choose'){app.querySelectorAll('.action').forEach(b=>{if(b.textContent.includes('나중에'))b.remove()})}if(kind==='boss'&&stage==='receipt'){app.querySelectorAll('.action').forEach(b=>{if(b.textContent.includes('닫기')&&bossPending)b.remove()})}};
 window.addEventListener('keydown',e=>{if(e.code==='Escape'&&['event','seal','boss'].includes(kind)&&stage==='choose'&&['reward','boss','augment'].includes(view)){e.preventDefault();e.stopImmediatePropagation()}if(['KeyI','KeyM'].includes(e.code)&&['event','seal','boss'].includes(kind)&&stage==='choose'&&['reward','boss','augment'].includes(view)){e.preventDefault();e.stopImmediatePropagation()}},true);
 window.addEventListener('message',e=>{if(e.source!==parent||e.data?.type!=='deviant-world-open')return;const d=e.data;if(d.request<=lastRequest)return;lastRequest=d.request;kind=d.kind;weaponCount=weapons.length;chances=d.bank||0;returnView=null;dialog=null;pick=0;stage='browse';worldShop=false;
 if(['normal','first','event'].includes(kind)){view='reward';offers=null;bossPending=false;chances=d.bank||0;if(kind==='event'){eventState={chances,round:rewardRound,opportunities:inkOpportunities,earned:{...earned}};chances=1;}if(kind==='first')chances=Math.max(1,chances);openRewards()}
 else if(kind==='seal'){view='augment';openSeal();render()}
 else if(kind==='boss'){view='boss';bossRound=0;bossPending=true;offers=null;openRewards()}
 else{if(kind==='equipment'&&d.origin==='weapon-alert'&&!handledAlerts.has(d.origin)){handledAlerts.add(d.origin);const id=equipped[0];weapons=weapons.filter(x=>x.uid!==id);equipped[0]=null;}
 view=kind==='village'?'village':kind;render()}
 if(window.deviantFontData)document.querySelector('#fontNotice')?.remove();
 });
 parent.postMessage({type:'deviant-world-ready'},'*');
})();
