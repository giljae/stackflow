# Stackflow (스택플로우)

Stackflow는 [Gstack](https://github.com/garrytan/gstack)의 **전략적 의사결정 체계**와 [Superpowers](https://github.com/obra/superpowers)의 **엄격한 소프트웨어 엔지니어링 실행 규율**, 그리고 극단적 토큰 절약을 위한 **AST 기반 컨텍스트 엔진**을 하나로 통합한 차세대 AI 에이전트 런타임입니다.

이 프로젝트는 전적으로 [Antigravity](https://github.com/google/antigravity) 생태계 위에서 네이티브 `@` 스킬 모듈로 구동됩니다.

---

## 🎯 패키지의 취지와 철학

오늘날의 AI 코딩 도구들은 마치 전지전능한 지니(Genie)처럼 다뤄집니다. 한 줄짜리 프롬프트로 1,000줄의 코드를 내뱉게 만들면 아키텍처는 무너지고, 테스트는 깨지며, 컨텍스트 용량만 거대해집니다.

**Stackflow는 이 문제를 "노동 분업화"로 해결합니다.**
아무리 뛰어난 AI라도 "CEO 페르소나"가 시장 가치(PMF)를 승인하기 전까지는 절대 코드를 짜지 못하게 막고, "엔지니어 페르소나"가 실패하는 테스트 코드를 먼저 짜기 전까지는 프로덕션 코드를 쓸 수 없게 강제합니다. 스스로 생각하는 AI에게 인간 최고 수준의 조직 규율(Discipline)을 부여하는 것이 이 패키지의 존재 이유입니다.

---

## 🚀 파워 스택 (3계층 아키텍처)

Stackflow는 에이전트들을 3개의 뚜렷한 레이어로 분할하여 페르소나 충돌을 막고 최고 수준의 엔지니어링 품질을 유지합니다:

1. **Decision Layer (의사결정 - `@sf-think`, `@sf-challenge`)**: CEO 및 YC 파트너 역할을 합니다. 코드를 짜기 전에 "왜 이걸 만드는가?", "시장이 진정 원하는가?"를 혹독하게 검증하고, MVP 단위로 만들 기능을 무자비하게 쳐냅니다.
2. **Environment Layer (작업환경 - `@sf-plan`, `@sf-autoplan`)**: `git worktree`를 이용해 안전하게 격리된 작업 환경을 세팅하고, 프롬프트 캐싱을 위해 전체 저장소의 요약 구조를 만드는 AST Repo Map(`.stackflow-context.md`)을 생성합니다.
3. **Execution Layer (실행 - `@sf-build`, `@sf-review`, `@sf-debug`)**: 무조건 실패하는 테스트부터 작성하게 만드는 TDD (RED-GREEN-REFACTOR)를 강제하는 실행 엔진 레이어입니다.

---

## 📦 전역 설치 (Global) vs 로컬 문맥 격리 (Local Isolation)

Stackflow 패키지는 시스템 전역에 단 한 번 설치됩니다. 하지만 **"프로젝트들이 서로 꼬이지 않을까?"** 하는 걱정은 접어두셔도 좋습니다!

* **전역 행동 강령(Global Rulebook)**: 시스템 글로벌 경로(`~/.gemini/antigravity/skills`)에 설치되는 파일들은 순수하게 "TDD를 해라", "테스트 없이 커밋하지 마라" 같은 **지침서** 역할만 수행합니다.
* **로컬 격리(Fierce Local Context)**: 사용자가 `A_project` 폴더에서 터미널을 열고 `@sf-think`를 치면, AI는 전역 지침서(Rule)를 읽어오지만 **기억력과 분석 대상(눈)**은 철저하게 현재 `A_project` 내부의 파일과 메모리로만 완전히 샌드박스 격리됩니다. 동시에 여러 폴더에서 Stackflow를 돌려도 Context Contamination(꼬임)이 절대 발생하지 않습니다.

---

## 🛠 9단계 코어 스킬 파이프라인

Stackflow는 순차적으로 실행되는 9개의 코어 스킬을 제공합니다. 아래 명령어로 소프트웨어 팩토리(공장)를 지휘하세요:

- `@sf-think` : 아이디어 기획, 엣지 케이스 발굴 및 PMF 검증. `design-doc.md`를 산출합니다.
- `@sf-challenge` : 기획서에 대한 전략적 도전 및 극단적인 MVP 범위 축소.
- `@sf-plan` : 아키텍처 리뷰, 워크트리 세팅, AST 매핑 및 원자 단위의 `task.md` 생성.
- `@sf-autoplan` : CEO ➡️ 디자인 ➡️ 엔지니어 리뷰를 사람의 개입 없이 연쇄적으로 자동 처리.
- `@sf-build` : 실제 코딩을 수행하는 메인 엔진. 무조건적 TDD 규율 적용 (`RED-GREEN-REFACTOR`).
- `@sf-debug` : 트러블슈팅 클리닉. 원인을 모르는 상태에서 무작정 코드를 패치하는 것을 철저히 금지합니다.
- `@sf-review` : 코드 품질 향상 및 1티어 적대적 보안 취약점 점검 (`/codex`).
- `@sf-qa` : 브라우저 봇을 통한 자동화 UI 테스트 탐색 및 버그 헌팅.
- `@sf-ship` : 테스트 100% 통과 확인, 버전 범핑, 저장소 정리 및 Pull Request 발행.

---

## 🔄 업스트림 직접 동기화 (Dynamic Sync)

일반적인 AI 프롬프트가 단지 "gstack처럼 똑똑하게 행동해!"라고 말하는 것에 그친다면, Stackflow는 **원작자가 쓴 가이드라인 코드를 훔쳐와서 실시간으로 읽게** 만듭니다.

NPM 패키지를 설치(`stackflow install`)하거나 `stackflow sync` 명령어를 명시적으로 칠 때마다, 내부 CLI 스크립트가 능동적으로 Github의 `garrytan/gstack` 및 `obra/superpowers` 저장소를 당신의 기기에 복제(`git clone`)합니다. 무겁고 낡은 원본 코드는 전역 `references/` 경로에 심어두며, Stackflow의 각 스킬들은 호출될 때마다 이 원본 텍스트를 실력 행사 기준으로 따르게 됩니다.

```bash
# 강제로 Github에서 최신 룰셋을 다시 가져오고 싶을 때 치는 명령어
stackflow sync
```

---

## 📥 설치 방법 및 사용 예제

NPM을 통해 아주 쉽게 시스템에 적용시킬 수 있습니다.

```bash
# 1. NPM으로 실행 CLI 전역 설치
npm install -g @runchr/stackflow

# 2. Antigravity 런타임에 글로벌 스킬 복사 및 Github 최신화
stackflow install
```

*(전역 설치가 번거롭다면 npx 1회용 병합 명령어로도 설치가 가능합니다: `npx @runchr/stackflow install`)*

### 퀵 스타트
어떤 로컬 프로젝트 폴더에서든 터미널을 열고 대화를 시작하세요:

```bash
# 1. 기획/전략 단계 시작
> @sf-think "실시간 멀티 커서가 지원되는 구글 닥스 클론을 만들고 싶어"

# 2. 엔지니어링 세팅 (AST 컨텍스트 맵 생성)
> @sf-plan "방금 통과된 기획서(design-doc.md)를 바탕으로 태스크를 짜줘"

# 3. TDD 기반 코딩 시작
> @sf-build "작성된 task.md를 기반으로 테스트 주도 개발을 시행해"
```
