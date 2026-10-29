"""Export presentation GIFs from a locally built result, never source cels."""
from pathlib import Path
from PIL import Image,ImageDraw
import argparse,json

def load_clips(root):
    report=json.loads((root/'report.json').read_text());result={}
    for name,meta in report['clips'].items():
        frames=[]
        for i in range(meta['frame_count']):
            im=Image.open(root/name/f'frame-{i:02}.png').convert('RGBA')
            canvas=Image.new('RGBA',(80,80),'#eee7d6');canvas.alpha_composite(im,((80-im.width)//2,68-im.height))
            frames.append(canvas.convert('RGB').resize((320,320),Image.Resampling.NEAREST))
        durations=[];total=last=0
        for ms in meta['durations_ms']:
            total+=ms;current=round(total/10)*10;durations.append(current-last);last=current
        result[name]=(frames,durations)
    return result

def at(frames,durations,t):
    t%=sum(durations);i=0
    while t>=durations[i]:t-=durations[i];i+=1
    return frames[i]

def label(im,text):
    im=im.copy();ImageDraw.Draw(im).text((12,12),text,fill='#403a35');return im

def save(path,frames,times):
    frames[0].save(path,save_all=True,append_images=frames[1:],duration=times,loop=0,disposal=2)
    with Image.open(path) as im:
        assert im.n_frames>1
        for i in range(im.n_frames):im.seek(i);im.load();assert im.info.get('duration',0)>0

def main():
    p=argparse.ArgumentParser();p.add_argument('--generated',type=Path,default=Path(__file__).parent/'_generated');p.add_argument('--out',type=Path,required=True);p.add_argument('--before',type=Path);args=p.parse_args()
    clips=load_clips(args.generated);args.out.mkdir(parents=True,exist_ok=True)
    for name,(frames,times) in clips.items():save(args.out/f'{name}.gif',[label(im,name.upper()) for im in frames],times)
    frames=[]
    for t in range(0,3000,20):
        canvas=Image.new('RGB',(320*len(clips),320),'#eee7d6')
        for i,(name,(seq,times)) in enumerate(clips.items()):canvas.paste(label(at(seq,times,t),name.upper()),(i*320,0))
        frames.append(canvas)
    save(args.out/'all-motions.gif',frames,[20]*len(frames))
    if args.before:
        old=load_clips(args.before)
        for name in ('run','roll'):
            frames=[]
            for t in range(0,3000,20):
                canvas=Image.new('RGB',(640,320),'#eee7d6');canvas.paste(label(at(*old[name],t),'BEFORE'),(0,0));canvas.paste(label(at(*clips[name],t),'AFTER'),(320,0));frames.append(canvas)
            save(args.out/f'{name}-before-after.gif',frames,[20]*len(frames))
    print('Exported motion previews:',args.out)

if __name__=='__main__':main()
