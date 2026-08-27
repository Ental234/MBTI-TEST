/* 전 페이지 공통 UI Shell 헤더/푸터 + 다크 모드 토글 */
(function () {
  var PAGES = [
    { href: "index.html", label: "홈" },
    { href: "nt.html", label: "NT 분석형" },
    { href: "nf.html", label: "NF 의미형" },
    { href: "sj.html", label: "SJ 성실형" },
    { href: "sp.html", label: "SP 실전형" },
    { href: "test.html", label: "자가진단" }
  ];

  function currentFile() {
    var name = location.pathname.split("/").pop();
    return name === "" ? "index.html" : name;
  }

  function headerHTML() {
    var cur = currentFile();
    var nav = PAGES.map(function (p) {
      var active = p.href === cur ? ' class="active"' : "";
      return '<a href="' + p.href + '"' + active + ">" + p.label + "</a>";
    }).join("");
    return (
      '<div class="masthead">' +
      '<a class="brand" href="index.html">MBTI <b>공부법 연구소</b></a>' +
      '<div class="header-actions">' +
      '<button type="button" id="theme-toggle" class="icon-btn" aria-label="다크 모드로 전환">☾</button>' +
      '<a class="header-cta" href="test.html">자가진단 시작</a>' +
      "</div></div>" +
      '<nav class="mastnav">' + nav + "</nav>"
    );
  }

  function footerHTML() {
    var links = PAGES.map(function (p) {
      return '<a href="' + p.href + '">' + p.label + "</a>";
    }).join("");
    return (
      '<div class="container">' +
      '<div class="fnav">' + links + "</div>" +
      "<p>MBTI 공부법 연구소 · 재미로 보는 학습 성향 콘텐츠입니다. 진단 결과는 참고용이에요.</p>" +
      "</div>"
    );
  }

  function theme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  function syncToggle() {
    var b = document.getElementById("theme-toggle");
    if (!b) return;
    var dark = theme() === "dark";
    b.textContent = dark ? "☼" : "☾";
    b.setAttribute("aria-label", dark ? "라이트 모드로 전환" : "다크 모드로 전환");
  }
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch (e) {}
    syncToggle();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var h = document.getElementById("site-header");
    var f = document.getElementById("site-footer");
    if (h) h.innerHTML = headerHTML();
    if (f) f.innerHTML = footerHTML();
    syncToggle();
    var b = document.getElementById("theme-toggle");
    if (b) b.addEventListener("click", function () {
      setTheme(theme() === "dark" ? "light" : "dark");
    });
  });
})();
