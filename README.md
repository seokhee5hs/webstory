# webstory · 서사공방 웹소설 기획실

웹소설의 10가지 창작 요소와 인물 관계·화법을 작성하는 웹앱입니다.

- 웹사이트: https://novel-planning-crsm.metaoh.chatgpt.site/
- 소스 저장소: https://github.com/seokhee5hs/webstory (비공개)
- 기획 편집, JSON 가져오기/내보내기, Markdown 기획안 내보내기
- ChatGPT 로그인 후 사용자별 서버 저장 및 불러오기
- 선택 기능: 사용자 API 키를 이용한 AI 보완, 기획안 생성, 설정 검토

## 개발 환경

Node.js 22.13 이상과 pnpm 11.25.0을 사용합니다. 기존 잠금 파일을 유지합니다.

```sh
npx --yes pnpm@11.25.0 install --frozen-lockfile
npm run dev
npm run build
```

Windows에서도 개발할 수 있습니다. Sites의 portable 실행 프로필을 설정한 뒤 개발 서버를 실행합니다. 로컬 로그인은 `/signin-with-chatgpt?return_to=/`에서 개발용 계정을 사용하며, 실제 배포 인증과는 다릅니다. 자세한 플랫폼 구성은 `PLATFORM.md`에 있습니다.

## 공개 범위와 데이터

웹페이지는 공개하고 GitHub 코드는 비공개로 관리합니다. 방문자는 로그인 없이 작성 및 파일 내보내기를 할 수 있습니다. 서버 저장과 AI 요청은 로그인해야 합니다. 저장된 기획은 사용자 ID로 분리됩니다. 로그인/로그아웃 전 저장하지 않은 기획을 JSON으로 내보내세요.

## API 운영 방식: 결정 보류

현재 구현은 사용자 키 입력 방식입니다. API 키는 현재 화면의 메모리에서만 유지하며 요청 시 서버로 전달됩니다. 서버가 OpenAI를 호출하며 키를 데이터베이스나 브라우저 저장소에 저장하지 않습니다. 새로고침하면 키를 다시 입력해야 합니다. 별도 운영자 API 키는 설정하지 않았습니다.

운영자 비용 부담 방식으로 바꾸려면 서버 비밀값, 사용자별 사용량 제한, 비용 한도와 남용 방지를 함께 추가해야 합니다. API 키를 GitHub, 프런트엔드 코드 또는 공개 환경변수에 넣지 않습니다.

## 배포

현재 호스팅은 기존 ChatGPT Sites를 사용합니다. `.openai/hosting.json`의 기존 프로젝트 ID와 D1 바인딩을 유지합니다. GitHub에 push하는 것만으로 Sites에 자동 배포되지는 않습니다. Sites 도구에서 소스 동기화, 빌드, 버전 저장, 배포를 수행해야 합니다.

GitHub Actions는 push 및 pull request에서 타입 검사와 빌드를 수행합니다. 배포 권한이나 API 비밀값은 필요하지 않습니다. 다른 호스팅으로 옮길 경우 현재의 Sites 인증 헤더와 D1 연결을 해당 서비스에 맞게 변경해야 합니다.

기능과 연구 맥락은 `PROJECT_CONTEXT.md`를 참고하세요.
