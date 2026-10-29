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
  u4(){ return !!this.d.u4; },
  setU4(v){ this.d.u4 = v ? 1 : 0; this.save(); },
};
S.load();
registerContent();
//#STATE:end
// each lesson has ONE fixed colour whatever its state (state = words + icons in the note, never colour); yellow also stays the progress ring
const LCOL = ['yellow', 'lilac', 'grey', 'blue', 'dark'];
//#GATE:begin   (the app replaces this block: the server says which lesson is live and which parts are open, see app_state.js)
// ---- which lesson is live / open / locked comes from the group's dates against "today" (2.0 gating). Demo today: ?today=YYYY-MM-DD, else the story date (lesson 3 live, 4 locked)
const DAY = 864e5, utc = (d, m) => Date.UTC(2026, m - 1, d), isoMs = x => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(x || ''); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null; };
const TODAY_PRESETS = {before: '2026-09-05', day1: '2026-09-12', story: '2026-09-26', over: '2026-10-12'};
let TODAY = isoMs(new URLSearchParams(location.search).get('today')) ?? isoMs(TODAY_PRESETS.story);
const lessonAt = n => utc(...LESSONS[n].d);
const courseStarted = () => TODAY >= lessonAt(1);
const liveLesson = () => { for (let n = 4; n >= 1; n--) if (TODAY >= lessonAt(n)) return TODAY < (n === 4 ? lessonAt(4) + 7 * DAY : lessonAt(n + 1)) ? n : 0; return 0; };   // a lesson is live from its date until the next one's (lesson 4: one week)
const isLocked = n => n >= 1 && TODAY < lessonAt(n) && !(n === 4 && S.u4());   // S.u4 = the review switch that opens lesson 4 early
const partLock = (n, p) => null;   // prototype: every part of an open lesson is open. The app returns the opening time (iso) of a part that is still locked.
//#GATE:end

// ---- text helpers (content = 2.0 Uzbek text, unless a translation was added on purpose; placeholders use ns.* UI keys)
// t() = plain text (textContent; esc() it before it goes into HTML or an attribute), T() = escaped HTML, cx() = content as plain text, cxh() = content as HTML with lang="uz-Latn" when it is still Uzbek inside a ru/en page.
// *H variants below return HTML; the plain ones are for search, aria, titles and the copy text.
const num2 = n => String(n).padStart(2, '0');
const lessonDate = n => LESSONS[n].d ? fmtDate(...LESSONS[n].d) : t('date.tba');
const stepsText = (d, tt) => t('steps', {d, t: tt, pl: tt});
const exTitleT = k => k === '03' ? t('pick.title') : EX[k].title ? cx(`c.ex.${k}.title`, EX[k].title) : '';
const exTagT = k => cx(`c.ex.${k}.tag`, EX[k].tag);
const exTitleH = k => k === '03' ? esc(t('pick.title')) : EX[k].title ? cxh(`c.ex.${k}.title`, EX[k].title) : '';
const exTagH = k => cxh(`c.ex.${k}.tag`, EX[k].tag);
const exNoteH = k => EX[k].note ? cxh(`c.ex.${k}.note`, EX[k].note) : esc(t(EX[k].noteKey || 'ns.note'));
const exExtra = (k, h) => { const x = EX[k].extra; if (!x) return ''; return x.startsWith('c.') ? (h ? cuh(x) : cu(x)) : (h ? esc(t(x)) : t(x)); };   // c.* = a 2.0 label (Uzbek, tagged); otherwise our own wording
const pBase = {ex: (page, p) => `c.ex.${page}.${p.id}`, vz: (page, p) => `c.vz1.${p.id}`, lib: (page, p) => `c.lib.${p.id}`, h: (page, p) => `c.h.${page}.${p.id}`};
// h = true: the same value as escaped HTML (content gets lang="uz-Latn" in ru/en, ns.* placeholders are translated UI and get none)
const pText = (kind, page, p, h) => {
  if (p.text == null) { const x = t(p.qimmat ? 'ns.text_qimmat' : 'ns.text'); return h ? mark(esc(x)) : x; }
  const k = pBase[kind](page, p) + '.text'; return h ? cxh(k, p.text, x => mark(esc(x))) : cx(k, p.text);
};
const pWhere = (kind, page, p, h) => {
  if (p.where === false) return '';   // 2.0 names no source for this prompt
  if (p.where == null) { const x = t('ns.source'); return h ? esc(x) : x; }
  const k = pBase[kind](page, p) + '.where'; return h ? cxh(k, p.where) : cx(k, p.where);
};
const pTitle = (kind, page, p, i, h) => {
  if (p.title != null) { const k = pBase[kind](page, p) + '.title'; return h ? cxh(k, p.title) : cx(k, p.title); }
  if (kind === 'h') return pWhere(kind, page, p, h);
  const x = kind === 'vz' ? t('ns.q_title', {id: p.id}) : kind === 'lib' ? t('ns.prompt', {n: p.id}) : t('ns.prompt', {n: +p.id.replace(/\D/g, '') || i + 1});
  return h ? esc(x) : x;
};
const pParts = (kind, page, p, i) => ({title: pTitle(kind, page, p, i), titleH: pTitle(kind, page, p, i, true), where: pWhere(kind, page, p), whereH: pWhere(kind, page, p, true), text: pText(kind, page, p), textH: pText(kind, page, p, true)});
const hTitle = h => cx(`c.h.${h.id}.title`, h.title);
const hTitleH = h => cxh(`c.h.${h.id}.title`, h.title);
const hNatijaH = h => h.natija ? cxh(`c.h.${h.id}.natija`, h.natija) : esc(t('ns.natija'));
const sectName = s => cu('c.sect.' + s.k), sectNameH = s => cuh('c.sect.' + s.k);
const kindT = n => t('kind.' + LESSONS[n].kind);
const ltitle = n => t(`lesson.${n}.title`);

