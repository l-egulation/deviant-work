# deviant-work 레포 구조·문서 체계 개편 설계

작성: 2026-11-03 · 상태: **승인됨 (2026-11-03)**
대상: `https://github.com/l-egulation/deviant-work.git` (개인 작업 레포)
팀 레포 기준: `S15P31F109` main `d4786611` (2026-11-03)

## 1. 의도와 이유

개인 레포는 UI·에셋·스토리 작업을 두 기기(교육장 갤럭시북 Windows, 집 맥북)에서 이어 가기 위한 공간이다. 지금은 다음 문제가 있다.

- 브랜치 3개가 각자 루트 README를 따로 고쳐서 내용이 서로 다르다.
- 지금 상태, 결정, 작업 기록을 남기는 문서가 없어 기기·세션이 바뀔 때마다 맥락을 다시 찾아야 한다.
- 최신본과 이전안·폐기 설정이 같은 폴더에 섞여 있다.
- 팀 레포 기준이 하루 단위로 바뀌는데, 어떤 기준으로 판단했는지 기록이 없다.
- 큰 이미지가 계속 Git 기록에 쌓이고, Windows에서 줄바꿈 차이 때문에 가짜 "수정됨"이 생긴다.

목표: 어느 기기·세션에서든 **분야 폴더의 STATUS 한 장만 열면 지금 상태와 다음 할 일을 알 수 있게** 한다.

## 2. 목표 / 비목표 / 피해야 할 것

**목표**

- main은 공통 입구, 브랜치 3개는 각자 분야 폴더 안에서만 작업
- 분야마다 STATUS, 날짜별 작업 기록, 결정 기록, 인수인계, 설계·계획 문서
- 이전안·폐기 설정은 지우지 않고 `archive/`로 분리
- 앞으로 올리는 큰 바이너리는 Git LFS로
- 나중에 브랜치를 main에 합쳐도 충돌하지 않는 경로

**비목표**

- 팀 레포(S15P31F109) 수정. 읽기 전용이다.
- 기존 147MB 기록을 LFS로 옮기는 작업(기록 재작성·강제 push 안 함)
- 이번 개편에서 UI·에셋·스토리 내용 자체를 고치는 것. 내용 작업은 개편 뒤 별도 계획으로 한다.
- 피그마 파일 정리(별도 작업)

**피해야 할 것**

- 파일 이력이 끊기는 복사·재생성 (`git mv`로 옮긴다)
- 다른 브랜치나 Codex 브랜치의 파일을 건드리는 것
- 사용자 승인 없이 commit·push 하는 것
- 중간 작업물을 삭제하는 것

## 3. 제약

- 연결된 로컬 폴더(`3rd_PJT/UI design`, `asset design`, `story`)에는 삭제 권한이 없다. Claude가 그 폴더에서 git을 실행하면 `.git`에 lock 파일이 남는다. 그래서 **git 작업은 Claude의 클라우드 작업 공간에 따로 받은 사본에서 하고**, push는 사용자 승인 뒤에 한다. 로컬 폴더 갱신(pull)은 사용자가 직접 한다.
- 기기 2대 모두 Git LFS가 설치돼 있어야 LFS 파일을 받을 수 있다.
- GitHub 무료 계정 LFS 한도: 매달 저장 10GiB, 전송 10GiB
- 레포는 공개 상태다(로그인 없이 clone 됨).

## 4. 검토한 방법

| 방법 | 내용 | 장단점 | 결과 |
|---|---|---|---|
| **A. 기존 브랜치 안에서 정리** | main에 공통 설정 → 각 브랜치에 main 병합 → 브랜치 안에서 `git mv`로 재배치 | 이력 유지, 로컬 폴더·작업 규칙 그대로. 정리 커밋이 몇 개 더 필요 | **선택** |
| B. 새 main에서 새 브랜치 3개 | 파일 복사, 기존 브랜치는 보관 | 깔끔하지만 이력 단절, 브랜치 6개, 로컬 폴더 재설정 | 기각 |
| C. 지금 main 하나로 합치기 | 브랜치 없이 폴더만 나눔 | 사용자가 분야별 브랜치를 원함 | 기각 |

사용자는 A를 골랐다. 이유: 중간 작업물과 이력을 남기고 싶고, 지금 로컬 폴더 체계를 유지하고 싶다.

