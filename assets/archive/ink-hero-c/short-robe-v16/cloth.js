// Pixel-rasterized garment layers. Body cel pixels and positions are never warped.
(function(root){
const C={edge:'#321c23',deep:'#4d2029',wine:'#722f37',mid:'#823840',light:'#984750',gold:'#b5a642',goldShade:'#807237',goldLight:'#c6b257'};
function inside(x,y,pts){let c=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){const a=pts[i],b=pts[j];if(((a[1]>y)!=(b[1]>y))&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])c=!c;}return c;}
function poly(ctx,pts,color){const minx=Math.floor(Math.min(...pts.map(p=>p[0]))),maxx=Math.ceil(Math.max(...pts.map(p=>p[0]))),miny=Math.floor(Math.min(...pts.map(p=>p[1]))),maxy=Math.ceil(Math.max(...pts.map(p=>p[1])));ctx.fillStyle=color;for(let y=miny;y<maxy;y++)for(let x=minx;x<maxx;x++)if(inside(x+.5,y+.5,pts))ctx.fillRect(x,y,1,1);}
function line(ctx,a,b,color){let x0=Math.round(a[0]),y0=Math.round(a[1]),x1=Math.round(b[0]),y1=Math.round(b[1]),dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1,err=dx+dy;ctx.fillStyle=color;for(let n=0;n<200;n++){ctx.fillRect(x0,y0,1,1);if(x0===x1&&y0===y1)break;let e2=2*err;if(e2>=dy){err+=dy;x0+=sx;}if(e2<=dx){err+=dx;y0+=sy;}}}
function panel(ctx,x,y,width,length,bend,back){
 // Authored fold bands stay attached to the same fabric columns while its tail bends.
 const rows=[];for(let j=0;j<length;j++){const u=j/(length-1),dx=bend*9*u*u,raise=Math.abs(bend)*4*u*u;rows.push([x+dx-u*2,y+j-raise,width+u*4]);}
 for(let j=0;j<rows.length;j++){const [xx,yy,w]=rows[j],next=rows[Math.min(j+1,rows.length-1)],h=Math.max(1,Math.ceil(next[1]-yy));for(let i=0;i<Math.round(w);i++){const u=i/w;let c=C.wine;if(back)c=C.deep;if(i===0||i===Math.round(w)-1||j===rows.length-1)c=C.edge;else if(u<.22)c=back?C.wine:C.mid;else if(u>.66&&u<.80)c=C.deep;else if(u>.26&&u<.39)c=back?C.mid:C.light;else if(j===rows.length-2)c=C.goldShade;ctx.fillStyle=c;ctx.fillRect(Math.round(xx+i),Math.round(yy),1,h);}}
}
function sleeve(ctx,s,w,lag,back){const dx=w[0]-s[0],dy=w[1]-s[1],l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l;let ux=nx,uy=ny;if(uy<0){ux=-ux;uy=-uy;}const cuff=[w[0]-dx/l*1.2,w[1]-dy/l*1.2],bell=5.6,drop=lag*1.8;
 const pts=[[s[0]-2,s[1]-2],[s[0]+2,s[1]-2],[cuff[0]-ux*2,cuff[1]-uy*2],[cuff[0]+ux*bell+drop,cuff[1]+uy*bell+1],[s[0]+dx*.35+ux*4+drop*.3,s[1]+dy*.35+uy*4+3],[s[0]-3,s[1]+2]];
 poly(ctx,pts,C.edge);const inner=pts.map(p=>[p[0]*.87+s[0]*.13,p[1]*.87+s[1]*.13]);poly(ctx,inner,back?C.deep:C.wine);
 poly(ctx,[[s[0]-1,s[1]],[cuff[0]-ux,cuff[1]-uy],[cuff[0]+ux*2+drop*.4,cuff[1]+uy*2],[s[0]+dx*.35+ux,s[1]+dy*.35+uy]],back?C.wine:C.mid);
 line(ctx,[s[0]+dx*.2+ux*2,s[1]+dy*.2+uy*2],[cuff[0]+ux*3+drop*.5,cuff[1]+uy*3],C.deep);
 line(ctx,[cuff[0]-ux*1.5,cuff[1]-uy*1.5],[cuff[0]+ux*4+drop,cuff[1]+uy*4],back?C.goldShade:C.gold);
}
function scarf(ctx,anchor,angle,time,amount){let points=[anchor],x=anchor[0],y=anchor[1];for(let i=0;i<5;i++){const a=angle+(i/4)*.22+Math.sin(time*5-i*.65)*.11*amount;x+=Math.cos(a)*2.3;y+=Math.sin(a)*2.3;points.push([x,y]);}
 for(let i=0;i<points.length-1;i++){const a=points[i],b=points[i+1],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),nx=-dy/len,ny=dx/len,w=i===4?1.2:1.8;poly(ctx,[[a[0]-nx*w,a[1]-ny*w],[b[0]-nx*w,b[1]-ny*w],[b[0]+nx*w,b[1]+ny*w],[a[0]+nx*w,a[1]+ny*w]],C.gold);line(ctx,[a[0]+nx*w,a[1]+ny*w],[b[0]+nx*w,b[1]+ny*w],C.goldShade);if(i<5)line(ctx,[a[0]-nx,a[1]-ny],[b[0]-nx,b[1]-ny],C.goldLight);}
 return points;
}
function torso(ctx,f){
 // One continuous sleeveless garment mapped to shoulder and pelvis, never knees.
 const s=f.shoulder,w=f.waist;
 const P=(u,v)=>{const t=Math.max(0,Math.min(1,v/8));return [s[0]*(1-t)+w[0]*t-2*t+u,s[1]+v];};
 const shape=(points,color)=>poly(ctx,points.map(([u,v])=>P(u,v)),color);
 shape([[-1,-1],[6,-1],[7,5],[6,8],[8,12],[5,12],[3,10],[0,13],[-4,11],[-2,7],[0,4]],C.edge);
 shape([[0,0],[5,0],[6,5],[5,8],[7,11],[5,11],[3,9],[0,12],[-3,10],[-1,7],[1,4]],C.wine);
 shape([[0,0],[3,0],[3,5],[0,9],[-2,10],[-1,6],[1,4]],C.mid);
 shape([[5,1],[6,5],[5,8],[7,11],[5,11],[3,9],[4,6]],C.deep);
 line(ctx,P(5,1),P(3,6),C.deep);line(ctx,P(3,6),P(-2,10),C.deep);
}

