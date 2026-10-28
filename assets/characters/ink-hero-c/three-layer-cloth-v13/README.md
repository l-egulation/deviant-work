# 몸체 / 로브 / 목도리 — 최신 의상 모션 v13

원본의 큰 두건, 넓은 소매, 긴 로브와 목도리를 유지하고 C의 와인·황동·검정 색으로 작업했습니다. 끝부분을 여러 개의 관리 파일로 나누지 않고 **몸체, 로브, 목도리** 세 묶음으로 관리합니다.

![실행 미리보기](preview-motion.gif)

## git pull 후 확인

레포 루트에서:

```sh
git switch work/asset-design
git pull --ff-only origin work/asset-design
```

아래 파일을 브라우저로 여세요. 폴더 안에서 `index.html`을 더블클릭하면 됩니다. 별도 서버나 패키지 설치는 필요 없습니다.

```text
assets/characters/ink-hero-c/three-layer-cloth-v13/index.html
```

- 방향키 누르기: 달리기 / 놓기: 정지 / Space: 급정지.
- 자동 시연 재시작, 일시정지, 0.5배·0.25배 속도 지원.
- `관성 켜기`를 꺼서 몸을 따라가는 옷만 비교.
- 몸체·로브 전체·목도리 전체를 개별로 표시.
- 왼쪽은 구매 원본, 오른쪽은 의상을 적용한 같은 시점의 자세.

## 파일

| 파일 | 내용 |
|---|---|
| [character-three-layers.aseprite](character-three-layers.aseprite) | 정적 대기 자세의 3레이어 편집본 |
| [assets/body.png](assets/body.png) | 기본 몸체 원본 |
| [assets/robe.png](assets/robe.png) | 두건·소매·자락을 포함한 로브 원본 |
| [assets/scarf.png](assets/scarf.png) | 목둘레와 꼬리를 포함한 목도리 원본 |
| [design-static.png](design-static.png) | 세 원본 레이어 합성본 |
| [cloth.js](cloth.js) | 영역별 변형과 감쇠 스프링 |
| [app.js](app.js) | 구매 모션 연결·입력·렌더링 |
| [content.json](content.json) | 모션 프레임, 부착 위치와 변형 영역 |
| [RESEARCH.txt](RESEARCH.txt) | 공식 자료를 확인한 구현 방법 비교 |
| [verification.json](verification.json) | 브라우저 동작 검증과 정지 후 변화 기록 |

## 범위

구매 에셋의 Idle 10장·Run 8장을 사용하고 프레임별 머리·어깨·손 위치에 옷을 맞춥니다. 옷 내부에서 고정부의 관성 변형량은 0으로 유지하고 끝부분으로 갈수록 늘립니다. 정지 뒤의 오버슈트와 감쇠를 표현합니다.

**Unity 적용본이나 완전한 천 물리 엔진은 아닙니다.** 천/몸 충돌, 전투 자세, 별도의 급정지 몸 클립은 없습니다. 원본에 급정지 클립이 없어 Run에서 Idle로 전환합니다. 관리 원본이 세 장이어도 동작별 부착 위치와 소매 보정은 필요합니다. 큰 자세 변화의 옷 맞춤은 추가 검토 대상입니다.

구매 모션 몸체에 맞춘 비율 때문에 움직이는 결과의 외곽은 정적 디자인 원본과 완전히 같지 않습니다. 현재 파일은 디자인과 적용 방식의 검증용입니다.

Unity Sprite Skin은 뼈대와 가중치를 사용하며, Magica Cloth 2의 공식 2D 가이드도 Unity 2D Animation/BoneCloth 구성을 설명합니다. PNG만 붙여 자동 완성되는 방식으로 판단하지 않았습니다.

- [Unity Sprite Skin 공식 문서](https://docs.unity3d.com/Packages/com.unity.2d.animation@10.0/manual/SpriteSkin.html)
- [Magica Cloth 2 공식 2D 가이드](https://magicasoft.jp/mc2_2danimation_setup/)

몸 모션은 구매한 2D Pixel Art Character Template에서 파생했습니다. 사용·공유는 원본 라이선스 범위를 따릅니다. 구매 ZIP, 임시 캡처 240장, 로컬 환경에 의존하는 생성 스크립트는 포함하지 않습니다.
