# deviant-work 레포 구조·문서 체계 개편 작업 계획

> **실행하는 에이전트에게:** 이 계획은 작업 단위로 실행한다. 단계는 체크박스(`- [ ]`)로 진행 상황을 표시한다.

**목표:** 승인된 설계대로 main과 분야 브랜치 3개를 정리하고, 분야마다 STATUS·결정·기록·인수인계 문서 체계를 만든다.

**구조:** 클라우드 작업 공간에 받은 사본에서 모든 git 작업을 하고, 결과를 git bundle 하나로 묶는다. 사용자가 자기 터미널(Git Bash)에서 그 bundle을 받아 push한다. 클라우드와 사용자 컴퓨터의 Linux 셸에는 GitHub 인증이 없고, 연결 폴더에서 git을 실행하면 lock 파일이 남기 때문이다.

**도구:** git 2.x, git-lfs 3.x(클라우드). 사용자 컴퓨터: Git for Windows(Git Bash), 맥북 git + git-lfs

**설계 문서:** `docs/specs/2026-11-03-repo-structure-design.md` (main에 함께 커밋, 지금은 `/mnt/user-data/outputs/`에 있음)

## 전체 제약

- 팀 레포 `S15P31F109`는 읽기만 한다. 팀 레포 기준: `d4786611` (2026-11-03)
- 건드리는 브랜치는 `master`(→`main`), `work/ui-design`, `work/asset-design`, `work/story-design`뿐이다.
- 시작 커밋: master `413eeb8`, ui `792128c`, asset `fbbd508`, story `17df2c0`. 다르면 멈추고 사용자에게 알린다.
- 파일은 `git mv`로만 옮긴다. 중간 작업물은 지우지 않는다. 지우는 것은 `ui/sources/ink-blueprint-proposal.md` 하나뿐이다.
- 기록은 다시 쓰지 않는다(rebase, filter, force push 금지).
- push는 사용자 승인 뒤, 사용자가 직접 한다.
- commit 메시지는 기존 스타일 `docs(<분야>): …`를 따르고, 끝에 다음 두 줄을 붙인다.
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`
  `Claude-Session: https://claude.ai/code/session_015TkjNAsg2v6ixP5XSYmi6Y`
- LFS 규칙은 새 `work/` 경로에만 건다(설계 5.5). `archive/`와 `assets/work/characters/`는 LFS 밖이다.
- 문서 위치는 모두 분야 폴더 아래다. 레포 전체에 걸친 설계·계획만 main의 `docs/specs/`, `docs/plans/`에 둔다.

## 검토할 때 볼 것

1. **사용자 로컬 폴더의 가짜 "수정됨"(CRLF) 때문에 pull이 막히는 경우.** 사용자는 pull 전에 줄바꿈 차이만 있는지 확인하고 되돌릴 수 있어야 한다. 이 내용은 Task 6의 안내문에 넣는다.
2. **LFS 패턴이 실제로 맞는지.** `.gitattributes`는 `{a,b}` 묶음을 지원하지 않는다. 경로별 `git check-attr`로 확인한다(Task 2).
3. **옮긴 뒤 끊긴 상대 링크.** README 안의 GIF·문서 링크를 브랜치마다 검사한다(Task 3~5).
4. **나중에 main에 합칠 때의 충돌.** 세 브랜치를 임시 브랜치에서 main에 시험 병합해 확인한다(Task 6).
5. **Windows에서 줄바꿈 규칙을 적용한 뒤에도 이미지가 "수정됨"으로 뜨는 경우.** 클라우드에서 `core.autocrlf=true` 환경을 흉내 내 다시 받아 확인한다(Task 6).

---

### 공통 검사 도구 (작업 공간 전용, 레포에 넣지 않음)

`$SCRATCH/check_links.py <폴더>`: 폴더 안 모든 `.md`·`.html`의 상대 링크(`](x)`, `src="x"`, `href="x"`, http와 `#` 제외)가 실제 파일을 가리키는지 확인한다. 끊긴 링크를 `파일:줄 → 대상`으로 출력하고, 하나라도 있으면 종료 코드 1을 낸다.
`SCRATCH=/tmp/claude-0/-home-claude/70914f42-d380-536b-a2ee-0623f39bd2b9/scratchpad`

---

### Task 1: 작업 사본 준비와 시작점 확인

