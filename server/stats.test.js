// Analytics: event log, view beacon, STATS_KEY login, dashboard and CSV.
import { test } from 'node:test';
import http from 'node:http';
import assert from 'node:assert/strict';
import { createStudent, putProgress } from './db.js';
import { csvCell, cleanViewPath } from './stats.js';
import { startApp, at } from './testutil.js';
import { loadConfig } from './index.js';

const NOW = '2026-09-12T10:00';   // the Saturday group's lesson 1 opens; XM is in that group
const DAY = 86400e3;
const events = (db, type) => db.prepare('SELECT * FROM events WHERE type = ? ORDER BY id').all(type);
const ev = (db, ts, sid, type, path = null, ref = null, device = 'd') => db.prepare('INSERT INTO events (ts, student_id, type, path, ref, device) VALUES (?, ?, ?, ?, ?, ?)').run(ts, sid, type, path, ref, device);
// finish handlers run after the client already has the response: let them land
const settle = () => new Promise((r) => setTimeout(r, 30));

const KEY = 'k'.repeat(40);
const boot = (t, o = {}) => startApp(t, { ...o, env: { STATS_KEY: KEY, ...o.env } });
const nget = (a, u, cookie, mode = 'navigate') => new Promise((res, rej) => {   // a browser tab opening a URL
  http.get(a.base + u, { headers: { Cookie: cookie, 'Sec-Fetch-Mode': mode } }, (r) => { let t = ''; r.setEncoding('utf8'); r.on('data', (d) => { t += d; }); r.on('end', () => res({ status: r.statusCode, text: t, headers: new Headers(r.headers) })); }).on('error', rej);
});
const form = { 'Content-Type': 'application/x-www-form-urlencoded' };
const signIn = (c, key = KEY, extra = {}) => c.call('POST', '/aip/stats/login', { body: `key=${encodeURIComponent(key)}`, headers: { ...form, ...extra } });

async function admin(a) {   // sign in with the key, keep the cookie
  const c = a.client();
  const r = await signIn(c);
  assert.equal(r.status, 303);
  return { c, cookie: r.setCookie.split(';')[0] };
}

test('cleanViewPath and csvCell', () => {
  assert.equal(cleanViewPath('/aip/dars/1'), '/dars/1');
  assert.equal(cleanViewPath('/aip3/'), '/');
  assert.equal(cleanViewPath('/aip'), '/');
  for (const bad of ['/dars/1', '/aip/dars/1?p=P1', '/aip/../x', '/aip/' + 'a'.repeat(120), '/aipx', 5, null, '/aip/a b', '/aip/<x>']) assert.equal(cleanViewPath(bad), null, String(bad));
  assert.equal(csvCell('a"b,c\nd'), '"a""b,c\nd"');
  assert.equal(csvCell('=SUM(A1)'), `"'=SUM(A1)"`);
  assert.equal(csvCell('@x'), `"'@x"`);
  assert.equal(csvCell('-cmd|x'), `"'-cmd|x"`);
  assert.equal(csvCell('+998 90 123 45 67'), '"+998 90 123 45 67"');
  assert.equal(csvCell(null), '""');
  assert.equal(csvCell(0), '"0"');
});

