# Deviant 영상

Deviant의 시네마틱 티저, 홍보 영상 작업 공간입니다. 지금 작업은 게임 화면 없이 만드는 시네마틱 티저 두 편(단편 약 80초, 발표 오프닝 약 45초)입니다.

**먼저 볼 것:** [STATUS](docs/STATUS.md) — 지금 상태와 다음 할 일

## 기준

- 설계: [시네마틱 티저 설계](docs/specs/2026-11-04-cinematic-teaser-design.md)
- 작업 계획(작업 기록 양식 포함): [시네마틱 티저 계획](docs/plans/2026-11-04-cinematic-teaser-plan.md)
- 세계관과 주인공은 팀 레포(`S15P31F109`)를 따릅니다. 이 폴더는 팀 레포를 고치지 않습니다.

## 폴더

| 위치 | 내용 |
|---|---|
| `docs/` | STATUS, 결정 기록, 인수인계, 날짜별 기록, 설계·계획 |
| `work/teaser/00_brief/` | 스타일 블록 등 브리프 |
| `work/teaser/01_refs/` | 기준 이미지: `characters/`, `locations/`, `ink/`, 화풍 시험 `test/` |
| `work/teaser/02_storyboard/` | 컷표(`shotlist.md`), 콘티 이미지 |
| `work/teaser/03_prompts/` | 생성 단위별 영상 프롬프트(G01~G09, I1~I5) |
| `work/teaser/04_renders/` | Higgsfield 생성본 중 채택본 |
| `work/teaser/05_sound/` | 음악(Suno), 효과음(Higgsfield), 사용 권리 기록 |
| `work/teaser/06_edit/` | 편집 노트(`edit-notes.md`) |
| `work/teaser/07_exports/` | 검토본, 최종본 |
| `archive/` | 이전안 보관 |

## 파일 원칙

- `video/`의 이미지(png, jpg, webp, gif), 음원(wav, mp3, m4a), 영상(mp4, mov)은 Git LFS로 올라갑니다.
- 채택본만 올리고, 시험본과 탈락본은 로컬에만 둡니다(LFS 용량 절약).
- 파일 이름은 `<ID>_v<번호>.<확장자>`입니다(예: `G03_v2.mp4`). ID는 계획의 컷표를 따릅니다.
- 이 레포는 공개 상태입니다. 아직 공개하면 안 되는 영상은 올리기 전에 확인합니다.
- 문서 양식은 [문서 작성 규칙](../docs/conventions.md)을 따릅니다.
