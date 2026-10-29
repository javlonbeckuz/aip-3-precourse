import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { openDb, createStudent } from './db.js';
import { ipKey, ipKey48, clientIp, loginGuard, windowLimiter } from './auth.js';
import { createContent, parseTime, parseSchedule, validateLesson } from './content.js';
import { loadConfig } from './index.js';
import { handleUpdate, makeBot, createApi } from './bot.js';
import { startApp, tmpCopy, REAL_CONTENT } from './testutil.js';

const BEFORE = '2026-09-12T09:59';
const AFTER = '2026-09-12T10:00';
const xff = (ip) => ({ headers: { 'X-Forwarded-For': ip } });
const quiet = (t) => t.mock.method(console, 'error', () => {});

// ---------- XM demo account
test('XM: fails closed. Seeded only with SEED_DEMO=1 (re-activated), otherwise switched off', async (t) => {
  assert.equal(openDb(':memory:', { seedDemo: false }).prepare("SELECT COUNT(*) AS c FROM students WHERE id = 'XM'").get().c, 0);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aip-db-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const dev = openDb(dir, { seedDemo: true });
  assert.equal(dev.prepare("SELECT active, review FROM students WHERE id = 'XM'").get().active, 1);
  dev.prepare("UPDATE students SET review = 1 WHERE id = 'XM'").run();
  dev.close();
  const prod = openDb(dir, { seedDemo: false });
  assert.deepEqual({ ...prod.prepare("SELECT active, review FROM students WHERE id = 'XM'").get() }, { active: 0, review: 0 });
  prod.close();
  const again = openDb(dir, { seedDemo: true }); // SEED_DEMO=1 later: XM is active again
  assert.equal(again.prepare("SELECT active FROM students WHERE id = 'XM'").get().active, 1);
  again.close();
  assert.equal(loadConfig({ NODE_ENV: 'production' }).seedDemo, false);
  assert.equal(loadConfig({ NODE_ENV: 'production', SEED_DEMO: '1' }).seedDemo, true);
  assert.equal(loadConfig({}).seedDemo, false); // no dev special case
  assert.equal(loadConfig({ SEED_DEMO: '1' }).seedDemo, true);
  assert.equal(openDb(':memory:').prepare('SELECT COUNT(*) AS c FROM students').get().c, 0); // default is no demo
  // through the API: production without SEED_DEMO has no XM door
  const a = await startApp(t, { production: true, now: BEFORE, env: { SEED_DEMO: '0' } });
  const r = await a.client().post('/api/aip/login', { id: 'XM' });
  assert.deepEqual([r.status, r.json.error.code], [401, 'invalid_id']);
});

test('XM: short ids cannot be created unless explicitly allowed', () => {
  const db = openDb(':memory:', { seedDemo: true });
  assert.throws(() => createStudent(db, { fullName: 'Short Id', grp: 'shanba', id: 'AB' }), { code: 'bad_id' });
  assert.throws(() => createStudent(db, { fullName: 'Short Id', grp: 'shanba', id: 'AIP-12' }), { code: 'bad_id' });
  assert.equal(createStudent(db, { fullName: 'Full Id', grp: 'shanba', id: 'aip-k3m9xz' }).id, 'AIP-K3M9XZ');
});

// ---------- login limiter
test('limiter: ipKey groups IPv6 by /64', () => {
  assert.equal(ipKey('2001:db8:1:2::1'), ipKey('2001:DB8:1:2:ffff:0:0:9'));
  assert.notEqual(ipKey('2001:db8:1:2::1'), ipKey('2001:db8:1:3::1'));
  assert.equal(ipKey('::ffff:1.2.3.4'), '1.2.3.4');
  assert.equal(ipKey('203.0.113.7'), '203.0.113.7');
  assert.equal(ipKey('fe80::1%eth0'), ipKey('fe80::2'));
});

test('limiter: failed attempts only, window resets, hard cap evicts the oldest', () => {
  const g = loginGuard();
  const t0 = 1_000_000;
  for (let i = 0; i < 9; i++) { assert.equal(g.check('a', t0), 0); g.fail('a', t0); }
  assert.equal(g.check('a', t0), 0);
  g.fail('a', t0);
  assert.equal(g.check('a', t0 + 1000), 599);
  assert.equal(g.check('b', t0), 0); // other clients are untouched
  assert.equal(g.check('a', t0 + 600e3), 0); // window over
  const w = windowLimiter(1, 1000, 3);
  for (const k of 'abcde') w.add(k, 0);
  assert.equal(w.size, 3);
  assert.equal(w.wait('a', 0), 0); // evicted
  assert.ok(w.wait('e', 0) > 0);
  w.prune(5000);
  assert.equal(w.size, 0);
});

test('limiter: global budget tightens to 1/min per key, alerts once, never hard-locks', (t) => {
  quiet(t);
  const trips = [];
  const g = loginGuard({ budget: 3, onTrip: (n) => trips.push(n) });
  const t0 = 5_000_000;
  g.fail('a', t0); g.fail('b', t0);
  assert.equal(g.tripped, false);
  assert.equal(g.check('c', t0), 0);
  g.fail('c', t0);
  assert.deepEqual(trips, [3]);
  g.fail('d', t0);
  assert.deepEqual(trips, [3]); // only once
  assert.equal(g.check('z', t0), 0); // a fresh key can still try once
  assert.ok(g.check('z', t0 + 1000) > 0); // but only once a minute
  assert.equal(g.check('z', t0 + 61e3), 0);
  assert.equal(g.check('a', t0 + 3600e3), 0); // the hour is over: back to normal
  assert.equal(g.tripped, false);
});

