# Deviant 시네마틱 티저 작업 계획

> **2026-11-05 눈·손 연결 정정:** 거대한 눈의 동공에서 긴 팔이 나오고 여섯 펜촉 손으로 이어진다. 손 단독 시안은 대체 검토하며 도서관은 반영하지 않는다. 하늘 배치는 현재 시안이고 정체·원인은 미확정이다.

> **2026-11-05 추가 사용자 결정:** 기괴한 손은 여섯 손가락 각각에 만년필 펜촉이 달린 형태다(깃털펜 아님). 주인공도 부분 스케치화되다가 별개의 잉크 조력자가 몸에 들어가 잉크화된다. 최신 결정 기록을 우선한다.

> **2026-11-05 사용자 정정:** 아래 B4-C2의 조력자 손과 T5의 `ink-helper-hand_v1.png`는 구안·미채택이다. 조력자는 스케치화에 휘말려 죽어가는 주인공의 몸에 들어가는 잉크 같은 형태다. 눈·손은 사용자가 제공한 이미지의 규모와 분위기를 참고할 기괴한 형상이며, 조력자와 동일한 존재로 정하지 않는다. T5 시안은 전체 영상의 연결 및 미술 방향 재검토 후 수정한다. [결정 기록](../decisions.md)

> **실행 방식 (사용자 결정):** 사용자가 이 계획과 설계 문서를 ChatGPT에 함께 넣고 T1~T12를 단계별로 진행한다. 이미지는 GPT Image·Nano Banana, 영상과 효과음은 Higgsfield, 음악은 Suno, 편집은 사용자와 GPT가 맡는다. Claude(Cowork)는 레포 준비(T0)를 하고, 남겨진 작업 기록을 보고 결과를 검토한다(T13). **각 작업이 끝날 때마다 아래 '작업 기록 양식'으로 기록을 남긴다.** 각 단계는 체크박스(`- [ ]`)로 진행 상황을 표시한다.

**목표:** 같은 장면들로 단편(약 80초)과 발표 오프닝(약 45초) 두 편을 2026-11-14까지 16:9 최종 파일로 만든다.

**방식:** 기준 이미지 한 세트 → 컷표 → 생성 단위(G) 영상 → 편집에서 '지워짐' 끊김을 프레임 단위로 끼워 넣는다. 영상 모델에게는 끊김을 시키지 않는다.

**도구:** GPT Image(ChatGPT Pro), Nano Banana(Gemini), Higgsfield(Seedance, 효과음), Suno(음악), 편집 도구(사용자·GPT가 선택). ElevenLabs는 목소리가 필요할 때만 쓴다.

**설계:** `video/docs/specs/2026-11-04-cinematic-teaser-design.md` (작업할 때 함께 읽는다)

## 공통 규칙

- 화면비는 모든 이미지와 영상이 16:9다. 최종본은 1920×1080, 24fps, H.264 mp4로 만든다.
- (위 '작업 기록 양식'을 매 작업 끝에 쓴다.)
- 생성 이미지와 영상 안에 글자, 로고, 워터마크를 넣지 않는다. 모든 이미지 프롬프트 끝에 `no text, no letters, no logos, no watermark`를 붙인다.
- 주인공: 크림색 후드 + 청록색 스카프, 지나가던 평범한 젊은 여행자. 깃털펜은 등장하지 않는다.
- 세 가지 톤
  - L1: 밝은 픽셀 세계
  - L2: 지워진 스케치 세계(따뜻한 종이색, 흑연 선, 성긴 사선 빗금)
  - L3: 잉크의 순간(거의 흑백, 잉크 색 `#221C18` = RGB 34·28·24)
- 끊김 속 형체는 0.5초를 넘지 않는다. B5의 마지막 1회만 1.0초까지 허용한다. 피, 비명, 갑자기 튀어나오는 장면은 넣지 않는다.
- 공식 장면 번호는 아래 컷표의 ID(예: `B2-C3`), 생성 단위는 `G01`~`G09`, 끊김 삽입 영상은 `I1`~`I5`를 쓴다.
- 내려받은 파일 이름은 `<ID>_v<번호>.<확장자>`로 한다. 예: `G03_v2.mp4`, `ref-hero-front_v1.png`
- 영상 생성 설정
  - 시험: 480p 또는 720p, fast 모드
  - 채택용: 1080p, std 모드
  - 소리: L1 컷과 잉크 컷은 **소리 켬**으로 생성해 환경음·효과음 후보를 얻는다. 쓸지는 편집에서 고른다. 음악은 넣지 않도록 프롬프트에 `no music, ambient sound only`를 붙인다.
