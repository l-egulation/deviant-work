"""Bake hood, shirt, roomy trousers and ink limbs into ONE pose image.
Only the scarf is exported separately; no runtime pants/robe attachment exists.
"""
from PIL import Image, ImageDraw, ImageChops
import math


def roomy_leg(im, hip, front, style):
    from build import distances, points, tint
    source=points(im)
    # Template colors are NOT consistent anatomical labels (Jump uses shading).
    # Root the largest connected silhouette at the hip, and reserve a fixed
    # distal length for the boot. Never place boots at color boundaries.
    remaining=set(source);components=[]
    while remaining:
        start=min(remaining);remaining.remove(start);group={start};todo=[start]
        while todo:
            x,y=todo.pop()
            for dx in (-1,0,1):
                for dy in (-1,0,1):
                    q=x+dx,y+dy
                    if q in remaining:remaining.remove(q);group.add(q);todo.append(q)
        components.append(group)
    main=max(components,key=lambda c:(len(c),-min(c)[0]))
    minimum=min((x-hip[0])**2+(y-hip[1])**2 for x,y in main)
    seeds={p for p in main if (p[0]-hip[0])**2+(p[1]-hip[1])**2<=minimum+.01}
    distance=distances(main,seeds);maximum=max(distance.values())
    boot_length=min(style['pants']['boot_pixels'],maximum*.25)
    boots={p for p,d in distance.items() if d>maximum-boot_length}
    covered=source-boots
    upper={p for p in covered if distance.get(p,0)<maximum*.55}
    stats={'source_pixels':len(source),'covered_pixels':len(covered),'pants_pixels':len(covered),'boot_pixels':len(boots),'cuff_method':'hip-rooted silhouette, fixed distal boot length'}
    enlarged=set(covered)
    # Add cloth volume directly to the authored limb silhouette, rather than
    # moving a separate pair of trousers over it. Taper before the boot.
    radius=style['integrated']['trouser_volume_pixels']
    for x,y in covered:
        near_boot=min(((x-a)**2+(y-b)**2 for a,b in boots),default=100)
        if (x,y) in upper or near_boot>5:
            for dx in range(-radius,radius+1):
                for dy in range(-radius,radius+1):
                    if abs(dx)+abs(dy)>radius:continue
                    q=x+dx,y+dy
                    if q not in boots and 0<=q[0]<im.width and 0<=q[1]<im.height:enlarged.add(q)
    # Fill only one-pixel pinholes caused by folded source limbs.
    holes={q for x,y in enlarged for q in [(x+1,y),(x-1,y),(x,y+1),(x,y-1)] if q not in enlarged and q not in boots}
    enlarged|={q for q in holes if all((q[0]+dx,q[1]+dy) in enlarged for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)])}
    pal=style['palette'];result=tint(im,pal['ink']);d=ImageDraw.Draw(result)
    fill=pal['wine'] if front else pal['wine_shadow']
    for x,y in sorted(enlarged):d.point((x,y),fill=fill)
    # A small side fold makes this read as roomy fabric, not a colored leg.
    for x,y in sorted(enlarged):
        if (x-1,y) not in enlarged and (x+1,y) in enlarged:
            d.point((x,y),fill=pal['wine_shadow'] if front else pal['edge'])
        elif front and (x-2,y) not in enlarged and (x+2,y) in enlarged:
            d.point((x,y),fill=pal['wine_light'])
    stats=dict(stats,integrated_pixels=len(enlarged),volume_pixels=radius)
    return result,stats


def render_integrated(parts,style,pose,scarf_angle):
    from build import attachments,points,tint
    clothing,hip,anchors=attachments(parts,style,pose,scarf_angle)
    size=next(iter(parts.values())).size;pal=style['palette'];legs={};stats={}
    for role in ('back_leg','front_leg'):
        legs[role],stats[role]=roomy_leg(parts[role],hip,role=='front_leg',style)
    torso=tint(parts['torso'],pal['wine'])
    # A closed shirt hem reaches the waist. No robe panels or split tails.
    down=anchors['body_down'];right=(down[1],-down[0]);shoulder=anchors['shoulder']
    length=math.dist(shoulder,hip)
    shirt=Image.new('RGBA',size);d=ImageDraw.Draw(shirt)
    def local(coords,color):
        d.polygon([(round(shoulder[0])+round(right[0]*u+down[0]*v),round(shoulder[1])+round(right[1]*u+down[1]*v)) for u,v in coords],fill=color)
    local([(-3,0),(3,0),(3,length+1),(-3,length+1)],pal['wine'])
    local([(-3,0),(-1,0),(-1,length-1),(-3,length+1)],pal['wine_light'])
    # Short diagonal overlap on the chest, ending above the continuous waistband.
    d.line([(round(shoulder[0]+right[0]*2),round(shoulder[1]+right[1]*2)),(round(hip[0]-down[0]*2-right[0]*2),round(hip[1]-down[1]*2-right[1]*2))],fill=pal['wine_shadow'],width=1)
    back_arm=tint(parts['back_arm'],pal['far_arm']) if 'back_arm' in parts else Image.new('RGBA',size)
    front_arm=tint(parts['front_arm'],pal['near_arm']) if 'front_arm' in parts else Image.new('RGBA',size)
    body=Image.new('RGBA',size)
    order=[back_arm,legs['back_leg'],torso,legs['front_leg'],shirt,clothing['hood']]
    # A tucked knee must remain visible over the waistband during a somersault.
    if pose.get('front_leg_over_robe'):order.append(legs['front_leg'])
    order.append(front_arm)
    if 'weapon' in parts:order.append(parts['weapon'])
    for im in order:body.alpha_composite(im)
    # A single scarf layer with the invisible back-tail pixels clipped away;
    # neck fabric remains visible in front, while the near arm occludes it.
    scarf=Image.new('RGBA',size)
    neck=(shoulder[0]-down[0],shoulder[1]-down[1]);anchor=(neck[0]-right[0]*4,neck[1]-right[1]*4)
    angle=pose.get('scarf_angle',scarf_angle);length=style['scarf']['length']*pose.get('scarf_length_scale',1)
    wave=pose.get('scarf_wave',0);curve=[]
    for step in range(6):
        u=step/5;side=math.sin(u*math.pi)*wave
        curve.append((round(anchor[0]+math.cos(angle)*length*u-math.sin(angle)*side),round(anchor[1]+math.sin(angle)*length*u+math.cos(angle)*side)))
    sd=ImageDraw.Draw(scarf);sd.line(curve,fill=pal['brass_shadow'],width=3);sd.line(curve,fill=pal['brass'],width=2)
    scarf.putalpha(ImageChops.subtract(scarf.getchannel('A'),body.getchannel('A')))
    collar=clothing['collar'].copy();collar.putalpha(ImageChops.subtract(collar.getchannel('A'),front_arm.getchannel('A')))
    scarf.alpha_composite(collar)
    if 'weapon' in parts:scarf.putalpha(ImageChops.subtract(scarf.getchannel('A'),parts['weapon'].getchannel('A')))
    out=body.copy();out.alpha_composite(scarf)
    assert points(body)
    return out,{'body':body,'scarf':scarf},anchors,stats
