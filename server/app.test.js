import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { startApp, tmpCopy } from './testutil.js';
import { openDb, randomId, createStudent, ID_ALPHABET } from './db.js';
import { loadConfig } from './index.js';
import { idCandidates } from './auth.js';
import { createContent } from './content.js';

const BEFORE = '2026-09-12T09:59'; // one minute before the Saturday group's lesson 1
const AFTER = '2026-09-12T10:00';

// ---------- ids
test('ids: format, alphabet, uniqueness, collision retry, hand-made ids', () => {
  const db = openDb(':memory:', { seedDemo: true });
  assert.equal(db.prepare("SELECT full_name FROM students WHERE id = 'XM'").get().full_name, 'Student');
  const seen = new Set();
  for (let i = 0; i < 3000; i++) {
    const s = createStudent(db, { fullName: `Talaba ${i}`, grp: 'shanba' });
    assert.match(s.id, new RegExp(`^AIP-[${ID_ALPHABET}]{6}$`));
    seen.add(s.id);
  }
  assert.equal(seen.size, 3000);
  const first = [...seen][0];
  const script = [...first.slice(4)].map((c) => ID_ALPHABET.indexOf(c));
  const seq = [...script, ...[0, 1, 2, 3, 4, 5]]; // 1st attempt collides, 2nd is fresh
  let k = 0;
  const s = createStudent(db, { fullName: 'Retry Test', grp: 'yakshanba' }, () => seq[k++]);
  assert.equal(s.id, 'AIP-' + [0, 1, 2, 3, 4, 5].map((i) => ID_ALPHABET[i]).join(''));
  assert.equal(createStudent(db, { fullName: 'Hand Made', grp: 'shanba', id: 'zz', allowShort: true }).id, 'ZZ');
  assert.throws(() => createStudent(db, { fullName: 'X', grp: 'shanba' }), { code: 'bad_name' });
  assert.throws(() => createStudent(db, { fullName: 'Okay Name', grp: 'monday' }), { code: 'bad_group' });
  assert.match(randomId(), /^AIP-/);
});

test('ids: tolerant AIP- prefix', () => {
  assert.deepEqual(idCandidates('aip-k3m9xz'), ['AIP-K3M9XZ', 'K3M9XZ']);
  assert.deepEqual(idCandidates(' AIP K3M9XZ '), ['AIP-K3M9XZ', 'AIP K3M9XZ', 'K3M9XZ']);
  assert.deepEqual(idCandidates('k3m9xz'), ['K3M9XZ', 'AIP-K3M9XZ']);
  assert.deepEqual(idCandidates('xm'), ['XM', 'AIP-XM']);
  assert.deepEqual(idCandidates('../etc'), []);
  assert.deepEqual(idCandidates(''), []);
});

// ---------- login
test('login: success payload, cookie flags in production and dev', async (t) => {
  const prod = await startApp(t, { production: true, now: BEFORE });
  const c = prod.client();
  const r = await c.post('/api/aip/login', { id: 'xm' });
  assert.equal(r.status, 200);
  assert.deepEqual(Object.keys(r.json).sort(), ['lang', 'lessons', 'live', 'ok', 'progress', 'schedule', 'student']);
  assert.deepEqual(r.json.student, { id: 'XM', fullName: 'Student', firstName: 'Student', mentor: 'Xurshid Maroziqov', group: 'shanba' });
  assert.equal(r.json.lessons.length, 7);
  assert.deepEqual(r.json.progress, { t: {}, sl: {} });
  assert.match(r.setCookie, /^__Host-aip_session=[A-Za-z0-9_-]{40,}; Path=\/; HttpOnly; SameSite=Lax; Max-Age=86400; Secure$/);
  assert.match(r.headers.get('cache-control'), /no-store/);
  assert.ok(prod.db.prepare('SELECT last_login_at FROM students WHERE id = ?').get('XM').last_login_at);

  const dev = await startApp(t, { now: BEFORE });
  const d = await dev.client().post('/api/aip/login', { id: 'XM' });
  assert.match(d.setCookie, /^aip_session=.*HttpOnly; SameSite=Lax/);
  assert.doesNotMatch(d.setCookie, /Secure/);
});

