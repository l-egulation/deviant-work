from pathlib import Path
from collections import deque
import json
import numpy as np
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parent
src=Image.open(ROOT.parent/'mockups/palette-options/all-colors-v8-paint-variation.png').convert('RGB')
assets=ROOT/'assets'; assets.mkdir(exist_ok=True)
colors=['red','yellow','green','blue','purple']
xs=[370,625,880,1130,1390]
regions=[(f'{state}-{c}',(x,y,x+220,y+155)) for state,y in [('empty',170),('filled',375),('neutral-filled',580)] for c,x in zip(colors,xs)]
regions.append(('empty-neutral',(225,780,390,920)))
def components(mask):
 seen=np.zeros(mask.shape,bool); out=[]
 h,w=mask.shape
 for y,x in zip(*np.where(mask)):
  if seen[y,x]:continue
  q=[(y,x)];seen[y,x]=True;part=[]
  while q:
   a,b=q.pop();part.append((a,b))
   for u,v in ((a-1,b),(a+1,b),(a,b-1),(a,b+1)):
    if 0<=u<h and 0<=v<w and mask[u,v] and not seen[u,v]:seen[u,v]=True;q.append((u,v))
  out.append(part)
 return out
manifest=[]; crops=[]
for name,box in regions:
 rgb=np.array(src.crop(box));lo=rgb.min(2).astype(float);hi=rgb.max(2).astype(float)
 # Saturated pigment or bright neutral substrate. Dark enclosed marks are recovered by hole filling.
 mask=((hi-lo)>hi*.27)&(hi>65)
 if name.startswith('neutral') or name=='empty-neutral':mask|=(lo>105)
 parts=components(mask); largest=max(parts,key=len)
 mask[:]=False
 for y,x in largest:mask[y,x]=True
 # Flood exterior only; do not erase black symbols enclosed by pigment.
 exterior=np.zeros(mask.shape,bool);h,w=mask.shape;q=deque()
 for y,x in [(y,x) for y in range(h) for x in (0,w-1)]+[(y,x) for y in (0,h-1) for x in range(w)]:
  if not mask[y,x] and not exterior[y,x]:exterior[y,x]=True;q.append((y,x))
 while q:
  y,x=q.popleft()
  for a,b in ((y-1,x),(y+1,x),(y,x-1),(y,x+1)):
   if 0<=a<h and 0<=b<w and not mask[a,b] and not exterior[a,b]:exterior[a,b]=True;q.append((a,b))
 mask=~exterior
 rgba=np.dstack((rgb,mask.astype('uint8')*255)); im=Image.fromarray(rgba)
 im.save(assets/(name+'.png'))
 assert np.array_equal(np.array(im)[:,:,:3][mask],rgb[mask])
 manifest.append({'id':name,'sourceRect':box,'size':im.size,'opaquePixels':int(mask.sum()),'retainedRGBMismatch':0,'bounds':im.getbbox()})
 crops.append((name,src.crop(box),im))
(ROOT/'manifest.json').write_text(json.dumps(manifest,indent=2))
# Side-by-side pairs, native 1:1 scale. Source and extracted share the exact same crop and dimensions.
board=Image.new('RGB',(1250,1050),'#22232b');d=ImageDraw.Draw(board)
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',16)
d.text((25,15),'SOURCE / EXTRACTED  |  1:1 pixels  |  no resizing or regeneration',font=font,fill='white')
for i,(name,original,cutout) in enumerate(crops):
 col=i%3;row=i//3;x=20+col*410;y=55+row*163
 # native crops intentionally displayed in two staggered halves? width 220x2 requires wider board
# 5 columns of pairs, 3 rows plus neutral
board=Image.new('RGB',(2450,850),'#22232b');d=ImageDraw.Draw(board)
d.text((20,10),'Each pair: SOURCE (left) / EXTRACTED (right), same native pixel size. RGB preserved; alpha boundary estimated.',font=font,fill='white')
for i,(name,original,cutout) in enumerate(crops):
 col=i%5;row=i//5;x=20+col*485;y=55+row*195
 d.text((x,y),name,font=font,fill='white');board.paste(original,(x,y+25));board.paste(cutout,(x+230,y+25),cutout)
board.save(ROOT/'comparison.png')
print('Extracted',len(manifest),'sprites; retained RGB mismatch: 0')
