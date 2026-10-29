// Content on disk (JSON + files), timed releases, and what a student may see. Files are re-read when their mtime changes.
import fs from 'node:fs';
import path from 'node:path';
import { GROUPS } from './db.js';

export const LANGS = ['uz', 'ru', 'en'];
export const LESSON_COUNT = 7;
export const PARTS = ['slides', 'amaliyot', 'kit', 'vazifa', 'prep'];
const BLOCKS = ['amaliyot', 'kit', 'vazifa']; // {text, groups[{title, note?, files[{slug, name, size}], prompts?[{id, title, target?, text}]}]} in the UZ lesson file
const NUMS = Array.from({ length: LESSON_COUNT }, (_, i) => i + 1);
const isLessonNo = (d) => /^(0|[1-9]\d*)$/.test(d) && Number(d) <= LESSON_COUNT; // lesson 0 (prep) + 1..LESSON_COUNT; "07" and "10" are no lessons
const SLUG_RE = /^[a-z0-9-]{1,80}$/; // what the doc route accepts
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
    if (!Array.isArray(a) || a.length !== LESSON_COUNT) bad(`groups.${g} needs ${LESSON_COUNT} lesson start times or null`);
    if (a[0] === null) bad(`groups.${g}: lesson 1 needs a date; set the whole group to null instead`); // lesson 0 (prep) hangs off lesson 1
    // an entry may be null: that one lesson's date is to follow (NaN here, fail-closed everywhere)
    groups[g] = a.map((s) => { if (s === null) return NaN; const t = parseTime(s); if (Number.isNaN(t)) bad(`groups.${g}: bad time "${s}"`); return t; });
    const dated = groups[g].filter(Number.isFinite);
    if (dated.some((t, i) => i && t <= dated[i - 1])) bad(`groups.${g} must be increasing`);
  }
  const liveDays = raw.liveDays ?? 7;
  if (typeof liveDays !== 'number' || !(liveDays > 0 && liveDays <= 60)) bad('liveDays must be a number from 1 to 60');
  const lo = raw.liveOverride ?? null;
  if (lo !== null && !NUMS.includes(lo)) bad(`liveOverride must be null or 1-${LESSON_COUNT}`);
  if (lo !== null && GROUPS.some((g) => groups[g] && Number.isNaN(groups[g][lo - 1]))) bad(`liveOverride ${lo} points at a lesson whose date is to follow`);
  const release = {};
  for (const [n, parts] of Object.entries(raw.release ?? {})) {
    if (!isLessonNo(n)) bad(`release: unknown lesson "${n}"`);
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
  const slugs = new Set(), promptIds = new Set(); // prompt ids are the progress key p:l{n}:{id}, so unique per lesson
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
  for (const part of BLOCKS) for (const g of L[part]?.groups ?? []) for (const p of g.prompts ?? []) {
    if (typeof p.id !== 'string' || !/^[A-Za-z0-9]{1,8}$/.test(p.id) || typeof p.text !== 'string' || !p.text) throw new Error(`${name}: ${part} has a bad prompt ${JSON.stringify(p.id)} (id 1-8 letters or digits, text required)`);
    if (promptIds.has(p.id)) throw new Error(`${name}: duplicate prompt id "${p.id}"`);
    promptIds.add(p.id);
  }
  for (const part of BLOCKS) for (const g of L[part]?.groups ?? []) for (const f of g.files ?? []) {
    const w = `${name}: ${part} file ${JSON.stringify(f.slug)}`;
    if (typeof f.slug !== 'string' || !SLUG_RE.test(f.slug)) throw new Error(`${name}: ${part} has a bad file slug ${JSON.stringify(f.slug)} (a-z, 0-9, -, up to 80)`);
    if (typeof f.name !== 'string' || !f.name) throw new Error(`${w}: name must be a non-empty string`);
    if (!Number.isInteger(f.size)) throw new Error(`${w}: size must be an integer`);
  }
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
  // only lesson folders 0-7 that really contain lesson.uz.json
  const lessonNumbers = () => fs.readdirSync(path.join(dir, 'lessons'))
    .filter((d) => isLessonNo(d) && fs.existsSync(path.join(dir, 'lessons', d, 'lesson.uz.json'))).map(Number).sort((a, b) => a - b);

  function lesson(n, lang = 'uz') {
    const base = path.join(dir, 'lessons', String(n));
    const f = path.join(base, `lesson.${lang}.json`);
    return readJson(fs.existsSync(f) ? f : path.join(base, 'lesson.uz.json'), validateLesson);
  }
  // fail at start, not on the first request
  function validateAll() {
    schedule();
    for (const n of lessonNumbers()) for (const l of LANGS) lesson(n, l);
    // a lesson with slides but no stills serves the placeholder svg: drop the stills in before the date is set
    for (const n of lessonNumbers()) if (lesson(n).slideCount > 0 && !['.webp', '.jpg', '.png'].some((e) => fs.existsSync(path.join(dir, 'lessons', String(n), 'slides', `1${e}`)))) console.warn(`content: WARNING lesson ${n} has slideCount ${lesson(n).slideCount} but no slide stills (lessons/${n}/slides/1.webp): students would see placeholder slides`);
    for (const need of [0, ...NUMS]) if (!lessonNumbers().includes(need)) throw new Error(`content: lesson ${need} is missing`);
  }

  const start = (group, n) => schedule().groups[group]?.[Math.max(n, 1) - 1] ?? NaN; // lesson 0 hangs off lesson 1

  // ms when a part opens for this group; `review` (students.review) opens every lesson at once, but only for a group with dates
  function opensAt(n, part, group, review = false) {
    if (n > 0 && !(GROUPS.includes(group) && schedule().groups[group])) return NaN; // no group or dates TBA: lessons 1-7 stay shut, even with release "open" or the review flag
    if (n > 0 && Number.isNaN(start(group, n))) return NaN; // this one lesson's date is TBA: same, review included
    if (review && n > 0) return 0;
    const spec = schedule().release[n]?.[part] ?? (part === 'prep' ? 'open' : '+0h');
    return parseSpec(spec, start(group, n));
  }
  // fails closed: anything that is not a finite time in the past is locked
  const isOpen = (at) => Number.isFinite(at) && now() >= at;
  const partOpen = (n, part, group, review) => isOpen(opensAt(n, part, group, review));

  function live(group) {
    const s = schedule(), t = now();
    let computed = 0;
    for (let n = LESSON_COUNT; n >= 1; n--) {
      if (!(t >= start(group, n))) continue; // not started yet, or a TBA date (NaN)
      // live until the next dated lesson starts; the last one for liveDays
      const next = NUMS.filter((m) => m > n).map((m) => start(group, m)).find(Number.isFinite);
      computed = t < (next ?? start(group, n) + s.liveDays * UNITS.d) ? n : 0;
      break;
    }
    return { n: s.groups[group] ? (s.liveOverride ?? computed) : 0, override: s.liveOverride };
  }

  function scheduleView(group) {
    const s = schedule();
    return { sessions: LESSON_COUNT, shanba: dateTashkent(s.groups.shanba?.[0]), yakshanba: dateTashkent(s.groups.yakshanba?.[0]), group,
      starts: Object.fromEntries(NUMS.map((n) => [n, isoTashkent(start(group, n))])) };
  }

  const blockHas = (b) => !!(b && (b.text || b.groups?.length));
  const hasPart = (L) => ({ slides: L.slideCount > 0, amaliyot: blockHas(L.amaliyot), kit: blockHas(L.kit), vazifa: blockHas(L.vazifa), prep: !!L.prep });
  const FIELDS = { slides: ['slideCount', 'slideKind'], amaliyot: ['amaliyot'], kit: ['kit'], vazifa: ['vazifa'], prep: ['prep'] };

  // display number: 1.. in order over the lessons that are numbered (lesson.uz.json "numbered" is not false); null for lesson 0 and unnumbered ones (Kirish)
  const numbered = (n) => n > 0 && lesson(n).numbered !== false;
  const numOf = (n) => (numbered(n) ? NUMS.filter((m) => m <= n && numbered(m)).length : null);

  // the lesson as one student may see it: open parts in full, locked parts only as `opensAt`.
  // Titles come from the student's language; the parts (slides, blocks, files) always from the UZ file, prep from the language file.
  function lessonView(n, lang, group, review = false) {
    const T = lesson(n, lang), L = lesson(n, 'uz'), has = hasPart(L);
    const v = { n, num: numOf(n), title: T.title, subtitle: T.subtitle, summary: T.summary, topics: T.topics,
      start: n ? isoTashkent(start(group, n)) : null, date: n ? dateTashkent(start(group, n)) : null, has, parts: {}, open: false };
    for (const part of PARTS.filter((p) => has[p])) {
      const at = opensAt(n, part, group, review), src = part === 'prep' ? T : L;
      if (isOpen(at)) { v.parts[part] = { open: true }; v.open = true; for (const k of FIELDS[part]) v[k] = src[k]; }
      else v.parts[part] = { open: false, opensAt: isoTashkent(at) };
    }
    // ponytail: a lesson with no parts yet opens on its day ('start' is no release key, so +0h); review opens it at once
    if (n > 0 && !PARTS.some((p) => has[p])) v.open = isOpen(opensAt(n, 'start', group, review));
    return v;
  }
  const lessonsView = (lang, group, review) => lessonNumbers().map((n) => lessonView(n, lang, group, review));

  // ---- files. Every path comes from the lesson JSON or a validated integer, never from the URL.
  function fileIndex(n) {
    const L = lesson(n);
    let m = index.get(L);
    if (m) return m;
    m = new Map();
    for (const part of BLOCKS) for (const g of L[part]?.groups ?? []) for (const f of g.files ?? []) m.set(f.slug, { name: f.name, part });
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
    return abs && { abs, name: e.name, part: e.part };
  }
  function slideFile(n, i) {
    for (const ext of Object.keys(IMG_EXT)) { const abs = path.join(lessonDir(n), 'slides', `${i}${ext}`); if (fs.existsSync(abs)) return { abs, type: IMG_EXT[ext] }; }
    return null;
  }
  const clipFile = (n, i, q) => { const abs = path.join(lessonDir(n), 'clips', `${i}-${q}.mp4`); return fs.existsSync(abs) ? { abs, type: 'video/mp4' } : null; };
  const prepFile = (lang) => { const abs = path.join(dir, 'prep', `prep-${lang}.pdf`); return fs.existsSync(abs) ? { abs, name: `prep-${lang}.pdf` } : null; };

  // ---- progress summary: booleans per counted unit (slides, amaliyot tick, vazifa tick). Kit is not counted.
  function units(n, p) {
    const L = lesson(n), has = hasPart(L), u = [];
    if (has.slides) u.push((p.sl[n] ?? 0) >= L.slideCount);
    if (has.amaliyot) u.push(!!p.t[`f:am${n}`]);
    if (has.vazifa) u.push(!!p.t[`f:v${n}`]);
    return u;
  }
  function summary(p, group, review = false) {
    const prepTotal = lesson(0).prep.items.length;
    const lessons = {};
    // a lesson with any locked part is never done (same as the SPA)
    const locked = (n) => { const h = hasPart(lesson(n)); return PARTS.some((k) => k !== 'prep' && h[k] && !partOpen(n, k, group, review)); };
    const shut = {};
    for (const n of NUMS) { const u = units(n, p); lessons[n] = [u.filter(Boolean).length, u.length]; shut[n] = locked(n); }
    return { prep: [[...Array(prepTotal).keys()].filter((i) => p.t[`prep:${i}`]).length, prepTotal], lessons,
      total: NUMS.filter(numbered).length, // numbered lessons only: Kirish progress is stored but not counted
      done: NUMS.filter((n) => numbered(n) && lessons[n][1] && lessons[n][0] === lessons[n][1] && !shut[n]).length };
  }

  return { schedule, validateAll, has: (n) => hasPart(lesson(n)), lesson, lessonNumbers, partOpen, opensAt, isOpen, live, scheduleView, lessonView, lessonsView, docPart, docFile, slideFile, clipFile, prepFile, summary, now };
}
