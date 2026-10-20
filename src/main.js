/**
 * editorCore — 여러 플러그인이 같이 쓰는 편집기 라이브러리(CodeMirror 5) 공용 플러그인.
 *
 * 화면 기능 없음(FAB 없음). CodeMirror와 모드·애드온·CSS를 한 번만 번들해서 등록만 한다.
 *
 * 쓰는 쪽:
 *   $u.plugins.addPlugin('mustacheEditor', {
 *       requires: ['editorCore'],                                   // 어댑터가 없으면 자동 로드 + 먼저 init
 *       init: () => { const CodeMirror = $u.plugins.getPlugin('editorCore').CodeMirror; ... }
 *   });
 *   - 파일 최상단에서 꺼내지 말 것 (플러그인 파일 실행 순서는 보장되지 않음, init 이후는 보장됨)
 *   - 플러그인 고유 모드(mustache 오버레이 등)는 각 플러그인 init 에서 defineMode
 *
 * 원칙:
 *   - 라이브러리만 담고 도메인 로직은 넣지 않는다
 *   - 쓰는 플러그인이 필요로 하는 모드·애드온은 합집합으로 여기에 추가 (추가 = minor 버전업)
 *   - CodeMirror 업그레이드 = editorCore 버전업 (호환 깨지면 major)
 *   - window 전역에 올리지 않는다 (다른 화면 코드와 충돌 방지)
 */
import CodeMirror from 'codemirror';
// 모드
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript'; // json 포함
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
// 애드온
import 'codemirror/addon/mode/overlay'; // mustacheEditor: {{ }} 오버레이
import 'codemirror/addon/merge/merge'; // webdataVcs: 비교·병합 창 (diff_match_patch 는 webpack ProvidePlugin 으로 번들 내부 주입)
// CSS (style-loader 가 런타임에 <style> 로 주입)
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/merge/merge.css';
import 'codemirror/theme/idea.css';

$u.plugins.addPlugin('editorCore', {
    version: '1.0.0',
    // 등록 시점에 바로 담아둠 — 쓰는 플러그인의 init 보다 이 파일 실행이 늦어도 init 시점엔 이미 등록돼 있음
    CodeMirror: CodeMirror,
    init: () => {}
});