function hood(ctx,f){const [x,y]=f.head;const shape=(pts,c)=>poly(ctx,pts.map(p=>[p[0]+x,p[1]+y]),c);
 // Compact, backward-folded hood: narrow rim, recessed face, level eyes.
 shape([[-4,4],[-2,1],[0,-2],[3,-2],[7,0],[9,1],[9,8],[6,10],[1,9],[-2,7],[-4,6]],C.edge);
 shape([[-3,4],[-1,1],[1,-1],[3,-1],[7,1],[8,2],[8,8],[5,9],[1,8],[-2,6]],C.wine);
 shape([[-3,4],[0,0],[1,-1],[3,-1],[6,1],[3,2],[0,5],[-2,5]],C.mid);
 shape([[-2,6],[0,5],[2,3],[3,3],[1,6],[1,8],[-1,7]],C.deep);
 shape([[2,4],[5,2],[8,1],[9,2],[9,8],[6,10],[2,8]],C.goldShade);
 shape([[3,4],[6,2],[8,2],[9,3],[9,8],[6,9],[3,8]],'#141414');
 line(ctx,[x+2,y+4],[x+7,y+1],C.gold);
 ctx.fillStyle=C.gold;ctx.fillRect(x+4,y+5,1,2);ctx.fillRect(x+7,y+5,1,2);
}

function collar(ctx,f){const x=f.head[0],y=f.head[1]+9;poly(ctx,[[x-3,y-1],[x+2,y+1],[x+8,y],[x+7,y+3],[x+2,y+3],[x-3,y+1]],C.goldShade);poly(ctx,[[x-3,y-1],[x+2,y],[x+7,y],[x+6,y+2],[x+2,y+2],[x-2,y]],C.gold);}

class Spring{constructor(x,k,d){this.x=x;this.v=0;this.k=k;this.d=d;}step(target,dt){this.v+=((target-this.x)*this.k-this.v*this.d)*dt;this.x+=this.v*dt;}}
root.Cloth={hood,scarf,torso,collar,Spring,C};
})(window);
