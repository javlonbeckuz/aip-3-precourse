// Analytics: the event log (what students do, no IPs, no typed values) and the private /stats dashboard.
// Admin access: the secret STATS_KEY on a form sets an admin cookie (12 h). The session lives in the DB (stats_tokens, hashed together with the key, so rotating the key ends every session)
// and a restart does not log the admin out. Pages are server-rendered HTML (no JS); the stylesheet is stats.css next to this file, served by the route below.
import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import * as auth from './auth.js';

const DAY = 86400e3, TZ = 5 * 3600e3;   // Tashkent is UTC+5, no DST
const KEEP_DAYS = 180, ADMIN_MS = 12 * 3600e3;
const CSS = fs.readFileSync(path.join(import.meta.dirname, 'stats.css'));
const sha = (t) => createHash('sha256').update(t).digest('hex');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const dayOf = (ts) => Math.floor((ts + TZ) / DAY);
const dayStr = (d) => new Date(d * DAY).toISOString().slice(0, 10);
const when = (ts) => (ts ? new Date(ts + TZ).toISOString().slice(0, 16).replace('T', ' ') : '');
export const deviceOf = (req) => (/Mobi|Android|iPhone|iPad|iPod/i.test(req.headers['user-agent'] ?? '') ? 'm' : 'd');

// the browser sends location.pathname of an /aip (or /aip3) page; stored without the prefix
const VIEW_PATH = /^\/aip3?(?:\/[A-Za-z0-9._~%-]+)*\/?$/;
export const cleanViewPath = (p) => (typeof p === 'string' && p.length <= 120 && VIEW_PATH.test(p) && !p.includes('..') ? p.replace(/^\/aip3?/, '') || '/' : null);

// CSV cell: always quoted; a leading = @ tab CR (or +/- that is not a phone number) gets a ' so a spreadsheet never runs it as a formula
export function csvCell(v) {
  let s = v === null || v === undefined ? '' : String(v);
  if (/^[=@\t\r]/.test(s) || (/^[+-]/.test(s) && !/^[+-][\d\s()-]*$/.test(s))) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
}
const csv = (head, rows) => '﻿' + [head, ...rows].map((r) => r.map(csvCell).join(',')).join('\r\n') + '\r\n';

const NOT_FOUND = (css) => `<!doctype html><html lang="uz"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Yopiq</title><link rel="stylesheet" href="${css}"><body class="plain"><p>Topilmadi.</p></body></html>`;
const LOGIN = (css, action, msg) => `<!doctype html><html lang="uz"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Statistika</title><link rel="stylesheet" href="${css}"><body class="plain"><form method="post" action="${esc(action)}" class="login"><h1>Statistika</h1>${msg ? `<p class="err">${esc(msg)}</p>` : ''}<label for="k">Kalit</label><input id="k" name="key" type="password" autocomplete="current-password" required autofocus maxlength="200"><button type="submit">Kirish</button></form></body></html>`;

