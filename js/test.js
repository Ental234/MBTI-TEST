/* 공부 습관 자가진단 — 10문항 합산, 최고점수 그룹 판정 */
(function () {
  var GROUPS = {
    nt: {
      name: "NT · 분석형 전략가",
      page: "nt.html",
      desc: "원리와 구조를 먼저 이해해야 직성이 풀리는 타입이에요. 개념 지도를 그리고 '왜'를 파고든 뒤, 이해한 내용을 바로 문제로 인출할 때 학습 효율이 폭발합니다."
    },
    nf: {
      name: "NF · 의미형 이상가",
      page: "nf.html",
      desc: "배움에 의미와 이야기가 있어야 몰입하는 타입이에요. 내용을 '나'와 연결하고, 사람과 함께 가르치며, 이미지로 시각화할 때 오래 기억에 남습니다."
    },
    sj: {
      name: "SJ · 성실형 관리자",
      page: "sj.html",
      desc: "계획과 반복, 꾸준함이 가장 큰 무기인 타입이에요. 회독 주기와 체크리스트로 진도를 쌓을 때 가장 안정적으로 성적이 오릅니다. 응용 문제 훈련만 더하면 완성형이에요."
    },
    sp: {
      name: "SP · 실전형 탐험가",
      page: "sp.html",
      desc: "짧고 강한 몰입과 실전 감각이 강점인 타입이에요. 개념 정독보다 문제부터 풀고, 타이머로 스퍼트를 낼 때 집중력이 살아납니다. 매일 최소치만 지키면 강력해요."
    }
  };

  var ORDER = ["nt", "nf", "sj", "sp"];

  var QUESTIONS = [
    { q: "새 과목을 시작할 때 나는…", a: [
      { g: "nt", t: "전체 목차와 원리를 먼저 훑고 나만의 학습 지도를 그린다" },
      { g: "nf", t: "이 내용이 내 삶·세상과 어떻게 연결되는지 의미부터 찾는다" },
      { g: "sj", t: "검증된 인강과 교재를 정하고 진도표부터 짠다" },
      { g: "sp", t: "일단 기출문제부터 풀어보며 감을 잡는다" }
    ]},
    { q: "공부가 가장 잘 되는 순간은…", a: [
      { g: "nt", t: "흩어진 개념이 하나로 연결되며 구조가 보일 때" },
      { g: "nf", t: "좋아하는 사람과 이야기를 나누며 함께 배울 때" },
      { g: "sj", t: "계획한 분량을 순서대로 끝내고 체크할 때" },
      { g: "sp", t: "시간 제한을 두고 실전처럼 몰입해 풀 때" }
    ]},
    { q: "나의 필기 스타일은…", a: [
      { g: "nt", t: "개념 사이의 관계를 화살표로 잇는 구조도" },
      { g: "nf", t: "색과 그림, 키워드 중심의 마인드맵" },
      { g: "sj", t: "강의 순서대로 빠짐없이 정리한 노트" },
      { g: "sp", t: "필기는 최소한, 문제집에 바로 표시" }
    ]},
    { q: "암기 과목을 대하는 나는…", a: [
      { g: "nt", t: "왜 그런지 논리를 붙여야 비로소 외워진다" },
      { g: "nf", t: "스토리나 이미지로 엮어야 외워진다" },
      { g: "sj", t: "반복 회독과 손으로 쓰기로 외운다" },
      { g: "sp", t: "자투리 시간에 퀴즈 앱으로 빠르게 외운다" }
    ]},
    { q: "계획이 틀어졌을 때…", a: [
      { g: "nt", t: "계획 구조 자체를 다시 설계한다" },
      { g: "nf", t: "의욕이 꺾여서 기분 회복이 먼저 필요하다" },
      { g: "sj", t: "스트레스받지만 밀린 분량을 어떻게든 채운다" },
      { g: "sp", t: "크게 개의치 않고 그날 하고 싶은 걸 한다" }
    ]},
    { q: "이해가 안 되는 문제를 만나면…", a: [
      { g: "nt", t: "답지를 덮고 원리부터 다시 파고든다" },
      { g: "nf", t: "잘하는 친구에게 설명을 부탁한다" },
      { g: "sj", t: "해설을 정독하고 유형을 노트에 정리한다" },
      { g: "sp", t: "비슷한 문제를 여러 개 풀며 패턴을 익힌다" }
    ]},
    { q: "나에게 가장 효과적인 복습은…", a: [
      { g: "nt", t: "백지에 전체 구조를 복원해 보기" },
      { g: "nf", t: "배운 내용을 남에게 소리 내어 가르치기" },
      { g: "sj", t: "정해진 주기(1·7·30일)마다 회독하기" },
      { g: "sp", t: "실전 모의고사로 몰아서 점검하기" }
    ]},
    { q: "내가 선호하는 공부 환경은…", a: [
      { g: "nt", t: "방해 없는 조용한 곳에서의 긴 몰입" },
      { g: "nf", t: "마음 맞는 사람과 함께하는 카페·스터디" },
      { g: "sj", t: "늘 같은 자리, 정돈된 책상" },
      { g: "sp", t: "자주 바꿔주는 새 장소와 적당한 배경음" }
    ]},
    { q: "시험이 다가오면 나는…", a: [
      { g: "nt", t: "출제 원리를 분석해 핵심만 골라 판다" },
      { g: "nf", t: "불안을 다스리며 공부할 동기를 다시 세운다" },
      { g: "sj", t: "몇 주 전부터 하루 단위 계획으로 대비한다" },
      { g: "sp", t: "막판 집중력을 믿고 스퍼트를 낸다" }
    ]},
    { q: "공부의 가장 큰 원동력은…", a: [
      { g: "nt", t: "지적 호기심과 '알아냈다'는 성취감" },
      { g: "nf", t: "되고 싶은 나의 모습과 배움의 의미" },
      { g: "sj", t: "책임감과 꾸준함, 안정적인 성적" },
      { g: "sp", t: "눈앞의 목표와 재미, 그리고 경쟁" }
    ]}
  ];

  var toastTimer;
  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.style.cssText =
        "position:fixed;left:50%;bottom:28px;transform:translateX(-50%);" +
        "background:#2C2740;color:#fff;padding:12px 20px;border-radius:999px;" +
        "font-size:.92rem;font-weight:600;box-shadow:0 8px 24px rgba(0,0,0,.2);" +
        "z-index:50;opacity:0;transition:opacity .2s ease;max-width:88vw;text-align:center";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(function () { t.style.opacity = "1"; });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.style.opacity = "0"; }, 2600);
  }

  function renderQuiz(form) {
    var html = "";
    QUESTIONS.forEach(function (item, qi) {
      html += '<div class="q"><p>' + (qi + 1) + ". " + item.q + "</p>";
      item.a.forEach(function (opt, oi) {
        var id = "q" + qi + "o" + oi;
        html +=
          '<label class="opt" for="' + id + '">' +
          '<input type="radio" id="' + id + '" name="q' + qi + '" value="' + opt.g + '" />' +
          opt.t + "</label>";
      });
      html += "</div>";
    });
    form.innerHTML = html;

    form.addEventListener("change", function (e) {
      if (!e.target.name || e.target.name.charAt(0) !== "q") return;
      form.querySelectorAll('input[name="' + e.target.name + '"]').forEach(function (inp) {
        inp.parentNode.classList.toggle("checked", inp.checked);
      });
    });
  }

  function score(form) {
    var counts = { nt: 0, nf: 0, sj: 0, sp: 0 };
    var answered = 0;
    QUESTIONS.forEach(function (item, qi) {
      var picked = form.querySelector('input[name="q' + qi + '"]:checked');
      if (picked) { counts[picked.value]++; answered++; }
    });
    return { counts: counts, answered: answered };
  }

  function topGroups(counts) {
    var max = Math.max(counts.nt, counts.nf, counts.sj, counts.sp);
    return ORDER.filter(function (k) { return counts[k] === max; });
  }

  function scoreChips(counts, tops) {
    return ORDER.map(function (k) {
      var cls = tops.indexOf(k) !== -1 ? ' class="top"' : "";
      return "<span" + cls + ">" + k.toUpperCase() + " " + counts[k] + "점</span>";
    }).join("");
  }

  function shareResult(key) {
    var base = location.href.split("#")[0];
    var url = base + "#" + key;
    var text = "나의 공부 유형은 [" + GROUPS[key].name + "]! 너도 진단해봐 → " + url;

    if (navigator.share) {
      navigator.share({
        title: "MBTI 공부법 연구소",
        text: "나의 공부 유형은 " + GROUPS[key].name,
        url: url
      }).catch(function () {});
      return;
    }

    var box = document.getElementById("share-box");
    var input = document.getElementById("share-url");
    if (box && input) {
      box.hidden = false;
      input.value = text;
      input.focus();
      input.select();
    }

    var copied = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { toast("공유 문구를 복사했어요!"); },
          function () {}
        );
        copied = true;
      }
    } catch (e) {}
    if (!copied) {
      try {
        if (document.execCommand && document.execCommand("copy")) {
          toast("공유 문구를 복사했어요!");
          copied = true;
        }
      } catch (e) {}
    }
    if (!copied) toast("아래 문구를 복사해 친구에게 보내세요");
  }

  function resetQuiz(result) {
    result.hidden = true;
    result.innerHTML = "";
    var form = document.getElementById("quiz");
    form.reset();
    form.querySelectorAll(".opt.checked").forEach(function (o) { o.classList.remove("checked"); });
    if (location.hash) history.replaceState(null, "", location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showResult(result, counts, tops, shared) {
    var primary = tops[0];
    var g = GROUPS[primary];
    var heading = tops.length > 1
      ? "공동 1위 · " + tops.map(function (k) { return GROUPS[k].name; }).join(" / ")
      : g.name;
    var descs = tops.map(function (k) { return "<p>" + GROUPS[k].desc + "</p>"; }).join("");

    result.innerHTML =
      '<div class="result">' +
      '<p class="tag">' + (shared ? "친구가 공유한 결과예요" : "나의 공부 유형") + "</p>" +
      "<h2>" + heading + "</h2>" +
      descs +
      (shared ? "" : '<div class="scores">' + scoreChips(counts, tops) + "</div>") +
      '<div class="btn-row">' +
      '<a class="btn btn-primary" href="' + g.page + '">이 유형 공부법 보러가기</a>' +
      '<button type="button" class="btn btn-ghost" id="share-btn">친구에게 공유하기</button>' +
      '<button type="button" class="btn btn-ghost" id="retry-btn">' +
      (shared ? "나도 진단해보기" : "다시 진단하기") + "</button>" +
      "</div>" +
      '<div id="share-box" class="share-box" hidden>' +
      '<input id="share-url" readonly aria-label="공유 문구" />' +
      "</div>" +
      "</div>";

    result.hidden = false;
    document.getElementById("share-btn").addEventListener("click", function () { shareResult(primary); });
    document.getElementById("retry-btn").addEventListener("click", function () { resetQuiz(result); });
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function init() {
    var form = document.getElementById("quiz");
    var btn = document.getElementById("submit-btn");
    var err = document.getElementById("quiz-error");
    var result = document.getElementById("result");
    if (!form || !btn || !result) return;

    renderQuiz(form);

    btn.addEventListener("click", function () {
      var s = score(form);
      if (s.answered < QUESTIONS.length) {
        if (err) err.hidden = false;
        for (var qi = 0; qi < QUESTIONS.length; qi++) {
          if (!form.querySelector('input[name="q' + qi + '"]:checked')) {
            form.querySelectorAll(".q")[qi].scrollIntoView({ behavior: "smooth", block: "center" });
            break;
          }
        }
        return;
      }
      if (err) err.hidden = true;
      showResult(result, s.counts, topGroups(s.counts), false);
    });

    var hash = (location.hash || "").replace("#", "").toLowerCase();
    if (GROUPS[hash]) {
      var counts = { nt: 0, nf: 0, sj: 0, sp: 0 };
      counts[hash] = QUESTIONS.length;
      showResult(result, counts, [hash], true);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