- Higgsfield 구독이 11/15에 끝난다. **11/14까지 모든 생성본을 내려받는다.**

## 작업 기록 양식

작업(T번호) 하나가 끝날 때마다 `video/docs/log/YYYY-MM-DD.md`에 아래 블록을 하나 추가한다. GPT에게 "이 작업 기록 블록 써 줘"라고 하면 된다. 정한 것이 있으면 `video/docs/decisions.md`에 한 줄(`YYYY-MM-DD · 정한 것 · 이유`)을 더하고, `video/docs/STATUS.md`의 '지금 상태'와 '다음 할 일'을 고친다.

```markdown
## HH:MM · T<번호> <작업 이름>

- 한 사람·도구: 사용자 + ChatGPT / Higgsfield <모델 이름> / Suno …
- 설정: 해상도, 모드, 길이, 소리 켬·끔, 사용한 레퍼런스(@hero 등)
- 만든 파일: `경로/파일_v2.png` (채택), `경로/파일_v1.png` (탈락: 이유 한 줄)
- 프롬프트: `03_prompts/G03.md` 또는 본문에 짧게
- 쓴 크레딧: 약 N (잔액 M)
- 문제·메모: 깨진 컷, 다시 할 것
- 다음: 다음 작업
```

## 주의할 실패 (리뷰 초점)

1. **주인공이 컷마다 달라짐:** 모든 영상 생성에 `@hero`를 붙이고 스타일 블록을 토씨까지 같게 넣는다. T9의 검수 항목으로 막는다.
2. **픽셀이 지글거리거나 뭉개짐:** T1에서 화풍을 이 기준으로 고르고, T9 검수에서 다시 본다.
3. **끊김이 흔한 디지털 노이즈로 보임:** T11에서 끊김 순서(L1→L2→L3→L2→L1)를 지키고, 검토본에서 확인한다.
4. **생성본이 다른 fps·해상도로 섞여 편집이 어긋남:** T11에서 모든 클립을 24fps·1920×1080으로 먼저 맞춘다.
5. **발표장 PC에서 재생이 안 되거나 소리가 작음:** T12에서 발표용 노트북으로 실제 재생해 보고, 음량을 -14 LUFS 근처로 맞춘다.

---

## 컷표 (T7에서 다듬는 초안)

`톤` 열: L1 = 밝음, L2 = 스케치, L3 = 잉크. `끊김` 열: 그 컷 안에서 몇 초에 무엇을 끼우는지.

