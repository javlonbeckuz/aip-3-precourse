import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { openDb, normPhone, createStudent, updateStudent, getStudent, findStudents, publicStudent } from './db.js';
import { loadConfig, wireBot } from './index.js';
import { makeBot } from './bot.js';
import { createContent } from './content.js';
import { REAL_CONTENT } from './testutil.js';
import { bearerOk } from './auth.js';
import { startApp } from './testutil.js';

const KEY = 'k'.repeat(40);
const auth = (k = KEY) => ({ headers: { Authorization: `Bearer ${k}` } });
const URL_ = '/api/int/students';

test('normPhone: Uzbek spellings, foreign numbers, junk', () => {
  for (const ok of ['+998 99 303 89 99', '998993038999', '993038999', '(99) 303-89-99', '+998-99-303-89-99', ' 99 303 89 99 ']) assert.equal(normPhone(ok), '+998993038999', ok);
  assert.equal(normPhone('+1 415 555 0123'), '+14155550123');
  assert.equal(normPhone('+44 20 7946 0958'), '+442079460958');
  for (const bad of ['8 99 303 89 99', '89930389', '99830389', '+99899303899', '9989930389999', '+1234567', '+1234567890123456', '14155550123', '+0123456789', 'abc', '99 303 89 9x', '', null, undefined, '+', '0993038999'])
    assert.equal(normPhone(bad), null, String(bad));
});

test('bearerOk: exact "Bearer <key>" only', () => {
  assert.equal(bearerOk(`Bearer ${KEY}`, KEY), true);
  for (const h of [undefined, '', KEY, `bearer ${KEY}`, `Bearer  ${KEY}`, `Bearer ${KEY}x`, 'Bearer short']) assert.equal(bearerOk(h, KEY), false, String(h));
  assert.equal(bearerOk('Bearer ', ''), false); // no key configured never matches
});

test('db: phone is unique, group may be null, updateStudent dedupes on the phone', () => {
  const db = openDb(':memory:');
  const a = createStudent(db, { fullName: 'Ali Valiyev', phone: '90 123 45 67' });
  assert.equal(a.phone, '+998901234567');
  assert.equal(a.grp, null);
  assert.equal(publicStudent(a).group, null);
  assert.ok(!('phone' in publicStudent(a)));
  assert.throws(() => createStudent(db, { fullName: 'Boshqa Odam', phone: '+998901234567' }), (e) => e.status === 409 && e.code === 'duplicate_phone' && e.extra.id === a.id);
  assert.throws(() => createStudent(db, { fullName: 'X Y', phone: 'junk' }), { code: 'bad_phone' });
  assert.throws(() => createStudent(db, { fullName: 'X Y', grp: 'friday' }), { code: 'bad_group' });
  assert.throws(() => createStudent(db, { fullName: 'X' }), { code: 'bad_name' });
  assert.throws(() => createStudent(db, { fullName: 'X Y', mentor: 'm'.repeat(81) }), { code: 'bad_mentor' });
  const b = createStudent(db, { fullName: 'Vali Aliyev', phone: '+998901234568', grp: 'shanba' });
  assert.throws(() => updateStudent(db, b.id, { phone: '90 123 45 67' }), { code: 'duplicate_phone' });
  assert.equal(updateStudent(db, b.id, { phone: '+998 90 123 45 68' }).phone, '+998901234568'); // its own phone is fine
  assert.equal(updateStudent(db, a.id, { grp: 'yakshanba', fullName: 'Ali  Karimov' }).first_name, 'Ali');
  assert.equal(getStudent(db, a.id).grp, 'yakshanba');
  assert.throws(() => updateStudent(db, 'AIP-NOPE22', { grp: 'shanba' }), { status: 404 });
  assert.equal(findStudents(db, '123 45 67').length, 1); // phone digits (>= 4)
  assert.equal(findStudents(db, '+998901234568')[0].id, b.id);
  assert.equal(findStudents(db, '123').length, 0); // fewer than 4 digits only match names and ids
});