test('login: errors (unknown, inactive, bad body, origin)', async (t) => {
  const a = await startApp(t, { now: BEFORE });
  createStudent(a.db, { fullName: 'Off Student', grp: 'shanba', id: 'OFF', allowShort: true });
  a.db.prepare("UPDATE students SET active = 0 WHERE id = 'OFF'").run();
  const c = a.client();
  let r = await c.post('/api/aip/login', { id: 'NOPE99' });
  assert.deepEqual([r.status, r.json.error.code], [401, 'invalid_id']);
  r = await c.post('/api/aip/login', { id: 'off' });
  assert.deepEqual([r.status, r.json.error.code], [401, 'invalid_id']); // same answer as an unknown id
  assert.equal(r.json.error.message, (await c.post('/api/aip/login', { id: 'NOPE98' })).json.error.message);
  assert.equal(c.cookie, '');
  r = await c.post('/api/aip/login', { id: 'XM', admin: true });
  assert.deepEqual([r.status, r.json.error.code], [400, 'unknown_field']);
  r = await c.post('/api/aip/login', { id: '' });
  assert.equal(r.json.error.code, 'bad_id');
  r = await c.post('/api/aip/login', 'not json', { headers: { 'Content-Type': 'application/json' } });
  assert.equal(r.json.error.code, 'bad_json');
  r = await c.call('POST', '/api/aip/login', { body: '{"id":"XM"}', headers: { 'Content-Type': 'text/plain' } });
  assert.equal(r.status, 415);
  r = await c.post('/api/aip/login', { id: 'XM' }, { headers: { Origin: 'https://evil.example' } });
  assert.deepEqual([r.status, r.json.error.code], [403, 'bad_origin']);
  r = await c.post('/api/aip/login', { id: 'XM' }, { headers: { Origin: a.base } });
  assert.equal(r.status, 200);
});

test('login: oversized body is refused', async (t) => {
  const a = await startApp(t, { now: BEFORE });
  assert.equal((await a.client().post('/api/aip/login', { id: 'x'.repeat(5000) })).status, 413);
});

test('login: only failed attempts count (10 per 10 min per client)', async (t) => {
  const a = await startApp(t, { now: BEFORE });
  const c = a.client();
  for (let i = 0; i < 25; i++) assert.equal((await c.post('/api/aip/login', { id: 'XM' })).status, 200); // successes are free
  for (let i = 0; i < 10; i++) assert.equal((await c.post('/api/aip/login', { id: 'NOPE99' })).status, 401);
  const r = await c.post('/api/aip/login', { id: 'XM' });
  assert.deepEqual([r.status, r.json.error.code], [429, 'rate_limited']);
  assert.ok(Number(r.headers.get('retry-after')) > 0);
});

test('sessions: me, logout, expiry, only the hash is stored', async (t) => {
  const a = await startApp(t, { now: BEFORE });
  const anon = a.client();
  assert.equal((await anon.get('/api/aip/me')).json.error.code, 'unauthorized');
  const c = await a.login('XM');
  const token = c.cookie.split('=')[1];
  assert.equal((await c.get('/api/aip/me')).json.student.id, 'XM');
  const rows = a.db.prepare('SELECT * FROM sessions').all();
  assert.equal(rows.length, 1);
  assert.ok(!JSON.stringify(rows).includes(token));
  assert.ok(Math.abs(rows[0].expires_at - rows[0].created_at - 24 * 3600e3) < 1000);
  a.db.prepare('UPDATE sessions SET expires_at = 1').run();
  assert.equal((await c.get('/api/aip/me')).status, 401);
  const c2 = await a.login('XM');
  const out = await c2.post('/api/aip/logout', {});
  assert.match(out.setCookie, /Max-Age=0/);
  assert.equal((await c2.get('/api/aip/me')).status, 401);
  // deactivating a student kills the live session
  const c3 = await a.login('XM');
  a.db.prepare("UPDATE students SET active = 0 WHERE id = 'XM'").run();
  assert.equal((await c3.get('/api/aip/me')).status, 401);
});

// ---------- release gating
const lesson1 = (c) => c.get('/api/aip/lesson/1').then((r) => r.json.lesson);