test('beacon: needs a session, validates p, rejects unknown fields, rate limited per session, 204', async (t) => {
  const a = await boot(t, { now: NOW });
  const anon = a.client();
  assert.equal((await anon.post('/api/aip/ev', { p: '/aip/dars/1' })).status, 401);
  const c = await a.login('XM');
  const r = await c.post('/api/aip/ev', { p: '/aip/dars/1' });
  assert.equal(r.status, 204);
  assert.equal(r.text, '');
  await c.post('/api/aip/ev', { p: '/aip/' }, { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) Mobile Safari' } });
  const rows = events(a.db, 'view');
  assert.deepEqual(rows.map((x) => [x.student_id, x.path, x.device, x.ts]), [['XM', '/dars/1', 'd', at(NOW)], ['XM', '/', 'm', at(NOW)]]);
  for (const body of [{ p: '/aip/dars/1?p=P1' }, { p: '/other' }, { p: 5 }, {}, { p: '/aip/' + 'a'.repeat(130) }]) {
    const x = await c.post('/api/aip/ev', body);
    assert.equal(x.status, 400, JSON.stringify(body));
    assert.equal(x.json.error.code, 'bad_path');
  }
  assert.equal((await c.post('/api/aip/ev', { p: '/aip/x', q: 1 })).json.error.code, 'unknown_field');
  assert.equal((await c.get('/api/aip/ev')).status, 405);
  assert.equal((await c.post('/api/aip/ev', { p: '/aip/dars/1' }, { headers: { Origin: 'https://evil.example' } })).status, 403);
  assert.equal(events(a.db, 'view').length, 2);
  // 20 requests a minute per STUDENT (bad ones count too, all sessions share it): 2 good + 6 bad used above, 12 more fit; a repeat of the same page within 3 s is no new row
  let last;
  for (let i = 0; i < 20; i++) last = await c.post('/api/aip/ev', { p: '/aip/dars/' + i });
  assert.equal(last.status, 429);
  assert.equal(last.json.error.code, 'rate_limited');
  assert.equal(events(a.db, 'view').length, 14);
  // a second session of the same student shares the budget
  const c2 = await a.login('XM');
  assert.equal((await c2.post('/api/aip/ev', { p: '/aip/dars/1' })).status, 429);
});

test('events: login ok / fail (nothing typed is stored), logout, lesson, download, prep pdf, 5xx', async (t) => {
  const a = await boot(t, { now: NOW });
  const anon = a.client();
  assert.equal((await anon.post('/api/aip/login', { id: 'AIP-TYPE77' })).status, 401);
  assert.equal((await anon.post('/api/aip/login', { id: '' })).status, 400);
  const c = await a.login('XM');
  assert.equal((await c.get('/api/aip/lesson/1')).status, 200);
  assert.equal((await c.get('/api/aip/lesson/99')).status, 404);
  assert.equal((await c.get('/api/aip/lesson/1/doc/qollanma')).status, 200);
  assert.equal((await c.get('/api/aip/lesson/1/doc/nope')).status, 404);
  assert.equal((await c.get('/api/aip/prep/pdf')).status, 200);
  assert.equal((await c.post('/api/aip/logout', {})).status, 200);
  t.mock.method(console, 'error', () => {});
  const c2 = await a.login('XM');
  a.app.content.lessonView = () => { throw new Error('boom'); };
  assert.equal((await c2.get('/api/aip/lesson/1')).status, 500);
  await settle();
  const all = a.db.prepare('SELECT type, student_id, path, ref FROM events ORDER BY id').all();
  assert.deepEqual(all.map((x) => x.type), ['login_fail', 'login_fail', 'login_ok', 'lesson', 'download', 'download', 'logout', 'login_ok', 'err']);
  assert.deepEqual({ ...all[0] }, { type: 'login_fail', student_id: null, path: null, ref: '401' });
  assert.equal(all[1].ref, '400');
  assert.equal(all[3].ref, '1');
  assert.equal(all[3].student_id, 'XM');
  assert.equal(all[4].ref, '1/qollanma');
  assert.equal(all[5].ref, 'prep/pdf');
  assert.equal(all[6].student_id, 'XM');   // the session was still known when it was dropped
  assert.deepEqual({ ...all[8] }, { type: 'err', student_id: 'XM', path: '/api/aip/lesson/1', ref: '500' });
  assert.ok(!JSON.stringify(a.db.prepare('SELECT * FROM events').all()).includes('TYPE77'));
  assert.ok(a.db.prepare("SELECT COUNT(*) AS c FROM events WHERE device NOT IN ('m', 'd')").get().c === 0);
});

test('retention: events older than 180 days go on sweep, expired tokens too', async (t) => {
  const a = await boot(t, { now: NOW });
  const n = at(NOW);
  ev(a.db, n - 181 * DAY, 'XM', 'view', '/old');
  ev(a.db, n - 178 * DAY, 'XM', 'view', '/new');
  a.db.prepare("INSERT INTO stats_tokens (token_hash, expires_at) VALUES ('h', ?)").run(n - 1);
  a.app.stats.sweep();   // within a day of the startup sweep: skipped
  assert.equal(a.db.prepare('SELECT COUNT(*) AS c FROM events').get().c, 2);
  a.clock.t += DAY + 1;
  a.app.stats.sweep();
  assert.deepEqual(a.db.prepare('SELECT path FROM events').all().map((x) => x.path), ['/new']);
  assert.equal(a.db.prepare('SELECT COUNT(*) AS c FROM stats_tokens').get().c, 0);
});

test('admin only: without the cookie /stats is a key form with no data, CSV is 404', async (t) => {
  const a = await boot(t, { now: NOW });
  createStudent(a.db, { fullName: 'Secret Name', grp: 'shanba' });
  const anon = a.client();
  const closed = (r) => { assert.ok(!r.text.includes('Secret Name') && !/Talabalar/.test(r.text)); };
  for (const u of ['/aip/stats', '/aip/stats?range=all', '/aip/stats?sort=name']) {
    const r = await anon.get(u);
    assert.equal(r.status, 200, u);
    assert.match(r.text, /<form method="post" action="\/aip\/stats\/login"[\s\S]*Kalit[\s\S]*name="key" type="password"/);
    assert.ok(!/<script/i.test(r.text));
    closed(r);
  }
  for (const u of ['/aip/stats/students.csv', '/aip/stats/events.csv', '/aip/stats/other']) assert.equal((await anon.get(u)).status, 404, u);
  const c = await a.login('XM');   // a logged-in student is not an admin
  closed(await c.get('/aip/stats'));
  assert.equal((await c.get('/aip/stats/students.csv')).status, 404);
  const bad = await nget(a, '/aip/stats', 'aip_stats=' + 'a'.repeat(43));
  closed(bad);
  assert.equal((await nget(a, '/aip/stats/students.csv', 'aip_stats=' + 'a'.repeat(43))).status, 404);
  // the stylesheet is public (no data in it)
  const css = await anon.get('/aip/stats/stats.css');
  assert.equal(css.status, 200);
  assert.match(css.headers.get('content-type'), /text\/css/);
});

test('STATS_KEY: wrong key refused and logged without the value, rate limited; right key sets the cookie; logout clears it', async (t) => {
  const a = await boot(t, { now: NOW, production: true });
  const c = a.client();
  const wrong = await signIn(c, 'wrong-key-TYPED-123');
  assert.equal(wrong.status, 401);
  assert.match(wrong.text, /Kalit notoʻgʻri/);
  assert.ok(!wrong.setCookie);
  assert.equal((await signIn(c, '')).status, 401);
  assert.equal((await signIn(c, KEY.slice(0, -1))).status, 401);   // a prefix is not the key
  assert.equal((await signIn(c, KEY + 'x')).status, 401);
  assert.equal((await c.call('POST', '/aip/stats/login', { body: JSON.stringify({ key: KEY }), headers: { 'Content-Type': 'application/json' } })).status, 415);
  assert.equal((await signIn(c, KEY, { Origin: 'https://evil.example' })).status, 403);   // Origin check, like the student login
  const logged = events(a.db, 'admin_fail');
  assert.equal(logged.length, 4);
  assert.ok(logged.every((x) => x.student_id === null && x.path === null && x.ref === null));
  assert.ok(!JSON.stringify(a.db.prepare('SELECT * FROM events').all()).includes('TYPED'));
  // 10 failures per 10 minutes per client: 4 so far
  for (let i = 0; i < 6; i++) assert.equal((await signIn(c, 'nope' + i)).status, 401);
  const limited = await signIn(c, 'nope');
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get('retry-after')) > 0);
  assert.equal((await signIn(c)).status, 429);   // even the right key waits: no oracle while limited
});