| ID | 길이 | 장면 | 카메라 | 톤 | 끊김 | 생성 단위 |
|---|---|---|---|---|---|---|
| B1-C1 | 5s | 오후 햇살 속 시골 길, 주인공이 작게 걸어온다 | static wide | L1 | — | G01 |
| B1-C2 | 4s | 걷는 주인공 측면, 스카프가 바람에 날린다 | slow pan right | L1 | — | G01 |
| B1-C3 | 5s | 울타리 너머로 보이는 마을 어귀 | slow dolly-in | L1 | 3.0s에 3프레임 L2만 (형체 없음) | G02 |
| B1-C4 | 6s | 우물 광장, 빨래가 흔들리고 굴뚝 연기가 오른다 | static wide | L1 | — | G02 |
| B2-C1 | 4s | 창가 화분 옆에서 졸던 고양이가 고개를 든다 | close-up | L1 | 2.0s에 0.2초 → I1 | G03 |
| B2-C2 | 4s | 우물을 들여다보는 주인공 | close-up | L1 | — | G03 |
| B2-C3 | 3s | 우물 수면에 비친 하늘 | close-up, top-down | L1 | 1.5s에 0.3초 → I2 | G03 |
| B2-C4 | 4s | 주인공이 뭔가를 느끼고 뒤돌아본다 | medium, static | L1 | — | G04 |
| B2-C5 | 5s | 아무도 없는 마을 길 | static wide | L1 | 3.0s에 0.5초 → I3 | G04 |
| B3-C1 | 4s | 언덕 너머 지붕들에서 색이 빠져 스케치가 된다 | static wide | L1→L2 | 실제 번짐(끊김 아님) | G05 |
| B3-C2 | 4s | 마을 안으로 달리는 주인공 | tracking side | L1 | — | G05 |
| B3-C3 | 3s | 앞쪽에서도 지워짐이 밀려와 주인공이 멈춘다 | medium | L1→L2 | 실제 번짐 | G05 |
| B3-C4 | 4s | 우물 앞에 쓰러진 주인공에게서 색이 빠진다 | high angle | L1→L2 | 실제 번짐 | G05 |
| B4-C1 | 3s | 정적, 전부 스케치가 된 우물 광장 | static wide | L2 | — | G06 |
| B4-C2 | 5s | 거대한 잉크 손이 쓰러진 주인공을 감싸고 스며든다 | top-down, slow push-in | L3 | — | G06 |
| B4-C3 | 4s | 잉크 몸이 된 주인공이 눈을 뜬다 | close-up | L2+L3 | — | G06 |
| B5-C1 | 5s | 일어선 주인공의 뒷모습, 멀리 지평선 | static wide | L2 | — | G07 |
| B5-C2 | 4s | 지평선의 검은 번짐 | slow push-in | L2 | 3.0s에 1.0초 → I4 | G07 |
| B5-C3 | 4s | 암전 → 제목 `DEVIANT` | — | — | 편집만 | — |
| OP-C1 | 3s | 암전 속 빈 종이에 잉크 한 방울이 떨어져 번진다 | macro, static | L3 | — | G08 |
| OP-C2 | 3s | 잉크가 화면 전체를 덮는다 | static | L3 | — | G09 |
| OP-C3 | 3s | 제목이 '쾅' 하고 뜬 뒤 1초 끊김 | — | — | 편집만 (I5) | — |

**끊김 삽입 영상 (4초씩 생성, 편집에서 일부만 사용)**

| ID | 내용 |
|---|---|
| I1 | 창 안쪽, 반쯤만 그려진 사람 형체(얼굴 선이 덜 그려짐) |
| I2 | 물속에서 이쪽을 보는 커다란 눈 |
| I3 | 길 끝에 선, 팔다리가 너무 긴 그림자 |
| I4 | 지평선을 가득 채운 거대한 눈이 천천히 뜬다 |
| I5 | 종이 뒤에서 잉크가 스며 나와 번진다 |

영상 모델은 최소 4초라서 3초짜리 G08·G09도 4초로 만들어 편집에서 자른다.

**생성 순서 (오프닝이 쓰는 것부터):** G01 → G03 → G05 → G07 → G08 → G09 → I1~I5 → G06 → G02 → G04

---

### T0: 레포와 폴더 준비 (Claude, 11/4)

**만들 것**
- 브랜치 `work/video`
- `video/README.md`, `video/docs/{STATUS.md, decisions.md, handoff.md, log/2026-11-04.md, specs/, plans/}`
- `video/work/teaser/{00_brief,01_refs/characters,01_refs/locations,01_refs/ink,02_storyboard,03_prompts,04_renders,05_sound,06_edit,07_exports}/`

**넘겨줄 것:** 위 폴더 경로. 이후 모든 단계는 이 경로를 쓴다.

- [x] 설계 문서와 이 계획을 `video/docs/specs/`, `video/docs/plans/`로 옮긴다.
- [x] 레포 규칙대로 미디어(png, mp4, wav, mp3)가 LFS로 잡히는지 확인한다: `git check-attr filter -- video/work/teaser/04_renders/x.mp4` → `filter: lfs`
- [x] 사용자 승인을 받고 commit한다. 기존 방식대로 bundle을 `_handoff/`에 넣는다.

### T1: 화풍 시험 (사용자 + GPT, 11/5)

**입력:** 팀 주인공 스프라이트 `S15P31F109/unity/Assets/Deviant/Combat/Resources/UnarmedBody/idle/F01.png`, 마을 시안 설명 `S15P31F109/Stage1VillageReference/ArtDirection/phase2-selected/03-bright-plaza-prompt.txt`

**만들 것:** `01_refs/test/style-A_v1.png`, `style-B_v1.png`, `style-A_test.mp4`, `style-B_test.mp4`