// ---- progress model (ux-spec §2): L1 = slides + core exercises 01,02,03(A or B),04 + Vazifa = 6; L2 = slides + Amaliyot + Vazifa = 3; L3 = slides + Vazifa = 2; L4 = Hermes 01-09 = 9
const pk = (page, id) => `p:${page}:${id}`;
const slDone = n => S.sl(n) >= LESSONS[n].slides;
const exCount = k => { const e = EX[k]; return [e.prompts.filter(p => S.has(pk(k, p.id))).length, e.prompts.length]; };
const exDone = k => { const e = EX[k]; if (e.pick) return e.pick.some(exDone); if (S.has('x:' + k)) return true; const [d, tt] = exCount(k); return tt > 0 && d === tt; };
const vzCount = () => [VZ1.main.filter(p => S.has(pk('v1', p.id))).length, VZ1.main.length];
const vzDone1 = () => { const [d, tt] = vzCount(); return d === tt; };
const hCount = h => [h.prompts.filter(p => S.has(pk('h' + h.id, p.id))).length, h.prompts.length];
const hDone = h => S.has('x:h' + h.id) || (h.prompts.length > 0 && hCount(h)[0] === h.prompts.length);
const prepCount = () => PREP.items.filter((_, i) => S.has('prep:' + i)).length;
const firstOpen = (e, page) => e.prompts.find(p => !S.has(pk(page, p.id)));
const slHref = n => `#/dars/${n}/slayd/${S.sl(n) === 0 || slDone(n) ? 1 : S.sl(n)}`;
const exHref = (k, pid) => `#/dars/1/amaliyot/${k}${pid ? '?p=' + pid : ''}`;
const partOpen = (n, p) => !partLock(n, p);
function units(n){
  const sl = partOpen(n, 'sl') ? [{label: t('unit.sl'), kind: 'sl', done: slDone(n), href: slHref(n)}] : [];
  if (n === 1) return sl.concat(partOpen(1, 'am') ? CORE.map(k => ({label: t('unit.am_n', {num: EX[k].num}), done: exDone(k), href: exHref(k)})) : [], partOpen(1, 'vz') ? [{label: t('unit.vz'), done: vzDone1(), href: '#/dars/1/vazifa'}] : []);
  if (n === 2) return sl.concat(partOpen(2, 'am') ? [{label: t('unit.am'), done: libUsed(), href: '#/dars/2/amaliyot'}] : [], partOpen(2, 'vz') ? [{label: t('unit.vz'), done: S.has('f:v2'), href: '#/dars/2?tab=vz'}] : []);
  if (n === 3) return sl.concat(partOpen(3, 'vz') ? [{label: t('unit.vz'), done: S.has('f:v3'), href: '#/dars/3?tab=vz'}] : []);
  if (n === 4) return partOpen(4, 'am') ? HERMES.filter(h => !h.bonus).map(h => ({label: t('unit.hermes', {id: h.id}), done: hDone(h), href: '#/dars/4/amaliyot/' + h.id})) : [];
  return [];
}
const lProg = n => { const u = units(n); return [u.filter(x => x.done).length, u.length]; };
const lDone = n => { if (LESSONS[n].lock && Object.keys(LESSONS[n].lock).length) return false; const [d, tt] = lProg(n); return tt > 0 && d === tt; };   // a lesson with a part still locked is not finished
const ring = () => [[1, 2, 3, 4].filter(n => !isLocked(n) && lDone(n)).length, 4];
// first unfinished item of a lesson, with a precise label and target ("Keyingi qadam"); `what` is the label without the lesson prefix
function nextOf(n){
  const mk = (what, href, started) => ({what, label: `${T('lesson.n', {n})} · ${what}`, href, started: !!started}); // what / label are HTML; started = the target already has progress ("continue" vs "start")
  if (n === 1) {
    if (partOpen(1, 'am')) for (const k of CORE) { if (exDone(k)) continue; const e = EX[k];
      if (e.pick) { const o = e.pick.find(x => exCount(x)[0] > 0) || e.pick[0]; return mk(T('next.pick', {num: EX[o].num, title: HT(exTitleH(o))}), '#/dars/1/amaliyot/03', exCount(o)[0] > 0); }
      const p = firstOpen(e, k); return mk(p ? T('next.ex_prompt', {num: e.num, pid: p.id, title: HT(pTitle('ex', k, p, 0, true))}) : T('next.ex', {num: e.num}), exHref(k, exCount(k)[0] > 0 ? p?.id : undefined), exCount(k)[0] > 0); }
    if (partOpen(1, 'vz') && !vzDone1()) { const p = VZ1.main.find(x => !S.has(pk('v1', x.id))); const st = vzCount()[0] > 0; return mk(T('next.vz', {pid: p.id}), st ? `#/dars/1/vazifa/promptlar?p=${p.id}` : '#/dars/1/vazifa', st); }
    if (partOpen(1, 'sl') && !slDone(1)) return mk(T('next.sl', {i: S.sl(1), total: LESSONS[1].slides}), slHref(1), S.sl(1) > 0);
  }
  const u = units(n).find(x => !x.done); if (!u) return null;
  return mk(esc(u.label) + (u.kind === 'sl' ? ` · ${S.sl(n)} / ${LESSONS[n].slides}` : ''), u.href, u.kind === 'sl' && S.sl(n) > 0);
}
const nextStep = () => { const live = liveLesson();
  if (courseStarted() && PREP.items.length > 2) { const i = [1, 2].find(j => !S.has('prep:' + j)); if (i != null) return {href: '#/dars/0', label: T('next.prep', {title: HT(T(`prep.${i}.title`))})}; }   // the Google account and Claude are what lesson 1 needs
  return [1, 2, 3, 4].filter(n => !isLocked(n) && n !== live).map(nextOf).find(Boolean) || null; }; // the live lesson is the hero card, so it is not repeated here
