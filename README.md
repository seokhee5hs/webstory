# webstory · 서사공방 웹소설 기획실

공개 웹앱: **https://seokhee5hs.github.io/webstory/**

GitHub Pages 주소에서 10가지 창작 요소와 인물 관계·화법을 직접 편집하는 앱입니다. README 문서를 게시하거나 다른 사이트로 자동 이동하는 방식이 아닙니다.

## GitHub Pages 버전

- 로그인 없이 기획 편집, 예시 기획, 인물 카드, 관계별 말투 승인
- 현재 브라우저에 기획 저장 및 불러오기
- JSON 가져오기/내보내기, Markdown 기획안 및 개발 맥락 내보내기
- AI 연결은 미정이며 API 키 입력이나 AI 요청을 실행하지 않음

브라우저 데이터를 지우거나 다른 기기를 사용하면 저장한 기획을 볼 수 없습니다. 중요한 기획은 JSON으로 내보내 보관하세요. 비공개 탐색에서는 저장 내용이 유지되지 않을 수 있습니다.

기존 ChatGPT Sites의 기획은 https://novel-planning-crsm.metaoh.chatgpt.site/ 에서 JSON으로 내보낸 뒤 새 앱의 **불러오기 → 기획 JSON 가져오기**로 이동할 수 있습니다. 두 사이트는 자동 동기화되지 않습니다. 기존 사이트와 데이터는 유지됩니다.

## 개발과 검사

Node.js 22.13 이상, pnpm 11.25.0을 사용합니다.

```sh
npx --yes pnpm@11.25.0 install --frozen-lockfile
npm run dev:pages
npm run test:storage
npm run build:pages
npm run preview:pages
```

GitHub Pages는 `/webstory/` 경로를 사용하며 빌드 결과는 `github-dist/`에 생성됩니다. 새 클론에서 기본 설치가 가능하며, OneDrive 파일 잠금이 발생하면 동기화되지 않는 폴더에서 작업하세요.

## 자동 배포

저장소 Settings → Pages → Source는 **GitHub Actions**로 설정합니다.

`.github/workflows/ci.yml`이 main push 시 타입 검사, 저장 테스트, 기존 서버 빌드, Pages 앱 빌드를 수행한 후 `github-dist/`만 GitHub Pages에 배포합니다. Pull request에서는 검사만 수행합니다. README나 서버 코드, API 키, 사용자 기획을 배포 파일에 포함하지 않습니다.

## 기존 서버 버전과 향후 API

기존 Sites용 서버 코드와 D1 마이그레이션은 보존합니다. `npm run dev` 및 `npm run build`는 기존 서버 버전용입니다. Sites 배포는 별도이며 GitHub Actions가 Sites에 배포하지는 않습니다. 플랫폼 구성은 `PLATFORM.md`, 연구·기능 맥락은 `PROJECT_CONTEXT.md`를 참고하세요.

AI를 GitHub Pages 앱에 추가하려면 별도 인증·API 서버와 연결해야 합니다. 운영자 키를 사용할지, 사용자 키를 사용할지는 추후 결정합니다. API 키를 GitHub나 공개 프런트엔드에 넣지 않습니다.
