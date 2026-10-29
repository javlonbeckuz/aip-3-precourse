import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
export const SP = 'C:/Users/User/AppData/Local/Temp/claude/C--Users-User-vs-code-HEAD-projects-praktikum3-precourse-platform/d552fe71-64f5-44b0-80fb-64ee4d82d435/scratchpad/gf';
const CH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
let port = 9800 + Math.floor(Math.random() * 300);
export async function launch(w, h, extra = []) {
  const dir = mkdtempSync(join(tmpdir(), 'gfcdp-'));
  const proc = spawn(CH, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${dir}`, `--window-size=${Math.max(w, 500)},${h}`, ...extra, 'about:blank'], { stdio: 'ignore' });
  let targets;
  for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch {} await new Promise(r => setTimeout(r, 200)); }
  const t = targets.find(x => x.type === 'page');
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));
  let id = 0; const pend = new Map(); const logs = [];
  ws.addEventListener('message', m => {
    const d = JSON.parse(m.data);
    if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); }
    else if (d.method === 'Runtime.exceptionThrown') logs.push('EXC ' + (d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text));
    else if (d.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(d.params.type)) logs.push(d.params.type + ' ' + d.params.args.map(a => a.value ?? a.description).join(' '));
    else if (d.method === 'Log.entryAdded' && ['error', 'warning'].includes(d.params.entry.level)) logs.push('log ' + d.params.entry.level + ' ' + d.params.entry.text + ' ' + (d.params.entry.url || ''));
  });
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
  const api = {
    logs, send,
    async goto(url, ms = 1800) { await send('Page.navigate', { url }); await new Promise(r => setTimeout(r, ms)); },
    async ev(expr) { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails.exception?.description || r.result.exceptionDetails)); return r.result.result.value; },
    async size(w, h, mobile = false) { await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile }); },
    async shot(name, clip) {
      const p = { format: 'png' };
      if (clip) { p.clip = { ...clip, scale: 1 }; p.captureBeyondViewport = true; }
      const r = await send('Page.captureScreenshot', p);
      writeFileSync(`${SP}/${name}.png`, Buffer.from(r.result.data, 'base64'));
    },
    async fullshot(name) { const H = await api.ev('document.documentElement.scrollHeight'); const W = await api.ev('document.documentElement.clientWidth'); await api.shot(name, { x: 0, y: 0, width: W, height: H }); },
    async wait(ms) { await new Promise(r => setTimeout(r, ms)); },
    async mouse(type, x, y) { await send('Input.dispatchMouseEvent', { type, x, y, button: type === 'mouseMoved' ? 'none' : 'left', clickCount: 1 }); },
    async key(key, code) { await send('Input.dispatchKeyEvent', { type: 'keyDown', key, code: code || key, windowsVirtualKeyCode: { Escape: 27, Enter: 13, Tab: 9 }[key] || 0 }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code: code || key }); },
    close() { try { ws.close(); } catch {} proc.kill(); setTimeout(() => { try { rmSync(dir, { recursive: true, force: true }); } catch {} }, 1500); },
  };
  return api;
}
