// Native pixel VFX. Integer vertices, tapered brush edges and separated droplets.
// Deterministic shapes allow the same effect to be exported as transparent frames.
(function(root){
const INK='#171716',MID='#41413d',PAPER='#e9dfca';
function hash(n){const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);}
function poly(ctx,pts,color){ctx.fillStyle=color;ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(Math.round(x),Math.round(y)):ctx.moveTo(Math.round(x),Math.round(y)));ctx.closePath();ctx.fill();}
function slash(ctx,x,y,face,t,strong){if(t<0||t>.26)return;ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(face,1);const r=strong?91:76,ry=strong?57:46;
 const tip=.72+Math.min(1,t/.075)*.33,tail=Math.max(-1.65,tip-(strong?2.25:2.0)*(1-Math.max(0,t-.08)/.25));
 const pts=[],inner=[];for(let i=0;i<=32;i++){const u=i/32,a=tail+(tip-tail)*u;const taper=Math.sin(u*Math.PI)**.55;const w=(strong?15:9)*taper*Math.max(.12,1-t/.29);const grain=(hash(i+7)-.5)*3;pts.push([Math.cos(a)*(r+grain),Math.sin(a)*(ry+grain)]);inner.unshift([Math.cos(a)*(r-w),Math.sin(a)*(ry-w)]);}poly(ctx,pts.concat(inner),INK);
 // Fine separate bristles parallel the thick stroke; no luminous crescent.
 for(let b=0;b<3;b++){const a0=tail+.12+b*.13,a1=tip-.08;const line=[];for(let i=0;i<12;i++){const a=a0+(a1-a0)*i/11;line.push([Math.cos(a)*(r-4-b*3),Math.sin(a)*(ry-3-b*2)]);}ctx.strokeStyle=b===1?MID:INK;ctx.lineWidth=1;ctx.beginPath();line.forEach(([xx,yy],i)=>i?ctx.lineTo(Math.round(xx),Math.round(yy)):ctx.moveTo(Math.round(xx),Math.round(yy)));ctx.stroke();}
 if(t>.055&&t<.19){for(let i=0;i<(strong?7:4);i++){const a=tip-.3+hash(i+12)*.65,rr=r+6+(t-.055)*90*hash(i+2);const xx=Math.cos(a)*rr,yy=Math.sin(a)*(ry+4+(t-.055)*55);poly(ctx,[[xx-2,yy-1],[xx+3,yy+1],[xx+1,yy+2]],INK);}}
 ctx.restore();}
function impact(ctx,x,y,face,t,strong){if(t<0||t>.48)return;ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(face,1);
 const bloom=Math.min(1,t/.05),fade=Math.max(0,1-(t-.14)/.34),radius=(strong?11:7)*bloom;
 if(t<.24){const pts=[];for(let i=0;i<20;i++){const a=i/20*Math.PI*2,r=radius*(.6+hash(i+3)*.7)*fade;pts.push([Math.cos(a)*r,Math.sin(a)*r]);}poly(ctx,pts,INK);poly(ctx,[[-5,-2],[7,-1],[4,1],[-3,1]],PAPER);}
 for(let i=0;i<(strong?12:7);i++){const speed=35+hash(i+1)*(strong?100:70),a=-1.35+hash(i+9)*2.3,xx=Math.cos(a)*speed*t,yy=Math.sin(a)*speed*t+70*t*t;const len=Math.max(1,(strong?6:4)*(1-t/.55));poly(ctx,[[xx-len,yy-1],[xx+len*.5,yy],[xx,yy+2],[xx-len*.6,yy+1]],i%4===0?MID:INK);}
 ctx.restore();}
function stain(ctx,x,y,t,strong){if(t<0||t>3.4)return;const extent=Math.min(1,t/.16),fade=t<2.3?1:1-(t-2.3)/1.1;ctx.save();ctx.globalAlpha=.32*fade;const pts=[];for(let i=0;i<18;i++){const a=i/18*Math.PI*2,r=(strong?15:10)*extent*(.65+hash(i+41)*.45);pts.push([x+Math.cos(a)*r,y+Math.sin(a)*r*.2]);}poly(ctx,pts,INK);ctx.restore();}
root.InkFX={slash,impact,stain};
})(typeof window!=='undefined'?window:globalThis);