test('gating: before and after the opening time, payload has only open parts', async (t) => {
  const a = await startApp(t, { now: BEFORE });
  const c = await a.login('XM');
  let L = await lesson1(c);
  assert.equal(L.open, false);
  assert.deepEqual(Object.keys(L.parts).sort(), ['amaliyot', 'kit', 'slides', 'vazifa']);
  for (const p of Object.values(L.parts)) assert.deepEqual(p, { open: false, opensAt: '2026-09-12T10:00:00+05:00' });
  for (const k of ['slideCount', 'amaliyot', 'kit', 'vazifa']) assert.ok(!(k in L), k);
  for (const k of ['homework', 'materials', 'prompts', 'praktikum', 'hasBook']) assert.ok(!(k in L), k);
  assert.equal(L.title, 'AI qanday ishlaydi');
  assert.equal(L.date, '2026-09-12');

  a.clock.t = Date.parse('2026-09-12T10:00:00+05:00');
  L = await lesson1(c);
  assert.equal(L.open, true);
  assert.equal(L.slideCount, 78);
  assert.equal(L.amaliyot.groups[0].files[0].slug, 'qollanma');
  assert.equal(L.kit.groups[0].files.length, 2);
  assert.deepEqual(L.vazifa.groups[0].files.map((f) => f.slug), ['hw-kompaniya', 'hw-narxlar']);
  assert.deepEqual(L.parts.slides, { open: true });
});

test('gating: prep is open at once; nothing locked leaks in login payload', async (t) => {
  const a = await startApp(t, { now: BEFORE });
  const c = await a.login('XM');
  const s = c.session;
  assert.equal(s.lessons[0].open, true);
  assert.equal(s.lessons[0].prep.items.length, 4);
  assert.equal(s.live.n, 0);
  const locked = JSON.stringify(s.lessons.slice(1));
  for (const leak of ['hw-kompaniya', 'kit1-forma', 'Vazifa matni', 'Talaba_qollanmasi', 'slug', '"groups"']) assert.ok(!locked.includes(leak), leak);
  assert.ok(s.lessons[1].has.kit && s.lessons[1].has.slides && !s.lessons[2].has.kit, 'existence flags stay');
});

test('gating: per group (Sunday is one day later)', async (t) => {
  const a = await startApp(t, { now: '2026-09-12T12:00' });
  createStudent(a.db, { fullName: 'Yakshanba Talaba', grp: 'yakshanba', id: 'SUN', allowShort: true });
  const sat = await a.login('XM'), sun = await a.login('SUN');
  assert.equal((await lesson1(sat)).open, true);
  const l = await lesson1(sun);
  assert.equal(l.open, false);
  assert.equal(l.parts.slides.opensAt, '2026-09-13T10:00:00+05:00');
  assert.equal(sat.session.live.n, 1);
  assert.equal(sun.session.live.n, 0);
  assert.equal((await sun.get('/api/aip/lesson/1/doc/hw-kompaniya')).status, 404);
  a.clock.t = Date.parse('2026-09-13T10:00:00+05:00');
  assert.equal((await sun.get('/api/aip/lesson/1/doc/hw-kompaniya')).status, 200);
  assert.equal((await sun.get('/api/aip/me')).json.live.n, 1);
});

test('gating: live lesson follows the dates, liveOverride pins it', async (t) => {
  const dir = tmpCopy(t);
  const a = await startApp(t, { now: '2026-09-27T00:00', contentDir: dir });
  const c = await a.login('XM');
  const live = async () => (await c.get('/api/aip/me')).json.live;
  assert.deepEqual(await live(), { n: 3, override: null });
  a.clock.t = Date.parse('2026-10-03T10:00:00+05:00');
  assert.equal((await live()).n, 4);
  a.clock.t = Date.parse('2026-10-17T10:00:00+05:00');
  assert.equal((await live()).n, 6);
  a.clock.t = Date.parse('2026-10-24T10:00:00+05:00'); // lesson 6 stays live for liveDays (7)
  assert.equal((await live()).n, 0);
  const sched = path.join(dir, 'schedule.json');
  fs.writeFileSync(sched, JSON.stringify({ ...JSON.parse(fs.readFileSync(sched, 'utf8')), liveOverride: 2 }));
  assert.deepEqual(await live(), { n: 2, override: 2 });
});

