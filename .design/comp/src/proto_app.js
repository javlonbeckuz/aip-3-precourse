// ===================== PROTOTYPE: state, logic, templates, router (all UI text comes from t() / T() / cx(), see proto_i18n.js) =====================
//#STATE:begin   (the app replaces this block: progress lives on the server, see app_state.js)
const SKEY = 'aip3.demo.v1', STUDENT = 'Student', STUDENT_FIRST = 'Student';
const S = {
  d: null,
  load(){ let d = null; try { d = JSON.parse(localStorage.getItem(SKEY)); } catch {} this.d = d && d.t && d.sl ? d : JSON.parse(JSON.stringify(SEED)); },
  save(){ try { localStorage.setItem(SKEY, JSON.stringify(this.d)); } catch {} },
  has(k){ return !!this.d.t[k]; },
  tick(k, on){ on ? this.d.t[k] = 1 : delete this.d.t[k]; this.save(); },
  sl(n){ return this.d.sl[n] || 0; },
  setSl(n, i){ this.d.sl[n] = Math.max(this.sl(n), i); this.save(); },
  reset(){ this.d = JSON.parse(JSON.stringify(SEED)); this.save(); },
};
S.load();
registerContent();
//#STATE:end
// each lesson has ONE fixed colour whatever its state (state = words + icons in the note, never colour); yellow also stays the progress ring. Emerald (lesson 6) is an identity colour, never a success colour
const LCOL = ['yellow', 'lilac', 'grey', 'blue', 'dark', 'orange', 'emerald'];
const LN = () => Object.keys(LESSONS).map(Number).filter(n => n > 0).sort((a, b) => a - b);   // the lesson numbers 1..N come from the data (the API in the app)
const colCls = n => LCOL[n] === 'dark' ? 'c-night' : 'c-' + LCOL[n];   // an unlocked dark lesson keeps its dark identity, with normal (white) ink
//#GATE:begin   (the app replaces this block: the server says which lesson is live and which parts are open, see app_state.js)
// ---- which lesson is live / open / locked comes from the group's dates against "today". Demo today: ?today=YYYY-MM-DD, else the story date (lesson 3 live, 4-6 locked)
const DAY = 864e5, utc = (d, m) => Date.UTC(2026, m - 1, d), isoMs = x => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(x || ''); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null; };
const TODAY_PRESETS = {before: '2026-11-14', day1: '2026-11-21', story: '2026-12-05', over: '2027-01-05'};
let TODAY = isoMs(new URLSearchParams(location.search).get('today')) ?? isoMs(TODAY_PRESETS.story);
const lessonAt = n => utc(...LESSONS[n].d);
const courseStarted = () => TODAY >= lessonAt(1);
const liveLesson = () => { const ns = LN(); for (let i = ns.length - 1; i >= 0; i--) { const n = ns[i]; if (TODAY >= lessonAt(n)) return TODAY < (i === ns.length - 1 ? lessonAt(n) + 7 * DAY : lessonAt(ns[i + 1])) ? n : 0; } return 0; };   // a lesson is live from its date until the next one's (the last one: one week)
const isLocked = n => n >= 1 && TODAY < lessonAt(n);
const partLock = (n, p) => null;   // prototype: every part of an open lesson is open. The app returns the opening time (iso) of a part that is still locked.
//#GATE:end


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
const allDone = () => LN().every(n => !isLocked(n) && (lDone(n) || lProg(n)[1] === 0)) && LN().some(n => lProg(n)[1] > 0);   // every lesson is open and finished; an open lesson with nothing to count (soon, or Kit only) does not hold it back
const ring = () => [LN().filter(n => !isLocked(n) && (lDone(n) || (allDone() && lProg(n)[1] === 0))).length, LN().length];   // always done/N; only when the course is all done do empty open lessons count as done, so "6/6" stands next to "all done"
// first unfinished item of a lesson, with a precise label and target ("Keyingi qadam"); `what` is the label without the lesson prefix
function nextOf(n){
  const u = units(n).find(x => !x.done); if (!u) return null;
  const what = esc(u.label) + (u.kind === 'sl' ? ` · ${S.sl(n)} / ${LESSONS[n].slides}` : '');   // what / label are HTML; started = the target already has progress ("continue" vs "start")
  return {what, label: `${T('lesson.n', {n})} · ${what}`, href: u.href, started: u.kind === 'sl' && S.sl(n) > 0};
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
const NSTAG = () => ` <span class="ns">${T('common.namuna')}</span>`;
const SRCHK = () => I('check', 12) + `<span class="sr-only">${T('common.sr_done')}</span>`;
const mark = s => s.split(/(`[^`]*`)/).map((part, i) => i % 2 ? `<code>${part.slice(1, -1)}</code>` : part.replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>')).join('');   // [fill-in] marks, but never inside a `code span` (a literal value there is not a placeholder)
const hasBracket = s => /\[[^\]]+\]/.test(String(s).replace(/`[^`]*`/g, ''));
const back = (href, label) => `<a class="eyebrow" href="${href}">${I('back')}${label}</a>`;
const nav = active => `<header class="nav">
  <nav class="nav-links" aria-label="${esc(t('nav.label'))}"><a class="home-btn" href="#/dastur" aria-label="${esc(t('nav.homebtn'))}" title="${esc(t('nav.homebtn'))}"${active === 'home' ? ' aria-current="page"' : ''}>${I('home', 20)}</a></nav>
  <span class="wordmark">AI Praktikum 3.0</span>
  <div class="nav-r"><button class="nav-name" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="nmenu">${esc(STUDENT)}</button><button class="menu-btn" type="button" aria-label="${esc(t('menu.label'))}" aria-haspopup="dialog" aria-expanded="false" aria-controls="nmenu">${I('menu', 20)}</button></div>
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
  const cardHTML = n => {
    const tab = `<span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span>`, arrow = `<svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg>`;
    const label = n === 0 ? T('lesson.label0') : T('lesson.label', {n, date: lessonDate(n)});
    let note, href = `#/dars/${n}`;
    if (n === 0) { note = k === 4 ? `${I('check', 14)}${T('note.done', {d: 4, t: 4, pl: 4})}` : courseStarted() ? T('note.open', {d: k, t: 4, pl: 4}) : !LESSONS[0].d ? T('prep.cnt', {d: k, pl: 4}) : T('note.prep_todo', {until: t('date.until', {date: lessonDate(0)}), d: k, pl: 4}); }
    else if (isLocked(n)) {   // before its date: the lesson keeps its own colour, with a lock and the date (once, in the note)
      return `<li class="g-${LCOL[n]}"><button class="folder c-${LCOL[n]}" type="button" aria-haspopup="dialog" data-sheet="lock-sheet" data-lock="${n}">${tab}<span class="f-top"><span class="f-label">${T('lesson.n', {n})}</span></span>
        <span class="f-row"><span><span class="f-title">${T(`lesson.${n}.card`)}</span><span class="f-sub">${T(`lesson.${n}.sub`)}</span></span><span class="f-note">${I('lock', 14)}${T(LESSONS[n].d ? 'date.opens' : 'date.tba', {date: lessonDate(n)})}</span></span></button></li>`;
    } else {
      const [d, tt] = lProg(n);
      if (tt === 0) note = T('note.soon');   // an open lesson whose materials are not in yet
      else if (lDone(n)) note = `${I('check', 14)}${T('note.done', {d: tt, t: tt, pl: tt})}`;
      else if (n === live) note = `<span class="dot" aria-hidden="true"></span><span>${T('note.live_a')}<span class="nw2">${T('note.live_b')}</span>${T('note.live_c', {d, t: tt, pl: tt})}</span>`;
      else note = T('note.open', {d, t: tt, pl: tt});
    }
    return `<li class="g-${LCOL[n]}"><a class="folder ${colCls(n)}" href="${href}">${tab}<span class="f-top"><span class="f-label">${label}</span>${arrow}</span><span class="f-row"><span class="f-title">${T(`lesson.${n}.card`)}</span><span class="f-note">${note}</span></span></a></li>`;
  };
  let ringPrev = null; try { ringPrev = sessionStorage.getItem('aip3.ring'); sessionStorage.setItem('aip3.ring', rd); } catch (e) {}
  const ringUp = ringPrev !== null && rd > +ringPrev, ringFrom = ringUp ? +ringPrev / rt * 100 : 0;   // animate only a rise, from where it was
  const arrowH = `<svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg>`;
  const pill = (label, href) => `<a class="pill-cta next" href="${href}"><span>${label}</span><span class="pill-circ">${I('next', 20)}</span></a>`;   // Keyingi qadam: the outline pill
  let hero = '', cta = '', headCol = LCOL[0];
  if (pre) {   // before lesson 1: the prep card is the hero, and the one next step is the first open prep item
    const first = PREP.items.findIndex((_, i) => !S.has('prep:' + i));
    hero = `<a class="folder flatc c-yellow now-card" href="#/dars/0"><span class="f-top"><span class="f-label">${k === 4 ? `${T('prep.ready')}<br>${T('lesson.label', {n: 1, date: lessonDate(1)})}` : LESSONS[0].d ? `${T('lesson.label0')}<br>${T('date.until', {date: lessonDate(0)})}` : T('lesson.label0')}</span>${arrowH}</span>
        <span><span class="f-title">${T('prep.title')}</span><span class="f-sub">${T('prep.cnt', {d: k, pl: 4})}</span></span></a>`;
    if (first >= 0) cta = pill(`${T('next.k')} · ${T('next.prep', {title: HT(T(`prep.${first}.title`))})}`, '#/dars/0');
    else if (PREP.more) cta = pill(`${T('next.k')} · ${T('prep.more.title')}`, '#/dars/0?p=more');
  } else if (live) {
    const [d, tt] = lProg(live), L = LESSONS[live], s = S.sl(live);
    const nxl = nextOf(live), slSub = !L.slides ? stepsText(d, tt) : s === 0 ? T('hero.sub_start', {n: L.slides}) : s >= L.slides ? T('hero.sub_seen', {n: L.slides}) : T('hero.sub', {i: s, n: L.slides}), sub = tt === 0 ? T('lesson.soon') : nxl && !/\/slayd\//.test(nxl.href) ? nxl.what : slSub, href = nxl ? nxl.href : `#/dars/${live}`;   // the hero opens today's next step ("continue" only when something was seen)
    headCol = LCOL[live];
    hero = `<a class="folder flatc ${colCls(live)} now-card" href="${href}"><span class="f-top"><span class="f-label">${T('hero.k')}<br>${T('lesson.label', {n: live, date: lessonDate(live)})}</span>${arrowH}</span>
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
    <ul class="grid3 lessons">${[0, ...LN()].map(cardHTML).join('')}</ul>`};
}

