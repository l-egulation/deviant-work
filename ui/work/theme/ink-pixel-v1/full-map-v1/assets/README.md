# 지도 PNG 에셋 v1

기본 내장 이미지 생성 도구로 제작. 투명 RGBA 원본 5종을 각각 별도 파일로 저장했다.
- player.png: 아이보리 후드·검은 얼굴·청록 목도리
- workshop.png: 모루와 망치
- boss.png: 뿔 달린 작은 두개골
- portal.png: 중앙이 비어 있는 공용 포탈 고리. 1/2 숫자는 UI에서 별도 합성
- unknown.png: 굵은 픽셀 물음표

공통 프롬프트: Create ONE production game minimap icon, transparent background, centered with just 8% transparent padding. Large coarse pixel art, looks like a native 32x32 sprite enlarged nearest neighbor, hard square pixels, 3 tone flat palette, thick dark graphite outline, no gradients, no blur, no text, no glow, no shadow outside icon, no decorative border. For Deviant hand sketched pixel platformer, simple instantly readable at 24px, ivory and cool gray hand-inked silhouette.

개별 프롬프트:
1. Small front-facing ivory hood with a dark face and two tiny pale eyes, tiny teal scarf beneath hood. Just head and scarf, not full body.
2. A compact ivory anvil silhouette with a small diagonal hammer above it. Very simple solid iconic silhouette, no tiny details.
3. A squat ivory monster skull with two short horns and two large dark eye sockets. Menacing but charming, no teeth details.
4. An upright oval ring of pale ivory ink with coarse irregular pixel edge, empty fully transparent center, slightly flattened bottom. Enough blank center for a number to be composited later.
5. An ivory question mark made from thick coarse pixel ink strokes, slightly organic stepped silhouette, separate large square dot. Absolutely no enclosing panel.

생성 결과는 고해상도 PNG이며 실제 고정 32×32 그리드 결과가 아니다. UI에서 작은 크기와 pixelated 표시로 검토한다. Unity 적용 전 정수 그리드 정리/임포트 크기 확정이 필요하다. 이미지 원본 자체를 임의 재그림/리샘플링하지 않았다.