test('limiter over HTTP: IPv6 /64 shares a budget, global trip raises the alert', async (t) => {
  const e = quiet(t);
  const a = await startApp(t, { now: BEFORE, env: { TRUST_PROXY: '1' }, cfg: { loginBudget: 12 } });
  const alerts = [];
  a.app.setAlert((m) => alerts.push(m));
  const c = a.client();
  for (let i = 0; i < 10; i++) assert.equal((await c.post('/api/aip/login', { id: 'NOPE99' }, xff(`2001:db8:1:2:${i}::${i + 1}`))).status, 401);
  assert.equal((await c.post('/api/aip/login', { id: 'XM' }, xff('2001:db8:1:2:abcd::1'))).status, 429); // same /64
  assert.equal((await c.post('/api/aip/login', { id: 'XM' }, xff('2001:db8:1:3::1'))).status, 200); // another /64
  assert.equal(alerts.length, 0);
  for (let i = 0; i < 2; i++) await c.post('/api/aip/login', { id: 'NOPE99' }, xff(`198.51.100.${i}`));
  assert.equal(alerts.length, 1);
  assert.match(alerts[0], /failed logins/);
  assert.ok(e.mock.calls.some((x) => String(x.arguments[0]).startsWith('ALERT')));
  // tripped: a new client gets one try a minute, and a success is still possible
  assert.equal((await c.post('/api/aip/login', { id: 'XM' }, xff('198.51.100.50'))).status, 200);
  assert.equal((await c.post('/api/aip/login', { id: 'XM' }, xff('198.51.100.50'))).status, 429);
});

test('sessions: only the newest 5 per student survive', async (t) => {
  const a = await startApp(t, { now: BEFORE });
  const cs = [];
  for (let i = 0; i < 7; i++) cs.push(await a.login('XM'));
  assert.equal(a.db.prepare("SELECT COUNT(*) AS c FROM sessions WHERE student_id = 'XM'").get().c, 5);
  assert.equal((await cs[0].get('/api/aip/me')).status, 401);
  assert.equal((await cs[1].get('/api/aip/me')).status, 401);
  assert.equal((await cs[2].get('/api/aip/me')).status, 200);
  assert.equal((await cs[6].get('/api/aip/me')).status, 200);
});

// ---------- http
test('http: 413 up front with Connection: close, timeouts and connection cap are set', async (t) => {
  const a = await startApp(t, { now: BEFORE });
  const r = await a.client().post('/api/aip/login', { id: 'x'.repeat(5000) });
  assert.deepEqual([r.status, r.json.error.code], [413, 'too_large']);
  assert.equal(r.headers.get('connection'), 'close');
  assert.deepEqual([a.app.server.headersTimeout, a.app.server.requestTimeout, a.app.server.maxConnections], [10e3, 15e3, 1000]);
});

test('files: aborted download closes the file; big clips stream; ranges; headers', async (t) => {
  const dir = tmpCopy(t);
  fs.mkdirSync(path.join(dir, 'lessons/3/clips'), { recursive: true });
  const big = Buffer.alloc(6 * 1024 * 1024, 7);
  fs.writeFileSync(path.join(dir, 'lessons/3/clips/1-1080.mp4'), big);
  fs.mkdirSync(path.join(dir, 'lessons/1/slides'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'lessons/1/slides/1.webp'), 'RIFFfakewebp');
  const a = await startApp(t, { now: '2026-09-26T10:00', contentDir: dir });
  const c = await a.login('XM');
  const streams = [];
  const orig = fs.createReadStream;
  t.mock.method(fs, 'createReadStream', (...args) => { const s = orig(...args); streams.push(s); return s; });

  // full download streams all bytes
  const full = await c.get('/api/aip/lesson/3/clip/1', { raw: true });
  assert.equal(full.status, 200);
  assert.equal(full.buf.length, big.length);
  assert.equal(full.headers.get('cache-control'), 'private, max-age=3600');
  assert.equal(full.headers.get('content-type'), 'video/mp4');
  assert.equal((await c.call('HEAD', '/api/aip/lesson/3/clip/1')).status, 200);
  const part = await c.get('/api/aip/lesson/3/clip/1', { headers: { Range: 'bytes=10-19' }, raw: true });
  assert.deepEqual([part.status, part.buf.length, part.headers.get('content-range')], [206, 10, `bytes 10-19/${big.length}`]);
  assert.equal((await c.get('/api/aip/lesson/3/clip/1', { headers: { Range: `bytes=${big.length}-` }, raw: true })).status, 416);

  // abort halfway: the server must close the file handle
  streams.length = 0;
  const ctl = new AbortController();
  const res = await fetch(`${a.base}/api/aip/lesson/3/clip/1`, { headers: { Cookie: c.cookie }, signal: ctl.signal });
  const reader = res.body.getReader();
  await reader.read();
  ctl.abort();
  await reader.cancel().catch(() => {});
  assert.equal(streams.length, 1);
  for (let i = 0; i < 100 && !streams[0].destroyed; i++) await new Promise((r) => setTimeout(r, 20));
  assert.equal(streams[0].destroyed, true);

  // real slide: private cache; the placeholder svg is not cached
  a.clock.t = Date.parse('2026-09-12T10:00:00+05:00');
  const slide = await c.get('/api/aip/lesson/1/slide/1', { raw: true });
  assert.deepEqual([slide.status, slide.headers.get('content-type'), slide.headers.get('cache-control')], [200, 'image/webp', 'private, max-age=3600']);
  assert.match((await c.get('/api/aip/lesson/1/slide/2', { raw: true })).headers.get('cache-control'), /no-store/);

  // pdf: page CSP dropped for the viewer, still frameable by the portal only; csv keeps a CSP
  const pdf = await c.get('/api/aip/lesson/1/doc/hw-kompaniya', { raw: true });
  assert.equal(pdf.headers.get('content-security-policy'), "frame-ancestors 'self'");
  assert.equal(pdf.headers.get('x-frame-options'), 'SAMEORIGIN');
  const csv = await c.get('/api/aip/lesson/1/doc/hw-narxlar', { raw: true });
  assert.match(csv.headers.get('content-security-policy'), /default-src 'none'.*frame-ancestors 'self'/);
  assert.match(csv.headers.get('content-disposition'), /^attachment/);
  // an inverted range is ignored: 200 with the whole file
  const inv = await c.get('/api/aip/lesson/1/doc/hw-kompaniya', { headers: { Range: 'bytes=5-3' }, raw: true });
  assert.deepEqual([inv.status, inv.buf.length], [200, pdf.buf.length]);
});

