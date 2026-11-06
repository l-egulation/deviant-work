# 효과 문양 54종 — 1차 제작본

승인된 palette-package-v6 위에 별도 문양을 얹는다. Unity 미적용.

[빨강](previews/red.png) · [노랑](previews/yellow.png) · [초록](previews/green.png) · [파랑](previews/blue.png) · [보라](previews/purple.png)

runtime에는 아이템 ID별 투명 PNG 54개가 있다. 모두 220×155, pivot 중앙, 슬롯과 같은 크기·위치로 겹친다. 픽셀 원본은 pixel-source 및 pixel-grids.json. 기존 문양 31개를 활용하고 신규 23개를 제작했다. manifest.json은 UI에 필요한 ID·이름·색상·문양·경로·검토 상태만 담는다. 팀 게임 규칙 원본은 포함하지 않는다.

검증: ID 54개에 PNG 54개 대응, 동일한 래스터 문양 중복 없음, 5개 색상 합성판 육안 확인.

검토 한계: 기존 파랑 난무·공명 등은 시간 단축 의미가 약하다. 기존 격자와 신규 격자의 굵기·디테일 통일, 실제 작은 크기에서 보호막·회복·표식 계열 구분 검증이 남았다. 따라서 최종 승인본이 아닌 1차 제작 세트다.