test('gating: relative and absolute offsets, content reload without restart', async (t) => {
  const dir = tmpCopy(t);
  const sched = path.join(dir, 'schedule.json');
  const s = JSON.parse(fs.readFileSync(sched, 'utf8'));
  s.release = { 1: { vazifa: '+3h', amaliyot: '-2d', slides: '2026-09-12T09:00', kit: '2026-09-12T13:30' } };
  fs.writeFileSync(sched, JSON.stringify(s));
  const a = await startApp(t, { now: '2026-09-12T12:59', contentDir: dir });
  const c = await a.login('XM');
  let L = await lesson1(c);
  assert.deepEqual(L.parts.vazifa, { open: false, opensAt: '2026-09-12T13:00:00+05:00' });
  assert.deepEqual(L.parts.amaliyot, { open: true }); // -2d
  assert.deepEqual(L.parts.slides, { open: true }); // absolute 09:00
  assert.ok(L.amaliyot && L.slideCount === 78 && !('vazifa' in L) && !('kit' in L));
  assert.deepEqual(L.parts.kit, { open: false, opensAt: '2026-09-12T13:30:00+05:00' });
  assert.equal((await c.get('/api/aip/lesson/1/doc/hw-kompaniya')).status, 404); // vazifa file
  assert.equal((await c.get('/api/aip/lesson/1/doc/qollanma')).status, 200); // amaliyot file
  // real file names are kept, whatever the role
  const cd = async (slug) => (await c.get('/api/aip/lesson/1/doc/' + slug)).headers.get('content-disposition');
  assert.match(await cd('qollanma'), /filename="Talaba_qollanmasi\.pdf"/);
  assert.equal((await c.get('/api/aip/lesson/1/doc/kit1-forma')).status, 404); // kit file, release.1.kit is 13:30
  a.clock.t += 60e3;
  assert.equal((await c.get('/api/aip/lesson/1/doc/hw-kompaniya')).status, 200);
  // the Kit doc follows release.1.kit and nothing else
  a.clock.t = Date.parse('2026-09-12T13:29:00+05:00');
  assert.equal((await c.get('/api/aip/lesson/1/doc/kit1-forma')).status, 404);
  a.clock.t = Date.parse('2026-09-12T13:30:00+05:00');
  const kd = await c.get('/api/aip/lesson/1/doc/kit1-forma');
  assert.equal(kd.status, 200);
  assert.match(kd.headers.get('content-disposition'), /^attachment; filename="kit1-forma\.md"/);
  assert.equal((await c.get('/api/aip/lesson/1/doc/x')).status, 200); // slug x is served from x.pdf.placeholder
  // edit schedule.json while the server runs: no restart
  s.release = { 1: { vazifa: '+9h' } };
  fs.writeFileSync(sched, JSON.stringify(s, null, 1));
  a.clock.t = Date.parse('2026-09-12T13:00:00+05:00');
  assert.equal((await c.get('/api/aip/lesson/1/doc/hw-kompaniya')).status, 404);
  // a broken edit keeps the last good copy
  const keep = console.error; console.error = () => {};
  fs.writeFileSync(sched, '{ broken');
  assert.equal((await c.get('/api/aip/lesson/1/doc/hw-kompaniya')).status, 404);
  console.error = keep;
});

test('NOW override works outside production and is ignored in production', () => {
  const dev = loadConfig({ NODE_ENV: 'development', ALLOW_NOW: '1', NOW: '2026-09-12T10:00' });
  assert.equal(dev.now(), Date.parse('2026-09-12T10:00:00+05:00'));
  const warn = console.warn; console.warn = () => {};
  const prod = loadConfig({ NODE_ENV: 'production', NOW: '2026-09-12T10:00' });
  console.warn = warn;
  assert.equal(prod.now, null);
  assert.throws(() => loadConfig({ ALLOW_NOW: '1', NOW: 'garbage' }));
});

