
// Display layer: Mona Sans lacks U+02BB (ʻ) and U+02BC (ʼ); Golos + Martian lack U+02BB.
// Render the same-shaped U+2018/U+2019; copying uses the raw string (data-raw), never the display text. Runs on the page and again on every rendered route.
function okina(root){
  const map = s => s.replace(/ʻ/g,'‘').replace(/ʼ/g,'’');
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode: n => /^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT});
  for (let n; (n = w.nextNode());) if (/[ʻʼ]/.test(n.nodeValue)) n.nodeValue = map(n.nodeValue);
  root.querySelectorAll('[aria-label],[placeholder],[title]').forEach(el => {
    for (const a of ['aria-label','placeholder','title']) if (el.hasAttribute(a)) el.setAttribute(a, map(el.getAttribute(a)));
  });
}
okina(document.body); document.title = document.title.replace(/ʻ/g,'‘').replace(/ʼ/g,'’');

// Views are hash routes (#/dastur, #/dars/1, ...): see the router at the end. Here: the comp bar and the in-page link rules.
function closeMenu(){
  const m = document.getElementById('nmenu'); if (m.hidden) return;
  m.hidden = true; document.querySelectorAll('[aria-controls="nmenu"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
}



// Gate: takes "7KQ2XM" or "AIP-7KQ2XM" (any case, spaces and hyphens ignored, typed or pasted, even inside a copied message) and auto-submits on a
// complete valid code, like 2.0. 2.0 also has short hand-assigned IDs (XM = demo mentor): they log in on Enter / KIRISH, never on auto-submit.
// ponytail: "not found" is faked (KKKKKK, and any short ID except XM); in production it is the server's answer, plus its rate-limit and offline messages (ux-audit H3).
const gid = document.getElementById('gid'), gh = document.getElementById('gid-h'), gpill = gid.closest('.pill-field');
const helpText = gh.textContent, ID_RE = /^[2-9A-HJKMNP-Z]{6}$/, ID_CHARS = /^[2-9A-HJKMNP-Z]+$/, SHORT_IDS = ['XM'];
const idCode = v => v.toUpperCase().replace(/[\s\-\u2010-\u2015]/g, '').replace(/^AIP/, ''); // no valid code starts with AIP (I is not in the alphabet)
let gateCur = null;   // {m: [key, params], state} of the message on screen
function gateRelang(){ if (gateCur) gateMsg(gateCur.m, gateCur.state); }
function gateMsg(m, state){
  gateCur = Array.isArray(m) ? {m, state} : null;
  const text = Array.isArray(m) ? t(m[0], m[1]) : m;
  if (state === 'err') { gh.innerHTML = '<svg width="18" height="18" aria-hidden="true"><use href="#i-alert"/></svg><span></span>'; gh.lastChild.textContent = text; }
  else gh.textContent = text;
  okina(gh);
  gh.classList.toggle('err', state === 'err'); gh.classList.toggle('ok', state === 'ok');
  gpill.classList.toggle('is-error', state === 'err');
  state === 'err' ? gid.setAttribute('aria-invalid', 'true') : gid.removeAttribute('aria-invalid');
}
function tryLogin(){
  if (gid.readOnly) return;   // a login is under way
  const c = idCode(gid.value);
  if (c.length > 6) return gateMsg(['gate.err.toolong'], 'err');
  if (c && !ID_CHARS.test(c)) return gateMsg(['gate.err.badchars'], 'err');
  if (c.length < 2) return gateMsg(['gate.err.short', {n: 6 - c.length, pl: 6 - c.length}], 'err');
  doLogin(c);
}
function onGidInput(e){
  if (e?.isComposing || gid.readOnly) return; // IME: wait for compositionend, never rewrite mid-composition
  const v = gid.value;
  if (/^\s*AIP|[\s\-]/i.test(v)) { // the field already shows "AIP-"; spaces and hyphens never stay
    const pos = gid.selectionStart, next = idCode(v).slice(0, 10);
    gid.value = next;
    if (pos < v.length) { const np = Math.min(idCode(v.slice(0, pos)).length, next.length); gid.setSelectionRange(np, np); } // mid-string edit: keep the caret
  }
  const cc = idCode(gid.value);
  if (cc && !ID_CHARS.test(cc)) gateMsg(['gate.err.badchars'], 'err'); else gateMsg(['gate.help']);   // the bad-character hint shows while typing (audit S1-3)
  if (cc.length === 6) tryLogin();
}
gid.addEventListener('input', onGidInput);
gid.addEventListener('compositionend', () => onGidInput());
gid.addEventListener('paste', e => { // maxlength would cut "  aip-7kq2xm " or "ID: AIP-7KQ2XM" before we could clean it
  const t = (e.clipboardData || window.clipboardData)?.getData('text'); if (t == null || gid.readOnly) return;
  e.preventDefault();
  const m = t.match(/AIP[\s\-\u2010-\u2015]*([2-9A-HJKMNP-Z]{6})/i); // an ID inside a message
  if (m) gid.value = m[1].toUpperCase();
  else if (/^\s*AIP/i.test(t)) gid.value = idCode(t);
  else gid.setRangeText(idCode(t), gid.selectionStart, gid.selectionEnd, 'end');
  gid.value = gid.value.slice(0, 10); gid.dispatchEvent(new Event('input'));
});
document.getElementById('gate-form').addEventListener('submit', e => { e.preventDefault(); tryLogin(); });
// Deep link for review: index.html?view=dastur | dars | ex | all ; ?id=XXXXXX runs the login ; ?newlesson shows the popup
const q = new URLSearchParams();   // the app has no query switches

const live = document.getElementById('live');
async function copy(text){
  try { await navigator.clipboard.writeText(text); return true; }
  catch { const t = Object.assign(document.createElement('textarea'), {value:text}); document.body.append(t); t.select(); const ok = document.execCommand('copy'); t.remove(); return ok; }
}



// Lilac prompt section: copy = done, with undo (ux-spec 3.1): the "Bajarildi" chip is a toggle, and a 5 s toast offers "Bekor qilish"
const toast = document.getElementById('toast'), toastT = document.getElementById('toast-t');
let undoLi = null, toastTimer = 0;
const CHECK = '<svg width="12" height="12" aria-hidden="true"><use href="#i-check"/></svg>';
function setDone(li, on){
  li.classList.toggle('done', on);
  if (li.dataset.key) S.tick(li.dataset.key, on);
  const c = li.querySelector('.chip'); if (!c) return;
  c.classList.toggle('off', !on);
  c.innerHTML = on ? CHECK + esc(t('common.done')) : esc(t('common.mark_done'));
  c.setAttribute('aria-label', on ? t('common.done_hint') : t('common.mark_done'));
}
let toastKey = '';
function flashToast(key){ toastKey = key; const text = t(key); toastT.textContent = text; document.getElementById('toast-undo').hidden = true; undoLi = null; toast.hidden = false; live.textContent = text; armToast(); }
function hideToast(){ clearTimeout(toastTimer); toast.hidden = true; undoLi = null; }
function showToast(li){
  undoLi = li; const rawT = li.querySelector('.tx') ? li.querySelector('.tx').dataset.raw : ''; toastT.textContent = t(hasBracket(rawT) ? 'toast.fill' : 'toast.done', {no: (li.dataset.t ? '«' + li.dataset.t + '»' : li.querySelector('.no').textContent)}); document.getElementById('toast-undo').hidden = false; toast.hidden = false;
  const cpB = li.querySelector('.cp'); if (cpB) cpB.after(toast);   // right after the button, so the next Tab lands on Bekor qilish
  armToast();
}
const armToast = () => { clearTimeout(toastTimer); toastTimer = setTimeout(hideToast, 5000); };
['focusin', 'mouseenter'].forEach(ev => toast.addEventListener(ev, () => clearTimeout(toastTimer))); // paused while hovered or focused
['focusout', 'mouseleave'].forEach(ev => toast.addEventListener(ev, () => { if (!toast.hidden && !toast.matches(':hover, :focus-within')) armToast(); }));
document.getElementById('toast-undo').addEventListener('click', () => {
  const li = undoLi; if (!li) return;
  setDone(li, false); hideToast(); [li.querySelector('.cp'), li.querySelector('summary'), li.querySelector('.chip')].find(x => x && x.offsetParent)?.focus(); refreshCounts();
  live.textContent = t('live.unmarked', {no: (li.dataset.t ? '«' + li.dataset.t + '»' : li.querySelector('.no').textContent)});
});
document.addEventListener('click', async e => {
  const chip = e.target.closest('.s1 .chip');
  if (chip) {
    const li = chip.closest('li'), on = !li.classList.contains('done'), no = (li.dataset.t ? '«' + li.dataset.t + '»' : li.querySelector('.no').textContent);
    setDone(li, on); refreshCounts(); on ? showToast(li) : undoLi === li && hideToast();
    live.textContent = t(on ? 'live.marked' : 'live.unmarked', {no});
    return;
  }
  const b = e.target.closest('.s1 .cp'); if (!b) return;
  const li = b.closest('li');
  const ok = await copy(li.querySelector('.tx').dataset.raw);
  if (!ok) { live.textContent = t('live.copy_failed'); const dt = li.querySelector('details'), tx = li.querySelector('.tx'); if (dt) dt.open = true; if (tx) getSelection().selectAllChildren(tx); flashToast('toast.copy_failed'); return; }
  const fresh = !li.classList.contains('done');
  if (fresh) { setDone(li, true); refreshCounts(); showToast(li); }
  b.classList.add('flash'); b.querySelector('use').setAttribute('href', '#i-check'); b.querySelector('.cpl').textContent = t('common.copied');
  live.textContent = t(fresh ? 'live.copied_new' : 'live.copied', {title: li.dataset.t || li.querySelector('.tt').textContent.trim()});
  clearTimeout(b._t); b._t = setTimeout(() => { b.classList.remove('flash'); b.querySelector('use').setAttribute('href', '#i-copy'); b.querySelector('.cpl').textContent = t('common.copy'); }, 2000);
});

const nl = {hidden: true, contains: () => false};   // stub: the page has no new-lesson popup (the server has no 'new since your last visit' signal yet)
function showNewLesson(){}
function hideNewLesson(){}
// Name menu (ID, group, mentor, dates, language, Chiqish) and the locked-lesson sheet
function openMenu(t){
  const m = document.getElementById('nmenu'), r = t.getBoundingClientRect();
  m.style.top = `${Math.round(r.bottom + 8)}px`; m.style.setProperty('--mr', `${Math.max(16, Math.round(document.documentElement.clientWidth - r.right))}px`);
  m.hidden = false; m._from = t; t.setAttribute('aria-expanded', 'true'); m.focus();
}
document.addEventListener('click', e => {
  const m = document.getElementById('nmenu'), t = e.target.closest('.nav-name,.menu-btn');
  if (t) {
    if (!m.hidden) return closeMenu();
    if (Date.now() - (closeMenu.at || 0) < 200) return; // Safari: the button took no focus, so focusout already closed it on mousedown
    openMenu(t);
  } else if (!m.hidden && !e.target.closest('#nmenu')) closeMenu();
  const sh = e.target.closest('[data-sheet]'); if (sh) { const dlg = document.getElementById(sh.dataset.sheet); dlg.showModal(); if (sh.hasAttribute('aria-expanded')) { sh.setAttribute('aria-expanded', 'true'); dlg.addEventListener('close', () => sh.setAttribute('aria-expanded', 'false'), {once: true}); } }
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape' || document.querySelector('dialog[open]')) return;
  const m = document.getElementById('nmenu');
  if (!m.hidden) { closeMenu(); m._from?.focus(); } // Esc on the menu never reaches the popup
  else if (!nl.hidden && nl.contains(document.activeElement)) nl.querySelector('.nl-x').click(); // the popup closes by Esc only while focus is in it
});
// 3: Tab / Shift+Tab out of the menu closes it (the trigger is excluded so its toggle keeps working)
const nmenu = document.getElementById('nmenu');
nmenu.addEventListener('focusout', e => { const t = e.relatedTarget; if (!(t && (nmenu.contains(t) || t.closest('[aria-controls="nmenu"]')))) { closeMenu.at = Date.now(); closeMenu(); } });
// Dars folder tabs. One tap, one clock (audit 2026-10-19): the indicator slides 260ms, the panes crossfade (old out 120ms, new in 200ms with 8px) at the same moment, and nothing waits
// for anything. The goo filter stays on throughout; will-change is set on the indicator only while it slides. Arrow keys switch instantly.
function initGT(root){
  const tabs = [...root.querySelectorAll('[role="tab"]')], panes = [...root.querySelectorAll('[role="tabpanel"]')], ind = root.querySelector('.gt-ind');
  const rm = matchMedia('(prefers-reduced-motion: reduce)'), safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), EASE = 'cubic-bezier(.2,0,0,1)';
  if (safari) document.documentElement.classList.add('is-safari');
  let cur = 0, seq = 0, rest = 0;
  const settle = () => { clearTimeout(rest); if (ind) ind.style.willChange = ''; };
  if (ind) ind.addEventListener('transitionend', e => { if (e.propertyName === 'transform') settle(); });
  function show(i, focus, key, user){
    if (i === cur) { if (focus) tabs[i].focus(); return; }
    if (typeof hideToast === 'function') hideToast();   // UX audit S6-11: the copy toast belongs to the pane it was made in
    const dir = i > cur ? 1 : -1, t = ++seq, instant = key || rm.matches || !!root.dataset.instant, old = panes[cur], nw = panes[i]; cur = i;
    root.classList.toggle('kbd', !!key);
    if (!instant) { if (ind) ind.style.willChange = 'transform'; clearTimeout(rest); rest = setTimeout(settle, 400); }
    root.style.setProperty('--i', i);
    tabs.forEach((x, k) => { x.setAttribute('aria-selected', k === i); x.tabIndex = k === i ? 0 : -1; });
    if (focus) tabs[i].focus();
    root.dispatchEvent(new CustomEvent('gt-show', {bubbles: true, detail: {i, key: !!key, user: !!user}}));   // the page writes a tab the student chose into the URL (user: a real tap or key, not a script's click)
    panes.forEach(p => { p.getAnimations().forEach(a => a.cancel()); if (p !== old && p !== nw) p.setAttribute('inert', ''); });
    nw.removeAttribute('inert');
    if (instant) { old.setAttribute('inert', ''); return; }
    nw.animate([{opacity: 0, transform: `translateY(${safari ? 0 : 8 * dir}px)`}, {opacity: 1, transform: 'none'}], {duration: 200, easing: EASE});
    old.animate([{opacity: 1}, {opacity: 0}], {duration: 120, easing: EASE, fill: 'forwards'}).finished.then(() => { if (t === seq || old !== panes[cur]) { old.setAttribute('inert', ''); old.getAnimations().forEach(a => a.cancel()); } }).catch(() => {});
  }
  tabs.forEach((x, i) => x.addEventListener('click', e => show(i, false, false, e.isTrusted)));
  root._show = i => show(i);   // Back / Forward (gtPop): the URL is already right
  root.querySelector('[role="tablist"]').addEventListener('keydown', e => {
    const n = tabs.length, to = {ArrowRight: (cur + 1) % n, ArrowLeft: (cur - 1 + n) % n, Home: 0, End: n - 1}[e.key]; if (to == null) return;
    e.preventDefault(); show(to, true, true, e.isTrusted);
  });
}

// iOS Safari only applies :active when a touch listener exists
document.addEventListener('touchstart', () => {}, {passive: true});
// the name menu closes when the page scrolls under it (> 24px)
addEventListener('scroll', () => {
  const m = document.getElementById('nmenu'); if (!m) return;
  if (m.hidden) { m._y = null; return; }
  if (m._y == null) m._y = scrollY; else if (Math.abs(scrollY - m._y) > 24) closeMenu();
}, {passive: true});

// the loader fades out over the finished home (200ms), then goes back to hidden
function endLoader(ldr){
  ldr.classList.add('out');
  setTimeout(() => { ldr.hidden = true; ldr.classList.remove('out'); }, 200);
}

// ---- Background Paths (user request 2026-10-19; vanilla port of the React/framer-motion component): two layers of 36 curves, drawn slowly along their paths.
// pathLength="1" lets CSS animate stroke-dasharray / dashoffset; the duration of every path is seeded (20-30s), so the build is deterministic.
function initBgPaths(){
  if (document.querySelector('.bgp')) return;
  const NS = 'http://www.w3.org/2000/svg', TICK = 12, step = matchMedia('(max-width:599px)').matches ? 3 : 1;   // all 36 paths on desktop, every 3rd on phones: see the cost numbers in tokens.md
  const rnd = seed => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const box = document.createElement('div'); box.className = 'bgp'; box.setAttribute('aria-hidden', 'true');
  for (const p of [1, -1]) {
    const svg = document.createElementNS(NS, 'svg'), r = rnd(p > 0 ? 1234 : 5678);
    svg.setAttribute('viewBox', '0 0 696 316'); svg.setAttribute('fill', 'none'); svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    for (let i = 0; i < 36; i++) {
      const dur = 20 + r() * 10, len = 0.3 + r() * 0.7; if (i % step) continue;   // the random stream advances for every i, so the kept paths look the same on every device
      const a = 380 - i * 5 * p, b = 189 + i * 6, c = 312 - i * 5 * p, d = 216 - i * 6, e = 152 - i * 5 * p, f = 343 - i * 6, g = 616 - i * 5 * p, h = 470 - i * 6, k = 684 - i * 5 * p, m = 875 - i * 6;
      const el = document.createElementNS(NS, 'path');
      el.setAttribute('d', `M-${a} -${b}C-${a} -${b} -${c} ${d} ${e} ${f}C${g} ${h} ${k} ${m} ${k} ${m}`);
      el.setAttribute('stroke', 'currentColor'); el.setAttribute('stroke-width', (0.5 + i * 0.03).toFixed(2)); el.setAttribute('stroke-opacity', (0.1 + i * 0.03).toFixed(2));
      el.setAttribute('pathLength', '1'); el.style.strokeDasharray = `${len.toFixed(2)} 1`; const n = Math.round(dur * TICK); el.style.animationDuration = (n / TICK) + 's'; el.style.animationTimingFunction = `steps(${n})`;   // every path steps on one shared clock: TICK repaints a second (smooth linear cost 2x the main thread)
      svg.append(el);
    }
    box.append(svg);
  }
  document.body.prepend(box);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBgPaths); else initBgPaths();