**파일:** 없음 (작업 공간 `$SCRATCH/build/dw`)

- [ ] **Step 1:** `git clone https://github.com/l-egulation/deviant-work.git $SCRATCH/build/dw`를 실행하고, 작업 브랜치 4개를 로컬로 만든다.
- [ ] **Step 2:** 시작 커밋을 확인한다. `git rev-parse --short origin/master origin/work/ui-design origin/work/asset-design origin/work/story-design` 결과가 `413eeb8 792128c fbbd508 17df2c0`이어야 한다. 다르면 멈추고 보고한다.
- [ ] **Step 3:** 로컬 이름을 바꾼다: `git branch -m master main`
- [ ] **Step 4:** `$SCRATCH/check_links.py`를 작성한다. 지금의 `work/ui-design` 체크아웃에서 실행해 기준선(이미 끊겨 있던 링크)을 `$SCRATCH/links-before-ui.txt`에 저장한다. asset·story도 같은 방식으로 저장한다. 원래부터 끊겨 있던 링크(예: `ink-palette-forge.html`의 `ink-mixing-assets/`)는 이후 검사에서 예외로 둔다.

### Task 2: main — 공통 입구와 Git 설정

**파일:**
- 만들기: `.gitattributes`, `docs/conventions.md`, `docs/specs/2026-11-03-repo-structure-design.md`(outputs에서 복사), `docs/plans/2026-11-03-repo-structure-plan.md`(이 문서)
- 고치기: `README.md` (다시 쓰기)

**만드는 것 (Task 3~5가 따르는 기준):**
- `docs/conventions.md` — 설계 5.4의 STATUS·log·decisions·handoff 양식을 그대로 담고, 다음 규칙을 덧붙인다.
  - 작업이 끝날 때마다 해당 분야 STATUS와 그날 log를 갱신한다.
  - 팀 레포 기준은 `<짧은 커밋> (날짜)`로 적는다.
  - 루트 공통 파일은 main에서만 고친다.
- `README.md` — 레포 소개 한 단락, 브랜치·분야 폴더·로컬 폴더 표(설계 5.2), 각 분야 STATUS 링크(GitHub 브랜치 URL, `blob/work/ui-design/ui/docs/STATUS.md` 형식), 파일 원칙(기존 README의 "파일 원칙" 유지, LFS 문장은 새 규칙으로 교체), `audio/`·`video/` 안내. `deviant-modeling` 언급은 지운다.
- `.gitattributes` — 설계 5.5의 규칙을 확장자별 한 줄로 풀어 쓴다.

- [ ] **Step 1: 실패하는 검사 작성.** `$SCRATCH/check_attrs.sh`를 만든다. 아래 경로마다 `git check-attr filter -- <경로>`를 실행하고, 기대와 다르면 종료 코드 1을 낸다.
  - 기대 `lfs`: `assets/work/motion-lab/a/x.png`, `assets/work/motion-lab/x.gif`, `assets/work/monsters/x.aseprite`, `ui/work/x.png`, `video/x.mp4`, `audio/x.wav`
  - 기대 `unspecified`: `assets/work/characters/ink-hero-b/x.png`, `assets/archive/x.png`, `story/archive/x.webp`, `ui/README.md`
  - 줄바꿈 검사는 `git check-attr eol -- ui/README.md`가 `lf`, `assets/tools/character-costume/build-windows.cmd`가 `crlf`
- [ ] **Step 2:** `.gitattributes` 없이 실행해 실패하는 것을 확인한다.
- [ ] **Step 3:** 위 파일 5개를 작성한다.
- [ ] **Step 4:** `check_attrs.sh`가 통과하는지, `git status --porcelain`에 의도한 5개 파일만 있는지 확인한다.
- [ ] **Step 5: 커밋.** `chore: add shared repo guide, conventions and git attributes`

### Task 3: work/ui-design — 재배치와 UI 문서 체계

**파일 (설계 5.3 UI 표 그대로):**
- `git mv`:
  - `ui/claude-handoff.md` → `ui/docs/handoff.md`
  - `ui/office-hour-decisions.md` → `ui/docs/decisions.md`
  - `ui/result-screens.md` → `ui/work/specs-screens/result-screens.md`
  - `ui/ux-flow.md` → `ui/archive/ux-flow-2026-10-27.md`
  - `ui/result-wireframes.html` → `ui/archive/result-wireframes.html`
  - `ui/ui-rebuild-plan.html` → `ui/archive/ui-rebuild-plan.html`
  - `ui/reference/` → `ui/work/reference/`
  - `ui/reviews/` → `ui/work/reviews/`