// live counters shown on the open page ("k/t"): one formatter for the templates and for refreshCounts()
function cntText(type, id){
  if (type === 'ex') { const [d, tt] = exCount(id); return t('ex.k', {d, t: tt, pl: tt}); }
  if (type === 'h') { const [d, tt] = hCount(HERMES[+id - 1]); return t('ex.k', {d, t: tt, pl: tt}); }
  if (type === 'vz1') { const [d, tt] = vzCount(); return t('vz1.cnt', {d, t: tt, pl: tt}); }
  if (type === 'vz1k') { const [d, tt] = vzCount(); return t('vz1.sheet.k', {d, t: tt, pl: tt}); }
  if (type === 'sc') { const [d, tt] = sectCount(sectBy(id)); return `${d}/${tt}`; }
  if (type === 'sect') { const [d, tt] = sectCount(sectBy(id)); return t('lib.cnt', {d, t: tt, pl: tt}); }
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
const exMark = k => exDone(k) ? SRCHK() : (!EX[k].pick && exCount(k)[0] ? esc(t('row.mark', {d: exCount(k)[0], t: exCount(k)[1], pl: exCount(k)[1]})) : '');
const exSubH = k => { if (k === '03') return esc(exDone('03a') ? t('ex.sub_03a') : exDone('03b') ? t('ex.sub_03b') : ''); return exExtra(k, true); };
const exTitleHTML = k => EX[k].tagTitle ? `<span class="xtag">${exTagH(k)}</span>` : exTitleH(k);
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
    let cls, note, href = `#/dars/${n}`;
    if (n === 0) { cls = 'c-yellow'; note = k === 4 ? `${I('check', 14)}${T('note.done', {d: 4, t: 4, pl: 4})}` : courseStarted() ? T('note.open', {d: k, t: 4, pl: 4}) : !LESSONS[0].d ? T('prep.cnt', {d: k, pl: 4}) : T('note.prep_todo', {until: t('date.until', {date: lessonDate(0)}), d: k, pl: 4}); }
    else if (isLocked(n)) {   // before its date: the lesson keeps its own colour, with a lock and the date (once, in the note)
      return `<li class="g-${LCOL[n]}"><button class="folder c-${LCOL[n]}" type="button" aria-haspopup="dialog" data-sheet="lock-sheet" data-lock="${n}">${tab}<span class="f-top"><span class="f-label">${T('lesson.n', {n})}</span></span>
        <span class="f-row"><span><span class="f-title">${T(`lesson.${n}.card`)}</span><span class="f-sub">${T(n === 4 ? 'lock.sub' : `lesson.${n}.sub`)}</span></span><span class="f-note">${I('lock', 14)}${T(LESSONS[n].d ? 'date.opens' : 'date.tba', {date: lessonDate(n)})}</span></span></button></li>`;
    } else {
      const [d, tt] = lProg(n);
      if (lDone(n)) { cls = 'c-grey'; note = `${I('check', 14)}${T('note.done', {d: tt, t: tt, pl: tt})}`; }
      else if (n === live) { cls = 'c-lilac'; note = `<span class="dot" aria-hidden="true"></span>${T('note.live_a')}<span class="nw2">${T('note.live_b')}</span>${T('note.live_c', {d, t: tt, pl: tt})}`; }
      else { cls = 'c-lilac'; note = T('note.open', {d, t: tt, pl: tt}); }
    }
    cls = n === 4 ? 'c-night' : 'c-' + LCOL[n];   // unlocked lesson 4 keeps its dark identity, with normal (white) ink
    return `<li class="g-${LCOL[n]}"><a class="folder ${cls}" href="${href}">${tab}<span class="f-top"><span class="f-label">${label}</span>${arrow}</span><span class="f-row"><span class="f-title">${T(`lesson.${n}.card`)}</span><span class="f-note">${note}</span></span></a></li>`;
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
    const [d, tt] = lProg(live), L = LESSONS[live], s = S.sl(live), c4 = live === 4;
    const nxl = nextOf(live), slSub = !L.slides ? stepsText(d, tt) : s === 0 ? T('hero.sub_start', {n: L.slides}) : s >= L.slides ? T('hero.sub_seen', {n: L.slides}) : T('hero.sub', {i: s, n: L.slides}), sub = nxl && !/\/slayd\//.test(nxl.href) ? nxl.what : slSub, href = nxl ? nxl.href : `#/dars/${live}`;   // the hero opens today's next step ("continue" only when something was seen)
    headCol = LCOL[live];
    hero = `<a class="folder flatc c-${c4 ? 'night' : LCOL[live]} now-card" href="${href}"><span class="f-top"><span class="f-label">${T('hero.k')}<br>${T('lesson.label', {n: live, date: lessonDate(live)})}</span>${arrowH}</span>
        <span><span class="f-title">${T(`lesson.${live}.card`)}</span><span class="f-sub">${sub}</span></span></a>`;
  }
  if (!pre && ns) cta = pill(`${T(live ? 'next.k_backlog' : 'next.k')} · ${ns.label}`, ns.href);
  else if (!pre && !live && rd === rt) cta = pill(T('next.all_done'), '#/dars/4?tab=kt');   // the whole course is done: say so, and point at what is still open
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
    <ul class="grid3 lessons">${[0, 1, 2, 3, 4].map(cardHTML).join('')}</ul>`};
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
const deckCols = open => open < 0 ? 'repeat(4,minmax(0,1fr))' : PREP.items.map((_, i) => i === open ? '2fr' : '1fr').join(' ');
function prepPage(){
  const done = PREP.items.map((_, i) => S.has('prep:' + i)), open = prepOpen ?? done.indexOf(false);
  prepFresh = prepOpen === null; prepOpen = open;   // a language switch re-renders: the open card stays and its picture does not replay
  const cards = PREP.items.map((it, i) => {
    const d = done[i], o = i === open, acts = it.actions || [];
    const ext = `<span class="sr-only"> ${T('common.sr_external')}</span>`;
    return `<li class="folder flatc c-yellow pc${o ? ' open' : ''}${d ? ' done' : ''}" id="pc${i}" data-i="${i}" style="--vt:pc${i}"><button class="hd" type="button" id="ph${i}" aria-expanded="${o}" aria-controls="pb${i}" aria-labelledby="pt${i}" aria-describedby="pn${i}"><span class="no">${num2(i + 1)}</span><span class="f-title" id="pt${i}">${T(`prep.${i}.title`)}</span><span class="pic">${PREP_ART[i]}</span><span class="nt" id="pn${i}">${T(`prep.${i}.note`)}<span class="stp">${T('prep.steps_n', {n: it.steps, pl: it.steps})}<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span></span></button>
      <div class="bd" id="pb${i}" role="region" aria-labelledby="pt${i}"${o ? '' : ' hidden'}><ol class="steps">${Array.from({length: it.steps}, (_, j) => `<li>${T(`prep.${i}.s${j}`)}</li>`).join('')}</ol>
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