﻿// ===================== i18n: UZ (default) · RU =====================
// I18N.uz is the source text, exactly as the prototype used to ship it. I18N.ru starts EMPTY: a missing key falls back to uz
// (with a dotted underline in ?review mode, so gaps are visible). Values are plain text; "\n" is a line break; {name} are parameters.
// Plurals (ru only; uz has none): add "key#one", "key#few", "key#many", "key#other" next to "key"; the form is picked from params.pl (the count the noun follows).
// Keys starting with "c." are 2.0 lesson CONTENT (prompts, exercise notes, library, Hermes cards): 2.0 had those in Uzbek only
// (ux-spec §4.5: never machine-translate them), so they stay Uzbek unless an entry is added on purpose.
const I18N = {uz: {
  // --- common
  'common.close': 'Yopish', 'common.back': 'Orqaga', 'common.done': 'Bajarildi', 'common.mark_done': 'Bajarildi deb belgilash', 'common.done_hint': 'Bajarildi, bekor qilish uchun bosing',
  'common.copy': 'Nusxalash', 'common.copied': 'Nusxalandi', 'common.copy_aria': 'Nusxalash: {title}', 'common.namuna': 'namuna', 'common.sr_done': ' · bajarildi',
  'common.sr_download': 'Yuklab olish: ', 'unit.b': 'B', 'prep.pdf_file': 'Tayyorgarlik_qollanmasi.pdf', 'unit.kb': 'KB', 'unit.mb': 'MB', 'common.sr_external': ' (yangi oynada ochiladi)', 'common.sample_file': 'namuna fayl', 'common.unknown_size': 'oʻlchami nomaʼlum', 'common.bonus': 'bonus',
  'common.extra': 'qoʻshimcha',
  'unit.sl': 'Slaydlar', 'unit.am': 'Amaliyot', 'unit.vz': 'Vazifa', 'unit.kt': 'Kit', 'unit.dk': 'Slaydlar', 'unit.am_n': 'Amaliyot {num}', 'unit.hermes': 'Hermes {id}',
  'pane.dk.open': 'Slaydlarni ochish',
  'pane.dk.count': '{n} ta slayd',
  'pane.dk.soon': 'Slaydlar tez orada qoʻshiladi',
  'lesson.n': '{n}-dars', 'lesson.label': '{n}-dars · {date}', 'lesson.meta': '{date} · {d}/{t} bajarildi',
  'steps': '{d}/{t} bajarildi', 'kind.video': 'video', 'kind.image': 'rasm',
  // --- dates (month table is in code; these are the patterns)
  'date.fmt': '{d}-{m}', 'date.until': '{date}gacha', 'date.opens': '{date}da ochiladi',
  // --- nav, menu, popup, toast, sheet, live announcements
  'nav.label': 'Boʻlimlar', 'nav.home': 'Dastur', 'nav.homebtn': 'Dastur', 'menu.label': 'Menyu', 'lang.label': 'Til',
  'menu.id': 'Shaxsiy ID', 'menu.group': 'Guruh', 'menu.group_value': 'Shanba guruhi', 'menu.course': 'Kurs', 'menu.course_value': '6 ta dars · 22 noy – 27 dek', 'menu.logout': 'Chiqish',
  'popup.label': 'Yangi dars', 'popup.k': 'Yangi dars ochildi', 'popup.open': 'Darsni ochish', 
  'toast.done': '{no} bajarildi', 'toast.undo': 'Bekor qilish', 'toast.notfound': 'Sahifa topilmadi',
  'lock.title': '{n} · {date}da ochiladi', 'lock.desc': 'Hermes kartalari va «Biznesda AIʼni qoʻllash» kitobi (lotin va kirill) dars kuni shu yerda chiqadi.',
  'lock.sub': '10 ta Hermes kartasi va kitob: «Biznesda AIʼni qoʻllash» (lotin va kirill)',
  'live.copied_new': 'Nusxalandi: {title}. Bajarildi. Bekor qilish tugmasi pastda.', 'live.copied': 'Nusxalandi: {title}. Bajarildi.', 'live.copy_failed': 'Nusxalanmadi. Matnni qoʻlda belgilang.',
  'live.marked': '{no} bajarildi.', 'live.unmarked': '{no} bajarildi belgisi olib tashlandi.', 'live.end_on': 'Bajarildi deb belgilandi.', 'live.end_off': 'Belgi olib tashlandi.',
  // --- gate
  'gate.label': 'Shaxsiy ID', 'gate.title': 'Shaxsiy\nkabinet', 'gate.submit': 'Kirish', 'gate.welcome': 'Xush kelibsiz, {name}!',
  'gate.err.toolong': 'ID 6 ta belgidan iborat. Xabardagi IDʼni qayta tekshiring.', 'gate.err.badchars': 'IDʼda 0, 1, I, L va O boʻlmaydi. Qayta tekshiring.',
  'gate.err.short': 'Yana {n} ta belgi kiriting.', 'gate.err.unknown_short': 'ID 6 ta belgidan iborat. Yana {n} ta belgi yozing.', 'gate.err.notfound': 'Bu ID topilmadi. Mentoringizdan tekshirib oling.',
  // --- lesson meta (2.0 metadata existed in UZ/RU/EN)
  'lesson.0.card': 'Oʻrnatish va\ntayyorgarlik',
  'lesson.1.card': 'AI qanday\nishlaydi', 
  
  'lesson.2.card': 'Kirish', 
  
  'lesson.3.card': 'Claude\nCode', 
  
  'lesson.4.card': 'API va\nMCP', 
  
  
  
  
  // --- home
  'home.title': 'Dastur', 'home.lessons': 'Darslar', 'home.ring.label': 'Toʻliq bajarilgan darslar', 'home.ring.valuetext': '{t} darsdan {d} tasi toʻliq bajarilgan.', 
  'home.ring.ps': 'Toʻliq bajarilgan darslar', 
  'hero.k': 'Hozir davom etmoqda', 'hero.sub': 'Slaydlar {i}/{n} · davom etish',
  'next.k': 'Keyingi qadam', 'next.ex_prompt': 'Mashq {num} · {pid} {title}', 'next.ex': 'Mashq {num}', 'next.pick': 'Mashq 03 · {num} {title}',
  'next.vz': 'Vazifa · {pid}', 'next.sl': 'Slaydlar · {i}/{total}', 'cta.continue': 'Davom etish: {what}',
  'note.prep_open': '{d}/{t} bajarildi', 'note.prep_done': 'Bajarildi', 'note.done': 'Bajarildi', 'note.live_a': 'Hozir', 'note.live_b': ' davom etmoqda', 'note.open': '{d}/{t} bajarildi',
  // --- prep (lesson 0)
  'prep.title': 'Mashq va video',
  'prep.cnt': '{d}/{t} bajarildi',
  'prep.pdf': 'PDF',
  'prep.list.k': 'Tayyorgarlik · 4 ta band',
  'prep.list.rule': 'Har bir bandni bajarganingizdan keyin belgilang.',
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  'live.prep_done': '{title} bajarildi · {d}/{t}',
  'live.prep_undone': '{title}: belgi olib tashlandi · {d}/{t} bajarildi',
  'prep.pdf_meta': 'PDF · {size}',
  'hero.sub_start': 'Slaydlar · {n} ta · boshlash',
  'hero.sub_seen': 'Slaydlar koʻrildi · {n}/{n}',
  'next.prep': 'Oʻrnatish, {title}',
  'cta.start': 'Boshlash: {what}',
  'lock.desc_n': 'Dars kuni shu yerda chiqadi: {parts}.',
  'lock.desc_0': 'Dars kuni shu yerda chiqadi.',
  'lib.back': 'Boʻlimlar',
  'lib.sect_meta': 'Promptlar {range}',
  'lib.next': 'Keyingi boʻlim\n{num} · {title}',
  'lib.index': 'Boʻlimlar\nroʻyxati',
  'lib.cnt': '{d}/{t} prompt bajarildi',
  'pane.vz1.begin': 'Vazifani\nboshlash',
  'sl.back_lesson': 'Darsga\nqaytish',
  'vz1.sheet.back': 'Vazifa\nsahifasi',
  'vz1.sheet.next': 'Keyingi qadam\n{what}',
  'end.done_ex': 'Mashq bajarildi',
  'end.mark_ex': 'Mashq bajarildi',
  'end.done_card': 'Karta bajarildi',
  'end.mark_card': 'Karta bajarildi',
  'prep.steps_n': '{n} ta qadam',
  'book.lat_name': 'Lotin yozuvida',
  'gate.help': 'IDʼingizni kiriting',
  'prep.intro_late': 'Birinchi dars {date} kuni boʻldi. Imkon qadar tezroq tayyorlab qoʻying, hammasi 30 daqiqa.',
  'part.locked': 'Hozircha yopiq',
  'part.opens': '{date}, {time} da ochiladi',
  'gate.err.rate': 'Juda koʻp urinish. {n} daqiqadan keyin qayta urinib koʻring.',
  'gate.err.offline': 'Aloqa yoʻq. Internetni tekshirib, qayta urinib koʻring.',
  'toast.save_failed': 'Saqlanmadi. Qayta urinib koʻring.',
  'menu.group_shanba': 'Shanba guruhi',
  'menu.group_yakshanba': 'Yakshanba guruhi',
  'menu.course_range': '{from} – {to}, {n} ta dars',
  'toast.lang_failed': 'Til oʻzgarmadi. Qayta urinib koʻring.',
  'sl.error': 'Slayd yuklanmadi',
  'sl.retry': 'Qayta urinish',
  'next.k_backlog': 'Qolib ketgan ish',
  'nb.hint': 'Yangi notebook oching va faqat shu fayllarni yuklang.',
  'nb.open': 'NotebookLMʼni ochish',
  'claude.open': 'Claudeʼni ochish',
  'toast.fill': '{no} nusxalandi. [Qavslar]ni oʻz maʼlumotingiz bilan almashtiring.',
  'toast.copy_failed': 'Nusxalanmadi. Matn belgilandi: uni qoʻlda nusxalang.',
  'files.md_hint': 'Oddiy matn fayli, noutbukda kerak boʻladi.',
  'd3.all': 'Hammaga', 'd3.area.hr': 'HR', 'd3.area.savdo': 'Savdo', 'd3.area.servis': 'Servis', 'd3.area.ombor': 'Ombor', 'd3.area.marketing': 'Marketing', 'd3.area.xarid': 'Xarid', 'd3.area.rahbar': 'Rahbar', 'd3.tag.main': 'Asosiy', 'd3.tag.or': 'yoki {area}', 'd3.tag.extra': 'Qoʻshimcha', 'd3.tag.demo': 'Namoyish', 'd3.n_prompts': '{n} prompt', 'd3.n_files': '{n} fayl', 'd3.group_aria': 'Yoʻnalishlar', 'd3.back': 'Barcha yoʻnalishlar', 'd3.next': 'Keyingi yoʻnalish', 'd3.s1': 'Avval oʻqing', 'd3.s1h': 'Mashq nimadan iboratligi', 'd3.s2': 'NotebookLMʼga yuklang', 'd3.s2h': 'Faqat shu {n} ta fayl', 'd3.s3': 'Promptlarni navbat bilan yuboring', 'd3.s3h': 'Bosib oching: qayerga qoʻyish va toʻliq matn', 'd3.pdf': 'Barcha promptlar bitta PDFʼda', 'd3.prompts': 'Promptlar', 'd3.open': 'Ochish', 'd3.close': 'Yopish', 'd3.back_s': 'Barcha boʻlimlar', 'd3.next_s': 'Keyingi qadam', 'd3.steps': 'qadamlar', 'd3.group_aria_s': 'Boʻlimlar', 'pane.more': 'Qoidalar va yordam', 'lesson.outs': 'Darsdan keyin siz', 'next.to_vz': 'Keyingi: Vazifa',
  'kx.h': 'Kit nima?', 'kx.t': 'Kit: oʻz biznesingizdagi amaliy ish. 5 ta Kit bor, har biri oldingisining natijasidan foydalanadi.', 'kx.sr': 'Bu darsda: {list} (jami 5 ta)', 'kx.k1': 'Ish qayerga ketadi', 'kx.k2': 'Qaysi jarayondan boshlaymiz', 'kx.k3': 'Ishni qayta taqsimlash', 'kx.k4': 'Yangi rollar', 'kx.k5': 'Pilot va hisob-kitob', 'stp.guide': 'Avval yoʻriqnomani oching', 'stp.next': 'Keyingi qadam', 'stp.prev': 'Oldingi', 'stp.ref': '{tab}, {n}-qadam: {title}', 'stp.ref_tab': '{tab} tabini oching', 'stp.ph': 'Qavsdagi joylarga oʻz maʼlumotingizni yozing.', 'stp.t.darsda': 'Darsda', 'stp.t.uyda': 'Uyda', 'stp.t.telefon': 'telefonda', 'stp.t.noutbuk': 'noutbukda', 'stp.t.mentor': 'mentor bilan', 'vzh.h': 'Vazifa nima?', 'vzh.due_l': 'Muddat', 'vzh.due_dt': '{date}, {time} gacha', 'vzh.due_d': '{date} gacha', 'vzh.due_sub': '{n} boshlanishidan oldin', 'vzh.due_next': 'Keyingi dars boshlanishidan oldin', 'vzh.when': 'Barcha qadamlar bajarilgach, «Vazifa bajarildi»ni bosing.', 'vzh.steps': 'Qadamlar', 'lesson.about': 'Dars haqida',
  'pane.uz_note': 'Dars materiallari va promptlar oʻzbek tilida, darsdagidek.',
  
  
  
  
  'end.aria_ex': 'Mashq bajarildi deb belgilash',
  'end.aria_card': 'Karta bajarildi deb belgilash',
  'vzf.aria': 'Vazifa bajarildi deb belgilash',
  'prep.title_late': 'Tayyorgarlik',
  'prep.guide_name': 'Oʻrnatish va tayyorgarlik qoʻllanmasi',
  'book.meta_lat': 'PDF · lotin',
  'units.sl': 'Slaydlar',
  'units.am1': '4 ta mashq',
  'units.am2': 'kutubxona',
  'units.am4': 'Hermes kartalari',
  'units.vz': 'vazifa',
  'units.kt': 'kit',
  'units.and': 'va',
  'next.all_done': 'Hammasi bajarildi ✓',
  'next.course_end': 'Kurs yakunlandi. Barcha materiallar shu yerda qoladi.',
  'prep.ready': 'Tayyorsiz',
  'prep.end_before': 'Tayyorsiz. Birinchi dars {date}.',
  'prep.end_after': 'Tayyorgarlik tugadi.',
  'prep.end_back': 'Dasturga qaytish',
  'date.tba': 'Sana keyinroq',
  'lock.title_tba': '{n} · sanasi keyinroq eʼlon qilinadi',
  'prep.intro_tba': 'Birinchi dars sanasini shu yerda eʼlon qilamiz. Hozirdan tayyorlab qoʻying, hammasi 30 daqiqa.',
  'prep.end_tba': 'Tayyorsiz. Birinchi dars sanasi shu yerda chiqadi.',
  'menu.course_tba': '{n} ta dars, sanasi keyinroq',
  'menu.group_none': 'Guruh hali tanlanmagan',
  'prep.more.dflt': 'Oʻrganishda davom eting',
  'sl.img': '{i}-slayd: {topic}',
  // --- lesson page: tabs and panes
  'tab.list': 'Dars boʻlimlari',
  'pane.sl.meta': '{n} ta slayd · {kind}', 'pane.sl.start': 'Slaydlarni koʻrish', 'pane.sl.again': 'Qayta\nkoʻrish', 'pane.sl.go': 'Davom etish\n{i}/{n}',
  'pane.am1.label': 'Darsda qilinadi', 'pane.am1.meta': '{d}/4 asosiy mashq bajarildi', 'pane.am1.page': 'Amaliyot\nsahifasi',
  'pane.am2.label': 'Kutubxona\n5 boʻlim · 47 ta prompt', 'pane.am2.done': 'Kutubxonadan foydalandingiz.', 'pane.am2.todo': 'Birorta promptni nusxalang: amaliyot bajarilgan hisoblanadi.', 'pane.am2.open': 'Kutubxonani\nochish',
  'pane.am4.label': 'Hermes agenti\n9 ta karta + bonus', 'pane.am4.page': 'Kartalar\nsahifasi',
  'pane.vz1.label': 'Uyda\n«Ravon Uy» keysi', 'pane.vz1.sub': 'prompt bajarildi. NotebookLMʼda birma-bir.', 'pane.vz1.page': 'Vazifa sahifasi', 'pane.vz1.go': 'Davom etish\nVazifa · {pid}', 'pane.vz1.open': 'Promptlarni\nochish',
  'pane.vz.label': 'Uyda\nErkin ijod', 
  'pane.kt.label': '{title}', 'lesson.sheetpdf': 'Promptlar varaqasi\nP1–P8, Q1–Q5 · PDF',
  'row.mark': '{d}/{t} prompt', 'ex.sub_03a': '03A bajarildi · 03B ixtiyoriy', 'ex.sub_03b': '03B bajarildi · 03A ixtiyoriy',
  // --- Vazifa
  'vz1.title': 'Vazifa', 'vz1.meta': 'NotebookLM mashqi', 'vz1.lede': '«Ravon Uy» keysi: manbalarni yuklab oling, keyin promptlarni birma‑bir bajaring.',
  
  'vz1.cnt': '{d}/{t} asosiy bajarildi', 'vz1.pdf': 'PDF varianti', 
  'vz1.sheet.h1': 'Promptlar', 
  'vz1.sheet.k': 'Asosiy promptlar · {d}/{t} bajarildi', 'lbl.manba': 'Manba:',
  
  'vzf.hint2': 'Ilovada hech narsa yuborish shart emas.', 'vzf.on': 'Vazifa bajarildi', 'vzf.off': 'Vazifa bajarildi',
  // --- Amaliyot (lesson 1 index, exercises)
  'am1.meta': 'Amaliyot · {d}/4 asosiy mashq bajarildi', 'am1.g_core': 'Asosiy mashqlar', 'am1.g_extra': 'Qoʻshimcha', 'am1.g_extra_hint': 'Vaqt qolsa yoki uyda ishlash uchun.', 'am1.g_closing': 'Yakuniy fayl',
  'pick.meta': 'Mashq 03', 'pick.group': 'Tanlang', 'pick.title': 'Bittasini tanlang: A yoki B', 'pick.lede': 'Ikkitadan bittasini tanlang. Bittasi bajarilsa, mashq bajarilgan hisoblanadi; ikkinchisi ixtiyoriy.', 'pick.done_sfx': ' · bajarildi',
  'ex.meta': 'Mashq {num}', 'ex.meta_extra': 'Mashq {num} · {extra}', 'ex.back': 'Amaliyot', 'ex.back_pick': '03 · Bittasini tanlang',
  'ex.g1': '1 · Avval oʻqing', 'ex.g2': '2 · NotebookLMʼga yuklang', 
  'ex.k': 'Promptlar · {d}/{t} bajarildi', 'ex.rule': '[Qavslar] ichini oʻzingiz toʻldirasiz.', 'lbl.where': 'Qayerga:', 'ex.pdf': 'PDF varianti · {size}',
  'end.done': 'Bajarildi', 'end.mark': 'Bajarildi deb belgilash', 'ex.next': 'Keyingi mashq\n{num} · {title}', 'ex.index': 'Amaliyot\nsahifasi',
  // --- library (lesson 2)
  'lib.meta': 'Amaliyot', 'lib.title': 'Prompt kutubxonasi', 'lib.lede': '47 ta tayyor prompt, 5 boʻlimda. Ishingizga mos boʻlimni tanlang.', 'lib.search': 'Prompt qidirish',
  'lib.sections': 'Boʻlimlar', 'lib.k': 'Promptlar · 47 ta', 'lib.found': '{n} ta natija', 'lib.empty': 'Hech narsa topilmadi. Boshqa soʻz bilan qidiring.', 'lib.clear': 'Tozalash', 'lib.rules': 'Qoidalar (4)',
  'lib.finish_on': 'Amaliyot yakunlandi', 'lib.finish_off': 'Amaliyotni yakunladim',
  // --- Hermes + book (lesson 4)
  'hi.meta': 'Amaliyot · {d}/9 karta bajarildi', 'hi.title': 'Hermes agenti', 'hi.group': 'Kartalar', 
  'hc.meta': '{id} / 09', 'hc.meta_bonus': 'Bonus', 
  'hc.next': 'Keyingi karta\n{id} · {title}', 'hc.index': 'Kartalar\nsahifasi',
  'book.cyr_extra': 'PDF · kirill',
  // --- slides
  'sl.close': 'Yopish', 'sl.all': 'Barcha slaydlar', 'sl.prev': 'Oldingi slayd', 'sl.next': 'Keyingi slayd', 'sl.seen': 'Bajarildi', 'sl.ph': 'namuna slayd', 'sl.topic': '{n} · {topic}',
  'sl.note': 'Slayd rasmlari 2.0 dan koʻrinmagan (himoyalangan). Bu yerda joy tutuvchi.', 'sl.doc_title': '{i}/{n} · {n_dars}',
  // --- file screen
  'file.hint': 'Bu prototipda fayl yoʻq: yuklab olish 2.0 serverida ishlaydi. Qator va havolalar tekshiruv uchun shu sahifaga olib keladi.',
  // --- placeholders ("namuna") that stand in for text 2.0 never showed
  'ns.text': 'Namuna matn: bu promptning haqiqiy matni 2.0 maʼlumotida koʻrinmagan. Haqiqiy matn keyin shu yerga joylanadi.', 'ns.text_qimmat': 'Namuna matn: qimmat deb javob berishsa, [Soha] boʻyicha shu javobni aniqlashtiring. Haqiqiy matn 2.0 maʼlumotida koʻrinmagan.',
  'ns.prompt': 'Prompt {n}', 'ns.rule': 'Qoida {n}', 'ns.q_title': '{id} sarlavhasi', 'ns.source': 'manba nomi (namuna)', 'ns.footnote': 'sahifa oxiridagi izoh matni 2.0 maʼlumotida koʻrinmagan.', 'ns.natija': 'Natija: namuna (2.0 maʼlumotida koʻrinmagan).',
  'ns.note': 'Namuna izoh: 2.0 maʼlumotida koʻrinmagan.', 'ns.note_02': 'Namuna izoh: bu mashqning izohi 2.0 maʼlumotida koʻrinmagan.', 'ns.note_04': 'Namuna izoh: 04-mashq sarlavhasi 2.0 maʼlumotida yoʻq, faqat «Marketing» toifasi bor.',
  'ns.lead': 'Kompaniya hujjatlarini NotebookLMʼga yuklab, ular asosida ishlang. Har mashqda: fayllarni yuklang, keyin promptlardan nusxa oling.',
  // --- screen captions and document titles (review-only captions; the titles are real)
  'tag.home': 'Asosiy sahifa: Dastur', 'tag.prep': 'Tayyorgarlik (2.0: 4 ta band, PDF)', 'tag.lesson': '{n}-dars sahifasi ({parts} ta boʻlim)', 'tag.vz1': 'Vazifa: «Ravon Uy» (3 qadam)', 'tag.vz1sheet': 'Vazifa promptlari (P1–P8, Q1–Q5)',
  'tag.am1': 'Amaliyot (qoida, qoʻllanma, mashqlar, yakuniy fayl)', 'tag.pick': '03 · Bittasini tanlang (03A / 03B)', 'tag.ex': 'Mashq {num}: {title}', 'tag.lib': '47 promptlik kutubxona (qidiruv + 5 boʻlim)',
  'tag.hi': 'Hermes: 9 ta karta + bonus', 'tag.hc': 'Hermes {id}: {title}', 'tag.slide': 'Slayd koʻrgich ({n} ta slayd, namuna)', 'tag.file': 'Fayl (namuna)',
  'title.lesson': '{n}-dars · {title}', 'title.ex': '{num} · {title}', 'title.vz': 'Vazifa · {n}-dars', 'title.am': 'Amaliyot · {n}-dars', 'title.pick': '03 · Bittasini tanlang', 'title.vzsheet': 'Vazifa promptlari',
  'title.site': 'AI Praktikum 3.0', 'title.gate': 'Shaxsiy kabinet', 'title.type': 'Shrift', 'title.all': 'Hammasi',
  // --- 3.0: six lessons, Kit, empty-lesson state
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  'lesson.5.card': 'Ishga\ntushirish',
  
  
  
  
  
  
  
  
  
  
  'lesson.6.card': 'Agentni\nyaxshilash',
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  'lesson.soon': 'Materiallar tez orada shu yerda chiqadi.',
  'note.soon': 'Materiallar tez orada',
  'units.am': 'amaliyot',
  'amf.on': 'Amaliyot bajarildi',
  'amf.off': 'Amaliyot bajarildi',
  'amf.aria': 'Amaliyot bajarildi deb belgilash',
  'prep.cmd_copy': 'Buyruqni nusxalash', 'toast.cmd_copied': 'Buyruq nusxalandi', 'pre.code_copy': 'Promokodni nusxalash', 'pre.code': 'Promokod', 'pre.in_video': 'Videoda', 'vp.player': 'Video pleer', 'vp.full': 'Toʻliq ekran', 'vp.vol': 'Ovoz balandligi', 'vp.mute': 'Ovozni oʻchirish', 'vp.unmute': 'Ovozni yoqish', 'vp.back': '10 soniya orqaga', 'vp.fwd': '10 soniya oldinga', 'vp.play': 'Ijro etish', 'vp.pause': 'Pauza', 'vp.pos': 'Video holati', 'toast.code_copied': 'Promokod nusxalandi',
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  'lesson.7.card': 'Natijalar va\ndemo kuni',
  
  
  
  
  
  
  
  'course.title': '{n} ta dars',
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  'prep.btn': 'Mashq va video', 'prep.btn_aria': 'Mashq va video',
  'pre.sub': 'Prompt mashqi va NotebookLM video darsi',
  'home.starts': 'Kurs {date}da boshlanadi', 'prep.left': 'Yana {n} ta qadam qoldi: {titles}.', 'pre.lede_late': 'Kurs davomida ham foydali: mashq platformasi va video dars.',  'setup.title': 'Oʻrnatish va tayyorgarlik',
  'pre.open': 'Ochish',
}, ru: /*RU*/{
  "common.close": "Закрыть",
  "common.back": "Назад",
  "common.done": "Выполнено",
  "common.mark_done": "Отметить выполненным",
  "common.done_hint": "Выполнено. Нажмите, чтобы отменить",
  "common.copy": "Копировать",
  "common.copied": "Скопировано",
  "common.copy_aria": "Копировать: {title}",
  "common.namuna": "образец",
  "common.sr_done": " · выполнено",
  "common.sr_download": "Скачать: ",
  "common.sr_external": " (откроется в новом окне)",
  "common.sample_file": "образец файла",
  "common.unknown_size": "размер неизвестен",
  "common.bonus": "бонус",
  "common.extra": "дополнительно",
  "unit.sl": "Слайды",
  "unit.am": "Практика",
  "unit.vz": "Задание",
  "unit.kt": "Kit",
  "unit.dk": "Слайды",
  "pane.dk.open": "Открыть слайды",
  "pane.dk.count": "{n} слайдов",
  "pane.dk.soon": "Слайды скоро появятся",
  "unit.am_n": "Практика {num}",
  "unit.hermes": "Hermes {id}",
  "lesson.n": "Урок {n}",
  "lesson.label": "Урок {n} · {date}",
  "lesson.meta": "{date} · {d}/{t} выполнено",
  "steps": "{d}/{t} выполнено",
  "kind.video": "видео",
  "kind.image": "изображения",
  "date.fmt": "{d} {m}",
  "date.until": "до {date}",
  "date.opens": "Откроется {date}",
  "nav.label": "Разделы",
  "nav.home": "Программа",
  "nav.homebtn": "Программа",
  "menu.label": "Меню",
  "lang.label": "Язык",
  "menu.id": "Личный ID",
  "menu.group": "Группа",
  "menu.group_value": "Субботняя группа",
  "menu.course": "Курс",
  "menu.course_value": "6 уроков · 22 нояб. – 27 дек.",
  "menu.logout": "Выйти",
  "popup.label": "Новый урок",
  "popup.k": "Открыт новый урок",
  "popup.open": "Открыть урок",
  "toast.done": "{no}: выполнено",
  "toast.undo": "Отменить",
  "toast.notfound": "Страница не найдена",
  "lock.title": "{n} · откроется {date}",
  "lock.desc": "Карточки Hermes и книга «Biznesda AIʼni qoʻllash» (на латинице и кириллице) появятся здесь в день урока.",
  "lock.sub": "10 карточек Hermes и книга «Biznesda AIʼni qoʻllash» (латиница и кириллица)",
  "live.copied_new": "Скопировано: {title}. Выполнено. Отменить можно кнопкой внизу.",
  "live.copied": "Скопировано: {title}. Выполнено.",
  "live.copy_failed": "Не удалось скопировать. Выделите текст вручную.",
  "live.marked": "{no}: выполнено.",
  "live.unmarked": "{no}: отметка «выполнено» снята.",
  "live.end_on": "Отмечено как выполненное.",
  "live.end_off": "Отметка снята.",
  "gate.label": "Личный ID",
  "gate.title": "Личный\nкабинет",
  "gate.submit": "Войти",
  "gate.welcome": "Добро пожаловать, {name}!",
  "gate.err.toolong": "ID состоит из 6 символов. Сверьте его с сообщением.",
  "gate.err.badchars": "В ID не бывает 0, 1, I, L и O. Проверьте ещё раз.",
  "gate.err.short": "Введите ещё {n} символа.",
  "gate.err.short#one": "Введите ещё {n} символ.",
  "gate.err.short#few": "Введите ещё {n} символа.",
  "gate.err.short#many": "Введите ещё {n} символов.",
  "gate.err.short#other": "Введите ещё {n} символа.",
  "gate.err.unknown_short": "ID состоит из 6 символов. Введите ещё {n}.",
  "gate.err.notfound": "Такой ID не найден. Уточните его у своего ментора.",
  "lesson.0.card": "Установка и\nподготовка",
  "lesson.1.card": "Как работает\nAI",
  "lesson.2.card": "Введение",
  "lesson.3.card": "Claude\nCode",
  "lesson.4.card": "API и\nMCP",
  "home.title": "Программа",
  "home.lessons": "Уроки",
  "home.ring.label": "Полностью пройденные уроки",
  "home.ring.valuetext": "Полностью пройдено уроков: {d} из {t}.",
  "home.ring.ps": "Полностью пройденные уроки",
  "hero.k": "Идёт сейчас",
  "hero.sub": "Слайды {i}/{n} · продолжить",
  "next.k": "Следующий шаг",
  "next.ex_prompt": "Упражнение {num} · {pid} {title}",
  "next.ex": "Упражнение {num}",
  "next.pick": "Упражнение 03 · {num} {title}",
  "next.vz": "Задание · {pid}",
  "next.sl": "Слайды · {i}/{total}",
  "cta.continue": "Продолжить: {what}",
  "note.done": "Выполнено",
  "note.live_a": "Сейчас",
  "note.live_b": " идёт",
  "note.open": "{d}/{t} выполнено",
  "prep.title": "Тренировка и видео",
  "prep.cnt": "{d}/{t} выполнено",
  "prep.pdf": "PDF",
  "prep.list.k": "Подготовка · 4 пункта",
  "prep.list.rule": "Отмечайте каждый пункт, когда выполните его.",
  "tab.list": "Разделы урока",
  "pane.sl.meta": "{n} слайда · {kind}",
  "pane.sl.meta#one": "{n} слайд · {kind}",
  "pane.sl.meta#few": "{n} слайда · {kind}",
  "pane.sl.meta#many": "{n} слайдов · {kind}",
  "pane.sl.meta#other": "{n} слайда · {kind}",
  "pane.sl.start": "Смотреть слайды",
  "pane.sl.again": "Смотреть\nснова",
  "pane.sl.go": "Продолжить\n{i}/{n}",
  "pane.am1.label": "На уроке",
  "pane.am1.meta": "Основных упражнений выполнено: {d}/4",
  "pane.am1.page": "Страница\nпрактики",
  "pane.am2.label": "Библиотека\n5 разделов · 47 промптов",
  "pane.am2.done": "Вы пользовались библиотекой.",
  "pane.am2.todo": "Скопируйте любой промпт: практика засчитывается.",
  "pane.am2.open": "Открыть\nбиблиотеку",
  "pane.am4.label": "Агент Hermes\n9 карточек + бонус",
  "pane.am4.page": "Страница\nкарточек",
  "pane.vz1.label": "Дома\nКейс «Ravon Uy»",
  "pane.vz1.sub": "промптов выполнено. В NotebookLM, по одному.",
  "pane.vz1.page": "Страница задания",
  "pane.vz1.go": "Продолжить\nЗадание · {pid}",
  "pane.vz1.open": "Открыть\nпромпты",
  "pane.vz.label": "Дома\nСвободный проект",
  "pane.kt.label": "{title}",
  "lesson.sheetpdf": "Лист с промптами\nP1–P8, Q1–Q5 · PDF",
  "row.mark": "промпты {d}/{t}",
  "ex.sub_03a": "03A выполнено · 03B по желанию",
  "ex.sub_03b": "03B выполнено · 03A по желанию",
  "vz1.title": "Домашнее задание",
  "vz1.meta": "Упражнение в NotebookLM",
  "vz1.lede": "Кейс «Ravon Uy»: скачайте источники, затем выполните промпты по одному.",
  "vz1.cnt": "Основных выполнено: {d}/{t}",
  "vz1.pdf": "PDF-версия",
  "vz1.sheet.h1": "Промпты",
  "vz1.sheet.k": "Основные промпты · выполнено {d}/{t}",
  "lbl.manba": "Источник:",
  "vzf.hint2": "В приложении ничего отправлять не нужно.",
  "vzf.on": "Задание выполнено",
  "vzf.off": "Задание выполнено",
  "am1.meta": "Практика · основных упражнений выполнено: {d}/4",
  "am1.g_core": "Основные упражнения",
  "am1.g_extra": "Дополнительно",
  "am1.g_extra_hint": "Если останется время на уроке или дома.",
  "am1.g_closing": "Итоговый файл",
  "pick.meta": "Упражнение 03",
  "pick.group": "Выберите",
  "pick.title": "Выберите одно: A или B",
  "pick.lede": "Выберите одно из двух. Если выполнено одно, упражнение засчитано; второе по желанию.",
  "pick.done_sfx": " · выполнено",
  "ex.meta": "Упражнение {num}",
  "ex.meta_extra": "Упражнение {num} · {extra}",
  "ex.back": "Практика",
  "ex.back_pick": "03 · Выберите одно",
  "ex.g1": "1 · Сначала прочитайте",
  "ex.g2": "2 · Загрузите в NotebookLM",
  "ex.k": "Промпты · {d}/{t} выполнено",
  "ex.rule": "Текст в [скобках] заполните сами.",
  "lbl.where": "Куда:",
  "ex.pdf": "PDF-версия · {size}",
  "end.done": "Выполнено",
  "end.mark": "Отметить выполненным",
  "ex.next": "Следующее упражнение\n{num} · {title}",
  "ex.index": "Страница\nпрактики",
  "lib.meta": "Практика",
  "lib.title": "Библиотека промптов",
  "lib.lede": "47 готовых промптов в 5 разделах. Выберите раздел, подходящий вашей работе.",
  "lib.search": "Поиск промптов",
  "lib.sections": "Разделы",
  "lib.k": "Промпты · 47",
  "lib.found": "{n} результата",
  "lib.found#one": "{n} результат",
  "lib.found#few": "{n} результата",
  "lib.found#many": "{n} результатов",
  "lib.found#other": "{n} результата",
  "lib.empty": "Ничего не найдено. Попробуйте другое слово.",
  "lib.clear": "Очистить",
  "lib.rules": "Правила (4)",
  "lib.finish_on": "Практика завершена",
  "lib.finish_off": "Завершить практику",
  "hi.meta": "Практика · карточек выполнено: {d}/9",
  "hi.title": "Агент Hermes",
  "hi.group": "Карточки",
  "hc.meta": "{id} / 09",
  "hc.meta_bonus": "Бонус",
  "hc.next": "Следующая карточка\n{id} · {title}",
  "hc.index": "Страница\nкарточек",
  "book.cyr_extra": "PDF · кириллица",
  "sl.close": "Закрыть",
  "sl.all": "Все слайды",
  "sl.prev": "Предыдущий слайд",
  "sl.next": "Следующий слайд",
  "sl.seen": "Выполнено",
  "sl.ph": "образец слайда",
  "sl.topic": "{n} · {topic}",
  "sl.note": "Изображения слайдов из 2.0 не были доступны (они защищены). Здесь заглушка.",
  "sl.doc_title": "{i}/{n} · {n_dars}",
  "file.hint": "В этом прототипе файла нет: скачивание работает на сервере 2.0. Строки и ссылки ведут на эту страницу для проверки.",
  "ns.text": "Образец текста: настоящий текст этого промпта в данных 2.0 не был виден. Его добавят сюда позже.",
  "ns.text_qimmat": "Образец текста: если отвечают «дорого» (qimmat), уточните этот ответ для [Сфера]. Настоящий текст в данных 2.0 не был виден.",
  "ns.prompt": "Промпт {n}",
  "ns.rule": "Правило {n}",
  "ns.q_title": "Заголовок {id}",
  "ns.source": "название источника (образец)",
  "ns.footnote": "текст примечания внизу страницы в данных 2.0 не был виден.",
  "ns.natija": "Результат: образец (в данных 2.0 не был виден).",
  "ns.note": "Образец примечания: в данных 2.0 его не было видно.",
  "ns.note_02": "Образец примечания: примечание к этому упражнению в данных 2.0 не было видно.",
  "ns.note_04": "Образец примечания: в данных 2.0 нет названия упражнения 04, есть только категория «Marketing».",
  "ns.lead": "Загрузите документы компании в NotebookLM и работайте с ними. В каждом упражнении: загрузите файлы, затем скопируйте промпты.",
  "tag.home": "Главная: Программа",
  "tag.prep": "Подготовка (2.0: 4 пункта, PDF)",
  "tag.lesson": "Страница урока {n} (разделов: {parts})",
  "tag.vz1": "Задание: «Ravon Uy» (3 шага)",
  "tag.vz1sheet": "Промпты задания (P1–P8, Q1–Q5)",
  "tag.am1": "Практика (правило, руководство, упражнения, итоговый файл)",
  "tag.pick": "03 · Выберите одно (03A / 03B)",
  "tag.ex": "Упражнение {num}: {title}",
  "tag.lib": "Библиотека из 47 промптов (поиск + 5 разделов)",
  "tag.hi": "Hermes: 9 карточек + бонус",
  "tag.hc": "Hermes {id}: {title}",
  "tag.slide": "Просмотр слайдов (слайдов: {n}, образец)",
  "tag.file": "Файл (образец)",
  "title.lesson": "Урок {n} · {title}",
  "title.ex": "{num} · {title}",
  "title.vz": "Домашнее задание · урок {n}",
  "title.am": "Практика · урок {n}",
  "title.pick": "03 · Выберите одно",
  "title.vzsheet": "Промпты задания",
  "title.site": "AI Praktikum 3.0",
  "title.gate": "Личный кабинет",
  "title.type": "Шрифт",
  "title.all": "Все экраны",
  "live.prep_done": "{title}: выполнено · {d}/{t}",
  "live.prep_undone": "{title}: отметка снята · {d}/{t} выполнено",
  "prep.pdf_meta": "PDF · {size}",
  "hero.sub_start": "Слайды · {n} · начать",
  "hero.sub_seen": "Слайды просмотрены · {n}/{n}",
  "next.prep": "Установка, {title}",
  "cta.start": "Начать: {what}",
  "lock.desc_n": "В день урока здесь появится: {parts}.",
  "lock.desc_0": "Появится здесь в день урока.",
  "lib.back": "Разделы",
  "lib.sect_meta": "Промпты {range}",
  "lib.next": "Следующий раздел\n{num} · {title}",
  "lib.index": "Список\nразделов",
  "lib.cnt": "Выполнено промптов: {d}/{t}",
  "pane.vz1.begin": "Начать\nзадание",
  "sl.back_lesson": "Назад\nк уроку",
  "vz1.sheet.back": "Страница\nзадания",
  "vz1.sheet.next": "Следующий шаг\n{what}",
  "end.done_ex": "Упражнение выполнено",
  "end.mark_ex": "Упражнение выполнено",
  "end.done_card": "Карточка выполнена",
  "end.mark_card": "Карточка выполнена",
  "prep.steps_n": "{n} шага",
  "prep.steps_n#one": "{n} шаг",
  "prep.steps_n#few": "{n} шага",
  "prep.steps_n#many": "{n} шагов",
  "prep.steps_n#other": "{n} шага",
  "book.lat_name": "Латиницей",
  "gate.help": "Введите ID",
  "prep.intro_late": "Первый урок прошёл {date}. Подготовьтесь как можно скорее, всё займёт 30 минут.",
  "part.locked": "Пока закрыто",
  "part.opens": "Откроется {date} в {time}",
  "gate.err.rate": "Слишком много попыток. Повторите через {n} мин.",
  "gate.err.offline": "Нет связи. Проверьте интернет и попробуйте ещё раз.",
  "toast.save_failed": "Не сохранилось. Попробуйте ещё раз.",
  "menu.group_shanba": "Группа субботы",
  "menu.group_yakshanba": "Группа воскресенья",
  "menu.course_range": "{from} – {to}, {n} уроков",
  "toast.lang_failed": "Язык не изменился. Попробуйте ещё раз.",
  "sl.error": "Слайд не загрузился",
  "sl.retry": "Повторить",
  "next.k_backlog": "Что осталось",
  "nb.hint": "Откройте новый блокнот и загрузите только эти файлы.",
  "nb.open": "Открыть NotebookLM",
  "claude.open": "Открыть Claude",
  "toast.fill": "{no}: скопировано. Замените [скобки] своими данными.",
  "toast.copy_failed": "Не удалось скопировать. Текст выделен: скопируйте его вручную.",
  "files.md_hint": "Обычный текстовый файл, нужен на ноутбуке.",
  "pane.more": "Правила и помощь",
  "lesson.outs": "После урока вы",
  "next.to_vz": "Дальше: Задание",
  "pane.uz_note": "Материалы урока и промпты на узбекском, как на уроке.",
  "end.aria_ex": "Отметить упражнение выполненным",
  "end.aria_card": "Отметить карточку выполненной",
  "vzf.aria": "Отметить задание выполненным",
  "prep.title_late": "Подготовка",
  "prep.guide_name": "Руководство по установке и подготовке",
  "book.meta_lat": "PDF · латиница",
  "units.sl": "слайды",
  "units.am1": "4 упражнения",
  "units.am2": "библиотека",
  "units.am4": "карточки Hermes",
  "units.vz": "задание",
  "units.kt": "kit",
  "units.and": "и",
  "next.all_done": "Всё выполнено ✓",
  "next.course_end": "Курс завершён. Все материалы остаются здесь.",
  "prep.ready": "Вы готовы",
  "prep.end_before": "Вы готовы. Первый урок: {date}.",
  "prep.end_after": "Подготовка завершена.",
  "prep.end_back": "Вернуться к программе",
  "sl.img": "Слайд {i}: {topic}",
  "date.tba": "Дата будет позже",
  "lock.title_tba": "{n} · дату объявим позже",
  "prep.intro_tba": "Дату первого урока объявим здесь. Подготовьтесь уже сейчас, всё займёт 30 минут.",
  "prep.end_tba": "Вы готовы. Дата первого урока появится здесь.",
  "menu.course_tba": "{n} уроков, даты позже",
  "menu.group_none": "Группа пока не выбрана",
  "prep.more.dflt": "Продолжайте учиться",
  "lesson.5.card": "Запуск\nв работу",
  "lesson.6.card": "Улучшаем\nагента",
  "lesson.soon": "Материалы скоро появятся здесь.",
  "note.soon": "Материалы скоро",
  "units.am": "практика",
  "amf.on": "Практика выполнена",
  "amf.off": "Практика выполнена",
  "amf.aria": "Отметить практику выполненной",
  "prep.cmd_copy": "Скопировать команду",
  "toast.cmd_copied": "Команда скопирована",
  "lesson.7.card": "Итоги и\nдемо-день",
  "course.title": "{n} уроков",
  "prep.btn": "Тренировка и видео",
  "prep.btn_aria": "Тренировка и видео",
  "pre.sub": "Тренировка промптов и видеоурок по NotebookLM",
  "setup.title": "Установка и подготовка",
  "pre.code_copy": "Скопировать промокод",
  "toast.code_copied": "Промокод скопирован",
  "pre.code": "Промокод",
  "pre.open": "Открыть",
  "pre.in_video": "В видео",
  "note.prep_open": "{d}/{t} выполнено",
  "note.prep_done": "Выполнено",
  "home.starts": "Курс начнётся {date}",
  "pre.lede_late": "Полезно и во время курса: тренажёр промптов и видеоурок.",
  "prep.left": "Осталось {n} шага: {titles}.",
  "prep.left#one": "Остался {n} шаг: {titles}.",
  "prep.left#few": "Осталось {n} шага: {titles}.",
  "prep.left#many": "Осталось {n} шагов: {titles}.",
  "prep.left#other": "Осталось {n} шага: {titles}.",
  "vp.player": "Видеоплеер",
  "vp.full": "Полный экран",
  "vp.vol": "Громкость",
  "vp.mute": "Выключить звук",
  "vp.unmute": "Включить звук",
  "vp.back": "Назад на 10 секунд",
  "vp.fwd": "Вперёд на 10 секунд",
  "vp.play": "Воспроизвести",
  "vp.pause": "Пауза",
  "vp.pos": "Позиция видео",
  "d3.all": "Всем",
  "d3.area.hr": "HR",
  "d3.area.savdo": "Продажи",
  "d3.area.servis": "Сервис",
  "d3.area.ombor": "Склад",
  "d3.area.marketing": "Маркетинг",
  "d3.area.xarid": "Закупки",
  "d3.area.rahbar": "Руководитель",
  "d3.tag.main": "Основной",
  "d3.tag.or": "или {area}",
  "d3.tag.extra": "Дополнительно",
  "d3.tag.demo": "Показ",
  "d3.n_prompts": "{n} промпта",
  "d3.n_prompts#one": "{n} промпт",
  "d3.n_prompts#few": "{n} промпта",
  "d3.n_prompts#many": "{n} промптов",
  "d3.n_prompts#other": "{n} промпта",
  "d3.n_files": "{n} файла",
  "d3.n_files#one": "{n} файл",
  "d3.n_files#few": "{n} файла",
  "d3.n_files#many": "{n} файлов",
  "d3.n_files#other": "{n} файла",
  "d3.group_aria": "Направления",
  "d3.back": "Все направления",
  "d3.next": "Следующее направление",
  "d3.s1": "Сначала прочитайте",
  "d3.s1h": "О чём это упражнение",
  "d3.s2": "Загрузите в NotebookLM",
  "d3.s2h": "Только эти {n} файла",
  "d3.s2h#one": "Только этот {n} файл",
  "d3.s2h#few": "Только эти {n} файла",
  "d3.s2h#many": "Только эти {n} файлов",
  "d3.s2h#other": "Только эти {n} файла",
  "d3.s3": "Отправляйте промпты по очереди",
  "d3.s3h": "Нажмите: куда вставить и полный текст",
  "d3.pdf": "Все промпты одним PDF",
  "d3.back_s": "Все разделы",
  "d3.next_s": "Следующий шаг",
  "d3.steps": "шаги",
  "d3.group_aria_s": "Разделы",
  "unit.kb": "КБ",
  "unit.mb": "МБ",
  "d3.prompts": "Промпты",
  "d3.open": "Открыть",
  "d3.close": "Свернуть",
  "unit.b": "Б",
  "prep.pdf_file": "Podgotovka_rukovodstvo.pdf",
  "kx.h": "Что такое Kit?",
  "kx.t": "Kit: практическая работа в вашем бизнесе. Всего 5 Kit, каждый опирается на результат предыдущего.",
  "kx.sr": "В этом уроке: {list} (всего 5)",
  "kx.k1": "Куда уходит работа",
  "kx.k2": "С какого процесса начать",
  "kx.k3": "Перераспределение работы",
  "kx.k4": "Новые роли",
  "kx.k5": "Пилот и расчёт",
  "stp.guide": "Сначала откройте инструкцию",
  "stp.next": "Следующий шаг",
  "stp.prev": "Предыдущий",
  "stp.ref": "{tab}, шаг {n}: {title}",
  "stp.ref_tab": "Откройте вкладку {tab}",
  "stp.ph": "Впишите свои данные в места в скобках.",
  "stp.t.darsda": "На уроке",
  "stp.t.uyda": "Дома",
  "stp.t.telefon": "на телефоне",
  "stp.t.noutbuk": "на ноутбуке",
  "stp.t.mentor": "с ментором",
  "vzh.h": "Что за задание?",
  "vzh.due_l": "Срок",
  "vzh.due_dt": "до {date}, {time}",
  "vzh.due_d": "до {date}",
  "vzh.due_sub": "перед началом: {n}",
  "vzh.due_next": "До начала следующего урока",
  "vzh.when": "Когда все шаги выполнены, отметьте задание.",
  "vzh.steps": "Шаги",
  "lesson.about": "Об уроке"
}/*ENDRU*/};
const LANGS = ['uz', 'ru'], HTML_LANG = {uz: 'uz-Latn', ru: 'ru'};
const MONTHS = { // lesson dates (the demo group meets 12, 19, 26 Sep and 3 Oct); ru = genitive
  uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']};
let LANG = cookieLang();
const MS = '', ME = ''; // wrap fallback text so ?review can underline it
const isReview = () => !document.body.classList.contains('solo');
const USED = new Set(), MISSING = new Set();
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const HT = html => ({html});                                                       // a T() parameter that is already HTML (e.g. built by cxh); every other parameter is escaped
const fmt = (s, p, h) => s.replace(/\{(\w+)\}/g, (m, k) => p && p[k] != null ? (h ? (p[k].html ?? esc(p[k])) : p[k]) : m);
function lookup(key, p){
  USED.add(key);
  if (LANG !== 'uz') {
    const d = I18N[LANG]; let v;
    if (p && p.pl != null) v = d[key + '#' + new Intl.PluralRules(LANG).select(p.pl)];
    v ??= d[key]; if (v != null) return [v, false];
  }
  const v = I18N.uz[key]; if (v == null) { MISSING.add(key); return ['⟦' + key + '⟧', false]; }
  return [v, LANG !== 'uz'];
}
const t = (key, p) => fmt(lookup(key, p)[0], p);                                   // plain text (attributes, textContent)
const BOOK_UZ = 'Biznesda AIʼni qoʻllash';                                          // the book's proper name stays Uzbek inside ru/en text: tag it with lang
const T = (key, p) => { const [v, fb] = lookup(key, p); let tpl = esc(v);   // HTML text: the template and every parameter are escaped; "\n" -> <br>
  if (!fb && LANG !== 'uz') tpl = tpl.split(BOOK_UZ).join(`<span lang="uz-Latn">${BOOK_UZ}</span>`);   // the book's name quoted inside a translated sentence (parameters bring their own tags)
  const s = fmt(tpl, p, true).replace(/\n/g, '<br>');
  return fb && isReview() ? MS + s + ME : s; };
const cx = (key, uz) => { USED.add(key); return (LANG !== 'uz' && I18N[LANG][key]) || uz; };                   // 2.0 content: Uzbek unless a translation was added on purpose
const cxFb = key => LANG !== 'uz' && !I18N[LANG][key];                                                      // true: this 2.0 content still shows in Uzbek inside a ru/en page
const cu = key => cx(key, I18N.uz[key]), cuh = key => cxh(key, I18N.uz[key]);   // course material kept in the dictionary as c.* (Uzbek in every language): plain text / HTML with the lang tag
const cxh = (key, uz, f = esc) => { const h = f(cx(key, uz)); return cxFb(key) ? `<span lang="uz-Latn">${h}</span>` : h; }; // cx() as escaped HTML; Uzbek content in ru/en gets lang="uz-Latn" (f = optional extra formatter, e.g. mark)
const fmtDate = (d, m) => fmt(t('date.fmt'), {d, m: MONTHS[LANG !== 'uz' && !I18N[LANG]['date.fmt'] ? 'uz' : LANG][m - 1]}); // until a language has its own date pattern, the Uzbek one (and Uzbek month names) is used
// the strings of the stage-A review: text nodes carrying MS..ME become a dotted-underlined span; attributes just lose the markers
function markMissing(root){
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode: n => /^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT}), hits = [];
  for (let n; (n = w.nextNode());) if (n.nodeValue.includes(MS)) hits.push(n);
  hits.forEach(n => { const f = document.createDocumentFragment(); n.nodeValue.split(MS).forEach((part, i) => { if (!i) return f.append(part); const [a, b] = part.split(ME);
      const s = document.createElement('span'); s.className = 'i18n-miss'; s.textContent = a; f.append(s, b || ''); }); n.replaceWith(f); });
  root.querySelectorAll('*').forEach(el => { for (const a of el.attributes) if (a.value.includes(MS) || a.value.includes(ME)) el.setAttribute(a.name, a.value.replace(/[]/g, '')); });
}
// static markup: data-i18n="key" (text, \n = <br>), data-i18n-attr="aria-label:key,placeholder:key", data-i18n-p='{"name":"Student"}'
function applyStatic(root = document){
  root.querySelectorAll('[data-i18n]').forEach(el => { const p = el.dataset.i18nP ? JSON.parse(el.dataset.i18nP) : undefined; el.innerHTML = T(el.dataset.i18n, p); });
  root.querySelectorAll('[data-i18n-attr]').forEach(el => el.dataset.i18nAttr.split(',').forEach(pair => { const [a, k] = pair.split(':'); el.setAttribute(a, t(k)); }));
  markMissing(root === document ? document.body : root);
}

