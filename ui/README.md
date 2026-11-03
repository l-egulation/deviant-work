# Deviant UI 디자인

게임의 화면 흐름, 정보 구조, 배치를 설계합니다. 와이어프레임은 테마를 입히기 전 **기능·배치 정리용 임시본**이며, 테마는 GPT 쪽에서 따로 작업합니다. 게임 기준은 팀 레포(`S15P31F109`)입니다.

**먼저 볼 것:** [STATUS](docs/STATUS.md) — 지금 상태와 다음 할 일

## 테마

- [전투 HUD 테마 기준 초안](work/theme/hud-theme-guide.md): 색상·프레임·아이콘·쿨타임과 검토할 상태.

## 피그마

- [사용자 흐름 FigJam](https://www.figma.com/board/nHfGBYZsYIcHNUD9SU4cGs/?node-id=100-1706): 「현행 · 사용자 흐름 v2」 섹션(0 전체 흐름, ①~⑤ 상세)이 기준이고, 「보관 · 이전 버전」에 v1, v0을 버전별로 남겼다. 원본 표는 [화면 목록](work/flows/flow-inventory.md)
- [와이어프레임](https://www.figma.com/design/qjL5PNYHPgTDQ0huZXBzLg): 화면 01~51. 화면별 상태는 [작업 기록](docs/log/2026-11-03.md#점검에서-확인한-피그마-상태)
- [결과 화면 4상태](https://www.figma.com/design/qjL5PNYHPgTDQ0huZXBzLg/?node-id=74-75): 사망·런 완료 × 기본·신규 해금

## 폴더

| 위치 | 내용 |
|---|---|
| `docs/STATUS.md` | 지금 상태, 다음 할 일 |
| `docs/decisions.md` | 정한 것과 이유 (팀 기준과 다른 이전 결정은 "구안") |
| `docs/handoff.md` | 다른 세션·도구가 이어받을 때 읽는 맥락 |
| `docs/log/` | 날짜별 작업 기록 |
| `docs/specs/`, `docs/plans/` | 설계·작업 계획 |
| `work/flows/` | 흐름도 원본 표 ([화면 목록](work/flows/flow-inventory.md)) |
| `work/specs-screens/` | 화면별 정보 구조 ([결과 화면](work/specs-screens/result-screens.md)) |
| `work/reference/` | 참고 시연 ([팔레트 제작소 HTML](work/reference/ink-palette-forge.html), 일부 이미지 없음) |
| `work/reviews/` | 화면 검토 기록 |
| `archive/` | 이전안 ([목록](archive/README.md)) |

문서 양식과 갱신 규칙은 [문서 작성 규칙](../docs/conventions.md)을 따릅니다.