test('migration 003: a v2 database upgrades, rows and progress survive, group nullable, phone unique', (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aip-mig-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const mig = path.join(import.meta.dirname, 'migrations');
  const old = new DatabaseSync(path.join(dir, 'aip.db'));
  for (const f of ['001_init.sql', '002_review.sql']) old.exec(fs.readFileSync(path.join(mig, f), 'utf8'));
  old.exec('PRAGMA user_version = 2');
  old.exec(`INSERT INTO students (id, full_name, first_name, grp, mentor, created_at, review) VALUES ('AIP-AAAAAA', 'Old One', 'Old', 'shanba', 'M', '2026-10-01T00:00:00Z', 1), ('AIP-BBBBBB', 'Old Two', 'Old', 'yakshanba', '', '2026-10-02T00:00:00Z', 0)`);
  old.exec(`INSERT INTO progress VALUES ('AIP-AAAAAA', 'prep:0', 1, 'x'), ('AIP-AAAAAA', 'sl:1', 7, 'x'), ('AIP-BBBBBB', 'prep:1', 1, 'x')`);
  old.exec(`INSERT INTO sessions VALUES ('h1', 'AIP-AAAAAA', 1, 9999999999999)`);
  old.close();

  const db = openDb(dir);
  assert.equal(db.prepare('PRAGMA user_version').get().user_version, 3);
  assert.equal(db.prepare('PRAGMA foreign_keys').get().foreign_keys, 1);
  assert.equal(db.prepare('PRAGMA foreign_key_check').all().length, 0);
  const a = getStudent(db, 'AIP-AAAAAA');
  assert.deepEqual([a.full_name, a.grp, a.mentor, a.review, a.phone, a.active], ['Old One', 'shanba', 'M', 1, null, 1]);
  assert.equal(db.prepare('SELECT COUNT(*) AS c FROM progress').get().c, 3);
  assert.equal(db.prepare('SELECT COUNT(*) AS c FROM sessions').get().c, 1);
  // FKs still enforced after the rebuild
  assert.throws(() => db.prepare("INSERT INTO progress VALUES ('AIP-NOBODY', 'prep:0', 1, 'x')").run(), /FOREIGN KEY/);
  // nullable group, two NULL phones fine, duplicate phone refused by the index, bad group still refused by the CHECK
  const ins = db.prepare('INSERT INTO students (id, full_name, first_name, grp, phone, created_at) VALUES (?, ?, ?, ?, ?, ?)');
  ins.run('AIP-CCCCCC', 'No Group', 'No', null, null, 'x');
  ins.run('AIP-DDDDDD', 'No Group 2', 'No', null, null, 'x');
  ins.run('AIP-EEEEEE', 'Has Phone', 'Has', null, '+998901112233', 'x');
  assert.throws(() => ins.run('AIP-FFFFFF', 'Dup Phone', 'Dup', null, '+998901112233', 'x'), /UNIQUE/);
  assert.throws(() => ins.run('AIP-GGGGGG', 'Bad Group', 'Bad', 'friday', null, 'x'), /CHECK/);
  db.close();
  openDb(dir).close(); // reopening is a no-op
});

test('integration endpoint: off without a key, a short key stops startup', async (t) => {
  assert.throws(() => loadConfig({ INTEGRATION_KEY: 'too-short' }), /at least 32/);
  assert.equal(loadConfig({}).integrationKey, '');
  const { client } = await startApp(t);
  const r = await client().post(URL_, { fullName: 'Ali Valiyev', phone: '901234567' }, auth());
  assert.equal(r.status, 404);
});

test('integration endpoint: auth', async (t) => {
  const { client, db } = await startApp(t, { env: { INTEGRATION_KEY: KEY } });
  const body = { fullName: 'Ali Valiyev', phone: '901234567' };
  const c = client();
  for (const headers of [{}, { Authorization: 'Bearer nope' }, { Authorization: `bearer ${KEY}` }, { Authorization: KEY }, { Cookie: 'aip_session=whatever' }]) {
    const r = await c.post(URL_, body, { headers });
    assert.equal(r.status, 401, JSON.stringify(headers));
    assert.equal(r.json.error.code, 'unauthorized');
  }
  assert.equal(db.prepare('SELECT COUNT(*) AS c FROM students').get().c, 1); // only XM
  const ok = await c.post(URL_, body, auth());
  assert.equal(ok.status, 201);
  assert.equal(ok.setCookie, null);
  assert.equal(ok.headers.get('cache-control'), 'no-store');
  assert.equal((await c.post(URL_, body, { headers: { ...auth().headers, Origin: 'https://evil.example' } })).status, 200); // no Origin check on this route
});

