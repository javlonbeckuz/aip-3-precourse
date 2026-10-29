import { launch } from './lib.mjs';
import { inflateSync } from 'node:zlib';
import { readFileSync } from 'node:fs';
import { SP } from './lib.mjs';

// minimal PNG decoder (8-bit, non-interlaced RGB/RGBA)
function decode(buf) {
  let p = 8, w, h, ct; const idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p), type = buf.toString('ascii', p + 4, p + 8), d = buf.subarray(p + 8, p + 8 + len);
    if (type === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); ct = d[9]; }
    if (type === 'IDAT') idat.push(d);
    p += 12 + len;
  }
  const bpp = ct === 6 ? 4 : 3, raw = inflateSync(Buffer.concat(idat)), stride = w * bpp, out = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)), dst = out.subarray(y * stride, (y + 1) * stride), up = y ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? dst[i - bpp] : 0, b = up ? up[i] : 0, c = up && i >= bpp ? up[i - bpp] : 0;
      let v = src[i];
      if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      dst[i] = v & 255;
    }
  }
  return { w, h, bpp, data: out };
}
const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const L = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

const U = 'http://localhost:8765/comp/design-glass.html?solo';
const sels = {
  home: ['.gl-sec[data-open] .gl-eyebrow', '.gl-sec[data-open] .gl-sub', '.gl-sec[data-open] .r-meta', '.gl-sec[data-open] .r-no', '.gl-sec[data-open] .r-name', '.gl-sec[data-open] .gl-pill', '.gl-sec[data-open] .r-st', '.gl-sec[data-open] .gl-num', '.gf-meta', '.gf-title', '.gf-pill:not(.gf-pill--now)', '.now-card .f-label', '.now-card .f-sub', '.now-card .f-title'],
  dars: ['.gt-tab', '.gt-tab .ts', '.p-label', '.p-list li span', '.p-sub', '.gt-meta', '.gt .play span', '.gp-prep .f-label', '.gp-prep .f-note', '.gp-prep .f-num'],
  ex: ['.s1 .to', '.s1 .tx', '.s1 .cpl', '.s1 .chip', '.s1 .tt', '.s1-eyebrow', '.ef-mt', '.ef-h', '.ef-nm', '.ef-hint']
};
export async function audit(w, view, extra = '', openIdx = null) {
  const b = await launch(w, 900); await b.size(w, 900, w < 700);
  await b.goto(`${U}&view=${view}${extra}`, 3000);
  const H = await b.ev('document.documentElement.scrollHeight') + 400; await b.size(w, H, w < 700); await b.wait(1500);
  if (openIdx != null) { await b.ev(`__gl.folders[${openIdx}].set(true)`); await b.wait(2200); }
  await b.wait(2500);
  const items = await b.ev(`(()=>{const out=[];for(const sel of ${JSON.stringify(sels[view === "dastur" ? "home" : view])}){document.querySelectorAll(sel).forEach(e=>{const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none')return;const c=cs.color.match(/[\\d.]+/g).map(Number);const op=+cs.opacity;[...e.getClientRects()].forEach(r=>{if(r.width>2&&r.height>4)out.push({sel,c,a:c[3]==null?1:c[3],x:r.left+scrollX,y:r.top+scrollY,w:r.width,h:r.height,op})})})}return out})()`);
  await b.ev(`(()=>{const s=document.createElement('style');s.textContent='*{color:transparent!important;text-shadow:none!important;-webkit-text-fill-color:transparent!important}svg{visibility:hidden!important}';document.head.append(s)})()`);
  await b.wait(400);
  await b.fullshot('audit_tmp');
  b.close();
  const img = decode(readFileSync(`${SP}/audit_tmp.png`));
  const res = {};
  for (const it of items) {
    const lum = [];
    const ins = /r-st|chip|gl-pill|gf-pill/.test(it.sel) ? 4 : 0; // skip the chip's own border line
    const x0 = Math.max(0, Math.floor(it.x + ins)), x1 = Math.min(img.w, Math.ceil(it.x + it.w - ins)), y0 = Math.max(0, Math.floor(it.y + ins)), y1 = Math.min(img.h, Math.ceil(it.y + it.h - ins));
    for (let y = y0; y < y1; y += 1) for (let x = x0; x < x1; x += 1) { const i = (y * img.w + x) * img.bpp; lum.push(L(img.data[i], img.data[i + 1], img.data[i + 2])); }
    if (!lum.length) continue;
    lum.sort((a, c) => a - c);
    const bg = lum[Math.floor(lum.length * 0.95)], Lt = L(it.c[0], it.c[1], it.c[2]);
    const ratio = (Math.max(Lt, bg) + 0.05) / (Math.min(Lt, bg) + 0.05);
    const k = it.sel; if (!res[k] || ratio < res[k].ratio) res[k] = { ratio, color: it.c.slice(0, 3).join(','), bg: bg.toFixed(3) };
  }
  return res;
}
const w = +process.argv[2] || 1440, view = process.argv[3] || 'home', extra = process.argv[4] || '', open = process.argv[5] != null ? +process.argv[5] : null;
const r = await audit(w, view === 'home' ? 'dastur' : view, extra, open);
console.log(`--- ${view} @${w} ${extra} open=${open}`);
for (const [k, v] of Object.entries(r)) console.log(v.ratio.toFixed(2).padStart(6), v.ratio < 4.5 ? 'LOW ' : 'ok  ', k, `rgb(${v.color})`, 'bgL', v.bg);
