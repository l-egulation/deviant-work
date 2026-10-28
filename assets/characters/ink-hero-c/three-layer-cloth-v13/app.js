'use strict';
const $=id=>document.getElementById(id),ctx=$('stage').getContext('2d'),images={},stage=$('stage');ctx.imageSmoothingEnabled=false;
const off=document.createElement('canvas');off.width=160;off.height=160;const g=off.getContext('2d');g.imageSmoothingEnabled=false;
let time=0,phase=0,clipTime=0,mode='idle',frame=0,face=1,velocity=0,x=350,auto=true,paused=false,manualClock=false,ready=false,last=0,accumulator=0,stopAt=-10,keys=new Set();
let hem=new Cloth.Spring(0,75,7),sleeve=new Cloth.Spring(0,95,11),scarf=new Cloth.Spring(0,65,6);const trace=[];
const on=id=>$(id).checked;
function reset(){time=0;phase=0;clipTime=0;mode='idle';frame=0;face=1;velocity=0;x=350;auto=true;paused=false;stopAt=-10;keys.clear();hem=new Cloth.Spring(0,75,7);sleeve=new Cloth.Spring(0,95,11);scarf=new Cloth.Spring(0,65,6);trace.length=0;$('pause').textContent='일시정지';}
function getFrame(){const list=CONTENT.clips[mode];let ms=clipTime*1000%list.reduce((a,f)=>a+f.ms,0);for(let i=0;i<list.length;i++){if(ms<list[i].ms){frame=i;return list[i];}ms-=list[i].ms;}frame=0;return list[0];}
function step(dt){time+=dt;phase+=dt;if(auto&&phase>=6){phase=0;x=350;face=1;}
 let dir=auto?(phase>=1.2&&phase<3.2?1:0):(keys.has('ArrowRight')?1:0)-(keys.has('ArrowLeft')?1:0);const prev=velocity;velocity=dir*62;
 if(dir)face=dir;
 if(prev!==0&&velocity===0){stopAt=time;hem.v+=13;sleeve.v+=5;scarf.v+=12;}
 const next=dir?'run':'idle';if(next!==mode){mode=next;clipTime=0;}else clipTime+=dt;
 x=Math.max(310,Math.min(498,x+velocity*dt));
 hem.step(dir?-.7:0,dt);sleeve.step(dir?-.5:0,dt);scarf.step(dir?-.85:0,dt);
 if(time-stopAt<2)trace.push({t:time-stopAt,hem:hem.x,scarf:scarf.x});if(trace.length>600)trace.shift();
}
function drawLayer(f,key){const im=images[f.layers[key]];if(im)g.drawImage(im,0,0);}
function costume(f){g.clearRect(0,0,160,160);g.save();g.translate(16,16);const p=Cloth.pose(f),bend=on('motion')?hem.x:0,sbend=on('motion')?scarf.x:0;
 if(on('body')){for(const key of ['legs','torso','farArm','nearArm']){const im=images[f.layers[key]];if(!im)continue;const ox=key==='nearArm'?1:key==='farArm'?-1:0,oy=key.includes('Arm')?5:0;if(on('robe')&&key.includes('Arm')){const q=key==='nearArm'?f.nearWrist:f.farWrist;g.drawImage(im,q[0]-2,q[1]-1,5,4,22+ox+(q[0]-2)*2,40+oy+(q[1]-1)*2,10,8);}else g.drawImage(im,22+ox,40+oy,96,96);}const head=images['assets/body.png'];g.drawImage(head,48,64,40,20,48+p.head[0],64+p.head[1],40,20);}
 if(on('robe'))Cloth.draw(g,CONTENT.garments.robe,'robe',p,bend,time);
 if(on('scarf'))Cloth.draw(g,CONTENT.garments.scarf,'scarf',p,sbend,time);
 if(on('anchors')){g.fillStyle='#3cbdad';for(const [xx,yy] of [[70+p.head[0],82+p.head[1]],[70+p.torso[0],99+p.torso[1]]])g.fillRect(Math.round(xx)-1,Math.round(yy)-1,2,2);}
 g.restore();return off;}