- [ ] 스프라이트를 첨부하고 같은 장면(우물 앞에 선 주인공, 오후 햇살, 16:9)을 두 화풍으로 만든다.
  - (가) 진짜 픽셀 아트: `true pixel art, crisp hard-edged pixels, limited palette, no anti-aliasing, 16-bit era`
  - (나) 픽셀 느낌 일러스트: `pixel-inspired 2D illustration, flat color planes with subtle pixel texture, crisp clean outlines, soft painterly light`
- [ ] 두 이미지를 각각 시작 이미지로 Higgsfield에서 4초 영상을 만든다(fast 모드). 프롬프트: `the traveler's teal scarf and hood flutter gently in the wind, laundry sways, slow dolly-in`
- [ ] 아래 기준으로 비교해서 하나를 고른다.
  - 움직일 때 픽셀이 지글거리거나 녹지 않는가
  - 4초 동안 얼굴, 후드, 스카프가 유지되는가
  - 같은 이미지를 L2 스케치로 바꿨을 때(GPT에 "같은 그림을 흑연 스케치로" 요청) 자연스러운가
- [ ] 결과와 이유를 `video/docs/decisions.md`에 한 줄로 적는다.

### T2: 스타일 블록 확정 (GPT, 11/5)

**만들 것:** `00_brief/style-block.md`. 모든 영상 프롬프트 맨 앞에 붙이는 영어 문단이다.

- [x] 아래 틀의 `[화풍]`을 T1에서 고른 문장으로 채운다. 나머지 문장은 그대로 둔다.

```
[화풍]. A quiet rural village in a world made of warm paper and ink.
Character consistency: keep @hero exactly as in the reference — cream hooded cloak, teal scarf, same face, proportions and silhouette in every shot.
Light: soft late-afternoon sunlight, warm ivory highlights, lavender-grey shadows.
Motion: hair, hood, scarf, laundry and chimney smoke always move gently; nothing freezes.
Camera: simple and steady — static, slow dolly-in, slow pan, wide, close-up only.
No text, no letters, no logos, no watermark, no channel bug in any corner.
```

- [x] L2와 L3용 꼬리 문장 두 개를 같은 파일에 적는다.
  - L2: `Everything is drawn as an unfinished sketch: warm ivory paper, confident graphite contours, sparse diagonal hatching, no color.`
  - L3: `Near-monochrome: dense ink #221C18 bleeding through paper, almost no light.`

### T3: 주인공 시트 (사용자 + GPT, 11/6)

**입력:** T1에서 고른 이미지, 스프라이트 F01.png
**만들 것:** `01_refs/characters/ref-hero-turnaround_v1.png`(정면·측면·뒷면·걷기 4칸), `ref-hero-faces_v1.png`(평온·놀람·두려움 3칸), `ref-hero-ink_v1.png`(잉크 몸 버전 정면·측면)

- [x] 4칸 시트를 만든다. 프롬프트 핵심: `character turnaround sheet, 4 panels in one row: front, side, back, walking — same character, plain off-white background, full body, 16:9`
- [x] 표정 및 각성 후 정면·측면을 준비한다. 사용자는 11/5 반짝임 없는 각성 후 표현을 선택했다. 기존 F01 기반 방향 시트의 정면·측면을 참고하고 유광 잉크 시안은 채택하지 않는다. 각성 전 사람 시트는 사용자 제공 원본을 기준으로 별도 제작했다.
- [x] 검수: 후드 모양, 스카프 색, 키 비율, 글자 유무를 확인한다. 각성 전후 시트의 옷·신발 차이는 후속 제작 때 원본과 대조한다.

### T4: 장소 시트 (사용자 + GPT, 11/6~7)

**만들 것:** `01_refs/locations/loc-<이름>-L1_v1.png`, `loc-<이름>-L2_v1.png`. 이름은 `road`(시골 길), `entrance`(마을 어귀), `well`(우물 광장), `horizon`(지평선) 4곳이다.

- [x] L1을 먼저 만든다(사람 없이, 16:9). 참고 시안은 각 장소 L1 v2.
- [x] 각 L1을 첨부하고 "같은 구도·같은 건물 그대로, T2의 L2 문장 스타일로"라고 요청해 L2를 만든다. 참고 시안은 L2 v3.
- [ ] 검수: L1과 L2의 건물 위치와 지붕 모양이 겹쳐 놓았을 때 맞는지 확인한다(끊김이 같은 자리에서 일어나야 하므로). 정지 시안에서 일부 선이 일치하지 않아 실제 영상·편집 단계에서 검수 및 보완한다.

