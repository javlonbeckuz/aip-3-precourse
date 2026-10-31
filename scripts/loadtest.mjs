// Load and sign-in test against a real server process on a throwaway database. Run: node scripts/loadtest.mjs [students=300] [now=2026-11-12T15:00]
// It does not touch data/ or content/: the database lives in a temp folder that is deleted at the end.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDb, createStudent } from '../server/db.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const N = Number(process.argv[2]) || 300, NOW = process.argv[3] || '2026-11-12T15:00', PORT = 3300 + Math.floor(Math.random() * 500);
const BASE = `http://127.0.0.1:${PORT}`, dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aip-load-'));

// ---- students: 2/3 with no group yet (as the CRM makes them), the rest split between the two groups
const db = openDb(dir);
const ids = [];
for (let i = 0; i < N; i++) ids.push(createStudent(db, { fullName: `Talaba ${i}`, phone: `+99890${String(1000000 + i).slice(-7)}`, grp: i % 3 === 0 ? 'shanba' : i % 3 === 1 ? null : i % 2 ? 'yakshanba' : null }).id);
db.close();

const srv = spawn(process.execPath, ['server/index.js'], { cwd: ROOT, env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1', DATA_DIR: dir, NOW, ALLOW_NOW: '1', BOT_TOKEN: '', INTEGRATION_KEY: '', SEED_DEMO: '', NODE_ENV: 'development' }, stdio: ['ignore', 'pipe', 'pipe'] });
let srvErr = '';
srv.stderr.on('data', (d) => { srvErr += d; });
const stop = async () => { if (srv.exitCode === null) { srv.kill(); await new Promise((r) => srv.once('exit', r)); } fs.rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 }); };
for (let k = 0; ; k++) { try { if ((await fetch(BASE + '/health')).ok) break; } catch { /* starting */ } if (k > 50) { await stop(); throw new Error('server did not start\n' + srvErr); } await new Promise((r) => setTimeout(r, 100)); }

const H = { 'Content-Type': 'application/json', Origin: BASE };
const stats = {};
async function call(name, method, url, { body, cookie } = {}) {
  const t0 = performance.now();
  let status = 0, setCookie = null, json = null;
  try {
    const r = await fetch(BASE + url, { method, headers: { ...(body ? H : { Origin: BASE }), ...(cookie ? { Cookie: cookie } : {}) }, body: body ? JSON.stringify(body) : undefined });
    status = r.status; setCookie = r.headers.get('set-cookie');
    const buf = await r.arrayBuffer();
    if ((r.headers.get('content-type') || '').includes('json')) json = JSON.parse(Buffer.from(buf).toString());
  } catch (e) { status = 'ERR ' + e.cause?.code; }
  (stats[name] ??= []).push([performance.now() - t0, status]);
  return { status, json, cookie: setCookie ? setCookie.split(';')[0] : cookie };
}
const pct = (a, p) => a[Math.min(a.length - 1, Math.floor(a.length * p))];
function report(title) {
  console.log(`\n== ${title}`);
  for (const [name, rows] of Object.entries(stats)) {
    const ms = rows.map((r) => r[0]).sort((a, b) => a - b), by = {};
    for (const [, s] of rows) by[s] = (by[s] || 0) + 1;
    console.log(`${name.padEnd(22)} n=${String(rows.length).padEnd(5)} p50=${pct(ms, 0.5).toFixed(0).padStart(4)}ms p95=${pct(ms, 0.95).toFixed(0).padStart(5)}ms max=${ms.at(-1).toFixed(0).padStart(5)}ms  ${JSON.stringify(by)}`);
  }
  for (const k of Object.keys(stats)) delete stats[k];
}

try {
  // 1. every student signs in at the same moment, then uses the pre-course pages
  const t0 = performance.now();
  const sessions = await Promise.all(ids.map((id) => call('login', 'POST', '/api/aip/login', { body: { id } })));
  await Promise.all(sessions.map(async ({ cookie }) => {
    await call('page /aip/kursgacha', 'GET', '/aip/kursgacha');
    await call('app.js', 'GET', '/aip/app.js');
    await call('GET /me', 'GET', '/api/aip/me', { cookie });
    await call('GET lesson 0', 'GET', '/api/aip/lesson/0', { cookie });
    for (let i = 0; i < 4; i++) await call('PUT progress', 'PUT', '/api/aip/progress', { body: { key: `prep:${i}`, value: 1 }, cookie });
    await call('guide PDF', 'GET', '/api/aip/prep/pdf', { cookie });
    await call('locked lesson 1 doc', 'GET', '/api/aip/lesson/1/slide/1', { cookie });
  }));
  report(`${N} students at once (clock ${NOW}), total ${((performance.now() - t0) / 1000).toFixed(1)} s`);

  // 2. what students type: the real ID in other shapes, and look-alike letters that are not in the alphabet (0 1 I L O)
  const id = ids[0], six = id.slice(4), out = [];
  const typed = [id, id.toLowerCase(), six, six.toLowerCase(), ` ${id} `, `AIP ${six}`, `aip_${six}`, `AIP-${six.slice(0, 3)} ${six.slice(3)}`,
    `AIP-${six.slice(0, 5)}I`, `AIP-${six.slice(0, 5)}1`, `AIP-${six.slice(0, 5)}O`, `AIP-${six.slice(0, 5)}0`, `AIP-${six.slice(0, 5)}L`, 'XM', 'AIP-XM', 'aip-xm'];
  for (const t of typed) { const r = await call('typed', 'POST', '/api/aip/login', { body: { id: t } }); out.push(`${JSON.stringify(t).padEnd(16)} -> ${r.status}${r.json?.error ? ' ' + r.json.error.code : ''}`); }
  console.log(`\n== typed variants of ${id} (all from one IP; the bad ones count as failures)\n` + out.join('\n'));
  report('typed');

  // 3. one classroom on one Wi-Fi (one IP): more typos, then a student with the right ID
  const room = [];
  for (let i = 0; i < 24; i++) room.push((await call('room typo', 'POST', '/api/aip/login', { body: { id: `AIP-ZZZZ${'23456789ABCDEFGHJKMNPQRS'[i]}Z` } })).status);
  const ok = await call('room right ID', 'POST', '/api/aip/login', { body: { id: ids[1] } });
  console.log(`\n== classroom on one IP: 24 more typos -> ${JSON.stringify(room)}; then a correct ID -> ${ok.status}${ok.json?.error ? ' ' + ok.json.error.code + ' retryAfter=' + ok.json.error.retryAfter + 's' : ''}`);
  report('classroom');
} finally {
  await stop();
  if (srvErr.trim()) console.log('\n== server stderr\n' + srvErr.trim().split('\n').filter((l) => !/WARNING lesson \d+ has slideCount/.test(l)).join('\n'));
}
