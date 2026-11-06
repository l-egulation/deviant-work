# T4 장소 시트 생성 프롬프트

생성: 내장 이미지 생성 도구 · 2026-11-05. 모든 결과는 사용자 검토 전 시안.

## 우물 광장 L1

참조: `01_refs/test/style-B_v1.png`

```text
Create a 16:9 empty location reference for a game cinematic, based on the supplied style image. This is the village WELL PLAZA in late afternoon. Remove the traveler completely and leave the center around the modest stone well open. Keep a clear coherent simple composition: low well, a laundry line, simple near-frontal cream and muted terracotta village buildings, and a few distinctive trees. Follow the reference's pixel-inspired 2D illustration, soft light and warm ivory, teal accents, earth tones and lavender-grey shadows, but simplify the leaves, paving, roof and foreground details: broad calm surfaces, sparse marks, avoid dense texture, bricks and tiny windows. Gentle peaceful everyday atmosphere, no ominous symbols. No people, animals, letters, text, signs, logos, watermarks, UI or borders. Establish a stable wide composition so it can later be converted to an identical graphite sketch.
```

## 길·어귀·지평선 L1 공통

참조: `loc-well-L1_v1.png`

```text
16:9 empty location concept for Deviant cinematic, same village and style as reference: pixel-inspired 2D illustration with subtle pixel texture, simple clear outlines and warm paper palette, soft late-afternoon light, lavender-grey shadows, sparse environmental details, near-frontal simple architecture, broad calm surfaces. No people, animals, letters, text, logos, watermark, UI or borders. Peaceful and inviting, not horror. Leave open space for character animation.
```

길: `Scene: a quiet rural ROAD approaching this village from outside, wide view, gently curving path, simple low fence and a few trees, distant cream rooftops, open foreground. No well visible.`

어귀: `Scene: village ENTRANCE as seen from the path, a simple low fence and modest cream and terracotta houses, distinct tree silhouettes, open path leading toward the same plaza. No archway lettering or gate signs.`

지평선: `Scene: wide HORIZON seen from just beyond the village, gentle hills and distant rooftops with an open path and broad softly lit sky. Keep the landscape peaceful; no giant eyes, monsters or black ink.`

## 각 장소 L2 공통

참조: 같은 장소의 L1

```text
Edit the supplied L1 location image into its matching L2 erased sketch for a game cinematic. Preserve EXACT camera framing, object positions and all structural outlines: buildings, rooflines, windows, doors, trees, fence, well, path and horizon must stay in precisely the same positions and shapes as the input; do not add, remove, shift, zoom or redesign anything. Remove all color and color shading. Unfinished graphite sketch on warm ivory paper, confident dark graphite contours, broad empty light surfaces, sparse diagonal hatching only under eaves and stones. No lettering, symbols, text, logos, watermarks, borders, people or animals. 16:9.
```

## L1 v2 공통 및 장소별 지시

참조 1: `style-B_v1.png`; 참조 2: 같은 장소 L1 v1.

```text
Create a 16:9 EMPTY environment for Deviant. Image 1 is the authoritative STYLE reference: retain its fine pixel-inspired edges, subtle granular pixel texture and soft painterly surfaces, warm paper palette and natural depth, not smooth vector art. Ignore image 1's character and layout. Image 2 is a rough previous location layout, which you may meaningfully redesign. Same warm peaceful rural world, simple shapes, restrained detail, soft late-afternoon light, no people, no animals, no words, no signs, no logo, no watermark, no UI.
```

길: `A rural lane OUTSIDE the village: landscape, grasses, low fence and open sky; village is small and distant. A few modest trees may be far away; NO large tree trunk framing the left edge, no well or close houses. Strong sense of approaching village.`

어귀: `Village ENTRANCE from a path: asymmetrical arrangement of several modest cream and terracotta village buildings, a low wall and open passage, one small tree toward the right middle distance. NO large foreground tree on the left; the buildings and approach have a different silhouette from the well plaza. No well visible.`

우물: `The village WELL PLAZA: a modest low stone well is the clear center, laundry line, simple cream buildings, open room around the well. A tree toward the RIGHT background provides shade, NO large tree trunk at the left edge. Warm and peaceful, building shapes easy to convert to matching graphite sketch.`

지평선: `An open HORIZON beyond the village: broad sky, gentle hills and a distant winding path. No nearby houses or large foreground tree on either edge; simple grasses and one small distant tree toward right. Space for a small traveler to face the distance. No eyes, monsters or ink.`

## L2 v2 공통

참조: 각 장소의 L1 v2.

```text
Edit the supplied scene into an unfinished graphite sketch on warm ivory paper. Preserve exact framing, same object locations, outlines and sizes, same roofs, landscape and horizon; do not add, remove, move or redesign anything. Remove color, using confident graphite contours, broad blank paper and sparse diagonal hatching. No text, logos, symbols, watermark, people or borders. 16:9.
```

## L2 v3 공통

참조: 각 장소의 L1 v2.

```text
Create an erased L2 version of this SAME scene as a sparse graphite drawing on warm ivory paper. This is a registration-sensitive edit: preserve the exact framing and pixel positions of all silhouettes, roof edges, trees, stones, clouds, path, objects and horizon. Do not move, rescale, redraw or invent scene elements. Remove colors; keep outlines delicate and confident. Leave broad surfaces white and free of detail; use only a few SHORT diagonal hatch marks directly beneath eaves or stones. No hatching on sky, clouds, hills, plants or ground; no full-surface shading. No people, writing, symbols, logos, borders or watermark. Maintain 16:9.
```
