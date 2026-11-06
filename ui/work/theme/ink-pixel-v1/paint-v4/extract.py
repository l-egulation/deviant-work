from pathlib import Path
from collections import deque
import json, hashlib
import numpy as np
from PIL import Image,ImageDraw,ImageFont
P=Path(__file__).resolve().parent
A=P/'assets';A.mkdir(exist_ok=True)
S=P.parent/'extraction-v3/assets'
colors=['red','yellow','green','blue','purple']
def fill(mask):
 h,w=mask.shape;outside=np.zeros_like(mask);q=deque()
 for y,x in [(y,x) for y in range(h) for x in (0,w-1)]+[(y,x) for y in (0,h-1) for x in range(w)]:
  if not mask[y,x] and not outside[y,x]:outside[y,x]=1;q.append((y,x))
 while q:
  y,x=q.popleft()
  for a,b in ((y-1,x),(y+1,x),(y,x-1),(y,x+1)):
   if 0<=a<h and 0<=b<w and not mask[a,b] and not outside[a,b]:outside[a,b]=1;q.append((a,b))
 return ~outside
board=Image.new('RGB',(1250,850),'#22232b');d=ImageDraw.Draw(board)
f=ImageFont.truetype(str(P.parent/'assembly-v1/fonts/MemomentKkukkukk.ttf'),18)
d.text((20,12),'승인 원본에서 칠 형태 분리 · 같은 칠 이미지 재사용',font=f,fill='white')
rows=['승인 원본','칠 + 문양','색상 바탕','무색 바탕']
meta=[]
for i,c in enumerate(colors):
 im=Image.open(S/f'filled-{c}.png').convert('RGBA');a=np.array(im);r,g,b=a[:,:,0],a[:,:,1],a[:,:,2]
 cond={'red':(r>215)&(g>30),'yellow':(r>215)&(g>175),'green':(g>185)&(r>45),'blue':(b>205)&(g>110),'purple':(r>165)&(b>215)}[c]
 mask=fill(cond&(a[:,:,3]>0))
 out=a.copy();out[:,:,3]=mask.astype('uint8')*255
 paint=Image.fromarray(out);paint.save(A/f'paint-mark-{c}.png')
 # Reuse the exact same paint object, at (0,0), with no scale or rotation.
 base=Image.open(S/f'empty-{c}.png').convert('RGBA');combined=Image.alpha_composite(base,paint);combined.save(A/f'colored-{c}.png')
 gray=Image.open(S/'empty-neutral.png').convert('RGBA');gray=gray.crop(gray.getbbox()).resize((195,145),Image.Resampling.NEAREST)
 neutral=Image.new('RGBA',im.size);neutral.alpha_composite(gray,(10,5));neutral=Image.alpha_composite(neutral,paint);neutral.save(A/f'neutral-{c}.png')
 assert np.array_equal(out[:,:,:3][mask],a[:,:,:3][mask])
 meta.append({'color':c,'file':f'assets/paint-mark-{c}.png','size':paint.size,'bounds':paint.getbbox(),'retainedRGBMismatch':0,'sha256':hashlib.sha256((A/f'paint-mark-{c}.png').read_bytes()).hexdigest(),'placementBothBases':[0,0],'scaleBothBases':1})
 x=140+i*220;d.text((x,43),['빨강','노랑','초록','파랑','보라'][i],font=f,fill='white')
 for j,pic in enumerate([im,paint,combined,neutral]):
  y=80+j*185;board.paste(pic,(x,y),pic)
for j,label in enumerate(rows):d.text((8,130+j*185),label,font=f,fill='#c1c7ce')
board.save(P/'comparison.png');(P/'manifest.json').write_text(json.dumps(meta,indent=2))
print('5 canonical paint+mark overlays extracted; same object reused at 1:1; retained RGB mismatch=0')