// ---------- files
test('files: 403 before the opening time, 200 after, no server paths anywhere', async (t) => {
  const a = await startApp(t, { now: BEFORE });
  const c = await a.login('XM');
  const urls = ['/api/aip/lesson/1/slide/1', '/api/aip/lesson/1/clip/1', '/api/aip/lesson/1/doc/hw-kompaniya', '/api/aip/lesson/1/doc/kit1-forma', '/api/aip/lesson/1/doc/qollanma'];
  const leaks = [];
  const scan = (r) => leaks.push(...[process.cwd(), 'C:\\', 'content/', 'content\\', '.placeholder', 'Vazifa/', '"file"'].filter((p) => r.text.includes(p)));
  for (const u of urls) {
    const r = await c.get(u, { raw: true });
    if (u.includes('/doc/')) { // locked docs answer exactly like unknown ones, so file names cannot be probed
      assert.equal(r.status, 404, u);
      assert.deepEqual(JSON.parse(r.text), JSON.parse((await c.get('/api/aip/lesson/1/doc/no-such-file', { raw: true })).text));
      scan(r);
      continue;
    }
    assert.equal(r.status, 403, u);
    assert.equal(JSON.parse(r.text).error.code, 'locked');
    assert.ok(JSON.parse(r.text).error.opensAt);
    scan(r);
  }
  assert.equal((await c.get('/api/aip/prep/pdf?lang=ru')).status, 200); // prep is open at once
  a.clock.t = Date.parse('2026-09-12T10:00:00+05:00');
  let r = await c.get('/api/aip/lesson/1/slide/78', { raw: true });
  assert.deepEqual([r.status, r.headers.get('content-type')], [200, 'image/svg+xml']);
  assert.equal((await c.get('/api/aip/lesson/1/slide/79')).status, 404);
  assert.equal((await c.get('/api/aip/lesson/1/slide/0')).status, 404);
  assert.equal((await c.get('/api/aip/lesson/3/slide/1')).status, 403); // lesson 3 not started
  assert.equal((await c.get('/api/aip/lesson/4/slide/1')).status, 404); // lesson 4 has no slides
  r = await c.get('/api/aip/lesson/1/doc/hw-kompaniya');
  assert.equal(r.status, 200);
  assert.equal(r.headers.get('content-type'), 'application/pdf');
  assert.match(r.headers.get('content-disposition'), /filename="01_Kompaniya.pdf"/);
  assert.ok(r.buf.subarray(0, 5).toString() === '%PDF-');
  assert.match(r.headers.get('cache-control'), /no-store/);
  const rg = await c.get('/api/aip/lesson/1/doc/hw-kompaniya', { headers: { Range: 'bytes=0-4' } });
  assert.deepEqual([rg.status, rg.text], [206, '%PDF-']);
  assert.equal((await c.get('/api/aip/lesson/1/doc/no-such-file')).status, 404);
  assert.equal((await c.get('/api/aip/lesson/1/doc/..%2f..%2fschedule.json')).status, 404);
  assert.equal((await c.get('/api/aip/lesson/9')).status, 404);
  const nb = await c.get('/api/aip/lesson/1/book'); // the book route is gone: the generic unknown-route 404
  assert.deepEqual([nb.status, nb.json.error.code], [404, 'not_found']);
  // every payload and error body is free of server paths
  for (const u of ['/api/aip/me', '/api/aip/lesson/1', '/api/aip/lesson/4', '/api/aip/lesson/2/nope']) scan(await c.get(u, { raw: true }));
  assert.deepEqual(leaks, []);
  assert.equal((await a.client().get('/api/aip/lesson/1/doc/hw-kompaniya')).status, 401);
});

test('prep pdf: language picks the file, bad language falls back to uz', async (t) => {
  const a = await startApp(t, { now: BEFORE });
  const c = await a.login('XM');
  const ru = await c.get('/api/aip/prep/pdf?lang=ru');
  assert.match(ru.headers.get('content-disposition'), /prep-ru\.pdf/);
  assert.match((await c.get('/api/aip/prep/pdf?lang=xx')).headers.get('content-disposition'), /prep-uz\.pdf/);
});

test('language: lesson metadata is translated, the parts always come from the Uzbek file', async (t) => {
  const a = await startApp(t, { now: AFTER });
  const c = await a.login('XM');
  const uz = (await c.get('/api/aip/lesson/1')).json.lesson;
  const ru = (await c.get('/api/aip/lesson/1?lang=ru')).json.lesson;
  assert.notEqual(ru.title, uz.title);
  assert.deepEqual(ru.vazifa, uz.vazifa);
  assert.deepEqual(ru.kit, uz.kit);
  assert.equal(ru.amaliyot.text, uz.amaliyot.text);
  assert.equal(ru.slideCount, uz.slideCount);
  assert.notEqual(ru.topics[0], uz.topics[0]);
  const en = (await c.get('/api/aip/lesson/1?lang=en')).json.lesson;
  assert.equal(en.title, 'How AI works');
  assert.deepEqual(en.vazifa, uz.vazifa);
});

