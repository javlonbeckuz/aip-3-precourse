// Kit and Vazifa as numbered steps (2026-11-26): the content fields the SPA reads (README, "Content format"), and the few pieces of
// public/aip/app.js that decide what a student sees first: the Vazifa deadline and header, the step numbers, the tab in the URL.
// The app has no DOM here, so each function is cut out of the built bundle and run against small stand-ins.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const lessonDirs = fs.readdirSync(path.join(root, 'content', 'lessons')).filter((n) => /^\d+$/.test(n)).sort((a, b) => a - b);
const lesson = (n) => JSON.parse(fs.readFileSync(path.join(root, 'content', 'lessons', n, 'lesson.uz.json'), 'utf8'));
const TAGS = ['darsda', 'uyda', 'telefon', 'noutbuk', 'mentor'];
const steps = (b) => (b?.groups ?? []).filter((g) => g.kind !== 'files');
const refsOf = (g) => (Array.isArray(g.ref) ? g.ref : g.ref ? [g.ref] : []);

test('content: every Kit and Vazifa step has a short title, known tags, and refs that land on a real step', () => {
  const bad = [];
  for (const n of lessonDirs) {
    const L = lesson(n);
    for (const part of ['kit', 'vazifa']) for (const g of L[part]?.groups ?? []) {
      const at = `lesson ${n} ${part} "${g.title}"`;
      if (!g.title?.trim() || g.title.length > 34) bad.push(`${at}: the title must fit one line on a phone (34 characters)`);
      for (const x of g.tags ?? []) if (!TAGS.includes(x)) bad.push(`${at}: unknown tag ${x}`);
      if (g.kind && g.kind !== 'files') bad.push(`${at}: unknown kind ${g.kind}`);
    }
    for (const part of ['amaliyot', 'kit', 'vazifa']) for (const g of L[part]?.groups ?? []) for (const r of refsOf(g)) {
      const to = L[r.tab], max = r.tab === 'amaliyot' ? (to?.groups ?? []).length : steps(to).length;
      if (!to) bad.push(`lesson ${n} ${part} "${g.title}": ref to a missing tab ${r.tab}`);
      else if (r.step != null && !(Number.isInteger(r.step) && r.step >= 1 && r.step <= max)) bad.push(`lesson ${n} ${part} "${g.title}": ref ${r.tab} step ${r.step} does not exist`);
    }
  }
  assert.deepEqual(bad, []);
});

test('content: each Vazifa with steps has a deadline; forms and Kit numbers are well formed; one guide per Kit', () => {
  const bad = [];
  for (const n of lessonDirs) {
    const L = lesson(n), v = L.vazifa, k = L.kit;
    if (steps(v).length && n !== '2' && !v.due) bad.push(`lesson ${n}: vazifa has no due ("next" = the next lesson's start)`);
    if (v && 'check' in v) bad.push(`lesson ${n}: vazifa.check was removed (the mentor checklist is not shown)`);
    if (!k) continue;
    if (!k.kits?.length || k.kits.some((x) => !Number.isInteger(x) || x < 1 || x > 5)) bad.push(`lesson ${n}: kit.kits must list Kit numbers 1-5`);
    for (const x of k.forms ?? []) if (!/^(Kit \d, )?[AB] shakli: /.test(x)) bad.push(`lesson ${n}: a form line starts "A shakli: ", "B shakli: " or "Kit 5, A shakli: " (${x})`);
    if (k.flow && !k.flow.includes('→')) bad.push(`lesson ${n}: kit.flow is steps joined by →`);
    const guides = k.groups.flatMap((g) => (g.files ?? []).filter((f) => f.guide));
    if (guides.length > 1) bad.push(`lesson ${n}: more than one guide PDF`);
  }
  assert.deepEqual(bad, []);
});

