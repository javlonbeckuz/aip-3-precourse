// Content on disk (JSON + files), timed releases, and what a student may see. Files are re-read when their mtime changes.
import fs from 'node:fs';
import path from 'node:path';
import { GROUPS } from './db.js';

export const LANGS = ['uz', 'ru', 'en'];
export const PARTS = ['slides', 'vazifa', 'amaliyot', 'kitob', 'prep'];
const TZ_MS = 5 * 3600 * 1000; // Asia/Tashkent is UTC+5 all year (no DST)
const UNITS = { m: 60e3, h: 3600e3, d: 86400e3 };
const IMG_EXT = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png' };

export const isoTashkent = (ms) => (Number.isFinite(ms) ? new Date(ms + TZ_MS).toISOString().replace(/\.\d+Z$/, '+05:00') : null);
const dateTashkent = (ms) => (Number.isFinite(ms) ? new Date(ms + TZ_MS).toISOString().slice(0, 10) : null);

// Strict ISO: "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM[:SS]" with an optional Z / +hh:mm zone (Tashkent when absent). Anything else is NaN.
const TIME_RE = /^(\d{4})-(\d\d)-(\d\d)(?:T(\d\d:\d\d(?::\d\d)?)(Z|[+-]\d\d:\d\d)?)?$/;
export function parseTime(s) {
  const m = typeof s === 'string' ? TIME_RE.exec(s) : null;
  if (!m) return NaN;
  const day = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  if (day.toISOString().slice(0, 10) !== `${m[1]}-${m[2]}-${m[3]}`) return NaN; // 2026-02-30
  return Date.parse(`${m[1]}-${m[2]}-${m[3]}T${m[4] ?? '00:00'}${m[5] ?? '+05:00'}`);
}

export function parseSchedule(raw) {
  const bad = (m) => { throw new Error(`schedule.json: ${m}`); };
  if (raw.timezone !== 'Asia/Tashkent') bad('timezone must be "Asia/Tashkent"');
  const groups = {};
  for (const g of GROUPS) {
    const a = raw.groups?.[g];
    if (a === null) { groups[g] = null; continue; } // dates to follow
    if (!Array.isArray(a) || a.length !== 4) bad(`groups.${g} needs 4 lesson start times or null`);
    groups[g] = a.map((s) => { const t = parseTime(s); if (Number.isNaN(t)) bad(`groups.${g}: bad time "${s}"`); return t; });
    if (groups[g].some((t, i) => i && t <= groups[g][i - 1])) bad(`groups.${g} must be increasing`);
  }
  const liveDays = raw.liveDays ?? 7;
  if (typeof liveDays !== 'number' || !(liveDays > 0 && liveDays <= 60)) bad('liveDays must be a number from 1 to 60');
  const lo = raw.liveOverride ?? null;
  if (lo !== null && ![1, 2, 3, 4].includes(lo)) bad('liveOverride must be null or 1-4');
  const release = {};
  for (const [n, parts] of Object.entries(raw.release ?? {})) {
    if (!/^[0-4]$/.test(n)) bad(`release: unknown lesson "${n}"`);
    for (const [part, spec] of Object.entries(parts)) {
      if (!PARTS.includes(part)) bad(`release.${n}: unknown part "${part}"`);
      parseSpec(spec, 0, bad);
    }
    release[n] = parts;
  }
  return { groups, liveOverride: lo, liveDays, release };
}

// 'open' | '+3h' | '-2d' | absolute -> ms (anchor = group's lesson start)
function parseSpec(spec, anchor, bad = (m) => { throw new Error(m); }) {
  if (spec === 'open') return 0;
  const m = /^([+-])(\d+)([mhd])$/.exec(spec);
  if (m) return anchor + (m[1] === '-' ? -1 : 1) * Number(m[2]) * UNITS[m[3]];
  const t = parseTime(spec);
  if (Number.isNaN(t)) bad(`release: bad opening time "${spec}"`);
  return t;
}

// Startup / reload check of one lesson file: no `file` key anywhere (server paths leaked in 2.0), unique slugs.
export function validateLesson(L, name = 'lesson') {
  const slugs = new Set();
  (function walk(o) {
    if (Array.isArray(o)) return o.forEach(walk);
    if (!o || typeof o !== 'object') return;
    if ('file' in o) throw new Error(`${name}: forbidden "file" key (server path)`);
    if (o.slug && o.name) {
      if (slugs.has(o.slug)) throw new Error(`${name}: duplicate slug "${o.slug}"`);
      slugs.add(o.slug);
    }
    Object.values(o).forEach(walk);
  })(L);
  return L;
}