// ===================== PROTOTYPE: data (Praktikum 3.0: six lessons; "namuna" = placeholder text or file in the prototype demo) =====================
// The demo content below is hand-written (lesson 1 has all four parts, the other lessons are empty on purpose: the "soon" state). Everything in it is `ph:true`
// and is shown with a small "namuna" tag, so it is never passed off as real.
// UI words live in I18N (proto_i18n.js). The Uzbek lesson text of the parts is registered into I18N.uz as "c.p.*" keys by registerContent().
// The shape of the content is C20 = {parts: {n: {am|kt|vz: {text, groups: [{title, note, files: [{slug, name, size, ph}]}]}}}} (prototype: written by hand below; the real app fills it from the API, see app_state.js): buildData() turns it into the globals the templates read.
let FILES = {};                                             // slug -> {name,size,ph,url}  (every file row opens #/fayl/{slug}, or downloads from `url` in the app)
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const F = (name, size, ph, slugOverride, url) => { const sl = slugOverride || slugify(name); return FILES[sl] = {slug: sl, name, size: size || '', ph: !!ph || !size, url: url || ''}; };
let LESSONS = {   // d = [day, month] (the shanba group), null = the date is not decided yet (02 Kirish); parts: sl slides, am amaliyot, kt kit, vz vazifa (only the parts a lesson really has)
  0: {num: null, d: [21, 11]},
  1: {num: 1, d: [21, 11], slides: 12, kind: 'image', parts: ['sl', 'am', 'kt', 'vz'], topics: 9},
  2: {num: null, d: null, slides: 12, kind: 'image', parts: ['sl', 'am', 'vz'], topics: 5},
  3: {num: 2, d: [28, 11], slides: 0, parts: [], topics: 8},
  4: {num: 3, d: [5, 12], slides: 0, parts: [], topics: 8},
  5: {num: 4, d: [12, 12], slides: 0, parts: [], topics: 8},
  6: {num: 5, d: [19, 12], slides: 0, parts: [], topics: 7},
  7: {num: 6, d: [26, 12], slides: 0, parts: [], topics: 7},
};

// ---- lesson 0: prep checklist (4 items: step counts and links only; the words come from the dictionary or the API)
let PREP = {items: []};   // from the API (lesson 0)

/*ART:begin*/ const PREP_ART = ["<svg class=\"ill\" viewBox=\"0 0 300 300\" aria-hidden=\"true\" focusable=\"false\"><rect class=\"s\" x=\"18\" y=\"204\" width=\"264\" height=\"26\" rx=\"10\" fill=\"#E0E0E0\"/><path d=\"M122 204h56v4a8 8 0 0 1-8 8h-40a8 8 0 0 1-8-8z\" fill=\"#000\"/><g class=\"l-lid\"><rect x=\"46\" y=\"48\" width=\"208\" height=\"156\" rx=\"14\" fill=\"#000\"/><rect x=\"58\" y=\"60\" width=\"184\" height=\"132\" rx=\"6\" fill=\"#0A14FC\"/><rect class=\"s\" x=\"70\" y=\"72\" width=\"160\" height=\"108\" rx=\"8\" fill=\"#fff\"/><rect x=\"84\" y=\"86\" width=\"70\" height=\"8\" rx=\"4\" fill=\"#E0E0E0\"/><rect x=\"84\" y=\"100\" width=\"44\" height=\"8\" rx=\"4\" fill=\"#E0E0E0\"/><text x=\"84\" y=\"138\" font-size=\"22\" fill=\"#000\">5 GB</text><rect x=\"191.2\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#E0E0E0\"/><rect x=\"204.6\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#E0E0E0\"/><rect x=\"84.0\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"97.4\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"110.8\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"124.2\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"137.6\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"151.0\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"164.4\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"177.8\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><g class=\"l-free\"><rect x=\"191.2\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#FDC959\" stroke=\"#000\" stroke-width=\"3\"/><rect x=\"204.6\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#FDC959\" stroke=\"#000\" stroke-width=\"3\"/></g></g><g transform=\"translate(278 22)\"><g class=\"badge\"><circle r=\"16\" fill=\"#000\"/><path d=\"M-7 0.5l5 5 9-10\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></g></svg>","<svg class=\"ill\" viewBox=\"0 0 300 300\" aria-hidden=\"true\" focusable=\"false\"><g class=\"g-card\"><rect class=\"s\" x=\"92\" y=\"22\" width=\"116\" height=\"150\" rx=\"12\" fill=\"#E0E0E0\"/><rect x=\"108\" y=\"40\" width=\"72\" height=\"9\" rx=\"4.5\" fill=\"#000\"/><rect x=\"108\" y=\"56\" width=\"48\" height=\"9\" rx=\"4.5\" fill=\"#000\"/><rect x=\"108\" y=\"82\" width=\"84\" height=\"24\" rx=\"12\" fill=\"#0A14FC\"/><g class=\"g-tick\"><path d=\"M141 94l6 6 12-12\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></g><g class=\"g-env\"><rect class=\"s\" x=\"66\" y=\"130\" width=\"168\" height=\"142\" rx=\"22\" fill=\"#fff\"/><path d=\"M150.0 160.0A40 40 0 0 0 113.7 183.1\" fill=\"none\" stroke=\"#EA4335\" stroke-width=\"26\"/><path d=\"M113.7 183.1A40 40 0 0 0 115.4 220.0\" fill=\"none\" stroke=\"#FBBC04\" stroke-width=\"26\"/><path d=\"M115.4 220.0A40 40 0 0 0 178.3 228.3\" fill=\"none\" stroke=\"#34A853\" stroke-width=\"26\"/><path d=\"M178.3 228.3A40 40 0 0 0 190.0 201.4\" fill=\"none\" stroke=\"#4285F4\" stroke-width=\"26\"/><path d=\"M150.0 160.0A40 40 0 0 1 181.5 175.4\" fill=\"none\" stroke=\"#4285F4\" stroke-width=\"26\"/><rect x=\"150\" y=\"187\" width=\"53\" height=\"26\" fill=\"#4285F4\"/></g><g transform=\"translate(278 22)\"><g class=\"badge\"><circle r=\"16\" fill=\"#000\"/><path d=\"M-7 0.5l5 5 9-10\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></g></svg>","<svg class=\"ill\" viewBox=\"0 0 300 300\" aria-hidden=\"true\" focusable=\"false\"><g transform=\"rotate(-9 150 92)\"><rect class=\"s\" x=\"62\" y=\"36\" width=\"176\" height=\"112\" rx=\"12\" fill=\"#E0E0E0\"/><rect x=\"78\" y=\"52\" width=\"56\" height=\"10\" rx=\"5\" fill=\"#000\"/></g><g transform=\"rotate(-3 150 112)\"><rect class=\"s\" x=\"52\" y=\"62\" width=\"184\" height=\"116\" rx=\"12\" fill=\"#E0E0E0\"/><rect x=\"68\" y=\"78\" width=\"56\" height=\"10\" rx=\"5\" fill=\"#000\"/></g><g class=\"v-in\"><g class=\"v-loop\"><rect class=\"s\" x=\"40\" y=\"106\" width=\"196\" height=\"126\" rx=\"12\" fill=\"#0A14FC\"/><rect class=\"s\" x=\"58\" y=\"124\" width=\"38\" height=\"28\" rx=\"6\" fill=\"#FDC959\"/><text x=\"208\" y=\"160\" text-anchor=\"end\" font-size=\"38\" fill=\"#fff\" style=\"font-family:var(--font-display);font-weight:700;font-style:italic;font-stretch:125%\">VISA</text><rect x=\"58\" y=\"198\" width=\"84\" height=\"9\" rx=\"4.5\" fill=\"#fff\"/><rect x=\"150\" y=\"198\" width=\"44\" height=\"9\" rx=\"4.5\" fill=\"#fff\"/><circle cx=\"226\" cy=\"124\" r=\"5\" fill=\"#000\"/><path d=\"M226 124Q246 146 240 176\" fill=\"none\" stroke=\"#000\" stroke-width=\"4\" stroke-linecap=\"round\"/><rect class=\"s\" x=\"226\" y=\"170\" width=\"58\" height=\"38\" rx=\"9\" fill=\"#fff\"/><circle cx=\"238\" cy=\"180\" r=\"3.5\" fill=\"#000\"/><text x=\"262\" y=\"198\" text-anchor=\"middle\" font-size=\"17\" fill=\"#000\">$20</text></g></g><g transform=\"translate(278 22)\"><g class=\"badge\"><circle r=\"16\" fill=\"#000\"/><path d=\"M-7 0.5l5 5 9-10\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></g></svg>","<svg class=\"ill\" viewBox=\"0 0 300 300\" aria-hidden=\"true\" focusable=\"false\"><g class=\"c-win\"><rect x=\"32\" y=\"44\" width=\"236\" height=\"204\" rx=\"14\" fill=\"#000\"/><circle cx=\"50\" cy=\"57\" r=\"4\" fill=\"#E0E0E0\"/><circle cx=\"64\" cy=\"57\" r=\"4\" fill=\"#E0E0E0\"/><circle cx=\"78\" cy=\"57\" r=\"4\" fill=\"#E0E0E0\"/><path d=\"M38 70h224v164a8 8 0 0 1-8 8H46a8 8 0 0 1-8-8z\" fill=\"#fff\"/><rect x=\"146\" y=\"82\" width=\"104\" height=\"30\" rx=\"15\" fill=\"#000\"/><rect x=\"162\" y=\"93\" width=\"62\" height=\"8\" rx=\"4\" fill=\"#fff\"/><g class=\"c-reply\"><rect class=\"s\" x=\"48\" y=\"128\" width=\"52\" height=\"52\" rx=\"13\" fill=\"#D97757\"/><polygon points=\"74.0,132.0 75.8,147.2 83.0,138.4 78.9,149.1 93.1,143.0 80.8,152.2 93.0,154.0 80.8,155.8 93.1,165.0 78.9,158.9 83.0,169.6 75.8,160.8 74.0,176.0 72.2,160.8 64.5,170.5 69.1,158.9 54.9,165.0 67.2,155.8 56.0,154.0 67.2,152.2 54.9,143.0 69.1,149.1 64.5,137.5 72.2,147.2\" fill=\"#fff\"/><rect x=\"112\" y=\"130\" width=\"128\" height=\"12\" rx=\"6\" fill=\"#E0E0E0\"/><rect x=\"112\" y=\"150\" width=\"108\" height=\"12\" rx=\"6\" fill=\"#E0E0E0\"/><rect x=\"112\" y=\"170\" width=\"72\" height=\"12\" rx=\"6\" fill=\"#E0E0E0\"/></g><rect x=\"54\" y=\"204\" width=\"192\" height=\"26\" rx=\"13\" fill=\"#E0E0E0\"/><circle cx=\"231\" cy=\"217\" r=\"8\" fill=\"#000\"/></g><g transform=\"translate(278 22)\"><g class=\"badge\"><circle r=\"16\" fill=\"#000\"/><path d=\"M-7 0.5l5 5 9-10\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></g></svg>"]; /*ART:end*/   // the four animated pictures of prep option C (UI, not content)

