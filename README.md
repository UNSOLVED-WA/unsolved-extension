# unsolved-extension

## Usage

1. 레포지토리 클론하기

```
git clone https://github.com/UNSOLVED-WA/unsolved-extension
```

2. 크롬 브라우저에서 아래 링크로 접속하기

```
chrome://extensions
```

3. 우측 상단의 개발자 모드를 켜고, 압축해제된 확장 프로그램을 로드합니다 클릭.
   <!-- ![extension setting example](./asset/example1.png) -->

4. contentScripts 폴더 전체를 선택(manifest.json 파일이 들어있는 폴더를 선택해야함.)
   ![extension directory example](./asset/example2.png)

5. 개발 후 새로고침과 서비스 워커를 활용해서 디버깅
   ![extension debug example](./asset/example3.png)

## 디렉토리 구조

```shell
contentScripts
ㄴ manifest.json  # extension base options
ㄴ background.js  # service worker logic
ㄴ popup.js       # extension process
ㄴ popup.html     # popup html doc
ㄴ style.css      # popup style sheet
```