// ---------- content
test('content: only lesson folders 0-7 that contain lesson.uz.json', async (t) => {
  const dir = tmpCopy(t);
  fs.cpSync(path.join(dir, 'lessons/1'), path.join(dir, 'lessons/7'), { recursive: true });
  fs.cpSync(path.join(dir, 'lessons/1'), path.join(dir, 'lessons/abc'), { recursive: true });
  fs.cpSync(path.join(dir, 'lessons/1'), path.join(dir, 'lessons/2.bak'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'lessons/9')); // no lesson.uz.json
  assert.deepEqual(createContent({ dir }).lessonNumbers(), [0, 1, 2, 3, 4, 5, 6, 7]);
  const a = await startApp(t, { now: AFTER, contentDir: dir });
  const c = await a.login('XM');
  assert.deepEqual(c.session.lessons.map((l) => l.n), [0, 1, 2, 3, 4, 5, 6, 7]);
  assert.equal((await c.get('/api/aip/lesson/8')).status, 404);
  assert.equal((await c.get('/api/aip/lesson/9')).status, 404);
});

test('content: a "file" key or a duplicate slug anywhere in a lesson stops startup', (t) => {
  const dir = tmpCopy(t);
  const f = path.join(dir, 'lessons/1/lesson.uz.json');
  const L = JSON.parse(fs.readFileSync(f, 'utf8'));
  const withFile = structuredClone(L);
  withFile.vazifa.groups[0].files[0].file = 'Vazifa/01_Kompaniya.pdf';
  fs.writeFileSync(f, JSON.stringify(withFile));
  assert.throws(() => createContent({ dir }).validateAll(), /forbidden "file" key/);
  const dup = structuredClone(L);
  dup.amaliyot.groups[0].files[0].slug = dup.vazifa.groups[0].files[0].slug;
  fs.writeFileSync(f, JSON.stringify(dup));
  assert.throws(() => createContent({ dir }).validateAll(), /duplicate slug/);
  fs.writeFileSync(f, JSON.stringify(L));
  assert.doesNotThrow(() => createContent({ dir }).validateAll());
  assert.throws(() => validateLesson({ a: [{ file: 'x' }] }), /forbidden/);
});

test('content: every block file needs a plain slug, a name and an integer size at startup', () => {
  const mk = (f) => ({ n: 1, vazifa: { text: '', groups: [{ title: 'g', files: [f] }] } });
  assert.doesNotThrow(() => validateLesson(mk({ slug: 'kit-1', name: 'a.md', size: 0 })));
  for (const slug of ['Kit1', 'a_b', '../x', '', 'a'.repeat(81), 5]) assert.throws(() => validateLesson(mk({ slug, name: 'a.md', size: 1 })), /bad file slug/, String(slug));
  for (const name of ['', 5, undefined]) assert.throws(() => validateLesson(mk({ slug: 'ok', name, size: 1 })), /name must be/, String(name));
  for (const size of [1.5, '10', undefined, null]) assert.throws(() => validateLesson(mk({ slug: 'ok', name: 'a.md', size })), /size must be an integer/, String(size));
});

test('summary: a lesson with a locked part is not done, even with every unit ticked', (t) => {
  const dir = tmpCopy(t);
  const f = path.join(dir, 'schedule.json');
  const S = JSON.parse(fs.readFileSync(f, 'utf8'));
  S.release = { 1: { vazifa: '+3h' } };
  fs.writeFileSync(f, JSON.stringify(S));
  let now = Date.parse('2026-09-12T10:00:00+05:00');
  const c = createContent({ dir, now: () => now });
  const p = { t: { 'f:am1': 1, 'f:v1': 1 }, sl: { 1: 78 } };
  assert.deepEqual([c.summary(p, 'shanba').lessons[1], c.summary(p, 'shanba').done], [[3, 3], 0]); // vazifa is locked until 13:00
  assert.equal(c.summary(p, null).done, 0);
  assert.equal(c.summary(p, null, true).done, 0); // review does not beat a missing group
  assert.equal(c.summary(p, 'shanba', true).done, 1);
  now = Date.parse('2026-09-12T13:00:00+05:00');
  assert.equal(c.summary(p, 'shanba').done, 1);
});