## 5. 정해진 구조

### 5.1 main (공통 입구)

```
/
├─ README.md            레포 소개, 브랜치·분야 폴더 안내, 각 분야 STATUS 링크, 공통 파일 원칙
├─ .gitattributes       줄바꿈 규칙 + LFS 추적 규칙
├─ .gitignore           (기존 유지)
└─ docs/
   ├─ conventions.md    공통 규칙: 문서 양식, 기록 방식, 팀 레포 기준 표기, commit 규칙
   ├─ specs/            레포 전체에 걸친 설계 (이 문서가 첫 파일)
   └─ plans/            레포 전체에 걸친 작업 계획
```

- 루트 README는 **main에서만 고친다.** 브랜치는 main을 병합해서 받는다.
- 기존 `audio/`, `video/` README는 main에 그대로 둔다. 분야로 쓰기 시작할 때 별도로 정한다.

### 5.2 분야 브랜치와 폴더

| 브랜치 | 분야 폴더 | 로컬 폴더 | 상태 |
|---|---|---|---|
| `work/ui-design` | `ui/` | `3rd_PJT/UI design` | 진행 |
| `work/asset-design` | `assets/` | `3rd_PJT/asset design` | 진행(모션 실험) |
| `work/story-design` | `story/` | `3rd_PJT/story` | 보류 |

각 분야 폴더의 공통 틀:

```
<분야>/
├─ README.md              분야 소개, 최신본 위치, 폴더 안내
├─ docs/
│  ├─ STATUS.md           지금 상태 · 진행 중 · 다음 할 일 · 막힌 것 · 팀 레포 기준
│  ├─ decisions.md        결정 기록 (최신이 위)
│  ├─ handoff.md          인수인계 (다음 세션·다른 기기용 맥락)
│  ├─ log/YYYY-MM-DD.md   날짜별 작업 기록
│  ├─ specs/              설계 문서 YYYY-MM-DD-<주제>-design.md
│  └─ plans/              작업 계획 YYYY-MM-DD-<주제>-plan.md
├─ work/                  지금 쓰는 작업물 (분야별 하위 폴더는 아래)
└─ archive/               이전안·폐기 설정 (README에 왜 보관했는지 한 줄씩)
```

에셋 분야는 기존 이름 `assets/`를 유지한다. `tools/character-costume/`은 에셋 전용 도구라 `assets/tools/`로 옮긴다.

### 5.3 기존 파일 배치

**UI (`work/ui-design`)**

| 기존 | 새 위치 | 처리 |
|---|---|---|
| `ui/claude-handoff.md` | `ui/docs/handoff.md` | 옮기고 새 구조 기준으로 경로·링크만 갱신 |
| `ui/office-hour-decisions.md` | `ui/docs/decisions.md`의 바탕 | 옮기고, 팀 기준과 충돌하는 항목에 "구안(팀 기준과 다름)" 표시 |
| `ui/result-screens.md` | `ui/work/specs-screens/result-screens.md` | 옮기기만 (내용 수정은 이후 작업) |
| `ui/ux-flow.md` | `ui/archive/ux-flow-2026-10-27.md` | 대부분 구안이라 보관. 현행 흐름은 피그마 FigJam "현행" 섹션이 기준 |
| `ui/result-wireframes.html` | `ui/archive/` | 이전 HTML 시안 |
| `ui/ui-rebuild-plan.html` | `ui/archive/` | 브라우저 저장 작업판. 새 문서 체계로 대체 |
| `ui/reference/ink-palette-forge.html` | `ui/work/reference/` | 유지 |
| `ui/reviews/title-settings-wireframe-review.md` | `ui/work/reviews/` | 유지 |
| `ui/sources/ink-blueprint-proposal.md` | 삭제 | 팀 원본 링크로 대체 (낡은 사본) |
| `ui/README.md` | `ui/README.md` | 새 틀로 다시 씀. 피그마 링크·화면 상태표 포함 |

UI `work/` 하위: `specs-screens/`(화면별 정보 구조), `reference/`, `reviews/`. 피그마가 실제 작업물이므로 README에 피그마 링크 목록을 둔다.

**에셋 (`work/asset-design`)**

