# Deviant 개인 작업 레포

**Deviant**(잉크 세계관 2D 액션 로그라이트, Unity) 팀 프로젝트에서 이규재가 맡은 UI·에셋·스토리 작업을 두 기기(갤럭시북·맥북) 사이에서 이어 가기 위한 개인 작업 공간입니다. 게임 코드와 기획의 기준은 팀 레포(SSAFY GitLab `S15P31F109`)이며, 이 레포는 팀 레포를 수정하지 않습니다.

## 어디서 무엇을 하나

분야마다 브랜치가 따로 있고, 각 브랜치는 **자기 분야 폴더 안에서만** 작업합니다. 지금 상태는 각 분야의 STATUS를 먼저 엽니다.

| 분야 | 브랜치 | 폴더 | 지금 상태 | 로컬 폴더(갤럭시북) |
|---|---|---|---|---|
| UI 디자인 | `work/ui-design` | `ui/` | [STATUS](https://github.com/l-egulation/deviant-work/blob/work/ui-design/ui/docs/STATUS.md) | `3rd_PJT/UI design` |
| 에셋 디자인 | `work/asset-design` | `assets/` | [STATUS](https://github.com/l-egulation/deviant-work/blob/work/asset-design/assets/docs/STATUS.md) | `3rd_PJT/asset design` |
| 스토리 디자인 | `work/story-design` | `story/` | [STATUS](https://github.com/l-egulation/deviant-work/blob/work/story-design/story/docs/STATUS.md) | `3rd_PJT/story` |
| 영상 | `work/video` | `video/` | [STATUS](https://github.com/l-egulation/deviant-work/blob/work/video/video/docs/STATUS.md) | `3rd_PJT/video` |

`main`에는 이 안내, 공통 규칙, 레포 전체 설계만 둡니다.

- [문서 작성 규칙](docs/conventions.md): STATUS·작업 기록·결정 기록·인수인계 양식과 갱신 규칙
- [레포 구조 설계](docs/specs/2026-11-03-repo-structure-design.md) · [개편 작업 계획](docs/plans/2026-11-03-repo-structure-plan.md)
- `audio/`: 사운드용 자리 (아직 사용 전)

## 분야 폴더의 공통 틀

```
<분야>/
├─ README.md     분야 소개, 최신본 위치
├─ docs/         STATUS · decisions · handoff · log/ · specs/ · plans/
├─ work/         지금 쓰는 작업물
└─ archive/      이전안·폐기 설정 (지우지 않고 보관)
```

## 파일 원칙

- 기획서, HTML, 코드, 작은 참고 이미지는 Git으로 관리합니다.
- 새 작업 폴더의 미디어는 **Git LFS**로 올라갑니다: `assets/work/`의 motion-lab·monsters·environments(이미지·Aseprite·PSD), `ui/work/`·`story/work/`의 이미지, `video/`의 이미지·음원·영상, `audio/`의 음원. 정확한 규칙은 `.gitattributes`를 봅니다. 두 기기 모두 `git lfs install`을 한 번 실행해야 합니다.
- `archive/`와 `assets/work/characters/`에 있는 기존 이미지는 일반 Git 파일로 둡니다(기록을 다시 쓰지 않음).
- 줄바꿈은 `.gitattributes`가 텍스트 파일만 LF로 맞춥니다(`.cmd`·`.bat`은 CRLF).
- Unity `Library/`, 캐시, 임시 렌더, 다운로드 파일, 인증 정보, 구매 에셋 원본 ZIP은 커밋하지 않습니다.
- 사용한 외부 에셋은 출처와 사용 범위를 해당 작업 폴더에 기록합니다.