export function createContent({ dir, now = () => Date.now() }) {
  const cache = new Map(); // abs path -> {mtime, size, data, badMtime}
  const index = new WeakMap(); // lesson object -> Map(slug -> {name, part})

  function readJson(abs, parse = (x) => x) {
    const old = cache.get(abs);
    let st;
    try { st = fs.statSync(abs); } catch (e) { if (old) return old.data; throw e; }
    if (old && old.mtime === st.mtimeMs && old.size === st.size) return old.data;
    if (old && old.badMtime === st.mtimeMs) return old.data; // already reported this broken version
    const name = path.relative(dir, abs);
    try {
      const data = parse(JSON.parse(fs.readFileSync(abs, 'utf8')), name);
      cache.set(abs, { mtime: st.mtimeMs, size: st.size, data });
      return data;
    } catch (e) {
      if (!old) throw new Error(`${name}: ${e.message}`);
      old.badMtime = st.mtimeMs;
      console.error(`content: ${name} is invalid (${e.message}), serving last good copy`);
      return old.data;
    }
  }

  const schedule = () => readJson(path.join(dir, 'schedule.json'), parseSchedule);
  // only lesson folders 0-4 that really contain lesson.uz.json
  const lessonNumbers = () => fs.readdirSync(path.join(dir, 'lessons'))
    .filter((d) => /^[0-4]$/.test(d) && fs.existsSync(path.join(dir, 'lessons', d, 'lesson.uz.json'))).map(Number).sort((a, b) => a - b);

  function lesson(n, lang = 'uz') {
    const base = path.join(dir, 'lessons', String(n));
    const f = path.join(base, `lesson.${lang}.json`);
    return readJson(fs.existsSync(f) ? f : path.join(base, 'lesson.uz.json'), validateLesson);
  }
  // fail at start, not on the first request
  function validateAll() {
    schedule();
    for (const n of lessonNumbers()) for (const l of LANGS) lesson(n, l);
    for (const need of [0, 1, 2, 3, 4]) if (!lessonNumbers().includes(need)) throw new Error(`content: lesson ${need} is missing`);
  }

  const start = (group, n) => schedule().groups[group]?.[Math.max(n, 1) - 1] ?? NaN; // lesson 0 hangs off lesson 1

  // ms when a part opens for this group; `unlock4` (students.review) opens lesson 4 at once, but only for a group with dates
  function opensAt(n, part, group, unlock4 = false) {
    if (n > 0 && !(GROUPS.includes(group) && schedule().groups[group])) return NaN; // no group or dates TBA: lessons 1-4 stay shut, even with release "open" or the review flag
    if (unlock4 && n === 4) return 0;
    const spec = schedule().release[n]?.[part] ?? (part === 'prep' ? 'open' : '+0h');
    return parseSpec(spec, start(group, n));
  }
  // fails closed: anything that is not a finite time in the past is locked
  const isOpen = (at) => Number.isFinite(at) && now() >= at;
  const partOpen = (n, part, group, unlock4) => isOpen(opensAt(n, part, group, unlock4));

  function live(group) {
    const s = schedule(), t = now();
    let computed = 0;
    for (let n = 4; n >= 1; n--) {
      if (t < start(group, n)) continue;
      const end = n === 4 ? start(group, 4) + s.liveDays * UNITS.d : start(group, n + 1);
      computed = t < end ? n : 0;
      break;
    }
    return { n: s.groups[group] ? (s.liveOverride ?? computed) : 0, override: s.liveOverride };
  }

  function scheduleView(group) {
    const s = schedule();
    return { sessions: 4, shanba: dateTashkent(s.groups.shanba?.[0]), yakshanba: dateTashkent(s.groups.yakshanba?.[0]), group,
      starts: Object.fromEntries([1, 2, 3, 4].map((n) => [n, isoTashkent(start(group, n))])) };
  }

  const hasPart = (L) => ({
    slides: L.slideCount > 0, vazifa: !!(L.homework || L.materials?.length || L.prompts),
    amaliyot: !!L.praktikum, kitob: !!L.hasBook, prep: !!L.prep,
  });
  const FIELDS = {
    slides: ['slideCount', 'slideKind'], vazifa: ['homework', 'materials', 'prompts'], amaliyot: ['praktikum'],
    kitob: ['hasBook', 'bookNote', 'bookVariants'], prep: ['prep'],
  };

  // the lesson as one student may see it: open parts in full, locked parts only as `opensAt`
  function lessonView(n, lang, group, unlock4 = false) {
    const L = lesson(n, lang), has = hasPart(L);
    const v = { n, title: L.title, subtitle: L.subtitle, summary: L.summary, topics: L.topics,
      start: n ? isoTashkent(start(group, n)) : null, date: n ? dateTashkent(start(group, n)) : null, has, parts: {}, open: false };
    for (const part of PARTS.filter((p) => has[p])) {
      const at = opensAt(n, part, group, unlock4);
      if (isOpen(at)) { v.parts[part] = { open: true }; v.open = true; for (const k of FIELDS[part]) v[k] = L[k]; }
      else v.parts[part] = { open: false, opensAt: isoTashkent(at) };
    }
    return v;
  }
  const lessonsView = (lang, group, unlock4) => lessonNumbers().map((n) => lessonView(n, lang, group, unlock4));

  // ---- files. Every path comes from the lesson JSON or a validated integer, never from the URL.
  function fileIndex(n) {
    const L = lesson(n);
    let m = index.get(L);
    if (m) return m;
    m = new Map();
    // Download names (Content-Disposition only; the lesson JSON keeps the real file names the prompts cite): the guide, the
    // exercise instruction/prompt PDFs and the closing sheet would all save as the same "01_Yoriqnoma.pdf" otherwise.
    const dlName = (k, o, ex) => {
      const ext = path.extname(o.name), pre = `${n}-dars_`;
      if (k === 'yoriqnoma' && ex) return `${pre}Mashq-${ex.num}_Yoriqnoma${ext}`;
      if (k === 'promptsPdf' && ex) return `${pre}Mashq-${ex.num}_Promptlar${ext}`;
      if (k === 'guide' || k === 'closing') return pre + o.name;
      return null;
    };
    const walk = (o, part, k, ex) => {
      if (Array.isArray(o)) return o.forEach((x) => walk(x, part, k, ex));
      if (!o || typeof o !== 'object') return;
      if (o.slug && o.name) m.set(o.slug, { name: o.name, part, dl: dlName(k, o, ex) ?? (part === 'vazifa' && o.name === L.praktikum?.guide?.name ? `${n}-dars_Vazifa_${o.name}` : null) });
      const here = typeof o.num === 'string' ? o : ex;
      Object.entries(o).forEach(([key, x]) => walk(x, part, key, here));
    };
    walk([L.materials, L.prompts], 'vazifa'); walk(L.praktikum, 'amaliyot');
    index.set(L, m);
    return m;
  }

  // a real file wins over `<file>.placeholder`
  function real(abs) {
    for (const p of [abs, `${abs}.placeholder`]) if (fs.existsSync(p)) return p;
    return null;
  }
  const lessonDir = (n) => path.join(dir, 'lessons', String(n));

  const docPart = (n, slug) => fileIndex(n).get(slug)?.part ?? null;
  function docFile(n, slug) {
    const e = fileIndex(n).get(slug);
    if (!e) return null;
    const abs = real(path.join(lessonDir(n), 'files', slug + path.extname(e.name).toLowerCase()));
    return abs && { abs, name: e.name, dl: e.dl, part: e.part };
  }
  function slideFile(n, i) {
    for (const ext of Object.keys(IMG_EXT)) { const abs = path.join(lessonDir(n), 'slides', `${i}${ext}`); if (fs.existsSync(abs)) return { abs, type: IMG_EXT[ext] }; }
    return null;
  }
  const clipFile = (n, i, q) => { const abs = path.join(lessonDir(n), 'clips', `${i}-${q}.mp4`); return fs.existsSync(abs) ? { abs, type: 'video/mp4' } : null; };
  function bookFile(n, v) {
    const L = lesson(n);
    if (!L.hasBook || (v && !L.bookVariants?.some((b) => b.v === v))) return null;
    const abs = real(path.join(lessonDir(n), v ? `book.${v}.pdf` : 'book.pdf'));
    return abs && { abs, name: v ? `book.${v}.pdf` : 'book.pdf' };
  }
  const prepFile = (lang) => { const abs = path.join(dir, 'prep', `prep-${lang}.pdf`); return fs.existsSync(abs) ? { abs, name: `prep-${lang}.pdf` } : null; };

  // ---- progress summary (ux-spec progress model): booleans per counted unit
  function units(n, p) {
    const L = lesson(n), has = (k) => !!p.t[k];
    const slides = (p.sl[n] ?? 0) >= L.slideCount;
    const ex = (page, prompts) => has(`x:${page}`) || (prompts.length > 0 && prompts.every((q, i) => has(`p:${page}:${q.id || 'P' + (i + 1)}`)));
    if (n === 1) {
      const e = Object.fromEntries(L.praktikum.exercises.map((x) => [x.num.toLowerCase(), ex(x.num.toLowerCase(), x.prompts)]));
      return [slides, e['01'], e['02'], e['03a'] || e['03b'], e['04'], L.prompts.groups[0].items.every((q) => has(`p:v1:${q.id}`))];
    }
    if (n === 2) return [slides, has('f:am2'), has('f:v2')];
    if (n === 3) return [slides, has('f:v3')];
    if (n === 4) return L.praktikum.exercises.filter((x) => +x.num <= 9).map((x) => ex(`h${x.num}`, x.prompts));
    return [];
  }
  function summary(p) {
    const prepTotal = lesson(0).prep.items.length;
    const lessons = {};
    for (const n of [1, 2, 3, 4]) { const u = units(n, p); lessons[n] = [u.filter(Boolean).length, u.length]; }
    return { prep: [[...Array(prepTotal).keys()].filter((i) => p.t[`prep:${i}`]).length, prepTotal], lessons,
      done: Object.values(lessons).filter(([d, t]) => t && d === t).length };
  }

  return { schedule, validateAll, has: (n) => hasPart(lesson(n)), lesson, lessonNumbers, partOpen, opensAt, isOpen, live, scheduleView, lessonView, lessonsView, docPart, docFile, slideFile, clipFile, bookFile, prepFile, summary, now };
}
