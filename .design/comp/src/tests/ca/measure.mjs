// usage: node measure.mjs <file> <width> <view[+query]>[,...] [overlay]
// Measures every visible text run against the real pixels under it (text hidden, screenshot, composite).
import { launch } from './lib2.mjs';
import { writeFileSync } from 'node:fs';
const [file, w, views, overlay = ''] = [process.argv[2], +process.argv[3], process.argv[4].split(','), process.argv[5]];
const mobile = w < 700, out = [];
const b = await launch(w, 900, ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']);
const OVER = {
  nl: `document.getElementById('nl').hidden=false`,
  nmenu: `document.getElementById('nmenu').hidden=false`,
  toast: `document.getElementById('toast-t').textContent='01 bajarildi';document.getElementById('toast').hidden=false`,
  sheet: `document.getElementById('lock-sheet').showModal()`,
  tab1: `document.getElementById('dg-t1').click()`,
  err: `(()=>{const i=document.getElementById('gid');i.value='KKKKKK';document.getElementById('gate-form').requestSubmit()})()`,
};
for (const v of views) {
  const [view, extra = ''] = v.split('+');
  await b.size(w, 900, mobile);
  await b.goto(`http://localhost:8765/comp/${file}.html?solo&view=${view}${extra ? '&' + extra : ''}`, 3000);
  if (overlay) { await b.ev(OVER[overlay]); await b.wait(800); }
  const H = Math.min(await b.ev('document.documentElement.scrollHeight'), 17000);
  await b.size(w, H, mobile); await b.wait(5500);
  // 1) collect text runs
  const runs = await b.ev(`(() => {
    const res = [], tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const effA = el => { let a = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) a *= +getComputedStyle(e).opacity; return a; };
    const path = el => { const p = []; for (let e = el; e && e !== document.body && p.length < 3; e = e.parentElement) p.unshift(e.tagName.toLowerCase() + (e.classList.length ? '.' + [...e.classList].filter(c=>!/^(is-on|g-host)$/.test(c)).join('.') : '')); return p.join(' > '); };
    let n;
    while ((n = tw.nextNode())) {
      if (!n.textContent.trim()) continue;
      const el = n.parentElement; if (!el || el.closest('svg,script,style,.comp-bar,.screen-tag,[hidden],.sr-only')) continue;
      const cs = getComputedStyle(el); if (cs.visibility !== 'visible' || cs.display === 'none') continue;
      const r = document.createRange(); r.selectNodeContents(n);
      const rects = [...r.getClientRects()].filter(q => q.width > 1 && q.height > 1).map(q => [q.left + scrollX, q.top + scrollY, q.width, q.height]);
      if (!rects.length) continue;
      const scr = el.closest('.screen'); if (scr && !scr.classList.contains('is-on')) continue;
      const m = cs.color.match(/[0-9.]+/g).map(Number);
      res.push({ t: n.textContent.trim().slice(0, 40), sel: path(el), col: m.slice(0,3), a: (m[3] ?? 1) * effA(el), fs: parseFloat(cs.fontSize), fw: +cs.fontWeight, rects });
    }
    return res;
  })()`);
  // 2) hide text, screenshot, sample
  await b.ev(`(()=>{const s=document.createElement('style');s.id='hidetx';s.textContent='*,*::before,*::after,::placeholder{color:transparent!important;text-shadow:none!important;-webkit-text-fill-color:transparent!important;text-decoration-color:transparent!important;caret-color:transparent!important}';document.head.append(s)})()`);
  await b.wait(400);
  const W = await b.ev('document.documentElement.clientWidth');
  const shot = await b.send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: W, height: H, scale: 1 }, captureBeyondViewport: true });
  const res = await b.ev(`(async () => {
    const img = new Image(); img.src = 'data:image/png;base64,${shot.result.data}'; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const D = x.getImageData(0, 0, c.width, c.height).data, CW = c.width;
    const lin = v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
    const L = (r, g, b) => .2126 * lin(r) + .7152 * lin(g) + .0722 * lin(b);
    const runs = ${JSON.stringify(runs)};
    return runs.map(R => {
      const ratios = []; let bgMin = [255,255,255], bgMax = [0,0,0], lmin = 2, lmax = -1;
      for (const [rx, ry, rw, rh] of R.rects) for (let yy = Math.floor(ry); yy < ry + rh; yy += 1) for (let xx = Math.floor(rx); xx < rx + rw; xx += 1) {
        if (xx < 0 || yy < 0 || xx >= CW || yy >= c.height) continue;
        const i = (yy * CW + xx) * 4, br = D[i], bg = D[i+1], bb = D[i+2];
        const fr = R.col[0] * R.a + br * (1 - R.a), fg = R.col[1] * R.a + bg * (1 - R.a), fb = R.col[2] * R.a + bb * (1 - R.a);
        const l1 = L(fr, fg, fb), l2 = L(br, bg, bb), hi = Math.max(l1, l2), lo = Math.min(l1, l2);
        ratios.push((hi + .05) / (lo + .05));
        if (l2 < lmin) { lmin = l2; bgMin = [br,bg,bb]; } if (l2 > lmax) { lmax = l2; bgMax = [br,bg,bb]; }
      }
      if (!ratios.length) ratios.push(99); ratios.sort((p, q) => p - q);
      const pc = p => ratios[Math.min(ratios.length - 1, Math.floor(ratios.length * p))];
      const hex = a => '#' + a.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
      return { t: R.t, sel: R.sel, fg: hex(R.col) + (R.a < 1 ? '@' + R.a.toFixed(2) : ''), fs: R.fs, fw: R.fw, large: R.fs >= 24 || (R.fs >= 18.66 && R.fw >= 700),
        p5: +pc(.05).toFixed(2), med: +pc(.5).toFixed(2), bgDark: hex(bgMin), bgLight: hex(bgMax), y: Math.round(R.rects[0][1]) };
    });
  })()`);
  for (const r of res) out.push({ file, w, view: v, overlay, ...r });
  console.error(file, v, overlay, w, res.length, 'runs');
}
const tag = `${file.replace('design-','')}_${w}_${views.join('-').replace(/[^a-z0-9-]/gi,'')}${overlay ? '_' + overlay : ''}`;
writeFileSync(`m_${tag}.json`, JSON.stringify(out, null, 0));
b.close();
