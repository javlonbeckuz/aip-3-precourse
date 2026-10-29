
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
  gateMsg(['gate.help']); if (idCode(gid.value).length === 6) tryLogin();
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
  undoLi = li; const rawT = li.querySelector('.tx') ? li.querySelector('.tx').dataset.raw : ''; toastT.textContent = t(hasBracket(rawT) ? 'toast.fill' : 'toast.done', {no: (li.querySelector('.no').textContent || li.dataset.t)}); document.getElementById('toast-undo').hidden = false; toast.hidden = false;
  const cpB = li.querySelector('.cp'); if (cpB) cpB.after(toast);   // right after the button, so the next Tab lands on Bekor qilish
  armToast();
}
const armToast = () => { clearTimeout(toastTimer); toastTimer = setTimeout(hideToast, 5000); };
['focusin', 'mouseenter'].forEach(ev => toast.addEventListener(ev, () => clearTimeout(toastTimer))); // paused while hovered or focused
['focusout', 'mouseleave'].forEach(ev => toast.addEventListener(ev, () => { if (!toast.hidden && !toast.matches(':hover, :focus-within')) armToast(); }));
document.getElementById('toast-undo').addEventListener('click', () => {
  const li = undoLi; if (!li) return;
  setDone(li, false); hideToast(); (li.querySelector('.cp') || li.querySelector('.chip')).focus(); refreshCounts();
  live.textContent = t('live.unmarked', {no: (li.querySelector('.no').textContent || li.dataset.t)});
});
document.addEventListener('click', async e => {
  const chip = e.target.closest('.s1 .chip');
  if (chip) {
    const li = chip.closest('li'), on = !li.classList.contains('done'), no = (li.querySelector('.no').textContent || li.dataset.t);
    setDone(li, on); refreshCounts(); on ? showToast(li) : undoLi === li && hideToast();
    live.textContent = t(on ? 'live.marked' : 'live.unmarked', {no});
    return;
  }
  const b = e.target.closest('.s1 .cp'); if (!b) return;
  const li = b.closest('li');
  const ok = await copy(li.querySelector('.tx').dataset.raw);
  if (!ok) { live.textContent = t('live.copy_failed'); flashToast('toast.copy_failed'); return; }
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
  function show(i, focus, key){
    if (i === cur) { if (focus) tabs[i].focus(); return; }
    const dir = i > cur ? 1 : -1, t = ++seq, instant = key || rm.matches || !!root.dataset.instant, old = panes[cur], nw = panes[i]; cur = i;
    root.classList.toggle('kbd', !!key);
    if (!instant) { if (ind) ind.style.willChange = 'transform'; clearTimeout(rest); rest = setTimeout(settle, 400); }
    root.style.setProperty('--i', i);
    tabs.forEach((x, k) => { x.setAttribute('aria-selected', k === i); x.tabIndex = k === i ? 0 : -1; });
    if (focus) tabs[i].focus();
    panes.forEach(p => { p.getAnimations().forEach(a => a.cancel()); if (p !== old && p !== nw) p.setAttribute('inert', ''); });
    nw.removeAttribute('inert');
    if (instant) { old.setAttribute('inert', ''); return; }
    nw.animate([{opacity: 0, transform: `translateY(${safari ? 0 : 8 * dir}px)`}, {opacity: 1, transform: 'none'}], {duration: 200, easing: EASE});
    old.animate([{opacity: 1}, {opacity: 0}], {duration: 120, easing: EASE, fill: 'forwards'}).finished.then(() => { if (t === seq || old !== panes[cur]) { old.setAttribute('inert', ''); old.getAnimations().forEach(a => a.cancel()); } }).catch(() => {});
  }
  tabs.forEach((x, i) => x.addEventListener('click', () => show(i)));
  root.querySelector('[role="tablist"]').addEventListener('keydown', e => {
    const n = tabs.length, to = {ArrowRight: (cur + 1) % n, ArrowLeft: (cur - 1 + n) % n, Home: 0, End: n - 1}[e.key]; if (to == null) return;
    e.preventDefault(); show(to, true, true);
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

// ===================== i18n: UZ (default) · RU · EN =====================
// I18N.uz is the source text, exactly as the prototype used to ship it. I18N.ru / I18N.en start EMPTY: a missing key falls back to uz
// (with a dotted underline in ?review mode, so gaps are visible). Values are plain text; "\n" is a line break; {name} are parameters.
// Plurals (ru/en only; uz has none): add "key#one", "key#few", "key#many", "key#other" next to "key"; the form is picked from params.pl (the count the noun follows).
// Keys starting with "c." are 2.0 lesson CONTENT (prompts, exercise notes, library, Hermes cards): 2.0 had those in Uzbek only
// (ux-spec §4.5: never machine-translate them), so they stay Uzbek unless an entry is added on purpose.
const I18N = {uz: {
  // --- common
  'common.close': 'Yopish', 'common.back': 'Orqaga', 'common.done': 'Bajarildi', 'common.mark_done': 'Bajarildi deb belgilash', 'common.done_hint': 'Bajarildi, bekor qilish uchun bosing',
  'common.copy': 'Nusxalash', 'common.copied': 'Nusxalandi', 'common.copy_aria': 'Nusxalash: {title}', 'common.namuna': 'namuna', 'common.sr_done': ' · bajarildi',
  'common.sr_download': 'Yuklab olish: ', 'common.sr_external': ' (yangi oynada ochiladi)', 'common.sample_file': 'namuna fayl', 'common.unknown_size': 'oʻlchami nomaʼlum', 'common.guide': 'Qoʻllanma', 'common.bonus': 'bonus',
  'common.extra': 'qoʻshimcha',
  'unit.sl': 'Slaydlar', 'unit.am': 'Amaliyot', 'unit.vz': 'Vazifa', 'unit.kt': 'Kit', 'unit.am_n': 'Amaliyot {num}', 'unit.hermes': 'Hermes {id}',
  'lesson.n': '{n}-dars', 'lesson.label': '{n}-dars · {date}', 'lesson.label0': 'Tayyorgarlik', 'lesson.meta': '{date} · {d}/{t} bajarildi',
  'steps': '{d}/{t} bajarildi', 'kind.video': 'video', 'kind.image': 'rasm',
  // --- dates (month table is in code; these are the patterns)
  'date.fmt': '{d}-{m}', 'date.until': '{date}gacha', 'date.opens': '{date}da ochiladi',
  // --- nav, menu, popup, toast, sheet, live announcements
  'nav.label': 'Boʻlimlar', 'nav.home': 'Dastur', 'nav.homebtn': 'Bosh sahifa', 'menu.label': 'Menyu', 'lang.label': 'Til',
  'menu.id': 'Shaxsiy ID', 'menu.group': 'Guruh', 'menu.group_value': 'Shanba guruhi', 'menu.course': 'Kurs', 'menu.course_value': '7 dars · 21 noy – 26 dek', 'menu.logout': 'Chiqish',
  'popup.label': 'Yangi dars', 'popup.k': 'Yangi dars ochildi', 'popup.open': 'Darsni ochish', 
  'toast.done': '{no} bajarildi', 'toast.undo': 'Bekor qilish', 'toast.notfound': 'Sahifa topilmadi',
  'lock.title': '{n} {date}da ochiladi.', 'lock.desc': 'Hermes kartalari va «Biznesda AIʼni qoʻllash» kitobi (lotin va kirill) dars kuni shu yerda chiqadi.',
  'lock.sub': '10 ta Hermes kartasi va kitob: «Biznesda AIʼni qoʻllash» (lotin va kirill)',
  'live.copied_new': 'Nusxalandi: {title}. Bajarildi. Bekor qilish tugmasi pastda.', 'live.copied': 'Nusxalandi: {title}. Bajarildi.', 'live.copy_failed': 'Nusxa olinmadi. Matnni qoʻlda belgilang.',
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
  'hero.k': 'Hozir davom etmoqda', 'hero.sub': 'Slaydlar {i} / {n} · davom etish',
  'next.k': 'Keyingi qadam', 'next.ex_prompt': 'Mashq {num} · {pid} {title}', 'next.ex': 'Mashq {num}', 'next.pick': 'Mashq 03 · {num} {title}',
  'next.vz': 'Vazifa · {pid}', 'next.sl': 'Slaydlar · {i} / {total}', 'cta.continue': 'Davom etish: {what}',
  'note.prep_todo': '{until} · {d}/4 bajarildi', 'note.done': 'Bajarildi · {d}/{t}', 'note.live_a': 'Hozir', 'note.live_b': ' davom etmoqda', 'note.live_c': ' · {d}/{t} bajarildi', 'note.open': 'Ochiq · {d}/{t} bajarildi',
  // --- prep (lesson 0)
  'prep.title': 'Birinchi darsgacha',
  'prep.meta': 'Tayyorgarlik',
  'prep.cnt': '{d}/4 bajarildi',
  'prep.pdf': 'PDF yuklab olish',
  'prep.list.k': 'Tayyorgarlik · 4 ta band',
  'prep.list.rule': 'Har bir bandni bajarganingizdan keyin belgilang.',
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  'live.prep_done': '{title} bajarildi · {d}/4',
  'live.prep_undone': '{title}: belgi olib tashlandi · {d}/4 tayyor',
  'prep.pdf_meta': 'PDF · {n} slayd · {size}',
  'hero.sub_start': 'Slaydlar · {n} ta · boshlash',
  'hero.sub_seen': 'Slaydlar koʻrildi · {n} / {n}',
  'next.prep': 'Tayyorgarlik · {title}',
  'cta.start': 'Boshlash: {what}',
  'lock.desc_n': 'Slaydlar, amaliyot, kit va vazifa dars kuni shu yerda chiqadi.',
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
  'gate.help': 'ID ni kiriting',
  'prep.intro_late': 'Birinchi dars {date} kuni boʻldi. Shu roʻyxatni imkon qadar tezroq tayyorlab qoʻying. Hammasi 30 daqiqacha vaqt oladi.',
  'part.locked': 'Hozircha yopiq',
  'part.opens': '{date}, {time} da ochiladi',
  'gate.err.rate': 'Juda koʻp urinish. {n} daqiqadan keyin qayta urinib koʻring.',
  'gate.err.offline': 'Aloqa yoʻq. Internetni tekshirib, qayta urinib koʻring.',
  'toast.save_failed': 'Saqlanmadi. Qayta urinib koʻring.',
  'menu.group_shanba': 'Shanba guruhi',
  'menu.group_yakshanba': 'Yakshanba guruhi',
  'menu.course_range': '{n} dars · {from} – {to}',
  'toast.lang_failed': 'Til oʻzgarmadi. Qayta urinib koʻring.',
  'sl.error': 'Slayd yuklanmadi',
  'sl.retry': 'Qayta urinish',
  'next.k_backlog': 'Qolib ketgan ish',
  'nb.hint': 'Yangi notebook oching va faqat shu fayllarni yuklang.',
  'nb.open': 'NotebookLMʼni ochish',
  'claude.open': 'Claudeʼni ochish',
  'toast.fill': '{no} nusxalandi. Claudeʼda [qavslar]ni oʻz maʼlumotingiz bilan almashtiring.',
  'toast.copy_failed': 'Nusxa olinmadi. Matnni bosib turing va «Nusxalash»ni tanlang.',
  
  
  
  
  'end.aria_ex': 'Mashq bajarildi deb belgilash',
  'end.aria_card': 'Karta bajarildi deb belgilash',
  'vzf.aria': 'Vazifa bajarildi deb belgilash',
  'prep.title_late': 'Tayyorgarlik',
  'prep.guide_name': 'Tayyorgarlik qoʻllanmasi',
  'book.meta_lat': 'PDF · lotin',
  'units.sl': 'Slaydlar',
  'units.am1': '4 ta mashq',
  'units.am2': 'kutubxona',
  'units.am4': 'Hermes kartalari',
  'units.vz': 'vazifa',
  'units.kt': 'kit',
  'units.and': 'va',
  'next.all_done': 'Hammasi bajarildi ✓',
  'prep.ready': 'Tayyorsiz',
  'prep.end_before': 'Tayyorsiz. Birinchi dars {date}.',
  'prep.end_after': 'Tayyorgarlik tugadi.',
  'prep.end_back': 'Dasturga qaytish',
  'date.tba': 'Sana keyinroq',
  'lock.title_tba': '{n} sanasi keyinroq eʼlon qilinadi.',
  'prep.intro_tba': 'Birinchi dars sanasini shu yerda eʼlon qilamiz. Roʻyxatni hozirdan tayyorlab qoʻying: hammasi 30 daqiqacha vaqt oladi.',
  'prep.end_tba': 'Tayyorsiz. Birinchi dars sanasi shu yerda chiqadi.',
  'menu.course_tba': '{n} dars, sanasi keyinroq',
  'menu.group_none': 'Guruh hali tanlanmagan',
  'prep.more.dflt': 'Oʻrganishda davom eting',
  'prep.lede_done': '4 qadamning hammasi bajarildi. Kerak boʻlsa, istalgan kartani qayta oching.',
  'sl.img': '{i}-slayd: {topic}',
  // --- lesson page: tabs and panes
  'tab.list': 'Dars boʻlimlari',
  'pane.sl.meta': '{n} ta slayd · {kind}', 'pane.sl.start': 'Slaydlarni koʻrish', 'pane.sl.again': 'Qayta\nkoʻrish', 'pane.sl.go': 'Davom etish\n{i} / {n}',
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
  
  'vzf.hint2': 'Yuborish shart emas.', 'vzf.on': 'Vazifa bajarildi', 'vzf.off': 'Vazifa bajarildi',
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
  'sl.close': 'Yopish', 'sl.all': 'Barcha slaydlar', 'sl.prev': 'Oldingi slayd', 'sl.next': 'Keyingi slayd', 'sl.seen': 'Koʻrildi', 'sl.ph': 'namuna slayd', 'sl.topic': '{n} · {topic}',
  'sl.note': 'Slayd rasmlari 2.0 dan koʻrinmagan (himoyalangan). Bu yerda joy tutuvchi.', 'sl.doc_title': '{i} / {n} · {n_dars}',
  // --- file screen
  'file.meta': 'Fayl', 'file.hint': 'Bu prototipda fayl yoʻq: yuklab olish 2.0 serverida ishlaydi. Qator va havolalar tekshiruv uchun shu sahifaga olib keladi.',
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
  'title.site': 'AI Praktikum 3.0', 'title.gate': 'Kirish', 'title.type': 'Shrift', 'title.all': 'Hammasi',
  // --- 3.0: six lessons, Kit, empty-lesson state
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  'lesson.5.card': 'Ishga\ntushirish',
  
  
  
  
  
  
  
  
  
  
  'lesson.6.card': 'Agentni\nyaxshilash',
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  'lesson.soon': 'Materiallar tez orada shu yerda chiqadi.',
  'note.soon': 'Ochiq · materiallar tez orada',
  'units.am': 'amaliyot',
  'amf.on': 'Amaliyot bajarildi',
  'amf.off': 'Amaliyot bajarildi',
  'amf.aria': 'Amaliyot bajarildi deb belgilash',
  'prep.cmd_copy': 'Buyruqni nusxalash', 'toast.cmd_copied': 'Buyruq nusxalandi',
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  'lesson.7.card': 'Natijalar va\ndemo kuni',
  
  
  
  
  
  
  
  'course.label': 'Kurs · {n} dars',
  'course.title': 'Barcha darslar',
  'course.sheet_t': 'Kurs: {n} ta dars',
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  'prep.btn': 'Birinchi darsgacha', 'prep.btn_aria': 'Birinchi darsgacha',
  'pre.label': 'Kursgacha materiallar',
  'pre.sub': 'Infratuzilma va HEAD platformalari',
  'pre.lede': 'Kurs boshlanishidan oldin kerak boʻladigan materiallar va HEADʼning boshqa oʻquv platformalariga havolalar.',
  'setup.title': 'Oʻrnatish va tayyorgarlik',
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
  "common.guide": "Руководство",
  "common.bonus": "бонус",
  "common.extra": "дополнительно",
  "unit.sl": "Слайды",
  "unit.am": "Практика",
  "unit.vz": "Задание",
  "unit.kt": "Kit",
  "unit.am_n": "Практика {num}",
  "unit.hermes": "Hermes {id}",
  "lesson.n": "Урок {n}",
  "lesson.label": "Урок {n} · {date}",
  "lesson.label0": "Подготовка",
  "lesson.meta": "{date} · выполнено {d}/{t}",
  "steps": "выполнено {d}/{t}",
  "kind.video": "видео",
  "kind.image": "изображения",
  "date.fmt": "{d} {m}",
  "date.until": "до {date}",
  "date.opens": "Откроется {date}",
  "nav.label": "Разделы",
  "nav.home": "Программа",
  "nav.homebtn": "Главная",
  "menu.label": "Меню",
  "lang.label": "Язык",
  "menu.id": "Личный ID",
  "menu.group": "Группа",
  "menu.group_value": "Субботняя группа",
  "menu.course": "Курс",
  "menu.course_value": "7 уроков · 21 нояб. – 26 дек.",
  "menu.logout": "Выйти",
  "popup.label": "Новый урок",
  "popup.k": "Открыт новый урок",
  "popup.open": "Открыть урок",
  "toast.done": "{no}: выполнено",
  "toast.undo": "Отменить",
  "toast.notfound": "Страница не найдена",
  "lock.title": "{n} откроется {date}.",
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
  "hero.sub": "Слайды {i} / {n} · продолжить",
  "next.k": "Следующий шаг",
  "next.ex_prompt": "Упражнение {num} · {pid} {title}",
  "next.ex": "Упражнение {num}",
  "next.pick": "Упражнение 03 · {num} {title}",
  "next.vz": "Задание · {pid}",
  "next.sl": "Слайды · {i} / {total}",
  "cta.continue": "Продолжить: {what}",
  "note.prep_todo": "{until} · выполнено {d}/4",
  "note.done": "Выполнено · {d}/{t}",
  "note.live_a": "Сейчас",
  "note.live_b": " идёт",
  "note.live_c": " · выполнено {d}/{t}",
  "note.open": "Открыт · выполнено {d}/{t}",
  "prep.title": "До первого урока",
  "prep.meta": "Подготовка",
  "prep.cnt": "{d}/4 выполнено",
  "prep.pdf": "Скачать PDF",
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
  "pane.sl.go": "Продолжить\n{i} / {n}",
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
  "vzf.hint2": "Отправлять ничего не нужно.",
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
  "sl.seen": "Просмотрено",
  "sl.ph": "образец слайда",
  "sl.topic": "{n} · {topic}",
  "sl.note": "Изображения слайдов из 2.0 не были доступны (они защищены). Здесь заглушка.",
  "sl.doc_title": "{i} / {n} · {n_dars}",
  "file.meta": "Файл",
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
  "title.gate": "Вход",
  "title.type": "Шрифт",
  "title.all": "Все экраны",
  "live.prep_done": "{title}: выполнено · {d}/4",
  "live.prep_undone": "{title}: отметка снята · {d}/4 готово",
  "prep.pdf_meta": "PDF · {n} слайда · {size}",
  "prep.pdf_meta#one": "PDF · {n} слайд · {size}",
  "prep.pdf_meta#few": "PDF · {n} слайда · {size}",
  "prep.pdf_meta#many": "PDF · {n} слайдов · {size}",
  "prep.pdf_meta#other": "PDF · {n} слайда · {size}",
  "hero.sub_start": "Слайды · {n} · начать",
  "hero.sub_seen": "Слайды просмотрены · {n} / {n}",
  "next.prep": "Подготовка · {title}",
  "cta.start": "Начать: {what}",
  "lock.desc_n": "Слайды, практика, kit и задание появятся здесь в день урока.",
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
  "prep.intro_late": "Первое занятие прошло {date}. Подготовьте этот список как можно скорее. Всё займёт около 30 минут.",
  "part.locked": "Пока закрыто",
  "part.opens": "Откроется {date} в {time}",
  "gate.err.rate": "Слишком много попыток. Повторите через {n} мин.",
  "gate.err.offline": "Нет связи. Проверьте интернет и попробуйте ещё раз.",
  "toast.save_failed": "Не сохранилось. Попробуйте ещё раз.",
  "menu.group_shanba": "Группа субботы",
  "menu.group_yakshanba": "Группа воскресенья",
  "menu.course_range": "{n} уроков · {from} – {to}",
  "toast.lang_failed": "Язык не изменился. Попробуйте ещё раз.",
  "sl.error": "Слайд не загрузился",
  "sl.retry": "Повторить",
  "next.k_backlog": "Что осталось",
  "nb.hint": "Откройте новый блокнот и загрузите только эти файлы.",
  "nb.open": "Открыть NotebookLM",
  "claude.open": "Открыть Claude",
  "toast.fill": "{no}: скопировано. В Claude замените [скобки] своими данными.",
  "toast.copy_failed": "Не удалось скопировать. Нажмите на текст, удерживайте и выберите «Копировать».",
  "end.aria_ex": "Отметить упражнение выполненным",
  "end.aria_card": "Отметить карточку выполненной",
  "vzf.aria": "Отметить задание выполненным",
  "prep.title_late": "Подготовка",
  "prep.guide_name": "Руководство по подготовке",
  "book.meta_lat": "PDF · латиница",
  "units.sl": "слайды",
  "units.am1": "4 упражнения",
  "units.am2": "библиотека",
  "units.am4": "карточки Hermes",
  "units.vz": "задание",
  "units.kt": "kit",
  "units.and": "и",
  "next.all_done": "Всё выполнено ✓",
  "prep.ready": "Вы готовы",
  "prep.end_before": "Вы готовы. Первое занятие: {date}.",
  "prep.end_after": "Подготовка завершена.",
  "prep.end_back": "Вернуться к программе",
  "prep.lede_done": "Все 4 шага выполнены. При необходимости откройте любую карточку снова.",
  "sl.img": "Слайд {i}: {topic}",
  "date.tba": "Дата будет позже",
  "lock.title_tba": "{n}: дату объявим позже.",
  "prep.intro_tba": "Дату первого занятия мы объявим здесь. Подготовьте этот список уже сейчас: всё займёт около 30 минут.",
  "prep.end_tba": "Вы готовы. Дата первого занятия появится здесь.",
  "menu.course_tba": "{n} уроков, даты позже",
  "menu.group_none": "Группа пока не выбрана",
  "prep.more.dflt": "Продолжайте учиться",
  "lesson.5.card": "Запуск\nв работу",
  "lesson.6.card": "Улучшаем\nагента",
  "lesson.soon": "Материалы скоро появятся здесь.",
  "note.soon": "Открыт · материалы скоро",
  "units.am": "практика",
  "amf.on": "Практика выполнена",
  "amf.off": "Практика выполнена",
  "amf.aria": "Отметить практику выполненной",
  "prep.cmd_copy": "Скопировать команду",
  "toast.cmd_copied": "Команда скопирована",
  "lesson.7.card": "Итоги и\nдемо-день",
  "course.label": "Курс · {n} уроков",
  "course.title": "Все уроки",
  "course.sheet_t": "Курс: {n} уроков",
  "prep.btn": "До первого урока",
  "prep.btn_aria": "До первого урока",
  "pre.label": "Материалы до курса",
  "pre.sub": "Инфраструктура и платформы HEAD",
  "pre.lede": "Материалы, которые нужны до начала курса, и ссылки на другие учебные платформы HEAD.",
  "setup.title": "Установка и подготовка"
}/*ENDRU*/, en: /*EN*/{
  "common.close": "Close",
  "common.back": "Back",
  "common.done": "Done",
  "common.mark_done": "Mark as done",
  "common.done_hint": "Done. Press to undo",
  "common.copy": "Copy",
  "common.copied": "Copied",
  "common.copy_aria": "Copy: {title}",
  "common.namuna": "sample",
  "common.sr_done": " · done",
  "common.sr_download": "Download: ",
  "common.sr_external": " (opens in a new window)",
  "common.sample_file": "sample file",
  "common.unknown_size": "size unknown",
  "common.guide": "Guide",
  "common.bonus": "bonus",
  "common.extra": "extra",
  "unit.sl": "Slides",
  "unit.am": "Practice",
  "unit.vz": "Homework",
  "unit.kt": "Kit",
  "unit.am_n": "Practice {num}",
  "unit.hermes": "Hermes {id}",
  "lesson.n": "Lesson {n}",
  "lesson.label": "Lesson {n} · {date}",
  "lesson.label0": "Preparation",
  "lesson.meta": "{date} · {d}/{t} done",
  "steps": "{d}/{t} done",
  "kind.video": "video",
  "kind.image": "images",
  "date.fmt": "{d} {m}",
  "date.until": "by {date}",
  "date.opens": "Opens on {date}",
  "nav.label": "Sections",
  "nav.home": "Program",
  "nav.homebtn": "Home",
  "menu.label": "Menu",
  "lang.label": "Language",
  "menu.id": "Personal ID",
  "menu.group": "Group",
  "menu.group_value": "Saturday group",
  "menu.course": "Course",
  "menu.course_value": "7 lessons · 21 Nov – 26 Dec",
  "menu.logout": "Sign out",
  "popup.label": "New lesson",
  "popup.k": "New lesson is open",
  "popup.open": "Open lesson",
  "toast.done": "{no} done",
  "toast.undo": "Undo",
  "toast.notfound": "Page not found",
  "lock.title": "{n} opens on {date}.",
  "lock.desc": "The Hermes cards and the book “Biznesda AIʼni qoʻllash” (Latin and Cyrillic script) will appear here on the day of the lesson.",
  "lock.sub": "10 Hermes cards and the book “Biznesda AIʼni qoʻllash” (Latin and Cyrillic)",
  "live.copied_new": "Copied: {title}. Marked done. To undo, use the button at the bottom.",
  "live.copied": "Copied: {title}. Marked done.",
  "live.copy_failed": "Couldn’t copy. Select the text by hand.",
  "live.marked": "{no} marked done.",
  "live.unmarked": "{no} is no longer marked done.",
  "live.end_on": "Marked as done.",
  "live.end_off": "Mark removed.",
  "gate.label": "Personal ID",
  "gate.title": "My\naccount",
  "gate.submit": "Sign in",
  "gate.welcome": "Welcome, {name}!",
  "gate.err.toolong": "An ID has 6 characters. Check the ID in your message again.",
  "gate.err.badchars": "IDs never contain 0, 1, I, L or O. Check it again.",
  "gate.err.short": "Enter {n} more characters.",
  "gate.err.short#one": "Enter {n} more character.",
  "gate.err.short#other": "Enter {n} more characters.",
  "gate.err.unknown_short": "An ID has 6 characters. Type {n} more.",
  "gate.err.notfound": "This ID wasn’t found. Check it with your mentor.",
  "lesson.0.card": "Setup and\npreparation",
  "lesson.1.card": "How AI\nworks",
  "lesson.2.card": "Introduction",
  "lesson.3.card": "Claude\nCode",
  "lesson.4.card": "API and\nMCP",
  "home.title": "Program",
  "home.lessons": "Lessons",
  "home.ring.label": "Lessons fully completed",
  "home.ring.valuetext": "Lessons fully completed: {d} of {t}.",
  "home.ring.ps": "Lessons fully completed",
  "hero.k": "In progress now",
  "hero.sub": "Slides {i} / {n} · continue",
  "next.k": "Next step",
  "next.ex_prompt": "Exercise {num} · {pid} {title}",
  "next.ex": "Exercise {num}",
  "next.pick": "Exercise 03 · {num} {title}",
  "next.vz": "Homework · {pid}",
  "next.sl": "Slides · {i} / {total}",
  "cta.continue": "Continue: {what}",
  "note.prep_todo": "{until} · {d}/4 done",
  "note.done": "Done · {d}/{t}",
  "note.live_a": "Now",
  "note.live_b": " in progress",
  "note.live_c": " · {d}/{t} done",
  "note.open": "Open · {d}/{t} done",
  "prep.title": "Before the first lesson",
  "prep.meta": "Preparation",
  "prep.cnt": "{d}/4 done",
  "prep.pdf": "Download PDF",
  "prep.list.k": "Preparation · 4 items",
  "prep.list.rule": "Mark each item once you’ve done it.",
  "tab.list": "Lesson sections",
  "pane.sl.meta": "{n} slides · {kind}",
  "pane.sl.meta#one": "{n} slide · {kind}",
  "pane.sl.meta#other": "{n} slides · {kind}",
  "pane.sl.start": "View the slides",
  "pane.sl.again": "Watch\nagain",
  "pane.sl.go": "Continue\n{i} / {n}",
  "pane.am1.label": "In class",
  "pane.am1.meta": "{d}/4 core exercises done",
  "pane.am1.page": "Practice\npage",
  "pane.am2.label": "Library\n5 sections · 47 prompts",
  "pane.am2.done": "You used the library.",
  "pane.am2.todo": "Copy any prompt: the practice counts as done.",
  "pane.am2.open": "Open the\nlibrary",
  "pane.am4.label": "Hermes agent\n9 cards + bonus",
  "pane.am4.page": "Cards\npage",
  "pane.vz1.label": "At home\nThe “Ravon Uy” case",
  "pane.vz1.sub": "prompts done. One at a time in NotebookLM.",
  "pane.vz1.page": "Homework page",
  "pane.vz1.go": "Continue\nHomework · {pid}",
  "pane.vz1.open": "Open\nprompts",
  "pane.vz.label": "At home\nFree project",
  "pane.kt.label": "{title}",
  "lesson.sheetpdf": "Prompt sheet\nP1–P8, Q1–Q5 · PDF",
  "row.mark": "{d}/{t} prompts",
  "row.mark#one": "{d}/{t} prompt",
  "row.mark#other": "{d}/{t} prompts",
  "ex.sub_03a": "03A done · 03B optional",
  "ex.sub_03b": "03B done · 03A optional",
  "vz1.title": "Homework",
  "vz1.meta": "NotebookLM exercise",
  "vz1.lede": "The “Ravon Uy” case: download the sources, then run the prompts one at a time.",
  "vz1.cnt": "{d}/{t} core done",
  "vz1.cnt#one": "{d}/{t} core done",
  "vz1.cnt#other": "{d}/{t} core done",
  "vz1.pdf": "PDF version",
  "vz1.sheet.h1": "Prompts",
  "vz1.sheet.k": "Core prompts · {d}/{t} done",
  "lbl.manba": "Source:",
  "vzf.hint2": "Nothing to submit.",
  "vzf.on": "Homework done",
  "vzf.off": "Homework done",
  "am1.meta": "Practice · {d}/4 core exercises done",
  "am1.g_core": "Core exercises",
  "am1.g_extra": "Extra",
  "am1.g_extra_hint": "If you have time left in class or at home.",
  "am1.g_closing": "Final file",
  "pick.meta": "Exercise 03",
  "pick.group": "Pick one",
  "pick.title": "Pick one: A or B",
  "pick.lede": "Pick one of the two. Finishing one counts as finishing the exercise; the other is optional.",
  "pick.done_sfx": " · done",
  "ex.meta": "Exercise {num}",
  "ex.meta_extra": "Exercise {num} · {extra}",
  "ex.back": "Practice",
  "ex.back_pick": "03 · Pick one",
  "ex.g1": "1 · Read first",
  "ex.g2": "2 · Upload to NotebookLM",
  "ex.k": "Prompts · {d}/{t} done",
  "ex.rule": "Fill in the [brackets] yourself.",
  "lbl.where": "Paste into:",
  "ex.pdf": "PDF version · {size}",
  "end.done": "Done",
  "end.mark": "Mark as done",
  "ex.next": "Next exercise\n{num} · {title}",
  "ex.index": "Practice\npage",
  "lib.meta": "Practice",
  "lib.title": "Prompt library",
  "lib.lede": "47 ready-made prompts in 5 sections. Pick the section that fits your work.",
  "lib.search": "Search prompts",
  "lib.sections": "Sections",
  "lib.k": "Prompts · 47",
  "lib.found": "{n} results",
  "lib.found#one": "{n} result",
  "lib.found#other": "{n} results",
  "lib.empty": "Nothing found. Try another word.",
  "lib.clear": "Clear",
  "lib.rules": "Rules (4)",
  "lib.finish_on": "Practice finished",
  "lib.finish_off": "Finish practice",
  "hi.meta": "Practice · {d}/9 cards done",
  "hi.title": "Hermes agent",
  "hi.group": "Cards",
  "hc.meta": "{id} / 09",
  "hc.meta_bonus": "Bonus",
  "hc.next": "Next card\n{id} · {title}",
  "hc.index": "Cards\npage",
  "book.cyr_extra": "PDF · Cyrillic",
  "sl.close": "Close",
  "sl.all": "All slides",
  "sl.prev": "Previous slide",
  "sl.next": "Next slide",
  "sl.seen": "Viewed",
  "sl.ph": "sample slide",
  "sl.topic": "{n} · {topic}",
  "sl.note": "Slide images from 2.0 weren’t available (they’re protected). This is a placeholder.",
  "sl.doc_title": "{i} / {n} · {n_dars}",
  "file.meta": "File",
  "file.hint": "There’s no file in this prototype: downloads work on the 2.0 server. Rows and links lead to this page for review.",
  "ns.text": "Sample text: the real text of this prompt wasn't visible in the 2.0 data. It will be added here later.",
  "ns.text_qimmat": "Sample text: if they say “too expensive” (qimmat), clarify that answer for your [Industry]. The real text wasn't visible in the 2.0 data.",
  "ns.prompt": "Prompt {n}",
  "ns.rule": "Rule {n}",
  "ns.q_title": "{id} title",
  "ns.source": "source name (sample)",
  "ns.footnote": "the footnote text at the end of the page wasn’t visible in the 2.0 data.",
  "ns.natija": "Result: sample (not visible in the 2.0 data).",
  "ns.note": "Sample note: not visible in the 2.0 data.",
  "ns.note_02": "Sample note: this exercise’s note wasn’t visible in the 2.0 data.",
  "ns.note_04": "Sample note: the 2.0 data has no title for exercise 04, only the category “Marketing”.",
  "ns.lead": "Upload your company documents to NotebookLM and work from them. In each exercise: upload the files, then copy the prompts.",
  "tag.home": "Home: Program",
  "tag.prep": "Preparation (2.0: 4 items, PDF)",
  "tag.lesson": "Lesson {n} page (sections: {parts})",
  "tag.vz1": "Homework: “Ravon Uy” (3 steps)",
  "tag.vz1sheet": "Homework prompts (P1–P8, Q1–Q5)",
  "tag.am1": "Practice (rule, guide, exercises, final file)",
  "tag.pick": "03 · Pick one (03A / 03B)",
  "tag.ex": "Exercise {num}: {title}",
  "tag.lib": "47-prompt library (search + 5 sections)",
  "tag.hi": "Hermes: 9 cards + bonus",
  "tag.hc": "Hermes {id}: {title}",
  "tag.slide": "Slide viewer ({n} slides, sample)",
  "tag.file": "File (sample)",
  "title.lesson": "Lesson {n} · {title}",
  "title.ex": "{num} · {title}",
  "title.vz": "Homework · lesson {n}",
  "title.am": "Practice · lesson {n}",
  "title.pick": "03 · Pick one",
  "title.vzsheet": "Homework prompts",
  "title.site": "AI Praktikum 3.0",
  "title.gate": "Sign in",
  "title.type": "Typeface",
  "title.all": "All screens",
  "live.prep_done": "{title}: done · {d}/4",
  "live.prep_undone": "{title}: mark removed · {d}/4 done",
  "prep.pdf_meta": "PDF · {n} slides · {size}",
  "prep.pdf_meta#one": "PDF · {n} slide · {size}",
  "prep.pdf_meta#other": "PDF · {n} slides · {size}",
  "hero.sub_start": "Slides · {n} · start",
  "hero.sub_seen": "Slides seen · {n} / {n}",
  "next.prep": "Preparation · {title}",
  "cta.start": "Start: {what}",
  "lock.desc_n": "The slides, practice, kit and homework will appear here on the day of the lesson.",
  "lib.back": "Sections",
  "lib.sect_meta": "Prompts {range}",
  "lib.next": "Next section\n{num} · {title}",
  "lib.index": "Section\nlist",
  "lib.cnt": "{d}/{t} prompts done",
  "lib.cnt#one": "{d}/{t} prompt done",
  "lib.cnt#other": "{d}/{t} prompts done",
  "pane.vz1.begin": "Start\nhomework",
  "sl.back_lesson": "Back to\nthe lesson",
  "vz1.sheet.back": "Homework\npage",
  "vz1.sheet.next": "Next step\n{what}",
  "end.done_ex": "Exercise done",
  "end.mark_ex": "Exercise done",
  "end.done_card": "Card done",
  "end.mark_card": "Card done",
  "prep.steps_n": "{n} steps",
  "prep.steps_n#one": "{n} step",
  "prep.steps_n#other": "{n} steps",
  "book.lat_name": "Latin script",
  "gate.help": "Enter your ID",
  "prep.intro_late": "The first lesson was on {date}. Get this list ready as soon as you can. It takes about 30 minutes in all.",
  "part.locked": "Not open yet",
  "part.opens": "Opens on {date} at {time}",
  "gate.err.rate": "Too many attempts. Try again in {n} min.",
  "gate.err.offline": "No connection. Check your internet and try again.",
  "toast.save_failed": "Not saved. Try again.",
  "menu.group_shanba": "Saturday group",
  "menu.group_yakshanba": "Sunday group",
  "menu.course_range": "{n} lessons · {from} – {to}",
  "toast.lang_failed": "The language did not change. Try again.",
  "sl.error": "The slide did not load",
  "sl.retry": "Try again",
  "next.k_backlog": "Still to do",
  "nb.hint": "Open a new notebook and upload only these files.",
  "nb.open": "Open NotebookLM",
  "claude.open": "Open Claude",
  "toast.fill": "{no} copied. In Claude, replace the [brackets] with your own details.",
  "toast.copy_failed": "Could not copy. Press and hold the text, then choose “Copy”.",
  "end.aria_ex": "Mark the exercise done",
  "end.aria_card": "Mark the card done",
  "vzf.aria": "Mark the homework done",
  "prep.title_late": "Preparation",
  "prep.guide_name": "Preparation guide",
  "book.meta_lat": "PDF · Latin",
  "units.sl": "slides",
  "units.am1": "4 exercises",
  "units.am2": "the library",
  "units.am4": "Hermes cards",
  "units.vz": "homework",
  "units.kt": "kit",
  "units.and": "and",
  "next.all_done": "All done ✓",
  "prep.ready": "You're ready",
  "prep.end_before": "You're ready. The first lesson is on {date}.",
  "prep.end_after": "Preparation is complete.",
  "prep.end_back": "Back to the program",
  "prep.lede_done": "All 4 steps are done. Open any card again if you need it.",
  "sl.img": "Slide {i}: {topic}",
  "date.tba": "Date to follow",
  "lock.title_tba": "{n}: the date will be announced later.",
  "prep.intro_tba": "We will post the date of the first lesson here. Get this list ready now: it takes about 30 minutes in all.",
  "prep.end_tba": "You're ready. The date of the first lesson will appear here.",
  "menu.course_tba": "{n} lessons, dates to follow",
  "menu.group_none": "Group not set yet",
  "prep.more.dflt": "Keep learning",
  "lesson.5.card": "Ship\nit",
  "lesson.6.card": "Improve\nthe agent",
  "lesson.soon": "The materials will appear here soon.",
  "note.soon": "Open · materials soon",
  "units.am": "practice",
  "amf.on": "Practice done",
  "amf.off": "Practice done",
  "amf.aria": "Mark the practice as done",
  "prep.cmd_copy": "Copy the command",
  "toast.cmd_copied": "Command copied",
  "lesson.7.card": "Results and\ndemo day",
  "course.label": "Course · {n} lessons",
  "course.title": "All lessons",
  "course.sheet_t": "Course: {n} lessons",
  "prep.btn": "Before the first lesson",
  "prep.btn_aria": "Before the first lesson",
  "pre.label": "Materials before the course",
  "pre.sub": "Infrastructure and HEAD platforms",
  "pre.lede": "Materials you need before the course starts, and links to the other HEAD learning platforms.",
  "setup.title": "Setup and preparation"
}/*ENDEN*/};
const LANGS = ['uz', 'ru', 'en'], HTML_LANG = {uz: 'uz-Latn', ru: 'ru', en: 'en'};
const MONTHS = { // lesson dates (the demo group meets 12, 19, 26 Sep and 3 Oct); ru = genitive
  uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']};
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

/*ART:begin*/ const PREP_ART = ["<svg class=\"ill\" viewBox=\"0 0 300 300\" aria-hidden=\"true\" focusable=\"false\"><rect class=\"s\" x=\"18\" y=\"204\" width=\"264\" height=\"26\" rx=\"10\" fill=\"#E0E0E0\"/><path d=\"M122 204h56v4a8 8 0 0 1-8 8h-40a8 8 0 0 1-8-8z\" fill=\"#000\"/><g class=\"l-lid\"><rect x=\"46\" y=\"48\" width=\"208\" height=\"156\" rx=\"14\" fill=\"#000\"/><rect x=\"58\" y=\"60\" width=\"184\" height=\"132\" rx=\"6\" fill=\"#0A14FC\"/><rect class=\"s\" x=\"70\" y=\"72\" width=\"160\" height=\"108\" rx=\"8\" fill=\"#fff\"/><rect x=\"84\" y=\"86\" width=\"70\" height=\"8\" rx=\"4\" fill=\"#E0E0E0\"/><rect x=\"84\" y=\"100\" width=\"44\" height=\"8\" rx=\"4\" fill=\"#E0E0E0\"/><text x=\"84\" y=\"138\" font-size=\"22\" fill=\"#000\">5 GB</text><rect x=\"191.2\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#E0E0E0\"/><rect x=\"204.6\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#E0E0E0\"/><rect x=\"84.0\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"97.4\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"110.8\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"124.2\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"137.6\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"151.0\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"164.4\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><rect x=\"177.8\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#000\"/><g class=\"l-free\"><rect x=\"191.2\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#FDC959\" stroke=\"#000\" stroke-width=\"3\"/><rect x=\"204.6\" y=\"148\" width=\"11\" height=\"20\" rx=\"3\" fill=\"#FDC959\" stroke=\"#000\" stroke-width=\"3\"/></g></g><g transform=\"translate(278 22)\"><g class=\"badge\"><circle r=\"16\" fill=\"#000\"/><path d=\"M-7 0.5l5 5 9-10\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></g></svg>", "<svg class=\"ill\" viewBox=\"0 0 300 300\" aria-hidden=\"true\" focusable=\"false\"><g class=\"g-card\"><rect class=\"s\" x=\"92\" y=\"22\" width=\"116\" height=\"150\" rx=\"12\" fill=\"#E0E0E0\"/><rect x=\"108\" y=\"40\" width=\"72\" height=\"9\" rx=\"4.5\" fill=\"#000\"/><rect x=\"108\" y=\"56\" width=\"48\" height=\"9\" rx=\"4.5\" fill=\"#000\"/><rect x=\"108\" y=\"82\" width=\"84\" height=\"24\" rx=\"12\" fill=\"#0A14FC\"/><g class=\"g-tick\"><path d=\"M141 94l6 6 12-12\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></g><g class=\"g-env\"><rect class=\"s\" x=\"66\" y=\"130\" width=\"168\" height=\"142\" rx=\"22\" fill=\"#fff\"/><path d=\"M150.0 160.0A40 40 0 0 0 113.7 183.1\" fill=\"none\" stroke=\"#EA4335\" stroke-width=\"26\"/><path d=\"M113.7 183.1A40 40 0 0 0 115.4 220.0\" fill=\"none\" stroke=\"#FBBC04\" stroke-width=\"26\"/><path d=\"M115.4 220.0A40 40 0 0 0 178.3 228.3\" fill=\"none\" stroke=\"#34A853\" stroke-width=\"26\"/><path d=\"M178.3 228.3A40 40 0 0 0 190.0 201.4\" fill=\"none\" stroke=\"#4285F4\" stroke-width=\"26\"/><path d=\"M150.0 160.0A40 40 0 0 1 181.5 175.4\" fill=\"none\" stroke=\"#4285F4\" stroke-width=\"26\"/><rect x=\"150\" y=\"187\" width=\"53\" height=\"26\" fill=\"#4285F4\"/></g><g transform=\"translate(278 22)\"><g class=\"badge\"><circle r=\"16\" fill=\"#000\"/><path d=\"M-7 0.5l5 5 9-10\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></g></svg>", "<svg class=\"ill\" viewBox=\"0 0 300 300\" aria-hidden=\"true\" focusable=\"false\"><g class=\"c-win\"><rect x=\"32\" y=\"44\" width=\"236\" height=\"204\" rx=\"14\" fill=\"#000\"/><circle cx=\"50\" cy=\"57\" r=\"4\" fill=\"#E0E0E0\"/><circle cx=\"64\" cy=\"57\" r=\"4\" fill=\"#E0E0E0\"/><circle cx=\"78\" cy=\"57\" r=\"4\" fill=\"#E0E0E0\"/><path d=\"M38 70h224v164a8 8 0 0 1-8 8H46a8 8 0 0 1-8-8z\" fill=\"#fff\"/><rect x=\"146\" y=\"82\" width=\"104\" height=\"30\" rx=\"15\" fill=\"#000\"/><rect x=\"162\" y=\"93\" width=\"62\" height=\"8\" rx=\"4\" fill=\"#fff\"/><g class=\"c-reply\"><rect class=\"s\" x=\"48\" y=\"128\" width=\"52\" height=\"52\" rx=\"13\" fill=\"#D97757\"/><polygon points=\"74.0,132.0 75.8,147.2 83.0,138.4 78.9,149.1 93.1,143.0 80.8,152.2 93.0,154.0 80.8,155.8 93.1,165.0 78.9,158.9 83.0,169.6 75.8,160.8 74.0,176.0 72.2,160.8 64.5,170.5 69.1,158.9 54.9,165.0 67.2,155.8 56.0,154.0 67.2,152.2 54.9,143.0 69.1,149.1 64.5,137.5 72.2,147.2\" fill=\"#fff\"/><rect x=\"112\" y=\"130\" width=\"128\" height=\"12\" rx=\"6\" fill=\"#E0E0E0\"/><rect x=\"112\" y=\"150\" width=\"108\" height=\"12\" rx=\"6\" fill=\"#E0E0E0\"/><rect x=\"112\" y=\"170\" width=\"72\" height=\"12\" rx=\"6\" fill=\"#E0E0E0\"/></g><rect x=\"54\" y=\"204\" width=\"192\" height=\"26\" rx=\"13\" fill=\"#E0E0E0\"/><circle cx=\"231\" cy=\"217\" r=\"8\" fill=\"#000\"/></g><g transform=\"translate(278 22)\"><g class=\"badge\"><circle r=\"16\" fill=\"#000\"/><path d=\"M-7 0.5l5 5 9-10\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></g></svg>", "<svg class=\"ill\" viewBox=\"0 0 300 300\" aria-hidden=\"true\" focusable=\"false\"><g class=\"w-win\"><rect x=\"32\" y=\"44\" width=\"236\" height=\"204\" rx=\"14\" fill=\"#000\"/><circle cx=\"50\" cy=\"57\" r=\"4\" fill=\"#E0E0E0\"/><circle cx=\"64\" cy=\"57\" r=\"4\" fill=\"#E0E0E0\"/><circle cx=\"78\" cy=\"57\" r=\"4\" fill=\"#E0E0E0\"/><path d=\"M38 70h224v164a8 8 0 0 1-8 8H46a8 8 0 0 1-8-8z\" fill=\"#0A14FC\"/><path d=\"M52 83l9 9-9 9\" fill=\"none\" stroke=\"#FDC959\" stroke-width=\"5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><text x=\"72\" y=\"98\" font-size=\"19\" fill=\"#fff\">claude</text><g class=\"w-reply\"><rect class=\"s\" x=\"50\" y=\"120\" width=\"200\" height=\"100\" rx=\"12\" fill=\"#fff\"/><rect x=\"66\" y=\"140\" width=\"150\" height=\"11\" rx=\"5.5\" fill=\"#E0E0E0\"/><rect x=\"66\" y=\"162\" width=\"112\" height=\"11\" rx=\"5.5\" fill=\"#E0E0E0\"/><rect x=\"66\" y=\"184\" width=\"132\" height=\"11\" rx=\"5.5\" fill=\"#E0E0E0\"/></g></g><g transform=\"translate(278 22)\"><g class=\"badge\"><circle r=\"16\" fill=\"#000\"/><path d=\"M-7 0.5l5 5 9-10\" fill=\"none\" stroke=\"#fff\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></g></svg>"]; /*ART:end*/   // the four animated pictures of prep option C (UI, not content)

let C20 = {};   // filled from GET /me (app_state.js): the bundle holds no lesson text
const PREP_CMDS = {3: {1: 'curl -fsSL https://claude.ai/install.sh | bash', 2: 'irm https://claude.ai/install.ps1 | iex'}};   // prep item 4: step index -> the command shown (and copyable) under that step
let PARTS = {};   // lesson number -> {am|kt|vz: {text, groups: [{title, note, files}]}}: the shape the lesson page reads
const FC = (f, ph, slug) => f ? F(f.name, f.size, ph, slug || f.slug, f.url) : null;   // file from the demo / API: name + size (+ url in the app), never a server path
function buildData(){
  FILES = {}; PARTS = {};
  Object.entries((C20 && C20.parts) || {}).forEach(([n, o]) => { PARTS[n] = {}; const used = new Set();   // progress ids of the prompt rows: unique inside a lesson, 1-8 letters or digits ("P{index}" when the id is empty)
    Object.entries(o).forEach(([k, b]) => {
      PARTS[n][k] = {text: b.text || '', groups: (b.groups || []).map(g => ({title: g.title || '', note: g.note || '', files: (g.files || []).map(f => FC(f, f.ph)),
        prompts: (g.prompts || []).map((q, j) => { const id = (String(q.id || '').replace(/[^A-Za-z0-9]/g, '') || 'P' + (j + 1)).slice(0, 8); let kid = id, c = 2; while (used.has(kid)) kid = id.slice(0, 6) + c++; used.add(kid);
          return {id: q.id || '', kid, title: q.title || '', target: q.target || '', text: q.text || ''}; })}))}; }); });
}
let SAMPLE_FILES = false, C20_TRANSLATED = false;   // prototype: the demo files are marked samples; the real app has none
buildData();



// ---- the Uzbek lesson text goes into I18N.uz as "c.p.*" keys (so the whole text of the prototype is in one dictionary)
function registerContent(){
  const set = (k, v) => { if (typeof v === 'string') I18N.uz[k] = v; };
  Object.entries(PARTS).forEach(([n, o]) => Object.entries(o).forEach(([k, b]) => {
    set(`c.p.${n}.${k}.text`, b.text); b.groups.forEach((g, i) => { set(`c.p.${n}.${k}.g${i}`, g.title); set(`c.p.${n}.${k}.g${i}.n`, g.note);
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
  marker(false);
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
const courseStarted = () => !!(LESSONS[1] && LESSONS[1].open);
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
const fileLabel = f => { const ext = (f.name.split('.').pop() || '').toUpperCase(); return f.size < 1024 ? `${ext} · ${f.size} B` : f.size < 1048576 ? `${ext} · ${(f.size / 1024).toFixed(1).replace('.', ',')} KB` : `${ext} · ${(f.size / 1048576).toFixed(1).replace('.', ',')} MB`; };
const fo = (n, f) => f ? {slug: sid(f.slug), name: f.name, size: fileLabel(f), url: `${API}/lesson/${n}/doc/${encodeURIComponent(f.slug)}`} : null;   // name + size + the download URL; the server path never reaches the client

function makeC20(by){   // the open blocks of each lesson (Amaliyot, Kit, Vazifa) in the shape buildData() reads
  const parts = {};
  for (const l of Object.values(by)) {
    if (l.n < 1) continue;
    for (const [k, key] of [['am', 'amaliyot'], ['kt', 'kit'], ['vz', 'vazifa']]) {
      const b = l[key]; if (!b || typeof b !== 'object') continue;
      (parts[l.n] ??= {})[k] = {text: b.text || '', groups: (b.groups || []).map(g => ({title: g.title || '', note: g.note || '', files: (g.files || []).map(f => fo(l.n, f)),
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
    L[n] = {n, num: l.num !== undefined ? l.num : l.n, d: dOf(l), open: !!l.open, at: l.open ? null : (l.start || null), lock, parts, slides: l.slideCount || 0, kind: l.slideKind || 'image', topics: (l.topics || []).length};
  }
  LESSONS = L;
  const D = I18N[LANGS.includes(lang) ? lang : LANG];   // platform text of the payload's language (lesson metadata and the prep checklist come translated from the API)
  for (const l of lessons) { const n = l.n; D[`lesson.${n}.title`] = l.title; D[`lesson.${n}.sub`] = l.subtitle; D[`lesson.${n}.lede`] = l.summary; (l.topics || []).forEach((x, i) => { D[`lesson.${n}.t${i}`] = x; }); }
  const pr = by[0] && by[0].prep;
  if (pr) {
    const acts = it => (it.actions || []).filter(a => /^https:\/\//.test(a.url));   // only https links leave the portal
    PREP = {items: pr.items.map(it => ({steps: it.steps.length, actions: acts(it).map(a => ({url: a.url, quiet: !!a.quiet})), foot: !!it.footnote}))};
    D['prep.intro'] = pr.intro.replace('{sana}', '{date}');
    pr.items.forEach((it, i) => { D[`prep.${i}.title`] = it.title; D[`prep.${i}.note`] = it.note; it.steps.forEach((s, j) => { D[`prep.${i}.s${j}`] = s; }); acts(it).forEach((a, j) => { D[`prep.${i}.a${j}`] = a.label; }); if (it.footnote) D[`prep.${i}.foot`] = it.footnote; });
  }
  const mo = pr && pr.more, ml = mo && Array.isArray(mo.links) ? mo.links.filter(x => x && /^https:\/\//.test(x.url)) : [];   // external learning platforms: links only, never counted as prep
  PREP.more = ml.length ? {links: ml.map(x => ({url: x.url}))} : null;
  if (PREP.more) {
    const dflt = (I18N[lang] || I18N.uz)['prep.more.dflt'] || I18N.uz['prep.more.dflt'];   // the payload's language, not the UI's: never a blank heading or pill
    D['prep.more.title'] = mo.title || dflt; D['prep.more.note'] = mo.note || '';
    ml.forEach((x, i) => { D[`prep.more.${i}.t`] = x.title || x.url; D[`prep.more.${i}.n`] = x.note || ''; });
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
const LCOL = ['claude', 'lilac', 'grey', 'blue', 'dark', 'orange', 'emerald', 'cream'];
const LN = () => Object.keys(LESSONS).map(Number).filter(n => n > 0).sort((a, b) => a - b);   // the lesson numbers 1..N come from the data (the API in the app)
const lnum = n => LESSONS[n].num;   // the curriculum number 1..N, or null: Tayyorgarlik and Kirish have none (their label is their short name)
const RN = () => LN().filter(n => lnum(n) != null);   // the numbered lessons: only these count in the ring, the course size and the all-done check
const lnT = n => lnum(n) == null ? ltitle(n) : t('lesson.n', {n: num2(lnum(n))});   // "01-dars" / "Урок 01" / "Lesson 01", or "Kirish"
const lnH = n => esc(lnT(n));
const lessonLabel = n => lnum(n) == null ? `${esc(ltitle(n))} · ${esc(lessonDate(n))}` : T('lesson.label', {n: num2(lnum(n)), date: lessonDate(n)});
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
  const what = esc(u.label) + (u.kind === 'sl' ? ` · ${S.sl(n)} / ${LESSONS[n].slides}` : '');   // what / label are HTML; started = the target already has progress ("continue" vs "start")
  return {what, label: `${lnH(n)} · ${what}`, href: u.href, started: u.kind === 'sl' && S.sl(n) > 0};
}
const nextStep = () => { const live = liveLesson();
  if (courseStarted() && PREP.items.length > 3) { const i = [1, 2, 3].find(j => !S.has('prep:' + j)); if (i != null) return {href: '#/dars/0', label: T('next.prep', {title: HT(T(`prep.${i}.title`))})}; }   // the Google account, Claude and Warp are what lesson 1 needs
  return LN().filter(n => !isLocked(n) && n !== live).map(nextOf).find(Boolean) || null; }; // the live lesson is the hero card, so it is not repeated here
// live counters shown on the open page ("k/t"): one formatter for the templates and for refreshCounts()
function cntText(type){
  if (type === 'prep') return t('prep.cnt', {d: prepCount(), pl: 4});
  return '';
}
const cnt = (type, id = '') => `<span data-cnt="${type}${id ? ':' + id : ''}">${esc(cntText(type, id))}</span>`;


// ---- small helpers
const I = (id, w = 16) => `<svg width="${w}" height="${w}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const NSTAG = () => '';   // no sample markers in the real app
const SRCHK = () => I('check', 12) + `<span class="sr-only">${T('common.sr_done')}</span>`;
const mark = s => s.split(/(`[^`]*`)/).map((part, i) => i % 2 ? `<code>${part.slice(1, -1)}</code>` : part.replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>')).join('');   // [fill-in] marks, but never inside a `code span` (a literal value there is not a placeholder)
const hasBracket = s => /\[[^\]]+\]/.test(String(s).replace(/`[^`]*`/g, ''));
const back = (href, label) => `<a class="eyebrow" href="${href}">${I('back')}${label}</a>`;
// "Birinchi darsgacha" (materials before the course) lives in the header once the course has started (before it, it is the hero card on the home page): a yellow pill on desktop, a round icon button on phones
const prepBtn = active => courseStarted() ? `<a class="prep-btn" href="#/kursgacha" aria-label="${esc(t('prep.btn_aria'))}"${active === 'pre' ? ' aria-current="page"' : ''}><span class="pb-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2.5h8.5A1.5 1.5 0 0 1 21 9v8.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z"/></svg></span><span class="pb-t">${T('prep.btn')}</span></a>` : '';
const nav = active => `<header class="nav">
  <nav class="nav-links" aria-label="${esc(t('nav.label'))}"><a class="home-btn" href="#/dastur" aria-label="${esc(t('nav.homebtn'))}" title="${esc(t('nav.homebtn'))}"${active === 'home' ? ' aria-current="page"' : ''}>${I('home', 20)}</a></nav>
  <span class="wordmark">AI Praktikum 3.0</span>
  <div class="nav-r">${prepBtn(active)}<button class="nav-name" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="nmenu">${esc(STUDENT)}</button><button class="menu-btn" type="button" aria-label="${esc(t('menu.label'))}" aria-haspopup="dialog" aria-expanded="false" aria-controls="nmenu">${I('menu', 20)}</button></div>
</header>`;
// one prompt row of the lilac list: copy = done (+ undo), a "Qayerga:" / "Manba:" target, the full text; ticks persist in S
// o.title / o.text are plain (data-t, aria, copy); o.titleH / o.whereH / o.textH are the escaped HTML of the same values
function pli(o){
  const done = S.has(o.key);
  return `<li class="${done ? 'done' : ''}${o.no === '' ? ' nonum' : ''}" data-i="${o.i}" data-pid="${o.pid}" data-key="${o.key}" data-t="${esc(o.title)}"><span class="no" aria-hidden="true">${o.no}</span>
    <div class="body"><h3 class="tt" tabindex="-1">${o.titleH}${o.ph ? NSTAG() : ''}</h3>${o.where ? `<p class="to strong"><b>${T(o.lbl)}</b> ${o.whereH}</p>` : ''}<p class="tx" data-raw="${esc(o.text)}">${o.textH}</p></div>
    <div class="cpw"><button class="cp" type="button" aria-label="${esc(t('common.copy_aria', {title: o.title}))}"><span class="cp-c">${I('copy', 20)}</span><span class="cpl">${T('common.copy')}</span></button></div></li>`;
}
const sizeT = z => LANG === 'en' ? z.replace(/(\d),(\d)/g, '$1.$2') : z;   // file sizes are stored with the Uzbek/Russian decimal comma; English reads 21.1 KB
const fsize = f => f.size ? sizeT(f.size) : t('common.sample_file');
const fileMeta = (f, extra) => [extra ? `<span class="sent">${extra.html ?? esc(extra)}</span>` : '', f.size ? esc(sizeT(f.size)) : ''].filter(Boolean).join(' · ');
const fa = f => f.url ? `href="${esc(f.url)}" target="_blank" rel="noopener noreferrer"` : `href="#/fayl/${f.slug}"`;   // the prototype opens a file page, the app downloads from the API
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
  const [rd, rt] = ring(), ns = nextStep(), live = liveLesson(), pre = !courseStarted(), k = prepCount();
  const fxH = cls => `<span class="fx ${cls}" aria-hidden="true"><i></i><i></i><i></i></span>`;   // the back panel of the 3D folder: its tab and three paper sheets (they only move on hover, focus and press)
  const courseCard = () => `<li class="g-course fo"><button class="folder c-course" type="button" aria-haspopup="dialog" data-sheet="lock-sheet" data-lock="course"><span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span><span class="f-top"><span class="f-label">${T('course.label', {n: RN().length, pl: RN().length})}</span></span>
        <span class="f-row"><span class="f-title">${T('course.title')}</span><span class="f-note">${I('lock', 14)}${T(LESSONS[1].d ? 'date.opens' : 'date.tba', {date: lessonDate(1)})}</span></span></button>${fxH('c-course')}</li>`;
  const flagH = n => LCOL[n] === 'cream' ? '<svg class="f-flag" aria-hidden="true"><use href="#i-flag"/></svg>'   // the finish flag of the last lesson: decorative, bottom right, in every state
    : lnum(n) === 1 ? '<svg class="f-flag f-start" viewBox="0 0 100 34" aria-hidden="true"><use href="#i-start"/><text x="50" y="15.5" text-anchor="middle">START</text></svg>' : '';   // its twin on lesson 01: two flags with START between
  const cardHTML = n => {
    const tab = `<span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span>`, arrow = `<svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg>`;
    const label = n === 0 ? T('lesson.label0') : lessonLabel(n);
    let note, href = `#/dars/${n}`;
    if (n === 0) { note = k === 4 ? `${I('check', 14)}${T('note.done', {d: 4, t: 4, pl: 4})}` : courseStarted() ? T('note.open', {d: k, t: 4, pl: 4}) : !LESSONS[0].d ? T('prep.cnt', {d: k, pl: 4}) : T('note.prep_todo', {until: t('date.until', {date: lessonDate(0)}), d: k, pl: 4}); }
    else if (isLocked(n)) {   // before its date: the lesson keeps its own colour, with a lock and the date (once, in the note)
      return `<li class="g-${LCOL[n]} fo"><button class="folder c-${LCOL[n]}" type="button" aria-haspopup="dialog" data-sheet="lock-sheet" data-lock="${n}">${tab}<span class="f-top"><span class="f-label">${lnH(n)}</span></span>
        <span class="f-row"><span><span class="f-title">${T(`lesson.${n}.card`)}</span><span class="f-sub">${T(`lesson.${n}.sub`)}</span></span><span class="f-note">${I('lock', 14)}${T(LESSONS[n].d ? 'date.opens' : 'date.tba', {date: lessonDate(n)})}</span></span>${flagH(n)}</button>${fxH('c-' + LCOL[n])}</li>`;
    } else {
      const [d, tt] = lProg(n);
      if (tt === 0) note = T('note.soon');   // an open lesson whose materials are not in yet
      else if (lDone(n)) note = `${I('check', 14)}${T('note.done', {d: tt, t: tt, pl: tt})}`;
      else if (n === live) note = `<span class="dot" aria-hidden="true"></span><span>${T('note.live_a')}<span class="nw2">${T('note.live_b')}</span>${T('note.live_c', {d, t: tt, pl: tt})}</span>`;
      else note = T('note.open', {d, t: tt, pl: tt});
    }
    return `<li class="g-${LCOL[n]} fo"><a class="folder ${colCls(n)}" href="${href}">${tab}<span class="f-top"><span class="f-label">${label}</span>${arrow}</span><span class="f-row"><span class="f-title">${T(`lesson.${n}.card`)}</span><span class="f-note">${note}</span></span>${flagH(n)}</a>${fxH(colCls(n))}</li>`;
  };
  let ringPrev = null; try { ringPrev = sessionStorage.getItem('aip3.ring'); sessionStorage.setItem('aip3.ring', rd); } catch (e) {}
  const ringUp = ringPrev !== null && rd > +ringPrev, ringFrom = ringUp ? +ringPrev / rt * 100 : 0;   // animate only a rise, from where it was
  const arrowH = `<svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg>`;
  const pill = (label, href) => `<a class="pill-cta next" href="${href}"><span>${label}</span><span class="pill-circ">${I('next', 20)}</span></a>`;   // Keyingi qadam: the outline pill
  let hero = '', cta = '', headCol = LCOL[0];
  if (pre) {   // before lesson 1: the prep card is the hero, and the one next step is the first open prep item
    const first = PREP.items.findIndex((_, i) => !S.has('prep:' + i));
    hero = `<a class="folder flatc c-yellow now-card" href="#/kursgacha"><span class="f-top"><span class="f-label">${T('pre.label')}${LESSONS[0].d ? `<br>${T('date.until', {date: lessonDate(0)})}` : ''}</span>${arrowH}</span>
        <span><span class="f-title">${T('prep.title')}</span><span class="f-sub">${T('pre.sub')}</span></span></a>`;
    if (first >= 0) cta = pill(`${T('next.k')} · ${T('next.prep', {title: HT(T(`prep.${first}.title`))})}`, '#/dars/0');
    else if (PREP.more) cta = pill(`${T('next.k')} · ${T('prep.more.title')}`, '#/kursgacha');
  } else if (live) {
    const [d, tt] = lProg(live), L = LESSONS[live], s = S.sl(live);
    const nxl = nextOf(live), slSub = !L.slides ? stepsText(d, tt) : s === 0 ? T('hero.sub_start', {n: L.slides}) : s >= L.slides ? T('hero.sub_seen', {n: L.slides}) : T('hero.sub', {i: s, n: L.slides}), sub = tt === 0 ? T('lesson.soon') : nxl && !/\/slayd\//.test(nxl.href) ? nxl.what : slSub, href = nxl ? nxl.href : `#/dars/${live}`;   // the hero opens today's next step ("continue" only when something was seen)
    headCol = LCOL[live];
    hero = `<a class="folder flatc ${colCls(live)} now-card" href="${href}"><span class="f-top"><span class="f-label">${T('hero.k')}<br>${lessonLabel(live)}</span>${arrowH}</span>
        <span><span class="f-title">${T(`lesson.${live}.card`)}</span><span class="f-sub">${sub}</span></span></a>`;
  }
  if (!pre && ns) cta = pill(`${T(live ? 'next.k_backlog' : 'next.k')} · ${ns.label}`, ns.href);
  else if (!pre && !live && allDone()) cta = pill(T('next.all_done'), `#/dars/${LN().filter(n => lProg(n)[1] > 0).at(-1)}`);   // the whole course is done: say so, and point at what is still open
  return {screen: 'dastur', tag: '#/dastur · ' + t('tag.home'), title: t('home.title'), html: nav('home') + `
    <div class="page-head main-head g-${headCol}${hero ? '' : ' nohero'}">
      <h1 class="sr-only">${T('home.title')}</h1>
      <div class="prog" role="progressbar" aria-label="${esc(t('home.ring.label'))}" aria-valuemin="0" aria-valuemax="${rt}" aria-valuenow="${rd}" aria-valuetext="${esc(t('home.ring.valuetext', {d: rd, t: rt, pl: rt}) + '')}">
        <span class="ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="rt" cx="50" cy="50" r="42"/>${rd ? `<circle class="rp${ringUp ? ' up' : ''}" cx="50" cy="50" r="42" pathLength="100" style="stroke-dasharray:${rd / rt * 100} 100;--from:${ringFrom}"/>` : ''}</svg><span class="pv">${rd}/${rt}</span></span>
        <span class="pt"><span class="ps">${T('home.ring.ps')}</span></span>
      </div>
      ${hero}${cta}
    </div>
    <h2 class="sr-only">${T('home.lessons')}</h2>
    <ul class="grid3 lessons${pre ? ' pre' : ''}">${pre ? cardHTML(0) + courseCard() : [0, ...LN()].map(cardHTML).join('')}</ul>`};
}

// ---- lesson 0: prep checklist
const PREP_CMD = (i, j) => (PREP_CMDS[i] || {})[j] || '';   // an install command shown under its step: a mono row with its own copy button (copying ticks nothing)
const cmdRow = (i, j) => { const c = PREP_CMD(i, j); return c ? `<div class="cmd"><code tabindex="0" aria-label="${esc(c)}">${esc(c)}</code><button class="cmd-cp" type="button" data-cmd="${esc(c)}" aria-label="${esc(t('prep.cmd_copy'))}">${I('copy', 20)}</button></div>` : ''; };
document.addEventListener('click', async e => { const b = e.target.closest('.cmd-cp'); if (!b) return; flashToast((await copy(b.dataset.cmd)) ? 'toast.cmd_copied' : 'toast.copy_failed'); });
const deckCols = open => open < 0 ? 'repeat(4,minmax(0,1fr))' : PREP.items.map((_, i) => i === open ? '2fr' : '1fr').join(' ');
function prepPage(){
  const done = PREP.items.map((_, i) => S.has('prep:' + i)), open = prepOpen ?? done.indexOf(false);
  prepFresh = prepOpen === null; prepOpen = open;   // a language switch re-renders: the open card stays and its picture does not replay
  const cards = PREP.items.map((it, i) => {
    const d = done[i], o = i === open, acts = it.actions || [];
    const ext = `<span class="sr-only"> ${T('common.sr_external')}</span>`;
    return `<li class="folder flatc c-yellow pc${o ? ' open' : ''}${d ? ' done' : ''}" id="pc${i}" data-i="${i}" style="--vt:pc${i}"><button class="hd" type="button" id="ph${i}" aria-expanded="${o}" aria-controls="pb${i}" aria-labelledby="pt${i}" aria-describedby="pn${i}"><span class="no">${num2(i + 1)}</span><span class="f-title" id="pt${i}">${T(`prep.${i}.title`)}</span><span class="pic">${PREP_ART[i]}</span><span class="nt" id="pn${i}">${T(`prep.${i}.note`)}<span class="stp">${T('prep.steps_n', {n: it.steps, pl: it.steps})}<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span></span></button>
      <div class="bd" id="pb${i}" role="region" aria-labelledby="pt${i}"${o ? '' : ' hidden'}><ol class="steps">${Array.from({length: it.steps}, (_, j) => `<li>${T(`prep.${i}.s${j}`)}${cmdRow(i, j)}</li>`).join('')}</ol>
        ${acts.length ? `<div class="acts">${acts.map((a, j) => a.quiet
          ? `<a class="pc-lk" href="${esc(a.url)}" target="_blank" rel="noopener noreferrer">${T(`prep.${i}.a${j}`)}${I('ne', 18)}${ext}</a>`
          : `<a class="pill-ink" href="${esc(a.url)}" target="_blank" rel="noopener noreferrer"><span>${T(`prep.${i}.a${j}`)}${ext}</span><span class="pc-c">${I('ne', 26)}</span></a>`).join('')}</div>` : ''}
        ${it.foot ? `<p class="foot">${T(`prep.${i}.foot`)}</p>` : ''}</div>
      <div class="pf"><button class="chip${d ? '' : ' off'}" type="button" aria-pressed="${d}" aria-label="${esc(t('common.mark_done'))}" aria-describedby="pt${i}"><span class="cl">${T('common.done')}</span></button></div></li>`;
  }).join('');
  return {screen: 'ex', tag: '#/dars/0 · ' + t('tag.prep'), title: t('setup.title'), html: nav('prep') + wrap(`
      ${dlh('#/dastur', T('nav.home'), `${T('prep.meta')} · ${cnt('prep')}`)}
      <h1 class="headline ex-h">${T('setup.title')}</h1><p class="lede">${prepCount() === 4 ? T('prep.lede_done') : T(courseStarted() ? 'prep.intro_late' : LESSONS[0].d ? 'prep.intro' : 'prep.intro_tba', {date: lessonDate(0)})}</p>
      <div class="ex-files"><section class="grp"><h2 class="ef-h">${T('common.guide')}</h2><ul>${prepFileRow()}</ul></section></div>`,
    `<section class="prep" aria-label="${esc(t('prep.list.k'))}"><ol class="deck" id="deck" style="--cols:${deckCols(open)}">${cards}</ol></section>
      <div class="prep-end" id="prep-end"${prepCount() === 4 ? '' : ' hidden'}><p class="pe-t">${T(courseStarted() ? 'prep.end_after' : LESSONS[1].d ? 'prep.end_before' : 'prep.end_tba', {date: lessonDate(1)})}</p><a class="play" href="#/dastur"><span>${T('prep.end_back')}</span><span class="play-circ">${I('next', 20)}</span></a></div>`)};
}
// "Birinchi darsgacha": the materials before the course (infrastructure, links to HEAD's other learning platforms); nothing yet = the "soon" line
function prePage(){
  const m = PREP.more;
  const rows = m ? m.links.map((l, i) => `<li><a class="ef-row" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer"><span><span class="ef-nm">${wbr(t(`prep.more.${i}.t`))}</span>${t(`prep.more.${i}.n`) ? `<span class="ef-mt">${T(`prep.more.${i}.n`)}</span>` : ''}</span><span class="ef-dl">${I('ne', 18)}<span class="sr-only">${T('common.sr_external')}</span></span></a></li>`).join('') : '';
  return {screen: 'ex', tag: '#/kursgacha', title: t('prep.title'), html: nav('pre') + wrap(`
      ${dlh('#/dastur', T('nav.home'), T('pre.label'))}
      <h1 class="headline ex-h">${T('prep.title')}</h1><p class="lede">${T('pre.lede')}</p>
      ${m ? `<div class="ex-files prep-more">${group(T('prep.more.title'), rows, '', t('prep.more.note') ? T('prep.more.note') : '')}</div>` : `<p class="lede pre-soon">${T('lesson.soon')}</p>`}`)};
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
    deck.style.setProperty('--cols', deckCols(open)); $('#prep-end').hidden = count() < 4; refreshCounts();
  }
  const toggleOpen = i => { open = open === i ? -1 : i; prepOpen = open; paint(); if (open === i) play(i); };
  cards.forEach((c, i) => {
    $('.hd', c).addEventListener('click', () => toggleOpen(i));
    c.addEventListener('click', e => { if (!e.target.closest('button,a') && !c.classList.contains('open')) toggleOpen(i); });   // the empty area of a closed card acts as its header button
    $('.chip', c).addEventListener('click', () => {
      if (!c.classList.contains('open') && !S.has('prep:' + i)) { toggleOpen(i); $('.hd', c).focus(); return; }   // on a closed card the first tap opens it: the steps come before the tick
      const was = S.has('prep:' + i), prev = open; S.tick('prep:' + i, !was);
      if (!was) { c.classList.add('just'); setTimeout(() => c.classList.remove('just'), 600); open = (open >= 0 && open !== i && !S.has('prep:' + open)) ? open : nextFrom(i); }
      else open = i;
      prepOpen = open;
      const after = () => { paint(); if (open >= 0 && open !== prev) { play(open); $('.hd', cards[open]).focus(); } };
      if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(after); else after();   // the cards slide to their new places
      live.textContent = ''; clearTimeout(liveTimer); liveTimer = setTimeout(() => live.textContent = t(was ? 'live.prep_undone' : 'live.prep_done', {title: t(`prep.${i}.title`), d: count(), pl: 4}), 30);
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
// prompt copy rows of a group (the 2.0 rows): copy = done, written as p:l{n}:{id}; the text stays Uzbek (lang="uz-Latn" inside a ru/en page). Not counted in the lesson's units
function promptList(n, gkey, g){
  const lis = g.prompts.map((q, j) => { const k = `${gkey}.p${j}`, text = cu(`${k}.x`);
    return pli({i: j, pid: q.kid, no: q.id || 'P' + (j + 1), key: `p:l${n}:${q.kid}`, title: cu(`${k}.t`), titleH: cuh(`${k}.t`), where: q.target, whereH: q.target ? cuh(`${k}.w`) : '', lbl: 'lbl.where', text, textH: cxh(`${k}.x`, I18N.uz[`${k}.x`], x => mark(esc(x)))}); }).join('');
  return `<div class="s1">${g.prompts.some(q => hasBracket(q.text)) ? `<p class="s1-rule">${T('ex.rule')}</p>` : ''}<ol>${lis}</ol></div>`;
}
// Amaliyot / Kit / Vazifa share one pane: paragraphs, then file groups (title + note + rows); Amaliyot and Vazifa end with a tick
function blockPane(n, p){
  const b = (PARTS[n] || {})[p] || {text: '', groups: []}, key = `c.p.${n}.${p}`;
  const text = b.text ? cu(`${key}.text`).split(/\n\s*\n/).map(x => `<p class="p-sub">${esc(x).replace(/\n/g, '<br>')}</p>`).join('') : '';
  const groups = b.groups.map((g, i) => group(cuh(`${key}.g${i}`), g.files.map(f => fileRow(f)).join(''), '', g.note ? cuh(`${key}.g${i}.n`) : '', g.prompts.length ? promptList(n, `${key}.g${i}`, g) : '')).join('');
  const end = p === 'am' ? endb('f:am' + n, S.has('f:am' + n), 'amf.on', 'amf.off', '', 'amf.aria') : p === 'vz' ? endb('f:v' + n, S.has('f:v' + n), 'vzf.on', 'vzf.off', '', 'vzf.aria') : '';
  return `<p class="p-label">${T('unit.' + p)}</p>${text ? `<div class="pane-text"${cxFb(`${key}.text`) ? ' lang="uz-Latn"' : ''}>${text}</div>` : ''}${groups ? `<div class="ex-files">${groups}</div>` : ''}${end ? `<div class="gt-foot end">${end}</div>` : ''}`;
}
function lessonPage(n, tab){
  tab = tab || tabOfHref((nextOf(n) || {}).href);   // no ?tab: the tab with today's work
  const L = LESSONS[n], [d, tt] = lProg(n), empty = !L.parts.length;
  const tabsDef = L.parts.map(p => ({p, label: t('unit.' + p), lock: partLock(n, p), done: partLock(n, p) ? false : {
    sl: () => slDone(n), am: () => S.has('f:am' + n), vz: () => S.has('f:v' + n), kt: () => false}[p]()}));
  const pane = {
    sl: () => `<p class="p-label">${T('unit.sl')}</p><p class="p-num">${S.sl(n) > 0 ? `${S.sl(n)}/${L.slides}` : L.slides}</p>
      <div class="gt-foot"><span class="gt-meta">${T('pane.sl.meta', {n: L.slides, pl: L.slides, kind: kindT(n)})}</span>${play(slHref(n), S.sl(n) === 0 ? T('pane.sl.start') : slDone(n) ? T('pane.sl.again') : T('pane.sl.go', {i: S.sl(n), n: L.slides}), 'play', 18)}</div>`,
    am: () => blockPane(n, 'am'), kt: () => blockPane(n, 'kt'), vz: () => blockPane(n, 'vz'),
  };
  const tabs = tabsDef.map((x, i) => `<button class="gt-tab" role="tab" type="button" id="dg-t${i}" aria-controls="dg-p${i}" aria-selected="${i === 0}" data-l="${esc(x.label)}"${i ? ' tabindex="-1"' : ''}>${x.lock ? `<span class="lkd">${I('lock', 12)}${esc(x.label)}</span>` : x.done ? `<span class="ok">${I('check', 12)}${esc(x.label)}<span class="sr-only">${T('common.sr_done')}</span></span>` : esc(x.label)}</button>`).join('');
  const panes = tabsDef.map((x, i) => `<div class="gt-pane" role="tabpanel" id="dg-p${i}" aria-labelledby="dg-t${i}"${i ? ' inert' : ''}>${x.lock ? lockedPane(x.lock) : pane[x.p]()}</div>`).join('');
  const title = ltitle(n);   // no hero CTA pill: each folder tab already carries its part's own action (user, 2026-10-17)
  const tall = Object.values(PARTS[n] || {}).some(b => b.groups.some(g => g.prompts.length));   // prompt lists make a pane very long: the other panes must not keep that height
  const side = empty   // no materials yet: the lesson's own colour card says so, instead of an empty folder
    ? `<div class="folder flatc ${colCls(n)} soon-card"><span class="f-label">${esc(lessonDate(n))}</span><p class="soon-t">${T('lesson.soon')}</p></div>`
    : `<div class="gt gt-${LCOL[n]} g-${LCOL[n]}${tall ? ' gt-tall' : ''}" id="dg" style="--n:${tabsDef.length}"><div class="gt-goo" aria-hidden="true"><span class="gt-ind"></span><span class="gt-pan"></span></div>
      <div class="gt-tabs" role="tablist" aria-label="${esc(t('tab.list'))}">${tabs}</div><div class="gt-body">${panes}</div></div>`;
  return {screen: 'dars', tab: Math.max(0, L.parts.indexOf(tab)), tag: `#/dars/${n} · ` + t('tag.lesson', {n: lnT(n), parts: L.parts.length}), title: lnum(n) == null ? title : t('title.lesson', {n: num2(lnum(n)), title}), html: nav('d') + `
    <div class="hero"><div class="hero-l">
      ${dlh('#/dastur', T('nav.home'), tt ? T('lesson.meta', {n, date: lessonDate(n), d, t: tt, pl: tt}) : esc(lessonDate(n)))}
      <h1 class="headline${title.split(' ').some(w => w.length >= 11) ? ' long' : ''}">${lnum(n) == null ? '' : `<span class="ln">${lnH(n)}</span>`}<span class="ln">${esc(title)}</span></h1>
      <p class="lsub">${T(`lesson.${n}.sub`)}</p>
      <p class="lede">${T(`lesson.${n}.lede`)}</p>
    </div>
    ${side}</div>`};
}

// ---- slides: a simple viewer (2.0 route /slaydlar): the slide images were never available, so every slide is a marked "namuna" stage
function slPage(n, i){
  const L = LESSONS[n], N = L.slides; S.setSl(n, i);
  const topic = t(`lesson.${n}.t${Math.min(L.topics - 1, Math.floor((i - 1) / N * L.topics))}`);
  const prev = i > 1 ? `#/dars/${n}/slayd/${i - 1}` : '', next = i < N ? `#/dars/${n}/slayd/${i + 1}` : '';
  const nums = Array.from({length: N}, (_, k) => `<a href="#/dars/${n}/slayd/${k + 1}"${k + 1 === i ? ' aria-current="true"' : ''}>${k + 1}</a>`).join('');
  return {screen: 'slayd', tag: `#/dars/${n}/slayd/${i} · ` + t('tag.slide', {n: N}), title: t('sl.doc_title', {i, n: N, n_dars: lnT(n)}), html: `
    <div class="slv"><div class="slv-bar"><a class="slv-x" href="#/dars/${n}">${I('back')}${T('sl.close')}</a><h1 class="slv-ct" tabindex="-1">${i} / ${N}</h1>
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
}
let firstRender = true, byClick = false, slFocus = '';
const mem = {};      // hash -> {y, from}: coming back (browser Back) restores the scroll position and focuses the link we came from
// keep = true (language switch): same page, same place: no scroll, no focus move; setLang puts the state back
function render(keep){
  if (!keep) prepOpen = null;
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
  if (keep) {}
  else if (target) { const dt = target.closest('details'); if (dt) dt.open = true; scrollTo(0, 0); target.scrollIntoView({block: 'start'}); const tt = target.querySelector('.tt'); tt && tt.focus({preventScroll: true}); }
  else if (!byClick && m && !firstRender) { scrollTo(0, m.y); const a = m.from && document.querySelector(`#s-app a[data-r="${CSS.escape(m.from)}"]`); if (a) a.focus({preventScroll: true}); }
  else if (slFocus && app.querySelector(`[data-slnav="${slFocus}"]`)) { scrollTo(0, 0); app.querySelector(`[data-slnav="${slFocus}"]`).focus({preventScroll: true}); }
  else { scrollTo(0, 0); if (!firstRender) { const h = document.querySelector('.screen.is-on h1'); if (h) { h.tabIndex = -1; h.focus({preventScroll: true}); } } }
  if (view === 'app' && !ROUTE().startsWith('#/fayl/')) prevHash = ROUTE();
  firstRender = false; byClick = false; slFocus = '';
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
function refreshCounts(){ document.querySelectorAll('[data-cnt]').forEach(el => { const [type, id] = el.dataset.cnt.split(':'); el.textContent = cntText(type, id); }); }

// the locked-lesson sheet (static markup in the page): its title and text depend on which lesson was tapped; applyStatic re-renders them with these parameters on a language switch
function lockSheet(n){
  const sh = document.getElementById('lock-sheet'), ti = sh.querySelector('#ls-t'), de = sh.querySelector('.sheet-d'), ls = sh.querySelector('#ls-list');
  ls.hidden = true; de.hidden = false;
  if (n === 'course') {   // the one course folder: every lesson with its label, title and date ("Sana keyinroq" while it has none)
    ti.dataset.i18n = 'course.sheet_t'; ti.dataset.i18nP = JSON.stringify({n: RN().length, pl: RN().length}); de.hidden = true; ls.hidden = false;
    ls.innerHTML = LN().map(k => `<li><span class="sl-n">${lnum(k) == null ? '' : lnH(k)}</span><span class="sl-t">${esc(ltitle(k))}</span><span class="sl-d">${LESSONS[k].d ? esc(lessonDate(k)) : T('date.tba')}</span></li>`).join('');
    applyStatic(sh); okina(sh); return sh;
  }
  ti.dataset.i18n = LESSONS[n].d ? 'lock.title' : 'lock.title_tba'; ti.dataset.i18nP = JSON.stringify({n: lnT(n), date: lessonDate(n)}); de.dataset.i18n = 'lock.desc_n';
  applyStatic(sh); okina(sh); return sh;
}
const openLockSheet = n => lockSheet(n).showModal();
document.addEventListener('click', e => { const b = e.target.closest('[data-lock]'); if (b) lockSheet(b.dataset.lock === 'course' ? 'course' : +b.dataset.lock); }, true);   // the card's own handler opens it: set the text first

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
window.addEventListener('popstate', () => render());

// ---- the name menu: the student's own data, and Chiqish (all as text nodes, never HTML)
function fillMenu(){
  if (!SESS) return;
  const s = SESS.student, $ = id => document.getElementById(id);
  $('nm-name').textContent = s.fullName; $('nm-id').textContent = s.id;
  $('nm-group').textContent = t('menu.group_' + (s.group || 'none'));
  $('nm-course').textContent = LESSONS[1].d ? t('menu.course_range', {n: RN().length, pl: RN().length, from: lessonDate(1), to: lessonDate(LN().filter(n => LESSONS[n].d).at(-1))}) : t('menu.course_tba', {n: RN().length, pl: RN().length});
  okina($('nmenu'));
}
async function logout(){
  closeMenu();
  try { await api('POST', '/logout', {}); } catch {}
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
function cookieLang(){ const m = /(?:^|; )aip_lang=(uz|ru|en)/.exec(document.cookie); return m ? m[1] : 'uz'; }   // a function declaration: LANG reads it before this file's own lines run
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
  const name = `prep-${LANG}.pdf`;
  return `<li><a class="ef-row" href="${API}/prep/pdf?lang=${LANG}" target="_blank" rel="noopener noreferrer"><span><span class="sr-only">${T('common.sr_download')}</span><span class="ef-nm">${T('prep.guide_name')}</span><span class="ef-mt">${name} · ${T('prep.pdf')}</span></span><span class="ef-dl">${I('down', 18)}</span></a></li>`;
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