### T5: 잉크 형체 (사용자 + GPT, 11/7)

**만들 것:** `01_refs/ink/ink-I1_v1.png`~`ink-I5_v1.png`(위 표의 I1~I5), `ink-helper-hand_v1.png`(B4-C2의 거대한 잉크 손)

- [ ] I1~I3은 해당 장소의 L2 이미지를 첨부하고 같은 구도에 형체만 넣는다. 형체는 L3 문장 스타일로 한다.
- [ ] 검수: 피가 없는지, 얼굴이 무섭게 일그러지지 않았는지, 팀 몬스터와 닮지 않았는지 확인한다. "불길하지만 공포는 아님" 기준이다.

### T6: Higgsfield 등록 (사용자, 11/7)

- [x] Higgsfield에 프로젝트 `Deviant Teaser`를 만들고 폴더를 `B1`~`B5`, `OP`, `Inserts`, `Refs`, `Tests`로 만든다.
- [x] 요소를 등록한다: `@hero-human`·`@hero`(각 승인 방향·표정 2장; 미채택 잉크 몸 제외), `@road`, `@entrance`, `@well`, `@horizon`(각 L1·L2), `@inkhand`
- [x] 크레딧 잔액을 `video/docs/STATUS.md`에 적는다(작업 기록에도 적는다).

완료: 2026-11-06. 등록 목록은 `../../work/teaser/00_brief/T6-registration.md`.

### T7: 컷표 확정 (GPT, 11/8)

**만들 것:** `02_storyboard/shotlist.md`

- [x] 위 컷표 초안을 복사해 컷마다 `시작 프레임`, `끝 프레임` 열을 채운다. 앞 컷의 끝 프레임과 다음 컷의 시작 프레임이 맞물려야 한다.
- [x] 끊김 열의 시간은 바꿔도 되지만 길이 규칙(0.5초 이하, I4만 1.0초)은 지킨다.
- [x] 단편 합계가 75~90초, 오프닝 사용 컷이 40~55초인지 확인한다.

작성·수치 검수: 2026-11-06. 사용자 연출 검토 대기. 최신 컷표는 `../../work/teaser/02_storyboard/shotlist.md`이며 위 기존 초안은 구안이다. T8은 아직 시작하지 않았다.

### T8: 콘티 이미지 (사용자 + GPT, 11/8)

**만들 것:** `02_storyboard/board-B1_v1.png`~`board-B5_v1.png`, `board-OP_v1.png`

- [ ] 블록마다 컷 수만큼 칸이 있는 콘티 한 장을 만든다. 거친 스케치 톤이면 충분하다. 장면 안에 글자는 넣지 않고, 칸 번호는 파일 설명에만 적는다.
- [ ] 콘티를 보고 구도가 이상한 컷은 T7 컷표를 고친다.

### T9: 영상 생성 (사용자 + GPT, 11/9~12)

**입력:** style-block.md, shotlist.md, 등록 요소, 콘티
**만들 것:** `03_prompts/G01.md`~`G09.md`, `I1.md`~`I5.md`, `04_renders/<ID>_v<번호>.mp4`

- [ ] 생성 단위마다 프롬프트 파일을 쓴다. 형식은 다음과 같다.
  1. 첫 줄: 레퍼런스 선언(예: `The FIRST reference image is @hero. The SECOND is @well (L1).`)
  2. 스타일 블록(+ 필요하면 L2/L3 꼬리)
  3. 컷별 타임스탬프. 예: `(0-5s) static wide: ... (5-9s) slow pan right: ...`
- [ ] 위 '생성 순서'대로 만든다. 먼저 fast 모드로 1~2번 시험하고, 마음에 들면 같은 프롬프트로 1080p std로 뽑는다.
- [ ] 결함이 있으면 다시 만들기 전에 잘라 내서 쓸 수 있는지 먼저 본다(잘라 쓰기는 크레딧이 들지 않음).
- [ ] 각 채택본 검수 기준:
  - 주인공 외형이 시트와 같은가
  - 픽셀이 녹지 않는가
  - 글자나 워터마크가 없는가
  - 컷 경계가 컷표의 초와 ±0.5초 안인가
