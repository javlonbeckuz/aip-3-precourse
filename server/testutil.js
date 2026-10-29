// Test helpers: an app on a random port with an in-memory DB, and a tiny fetch wrapper with a cookie jar.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createApp, loadConfig } from './index.js';
import { parseTime } from './content.js';

export const REAL_CONTENT = path.resolve(import.meta.dirname, '..', 'content');
export const at = (s) => parseTime(s);

// a temp copy of the content (or an empty temp dir); removed after the test
export function tmpCopy(t, dir = REAL_CONTENT) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'aip-'));
  if (dir) fs.cpSync(dir, d, { recursive: true });
  // tests assume the default gating; the live schedule may have its time lock switched off ("release" all "open")
  const sp = path.join(d, 'schedule.json');
  if (dir === REAL_CONTENT && fs.existsSync(sp)) {
    const sch = JSON.parse(fs.readFileSync(sp, 'utf8'));
    sch.release = {};
    sch.liveOverride = null;
    // the shipped schedule is "dates to follow" (null); the gating tests run on these fixed dates
    sch.groups = { shanba: ['2026-09-12T10:00', '2026-09-19T10:00', '2026-09-26T10:00', '2026-10-03T10:00'],
      yakshanba: ['2026-09-13T10:00', '2026-09-20T10:00', '2026-09-27T10:00', '2026-10-04T10:00'] };
    fs.writeFileSync(sp, JSON.stringify(sch));
  }
  t.after(() => fs.rmSync(d, { recursive: true, force: true }));
  return d;
}

// opts: { now: 'ISO' | null, production, contentDir, publicDir, env: {...}, cfg: {...overrides} }
export async function startApp(t, opts = {}) {
  const clock = { t: opts.now ? at(opts.now) : Date.now() };
  const cfg = loadConfig({ NODE_ENV: opts.production ? 'production' : 'development', DATA_DIR: ':memory:', SEED_DEMO: '1', CONTENT_DIR: opts.contentDir ?? tmpCopy(t),
    PUBLIC_DIR: opts.publicDir ?? '/nonexistent', ...opts.env });
  cfg.dataDir = ':memory:';
  cfg.now = () => clock.t;
  Object.assign(cfg, opts.cfg);
  const app = createApp(cfg);
  await new Promise((r) => app.server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${app.server.address().port}`;
  t.after(() => app.close());

  const client = () => {
    let cookie = '';
    const call = async (method, url, { body, headers = {}, raw } = {}) => {
      const res = await fetch(base + url, { method, redirect: 'manual', headers: { ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(cookie ? { Cookie: cookie } : {}), ...headers },
        body: body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body) });
      const sc = res.headers.get('set-cookie');
      if (sc) cookie = sc.startsWith(`${cfg.production ? '__Host-' : ''}aip_session=;`) || /Max-Age=0/.test(sc) ? '' : sc.split(';')[0];
      const buf = Buffer.from(await res.arrayBuffer());
      const text = buf.toString('utf8');
      let json = null;
      if (!raw && (res.headers.get('content-type') ?? '').includes('json')) json = JSON.parse(text);
      return { status: res.status, headers: res.headers, text, buf, json, setCookie: sc };
    };
    return { get: (u, o) => call('GET', u, o), post: (u, body, o) => call('POST', u, { body, ...o }), put: (u, body, o) => call('PUT', u, { body, ...o }), call, get cookie() { return cookie; } };
  };
  const login = async (id = 'XM') => { const c = client(); const r = await c.post('/api/aip/login', { id }); if (r.status !== 200) throw new Error(`login ${id}: ${r.text}`); c.session = r.json; return c; };
  return { app, cfg, clock, base, client, login, db: app.db };
}