| 기존 | 새 위치 |
|---|---|
| `assets/characters/ink-hero-b/` 전체 (`basic-motion`·`pixel-design` 두건+목도리, `beret-motion`·`hat-design` 베레모) | `assets/work/characters/ink-hero-b/` (사용자 결정: 실험 중이라 작업물로 유지, 폐기가 정해지면 그때 `archive/`로) |
| `assets/characters/README.md`, `asset-manifest.json` | `assets/work/characters/`에 함께 |
| `assets/characters/ink-hero-c/` 전체 | `assets/archive/ink-hero-c/` (B안 이전 탐색. README가 이미 "이전 시안"으로 표시) |
| `assets/monsters/`, `assets/environments/` | `assets/archive/` 아래 (팀 승인본 대조 전까지 보관) |
| `tools/character-costume/` | `assets/tools/character-costume/` (내부 링크 갱신) |
| `assets/README.md` | 새 틀로 다시 씀 |

에셋 `work/` 하위: `characters/`(기존 B안), `motion-lab/`(새 모션 실험), `monsters/`, `environments/`.

> 판단 근거: 주인공은 팀 방향(후드+스카프)을 따른다. B안의 두건+목도리 작업은 같은 계열이라 이어 쓸 수 있고, 베레모 실험도 폐기가 확정되기 전까지는 작업물로 둔다(사용자 결정 2026-11-03). ink-hero-c는 B안 이전 단계라 Claude 판단으로 보관한다.

**스토리 (`work/story-design`)**

| 기존 | 새 위치 |
|---|---|
| `story/README.md`, `story/storybook.html`, `story/assets/` | `story/archive/2026-10-concept-v7/` (팀 확정본과 다른 설정. 2·3챕터 아이디어 후보로 보관) |
| — | `story/docs/STATUS.md` 상태 "보류", 다음 할 일 후보: 오프닝 ④~⑥, 2·3챕터 구상 |
| — | `story/README.md` 새로: 팀 확정 스토리 링크 + 보관본 안내 |

### 5.4 문서 양식

**STATUS.md** (분야마다 1개, 작업이 끝날 때마다 갱신, 100줄 이내 유지)

```
# <분야> STATUS
갱신: YYYY-MM-DD (기기) · 팀 레포 기준: <커밋> (YYYY-MM-DD)

## 지금 상태        한두 문장
## 진행 중          항목 · 위치 링크
## 다음 할 일       우선순위 순 3~5개
## 막힌 것·확인 필요
## 최근 기록        최근 log 3개 링크
```

**log/YYYY-MM-DD.md**: 그날 한 일, 만든·바꾼 파일, 결정 링크, 다음에 이어 할 것. 같은 날 여러 번 작업하면 같은 파일에 덧붙인다.

**decisions.md** 항목 형식 (최신이 위):

```
## YYYY-MM-DD · <결정 제목>
- 결정: …
- 이유: …
- 근거: 팀 레포 <커밋>/<문서>, 사용자 결정, 피그마 링크 등
- 상태: 현행 | 구안(대체됨 → 링크)
```

**handoff.md**: 다른 세션·도구(Claude, GPT, Codex)가 이어받을 때 읽는 맥락 문서. 역할, 작업물 위치, 주의, 사용자 선호. 자주 바뀌는 상태는 STATUS에 두고 handoff에는 넣지 않는다.

**팀 레포 기준 표기**: 팀 문서를 근거로 쓴 STATUS·결정·설계에는 `팀 레포 기준: <짧은 커밋> (날짜)`를 적는다.

### 5.5 Git 설정

`.gitattributes` (main에 두고 각 브랜치에 병합). Claude 판단: LFS 규칙은 **새 작업 폴더 경로에만** 건다. 레포 전체에 걸면 이미 일반 Git으로 올라간 이미지가 "포인터여야 함"으로 표시되어 가짜 수정이 다시 생긴다.