let C20 = {};   // filled from GET /me (app_state.js): the bundle holds no lesson text
const PREP_CMDS = {};   // prep item -> {step index: an install command shown (and copyable) under that step}; empty since the Warp card was removed (2026-10-30)
let PARTS = {};   // lesson number -> {am|kt|vz: {text, groups: [{title, note, files}]}}: the shape the lesson page reads
const FC = (f, ph, slug) => f ? Object.assign(F(f.name, f.size, ph, slug || f.slug, f.url), f.label ? {label: f.label} : {}, f.guide ? {guide: true} : {}) : null;   // label: the chip text (UX audit S6-8); name stays the download name; guide: the Kit's PDF that «Qayerdan boshlash» starts with   // file from the demo / API: name + size (+ url in the app), never a server path
const strs = a => Array.isArray(a) ? a.filter(x => typeof x === 'string' && x) : [];
// a step's link to another step or tab: {tab: 'kit' | 'amaliyot' | 'vazifa', step?: 1-based}, one or a list
const refs = r => (Array.isArray(r) ? r : r ? [r] : []).map(x => ({tab: {amaliyot: 'am', kit: 'kt', vazifa: 'vz'}[x && x.tab], step: Number.isInteger(x && x.step) && x.step > 0 ? x.step : 0})).filter(x => x.tab);
function buildData(){
  FILES = {}; PARTS = {};
  Object.entries((C20 && C20.parts) || {}).forEach(([n, o]) => { PARTS[n] = {}; const used = new Set();   // progress ids of the prompt rows: unique inside a lesson, 1-8 letters or digits ("P{index}" when the id is empty)
    Object.entries(o).forEach(([k, b]) => {
      // Kit / Vazifa extras (all optional): kits = the Kit numbers of this tab, head = the Kit's one plain sentence, due = "next" or the content's own words; a step's icon names its picture (PG)
      PARTS[n][k] = {text: b.text || '', kits: (Array.isArray(b.kits) ? b.kits : []).filter(x => Number.isInteger(x) && x >= 1 && x <= 5), head: typeof b.head === 'string' ? b.head : '', due: typeof b.due === 'string' ? b.due : '',
        groups: (b.groups || []).map(g => ({title: g.title || '', note: g.note || '', tags: strs(g.tags), icon: typeof g.icon === 'string' ? g.icon : '', kind: g.kind === 'files' ? 'files' : '', ref: refs(g.ref), files: (g.files || []).map(f => FC(f, f.ph)),
        prompts: (g.prompts || []).map((q, j) => { const id = (String(q.id || '').replace(/[^A-Za-z0-9]/g, '') || 'P' + (j + 1)).slice(0, 8); let kid = id, c = 2; while (used.has(kid)) kid = id.slice(0, 6) + c++; used.add(kid);
          return {id: q.id || '', kid, title: q.title || '', target: q.target || '', text: q.text || ''}; })}))}; }); });
}
let SAMPLE_FILES = false, C20_TRANSLATED = false;   // prototype: the demo files are marked samples; the real app has none
buildData();



// ---- the Uzbek lesson text goes into I18N.uz as "c.p.*" keys (so the whole text of the prototype is in one dictionary)
function registerContent(){
  const set = (k, v) => { if (typeof v === 'string') I18N.uz[k] = v; };
  Object.entries(PARTS).forEach(([n, o]) => Object.entries(o).forEach(([k, b]) => {
    set(`c.p.${n}.${k}.text`, b.text); set(`c.p.${n}.${k}.head`, b.head || null); if (b.due !== 'next') set(`c.p.${n}.${k}.due`, b.due || null);
    b.groups.forEach((g, i) => { set(`c.p.${n}.${k}.g${i}`, g.title); set(`c.p.${n}.${k}.g${i}.n`, g.note);
      g.prompts.forEach((q, j) => { const pk = `c.p.${n}.${k}.g${i}.p${j}`; set(pk + '.t', q.title); set(pk + '.w', q.target); set(pk + '.x', q.text); }); }); }));
}

// ===================== PROTOTYPE: state, logic, templates, router (all UI text comes from t() / T() / cx(), see proto_i18n.js) =====================
// ===================== APP: state, gating and the data layer (the real portal: every piece of state and content comes from the API) =====================
// Replaces the prototype's STATE and GATE blocks of proto_app.js (build_app.py). Nothing here knows any lesson text: it only reshapes what the API returns.
const API = '/api/aip', BASE = '/aip';
let AUTH = false, SESS = null, STUDENT = '', STUDENT_FIRST = '';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function api(method, path, body){
  let r;
  try { r = await fetch(API + path, {method, credentials: 'same-origin', headers: body !== undefined ? {'Content-Type': 'application/json'} : undefined, body: body !== undefined ? JSON.stringify(body) : undefined}); }
  catch { const e = new Error('network'); e.code = 'network'; throw e; }
  let j = null; try { j = await r.json(); } catch {}
  if (!r.ok) {
    const e = new Error(j?.error?.code || 'http_' + r.status); e.status = r.status; e.code = j?.error?.code || 'http'; e.info = j?.error || {};
    if (r.status === 401 && path !== '/login') onUnauthorized();
    throw e;
  }
  return j;
}
const marker = on => { document.cookie = `aip_in=${on ? 1 : ''}; Path=/; Max-Age=${on ? 86400 : 0}; SameSite=Lax`; };   // "a session probably exists" (the real cookie is HttpOnly)
function onUnauthorized(){   // the session ended (or never existed): back to the gate, nothing of the old student stays on screen
  marker(false); d3Forget();
  if (!AUTH) return;
  AUTH = false; SESS = null; STUDENT = STUDENT_FIRST = ''; S.set({t: {}, sl: {}});
  ['nm-name', 'nm-id', 'nm-group', 'nm-mentor', 'nm-course'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = ''; });
  if (typeof render === 'function') render();
}

// ---- progress: kept in memory, written with PUT /progress (optimistic; a failed write rolls back and says so quietly)
const S = {
  p: {t: {}, sl: {}}, q: Promise.resolve(), slT: {}, slI: {}, gen: {},
  set(p){ this.p = {t: {...(p?.t || {})}, sl: {...(p?.sl || {})}}; },
  has(k){ return !!this.p.t[k]; },
  sl(n){ return this.p.sl[n] || 0; },
  tick(k, on){
    const was = this.has(k); if (was === !!on) return;
    on ? this.p.t[k] = 1 : delete this.p.t[k];
    this.put(k, on ? 1 : 0, () => { was ? this.p.t[k] = 1 : delete this.p.t[k]; });
  },
  setSl(n, i){   // the server keeps the maximum; writes are debounced so flipping through slides is one request
    const was = this.sl(n); if (i <= was) return;
    this.p.sl[n] = i; this.slI[n] = {i, was}; clearTimeout(this.slT[n]);
    this.slT[n] = setTimeout(() => this.sendSl(n), 400);
  },
  sendSl(n){ const w = this.slI[n]; if (!w) return; delete this.slI[n]; clearTimeout(this.slT[n]); const {i, was} = w; this.put('sl:' + n, i, () => { if (this.p.sl[n] === i) this.p.sl[n] = was; }); },
  flush(){ Object.keys(this.slI).forEach(n => this.sendSl(n)); return this.q; },   // everything written before a refetch, so the answer cannot undo a tick that is still on its way
  put(key, value, rollback){   // one at a time and in order, so a tick and its undo can never cross
    const g = this.gen[key] = (this.gen[key] || 0) + 1;
    this.q = this.q.then(() => api('PUT', '/progress', {key, value})).catch(e => {
      if (e.status === 401) return;
      if (this.gen[key] !== g) return;   // a newer write for this key is queued: it decides, no rollback
      rollback(); try { render(true); } catch {} if (typeof flashToast === 'function') flashToast('toast.save_failed');   // render clears the toast, so it comes last
    });
  },
};

// ---- gating: the server decides which lesson is live and which parts are open (never the clock of this device)
const startedAt = n => Date.parse(LESSONS[n] && LESSONS[n].start) <= Date.now();   // the lesson start (payload) against this device clock (as scheduleRecheck does); a TBA start (null) is NaN, so false
// audit #8: review accounts have lesson 1 open early, so "open" alone is not "started": a live lesson, or lesson 1 behind us by the clock
const courseStarted = () => !!(LESSONS[1] && LESSONS[1].open) && (liveLesson() > 0 || startedAt(1));
// audit #11: every numbered lesson has started and none is live any more (the server ends the last one after liveDays)
const courseOver = () => liveLesson() === 0 && RN().length > 0 && RN().every(startedAt);
const liveLesson = () => SESS ? SESS.live.n : 0;
const isLocked = n => n >= 1 && !(LESSONS[n] && LESSONS[n].open);
const partLock = (n, p) => (LESSONS[n] && LESSONS[n].lock && LESSONS[n].lock[p]) || null;   // iso time when a part opens (or 'unknown'), else null
let recheckT = 0;
function scheduleRecheck(){   // a part opens while the page is open: ask again when the earliest one is due
  clearTimeout(recheckT);
  const times = Object.values(LESSONS).flatMap(L => [...Object.values(L.lock || {}), L.at]).map(x => Date.parse(x)).filter(x => x > Date.now());   // L.at = the start of a lesson that is not open yet (an empty lesson has no part times)
  if (times.length) recheckT = setTimeout(() => recheck(), Math.min(Math.min(...times) - Date.now() + 1500, 3600e3));   // ponytail: capped at 1 h (a device clock can be wrong); recheck() arms the next one
}

// ---- the API payload becomes the shapes the templates already read (C20 -> buildData(), LESSONS, PREP)
const sid = s => String(s == null ? '' : s).replace(/[^A-Za-z0-9_-]/g, '');   // ids that end up in href / id / data-*: nothing else may pass
let FILE_LANG = 'uz';   // the language of the payload being applied (units: KB / КБ)
const unitT = k => (I18N[FILE_LANG] && I18N[FILE_LANG][k]) || I18N.uz[k];
const fileLabel = f => { const ext = (f.name.split('.').pop() || '').toUpperCase(); return f.size < 1024 ? `${ext} · ${f.size} ${unitT('unit.b')}` : f.size < 1048576 ? `${ext} · ${Math.round(f.size / 1024)} ${unitT('unit.kb')}` : `${ext} · ${(f.size / 1048576).toFixed(1).replace('.', ',')} ${unitT('unit.mb')}`; };   // one style everywhere: "PDF · 358 KB" (whole KB, MB with one decimal)
const fo = (n, f) => f ? {slug: sid(f.slug), name: f.name, label: typeof f.label === 'string' ? f.label : '', guide: f.guide === true, size: fileLabel(f), url: `${API}/lesson/${n}/doc/${encodeURIComponent(f.slug)}`} : null;   // name + size + the download URL; the server path never reaches the client

function makeC20(by){   // the open blocks of each lesson (Amaliyot, Kit, Vazifa) in the shape buildData() reads (it checks the optional Kit / Vazifa fields)
  const parts = {};
  for (const l of Object.values(by)) {
    if (l.n < 1) continue;
    for (const [k, key] of [['am', 'amaliyot'], ['kt', 'kit'], ['vz', 'vazifa']]) {
      const b = l[key]; if (!b || typeof b !== 'object') continue;
      (parts[l.n] ??= {})[k] = {text: b.text || '', kits: b.kits, head: b.head, due: b.due, groups: (b.groups || []).map(g => ({title: g.title || '', note: g.note || '', tags: g.tags, icon: g.icon, kind: g.kind, ref: g.ref, files: (g.files || []).map(f => fo(l.n, f)),
        prompts: (Array.isArray(g.prompts) ? g.prompts : []).map(q => ({id: sid(q.id), title: q.title || '', target: q.target || '', text: q.text || ''}))}))};
    }
  }
  return {parts};
}

