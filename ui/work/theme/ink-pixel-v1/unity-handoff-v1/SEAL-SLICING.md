# 봉인 진행 분할

원본: sources/world-flows-v1/assets/seal-progress-v2.png (2172×724). 그림 변경 없음.

|ID|상태|좌상단 rect x,y,w,h|Unity 아래원점 rect|
|---|---|---|---|
|seal-progress/pending|대기|0,0,724,724|0,0,724,724|
|seal-progress/current|현재|724,0,724,724|724,0,724,724|
|seal-progress/complete|완료|1448,0,724,724|1448,0,724,724|

모두 중심 pivot(0.5,0.5), Point/None/FullRect/mipmap 없음. 원본 전체 ID는 기존 호환을 위해 유지하며 실제 진행 셀은 위 세 ID 사용. view와 rect 동일, 개별 그림의 투명 여백을 자동 트리밍하지 않는다. Unity y변환은724−0−724=0.

화면 페이지 i가 currentPage보다 작으면 완료, 같으면 현재, 크면 대기. 표시 크기66px, 간격24px, 현재1.12배, 대기 opacity .6. 실제 페이지 수/전투 판정은 게임 데이터 소유. 패키지 미리보기의 ‘봉인 진행 상태’ 그룹에서 원본/패키지 나란히 확인 가능.
