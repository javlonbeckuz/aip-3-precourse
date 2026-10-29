// AI Praktikum 3.0 portal: one Node process, node:http, no dependencies. `node server/index.js`
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { openDb, getStudent, getStudentByPhone, createStudent, normPhone, studentRef, squash, fold, touchLogin, publicStudent, getProgress, putProgress, HttpError } from './db.js';
import * as auth from './auth.js';
import { createContent, parseTime, isoTashkent, LANGS } from './content.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function hops(v) {
  if (v === undefined || v === '') return 0;
  if (!/^\d+$/.test(String(v))) throw new Error(`TRUST_PROXY must be a non-negative integer, got "${v}"`);
  return Number(v);
}

export function loadConfig(env = process.env) {
  const production = env.NODE_ENV === 'production';
  const ids = (s) => new Set(String(s ?? '').split(',').map((x) => x.trim()).filter(Boolean));
  const cfg = {
    production,
    host: env.HOST || '0.0.0.0',
    port: Number(env.PORT) || 3000,
    dataDir: path.resolve(env.DATA_DIR || path.join(root, 'data')),
    contentDir: path.resolve(env.CONTENT_DIR || path.join(root, 'content')),
    publicDir: path.resolve(env.PUBLIC_DIR || path.join(root, 'public')),
    portalUrl: env.PORTAL_URL || '',
    trust: { hops: hops(env.TRUST_PROXY), cf: env.TRUST_CF === '1' },
    seedDemo: env.SEED_DEMO === '1', // fail closed: the demo account XM exists only when asked for
    botToken: env.BOT_TOKEN || '',
    adminIds: new Set([...ids(env.ADMIN_TG_IDS)].map(Number).filter(Number.isSafeInteger)),
    integrationKey: env.INTEGRATION_KEY || '', // CRM -> POST /api/int/students; unset = endpoint off (404)
    now: null,
  };
  if (cfg.integrationKey && cfg.integrationKey.length < 32) throw new Error('INTEGRATION_KEY must be at least 32 characters');
  if (env.NOW) {
    // a fake clock must never sit behind a public proxy or an https address
    if (/^https:/i.test(cfg.portalUrl) || cfg.trust.hops > 0 || cfg.trust.cf) throw new Error('NOW is set together with an https PORTAL_URL or a proxy setting: refusing to start');
    if (production || env.ALLOW_NOW !== '1') console.warn('NOW is ignored (needs ALLOW_NOW=1 and NODE_ENV other than production)');
    else {
      const t = parseTime(env.NOW);
      if (Number.isNaN(t)) throw new Error(`NOW is not a date: ${env.NOW}`);
      cfg.now = () => t;
    }
  }
  return cfg;
}

const CSP = "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; font-src 'self'; connect-src 'self'; frame-src 'self' blob:; manifest-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'";
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.pdf': 'application/pdf', '.csv': 'text/csv; charset=utf-8',
  '.zip': 'application/zip', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.wav': 'audio/wav', '.webmanifest': 'application/manifest+json',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation' };

