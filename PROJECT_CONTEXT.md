# 서사공방 개발 맥락

## 목적과 현재 구현
작가가 장르, 주제, 인물, 목표, 갈등, 사건, 배경, 세계관, 시점, 서사 구조를 직접 입력하고 AI 제안을 확인하여 기획을 발전시키는 웹앱이다.

제목과 로그라인, 10요소 편집, 인물 카드, 방향성 관계별 말씨·호칭·자칭·상황·예외·유효 시점·승인 버전, 사용자별 서버 저장, JSON과 Markdown 내보내기, JSON 가져오기, Codex 인계 문서 다운로드를 구현한다.

AI는 현재 요소 보완, 전체 기획안 생성, 설정 충돌 검토를 제공한다. OpenAI Responses API를 서버에서 호출한다. 키는 화면에 입력하고 React 메모리에만 유지한다. 요청 헤더로 전송하며 코드·로그·D1·localStorage·sessionStorage·내보내기에 저장하지 않는다. 결과는 작가가 반영 버튼을 눌러야 기획에 반영된다.

## CRSM 연구 연결
작가가 승인한 관계별 화법을 유지하려는 연구의 입력 계층이다. A→B와 B→A를 따로 설정하고 나이·성별·직위만으로 화법을 확정하지 않는다. 공적·사적 상황, 승인된 전환 시점과 버전을 저장한다. 현재 앱은 실제 화법 검증기나 장편 무오류 보장 도구가 아니다.

## 다음 구현
1. 작가 원본 설정을 보존하는 승인 화법 규칙 정규화
2. 회차별 관련 규칙 주입과 장면·화자·청자·높임 대상 식별
3. 종결형과 호칭 규칙 검사 및 LLM 맥락 판단
4. 판정 유보와 최소 교정 제안 및 작가 승인
5. 원문·제안문·승인문·규칙 버전·근거·비용·수정 시간 로그
6. 구조화 규칙 주입 × 사후 검증·교정의 2×2 실험과 검증기 제거 비교

## 소스
- app/workspace.tsx: 편집과 승인 UI
- lib/planning.ts: 10요소, 스키마, 검증, 예시, 내보내기
- lib/ai.ts: 프롬프트와 응답 추출
- app/api/ai/route.ts: 키를 저장하지 않는 AI 서버 호출
- app/api/plans/route.ts: 사용자별 저장과 낙관적 버전 검사
- db/schema.ts, drizzle/: D1 스키마와 생성 마이그레이션

## 별도 Codex에서 계속하기
이 소스 폴더를 프로젝트로 열고 이 문서와 CRSM 연구설계 DOCX를 제공한다. 앱에서 Codex 개발 맥락 또는 기획 데이터 JSON을 내려받아 작품 상태를 제공한다. 새 프로젝트에 기존 대화가 자동 전달되었다고 가정하지 않는다.

## 개발 환경
Node 22.13 이상. 현재 package manager와 lockfile을 보존한다. npm run dev, npm run build, npm run db:generate 스크립트가 있다. Sites는 .openai/hosting.json의 project_id를 재사용한다. 저장에는 D1 바인딩과 마이그레이션이 필요하다. 사용자별 인증은 app/chatgpt-auth.ts를 사용하며 로컬 개발은 README의 portable 개발 인증 방식을 따른다. WebMCP를 지원하지 않는 브라우저에서도 UI는 작동한다.

## 2026-10-09 GitHub Pages 공개 버전
- 대표 주소: https://seokhee5hs.github.io/webstory/
- pages/main.tsx와 vite.pages.config.ts가 기존 Workspace를 재사용해 독립적인 정적 앱을 빌드한다.
- localOnly 모드에서는 lib/local-plans.ts로 현재 브라우저에만 기획을 저장하고 서버 API를 호출하지 않는다.
- AI 연결 방식은 미정이며 안내만 제공한다. 기존 Sites 서버 구현과 데이터는 유지된다.
- GitHub Actions는 main push 후 검사와 Pages 배포를 수행한다. 기존 Sites의 배포는 변경하지 않는다.