// ---------- progress
test('progress: validation, high-water marks, untick, limits', async (t) => {
  const a = await startApp(t, { now: AFTER });
  const c = await a.login('XM');
  const put = (key, value) => c.put('/api/aip/progress', { key, value });
  let r = await put('prep:0', 1);
  assert.equal(r.status, 200);
  assert.deepEqual(r.json.progress.t, { 'prep:0': 1 });
  await put('p:01:P1', true); await put('x:h01', 1); await put('f:am2', 1);
  assert.deepEqual(Object.keys((await c.get('/api/aip/progress')).json.progress.t).sort(), ['f:am2', 'p:01:P1', 'prep:0', 'x:h01']);
  await put('sl:1', 14);
  r = await put('sl:1', 5);
  assert.equal(r.json.progress.sl[1], 14); // never goes back
  assert.equal((await put('sl:1', 78)).json.progress.sl[1], 78);
  r = await put('prep:0', null);
  assert.ok(!('prep:0' in r.json.progress.t));
  for (const key of ['', 'sl:10', 'sl:1x', 'prep:abc', '../x', '__proto__', 'p:01', 'p:01:P1:extra', 'a'.repeat(100), 'u5', 5, null]) {
    const e = await put(key, 1);
    assert.equal(e.status, 400, String(key));
    assert.equal(e.json.error.code, 'bad_key');
  }
  for (const [key, v] of [['prep:1', 2], ['prep:1', 'yes'], ['prep:1', {}], ['sl:1', -1], ['sl:1', 1.5], ['sl:1', 99999], ['sl:1', true]]) assert.equal((await put(key, v)).json.error.code, 'bad_value', `${key}=${v}`);
  assert.equal((await c.put('/api/aip/progress', { key: 'prep:1', value: 1, extra: 1 })).json.error.code, 'unknown_field');
  assert.equal((await c.put('/api/aip/progress', { key: 'x'.repeat(600), value: 1 })).status, 413);
  assert.equal((await a.client().put('/api/aip/progress', { key: 'prep:1', value: 1 })).status, 401);
  assert.equal((await c.put('/api/aip/progress', { key: 'prep:1', value: 1 }, { headers: { Origin: 'https://evil.example' } })).status, 403);
  // key cap
  for (let i = 0; i < 70; i++) for (const k of ['p:aaa:P', 'p:bbb:P', 'p:ccc:P', 'p:ddd:P', 'p:eee:P', 'p:fff:P', 'p:ggg:P', 'p:hhh:P', 'p:iii:P']) a.db.prepare("INSERT OR IGNORE INTO progress VALUES ('XM', ?, 1, 'x')").run(k + i);
  assert.equal((await put('x:zzz', 1)).json.error.code, 'too_many_keys');
});

test('progress is per student and survives a new login', async (t) => {
  const a = await startApp(t, { now: AFTER });
  createStudent(a.db, { fullName: 'Boshqa Talaba', grp: 'shanba', id: 'OTH', allowShort: true });
  const x = await a.login('XM'), o = await a.login('OTH');
  await x.put('/api/aip/progress', { key: 'f:v2', value: 1 });
  assert.deepEqual((await o.get('/api/aip/progress')).json.progress.t, {});
  const again = await a.login('XM');
  assert.deepEqual(again.session.progress.t, { 'f:v2': 1 });
});

test('review column opens every lesson early; a client cannot set it', async (t) => {
  const a = await startApp(t, { now: AFTER });
  createStudent(a.db, { fullName: 'Oddiy Talaba', grp: 'shanba', id: 'REG', allowShort: true });
  const xm = await a.login('XM'), reg = await a.login('REG');
  a.db.prepare("UPDATE students SET review = 0 WHERE id = 'XM'").run();
  for (const c of [xm, reg]) for (const n of [3, 4, 6]) assert.equal((await c.get('/api/aip/lesson/' + n)).json.lesson.open, false, String(n));
  for (const c of [xm, reg]) assert.equal((await c.put('/api/aip/progress', { key: 'u4', value: 1 })).json.error.code, 'bad_key');
  assert.equal((await xm.get('/api/aip/lesson/3/slide/1')).status, 403);
  a.db.prepare("UPDATE students SET review = 1 WHERE id = 'XM'").run();
  for (const n of [1, 2, 3, 4, 5, 6]) assert.equal((await xm.get('/api/aip/lesson/' + n)).json.lesson.open, true, String(n)); // empty lessons too
  assert.equal((await xm.get('/api/aip/lesson/3/slide/1')).status, 200);
  assert.equal((await reg.get('/api/aip/lesson/3/slide/1')).status, 403);
  assert.equal((await reg.get('/api/aip/lesson/6')).json.lesson.open, false);
});