- 지우기: `ui/sources/ink-blueprint-proposal.md`
- 만들기: `ui/docs/STATUS.md`, `ui/docs/log/2026-11-03.md`, `ui/archive/README.md`, `ui/docs/specs/.gitkeep`, `ui/docs/plans/.gitkeep`
- 고치기: `ui/README.md`(다시 쓰기), `ui/docs/handoff.md`(경로·링크만), `ui/docs/decisions.md`(양식 변환 + 구안 표시)

- [ ] **Step 1:** `git merge main`을 실행한다. 루트 `README.md` 충돌은 main 쪽으로 해결한다(`git checkout --theirs README.md`가 아니라 main 버전 그대로). 병합 커밋을 만든다.
- [ ] **Step 2:** 위 `git mv` 목록과 삭제를 실행한다.
- [ ] **Step 3: 문서를 작성한다.**
  - `decisions.md` — 기존 표의 각 결정을 conventions 양식의 항목으로 바꾼다. 아래 항목은 상태를 `구안(팀 기준과 다름)`으로 하고, 근거에 팀 문서와 `d4786611`을 적는다.
    - 무기 2개 랜덤 지급 → 출발 준비대에서 도면 2개 선택
    - 튜토리얼 없이 1스테이지 → 마을 플레이형 오프닝
    - 첫 정비소 팔레트 획득·기본 5칸 → 출발 3칸 + 영구 해금 4·5칸
    - 룰렛기 → 정비소 잉크 뽑기
    - 인벤토리 4종 칸 제한 → 가방 15칸 + 색상 잉크 목록(제한 없음, 목표 0~5칸)
    - 사망 시 거점 귀환 → 결과 → 마을 우물

    맨 위에는 오늘 결정을 추가한다: 스토리·주인공은 팀 방향, 피그마는 테마 전 임시 기능·배치용, 전체를 덮는 UI 지양, 테마는 GPT에서 작업.
  - `STATUS.md` — 지금 상태: "레포 개편 완료, 피그마 정리 대기". 다음 할 일(우선순위 순):
    1. 결과 화면에 1챕터 클리어(조각 k/5) 상태 추가
    2. 피그마 현행/수정 대상/이전안 정리
    3. 01~15·35~47을 팀 기준으로 수정(부분 패널)
    4. 빠진 화면(마을 작업대·제단·오프닝 말풍선/배너·HUD/지도)

    막힌 것: 테마 미정(GPT). 팀 레포 기준: `d4786611 (2026-11-03)`
  - `README.md` — 분야 소개, 피그마 링크 3개(FigJam, 와이어프레임, 결과 4상태 node 74-75), 폴더 안내, STATUS 링크
  - `archive/README.md` — 보관한 파일마다 "왜 보관했는지" 한 줄
  - `log/2026-11-03.md` — 1단계 점검, 설계 승인, 이번 개편
- [ ] **Step 4: 검사.**
  - `python3 $SCRATCH/check_links.py ui`를 실행해 기준선 외에 끊긴 링크가 0인지 본다.
  - `git ls-files ui | grep -v -E '^ui/(README.md|docs/|work/|archive/)'` 결과가 비어 있어야 한다.
  - `check_attrs.sh`가 통과해야 한다.
- [ ] **Step 5: 커밋.** `docs(ui): reorganize into docs/work/archive with status and decision log`

### Task 4: work/asset-design — 재배치와 에셋 문서 체계

**파일:**
- `git mv`:
  - `assets/characters/ink-hero-b/` → `assets/work/characters/ink-hero-b/`
  - `assets/characters/README.md`, `assets/characters/asset-manifest.json` → `assets/work/characters/`
  - `assets/characters/ink-hero-c/` → `assets/archive/ink-hero-c/`
  - `assets/monsters/` → `assets/archive/monsters/`
  - `assets/environments/` → `assets/archive/environments/`
  - `tools/character-costume/` → `assets/tools/character-costume/`