function applyLessons(ls, lsUz, lang){
  // lang = the language of the payload `ls`: its platform text goes into THAT dictionary, whatever LANG says by now (a switch may be under way)
  const by = {}; ls.forEach(l => by[l.n] = l);
  const dOf = l => l && l.date ? [+l.date.slice(8, 10), +l.date.slice(5, 7)] : null, L = {}, lessons = ls.filter(l => l.n >= 1);
  L[0] = {d: dOf(by[1]), open: true};
  for (const l of lessons) {
    const n = l.n, lock = {}, parts = [], has = l.has || {};
    const add = (on, key, part) => { if (!on) return; parts.push(key); const pp = l.parts && l.parts[part]; if (pp && !pp.open) lock[key] = pp.opensAt || 'unknown'; };
    add(has.slides, 'sl', 'slides'); add(has.amaliyot, 'am', 'amaliyot'); add(has.kit, 'kt', 'kit'); add(has.vazifa, 'vz', 'vazifa');
    const num = l.num !== undefined ? l.num : l.n;
    add(has.deck || num != null, 'dk', 'deck');   // every numbered lesson shows Slaydlar; without a deck yet the pane says "coming soon"
    L[n] = {n, num, deck: !!has.deck, d: dOf(l), open: !!l.open, at: l.open ? null : (l.start || null), start: l.start || null, lock, parts, slides: l.slideCount || 0, kind: l.slideKind || 'image', topics: (l.topics || []).length, outs: (l.outcomes || []).length};
  }
  LESSONS = L;
  FILE_LANG = LANGS.includes(lang) ? lang : LANG;
  const D = I18N[LANGS.includes(lang) ? lang : LANG];   // platform text of the payload's language (lesson metadata and the prep checklist come translated from the API)
  for (const l of lessons) { const n = l.n; D[`lesson.${n}.title`] = l.title; D[`lesson.${n}.sub`] = l.subtitle; D[`lesson.${n}.lede`] = l.summary; (l.topics || []).forEach((x, i) => { D[`lesson.${n}.t${i}`] = x; }); (l.outcomes || []).forEach((x, i) => { D[`lesson.${n}.o${i}`] = x; }); }
  const pr = by[0] && by[0].prep;
  if (pr) {
    const acts = it => (it.actions || []).filter(a => /^https:\/\//.test(a.url));   // only https links leave the portal
    PREP = {items: pr.items.map(it => ({steps: it.steps.length, actions: acts(it).map(a => ({url: a.url, quiet: !!a.quiet})), foot: !!it.footnote}))};
    D['prep.intro'] = pr.intro.replace('{sana}', '{date}');
    pr.items.forEach((it, i) => { D[`prep.${i}.title`] = it.title; D[`prep.${i}.note`] = it.note; it.steps.forEach((s, j) => { D[`prep.${i}.s${j}`] = s; }); acts(it).forEach((a, j) => { D[`prep.${i}.a${j}`] = a.label; }); if (it.footnote) D[`prep.${i}.foot`] = it.footnote; });
  }
const pts = x => Array.isArray(x.points) ? x.points.filter(p => typeof p === 'string' && p).slice(0, 6) : [];   // the "Videoda" points of a video row (at most 6)
  const vid = x => typeof x.video === 'string' && /^[a-z0-9-]{1,40}$/.test(x.video) ? x.video : null;   // a video served by the portal (content/lessons/0/video/<slug>.mp4)
  const mo = pr && pr.more, ml = mo && Array.isArray(mo.links) ? mo.links.filter(x => x && (/^https:\/\//.test(x.url) || vid(x))) : [];   // learning platforms and videos: never counted as prep
  PREP.more = ml.length ? {links: ml.map(x => ({url: /^https:\/\//.test(x.url) ? x.url : null, video: vid(x) ? `${API}/prep/video/${vid(x)}` : null, poster: vid(x) ? `${API}/prep/poster/${vid(x)}` : null, code: typeof x.code === 'string' && /^[A-Za-z0-9_-]{1,32}$/.test(x.code) ? x.code : null, points: pts(x).length}))} : null;   // code = an optional promo code shown with a copy button
  if (PREP.more) {
    const dflt = (I18N[lang] || I18N.uz)['prep.more.dflt'] || I18N.uz['prep.more.dflt'];   // the payload's language, not the UI's: never a blank heading or pill
    D['prep.more.title'] = mo.title || dflt; D['prep.more.note'] = mo.note || '';
    ml.forEach((x, i) => { D[`prep.more.${i}.t`] = x.title || x.url || ''; D[`prep.more.${i}.s`] = x.sub || ''; D[`prep.more.${i}.n`] = x.note || ''; D[`prep.more.${i}.cl`] = x.codeLabel || ''; pts(x).forEach((p, j) => { D[`prep.more.${i}.p${j}`] = p; }); });
  }
  const byUz = {}; (lsUz || ls).forEach(l => byUz[l.n] = l);   // course material is Uzbek in every UI language
  C20 = makeC20(byUz); buildData();
  registerContent();
}
async function fetchMe(){   // platform text in the UI language and course material in Uzbek: the writes still on their way go first, then both answers together
  await S.flush();
  const [j, uz] = await Promise.all([api('GET', '/me'), LANG === 'uz' ? null : api('GET', '/me?lang=uz')]);
  return [j, uz || j];
}
function applyMe(j, uz){
  SESS = j; AUTH = true; marker(true); STUDENT = j.student.fullName; STUDENT_FIRST = j.student.firstName;
  S.set(j.progress); applyLessons(j.lessons, uz && uz.lessons, j.lang); scheduleRecheck();
}

// each lesson has ONE fixed colour whatever its state (state = words + icons in the note, never colour); the setup folder (Tayyorgarlik) is Claude orange; yellow stays the progress ring and the pre-course hero. Emerald (lesson 06) is an identity colour, never a success colour; colours follow the card's position (cream is 07)
const LCOL = ['claude', 'slate', 'grey', 'blue', 'dark', 'orange', 'emerald', 'cream'];
const LN = () => Object.keys(LESSONS).map(Number).filter(n => n > 0).sort((a, b) => a - b);   // the lesson numbers 1..N come from the data (the API in the app)
const lnum = n => LESSONS[n].num;   // the curriculum number 1..N, or null: Tayyorgarlik and Kirish have none (their label is their short name)
const RN = () => LN().filter(n => lnum(n) != null);   // the numbered lessons: only these count in the ring, the course size and the all-done check
const lnT = n => lnum(n) == null ? ltitle(n) : t('lesson.n', {n: lnum(n)});   // "1-dars" / "Урок 1" / "Lesson 1" (no zero padding, user 2026-11-23), or "Kirish"
const lnH = n => esc(lnT(n));
const lessonLabel = n => lnum(n) == null ? esc(lessonDate(n))   // Kirish: its date only ("Qoʻshimcha" is the tag of the optional tracks, nothing else)
   : T('lesson.label', {n: lnum(n), date: lessonDate(n)});
const colCls = n => LCOL[n] === 'dark' ? 'c-night' : 'c-' + LCOL[n];   // an unlocked dark lesson keeps its dark identity, with normal (white) ink


// ---- text helpers (content = 2.0 Uzbek text, unless a translation was added on purpose; placeholders use ns.* UI keys)
// t() = plain text (textContent; esc() it before it goes into HTML or an attribute), T() = escaped HTML, cx() = content as plain text, cxh() = content as HTML with lang="uz-Latn" when it is still Uzbek inside a ru/en page.
// *H variants below return HTML; the plain ones are for search, aria, titles and the copy text.
const num2 = n => String(n).padStart(2, '0');
const lessonDate = n => LESSONS[n].d ? fmtDate(...LESSONS[n].d) : t('date.tba');
const stepsText = (d, tt) => t('steps', {d, t: tt, pl: tt});
const kindT = n => t('kind.' + LESSONS[n].kind);
const ltitle = n => t(`lesson.${n}.title`);

// ---- progress model: the units of a lesson are the parts it really has: slides (all seen), Amaliyot (one tick), Vazifa (one tick). Kit is a folder of files and is not counted
const slDone = n => S.sl(n) >= LESSONS[n].slides;
const prepTotal = () => PREP.items.length;   // the setup cards come from the content (4 until 2026-10-30, Warp removed by the user)
const prepCount = () => PREP.items.filter((_, i) => S.has('prep:' + i)).length;
const slHref = n => `#/dars/${n}/slayd/${S.sl(n) === 0 || slDone(n) ? 1 : S.sl(n)}`;
const partOpen = (n, p) => !partLock(n, p);
function units(n){
  const has = p => LESSONS[n].parts.includes(p) && partOpen(n, p), out = [];
  if (has('sl')) out.push({label: t('unit.sl'), kind: 'sl', done: slDone(n), href: slHref(n)});
  if (has('am')) out.push({label: t('unit.am'), done: S.has('f:am' + n), href: `#/dars/${n}?tab=am`});
  if (has('vz')) out.push({label: t('unit.vz'), done: S.has('f:v' + n), href: `#/dars/${n}?tab=vz`});
  return out;
}
const lProg = n => { const u = units(n); return [u.filter(x => x.done).length, u.length]; };
const lDone = n => { if (LESSONS[n].lock && Object.keys(LESSONS[n].lock).length) return false; const [d, tt] = lProg(n); return tt > 0 && d === tt; };   // a lesson with a part still locked is not finished
const allDone = () => RN().every(n => !isLocked(n) && (lDone(n) || lProg(n)[1] === 0)) && RN().some(n => lProg(n)[1] > 0);   // every lesson is open and finished; an open lesson with nothing to count (soon, or Kit only) does not hold it back
const ring = () => [RN().filter(n => !isLocked(n) && (lDone(n) || (allDone() && lProg(n)[1] === 0))).length, RN().length];   // always done/N; only when the course is all done do empty open lessons count as done, so "6/6" stands next to "all done"
// first unfinished item of a lesson, with a precise label and target ("Keyingi qadam"); `what` is the label without the lesson prefix
function nextOf(n){
  const u = units(n).find(x => !x.done); if (!u) return null;
  const what = esc(u.label) + (u.kind === 'sl' ? `: ${S.sl(n)} / ${LESSONS[n].slides}` : '');   // what / label are HTML; started = the target already has progress ("continue" vs "start")
  return {what, label: `${lnH(n)}, ${what}`, href: u.href, started: u.kind === 'sl' && S.sl(n) > 0};
}
const nextStep = () => { const live = liveLesson();
  if (courseStarted()) { const i = PREP.items.findIndex((_, j) => j > 0 && !S.has('prep:' + j)); if (i > 0) return {href: '#/dars/0', label: T('next.prep', {title: HT(T(`prep.${i}.title`))})}; }   // every setup card after the computer (Google, Visa, Claude) is what lesson 1 needs, however many there are (audit S3-1)
  return LN().filter(n => !isLocked(n) && n !== live).map(nextOf).find(Boolean) || null; }; // the live lesson is the hero card, so it is not repeated here
// live counters shown on the open page ("k/t"): one formatter for the templates and for refreshCounts()
function cntText(type){
  if (type === 'prep') return t('prep.cnt', {d: prepCount(), t: prepTotal(), pl: prepTotal()});
  return '';
}
const cnt = (type, id = '') => `<span data-cnt="${type}${id ? ':' + id : ''}">${esc(cntText(type, id))}</span>`;


// ---- small helpers
const I = (id, w = 16) => `<svg width="${w}" height="${w}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const NSTAG = () => '';   // no sample markers in the real app
const SRCHK = () => I('check', 12) + `<span class="sr-only">${T('common.sr_done')}</span>`;
const mark = s => s.split(/(`[^`]*`)/).map((part, i) => i % 2 ? `<code>${part.slice(1, -1)}</code>` : part.replace(/\[(?!\?\])([^\]]+)\]/g, '<span class="ph">[$1]</span>')).join('');   // [fill-in] marks, but never inside a `code span` (a literal value there is not a placeholder) and never [?] (Claude's "check this number" mark, the student keeps it)
const hasBracket = s => /\[(?!\?\])[^\]]+\]/.test(String(s).replace(/`[^`]*`/g, ''));
const back = (href, label) => `<a class="eyebrow" href="${href}">${I('back')}${label}</a>`;
// "Birinchi darsgacha" (materials before the course) lives in the header once the course has started (before it, it is the hero card on the home page): a yellow pill on desktop, a round icon button on phones
const prepBtn = active => courseStarted() ? `<a class="prep-btn" href="#/kursgacha" aria-label="${esc(t('prep.btn_aria'))}"${active === 'pre' ? ' aria-current="page"' : ''}><span class="pb-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2.5h8.5A1.5 1.5 0 0 1 21 9v8.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z"/></svg></span><span class="pb-t">${T('prep.btn')}</span></a>` : '';
const nav = active => `<header class="nav">
  <nav class="nav-links" aria-label="${esc(t('nav.label'))}"><a class="home-btn" href="#/dastur" aria-label="${esc(t('nav.homebtn'))}" title="${esc(t('nav.homebtn'))}"${active === 'home' ? ' aria-current="page"' : ''}>${I('home', 20)}</a></nav>
  <span class="wordmark">AI Praktikum 3.0</span>
  <div class="nav-r">${prepBtn(active)}<button class="nav-name" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="nmenu">${esc(STUDENT)}</button><button class="menu-btn" type="button" aria-label="${esc(t('menu.label'))}" aria-haspopup="dialog" aria-expanded="false" aria-controls="nmenu">${I('menu', 20)}</button></div>
</header>`;
const fsize = f => f.size || t('common.sample_file');
const fileMeta = (f, extra) => [extra ? `<span class="sent">${extra.html ?? esc(extra)}</span>` : '', f.size ? esc(f.size) : ''].filter(Boolean).join(' · ');
const fa = f => f.url ? `href="${esc(f.url)}" download="${esc(f.name)}"` : `href="#/fayl/${f.slug}"`;   // the prototype opens a file page, the app downloads from the API
const fileRow = (f, extra) => `<li><a class="ef-row" ${fa(f)}><span><span class="sr-only">${T('common.sr_download')}</span><span class="ef-nm">${wbr(f.name)}${f.ph ? NSTAG() : ''}</span>${fileMeta(f, extra) ? `<span class="ef-mt">${fileMeta(f, extra)}</span>` : ''}</span><span class="ef-dl">${I('down', 18)}</span></a></li>`;
const rowLink = (href, name, meta, markHTML) => `<li><a class="ef-row" href="${href}"><span><span class="ef-nm">${name}</span>${meta ? `<span class="ef-mt sent">${meta}</span>` : ''}</span><span class="xm">${markHTML || ''}${I('next')}</span></a></li>`;
const group = (h, body, hint, note, extra) => `<section class="grp"><h2 class="ef-h">${h}</h2>${note ? `<p class="ef-hint">${note}</p>` : ''}<ul>${body}</ul>${hint ? `<p class="ef-hint">${hint}</p>` : ''}${extra || ''}</section>`;
const extLink = (url, key) => `<a class="pc-lk" href="${url}" target="_blank" rel="noopener noreferrer">${T(key)}${I('ne', 18)}<span class="sr-only"> ${T('common.sr_external')}</span></a>`;   // an outside tool the exercise needs
const wbr = x => esc(x).replace(/_/g, '_<wbr>').replace(/\.(\w{2,4})$/, '<wbr>.$1');   // long file names break between words, not in the middle of one
const dlh = (href, label, meta) => `<div class="dl-h">${back(href, label)}${meta ? `<p class="dl-m">${meta}</p>` : ''}</div>`;
// "Bajarildi / Bajardim" toggles: one fixed accessible name, only aria-pressed changes; the visible text switches
const endb = (key, on, txtOn, txtOff, cls = '', aria = '') => `<button class="endb ${cls}" type="button" data-end="${key}" data-on="${esc(t(txtOn))}" data-off="${esc(t(txtOff))}"${aria ? ` aria-label="${esc(t(aria))}"` : ''} aria-pressed="${on}">${esc(t(on ? txtOn : txtOff))}</button>`;
const wrap = (inner, tail) => `<div class="ex-wrap">${inner}</div>${tail || ''}`;
const nw = h => String(h).replace(/<[^>]*>/g, '').length <= 24 ? ' class="nw"' : '';   // a short action label never wraps to two lines
const play = (href, html, ic = 'next', w = 20) => `<a class="play on-light" href="${href}"><span${nw(html)}>${html}</span><span class="play-circ">${I(ic, w)}</span></a>`;
const nextBlock = (href, key, params) => `<a class="play on-light" href="${href}"><span${nw(t(key, params))}>${T(key, params)}</span><span class="play-circ">${I('next', 20)}</span></a>`;

// ---------------- screens ----------------
function homePage(){
  const [rd, rt] = ring(), ns = nextStep(), live = liveLesson(), pre = !courseStarted(), k = prepCount(), open1 = RN().some(n => LESSONS[n].open);   // a review account has lessons open early: it keeps the pre-course hero text but gets the lesson cards
  const fxH = cls => `<span class="fx ${cls}" aria-hidden="true"><i></i><i></i><i></i></span>`;   // the back panel of the 3D folder: its tab and three paper sheets (they only move on hover, focus and press)
  const courseCard = () => `<li class="g-course fo"><button class="folder c-course" type="button" data-lock="course"><span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span><svg class="f-biglock" viewBox="0 0 64 64" aria-hidden="true"><path d="M21 29V20a11 11 0 0 1 22 0v9" fill="none" stroke="#000" stroke-width="6"/><rect x="12" y="27" width="40" height="31" rx="6" fill="#000"/><circle cx="32" cy="40" r="4" fill="#002EFF"/><rect x="30" y="41" width="4" height="9" rx="2" fill="#002EFF"/></svg><span class="f-top"></span>
        <span class="f-row"><span class="f-title">${T('course.title', {n: RN().length, pl: RN().length})}</span><span class="f-note">${I('lock', 14)}${T(LESSONS[1].d ? 'date.opens' : 'date.tba', {date: lessonDate(1)})}</span></span></button>${fxH('c-course')}</li>`;
  const flagH = n => LCOL[n] === 'cream' ? '<svg class="f-flag" aria-hidden="true"><use href="#i-flag"/></svg>'   // the finish flag of the last lesson: decorative, bottom right, in every state
    : lnum(n) === 1 ? '<svg class="f-flag f-start" viewBox="0 0 100 34" aria-hidden="true"><use href="#i-start"/></svg>' : '';   // its twin on lesson 01: two flags, no word between them (2.6: the English START is gone)
  const cardHTML = n => {
    const tab = `<span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span>`, arrow = `<svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg>`;
    const label = n === 0 ? (!courseStarted() && LESSONS[0].d ? T('date.until', {date: lessonDate(0)}) : '') : lessonLabel(n);   // before the course the date stands alone; after it the setup card has no label (the title already says what it is)
    let note, href = `#/dars/${n}`;
    if (n === 0) { const pt = prepTotal(); note = k === pt ? `${I('check', 14)}${T('note.prep_done')}` : T('note.prep_open', {d: k, t: pt, pl: pt}); }
    else if (isLocked(n)) {   // before its date: the lesson keeps its own colour, with a lock and the date (once, in the note)
      return `<li class="g-${LCOL[n]} fo"><button class="folder c-${LCOL[n]}" type="button" data-lock="${n}">${tab}<span class="f-top"><span class="f-label">${lnum(n) == null ? '' : lnH(n)}</span></span>
        <span class="f-row"><span><span class="f-title">${T(`lesson.${n}.card`)}</span><span class="f-sub">${T(`lesson.${n}.sub`)}</span></span><span class="f-note">${I('lock', 14)}${T(LESSONS[n].d ? 'date.opens' : 'date.tba', {date: lessonDate(n)})}</span></span>${flagH(n)}</button>${fxH('c-' + LCOL[n])}</li>`;
    } else {
      const [d, tt] = lProg(n);
      if (tt === 0) note = T('note.soon');   // an open lesson whose materials are not in yet
      else if (lDone(n)) note = `${I('check', 14)}${T('note.done')}`;
      else if (n === live) note = `<span class="dot" aria-hidden="true"></span><span>${T('note.live_a')}<span class="nw2">${T('note.live_b')}</span></span>`;
      else note = T('note.open', {d, t: tt, pl: tt});
    }
    return `<li class="g-${LCOL[n]} fo"><a class="folder ${colCls(n)}" href="${href}">${tab}<span class="f-top"><span class="f-label">${label}</span>${arrow}</span><span class="f-row"><span class="f-title">${T(`lesson.${n}.card`)}</span><span class="f-note">${note}</span></span>${flagH(n)}</a>${fxH(colCls(n))}</li>`;
  };
  const optCard = () => `<li class="g-yellow fo"><a class="folder c-yellow" href="#/kursgacha"><span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span><span class="f-top"><svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg></span><span class="f-row"><span class="f-title">${T('prep.title')}</span><span class="f-sub">${T('pre.sub')}</span></span></a>${fxH('c-yellow')}</li>`;
  let ringPrev = null; try { ringPrev = sessionStorage.getItem('aip3.ring'); sessionStorage.setItem('aip3.ring', rd); } catch (e) {}
  const ringUp = ringPrev !== null && rd > +ringPrev, ringFrom = ringUp ? +ringPrev / rt * 100 : 0;   // animate only a rise, from where it was
  const arrowH = `<svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg>`, tabH = `<span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span>`;
  const pill = (label, href) => `<a class="pill-cta next" href="${href}"><span>${label}</span><span class="pill-circ">${I('next', 20)}</span></a>`;   // Keyingi qadam: the outline pill
  let hero = '', cta = '', headCol = LCOL[0];
  if (pre) {   // before lesson 1: the prep card is the hero, and the one next step is the first open prep item
    const first = PREP.items.findIndex((_, i) => !S.has('prep:' + i));
    hero = `<div class="fo now-card"><a class="folder ${colCls(0)}" href="#/dars/0">${tabH}<span class="f-top"><span class="f-label">${LESSONS[0].d ? T('date.until', {date: lessonDate(0)}) : ''}</span>${arrowH}</span>
        <span><span class="f-title">${T('lesson.0.card')}</span><span class="f-note">${k === prepTotal() ? T('note.prep_done') : T('note.prep_open', {d: k, t: prepTotal(), pl: prepTotal()})}</span></span></a>${fxH(colCls(0))}</div>`;   // audit #6: the required setup comes first; the optional page is a plain yellow card in the grid
    if (first >= 0) cta = pill(`${T('next.k')}: ${T('next.prep', {title: HT(T(`prep.${first}.title`))})}`, '#/dars/0');
    else if (PREP.more) cta = pill(`${T('next.k')}: ${T('prep.more.title')}`, '#/kursgacha');
  } else if (live) {
    const [d, tt] = lProg(live), L = LESSONS[live], s = S.sl(live);
    const nxl = nextOf(live), slSub = !L.slides ? stepsText(d, tt) : s === 0 ? T('hero.sub_start', {n: L.slides}) : s >= L.slides ? T('hero.sub_seen', {n: L.slides}) : T('hero.sub', {i: s, n: L.slides}), sub = tt === 0 ? T('lesson.soon') : nxl && !/\/slayd\//.test(nxl.href) ? nxl.what : slSub, href = nxl ? nxl.href : `#/dars/${live}`;   // the hero opens today's next step ("continue" only when something was seen)
    headCol = LCOL[live];
    hero = `<div class="fo now-card"><a class="folder ${colCls(live)}" href="${href}">${tabH}<span class="f-top"><span class="f-label">${T('hero.k')}<br>${lessonLabel(live)}</span>${arrowH}</span>
        <span><span class="f-title">${T(`lesson.${live}.card`)}</span><span class="f-note">${sub}</span></span></a>${fxH(colCls(live))}</div>`;
  }
  if (!pre && !live && courseOver()) cta = `<p class="lede next course-end">${T('next.course_end')}</p>`;   // audit #11: the course is over: a closing line instead of a next step (no setup suggestion)
  else if (!pre && ns) cta = pill(`${T(live ? 'next.k_backlog' : 'next.k')}: ${ns.label}`, ns.href);
  else if (!pre && !live && allDone()) cta = pill(T('next.all_done'), `#/dars/${LN().filter(n => lProg(n)[1] > 0).at(-1)}`);   // the whole course is done: say so, and point at what is still open
  return {screen: 'dastur', tag: '#/dastur · ' + t('tag.home'), title: t('home.title'), html: nav('home') + `
    <div class="page-head main-head g-${headCol}${hero ? '' : ' nohero'}">
      <h1 class="sr-only">${T('home.title')}</h1>
      ${pre ? (LESSONS[1].d ? `<div class="prog prog-pre"><span class="pt"><span class="ps">${T('home.starts', {date: lessonDate(1)})}</span></span></div>` : '') : `      <div class="prog" role="progressbar" aria-label="${esc(t('home.ring.label'))}" aria-valuemin="0" aria-valuemax="${rt}" aria-valuenow="${rd}" aria-valuetext="${esc(t('home.ring.valuetext', {d: rd, t: rt, pl: rt}) + '')}">
        <span class="ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="rt" cx="50" cy="50" r="42"/>${rd ? `<circle class="rp${ringUp ? ' up' : ''}" cx="50" cy="50" r="42" pathLength="100" style="stroke-dasharray:${rd / rt * 100} 100;--from:${ringFrom}"/>` : ''}</svg><span class="pv">${rd}/${rt}</span></span>
        <span class="pt"><span class="ps">${T('home.ring.ps')}</span></span>
      </div>`}
      ${hero}${cta}
    </div>
    <h2 class="sr-only">${T('home.lessons')}</h2>
    <ul class="grid3 lessons${pre && !open1 ? ' pre' : ''}">${pre ? (open1 ? optCard() + LN().map(cardHTML).join('') : optCard() + courseCard()) : [0, ...LN()].map(cardHTML).join('')}</ul>`};
}

// ---- lesson 0: prep checklist
const PREP_CMD = (i, j) => (PREP_CMDS[i] || {})[j] || '';   // an install command shown under its step: a mono row with its own copy button (copying ticks nothing)
const cmdRow = (i, j) => { const c = PREP_CMD(i, j); return c ? `<div class="cmd"><code tabindex="0" aria-label="${esc(c)}">${esc(c)}</code><button class="cmd-cp" type="button" data-cmd="${esc(c)}" aria-label="${esc(t('prep.cmd_copy'))}">${I('copy', 20)}<span class="cpl">${T('common.copy')}</span></button></div>` : ''; };
document.addEventListener('click', async e => { const b = e.target.closest('.cmd-cp'); if (!b) return; flashToast((await copy(b.dataset.cmd)) ? (b.dataset.toast || 'toast.cmd_copied') : 'toast.copy_failed'); });
const deckCols = open => open < 0 ? `repeat(${prepTotal()},minmax(0,1fr))` : PREP.items.map((_, i) => i === open ? '2fr' : '1fr').join(' ');
function prepPage(){
  const done = PREP.items.map((_, i) => S.has('prep:' + i)), open = prepOpen ?? done.indexOf(false);
  prepFresh = prepOpen === null; prepOpen = open;   // a language switch re-renders: the open card stays and its picture does not replay
  const cards = PREP.items.map((it, i) => {
    const d = done[i], o = i === open, acts = it.actions || [];
    const ext = `<span class="sr-only"> ${T('common.sr_external')}</span>`;
    return `<li class="folder flatc c-claude pc${o ? ' open' : ''}${d ? ' done' : ''}" id="pc${i}" data-i="${i}" style="--vt:pc${i}"><button class="hd" type="button" id="ph${i}" aria-expanded="${o}" aria-controls="pb${i}" aria-labelledby="pt${i}" aria-describedby="pn${i}"><span class="f-title" id="pt${i}">${T(`prep.${i}.title`)}</span><span class="pic">${PREP_ART[i]}</span><span class="nt" id="pn${i}">${T(`prep.${i}.note`)}<span class="stp">${T('prep.steps_n', {n: it.steps, pl: it.steps})}<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span></span></button>
      <div class="bd" id="pb${i}" role="region" aria-labelledby="pt${i}"${o ? '' : ' hidden'}><ol class="steps">${Array.from({length: it.steps}, (_, j) => `<li>${T(`prep.${i}.s${j}`)}${cmdRow(i, j)}</li>`).join('')}</ol>
        ${acts.length ? `<div class="acts">${acts.map((a, j) => a.quiet
          ? `<a class="pc-lk" href="${esc(a.url)}" target="_blank" rel="noopener noreferrer">${T(`prep.${i}.a${j}`)}${I('ne', 18)}${ext}</a>`
          : `<a class="pill-ink" href="${esc(a.url)}" target="_blank" rel="noopener noreferrer"><span>${T(`prep.${i}.a${j}`)}${ext}</span><span class="pc-c">${I('ne', 26)}</span></a>`).join('')}</div>` : ''}
        ${it.foot ? `<p class="foot">${T(`prep.${i}.foot`)}</p>` : ''}</div>
      <div class="pf"><button class="chip${d ? '' : ' off'}" type="button" aria-pressed="${d}" aria-label="${esc(t('common.mark_done'))}" aria-describedby="pt${i}"><span class="cl">${T('common.done')}</span></button></div></li>`;
  }).join('');
  return {screen: 'ex', tag: '#/dars/0 · ' + t('tag.prep'), title: t('setup.title'), html: nav('prep') + wrap(`
      ${dlh('#/dastur', T('nav.home'))}
      <h1 class="headline ex-h">${T('setup.title')}</h1><p class="lmeta">${cnt('prep')}</p>${prepCount() === prepTotal() ? '' : `<p class="lede">${courseStarted() && prepTotal() - prepCount() <= 2 ? T('prep.left', {n: prepTotal() - prepCount(), pl: prepTotal() - prepCount(), titles: PREP.items.map((_, i) => S.has('prep:' + i) ? '' : t(`prep.${i}.title`)).filter(Boolean).join(', ')}) : T(courseStarted() ? 'prep.intro_late' : LESSONS[0].d ? 'prep.intro' : 'prep.intro_tba', {date: lessonDate(0)})}</p>`}
      <div class="ex-files"><section class="grp"><h2 class="ef-h sr-only">${T('prep.guide_name')}</h2><ul>${prepFileRow()}</ul></section></div>`,
    `<section class="prep" aria-label="${esc(t('prep.list.k'))}"><ol class="deck" id="deck" style="--cols:${deckCols(open)}">${cards}</ol></section>
      <div class="prep-end" id="prep-end"${prepCount() === prepTotal() ? '' : ' hidden'}><p class="pe-t">${T(courseStarted() ? 'prep.end_after' : LESSONS[1].d ? 'prep.end_before' : 'prep.end_tba', {date: lessonDate(1)})}</p><a class="play" href="#/dastur"><span>${T('prep.end_back')}</span><span class="play-circ">${I('next', 20)}</span></a></div>`)};
}
// "Birinchi darsgacha" as an accordion (user, 2026-10-30; a port of IconAccordion): one Poʻlat row per link or video; the open row lifts into its own pill and the rows next to it round the corners that meet it
let iaOpen = null;   // Birinchi darsgacha opens with every row closed (user, 2026-10-31); a language switch keeps the open one
// style C (user, 2026-10-30): the main thing on the right in a dashed card (a link's promo code as a coupon, a video's "Videoda" points); description and the video or the open pill on the left
const iaDesc = i => t(`prep.more.${i}.n`) ? `<p class="kg-d">${esc(t(`prep.more.${i}.n`))}</p>` : '';
const iaCard = (l, i) => l.code
  ? `<div class="ia-tk"><div class="ia-card"><span class="ia-k">${esc(t(`prep.more.${i}.cl`) || t('pre.code'))}</span><code class="ia-code">${esc(l.code)}</code><button class="cmd-cp ia-cpb" type="button" data-cmd="${esc(l.code)}" data-toast="toast.code_copied" aria-label="${esc(t('pre.code_copy'))}">${I('copy', 18)}${T('common.copy')}</button></div></div>`   // .ia-tk draws the ticket notches' edges (the card itself is masked)
  : l.points ? `<div class="ia-card"><span class="ia-k">${T('pre.in_video')}</span><ol class="ia-pts">${Array.from({length: l.points}, (_, j) => `<li>${esc(t(`prep.more.${i}.p${j}`))}</li>`).join('')}</ol></div>` : '';
// vanilla port of the pasted React VideoPlayer: same controls, idle hide, seek flash, hover time, keyboard; Uzbek labels; no native controls (so no Download menu)
const VP_I = {
  play: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  pause: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>',
  back: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/><text x="12" y="15.5" text-anchor="middle" font-size="7.5" fill="currentColor" stroke="none" font-family="sans-serif" font-weight="600">10</text></svg>',
  fwd: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 4v4h-4"/><text x="12" y="15.5" text-anchor="middle" font-size="7.5" fill="currentColor" stroke="none" font-family="sans-serif" font-weight="600">10</text></svg>',
  full: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  vol: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5v5h3.5L12 19V5L7.5 9.5z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
  mute: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5v5h3.5L12 19V5L7.5 9.5z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/></svg>',
};
const vpTime = s => { s = Math.max(0, Math.floor(s || 0)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
function vpMount(host){
  host.innerHTML = `<section class="vp" tabindex="0" aria-label="${esc(t('vp.player'))}" aria-keyshortcuts="Space K J L ArrowLeft ArrowRight M F">
    <video preload="metadata" playsinline controlslist="nodownload noplaybackrate" disablepictureinpicture disableremoteplayback poster="${esc(host.dataset.poster)}" src="${esc(host.dataset.src)}"></video><div class="vp-shade"></div>
    <div class="vp-top"><button class="vp-b vp-fs" type="button" aria-label="${esc(t('vp.full'))}">${VP_I.full}</button>
      <div class="vp-vol"><input class="vp-vr" type="range" min="0" max="1" step="0.01" value="0.7" aria-label="${esc(t('vp.vol'))}"><button class="vp-b vp-mute" type="button" aria-label="${esc(t('vp.mute'))}"><span class="vp-ic"><span class="i-on">${VP_I.vol}</span><span class="i-off off">${VP_I.mute}</span></span></button></div></div>
    <div class="vp-mid"><button class="vp-b vp-skip" type="button" data-d="-10" aria-label="${esc(t('vp.back'))}">${VP_I.back}</button><span class="vp-flash" aria-hidden="true"></span>
      <button class="vp-b vp-play" type="button" aria-label="${esc(t('vp.play'))}"><span class="vp-ic"><span class="i-p">${VP_I.play}</span><span class="i-z off">${VP_I.pause}</span></span><span class="ring"></span></button>
      <button class="vp-b vp-skip" type="button" data-d="10" aria-label="${esc(t('vp.fwd'))}">${VP_I.fwd}</button></div>
    <div class="vp-bot">${host.dataset.sub ? `<p class="vp-sub">${esc(host.dataset.sub)}</p>` : ''}${host.dataset.title ? `<h3 class="vp-t">${esc(host.dataset.title)}</h3>` : ''}
      <div class="vp-track"><span class="vp-tip" hidden></span><input class="vp-prog" type="range" min="0" max="0" step="0.1" value="0" aria-label="${esc(t('vp.pos'))}"></div>
      <div class="vp-times"><span class="vp-cur">0:00</span><span class="vp-dur">0:00</span></div></div></section>`;
  const $ = s => host.querySelector(s), box = $('.vp'), v = $('video'), prog = $('.vp-prog'), vr = $('.vp-vr'), tip = $('.vp-tip');
  let idleT = 0, vol = 0.7; v.volume = vol;
  box.addEventListener('contextmenu', e => e.preventDefault());   // no "Save video as..."
  const wake = () => { delete box.dataset.idle; clearTimeout(idleT); if (!v.paused) idleT = setTimeout(() => { box.dataset.idle = ''; }, 5000); };   // 5 s without a move or tap while playing: everything fades (user, 2026-10-31)
  const paint = () => { const d = v.duration || 0, t = v.currentTime || 0; prog.max = d; prog.value = t; prog.style.setProperty('--p', (d ? t / d * 100 : 0) + '%'); prog.setAttribute('aria-valuetext', `${vpTime(t)} / ${vpTime(d)}`); $('.vp-cur').textContent = vpTime(t); $('.vp-dur').textContent = vpTime(d); };
  const playing = () => { const on = !v.paused; $('.i-p').classList.toggle('off', on); $('.i-z').classList.toggle('off', !on); $('.vp-play').setAttribute('aria-label', on ? t('vp.pause') : t('vp.play')); const r = $('.ring'); r.classList.remove('go'); void r.offsetWidth; r.classList.add('go'); wake(); };
  const toggle = () => { v.paused ? v.play() : v.pause(); };
  const seekBy = s => { v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + s)); const f = $('.vp-flash'); f.textContent = s > 0 ? `+${s}s` : `${s}s`; f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); wake(); };
  const setVol = x => { vol = x; v.volume = x; v.muted = x === 0; vr.value = x; vr.style.setProperty('--p', x * 100 + '%'); $('.i-on').classList.toggle('off', x === 0); $('.i-off').classList.toggle('off', x !== 0); $('.vp-mute').setAttribute('aria-label', x === 0 ? t('vp.unmute') : t('vp.mute')); };
  let lastVol = 0.7;
  // while the box is fullscreen the page loses its height and the browser clamps the scroll to the top; put it back on exit (button, F or Esc)
  let fsY = null;
  const fullscreen = async () => { try {
    if (document.fullscreenElement === box) return void await document.exitFullscreen();
    fsY = scrollY;
    if (box.requestFullscreen) await box.requestFullscreen(); else v.webkitEnterFullscreen?.();   // iPhone Safari: only the video itself can go fullscreen
  } catch {} };
  box.addEventListener('fullscreenchange', () => { if (document.fullscreenElement || fsY == null) return; const y = fsY; fsY = null; requestAnimationFrame(() => requestAnimationFrame(() => scrollTo(0, y))); box.focus({preventScroll: true}); });
  v.addEventListener('timeupdate', paint); v.addEventListener('loadedmetadata', paint); v.addEventListener('play', playing); v.addEventListener('pause', playing);
  v.addEventListener('click', toggle);
  $('.vp-play').addEventListener('click', toggle);
  host.querySelectorAll('.vp-skip').forEach(b => b.addEventListener('click', () => seekBy(+b.dataset.d)));
  $('.vp-fs').addEventListener('click', fullscreen);
  $('.vp-mute').addEventListener('click', () => { if (vol > 0) { lastVol = vol; setVol(0); } else setVol(lastVol || 0.7); });
  vr.addEventListener('input', () => setVol(+vr.value));
  prog.addEventListener('input', () => { v.currentTime = +prog.value; paint(); });
  prog.addEventListener('pointermove', e => { const r = prog.getBoundingClientRect(), k = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)); tip.hidden = false; tip.style.left = k * r.width + 'px'; tip.textContent = vpTime(k * (v.duration || 0)); });
  prog.addEventListener('pointerleave', () => { tip.hidden = true; });
  box.dataset.fresh = '';   // before the first play only the play button shows over the poster
  v.addEventListener('play', () => { delete box.dataset.fresh; }, {once: true});
  box.addEventListener('focusin', e => { if (e.target !== box && !e.target.closest('.vp-play')) delete box.dataset.fresh; });   // a keyboard user tabbing to a control sees the controls
  box.addEventListener('pointermove', wake); box.addEventListener('focusin', wake);
  box.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target === vr) return;
    const k = e.key.toLowerCase(), act = {' ': toggle, k: toggle, arrowleft: () => seekBy(-10), j: () => seekBy(-10), arrowright: () => seekBy(10), l: () => seekBy(10), m: () => $('.vp-mute').click(), f: fullscreen}[k];
    if (!act || (e.target.tagName === 'BUTTON' && (k === ' ' || k === 'enter'))) return;
    e.preventDefault(); act(); wake();
  });
  setVol(vol); paint();
}
const iaBody = (l, i) => { const card = iaCard(l, i);
  const left = l.video ? `<div class="vp-host" data-src="${esc(l.video)}" data-poster="${esc(l.poster || '')}"></div>${iaDesc(i)}`
    : `${iaDesc(i)}<a class="pill-cta kg-open" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer"><span>${T('pre.open')}<span class="sr-only"> ${T('common.sr_external')}</span></span><span class="pill-circ">${I('ne', 20)}</span></a>`;
  return `<div class="ia-c${card ? ' has-card' : ''}${l.code ? ' has-code' : ''}"><div class="ia-l">${left}</div>${card}</div>`; };
const iaRow = (l, i) => `<li class="ia-row" data-i="${i}"><button class="ia-hd" type="button" id="ia-h${i}" aria-expanded="false" aria-controls="ia-p${i}"><span class="ia-ic" aria-hidden="true">${I(l.video ? 'play' : 'ne', 18)}</span><span class="ia-tt"><span class="ia-t">${esc(t(`prep.more.${i}.t`))}</span>${t(`prep.more.${i}.s`) ? `<span class="ia-s">${esc(t(`prep.more.${i}.s`))}</span>` : ''}</span><i class="ia-chv" aria-hidden="true"></i></button><div class="ia-p" id="ia-p${i}" role="region" aria-labelledby="ia-h${i}"><div class="ia-in"><div class="ia-body">${iaBody(l, i)}</div></div></div></li>`;
function iaPaint(ul){
  const rows = [...ul.children], last = rows.length - 1, a = iaOpen;
  rows.forEach((r, i) => { const open = a === i;
    r.classList.toggle('open', open);
    r.classList.toggle('rt', i === 0 || open || (a !== null && i === a + 1));
    r.classList.toggle('rb', i === last || open || (a !== null && i === a - 1));
    r.querySelector('.ia-hd').setAttribute('aria-expanded', open);
    r.querySelector('.ia-p').inert = !open;
    if (!open) r.querySelectorAll('video').forEach(v => v.pause()); });   // a closed row never keeps playing
}
document.addEventListener('click', e => { const h = e.target.closest('.ia-hd'); if (!h) return; const i = +h.parentNode.dataset.i; iaOpen = iaOpen === i ? null : i; iaPaint(h.closest('.ia')); });
// "Birinchi darsgacha": the materials before the course (links to learning platforms, videos); nothing yet = the "soon" line
function prePage(){
  const m = PREP.more;
  if (m && iaOpen >= m.links.length) iaOpen = null;
  return {screen: 'ex', tag: '#/kursgacha', title: t('prep.title'), html: nav('pre') + wrap(`
      ${dlh('#/dastur', T('nav.home'))}
      <h1 class="headline ex-h">${T('prep.title')}</h1><p class="lede">${T(courseStarted() ? 'pre.lede_late' : 'pre.sub')}</p>
      ${m ? `<div class="kg-wrap"><h2 class="sr-only">${T('prep.more.title')}</h2>${t('prep.more.note') ? `<p class="ef-hint">${T('prep.more.note')}</p>` : ''}<ul class="ia">${m.links.map(iaRow).join('')}</ul></div>` : `<p class="lede pre-soon">${T('lesson.soon')}</p>`}`)};
}
// the accordion: first unchecked card open, checking opens the next (focus follows), a live region says what happened; the pictures only move while on screen and while the tab is visible
let prepIO = null, prepOpen = null, prepFresh = true, liveTimer = 0;
function initPrep(root){
  const $ = (q, r = root) => r.querySelector(q), cards = [...root.querySelectorAll('.pc')], deck = $('#deck');
  const done = () => cards.map((_, i) => S.has('prep:' + i)), count = () => done().filter(Boolean).length;
  let open = cards.findIndex(c => c.classList.contains('open'));
  const nextFrom = i => { const d = done(); for (let k = 1; k <= cards.length; k++) { const j = (i + k) % cards.length; if (!d[j]) return j; } return -1; };
  const play = i => { const s = $('.ill', cards[i]); s.classList.remove('enter'); void s.getBoundingClientRect(); s.classList.add('enter'); };
  function paint(){
    const d = done();
    cards.forEach((c, i) => { const o = i === open, ch = $('.chip', c);
      c.classList.toggle('open', o); c.classList.toggle('done', d[i]);
      $('.hd', c).setAttribute('aria-expanded', o); $('.bd', c).hidden = !o;
      ch.setAttribute('aria-pressed', d[i]); ch.classList.toggle('off', !d[i]);
      if (!o) $('.ill', c).classList.remove('enter'); });
    deck.style.setProperty('--cols', deckCols(open)); $('#prep-end').hidden = count() < prepTotal(); refreshCounts();
  }
  // opening or ticking a card reflows the deck (the open card collapses, --cols changes): keep the card the student touched where it was on screen
  // near the page end a collapse makes the page shorter and the browser clamps the scroll, so add just that much space below (gone on the next route)
  const site = $('.site'), topOf = c => c.getBoundingClientRect().top, hold = (c, t0) => {
    site.style.paddingBottom = ''; scrollBy(0, topOf(c) - t0);
    const r = Math.round(topOf(c) - t0); if (r > 0) { site.style.paddingBottom = `calc(${getComputedStyle(site).paddingBottom} + ${r}px)`; scrollBy(0, r); } };
  const toggleOpen = i => { const t0 = topOf(cards[i]); open = open === i ? -1 : i; prepOpen = open; paint(); hold(cards[i], t0); if (open === i) play(i); };
  cards.forEach((c, i) => {
    $('.hd', c).addEventListener('click', () => toggleOpen(i));
    c.addEventListener('click', e => { if (!e.target.closest('button,a') && !c.classList.contains('open')) toggleOpen(i); });   // the empty area of a closed card acts as its header button
    $('.chip', c).addEventListener('click', () => {
      if (!c.classList.contains('open')) { toggleOpen(i); $('.hd', c).focus(); return; }   // on a closed card the first tap only opens it: the steps come before the tick, and a done card is never unticked by a stray tap
      const was = S.has('prep:' + i), prev = open; S.tick('prep:' + i, !was);
      if (!was) { c.classList.add('just'); setTimeout(() => c.classList.remove('just'), 600); open = (open >= 0 && open !== i && !S.has('prep:' + open)) ? open : nextFrom(i); }
      else open = i;
      prepOpen = open;
      const t0 = topOf(c), after = () => { paint(); hold(c, t0); if (open >= 0 && open !== prev) { play(open); $('.hd', cards[open]).focus(); } };
      if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(after); else after();   // the cards slide to their new places
      live.textContent = ''; clearTimeout(liveTimer); liveTimer = setTimeout(() => live.textContent = t(was ? 'live.prep_undone' : 'live.prep_done', {title: t(`prep.${i}.title`), d: count(), t: prepTotal(), pl: prepTotal()}), 30);
    });
  });
  if (prepIO) prepIO.disconnect();
  prepIO = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('on-screen', e.isIntersecting)), {threshold: .2});
  root.querySelectorAll('.ill').forEach(s => prepIO.observe(s));
  if (open >= 0 && prepFresh) play(open);
}
document.addEventListener('visibilitychange', () => document.documentElement.classList.toggle('hid', document.hidden));