// ---- lessons 1-4: the gooey folder with only the parts the lesson really has
const partWhen = iso => /^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(iso || '') ? {date: fmtDate(+iso.slice(8, 10), +iso.slice(5, 7)), time: iso.slice(11, 16)} : {date: '…', time: '…'};   // iso with the Tashkent offset: its own date and clock time
const lockedPane = iso => `<p class="p-label">${T('part.locked')}</p><div><p class="p-sub">${T('part.opens', partWhen(iso))}</p></div>`;
const libUsed = () => LIB.some(p => S.has(pk('lib', p.id)));   // the library is a reference: any copied prompt counts
const tabOfHref = h => !h ? null : /\/slayd\//.test(h) ? 'sl' : /\/amaliyot/.test(h) ? 'am' : /\/vazifa|tab=vz/.test(h) ? 'vz' : /tab=kt/.test(h) ? 'kt' : null;
function unitsLine(n){   // "Slaydlar, 4 ta mashq va vazifa": what the numbers count
  const w = L => ({sl: 'units.sl', am: n === 1 ? 'units.am1' : n === 2 ? 'units.am2' : 'units.am4', vz: 'units.vz', kt: 'units.kt'}[L]), names = LESSONS[n].parts.map(p => t(w(p)));
  const first = names.slice(0, -1).join(', ');
  return esc(names.length > 1 ? `${first} ${t('units.and')} ${names[names.length - 1]}` : names[0] || '');
}
const bookRow = (f, name, meta) => `<li><a class="ef-row" ${fa(f)}><span><span class="sr-only">${T('common.sr_download')}</span><span class="ef-nm">${name}${f.ph ? NSTAG() : ''}</span><span class="ef-mt">${meta}</span></span><span class="ef-dl">${I('down', 18)}</span></a></li>`;
const lk = (href, name, sub, mk) => `<li class="lk"><a class="xr${mk.n === '' ? ' nn' : ''}" href="${href}"${mk.a || ''}>${mk.n === '' ? '' : `<span class="n">${mk.n}</span>`}<span class="xt">${name}${sub ? `<small class="xo">${sub}</small>` : ''}</span><span class="xm"><span class="xmt">${mk.m}</span>${I('next')}</span></a></li>`;
function lessonPage(n, tab){
  tab = tab || tabOfHref((nextOf(n) || {}).href);   // no ?tab: the tab with today's work
  const L = LESSONS[n], [d, tt] = lProg(n);
  const tabsDef = L.parts.map(p => ({p, label: t('unit.' + p), lock: partLock(n, p), done: partLock(n, p) ? false : {
    sl: () => slDone(n), am: () => n === 1 ? CORE.every(exDone) : n === 2 ? libUsed() : HERMES.filter(h => !h.bonus).every(hDone),
    vz: () => n === 1 ? vzDone1() : S.has('f:v' + n), kt: () => false}[p]()}));
  const pane = {
    sl: () => `<p class="p-label">${T('unit.sl')}</p><p class="p-num">${S.sl(n) > 0 ? `${S.sl(n)}/${L.slides}` : L.slides}</p>
      <div class="gt-foot"><span class="gt-meta">${T('pane.sl.meta', {n: L.slides, pl: L.slides, kind: kindT(n)})}</span>${play(slHref(n), S.sl(n) === 0 ? T('pane.sl.start') : slDone(n) ? T('pane.sl.again') : T('pane.sl.go', {i: S.sl(n), n: L.slides}), 'play', 18)}</div>`,
    am: () => n === 1 ? `<p class="p-label">${T('pane.am1.label')}<br>${cuh('c.am1.title')}</p>
      <ol class="p-list">${EX_ORDER.map(k => lk(`#/dars/1/amaliyot/${k}`, exTitleHTML(k), exSubH(k), {n: EX[k].num.slice(0, 2), m: exMark(k)})).join('')}</ol>
      <p class="gt-meta">${T('pane.am1.meta', {d: CORE.filter(exDone).length, pl: 4})}</p><div class="gt-foot end">${play('#/dars/1/amaliyot', T('pane.am1.page'))}</div>`
      : n === 2 ? `<p class="p-label">${T('pane.am2.label')}</p>
      <ol class="p-list">${SECT.map(s => lk(`#/dars/2/amaliyot/${s.key}`, sectNameH(s), '', {n: '', m: `${s.a}–${s.b}`})).join('')}</ol>
      <p class="gt-meta">${T(libUsed() ? 'pane.am2.done' : 'pane.am2.todo')}</p><div class="gt-foot end">${play('#/dars/2/amaliyot', T('pane.am2.open'))}</div>`
      : `<p class="p-label">${T('pane.am4.label')}</p>
      <ol class="p-list">${HERMES.map(h => lk(`#/dars/4/amaliyot/${h.id}`, hTitleH(h), h.bonus ? esc(t('common.bonus')) : '', {n: h.id, m: hDone(h) ? SRCHK() : ''})).join('')}</ol>
      <div class="gt-foot end">${play('#/dars/4/amaliyot', T('pane.am4.page'))}</div>`,
    vz: () => n === 1 ? (() => { const [vd, vt] = vzCount(), nx1 = VZ1.main.find(x => !S.has(pk('v1', x.id)));
      return `<p class="p-label">${T('pane.vz1.label')}</p><div><p class="p-num">${vd}/${vt}</p><p class="p-sub">${T('pane.vz1.sub')}</p></div>
      <div class="gt-foot${nx1 && vd === 0 ? ' end' : ''}">${nx1 && vd === 0 ? '' : `<a class="gt-meta lk2" href="#/dars/1/vazifa">${T('pane.vz1.page')}</a>`}${play(nx1 && vd > 0 ? `#/dars/1/vazifa/promptlar?p=${nx1.id}` : nx1 ? '#/dars/1/vazifa' : '#/dars/1/vazifa/promptlar', nx1 ? T(vd > 0 ? 'pane.vz1.go' : 'pane.vz1.begin', {pid: nx1.id}) : T('pane.vz1.open'))}</div>`; })()
      : `<p class="p-label">${T('pane.vz.label')}</p><div><p class="p-sub">${cuh('c.hw.' + n)}</p><p class="p-sub">${T('vzf.hint2')}</p></div>
      <div class="gt-foot end">${endb('f:v' + n, S.has('f:v' + n), 'vzf.on', 'vzf.off', '', 'vzf.aria')}</div>`,
    kt: () => `<div><p class="p-label">${T('pane.kt.label', {title: HT(cuh('c.book.title'))})}</p><p class="p-sub">${cuh('c.book.note')}</p></div>
      <div class="ex-files"><ul>${bookRow(BOOK.lat, T('book.lat_name'), T('book.meta_lat'))}${BOOK.variants.map(v => bookRow(v.file, `<span${v.v === 'cyrl' ? ' lang="uz-Cyrl"' : ''}>${esc(v.label)}</span>`, T('book.cyr_extra'))).join('')}</ul></div>`,
  };
  const tabs = tabsDef.map((x, i) => `<button class="gt-tab" role="tab" type="button" id="dg-t${i}" aria-controls="dg-p${i}" aria-selected="${i === 0}" data-l="${esc(x.label)}"${i ? ' tabindex="-1"' : ''}>${x.lock ? `<span class="lkd">${I('lock', 12)}${esc(x.label)}</span>` : x.done ? `<span class="ok">${I('check', 12)}${esc(x.label)}<span class="sr-only">${T('common.sr_done')}</span></span>` : esc(x.label)}</button>`).join('');
  const panes = tabsDef.map((x, i) => `<div class="gt-pane" role="tabpanel" id="dg-p${i}" aria-labelledby="dg-t${i}"${i ? ' inert' : ''}>${x.lock ? lockedPane(x.lock) : pane[x.p]()}</div>`).join('');
  const title = ltitle(n);   // no hero CTA pill: each folder tab already carries its part's own action (user, 2026-10-17)
  return {screen: 'dars', tab: Math.max(0, L.parts.indexOf(tab)), tag: `#/dars/${n} · ` + t('tag.lesson', {n, parts: L.parts.length}), title: t('title.lesson', {n, title}), html: nav('d') + `
    <div class="hero"><div class="hero-l">
      ${dlh('#/dastur', T('nav.home'), T('lesson.meta', {n, date: lessonDate(n), d, t: tt, pl: tt}))}
      <p class="lunits">${unitsLine(n)}</p>
      <h1 class="headline${title.split(' ').some(w => w.length >= 11) ? ' long' : ''}"><span class="ln">${T('lesson.n', {n})}</span><span class="ln">${esc(title)}</span></h1>
      <p class="lsub">${T(`lesson.${n}.sub`)}</p>
      <p class="lede">${T(`lesson.${n}.lede`)}</p>
    </div>
    <div class="gt gt-${LCOL[n]} g-${LCOL[n]}" id="dg" style="--n:${tabsDef.length}"><div class="gt-goo" aria-hidden="true"><span class="gt-ind"></span><span class="gt-pan"></span></div>
      <div class="gt-tabs" role="tablist" aria-label="${esc(t('tab.list'))}">${tabs}</div><div class="gt-body">${panes}</div></div></div>`};
}

// ---- lesson 1: Vazifa pages
function vz1Page(){
  return {screen: 'ex', tag: '#/dars/1/vazifa · ' + t('tag.vz1'), title: t('title.vz', {n: 1}), html: nav('d') + wrap(`
    ${dlh('#/dars/1', T('lesson.n', {n: 1}), T('vz1.meta', {n: 1}))}
    <h1 class="headline ex-h">${T('vz1.title')}</h1><p class="lede">${T('vz1.lede')}</p>
    <div class="ex-files">
      ${group(T('vz1.g1'), VZ1.files.map(f => fileRow(f)).join('') + fileRow(VZ1.zip, t('vz1.zip')), T('vz1.g1_hint'), T('vz1.g1_note'), `<p class="ef-hint">${T('nb.hint')}</p>` + extLink('https://notebooklm.google.com', 'nb.open'))}
      ${group(T('vz1.g2'), rowLink('#/dars/1/vazifa/promptlar', T('vz1.g2_cta'), cnt('vz1')) + (VZ1.sheetPdf ? fileRow(VZ1.sheetPdf, t('vz1.pdf')) : ''), '', T('vz1.g2_note'))}
      ${VZ1.guide ? group(T('vz1.g3'), fileRow(VZ1.guide), '', T('vz1.g3_note')) : ''}
    </div>`)};
}
function vz1Sheet(){
  const vt = (p, i, h) => (p.title != null ? pTitle('vz', 'v1', p, i, h) : (h ? esc : x => x)(pTitle('vz', 'v1', p, i).replace(/^P\d+ /, '')));
  const lis = (arr, off) => arr.map((p, i) => pli({...pParts('vz', 'v1', p, i), i: off + i, pid: p.id, no: p.id, title: vt(p, i), titleH: vt(p, i, true), ph: p.ph, lbl: 'lbl.manba', key: pk('v1', p.id)})).join('');
  return {screen: 'ex', tag: '#/dars/1/vazifa/promptlar · ' + t('tag.vz1sheet'), title: t('title.vzsheet'), html: nav('d') + wrap(`
    ${dlh('#/dars/1/vazifa', T('back.vz1'), T('vz1.sheet.meta'))}
    <h1 class="headline ex-h">${T('vz1.sheet.h1')}</h1><p class="lede">${T('vz1.sheet.lede')}</p>
    <ol class="rules">${VZ1.rules.map((_, i) => `<li>${cuh('c.vz1.rule' + i)}</li>`).join('')}</ol>`,
    `<section class="s1" aria-labelledby="pr-t"><h2 class="s1-eyebrow" id="pr-t" data-cnt="vz1k">${esc(cntText("vz1k"))}</h2><p class="s1-rule">${T('vz1.sheet.rule')}</p><ol>${lis(VZ1.main, 0)}</ol>
      <details class="s1-more"><summary>${T('vz1.more')}<span class="s1-sub">${T('vz1.more_sub')}</span></summary><ol>${lis(VZ1.extra, 8)}</ol></details>
      <p class="s1-rule">${cuh('c.vz1.footnote')}</p>
      <div class="s1-end">${nextBlock('#/dars/1/vazifa', 'vz1.sheet.back')}${vzDone1() && nextOf(1) ? nextBlock(nextOf(1).href, 'vz1.sheet.next', {what: HT(nextOf(1).what)}) : ''}</div></section>`)};
}

// ---- lesson 1: Amaliyot index + exercise pages
function am1Index(){
  const rows = ks => ks.map(k => lk(`#/dars/1/amaliyot/${k}`, exTitleHTML(k), EX[k].extra === 'common.extra' ? '' : exSubH(k), {n: EX[k].num.slice(0, 2), m: exMark(k)})).join('');
  return {screen: 'ex', tag: '#/dars/1/amaliyot · ' + t('tag.am1'), title: t('title.am', {n: 1}), html: nav('a') + wrap(`
    ${dlh('#/dars/1', T('lesson.n', {n: 1}), T('am1.meta', {d: CORE.filter(exDone).length, pl: 4}))}
    <h1 class="headline ex-h">${cuh('c.am1.title')}</h1><p class="lede">${cuh('c.am1.lead')}</p>
    <ol class="rules">${AM1.rules.map((_, i) => `<li>${cuh('c.am1.rule' + i)}</li>`).join('')}</ol>
    <div class="ex-files">
      ${AM1.guide ? group(T('common.guide'), fileRow(AM1.guide)) : ''}
      ${group(T('am1.g_core'), rows(['01', '02', '03', '04']))}
      ${group(T('am1.g_extra'), rows(['05', '06']), T('am1.g_extra_hint'))}
      ${AM1.closing ? group(T('am1.g_closing'), fileRow(AM1.closing)) : ''}
    </div>`)};
}
function exPick(){
  const e = EX['03'];
  return {screen: 'ex', tag: '#/dars/1/amaliyot/03 · ' + t('tag.pick'), title: t('title.pick'), html: nav('a') + wrap(`
    ${dlh('#/dars/1/amaliyot', T('back.am1'), T('pick.meta'))}
    <h1 class="headline ex-h">${T('pick.title')}</h1><p class="lede">${T('pick.lede')}</p>
    <div class="ex-files">${group(T('pick.group'), e.pick.map(k => rowLink(`#/dars/1/amaliyot/${k}`, `${EX[k].num} · ${exTitleH(k)}`, `${cxh(`c.ex.${k}.area`, EX[k].area)} · ${exNoteH(k)}`, exMark(k))).join(''))}</div>`)};
}
function exPage(k){
  const e = EX[k]; if (e.pick) return exPick();
  const hasPh = e.prompts.some(p => p.text && hasBracket(p.text));
  const idx = EX_ORDER.indexOf(e.parent || k), nxK = e.parent ? '04' : EX_ORDER[idx + 1], nx = nxK ? EX[nxK] : null, done = S.has('x:' + k);
  const lis = e.prompts.map((p, i) => pli({...pParts('ex', k, p, i), i, pid: p.id, no: p.id, ph: p.ph, lbl: 'lbl.where', key: pk(k, p.id)})).join('');
  const meta = EX[k].extra ? T('ex.meta_extra', {num: e.num, extra: HT(exExtra(k, true))}) : T('ex.meta', {num: e.num});
  const phNote = !e.note;
  return {screen: 'ex', tag: `#/dars/1/amaliyot/${k} · ` + t('tag.ex', {num: e.num, title: e.tagTitle ? exTagT(k) : exTitleT(k)}), title: t('title.ex', {num: e.num, title: e.tagTitle ? exTagT(k) : exTitleT(k)}), html: nav('a') + wrap(`
      ${dlh(e.parent ? '#/dars/1/amaliyot/03' : '#/dars/1/amaliyot', e.parent ? T('ex.back_pick') : T('back.am1'), meta)}
      <h1 class="headline ex-h">${e.tagTitle ? `<span class="xtag big">${exTagH(k)}</span>` : exTitleH(k)}</h1>
      <p class="lede">${exNoteH(k)}${phNote ? NSTAG() : ''}</p>
      <div class="ex-files">
        ${e.brief ? group(T('ex.g1'), fileRow(e.brief, e.briefLabel ? HT(cxh(`c.ex.${k}.briefLabel`, e.briefLabel)) : '')) : ''}
        ${group(T('ex.g2'), e.sources.map(f => fileRow(f)).join(''), '', T('nb.hint'), extLink('https://notebooklm.google.com', 'nb.open'))}
      </div>`,
    `<section class="s1" aria-labelledby="pr-t"><h2 class="s1-eyebrow" id="pr-t" data-cnt="ex:${k}">${esc(cntText("ex", k))}</h2>${hasPh ? `<p class="s1-rule">${T('ex.rule')}</p>` : ''}<ol>${lis}</ol>
      ${e.promptsPdf ? `<a class="s1-pdf" ${fa(e.promptsPdf)}>${I('down', 18)}${T('ex.pdf', {size: e.promptsPdf.size ? sizeT(e.promptsPdf.size).replace(/^PDF · /, '') : t('common.namuna')})}<span class="sr-only"> (${esc(e.promptsPdf.name)})</span></a>` : ''}
      <div class="s1-end">${endb('x:' + k, done, 'end.done_ex', 'end.mark_ex', '', 'end.aria_ex')}
        ${nx ? nextBlock(`#/dars/1/amaliyot/${nxK}`, 'ex.next', {num: nx.num, title: HT(nx.tagTitle ? exTagH(nxK) : exTitleH(nxK))}) : nextBlock('#/dars/1/amaliyot', 'ex.index')}</div></section>`)};
}

// ---- lesson 2: the 47-prompt library as 5 sections (2.0 "Boʻlimlar"): an index of section cards with search, and one page per section
const sectBy = key => SECT.find(s => s.key === key);
const sectPrompts = s => LIB.filter(p => p.sect === s.k);
const sectCount = s => { const ps = sectPrompts(s); return [ps.filter(p => S.has(pk('lib', p.id))).length, ps.length]; };
const libLi = p => { const i = LIB.indexOf(p), done = S.has(pk('lib', p.id)), title = pTitle('lib', '', p, i), titleH = pTitle('lib', '', p, i, true); return `<li id="L${p.id}" class="${done ? 'done' : ''}" data-i="${i}" data-pid="${p.id}" data-key="${pk('lib', p.id)}" data-sect="${p.sect}" data-n="${p.id}" data-t="${esc(title)}">
      <span class="no" aria-hidden="true">${p.id}</span><div class="body"><h3 class="tt" tabindex="-1"><button class="acc" type="button" aria-expanded="false" aria-controls="lb${p.id}">${titleH}${p.title == null ? NSTAG() : ''}</button></h3><div class="accp" id="lb${p.id}" hidden><p class="tx" data-raw="${esc(pText('lib', '', p))}">${pText('lib', '', p, true)}</p></div></div>
      <div class="cpw"><button class="cp" type="button" aria-label="${esc(t('common.copy_aria', {title}))}"><span class="cp-c">${I('copy', 20)}</span><span class="cpl">${T('common.copy')}</span></button></div></li>`; };
const sectRange = s => `${num2(s.a)}–${num2(s.b)}`;
function libPage(){
  const on = libUsed();
  const cards = SECT.map(s => `<li><a class="folder flatc c-grey sc" href="#/dars/2/amaliyot/${s.key}"><span class="f-top"><span class="f-label">${s.num}<span class="rng">${sectRange(s)}</span></span><svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg></span>
      <span class="sc-b"><span class="f-title">${sectNameH(s)}</span><span class="sc-n">${cuh(`c.sect.${s.k}.note`)}</span></span><span class="f-note">${cnt('sc', s.key)}</span></a></li>`).join('');
  const groups = SECT.map(s => `<div class="lib-grp" data-sect="${s.k}"><p class="s1-rule">${num2(SECT.indexOf(s) + 1)} · ${sectNameH(s)}</p><ol>${sectPrompts(s).map(libLi).join('')}</ol></div>`).join('');
  return {screen: 'ex', tag: '#/dars/2/amaliyot · ' + t('tag.lib'), title: t('title.am', {n: 2}), html: nav('a') + wrap(`
      ${dlh('#/dars/2', T('lesson.n', {n: 2}), T('lib.meta'))}
      <h1 class="headline ex-h">${T('lib.title')}</h1><p class="lede">${T('lib.lede')}</p>
      <ol class="rules">${C20.lib.rules.map((_, i) => `<li>${cuh('c.lib.rule' + i)}</li>`).join('')}</ol>
      <p class="rules-link">${extLink('https://claude.ai', 'claude.open')}</p>
      <div class="lib-bar"><label class="sr-only" for="lib-q">${T('lib.search')}</label><input id="lib-q" type="search" placeholder="${esc(t('lib.search'))}" autocomplete="off"><p class="lib-n" id="lib-n" aria-live="polite"></p></div>
`,
    `<div id="lib-cards" class="ex-wide"><h2 class="ef-h">${T('lib.sections')}</h2><ul class="sects">${cards}</ul></div>
    <section class="s1" id="lib-res" aria-label="${esc(t('lib.search'))}" hidden>${groups}
      <p class="lib-empty" id="lib-empty" role="status" hidden>${T('lib.empty')} <button class="clearb" type="button" id="lib-clear">${T('lib.clear')}</button></p></section>`)};
}
function libSection(s){
  const i = SECT.indexOf(s), nx = SECT[i + 1], ps = sectPrompts(s);
  const ttl = sectName(s);
  return {screen: 'ex', tag: `#/dars/2/amaliyot/${s.key} · ` + t('tag.ex', {num: s.num, title: ttl}), title: t('title.ex', {num: s.num, title: ttl}), html: nav('a') + wrap(`
      ${dlh('#/dars/2/amaliyot', T('back.lib'), T('lib.sect_meta', {range: sectRange(s)}))}
      <h1 class="headline ex-h">${sectNameH(s)}</h1><p class="lede">${cuh(`c.sect.${s.k}.note`)}</p>`,
    `<section class="s1" aria-labelledby="pr-t"><h2 class="s1-eyebrow" id="pr-t" data-cnt="sect:${s.key}">${esc(cntText('sect', s.key))}</h2>${ps.some(p => p.text && hasBracket(p.text)) ? `<p class="s1-rule">${T('ex.rule')}</p>` : ''}<ol>${ps.map(libLi).join('')}</ol>
      <div class="s1-end">${nx ? nextBlock(`#/dars/2/amaliyot/${nx.key}`, 'lib.next', {num: nx.num, title: HT(sectNameH(nx))}) : nextBlock('#/dars/2/amaliyot', 'lib.index')}</div></section>`)};
}
function libInit(root){   // search across all 47: matching prompts appear grouped by section and the cards step aside; clearing the field brings the cards back
  const inp = root.querySelector('#lib-q'), lis = [...root.querySelectorAll('#lib-res li[data-i]')], grps = [...root.querySelectorAll('.lib-grp')], norm = s => s.toLowerCase().replace(/[ʻʼ‘’'`]/g, '');
  const empty = root.querySelector('#lib-empty'), cntEl = root.querySelector('#lib-n'), res = root.querySelector('#lib-res'), cards = root.querySelector('#lib-cards');
  function apply(){
    const term = norm(inp.value.trim());
    res.hidden = !term; cards.hidden = !!term;
    if (!term) { cntEl.textContent = ''; return; }
    let n = 0;
    lis.forEach(li => { const p = LIB[+li.dataset.i], hit = p.id.includes(term) || norm(pTitle('lib', '', p, +li.dataset.i)).includes(term) || norm(pText('lib', '', p)).includes(term); li.hidden = !hit; if (hit) n++; });
    grps.forEach(g => { g.hidden = ![...g.querySelectorAll('li[data-i]')].some(li => !li.hidden); });
    empty.hidden = n > 0; cntEl.textContent = n ? t('lib.found', {n, pl: n}) : '';   // the empty message says it; no "0 ta natija" as well
    if (/^\d{1,2}$/.test(term)) { const li = root.querySelector('#L' + term.padStart(2, '0')); if (li && !li.hidden) openAcc(li, true); }
  }
  inp.addEventListener('input', apply);
  root.querySelector('#lib-clear').addEventListener('click', () => { inp.value = ''; apply(); inp.focus(); });
  apply();
}
function openAcc(li, open){ const b = li.querySelector('.acc'); if (!b) return; b.setAttribute('aria-expanded', open); document.getElementById(b.getAttribute('aria-controls')).hidden = !open; }
document.addEventListener('click', e => { const b = e.target.closest('.acc'); if (b) openAcc(b.closest('li'), b.getAttribute('aria-expanded') !== 'true'); });

// ---- lesson 4: Hermes index, cards, book
function hIndex(){
  const rows = HERMES.map(h => rowLink(`#/dars/4/amaliyot/${h.id}`, `${h.id} · ${hTitleH(h)}${h.bonus ? ' · ' + esc(t('common.bonus')) : ''}${h.natija ? '' : NSTAG()}`, hNatijaH(h), hDone(h) ? SRCHK() : '')).join('').replace(/(Natija|Результат|Result):/g, '<b class="nat">$1:</b>');
  return {screen: 'ex', tag: '#/dars/4/amaliyot · ' + t('tag.hi'), title: t('title.am', {n: 4}), html: nav('a') + wrap(`
    ${dlh('#/dars/4', T('lesson.n', {n: 4}), T('hi.meta', {d: lProg(4)[0], pl: 9}))}
    <h1 class="headline ex-h">${T('hi.title')}</h1><p class="lede">${cuh('c.hermes.lead')}</p>
    <ol class="rules">${C20.hermes.rules.map((_, i) => `<li>${cuh('c.hermes.rule' + i)}</li>`).join('')}</ol>
    <div class="ex-files">${group(T('hi.group'), rows)}</div>`)};
}
const KEYCARDS = ['02', '04', '09', '10'];   // the cards that handle a key, token or password: the safety line is shown there (and on the index)
const NUMLINE = /^\d+\.\s/;
const codeH = x => esc(x).replace(/`([^`]+)`/g, '<code>$1</code>');   // a note's `code` spans become <code>, the backticks are not shown
function noteBody(key, txt){   // 2.0 notes carry their own line breaks: "1." lines become an ordered list, "- " lines a bullet list, the rest keeps its breaks
  const lines = cx(key, txt).split('\n'), lang = cxFb(key) ? ' lang="uz-Latn"' : '', numbered = lines.filter(l => NUMLINE.test(l)).length >= 2, out = [];
  let list = null; const flush = () => { if (list) { out.push(`<${list.t}${list.t === 'ol' ? ' class="steps"' : ' class="bul"'}>${list.items.map(x => `<li>${codeH(x)}</li>`).join('')}</${list.t}>`); list = null; } };
  for (const l of lines) {
    const t = numbered && NUMLINE.test(l) ? 'ol' : /^- /.test(l) ? 'ul' : null;
    if (t) { if (!list || list.t !== t) { flush(); list = {t, items: []}; } list.items.push(l.replace(t === 'ol' ? NUMLINE : /^- /, '')); }
    else { flush(); out.push(`<span class="ln">${codeH(l)}</span>`); }
  }
  flush(); return `<div class="nb"${lang}>${out.join('')}</div>`;
}
function hCard(n){
  const h = HERMES[n - 1], done = S.has('x:h' + h.id), nx = HERMES[n];
  const lis = h.prompts.map((p, i) => pli({...pParts('h', h.id, p, i), i, pid: p.id, no: '', ph: p.ph, lbl: '', where: '', key: pk('h' + h.id, p.id)})).join('');
  return {screen: 'ex', tag: `#/dars/4/amaliyot/${h.id} · ` + t('tag.hc', {id: h.id, title: hTitle(h)}), title: t('title.ex', {num: h.id, title: hTitle(h)}), html: nav('a') + wrap(`
      ${dlh('#/dars/4/amaliyot', T('back.h'), T(h.bonus ? 'hc.meta_bonus' : 'hc.meta', {id: h.id}))}
      <h1 class="headline ex-h">${hTitleH(h)}</h1><p class="lede goal">${hNatijaH(h)}${h.natija ? '' : NSTAG()}</p>
      ${KEYCARDS.includes(h.id) ? `<p class="ef-hint caution">${cuh('c.hermes.caution')}</p>` : ''}
      ${h.notes.map((x, i) => `<div class="ef-hint note"><b>${cxh(`c.h.${h.id}.note${i}.t`, x.t)}:</b>${noteBody(`c.h.${h.id}.note${i}.x`, x.x)}</div>`).join('')}`,
    `<section class="s1"${h.prompts.length > 1 ? ' aria-labelledby="pr-t"' : ''}>${h.prompts.length ? `${h.prompts.length > 1 ? `<h2 class="s1-eyebrow" id="pr-t" data-cnt="h:${h.id}">${esc(cntText("h", h.id))}</h2>` : ''}${h.prompts.some(p => p.text && hasBracket(p.text)) ? `<p class="s1-rule">${T('ex.rule')}</p>` : ''}<ol>${lis}</ol>` : ''}
      <div class="s1-end">${endb('x:h' + h.id, done, 'end.done_card', 'end.mark_card', '', 'end.aria_card')}
        ${nx ? nextBlock(`#/dars/4/amaliyot/${nx.id}`, 'hc.next', {id: nx.id, title: HT(hTitleH(nx))}) : nextBlock('#/dars/4/amaliyot', 'hc.index')}</div></section>`)};
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
  if (a !== 'dars' || !/^[0-4]$/.test(b || '')) return null;
  const n = +b, L = LESSONS[n];
  if (isLocked(n)) return {view: 'app', locked: n, page: homePage()};
  if (!c) return {view: 'app', page: n === 0 ? prepPage() : lessonPage(n, r.q.get('tab'))};
  if (n === 0) return null;
  const PART = {slayd: 'sl', vazifa: 'vz', amaliyot: 'am', kitob: 'kt'};
  if (PART[c] && partLock(n, PART[c])) return {redirect: `#/dars/${n}?tab=${PART[c]}`};
  if (c === 'slayd') { const i = /^\d+$/.test(d || '') ? +d : 0; return L.slides && i >= 1 && i <= L.slides && !e ? {view: 'app', page: slPage(n, i)} : null; }
  if (c === 'vazifa') { if (!L.parts.includes('vz')) return null; if (!d) return n === 1 ? {view: 'app', page: vz1Page()} : {redirect: `#/dars/${n}?tab=vz`}; return n === 1 && d === 'promptlar' && !e ? {view: 'app', page: vz1Sheet()} : null; }
  if (c === 'kitob') return n === 4 && !d ? {redirect: '#/dars/4?tab=kt'} : null;   // the book is a folder tab now; the old hash keeps working
  if (c === 'amaliyot') {
    if (!L.parts.includes('am')) return null;
    if (!d) return {view: 'app', page: n === 1 ? am1Index() : n === 2 ? libPage() : hIndex()};
    if (n === 2 && sectBy(d) && !e) return {view: 'app', page: libSection(sectBy(d))};
    if (n === 1 && has(EX, d) && !e) return {view: 'app', page: exPage(d)};
    if (n === 4 && /^(0[1-9]|10)$/.test(d) && !e) return {view: 'app', page: hCard(+d)};
  }
  return null;
}
const ROUTES = () => { const r = ['#/kirish', '#/dastur', '#/shrift', '#/dars/0'];
  [1, 2, 3, 4].forEach(n => { r.push(`#/dars/${n}`); const L = LESSONS[n]; if (L.slides) r.push(`#/dars/${n}/slayd/1`, `#/dars/${n}/slayd/${n === 3 ? 14 : L.slides}`);
    if (n === 1) r.push('#/dars/1/vazifa'); if (L.parts.includes('am')) r.push(`#/dars/${n}/amaliyot`); });
  r.push('#/dars/1/vazifa/promptlar'); Object.keys(EX).forEach(k => r.push('#/dars/1/amaliyot/' + k)); HERMES.forEach(h => r.push('#/dars/4/amaliyot/' + h.id)); SECT.forEach(s => r.push('#/dars/2/amaliyot/' + s.key));
  return r; };
const ROUTE_OF = {gate: '#/kirish', dastur: '#/dastur', dars: '#/dars/1', ex: '#/dars/1/amaliyot/06', type: '#/shrift', all: '#/all'};
function go(v){ const h = ROUTE_OF[v] || v; if (location.hash === h) render(); else location.hash = h; }
// the parent of a route (ux-spec §1): used for cold entries so the system Back button stays inside the app
function parentOf(h){
  const p = h.replace(/^#\/?/, '').split('?')[0].split('/').filter(Boolean), [a, b, c, d] = p;
  if (a === 'dars') { if (!c) return '#/dastur'; if (c === 'vazifa' && d) return `#/dars/${b}/vazifa`; if (c === 'amaliyot' && d) return d === '03a' || d === '03b' ? '#/dars/1/amaliyot/03' : `#/dars/${b}/amaliyot`; return `#/dars/${b}`; }
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
  if (el.querySelector('#lib-q')) libInit(el);
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
  if (res && res.redirect) { history.replaceState(null, '', res.redirect); r = parseHash(); res = resolve(r); }   // old hashes (#/dars/2/vazifa, #/dars/4/kitob) land on the folder tab
  if (!res) { history.replaceState(null, '', '#/dastur'); res = resolve(parseHash()); setTimeout(() => flashToast('toast.notfound'), 50); }
  if (res.locked) history.replaceState(null, '', '#/dastur');
  const view = res.view; document.body.dataset.view = view;
  if (view === 'gate' && !document.getElementById('nl').hidden) document.getElementById('nl').hidden = true;
  document.querySelectorAll('[data-go]').forEach(x => x.setAttribute('aria-pressed', ROUTE_OF[x.dataset.go] === (location.hash || '#/kirish')));
  const jump = document.getElementById('jump'); if (jump) jump.value = ROUTES().includes(location.hash) ? location.hash : '';
  document.getElementById('u4').setAttribute('aria-pressed', S.u4());
  if (todaySel) todaySel.value = Object.keys(TODAY_PRESETS).find(k => isoMs(TODAY_PRESETS[k]) === TODAY) || '';
  document.getElementById('s-gate').classList.toggle('is-on', view === 'gate' || view === 'all');
  document.getElementById('s-type').classList.toggle('is-on', view === 'type' || view === 'all');
  app.classList.toggle('is-on', view === 'app');
  if (view !== 'app') app.replaceChildren();   // no duplicate ids while #/all stacks its own copies
  document.title = view === 'app' ? res.page.title + ' · ' + t('title.site') : t('title.' + view) + ' · ' + t('title.site');
  if (view === 'app') mount(app, res.page);
  let last = app;
  if (view === 'all') ['#/dastur', '#/dars/1', '#/dars/1/amaliyot/06'].forEach(h => { const el = document.createElement('section'); el.className = 'screen is-on'; el.dataset.clone = '1'; last.after(el); last = el; mount(el, resolve({parts: h.slice(2).split('/'), q: new URLSearchParams()}).page); });
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
  ti.dataset.i18n = LESSONS[n].d ? 'lock.title' : 'lock.title_tba'; ti.dataset.i18nP = JSON.stringify({n, date: lessonDate(n)}); de.dataset.i18n = n === 4 ? 'lock.desc' : 'lock.desc_n';
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
  const ae = document.activeElement, lb = ae && ae.closest && ae.closest('[data-lang]'), m = document.getElementById('nmenu'), lq = app.querySelector('#lib-q');
  return {y: scrollY, nav: lb && lb.parentElement, menu: !m.hidden && m._from && (m._from.classList.contains('menu-btn') ? '.menu-btn' : '.nav-name'),
    lib: lq && lq.value, chips: [...app.querySelectorAll('.lib-chip[aria-pressed="true"]')].map(c => c.dataset.sect), acc: [...app.querySelectorAll('.acc[aria-expanded="true"]')].map(b => b.getAttribute('aria-controls')),
    tab: [...app.querySelectorAll('.gt-tab')].findIndex(b => b.getAttribute('aria-selected') === 'true'), det: [...app.querySelectorAll('details')].map(d => d.open), sheet: !!app.querySelector('dialog[open]'),
    toast: toast.hidden ? null : undoLi ? {key: undoLi.dataset.key} : {flash: toastKey}};
}
function langRestore(st){
  if (st.lib != null) { app.querySelectorAll('.lib-chip').forEach(c => c.setAttribute('aria-pressed', st.chips.includes(c.dataset.sect))); const lq = app.querySelector('#lib-q'); lq.value = st.lib; lq.dispatchEvent(new Event('input')); }
  st.acc.forEach(id => { const b = app.querySelector(`.acc[aria-controls="${id}"]`); if (b) openAcc(b.closest('li'), true); });
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