test('shipped lesson 0: Warp steps 1 and 2 end with ":" (the SPA adds the install commands as copy rows)', () => {
  for (const lg of ['uz', 'ru', 'en']) { // PREP_CMDS in .design/comp/src/proto_data.js is keyed by item 3, steps 1 and 2
    const item = JSON.parse(fs.readFileSync(path.join(REAL_CONTENT, 'lessons/0', `lesson.${lg}.json`), 'utf8')).prep.items[3];
    assert.equal(item.brand, 'warp');
    for (const i of [1, 2]) {
      assert.ok(item.steps[i].endsWith(':'), `${lg} step ${i}`);
      assert.doesNotMatch(item.steps[i], /install\.(sh|ps1)/, `${lg} step ${i}`);
    }
  }
});

test('shipped lesson 0 names lessons in the padded form (01-dars, Lesson 01), never 1-dars', () => {
  for (const lg of ['uz', 'ru', 'en']) {
    const txt = fs.readFileSync(path.join(REAL_CONTENT, 'lessons/0', `lesson.${lg}.json`), 'utf8');
    assert.doesNotMatch(txt, /\b[1-7]-dars/, lg);
    assert.doesNotMatch(txt, /\b[1-7]-го занятия|\b[Ll]esson [1-7]\b|занятия/, lg);
  }
});

test('num: 1..6 over numbered lessons in order, null for lesson 0 and Kirish; summary counts numbered lessons only', (t) => {
  const c = createContent({ dir: tmpCopy(t), now: () => Date.parse('2026-10-30T10:00:00+05:00') }); // every fixture date has passed
  assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7].map((n) => c.lessonView(n, 'uz', 'shanba').num), [null, 1, null, 2, 3, 4, 5, 6]);
  assert.equal(c.lesson(2).numbered, false);
  assert.equal(c.lessonView(2, 'ru', null).num, null);
  const p = { t: { 'f:am2': 1, 'f:v2': 1 }, sl: { 2: 78 } }; // Kirish finished
  let s = c.summary(p, 'shanba');
  assert.deepEqual([s.lessons[2], s.done, s.total], [[3, 3], 0, 6]); // progress kept, not counted
  s = c.summary({ t: p.t, sl: { ...p.sl, 3: 40 } }, 'shanba');
  assert.equal(s.done, 1);
});

test('shipped content: num runs 1..6 and Kirish has none', () => {
  const c = createContent({ dir: REAL_CONTENT, now: () => 0 });
  assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7].map((n) => c.lessonView(n, 'uz', 'shanba').num), [null, 1, null, 2, 3, 4, 5, 6]);
  assert.equal(JSON.parse(fs.readFileSync(path.join(REAL_CONTENT, 'lessons/2/lesson.uz.json'), 'utf8')).numbered, false);
});

test('content: a null entry makes the date of one lesson TBA; the dated ones must still increase', () => {
  const T = ['2026-09-13T10:00', null, '2026-09-27T10:00', '2026-10-04T10:00', '2026-10-11T10:00', '2026-10-18T10:00', '2026-10-25T10:00'];
  const base = { timezone: 'Asia/Tashkent', groups: { shanba: T, yakshanba: null } };
  const p = parseSchedule(base);
  assert.deepEqual(p.groups.shanba.map((x) => Number.isNaN(x)), [false, true, false, false, false, false, false]);
  const swap = [...T]; swap[0] = '2026-10-30T10:00'; // dated entries out of order around the gap
  assert.throws(() => parseSchedule({ ...base, groups: { shanba: swap, yakshanba: null } }), /increasing/);
  assert.throws(() => parseSchedule({ ...base, groups: { shanba: [...T.slice(0, 1), 'soon', ...T.slice(2)], yakshanba: null } }), /bad time/);
  assert.throws(() => parseSchedule({ ...base, groups: { shanba: [null, ...T.slice(1)], yakshanba: null } }), /lesson 1 needs a date; set the whole group to null instead/);
  assert.doesNotThrow(() => parseSchedule({ ...base, liveOverride: 3 }));
  assert.throws(() => parseSchedule({ ...base, liveOverride: 2 }), /date is to follow/); // a TBA lesson cannot be pinned live
});

test('content: a TBA lesson inside a dated group is locked, never live, and review cannot open it', (t) => {
  const dir = tmpCopy(t);
  const f = path.join(dir, 'schedule.json');
  const S = JSON.parse(fs.readFileSync(f, 'utf8'));
  S.groups.shanba[1] = null;
  S.release = { 2: { slides: 'open', vazifa: '2020-01-01T00:00' } };
  fs.writeFileSync(f, JSON.stringify(S));
  let now = Date.parse('2026-09-19T12:00:00+05:00'); // the day lesson 2 used to be
  const c = createContent({ dir, now: () => now });
  for (const review of [false, true]) for (const part of ['slides', 'amaliyot', 'vazifa', 'start']) {
    assert.ok(Number.isNaN(c.opensAt(2, part, 'shanba', review)), `${part} ${review}`);
    assert.equal(c.partOpen(2, part, 'shanba', review), false);
  }
  const v = c.lessonView(2, 'uz', 'shanba', true);
  assert.deepEqual([v.open, v.start, v.date], [false, null, null]);
  for (const p of Object.values(v.parts)) assert.deepEqual(p, { open: false, opensAt: null });
  assert.ok(!('amaliyot' in v) && !('vazifa' in v));
  assert.equal(c.scheduleView('shanba').starts[2], null);
  assert.equal(c.live('shanba').n, 1); // lesson 1 stays live until lesson 3 starts, nothing is live for 2
  now = Date.parse('2026-09-26T10:00:00+05:00');
  assert.equal(c.live('shanba').n, 3);
  assert.equal(c.partOpen(3, 'slides', 'shanba', false), true); // its neighbours are untouched
  assert.equal(c.lessonView(2, 'uz', 'yakshanba').start, '2026-09-20T10:00:00+05:00'); // the other group keeps its date
});

