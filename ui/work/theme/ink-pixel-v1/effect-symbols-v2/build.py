from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFont
P=Path(__file__).resolve().parent;T=P.parent
for folder in ['runtime','pixel-source']:(P/folder).mkdir(exist_ok=True)
# Hand-edited uniform 20x20 silhouettes. #=ink .=transparent.
grids={
'ink3_red_01':('덧칠','red',[
'....................','.............###....','............####....','...........####.....','..........####......','.........####.......','........####........','.......####.........','......####.....###..','.....####.....####..','....####.....####...','...####.....####....','..####.....####.....','..###.....####......','.........####.......','........####........','.......####.........','......####..........','......###...........','....................']),
'ink3_yellow_02':('뛰어난 발걸음','yellow',[
'....................','......########......','......########......','.......######.......','.......######.......','.......##..##.......','.......######.......','.......##..##.......','.......######.......','.......######.......','.......#######......','.......#########....','......############..','.....##############.','.....##############.','.....##############.','.....##############.','......#####..#####..','......#####..#####..','....................']),
'ink3_green_01':('든든한 배리어','green',[
'....................','.........##.........','......########......','...##############...','..################..','..################..','..#######..#######..','..#######..#######..','..#######..#######..','...######..######...','...######..######...','...####......####...','....#####..#####....','....#####..#####....','.....####..####.....','......########......','.......######.......','........####........','.........##.........','....................']),
'ink3_blue_04':('난무','blue',[
'....................','.......######.......','.....##########.....','....####....####....','...###........###...','..###....##....###..','..##.....##.....##..','.###.....##.....###.','.##......##......##.','.##......######..##.','.##......######..##.','.##..............##.','.###............###.','..##............##..','..###..........###..','...###........###...','....####....####....','.....##########.....','.......######.......','....................']),
'ink3_purple_05':('사약','purple',[
'....................','......########......','......########......','.......######.......','.......######.......','......########......','.....##########.....','....############....','...##############...','...####......####...','...###........###...','...###..#..#..###...','...###..#..#..###...','...####......####...','...#####.##.#####...','...##############...','...##############...','....############....','.....##########.....','....................'])}
fontfile=T/'assembly-v1/fonts/MemomentKkukkukk.ttf';f=ImageFont.truetype(str(fontfile),20)
board=Image.new('RGB',(1280,900),'#22232b');d=ImageDraw.Draw(board)
d.text((20,18),'문양 재디자인 · 대표 5종 · 격자 직접 정리',font=f,fill='white')
manifest=[]
for i,(id,(name,c,rows)) in enumerate(grids.items()):
 assert len(rows)==20 and all(len(r)==20 for r in rows)
 mask=Image.new('L',(20,20));pixels=mask.load()
 for y,row in enumerate(rows):
  for x,v in enumerate(row):pixels[x,y]=255 if v=='#' else 0
 mask.save(P/f'pixel-source/{id}.png')
 sprite=Image.new('RGBA',(220,155));large=Image.new('RGBA',(80,80),(16,18,18,255));large.putalpha(mask.resize((80,80),Image.Resampling.NEAREST));sprite.alpha_composite(large,(70,37));sprite.save(P/f'runtime/{id}.png')
 x=145+i*225;d.text((x,55),name,font=f,fill='white')
 old=Image.open(T/f'effect-symbols-v1/runtime/{id}.png');base=Image.open(T/f'palette-package-v6/runtime/slots/filled-{c}.png')
 for y,icon in [(100,old),(295,sprite)]:
  combined=Image.alpha_composite(base,icon);board.paste(combined,(x,y),combined)
 # standalone on light ground, no pigment backing
 d.rectangle((x+60,505,x+160,605),fill='#c8cbd0');board.paste(large,(x+70,515),large)
 for y,w in [(660,110),(770,66)]:
  combined=Image.alpha_composite(base,sprite);small=combined.resize((w,round(155*w/220)),Image.Resampling.NEAREST);board.paste(small,(x+(220-w)//2,y),small)
 manifest.append({'id':id,'name':name,'color':c,'canvas':[220,155],'pixelGrid':[20,20],'scale':4,'offset':[70,37],'status':'representative-redesign-review'})
for y,t in [(145,'이전'),(340,'수정'),(545,'문양만'),(680,'슬롯 110px'),(785,'슬롯 66px')]:d.text((15,y),t,font=f,fill='#c5c9d0')
board.save(P/'comparison.png');(P/'pixel-grids.json').write_text(json.dumps({k:v[2] for k,v in grids.items()},indent=2));(P/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print('5 symbols verified: uniform 20x20 grids, 80x80 rendered marks, separate 220x155 RGBA assets')
