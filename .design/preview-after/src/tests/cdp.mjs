// usage: node cdp.mjs <wrapperUrl> <outPng> [waitMs]
// Launches headless Chrome, loads a wrapper page with an iframe, attaches to every target (OOPIF too),
// logs console/exceptions/failed requests, then reports the iframe document's state and screenshots.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url, out, waitArg] = process.argv.slice(2);
const wait = +(waitArg || 6000);
const port = 9333 + Math.floor(Math.random() * 500);
const prof = mkdtempSync(join(tmpdir(), 'cdp-'));
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`,
  `--user-data-dir=${prof}`, '--allow-file-access-from-files', '--window-size=600,2600', 'about:blank'], { stdio: 'ignore' });

const sleep = ms => new Promise(r => setTimeout(r, ms));
let ver;
for (let i = 0; i < 50 && !ver; i++) { try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch { await sleep(200); } }
const ws = new WebSocket(ver.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pending = new Map();
const send = (method, params = {}, sessionId) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });
const log = []; let iframeSid = null;
ws.onmessage = ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result ?? { error: m.error }); pending.delete(m.id); return; }
  const s = m.sessionId ? m.sessionId.slice(0, 6) : 'browser';
  if (m.method === 'Runtime.consoleAPICalled') log.push(`[${s}] console.${m.params.type}: ${m.params.args.map(a => a.value ?? a.description).join(' ')}`);
  if (m.method === 'Runtime.exceptionThrown') log.push(`[${s}] EXCEPTION: ${m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text}`);
  if (m.method === 'Log.entryAdded') log.push(`[${s}] log.${m.params.entry.level}: ${m.params.entry.text} ${m.params.entry.url || ''}`);
  if (m.method === 'Network.loadingFailed') log.push(`[${s}] NET FAIL: ${m.params.errorText} ${m.params.blockedReason || ''} (${m.params.requestId})`);
  if (m.method === 'Network.responseReceived' && /webp|jpg|html/.test(m.params.response.url)) log.push(`[${s}] net ${m.params.response.status} ${m.params.response.url.split('/').pop()}`);
  if (m.method === 'Target.attachedToTarget') { const sid = m.params.sessionId; log.push(`attached ${m.params.targetInfo.type} ${m.params.targetInfo.url}`); if (m.params.targetInfo.type === 'iframe') iframeSid = sid; setup(sid); }
};
async function setup(sid) {
  await send('Runtime.enable', {}, sid); await send('Log.enable', {}, sid); await send('Network.enable', {}, sid);
  await send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: false, flatten: true }, sid);
  await send('Runtime.runIfWaitingForDebugger', {}, sid);
}
const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId: page } = await send('Target.attachToTarget', { targetId, flatten: true });
await setup(page); await send('Page.enable', {}, page);
await send('Emulation.setDeviceMetricsOverride', { width: 600, height: 2600, deviceScaleFactor: 1, mobile: false }, page);
await send('Page.navigate', { url }, page);
await sleep(wait);
// iframe state: same-origin from the wrapper when both are file://; otherwise evaluate in the frame's own context
const probe = `(() => { const d = document; const imgs=[...d.querySelectorAll('img')].map(i=>({src:i.currentSrc.split('/').pop(),complete:i.complete,nw:i.naturalWidth,w:i.clientWidth,h:i.clientHeight,top:Math.round(i.getBoundingClientRect().top)}));
  return JSON.stringify({href:location.href, w:innerWidth, h:innerHeight, scrollY, docH:d.documentElement.scrollHeight, imgs}); })()`;
const tree = await send('Page.getFrameTree', {}, page);
const child = tree.frameTree.childFrames?.[0]?.frame;
log.push(`child frame: ${child?.url} (${child?.id})`);
const { executionContextId } = {};
const world = child && await send('Page.createIsolatedWorld', { frameId: child.id, worldName: 'probe' }, page);
if (world?.executionContextId) log.push('frame state: ' + (await send('Runtime.evaluate', { expression: probe, contextId: world.executionContextId, returnByValue: true }, page)).result?.value);
else if (iframeSid) log.push('frame state (OOPIF): ' + (await send('Runtime.evaluate', { expression: probe, returnByValue: true }, iframeSid)).result?.value);
else log.push('frame state: none');
const shot = await send('Page.captureScreenshot', { format: 'png' }, page);
writeFileSync(out, Buffer.from(shot.data, 'base64'));
console.log(log.join('\n'));
ws.close(); chrome.kill();