// ---- lesson 0: prep checklist
//#PROTO:begin prepfile
function prepPdf(){   // the guide PDF of the current UI language (uz when that language has none yet): {lang, size, b64|url} or null = not made yet
  const l = PREP_PDF[LANG] ? LANG : PREP_PDF.uz ? 'uz' : null; return l ? {lang: l, ...PREP_PDF[l]} : null;
}
function prepFileRow(){
  const p = prepPdf();
  if (!p) return fileRow(F('prep-' + LANG + '.pdf'), t('prep.pdf'));   // TODO: no prep-xx.pdf in comp/files yet: a sample row
  const name = `prep-${p.lang}.pdf`;
  const tag = p.url ? `a class="ef-row" href="${p.url}" download="${name}"` : 'button class="ef-row" type="button"';   // embedded PDF = a button (no dead href)
  return `<li><${tag} data-pdf="${p.lang}" data-name="${name}"><span><span class="sr-only">${T('common.sr_download')}</span><span class="ef-nm">${T('prep.guide_name')}</span><span class="ef-mt">${name} · ${T('prep.pdf_meta', {n: p.slides, pl: p.slides, size: sizeT(p.size)})}</span></span><span class="ef-dl">${I('down', 18)}</span></${tag.split(' ')[0]}></li>`;
}
const pdfUrls = {};
document.addEventListener('click', e => {   // embedded PDF: build the file from the base64 text on click (the single HTML file has no neighbours to link to)
  const a = e.target.closest('[data-pdf]'); const p = a && PREP_PDF[a.dataset.pdf]; if (!p || !p.b64) return;
  e.preventDefault();
  const url = pdfUrls[a.dataset.pdf] ??= URL.createObjectURL(new Blob([Uint8Array.from(atob(p.b64), c => c.charCodeAt(0))], {type: 'application/pdf'}));   // one per language, never revoked (iOS preview must still be able to save it)
  const d = document.createElement('a'); d.href = url; d.download = a.dataset.name; document.body.append(d); d.click(); d.remove();
});
//#PROTO:end prepfile
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
  return {screen: 'ex', tag: '#/dars/0 · ' + t('tag.prep'), title: t(courseStarted() ? 'prep.title_late' : 'prep.title'), html: nav('d') + wrap(`
      ${dlh('#/dastur', T('nav.home'), `${T('prep.meta')} · ${cnt('prep')}`)}
      <h1 class="headline ex-h">${T(courseStarted() ? 'prep.title_late' : 'prep.title')}</h1><p class="lede">${prepCount() === 4 ? T('prep.lede_done') : T(courseStarted() ? 'prep.intro_late' : LESSONS[0].d ? 'prep.intro' : 'prep.intro_tba', {date: lessonDate(0)})}</p>
      <div class="ex-files"><section class="grp"><h2 class="ef-h">${T('common.guide')}</h2><ul>${prepFileRow()}</ul></section></div>`,
    `<section class="prep" aria-label="${esc(t('prep.list.k'))}"><ol class="deck" id="deck" style="--cols:${deckCols(open)}">${cards}</ol></section>
      <div class="prep-end" id="prep-end"${prepCount() === 4 ? '' : ' hidden'}><p class="pe-t">${T(courseStarted() ? 'prep.end_after' : LESSONS[1].d ? 'prep.end_before' : 'prep.end_tba', {date: lessonDate(1)})}</p><a class="play" href="#/dastur"><span>${T('prep.end_back')}</span><span class="play-circ">${I('next', 20)}</span></a></div>${PREP.more ? `<div class="ex-files prep-more" data-pid="more">${group(T('prep.more.title'), PREP.more.links.map((l, i) => `<li><a class="ef-row" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer"><span><span class="ef-nm">${wbr(t(`prep.more.${i}.t`))}</span>${t(`prep.more.${i}.n`) ? `<span class="ef-mt">${T(`prep.more.${i}.n`)}</span>` : ''}</span><span class="ef-dl">${I('ne', 18)}<span class="sr-only">${T('common.sr_external')}</span></span></a></li>`).join(''), '', t('prep.more.note') ? T('prep.more.note') : '')}</div>` : ''}`)};
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

