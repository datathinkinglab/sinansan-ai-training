/* ============================================================
   신안산대학교 AI 활용 특강 · 언어 선택 (한국어 기본)
   © 2026 Data Thinking Lab. All rights reserved.

   사용법 (각 HTML의 <head> 안)
     정적 번역 페이지 : <script src="./i18n/lang.js" data-mode="static" data-base="index"></script>
       → 언어별 파일(index.en.html 등)로 이동합니다.
     자동 번역 페이지 : <script src="../i18n/lang.js" data-mode="auto"></script>
       → 한 파일을 Google 번역으로 표시합니다.
   선택한 언어는 브라우저에 저장되어 다른 페이지에도 이어집니다.
   주소 뒤에 ?lang=en 처럼 붙이면 그 언어로 바로 엽니다 (ko, en, mn, vi, my, ru).
   ============================================================ */
(function () {
  var LANGS = [
    ['ko', '한국어'],
    ['en', 'English'],
    ['mn', 'Монгол'],
    ['vi', 'Tiếng Việt'],
    ['my', 'မြန်မာ'],
    ['ru', 'Русский']
  ];
  var CODES = LANGS.map(function (l) { return l[0]; });
  var KEY = 'sau-lang';
  var me = document.currentScript;
  var mode = (me && me.getAttribute('data-mode')) || 'auto';
  var base = (me && me.getAttribute('data-base')) || '';
  var html = document.documentElement;

  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

  /* 1) 원하는 언어 정하기
     - 주소의 ?lang= 이 가장 우선
     - 번역본 파일(index.en.html 등)을 직접 열면 그 언어
     - 한국어 파일은 브라우저에 저장된 언어를 따름 */
  var docLang = html.getAttribute('lang') || 'ko';
  var q = (location.search.match(/[?&]lang=([a-z]{2})/) || [])[1];
  if (q && CODES.indexOf(q) < 0) q = null;
  var want;
  if (q) want = q;
  else if (mode === 'static' && docLang !== 'ko') want = docLang;
  else want = stored() || 'ko';
  if (CODES.indexOf(want) < 0) want = 'ko';
  if (want !== stored()) store(want);

  /* 현재 문서의 언어 */
  var cur = mode === 'static' ? docLang : want;

  function fileFor(l) { return './' + base + (l === 'ko' ? '' : '.' + l) + '.html'; }

  /* 2) 정적 페이지: 다른 언어 파일이면 그 파일로 이동 */
  if (mode === 'static' && base && want !== cur) {
    location.replace(fileFor(want) + location.hash);
    return;
  }

  /* 3) 글꼴: 한국어 외 언어는 Noto Sans(라틴·키릴·베트남어)·Noto Sans Myanmar 사용 */
  if (cur !== 'ko') {
    html.setAttribute('data-sau-lang', cur);
    var lk = document.createElement('link');
    lk.rel = 'stylesheet';
    lk.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&family=Noto+Sans+Myanmar:wght@400;500;600;700&display=swap';
    document.head.appendChild(lk);
  }

  /* 4) 스타일 */
  var st = document.createElement('style');
  st.textContent =
    '#sauLang{position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:2147483000;display:flex;align-items:center;gap:6px;' +
    'background:rgba(255,255,255,.94);border:1.5px solid #D9A3AC;border-radius:999px;padding:5px 8px 5px 10px;' +
    'box-shadow:0 4px 14px rgba(36,36,42,.12);font:600 13px/1 system-ui,-apple-system,"Segoe UI","Noto Sans","Noto Sans Myanmar",sans-serif;color:#A6192E;opacity:.82;transition:opacity .2s}' +
    '#sauLang:hover,#sauLang:focus-within{opacity:1}' +
    '#sauLang svg{flex:none}' +
    '#sauLang select{appearance:none;-webkit-appearance:none;border:0;background:transparent;font:inherit;color:#24242A;cursor:pointer;padding:2px 16px 2px 0;' +
    'background-image:linear-gradient(45deg,transparent 50%,#A6192E 50%),linear-gradient(135deg,#A6192E 50%,transparent 50%);' +
    'background-position:calc(100% - 7px) 55%,calc(100% - 2px) 55%;background-size:5px 5px,5px 5px;background-repeat:no-repeat;outline:none}' +
    '.top .in #sauLang{position:static;transform:none;box-shadow:none;margin-left:12px;opacity:1}' +
    '@media print{#sauLang{display:none}}' +
    /* 번역 언어 글꼴 (영어는 원래 글꼴 유지) */
    'html[data-sau-lang=mn] body,html[data-sau-lang=mn] body *,html[data-sau-lang=ru] body,html[data-sau-lang=ru] body *,' +
    'html[data-sau-lang=vi] body,html[data-sau-lang=vi] body *,html[data-sau-lang=my] body,html[data-sau-lang=my] body *' +
    '{font-family:"Noto Sans","Noto Sans Myanmar","Paperozi","Pretendard","Malgun Gothic",sans-serif!important}' +
    'html[data-sau-lang] body{word-break:normal}' +
    'html[data-sau-lang=my] body{line-height:1.75}' +
    /* Google 번역 상단 막대·말풍선 숨기기 */
    'iframe.skiptranslate,.goog-te-banner-frame,#goog-gt-tt,.goog-te-balloon-frame,.VIpgJd-ZVi9od-ORHb-OEVmcd,.VIpgJd-ZVi9od-aZ2wEe-wOHMyf{display:none!important}' +
    'body{top:0!important}#google_translate_element{display:none!important}' +
    'font[style*="background-color"]{background:transparent!important;box-shadow:none!important}';
  document.head.appendChild(st);

  /* 5) Google 자동번역 (data-mode="auto") */
  function setCookie(v, days) {
    var exp = days < 0 ? ';expires=Thu, 01 Jan 1970 00:00:00 GMT' : '';
    var h = location.hostname;
    document.cookie = 'googtrans=' + v + exp + ';path=/';
    if (h) {
      document.cookie = 'googtrans=' + v + exp + ';path=/;domain=' + h;
      var parts = h.split('.');
      if (parts.length > 2) document.cookie = 'googtrans=' + v + exp + ';path=/;domain=.' + parts.slice(-2).join('.');
    }
  }
  if (mode === 'auto') {
    if (cur === 'ko') {
      if (/googtrans=/.test(document.cookie)) setCookie('', -1);
    } else {
      setCookie('/ko/' + cur, 1);
      /* 제목을 단어별로 쪼개는 애니메이션(data-kinetic)을 끕니다.
         쪼개진 단어를 하나씩 번역하면 문장이 어색해지므로, 제목을 한 문장으로 번역하게 합니다. */
      var kin = function (root) {
        if (root.nodeType !== 1) return;
        if (root.hasAttribute('data-kinetic')) root.removeAttribute('data-kinetic');
        var list = root.querySelectorAll ? root.querySelectorAll('[data-kinetic]') : [];
        for (var i = 0; i < list.length; i++) list[i].removeAttribute('data-kinetic');
      };
      var mo = new MutationObserver(function (ms) {
        ms.forEach(function (m) { for (var i = 0; i < m.addedNodes.length; i++) kin(m.addedNodes[i]); });
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });
      document.addEventListener('DOMContentLoaded', function () { kin(document.documentElement); mo.disconnect(); });
      window.sauGT = function () {
        try {
          new google.translate.TranslateElement({
            pageLanguage: 'ko',
            includedLanguages: CODES.slice(1).join(','),
            autoDisplay: false
          }, 'google_translate_element');
        } catch (e) {}
      };
      var gs = document.createElement('script');
      gs.src = 'https://translate.google.com/translate_a/element.js?cb=sauGT';
      gs.async = true;
      document.head.appendChild(gs);
    }
  }

  /* 6) 언어 선택 메뉴 */
  function mount() {
    if (document.getElementById('sauLang')) return;
    if (mode === 'auto' && cur !== 'ko') {
      var ge = document.createElement('div');
      ge.id = 'google_translate_element';
      document.body.appendChild(ge);
    }
    var box = document.createElement('label');
    box.id = 'sauLang';
    box.className = 'notranslate';
    box.setAttribute('translate', 'no');
    box.title = 'Language · 언어';
    box.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.7 4 6 4 9.5s-1.4 6.8-4 9.5c-2.6-2.7-4-6-4-9.5s1.4-6.8 4-9.5z"/></svg>';
    var sel = document.createElement('select');
    sel.setAttribute('aria-label', 'Language · 언어');
    LANGS.forEach(function (l) {
      var o = document.createElement('option');
      o.value = l[0]; o.textContent = l[1];
      if (l[0] === cur) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function () {
      var l = sel.value;
      store(l);
      if (mode === 'static' && base) {
        location.href = fileFor(l) + location.hash;
      } else {
        setCookie('', -1);
        if (l !== 'ko') setCookie('/ko/' + l, 1);
        if (/[?&]lang=/.test(location.search)) location.href = location.pathname + location.hash;
        else location.reload();
      }
    });
    /* 키보드 단축키(← → F 등)가 선택 메뉴에서 작동하지 않도록 */
    sel.addEventListener('keydown', function (e) { e.stopPropagation(); });
    box.appendChild(sel);
    var host = document.querySelector('.top .in');
    (host || document.body).appendChild(box);
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