- 만들기: `assets/docs/{STATUS.md,decisions.md,handoff.md,log/2026-11-03.md}`, `assets/docs/specs/.gitkeep`, `assets/docs/plans/.gitkeep`, `assets/work/motion-lab/README.md`, `assets/archive/README.md`
- 고치기:
  - `assets/README.md`(다시 쓰기)
  - `assets/work/characters/README.md` — ink-hero-c 섹션 링크를 `../../archive/ink-hero-c/…`로 바꾼다.
  - `assets/tools/character-costume/README.md` — 3·5번째 줄 경로를 `../../archive/ink-hero-c/integrated-outfit-motion/`로 바꾼다.

- [ ] **Step 1:** `git merge main` 후 루트 README 충돌을 main 쪽으로 해결한다.
- [ ] **Step 2:** `git mv` 목록을 실행한다.
- [ ] **Step 3: 문서를 작성한다.**
  - `decisions.md` 첫 항목들(2026-11-03):
    - 주인공은 팀 방향(크림 후드+청록 스카프)
    - B안 전체는 실험 작업물로 유지, 폐기가 정해지면 보관
    - ink-hero-c·몬스터·배경은 보관(팀 승인본 대조 전)
    - 새 실험은 `work/motion-lab/`(LFS)
  - `STATUS.md` — 지금 상태: "모션 자연스러움 실험 중". 다음 할 일:
    1. 팀 주인공 규격(PPU 32, 1텍셀 외곽선 RGB 34·28·24, 팀 레포 `docs/design/art-and-presentation.md`) 정리
    2. motion-lab 첫 실험
    3. 팀 resources 서브모듈 접근 후 몬스터 시안 대조

    막힌 것: ink-hero-c가 구매 에셋 동작 기반이라 공개 레포 라이선스 확인 필요. 팀 레포 기준: `d4786611`
  - `handoff.md` — 역할(모션 실험), 위치, 도구 실행법 링크, 주의(구매 원본 ZIP은 커밋 금지)
  - `motion-lab/README.md` — 실험 폴더 규칙: `YYYY-MM-DD-<주제>/`, 각 폴더에 README로 목적·결과·판단
- [ ] **Step 4: 검사.**
  - `check_links.py assets`에서 기준선 외 0건이어야 한다.
  - `git ls-files | grep -E '^(tools|assets/characters|assets/monsters|assets/environments)/'` 결과가 비어 있어야 한다.
  - `check_attrs.sh`가 통과해야 한다.
  - `git ls-files assets/work/characters | head`로 이미지가 일반 blob인지 확인한다(`git lfs ls-files` 결과가 비어 있어야 함).
- [ ] **Step 5: 커밋.** `docs(assets): reorganize into work/archive with status and decision log`

### Task 5: work/story-design — 보관과 보류 상태

**파일:**
- `git mv`: `story/README.md`, `story/storybook.html`, `story/assets/` → `story/archive/2026-10-concept-v7/` 아래
- 만들기: `story/README.md`, `story/docs/{STATUS.md,decisions.md,handoff.md,log/2026-11-03.md}`, `story/docs/specs/.gitkeep`, `story/docs/plans/.gitkeep`, `story/work/.gitkeep`, `story/archive/README.md`

- [ ] **Step 1:** `git merge main` 후 루트 README 충돌을 main 쪽으로 해결한다.
- [ ] **Step 2:** `git mv`를 실행한다.
- [ ] **Step 3: 문서를 작성한다.**
  - `decisions.md`(2026-11-03): 팀 확정 스토리(`docs/design/story/opening.md`, 11/01) 따름. 기존 콘셉트 v7은 2·3챕터 아이디어 후보로 보관.
  - `STATUS.md`: 상태 "보류(후순위)". 다음 할 일 후보: 오프닝 ④~⑥ 대사·연출, 2·3챕터 구상
  - `README.md`: 팀 스토리 문서 경로 안내 + 보관본 링크
  - `archive/README.md`: 보관 이유
- [ ] **Step 4: 검사.** `check_links.py story`에서 기준선 외 0건이어야 한다(보관본 HTML 안의 이미지 경로 포함). `check_attrs.sh`가 통과해야 한다.
- [ ] **Step 5: 커밋.** `docs(story): archive concept v7 and add paused status`

### Task 6: 통합 검사, bundle, 사용자 안내

