(function(root){
class SwordStudy {
 constructor(content){this.c=content;this.events=[];this.serial=0;this.reset();}
 reset(){this.time=0;this.player={x:6,face:1};this.target={x:8.8,hp:this.c.monster.definition.maxHP,hitUntil:0,deathAt:null,push:null};this.action=null;this.cooldownUntil=0;this.wall=false;this.input=0;this.events=[];this.emit('reset');}
 emit(type,data={}){this.events.push({type,time:this.time,...data});}
 bounds(){const m=this.c.monster;return {left:this.target.x-m.hurtSize[0]/2,right:this.target.x+m.hurtSize[0]/2,bottom:0,top:m.hurtSize[1]};}
 definition(kind){if(kind==='basic'){const b=this.c.basic;return {duration:b.duration,impact:b.impact,active:b.active,damage:b.damage,width:b.box.width,height:b.box.height,offset:b.box.x};}const s=this.c.special,h=s.hits[0];return {duration:s.motion_end,impact:h.time,active:h.active,damage:h.damage,width:h.shape.size[0],height:h.shape.size[1],offset:h.shape.right_offset[0]};}
 begin(kind){if(this.action)return false;if(kind==='special'&&this.time<this.cooldownUntil){this.emit('blocked',{reason:'cooldown'});return false;}this.action={id:++this.serial,kind,start:this.time,age:0,face:this.player.face,activated:false,hit:false,...this.definition(kind)};this.emit('start',{kind,id:this.action.id});return true;}
 attackBox(a=this.action){if(!a)return null;const face=a.kind==='special'?a.face:this.player.face,center=this.player.x+face*a.offset;return {left:center-a.width/2,right:center+a.width/2,bottom:0,top:a.height};}
 blocked(box,target){if(!this.wall)return false;const wall={left:7.6,right:7.85};const a=this.player.x,b=Math.max(target.left,Math.min(target.right,(Math.max(box.left,target.left)+Math.min(box.right,target.right))/2));return Math.min(a,b)<wall.right&&Math.max(a,b)>wall.left;}
 update(dt){if(!(dt>0))return;const before=this.time;this.time+=dt;const a=this.action;
  if(this.input){if(!a||a.kind==='basic')this.player.face=Math.sign(this.input);const speed=!a?5:a.kind==='basic'?2.5:0;let move=this.input*speed*dt;
   if(a&&a.kind==='basic'){const from=Math.max(a.age,a.impact-.04),to=Math.min(a.age+dt,a.impact+.04);if(to>from)move+=Math.sign(this.input)*.65*(to-from)/.08;}
   let next=Math.max(1.6,Math.min(17,this.player.x+move));if(this.wall){if(this.player.x<7.6)next=Math.min(next,7.6-.47);else next=Math.max(next,7.85+.47);}this.player.x=next;
  }
  if(this.target.push){const p=this.target.push,u=Math.min(1,(this.time-p.start)/.1);this.target.x=p.from+p.direction*.25*u;if(this.wall&&p.from<7.6)this.target.x=Math.min(this.target.x,7.6-this.c.monster.bodySize[0]/2);if(u===1)this.target.push=null;}
  if(!a)return;a.age=this.time-a.start;
  if(!a.activated&&a.age>=a.impact){a.activated=true;if(a.kind==='special')this.cooldownUntil=a.start+a.impact+this.c.special.cooldown;this.emit('activate',{id:a.id,kind:a.kind,scheduledTime:a.start+a.impact});}
  const overlapsTime=a.age>=a.impact&&(before-a.start)<a.impact+a.active;
  if(overlapsTime&&!a.hit&&this.target.hp>0){const b=this.attackBox(),t=this.bounds();if(b.right>t.left&&b.left<t.right&&b.top>t.bottom&&!this.blocked(b,t)){
   a.hit=true;this.target.hp=Math.max(0,this.target.hp-a.damage);this.target.hitUntil=this.time+.3;
   const face=a.kind==='special'?a.face:this.player.face;if(a.kind==='basic')this.target.push={from:this.target.x,start:this.time,direction:face};
   const x=face>0?Math.max(b.left,t.left):Math.min(b.right,t.right);
   this.emit('hit',{id:a.id,kind:a.kind,damage:a.damage,x,y:Math.min(b.top,t.top)*.56,face,hp:this.target.hp});
   if(this.target.hp===0){this.target.deathAt=this.time;this.emit('death',{id:a.id});}
  }}
  if(a.age>=a.duration){this.emit('end',{id:a.id,kind:a.kind});this.action=null;}
 }
 snapshot(){return JSON.parse(JSON.stringify({time:this.time,player:this.player,target:this.target,action:this.action,cooldownRemaining:Math.max(0,this.cooldownUntil-this.time),events:this.events}));}
}
if(typeof module!=='undefined')module.exports=SwordStudy;else root.SwordStudy=SwordStudy;
})(typeof window!=='undefined'?window:globalThis);
