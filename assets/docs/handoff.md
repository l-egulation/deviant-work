# 에셋 작업 인수인계

## 역할

이규재가 맡은 에셋 디자인 중 **모션의 자연스러움**을 실험한다. 지금 실험은 주인공 의상(두건·상의·바지)과 목도리를 픽셀 동작에 자연스럽게 붙이는 것이다. 팀 승인·게임 적용은 팀 담당자가 하며, 이 레포의 결과물은 시안이다.

## 작업물 위치

- 주인공 B안: `work/characters/ink-hero-b/` — `basic-motion`(두건+목도리 대기·달리기), `pixel-design`(다각도), `hat-design`·`beret-motion`(모자·베레모 시안)
- 이전 C안: `archive/ink-hero-c/` (로브·무기 연구·검 전투 시안)
- 생성 도구: `tools/character-costume/` — Python 3.10+, Pillow. 구매 ZIP 경로를 인자로 받는다.
- 새 실험: `work/motion-lab/`

## 팀 기준을 볼 곳 (팀 레포, 읽기 전용)

- 아트·규격: `docs/design/art-and-presentation.md`
- 주인공 승인 모션: `unity/Assets/Deviant/Combat/Resources/CharacterApproved11/`, `CharacterApproved13/`
- 몬스터: `docs/design/monsters.md`, `docs/development/stage1-monster-motions.md`
- 필요한 에셋 목록: `docs/assets/temporary-and-needed-assets.md`

## 주의

- 구매 에셋 원본 ZIP·원본 프레임은 커밋하지 않는다(`.gitignore`의 `*.zip`).
- 결과물이 구매 에셋 동작을 바탕으로 하므로 공개 레포 게시 범위를 확인해야 한다(STATUS 참고).
- 사용자는 비교 GIF(전후·크기 비교)로 확인하는 것을 선호한다.
- 최신 시안을 README에 "최신:" 섹션으로 계속 쌓지 않는다. 지금 상태는 STATUS에, 지난 시안은 `archive/`로 옮긴다.
