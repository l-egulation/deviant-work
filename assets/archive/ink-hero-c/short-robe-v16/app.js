'use strict';
const $=id=>document.getElementById(id),ctx=$('stage').getContext('2d'),images={},stage=$('stage');ctx.imageSmoothingEnabled=false;
const off=document.createElement('canvas');off.width=96;off.height=80;const g=off.getContext('2d');g.imageSmoothingEnabled=false;
let time=0,phase=0,clipTime=0,mode='idle',frame=0,face=1,velocity=0,x=350,auto=true,paused=false,manualClock=false,ready=false,last=0,accumulator=0,stopAt=-10,keys=new Set();
let scarf=new Cloth.Spring(1.9,14,7);const trace=[];
const on=id=>$(id).checked;
function reset(){time=0;phase=0;clipTime=0;mode='idle';frame=0;face=1;velocity=0;x=350;auto=true;paused=false;stopAt=-10;keys.clear();scarf=new Cloth.Spring(1.9,14,7);accumulator=0;trace.length=0;$('pause').textContent='일시정지';}
function getFrame(){const list=CONTENT.clips[mode];let ms=clipTime*1000%list.reduce((a,f)=>a+f.ms,0);for(let i=0;i<list.length;i++){if(ms<list[i].ms){frame=i;return list[i];}ms-=list[i].ms;}frame=0;return list[0];}
function step(dt){time+=dt;phase+=dt;if(auto&&phase>=6){phase=0;x=350;face=1;}
 let dir=auto?(phase>=1.2&&phase<3.2?1:0):(keys.has('ArrowRight')?1:0)-(keys.has('ArrowLeft')?1:0);const prev=velocity;velocity=dir*62;
 if(dir)face=dir;
 if(prev!==0&&velocity===0){stopAt=time;}
 const next=dir?'run':'idle';if(next!==mode){mode=next;clipTime=0;}else clipTime+=dt;
 x=Math.max(310,Math.min(498,x+velocity*dt));
 scarf.step(dir?2.95:1.9,dt);
 if(time-stopAt<2)trace.push({t:time-stopAt,hem:0,scarf:scarf.x});if(trace.length>600)trace.shift();
}
function drawLayer(f,key){const im=images[f.layers[key]];if(im)g.drawImage(im,0,0);}
function costume(f){g.clearRect(0,0,96,80);g.save();g.translate(24,20);
 const dynamic=on('motion'),angle=dynamic?scarf.x:1.9;
 if(on('scarf'))Cloth.scarf(g,[f.head[0]-1,f.head[1]+9],angle,time,dynamic?Math.max(0,(scarf.x-1.9)/1.05):0);
 drawLayer(f,'farArm');drawLayer(f,'legs');drawLayer(f,'torso');
 if(on('robe'))Cloth.torso(g,f);
 drawLayer(f,'nearArm');drawLayer(f,'head');
 if(on('hood'))Cloth.hood(g,f);
 else{g.fillStyle='#b5a642';g.fillRect(f.head[0]+4,f.head[1]+3,1,2);g.fillRect(f.head[0]+7,f.head[1]+3,1,2);}
 if(on('scarf'))Cloth.collar(g,f);
 if(on('anchors')){g.fillStyle='#58a098';for(const p of [f.shoulder,f.waist,[f.head[0]-1,f.head[1]+9]])g.fillRect(p[0],p[1],1,1);}
 g.restore();return off;
}
function render(){if(!ready)return;const f=getFrame();ctx.fillStyle='#e9dfca';ctx.fillRect(0,0,576,240);ctx.fillStyle='#dcd1bb';ctx.fillRect(0,195,576,45);ctx.fillStyle='#b7ab93';ctx.fillRect(0,195,576,1);ctx.fillStyle='#c9bda6';ctx.fillRect(246,18,1,199);ctx.font='10px monospace';ctx.fillStyle='#786d5c';ctx.fillText('PURCHASED BODY',28,26);ctx.fillText('HOOD / ROBE / SCARF',274,26);
 ctx.fillStyle='#d0c3a9';for(let i=0;i<7;i++)ctx.fillRect(265+((i*48-time*Math.abs(velocity)*.65)%300+300)%300,204,10,1);
 const floor=195,scale=4;ctx.fillStyle='#bfb198';ctx.fillRect(104,floor,40,2);ctx.fillRect(Math.round(x)-24,floor,48,2);
 ctx.save();ctx.translate(126,floor);ctx.scale(face*scale,scale);ctx.drawImage(images[f.layers.original],-24,-40);ctx.restore();
 const dressed=costume(f);ctx.save();ctx.translate(Math.round(x),floor);ctx.scale(face*scale,scale);ctx.drawImage(dressed,-48,-60);ctx.restore();
 ctx.font='10px monospace';ctx.fillStyle='#786d5c';ctx.fillText(`${mode.toUpperCase()} ${String(frame+1).padStart(2,'0')} / ${CONTENT.clips[mode].length}`,28,226);ctx.fillText(on('motion')?'SECONDARY MOTION ON':'SECONDARY MOTION OFF',274,226);
 $('state').textContent=velocity?'달리기 · 천이 뒤로 끌림':time-stopAt<.45?'급정지 · 남은 관성':time-stopAt<1.7?'정착 · 흔들림 감쇠':'대기';$('source').textContent=`구매 에셋 ${mode==='run'?'Run':'Idle'} ${frame+1}번 자세`;$('physicsState').textContent=on('motion')?'목도리 관성 켜짐':'고정 의상 비교';
}
function advance(dt){if(paused)return;accumulator+=dt;while(accumulator>=1/120){step(1/120);accumulator-=1/120;}render();}
function tick(ts){const dt=last?Math.min(.05,(ts-last)/1000):0;last=ts;if(ready&&!manualClock&&!document.hidden)advance(dt*+$('speed').value);requestAnimationFrame(tick);}
function stop(){auto=false;keys.clear();}
$('auto').onclick=()=>{reset();render();};$('stop').onclick=stop;$('pause').onclick=()=>{paused=!paused;$('pause').textContent=paused?'계속 재생':'일시정지';};for(const id of ['motion','hood','robe','scarf','anchors'])$(id).onchange=render;
for(const [id,key] of [['left','ArrowLeft'],['right','ArrowRight']]){$(id).onpointerdown=e=>{e.preventDefault();$(id).setPointerCapture(e.pointerId);auto=false;keys.add(key);};$(id).onpointerup=$(id).onpointercancel=()=>keys.delete(key);}
window.addEventListener('keydown',e=>{if(e.target.tagName==='SELECT')return;if(['ArrowLeft','ArrowRight',' '].includes(e.key)){e.preventDefault();auto=false;if(e.key===' ')stop();else keys.add(e.key);}});window.addEventListener('keyup',e=>keys.delete(e.key));window.addEventListener('blur',()=>{if(!auto)stop();});
window.demo={advance,render,reset,stop,trace,get ready(){return ready},set manual(v){manualClock=v},snapshot:()=>({time,phase,mode,frame,face,velocity,x,hem:0,scarf:scarf.x,stopAt,paused}),nativeFrame:()=>{const f=getFrame();return costume(f).toDataURL();}};
Promise.all(Object.entries(MEDIA).map(([key,url])=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>{images[key]=im;resolve();};im.onerror=reject;im.src=url;}))).then(()=>{ready=true;reset();render();requestAnimationFrame(tick);});
