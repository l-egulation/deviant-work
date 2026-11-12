# 화면별 에셋 연결표

[정확한 ID 전체 CSV](screen-asset-map.csv) · [JSON](screen-asset-map.json) · [전체 상태 색인](COVERAGE.md)

동적 목록은 아래 ID 집합과 manifest contentId/inks 매핑으로 연결한다. 한 화면에 집합 전체를 표시하라는 뜻이 아니다. 미노출/외부 의존/부분 보류는 신규 승인 UI로 간주하지 않는다.

|화면|요소|ID 연결|규칙·상태|
|---|---|---|---|
|공통|선택 붓칠|`common/maintenance-palette-v1__assets__selection-wash-v1`|선택 문구·버튼만. 잉크 아이콘 단독에는 사용 안 함 (현행)|
|공통|꼬리 팝업|`common/sketch-v3__assets__speech-frame-v1`|frames.speech 고정 모서리/꼬리, 가운데 띠만 늘림 (현행)|
|이름 변경|프레임|`common/combat-hud-v2__assets__frame-large`|frames.large slice260, 전체 통이미지 늘림 금지 (현행)|
|가방|무기 형태|13개 정확한 ID: CSV/JSON 참조|contentId로 선택. 목록 순번/이름 추정 금지 (현행)|
|가방|잉크 병 조합|21개 정확한 ID: CSV/JSON 참조|manifest.inks[inkId]의 bottle/effect/condition 및 label/badge 중심값 사용 (현행)|
|가방|팔레트|11개 정확한 ID: CSV/JSON 참조|바탕=슬롯색, 칠=적용잉크색, 중앙문양=inks[inkId].effect. 빈 칸은 바탕만; 6칸도 같은 규칙 (현행)|
|제작|무기 형태|13개 정확한 ID: CSV/JSON 참조|contentId로 선택. 목록 순번/이름 추정 금지 (현행)|
|제작|잉크 병 조합|21개 정확한 ID: CSV/JSON 참조|manifest.inks[inkId]의 bottle/effect/condition 및 label/badge 중심값 사용 (현행)|
|제작|팔레트|11개 정확한 ID: CSV/JSON 참조|바탕=슬롯색, 칠=적용잉크색, 중앙문양=inks[inkId].effect. 빈 칸은 바탕만; 6칸도 같은 규칙 (현행)|
|장비|무기 형태|13개 정확한 ID: CSV/JSON 참조|contentId로 선택. 목록 순번/이름 추정 금지 (현행)|
|장비|잉크 병 조합|21개 정확한 ID: CSV/JSON 참조|manifest.inks[inkId]의 bottle/effect/condition 및 label/badge 중심값 사용 (현행)|
|장비|팔레트|11개 정확한 ID: CSV/JSON 참조|바탕=슬롯색, 칠=적용잉크색, 중앙문양=inks[inkId].effect. 빈 칸은 바탕만; 6칸도 같은 규칙 (현행)|
|보상|무기 형태|13개 정확한 ID: CSV/JSON 참조|contentId로 선택. 목록 순번/이름 추정 금지 (현행)|
|보상|잉크 병 조합|21개 정확한 ID: CSV/JSON 참조|manifest.inks[inkId]의 bottle/effect/condition 및 label/badge 중심값 사용 (현행)|
|보상|팔레트|11개 정확한 ID: CSV/JSON 참조|바탕=슬롯색, 칠=적용잉크색, 중앙문양=inks[inkId].effect. 빈 칸은 바탕만; 6칸도 같은 규칙 (현행)|
|월드 상점|무기 형태|13개 정확한 ID: CSV/JSON 참조|contentId로 선택. 목록 순번/이름 추정 금지 (현행)|
|월드 상점|잉크 병 조합|21개 정확한 ID: CSV/JSON 참조|manifest.inks[inkId]의 bottle/effect/condition 및 label/badge 중심값 사용 (현행)|
|월드 상점|팔레트|11개 정확한 ID: CSV/JSON 참조|바탕=슬롯색, 칠=적용잉크색, 중앙문양=inks[inkId].effect. 빈 칸은 바탕만; 6칸도 같은 규칙 (현행)|
|장비·보상·제작|스킬 정보|40개 정확한 ID: CSV/JSON 참조|실제 skill contentId 선택, 미노출 영역에 임의 추가 금지 (현행)|
|증강 상점|증강 후보|39개 정확한 ID: CSV/JSON 참조|ID별 연결; 대기9종은 그림 존재와 후보 활성화를 구분 (현행)|
|봉인 증강|증강 후보|12개 정확한 ID: CSV/JSON 참조|contentId로 선택 (현행)|
|월드 상점|골드·마법안료|`common/currency-v1__assets__gold` · `common/currency-v1__assets__magic-pigment-v2`|화면의 실제 재화 종류만 사용 (현행)|
|공방|골드·마법안료|`common/currency-v1__assets__gold` · `common/currency-v1__assets__magic-pigment-v2`|화면의 실제 재화 종류만 사용 (현행)|
|결과|골드·마법안료|`common/currency-v1__assets__gold` · `common/currency-v1__assets__magic-pigment-v2`|화면의 실제 재화 종류만 사용 (현행)|
|설정|슬라이더 손잡이|`common/settings-v1__assets__slider-thumb`|현행 원본 추가; 키캡/문자/슬라이더 값은 UI 텍스트 (현행)|
|잠긴 상자·위험 상자·봉인 상자|닫힘·열림|`ui-assets-v2/locked-chest-closed` · `ui-assets-v2/locked-chest-open`|상태별 한 장, 근접 행동은 공통 꼬리 프레임 (현행)|
|잠긴 상자|열쇠|`common/sketch-v3__assets__key-item`|현행 잠긴 상자 안내의 열쇠; world-14로 임의 교체하지 않음 (현행)|
|마을 상호작용|새 소식|`common/sketch-v3__assets__village-news`|현행 원본, 과도한 확대 금지 (현행)|
|우물·색 복원|마을 잉크|10개 정확한 ID: CSV/JSON 참조|마을 잉크/방울 구분, 실제 복원색으로 선택 (현행)|
|기록 농가|침식자·우물 삽화|`ui-assets-v2/eroders` · `ui-assets-v2/well`|현행은 해당 원본 시트 전체 표시. 단일 sprite crop와 전체 삽화 사용을 구분 (현행)|
|오프닝|수첩 바탕|`common/world-flows-v1__assets__notebook-v3-transparent`|ui-assets-v2/notebook과 다름. 최종 CSS의 수첩 바탕 (현행)|
|오프닝|3장 삽화|`common/world-flows-v1__assets__notebook-page-1` · `common/world-flows-v1__assets__notebook-page-2` · `common/world-flows-v1__assets__notebook-page-3`|페이지 순서 1→2→3 (현행)|
|봉인 진행|대기·현재·완료|`seal-progress/pending` · `seal-progress/current` · `seal-progress/complete`|각724×724. 상태 순서와 페이지 번호는 별개 (현행)|
|정령 구출|목표·알림|`ui-assets-v1/world-0`|현행 월드 렌더러의 해당 이벤트 아이콘 (현행)|
|묘목 생존|목표·알림|`ui-assets-v1/world-1`|현행 월드 렌더러의 해당 이벤트 아이콘 (현행)|
|위험 상자|목표·알림|`ui-assets-v1/world-2`|현행 월드 렌더러의 해당 이벤트 아이콘 (현행)|
|함정 수집|목표·알림|`ui-assets-v1/world-3`|현행 월드 렌더러의 해당 이벤트 아이콘 (현행)|
|무기 소진|목표·알림|`ui-assets-v1/world-4`|현행 월드 렌더러의 해당 이벤트 아이콘 (현행)|
|보스 소개|보스 진입|`ui-assets-v1/world-8`|원본 rect/view 유지 (현행)|
|포탈|월드 문|`common/world-flows-v1__assets__portal-door`|월드 시안 원본; 실제 캐릭터 설치 모션은 팀 프로젝트 자산 (현행)|
|포탈|번호|`common/full-map-v1__assets__portal-1` · `common/full-map-v1__assets__portal-2`|현재 월드 1/2 사용; 맵 패키지의 3~5는 자동 활성화하지 않음 (현행)|
|전체 지도|승인 마커|11개 정확한 ID: CSV/JSON 참조|현재 위치/상점/보스/상자/봉인/물음표/번호 ID. 임시 십자·출구 및 이벤트 완료는 미연결 (현행)|
|보상 게이지|용기|`common/world-flows-v1__assets__reward-reservoir-v2`|view180,100,625,1320; 액체x342 y394 w272 h866, 아래1260에서 위로 채움. HUD전체 보류 (부분 보류)|
|결과|장식 후보|`ui-assets-v1/result-0` · `ui-assets-v1/result-1` · `ui-assets-v1/result-2`|패키지에 있으나 현행 큰 결과 제목에 강제 추가하지 않음 (선택 자산·미노출)|
|설정·일시정지·확인·로딩|텍스트/키/음영|해당 없음|추가 PNG 없음. 현행 텍스트·라인·음영, 공통 선택만 재사용 (현행)|
|마을·월드 배경|배경/캐릭터/건물|해당 없음|팀 프로젝트 자산 연결. UI 패키지 제외. 시안용 배경 PNG를 게임 스프라이트로 대체하지 않음 (외부 의존)|

## 아직 결정/연결이 필요한 항목
지도 이벤트4종 완료/임시 기호의 에셋 지정은 미결정. 폰트는 기존 로컬 방식으로 패키지에 포함하지 않음. 일반 확인창은 현재 CSS 구성이고 말풍선 프레임으로 일괄 교체하지 않음. PNG가 없는 글자·게이지·키캡을 누락 에셋으로 판단하지 않는다.