test('STATS_KEY: the right key gives the cookie (flags), the cookie opens data and CSV, logout closes it', async (t) => {
  const a = await boot(t, { now: NOW, production: true });
  const c = a.client();
  const r = await signIn(c);
  assert.equal(r.status, 303);
  assert.equal(r.headers.get('location'), '/aip/stats');
  assert.match(r.setCookie, /^aip_stats=[\w-]{43}; Path=\/aip\/stats; HttpOnly; SameSite=Strict; Max-Age=43200; Secure$/);
  const cookie = r.setCookie.split(';')[0];
  const page = await nget(a, '/aip/stats', cookie);
  assert.match(page.text, /Talabalar/);
  assert.match(page.text, /method="post" action="\/aip\/stats\/logout"/);
  assert.equal((await nget(a, '/aip/stats/students.csv', cookie)).status, 200);
  const out = await a.client().call('POST', '/aip/stats/logout', { body: '', headers: { Cookie: cookie, ...form } });
  assert.equal(out.status, 303);
  assert.match(out.setCookie, /Max-Age=0/);
  assert.equal((await nget(a, '/aip/stats/students.csv', cookie)).status, 404);   // the session is gone server-side too
  a.clock.t += 12 * 3600e3 + 1;
  const again = await signIn(a.client());
  const ck = again.setCookie.split(';')[0];
  a.clock.t += 12 * 3600e3 + 1;   // the admin session lapses after 12 h
  assert.equal((await nget(a, '/aip/stats/events.csv', ck)).status, 404);
});

