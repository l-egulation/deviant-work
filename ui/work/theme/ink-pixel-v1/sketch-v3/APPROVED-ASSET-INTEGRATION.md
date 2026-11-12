# 승인 에셋 적용

- 잉크병: ui-assets-v2/atlases/ink-bottles-v4.png 직접 참조. 효과/조건 문양은 ui-assets-v1/atlases/ink-symbols.png 별도 레이어.
- 무기: ui-assets-v2/atlases/weapons.png 직접 참조. SVG는 아틀라스 표시 영역만 지정하며 그림을 재생성하지 않음.
- 팔레트: 기존 palette-package-v6/source/bases + source/paint + 효과 문양. 슬롯색과 잉크색은 독립.
- 가방·제작·장비에 공통 렌더링 함수 적용. 비교용 신규 팔레트는 사용하지 않음.
- 1920×1080 브라우저에서 직접 렌더링해 previews/*-approved.png 저장. 캡처에는 사용자가 제공한 로컬 폰트를 메모리에만 로드(배포 파일 추가 없음).
- 세 화면 이미지 경로 누락 없음. 제작 하단 버튼 잘림 수정. 기존 예시 효과/명칭은 유지하며 전체 최신 데이터 이관과 별개인 아트 적용 작업.
- Unity 미적용.