- [ ] 생성 단위 하나가 끝날 때마다 `04_renders/`에 내려받고, 채택본 이름을 `shotlist.md`에 적는다.
- [ ] 크레딧이 1,500 아래로 내려가면 남은 생성 순서를 Claude와 다시 정한다.

### T10: 소리 (사용자 + GPT, 11/10~11)

**만들 것:** `05_sound/music-peace_v1.wav`(Suno, 60~90초), `music-drone_v1.wav`(Suno, 30초), 효과음 `sfx-paper-scratch_v1`, `sfx-paper-tear_v1`, `sfx-ink-bleed_v1`, `sfx-low-boom_v1`(Higgsfield, 각 1~3초)

- [ ] Suno 평화 테마: `gentle acoustic folk, music box and soft strings, warm and nostalgic, slow 80 bpm, instrumental, no vocals`
- [ ] Suno 울림: `dark ambient drone, low cello and distant choir pad, ominous but not horror, instrumental`
- [ ] 효과음 4개를 Higgsfield에서 만든다. 먼저 T9에서 소리 켬으로 생성한 클립(특히 I5, OP-C1)에 쓸 만한 소리가 있는지 보고, 없으면 Higgsfield의 효과음·오디오 생성으로 만든다.
- [ ] 쓴 요금제가 상업 이용을 허용하는지 확인하고 `05_sound/LICENSE.md`에 도구, 요금제 이름, 날짜를 적는다.

### T11: 편집 (사용자 + GPT, 11/12~13)

**입력:** `04_renders/` 채택본, `05_sound/`, `shotlist.md`
**만들 것:** `06_edit/edit-notes.md`(편집 도구, 컷 순서, 끊김 위치를 적은 표), `07_exports/review-short_v1.mp4`, `review-opening_v1.mp4`(검토본)

- [ ] 편집 도구를 정하고 `06_edit/edit-notes.md` 첫 줄에 적는다.
- [ ] 모든 클립을 1920×1080, 24fps로 맞춘 뒤 `shotlist.md` 순서대로 놓는다.
- [ ] 끊김 하나의 순서를 지킨다: L1 → L2 2프레임 → L3(삽입 영상) n프레임 → L2 1프레임 → L1.
  - L2 프레임은 바로 앞 L1 컷에서 한 장을 캡처한 뒤 GPT로 같은 그림을 흑연 스케치로 바꿔서 만든다.
  - 끊김 동안 음악과 환경음을 끄고 `sfx-paper-scratch`만 남긴다.
- [ ] 제목 `DEVIANT`는 편집에서 올린다. 생성 이미지 안에 넣지 않는다.
- [ ] `edit-notes.md`에 컷마다 실제 사용한 파일, 들어간 시간(시작~끝), 끊김 위치를 표로 남긴다. Claude가 검토할 때 이 표를 본다.
- [ ] 검토본 두 편을 내보낸다.

### T12: 최종 내보내기와 발표장 확인 (사용자 + GPT, 11/14)

- [ ] 최종본을 만든다: `07_exports/Deviant_Teaser_Short_v1.mp4`, `Deviant_Teaser_Opening_v1.mp4`(1080p, 24fps, H.264, AAC, -14 LUFS 근처)
- [ ] Higgsfield에서 남은 시험본까지 모두 내려받았는지 확인한다(11/15 만료).
- [ ] 발표에 쓸 노트북에서 두 파일을 전체 화면으로 재생해 소리와 화질을 확인한다.

### T13: Claude 검토와 commit (Claude, 요청할 때 + 11/13)

**입력:** `video/docs/log/`, `decisions.md`, `STATUS.md`, `shotlist.md`, `06_edit/edit-notes.md`, 검토본

- [ ] 검토를 요청받으면 기록과 파일을 읽고 아래를 확인해 결과를 알려 준다.
  - 설계와 어긋난 점(톤, 끊김 길이 규칙, 공포로 넘어감, 글자·워터마크)
  - 컷표와 실제 편집의 차이
  - 기록이 빠진 작업
  - 남은 크레딧과 일정 위험
- [ ] 11/13 검토본이 나오면 한 번 전체 검토를 한다.
- [ ] 채택본과 문서만 commit한다(사용자 승인 후, 기존 bundle 방식). 시험본과 탈락본은 로컬에만 둔다.