test('content: prompts pass through in open blocks only; the shipped Kirish files all exist', async (t) => {
  const a = await startApp(t, { now: '2026-09-19T09:59' });
  const c = await a.login('XM');
  const locked = await c.get('/api/aip/lesson/2', { raw: true });
  assert.ok(!locked.text.includes('"prompts"') && !locked.text.includes('Birinchi hafta rejasi'));
  a.clock.t = Date.parse('2026-09-19T10:00:00+05:00');
  const L = (await c.get('/api/aip/lesson/2')).json.lesson;
  const pg = L.vazifa.groups.filter((g) => g.prompts);
  assert.deepEqual(pg.map((g) => g.prompts.length), [8, 5]);
  assert.ok(L.amaliyot.groups.some((g) => g.prompts?.length === 4 && g.prompts[0].id === '01P1'));
  const ids = [...L.amaliyot.groups, ...L.vazifa.groups].flatMap((g) => (g.prompts ?? []).map((p) => p.id));
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(L.slideCount, 78);
  for (const id of ids) assert.equal((await c.put('/api/aip/progress', { key: 'p:l2:' + id, value: 1 })).status, 200, id); // copy = done
  assert.equal((await c.put('/api/aip/progress', { key: 'p:l2:toolongid1', value: 1 })).status, 400);
  const real = createContent({ dir: REAL_CONTENT });
  const files = [...L.amaliyot.groups, ...L.vazifa.groups].flatMap((g) => g.files);
  assert.ok(files.length > 30);
  for (const f of files) assert.ok(real.docFile(2, f.slug), f.slug);
  assert.ok(!JSON.stringify(L.vazifa).includes('sources')); // 2.0 prompt "sources" are dropped
});

test('content: a lesson with slideCount but no stills logs a startup warning', (t) => {
  const warn = t.mock.method(console, 'warn', () => {});
  createContent({ dir: REAL_CONTENT }).validateAll();
  assert.ok(warn.mock.calls.some((x) => /lesson 2 has slideCount 78 but no slide stills/.test(x.arguments[0])));
  const dir = tmpCopy(t);
  fs.mkdirSync(path.join(dir, 'lessons/2/slides'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'lessons/2/slides/1.webp'), 'x');
  warn.mock.resetCalls();
  createContent({ dir }).validateAll();
  assert.ok(!warn.mock.calls.some((x) => /lesson 2 has slideCount/.test(x.arguments[0])));
});

test('content: bad prompts stop startup', () => {
  const mk = (p) => ({ n: 1, vazifa: { text: '', groups: [{ title: 'g', files: [], prompts: p }] } });
  assert.doesNotThrow(() => validateLesson(mk([{ id: 'P1', title: 'a', text: 'x' }, { id: 'P2', text: 'y' }])));
  assert.throws(() => validateLesson(mk([{ id: '', text: 'x' }])), /bad prompt/);
  assert.throws(() => validateLesson(mk([{ id: 'toolongid1', text: 'x' }])), /bad prompt/);
  assert.throws(() => validateLesson(mk([{ id: 'P1', text: '' }])), /bad prompt/);
  assert.throws(() => validateLesson(mk([{ id: 'P1', text: 'x' }, { id: 'P1', text: 'y' }])), /duplicate prompt id/);
});

test('content: loose times are NaN; a bad schedule fails at startup', (t) => {
  for (const s of ['2026-9-12', '12 Sep 2026', '2026-02-30', '2026-09-12 10:00', '2026-09-12T10', 'tomorrow', '', null, '2026-09-12T10:00+5']) assert.ok(Number.isNaN(parseTime(s)), String(s));
  assert.equal(parseTime('2026-09-12T10:00'), Date.parse('2026-09-12T10:00:00+05:00'));
  assert.equal(parseTime('2026-09-12T05:00:00Z'), parseTime('2026-09-12T10:00'));
  assert.equal(parseTime('2026-09-12'), Date.parse('2026-09-12T00:00:00+05:00'));
  const dir = tmpCopy(t);
  const f = path.join(dir, 'schedule.json');
  const S = JSON.parse(fs.readFileSync(f, 'utf8'));
  const bad = (m) => { fs.writeFileSync(f, JSON.stringify(m(structuredClone(S)))); return () => createContent({ dir }).validateAll(); };
  assert.throws(bad((s) => { s.groups.shanba[0] = '12/09/2026 10:00'; return s; }), /bad time/);
  assert.throws(bad((s) => { s.release = { 1: { vazifa: 'soon' } }; return s; }), /bad opening time/);
  assert.throws(bad((s) => { s.release = { 1: { vazifa: '2026-9-1' } }; return s; }), /bad opening time/);
  assert.throws(bad((s) => { s.liveDays = -3; return s; }), /liveDays/);
  assert.throws(bad((s) => { s.liveDays = 'seven'; return s; }), /liveDays/);
  assert.throws(bad((s) => { s.groups.shanba = s.groups.shanba.slice(0, 4); return s; }), /needs 7/); // the 2.0 shape (4 lessons)
  assert.throws(bad((s) => { s.groups.shanba = s.groups.shanba.slice(0, 6); return s; }), /needs 7/); // the 6-lesson shape
  assert.throws(bad((s) => { s.release = { 1: { kitob: 'open' } }; return s; }), /unknown part "kitob"/);
  assert.throws(bad((s) => { s.release = { 8: { kit: 'open' } }; return s; }), /unknown lesson/);
  assert.doesNotThrow(bad((s) => { s.release = { 7: { kit: '+1h' } }; s.liveOverride = 7; return s; }));
  assert.throws(bad((s) => { s.liveOverride = 8; return s; }), /liveOverride/);
  assert.throws(bad((s) => { s.liveOverride = 0; return s; }), /liveOverride/);
});