test('integration endpoint: answers carry no ID; idempotent on the phone; odd repeat payments reach the admins', async (t) => {
  const { client, app, db } = await startApp(t, { env: { INTEGRATION_KEY: KEY } });
  const logs = [];
  for (const m of ['log', 'warn', 'error']) t.mock.method(console, m, (...a) => logs.push(a.join(' ')));
  const seen = [];
  app.setAnnounce((s, note) => seen.push([s.id, note]));
  const c = client();
  const r1 = await c.post(URL_, { fullName: 'Ali  Valiyev', phone: '+998 90 123 45 67' }, auth());
  assert.equal(r1.status, 201);
  assert.deepEqual(r1.json, { ok: true, created: true }); // no student object, ID, name or phone
  const row = db.prepare("SELECT * FROM students WHERE phone = '+998901234567'").get();
  assert.deepEqual([row.full_name, row.first_name, row.grp, row.mentor, row.created_by, row.active], ['Ali Valiyev', 'Ali', null, '', 0, 1]); // 0 = made by the CRM
  assert.deepEqual(seen, [[row.id, null]]);
  // retries: other spellings of the phone, same name modulo spacing/case/apostrophes: 200, nothing changed, silent
  for (const [name, phone] of [['Ali Valiyev', '901234567'], ['ali   VALIYEV', '998901234567'], ['Ali Valiyev', '(90) 123-45-67']]) {
    const r = await c.post(URL_, { fullName: name, phone, group: 'shanba', mentor: 'M' }, auth());
    assert.equal(r.status, 200);
    assert.deepEqual(r.json, { ok: true, created: false });
  }
  assert.equal(seen.length, 1);
  assert.deepEqual({ ...db.prepare('SELECT grp, mentor FROM students WHERE id = ?').get(row.id) }, { grp: null, mentor: '' }); // nothing changed
  // another name for a known phone: still 200, but the admins are told
  const r2 = await c.post(URL_, { fullName: 'Someone <Else>', phone: '901234567' }, auth());
  assert.deepEqual([r2.status, r2.json], [200, { ok: true, created: false }]);
  assert.deepEqual(seen.at(-1), [row.id, { inactive: false, crmName: 'Someone <Else>' }]);
  // the same odd retry again, and a deactivation on top: 200, but the admins hear about a student once a day
  for (let k = 0; k < 3; k++) assert.equal((await c.post(URL_, { fullName: 'Someone <Else>', phone: '901234567' }, auth())).status, 200);
  db.prepare('UPDATE students SET active = 0 WHERE id = ?').run(row.id);
  assert.equal((await c.post(URL_, { fullName: 'Ali Valiyev', phone: '901234567' }, auth())).status, 200);
  assert.equal(seen.length, 2);
  // a deactivated student (another one)
  assert.equal((await c.post(URL_, { fullName: 'Gone Student', phone: '901234500' }, auth())).status, 201);
  const gone = db.prepare("SELECT id FROM students WHERE phone = '+998901234500'").get().id;
  db.prepare('UPDATE students SET active = 0 WHERE id = ?').run(gone);
  assert.equal((await c.post(URL_, { fullName: 'Gone Student', phone: '901234500' }, auth())).status, 200);
  assert.deepEqual(seen.at(-1), [gone, { inactive: true, crmName: null }]);
  assert.equal(seen.length, 4); // 1 created + 1 odd name + 1 created (Gone) + 1 inactive
  seen.length = 0;
  // group + mentor on a new phone; an empty group is NULL
  assert.equal((await c.post(URL_, { fullName: 'Vali Aliyev', phone: '901234568', group: 'yakshanba', mentor: ' Xurshid  M ' }, auth())).status, 201);
  assert.deepEqual({ ...db.prepare("SELECT grp, mentor FROM students WHERE phone = '+998901234568'").get() }, { grp: 'yakshanba', mentor: 'Xurshid M' });
  assert.equal((await c.post(URL_, { fullName: 'Sardor K', phone: '901234569', group: '', mentor: '' }, auth())).status, 201);
  assert.equal(db.prepare("SELECT grp FROM students WHERE phone = '+998901234569'").get().grp, null);
  // a throwing announce (sync or async) still answers 201
  app.setAnnounce(() => { throw new Error('bot down'); });
  assert.equal((await c.post(URL_, { fullName: 'Throw Sync', phone: '901234570' }, auth())).status, 201);
  app.setAnnounce(async () => { throw new Error('bot down'); });
  assert.equal((await c.post(URL_, { fullName: 'Throw Async', phone: '901234571' }, auth())).status, 201);
  await new Promise((r) => setTimeout(r, 20));
  app.setAnnounce(null); // bot off: still 201
  assert.equal((await c.post(URL_, { fullName: 'No Bot', phone: '901234572' }, auth())).status, 201);
  // logs: never a phone, a name, or a full ID; the repeat path logs no ID at all
  const text = logs.join('\n');
  assert.match(text, /integration: created #\d+/);
  assert.match(text, /integration: phone already known/);
  assert.ok(!/AIP-/.test(text), 'an ID (or part of one) was logged');
  assert.ok(!/90123|Valiyev|Throw|Else/.test(text), text);
});

test('integration endpoint: a CRM student (no group) logs in and sees precourse only', async (t) => {
  const { client, login, db } = await startApp(t, { env: { INTEGRATION_KEY: KEY }, now: '2026-10-29T12:00:00+05:00' });
  t.mock.method(console, 'log', () => {});
  t.mock.method(console, 'warn', () => {});
  assert.equal((await client().post(URL_, { fullName: 'Ali Valiyev', phone: '901234567' }, auth())).status, 201);
  const c = await login(db.prepare("SELECT id FROM students WHERE phone = '+998901234567'").get().id);
  const me = c.session;
  assert.equal(me.student.group, null);
  assert.ok(!JSON.stringify(me).includes('901234567'));
  assert.equal(me.live.n, 0);
  assert.ok(me.schedule.starts[1] === null && me.schedule.group === null);
  const lessons = Object.fromEntries(me.lessons.map((l) => [l.n, l]));
  assert.equal(lessons[0].parts.prep.open, true);
  for (const n of [1, 2, 3, 4, 5, 6]) {
    assert.equal(lessons[n].open, false, `lesson ${n}`);
    assert.equal(lessons[n].start, null);
    assert.equal(lessons[n].date, null);
    for (const p of Object.values(lessons[n].parts)) assert.deepEqual(p, { open: false, opensAt: null });
    if (!lessons[n].has.slides) continue;
    const r = await c.get(`/api/aip/lesson/${n}/slide/1`);
    assert.equal(r.status, 403);
    assert.equal(r.json.error.opensAt, null);
  }
  assert.equal((await c.get('/api/aip/prep/pdf')).status, 200);
});

test('integration endpoint: validation, size, content type, unknown fields', async (t) => {
  const { client } = await startApp(t, { env: { INTEGRATION_KEY: KEY } });
  const c = client();
  const bad = async (body, status, code, extra) => {
    const r = await c.post(URL_, body, extra ?? auth());
    assert.equal(r.status, status, JSON.stringify(body));
    assert.equal(r.json.error.code, code);
  };
  await bad({ phone: '901234567' }, 400, 'bad_name');
  await bad({ fullName: 'A', phone: '901234567' }, 400, 'bad_name');
  await bad({ fullName: 'A'.repeat(81), phone: '901234567' }, 400, 'bad_name');
  await bad({ fullName: 42, phone: '901234567' }, 400, 'bad_name'); // non-strings count as empty
  await bad({ fullName: 'Ali\u0000Valiyev', phone: '901234567' }, 400, 'bad_name');
  await bad({ fullName: 'Ali Valiyev', phone: '901234567', mentor: 'M\u0007' }, 400, 'bad_mentor');
  await bad({ fullName: 'Ali Valiyev' }, 400, 'bad_phone');
  await bad({ fullName: 'Ali Valiyev', phone: 901234567 }, 400, 'bad_phone');
  await bad({ fullName: 'Ali Valiyev', phone: '8 90 123 45 67' }, 400, 'bad_phone');
  await bad({ fullName: 'Ali Valiyev', phone: '901234567', group: 'friday' }, 400, 'bad_group');
  await bad({ fullName: 'Ali Valiyev', phone: '901234567', mentor: 'm'.repeat(81) }, 400, 'bad_mentor');
  await bad({ fullName: 'Ali Valiyev', phone: '901234567', admin: true }, 400, 'unknown_field');
  await bad('not json', 400, 'bad_json', { headers: { ...auth().headers, 'Content-Type': 'application/json' } });
  await bad([], 400, 'bad_json');
  await bad({ fullName: 'Ali Valiyev', phone: '901234567', mentor: 'x'.repeat(1100) }, 413, 'too_large');
  const t415 = await c.call('POST', URL_, { body: '{}', headers: { ...auth().headers, 'Content-Type': 'text/plain' } });
  assert.equal(t415.status, 415);
});

test('names: invisible format characters are stripped, control characters refused; Uzbek and Cyrillic letters pass', () => {
  const db = openDb(':memory:');
  const ZW = String.fromCharCode(0x200b), RLO = String.fromCharCode(0x202e), BOM = String.fromCharCode(0xfeff), LONE = String.fromCharCode(0xd800), NEL = String.fromCharCode(0x85);
  for (const bad of ['Ali\u0000V', 'Ali\u0007V', 'Ali' + NEL + 'V']) assert.throws(() => createStudent(db, { fullName: bad }), { code: 'bad_name' }, JSON.stringify(bad));
  assert.throws(() => createStudent(db, { fullName: 'Ali V', mentor: 'M\u0007' }), { code: 'bad_mentor' });
  // zero-width, bidi, BOM and lone surrogates vanish instead of bouncing a paid buyer
  assert.equal(createStudent(db, { fullName: 'Ali' + ZW + RLO + 'V' + BOM + LONE + 'aliyev', mentor: 'Xur' + ZW + 'shid' }).full_name, 'AliValiyev');
  assert.equal(db.prepare("SELECT mentor FROM students WHERE full_name = 'AliValiyev'").get().mentor, 'Xurshid');
  assert.throws(() => createStudent(db, { fullName: ZW + RLO + ' ' }), { code: 'bad_name' }); // nothing left
  for (const ok of ['O\u02bbtkir Hamrayev', 'G\u02bcayrat Aliyev', "O'tkir Hamrayev", '\u040e\u0442\u043a\u0438\u0440 \u04b2\u0430\u043c\u0440\u0430\u0435\u0432', 'Zo\u02bbr Ali'])
    assert.equal(createStudent(db, { fullName: ok, mentor: 'Xurshid Maro\u02bbziqov' }).full_name, ok);
});

test('integration endpoint: wrong keys are limited per IP (valid key unaffected); only failures count', async (t) => {
  const { client } = await startApp(t, { env: { INTEGRATION_KEY: KEY } });
  const warn = t.mock.method(console, 'warn', () => {});
  t.mock.method(console, 'log', () => {});
  const c = client();
  const body = { fullName: 'Ali Valiyev', phone: '901234567' };
  for (let i = 0; i < 10; i++) assert.equal((await c.post(URL_, body, auth(`wrong${i}`.padEnd(40, 'x')))).status, 401);
  const r = await c.post(URL_, body, auth('wrong-again'.padEnd(40, 'x')));
  assert.equal(r.status, 429);
  assert.equal(r.json.error.code, 'rate_limited');
  assert.ok(Number(r.headers.get('retry-after')) > 0);
  assert.equal((await c.post(URL_, body, { headers: {} })).status, 429); // a missing header is a failed auth too
  assert.equal((await c.post(URL_, body, auth())).status, 201); // the real CRM, same IP, still gets in
  assert.equal((await c.post(URL_, body, auth())).status, 200);
  // the log says which client, never the header; it is itself rate limited
  const lines = warn.mock.calls.map((x) => x.arguments.join(' ')).filter((l) => l.startsWith('integration: bad key'));
  assert.ok(lines.length >= 1 && lines.length <= 3, String(lines.length));
  assert.ok(lines.every((l) => /^integration: bad key from \S+$/.test(l) && !l.includes('wrong')));
});

test('integration endpoint: 300 authenticated calls per minute per IP', async (t) => {
  const { client } = await startApp(t, { env: { INTEGRATION_KEY: KEY } });
  t.mock.method(console, 'log', () => {});
  t.mock.method(console, 'warn', () => {});
  const c = client();
  const body = { fullName: 'Ali Valiyev', phone: '901234567' };
  let bad = 0;
  for (let i = 0; i < 300; i++) if ((await c.post(URL_, body, auth())).status > 201) bad++;
  assert.equal(bad, 0);
  const r = await c.post(URL_, body, auth());
  assert.equal(r.status, 429);
  assert.ok(Number(r.headers.get('retry-after')) > 0);
});

test('integration endpoint: at most 100 new students an hour, with one alert', async (t) => {
  const { client, app, db } = await startApp(t, { env: { INTEGRATION_KEY: KEY } });
  const log = t.mock.method(console, 'log', () => {});
  t.mock.method(console, 'warn', () => {});
  const err = t.mock.method(console, 'error', () => {});
  const alerts = [];
  app.setAlert((m) => alerts.push(m));
  const c = client();
  for (let i = 0; i < 100; i++) assert.equal((await c.post(URL_, { fullName: `Talaba ${i}`, phone: `90${1000000 + i}` }, auth())).status, 201, String(i));
  const before = db.prepare('SELECT COUNT(*) AS c FROM students').get().c;
  for (let i = 0; i < 3; i++) {
    const r = await c.post(URL_, { fullName: 'Too Many', phone: `91${1000000 + i}` }, auth());
    assert.equal(r.status, 429);
    assert.equal(r.json.error.code, 'rate_limited');
    assert.ok(Number(r.headers.get('retry-after')) > 0);
  }
  assert.equal(db.prepare('SELECT COUNT(*) AS c FROM students').get().c, before);
  assert.equal(alerts.length, 1); // one admin notice
  assert.match(alerts[0], /100 new students/);
  assert.equal(err.mock.calls.filter((x) => String(x.arguments[0]).startsWith('ALERT')).length, 1); // one ALERT line
  // a spent cap answers the same for a known and an unknown phone (no registration oracle)
  const known = await c.post(URL_, { fullName: 'Talaba 5', phone: '901000005' }, auth());
  assert.equal(known.status, 429);
  assert.equal(known.json.error.code, 'rate_limited');
  assert.equal(alerts.length, 1);
  assert.ok(log.mock.callCount() > 0);
});

test('integration endpoint: every method is 404 when off, 405 on a wrong method when on', async (t) => {
  const off = await startApp(t);
  for (const m of ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']) {
    assert.equal((await off.client().call(m, URL_, m === 'GET' || m === 'DELETE' ? {} : { body: {} })).status, 404, m);
    assert.equal((await off.client().call(m, '/api/int/other', {})).status, 404, m);
  }
  const on = await startApp(t, { env: { INTEGRATION_KEY: KEY } });
  for (const m of ['GET', 'PUT', 'DELETE']) {
    const r = await on.client().call(m, URL_, m === 'PUT' ? { body: {} } : {});
    assert.equal(r.status, 405, m);
    assert.equal(r.json.error.code, 'method_not_allowed');
  }
  assert.equal((await on.client().call('GET', '/api/int/other', {})).status, 404);
});

test('integration endpoint: invisible characters in a name are stripped, not refused', async (t) => {
  const { client, db } = await startApp(t, { env: { INTEGRATION_KEY: KEY } });
  t.mock.method(console, 'log', () => {}); t.mock.method(console, 'warn', () => {});
  const ZW = String.fromCharCode(0x200b), RLO = String.fromCharCode(0x202e);
  const r = await client().post(URL_, { fullName: 'Ali' + ZW + RLO + ' Valiyev', phone: '901234567', mentor: 'X' + ZW + 'M' }, auth());
  assert.equal(r.status, 201);
  assert.deepEqual({ ...db.prepare("SELECT full_name, mentor FROM students WHERE phone = '+998901234567'").get() }, { full_name: 'Ali Valiyev', mentor: 'XM' });
});

test('integration endpoint: a refused authenticated request raises one rate-limited alert without echoing the data', async (t) => {
  const { client, app } = await startApp(t, { env: { INTEGRATION_KEY: KEY } });
  const err = t.mock.method(console, 'error', () => {});
  const alerts = [];
  app.setAlert((m) => alerts.push(m));
  const c = client();
  assert.equal((await c.post(URL_, { fullName: 'Ali\u0007 Secretname', phone: '901234567' }, auth())).status, 400);
  assert.equal((await c.post(URL_, { fullName: 'Ali Valiyev', phone: '12345-secret' }, auth())).status, 400);
  assert.equal((await c.post(URL_, { fullName: 'Ali Valiyev', phone: '901234567', admin: 1 }, auth())).status, 400);
  assert.equal(alerts.length, 1);
  assert.match(alerts[0], /student who paid may be missing/);
  assert.ok(!/Secretname|12345|Valiyev|901234567/.test(alerts[0] + err.mock.calls.map((x) => x.arguments.join(' ')).join('')));
  assert.equal((await c.post(URL_, {}, { headers: {} })).status, 401); // wrong auth is not a refused payment: no alert
  assert.equal(alerts.length, 1);
});

test('integration endpoint: repeat-payment notices are capped at 20 an hour overall', async (t) => {
  const { client, app } = await startApp(t, { env: { INTEGRATION_KEY: KEY } });
  t.mock.method(console, 'log', () => {}); t.mock.method(console, 'warn', () => {});
  const seen = [];
  app.setAnnounce((st, note) => seen.push(note));
  const c = client();
  for (let i = 0; i < 25; i++) assert.equal((await c.post(URL_, { fullName: 'Student ' + i, phone: '90200' + String(1000 + i) }, auth())).status, 201);
  seen.length = 0;
  for (let i = 0; i < 25; i++) assert.equal((await c.post(URL_, { fullName: 'Other ' + i, phone: '90200' + String(1000 + i) }, auth())).status, 200);
  assert.equal(seen.length, 20);
});

test('wiring: a repeat payment reaches the admins as "qayta toʻlov" with no forwardable message (index.js hooks + the real bot)', async (t) => {
  const { client, app, db } = await startApp(t, { env: { INTEGRATION_KEY: KEY } });
  t.mock.method(console, 'log', () => {}); t.mock.method(console, 'warn', () => {});
  const sent = [];
  const api = async (method, params) => { sent.push({ method, ...params }); return true; };
  const ctx = { db, content: createContent({ dir: REAL_CONTENT }), adminIds: new Set([111]), portalUrl: 'https://portal.example/aip/', state: new Map() };
  wireBot(app, makeBot({ api, ctx }));
  const flush = () => new Promise((r) => setTimeout(r, 30));
  const c = client();
  await c.post(URL_, { fullName: 'Ali Valiyev', phone: '901234567' }, auth());
  await flush();
  assert.equal(sent.length, 2); // card with buttons + the forwardable message
  assert.ok(sent[0].text.includes('Talaba yaratildi (CRM)') && sent[0].reply_markup && sent[1].text.includes('Assalomu alaykum'));
  sent.length = 0;
  await c.post(URL_, { fullName: 'Boshqa Odam', phone: '901234567' }, auth());
  await flush();
  assert.equal(sent.length, 1);
  assert.ok(sent[0].text.includes('qayta toʻlov') && sent[0].text.includes('Boshqa Odam'));
  assert.ok(!sent[0].text.includes('Talaba yaratildi') && !sent[0].reply_markup);
  assert.ok(!sent.some((m) => /Assalomu alaykum/.test(m.text)));
  // the alert hook is wired too
  sent.length = 0;
  t.mock.method(console, 'error', () => {});
  await c.post(URL_, { fullName: 'Ali Valiyev', phone: '12345' }, auth());
  await flush();
  assert.equal(sent.length, 1);
  assert.match(sent[0].text, /student who paid may be missing/);
});
