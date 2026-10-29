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
  const times = Object.values(LESSONS).flatMap(L => Object.values(L.lock || {})).map(x => Date.parse(x)).filter(x => x > Date.now());
  if (times.length) recheckT = setTimeout(() => recheck(), Math.min(Math.min(...times) - Date.now() + 1500, 3600e3));   // ponytail: capped at 1 h (a device clock can be wrong); recheck() arms the next one
}

// ---- the API payload becomes the shapes the templates already read (C20 -> buildData(), LESSONS, PREP, BOOK)
const sid = s => String(s == null ? '' : s).replace(/[^A-Za-z0-9_-]/g, '');   // ids that end up in href / id / data-*: nothing else may pass
const fileLabel = f => { const ext = (f.name.split('.').pop() || '').toUpperCase(); return f.size < 1024 ? `${ext} · ${f.size} B` : `${ext} · ${(f.size / 1024).toFixed(1).replace('.', ',')} KB`; };
const fo = (n, f) => f ? {slug: sid(f.slug), name: f.name, size: fileLabel(f), url: `${API}/lesson/${n}/doc/${encodeURIComponent(f.slug)}`} : null;   // name + size + the download URL; the server path never reaches the client

function makeC20(by){
  const C = {}, open = (n, p) => by[n] && by[n].parts && by[n].parts[p] && by[n].parts[p].open;
  if (open(1, 'vazifa')) {
    const l = by[1], mat = a => (l.materials || []).find(m => m.art === a), src = mat('sources'), book = mat('book'), pr = l.prompts;
    C.vz = {rules: pr?.rules || [], footnote: pr?.footnote || '', files: (src?.files || []).map(f => fo(1, f)), zip: src?.bundle ? fo(1, src.bundle) : null, guide: book?.files?.[0] ? fo(1, book.files[0]) : null,
      items: (pr?.groups || []).flatMap(g => g.items).map(i => ({id: sid(i.id), title: i.title, src: i.sources || [], text: i.text}))};
  }
  if (open(1, 'amaliyot') && by[1].praktikum) {
    const pk = by[1].praktikum;
    C.am = {title: pk.title.replace(/\.$/, ''), lead: pk.lead, rules: pk.rules, guide: fo(1, pk.guide), closing: fo(1, pk.closing), ex: {}};
    pk.exercises.forEach(e => { C.am.ex[sid(e.num).toLowerCase()] = {num: sid(e.num), tag: e.tag, title: e.title, note: e.note, brief: fo(1, e.yoriqnoma), pdf: fo(1, e.promptsPdf),
      sources: (e.sources || []).concat(e.extras || []).map(f => fo(1, f)), prompts: e.prompts.map(p => ({id: sid(p.id), where: p.target, title: p.title, text: p.text}))}; });
  }
  if (open(2, 'amaliyot') && by[2].praktikum) {
    const pk = by[2].praktikum; let a = 1;
    C.lib = {rules: pk.rules, sections: pk.exercises.map((e, si) => { const b = a + e.prompts.length - 1, s = {k: 'gtsro'[si], a, b, key: sid(e.key), num: sid(e.num), note: e.note, title: e.title, prompts: e.prompts.map(p => ({id: sid(p.id), title: p.title, text: p.text}))}; a = b + 1; return s; })};
  }
  C.hw = {}; [2, 3].forEach(n => { if (open(n, 'vazifa') && by[n].homework) C.hw[n] = by[n].homework; });   // the homework text of each lesson
  if (open(4, 'amaliyot') && by[4].praktikum) {
    const pk = by[4].praktikum;
    C.hermes = {lead: pk.lead, rules: pk.rules, cards: pk.exercises.map(e => ({id: sid(e.num), bonus: e.tag === 'Bonus', title: e.title, natija: e.note, notes: (e.notes || []).map(n => ({t: n.title, x: n.text})), prompts: e.prompts.map(p => ({title: p.title, text: p.text}))}))};
  }
  if (open(4, 'kitob') && by[4].bookNote) { const bn = by[4].bookNote.split('. '); C.book = {title: bn[0], note: bn.slice(1).join('. ')}; }
  return {...BLANK, ...C};
}

