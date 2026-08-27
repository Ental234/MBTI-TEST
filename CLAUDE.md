# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트

MBTI 공부법 연구소 — 여러 개의 HTML 페이지로 구성된 정적 콘텐츠 사이트.

## 디자인

IBM Carbon Design System(ibm.com/kr-ko)을 따른다. 아래 규칙이 이전의
"크림 배경 + 보라 포인트 + Pretendard + 라운드"를 대체한다.

- 타이포그래피: IBM Plex Sans + IBM Plex Sans KR (Google Fonts CDN), 본문 14px(0.875rem),
  제목은 light(300)~regular(400) 굵기
- 색상: 흰색/그레이(Carbon Gray 10~100) 배경 + IBM Blue `#0f62fe` 인터랙션 컬러
- 모서리: 라운드 없음(`border-radius: 0`). 얇은 1px 보더와 좌측 3px 액센트 바로 구획한다.
- 버튼: 사각형, 최소 높이 48px, 텍스트 좌측 정렬 + 우측 여백이 넓은 Carbon 스타일
- 헤더: 상단 고정(sticky) 2단 UI Shell — 검정(`#161616`) 마스트헤드 + 네비게이션 바.
  마스트헤드 우측에 다크 모드 토글(아이콘 버튼)과 `자가진단 시작` CTA 버튼을 둔다.
- 라이트/다크 모드: `<html data-theme="light|dark">` + `localStorage['theme']`에 저장.
  각 HTML `<head>` 최상단의 인라인 스크립트가 FOUC를 방지하고, 헤더 토글 버튼으로 전환한다.
  저장값이 없으면 `prefers-color-scheme`를 따른다.
- 색상 토큰은 `css/style.css` 상단의 CSS 커스텀 프로퍼티
  (`:root` = 라이트, `:root[data-theme="dark"]` = 다크)에 정의한다.
- 모바일 반응형 유지 (`@media (max-width: 640px)`)

## 규칙

- 서버, API, 키를 절대 사용하지 않는다. 정적 파일(HTML/CSS/JS)만으로 구현한다.
  (웹폰트는 Google Fonts CDN CSS만 허용 — 정적 파일이며 키가 없다.)
- 파일이 300줄을 넘으면 작업을 진행하기 전에 파일 분리를 먼저 제안한다.
- 공통 헤더/푸터/네비게이션과 테마 토글은 `js/common.js`가 주입한다. 페이지별 HTML에
  중복 작성하지 않는다.
