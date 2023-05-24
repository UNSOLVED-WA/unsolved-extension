# Unsolved.wa Extension

## 디렉토리 구조

```shell
src
├── background        # background script
├── contentScript     # conteent script(for injection)
├── popup             # action script
├── static            # manifest.json & images
├── test              # experimental function
└── utils             # common utility functions
```

</br>
</br>

## 번들링 구조

```javascript
entry: {
  popup: path.resolve('src/popup/main_popup.tsx'),
  background: path.resolve('src/background/background.ts'),
  contentScript: path.resolve('src/contentScript/main.tsx'),
  autoScoring: path.resolve('src/contentScript_autoScoring/autoScoring.ts'),
}
```

extension에서 동작하는 4개의 스크립트 생성

1. popup : 크롬 우측 상단 extension icon을 누르면 나오는 option view
2. background : 백그라운드에서 돌아가는 서비스워커 스크립트
3. content script : 웹페이지에 주입되는 main client 스크립트
4. autoScoring : 웹페이지에 주입되는 자동 채점 스크립트

</br>
</br>

## 관련 개발기

- [chrome extension 프로젝트 시작!](https://80000coding.oopy.io/916929f7-401d-4436-aa8b-d6c30359155d)

- [chrome extension 시작부터 끝까지](https://80000coding.oopy.io/34a2083b-c159-4524-b5f2-750d3ab4fbba)

- [extension에서 사용하는 eventListener](https://80000coding.oopy.io/b365ed79-fd40-4806-bf08-7589d007e7c7)
