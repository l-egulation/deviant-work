# 일체형 의상 생성 도구

**확인만 하려면 도구를 실행하지 마세요.** 완성된 GIF는 [최신 미리보기 폴더](../../assets/characters/ink-hero-c/integrated-outfit-motion/README.md)에 있습니다.

GitHub 경로: `assets/characters/ink-hero-c/integrated-outfit-motion/`

## 현재 디자인

두건·상의·통 넓은 바지·잉크 몸을 **body 한 장으로 확정**하고 **scarf 한 장만 별도 출력**합니다. 이전처럼 로브와 바지를 재생 중 부착하는 방식이 아닙니다. 입력 원본의 부위별 이미지는 제작 시 자세를 참조하는 용도로만 사용합니다. 검 공격의 테스트 무기도 이번 body에 포함됩니다.

- `integrated.py`: 상의에서 바지로 이어지는 실루엣과 2레이어 출력.
- `integrated-style.json`: 새 디자인의 색·바지 통 설정. 현재 기본값.
- `overrides.json`: 공통 시선과 구르기 숙임·겹침 설정.
- `export_movement.py`: 확정된 몸 형태를 유지하면서 목도리만 관성으로 움직이는 GIF.
- `export_previews.py`: 개별 모션과 전체 비교 GIF.
- `style.json`: 이전 분리 의상 연구용 설정. 현재 최신 디자인이 아닙니다.

원본 색이 부위 구분과 음영으로 혼용되는 것을 발견하여 **새 일체형 바지는 색 분류를 사용하지 않습니다.** 다리의 가장 큰 연결 영역에서 골반에 가까운 지점을 찾고, 그 지점부터 이어지는 거리를 이용해 발끝과 바지 영역을 정합니다. 허벅지·종아리 둘레에 천의 여유를 주되 발끝은 그대로 유지합니다. 반복 사용할 의상 규칙이며 모든 새 동작의 작화 품질을 자동 보장하는 기능은 아닙니다.

## 로컬 재생성 — 수정할 때만 필요

Python 3.10 이상과 Pillow가 필요합니다. Windows에서:

```powershell
py -3 -m pip install -r requirements.txt
py -3 build.py --source-zip "C:\경로\2D-Pixel-Art-Character-Template.zip"
```

또는 구매 ZIP을 `build-windows.cmd` 위에 끌어 놓습니다. 결과는 Git에서 제외된 `_generated/integrated/`에 생성됩니다. Mac/Linux는 `py -3` 대신 `python3`를 사용합니다. Windows 장비에서 실행 검증한 상태는 아닙니다.

각 모션의 `body-00.png`, `scarf-00.png`를 합치면 `frame-00.png`와 정확히 일치합니다. 머리·바지·로브의 별도 최종 이미지가 없습니다. 원본의 프레임 시간은 `report.json`에 들어 있습니다.

```powershell
py -3 export_previews.py --generated _generated/integrated --out _generated/previews
py -3 export_movement.py --source-zip "C:\경로\2D-Pixel-Art-Character-Template.zip" --out _generated/previews/movement-scarf.gif
py -3 -m unittest discover -s . -p "test_*.py"
```

## 검증과 범위

Idle 10 / Run 8 / Jump 6 / Sword Attack 6 / Roll 7, 총 37프레임을 생성하고 확인했습니다. 2레이어 합성 일치와 목도리 상태에 따른 몸 이미지 불변성을 검사합니다. 원본 프레임 수와 타이밍을 보존하며, GIF만 포맷 한계에 맞춰 10ms 단위로 누적 반올림합니다.

현재는 미리보기와 로컬 자산 생성 단계입니다. 게임 엔진 통합·모든 구매 동작 지원·새로운 무기 작화는 포함하지 않습니다. 구르기는 명시적인 머리 방향과 가림 순서 보정이 필요하며, 다른 동작을 추가하면 역시 검토해야 합니다.

## 입력과 공유

[제작자 공식 페이지](https://zegley.itch.io/2d-platformermetroidvania-asset-pack)의 상업 프로젝트 사용·수정 허용 및 에셋 재배포 제한을 확인하세요. 이 도구에는 구매 원본 픽셀 데이터가 포함되지 않습니다. 로컬 출력 폴더는 Git에서 제외됩니다. 이전에 레포에 들어간 에셋이나 과거 커밋을 제거하는 작업은 수행하지 않았습니다.
