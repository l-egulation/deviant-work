(function(root){
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),smooth=v=>{v=clamp(v);return v*v*(3-2*v)};
class Spring{constructor(x,k,d){this.x=x;this.v=0;this.k=k;this.d=d}step(t,dt){this.v+=((t-this.x)*this.k-this.v*this.d)*dt;this.x+=this.v*dt}}
function pose(f){return {head:[(f.head[0]-21)*2,(f.head[1]-11)*2],torso:[(f.shoulder[0]-21)*2,(f.shoulder[1]-21)*2],near:[(f.nearWrist[0]-18)*2,(f.nearWrist[1]-28)*2],far:[(f.farWrist[0]-30)*2,(f.farWrist[1]-28)*2]};}
function map(x,y,kind,p,bend,time,region){let dx,dy;
 if(kind==='scarf'){dx=p.head[0];dy=p.head[1];const w=smooth((61-x)/24);dx+=bend*4*w;dy+=bend*8*w+Math.sin(time*5+(61-x)*.15)*.65*w*Math.min(1,Math.abs(bend));return [x+dx,y+dy]}
 const headMix=1-smooth((y-82)/12);dx=p.head[0]*headMix+p.torso[0]*(1-headMix);dy=p.head[1]*headMix+p.torso[1]*(1-headMix);
 if(region==='near'||region==='far'){const w=smooth((y-89)/12),hand=p[region];dx=p.torso[0]*(1-w)+hand[0]*w;dy=p.torso[1]*(1-w)+hand[1]*w;}
 const hem=smooth((y-99)/16);dx+=bend*7*hem;dy-=Math.abs(bend)*2*hem;
 if(y<78){const tip=smooth((63-x)/14)*smooth((y-61)/7);dy+=bend*1.6*tip;}
 return [x+dx,y+dy];
}
// Rasterize a deforming image pixel as two triangles, snapping only at final output.
function tri(g,a,b,c,color){const minX=Math.floor(Math.min(a[0],b[0],c[0])),maxX=Math.ceil(Math.max(a[0],b[0],c[0])),minY=Math.floor(Math.min(a[1],b[1],c[1])),maxY=Math.ceil(Math.max(a[1],b[1],c[1]));const edge=(p,q,x,y)=>(x-p[0])*(q[1]-p[1])-(y-p[1])*(q[0]-p[0]);g.fillStyle=color;for(let y=minY;y<maxY;y++)for(let x=minX;x<maxX;x++){let e0=edge(a,b,x+.5,y+.5),e1=edge(b,c,x+.5,y+.5),e2=edge(c,a,x+.5,y+.5);if((e0>=0&&e1>=0&&e2>=0)||(e0<=0&&e1<=0&&e2<=0))g.fillRect(x,y,1,1)}}
function draw(g,pixels,kind,p,bend,time){for(const [x,y,r,gg,b,region] of pixels){const a=map(x,y,kind,p,bend,time,region),bb=map(x+1,y,kind,p,bend,time,region),c=map(x+1,y+1,kind,p,bend,time,region),d=map(x,y+1,kind,p,bend,time,region),color=`rgb(${r},${gg},${b})`;tri(g,a,bb,c,color);tri(g,a,c,d,color);}}
root.Cloth={Spring,pose,map,draw};
})(window);