test('STATS_KEY empty: /stats is off (404 everywhere); a short key stops the start', async (t) => {
  const a = await startApp(t, { now: NOW });
  assert.equal(a.app.stats.enabled, false);
  const c = a.client();
  for (const u of ['/aip/stats', '/aip/stats/students.csv', '/aip/stats/stats.css']) assert.equal((await c.get(u)).status, 404, u);
  assert.equal((await signIn(c)).status, 404);
  assert.equal((await signIn(c, '')).status, 404);
  assert.throws(() => loadConfig({ STATS_KEY: 'short', DATA_DIR: ':memory:' }), /STATS_KEY must be at least 32/);
  assert.equal(loadConfig({ STATS_KEY: KEY, DATA_DIR: ':memory:' }).statsKey, KEY);
});

test('STATS_PATH follows PORTAL_URL (/aip3 fork) unless set', async (t) => {
  const f = await boot(t, { env: { PORTAL_URL: 'https://ai.example/aip3/' } });
  assert.equal(f.cfg.statsPath, '/aip3/stats');
  const g = await boot(t, { env: { PORTAL_URL: 'https://ai.example/aip3/', STATS_PATH: '/x/stats' } });
  assert.equal(g.cfg.statsPath, '/x/stats');
  assert.equal((await boot(t, { env: { PORTAL_URL: 'https://ai.example' } })).cfg.statsPath, '/aip/stats');
});

