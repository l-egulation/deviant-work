from pathlib import Path
import json
import numpy as np
from PIL import Image,ImageDraw,ImageFont
P=Path(__file__).resolve().parent;T=P.parent
for sub in ['runtime/slots','runtime/symbols','source/paint','source/bases','source/restoration-masks']:(P/sub).mkdir(parents=True,exist_ok=True)
colors=['red','yellow','green','blue','purple'];size=(220,155)
fontpath=T/'assembly-v1/fonts/MemomentKkukkukk.ttf'
f=ImageFont.truetype(str(fontpath) if fontpath.exists() else '/System/Library/Fonts/Supplemental/Arial.ttf',18)
board=Image.new('RGB',(1280,1050),'#22232b');d=ImageDraw.Draw(board)
d.text((20,12),'분리 제작 원본 → 합친 슬롯 16종 + 별도 문양 · 모든 파일 220×155',font=f,fill='white')
gray=Image.open(T/'extraction-v3/assets/empty-neutral.png').convert('RGBA');gray=gray.crop(gray.getbbox()).resize((195,145),Image.Resampling.NEAREST)
neutral=Image.new('RGBA',size);neutral.alpha_composite(gray,(10,5));neutral.save(P/'runtime/slots/empty-neutral.png');neutral.save(P/'source/bases/neutral.png')
report=[]
for i,c in enumerate(colors):
 src=Image.open(T/f'paint-v4/assets/paint-mark-{c}.png').convert('RGBA');a=np.array(src);opaque=a[:,:,3]>0
 mark=(a[:,:,:3].max(2)<145)&opaque
 # Include the mixed edge around the dark symbol in the repair region.
 core=mark.copy()
 for _ in range(6):
  prev=mark.copy()
  for dy,dx in [(-1,0),(1,0),(0,-1),(0,1)]:mark|=np.roll(prev,(dy,dx),(0,1))
 mark&=opaque
 rgb=a[:,:,:3].astype(float);rgb[mark]=np.median(rgb[opaque&~mark],axis=0)
 for _ in range(1800):
  avg=(np.roll(rgb,1,0)+np.roll(rgb,-1,0)+np.roll(rgb,1,1)+np.roll(rgb,-1,1))/4
  rgb[mark]=avg[mark]
 clean=a.copy();clean[:,:,:3][mark]=np.rint(rgb[mark]).astype('uint8')
 paint=Image.fromarray(clean);paint.save(P/f'source/paint/{c}.png')
 symbol=np.zeros_like(a);symbol[:,:,:3]=[15,18,15];symbol[:,:,3]=core.astype('uint8')*255
 symbol=Image.fromarray(symbol);symbol.save(P/f'runtime/symbols/reference-{c}.png')
 Image.fromarray(mark.astype('uint8')*255).save(P/f'source/restoration-masks/{c}.png')
 base=Image.open(T/f'extraction-v3/assets/empty-{c}.png').convert('RGBA');base.save(P/f'source/bases/{c}.png');base.save(P/f'runtime/slots/empty-{c}.png')
 colored=Image.alpha_composite(base,paint);colored.save(P/f'runtime/slots/filled-{c}.png')
 uncolored=Image.alpha_composite(neutral,paint);uncolored.save(P/f'runtime/slots/neutral-filled-{c}.png')
 rebuilt=Image.alpha_composite(paint,symbol)
 diff=int(np.any(np.array(rebuilt)!=a,axis=2).sum())
 assert np.array_equal(clean[~mark],a[~mark])
 report.append({'color':c,'restoredPixelCount':int(mark.sum()),'reassembledPaintMismatchPixels':diff,'unmodifiedOutsideMask':True,'symbolStatus':'reference-only; effect-ID mapping pending'})
 x=155+i*220;d.text((x,45),['빨강','노랑','초록','파랑','보라'][i],font=f,fill='white')
 for j,img in enumerate([base,paint,colored,uncolored,Image.alpha_composite(colored,symbol)]):
  board.paste(img,(x,85+j*180),img)
for j,t in enumerate(['빈 색상 칸','문양 없는 칠','바탕 + 칠','무색 바탕 + 칠','문양 재결합']):d.text((12,140+j*180),t,font=f,fill='#c2c8cf')
board.save(P/'comparison.png')
(P/'validation.json').write_text(json.dumps({'canvas':size,'pivot':[.5,.5],'slotCount':16,'symbolCount':5,'checks':report},indent=2))
files=list((P/'runtime').rglob('*.png'));assert len(files)==21
assert all(Image.open(x).size==size for x in files)
print('16 slot PNGs, 5 reference symbols; all 220x155; 5 reference glyphs have no pigment backing; outside-mask changes=0')