function applyLessons(ls, lsUz, lang){
  // lang = the language of the payload `ls`: its platform text goes into THAT dictionary, whatever LANG says by now (a switch may be under way)
  const by = {}; ls.forEach(l => by[l.n] = l);
  const dOf = l => l && l.date ? [+l.date.slice(8, 10), +l.date.slice(5, 7)] : null, L = {};
  L[0] = {d: dOf(by[1]), open: true};
  for (const n of [1, 2, 3, 4]) {
    const l = by[n], lock = {}, parts = [];
    const add = (has, key, part) => { if (!has) return; parts.push(key); const pp = l.parts[part]; if (pp && !pp.open) lock[key] = pp.opensAt || 'unknown'; };
    add(l.has.slides, 'sl', 'slides'); add(l.has.amaliyot, 'am', 'amaliyot'); add(l.has.vazifa, 'vz', 'vazifa'); add(l.has.kitob, 'kt', 'kitob');
    L[n] = {n, d: dOf(l), open: !!l.open, lock, parts, slides: l.slideCount || 0, kind: l.slideKind || 'image', topics: l.topics.length};
  }
  LESSONS = L;
  const D = I18N[LANGS.includes(lang) ? lang : LANG];   // platform text of the payload's language (lesson metadata and the prep checklist come translated from the API)
  for (const n of [1, 2, 3, 4]) { const l = by[n]; D[`lesson.${n}.title`] = l.title; D[`lesson.${n}.sub`] = l.subtitle; D[`lesson.${n}.lede`] = l.summary; l.topics.forEach((x, i) => { D[`lesson.${n}.t${i}`] = x; }); }
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
  const l1 = by[1];
  if (l1.parts.vazifa && l1.parts.vazifa.open) {   // the headings, notes and ledes of the Vazifa materials come translated from the API (not from the bundle)
    const mat = a => (l1.materials || []).find(m => m.art === a) || {}, src = mat('sources'), pm = mat('prompts'), bk = mat('book'), prm = l1.prompts || {}, g = prm.groups || [], set = (k, v) => { if (typeof v === 'string') D[k] = v; };
    set('vz1.g1', '1 · ' + src.title); set('vz1.g1_note', src.note); set('vz1.g1_hint', src.footnote || ''); set('vz1.zip', src.bundle && src.bundle.label);
    set('vz1.g2', '2 · ' + pm.title); set('vz1.g2_note', pm.note); set('vz1.g2_cta', pm.cta);
    set('vz1.g3', '3 · ' + bk.title); set('vz1.g3_note', bk.note);
    set('vz1.sheet.lede', prm.lede); set('vz1.sheet.rule', g[0] && g[0].note); set('vz1.more', g[1] && g[1].title); set('vz1.more_sub', g[1] && g[1].note);
    set('vz1.sheet.meta', (prm.subtitle || '').split(' — ').pop());
  }
  const byUz = {}; (lsUz || ls).forEach(l => byUz[l.n] = l);   // course material is Uzbek in every UI language
  C20 = makeC20(byUz); buildData();
  const l4 = byUz[4], bf = (slug, name, q) => ({slug, name, size: '', ph: false, url: `${API}/lesson/4/book${q}`});
  BOOK = {lat: bf('book', 'Biznesda_AIni_qollash_lotin.pdf', ''), variants: ((l4.parts.kitob && l4.parts.kitob.open && l4.bookVariants) || []).map(v => ({v: sid(v.v), label: v.label, file: bf('book-' + sid(v.v), `Biznesda_AIni_qollash_${sid(v.v)}.pdf`, '?v=' + encodeURIComponent(v.v))}))};
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
