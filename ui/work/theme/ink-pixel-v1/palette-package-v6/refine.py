from pathlib import Path
import shutil,json
import numpy as np
from PIL import Image,ImageDraw,ImageFont
P=Path(__file__).resolve().parent;old=P.parent/'palette-package-v5'
for name in ['runtime','source']:shutil.copytree(old/name,P/name,dirs_exist_ok=True)
colors=['red','yellow','green','blue','purple'];board=Image.new('RGB',(1280,850),'#22232b');d=ImageDraw.Draw(board)
f=ImageFont.truetype(str(P.parent/'assembly-v1/fonts/MemomentKkukkukk.ttf'),18)
d.text((20,15),'바탕 노출 소폭 조정 · 칠 가장자리 일부만 정리 · 크기와 기준점 유지',font=f,fill='white')
report=[]
for i,c in enumerate(colors):
 a=np.array(Image.open(old/f'source/paint/{c}.png'));mask=a[:,:,3]>0
 eroded=mask.copy()
 for _ in range(3):
  pad=np.pad(eroded,1);eroded=pad[1:-1,1:-1]&pad[:-2,1:-1]&pad[2:,1:-1]&pad[1:-1,:-2]&pad[1:-1,2:]
 y,x=np.indices(mask.shape);angle=np.arctan2(y-77,x-110)
 # Two broad, naturally separated edge segments; never notch the interior.
 offset=[0,.2,-.2,.1,-.1][i]
 sector=((angle> -2.9+offset)&(angle< -1.4+offset))|((angle>.35+offset)&(angle<1.5+offset))
 base=Image.open(old/f'source/bases/{c}.png');baseMask=np.array(base)[:,:,3]>0
 removal=mask&~eroded&sector&baseMask
 a[removal,3]=0;paint=Image.fromarray(a);paint.save(P/f'source/paint/{c}.png')
 filled=Image.alpha_composite(base,paint);filled.save(P/f'runtime/slots/filled-{c}.png')
 neutral=Image.alpha_composite(Image.open(old/'source/bases/neutral.png'),paint);neutral.save(P/f'runtime/slots/neutral-filled-{c}.png')
 sym=Image.open(old/f'runtime/symbols/reference-{c}.png')
 report.append({'color':c,'removedPixels':int(removal.sum()),'removedPercent':round(100*removal.sum()/mask.sum(),2),'paintCanvas':[220,155],'placement':[0,0]})
 xx=150+i*220;d.text((xx,50),['빨강','노랑','초록','파랑','보라'][i],font=f,fill='white')
 for j,img in enumerate([Image.open(old/f'runtime/slots/filled-{c}.png'),filled,neutral,Image.alpha_composite(filled,sym)]):board.paste(img,(xx,90+j*180),img)
for j,t in enumerate(['이전','수정 · 바탕 + 칠','수정 · 무색 바탕','문양 포함 확인']):d.text((10,145+j*180),t,font=f,fill='#c5cad0')
board.save(P/'comparison.png');(P/'validation.json').write_text(json.dumps(report,indent=2));print(report)
