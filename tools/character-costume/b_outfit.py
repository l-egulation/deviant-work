"""B costume study: source cel silhouettes drive clothing, scarf tail alone is free.
No purchased cel data is stored in this module. Restricted to idle/run for review.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageChops
import math, json, zipfile, argparse, hashlib
from build import parse, masks, points, center, unit, distances, role
from export_previews import save, at

P={'edge':'#321c23','wine':'#722f37','light':'#91434c','shadow':'#4d2029',
   'ink':'#141414','brass':'#b5a642','goldlight':'#d4bd67','goldshadow':'#807237'}
BG='#eee7d6'
SCALE=2


def limb(im, root, front, sleeve=False):
    """Grow fabric on the actual posed limb, retaining terminal hands/feet.
    Geodesic distance follows bends, unlike a world-Y garment mask.
    """
    region=points(im)
    minimum=min(math.dist(p,root) for p in region)
    seeds={p for p in region if math.dist(p,root)<=minimum+.5}
    ds=distances(region,seeds)
    # Disconnected small source pixels use the closest connected boundary.
    for p in region-ds.keys():
        q=min(ds,key=lambda q:math.dist(p,q));ds[p]=ds[q]+math.dist(p,q)
    maximum=max(ds.values());terminal=5 if sleeve else 5.5
    cut=max(1,maximum-terminal)
    cloth={p for p in region if ds[p]<=cut}
    bare=region-cloth;grown=set(cloth)
    for x,y in cloth:
        u=ds[x,y]/cut
        # Bell sleeve widens toward wrist; trousers balloon and taper at cuff.
        radius=round((1+3.5*u) if sleeve else (1+3.5*math.sin(math.pi*u)**.7))
        for dx in range(-radius,radius+1):
            for dy in range(-radius,radius+1):
                if dx*dx+dy*dy>radius*radius:continue
                q=x+dx,y+dy
                if q not in bare and 0<=q[0]<im.width and 0<=q[1]<im.height:grown.add(q)
    out=Image.new('RGBA',im.size);d=ImageDraw.Draw(out)
    for p in region:d.point(p,fill=P['ink'])
    for x,y in sorted(grown):
        boundary=any((x+dx,y+dy) not in grown for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)])
        color=P['edge'] if boundary else P['wine'] if front else P['shadow']
        if not boundary and front and (x-2,y) not in grown:color=P['light']
        d.point((x,y),fill=color)
    return out,{'source_pixels':len(region),'cloth_pixels':len(grown),'terminal_pixels':len(bare),'missing_source_pixels':len(region-points(out))}


def tunic(parts, shoulder, hip, down):
    """Shape chest, waist and hem from the pose, instead of rotating one panel.

    Body cross-sections anchor the shirt. Proximal leg direction lifts the hem;
    near-arm reach changes the chest fold. No independent cloth oscillation.
    """
    right=down[1],-down[0];length=math.dist(shoulder,hip)
    def local(p):
        x,y=p[0]-shoulder[0],p[1]-shoulder[1]
        return x*right[0]+y*right[1],x*down[0]+y*down[1]
    torso=[local(p) for p in points(parts['torso'])]
    def section(v):
        band=[u for u,w in torso if abs(w-v)<2.5]
        return (min(band)+max(band))/2 if band else 0
    chest=section(length*.28);waist=section(length*.72)
    leg=points(parts['front_leg'])
    proximal=[p for p in leg if math.dist(p,hip)<12]
    lead=local(center(proximal or leg))[0]
    lift=max(-2.5,min(3.5,lead*.55))
    arm=local(center(points(parts['front_arm'])))[0]
    pull=max(-1.8,min(1.8,arm*.15))
    # Curved volume has separate chest, waist and hip stations. The lower
    # front corner clears a raised leg instead of staying a rigid rectangle.
    left=[(-5,-1),(chest-7,length*.23),(waist-7.5,length*.62),(-9,length+2),(-8,length+4+min(0,lift))]
    rightside=[(5,-1),(chest+7+pull,length*.23),(waist+7,length*.62),(9,length+1-lift),(7,length+4-lift)]
    outline=left+[(-2,length+5),(3,length+5-lift*.5)]+list(reversed(rightside))
    im=Image.new('RGBA',parts['torso'].size);d=ImageDraw.Draw(im)
    def xy(p):
        u,v=p;return round(shoulder[0]+right[0]*u+down[0]*v),round(shoulder[1]+right[1]*u+down[1]*v)
    def poly(ps,col):d.polygon([xy(p) for p in ps],fill=P[col])
    poly(outline,'wine');d.line([xy(p) for p in outline+[outline[0]]],fill=P['edge'],width=1)
    # Small sloping planes, no full-height stripe or rectangular chest panel.
    poly([(-5,1),(chest-5,length*.25),(waist-4,length*.48),(waist-6,length*.6),(chest-6,length*.25)],'light')
    poly([(waist-7,length*.68),(-8,length+2),(-3,length+3),(waist-4,length*.85)],'shadow')
    poly([(waist+5,length*.66),(8,length+1-lift),(6,length+3-lift),(2,length+2-lift)],'shadow')
    # Short tension crease follows the near elbow; it doesn't span the torso.
    d.line([xy((chest+4+pull,length*.32)),xy((waist+1,length*.57)),xy((waist-1,length*.61))],fill=P['shadow'],width=1)
    return im


def render(parts,clip,angle=1.9,wave=0):
    size=next(iter(parts.values())).size
    hc=center(points(parts['head']));tc=center(points(parts['torso']))
    down=unit((tc[0]-hc[0],tc[1]-hc[1]));right=down[1],-down[0]
    tp=points(parts['torso']);projection=[(x-tc[0])*down[0]+(y-tc[1])*down[1] for x,y in tp]
    shoulder=tc[0]+down[0]*min(projection),tc[1]+down[1]*min(projection)
    hip=tc[0]+down[0]*max(projection),tc[1]+down[1]*max(projection)
    length=math.dist(shoulder,hip)
    layers={};stats={}
    for name in ['back_leg','front_leg','back_arm','front_arm']:
        if name not in parts:continue
        layers[name],stats[name]=limb(parts[name],shoulder if 'arm' in name else hip,name.startswith('front'),'arm' in name)
    def polygon(im,anchor,coords,color,direction=down):
        dr=direction;rt=dr[1],-dr[0]
        ImageDraw.Draw(im).polygon([(round(anchor[0])+round(rt[0]*u+dr[0]*v),round(anchor[1])+round(rt[1]*u+dr[1]*v)) for u,v in coords],fill=color)
    shirt=tunic(parts,shoulder,hip,down)
    hood=Image.new('RGBA',size)
    # Fixed upright eye clusters, mild forward pitch from the running pose.
    hd=(0,1) if clip=='idle' else unit((-.13,1))
    def hp(coords,col):polygon(hood,hc,coords,P[col],hd)
    # Ink head stays visible below a separate low, asymmetric painter's beret.
    hp([(-8,-3),(-4,-7),(4,-7),(9,-3),(11,1),(10,7),(6,10),(-1,10),(-6,7),(-8,3)],'ink')
    hp([(-7,4),(-4,7),(0,8),(-1,9),(-5,7)],'shadow')
    # Narrow headband is under the crown, not a hood framing the cheeks.
    hp([(-8,-3),(-1,-6),(7,-6),(10,-3),(9,-1),(3,-3),(-4,0),(-8,1)],'edge')
    hp([(-6,-3),(0,-5),(6,-5),(8,-3),(3,-4),(-4,-1)],'wine')
    hp([(-16,-2),(-15,-6),(-11,-10),(-5,-13),(2,-14),(8,-12),(11,-9),(11,-6),(8,-4),(1,-4),(-6,0),(-12,2),(-15,1)],'edge')
    hp([(-14,-2),(-13,-6),(-9,-9),(-4,-11),(2,-12),(7,-10),(9,-8),(9,-6),(6,-5),(0,-5),(-7,-1),(-12,0)],'wine')
    hp([(-12,-5),(-8,-8),(-3,-10),(2,-11),(6,-9),(0,-9),(-5,-7),(-10,-3)],'light')
    hp([(-14,-1),(-9,-1),(-4,-4),(1,-5),(5,-5),(0,-3),(-6,0),(-12,1)],'shadow')
    # Small fabric stem, one tip only; simplified at the working resolution.
    hp([(-7,-12),(-7,-15),(-5,-16),(-3,-14),(-4,-12)],'edge')
    hp([(-6,-13),(-6,-14),(-5,-14),(-4,-13)],'wine')
    # Tapered brass ink dabs, not vertical rectangles. Asymmetric edges imply
    # a soft gaze without adding white sclera or an angry eyebrow.
    hp([(1,0),(2,2),(2,5),(0,4),(-1,3),(0,1)],'brass')
    hp([(7,0),(8,1),(8,3),(6,5),(6,2)],'brass')
    body=Image.new('RGBA',size)
    for name in ['back_arm','back_leg']:body.alpha_composite(layers[name])
    body.alpha_composite(layers['front_leg']);body.alpha_composite(shirt)
    body.alpha_composite(layers['front_arm']);body.alpha_composite(hood)
    # Lower the entire scarf attachment three working pixels along the torso;
    # collar, clasp and tail must share this anchor to avoid a floating join.
    neck=shoulder[0]+down[0]*2,shoulder[1]+down[1]*2
    # Collar, clasp and front tab are fixed to the torso and baked into body.
    polygon(body,neck,[(-8,-1),(-2,0),(7,0),(7,4),(0,5),(-7,2)],P['goldshadow'])
    polygon(body,neck,[(-7,-1),(-2,1),(6,1),(5,3),(0,3),(-6,1)],P['brass'])
    polygon(body,neck,[(4,3),(7,3),(7,10),(5,9),(4,10)],P['brass'])
    polygon(body,neck,[(3,1),(7,1),(7,5),(3,5)],P['goldlight'])
    polygon(body,neck,[(4,2),(6,2),(6,4),(4,4)],P['goldshadow'])
    tail=Image.new('RGBA',size);anchor=neck[0]-right[0]*7,neck[1]-right[1]*7
    curve=[]
    for i in range(9):
        t=i/8;side=math.sin(t*math.pi)*wave
        curve.append((round(anchor[0]+math.cos(angle)*22*t-math.sin(angle)*side),round(anchor[1]+math.sin(angle)*22*t+math.cos(angle)*side)))
    draw=ImageDraw.Draw(tail);draw.line(curve,fill=P['goldshadow'],width=6);draw.line([(x,y-1) for x,y in curve],fill=P['brass'],width=4)
    # Tail drawn behind the complete outfit, never moves any body pixels.
    tail.putalpha(ImageChops.subtract(tail.getchannel('A'),body.getchannel('A')))
    out=body.copy();out.alpha_composite(tail)
    return out,body,tail,stats


def load_assets(path):
    assets={}
    with zipfile.ZipFile(path) as z:
        for clip,folder in [('idle','Idle'),('run','Run')]:
            candidates=[]
            for name in z.namelist():
                if name.startswith('__MACOSX') or '/'+folder+'/' not in name or not name.endswith('.aseprite'):continue
                a=parse(z.read(name))
                if {'head','torso','front_leg','back_leg','front_arm','back_arm'}<={role(n) for n in a['names']}:candidates.append(a)
            if len(candidates)!=1:raise ValueError('Expected exactly one layered source for '+clip)
            a=candidates[0];a['parts']=[{k:im.resize((im.width*SCALE,im.height*SCALE),Image.Resampling.NEAREST) for k,im in masks(a,f)[0].items()} for f in a['frames']];assets[clip]=a
    return assets


def panel(im,title):
    canvas=Image.new('RGBA',(128,112),BG);canvas.alpha_composite(im,(16,8))
    out=canvas.convert('RGB').resize((512,448),Image.Resampling.NEAREST)
    ImageDraw.Draw(out).text((16,16),title,fill='#403a35');return out


def main():
    ap=argparse.ArgumentParser();ap.add_argument('--source-zip',type=Path,required=True);ap.add_argument('--out',type=Path,required=True);args=ap.parse_args();args.out.mkdir(parents=True,exist_ok=True)
    assets=load_assets(args.source_zip);report={'scope':'B idle/run study; source poses retained at 2x resolution','clips':{},'checks':[]};contacts=[]
    for clip,a in assets.items():
        seq=[];bod=[];stats=[];times=[f['ms'] for f in a['frames']]
        # GIF milliseconds rounded cumulatively, preserving loop duration.
        acc=prev=0;gif_times=[]
        for ms in times:acc+=ms;now=round(acc/10)*10;gif_times.append(now-prev);prev=now
        for i,parts in enumerate(a['parts']):
            out,body,tail,st=render(parts,clip,2.95 if clip=='run' else 1.9,math.sin(i/len(times)*math.tau)*1.4)
            seq.append(panel(out,clip.upper()+' / B OUTFIT'));bod.append(panel(body,clip.upper()+' / NO SCARF TAIL'));stats.append(st)
            contacts.append(panel(body,clip.upper()+' FRAME '+str(i)))
            assert all(s['missing_source_pixels']==0 and s['terminal_pixels']>0 for s in st.values())
            check=body.copy();check.alpha_composite(tail);assert check.tobytes()==out.tobytes()
        save(args.out/(clip+'.gif'),seq,gif_times);save(args.out/(clip+'-body-only.gif'),bod,gif_times)
        report['clips'][clip]={'frames':len(times),'source_ms':times,'gif_ms':gif_times,'limbs':stats}
        if clip=='idle':seq[0].save(args.out/'idle-design.png')
    sheet=Image.new('RGB',(512*5,448*4),BG)
    for i,im in enumerate(contacts):sheet.paste(im,((i%5)*512,(i//5)*448))
    sheet.save(args.out/'body-frame-review.png')
    frames=[];angle=1.9;velocity=0;cache={}
    for step in range(120):
        t=step*.05;running=1.2<=t<3.4;clip='run' if running else 'idle';a=assets[clip]
        target=2.95 if running else 1.9
        for _ in range(6):velocity+=((target-angle)*14-velocity*7)/120;angle+=velocity/120
        elapsed=t-(1.2 if running else 3.4 if t>=3.4 else 0);clock=elapsed*1000%sum(f['ms'] for f in a['frames']);fi=0
        while clock>=a['frames'][fi]['ms']:clock-=a['frames'][fi]['ms'];fi+=1
        out,body,_,_=render(a['parts'][fi],clip,angle,math.sin(t*8)*(1.5 if running else .2))
        key=clip,fi;digest=hashlib.sha256(body.tobytes()).hexdigest()
        if key in cache:assert digest==cache[key]
        cache[key]=digest
        canvas=Image.new('RGB',(1024,448),BG);canvas.paste(panel(body,'BODY / BERET + SLEEVES + TROUSERS'),(0,0));canvas.paste(panel(out,'IDLE' if t<1.2 else 'RUN' if running else 'STOP / TAIL SETTLE'),(512,0));frames.append(canvas)
    save(args.out/'movement-comparison.gif',frames,[50]*120)
    report['checks']=['Original 10 idle and 8 run frames retained','Source limb pixels covered; terminal hands/feet retained in all frames','Body identical for repeated source pose regardless of scarf dynamics','Body + tail exactly reproduces composite','6-second movement preview; no authored braking pose']
    (args.out/'validation.json').write_text(json.dumps(report,indent=2)+'\n');print(report['checks'])

if __name__=='__main__':main()