// ---- lessons 1-7: the gooey folder with only the parts the lesson really has (Slaydlar / Amaliyot / Kit / Vazifa)
const partWhen = iso => /^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(iso || '') ? {date: fmtDate(+iso.slice(8, 10), +iso.slice(5, 7)), time: iso.slice(11, 16)} : {date: '…', time: '…'};   // iso with the Tashkent offset: its own date and clock time
const lockedPane = iso => `<p class="p-label">${T('part.locked')}</p><div><p class="p-sub">${T('part.opens', partWhen(iso))}</p></div>`;
const tabOfHref = h => { const m = /[?&]tab=(sl|am|kt|vz)\b/.exec(h || ''); return m ? m[1] : /\/slayd\//.test(h || '') ? 'sl' : null; };
// a group note "ASOSIY. lead 1) a 2) b Tayyor, agar: c" -> {tag, lead, steps, ready}: display only, the stored text never changes
function noteParts(s){
  let n = String(s || '').trim(), tag = '', ready = '';
  const tm = /^([A-Z0-9ʻʼ' ]{3,30})\.\s+/.exec(n); if (tm) { tag = tm[1]; n = n.slice(tm[0].length); }
  const ri = n.search(/\s*Tayyor, agar:\s*/); if (ri >= 0) { ready = n.slice(ri).replace(/^\s*Tayyor, agar:\s*/, '').trim(); n = n.slice(0, ri); }
  const ps = n.split(/\s*(?=\b\d\)\s)/), lead = /^\d\)\s/.test(ps[0]) ? '' : ps.shift();
  return {tag, lead: (lead || '').trim(), steps: ps.map(x => x.replace(/^\d\)\s*/, '').trim()).filter(Boolean), ready};
}
// audit #3: "03B BILAN BIRIDAN BIRI" -> "03B bilan biridan biri", "QOʻSHIMCHA" -> "Qoʻshimcha" (display only)
const tagText = s => s.split(' ').map((w, i) => /^\d/.test(w) ? w : i ? w.toLowerCase() : w[0] + w.slice(1).toLowerCase()).join(' ');
const groupTitle = s => { const m = /^(\d+[A-Z]?)\.?\s+(.+)$/.exec(s); return m ? m[2] : s; };   // "03A Title" -> "Title": the title without its number (numbers are not shown anywhere)
// ---- Sections as cards (user, 2026-11-20 / 21): every Amaliyot, Kit and Vazifa pane shows one card per group (sections are sequential: card order = doing order) with the chosen
// section docked beside the cards (a full screen of its own on phones). A pane with one group is only its panel. The Kirish Amaliyot is the same, with the tracks as cards (Trk).
// Trk trigger: at least two groups carry a "NN[a-z]-...-yoriqnoma" file (only lesson 2, Kirish, does); the area name comes from that slug prefix.
// The chosen section is in the URL (?tab=kt&s=s2) and the last one opened is remembered per pane (an id only, never a student id).
const D3_AREA = {'01': 'hr', '02': 'savdo', '03a': 'servis', '03b': 'ombor', '04': 'marketing', '05': 'xarid', '06': 'rahbar'};
const d3Id = g => { const f = g.files.find(x => /-yoriqnoma$/.test(x.slug)), m = f && /^(\d+[a-z]?)-/.exec(f.slug); return (m && D3_AREA[m[1]]) || ''; };
const isD3 = (p, groups) => p === 'am' && groups.filter(g => d3Id(g)).length >= 2;
const D3_PREFIX = 'aip3.d3';   // browser storage: "aip3.d3.<lesson>.<tab>" = a section id. Logout and a 401 remove them (d3Forget)
const d3Key = (n, tab) => `${D3_PREFIX}.${n}.${tab}`;
const d3Last = (n, tab) => { try { return localStorage.getItem(d3Key(n, tab)); } catch { return null; } };
const d3Save = (n, tab, id) => { try { localStorage.setItem(d3Key(n, tab), id); } catch {} };
function d3Forget(){ try { Object.keys(localStorage).filter(k => k.startsWith(D3_PREFIX)).forEach(k => localStorage.removeItem(k)); } catch {} }
const d3Tag = note => {   // the note's tag as a short card tag: ASOSIY / 03B BILAN BIRIDAN BIRI / QOʻSHIMCHA / NAMOYISH YOKI UYGA VAZIFA
  const tg = noteParts(note).tag, or = /^(\d+[A-Z]) BILAN BIRIDAN BIRI/.exec(tg);
  return /^ASOSIY/.test(tg) ? t('d3.tag.main') : or ? t('d3.tag.or', {area: t('d3.area.' + D3_AREA[or[1].toLowerCase()])}) : /^QO.SHIMCHA/.test(tg) ? t('d3.tag.extra') : /^NAMOYISH/.test(tg) ? t('d3.tag.demo') : tg ? tagText(tg) : '';
};
// the footer of a card: the tag and the prompt count, or the yellow progress ("2/4"), or "Bajarildi 4/4"; d3Paint() redraws it after every copy. tt = 0: no prompts, so no bar: only a quiet label (alt = "qadamlar" for numbered steps, "n fayl" for files, nothing for plain text)
const d3Foot = (tag, d, tt, alt) => !tt ? (alt ? `<span class="ct">${alt}</span>` : '')
  : d >= tt ? `<span class="ok">${I('check', 14)}<span class="sr-only">${T('common.done')} </span></span><span class="bar"><b style="width:100%"></b></span><span class="ct">${d}/${tt}</span>`
  : d ? `${tag ? `<span class="tg">${esc(tag)}</span>` : ''}<span class="bar"><b style="width:${Math.round(d / tt * 100)}%"></b></span><span class="ct">${d}/${tt}</span>`
  : `${tag ? `<span class="tg">${esc(tag)}</span>` : ''}<span class="bar"></span><span class="ct">${T('d3.n_prompts', {n: tt, pl: tt})}</span>`;
function d3Paint(){
  document.querySelectorAll('.d3 .k[data-tt]').forEach(c => { const p = document.getElementById(c.getAttribute('aria-controls')), d = p ? p.querySelectorAll('.d3r li.done').length : 0; c.querySelector('.pr').innerHTML = d3Foot(c.dataset.tag, d, +c.dataset.tt); });
}
// prompt rows: the whole row is the toggle (P-number, title, chevron); open = "Qayerga" chip, the text in a code block, and a white "Nusxalash" button under it.
// The li / .no / .tt / <details> / .tx[data-raw] / .cp hooks are the old ones, so copy = done, the toast with undo and the live messages are the old code; the button only shows while its row is open (CSS)
const D3_CHAT = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 3.5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H7l-3 3v-3h-.5a1 1 0 0 1-1-1z"/></svg>';   // the "this is a prompt" mark of the P badge
const d3Rows = (n, gk, g) => `<ol class="s1 d3r">${g.prompts.map((q, j) => { const k = `${gk}.p${j}`, key = `p:l${n}:${q.kid}`, title = cu(`${k}.t`);
  return `<li class="${S.has(key) ? 'done' : ''}" data-i="${j}" data-pid="${q.kid}" data-key="${key}" data-t="${esc(title)}"><details class="pchip"><summary><span class="no">${D3_CHAT}${/^[A-Z]\d{1,2}$/.test(q.id) ? q.id : 'P' + (j + 1)}</span><span class="tt">${cuh(`${k}.t`)}</span><span class="d3-oc" aria-hidden="true"><span class="o">${T('d3.open')}</span><span class="c">${T('d3.close')}</span></span><span class="d3-dn sr-only"> · ${T('common.copied')}</span></summary>${q.target ? `<p class="to"><b>${T('lbl.where')}</b> ${cuh(`${k}.w`)}</p>` : ''}<p class="tx" data-raw="${esc(cu(`${k}.x`))}">${cxh(`${k}.x`, I18N.uz[`${k}.x`], x => mark(esc(x)))}</p></details><button class="cp" type="button" aria-label="${esc(t('common.copy_aria', {title}))}"><span class="cp-c">${I('copy', 18)}</span><span class="cpl">${T('common.copy')}</span></button></li>`; }).join('')}</ol>`;
