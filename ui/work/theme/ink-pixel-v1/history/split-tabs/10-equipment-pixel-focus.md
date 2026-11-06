# 픽셀 에셋 적용 시안

내장 이미지 생성 도구 사용. 최종 게임 에셋이 아닌 스타일 검토용 생성 시안.

- 현재 보유 잉크 선택에만 회청색 획 사용. 탭·무기는 명도 차이로 문맥 표시.
- 무기·도장·잉크병을 픽셀 표현으로 교체. 원형 팔레트 아래 강화 수치 유지.
- 배경은 이전 승인 시안의 마을 이미지를 참고했으며 Unity 재캡처는 아님.
- 검토점: 팔레트 테두리가 다소 두껍고 첫 슬롯의 밝은 테두리가 현재 포커스와 경쟁할 수 있음. 아이콘 형태와 테두리 두께는 최종 에셋화 시 조정.
- 게임·Figma 구현 및 원격 업로드 없음.

## 생성 프롬프트

Use case: ui-mockup, style-transfer. Create ONE polished 16:9 Deviant EQUIPMENT menu mockup.
INPUT1 is layout master, retain its open unboxed two-column arrangement and all content positions.
INPUT2 is visual asset/world style ONLY: match its crisp chunky pixel squat ink jars, flat gray screw lids, cream labels with distinct black effect pictograms, pixel sword and hammer, dim sketch village and hooded teal scarf character. Do NOT copy input2 layout, brackets, crowded prose, inventory structure.
Background: input2 sketch village full screen, neutral charcoal veil, background barely visible. Same smooth readable Korean sans text as input1, not pixel font. Modest cream lettering. UI centered with about7% margins. NO enclosing panels, rectangular cards, lines boxing sections, gold, Asian calligraphy, neon, oversized assets.
TOP tabs '가방   장비'. 장비 bright cream semibold WITHOUT colored underline; 가방 muted gray. top right 'I 닫기'.
LEFT upper: small crisp pixel sword beside '기본검', small pixel hammer beside '기본망치'. Same size, sword bright and hammer muted. NO colored underline on either. Below retain rows '무기 도장 —' and '특수 도장 —'. Replace generic diamond/star with small pixel engraved stamp emblems: blade impression for weapon stamp, burst impression for special stamp, monochrome muted empty status icons, NOT equipped objects. Keep em dash clearly signifying none.
LEFT lower '팔레트', exactly FIVE compact independent ROUND pixel-edged recessed wells (not square tiles), no giant palette object. Each ~60px diameter at1920 width. Red with double-slash effect, blue target effect, blue three-slash effect, yellow boot effect, green apple effect. Sharp handcrafted pixel art matching jars, subtle recessed rim, avoid realistic shading. All enhancement '+0' centered BELOW circles, readable gap. First well softly ivory rim to retain destination context but NO blue selection marker. Others subdued rims. No duplicate small colored dots above.
RIGHT upper keep current effect: '현재 장착 · 덧칠', '1번 칸 · 빨강 · 강화 +0', '적중 시 원래 피해의 20% 추가 타격', '재발동 간격 0.25초'.
RIGHT middle '보유 잉크', three compact red pixel ink jars matching input2 squat graylid design. Distinct cream labels: focused first jar crosshair repeated-strike mark, second double slash, third flame. Same color different effects. First jar tiny cream grade badge III. Other bottles less bright. ONLY ONE strong selection indicator on entire screen: muted dustyblue #6E9EAC short chunky flat marker swash under FIRST jar, slightly angled clipped ends, NO box/cornerbrackets/glow; first bottle brighter than other two. Marker must not obscure bottle.
RIGHT lower '선택한 잉크 · 집중 공격', '3등급', '같은 적 연속 적중 시 피해 +4%', '최대 5중첩 · +20%', '다른 적 공격 또는 2초 미적중 시 초기화'. Keep right details clear, size like input1.
Bottom 'F 교체 확정    Esc 이전 단계'. Remove '구조 검토용'.
Pixel assets sharply defined limited colors deliberate chunky clusters, not blurred raster repaint. Clean restrained pencil-game identity through background and tiny texture only. Only focused jar gets blue marker, contextual tab/weapon use brightness not competing colored marks. Do not invent new UI or mechanics.

