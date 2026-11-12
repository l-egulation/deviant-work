> 최신 기준은 [현행 UI 명세](../CURRENT-UI-SPEC.md). 이 문서의 과거 수치·예시·남은 검수 기록보다 우선합니다.

# 승인 에셋 적용

- 잉크병: ui-assets-v2/atlases/ink-bottles-v4.png 직접 참조. 효과/조건 문양은 ui-assets-v1/atlases/ink-symbols.png 별도 레이어.
- 무기: ui-assets-v2/atlases/weapons.png 직접 참조. SVG는 아틀라스 표시 영역만 지정하며 그림을 재생성하지 않음.
- 팔레트: 기존 palette-package-v6/source/bases + source/paint + 효과 문양. 슬롯색과 잉크색은 독립.
- 가방·제작·장비에 공통 렌더링 함수 적용. 비교용 신규 팔레트는 사용하지 않음.
- 1920×1080 브라우저에서 직접 렌더링해 previews/*-approved.png 저장. 캡처에는 사용자가 제공한 로컬 폰트를 메모리에만 로드(배포 파일 추가 없음).
- 세 화면 이미지 경로 누락 없음. 제작 하단 버튼 잘림 수정. 기존 예시 효과/명칭은 유지하며 전체 최신 데이터 이관과 별개인 아트 적용 작업.
- Unity 미적용.

## 전체 UI 반영 및 입력 수정
- 보상·상점·첫 제작 안내에도 공통 무기·잉크 렌더러 사용.
- 우물/색 복원: 마을 잉크, 기록 수첩: 새 삽화, 잠긴 상자: 새 닫힘/열림 PNG 적용.
- 증강 3개 예시에는 승인된 증강 아틀라스 일러스트를 적용. 예시 문구는 기존 화면 유지이며 최신 증강 데이터 전체 대응 작업과 구분.
- F 표시는 현재 버튼 또는 선택 항목에 대응하는 실행 버튼 1개에 표시. 비활성 버튼 제외.
- KeyboardEvent.code 우선 사용으로 한글 입력 상태 KeyF/KeyQ/KeyE 대응. 설명 스크롤 KeyW/KeyS.
- 갤러리 직접 조작 진입 시 iframe에 입력 포커스 전달.
- 브라우저 키 이벤트 검증: key=ㄹ/code=KeyF → 잉크 적용, key=ㄴ/code=KeyS → 설명 scrollTop 260, key=ㅈ/code=KeyW → scrollTop 0.
- 설정의 키 재지정 입력은 실제 입력 기록 동작을 유지. 메뉴 실행 F/G는 물리키 대응.