**파일:** `$SCRATCH/deviant-restructure.bundle`, `$SCRATCH/push-guide.md` (레포에 넣지 않음)

- [ ] **Step 1: 합칠 때의 충돌 시험.** 임시 브랜치 `trial-merge`를 main에서 따서 ui·asset·story를 차례로 `git merge --no-edit`한다. 충돌 0이어야 한다. 끝나면 임시 브랜치를 지운다.
- [ ] **Step 2: Windows 줄바꿈 흉내.** `git -c core.autocrlf=true clone --branch work/asset-design <작업 사본> $SCRATCH/crlf-test`를 실행하고, 그 안에서 `git status --porcelain`이 비어 있는지 확인한다. ui·story도 같은 방식으로 확인한다.
- [ ] **Step 3: bundle 생성.** `git bundle create $SCRATCH/deviant-restructure.bundle main work/ui-design work/asset-design work/story-design`을 실행하고, `git bundle verify`가 통과하는지 확인한다.
- [ ] **Step 4: 사용자 검토 자료.** 브랜치마다 `git diff --stat -M origin/<브랜치>..<브랜치>`와 이동 목록(`git diff -M --name-status`)을 정리해 사용자에게 보여 준다. **승인을 받을 때까지 멈춘다.**
- [ ] **Step 5:** 승인되면 bundle을 사용자 폴더 `C:\Users\SSAFY\Desktop\3rd_PJT\_handoff\`에 넣는다(`device_commit_files`).
- [ ] **Step 6: push 안내문 전달.** 사용자가 Git Bash에서 실행할 순서다.
  1. GitHub → Settings → Branches에서 기본 브랜치 `master`를 `main`으로 이름 변경
  2. `UI design` 폴더에서:
     - `git diff --ignore-cr-at-eol --stat`이 비어 있으면 `git restore .` (줄바꿈 차이 되돌리기)
     - `git lfs install`
     - `git fetch ../_handoff/deviant-restructure.bundle 'refs/heads/*:refs/remotes/bundle/*'`
     - `git push origin bundle/main:main bundle/work/ui-design:work/ui-design bundle/work/asset-design:work/asset-design bundle/work/story-design:work/story-design`

       fast-forward가 아니면 거부되므로 force는 쓰지 않는다.
  3. 세 로컬 폴더 각각에서: `git restore .`(위 조건일 때), `git fetch --prune`, `git remote set-head origin -a`, `git pull`
  4. 맥북: `brew install git-lfs && git lfs install`, 각 폴더에서 `git pull`
- [ ] **Step 7: push 확인.** 사용자가 push했다고 하면 클라우드 사본에서 `git ls-remote origin`을 실행해 4개 브랜치가 bundle의 커밋과 같은지 확인한다.

### Task 7: 마무리 — 작업 규칙과 STATUS

**파일:** 프로젝트 문서 `claude/작업-규칙.md` (Projects 도구), 각 분야 `docs/STATUS.md`

- [ ] **Step 1:** `claude/작업-규칙.md`를 갱신한다.
  - 기본 브랜치를 `main`으로 바꾼다.
  - 분야 폴더 구조(`<분야>/docs|work|archive`)를 넣는다.
  - "작업이 끝날 때마다 해당 분야 `docs/STATUS.md`와 `docs/log/날짜.md` 갱신" 규칙을 넣는다.
  - LFS 규칙과, push는 bundle을 거쳐 사용자가 한다는 방식을 넣는다.
  - deviant-modeling 줄은 유지한다.
- [ ] **Step 2:** 개편 완료를 반영해 각 STATUS의 "최근 기록"을 다음 커밋에서 갱신한다. 이 커밋도 bundle을 거쳐 같은 절차로 push한다.

---

## 이후 작업 (각각 별도 설계·계획)

1. UI: 결과 화면에 1챕터 클리어(조각 k/5) 상태 추가 — 피그마
2. UI: 피그마 현행/수정 대상/이전안 정리와 화면 상태 인덱스
3. UI: 01~15, 35~47 팀 기준 수정, 부분 패널 배치
4. UI: 빠진 화면(마을 작업대, 보스 제단, 오프닝 말풍선·배너, HUD·지도)
5. 에셋: motion-lab 첫 실험(팀 후드 주인공 규격)
6. 스토리: 보류