test('empty lessons (no parts yet) open on their date, and stay shut with no group or TBA dates', async (t) => {
  // lesson 4 of the shipped content has no parts; no fixtures here
  const dir = tmpCopy(t, undefined, { fixtures: false });
  const a = await startApp(t, { now: '2026-10-03T09:59', contentDir: dir });
  createStudent(a.db, { fullName: 'Guruhsiz Talaba', id: 'NOG', allowShort: true });
  const xm = await a.login('XM'), nog = await a.login('NOG');
  const l4 = async (c) => (await c.get('/api/aip/lesson/4')).json.lesson;
  const L = await l4(xm);
  assert.deepEqual([L.open, L.parts, L.start], [false, {}, '2026-10-03T10:00:00+05:00']);
  assert.deepEqual(L.has, { slides: false, amaliyot: false, kit: false, vazifa: false, prep: false });
  a.clock.t = Date.parse('2026-10-03T10:00:00+05:00');
  assert.equal((await l4(xm)).open, true);
  assert.equal((await l4(nog)).open, false);
  assert.equal((await xm.get('/api/aip/me')).json.lessons[6].open, false); // lesson 6 is two weeks away
  const tba = tbaContent(t, (s) => { s.groups.shanba = null; });
  const b = await startApp(t, { now: '2027-01-01T12:00', contentDir: tba });
  assert.equal((await (await b.login('XM')).get('/api/aip/lesson/4')).json.lesson.open, false);
});

