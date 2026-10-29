import re, os
LANG_BTNS = '<button type="button" data-lang="uz" lang="uz" aria-current="true">UZ<span class="sr-only"> · Oʻzbekcha</span></button><button type="button" data-lang="ru" lang="ru">RU<span class="sr-only"> · Русский</span></button><button type="button" data-lang="en" lang="en">EN<span class="sr-only"> · English</span></button>'
OLD_LANG = '<a href="#" aria-current="true" lang="uz">UZ<span class="sr-only"> · Oʻzbekcha</span></a><a href="#" lang="ru">RU<span class="sr-only"> · Русский</span></a><a href="#" lang="en">EN<span class="sr-only"> · English</span></a>'

CSS = r'''
/* ===== i18n + reviewer fixes ===== */
.i18n-miss{text-decoration:underline dotted #f4b400;text-underline-offset:3px;text-decoration-thickness:1.5px}/* ?review: a string that is still missing in this language (shown in Uzbek) */
html{scroll-padding-top:56px}.solo{scroll-padding-top:0}
.frame{overflow:clip}/* clip, not hidden: lets the library's search stay sticky */
.slv-bar{flex-wrap:wrap}.slv-all{white-space:nowrap;margin-left:auto}
.lk2{display:inline-flex;align-items:center;min-height:44px}
/* library: search + chips stick to the top of the lilac list */
.s1 .lib-bar{position:sticky;top:0;z-index:5;margin:12px -16px 0;padding:10px 16px;max-width:none;background:var(--lilac);border-bottom:1.5px solid var(--ink);border-top:1.5px solid var(--ink)}
body:not(.solo) .s1 .lib-bar{top:45px}
.s1 .lib-bar input{border-color:var(--ink);color:var(--ink)}.s1 .lib-bar input::placeholder{color:var(--ink-2)}
.s1 .lib-chip{border-color:var(--ink);color:var(--ink)}.s1 .lib-chip[aria-pressed="true"]{background:var(--ink);color:var(--lilac);border-color:var(--ink)}
.s1 .lib-n{color:var(--ink-2)}
.s1 #lib-list{margin-top:0;border-top:0}
.lib-rules>summary{display:flex;flex-wrap:wrap;gap:4px 10px;align-items:center;min-height:44px;font:400 15px/1.4 var(--font-body);color:var(--ink-2);cursor:pointer;list-style:none}
.lib-rules>summary::-webkit-details-marker{display:none}.lib-rules .rules{color:var(--ink-2);margin:4px 0 8px}
.s1 .lib-rules .rules li{display:list-item;padding:0;border:0;min-height:0;grid-template-columns:none}
.s1 .acc{display:block;width:100%;min-height:44px;padding:0;text-align:left;font:inherit;letter-spacing:inherit;text-transform:inherit;color:inherit;cursor:pointer}
.s1 .acc::after{content:"+";margin-left:10px;font-weight:400}.s1 .acc[aria-expanded="true"]::after{content:"–"}
.s1 li.done .acc::before{content:"✓ ";font-weight:600}
.s1 .accp{display:grid;gap:8px;margin-top:8px}.s1 .accp[hidden]{display:none}
@media (min-width:700px){.s1 .lib-bar{margin:12px calc(-1 * 66px) 0;padding:10px 66px}}
'''

LOOKS_CSS = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'after_looks.css'), encoding='utf-8').read()
# PREVIEW: ?looks=none | ?looks=tabs,goo,...  (default: all on)
LOOKS_JS = "<script>(()=>{const ALL=['tabs','nextpill','nogrid','widepages','darkedge','libgrid','goo'],v=new URLSearchParams(location.search).get('looks');const on=v==null||v===''||v==='all'?ALL:v==='none'?[]:v.split(',');document.documentElement.classList.add(...on.filter(x=>ALL.includes(x)).map(x=>'look-'+x));})();</script>"

