# editorCore

여러 플러그인이 같이 쓰는 편집기 라이브러리(CodeMirror 5) 공용 플러그인. 화면 기능은 없다(FAB 없음).

| 포함 | 내용 |
|---|---|
| CodeMirror | 5.65.21 |
| 모드 | xml, javascript(json), css, htmlmixed |
| 애드온 | mode/overlay, merge (+ diff-match-patch) |
| CSS | codemirror, merge, theme idea (런타임 주입) |

## 쓰는 법

```js
$u.plugins.addPlugin('myPlugin', {
    requires: ['editorCore'], // 어댑터가 자동 로드 + 먼저 init
    init: () => {
        const CodeMirror = $u.plugins.getPlugin('editorCore').CodeMirror;
    }
});
```

- **파일 최상단에서 꺼내지 말 것.** 플러그인 파일 실행 순서는 보장되지 않고, init 이후는 보장된다.
- 플러그인 고유 모드(mustache 오버레이 등)는 각 플러그인 init 에서 `defineMode`.
- `window.CodeMirror` 전역으로 올리지 않는다.
- `requires` 자동 로드는 어댑터(unidocuPlugins) 의존성 지원 버전부터. 그 전 어댑터는 config `extraPlugins`에 `editorCore`도 적어야 한다.

## 원칙

- 라이브러리만 담고 도메인 로직은 넣지 않는다.
- 쓰는 플러그인이 필요로 하는 모드·애드온은 합집합으로 여기에 추가한다 (minor 버전업).
- CodeMirror 업그레이드는 editorCore 버전업, 호환이 깨지면 major.

## 사용 중인 플러그인

- mustacheEditor — HTML+mustache 소스 편집
- webdataVcs — JSON 비교·3-pane 병합

## 빌드

```bash
npm ci
npm run build   # webpack → dist/plugin.js (UMD)
```