export function createApp(cfg) {
  const db = openDb(cfg.dataDir, { seedDemo: cfg.seedDemo });
  const content = createContent({ dir: cfg.contentDir, now: cfg.now ?? Date.now });
  content.validateAll();
  let alert = null, announce = null;
  const guard = auth.loginGuard({ maxFail: cfg.loginMaxFail, budget: cfg.loginBudget, onTrip: (n) => {
    const msg = `AIP portal: ${n} failed logins within an hour. Login is now limited to 1 attempt per minute per client until the hour ends. Someone may be guessing IDs.`;
    console.error(`ALERT ${msg}`);
    try { alert?.(msg); } catch (e) { console.error('alert hook failed:', e.message); }
  } });
  const writeLimit = auth.windowLimiter(240, 60e3);
  const intLimit = auth.windowLimiter(300, 60e3); // authenticated CRM calls per IP
  const badKey = auth.windowLimiter(10, 600e3); // failed key attempts per IP
  const badKeyLog = auth.windowLimiter(3, 60e3);
  const CREATE_CAP = 100, createCap = auth.windowLimiter(CREATE_CAP, 3600e3);
  let capAlertAt = 0;
  const noticeEach = auth.windowLimiter(1, 24 * 3600e3); // repeat-payment notices: one per student a day, 20 an hour overall
  const noticeAll = auth.windowLimiter(20, 3600e3);
  const badReqAlert = auth.windowLimiter(1, 600e3);
  const raise = (msg) => { console.error(`ALERT ${msg}`); try { alert?.(msg); } catch (e) { console.error('alert hook failed:', e.message); } };
  const cookieKey = auth.cookieName(cfg.production);
  const timer = setInterval(() => { guard.prune(); writeLimit.prune(); intLimit.prune(); badKey.prune(); badKeyLog.prune(); createCap.prune(); noticeEach.prune(); noticeAll.prune(); badReqAlert.prune(); auth.purgeSessions(db); }, 600e3);
  timer.unref();

  // ---- helpers
  const json = (res, status, body, headers = {}) => {
    const s = JSON.stringify(body);
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(s), ...headers });
    res.end(s);
  };
  const fail = (status, code, message, extra) => new HttpError(status, code, message, extra);
  const needOrigin = (req) => { if (!auth.originOk(req, cfg.portalUrl, cfg.trust.hops)) throw fail(403, 'bad_origin', 'Origin not allowed'); };

  async function readJson(req, max = 2048) {
    if (Number(req.headers['content-length']) > max) throw fail(413, 'too_large', 'Request body too large');
    if (!/^application\/json\b/i.test(req.headers['content-type'] ?? '')) throw fail(415, 'unsupported_media_type', 'Content-Type must be application/json');
    let size = 0; const chunks = [];
    for await (const c of req) { size += c.length; if (size > max) throw fail(413, 'too_large', 'Request body too large'); chunks.push(c); }
    try { const b = JSON.parse(Buffer.concat(chunks).toString('utf8')); if (b && typeof b === 'object' && !Array.isArray(b)) return b; } catch { /* below */ }
    throw fail(400, 'bad_json', 'Body must be a JSON object');
  }
  const onlyKeys = (b, keys) => { for (const k of Object.keys(b)) if (!keys.includes(k)) throw fail(400, 'unknown_field', `Unknown field: ${k}`); };

  const token = (req) => auth.parseCookies(req.headers.cookie)[cookieKey];
  const needStudent = (req) => {
    const s = auth.sessionStudent(db, token(req));
    if (!s) throw fail(401, 'unauthorized', 'Not logged in');
    return s;
  };
  const langOf = (req, url) => {
    const q = url.searchParams.get('lang') ?? auth.parseCookies(req.headers.cookie).aip_lang;
    return LANGS.includes(q) ? q : 'uz';
  };
  // students.review = 1 (set by hand in the DB, see README) opens lesson 4 early
  const unlock4 = (s) => s.review === 1;

  function session(student, lang) {
    return { ok: true, lang, student: publicStudent(student), lessons: content.lessonsView(lang, student.grp, unlock4(student)),
      schedule: content.scheduleView(student.grp), live: content.live(student.grp), progress: getProgress(db, student.id) };
  }

  function lessonNo(m) {
    const n = Number(m);
    if (!content.lessonNumbers().includes(n)) throw fail(404, 'not_found', 'No such lesson');
    return n;
  }
  function gate(student, n, part) {
    if (!content.has(n)[part]) throw fail(404, 'not_found', 'No such content');
    if (content.partOpen(n, part, student.grp, unlock4(student))) return;
    throw fail(403, 'locked', 'This is not open yet', { opensAt: isoTashkent(content.opensAt(n, part, student.grp, unlock4(student))) });
  }

  // cache: Cache-Control for the file (default: inherit no-store). PDFs drop the page CSP (Chrome's viewer), all API files may be framed by the portal itself.
  function sendFile(req, res, abs, { type, name, cache }) {
    let st;
    try { st = fs.statSync(abs); } catch { throw fail(404, 'not_found', 'File not found'); }
    const ext = path.extname(name ?? abs.replace(/\.placeholder$/, '')).toLowerCase();
    const mime = type ?? MIME[ext] ?? 'application/octet-stream';
    const h = { 'Content-Type': mime, 'Accept-Ranges': 'bytes', 'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': mime === 'application/pdf' ? "frame-ancestors 'self'" : CSP.replace("frame-ancestors 'none'", "frame-ancestors 'self'") };
    if (cache) h['Cache-Control'] = cache;
    if (name) {
      const ascii = name.replace(/[^\x20-\x7e]|["\\]/g, '_');
      h['Content-Disposition'] = `${mime === 'application/pdf' ? 'inline' : 'attachment'}; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(name)}`;
    }
    let status = 200, from = 0, to = st.size - 1;
    const r = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '');
    if (r && (r[1] || r[2]) && st.size) {
      const f = r[1] ? Number(r[1]) : Math.max(0, st.size - Number(r[2]));
      const t = r[1] && r[2] ? Math.min(Number(r[2]), st.size - 1) : st.size - 1;
      if (f >= st.size) { res.writeHead(416, { 'Content-Range': `bytes */${st.size}` }); return res.end(); }
      if (f <= t && !(r[1] === '' && Number(r[2]) === 0)) { status = 206; from = f; to = t; h['Content-Range'] = `bytes ${from}-${to}/${st.size}`; } // a backwards range like 5-3 is ignored: full 200
    }
    h['Content-Length'] = st.size ? to - from + 1 : 0;
    res.writeHead(status, h);
    if (req.method === 'HEAD' || !st.size) return res.end();
    pipeline(fs.createReadStream(abs, { start: from, end: to }), res, () => {}); // closes the fd if the client goes away
  }

  const placeholderSlide = (i, total) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900"><rect width="1600" height="900" fill="#1b1b1b"/><text x="800" y="430" fill="#fff" font-family="sans-serif" font-size="96" text-anchor="middle">${i} / ${total}</text><text x="800" y="520" fill="#999" font-family="sans-serif" font-size="40" text-anchor="middle">PLACEHOLDER slide</text></svg>`;
  const MEDIA_CACHE = 'private, max-age=3600';

  async function createFromCrm(req, res) {
    const body = await readJson(req, 1024);
    onlyKeys(body, ['fullName', 'phone', 'group', 'mentor']);
    const v = (k) => (typeof body[k] === 'string' ? body[k] : '');
    if (!v('phone').trim()) throw fail(400, 'bad_phone', 'phone is required');
    const phone = normPhone(v('phone'));
    if (!phone) throw fail(400, 'bad_phone', 'Phone number is not valid');
    if (!squash(v('fullName'))) throw fail(400, 'bad_name', 'fullName is required');
    // the cap comes before the phone lookup: a spent cap answers the same for known and unknown phones (no registration oracle)
    const cw = createCap.wait('all');
    if (cw) {
      if (Date.now() - capAlertAt > 3600e3) {
        capAlertAt = Date.now();
        raise(`AIP portal: ${CREATE_CAP} new students were created through the CRM endpoint within an hour. Further requests are refused (429) until the hour ends. Check the CRM and INTEGRATION_KEY.`);
      }
      throw fail(429, 'rate_limited', 'Too many new students, try again later', { retryAfter: cw });
    }
    const fire = (st, note) => {
      const lost = () => console.warn(`integration: announce failed for ${studentRef(db, st.id)}`);
      if (!announce) console.warn(`integration: bot is off, ${studentRef(db, st.id)} was not announced`);
      else try { Promise.resolve(announce(st, note)).catch(lost); } catch { lost(); }
    };
    const have = getStudentByPhone(db, phone);
    if (have) {
      console.log('integration: phone already known'); // no ID
      // a repeat payment for a deactivated student, or under another name, is worth a human look; a plain retry stays silent
      const name = squash(v('fullName'));
      const differs = fold(name) !== fold(have.full_name);
      if ((!have.active || differs) && !noticeEach.wait(have.id) && !noticeAll.wait('all')) { // at most one notice per student a day, 20 an hour
        noticeEach.add(have.id); noticeAll.add('all');
        fire(have, { inactive: !have.active, crmName: differs ? name.slice(0, 80) : null });
      }
      return json(res, 200, { ok: true, created: false });
    }
    const st = createStudent(db, { fullName: v('fullName'), phone, grp: v('group').trim() || null, mentor: v('mentor'), createdBy: 0 }); // 0 = made by the CRM; clean() validates the rest
    createCap.add('all');
    console.log(`integration: created ${studentRef(db, st.id)}`); // a rowid, never an ID, phone or name
    fire(st, null);
    json(res, 201, { ok: true, created: true });
  }

  // ---- API routes: [method, regex, handler(req, res, url, match)]
  const routes = [
    ['POST', /^\/api\/aip\/login$/, async (req, res, url) => {
      needOrigin(req);
      const ip = auth.clientIp(req, cfg.trust);
      const body = await readJson(req);
      onlyKeys(body, ['id']);
      // From here to the response everything is synchronous, so check + fail are atomic: slow or parallel bodies cannot
      // pass the limiter together (the check must come AFTER the await above).
      const key = auth.ipKey(ip);
      const wait = guard.check(key, Date.now(), auth.ipKey48(ip));
      if (wait) throw fail(429, 'rate_limited', 'Too many attempts, try again later', { retryAfter: wait });
      const cands = auth.idCandidates(body.id);
      if (!cands.length) { guard.fail(key); throw fail(400, 'bad_id', 'Enter your ID'); }
      const s = cands.map((c) => getStudent(db, c)).find(Boolean);
      if (!s || !s.active) { guard.fail(key); throw fail(401, 'invalid_id', 'This ID is not valid. Ask your mentor.'); } // same answer for unknown and inactive
      touchLogin(db, s.id);
      const tok = auth.createSession(db, s.id);
      json(res, 200, session(getStudent(db, s.id), langOf(req, url)), { 'Set-Cookie': auth.sessionCookie(tok, cfg.production) });
    }],
    ['GET', /^\/api\/aip\/me$/, (req, res, url) => json(res, 200, session(needStudent(req), langOf(req, url)))],
    ['POST', /^\/api\/aip\/logout$/, (req, res) => {
      needOrigin(req);
      auth.dropSession(db, token(req));
      json(res, 200, { ok: true }, { 'Set-Cookie': auth.sessionCookie('', cfg.production) });
    }],
    ['GET', /^\/api\/aip\/lesson\/(\d+)$/, (req, res, url, m) => {
      const s = needStudent(req), n = lessonNo(m[1]);
      json(res, 200, { ok: true, lesson: content.lessonView(n, langOf(req, url), s.grp, unlock4(s)) });
    }],
    ['GET', /^\/api\/aip\/lesson\/(\d+)\/slide\/(\d+)$/, (req, res, url, m) => {
      const s = needStudent(req), n = lessonNo(m[1]), i = Number(m[2]);
      gate(s, n, 'slides');
      const total = content.lesson(n).slideCount;
      if (i < 1 || i > total) throw fail(404, 'not_found', 'No such slide');
      const f = content.slideFile(n, i);
      if (f) return sendFile(req, res, f.abs, { type: f.type, cache: MEDIA_CACHE });
      const svg = placeholderSlide(i, total);
      res.writeHead(200, { 'Content-Type': 'image/svg+xml', 'Content-Length': Buffer.byteLength(svg) });
      res.end(svg);
    }],
    ['GET|HEAD', /^\/api\/aip\/lesson\/(\d+)\/clip\/(\d+)$/, (req, res, url, m) => {
      const s = needStudent(req), n = lessonNo(m[1]), i = Number(m[2]);
      gate(s, n, 'slides');
      const q = url.searchParams.get('q') ?? '1080';
      if (!['1080', '2160'].includes(q)) throw fail(400, 'bad_quality', 'q must be 1080 or 2160');
      if (i < 1 || i > content.lesson(n).slideCount) throw fail(404, 'not_found', 'No such clip');
      const f = content.clipFile(n, i, q);
      if (!f) throw fail(404, 'not_found', 'No such clip');
      sendFile(req, res, f.abs, { type: f.type, cache: MEDIA_CACHE });
    }],
    ['GET', /^\/api\/aip\/lesson\/(\d+)\/doc\/([a-z0-9-]{1,80})$/, (req, res, url, m) => {
      const s = needStudent(req), n = lessonNo(m[1]);
      const part = content.docPart(n, m[2]);
      // unknown and locked slugs get the same 404, so a guesser cannot tell which file names exist (user, 2026-10-17)
      if (!part || !content.partOpen(n, part, s.grp, unlock4(s))) throw fail(404, 'not_found', 'No such file');
      const f = content.docFile(n, m[2]);
      if (!f) throw fail(404, 'not_found', 'No such file');
      sendFile(req, res, f.abs, { name: f.dl ?? f.name });
    }],
    ['GET', /^\/api\/aip\/lesson\/(\d+)\/book$/, (req, res, url, m) => {
      const s = needStudent(req), n = lessonNo(m[1]);
      gate(s, n, 'kitob');
      const f = content.bookFile(n, url.searchParams.get('v') || null);
      if (!f) throw fail(404, 'not_found', 'No such book');
      sendFile(req, res, f.abs, { name: f.name });
    }],
    ['GET', /^\/api\/aip\/prep\/pdf$/, (req, res, url) => {
      const s = needStudent(req);
      gate(s, 0, 'prep');
      const f = content.prepFile(langOf(req, url));
      if (!f) throw fail(404, 'not_found', 'No such file');
      sendFile(req, res, f.abs, { name: f.name });
    }],
    // CRM -> portal: the first payment is in, make the student (idempotent on the phone). Bearer key, no cookie, no Origin check.
    // Answers carry no ID, name or phone: the admins forward the ID, the CRM never needs it.
    ['POST', /^\/api\/int\/students$/, async (req, res) => {
      const ip = auth.ipKey(auth.clientIp(req, cfg.trust));
      if (!auth.bearerOk(req.headers.authorization, cfg.integrationKey)) {
        const wait = badKey.wait(ip); // only FAILED auths are counted, so a bad guesser cannot lock the real CRM out
        if (wait) throw fail(429, 'rate_limited', 'Too many requests', { retryAfter: wait });
        badKey.add(ip);
        if (!badKeyLog.hit(ip)) console.warn(`integration: bad key from ${ip}`); // never the header
        throw fail(401, 'unauthorized', 'Bad or missing key');
      }
      const wait = intLimit.hit(ip);
      if (wait) throw fail(429, 'rate_limited', 'Too many requests', { retryAfter: wait });
      try { return await createFromCrm(req, res); }
      catch (e) {
        // an authenticated request that fails validation may be a paid buyer who now has no ID: tell a human (once per 10 min, nothing echoed)
        if (e instanceof HttpError && e.status === 400 && !badReqAlert.hit('all')) raise(`AIP portal: the CRM sent a request that was refused (${e.code}). A student who paid may be missing. Check the CRM log and send the student again.`);
        throw e;
      }
    }],
    ['GET', /^\/api\/aip\/progress$/, (req, res) => json(res, 200, { ok: true, progress: getProgress(db, needStudent(req).id) })],
    ['PUT', /^\/api\/aip\/progress$/, async (req, res) => {
      const s = needStudent(req);
      needOrigin(req);
      const wait = writeLimit.hit(s.id);
      if (wait) throw fail(429, 'rate_limited', 'Too many updates', { retryAfter: wait });
      const body = await readJson(req, 256);
      onlyKeys(body, ['key', 'value']);
      putProgress(db, s.id, body.key, body.value);
      json(res, 200, { ok: true, progress: getProgress(db, s.id) });
    }],
  ];

  // ---- static files + SPA shell
  function serveStatic(req, res, pathname) {
    if (req.method !== 'GET' && req.method !== 'HEAD') throw fail(405, 'method_not_allowed', 'Method not allowed');
    let p;
    try { p = decodeURIComponent(pathname); } catch { throw fail(400, 'bad_request', 'Bad path'); }
    if (p === '/aip' || p === '/') { res.writeHead(p === '/' ? 302 : 301, { Location: '/aip/' }); return res.end(); } // the portal lives under /aip/
    const shell = () => ['aip/index.html', 'index.html'].map((f) => path.join(cfg.publicDir, f)).find((f) => fs.existsSync(f));
    const abs = path.resolve(cfg.publicDir, '.' + p);
    const inside = abs === cfg.publicDir || abs.startsWith(cfg.publicDir + path.sep);
    let file = null;
    if (inside && !p.split('/').some((s) => s.startsWith('.') || s.includes('\0'))) {
      try { const st = fs.statSync(abs); file = st.isDirectory() ? path.join(abs, 'index.html') : abs; } catch { /* maybe SPA */ }
      if (file && !fs.existsSync(file)) file = null;
    }
    if (!file && p.startsWith('/aip/') && !path.extname(p)) file = shell() ?? null;
    if (!file) throw fail(404, 'not_found', 'Not found');
    const st = fs.statSync(file), etag = `W/"${st.size}-${Math.floor(st.mtimeMs)}"`;
    const type = MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream';
    if (req.headers['if-none-match'] === etag) { res.writeHead(304, { ETag: etag }); return res.end(); }
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': st.size, ETag: etag, 'Cache-Control': 'no-cache' });
    if (req.method === 'HEAD') return res.end();
    pipeline(fs.createReadStream(file), res, () => {});
  }

  // headersTimeout/requestTimeout only bound how long a client may take to SEND its request; response streaming (clips) is not limited
  const server = http.createServer({ headersTimeout: 10e3, requestTimeout: 15e3 }, async (req, res) => {
    res.setHeader('Content-Security-Policy', CSP);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'same-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    if (cfg.production) res.setHeader('Strict-Transport-Security', 'max-age=31536000');
    try {
      const url = new URL(req.url, 'http://x');
      if (url.pathname === '/health') return json(res, 200, { ok: true }, { 'Cache-Control': 'no-store' });
      if (url.pathname.startsWith('/api/')) {
        res.setHeader('Cache-Control', 'no-store');
        if (url.pathname.startsWith('/api/int/') && !cfg.integrationKey) throw fail(404, 'not_found', 'No such endpoint'); // endpoint off: every method is 404
        let pathMatched = false;
        for (const [methods, re, fn] of routes) {
          const m = re.exec(url.pathname);
          if (!m) continue;
          pathMatched = true;
          if (methods.split('|').includes(req.method)) return await fn(req, res, url, m);
        }
        throw pathMatched ? fail(405, 'method_not_allowed', 'Method not allowed') : fail(404, 'not_found', 'No such endpoint');
      }
      serveStatic(req, res, url.pathname);
    } catch (e) {
      const known = e instanceof HttpError;
      if (!known) console.error('request failed:', req.method, req.url?.split('?')[0], e);
      if (res.headersSent) return res.destroy();
      const body = { error: { code: known ? e.code : 'server_error', message: known ? e.message : 'Something went wrong', ...(known ? e.extra : {}) } };
      const extra = { 'Cache-Control': 'no-store' };
      if (known && e.extra?.retryAfter) extra['Retry-After'] = e.extra.retryAfter;
      if (known && e.status === 413) extra.Connection = 'close'; // do not read the rest of an oversized body
      json(res, known ? e.status : 500, body, extra);
    }
  });
  server.maxConnections = 1000;

  let closed = false;
  const close = () => new Promise((resolve) => {
    if (closed) return resolve();
    closed = true;
    clearInterval(timer);
    server.close(() => { db.close(); resolve(); });
    server.closeIdleConnections();
    setTimeout(() => server.closeAllConnections(), 1000).unref(); // give running downloads a second, then cut
  });

  return { server, db, content, guard, close, setAlert: (fn) => { alert = fn; }, setAnnounce: (fn) => { announce = fn; } };
}

// the portal's hooks into the admin bot: security alerts, and new-student / repeat-payment announcements (note is forwarded as is)
export function wireBot(app, bot) {
  app.setAlert((text) => bot.notifyAdmins(text));
  app.setAnnounce((s, note) => bot.announce(s, note));
}

// ---- run
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const cfg = loadConfig();
  const app = createApp(cfg);
  app.server.listen(cfg.port, cfg.host, () => console.log(`AIP portal on ${cfg.host}:${cfg.port} (${cfg.production ? 'production' : 'dev'}) data=${cfg.dataDir} content=${cfg.contentDir}`));
  let bot = null;
  if (cfg.botToken) {
    const { startBot } = await import('./bot.js');
    bot = startBot({ cfg, db: app.db, content: app.content });
    wireBot(app, bot);
  } else console.log('BOT_TOKEN not set: admin bot disabled');
  const stop = () => { bot?.stop(); app.close().then(() => process.exit(0)); setTimeout(() => process.exit(0), 3000).unref(); };
  process.on('SIGTERM', stop); process.on('SIGINT', stop);
}
