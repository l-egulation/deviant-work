"""Render a baked-body demo; only the scarf responds to movement speed."""
from pathlib import Path
from PIL import Image,ImageDraw
import argparse,hashlib,json,math,zipfile
from build import CLIPS,parse,masks
from integrated import render_integrated


def main():
    ap=argparse.ArgumentParser();ap.add_argument('--source-zip',type=Path,required=True);ap.add_argument('--out',type=Path,required=True);args=ap.parse_args()
    base=Path(__file__).parent;style=json.loads((base/'integrated-style.json').read_text());poses=json.loads((base/'overrides.json').read_text());assets={}
    with zipfile.ZipFile(args.source_zip) as z:
        for name in ['idle','run']:
            path=next(n for n in z.namelist() if '/'+CLIPS[name]+'/' in n and n.endswith('.aseprite'))
            assets[name]=parse(z.read(path))
    cached={};frames=[];a=1.9;v=0
    for step in range(120):
        t=step*.05;running=1.2<=t<3.4;clip='run' if running else 'idle'
        target=2.95 if running else 1.9
        for _ in range(6):v+=((target-a)*14-v*7)/120;a+=v/120
        elapsed=t-(1.2 if running else 3.4 if t>=3.4 else 0)
        asset=assets[clip];clock=elapsed*1000%sum(f['ms'] for f in asset['frames']);fi=0
        while clock>=asset['frames'][fi]['ms']:clock-=asset['frames'][fi]['ms'];fi+=1
        parts,_=masks(asset,asset['frames'][fi]);pose=dict(poses.get('clips',{}).get(clip,{}),**poses['frames'].get(f'{clip}/{fi}',{}));pose['scarf_wave']=math.sin(t*8)*(.9 if running else .1)
        out,layers,_,_=render_integrated(parts,style,pose,a)
        body_hash=hashlib.sha256(layers['body'].tobytes()).hexdigest();key=clip,fi
        if key in cached:assert cached[key]==body_hash,'Scarf physics changed the body!'
        else:cached[key]=body_hash
        # Keep the body fixed in screen space to make attachment quality visible.
        canvas=Image.new('RGBA',(80,64),'#eee7d6');canvas.alpha_composite(out,(16,12));preview=canvas.convert('RGB').resize((480,384),Image.Resampling.NEAREST)
        ImageDraw.Draw(preview).text((18,14),'IDLE / SCARF REST' if t<1.2 else 'RUN / SCARF LIFT' if running else 'STOP / SCARF SETTLE',fill='#403a35');frames.append(preview)
    args.out.parent.mkdir(parents=True,exist_ok=True);frames[0].save(args.out,save_all=True,append_images=frames[1:],duration=50,loop=0,disposal=2)
    print('120-frame movement preview exported; repeated body poses identical across scarf states.')

if __name__=='__main__':main()
