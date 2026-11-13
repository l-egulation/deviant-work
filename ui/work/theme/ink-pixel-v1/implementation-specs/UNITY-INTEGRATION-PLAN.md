# Unity 적용 준비 및 승인 범위

2026-11-13 · 팀 저장소 a51d555af를 읽기 전용으로 확인. 실제 Unity 실행·변경 없음. HUD·타이틀은 보류.

## 현재 확인된 구조
- Unity 6000.6.5f1, uGUI 2.6.0, Input System 1.20.0.
- `unity/Assets/Deviant/Game/Runtime/TemporaryGameGui.cs`: ScreenSpaceOverlay Canvas, ConstantPixelSize와 FitToWorld. 새 시안의 1920×1080 기준을 기존 배율과 중복 적용하면 안 됨.
- `TemporaryGameGui.EquipmentBook.cs`: 팔레트·성장·스탬프 등 이전 책 UI도 남아 있음. 이를 현행 제작 화면으로 오인해서 단순 교체하지 않음.
- `TemporaryGameGui.Input.cs`: LocalInputUIBinding, Poll, Pause/Cancel 소비 및 gameplay 차단 경로 존재.
- `UI/Runtime/Presentation/ScreenRouter.cs`: 화면 소유권·초점 복귀·PauseSimulation·BlockedInput·Back 처리. `UI/Unity/ScreenInputBinding.cs`는 입력 바인딩 어댑터. 기존 라우터와 중복된 전역 입력 처리기를 만들지 않음.
- `Run/Runtime/SketchEquipment.cs`: 실제 스케치·등록 잉크·슬롯·기본/색 일치 수치·내구도 상태 제공. RunInkWeapon.Durability/Maximum으로 퍼센트 계산. 임시 HTML 데이터를 런 데이터로 복사하지 않음.

## 연결 전에 해결할 데이터 차이
**실행용 잉크는 현재 36종이며 기존 승인 패키지는 43종 기준이다.**
팀 문서 `docs/design/equipment/inks/names-and-descriptions.md`와 `docs/development/data/data-pipeline.md`, RunInkCatalog.Validate의 36종 검증이 일치한다.
원본은 `data/combat/weapon_ink_run_design.json`, 생성 출력은 `Combat/Resources/RunInks.json`이다.
36종의 ID·설명·조건·효과와 기존 43종 에셋을 행별 대조해야 한다. 기존 승인 PNG는 삭제하지 않으며, 비활성/재사용/신규 필요를 분리한다. 이 대응 완료 전 실제 가방·제작·장비 데이터 연결 완료를 선언하지 않는다. 메뉴 입력 등 이미 확정된 office hour 규칙은 재결정하지 않는다.

## 첫 적용 제안 — 승인 후에만 팀 저장소 작성
우선 UI 공통 부품을 검증하는 독립 화면만 만든다.
- 제안 경로: `unity/Assets/Deviant/UI/ThemePreview/` 아래 테스트 씬·프리팹·보기 전용 코드·테스트용 에셋.
- 범위: 폰트 로딩, 승인 프레임 분할, 선택 붓칠, 팔레트 3레이어, 1920×1080/960×540 배율, 방향키/F/Esc 초점 이동.
- 기존 게임 씬·런 저장·게임 규칙·HUD·타이틀 연결은 이 첫 묶음에 포함하지 않는다.
- 외부 폰트는 팀이 확보한 파일 사용. UI 저장소에 폰트 파일 재배포하지 않는다.
- resources는 별도 LFS 저장소이므로 정식 원화 반영 및 배포 manifest 갱신은 추가 변경 범위로 명시하고 승인받는다. 초기 검증용 승인 PNG 복사도 팀 저장소 변경에 포함한다.
- 팀 레포 안에서 새로운 Unity 실행/메타 생성도 변경을 일으킬 수 있으므로 승인 전 실행하지 않는다.

## 검증 후 순서
1. UI 저장소에서 36종 데이터/에셋 대응표 갱신. 부족한 문양만 별도 검토.
2. 승인된 공통 부품 테스트 씬을 팀 환경에서 검수. 프레임 모서리·픽셀 샘플링·한국어·포커스 복귀 확인.
3. 가방→제작→장비: 데이터 어댑터, 제작 확정 잠금, 6칸, 장착/해제 대기 및 자리 교환 예외 연결.
4. 보상→상점→증강: 실제 후보/가격·중복 지급 차단·재진입 유지 연결.
5. 설정·결과·로딩·월드 이벤트: 실제 설정/저장/방ID/전환 연결.

각 단계는 실게임 상태 검증이 필요하다. 브라우저 시안 통과는 Unity 구현 통과가 아니다.

## 잉크 대응 완료
36종 모두 기존 ID·문양 재사용 가능. 중독 관련7종은 현행 제외 및 원본 보존. UI 공통 데이터와 승인 패키지를 갱신했으며 실제 Unity 바인딩은 아직 하지 않았다. [검토 결과](../ink-migration-v1/README.md).