test('content: an unknown opening time fails closed', (t) => {
  const c = createContent({ dir: REAL_CONTENT, now: () => Date.parse('2030-01-01') });
  assert.equal(c.isOpen(NaN), false);
  assert.equal(c.isOpen(0), true);
  assert.equal(c.isOpen(undefined), false);
  assert.ok(t);
});

// ---------- NOW
test('NOW: needs ALLOW_NOW=1, refuses to run behind https or a proxy', () => {
  const warn = console.warn; console.warn = () => {};
  try {
    assert.equal(loadConfig({ NOW: '2026-09-12T10:00' }).now, null);
    assert.equal(typeof loadConfig({ NOW: '2026-09-12T10:00', ALLOW_NOW: '1' }).now, 'function');
    assert.equal(loadConfig({ NODE_ENV: 'production', ALLOW_NOW: '1', NOW: '2026-09-12T10:00' }).now, null);
  } finally { console.warn = warn; }
  assert.throws(() => loadConfig({ NOW: '2026-09-12T10:00', ALLOW_NOW: '1', PORTAL_URL: 'https://aip.example/aip/' }), /refusing/);
  assert.throws(() => loadConfig({ NOW: '2026-09-12T10:00', ALLOW_NOW: '1', TRUST_PROXY: '1' }), /refusing/);
  assert.throws(() => loadConfig({ NOW: '2026-09-12T10:00', TRUST_CF: '1' }), /refusing/);
});

// ---------- bot
const ADMIN = 111;
const privateMsg = (text, from = ADMIN, extra = {}) => ({ message: { message_id: 1, from: { id: from, username: `u${from}` }, chat: { id: from, type: 'private' }, text, ...extra } });
const press = (data, from = ADMIN) => ({ callback_query: { id: 'cb', from: { id: from }, data, message: { message_id: 5, chat: { id: from, type: 'private' } } } });
function botSetup() {
  const db = openDb(':memory:', { seedDemo: true });
  const ctx = { db, content: createContent({ dir: REAL_CONTENT }), adminIds: new Set([ADMIN]), portalUrl: 'https://p.example/aip/', state: new Map() };
  const calls = [];
  const api = async (method, params) => { calls.push({ method, params }); return true; };
  return { db, ctx, calls, bot: makeBot({ api, ctx }) };
}
const sent = (calls) => calls.filter((c) => c.method === 'sendMessage').map((c) => c.params.text);

test('bot: private chats only', (t) => {
  const warn = t.mock.method(console, 'warn', () => {});
  const { ctx } = botSetup();
  const inGroup = (text, from) => ({ message: { message_id: 1, from: { id: from }, chat: { id: -100, type: 'supergroup' }, text } });
  assert.deepEqual(handleUpdate(inGroup('/new', ADMIN), ctx), []);
  assert.deepEqual(handleUpdate(inGroup('/help', 999), ctx), []);
  assert.deepEqual(handleUpdate({ callback_query: { id: 'c', from: { id: ADMIN }, data: 'l:all:0', message: { message_id: 1, chat: { id: -100, type: 'group' } } } }, ctx), []);
  assert.deepEqual(handleUpdate({ message: { from: { id: ADMIN }, chat: { id: 1, type: 'channel' }, text: '/help' } }, ctx), []);
  assert.equal(ctx.state.size, 0);
  assert.equal(warn.mock.callCount(), 0); // strangers in groups are not even logged
});

test('bot: refusals are rate limited per user (reply and log)', (t) => {
  const warn = t.mock.method(console, 'warn', () => {});
  const { ctx } = botSetup();
  const outs = Array.from({ length: 6 }, () => handleUpdate(privateMsg('hi', 4242), ctx));
  assert.deepEqual(outs.map((o) => o.length), [1, 1, 1, 0, 0, 0]);
  assert.equal(warn.mock.callCount(), 3);
});

test('bot: a button from an older /new flow is stale', async () => {
  const { db, calls, bot } = botSetup();
  await bot.onUpdate(privateMsg('/new'));
  await bot.onUpdate(privateMsg('Birinchi Talaba'));
  await bot.onUpdate(privateMsg('90 111 11 11'));
  const old = calls.at(-1).params.reply_markup.inline_keyboard[0][0].callback_data;
  await bot.onUpdate(privateMsg('/new'));
  await bot.onUpdate(privateMsg('Ikkinchi Talaba'));
  await bot.onUpdate(privateMsg('90 222 22 22'));
  const fresh = calls.at(-1).params.reply_markup.inline_keyboard[0][0].callback_data;
  assert.notEqual(old, fresh);
  await bot.onUpdate(press(old));
  assert.match(calls.at(-1).params.text, /eskirgan/);
  await bot.onUpdate(press(fresh)); // the current flow still works
  assert.match(sent(calls).at(-1), /Guruh: Shanba/);
  assert.equal(db.prepare('SELECT COUNT(*) AS c FROM students').get().c, 1);
});

