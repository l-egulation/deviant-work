# Deviant 에셋 디자인

캐릭터·몬스터·배경 시각 에셋과 **모션의 자연스러움**을 실험하는 공간입니다. 여기 있는 파일은 실험·시안이며, 게임 적용과 승인은 팀 레포(`S15P31F109`)와 팀 `resources` 저장소가 기준입니다.

**먼저 볼 것:** [STATUS](docs/STATUS.md) — 지금 상태와 다음 할 일

## 기준

- 주인공은 팀 방향을 따릅니다. 평범한 사람, 크림색 후드에 청록색 스카프를 하고, 각성 후에는 잉크 몸입니다.
- 팀 규격은 PPU 32, 루트 scale 1, 플레이어만 1텍셀 외곽선(RGB 34·28·24)입니다. 팀 레포 `docs/design/art-and-presentation.md`를 봅니다.

## 폴더

| 위치 | 내용 |
|---|---|
| `docs/` | STATUS, 결정 기록, 인수인계, 날짜별 기록, 설계·계획 |
| `work/characters/` | 주인공 B안 실험(두건+목도리, 베레모). 폐기가 정해지면 `archive/`로 옮깁니다. [안내](work/characters/README.md) |
| `work/motion-lab/` | 새 모션 실험. 여기에 넣는 이미지는 Git LFS로 올라갑니다. [규칙](work/motion-lab/README.md) |
| `work/monsters/`, `work/environments/` | 새 몬스터·배경 작업 자리 (LFS) |
| `tools/character-costume/` | 의상 합성·모션 생성 도구 (Python). [사용법](tools/character-costume/README.md) |
| `archive/` | 이전 탐색. [목록](archive/README.md) |

## 파일 원칙

- 구매 에셋 원본 ZIP은 커밋하지 않습니다. 도구는 로컬 경로로 받아서 씁니다.
- 게임 적용을 염두에 둔 파일에는 크기, PPU, 피벗·발 위치, 프레임 순서·시간을 함께 적습니다.
- 문서 양식은 [문서 작성 규칙](../docs/conventions.md)을 따릅니다.