const d3Step = (i, h, hint) => `<p class="d3-st"><i aria-hidden="true">${i}</i><span>${h}${hint ? `<small>${hint}</small>` : ''}</span></p>`;
const d3Dl = f => `<span class="sr-only">${T('common.sr_download')}</span>${I('down', 20)}<span class="d3-nm">${wbr(f.label || f.name)}</span><span class="m">${esc(f.size || '')}</span>`;
const d3Files = fs => `<ul class="d3-fl">${fs.map(f => `<li><a class="d3-fr" ${fa(f)}>${d3Dl(f)}</a></li>`).join('')}</ul>${fs.some(f => /\.md$/i.test(f.name || '')) ? `<p class="f-hint">${T('files.md_hint')}</p>` : ''}`;
function d3Pane(n, p, key, b, intro, text, end){
  const q = parseHash().q, tq = q.get('tab') === p ? q.get('s') : null, pq = q.get('p'), trk = isD3(p, b.groups);
  const tracks = b.groups.map((g, i) => ({g, i, id: d3Id(g)})).filter(x => x.id), com = b.groups.map((g, i) => ({g, i, id: 'all' + (i || '')})).filter(x => !x.g.prompts.length && !d3Id(x.g) && x.g.files.length);
  const list = trk ? [...tracks, ...com] : b.groups.map((g, i) => ({g, i, id: 's' + (i + 1)})), ids = list.map(x => x.id), solo = list.length === 1;
  let sel = ids.includes(tq) ? tq : (list.find(x => x.g.prompts.some(y => y.kid === pq)) || {}).id; const view = sel ? 'track' : 'grid';   // ?p= (a deep link to a prompt) also opens its section
  if (!sel) { const l = d3Last(n, p); sel = ids.includes(l) ? l : ids[0]; }
  const kt = LESSONS[n].parts.includes('kt') && !partLock(n, 'kt'), lk = h => kt ? h.replace(/Kit boʻlimi(da|dan|dagi)/g, w => `<a class="kt-link" href="#/dars/${n}?tab=kt">${w}</a>`) : h;   // UX audit S6-7: the words "Kit boʻlimida" link to the Kit tab
  const lg = x => cxFb(`${key}.g${x.i}`) || cxFb(`${key}.g${x.i}.n`) ? ' lang="uz-Latn"' : '', ttl = x => groupTitle(cu(`${key}.g${x.i}`)), isT = x => trk && !!d3Id(x.g), pid = (x, a) => `${a}-${p}-${x.id}`;
  const parts = x => noteParts(x.g.note ? cu(`${key}.g${x.i}.n`) : '');
  const cards = solo ? '' : list.map(x => { const tr = isT(x), tag = tr ? d3Tag(cu(`${key}.g${x.i}.n`)) : '', np = parts(x), pc = x.g.prompts.length, d = x.g.prompts.filter(y => S.has(`p:l${n}:${y.kid}`)).length;
    const alt = np.steps.length ? t('d3.steps') : x.g.files.length ? t('d3.n_files', {n: x.g.files.length, pl: x.g.files.length}) : '', area = tr ? t('d3.area.' + x.id) : trk ? t('d3.all') : '';
    const name = tr ? `<span class="ar${area.length > 9 ? ' long' : ''}">${esc(area)}</span><span class="tt"${lg(x)}>${esc(ttl(x))}</span>` : trk ? `<span class="ar${area.length > 9 ? ' long' : ''}">${esc(area)}</span><span class="tt"${lg(x)}>${esc(x.g.files.map(f => f.label || f.name).join(', '))}</span>` : `<span class="ar"${lg(x)}>${esc(ttl(x))}</span>`;
    return `<button class="k${trk && !tr ? ' ghost' : ''}" type="button" data-go="${x.id}" aria-pressed="${x.id === sel}" aria-controls="${pid(x, 'd3p')}"${pc ? ` data-tt="${pc}" data-tag="${esc(tag)}"` : ''}>${name}<span class="pr">${trk && !tr ? T('d3.n_files', {n: x.g.files.length, pl: x.g.files.length}) : d3Foot(tag, d, pc, esc(alt))}</span></button>`; }).join('');
  const nextTitle = x => isT(x) ? t('d3.area.' + x.id) : trk ? t('d3.all') : ttl(x);
  const panel = (x, ix) => { const tr = isT(x), gk = `${key}.g${x.i}`, np = parts(x), nx = list[ix + 1];
    const yo = x.g.files.find(f => /-yoriqnoma$/.test(f.slug)), pdf = x.g.files.find(f => /-promptlar-pdf$/.test(f.slug)), src = x.g.files.filter(f => f !== yo && f !== pdf); let s = 0;
    const lead = np.lead ? `<p class="d3-desc">${lk(esc(np.lead))}</p>` : '';
    const body = tr ? `<div class="d3-two">${yo ? `<div>${d3Step(++s, T('d3.s1'), T('d3.s1h'))}<a class="d3-pri" ${fa(yo)}>${d3Dl(yo)}</a></div>` : ''}${src.length ? `<div>${d3Step(++s, T('d3.s2'), T('d3.s2h', {n: src.length, pl: src.length}))}${d3Files(src)}</div>` : ''}</div>`
        + (x.g.prompts.length ? `<div class="d3-pr">${d3Step(++s, T('d3.s3'), T('d3.s3h'))}${d3Rows(n, gk, x.g)}</div>` : '') + (pdf ? `<a class="d3-pdf" ${fa(pdf)}><span class="sr-only">${T('common.sr_download')}</span>${T('d3.pdf')}</a>` : '')
      : trk ? d3Files(x.g.files)
      : `${np.steps.length ? `<ol class="d3-steps">${np.steps.map(y => `<li>${lk(esc(y))}</li>`).join('')}</ol>` : ''}${np.ready ? `<p class="d3-ready"><b>Tayyor, agar</b> ${esc(np.ready)}</p>` : ''}${(x.g.ref || []).map(r => refLink(n, r)).join('')}${x.g.files.length ? `<div class="d3-fs">${d3Files(x.g.files)}</div>` : ''}${x.g.prompts.length ? `<div class="d3-pr"><p class="d3-lh">${T('d3.prompts')}${x.g.prompts.length > 1 ? ` (${x.g.prompts.length})` : ''}</p>${d3Rows(n, gk, x.g)}</div>` : ''}`;
    return `<section class="d3-p" id="${pid(x, 'd3p')}" data-t="${x.id}" aria-labelledby="${pid(x, 'd3h')}"${x.id === sel ? '' : ' hidden'}${lg(x)}>${solo ? '' : `<button class="d3-back" type="button">${I('back', 18)}${T(trk ? 'd3.back' : 'd3.back_s')}</button>`}<h3 class="d3-t" id="${pid(x, 'd3h')}" tabindex="-1">${esc(ttl(x))}</h3>${lead}${body}${nx ? `<button class="play on-light d3-next" type="button" data-go="${nx.id}"><span>${T(trk ? 'd3.next' : 'd3.next_s')}: ${esc(nextTitle(nx))}</span><span class="play-circ">${I('next', 20)}</span></button>` : ''}</section>`; };
  return `<div class="d3${trk ? ' trk' : ''}${solo ? ' solo' : ''}" data-n="${n}" data-tab="${p}" data-sel="${sel}" data-view="${view}"><div class="d3-l">${intro}${text ? `<div class="pane-text"${cxFb(`${key}.text`) ? ' lang="uz-Latn"' : ''}>${text}</div>` : ''}${cards ? `<div class="d3-cards" role="group" aria-label="${esc(t(trk ? 'd3.group_aria' : 'd3.group_aria_s'))}">${cards}</div>` : ''}</div><div class="d3-dock">${list.map(panel).join('')}</div></div>${end ? `<div class="gt-foot end">${end}</div>` : ''}`;
}
function d3Apply(root, id, view){
  if ((id !== root.dataset.sel || view !== root.dataset.view) && typeof hideToast === 'function') hideToast();   // the undo toast sits inside a row of a panel that is being hidden
  root.dataset.sel = id; root.dataset.view = view;
  root.querySelectorAll('.k[data-go]').forEach(b => b.setAttribute('aria-pressed', b.dataset.go === id));
  root.querySelectorAll('.d3-p').forEach(x => { x.hidden = x.dataset.t !== id; });
}
// the URL carries the section (?tab=kt&s=s2). Phones: a tap on a card PUSHES it (the system Back returns to the grid); wide screens only REPLACE it (nothing to go back to).
// Every change is local (no re-render: the toast, scroll and focus stay sensible): our own taps call d3Show(), and Back / Forward come through d3Pop() from the popstate / hashchange listener (never from render(): a 401 or a language switch must rebuild the page).
const d3Url = (n, tab, id) => `#/dars/${n}?tab=${tab}${id ? '&s=' + id : ''}`;
const d3Move = (r, push, tab) => { const app = typeof urlOf === 'function', u = app ? urlOf(r) : r; push ? history.pushState({...(app ? {aip: 1} : {}), d3: tab}, '', u) : history.replaceState(history.state, '', u); };
const d3Narrow = root => root.closest('.frame').clientWidth < 900;
function d3Show(root, id, view){
  d3Apply(root, id, view);
  if (!d3Narrow(root)) return;
  scrollTo(0, Math.max(0, root.closest('.gt').getBoundingClientRect().top + scrollY - 12));
  (view === 'track' ? root.querySelector(`#d3h-${root.dataset.tab}-${id}`) : root.querySelector(`.k[data-go="${id}"]`)).focus({preventScroll: true});   // the section's heading, or the card that was open
}
function d3Pop(){   // Back / Forward within the same lesson and tab, only ?s= changed: true = handled locally (the page is not rebuilt)
  const r = parseHash(), tab = r.q.get('tab'), root = /^(am|kt|vz)$/.test(tab) && document.querySelector(`#s-app .d3[data-tab="${tab}"]`);
  if (!root || r.q.get('p') || r.parts.join('/') !== `dars/${root.dataset.n}` || root.closest('.gt-pane').inert) return false;   // not on this pane (another folder tab is open): rebuild
  const id = r.q.get('s'), ids = [...root.querySelectorAll('.k[data-go]')].map(b => b.dataset.go);
  if (id && !ids.includes(id)) return false;
  d3Show(root, id || root.dataset.sel, id ? 'track' : 'grid'); return true;
}
document.addEventListener('click', e => {
  const root = e.target.closest('.d3'); if (!root) return;
  const go = e.target.closest('[data-go]'), bk = e.target.closest('.d3-back'), n = root.dataset.n, tab = root.dataset.tab;
  if (go) {
    const push = d3Narrow(root) && root.dataset.view === 'grid';
    if (push) d3Move(d3Url(n, tab), false, tab);   // the entry Back lands on must carry ?tab= (a tab opened by a script, not a tap, is not in the URL yet)
    d3Move(d3Url(n, tab, go.dataset.go), push, tab);
    d3Save(n, tab, go.dataset.go);
    d3Show(root, go.dataset.go, 'track');
  } else if (bk) {
    if (history.state && history.state.d3 === tab) return void history.back();   // pushed by a tap on a card of THIS pane: the same as the system Back (d3Pop)
    d3Move(d3Url(n, tab), false, tab); d3Show(root, root.dataset.sel, 'grid');
  }
});
// the folder tab is in the URL (UX audit M5): a tap PUSHES ?tab= (Back returns to the tab before), the arrow keys only REPLACE it; the page's own clicks (opening ?tab=, a language switch) change nothing
document.addEventListener('gt-show', e => {
  const dg = e.target, n = dg.dataset.n, p = dg.querySelectorAll('.gt-tab')[e.detail.i]?.dataset.p; if (!e.detail.user || !n || !p || !dg.closest('#s-app')) return;
  const r = `#/dars/${n}?tab=${p}`; if (parseHash().q.get('tab') === p && !parseHash().q.get('s') && !parseHash().q.get('p')) return;
  d3Move(r, !e.detail.key);
});
function gtPop(){   // Back / Forward between two tabs of the lesson on screen: switch the tab in place (no rebuild, no jump to the top). A section or prompt in the URL still rebuilds
  const dg = document.querySelector('#s-app #dg'), r = parseHash(); if (!dg || r.parts.join('/') !== `dars/${dg.dataset.n}` || r.q.get('s') || r.q.get('p')) return false;
  const i = [...dg.querySelectorAll('.gt-tab')].findIndex(b => b.dataset.p === (r.q.get('tab') || dg.dataset.def));
  if (i < 0 || !dg._show) return false;
  dg._show(i); return true;
}
// phones: the lesson's summary and "Darsdan keyin siz" fold under "Dars haqida", so the first task is on the first screen (UX audit C1)
document.addEventListener('click', e => { const b = e.target.closest('.lhr-t'); if (!b) return; const on = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', on); b.closest('.lhd').classList.toggle('lhr-on', on); });
// ---- Kit and Vazifa (user, 2026-11-26, glass): a header (a picture, the Kit chain or the deadline, one plain sentence, the guide PDF), then the steps:
// a list beside one big panel with «Keyingi qadam» (phones: the panel opens under its step). Every step has a drawn picture (content field icon), its title and "Darsda, telefonda".
// The optional content fields (kits, head, due, tags, icon, kind, ref, guide) are in API.md.
const PG = {   // the step pictures: 48 grid, one 2px stroke (CSS); a step names one with its content field icon
  people: '<circle cx="17" cy="16" r="6"/><path d="M6 39c0-6.6 4.9-11 11-11s11 4.4 11 11"/><circle cx="34" cy="19" r="4.5"/><path d="M30 29.5c1.2-.6 2.6-1 4-1 4.6 0 8 3.6 8 9"/><path d="M38 6.5h6v5h-3l-2 2v-2h-1z"/>',
  wave: '<path d="M6 20v8M10.5 14v20M15 18v12M19.5 22v4"/><path d="M23 24h6m-3-3 3 3-3 3"/><path d="M33 15h9M33 21h9M33 27h9M33 33h6"/>',
  table: '<rect x="6" y="9" width="36" height="30" rx="3"/><path d="M6 18h36M6 28.5h36M18 9v30"/>',
  house: '<path d="M8 22 24 9l16 13v17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2z"/><path d="M20 41V30h8v11"/>',
  mega: '<path d="M8 20v8h6l14 8V12l-14 8z"/><path d="M14 28l2 10h5l-2-9"/><path d="M34 19c2 2 2 8 0 10M38 15c4 4 4 14 0 18"/>',
  check: '<circle cx="18" cy="16" r="7"/><path d="M6 40c0-7 5.3-12 12-12 2.8 0 5.3.8 7.3 2.3"/><path d="m29 37 4.5 4.5L43 31"/>',
  files: '<path d="M16 6h15l9 9v23a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M31 6v9h9M19 24h14M19 30h10"/><path d="M9 13v27a2 2 0 0 0 2 2h22"/>',
  term: '<rect x="5" y="9" width="38" height="30" rx="3"/><path d="m12 19 6 5-6 5M22 30h11"/>',
  cal: '<rect x="7" y="10" width="34" height="30" rx="3"/><path d="M7 19h34M16 6v8M32 6v8M14 27h5M22 27h5M30 27h5M14 33h5M22 33h5"/>',
  doc: '<path d="M13 6h16l9 9v25a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M29 6v9h9M16 25h16M16 31h11"/>',
  kit: '<rect x="6" y="16" width="36" height="24" rx="3"/><path d="M17 16v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M6 26h36M21 26v4h6v-4"/>',
  board: '<rect x="6" y="7" width="36" height="24" rx="2"/><path d="M24 31v6M16 43l8-6 8 6M13 15h14M13 21h9"/>',
  upload: '<path d="M24 31V9m-8 8 8-8 8 8"/><path d="M8 28v10a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V28"/>',
  book: '<path d="M24 12c-4-3-10-4-17-3v28c7-1 13 0 17 3 4-3 10-4 17-3V9c-7-1-13 0-17 3z"/><path d="M24 12v28"/>',
  chat: '<path d="M8 9h32a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H22l-9 7v-7H8a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2z"/><path d="M14 18h20M14 24h13"/>',
  search: '<circle cx="21" cy="21" r="12"/><path d="m30 30 11 11"/>',
  list: '<path d="M21 12h19M21 24h19M21 36h19"/><path d="m7 12 3 3 5-6M7 24l3 3 5-6M7 36l3 3 5-6"/>',
  star: '<path d="m24 6 5.5 11.5 12.5 1.7-9 8.8 2.2 12.5L24 34.6 12.8 40.5 15 28l-9-8.8 12.5-1.7z"/>',
  matrix: '<path d="M8 6v34h34"/><path d="M8 23h34M25 6v34" stroke-dasharray="3 4"/><circle cx="34" cy="14" r="3"/><circle cx="17" cy="31" r="2.5"/><circle cx="35" cy="32" r="2.5"/>',
  target: '<circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="10"/><circle cx="24" cy="24" r="3"/>',
  chart: '<path d="M6 41h36"/><rect x="10" y="24" width="6" height="17" rx="1"/><rect x="21" y="14" width="6" height="27" rx="1"/><rect x="32" y="7" width="6" height="34" rx="1"/>',
  agree: '<path d="M6 8h22a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H15l-6 5v-5H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z"/><path d="M34 18h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3v5l-6-5H22a2 2 0 0 1-2-2v-3"/><path d="m11 16 3 3 7-6"/>',
  send: '<path d="M42 6 6 21l13 5 5 15z"/><path d="M19 26 42 6"/>',
  key: '<circle cx="15" cy="31" r="9"/><path d="m21.5 24.5 17-17M32 14l5 5M27 19l4 4"/>',
  plug: '<path d="M17 6v9M31 6v9"/><path d="M11 15h26v7a13 13 0 0 1-26 0z"/><path d="M24 35v8"/>',
  route: '<circle cx="11" cy="37" r="4"/><circle cx="37" cy="11" r="4"/><path d="M15 37h14a6 6 0 0 0 0-12H19a6 6 0 0 1 0-12h14"/>',
  bot: '<rect x="9" y="15" width="30" height="24" rx="6"/><path d="M24 15V9"/><circle cx="24" cy="7" r="2"/><circle cx="18" cy="27" r="2.5"/><circle cx="30" cy="27" r="2.5"/><path d="M5 25v6M43 25v6"/>',
  server: '<rect x="8" y="7" width="32" height="14" rx="3"/><rect x="8" y="27" width="32" height="14" rx="3"/><path d="M14 14h2M14 34h2M24 14h10M24 34h10"/>',
  compare: '<rect x="5" y="9" width="17" height="30" rx="3"/><rect x="26" y="9" width="17" height="30" rx="3"/><path d="m9 24 3 3 6-6M31 21l7 7m0-7-7 7"/>',
  flag: '<path d="M10 43V6"/><path d="M10 8h26l-5 8 5 8H10"/>',
  shield: '<path d="M24 5 8 11v11c0 10 7 17 16 21 9-4 16-11 16-21V11z"/><path d="m17 24 5 5 9-9"/>',
  warn: '<path d="M24 6 4 41h40z"/><path d="M24 19v10M24 35v.5"/>',
  scale: '<path d="M24 6v36M14 42h20M9 12h30"/><path d="M9 12 3 26a6 6 0 0 0 12 0zM39 12l-6 14a6 6 0 0 0 12 0z"/>',
  coins: '<ellipse cx="24" cy="14" rx="15" ry="6"/><path d="M9 14v10c0 3.3 6.7 6 15 6s15-2.7 15-6V14M9 24v10c0 3.3 6.7 6 15 6s15-2.7 15-6V24"/>',
  receipt: '<path d="M10 5h28v38l-5-3-5 3-4-3-4 3-5-3-5 3z"/><path d="M16 15h16M16 22h16M16 29h9"/>',
  growth: '<path d="M6 41h36"/><path d="m8 33 10-10 7 6 15-16"/><path d="M31 13h9v9"/>',
  loop: '<path d="M38 18A15 15 0 0 0 10 16"/><path d="M10 7v9h9"/><path d="M10 30a15 15 0 0 0 28 2"/><path d="M38 41v-9h-9"/>',
  grad: '<path d="M4 18 24 9l20 9-20 9z"/><path d="M12 22v10c0 3 5 6 12 6s12-3 12-6V22"/><path d="M44 18v12"/>',
};
const pg = (k, cls) => `<span class="${cls}" aria-hidden="true"><svg viewBox="0 0 48 48">${PG[k] || PG.doc}</svg></span>`;
let kxOpen = false;   // «Kit nima?» starts closed; the student's own toggle is kept until the page reloads (a re-render never closes what they opened)
document.addEventListener('toggle', e => { if (e.target.matches && e.target.matches('details.kx')) kxOpen = e.target.open; }, true);
// the Kit header: the 5-Kit chain with «Kit nima?», the name of this lesson's Kit (the one its guide PDF is for), the content's one sentence, the guide
function kitHead(key, b, guide){
  const num = (/Kit (\d)/.exec(guide.map(f => f.label || f.name).join(' ')) || [])[1] || b.kits[0], lg = k => cxFb(k) ? ' lang="uz-Latn"' : '';
  const chain = [1, 2, 3, 4, 5].map(k => `<span class="kx-k${b.kits.includes(k) ? ' on' : ''}" title="${esc(`Kit ${k}: ${t('kx.k' + k)}`)}">${k}</span>`).join('');
  return `<header class="sx-h">${pg('kit', 'sx-hero')}<div class="sx-hx"><details class="kx"${kxOpen ? ' open' : ''}><summary><span class="kx-c" aria-hidden="true">${chain}</span><span class="kx-h">${T('kx.h')}</span>${b.kits.length ? `<span class="sr-only">. ${T('kx.sr', {list: b.kits.map(k => 'Kit ' + k).join(', ')})}</span>` : ''}</summary><p class="kx-t">${T('kx.t')}</p></details>`
    + `<h3 class="sx-t">${num ? T('kx.k' + num) : T('unit.kt')}</h3>${b.head || b.text ? `<p class="sx-lead"${lg(`${key}.${b.head ? 'head' : 'text'}`)}>${esc(cu(`${key}.${b.head ? 'head' : 'text'}`))}</p>` : ''}`
    + guide.map(f => `<a class="sx-guide" ${fa(f)}><span class="sr-only">${T('common.sr_download')}</span>${pg('doc', 'sx-gi')}<span><b>${T('stp.guide')}</b>${f.size ? `<small>${esc(f.size)}</small>` : ''}</span></a>`).join('') + '</div></header>';
}
// the Vazifa deadline. due "next": the start of the next numbered lesson in the student's group (the schedule), or the safe words while that date is not set; any other due is the content's own text
function vzDue(n, key, b){
  if (!b.due) return null;
  if (b.due !== 'next') return {main: esc(cu(`${key}.due`))};
  const m = RN().find(k => k > n), d = m && LESSONS[m].d, at = m && /T(\d\d:\d\d)/.exec(LESSONS[m].start || '');
  if (!d) return {main: T('vzh.due_next')};
  return {main: T(at ? 'vzh.due_dt' : 'vzh.due_d', {date: fmtDate(...d), time: at && at[1]}), sub: T('vzh.due_sub', {n: lnT(m)})};
}
// the Vazifa header: the deadline as its title, the goal (the first paragraph; the rest folds), nothing to send
function vzHead(n, key, b, paras){
  const due = vzDue(n, key, b), lg = k => cxFb(k) ? ' lang="uz-Latn"' : '';
  return `<header class="sx-h">${pg(due ? 'cal' : 'doc', 'sx-hero')}<div class="sx-hx">`
    + (due ? `<h3 class="sx-t sx-due"><span class="sr-only">${T('vzh.due_l')}: </span>${due.main}</h3>${due.sub ? `<p class="sx-dsub">${due.sub}</p>` : ''}` : `<h3 class="sr-only">${T('vzh.h')}</h3>`)
    + (paras[0] ? `<p class="sx-lead"${lg(`${key}.text`)}>${esc(paras[0])}</p>` : '')
    + (paras.length > 1 ? `<details class="pane-more"${lg(`${key}.text`)}><summary>${T('pane.more')}</summary>${paras.slice(1).map(x => `<p class="p-sub">${esc(x)}</p>`).join('')}</details>` : '')
    + `<p class="sx-ns">${T('vzf.hint2')} ${T('vzh.when')}</p></div></header>`;
}
const STP_TAG = ['darsda', 'uyda', 'telefon', 'noutbuk', 'mentor'];
const stepIds = b => { let k = 0; return b.groups.map(g => g.kind === 'files' ? '' : 's' + ++k); };   // the numbered steps are s1, s2, … (?tab=kt&s=s2); a files row has no number
// a link to another step (or tab) of the same lesson: "Kit, 2-qadam: <the step's title>". Amaliyot steps are its section cards (d3 ids: s + group number)
function refLink(n, r){
  const b = (PARTS[n] || {})[r.tab]; if (!b || !LESSONS[n].parts.includes(r.tab) || partLock(n, r.tab)) return '';
  const gi = !r.step ? -1 : r.tab === 'am' ? r.step - 1 : stepIds(b).indexOf('s' + r.step), g = b.groups[gi];
  if (r.step && !g) return '';
  const title = g && (r.tab === 'am' ? groupTitle(cu(`c.p.${n}.am.g${gi}`)) : cu(`c.p.${n}.${r.tab}.g${gi}`));   // only Amaliyot card titles carry a number to drop; a step title may start with one (a count)
  const label = g ? t('stp.ref', {tab: t('unit.' + r.tab), n: r.step, title}) : t('stp.ref_tab', {tab: t('unit.' + r.tab)});
  return `<a class="st-ref" href="#/dars/${n}?tab=${r.tab}${r.step ? '&s=s' + r.step : ''}"><span>${esc(label)}</span>${I('next', 16)}</a>`;
}
// where and on what, one plain phrase: "Darsda, telefonda, mentor bilan"
const stepWhere = g => { const s = g.tags.filter(x => STP_TAG.includes(x)).map(x => t('stp.t.' + x)).join(', '); return s && s[0].toUpperCase() + s.slice(1); };
function stepPane(n, p, key, b, intro, paras, end){
  const q = parseHash().q, tq = q.get('tab') === p ? q.get('s') : null, pq = q.get('p'), ids = stepIds(b), lg = k => cxFb(k) ? ' lang="uz-Latn"' : '';
  const rows = b.groups.map((g, i) => ({g, i, id: ids[i]})).filter(x => x.id), extra = b.groups.map((g, i) => ({g, i})).filter(x => !ids[x.i]);
  const sel = (rows.find(x => x.id === tq) || rows.find(x => x.g.prompts.some(y => y.kid === pq)) || rows[0] || {}).id;   // ?s= or the step of a ?p= prompt, else step 1
  const ttl = x => cu(`${key}.g${x.i}`);
  const body = (g, i) => { const np = noteParts(g.note ? cu(`${key}.g${i}.n`) : ''), files = g.files.filter(f => !f.guide), pc = g.prompts.length;
    const ph = g.prompts.some((_, j) => hasBracket(cu(`${key}.g${i}.p${j}.x`)));   // the prompts have [fill-in] places: say once what to do with them
    return (np.lead ? `<p class="st-d">${esc(np.lead)}</p>` : '') + (np.steps.length ? `<ol class="d3-steps">${np.steps.map(y => `<li>${esc(y)}</li>`).join('')}</ol>` : '')
      + (np.ready ? `<p class="d3-ready"><b>Tayyor, agar</b> ${esc(np.ready)}</p>` : '') + g.ref.map(r => refLink(n, r)).join('')
      + (files.length ? `<div class="d3-fs">${d3Files(files)}</div>` : '') + (pc ? `<div class="d3-pr">${ph ? `<p class="st-ph">${T('stp.ph')}</p>` : ''}${d3Rows(n, `${key}.g${i}`, g)}</div>` : ''); };
  const item = (x, k) => { const on = x.id === sel, where = stepWhere(x.g), pv = rows[k - 1], nx = rows[k + 1], pid = `sx-${p}-${x.id}`;
    const nav = pv || nx ? `<div class="sx-nav">${pv ? `<button class="sx-pv" type="button" data-sx="${pv.id}">${I('back', 18)}<span>${T('stp.prev')}</span></button>` : ''}`
      + `${nx ? `<button class="sx-nx" type="button" data-sx="${nx.id}"><span class="sx-nl"><small>${T('stp.next')}</small><b${lg(`${key}.g${nx.i}`)}>${esc(ttl(nx))}</b></span>${pg(nx.g.icon, 'sx-pn')}</button>` : ''}</div>` : '';
    return `<li class="sx-li"><button class="sx-it" type="button" id="sxb-${p}-${x.id}" data-s="${x.id}" aria-expanded="${on}" aria-controls="${pid}"${lg(`${key}.g${x.i}`)}><span class="sx-ib">${pg(x.g.icon, 'pg')}<i>${x.id.slice(1)}</i></span>`
      + `<span class="sx-tt"><b>${esc(ttl(x))}</b>${where ? `<span>${esc(where)}</span>` : ''}</span><span class="sx-cv" aria-hidden="true"></span></button>`
      + `<section class="sx-p" id="${pid}" data-s="${x.id}" aria-labelledby="sxh-${p}-${x.id}"${on ? '' : ' hidden'}${lg(`${key}.g${x.i}`)}><div class="sx-ph">${pg(x.g.icon, 'sx-hero')}<h4 class="sx-pt" id="sxh-${p}-${x.id}" tabindex="-1">${esc(ttl(x))}</h4></div>`
      + `<div class="sx-b">${body(x.g, x.i)}</div>${nav}</section></li>`; };
  const files = extra.map(x => `<details class="sx-x" id="st-${p}-f${x.i}"${lg(`${key}.g${x.i}`)}><summary>${pg('files', 'sx-xi')}<span>${esc(ttl(x))}</span><span class="m">${T('d3.n_files', {n: x.g.files.length, pl: x.g.files.length})}</span></summary><div class="sx-b">${body(x.g, x.i)}</div></details>`).join('');
  const guide = p === 'kt' ? b.groups.flatMap(g => g.files.filter(f => f.guide)) : [];
  return `<div class="sx" data-tab="${p}" data-n="${n}">${intro}${p === 'kt' ? kitHead(key, b, guide) : vzHead(n, key, b, paras)}`
    + `<ol class="sx-l" style="--sx-n:${rows.length}" aria-label="${esc(t('vzh.steps'))}">${rows.map(item).join('')}</ol>${files}</div>${end}`;
}
// a step opens from its row or from «Keyingi qadam» / «Oldingi» and writes itself into the URL (replace: refresh and a shared link open it again).
// Wide screens always show one step in the panel; phones open it under its row, and a tap on the open row closes it (and takes it out of the URL)
const sxNarrow = root => root.closest('.frame').clientWidth < 900;
function sxShow(root, id){
  if (typeof hideToast === 'function') hideToast();   // the undo toast sits inside a row of a panel that is being hidden
  root.querySelectorAll('.sx-it').forEach(b => b.setAttribute('aria-expanded', b.dataset.s === id));
  root.querySelectorAll('.sx-p').forEach(x => { x.hidden = x.dataset.s !== id; });
}
document.addEventListener('click', e => {
  const b = e.target.closest('.sx-it, .sx [data-sx]'), root = b && b.closest('.sx'); if (!root || !b.closest('#dg')) return;
  const row = b.classList.contains('sx-it'), narrow = sxNarrow(root), open = row && b.getAttribute('aria-expanded') === 'true';
  if (open && !narrow) return;
  const id = open ? '' : b.dataset.s || b.dataset.sx, to = id && root.querySelector(`.sx-it[data-s="${id}"]`), y0 = row && b.getBoundingClientRect().top;
  sxShow(root, id);
  d3Move(d3Url(root.dataset.n, root.dataset.tab, id), false);
  if (row) { if (narrow) scrollBy(0, b.getBoundingClientRect().top - y0); return; }   // phones: the tapped row stays under the finger while the step above it closes
  if (narrow) { to.scrollIntoView({block: 'start'}); to.focus({preventScroll: true}); return; }
  const pn = root.querySelector(`#sx-${root.dataset.tab}-${id}`), top = pn.getBoundingClientRect().top;
  if (top < 0) scrollBy(0, top - 20);
  pn.querySelector('.sx-pt').focus({preventScroll: true});
});
// Amaliyot / Kit / Vazifa share one pane: paragraphs, then the groups (Amaliyot: section cards + a docked panel, d3Pane; Kit and Vazifa: a header, then the steps beside one panel, stepPane); Amaliyot and Vazifa end with a tick
function blockPane(n, p){
  const b = (PARTS[n] || {})[p] || {text: '', groups: []}, key = `c.p.${n}.${p}`;
  const raw = b.text ? cu(`${key}.text`).split(/\n\s*\n/) : [], paras = raw.map(x => `<p class="p-sub">${esc(x).replace(/\n/g, '<br>')}</p>`);
  // UX audit S6-6: on Amaliyot only the first paragraph stays open; the rules and help (laptop, privacy, "Qiynalsangiz…") fold into "Qoidalar va yordam"
  const text = (p === 'am' || p === 'vz') && paras.length > 1 ? `${paras[0]}<details class="pane-more"><summary>${T('pane.more')}</summary>${paras.slice(1).join('')}</details>` : paras.join('');
  const intro = LANG !== 'uz' ? `<p class="p-sub uz-note">${T('pane.uz_note')}</p>` : '';   // S10-1 (RU: the lesson body is Uzbek)
  const end = p === 'am' ? endb('f:am' + n, S.has('f:am' + n), 'amf.on', 'amf.off', '', 'amf.aria') : p === 'vz' ? endb('f:v' + n, S.has('f:v' + n), 'vzf.on', 'vzf.off', '', 'vzf.aria') : '';
  // UX audit S6-5: the pane does not end in a dead end. After the tick: Amaliyot -> Vazifa, Vazifa -> home
  const vzOpen = LESSONS[n].parts.includes('vz') && !partLock(n, 'vz'), next = p === 'am' && vzOpen ? nextBlock(`#/dars/${n}?tab=vz`, 'next.to_vz') : p === 'vz' ? nextBlock('#/dastur', 'prep.end_back') : '';
  // Vazifa on phones: the tick is a bar stuck to the bottom of the screen (UX audit M3), so the way home sits under it, outside the bar
  if ((p === 'kt' || p === 'vz') && b.groups.length) return `<p class="p-label sr-only">${T('unit.' + p)}</p>${stepPane(n, p, key, b, intro, raw, end ? `<div class="gt-foot end vz-end">${end}</div><div class="gt-foot end">${next}</div>` : '')}`;
  if (b.groups.length) return `<p class="p-label sr-only">${T('unit.' + p)}</p>${d3Pane(n, p, key, b, intro, text, end ? end + next : '')}`;
  return `<p class="p-label sr-only">${T('unit.' + p)}</p>${intro}${text ? `<div class="pane-text"${cxFb(`${key}.text`) ? ' lang="uz-Latn"' : ''}>${text}</div>` : ''}${end ? `<div class="gt-foot end">${end}${next}</div>` : ''}`;
}
function lessonPage(n, tab){
  const def = tabOfHref((nextOf(n) || {}).href);
  tab = tab || def;   // no ?tab: the tab with today's work
  const L = LESSONS[n], [d, tt] = lProg(n), empty = !L.parts.length;
  const tabsDef = L.parts.map(p => ({p, label: t('unit.' + p), lock: partLock(n, p), done: partLock(n, p) ? false : {
    sl: () => slDone(n), am: () => S.has('f:am' + n), vz: () => S.has('f:v' + n), kt: () => false, dk: () => false}[p]()}));
  const deckUrl = `/aip/deck/${n}/`;   // instructor deck viewer served at /aip/deck/:lesson/ (make-aip3.mjs turns it into /aip3/deck/ for the live fork)
  const pane = {
    sl: () => `<p class="p-label sr-only">${T('unit.sl')}</p><p class="p-num">${S.sl(n) > 0 ? `${S.sl(n)}/${L.slides}` : L.slides}</p>
      <div class="gt-foot"><span class="gt-meta">${T('pane.sl.meta', {n: L.slides, pl: L.slides, kind: kindT(n)})}</span>${play(slHref(n), S.sl(n) === 0 ? T('pane.sl.start') : slDone(n) ? T('pane.sl.again') : T('pane.sl.go', {i: S.sl(n), n: L.slides}), 'play', 18)}</div>`,
    am: () => blockPane(n, 'am'), kt: () => blockPane(n, 'kt'), vz: () => blockPane(n, 'vz'),
    dk: () => L.deck === false ? `<p class="p-label sr-only">${T('unit.dk')}</p><div class="dk-stack dk-soon" aria-hidden="true"><span class="dk-s"></span><span class="dk-s"></span><span class="dk-s dk-top"></span></div><p class="dk-count">${T('pane.dk.soon')}</p>` : `<p class="p-label sr-only">${T('unit.dk')}</p><button class="dk-stack" type="button" data-deck="${n}"><span class="dk-s"></span><span class="dk-s"></span><span class="dk-s dk-top"><iframe class="dk-preview" src="${deckUrl}?slide=1&preview=1" tabindex="-1"></iframe><span class="dk-play">${I('play', 32)}</span></span></button><p class="dk-count" data-tpl="${esc(T('pane.dk.count', {n: '{n}'}))}"></p>`,
  };
  const tabs = tabsDef.map((x, i) => `<button class="gt-tab" role="tab" type="button" id="dg-t${i}" aria-controls="dg-p${i}" aria-selected="${i === 0}" data-l="${esc(x.label)}" data-p="${x.p}"${i ? ' tabindex="-1"' : ''}>${x.lock ? `<span class="lkd">${I('lock', 12)}${esc(x.label)}</span>` : x.done ? `<span class="ok">${I('check', 12)}${esc(x.label)}<span class="sr-only">${T('common.sr_done')}</span></span>` : esc(x.label)}</button>`).join('');
  const panes = tabsDef.map((x, i) => `<div class="gt-pane" role="tabpanel" id="dg-p${i}" aria-labelledby="dg-t${i}"${i ? ' inert' : ''}>${x.lock ? lockedPane(x.lock) : pane[x.p]()}</div>`).join('');
  const title = ltitle(n);   // no hero CTA pill: each folder tab already carries its part's own action (user, 2026-10-17)
  const tall = Object.values(PARTS[n] || {}).some(b => b.groups.some(g => g.prompts.length));   // prompt lists make a pane very long: the other panes must not keep that height
  const side = empty   // no materials yet: a card says so, instead of an empty folder
    ? `<div class="folder flatc c-slate soon-card"><span class="f-label">${esc(lessonDate(n))}</span><p class="soon-t">${T('lesson.soon')}</p></div>`
    : `<div class="gt gt-slate g-slate${tall ? ' gt-tall' : ''}" id="dg" data-n="${n}" data-def="${(L.parts.includes(def) ? def : L.parts[0]) || ''}" style="--n:${tabsDef.length}"><div class="gt-goo" aria-hidden="true"><span class="gt-ind"></span><span class="gt-pan"></span></div>
      <div class="gt-tabs" role="tablist" aria-label="${esc(t('tab.list'))}">${tabs}</div><div class="gt-body"><div class="gt-orbs" aria-hidden="true"><i></i><i></i><i></i></div>${panes}</div></div>`;   // every lesson folder inside a lesson page is Poʻlat (user, 2026-10-30); the home cards keep each lesson's own colour
  return {screen: 'dars', tab: Math.max(0, L.parts.indexOf(tab)), tag: `#/dars/${n} · ` + t('tag.lesson', {n: lnT(n), parts: L.parts.length}), title: lnum(n) == null ? title : t('title.lesson', {n: lnum(n), title}), html: nav('d') + `
    <div class="lhd">
      ${dlh('#/dastur', T('nav.home'))}
      <h1 class="lh1">${lnum(n) == null ? '' : `<span class="ln">${lnH(n)}</span> `}<span class="ln">${esc(title)}</span></h1>
      <p class="lmeta">${tt ? T('lesson.meta', {n, date: lessonDate(n), d, t: tt, pl: tt}) : esc(lessonDate(n))}</p>
      <button class="lhr-t" type="button" aria-expanded="false" aria-controls="lhr-${n}">${T('lesson.about')}</button>
      <div class="lhr" id="lhr-${n}"><p class="lsub">${T(`lesson.${n}.sub`)}</p><div><p class="lede">${T(`lesson.${n}.lede`)}</p>${L.outs ? `<details class="pane-more lout"><summary>${T('lesson.outs')}</summary><ul>${Array.from({length: L.outs}, (_, i) => `<li>${T(`lesson.${n}.o${i}`)}</li>`).join('')}</ul></details>` : ''}</div></div>
    </div>
    <div class="lwrap">${side}</div>`};   // W1 (user, 2026-10-30): a compact one-line header, then the folder across the whole page
}

// ---- slides: a simple viewer (2.0 route /slaydlar): the slide images were never available, so every slide is a marked "namuna" stage
function slPage(n, i){
  const L = LESSONS[n], N = L.slides; S.setSl(n, i);
  const topic = t(`lesson.${n}.t${Math.min(L.topics - 1, Math.floor((i - 1) / N * L.topics))}`);
  const prev = i > 1 ? `#/dars/${n}/slayd/${i - 1}` : '', next = i < N ? `#/dars/${n}/slayd/${i + 1}` : '';
  const nums = Array.from({length: N}, (_, k) => `<a href="#/dars/${n}/slayd/${k + 1}"${k + 1 === i ? ' aria-current="true"' : ''}>${k + 1}</a>`).join('');
  return {screen: 'slayd', tag: `#/dars/${n}/slayd/${i} · ` + t('tag.slide', {n: N}), title: t('sl.doc_title', {i, n: N, n_dars: lnT(n)}), html: `
    <div class="slv"><div class="slv-bar"><a class="slv-x" href="#/dars/${n}">${I('back')}${lnH(n)}</a><h1 class="slv-ct" tabindex="-1">${i}/${N}</h1>
        <button class="slv-all" type="button" data-sheet="slides-sheet" aria-haspopup="dialog" aria-expanded="false" aria-controls="slides-sheet">${T('sl.all')}</button></div>
      <div class="slv-stage" data-sl="${i}" data-n="${n}" data-max="${N}">${slideStage(n, i)}</div>
      <div class="slv-foot">${prev ? `<a class="slv-btn" data-slnav="prev" href="${prev}" aria-label="${esc(t('sl.prev'))}">${I('back', 20)}</a>` : `<span class="slv-btn off" aria-hidden="true">${I('back', 20)}</span>`}
        <span class="slv-seen">${i === N ? `${I('check', 14)}<span class="sw">${T('sl.seen')}</span>` : ''}</span>
        ${next ? `<a class="slv-btn" data-slnav="next" href="${next}" aria-label="${esc(t('sl.next'))}">${I('next', 20)}</a>` : `<a class="play" href="#/dars/${n}"><span>${T('sl.back_lesson')}</span><span class="play-circ">${I('next', 20)}</span></a>`}</div></div>
    <dialog class="sheet" id="slides-sheet" aria-label="${esc(t('sl.all'))}"><p class="sheet-t">${T('sl.all')}</p><div class="slv-grid">${nums}</div><form method="dialog"><button class="sheet-x">${T('sl.close')}</button></form></dialog>`};
}
let prevHash = '#/dastur';

// ---------------- routes ----------------
function parseHash(){
  const raw = ROUTE().replace(/^#\/?/, ''), [p, qs] = raw.split('?'); let parts;
  try { parts = p.split('/').filter(Boolean).map(decodeURIComponent); } catch { parts = ['?']; }
  return {parts, q: new URLSearchParams(qs || '')};
}
function resolve(r){
  if (!AUTH) return {view: 'gate'};   // signed out: every route is the gate (the address stays, so a login lands on it)
  return resolve0(r);
}
function resolve0(r){
  const [a, b, c, d, e] = r.parts, has = (o, k) => typeof k === 'string' && Object.hasOwn(o, k);
  if (!a || a === 'kirish') return r.parts.length > 1 ? null : {redirect: '#/dastur'};
  if (a === 'dastur') return b ? null : {view: 'app', page: homePage()};
  if (a === 'kursgacha') return b ? null : {view: 'app', page: prePage()};
  if (a !== 'dars' || !/^\d$/.test(b || '') || !LESSONS[+b]) return null;
  const n = +b, L = LESSONS[n];
  if (isLocked(n)) return {view: 'app', locked: n, page: homePage()};
  if (!c) return {view: 'app', page: n === 0 ? prepPage() : lessonPage(n, r.q.get('tab'))};
  const home = {redirect: `#/dars/${n}`};   // an old 2.0 bookmark (/kutubxona, /amaliyot/01, ...) lands on its lesson, never on "not found"
  if (n === 0) return home;
  const PART = {slayd: 'sl', amaliyot: 'am', kit: 'kt', vazifa: 'vz'};
  if (c === 'kitob') return {redirect: `#/dars/${n}?tab=kt`};
  if (!PART[c]) return home;
  if (partLock(n, PART[c])) return {redirect: `#/dars/${n}?tab=${PART[c]}`};
  if (c === 'slayd') { const i = /^\d+$/.test(d || '') ? +d : 0; return L.slides && i >= 1 && i <= L.slides && !e ? {view: 'app', page: slPage(n, i)} : home; }
  return !d && L.parts.includes(PART[c]) ? {redirect: `#/dars/${n}?tab=${PART[c]}`} : home;   // the part pages are folder tabs: /amaliyot, /kit and /vazifa open that tab
}
const ROUTES = () => { const r = ['#/kirish', '#/dastur', '#/shrift', '#/kursgacha', '#/dars/0'];
  LN().forEach(n => { r.push(`#/dars/${n}`); const L = LESSONS[n]; if (L.slides) r.push(`#/dars/${n}/slayd/1`, `#/dars/${n}/slayd/${L.slides}`); });
  return r; };
const ROUTE_OF = {gate: '#/kirish', dastur: '#/dastur', dars: '#/dars/1', ex: '#/dars/2', type: '#/shrift', all: '#/all'};
function go(v){ navTo(ROUTE_OF[v] || v); }
// the parent of a route (ux-spec §1): used for cold entries so the system Back button stays inside the app
function parentOf(h){
  const p = h.replace(/^#\/?/, '').split('?')[0].split('/').filter(Boolean), [a, b, c] = p;
  if (a === 'dars') return c ? `#/dars/${b}` : '#/dastur';
  return a === 'fayl' || a === 'kursgacha' ? '#/dastur' : null;
}

const app = document.getElementById('s-app');
function mount(el, page){
  if (prepIO) { prepIO.disconnect(); prepIO = null; } clearTimeout(liveTimer);   // nothing of the previous prep page lingers
  el.dataset.screen = page.screen;
  const cut = page.html.indexOf('</header>') + 9, body = page.html.startsWith('<header') ? page.html.slice(0, cut) + '<main>' + page.html.slice(cut) + '</main>' : `<main>${page.html}</main>`;
  el.innerHTML = `<div class="frame"><div class="site">${body}</div></div>`;
  convertLinks(el); okina(el); markMissing(el);
  const dg = el.querySelector('#dg'); if (dg) { initGT(dg); if (page.tab > 0) { dg.dataset.instant = '1'; dg.querySelectorAll('.gt-tab')[page.tab]?.click(); delete dg.dataset.instant; } }   // ?tab=vz|kt|am|sl opens that folder tab
  if (el.querySelector('#deck')) initPrep(el);
  el.querySelectorAll('.vp-host').forEach(vpMount);   // the custom video player (no native controls, so no Download menu)
  const ia = el.querySelector('.ia'); if (ia) { ia.classList.add('ia-still'); iaPaint(ia); requestAnimationFrame(() => requestAnimationFrame(() => ia.classList.remove('ia-still'))); }   // the first paint does not animate
}
let firstRender = true, byClick = false, slFocus = '';
const mem = {};      // hash -> {y, from}: coming back (browser Back) restores the scroll position and focuses the link we came from
// keep = true (language switch): same page, same place: no scroll, no focus move; setLang puts the state back
function render(keep){
  if (!keep) prepOpen = iaOpen = null;
  if (toast.parentNode !== document.body) document.body.append(toast);   // the copy toast sits next to its button; a rebuilt page must not take it along
  if (typeof nl !== 'undefined' && !nl.hidden && !/^#\/dastur/.test(ROUTE())) nl.hidden = true;   // the new-lesson popup belongs to home: any other route closes it   // a new visit of the prep page starts with the first open card; a language switch keeps the card
  closeMenu(); toast.hidden = true;
  document.querySelectorAll('[data-clone]').forEach(x => x.remove());
  let r = parseHash(); let res = resolve(r);
  if (res && res.redirect) { replaceRoute(res.redirect); r = parseHash(); res = resolve(r); }   // old part routes (#/dars/2/vazifa) land on the folder tab
  if (!res) { replaceRoute('#/dastur'); res = resolve(parseHash()); setTimeout(() => flashToast('toast.notfound'), 50); }
  if (res.locked) replaceRoute('#/dastur');
  const view = res.view; document.body.dataset.view = view;
  document.getElementById('s-gate').classList.toggle('is-on', view === 'gate' || view === 'all');
  app.classList.toggle('is-on', view === 'app');
  if (view !== 'app') app.replaceChildren();   // no duplicate ids while #/all stacks its own copies
  document.title = view === 'app' ? res.page.title + ' · ' + t('title.site') : t('title.' + view) + ' · ' + t('title.site');
  if (view === 'app') mount(app, res.page);
  let last = app;
  if (view === 'all') ['#/dastur', '#/dars/1', '#/dars/2'].forEach(h => { const el = document.createElement('section'); el.className = 'screen is-on'; el.dataset.clone = '1'; last.after(el); last = el; mount(el, resolve({parts: h.slice(2).split('/'), q: new URLSearchParams()}).page); });
  if (res.locked) openLockSheet(res.locked);
  const p = r.q.get('p'), target = p && app.querySelector(`[data-pid="${CSS.escape(p)}"]`), m = mem[ROUTE()];
  const sq = r.q.get('s'), step = sq && app.querySelector(`.gt-pane:not([inert]) .sx-it[data-s="${CSS.escape(sq)}"]`);   // ?tab=kt&s=s2: the step is open (stepPane), bring it into view
  if (keep) {}
  else if (target) { const dt = target.querySelector('details') || target.closest('details'); if (dt) dt.open = true; scrollTo(0, 0); target.scrollIntoView({block: 'start'}); const sm = target.querySelector('summary'); sm && sm.focus({preventScroll: true}); }   // a prompt inside a Kit / Vazifa step: stepPane already opened its step, the prompt opens too
  else if (step) { scrollTo(0, 0); step.scrollIntoView({block: 'start'}); step.focus({preventScroll: true}); }
  else if (!byClick && m && !firstRender) { scrollTo(0, m.y); const a = m.from && document.querySelector(`#s-app a[data-r="${CSS.escape(m.from)}"]`); if (a) a.focus({preventScroll: true}); }
  else if (slFocus && app.querySelector(`[data-slnav="${slFocus}"]`)) { scrollTo(0, 0); app.querySelector(`[data-slnav="${slFocus}"]`).focus({preventScroll: true}); }
  else { scrollTo(0, 0); if (!firstRender) { const h = document.querySelector('.screen.is-on h1'); if (h) { h.tabIndex = -1; h.focus({preventScroll: true}); } } }
  if (view === 'app' && !ROUTE().startsWith('#/fayl/')) prevHash = ROUTE();
  firstRender = false; byClick = false; slFocus = '';
  if (!keep && typeof beacon === 'function') beacon();   // the app build counts page views (a language switch is not a new page)
}
// remember where a link was clicked (scroll + the link itself) so Back can return there
document.addEventListener('click', e => { const a = e.target.closest('a[data-r]'); if (!a || a.dataset.slnav) return; mem[ROUTE()] = {y: scrollY, from: a.dataset.r}; byClick = true; }, true);
// slide viewer: the ‹ › buttons, tap zones (left third = back, right two thirds = forward) and the keys all REPLACE the history entry
document.addEventListener('click', e => { const b = e.target.closest('[data-slnav]'); if (!b) return; e.preventDefault(); slFocus = b.dataset.slnav; goReplace(b.dataset.r); });
document.addEventListener('click', e => { const st = e.target.closest('.slv-stage'); if (!st) return; const i = +st.dataset.sl, n = st.dataset.n, N = +st.dataset.max, r = st.getBoundingClientRect();
  const to = (e.clientX - r.left) < r.width / 3 ? i - 1 : i + 1; if (to >= 1 && to <= N) goReplace(`#/dars/${n}/slayd/${to}`); });
document.addEventListener('keydown', e => { const st = document.querySelector('.slv-stage'); if (!st || e.altKey || e.ctrlKey || e.metaKey || !['ArrowLeft', 'ArrowRight', ' '].includes(e.key) || document.querySelector('dialog[open]')) return;
  if (e.target.closest('input,select,textarea,[contenteditable],[role=tablist]') || (e.key === ' ' && e.target.closest('button,a,summary'))) return;
  const i = +st.dataset.sl, N = +st.dataset.max, to = i + (e.key === 'ArrowLeft' ? -1 : 1); if (to >= 1 && to <= N) { e.preventDefault(); goReplace(`#/dars/${st.dataset.n}/slayd/${to}`); } });
// "Bajarildi / Bajardim / Amaliyotni yakunladim" toggles (persisted)
document.addEventListener('click', e => { const b = e.target.closest('[data-end]'); if (!b) return; const on = !S.has(b.dataset.end); S.tick(b.dataset.end, on);
  b.setAttribute('aria-pressed', on); b.textContent = on ? b.dataset.on : b.dataset.off; live.textContent = t(on ? 'live.end_on' : 'live.end_off'); refreshCounts(); });
// a Vazifa mark inside a folder pane: the tab's own check follows it
document.addEventListener('click', e => { const b = e.target.closest('.gt-pane [data-end]'); if (!b) return; const tab = document.getElementById(b.closest('.gt-pane').getAttribute('aria-labelledby')), l = tab.dataset.l;
  tab.innerHTML = b.getAttribute('aria-pressed') === 'true' ? `<span class="ok">${I('check', 12)}${esc(l)}<span class="sr-only">${T('common.sr_done')}</span></span>` : esc(l); });
function refreshCounts(){ document.querySelectorAll('[data-cnt]').forEach(el => { const [type, id] = el.dataset.cnt.split(':'); el.textContent = cntText(type, id); }); d3Paint(); }

// the locked-lesson sheet (static markup in the page), shown when a locked lesson's link is opened directly: its title and text depend on the lesson; applyStatic re-renders them with these parameters on a language switch
// audit #10: only the parts the lesson has (`has` in the payload): "slaydlar, amaliyot va vazifa"
const partsList = n => { const a = LESSONS[n].parts.map(p => t('units.' + p).toLowerCase()); return a.length > 1 ? a.slice(0, -1).join(', ') + ' ' + t('units.and') + ' ' + a.at(-1) : a[0] || ''; };
function lockSheet(n){
  const sh = document.getElementById('lock-sheet'), ti = sh.querySelector('#ls-t'), de = sh.querySelector('.sheet-d');
  ti.dataset.i18n = LESSONS[n].d ? 'lock.title' : 'lock.title_tba'; ti.dataset.i18nP = JSON.stringify({n: lnT(n), date: lessonDate(n)}); de.dataset.i18n = LESSONS[n].parts.length ? 'lock.desc_n' : 'lock.desc_0'; de.dataset.i18nP = JSON.stringify({parts: partsList(n)});
  applyStatic(sh); okina(sh); return sh;
}
const openLockSheet = n => lockSheet(n).showModal();
// a tap on a locked folder only shakes its lock (the course folder's big lock, a lesson folder's small one); the date is already on the card
document.addEventListener('click', e => { const ic = e.target.closest('[data-lock]')?.querySelector('.f-biglock, .f-note svg'); if (!ic) return; ic.classList.remove('shake'); void ic.getBoundingClientRect(); ic.classList.add('shake'); });

// ---------------- language switch ----------------
function updateLangUI(){ document.documentElement.lang = HTML_LANG[LANG]; document.querySelectorAll('[data-lang]').forEach(b => b.dataset.lang === LANG ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')); }
// a language switch re-renders the page, so everything the student changed on screen is saved first and put back after
function langSnapshot(){
  const ae = document.activeElement, lb = ae && ae.closest && ae.closest('[data-lang]'), m = document.getElementById('nmenu');
  return {y: scrollY, nav: lb && lb.parentElement, menu: !m.hidden && m._from && (m._from.classList.contains('menu-btn') ? '.menu-btn' : '.nav-name'),
    tab: [...app.querySelectorAll('.gt-tab')].findIndex(b => b.getAttribute('aria-selected') === 'true'), det: [...app.querySelectorAll('details')].map(d => d.open), sheet: !!app.querySelector('dialog[open]'),
    toast: toast.hidden ? null : undoLi ? {key: undoLi.dataset.key} : {flash: toastKey}};
}
function langRestore(st){
  const dg = app.querySelector('#dg'); if (dg && st.tab > 0) { dg.dataset.instant = '1'; dg.querySelectorAll('.gt-tab')[st.tab]?.click(); delete dg.dataset.instant; } // instant: no out/in animation
  app.querySelectorAll('details').forEach((d, i) => { d.open = !!st.det[i]; });
  if (st.sheet) app.querySelector('dialog')?.showModal();
  scrollTo(0, st.y);
  const trig = st.menu && app.querySelector(st.menu); if (trig) { closeMenu(); trig.focus({preventScroll: true}); st.nav = null; }   // choosing a language closes the menu; focus goes back to its button
  if (st.toast?.key) { const li = app.querySelector(`li[data-key="${CSS.escape(st.toast.key)}"]`); if (li) showToast(li); } else if (st.toast?.flash) flashToast(st.toast.flash);
  st.nav?.querySelector(`[data-lang="${LANG}"]`)?.focus({preventScroll: true});
  live.textContent = ''; // an announcement made in the old language must not be read out again
}
document.addEventListener('click', e => { const b = e.target.closest('[data-lang]'); if (b) setLang(b.dataset.lang); });

// Login wordmark: the weight wave is CSS only (.wm-l / .wm-g, markup built in assemble.py); nothing to run here.

// Deck viewer modal
(function(){
  // The deck is same-origin (/aip/deck/:n/; /aip3/deck/ on the live fork), so the controls call its own window.nextSlide/prevSlide directly.
  // Zoom renders the deck in a larger iframe inside a scrolling view (the deck fits itself to its viewport).
  let modal = null, zoom = 1;
  const ZOOMS = [0.75, 1, 1.25, 1.5, 2];
  function openDeck(n) {
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'deck-modal';
      modal.className = 'deck-modal';
      modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-label', 'Slaydlar');
      modal.innerHTML = `<div class="deck-backdrop"></div><button type="button" class="deck-btn deck-close" data-act="close" title="Yopish" aria-label="Yopish">${I('x', 24)}</button><div class="deck-wrap"><div class="deck-view"><iframe class="deck-frame" allow="fullscreen" title="Slaydlar"></iframe></div><div class="deck-bar"><button type="button" class="deck-btn" data-act="prev" title="Oldingi" aria-label="Oldingi">${I('back', 20)}</button><button type="button" class="deck-btn" data-act="next" title="Keyingi" aria-label="Keyingi">${I('next', 20)}</button><button type="button" class="deck-btn" data-act="zout" title="Kichiklashtirish" aria-label="Kichiklashtirish">${I('minus', 24)}</button><button type="button" class="deck-btn" data-act="zin" title="Kattalashtirish" aria-label="Kattalashtirish">${I('plus', 24)}</button><a class="deck-btn" data-act="download" title="Yuklab olish (PDF)" aria-label="Yuklab olish (PDF)" download>${I('down', 20)}</a></div></div>`;
      document.body.appendChild(modal);
      modal.addEventListener('click', e => {
        const act = e.target.closest('[data-act]')?.dataset.act;
        if (act === 'close' || e.target.classList.contains('deck-backdrop')) closeDeck();
        else if (act === 'prev') deck('prevSlide');
        else if (act === 'next') deck('nextSlide');
        else if (act === 'zin' || act === 'zout') setZoom(ZOOMS[Math.max(0, Math.min(ZOOMS.length - 1, ZOOMS.indexOf(zoom) + (act === 'zin' ? 1 : -1)))]);
      });
      document.addEventListener('keydown', e => {
        if (!modal.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeDeck();
        else if (e.key === 'ArrowRight') { e.preventDefault(); deck('nextSlide'); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); deck('prevSlide'); }
      });
    }
    modal.querySelector('iframe').src = `/aip/deck/${n}/`;
    modal.querySelector('[data-act="download"]').href = `/aip/deck/${n}/deck.pdf`;
    setZoom(1);
    modal.classList.add('is-open');
    document.body.classList.add('deck-open');
    modal.querySelector('.deck-close').focus();
  }
  function closeDeck() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('deck-open');
    modal.querySelector('iframe').src = 'about:blank';
  }
  function deck(fn) {
    try { modal.querySelector('iframe').contentWindow[fn]?.(); } catch (_) { /* deck not loaded yet */ }
  }
  function setZoom(z) {
    zoom = z;
    const f = modal.querySelector('iframe');
    f.style.width = f.style.height = `${z * 100}%`;
  }
  // Slide count under the stacked preview: read from the preview deck itself once it loads (load does not bubble: capture).
  document.addEventListener('load', e => {
    const f = e.target;
    if (!(f instanceof HTMLIFrameElement) || !f.classList.contains('dk-preview')) return;
    try {
      const c = f.contentDocument.querySelectorAll('#grid-cards-container .grid-thumb').length, el = f.closest('.gt-pane')?.querySelector('.dk-count');
      if (c && el) el.textContent = el.dataset.tpl.replace('{n}', c);
    } catch (_) {}
  }, true);
  function I(name, size) {
    return `<svg width="${size}" height="${size}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  }
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-deck]');
    if (btn) openDeck(btn.dataset.deck);
  });
})();

// ===================== APP: routes (History API under /aip), login and logout, language, slides, boot =====================
// Appended to the shared templates by build_app.py. Route strings inside the code keep the prototype's "#/dars/1" form; only these helpers know the real URLs.
const ROUTE = () => '#' + (location.pathname.replace(/^\/aip(?=\/|$)/, '').replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/') + location.search;
const normRoute = r => r.length > 2 ? r.replace(/\/+(?=\?|$)/, '') : r;           // "#/dars/1/" is "#/dars/1"
const urlOf = r => { r = normRoute(r); return BASE + (r.length > 2 ? r.slice(1) : '/'); };   // "#/dars/1?p=P1" -> "/aip/dars/1?p=P1"
const replaceRoute = r => history.replaceState({aip: 1}, '', urlOf(r));
const goReplace = r => { replaceRoute(r); render(); };
function navTo(r){ if (urlOf(r) === location.pathname + location.search) return render(); history.pushState({aip: 1}, '', urlOf(r)); render(); }
function seedHistory(r){   // a cold entry on a deep route: the parent goes under it, so the system Back button stays inside the app
  const par = parentOf(r);
  if (par && !history.state) { history.replaceState({aip: 1}, '', urlOf(par)); history.pushState({aip: 1}, '', urlOf(r)); } else if (!history.state) history.replaceState({aip: 1}, '', urlOf(r));
}
function convertLinks(root){   // every in-app link keeps its route in data-r and gets a real href (open in a new tab, copy the address)
  root.querySelectorAll('a[href^="#/"]').forEach(a => { const r = a.getAttribute('href'); a.dataset.r = r; a.setAttribute('href', urlOf(r)); });
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-r]'); if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;
  e.preventDefault(); navTo(a.dataset.r);
});
// one view event per page shown: the path only (no query), fire and forget; the server ignores it without a session and never stores more than the route
function beacon(){ if (AUTH && navigator.sendBeacon) try { navigator.sendBeacon(API + '/ev', new Blob([JSON.stringify({p: location.pathname})], {type: 'application/json'})); } catch {} }
window.addEventListener('popstate', () => d3Pop() || gtPop() || render());

// ---- the name menu: the student's own data, and Chiqish (all as text nodes, never HTML)
function fillMenu(){
  if (!SESS) return;
  const s = SESS.student, $ = id => document.getElementById(id);
  $('nm-name').textContent = s.fullName; $('nm-id').textContent = s.id;
  $('nm-group').textContent = t('menu.group_' + (s.group || 'none'));
  $('nm-course').textContent = LESSONS[1].d ? t('menu.course_range', {n: RN().length, pl: RN().length, from: lessonDate(1), to: lessonDate(LN().filter(n => LESSONS[n].d).at(-1))}) : t('menu.course_tba', {n: RN().length, pl: RN().length});
  $('nm-pre').hidden = !courseStarted();   // UX audit S9-1: a labelled way to the pre-course page on phones (CSS hides it on wider screens, where the header pill has its words)
  okina($('nmenu'));
}
async function logout(){
  closeMenu();
  try { await api('POST', '/logout', {}); } catch {}
  d3Forget();
  marker(false); location.replace('/aip/');   // a full reload: nothing of the old student stays in memory
}
document.addEventListener('click', e => { if (e.target.closest('#logout')) logout(); });

// ---- the account: the UI language for platform text plus Uzbek for course material; retried when the language changed while it loaded
let langSeq = 0;
async function loadMe(first){
  for (;;) {
    const seq = langSeq;
    const r = first ? [first, LANG === 'uz' ? first : await api('GET', '/me?lang=uz')] : await fetchMe();
    first = null;
    if (seq === langSeq) return r;
  }
}

// ---- login: the real POST /login; the error codes use the gate's own messages
async function doLogin(c){
  const ldr = document.getElementById('gate-loader');
  gid.value = c; gid.readOnly = true;
  try {
    const [j] = await Promise.all([api('POST', '/login', {id: c}), sleep(350)]);
    const [me, uz] = await loadMe(j);
    applyMe(me, uz);
    const lt = ldr.querySelector('.ldr-txt'); lt.dataset.i18nP = JSON.stringify({name: me.student.firstName}); applyStatic(ldr); okina(ldr);
    gateMsg(['gate.welcome', {name: me.student.firstName}], 'ok'); ldr.hidden = false;
    await sleep(700);
    document.body.append(ldr); gid.value = ''; gid.readOnly = false; gateMsg(['gate.help']);   // the loader leaves the sign-in screen: it fades out over the finished home
    const r = ROUTE();
    if (/^#\/(kirish)?$/.test(r)) replaceRoute('#/dastur'); else seedHistory(r);
    render(); fillMenu(); endLoader(ldr);
  } catch (e) {
    ldr.hidden = true; gid.readOnly = false;
    if (e.code === 'invalid_id') gateMsg(c.length < 6 ? ['gate.err.unknown_short', {n: 6 - c.length, pl: 6 - c.length}] : ['gate.err.notfound'], 'err');   // a short ID the server does not know is most likely incomplete
    else if (e.code === 'bad_id') gateMsg(['gate.err.badchars'], 'err');
    else if (e.code === 'rate_limited') gateMsg(['gate.err.rate', {n: Math.max(1, Math.ceil((e.info.retryAfter || 60) / 60))}], 'err');
    else gateMsg(['gate.err.offline'], 'err');
  }
}

// ---- language: the cookie the API reads, then a refetch (platform text comes translated), no reload
function cookieLang(){ const m = /(?:^|; )aip_lang=(uz|ru)/.exec(document.cookie); return m ? m[1] : 'uz'; }   // a function declaration: LANG reads it before this file's own lines run
async function setLang(l){
  if (!LANGS.includes(l) || l === LANG) return;
  const old = LANG, seq = ++langSeq, r0 = ROUTE(), st = langSnapshot();
  const use = x => { LANG = x; document.cookie = `aip_lang=${x}; Path=/; Max-Age=31536000; SameSite=Lax`; updateLangUI(); applyStatic(); okina(document.body); gateRelang(); };
  use(l);
  if (!AUTH) return;
  try { const [j, uz] = await loadMe(); if (seq !== langSeq) return; applyMe(j, uz); }
  catch (e) { if (e.status === 401 || seq !== langSeq) return; use(old); flashToast('toast.lang_failed'); return; }   // the switch failed: the old language stays, and the cookie with it
  fillMenu(); render(true);
  if (ROUTE() === r0) langRestore(st);   // only when we are still on the same page
}

// ---- keep the session honest: the page may come back from the back-forward cache, and a part may have opened meanwhile
async function recheck(){ try { const [j, uz] = await loadMe(); applyMe(j, uz); fillMenu(); } catch (e) { if (e.status !== 401) return; } render(true); }   // a 401 already sent the app back to the gate
window.addEventListener('pageshow', e => { if (e.persisted && AUTH) recheck(); });
let lastSeen = 0;
document.addEventListener('visibilitychange', () => { if (!document.hidden && AUTH && Date.now() - lastSeen > 10000) { lastSeen = Date.now(); recheck(); } });

// ---- slides: the real still (and the clip of a video lesson on top of it; when the clip is missing the still stays)
const NOCLIP = {};   // ponytail: lessons whose first clip answered 404 get no more clip requests (they would only fill the console); stills carry the slides. Reset by a reload once clips exist
function slideStage(n, i){
  const base = `${API}/lesson/${n}`, vid = LESSONS[n].kind === 'video' && !NOCLIP[n];
  if (i < LESSONS[n].slides) new Image().src = `${base}/slide/${i + 1}`;   // the next still is on its way before the tap
  const L = LESSONS[n], topic = t(`lesson.${n}.t${Math.min(L.topics - 1, Math.floor((i - 1) / L.slides * L.topics))}`);
  // loading: the placeholder layout (number and topic) stays under the image, which fades in on load; error: a message with a retry
  return `<div class="slv-ph"><span class="slv-num">${num2(i)}</span><span class="slv-t">${T('sl.topic', {n: lnT(n), topic})}</span></div>
    <div class="slv-media" role="img" aria-label="${esc(t('sl.img', {i, topic}))}" data-src="${base}/slide/${i}"><img src="${base}/slide/${i}" alt="" draggable="false">${vid ? `<video src="${base}/clip/${i}?q=1080" muted playsinline autoplay loop disablepictureinpicture></video>` : ''}</div>
    <div class="slv-err" hidden role="alert"><span>${T('sl.error')}</span><button type="button" class="slv-retry">${T('sl.retry')}</button></div>`;
}
document.addEventListener('load', e => { const im = e.target; if (im.tagName === 'IMG' && im.closest('.slv-media')) im.closest('.slv-media').classList.add('ready'); }, true);
document.addEventListener('error', async e => {   // a still that failed: a 401 means the session ended (gate), anything else gets the retry message
  const im = e.target; if (!im || im.tagName !== 'IMG' || !im.closest('.slv-media')) return;
  const box = im.closest('.slv-stage');
  try { const r = await fetch(im.src, {credentials: 'same-origin'}); if (r.status === 401) return onUnauthorized(); } catch {}
  box.querySelector('.slv-err').hidden = false; box.querySelector('.slv-media').classList.add('failed');
}, true);
document.addEventListener('click', e => {
  const b = e.target.closest('.slv-retry'); if (!b) return; e.stopPropagation();
  const box = b.closest('.slv-stage'), im = box.querySelector('.slv-media img'); box.querySelector('.slv-err').hidden = true; box.querySelector('.slv-media').classList.remove('failed');
  im.src = box.querySelector('.slv-media').dataset.src + '?r=' + Date.now();
}, true);
document.addEventListener('error', e => { const v = e.target; if (v && v.tagName === 'VIDEO' && v.closest('.slv-media')) { NOCLIP[+/lesson\/(\d)/.exec(v.src)[1]] = true; v.remove(); } }, true);   // 404 clip: keep the still
document.addEventListener('contextmenu', e => { if (e.target.closest('.slv-stage')) e.preventDefault(); });
// a slide is blurred while the window is not in front (not a security measure: the server gates by time and session)
window.addEventListener('blur', () => document.documentElement.classList.add('hid'));
window.addEventListener('focus', () => document.documentElement.classList.toggle('hid', document.hidden));
let swipe = null;   // a horizontal swipe on the stage = previous / next slide (the tap zones keep working)
document.addEventListener('pointerdown', e => { const st = e.isPrimary && e.target.closest('.slv-stage'); swipe = st ? {x: e.clientX, y: e.clientY, st} : null; });
document.addEventListener('pointerup', e => {
  if (!swipe) return; const {x, y, st} = swipe; swipe = null;
  const dx = e.clientX - x, dy = e.clientY - y, to = +st.dataset.sl + (dx < 0 ? 1 : -1);
  if (Math.abs(dx) < 50 || Math.abs(dx) < 1.5 * Math.abs(dy) || to < 1 || to > +st.dataset.max) return;
  const stop = ev => { ev.stopPropagation(); ev.preventDefault(); };   // the click that follows the swipe must not also turn the page
  document.addEventListener('click', stop, {capture: true, once: true}); setTimeout(() => document.removeEventListener('click', stop, true), 400);
  goReplace(`#/dars/${st.dataset.n}/slayd/${to}`);
});

// ---- the prep guide PDF of the current language comes from the API
function prepFileRow(){
  return `<li><a class="ef-row" href="${API}/prep/pdf?lang=${LANG}" download="${esc(t('prep.pdf_file'))}"><span><span class="sr-only">${T('common.sr_download')}</span><span class="ef-nm">${T('prep.guide_name')}</span><span class="ef-mt">${SESS?.prepPdfSize ? T('prep.pdf_meta', {size: Math.round(SESS.prepPdfSize / 1024) + ' ' + t('unit.kb')}) : T('prep.pdf')}</span></span><span class="ef-dl">${I('down', 18)}</span></a></li>`;
}

// ===================== boot =====================
(async function boot(){
  document.documentElement.lang = HTML_LANG[LANG]; applyStatic(); okina(document.body); updateLangUI();
  // the session cookie is HttpOnly, so a plain marker cookie says "worth asking": a signed-out visitor makes no request that is bound to answer 401
  if (/(?:^|; )aip_in=1/.test(document.cookie)) { try { const [j, uz] = await loadMe(); applyMe(j, uz); fillMenu(); } catch { AUTH = false; } }
  if (/^\/aip\/index\.html$/.test(location.pathname)) history.replaceState(null, '', '/aip/' + location.search);   // /aip/index.html is /aip/
  if (AUTH) seedHistory(ROUTE());
  document.body.removeAttribute('data-booting');
  render();
})();
