// Login helpers: ID normalising, sessions (hash only), cookies, rate limits, client address, origin check.
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

const SESSION_MS = 24 * 3600 * 1000;
const MAX_SESSIONS = 5; // per student; the oldest are dropped
export const COOKIE_PROD = '__Host-aip_session';
export const COOKIE_DEV = 'aip_session'; // browsers reject a __Host- cookie without Secure, so dev (http) uses a plain name

export const cookieName = (prod) => (prod ? COOKIE_PROD : COOKIE_DEV);

// "aip-k3m9xz", "AIP K3M9XZ", "k3m9xz" -> candidate ids to try, in order
export function idCandidates(raw) {
  const s = String(raw ?? '').replace(/\s+/g, '').toUpperCase();   // "AIP-3E7 KFB": spaces anywhere are dropped (load test, 2026-10-31)
  if (!s || s.length > 24 || !/^[A-Z0-9 _-]+$/.test(s)) return [];
  const m = /^AIP[-_ ]*(.*)$/.exec(s);
  if (m) return m[1] ? [...new Set([`AIP-${m[1]}`, s, m[1]])] : [];
  return [s, `AIP-${s}`];
}

// 0 1 I L O are not in the ID alphabet (db.js ID_ALPHABET): an ID typed with one of them can never match, so the login answers
// bad_id with a hint and does not count it as a failed attempt (a classroom on one Wi-Fi must not lock itself out over look-alikes)
export function lookalike(raw) {
  const s = String(raw ?? '').replace(/\s+/g, '').toUpperCase(), m = /^AIP[-_]*(.*)$/.exec(s);
  const b = m ? m[1] : s;
  return b.length === 6 && /[01ILO]/.test(b);   // the 6 characters of a real ID; short hand-made ones (XM) are left alone
}

const sha = (t) => createHash('sha256').update(t).digest('hex');

export function createSession(db, studentId, now = Date.now()) {
  const token = randomBytes(32).toString('base64url');
  db.prepare('INSERT INTO sessions (token_hash, student_id, created_at, expires_at) VALUES (?, ?, ?, ?)').run(sha(token), studentId, now, now + SESSION_MS);
  db.prepare(`DELETE FROM sessions WHERE student_id = ? AND token_hash NOT IN
              (SELECT token_hash FROM sessions WHERE student_id = ? ORDER BY created_at DESC, rowid DESC LIMIT ${MAX_SESSIONS})`).run(studentId, studentId);
  return token;
}

export const purgeSessions = (db, now = Date.now()) => db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(now);

export function sessionStudent(db, token, now = Date.now()) {
  if (!token || token.length > 100) return null;
  return db.prepare(`SELECT s.* FROM sessions x JOIN students s ON s.id = x.student_id
                     WHERE x.token_hash = ? AND x.expires_at > ? AND s.active = 1`).get(sha(token), now) ?? null;
}

export const dropSession = (db, token) => token && db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(sha(token));

export function parseCookies(header = '') {
  const out = {};
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  return out;
}

export function sessionCookie(token, prod) {
  const base = `${cookieName(prod)}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${token ? SESSION_MS / 1000 : 0}`;
  return prod ? `${base}; Secure` : base;
}

// ---- rate limits (in memory, one process)
// Fixed window per key: {count, resetAt}. The map is hard-capped (oldest key evicted); pruning is the caller's timer, never per request.
export function windowLimiter(max, windowMs, cap = 10000) {
  const m = new Map();
  const cur = (k, now) => { const e = m.get(k); if (e && e.resetAt <= now) { m.delete(k); return undefined; } return e; };
  const wait = (k, now = Date.now()) => { const e = cur(k, now); return e && e.count >= max ? Math.ceil((e.resetAt - now) / 1000) : 0; };
  const add = (k, now = Date.now()) => {
    let e = cur(k, now);
    if (!e) { if (m.size >= cap) m.delete(m.keys().next().value); e = { count: 0, resetAt: now + windowMs }; m.set(k, e); }
    e.count++;
  };
  return { wait, add, hit: (k, now = Date.now()) => wait(k, now) || (add(k, now), 0), prune: (now = Date.now()) => { for (const [k, e] of m) if (e.resetAt <= now) m.delete(k); }, get size() { return m.size; } };
}

