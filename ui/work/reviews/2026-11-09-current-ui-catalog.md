# 현행 UI 테마 제작 목록 — 2026-11-09 갱신

시안 제작과 Unity 구현을 구분한다. 아래 목록은 로컬 산출물 및 이번 대화의 승인/수정 이력을 대조했다. Figma/ FigJam은 이번에 다시 조회하지 않았으며 미제작 목록은 기존 흐름도 대조 보고서의 범위를 계승한다. 전체 게임 기능이 구현됐다는 뜻이 아니다.

[시각 목록](../theme/ink-pixel-v1/catalog.html)

## 현행 대표 시안
| 화면 | 현행 파일 | 준비된 내용 | 남은 보완 |
|---|---|---|---|
| 가방 | [screen-set-v6](../theme/ink-pixel-v1/screen-set-v6/index.html) | 잉크 목록·선택 상세, 확대 | 공용 5→15칸 규칙과 구 분류별 표기 정리 필요 |
| 장비 | [screen-set-v6](../theme/ink-pixel-v1/screen-set-v6/index.html) | 무기/스킬 설명, 팔레트 탐색 | 무기별 독립 장착 상태·실제 가방 교환은 미구현 |
| 장비 잉크 교체 | [screen-set-v6](../theme/ink-pixel-v1/screen-set-v6/index.html) | 실행 버튼·완료 표시 | HTML 시안 상태만 변경 |
| 정비소 성장 | [maintenance-growth-v2](../theme/ink-pixel-v1/maintenance-growth-v2/index.html) | 캐릭터 공격 강화 | 증가량/상한 미확정, +5% 예시 |
| 정비소 칸 강화 | [maintenance-palette-v1](../theme/ink-pixel-v1/maintenance-palette-v1/index.html) | 현재→강화 후·비용·선택 확대 | 최대/부족 대표 이미지 추가 필요 |
| 정비소 칸 색 변경 | [maintenance-palette-v1](../theme/ink-pixel-v1/maintenance-palette-v1/index.html) | 무작위 빈 칸·잉크 반환·가방 포화 차단 | 같은 색 재추첨/무색 포함/빈칸 허용 미정 |
| 정비소 무기 스탬프 | [maintenance-stamp-v1](../theme/ink-pixel-v1/maintenance-stamp-v1/index.html) | 아이콘·전후 비교·동일/호환불가 비활성 | 발사기 예시 및 실제 완료 상태 미제작 |
| 정비소 스킬 스탬프 | [maintenance-stamp-v1](../theme/ink-pixel-v1/maintenance-stamp-v1/index.html) | 이동·범위·후속타, 비용·소멸 안내 | 아이콘 최종 픽셀 정리 필요 |
| 잉크 판매대 | [ink-shop-v1](../theme/ink-pixel-v1/ink-shop-v1/index.html) | 진열·구매·완료·포화·부족 | 실제 가방 이동/복귀는 미구현 |

## 이전 버전 — 현행으로 사용하지 않기
- maintenance-set-v1: 과거 성장/랜덤 뽑기. 성장=maintenance-growth-v2, 뽑기=ink-shop-v1로 대체.
- screen-set-v1~v5 및 assembly-v1: 비교/에셋 출처. 현행 대표는 screen-set-v6.
- screen-set-v6/previews/equipment-weapon-stamp.png, equipment-skill-stamp.png: 개별 스탬프 선택의 옛 구조. 현행은 무기 선택 통합 설명.
- maintenance-palette-v1의 과거 color-change.html, 보유 잉크 기반 색변경 이미지들: 폐기된 흐름. 현행 unified-color.png는 무작위 빈칸/기존 잉크 반환.
- 기존 제작 보고서의 '정비소 다음 제작' 문구는 이 목록으로 대체. 과거 파일은 삭제하지 않음.

## 아직 현행 테마 대표 화면이 없는 묶음
| 묶음 | 상태 | 권장 순서 |
|---|---|---|
| 전체 지도·일시정지 | 기존 와이어 기록 있음, 현행 테마 시안 미제작 | 1 |
| 일반/보스 HUD·획득/상호작용 안내 | 과거 테마 탐색 있음, 최신 기능과 재대조 필요 | 2 |
| 출발 팔레트·리롤 | 와이어 기록 있음, 비용/횟수/3~5칸 상태 필요 | 3 |
| 보스 잉크 제단 | 색 선택→잉크 후보 선택, 첫/재클리어 분기 검증 필요 | 4 |
| 사망·클리어·신규 해금 결과 | 과거 와이어, 현행 정보/테마 미적용 | 5 |
| 마을 보급소·염색공방·회수공방·출발 준비 | 과거 와이어/테마 탐색, 현재 테마 통일 필요 | 6 |
| 타이틀·설정·제작진·대사/튜토리얼 | 이전 설계 있음, 현행 범위/테마 미확정 | 7 |
| 포탈·충전소·도전방·열쇠/잠긴상자 안내 | 기존 흐름도 검토에서 누락 표시 | HUD 작업 때 묶어서 확인 |

## 다음 작업 제안
전체 지도와 일시정지를 한 묶음으로 제작. 첫 시안은 전체 지도: 현재 위치/방 연결/방문 여부/시설·보스·포탈/범례/닫기. 기존 미니맵과 같은 기호를 사용하되 장식선이 길로 보이지 않게 한다. 기능과 마커 목록은 제작 전에 최신 팀 문서·와이어를 대조한다. 이후 일시정지의 복귀/설정/나가기와 나가기 확인 상태를 구성한다. 이번에는 목록 정리만 수행하며 새 화면 제작은 시작하지 않았다.

## Unity 이전 공통 보완
가방 공용 용량, 정지/피격닫힘 정책, 버리기/파괴 입력은 담당 기준과 재대조. 미확정 성장 수치 및 랜덤 색 후보 정책을 확정. 키보드 포커스/취소 복귀/장문/960×540/비활성·완료 검증, 최종 아이콘 알파·해상도·피벗·출처를 별도 점검. 가방/스탬프 HTML의 실제 재화/인벤토리 거래는 구현 완료가 아님.
