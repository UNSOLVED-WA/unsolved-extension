# Unsolved.wa extension

### 프로젝트 설명

// 설명 추가

### 개발기

// 개발기 링크 추가

### 프로젝트 구조

// 이미지 추가

### 프로젝트 용어 설명

> Content scripts
>
> Content scripts are files that run in the context of web pages. By using the standard Document Object Model (DOM), they are able to read details of the web pages the browser visits, make changes to them, and pass information to their parent extension.

> Service Worker
>
> Extensions are event-based programs used to modify or enhance the Chrome browsing experience. Events are browser triggers, such as navigating to a new page, removing a bookmark, or closing a tab. Extensions monitor these events using scripts in an extension service worker (previously called a background script), which then executes specified instructions.

> Actions
>
> Every extension requires a manifest, though most extensions will not do much with just the manifest. For this quick start, the extension has a popup file and icon declared under the action field:

### 프로젝트 디렉토리 구조

```
.
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── @types                    # global types
│   ├── api                       # api libraries
│   ├── background                # background script
│   ├── contentScript             # content script (main service)
│   ├── contentScript_autoScoring # content script (autoscoring)
│   ├── popup                     # popup script
│   ├── static                    # assets
│   └── utils                     # global utils
├── svg.d.ts
├── tsconfig.json
├── webpack.common.js
├── webpack.config.js
├── webpack.dev.js
└── webpack.prod.js

```