test('dashboard renders seeded data; range, sort, paging; HTML is escaped', async (t) => {
  const a = await boot(t, { now: NOW });
  const n = at(NOW);
  const s1 = createStudent(a.db, { fullName: 'Ali <b>Valiyev</b>', grp: 'shanba', phone: '+998901112233' });
  const s2 = createStudent(a.db, { fullName: 'Zafar Karimov', grp: 'yakshanba' });
  createStudent(a.db, { fullName: 'Never Came', grp: 'shanba' });
  putProgress(a.db, s1.id, 'p:l1:Q1', 1); putProgress(a.db, s1.id, 'p:l1:Q2', 1); putProgress(a.db, s2.id, 'p:l1:Q1', 1);
  putProgress(a.db, s1.id, 'f:am1', 1); putProgress(a.db, s1.id, 'f:v1', 1);
  ev(a.db, n - 1000, s1.id, 'view', '/dars/1'); ev(a.db, n - 2000, s1.id, 'view', '/dastur', null, 'm');
  ev(a.db, n - 3000, s1.id, 'lesson', null, '1'); ev(a.db, n - 4000, s2.id, 'lesson', null, '1');
  ev(a.db, n - 5000, s1.id, 'download', null, '1/qollanma'); ev(a.db, n - 6000, s2.id, 'download', null, '1/qollanma'); ev(a.db, n - 7000, s1.id, 'download', null, 'prep/pdf');
  ev(a.db, n - 8000, null, 'login_fail', null, '401'); ev(a.db, n - 9000, s1.id, 'login_ok');
  ev(a.db, n - 3 * DAY, s2.id, 'view', '/dars/1'); ev(a.db, n - 20 * DAY, s2.id, 'view', '/dars/1'); ev(a.db, n - 2000, s2.id, 'err', '/api/aip/x', '500');
  const { c, cookie } = await admin(a);
  const get = (u) => nget(a, u, cookie);
  const r = await get('/aip/stats');
  assert.equal(r.status, 200);
  assert.match(r.headers.get('content-type'), /text\/html/);
  assert.ok(!r.text.includes('<b>Valiyev</b>') && r.text.includes('Ali &lt;b&gt;Valiyev&lt;/b&gt;'));
  const kpi = (label) => new RegExp(`<b>(\\d+)</b><span>${label}</span>`).exec(r.text)[1];
  assert.equal(kpi('Talabalar \\(faol hisob\\)'), '4');   // XM + 3
  assert.equal(kpi('Bugun faol'), '2');
  assert.equal(kpi('7 kunda faol'), '2');
  assert.equal(kpi('Koʻrishlar bugun'), '2');
  assert.equal(kpi('Koʻrishlar 7 kunda'), '3');
  assert.equal(kpi('Kirishlar bugun'), '1');
  assert.equal(kpi('Yuklashlar bugun'), '3');
  assert.equal(kpi('Xato kirishlar bugun'), '1');
  assert.equal(kpi('Server xatolari 7 kunda'), '1');
  assert.match(r.text, /<svg class="chart"/);
  assert.match(r.text, /<td>1\. [^<]*<\/td><td>2<\/td><td>2<\/td><td>3<\/td><td>2<\/td><td>1<\/td><td>1<\/td>/);   // lesson 1: 2 opens, 2 students, 3 prompts, 2 files, 1 amaliyot, 1 vazifa
  assert.match(r.text, /1\/qollanma<\/td><td>2<\/td><td>2<\/td>/);
  assert.match(r.text, /Telefon: <b>33%<\/b> \(1\)/);
  assert.match(r.text, /\+998901112233/);
  // students: sort by name ascending puts Ali before Never before Zafar; the default is last seen
  const order = (html) => [...html.matchAll(/<td>(Ali &lt;|Zafar|Never|Student)/g)].map((x) => x[1]);
  assert.deepEqual(order((await get('/aip/stats?sort=name&dir=asc')).text), ['Ali &lt;', 'Never', 'Student', 'Zafar']);
  assert.deepEqual(order((await get('/aip/stats?sort=name&dir=desc')).text), ['Zafar', 'Student', 'Never', 'Ali &lt;']);
  assert.deepEqual(order((await get('/aip/stats?sort=prompts&dir=desc')).text).slice(0, 2), ['Ali &lt;', 'Zafar']);
  assert.equal((await get('/aip/stats?sort=evil;DROP&dir=x&range=zzz&page=-3')).status, 200);   // unknown values fall back
  // range: 30 days adds Zafar's 20-day-old view to the chart only through the per-student column
  const r30 = await get('/aip/stats?range=30'), all = await get('/aip/stats?range=all');
  assert.match(r30.text, /class="on" href|href="[^"]*"[^>]*class="on"/);
  assert.ok(r30.text.length > 1000 && all.text.length > 1000);
  // paging: 200 per page
  for (let i = 0; i < 250; i++) ev(a.db, n - 10000 - i, s1.id, 'view', '/p' + i);
  const p0 = await get('/aip/stats'), p1 = await get('/aip/stats?page=1');
  assert.match(p0.text, /Eskiroq/); assert.ok(!/Yangiroq/.test(p0.text));
  assert.match(p1.text, /Yangiroq/); assert.ok(!/Eskiroq/.test(p1.text));
  assert.equal((p0.text.match(/<tr><td>2026-09-12/g) ?? []).length, 200);
});