def post(s):
    def rep(old, new, cnt=1):
        nonlocal s
        assert s.count(old) == cnt, (s.count(old), old[:90])
        s = s.replace(old, new)
    rep('<html lang="uz">', '<html lang="uz-Latn">')
    # ---------- CSS
    rep("@media (prefers-reduced-motion:reduce){*,*::before,*::after{transition-duration:0s!important;animation:none!important}}", CSS + LOOKS_CSS + "\n@media (prefers-reduced-motion:reduce){*,*::before,*::after{transition-duration:0s!important;animation:none!important}}")
    assert s.count('<style>') == 1
    s = s.replace('<style>', LOOKS_JS + '<style>', 1)
    # PREVIEW look-goo: the filter is off while the indicator moves
    rep("    root.style.setProperty('--i', i);\n", "    root.style.setProperty('--i', i); root.classList.add('moving'); clearTimeout(root._mv); root._mv = setTimeout(() => root.classList.remove('moving'), 450);\n")
    s = s.replace('.gate-lang a', '.gate-lang :is(a,button)').replace('.nm-lang a', '.nm-lang :is(a,button)')
    # ---------- static markup -> data-i18n
    assert s.count(OLD_LANG) == 2
    s = s.replace(OLD_LANG, LANG_BTNS)
    rep('<h1>Shaxsiy<br>kabinet</h1>', '<h1 data-i18n="gate.title">Shaxsiy<br>kabinet</h1>')
    rep('<label for="gid">Shaxsiy ID</label>', '<label for="gid" data-i18n="gate.label">Shaxsiy ID</label>')
    rep('<button type="submit" class="mx-btn">Kirish</button>', '<button type="submit" class="mx-btn" data-i18n="gate.submit">Kirish</button>')
    rep('<p class="ldr-txt">Xush kelibsiz, Student!</p>', '<p class="ldr-txt" data-i18n="gate.welcome" data-i18n-p=\'{"name":"Student"}\'>Xush kelibsiz, Student!</p>')
    rep('<nav class="gate-lang" aria-label="Til">', '<nav class="gate-lang" aria-label="Til" data-i18n-attr="aria-label:lang.label">')
    rep('<nav class="nm-lang" aria-label="Til">', '<nav class="nm-lang" aria-label="Til" data-i18n-attr="aria-label:lang.label">')
    rep('<aside class="nl" id="nl" aria-label="Yangi dars" hidden>', '<aside class="nl" id="nl" aria-label="Yangi dars" data-i18n-attr="aria-label:popup.label" hidden>')
    rep('<p class="nl-k">Yangi dars ochildi</p><p class="nl-t">3-dars · Skill va agentlar</p>', '<p class="nl-k" data-i18n="popup.k">Yangi dars ochildi</p><p class="nl-t" data-i18n="popup.title">3-dars · Skill va agentlar</p>')
    rep('<a class="nl-go" href="#/dars/3">Darsni ochish<svg', '<a class="nl-go" href="#/dars/3"><span data-i18n="popup.open">Darsni ochish</span><svg')
    rep('<button class="nl-x" type="button">Yopish</button>', '<button class="nl-x" type="button" data-i18n="common.close">Yopish</button>')
    rep('<div class="nmenu" id="nmenu" role="dialog" aria-label="Menyu" tabindex="-1" hidden>', '<div class="nmenu" id="nmenu" role="dialog" aria-label="Menyu" data-i18n-attr="aria-label:menu.label" tabindex="-1" hidden>')
    rep('<p class="nm-name">Student</p>', '<p class="nm-name">Student</p>')
    rep('<div><dt>Shaxsiy ID</dt>', '<div><dt data-i18n="menu.id">Shaxsiy ID</dt>')
    rep('<div><dt>Guruh</dt><dd>Shanba guruhi</dd></div>', '<div><dt data-i18n="menu.group">Guruh</dt><dd data-i18n="menu.group_value">Shanba guruhi</dd></div>')
    rep('<div><dt>Mentor</dt><dd>X. Maroziqov</dd></div>', '<div><dt data-i18n="menu.mentor">Mentor</dt><dd data-i18n="menu.mentor_value">X. Maroziqov</dd></div>')
    rep('<div><dt>Kurs</dt><dd>4 dars · 12 sen – 3 okt</dd></div>', '<div><dt data-i18n="menu.course">Kurs</dt><dd data-i18n="menu.course_value">4 dars · 12 sen – 3 okt</dd></div>')
    rep('<a class="nm-out" href="#/kirish">Chiqish</a>', '<a class="nm-out" href="#/kirish" data-i18n="menu.logout">Chiqish</a>')
    rep('<button type="button" id="toast-undo">Bekor qilish</button>', '<button type="button" id="toast-undo" data-i18n="toast.undo">Bekor qilish</button>')
    rep('<p class="sheet-t" id="ls-t">4-dars 3-oktabr kuni ochiladi.</p>', '<p class="sheet-t" id="ls-t" data-i18n="lock.title">4-dars 3-oktabr kuni ochiladi.</p>')
    rep('<p class="sheet-d">Hermes kartalari va «Biznesda AIʼni qoʻllash» kitobi (lotin va kirill) dars kuni shu yerda chiqadi.</p>', '<p class="sheet-d" data-i18n="lock.desc">Hermes kartalari va «Biznesda AIʼni qoʻllash» kitobi (lotin va kirill) dars kuni shu yerda chiqadi.</p>')
    rep('<form method="dialog"><button class="sheet-x">Yopish</button></form>\n</dialog>', '<form method="dialog"><button class="sheet-x" data-i18n="common.close">Yopish</button></form>\n</dialog>')
    rep('<div class="type-grid">', '<h1 class="sr-only" data-i18n="title.type">Shrift</h1>\n    <div class="type-grid">')
    # ---------- script: strings that were hard-coded in the pre-prototype code
    s = re.sub(r"gateMsg\('ID 6 ta[^']*'", "gateMsg(['gate.err.toolong']", s)
    s = re.sub(r"gateMsg\('ID’da 0, 1, I, L[^']*'", "gateMsg(['gate.err.badchars']", s)
    s = re.sub(r"gateMsg\(`Yana \$\{6 - c\.length\} ta belgi kiriting\.`", "gateMsg(['gate.err.short', {n: 6 - c.length, pl: 6 - c.length}]", s)
    s = re.sub(r"gateMsg\('Bu ID topilmadi\. Xabardagi[^']*'", "gateMsg(['gate.err.unknown_short']", s)
    s = re.sub(r"gateMsg\('Bu ID topilmadi\. Mentoringizdan[^']*'", "gateMsg(['gate.err.notfound']", s)
    rep("gateMsg('Xush kelibsiz, Student!', 'ok');", "gateMsg(['gate.welcome', {name: STUDENT_FIRST}], 'ok');")
    # the message on screen is kept as [key, params]: a language switch re-renders it (and aria-invalid stays) instead of clearing it
    rep("function gateMsg(text, state){\n  if (state === 'err') {", """let gateCur = null;   // {m: [key, params], state} of the message on screen
function gateRelang(){ if (gateCur) gateMsg(gateCur.m, gateCur.state); }
function gateMsg(m, state){
  gateCur = Array.isArray(m) ? {m, state} : null;
  const text = Array.isArray(m) ? t(m[0], m[1]) : m;
  if (state === 'err') {""")
    # section names: each screen already has <main> + h1; the review caption (with the KKKKKK hint) must not become the accessible name
    rep('<section class="screen is-on" data-screen="gate" id="s-gate" aria-labelledby="t-gate">', '<section class="screen is-on" data-screen="gate" id="s-gate">')
    # copy the raw string, not the display text (no back-mapping of the curly apostrophes: English "wasn't" stays ASCII)
    rep("li.querySelector('.tx').textContent.replace(/\\u2018/g,'\\u02BB').replace(/\\u2019/g,'\\u02BC')", "li.querySelector('.tx').dataset.raw")
    # the tab slide can be skipped (language switch restores the tab without animation)
    rep("t = ++seq, reduce = rm.matches; cur = i;", "t = ++seq, reduce = rm.matches || !!root.dataset.instant; cur = i;")
    # name menu: openMenu(trigger) is shared with the language switch (re-opens the menu after the re-render)
    rep("""    const r = t.getBoundingClientRect();
    m.style.top = `${Math.round(r.bottom + 8)}px`; m.style.setProperty('--mr', `${Math.max(16, Math.round(document.documentElement.clientWidth - r.right))}px`);
    m.hidden = false; m._from = t; t.setAttribute('aria-expanded', 'true'); m.focus();
  } else if""", """    openMenu(t);
  } else if""")
    rep("// Name menu (ID, group, mentor, dates, language, Chiqish) and the locked-lesson sheet\n", """// Name menu (ID, group, mentor, dates, language, Chiqish) and the locked-lesson sheet
function openMenu(t){
  const m = document.getElementById('nmenu'), r = t.getBoundingClientRect();
  m.style.top = `${Math.round(r.bottom + 8)}px`; m.style.setProperty('--mr', `${Math.max(16, Math.round(document.documentElement.clientWidth - r.right))}px`);
  m.hidden = false; m._from = t; t.setAttribute('aria-expanded', 'true'); m.focus();
}
""")
    rep("  gh.classList.toggle('err', state === 'err');", "  okina(gh);\n  gh.classList.toggle('err', state === 'err');")
    rep("if (q.get('id')) { gid.value = q.get('id'); gid.dispatchEvent(new Event('input')); }\n", "")
    rep("go('dastur', true); ldr.hidden = true;", "go('dastur'); ldr.hidden = true;")
    rep(' placeholder="7KQ2XM"', '')
    rep('<p class="mx-help help" id="gid-h" aria-live="polite"></p>', '<p class="mx-help help" id="gid-h" aria-live="polite" data-i18n="gate.help">Masalan: AIP-7KQ2XM</p>')
    s = s.replace('gateMsg(helpText)', "gateMsg(['gate.help'])")
    rep('showNewLesson(); }, 1800);', 'showNewLesson(); }, 700);   // the demo loader: production shows it only while the request is pending')
    rep("c.innerHTML = on ? CHECK + 'Bajarildi' : 'Bajarildi deb belgilash';", "c.innerHTML = on ? CHECK + esc(t('common.done')) : esc(t('common.mark_done'));")
    rep("c.setAttribute('aria-label', on ? 'Bajarildi, bekor qilish uchun bosing' : 'Bajarildi deb belgilash');", "c.setAttribute('aria-label', on ? t('common.done_hint') : t('common.mark_done'));")
    rep("undoLi = li; toastT.textContent = `${li.querySelector('.no').textContent} bajarildi`; toast.hidden = false;", "undoLi = li; toastT.textContent = t('toast.done', {no: li.querySelector('.no').textContent}); document.getElementById('toast-undo').hidden = false; toast.hidden = false;")
    rep("function hideToast(){", "function flashToast(text){ toastT.textContent = text; document.getElementById('toast-undo').hidden = true; undoLi = null; toast.hidden = false; live.textContent = text; armToast(); }\nfunction hideToast(){")
    # toast: keep the key of a flash toast so it can be shown again in the new language
    rep("function flashToast(text){ toastT.textContent = text;", "let toastKey = '';\nfunction flashToast(key){ toastKey = key; const text = t(key); toastT.textContent = text;")
    rep("  live.textContent = `${li.querySelector('.no').textContent} bajarildi belgisi olib tashlandi.`;\n});", "  live.textContent = t('live.unmarked', {no: li.querySelector('.no').textContent});\n});")
    rep("    live.textContent = on ? `${no} bajarildi.` : `${no} bajarildi belgisi olib tashlandi.`;", "    live.textContent = t(on ? 'live.marked' : 'live.unmarked', {no});")
    rep("live.textContent = 'Nusxa olinmadi. Matnni qo\\u2018lda belgilang.';", "live.textContent = t('live.copy_failed');")
    rep("b.querySelector('.cpl').textContent = 'Nusxalandi';", "b.querySelector('.cpl').textContent = t('common.copied');")
    rep("live.textContent = `Nusxalandi: ${li.querySelector('.tt').textContent.trim()}.` + (fresh ? ' Bajarildi. Bekor qilish: «Bajarildi» tugmasi.' : ' Bajarildi.');", "live.textContent = t(fresh ? 'live.copied_new' : 'live.copied', {title: li.dataset.t || li.querySelector('.tt').textContent.trim()});")
    rep("b.querySelector('.cpl').textContent = 'Nusxalash'; }, 2000);", "b.querySelector('.cpl').textContent = t('common.copy'); }, 2000);")
    rep("nl.hidden = false; live.textContent = 'Yangi dars ochildi: 3-dars, Skill va agentlar.';", "nl.hidden = false; live.textContent = t('popup.live');")
    rep("if (b.id === 'rst') { S.reset(); try { localStorage.removeItem(NL_KEY); } catch {} return render(); }", "if (b.id === 'rst') { S.reset(); try { localStorage.removeItem(NL_KEY); } catch {} history.replaceState(null, '', '#/dastur'); return render(); }")
    # ---------- boot: language, cold entry, lock-sheet focus
    a = s.rindex('(function boot(){'); b2 = s.index('})();', a) + 5
    boot = '''(function boot(){
  document.documentElement.lang = HTML_LANG[LANG]; applyStatic(); okina(document.body); updateLangUI();
  const jump = document.getElementById('jump');
  jump.append(...ROUTES().map(h => Object.assign(document.createElement('option'), {value: h, textContent: h.replace('#/', '')})));
  jump.addEventListener('change', () => { if (jump.value) location.hash = jump.value; });
  if (!location.hash) history.replaceState(null, '', ROUTE_OF[q.get('view')] || '#/kirish'); // ?view=dastur|dars|ex|type|all|gate (review links)
  // cold entry on a deep route: the parent goes under it, so the system Back button leads to the parent inside the app (ux-spec 1)
  const par = parentOf(location.hash);
  if (par && !history.state) { const cur = location.hash; history.replaceState({aip: 1}, '', par); history.pushState({aip: 1}, '', cur); } else if (!history.state) history.replaceState({aip: 1}, '', location.hash);
  document.getElementById('lock-sheet').addEventListener('close', () => setTimeout(() => { if (document.activeElement && document.activeElement !== document.body) return;
    const c = document.querySelector('.lessons [data-sheet]') || document.querySelector('.screen.is-on h1'); if (c) { c.tabIndex = c.tabIndex < 0 ? -1 : c.tabIndex; c.focus({preventScroll: true}); } }, 0));
  render();
  if (q.has('newlesson') && document.body.dataset.view !== 'gate') showNewLesson(true);
  runSelftest();
  if (q.get('id')) { gid.value = q.get('id'); gid.dispatchEvent(new Event('input')); }
})();'''
    s = s[:a] + boot + s[b2:]
    s = s.replace("li.querySelector('.no').textContent", "(li.querySelector('.no').textContent || li.dataset.t)")
    return s