// deps: json/readJson/onlyKeys/fail/needOrigin from index.js. cfg.statsPath is the page's public path, e.g. /aip/stats (the fork: /aip3/stats).
export function createStats({ db, cfg, content, readJson, onlyKeys, fail, needOrigin }) {
  const now = () => (cfg.now ?? Date.now)();
  const sp = cfg.statsPath, cssUrl = sp + '/stats.css';
  const cookie = 'aip_stats';
  const enabled = !!cfg.statsKey;                         // STATS_KEY empty: the whole dashboard is off (404)
  const keyHash = enabled ? sha(cfg.statsKey) : '';
  const keyFail = auth.windowLimiter(10, 600e3);          // failed key attempts per client (IPv6 by /64), like the student login
  const beaconLimit = auth.windowLimiter(20, 60e3);      // view beacons per STUDENT per minute (5 sessions share it)
  const failLog = auth.windowLimiter(60, 60e3);          // failed-login rows per minute, overall: an attacker cannot fill the table
  const adminFailLog = auth.windowLimiter(60, 60e3);     // its own bucket: login_fail floods must not hide key guessing
  const errLog = auth.windowLimiter(60, 60e3);           // 5xx rows per minute, overall
  const lastView = new Map();                            // student -> {p, t}: the same page again within 3 s is not a new view
  const ins = db.prepare('INSERT INTO events (ts, student_id, type, path, ref, device) VALUES (?, ?, ?, ?, ?, ?)');
  const sessionToken = (req) => auth.parseCookies(req.headers.cookie)[auth.cookieName(cfg.production)];
  const studentOf = (req) => auth.sessionStudent(db, sessionToken(req), now());

  function log(type, req, { sid = null, path: p = null, ref = null } = {}) {
    try { ins.run(now(), sid, type, p && String(p).slice(0, 120), ref === null ? null : String(ref).slice(0, 120), deviceOf(req)); }
    catch (e) { console.error('stats: log failed:', e.message); }   // analytics never breaks a request
  }

  // ---- retention
  let swept = 0;
  function sweep(force = false) {
    const t = now();
    if (!force && t - swept < DAY) return;
    swept = t;
    keyFail.prune();
    if (lastView.size > 5000) lastView.clear();
    db.prepare('DELETE FROM events WHERE ts < ?').run(t - KEEP_DAYS * DAY);
    db.prepare('DELETE FROM stats_tokens WHERE expires_at < ?').run(t);
  }
  sweep(true);

  // ---- admin session (made by POST /stats/login)
  const tokenHash = (tok) => sha(keyHash + tok);   // bound to the key: a new STATS_KEY makes every old cookie useless
  function openSession() {
    const tok = randomBytes(32).toString('base64url');
    db.prepare('INSERT INTO stats_tokens (token_hash, expires_at) VALUES (?, ?)').run(tokenHash(tok), now() + ADMIN_MS);
    return `${cookie}=${tok}; Path=${sp}; HttpOnly; SameSite=Strict; Max-Age=${ADMIN_MS / 1000}${cfg.production ? '; Secure' : ''}`;
  }
  const dropAdmin = (req) => { const tok = auth.parseCookies(req.headers.cookie)[cookie]; if (tok) db.prepare('DELETE FROM stats_tokens WHERE token_hash = ?').run(tokenHash(tok)); };
  const keyOk = (typed) => typeof typed === 'string' && timingSafeEqual(Buffer.from(sha(typed)), Buffer.from(keyHash));   // both sides hashed: equal length, constant time
  async function readForm(req, max = 1024) {
    if (!/^application[/]x-www-form-urlencoded(;|$)/i.test(req.headers['content-type'] ?? '')) throw fail(415, 'unsupported_media_type', 'Content-Type must be application/x-www-form-urlencoded');
    let size = 0; const chunks = [];
    for await (const c of req) { size += c.length; if (size > max) throw fail(413, 'too_large', 'Request body too large'); chunks.push(c); }
    return new URLSearchParams(Buffer.concat(chunks).toString('utf8'));
  }
  const isAdmin = (req) => {
    const tok = auth.parseCookies(req.headers.cookie)[cookie];
    return !!tok && tok.length <= 100 && !!db.prepare('SELECT 1 FROM stats_tokens WHERE token_hash = ? AND expires_at > ?').get(tokenHash(tok), now());
  };

  // ---- numbers
  const one = (sql, ...a) => db.prepare(sql).get(...a);
  const todayStart = () => dayOf(now()) * DAY - TZ;
  function kpis() {
    const t0 = todayStart(), w7 = t0 - 6 * DAY, w30 = t0 - 29 * DAY;
    const act = (since) => one('SELECT COUNT(DISTINCT student_id) AS c FROM events WHERE ts >= ? AND student_id IS NOT NULL', since).c;
    const cnt = (type, since) => one('SELECT COUNT(*) AS c FROM events WHERE type = ? AND ts >= ?', type, since).c;
    return { students: one('SELECT COUNT(*) AS c FROM students WHERE active = 1').c, active1: act(t0), active7: act(w7), active30: act(w30),
      views1: cnt('view', t0), views7: cnt('view', w7), logins1: cnt('login_ok', t0), downloads1: cnt('download', t0), fails1: cnt('login_fail', t0), errs7: cnt('err', w7) };
  }

  const SORTS = { id: (r) => r.id, name: (r) => r.name.toLowerCase(), grp: (r) => r.grp ?? '', last: (r) => r.last ?? 0, days: (r) => r.days, views: (r) => r.views, prompts: (r) => r.prompts, dl: (r) => r.dl };
  function studentRows(since, sort, dir) {
    const ev = new Map(db.prepare(`SELECT student_id, COUNT(DISTINCT (ts + ${TZ}) / ${DAY}) AS days, SUM(type = 'view') AS views, SUM(type = 'download') AS dl
      FROM events WHERE ts >= ? AND student_id IS NOT NULL GROUP BY student_id`).all(since).map((r) => [r.student_id, r]));
    const last = new Map(db.prepare('SELECT student_id, MAX(ts) AS t FROM events WHERE student_id IS NOT NULL GROUP BY student_id').all().map((r) => [r.student_id, r.t]));
    const pr = new Map(db.prepare("SELECT student_id, COUNT(*) AS c FROM progress WHERE key LIKE 'p:%' GROUP BY student_id").all().map((r) => [r.student_id, r.c]));
    const rows = db.prepare('SELECT id, full_name, phone, grp FROM students WHERE active = 1').all().map((s) => {
      const e = ev.get(s.id);
      return { id: s.id, name: s.full_name, phone: s.phone, grp: s.grp, last: last.get(s.id) ?? null, days: e?.days ?? 0, views: e?.views ?? 0, dl: e?.dl ?? 0, prompts: pr.get(s.id) ?? 0 };
    });
    const key = SORTS[pick(SORTS, sort, 'last')], sign = dir === 'asc' ? 1 : -1;
    return rows.sort((a, b) => { const x = key(a), y = key(b); return (x < y ? -1 : x > y ? 1 : 0) * sign || a.id.localeCompare(b.id); });
  }

  function lessonRows(since) {
    const open = new Map(db.prepare("SELECT ref, COUNT(*) AS c, COUNT(DISTINCT student_id) AS u FROM events WHERE type = 'lesson' AND ts >= ? GROUP BY ref").all(since).map((r) => [r.ref, r]));
    const files = new Map();
    for (const r of db.prepare("SELECT ref, COUNT(*) AS c FROM events WHERE type = 'download' AND ts >= ? GROUP BY ref").all(since)) { const n = /^(\d+)\//.exec(r.ref ?? '')?.[1]; if (n) files.set(n, (files.get(n) ?? 0) + r.c); }
    const prog = new Map();   // lesson -> {prompts, am, v}
    const bump = (n, k, c) => { const o = prog.get(n) ?? { prompts: 0, am: 0, v: 0 }; o[k] += c; prog.set(n, o); };
    for (const r of db.prepare("SELECT key, COUNT(*) AS c FROM progress p JOIN students s ON s.id = p.student_id AND s.active = 1 WHERE key LIKE 'p:l%' OR key LIKE 'f:%' GROUP BY key").all()) {
      let m;
      if ((m = /^p:l(\d+):/.exec(r.key))) bump(m[1], 'prompts', r.c);
      else if ((m = /^f:am(\d+)$/.exec(r.key))) bump(m[1], 'am', r.c);
      else if ((m = /^f:v(\d+)$/.exec(r.key))) bump(m[1], 'v', r.c);
    }
    return content.lessonNumbers().filter((n) => n > 0).map((n) => {
      let title = '';
      try { const v = content.lessonView(n, 'uz', null); title = `${v.num ?? n}. ${v.title}`; } catch { title = String(n); }
      const o = open.get(String(n)), p = prog.get(String(n));
      return { title, opens: o?.c ?? 0, uniq: o?.u ?? 0, prompts: p?.prompts ?? 0, files: files.get(String(n)) ?? 0, am: p?.am ?? 0, v: p?.v ?? 0 };
    });
  }

  function daily(since) {
    const today = dayOf(now());
    const min = one('SELECT MIN(ts) AS t FROM events').t;
    let first = since ? dayOf(since) : min ? dayOf(min) : today;
    first = Math.max(first, today - 119);
    const m = new Map(db.prepare(`SELECT (ts + ${TZ}) / ${DAY} AS d, SUM(type = 'view') AS v, COUNT(DISTINCT student_id) AS a FROM events WHERE ts >= ? GROUP BY d`).all(first * DAY - TZ).map((r) => [r.d, r]));
    const out = [];
    for (let d = first; d <= today; d++) out.push({ day: dayStr(d), v: m.get(d)?.v ?? 0, a: m.get(d)?.a ?? 0 });
    return out;
  }

  // ---- HTML
  const chart = (days) => {
    const W = 720, H = 190, L = 34, B = 22, T = 8, n = days.length, max = Math.max(1, ...days.flatMap((d) => [d.v, d.a]));
    const sw = (W - L) / n, bw = Math.max(1.5, sw * 0.38), y = (v) => T + (H - T - B) * (1 - v / max), step = Math.ceil(n / 8);
    const bars = days.map((d, i) => {
      const x = L + i * sw + sw * 0.1, tip = `<title>${esc(d.day)}: ${d.v} koʻrish, ${d.a} faol talaba</title>`;
      return `<g>${tip}<rect class="bv" x="${x.toFixed(1)}" y="${y(d.v).toFixed(1)}" width="${bw.toFixed(1)}" height="${(H - B - y(d.v)).toFixed(1)}"/><rect class="ba" x="${(x + bw + 1).toFixed(1)}" y="${y(d.a).toFixed(1)}" width="${bw.toFixed(1)}" height="${(H - B - y(d.a)).toFixed(1)}"/></g>`
        + (i % step === 0 ? `<text class="t" x="${(x + bw).toFixed(1)}" y="${H - 6}" text-anchor="middle">${esc(d.day.slice(5))}</text>` : '');
    }).join('');
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Kunlik koʻrishlar va faol talabalar"><line class="ax" x1="${L}" y1="${H - B}" x2="${W}" y2="${H - B}"/><text class="t" x="${L - 4}" y="${T + 8}" text-anchor="end">${max}</text><text class="t" x="${L - 4}" y="${H - B}" text-anchor="end">0</text>${bars}</svg>`;
  };
  const kpi = (label, v) => `<div class="kpi"><b>${v}</b><span>${esc(label)}</span></div>`;
  const table = (head, rows) => `<div class="tw"><table><thead><tr>${head.join('')}</tr></thead><tbody>${rows.join('') || `<tr><td colspan="${head.length}" class="muted">Hozircha maʼlumot yoʻq</td></tr>`}</tbody></table></div>`;
  const tr = (cells) => `<tr>${cells.map((c) => (c && typeof c === 'object' ? `<td class="${c.cls ?? ''}">${c.html}</td>` : `<td>${esc(c)}</td>`)).join('')}</tr>`;

  const RANGES = { 7: 7, 30: 30, all: 0 };
  const pick = (map, v, dflt) => (typeof v === 'string' && Object.hasOwn(map, v) ? v : dflt);
  const EVENT_PAGE = 200;
  function page(url) {
    const range = pick(RANGES, url.searchParams.get('range'), '7');
    const since = RANGES[range] ? todayStart() - (RANGES[range] - 1) * DAY : 0;
    const sort = pick(SORTS, url.searchParams.get('sort'), 'last');
    const dir = url.searchParams.get('dir') === 'asc' ? 'asc' : 'desc';
    const pg = Math.min(Math.max(parseInt(url.searchParams.get('page'), 10) || 0, 0), 1e5);
    const href = (o) => { const q = new URLSearchParams({ range, sort, dir, ...o }); return `${sp}?${q}`; };
    const k = kpis();
    const th = (key, label) => `<th><a href="${esc(href({ sort: key, dir: sort === key && dir === 'desc' ? 'asc' : 'desc', page: 0 }))}">${esc(label)}${sort === key ? (dir === 'asc' ? ' ▲' : ' ▼') : ''}</a></th>`;
    const students = studentRows(since, sort, dir);
    const lessons = lessonRows(since);
    const files = db.prepare("SELECT ref, COUNT(*) AS c, COUNT(DISTINCT student_id) AS u FROM events WHERE type = 'download' AND ts >= ? GROUP BY ref ORDER BY c DESC, ref LIMIT 15").all(since);
    const dev = Object.fromEntries(db.prepare("SELECT device, COUNT(*) AS c FROM events WHERE type = 'view' AND ts >= ? GROUP BY device").all(since).map((r) => [r.device, r.c]));
    const dm = dev.m ?? 0, dd = dev.d ?? 0, dt = dm + dd, pct = (x) => (dt ? Math.round((x * 100) / dt) : 0);
    const total = one('SELECT COUNT(*) AS c FROM events').c;
    const events = db.prepare('SELECT e.ts, e.student_id, e.type, e.path, e.ref, e.device, s.full_name FROM events e LEFT JOIN students s ON s.id = e.student_id ORDER BY e.ts DESC, e.id DESC LIMIT ? OFFSET ?').all(EVENT_PAGE, pg * EVENT_PAGE);
    const nav = Object.keys(RANGES).map((r) => `<a href="${esc(href({ range: r, page: 0 }))}"${r === range ? ' class="on"' : ''}>${r === 'all' ? 'Hammasi' : `${r} kun`}</a>`).join('');
    return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>AI Praktikum 3.0 - statistika</title><link rel="stylesheet" href="${cssUrl}"></head><body>
<header><h1>AI Praktikum 3.0 - statistika</h1><nav class="range">${nav}<form method="post" action="${sp}/logout" class="out"><button type="submit">Chiqish</button></form></nav></header>
<section class="kpis">${kpi('Talabalar (faol hisob)', k.students)}${kpi('Bugun faol', k.active1)}${kpi('7 kunda faol', k.active7)}${kpi('30 kunda faol', k.active30)}${kpi('Koʻrishlar bugun', k.views1)}${kpi('Koʻrishlar 7 kunda', k.views7)}${kpi('Kirishlar bugun', k.logins1)}${kpi('Yuklashlar bugun', k.downloads1)}${kpi('Xato kirishlar bugun', k.fails1)}${kpi('Server xatolari 7 kunda', k.errs7)}</section>
<section><h2>Kunlik faollik <small>(Toshkent vaqti)</small></h2><p class="legend"><i class="bv"></i> Koʻrishlar <i class="ba"></i> Faol talabalar</p>${chart(daily(since))}</section>
<section><h2>Darslar</h2>${table(['Dars', 'Ochilgan', 'Talabalar', 'Prompt nusxalari', 'Fayllar', 'Amaliyot', 'Vazifa'].map((x) => `<th>${x}</th>`), lessons.map((l) => tr([l.title, l.opens, l.uniq, l.prompts, l.files, l.am, l.v])))}<p class="muted">Ochilgan, Talabalar, Fayllar: tanlangan davr. Prompt nusxalari, Amaliyot, Vazifa: jami (belgilar).</p></section>
<section><h2>Talabalar <small>${students.length} ta</small> <a class="dl" href="${esc(`${sp}/students.csv?range=${range}`)}">CSV</a></h2>${table([th('id', 'ID'), th('name', 'Ism'), '<th>Telefon</th>', th('grp', 'Guruh'), th('last', 'Oxirgi faollik'), th('days', 'Faol kunlar'), th('views', 'Koʻrishlar'), th('prompts', 'Promptlar'), th('dl', 'Yuklashlar')],
      students.map((s) => tr([{ html: esc(s.id), cls: 'mono' }, s.name, s.phone ?? '', s.grp ?? '', when(s.last), s.days, s.views, s.prompts, s.dl])))}</section>
<section class="two"><div><h2>Eng koʻp yuklangan fayllar</h2>${table(['Fayl', 'Marta', 'Talabalar'].map((x) => `<th>${x}</th>`), files.map((f) => tr([{ html: esc(f.ref), cls: 'mono' }, f.c, f.u])))}</div>
<div><h2>Qurilmalar <small>(koʻrishlar)</small></h2><meter min="0" max="100" value="${pct(dm)}"></meter><p>Telefon: <b>${pct(dm)}%</b> (${dm}) &nbsp; Kompyuter: <b>${pct(dd)}%</b> (${dd})</p></div></section>
<section><h2>Soʻnggi hodisalar <small>${total} ta jami</small> <a class="dl" href="${esc(`${sp}/events.csv?range=${range}`)}">CSV</a></h2>${table(['Vaqt', 'Talaba', 'Turi', 'Yoʻl / maʼlumot', 'Q'].map((x) => `<th>${x}</th>`),
      events.map((e) => tr([when(e.ts), { html: e.student_id ? `${esc(e.full_name ?? '')} <span class="mono muted">${esc(e.student_id)}</span>` : '' }, e.type, [e.path, e.ref].filter(Boolean).join(' '), e.device ?? ''])))}
<p class="pager">${pg > 0 ? `<a href="${esc(href({ page: pg - 1 }))}">&lt; Yangiroq</a>` : '<span></span>'}<span>${pg + 1}-sahifa</span>${(pg + 1) * EVENT_PAGE < total ? `<a href="${esc(href({ page: pg + 1 }))}">Eskiroq &gt;</a>` : '<span></span>'}</p></section>
</body></html>`;
  }

  // ---- HTTP
  const noStore = { 'Cache-Control': 'no-store', 'Referrer-Policy': 'same-origin' };   // not no-referrer: with it, browsers post the login form with Origin: null and the Origin check refuses it
  const html = (res, status, body, extra = {}) => { res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': Buffer.byteLength(body), ...noStore, ...extra }); res.end(body); };

  // true = answered, false = not ours (the caller carries on)
  async function handle(req, res, url) {
    const p = url.pathname;
    if (/^\/api\/aip3?\/ev$/.test(p)) {
      if (req.method !== 'POST') throw fail(405, 'method_not_allowed', 'Method not allowed');
      res.setHeader('Cache-Control', 'no-store');
      const s = studentOf(req);
      if (!s) throw fail(401, 'unauthorized', 'Not logged in');
      needOrigin(req);
      const wait = beaconLimit.hit(s.id);
      if (wait) throw fail(429, 'rate_limited', 'Too many events', { retryAfter: wait });
      const body = await readJson(req, 256);
      onlyKeys(body, ['p']);
      const v = cleanViewPath(body.p);
      if (v === null) throw fail(400, 'bad_path', 'p must be an /aip route path');
      const prev = lastView.get(s.id), t = now();
      lastView.set(s.id, { p: v, t });
      if (!(prev && prev.p === v && t - prev.t < 3000)) log('view', req, { sid: s.id, path: v });
      res.writeHead(204); res.end();
      return true;
    }
    if (p !== sp && !p.startsWith(sp + '/')) return false;
    if (!enabled) return html(res, 404, NOT_FOUND(cssUrl)), true;
    if (p === sp + '/login' && req.method === 'POST') {
      needOrigin(req);
      const key = auth.ipKey(auth.clientIp(req, cfg.trust));
      const typed = (await readForm(req)).get('key');   // the limit is checked after the await: parallel slow bodies cannot all pass it
      const wait = keyFail.wait(key);
      if (wait) return html(res, 429, LOGIN(cssUrl, sp + '/login', 'Juda koʻp urinish. Keyinroq qayta urinib koʻring.'), { 'Retry-After': wait }), true;
      if (!keyOk(typed)) {
        keyFail.add(key);
        if (!adminFailLog.hit('all')) log('admin_fail', req);   // the event only, never what was typed
        return html(res, 401, LOGIN(cssUrl, sp + '/login', 'Kalit notoʻgʻri.')), true;
      }
      res.writeHead(303, { Location: sp, 'Set-Cookie': openSession(), ...noStore }); res.end();
      return true;
    }
    if (p === sp + '/logout' && req.method === 'POST') {
      needOrigin(req); dropAdmin(req); res.writeHead(303, { Location: sp, 'Set-Cookie': `${cookie}=; Path=${sp}; HttpOnly; SameSite=Strict; Max-Age=0${cfg.production ? '; Secure' : ''}`, ...noStore }); res.end(); return true;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') return false;
    const css = { 'Content-Type': 'text/css; charset=utf-8', 'Content-Length': CSS.length, 'Cache-Control': 'public, max-age=300' };
    if (p === cssUrl) { res.writeHead(200, css); res.end(CSS); return true; }
    if (!isAdmin(req)) return p === sp ? (html(res, 200, LOGIN(cssUrl, sp + '/login')), true) : (html(res, 404, NOT_FOUND(cssUrl)), true);
    // a script on any page (fetch, XHR) cannot read student data: only a browser navigation or a download may
    const mode = req.headers['sec-fetch-mode'];
    if (mode && mode !== 'navigate') return html(res, 404, NOT_FOUND(cssUrl)), true;
    if (p === sp) return html(res, 200, page(url)), true;
    const range = pick(RANGES, url.searchParams.get('range'), '7');
    const since = RANGES[range] ? todayStart() - (RANGES[range] - 1) * DAY : 0;
    const csvOut = (name, body) => { res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="${name}"`, ...noStore }); res.end(body); return true; };
    if (p === sp + '/students.csv') {
      return csvOut('talabalar.csv', csv(['id', 'ism', 'telefon', 'guruh', 'oxirgi_faollik', 'faol_kunlar', 'koʻrishlar', 'promptlar', 'yuklashlar'],
        studentRows(since, 'last', 'desc').map((s) => [s.id, s.name, s.phone, s.grp, when(s.last), s.days, s.views, s.prompts, s.dl])));
    }
    if (p === sp + '/events.csv') {
      const rows = db.prepare('SELECT ts, student_id, type, path, ref, device FROM events WHERE ts >= ? ORDER BY ts DESC, id DESC LIMIT 50000').all(since);   // ponytail: capped; 180 days of a few hundred students stays well under
      return csvOut('hodisalar.csv', csv(['vaqt', 'talaba', 'turi', 'yoʻl', 'maʼlumot', 'qurilma'], rows.map((r) => [when(r.ts), r.student_id, r.type, r.path, r.ref, r.device])));
    }
    return false;
  }

  // ---- response watcher: one place that turns finished API responses into events (login, logout, lesson, download, 5xx)
  const API = /^\/api\/aip3?\/(login|logout|lesson\/(\d+)|lesson\/(\d+)\/doc\/([a-z0-9-]{1,80})|prep\/pdf)$/;
  function watch(req, res, url) {
    const p = url.pathname, m = API.exec(p), kind = m?.[1].split('/')[0];
    const who = kind === 'logout' ? studentOf(req)?.id ?? null : undefined;   // the session is gone once the response is out
    res.once('finish', () => {
      const st = res.statusCode;
      if (st >= 500) return errLog.hit('all') ? undefined : log('err', req, { sid: studentOf(req)?.id ?? null, path: p, ref: st });
      if (!m) return;
      if (kind === 'login' && req.method === 'POST') {
        if (st === 200 && req.sid) log('login_ok', req, { sid: req.sid });
        else if (st !== 200 && !failLog.hit('all')) log('login_fail', req, { ref: st });   // the status only: a typed ID may be someone's real ID
      } else if (kind === 'logout' && req.method === 'POST' && st === 200) log('logout', req, { sid: who });
      else if (req.method === 'GET' && (st === 200 || (st === 206 && /^bytes=0-/.test(req.headers.range ?? '')))) {
        const sid = studentOf(req)?.id ?? null;
        if (kind === 'lesson' && m[2] && st === 200) log('lesson', req, { sid, ref: m[2] });
        else if (m[4]) log('download', req, { sid, ref: `${m[3]}/${m[4]}` });
        else if (kind === 'prep') log('download', req, { sid, ref: 'prep/pdf' });
      }
    });
  }

  return { enabled, log, handle, watch, sweep, kpis, isAdmin };
}