// ---------- http plumbing
test('http: health, headers, errors, static + SPA fallback', async (t) => {
  const pub = fs.mkdtempSync(path.join(tmpCopy(t).replace(/[^\\/]*$/, ''), 'pub-'));
  fs.mkdirSync(path.join(pub, 'aip'));
  fs.writeFileSync(path.join(pub, 'aip', 'index.html'), '<!doctype html><title>shell</title>');
  fs.writeFileSync(path.join(pub, 'app.js'), 'console.log(1)');
  fs.writeFileSync(path.join(pub, '.secret'), 'x');
  const a = await startApp(t, { now: BEFORE, publicDir: pub, production: true });
  const c = a.client();
  let r = await c.get('/health');
  assert.deepEqual(r.json, { ok: true });
  const csp = r.headers.get('content-security-policy');
  assert.match(csp, /default-src 'none'/);
  assert.match(csp, /script-src 'self'(;|$)/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.equal(r.headers.get('x-content-type-options'), 'nosniff');
  assert.match(r.headers.get('strict-transport-security'), /max-age/);
  r = await c.get('/api/aip/nope');
  assert.deepEqual([r.status, r.json.error.code], [404, 'not_found']);
  r = await c.post('/api/aip/me', {});
  assert.deepEqual([r.status, r.json.error.code], [405, 'method_not_allowed']);
  assert.match(r.headers.get('cache-control'), /no-store/);
  r = await c.get('/aip/dars/3/slaydlar');
  assert.match(r.text, /shell/);
  assert.equal((await c.get('/aip/')).status, 200);
  assert.equal((await c.get('/aip')).status, 301);
  assert.match((await c.get('/app.js')).headers.get('content-type'), /javascript/);
  assert.equal((await c.get('/aip/missing.js')).status, 404);
  assert.equal((await c.get('/.secret')).status, 404);
  assert.equal((await c.get('/%2e%2e/%2e%2e/package.json')).status, 404);
  assert.equal((await c.get('/..%5c..%5cpackage.json')).status, 404);
});

// ---------- dates to follow (groups.<g> = null)
function tbaContent(t, mut) {
  const dir = tmpCopy(t);
  const f = path.join(dir, 'schedule.json');
  const sch = JSON.parse(fs.readFileSync(f, 'utf8'));
  mut(sch);
  fs.writeFileSync(f, JSON.stringify(sch));
  return dir;
}

test('gating: dates TBA lock lessons 1-6 even when release says "open"; prep stays open', async (t) => {
  const contentDir = tbaContent(t, (s) => { s.groups.shanba = null; s.release = { 1: { slides: 'open', vazifa: 'open' }, 2: { slides: 'open' }, 4: { kit: 'open' } }; });
  const a = await startApp(t, { now: '2027-01-01T12:00', contentDir });
  createStudent(a.db, { fullName: 'Yakshanba Talaba', grp: 'yakshanba', id: 'SUN', allowShort: true });
  createStudent(a.db, { fullName: 'Guruhsiz Talaba', id: 'NOG', allowShort: true });
  a.db.prepare("UPDATE students SET review = 1 WHERE id IN ('XM', 'NOG')").run(); // the review flag does not beat TBA dates or a missing group
  for (const id of ['XM', 'NOG']) {
    const c = await a.login(id);
    const s = c.session;
    assert.equal(s.live.n, 0, id);
    assert.equal(s.schedule.shanba, null);
    assert.deepEqual(s.schedule.starts, { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null });
    assert.equal(s.lessons[0].open, true);
    assert.equal(s.lessons[0].prep.items.length, 4);
    for (const n of [1, 2, 3, 4, 5, 6]) {
      assert.equal(s.lessons[n].open, false, `${id} lesson ${n}`);
      assert.equal(s.lessons[n].start, null);
      for (const p of Object.values(s.lessons[n].parts)) assert.deepEqual(p, { open: false, opensAt: null });
    }
    assert.equal((await c.get('/api/aip/lesson/1/slide/1')).status, 403);
    assert.equal((await c.get('/api/aip/lesson/1/doc/hw-kompaniya')).status, 404);
    assert.equal((await c.get('/api/aip/prep/pdf')).status, 200);
  }
  const sun = await a.login('SUN'); // the other group has dates and "open" release: unaffected
  assert.equal(sun.session.lessons[1].parts.slides.open, true);
  assert.equal(sun.session.schedule.yakshanba, '2026-09-13');
  a.db.prepare("UPDATE students SET review = 1 WHERE id = 'SUN'").run();
  const sunR = (await a.login('SUN')).session; // a group with dates: review = 1 opens every lesson
  assert.equal(sunR.lessons[3].parts.slides.open, true);
  assert.equal(sunR.lessons[6].open, true);
});

test('gating: liveOverride cannot make a no-group or TBA student live', async (t) => {
  const contentDir = tbaContent(t, (s) => { s.groups.shanba = null; s.liveOverride = 2; });
  const a = await startApp(t, { now: '2026-09-20T12:00', contentDir });
  createStudent(a.db, { fullName: 'Guruhsiz Talaba', id: 'NOG', allowShort: true });
  createStudent(a.db, { fullName: 'Yakshanba Talaba', grp: 'yakshanba', id: 'SUN', allowShort: true });
  assert.equal((await a.login('XM')).session.live.n, 0);
  assert.equal((await a.login('NOG')).session.live.n, 0);
  assert.equal((await a.login('SUN')).session.live.n, 2);
});

test('shipped schedule.json: 6 dates at 10:00, nothing in lessons 1-6 opens before that group\'s lesson 1 (or everything is shut when TBA)', () => {
  const real = path.resolve(import.meta.dirname, '..', 'content');
  const c = createContent({ dir: real, now: () => 0 });
  c.validateAll();
  const sch = c.schedule();
  for (const g of ['shanba', 'yakshanba', null]) {
    const start = sch.groups[g] ? sch.groups[g][0] : NaN;
    if (sch.groups[g]) assert.equal(sch.groups[g].length, 6);
    for (const n of [1, 2, 3, 4, 5, 6]) for (const part of ['slides', 'amaliyot', 'kit', 'vazifa', 'start']) {
      const at = c.opensAt(n, part, g);
      if (Number.isNaN(start)) assert.ok(Number.isNaN(at), `${g} ${n}.${part} must stay shut while dates are TBA`);
      else assert.ok(at >= start, `${g} ${n}.${part} opens before lesson 1`);
    }
    assert.equal(c.opensAt(0, 'prep', g), 0); // precourse is always open
  }
});