test('bot: non-text messages are invalid input, not a name or a mentor', async () => {
  const { db, calls, bot } = botSetup();
  const photo = privateMsg(undefined, ADMIN, { photo: [{ file_id: 'x' }] });
  await bot.onUpdate(privateMsg('/new'));
  await bot.onUpdate(photo);
  assert.match(sent(calls).at(-1), /matn bilan/);
  await bot.onUpdate(privateMsg('Rasm Talaba'));
  await bot.onUpdate(photo); // a sticker instead of a phone
  assert.match(sent(calls).at(-1), /matn bilan/);
  await bot.onUpdate(privateMsg('+998 90 333 33 33'));
  await bot.onUpdate(press(calls.at(-1).params.reply_markup.inline_keyboard[0][0].callback_data));
  await bot.onUpdate(photo); // sticker instead of a mentor
  assert.match(sent(calls).at(-1), /matn bilan/);
  assert.equal(db.prepare('SELECT COUNT(*) AS c FROM students').get().c, 1); // still only XM
  await bot.onUpdate(privateMsg('/cancel'));
  await bot.onUpdate(photo); // idle chat
  assert.match(sent(calls).at(-1), /\/help/);
});

test('bot: a crashing handler answers "Xatolik yuz berdi" and the bot lives on', async (t) => {
  quiet(t);
  const { ctx, calls } = botSetup();
  const bot = makeBot({ api: async (method, params) => { calls.push({ method, params }); return true; }, ctx: { ...ctx, content: { summary() { throw new Error('boom'); } } } });
  await bot.onUpdate(privateMsg('/find xm'));
  assert.match(sent(calls).at(-1), /Xatolik yuz berdi/);
  await bot.onUpdate(privateMsg('/help'));
  assert.match(sent(calls).at(-1), /admin bot/);
});

test('bot: API calls carry a timeout signal; notifyAdmins reaches every admin', async () => {
  let signal;
  const api = createApi('1:T', async (url, init) => { signal = init.signal; return { json: async () => ({ ok: true, result: 1 }) }; });
  await api('getMe');
  assert.ok(signal instanceof AbortSignal);
  const { ctx, calls, bot } = botSetup();
  ctx.adminIds.add(222);
  await bot.notifyAdmins('alarm');
  assert.deepEqual(calls.filter((c) => c.method === 'sendMessage').map((c) => [c.params.chat_id, c.params.text]), [[111, 'alarm'], [222, 'alarm']]);
});