test('content: Kit and Vazifa speak plain words: no form codes (B.9, A.1) outside the prompts, no "replace the brackets" that would hit [?]', () => {
  const bad = [];
  for (const n of lessonDirs) {
    const L = lesson(n);
    for (const part of ['kit', 'vazifa']) {
      const b = L[part]; if (!b) continue;
      const texts = [b.text, b.flow, b.due, ...(b.forms ?? []), ...b.groups.flatMap((g) => [g.title, g.note])].filter(Boolean);
      for (const s of texts) {
        if (/\b[AB]\.\d/.test(s)) bad.push(`lesson ${n} ${part}: form code in "${s.slice(0, 60)}"`);
        if (/qavs/i.test(s) && !/\[\?\]/.test(s)) bad.push(`lesson ${n} ${part}: a bracket instruction must say [?] stays ("${s.slice(0, 60)}")`);
      }
    }
  }
  assert.deepEqual(bad, []);
});

// ---- the built bundle
const app = fs.readFileSync(path.join(root, 'public', 'aip', 'app.js'), 'utf8');
function cut(marker, from = 0) {   // the source from marker to the brace that closes its first {
  const at = app.indexOf(marker, from); assert.ok(at >= 0, `app.js has ${marker}`);
  let i = app.indexOf('{', at + marker.length - 1), depth = 0;
  for (; i < app.length; i++) { if (app[i] === '{') depth++; else if (app[i] === '}' && --depth === 0) break; }
  return app.slice(at, i + 1);
}
const T = (k, p) => k + (p ? JSON.stringify(p) : '');
const run = (src, ctx) => { vm.createContext(ctx); vm.runInContext(src, ctx); return ctx; };
const hash = (h) => { const [p, q = ''] = h.replace(/^#\//, '').split('?'); return { parts: p.split('/').filter(Boolean), q: new URLSearchParams(q) }; };

function dueCtx(lessons) {
  return run(cut('function vzDue('), { T, esc: String, cu: (k) => `cu(${k})`, fmtDate: (d, m) => `${d}.${m}`, lnT: (n) => `${n}-dars`, LESSONS: lessons, RN: () => Object.keys(lessons).map(Number).filter((n) => n !== 2) });
}

test('app: the Vazifa deadline is the next lesson\'s start from the schedule, the safe words without a date, or the content\'s own text', () => {
  const dated = dueCtx({ 1: { d: [22, 11], start: '2026-11-22T10:00:00+05:00' }, 2: { d: null }, 3: { d: [29, 11], start: '2026-11-29T10:00:00+05:00' } });
  assert.deepEqual({ ...dated.vzDue(1, 'c.p.1.vz', { due: 'next' }) }, { main: 'vzh.due_dt{"date":"29.11","time":"10:00"}', sub: 'vzh.due_sub{"n":"3-dars"}' });   // Kirish (2, unnumbered) is skipped
  const tba = dueCtx({ 1: { d: [21, 11], start: '2026-11-21T10:00:00+05:00' }, 3: { d: null, start: null } });
  assert.deepEqual({ ...tba.vzDue(1, 'c.p.1.vz', { due: 'next' }) }, { main: 'vzh.due_next' });   // no hard-coded date
  assert.deepEqual({ ...tba.vzDue(3, 'c.p.3.vz', { due: 'next' }) }, { main: 'vzh.due_next' });   // the last lesson
  assert.deepEqual({ ...tba.vzDue(7, 'c.p.7.vz', { due: 'Kurs tugagach 1 oy ichida' }) }, { main: 'cu(c.p.7.vz.due)' });
  assert.equal(tba.vzDue(2, 'c.p.2.vz', { due: '' }), null);
});

test('app: «Vazifa nima?» shows the deadline, the goal and "nothing to send", and no mentor checklist', () => {
  const ctx = dueCtx({ 1: { d: [22, 11], start: '2026-11-22T10:00:00+05:00' }, 3: { d: [29, 11], start: '2026-11-29T10:00:00+05:00' } });
  run(cut('function vzHead('), Object.assign(ctx, { cxFb: () => false }));   // RN and lnT come from dueCtx
  const html = ctx.vzHead(1, 'c.p.1.vz', { due: 'next' }, ['Goal sentence.', 'More.']);
  assert.match(html, /<h3 class="vzh-h"[^>]*>vzh\.h<\/h3>/);
  assert.match(html, /class="vzh-due">.*vzh\.due_dt/);
  assert.ok(html.indexOf('vzh-due') < html.indexOf('vzh-goal'), 'the deadline comes first');
  assert.match(html, /<p class="vzh-goal">Goal sentence\.<\/p>/);
  assert.match(html, /vzf\.hint2 vzh\.when/);
  assert.doesNotMatch(html, /vzh\.check|vzh-ck/);
  assert.doesNotMatch(ctx.vzHead(1, 'c.p.1.vz', { due: '' }, ['x']), /vzh-due/);
});

test('app: steps are numbered 1..n and a files row has no number', () => {
  const src = app.match(/const stepIds = [^\n]*/)[0];
  const ctx = run(src.replace('const stepIds', 'this.stepIds'), {});
  assert.deepEqual(ctx.stepIds({ groups: [{ kind: '' }, { kind: '' }, { kind: 'files' }, { kind: '' }] }), ['s1', 's2', '', 's3']);
});

function tabsCtx(url, tabs = ['sl', 'kt', 'vz']) {
  const moves = [], shown = [];
  const dg = { dataset: { n: '1', def: 'kt' }, querySelectorAll: () => tabs.map((p) => ({ dataset: { p } })), closest: (s) => (s === '#s-app' ? {} : null), _show: (i) => shown.push(i) };
  const ctx = { parseHash: () => hash(ctx.url), url, d3Move: (r, push) => { moves.push([r, push]); ctx.url = r; }, document: { querySelector: () => dg }, moves, shown, dg };
  run(`const onShow = ${cut("document.addEventListener('gt-show', ").replace("document.addEventListener('gt-show', ", '')};\n${cut('function gtPop(')}`, ctx);
  return ctx;
}

test('app: a tab the student picks goes into the URL (a tap pushes, so Back returns; arrow keys replace; a script\'s click writes nothing)', () => {
  const c = tabsCtx('#/dars/1');
  vm.runInContext('onShow({target: dg, detail: {i: 2, key: false, user: true}})', c);
  assert.deepEqual(c.moves, [['#/dars/1?tab=vz', true]]);
  vm.runInContext('onShow({target: dg, detail: {i: 1, key: true, user: true}})', c);
  assert.deepEqual(c.moves.at(-1), ['#/dars/1?tab=kt', false]);
  vm.runInContext('onShow({target: dg, detail: {i: 0, key: false, user: false}})', c);
  assert.equal(c.moves.length, 2);
  vm.runInContext('onShow({target: dg, detail: {i: 1, key: false, user: true}})', c);   // already that tab
  assert.equal(c.moves.length, 2);
});

test('app: the folder tabs announce a switch (gt-show) and say whether the student made it', () => {
  const show = cut('function show(i, focus, key, user)');
  assert.match(show, /dispatchEvent\(new CustomEvent\('gt-show', \{bubbles: true, detail: \{i, key: !!key, user: !!user\}\}\)\)/);
  assert.match(app, /addEventListener\('click', e => show\(i, false, false, e\.isTrusted\)\)/);
  assert.match(app, /show\(to, true, true, e\.isTrusted\)/);
});

test('app: Back / Forward between tabs switches the tab in place; a step or prompt in the URL, or another page, rebuilds', () => {
  const c = tabsCtx('#/dars/1?tab=vz');
  assert.equal(c.gtPop(), true); assert.deepEqual(c.shown, [2]);
  c.url = '#/dars/1'; assert.equal(c.gtPop(), true); assert.deepEqual(c.shown, [2, 1]);   // no ?tab: the lesson's default tab
  c.url = '#/dars/1?tab=kt&s=s2'; assert.equal(c.gtPop(), false);
  c.url = '#/dars/3?tab=kt'; assert.equal(c.gtPop(), false);
  c.url = '#/dars/1?tab=am'; assert.equal(c.gtPop(), false);   // not a tab of this lesson
});