// ---- lessons 1-6: the gooey folder with only the parts the lesson really has (Slaydlar / Amaliyot / Kit / Vazifa)
const partWhen = iso => /^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(iso || '') ? {date: fmtDate(+iso.slice(8, 10), +iso.slice(5, 7)), time: iso.slice(11, 16)} : {date: '…', time: '…'};   // iso with the Tashkent offset: its own date and clock time
const lockedPane = iso => `<p class="p-label">${T('part.locked')}</p><div><p class="p-sub">${T('part.opens', partWhen(iso))}</p></div>`;
const tabOfHref = h => { const m = /[?&]tab=(sl|am|kt|vz)\b/.exec(h || ''); return m ? m[1] : /\/slayd\//.test(h || '') ? 'sl' : null; };
// Amaliyot / Kit / Vazifa share one pane: paragraphs, then file groups (title + note + rows); Amaliyot and Vazifa end with a tick
function blockPane(n, p){
  const b = (PARTS[n] || {})[p] || {text: '', groups: []}, key = `c.p.${n}.${p}`;
  const text = b.text ? cu(`${key}.text`).split(/\n\s*\n/).map(x => `<p class="p-sub">${esc(x).replace(/\n/g, '<br>')}</p>`).join('') : '';
  const groups = b.groups.map((g, i) => group(cuh(`${key}.g${i}`), g.files.map(f => fileRow(f)).join(''), '', g.note ? cuh(`${key}.g${i}.n`) : '')).join('');
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
  const side = empty   // no materials yet: the lesson's own colour card says so, instead of an empty folder
    ? `<div class="folder flatc ${colCls(n)} soon-card"><span class="f-label">${esc(lessonDate(n))}</span><p class="soon-t">${T('lesson.soon')}</p></div>`
    : `<div class="gt gt-${LCOL[n]} g-${LCOL[n]}" id="dg" style="--n:${tabsDef.length}"><div class="gt-goo" aria-hidden="true"><span class="gt-ind"></span><span class="gt-pan"></span></div>
      <div class="gt-tabs" role="tablist" aria-label="${esc(t('tab.list'))}">${tabs}</div><div class="gt-body">${panes}</div></div>`;
  return {screen: 'dars', tab: Math.max(0, L.parts.indexOf(tab)), tag: `#/dars/${n} · ` + t('tag.lesson', {n, parts: L.parts.length}), title: t('title.lesson', {n, title}), html: nav('d') + `
    <div class="hero"><div class="hero-l">
      ${dlh('#/dastur', T('nav.home'), tt ? T('lesson.meta', {n, date: lessonDate(n), d, t: tt, pl: tt}) : esc(lessonDate(n)))}
      <h1 class="headline${title.split(' ').some(w => w.length >= 11) ? ' long' : ''}"><span class="ln">${T('lesson.n', {n})}</span><span class="ln">${esc(title)}</span></h1>
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
  return {screen: 'slayd', tag: `#/dars/${n}/slayd/${i} · ` + t('tag.slide', {n: N}), title: t('sl.doc_title', {i, n: N, n_dars: t('lesson.n', {n})}), html: `
    <div class="slv"><div class="slv-bar"><a class="slv-x" href="#/dars/${n}">${I('back')}${T('sl.close')}</a><h1 class="slv-ct" tabindex="-1">${i} / ${N}</h1>
        <button class="slv-all" type="button" data-sheet="slides-sheet" aria-haspopup="dialog" aria-expanded="false" aria-controls="slides-sheet">${T('sl.all')}</button></div>
      <div class="slv-stage" data-sl="${i}" data-n="${n}" data-max="${N}"><div class="slv-ph"><span class="slv-num">${num2(i)}</span><span class="slv-t">${T('sl.topic', {n, topic})}</span>
        <span class="ns">${T('sl.ph')}</span><span class="slv-note">${T('sl.note')}</span></div></div>
      <div class="slv-foot">${prev ? `<a class="slv-btn" data-slnav="prev" href="${prev}" aria-label="${esc(t('sl.prev'))}">${I('back', 20)}</a>` : `<span class="slv-btn off" aria-hidden="true">${I('back', 20)}</span>`}
        <span class="slv-seen">${i === N ? `${I('check', 14)}<span class="sw">${T('sl.seen')}</span>` : ''}</span>
        ${next ? `<a class="slv-btn" data-slnav="next" href="${next}" aria-label="${esc(t('sl.next'))}">${I('next', 20)}</a>` : `<a class="play" href="#/dars/${n}"><span>${T('sl.back_lesson')}</span><span class="play-circ">${I('next', 20)}</span></a>`}</div></div>
    <dialog class="sheet" id="slides-sheet" aria-label="${esc(t('sl.all'))}"><p class="sheet-t">${T('sl.all')}</p><div class="slv-grid">${nums}</div><form method="dialog"><button class="sheet-x">${T('sl.close')}</button></form></dialog>`};
}
let prevHash = '#/dastur';
//#PROTO:begin filepage
function filePage(sl){
  const f = FILES[sl];
  return {screen: 'ex', tag: `#/fayl/${sl} · ` + t('tag.file'), title: f.name, html: nav('d') + wrap(`
    ${dlh(esc(prevHash || '#/dastur'), T('common.back'), T('file.meta'))}
    <h1 class="headline ex-h" style="font-size:clamp(24px,6.5cqi,40px);overflow-wrap:anywhere">${esc(f.name)}</h1>
    <p class="lede">${esc(f.size ? sizeT(f.size) : t('common.unknown_size'))}${f.ph ? NSTAG() : ''}</p>
    <p class="ef-hint">${T('file.hint')}</p>`)};
}
//#PROTO:end filepage

// ---------------- routes ----------------
function parseHash(){
  const raw = location.hash.replace(/^#\/?/, ''), [p, qs] = raw.split('?'); let parts;
  try { parts = p.split('/').filter(Boolean).map(decodeURIComponent); } catch { parts = ['?']; }
  return {parts, q: new URLSearchParams(qs || '')};
}
function resolve(r){
  const [a, b, c, d, e] = r.parts, has = (o, k) => typeof k === 'string' && Object.hasOwn(o, k);
  if (!a || a === 'kirish') return r.parts.length > 1 ? null : {view: 'gate'};
  if (a === 'shrift') return {view: 'type'};
  if (a === 'all') return {view: 'all'};
  if (a === 'dastur') return b ? null : {view: 'app', page: homePage()};
  if (a === 'fayl') return has(FILES, b) && !c ? {view: 'app', page: filePage(b)} : null;
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
const ROUTES = () => { const r = ['#/kirish', '#/dastur', '#/shrift', '#/dars/0'];
  LN().forEach(n => { r.push(`#/dars/${n}`); const L = LESSONS[n]; if (L.slides) r.push(`#/dars/${n}/slayd/1`, `#/dars/${n}/slayd/${L.slides}`); });
  return r; };
const ROUTE_OF = {gate: '#/kirish', dastur: '#/dastur', dars: '#/dars/1', ex: '#/dars/2', type: '#/shrift', all: '#/all'};
function go(v){ const h = ROUTE_OF[v] || v; if (location.hash === h) render(); else location.hash = h; }
// the parent of a route (ux-spec §1): used for cold entries so the system Back button stays inside the app
function parentOf(h){
  const p = h.replace(/^#\/?/, '').split('?')[0].split('/').filter(Boolean), [a, b, c] = p;
  if (a === 'dars') return c ? `#/dars/${b}` : '#/dastur';
  return a === 'fayl' ? '#/dastur' : null;
}

const app = document.getElementById('s-app');
function mount(el, page){
  if (prepIO) { prepIO.disconnect(); prepIO = null; } clearTimeout(liveTimer);   // nothing of the previous prep page lingers
  el.dataset.screen = page.screen;
  const cut = page.html.indexOf('</header>') + 9, body = page.html.startsWith('<header') ? page.html.slice(0, cut) + '<main>' + page.html.slice(cut) + '</main>' : `<main>${page.html}</main>`;
  el.innerHTML = `<p class="screen-tag">${esc(page.tag)}</p><div class="frame"><div class="site">${body}</div></div>`;
  okina(el); markMissing(el);
  const dg = el.querySelector('#dg'); if (dg) { initGT(dg); if (page.tab > 0) { dg.dataset.instant = '1'; dg.querySelectorAll('.gt-tab')[page.tab]?.click(); delete dg.dataset.instant; } }   // ?tab=vz|kt|am|sl opens that folder tab
  if (el.querySelector('#deck')) initPrep(el);
}
let firstRender = true, byClick = false, slFocus = '';
const mem = {};      // hash -> {y, from}: coming back (browser Back) restores the scroll position and focuses the link we came from
// keep = true (language switch): same page, same place: no scroll, no focus move; setLang puts the state back
function render(keep){
  if (!keep) prepOpen = null;
  if (toast.parentNode !== document.body) document.body.append(toast);   // the copy toast sits next to its button; a rebuilt page must not take it along
  if (typeof nl !== 'undefined' && !nl.hidden && !/^#\/dastur/.test(location.hash)) nl.hidden = true;   // the new-lesson popup belongs to home: any other route closes it   // a new visit of the prep page starts with the first open card; a language switch keeps the card
  closeMenu(); toast.hidden = true;
  document.querySelectorAll('[data-clone]').forEach(x => x.remove());
  let r = parseHash(); let res = resolve(r);
  if (res && res.redirect) { history.replaceState(null, '', res.redirect); r = parseHash(); res = resolve(r); }   // old part routes (#/dars/2/vazifa) land on the folder tab
  if (!res) { history.replaceState(null, '', '#/dastur'); res = resolve(parseHash()); setTimeout(() => flashToast('toast.notfound'), 50); }
  if (res.locked) history.replaceState(null, '', '#/dastur');
  const view = res.view; document.body.dataset.view = view;
  if (view === 'gate' && !document.getElementById('nl').hidden) document.getElementById('nl').hidden = true;
  document.querySelectorAll('[data-go]').forEach(x => x.setAttribute('aria-pressed', ROUTE_OF[x.dataset.go] === (location.hash || '#/kirish')));
  const jump = document.getElementById('jump'); if (jump) jump.value = ROUTES().includes(location.hash) ? location.hash : '';
  if (todaySel) todaySel.value = Object.keys(TODAY_PRESETS).find(k => isoMs(TODAY_PRESETS[k]) === TODAY) || '';
  document.getElementById('s-gate').classList.toggle('is-on', view === 'gate' || view === 'all');
  document.getElementById('s-type').classList.toggle('is-on', view === 'type' || view === 'all');
  app.classList.toggle('is-on', view === 'app');
  if (view !== 'app') app.replaceChildren();   // no duplicate ids while #/all stacks its own copies
  document.title = view === 'app' ? res.page.title + ' · ' + t('title.site') : t('title.' + view) + ' · ' + t('title.site');
  if (view === 'app') mount(app, res.page);
  let last = app;
  if (view === 'all') ['#/dastur', '#/dars/1', '#/dars/2'].forEach(h => { const el = document.createElement('section'); el.className = 'screen is-on'; el.dataset.clone = '1'; last.after(el); last = el; mount(el, resolve({parts: h.slice(2).split('/'), q: new URLSearchParams()}).page); });
  if (res.locked) openLockSheet(res.locked);
  const p = r.q.get('p'), target = p && app.querySelector(`[data-pid="${CSS.escape(p)}"]`), m = mem[location.hash];
  if (keep) {}
  else if (target) { const dt = target.closest('details'); if (dt) dt.open = true; scrollTo(0, 0); target.scrollIntoView({block: 'start'}); const tt = target.querySelector('.tt'); tt && tt.focus({preventScroll: true}); }
  else if (!byClick && m && !firstRender) { scrollTo(0, m.y); const a = m.from && document.querySelector(`#s-app a[href="${CSS.escape(m.from)}"]`); if (a) a.focus({preventScroll: true}); }
  else if (slFocus && app.querySelector(`[data-slnav="${slFocus}"]`)) { scrollTo(0, 0); app.querySelector(`[data-slnav="${slFocus}"]`).focus({preventScroll: true}); }
  else { scrollTo(0, 0); if (!firstRender) { const h = document.querySelector('.screen.is-on h1'); if (h) { h.tabIndex = -1; h.focus({preventScroll: true}); } } }
  if (view === 'app' && !location.hash.startsWith('#/fayl/')) prevHash = location.hash;
  firstRender = false; byClick = false; slFocus = '';
}
window.addEventListener('hashchange', () => render());
// remember where a link was clicked (scroll + the link itself) so Back can return there
document.addEventListener('click', e => { const a = e.target.closest('a[href^="#/"]'); if (!a || a.dataset.slnav) return; mem[location.hash] = {y: scrollY, from: a.getAttribute('href')}; byClick = true; }, true);
// slide viewer: the ‹ › buttons, tap zones (left third = back, right two thirds = forward) and the keys all REPLACE the history entry
document.addEventListener('click', e => { const b = e.target.closest('[data-slnav]'); if (!b) return; e.preventDefault(); slFocus = b.dataset.slnav; location.replace(b.getAttribute('href')); });
document.addEventListener('click', e => { const st = e.target.closest('.slv-stage'); if (!st) return; const i = +st.dataset.sl, n = st.dataset.n, N = +st.dataset.max, r = st.getBoundingClientRect();
  const to = (e.clientX - r.left) < r.width / 3 ? i - 1 : i + 1; if (to >= 1 && to <= N) location.replace(`#/dars/${n}/slayd/${to}`); });
document.addEventListener('keydown', e => { const st = document.querySelector('.slv-stage'); if (!st || e.altKey || e.ctrlKey || e.metaKey || !['ArrowLeft', 'ArrowRight', ' '].includes(e.key) || document.querySelector('dialog[open]')) return;
  if (e.target.closest('input,select,textarea,[contenteditable],[role=tablist]') || (e.key === ' ' && e.target.closest('button,a,summary'))) return;
  const i = +st.dataset.sl, N = +st.dataset.max, to = i + (e.key === 'ArrowLeft' ? -1 : 1); if (to >= 1 && to <= N) { e.preventDefault(); location.replace(`#/dars/${st.dataset.n}/slayd/${to}`); } });
// "Bajarildi / Bajardim / Amaliyotni yakunladim" toggles (persisted)
document.addEventListener('click', e => { const b = e.target.closest('[data-end]'); if (!b) return; const on = !S.has(b.dataset.end); S.tick(b.dataset.end, on);
  b.setAttribute('aria-pressed', on); b.textContent = on ? b.dataset.on : b.dataset.off; live.textContent = t(on ? 'live.end_on' : 'live.end_off'); refreshCounts(); });
// a Vazifa mark inside a folder pane: the tab's own check follows it
document.addEventListener('click', e => { const b = e.target.closest('.gt-pane [data-end]'); if (!b) return; const tab = document.getElementById(b.closest('.gt-pane').getAttribute('aria-labelledby')), l = tab.dataset.l;
  tab.innerHTML = b.getAttribute('aria-pressed') === 'true' ? `<span class="ok">${I('check', 12)}${esc(l)}<span class="sr-only">${T('common.sr_done')}</span></span>` : esc(l); });
function refreshCounts(){ document.querySelectorAll('[data-cnt]').forEach(el => { const [type, id] = el.dataset.cnt.split(':'); el.textContent = cntText(type, id); }); }

// the locked-lesson sheet (static markup in the page): its title and text depend on which lesson was tapped; applyStatic re-renders them with these parameters on a language switch
function lockSheet(n){
  const sh = document.getElementById('lock-sheet'), ti = sh.querySelector('#ls-t'), de = sh.querySelector('.sheet-d');
  ti.dataset.i18n = LESSONS[n].d ? 'lock.title' : 'lock.title_tba'; ti.dataset.i18nP = JSON.stringify({n, date: lessonDate(n)}); de.dataset.i18n = 'lock.desc_n';
  applyStatic(sh); okina(sh); return sh;
}
const openLockSheet = n => lockSheet(n).showModal();
document.addEventListener('click', e => { const b = e.target.closest('[data-lock]'); if (b) lockSheet(+b.dataset.lock); }, true);   // the card's own handler opens it: set the text first
//#PROTO:begin reviewbar
// review bar: the demo date (?today=...) changes every lesson state at once
function setToday(key){
  TODAY = isoMs(TODAY_PRESETS[key]); const u = new URL(location.href); u.searchParams.set('today', TODAY_PRESETS[key]); history.replaceState(history.state, '', u); render();
}
const todaySel = document.getElementById('today');
if (todaySel) todaySel.addEventListener('change', () => todaySel.value && setToday(todaySel.value));
//#PROTO:end reviewbar

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
//#PROTO:begin setlang
function setLang(l){
  if (!LANGS.includes(l) || l === LANG) return;
  const st = langSnapshot();
  LANG = l; try { localStorage.setItem(LANG_KEY, l); } catch {}
  const u = new URL(location.href); if (u.searchParams.has('lang')) { u.searchParams.set('lang', l); history.replaceState(history.state, '', u); } // a ?lang link keeps saying the language on screen
  updateLangUI(); applyStatic(); okina(document.body); gateRelang();
  if (document.body.dataset.view !== 'gate' || parseHash().parts.length) render(true);
  langRestore(st);
}
//#PROTO:end setlang
document.addEventListener('click', e => { const b = e.target.closest('[data-lang]'); if (b) setLang(b.dataset.lang); });
