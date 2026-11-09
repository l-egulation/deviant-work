> 사용자 미채택: CSS 도형 표현이 기존 테마와 달라 v2로 재작업. 비교용 보관.

# 전투 HUD · 간결형 테마 시안

Unity 미적용. 저장소의 배경 캡처 위에 실제 UI 에셋을 HTML로 조립한 시안. 새로운 게임 실행 캡처가 아니다.

## 근거
- Figma qjL5PNYHPgTDQ0huZXBzLg / ② 챕터 탐험 (960), v2 HUD 기본 121:75를 메타데이터·디자인 컨텍스트·이미지로 확인.
- 팀 docs/development/combat-hud-approved.md, docs/design/ui-and-interaction.md 로컬 최신 파일을 확인. 원격 pull 및 Unity 실행은 하지 않았다.
- 사용자는 원형 확장 HUD보다 Figma의 간결한 배치와 키 안내 생략을 요청했다. 체력 좌상단, 재화/미니맵 우상단, 두 무기의 기본공격/스킬 좌하단을 유지.

## 화면
- index.html: 밝은 배경 기본
- ?scene=dark: 어두운 배경 대비
- ?state=pickup: 중앙 위 획득 알림
- ?state=boss: 보스 체력/단계. 가방·재화·미니맵 숨김은 Figma 보스방 배치 채택. 실제 보스전 캡처가 아닌 어두운 배경 비교.

## 재사용 에셋
- currency-v1/assets/gold.png, magic-pigment-v2.png: 확정 재화 PNG 그대로.
- weapon-ink-v8/runtime/base_sword.png, launcher.png: 승인 무기.
- maintenance-stamp-v1/assets/skill-range.png, skill-followup.png: 범위/후속타 유형 아이콘. 개별 스킬 전용 아이콘은 아직 없으므로 유형 아이콘을 시안에 사용. 실제 장착 스킬과 연결된 것으로 보지 않는다.
- full-map-v1/assets/player.png: 현재 위치.
- assets/stage1.png, stage2.png: 팀 resources/environments/maintenance-shops/preview/references/stage1-actual.png, stage2-actual.png의 변경 없는 사본.

## 의도적 차이와 한계
- 팀 채택본 원형 무기·스킬, 팔레트 줄, 키캡 대신 간결형 분리 칸. 팔레트는 이번 시안에서 생략; 제품 제거 확정 아님.
- 무기명 대신 기본 공격/스킬 작은 역할 라벨, 무기 1/2 번호. 상시 키 안내 없음.
- 내부 장식선 없이 흑연 바탕·계단 모서리. 프레임/하트/미니맵 지형은 CSS·벡터 시안이며 신규 PNG 제작 완료를 뜻하지 않는다.
- 미니맵은 배치용 도식으로 실제 지형·현재 위치와 연동되지 않는다.
- 수치·보스 단계·장착 조합은 예시. 스킬 클릭 시 6초 회색 덮개와 남은 초 시연. 실제 스킬별 차징·사용 횟수·쿨타임 수치 미연동.
- 가방/지도/일시정지 링크는 기존 프로토타입으로 연결. 실제 게임 입력/정지 동작은 구현하지 않음.
- 1920×1080 이미지 4장, 모든 이미지 로드/폰트/쿨타임 진행 검증. 실제 게임 플레이와 패드 검증은 별개.