// Login guard: only FAILED attempts count per key (30 per 10 min: one classroom shares one IP). A global failure budget (300 per hour)
// does not lock anyone out; when it trips, every key is held to 1 attempt per minute until the hour ends,
// and onTrip fires (log + admin alert).
export function loginGuard({ maxFail = 30, failWindow = 600e3, budget = 300, budgetWindow = 3600e3, onTrip = () => {} } = {}) {
  const fails = windowLimiter(maxFail, failWindow);
  const slow = windowLimiter(1, 60e3);
  let g = { count: 0, resetAt: 0, tripped: false };
  const roll = (now) => { if (now >= g.resetAt) g = { count: 0, resetAt: now + budgetWindow, tripped: false }; };
  return {
    // seconds to wait, 0 = go. `wide` (optional, the IPv6 /48) shares the slow lane while tripped
    check(key, now = Date.now(), wide = null) {
      roll(now);
      const w = fails.wait(key, now);
      if (!g.tripped) return w;
      return Math.max(w, slow.hit(key, now), wide ? slow.hit(wide, now) : 0);
    },
    fail(key, now = Date.now()) {
      roll(now); fails.add(key, now); g.count++;
      if (g.count >= budget && !g.tripped) { g.tripped = true; onTrip(g.count); }
    },
    get tripped() { return g.tripped; },
    prune(now = Date.now()) { fails.prune(now); slow.prune(now); },
  };
}

// IPv6 clients get a whole /64 each; v4-mapped addresses count as v4
function v6prefix(ip, groups) {
  const s = String(ip).toLowerCase().split('%')[0];
  const v4 = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(s);
  if (v4) return { v4: v4[1] };
  if (!s.includes(':')) return { v4: s };
  const [h, t = ''] = s.split('::');
  const head = h ? h.split(':') : [], tail = t ? t.split(':') : [];
  const full = s.includes('::') ? [...head, ...Array(Math.max(0, 8 - head.length - tail.length)).fill('0'), ...tail] : head;
  return { v6: full.slice(0, groups).map((x) => x.padStart(4, '0')).join(':') + `::/${groups * 16}` };
}
export const ipKey = (ip) => { const p = v6prefix(ip, 4); return p.v4 ?? p.v6; };
// the wider /48 of an IPv6 client (null for IPv4): a tripped limiter also holds the whole /48 to the slow rate
export const ipKey48 = (ip) => v6prefix(ip, 3).v6 ?? null;

// trust = { hops: n proxies in front of us (client = n-th from the right of X-Forwarded-For), cf: trust CF-Connecting-IP }
let warnedXff = false;
export function clientIp(req, trust = {}) {
  if (trust.cf) { const c = String(req.headers['cf-connecting-ip'] ?? '').trim(); if (c) return c; }
  if (trust.hops > 0) {
    const xs = String(req.headers['x-forwarded-for'] ?? '').split(',').map((x) => x.trim()).filter(Boolean);
    if (xs.length) return xs[Math.max(0, xs.length - trust.hops)];
    if (!warnedXff) { warnedXff = true; console.warn('TRUST_PROXY is set but a request has no X-Forwarded-For: all such clients share the proxy address. Check the proxy hop count.'); }
  }
  return req.socket.remoteAddress ?? 'unknown';
}

// browsers always send Origin on POST/PUT; no Origin = a non-browser client (curl, tests)
export function originOk(req, portalUrl, hops) {
  const o = req.headers.origin;
  if (!o) return true;
  let host;
  try { host = new URL(o).host; } catch { return false; }
  const own = [req.headers.host, hops > 0 ? req.headers['x-forwarded-host'] : null].filter(Boolean);
  if (own.includes(host)) return true;
  try { return !!portalUrl && new URL(portalUrl).host === host; } catch { return false; }
}

// "Authorization: Bearer <key>" against the configured key: compares SHA-256 digests in constant time (no length leak)
export function bearerOk(header, key) {
  if (!key || typeof header !== 'string' || !header.startsWith('Bearer ')) return false;
  return timingSafeEqual(createHash('sha256').update(header.slice(7)).digest(), createHash('sha256').update(key).digest());
}