// ---------- round 3
test('limiter race: 30 concurrent bad logins from one client get at most 10 401s', async (t) => {
  const a = await startApp(t, { now: BEFORE });
  const rs = await Promise.all(Array.from({ length: 30 }, () => fetch(`${a.base}/api/aip/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: 'NOPE99' }) })));
  const codes = rs.map((r) => r.status);
  assert.ok(codes.filter((c) => c === 401).length <= 10, codes.join());
  assert.equal(codes.filter((c) => c === 429).length, 20);
});

test('limiter race: slow bodies cannot pass the check together', async (t) => {
  const a = await startApp(t, { now: BEFORE });
  const net = await import('node:net');
  const port = a.app.server.address().port;
  const body = JSON.stringify({ id: 'NOPE99' });
  const open = () => new Promise((resolve) => {
    const sock = net.connect(port, '127.0.0.1');
    let data = '';
    sock.on('data', (d) => { data += d; });
    sock.on('close', () => resolve(data));
    sock.write(['POST /api/aip/login HTTP/1.1', 'Host: x', 'Content-Type: application/json', `Content-Length: ${body.length}`, 'Connection: close', '', ''].join('\r\n'));
    setTimeout(() => sock.write(body), 300); // every body arrives after every request has started
  });
  const outs = await Promise.all(Array.from({ length: 25 }, open));
  assert.ok(outs.filter((o) => o.startsWith('HTTP/1.1 401')).length <= 10, outs.map((o) => o.slice(0, 15)).join('|'));
  assert.ok(outs.filter((o) => o.startsWith('HTTP/1.1 429')).length >= 15);
});

test('limiter: while tripped, the IPv6 /48 shares one slow lane', (t) => {
  quiet(t);
  const g = loginGuard({ budget: 1 });
  const t0 = 9_000_000;
  g.fail('x', t0);
  assert.equal(g.tripped, true);
  const w = ipKey48('2001:db8:7:1::5');
  assert.equal(w, ipKey48('2001:db8:7:ffff:1::2')); // same /48, different /64
  assert.notEqual(ipKey('2001:db8:7:1::5'), ipKey('2001:db8:7:ffff:1::2'));
  assert.equal(g.check(ipKey('2001:db8:7:1::5'), t0, w), 0);
  assert.ok(g.check(ipKey('2001:db8:7:ffff:1::2'), t0 + 1000, w) > 0); // another /64 inside the /48 is held back
  assert.equal(g.check(ipKey('2001:db8:8:1::5'), t0 + 1000, ipKey48('2001:db8:8:1::5')), 0); // another /48 is fine
  assert.equal(ipKey48('203.0.113.5'), null);
  assert.equal(g.check('1.2.3.4', t0 + 62e3, null), 0);
});

test('TRUST_PROXY must be a non-negative integer; missing XFF warns once', (t) => {
  for (const v of ['abc', '-1', '1.5', '1e1', ' 2']) assert.throws(() => loadConfig({ TRUST_PROXY: v }), /TRUST_PROXY/, v);
  assert.equal(loadConfig({ TRUST_PROXY: '2' }).trust.hops, 2);
  assert.equal(loadConfig({ TRUST_PROXY: '' }).trust.hops, 0);
  assert.equal(loadConfig({}).trust.hops, 0);
  const warn = t.mock.method(console, 'warn', () => {});
  const req = { headers: {}, socket: { remoteAddress: '10.0.0.1' } };
  assert.equal(clientIp(req, { hops: 1 }), '10.0.0.1');
  clientIp(req, { hops: 1 });
  assert.equal(warn.mock.callCount(), 1);
  assert.equal(clientIp({ headers: { 'x-forwarded-for': '1.1.1.1, 2.2.2.2' }, socket: {} }, { hops: 2 }), '1.1.1.1');
});

test('doc route: a locked slug answers exactly like an unknown slug (404), so names cannot be probed', async (t) => {
  const dir = tmpCopy(t);
  fs.rmSync(path.join(dir, 'lessons/1/files/hw-kompaniya.pdf.placeholder'));
  const a = await startApp(t, { now: BEFORE, contentDir: dir });
  const c = await a.login('XM');
  const locked = await c.get('/api/aip/lesson/1/doc/hw-kompaniya'), unknown = await c.get('/api/aip/lesson/1/doc/nope');
  assert.equal(locked.status, 404);
  assert.equal(unknown.status, 404);
  assert.deepEqual(locked.json, unknown.json);
  a.clock.t = Date.parse('2026-09-12T10:00:00+05:00');
  assert.equal((await c.get('/api/aip/lesson/1/doc/hw-kompaniya')).status, 404); // open, but the file is not there
});

test('content: groups.<g> = null means dates TBA; anything else but 7 increasing entries is still refused', (t) => {
  const base = { timezone: 'Asia/Tashkent', groups: { shanba: null, yakshanba: null }, liveOverride: null };
  const p = parseSchedule(base);
  assert.deepEqual(p.groups, { shanba: null, yakshanba: null });
  assert.doesNotThrow(() => parseSchedule({ ...base, groups: { shanba: null, yakshanba: ['2026-09-13T10:00', '2026-09-20T10:00', '2026-09-27T10:00', '2026-10-04T10:00', '2026-10-11T10:00', '2026-10-18T10:00', '2026-10-25T10:00'] } }));
  const T = ['2026-09-13T10:00', '2026-09-20T10:00', '2026-09-27T10:00', '2026-10-04T10:00', '2026-10-11T10:00', '2026-10-18T10:00', '2026-10-25T10:00'];
  for (const bad of [undefined, [], T.slice(0, 4), T.slice(0, 6), [...T, '2026-11-01T10:00'], [...T].reverse(), 'soon', {}, 0, false]) assert.throws(() => parseSchedule({ ...base, groups: { shanba: bad, yakshanba: null } }), /schedule\.json/, String(bad));
  assert.throws(() => parseSchedule({ ...base, groups: { shanba: null } }), /yakshanba/); // a missing group is not "TBA"
  t.mock.method(console, 'error', () => {});
});

test('content: fail closed for a NULL student group, an unknown group and TBA dates, whatever release says', (t) => {
  const dir = tmpCopy(t);
  const f = path.join(dir, 'schedule.json');
  const S = JSON.parse(fs.readFileSync(f, 'utf8'));
  S.groups.yakshanba = null;
  S.release = { 1: { slides: 'open' }, 2: { vazifa: '2020-01-01T00:00' }, 3: { slides: '+0h' }, 6: { kit: 'open' } };
  fs.writeFileSync(f, JSON.stringify(S));
  const c = createContent({ dir, now: () => Date.parse('2099-01-01') });
  for (const g of [null, undefined, 'yakshanba', 'friday', '']) {
    for (const [n, part] of [[1, 'slides'], [2, 'vazifa'], [3, 'slides'], [4, 'start'], [6, 'kit']]) {
      assert.ok(Number.isNaN(c.opensAt(n, part, g)), `${g} ${n}.${part}`);
      assert.equal(c.partOpen(n, part, g, false), false);
    }
    assert.equal(c.partOpen(0, 'prep', g, false), true);
    assert.equal(c.live(g).n, 0);
    assert.equal(c.scheduleView(g).starts[1], null);
    assert.equal(c.lessonView(1, 'uz', g).start, null);
  }
  for (const n of [1, 2, 3, 4, 5, 6]) { // review does not beat a missing group or TBA dates, and opens every lesson for a group with dates
    assert.ok(Number.isNaN(c.opensAt(n, 'slides', null, true)), `null ${n}`);
    assert.ok(Number.isNaN(c.opensAt(n, 'start', 'yakshanba', true)), `tba ${n}`);
    assert.equal(c.opensAt(n, 'kit', 'shanba', true), 0, `shanba ${n}`);
  }
  assert.equal(c.opensAt(0, 'prep', null, true), 0);
  assert.equal(c.partOpen(1, 'slides', 'shanba', false), true); // a group with dates is unaffected
  assert.equal(c.scheduleView('shanba').yakshanba, null);
});
