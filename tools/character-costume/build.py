"""Generate a local costume study from the owner's purchased ASE ZIP.
No purchased image data is embedded here. Output is ignored by Git.
"""
from pathlib import Path
from PIL import Image, ImageDraw
import argparse, collections, hashlib, heapq, json, math, struct, zipfile, zlib

CLIPS = {'idle':'Idle', 'run':'Run', 'jump':'Jump', 'sword':'Sword Attack', 'roll':'Roll'}

def role(name):
    n=name.strip().lower()
    if n in ('bg','background','gif bg'):return 'background'
    if n=='head':return 'head'
    if n=='torso':return 'torso'
    if 'leg' in n:return 'back_leg' if 'back' in n else 'front_leg'
    if 'arm' in n or 'hand' in n:return 'back_arm' if 'back' in n else 'front_arm'
    if 'sword' in n:return 'weapon'
    return None

def parse(data):
    count,w,h,depth=struct.unpack_from('<4H',data,6)
    if depth!=32:raise ValueError('Only RGBA ASE input is supported')
    names=[];flags=[];frames=[];p=128
    for fi in range(count):
        length,magic,nc,ms=struct.unpack_from('<I3H',data,p)
        if magic!=0xf1fa:raise ValueError('Invalid frame')
        if nc==65535:nc=struct.unpack_from('<I',data,p+12)[0]
        q=p+16;cels={}
        for _ in range(nc):
            sz,kind=struct.unpack_from('<IH',data,q);v=data[q+6:q+sz]
            if kind==0x2004:
                size=struct.unpack_from('<H',v,16)[0]
                names.append(v[18:18+size].decode());flags.append(struct.unpack_from('<H',v)[0])
            elif kind==0x2005:
                li,x,y,opacity,typ=struct.unpack_from('<HhhBH',v)
                if typ in (0,2):
                    cw,ch=struct.unpack_from('<HH',v,16)
                    pixels=zlib.decompress(v[20:]) if typ==2 else v[20:]
                    im=Image.frombytes('RGBA',(cw,ch),pixels)
                elif typ==1:
                    prior=struct.unpack_from('<H',v,16)[0];im=frames[prior]['cels'][li]['image'].copy()
                else:raise ValueError('Unsupported cel type')
                cels[li]={'image':im,'xy':(x,y),'opacity':opacity}
            q+=sz
        frames.append({'cels':cels,'ms':ms});p+=length
    return {'size':(w,h),'names':names,'flags':flags,'frames':frames}