test('CSV: needs the admin cookie, quoted, formulas defused, phone kept', async (t) => {
  const a = await boot(t, { now: NOW });
  const n = at(NOW);
  const s = createStudent(a.db, { fullName: '=HYPERLINK("x","y"), "Q"', grp: 'shanba', phone: '+998901112233' });
  ev(a.db, n - 1000, s.id, 'view', '/dars/1'); ev(a.db, n - 2000, null, 'login_fail', null, '401');
  assert.equal((await a.client().get('/aip/stats/students.csv')).status, 404);
  const { c, cookie } = await admin(a);
  const st = await nget(a, '/aip/stats/students.csv?range=7', cookie);
  assert.equal(st.status, 200);
  assert.match(st.headers.get('content-type'), /text\/csv/);
  assert.match(st.headers.get('content-disposition'), /attachment; filename="talabalar\.csv"/);
  assert.ok(st.text.startsWith('\uFEFF"id","ism","telefon"'));
  assert.ok(st.text.includes(`"'=HYPERLINK(""x"",""y""), ""Q"""`));
  assert.ok(st.text.includes('"+998901112233"'));
  const evs = await nget(a, '/aip/stats/events.csv', cookie);
  assert.equal(evs.status, 200);
  const lines = evs.text.trim().split('\r\n');
  assert.equal(lines.length, 3);
  assert.match(lines[1], /^"2026-09-12 09:59","[^"]+","view","\/dars\/1","","d"$/);
  assert.equal(lines[2], '"2026-09-12 09:59","","login_fail","","401","d"');
  assert.ok(evs.text.includes('"/dars/1"'));
});

test('hardening: fetch from a page cannot read data, a new STATS_KEY ends old sessions, prototype keys fall back, repeated views collapse', async (t) => {
  const a = await boot(t, { now: NOW });
  const { c, cookie } = await admin(a);
  for (const u of ['/aip/stats', '/aip/stats/students.csv', '/aip/stats/events.csv']) {
    assert.equal((await nget(a, u, cookie, 'cors')).status, 404, u);   // a script's fetch()
    assert.equal((await nget(a, u, cookie)).status, 200, u);
  }
  for (const q of ['sort=__proto__', 'sort=constructor', 'range=constructor', 'range=__proto__', 'sort=toString&range=hasOwnProperty']) assert.equal((await nget(a, '/aip/stats?' + q, cookie)).status, 200, q);
  // same cookie, same DB, another key: no longer an admin
  const b = await startApp(t, { now: NOW, env: { STATS_KEY: 'z'.repeat(40) } });
  const rows = a.db.prepare('SELECT token_hash, expires_at FROM stats_tokens').all();
  for (const r of rows) b.db.prepare('INSERT INTO stats_tokens (token_hash, expires_at) VALUES (?, ?)').run(r.token_hash, r.expires_at);
  assert.equal((await nget(b, '/aip/stats/students.csv', cookie)).status, 404);
  // the same page again within 3 s is one view; another page is a new one
  const s = await a.login('XM');
  for (const p of ['/aip/dars/1', '/aip/dars/1', '/aip/dars/1', '/aip/dars/2']) assert.equal((await s.post('/api/aip/ev', { p })).status, 204);
  assert.deepEqual(events(a.db, 'view').map((x) => x.path), ['/dars/1', '/dars/2']);
});