```
# 줄바꿈: 텍스트만 정규화 (이미지는 건드리지 않음)
*.md   text eol=lf
*.html text eol=lf
*.json text eol=lf
*.py   text eol=lf
*.js   text eol=lf
*.cjs  text eol=lf
*.txt  text eol=lf
*.cmd  text eol=crlf
*.bat  text eol=crlf

# LFS: 새 작업 폴더의 큰 파일만
assets/work/motion-lab/**/*.{png,gif,webp,jpg,aseprite,psd,zip,mp4}  filter=lfs diff=lfs merge=lfs -text
assets/work/monsters/**/*.{png,gif,webp,jpg,aseprite,psd}            filter=lfs diff=lfs merge=lfs -text
assets/work/environments/**/*.{png,gif,webp,jpg,aseprite,psd}        filter=lfs diff=lfs merge=lfs -text
ui/work/**/*.{png,gif,webp,jpg,zip,mp4}                              filter=lfs diff=lfs merge=lfs -text
story/work/**/*.{png,gif,webp,jpg}                                   filter=lfs diff=lfs merge=lfs -text
video/**/*.{mp4,mov,wav}                                             filter=lfs diff=lfs merge=lfs -text
audio/**/*.{wav,ogg,mp3}                                             filter=lfs diff=lfs merge=lfs -text
```

(실제 파일에서는 `{a,b}` 묶음을 지원하지 않으므로 확장자별로 한 줄씩 풀어 쓴다.)

- `assets/work/characters/ink-hero-b/`는 기존 일반 Git 이미지를 그대로 옮긴 곳이라 LFS 규칙에서 **뺀다.** 이 폴더의 다음 실험 결과는 `assets/work/motion-lab/`에 새로 쌓아서 LFS로 들어가게 한다.
- `archive/`는 LFS 규칙 밖이다. 옮겨진 기존 파일은 일반 Git 그대로 남는다.
- 기록은 다시 쓰지 않는다. `git add --renormalize`는 **텍스트 파일 경로에만** 쓴다(이미지까지 바뀌지 않게).
- 두 기기에서 한 번씩 실행: `git lfs install`
- Windows 줄바꿈: 텍스트 규칙이 기준이 되므로 갱신 뒤 로컬의 가짜 "수정됨"은 사라져야 한다.

### 5.6 작업 순서 (방법 A)

1. 클라우드 작업 공간에 레포를 새로 받는다. 건드리는 브랜치는 `master`(→`main`)와 `work/*` 3개뿐이다. 그 밖의 브랜치(로컬 Codex 브랜치 등)는 손대지 않는다.
2. 기본 브랜치 `master`를 `main`으로 바꾼다(Claude 판단, 사용자는 어느 쪽이든 괜찮다고 함. 사용자가 계속 main이라 부르고, 지금 문서 중 master를 적은 곳은 다시 쓸 루트 README뿐이다). GitHub 저장소 설정에서 이름을 바꾸면 옛 이름은 자동으로 새 이름으로 연결된다. 로컬 폴더 3개는 work 브랜치에 있어서 `git fetch --prune`과 `git remote set-head origin -a`만 하면 된다.
3. main에 README, `.gitattributes`, `docs/conventions.md`, `docs/specs/<이 문서>`를 커밋한다.
4. 각 브랜치에 main을 병합한다. 루트 README 충돌은 main 쪽으로 해결한다.
5. 각 브랜치 안에서 5.3대로 `git mv`하고, 분야 README·STATUS·decisions·handoff·log를 만든다. 팀 레포 내용은 사용자 컴퓨터의 `3rd_PJT/S15P31F109`(읽기 전용)에서 확인한다.
6. 브랜치마다 변경 내용(이동 목록, diff 요약)을 사용자에게 보여 주고 **승인받은 뒤 push**한다.
7. 사용자가 두 기기에서 `git lfs install`과 pull을 한다. Claude는 명령어를 안내한다.
8. 프로젝트 문서 `claude/작업-규칙.md`를 새 구조(분야 폴더, STATUS 갱신 규칙, LFS)에 맞게 고친다.

## 6. 빌더에게 맡기는 것

- 분야 README와 conventions.md의 문장
- 각 STATUS 첫 버전 내용 (1단계 점검 결과를 바탕으로)
- 병합 충돌 해결 세부 (원칙: 루트 공통 파일은 main 우선, 분야 폴더는 브랜치 우선)
- commit 메시지 (기존 레포 스타일 `docs(ui): …` 유지, 끝에 Co-Authored-By 줄)

## 7. 아직 결정 안 된 것

- 없음. 내용 작업(결과 화면 조각 상태 추가, 피그마 정리, 모션 실험 등)은 개편 뒤 별도 계획으로 다룬다.