def masks(asset,frame):
    parts={};orig=Image.new('RGBA',asset['size'])
    for li,cel in frame['cels'].items():
        if not asset['flags'][li]&1:continue
        name=asset['names'][li];r=role(name)
        if r=='background':continue
        if r is None:raise ValueError('Unsupported visible layer: '+name)
        im=Image.new('RGBA',asset['size']);im.alpha_composite(cel['image'],cel['xy'])
        if cel['opacity']!=255:im.putalpha(im.getchannel('A').point(lambda a:a*cel['opacity']//255))
        orig.alpha_composite(im)
        if r in parts:parts[r].alpha_composite(im)
        else:parts[r]=im
    return parts,orig

def points(im):
    return {(x,y) for y in range(im.height) for x in range(im.width) if im.getpixel((x,y))[3]}
def center(ps):return (sum(x for x,y in ps)/len(ps),sum(y for x,y in ps)/len(ps))
def unit(v):
    d=math.hypot(*v)
    return (v[0]/d,v[1]/d) if d else (0,1)
def tint(im,color):
    out=Image.new('RGBA',im.size,color);out.putalpha(im.getchannel('A'));return out

def distances(region, seeds):
    # Multi-source distances remove the arbitrary single-pixel origin at a joint.
    result={p:0.0 for p in seeds};queue=[(0.0,p) for p in sorted(seeds)];heapq.heapify(queue)
    while queue:
        value,(x,y)=heapq.heappop(queue)
        if value!=result[x,y]:continue
        for dx,dy in ((1,0),(-1,0),(0,1),(0,-1),(1,1),(-1,1),(1,-1),(-1,-1)):
            q=x+dx,y+dy;nd=value+math.hypot(dx,dy)
            if q in region and nd<result.get(q,1e9):result[q]=nd;heapq.heappush(queue,(nd,q))
    return result


def pants(im,hip,front,style):
    """Preserve the authored silhouette; locate boots within the source shin.
    Palette semantics are configured once for the purchased template. Unknown
    colors use a documented whole-leg fallback, never a new origin per island.
    """
    ps=points(im);palette=style['palette'];out=tint(im,palette['ink']);cloth=Image.new('RGBA',im.size)
    if not ps:return out,cloth,{'pixels':0}
    shin_colors={tuple(c) for c in style['pants']['source_shin_rgb']}
    shin={p for p in ps if im.getpixel(p)[:3] in shin_colors};thigh=ps-shin
    semantic=bool(shin and thigh)
    if not semantic:shin=set(ps);thigh=set()
    # Find all shin pixels at the knee seam. This stays at the knee when bent.
    knee={p for p in shin if any((p[0]+dx,p[1]+dy) in thigh for dx in (-1,0,1) for dy in (-1,0,1))}
    if not knee:
        nearest=min((x-hip[0])**2+(y-hip[1])**2 for x,y in shin)
        knee={p for p in shin if (p[0]-hip[0])**2+(p[1]-hip[1])**2<=nearest+.01}
    dist=distances(shin,knee)
    # Disconnected source pixels remain cloth, rather than inventing little boots.
    maximum=max(dist.values()) or 1
    boot_length=min(style['pants']['boot_pixels'],maximum*.38)
    boots={p for p,d in dist.items() if d>maximum-boot_length}
    covered=ps-boots
    fill=palette['pants' if front else 'pants_shadow'];fill_rgba=Image.new('RGBA',(1,1),fill).getpixel((0,0))
    for p in covered:cloth.putpixel(p,fill_rgba)
    # One restrained shadow edge, not a black ring that consumes thin shins.
    shadow=Image.new('RGBA',(1,1),palette['pants_shadow' if front else 'pants_edge']).getpixel((0,0))
    for x,y in covered:
        if (x-1,y) not in covered and (x+1,y) in covered and (x+2,y) in covered:
            cloth.putpixel((x,y),shadow)
    out.alpha_composite(cloth)
    assert points(out)==ps and covered.isdisjoint(boots)
    return out,cloth,{'source_pixels':len(ps),'covered_pixels':len(covered),'pants_pixels':len(covered),'boot_pixels':len(boots),'semantic_shin':semantic}

def attachments(parts,style,override,scarf_angle):
    pal=style['palette'];size=next(iter(parts.values())).size
    hc=center(points(parts['head']));tc=center(points(parts['torso']))
    down=unit(tuple(override.get('body_down',(tc[0]-hc[0],tc[1]-hc[1]))))
    right=(down[1],-down[0]);head_down=unit(tuple(override.get('head_down',down)));head_right=(head_down[1],-head_down[0]);tp=points(parts['torso'])
    projections=[(x-tc[0])*down[0]+(y-tc[1])*down[1] for x,y in tp]
    top=min(projections);bottom=max(projections)
    shoulder=(tc[0]+down[0]*top,tc[1]+down[1]*top)
    hip=(tc[0]+down[0]*bottom,tc[1]+down[1]*bottom)
    head_offset=override.get('head_offset',(0,0));hc=(hc[0]+head_offset[0],hc[1]+head_offset[1])
    result={k:Image.new('RGBA',size) for k in ('robe','hood','scarf_back','collar')}
    def poly(which,coords,color,anchor):
        r,d=(head_right,head_down) if which=='hood' else (right,down)
        if which=='robe':coords=[(u, v if v<=bottom-top else (bottom-top)+(v-(bottom-top))*override.get('hem_scale',1)) for u,v in coords]
        ImageDraw.Draw(result[which]).polygon([(round(anchor[0])+round(r[0]*u+d[0]*v),round(anchor[1])+round(r[1]*u+d[1]*v)) for u,v in coords],fill=color)
    length=max(6,bottom-top)
    # One shoulder-to-hip mesh definition, with a short asymmetric hem.
    poly('robe',[(-4,0),(3,0),(4,length-2),(5,length+3),(2,length+3),(0,length+1),(-2,length+4),(-5,length+2),(-3,length-2)],pal['edge'],shoulder)
    poly('robe',[(-3,1),(2,1),(3,length-2),(4,length+2),(2,length+2),(0,length),(-2,length+3),(-4,length+1),(-2,length-2)],pal['wine'],shoulder)
    poly('robe',[(-3,1),(0,1),(0,length-3),(-3,length+1),(-2,length-2)],pal['wine_light'],shoulder)
    poly('robe',[(2,2),(3,length-2),(0,length),(-2,length+2),(0,length-2)],pal['wine_shadow'],shoulder)
    # The compact v16 hood proportions, transformed in the same local body frame.
    poly('hood',[(-7,0),(-5,-3),(-3,-6),(0,-6),(4,-4),(6,-3),(6,4),(3,6),(-2,5),(-5,3),(-7,2)],pal['edge'],hc)
    poly('hood',[(-6,0),(-4,-3),(-2,-5),(0,-5),(4,-3),(5,-2),(5,4),(2,5),(-2,4),(-5,2)],pal['wine'],hc)
    poly('hood',[(-6,0),(-3,-4),(-2,-5),(0,-5),(3,-3),(0,-2),(-3,1),(-5,1)],pal['wine_light'],hc)
    poly('hood',[(-1,0),(2,-2),(5,-3),(6,-2),(6,4),(3,6),(-1,4)],pal['brass_shadow'],hc)
    poly('hood',[(0,0),(3,-2),(5,-2),(6,-1),(6,4),(3,5),(0,4)],pal['ink'],hc)
    for x in ((4,) if override.get('face')=='tucked' else (1,4)):
        poly('hood',[(x,1),(x,2)],pal['brass'],hc)
    neck=(shoulder[0]-down[0],shoulder[1]-down[1])
    poly('collar',[(-5,-1),(0,0),(5,0),(4,2),(0,2),(-4,1)],pal['brass_shadow'],neck)
    poly('collar',[(-4,-1),(0,0),(4,0),(3,1),(0,1)],pal['brass'],neck)
    # Free scarf is secondary motion only. Its attachment uses the same pose.
    a=override.get('scarf_angle',scarf_angle);anchor=(neck[0]-right[0]*4,neck[1]-right[1]*4)
    length=style['scarf']['length']*override.get('scarf_length_scale',1);end=(anchor[0]+math.cos(a)*length,anchor[1]+math.sin(a)*length)
    draw=ImageDraw.Draw(result['scarf_back']);draw.line([anchor,end],fill=pal['brass_shadow'],width=style['scarf']['width']+1);draw.line([anchor,end],fill=pal['brass'],width=style['scarf']['width'])
    return result,hip,{'head':hc,'shoulder':shoulder,'hip':hip,'body_down':down,'head_down':head_down}

def render(parts,style,override,angle):
    clothing,hip,anchors=attachments(parts,style,override,angle)
    dressed={};stats={};layers={}
    for k,im in parts.items():
        if k.endswith('_leg'):
            dressed[k],layers[k+'_pants'],stats[k]=pants(im,hip,k=='front_leg',style)
        elif k=='weapon':dressed[k]=im
        else:dressed[k]=tint(im,style['palette'].get('near_arm' if k=='front_arm' else 'far_arm','' ) or style['palette']['ink'])
    out=Image.new('RGBA',next(iter(parts.values())).size)
    # Fixed depth contract: back limbs, legs, torso/robe, front arm, hood, collar, weapon.
    order=['scarf_back','back_arm','back_leg','front_leg','torso','robe','hood','collar','front_arm','weapon']
    if override.get('front_leg_over_robe'):
        order.remove('front_leg');order.insert(order.index('front_arm'),'front_leg')
    for k in order:
        im=clothing.get(k,dressed.get(k))
        if im is not None:out.alpha_composite(im)
    return out,dict(clothing,**layers),anchors,stats

def panel(im,label):
    out=Image.new('RGBA',(80,80),'#eee7d6');out.alpha_composite(im,((80-im.width)//2,68-im.height));out=out.convert('RGB').resize((320,320),Image.Resampling.NEAREST)
    ImageDraw.Draw(out).text((10,8),label,fill='#403a35');return out

def save_gif(path,frames,times):
    total=previous=0;ds=[]
    for ms in times:
        total+=ms;q=round(total/10)*10;ds.append(q-previous);previous=q
    frames[0].save(path,save_all=True,append_images=frames[1:],duration=ds,loop=0,disposal=2)

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--source-zip',type=Path,required=True);ap.add_argument('--out',type=Path,default=Path(__file__).parent/'_generated'/'integrated');ap.add_argument('--style',type=Path,default=Path(__file__).with_name('integrated-style.json'));ap.add_argument('--overrides',type=Path,default=Path(__file__).with_name('overrides.json'));args=ap.parse_args()
    style=json.loads(args.style.read_text());pose_settings=json.loads(args.overrides.read_text());overrides=pose_settings['frames'];profiles=pose_settings.get('clips',{});args.out.mkdir(parents=True,exist_ok=True)
    report={'source_sha256':hashlib.sha256(args.source_zip.read_bytes()).hexdigest(),'clips':{},'limitations':['This is inferred 2D geometry, not a recovered skeleton.','Roll head direction and folded-leg occlusion use explicit pose annotations.','Unknown source palettes fall back to whole-leg distance; review before using new assets.'],'validation':[]};gallery=[]
    with zipfile.ZipFile(args.source_zip) as z:
        for clip,folder in CLIPS.items():
            choices=[n for n in z.namelist() if '/'+folder+'/' in n and n.endswith('.aseprite') and not n.startswith('__MACOSX/')]
            candidates=[]
            for n in choices:
                asset=parse(z.read(n));rs={role(n) for n in asset['names']}
                if {'head','torso','front_leg','back_leg'}<=rs:candidates.append((n,asset))
            if len(candidates)!=1:raise ValueError(f'{clip}: expected one layered source, found {len(candidates)}; refusing silent fallback')
            name,asset=candidates[0];dest=args.out/clip;dest.mkdir(exist_ok=True);previews=[];frames=[];metadata=[];times=[];contacts=[]
            for i,f in enumerate(asset['frames']):
                parts,original=masks(asset,f)
                if not {'head','torso','front_leg','back_leg'}<=parts.keys():raise ValueError(f'Missing parts {clip}/{i}')
                angle=2.8 if clip=='run' else 2.1
                pose=dict(profiles.get(clip,{}),**overrides.get(f'{clip}/{i}',{}))
                if style.get('integrated',{}).get('enabled'):
                    from integrated import render_integrated
                    phase=sum(times)/sum(fr['ms'] for fr in asset['frames'])
                    pose=dict(pose,scarf_wave=math.sin(phase*math.tau)*(1.1 if clip=='run' else .25))
                    out,layers,anchors,stats=render_integrated(parts,style,pose,angle)
                else:
                    out,layers,anchors,stats=render(parts,style,pose,angle)
                out.save(dest/f'frame-{i:02}.png')
                for k,im in layers.items():im.save(dest/f'{k}-{i:02}.png')
                if style.get('integrated',{}).get('enabled'):
                    check=layers['body'].copy();check.alpha_composite(layers['scarf'])
                    assert check.tobytes()==out.tobytes(), 'Two-layer export differs from composite'
                combo=Image.new('RGB',(640,320));combo.paste(panel(original,clip.upper()+' SOURCE'),(0,0));combo.paste(panel(out,clip.upper()+' COSTUME'),(320,0));previews.append(combo);frames.append(out);times.append(f['ms']);contacts.append(panel(out,str(i)))
                metadata.append({'frame':i,'duration_ms':f['ms'],'anchors':anchors,'pants':stats,'pose_settings':pose})
            save_gif(args.out/f'{clip}.gif',previews,times)
            contact=Image.new('RGB',(320*min(5,len(contacts)),320*math.ceil(len(contacts)/5)),'#eee7d6')
            for i,im in enumerate(contacts):contact.paste(im,((i%5)*320,(i//5)*320))
            contact.save(args.out/f'{clip}-frames.png');gallery.append(panel(frames[0],clip.upper()))
            # Frame alignment, no blank garment output, and non-empty leg coverage.
            assert len(frames)==len(asset['frames'])
            assert all(im.getbbox() for im in frames)
            assert all(m['pants'][k]['covered_pixels']>0 for m in metadata for k in ('front_leg','back_leg'))
            report['clips'][clip]={'source':name,'source_canvas':asset['size'],'frame_count':len(frames),'durations_ms':times,'frames':metadata}
        report['layer_contract']='body + scarf only' if style.get('integrated',{}).get('enabled') else 'separate garment study'
        report['validation']=['five layered source clips resolved without flattened fallback','original frame counts and timings retained','both pants legs generated for every frame','style shared across all clips; per-frame overrides explicit']
    sheet=Image.new('RGB',(320*5,320));[sheet.paste(im,(i*320,0)) for i,im in enumerate(gallery)];sheet.save(args.out/'overview.png');(args.out/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    (args.out/'index.html').write_text('<!doctype html><meta charset="utf-8"><title>공통 의상 규칙 검증</title><style>body{background:#eee7d6;font:16px system-ui;padding:24px}img{max-width:100%;image-rendering:pixelated}section{display:inline-block;vertical-align:top;margin:12px}</style><h1>동일 규칙 · 5개 동작</h1><p>왼쪽: 구매 원본 / 오른쪽: 공통 의상 규칙 적용. 자세별 작화 완성본이 아닌 검증 시안입니다.</p>'+''.join(f'<section><h2>{clip}</h2><img src="{clip}.gif"><p><a href="{clip}-frames.png">전체 프레임 확인</a></p></section>' for clip in CLIPS))
    print('Generated 5 clips:',{k:v['frame_count'] for k,v in report['clips'].items()});print('Open:',args.out/'index.html')

if __name__=='__main__':main()
