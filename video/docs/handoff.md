# 영상 작업 인수인계

## 역할

이규재가 맡은 Deviant 홍보 영상 작업이다. 지금은 게임 화면 없이 만드는 시네마틱 티저(단편 + 발표 오프닝)를 만든다. 이미지, 영상 생성, 편집은 사용자와 ChatGPT가 하고, Claude는 레포 준비와 검토를 맡는다.

## 먼저 읽을 것

1. [설계](specs/2026-11-04-cinematic-teaser-design.md): 왜, 무엇을, 어떤 톤으로
2. [작업 계획](plans/2026-11-04-cinematic-teaser-plan.md): T0~T13 단계, 컷표, 파일 이름, 작업 기록 양식
3. [STATUS](STATUS.md)와 최근 [log](log/)

## 작업물 위치

- 모든 작업물: `work/teaser/` (폴더 설명은 [README](../README.md))
- Higgsfield 프로젝트: `Deviant Teaser` (폴더 B1~B5, OP, Inserts, Refs, Tests)

## 팀 기준을 볼 곳 (팀 레포, 읽기 전용)

- 초반 이야기: `docs/design/story/opening.md`
- 아트 기준: `docs/design/art-and-presentation.md`, `docs/assets/stage1-village-art-direction.md`
- 주인공 스프라이트: `unity/Assets/Deviant/Combat/Resources/UnarmedBody/idle/`
- 마을 시안 설명: `Stage1VillageReference/ArtDirection/phase2-selected/`

## 주의

- 지워짐의 원인, 「저 너머」의 정체 등 팀이 정하지 않은 설정을 영상이 확정하지 않는다.
- 공포 영상으로 가지 않는다(피, 비명, 점프 스케어 없음).
- 생성 이미지와 영상 안에 글자를 넣지 않는다. 제목은 편집에서 올린다.
- Higgsfield 구독 11/15 만료 전에 생성본을 모두 내려받는다.
- 레포가 공개 상태라 아직 공개 전인 영상은 올리기 전에 확인한다.

## 사용자 선호

- 편집 경험이 없어 GPT의 안내를 받아 편집한다.
- Claude에게 검토를 맡길 때는 `docs/log/`와 `work/teaser/06_edit/edit-notes.md`를 근거로 한다.

## 2026-11-06 · 작업 경로 및 GitHub

- 현재 작업 폴더: `/Users/leekyujae/Desktop/개인/SSAFY/3rd PJT/deviant-work/video-design` (실제 파일명은 macOS Unicode 정규화 적용). 이전 `deviant-work/video` 경로 대신 이 작업 폴더를 사용한다.
- 저장소: https://github.com/l-egulation/deviant-work · 브랜치 `work/video`.
- T7 컷표 초안까지 작성, T8 미착수. 사용자 다음 지시 후 진행한다.
- 채택 기준 미디어만 LFS에 올린다. 로그·프롬프트가 언급하는 탈락/검토 후보 미디어와 비교 HTML은 로컬 전용이다.