function render(){if(!ready)return;const f=getFrame();ctx.fillStyle='#e9dfca';ctx.fillRect(0,0,576,240);ctx.fillStyle='#dcd1bb';ctx.fillRect(0,195,576,45);ctx.fillStyle='#b7ab93';ctx.fillRect(0,195,576,1);ctx.fillStyle='#c9bda6';ctx.fillRect(246,18,1,199);ctx.font='10px monospace';ctx.fillStyle='#786d5c';ctx.fillText('PURCHASED BODY',28,26);ctx.fillText('HOOD / ROBE / SCARF',274,26);
 ctx.fillStyle='#d0c3a9';for(let i=0;i<7;i++)ctx.fillRect(265+((i*48-time*Math.abs(velocity)*.65)%300+300)%300,204,10,1);
 const floor=195,scale=4;ctx.fillStyle='#bfb198';ctx.fillRect(104,floor,40,2);ctx.fillRect(Math.round(x)-24,floor,48,2);
 ctx.save();ctx.translate(126,floor);ctx.scale(face*scale,scale);ctx.drawImage(images[f.layers.original],-24,-40);ctx.restore();
 const dressed=costume(f);ctx.save();ctx.translate(Math.round(x),floor);ctx.scale(face*2,2);ctx.drawImage(dressed,-86,-136);ctx.restore();
 ctx.font='10px monospace';ctx.fillStyle='#786d5c';ctx.fillText(`${mode.toUpperCase()} ${String(frame+1).padStart(2,'0')} / ${CONTENT.clips[mode].length}`,28,226);ctx.fillText(on('motion')?'SECONDARY MOTION ON':'SECONDARY MOTION OFF',274,226);
 $('state').textContent=velocity?'달리기 · 천이 뒤로 끌림':time-stopAt<.45?'급정지 · 남은 관성':time-stopAt<1.7?'정착 · 흔들림 감쇠':'대기';$('source').textContent=`구매 에셋 ${mode==='run'?'Run':'Idle'} ${frame+1}번 자세`;$('physicsState').textContent=on('motion')?'옷의 관성 켜짐':'고정 의상 비교';
}
function advance(dt){if(paused)return;accumulator+=dt;while(accumulator>=1/120){step(1/120);accumulator-=1/120;}render();}
function tick(ts){const dt=last?Math.min(.05,(ts-last)/1000):0;last=ts;if(ready&&!manualClock&&!document.hidden)advance(dt*+$('speed').value);requestAnimationFrame(tick);}
function stop(){auto=false;keys.clear();}
$('auto').onclick=()=>{reset();render();};$('stop').onclick=stop;$('pause').onclick=()=>{paused=!paused;$('pause').textContent=paused?'계속 재생':'일시정지';};for(const id of ['motion','body','robe','scarf','anchors'])$(id).onchange=render;
for(const [id,key] of [['left','ArrowLeft'],['right','ArrowRight']]){$(id).onpointerdown=e=>{e.preventDefault();$(id).setPointerCapture(e.pointerId);auto=false;keys.add(key);};$(id).onpointerup=$(id).onpointercancel=()=>keys.delete(key);}
window.addEventListener('keydown',e=>{if(e.target.tagName==='SELECT')return;if(['ArrowLeft','ArrowRight',' '].includes(e.key)){e.preventDefault();auto=false;if(e.key===' ')stop();else keys.add(e.key);}});window.addEventListener('keyup',e=>keys.delete(e.key));window.addEventListener('blur',()=>{if(!auto)stop();});
window.demo={advance,render,reset,stop,trace,get ready(){return ready},set manual(v){manualClock=v},snapshot:()=>({time,phase,mode,frame,face,velocity,x,hem:hem.x,scarf:scarf.x,stopAt,paused}),nativeFrame:()=>{const f=getFrame();return costume(f).toDataURL();}};
Promise.all(Object.entries(MEDIA).map(([key,url])=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>{images[key]=im;resolve();};im.onerror=reject;im.src=url;}))).then(()=>{ready=true;reset();render();requestAnimationFrame(tick);});
