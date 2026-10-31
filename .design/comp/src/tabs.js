// Dars folder tabs. One tap, one clock (audit 2026-10-19): the indicator slides 260ms, the panes crossfade (old out 120ms, new in 200ms with 8px) at the same moment, and nothing waits
// for anything. The goo filter stays on throughout; will-change is set on the indicator only while it slides. Arrow keys switch instantly.
function initGT(root){
  const tabs = [...root.querySelectorAll('[role="tab"]')], panes = [...root.querySelectorAll('[role="tabpanel"]')], ind = root.querySelector('.gt-ind');
  const rm = matchMedia('(prefers-reduced-motion: reduce)'), safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), EASE = 'cubic-bezier(.2,0,0,1)';
  if (safari) document.documentElement.classList.add('is-safari');
  let cur = 0, seq = 0, rest = 0;
  const settle = () => { clearTimeout(rest); if (ind) ind.style.willChange = ''; };
  if (ind) ind.addEventListener('transitionend', e => { if (e.propertyName === 'transform') settle(); });
  function show(i, focus, key){
    if (i === cur) { if (focus) tabs[i].focus(); return; }
    const dir = i > cur ? 1 : -1, t = ++seq, instant = key || rm.matches || !!root.dataset.instant, old = panes[cur], nw = panes[i]; cur = i;
    root.classList.toggle('kbd', !!key);
    if (!instant) { if (ind) ind.style.willChange = 'transform'; clearTimeout(rest); rest = setTimeout(settle, 400); }
    root.style.setProperty('--i', i);
    tabs.forEach((x, k) => { x.setAttribute('aria-selected', k === i); x.tabIndex = k === i ? 0 : -1; });
    if (focus) tabs[i].focus();
    panes.forEach(p => { p.getAnimations().forEach(a => a.cancel()); if (p !== old && p !== nw) p.setAttribute('inert', ''); });
    nw.removeAttribute('inert');
    if (instant) { old.setAttribute('inert', ''); return; }
    nw.animate([{opacity: 0, transform: `translateY(${safari ? 0 : 8 * dir}px)`}, {opacity: 1, transform: 'none'}], {duration: 200, easing: EASE});
    old.animate([{opacity: 1}, {opacity: 0}], {duration: 120, easing: EASE, fill: 'forwards'}).finished.then(() => { if (t === seq || old !== panes[cur]) { old.setAttribute('inert', ''); old.getAnimations().forEach(a => a.cancel()); } }).catch(() => {});
  }
  tabs.forEach((x, i) => x.addEventListener('click', () => show(i)));
  root.querySelector('[role="tablist"]').addEventListener('keydown', e => {
    const n = tabs.length, to = {ArrowRight: (cur + 1) % n, ArrowLeft: (cur - 1 + n) % n, Home: 0, End: n - 1}[e.key]; if (to == null) return;
    e.preventDefault(); show(to, true, true);
  });
  if (q.has('tabtest')) tabs[+q.get('tabtest')]?.click();
}

// iOS Safari only applies :active when a touch listener exists
document.addEventListener('touchstart', () => {}, {passive: true});
// the name menu closes when the page scrolls under it (> 24px)
addEventListener('scroll', () => {
  const m = document.getElementById('nmenu'); if (!m) return;
  if (m.hidden) { m._y = null; return; }
  if (m._y == null) m._y = scrollY; else if (Math.abs(scrollY - m._y) > 24) closeMenu();
}, {passive: true});

// the loader fades out over the finished home (200ms), then goes back to hidden
function endLoader(ldr){
  ldr.classList.add('out');
  setTimeout(() => { ldr.hidden = true; ldr.classList.remove('out'); }, 200);
}

// ---- Background after sign-in (user, 2026-10-31): the 21st.dev "creation of adam" ASCII effect, renderMode "dither", redone in Canvas2D.
// Recipe: bgMode blur 60 at opacity 100, cellSize 9, coverage 100, contrast 158, density 20, animStyle pulse, speed 100, intensity 60;
// no tint, blur, post effects, lights or mask. Photo: bg-adam.webp, the hands of Michelangelo's fresco (public domain), cropped.
// Cost: the photo is sampled once per resize at one pixel per cell; a frame only rewrites that small ImageData, scales it up and
// punches the cell gaps (three drawImage calls), at 20 fps, and stops while the tab is hidden or the canvas is not shown.
const BG_SRC = new URL('bg-adam.webp', (document.currentScript && document.currentScript.src) || location.href).href;   // next to app.js in the app
function initBgPaths(){
  if (document.querySelector('.bgp')) return;
  const CELL = 9, CONTRAST = 1.58, GAP = 0.2 * 0.5, PULSE = 0.6 * 0.3, PERIOD = 4000, FRAME = 50;   // density 20 = a 10% gap; intensity 60 = +-18% luminance
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16);   // 4x4 ordered dither thresholds
  const cv = document.createElement('canvas'); cv.className = 'bgp'; cv.setAttribute('aria-hidden', 'true');
  document.body.prepend(cv);
  const ctx = cv.getContext('2d'), img = new Image(), still = matchMedia('(prefers-reduced-motion: reduce)');
  const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  let cols = 0, rows = 0, base = null, cells = null, small = null, blocks = null, grid = null, blur = null, raf = 0, last = 0, dpr = 1;
  const cc = v => Math.max(0, Math.min(255, (v - 128) * CONTRAST + 128));
  function layout(){
    if (!img.naturalWidth) return;
    dpr = Math.min(2, devicePixelRatio || 1);
    const W = innerWidth, H = innerHeight, w = Math.round(W * dpr), h = Math.round(H * dpr), cs = CELL * dpr;
    cv.width = w; cv.height = h;
    cols = Math.ceil(W / CELL); rows = Math.ceil(H / CELL);
    const s = Math.max(W / img.naturalWidth, H / img.naturalHeight), sw = W / s, sh = H / s, sx = (img.naturalWidth - sw) / 2, sy = (img.naturalHeight - sh) / 2;   // cover
    const t = mk(cols, rows), tc = t.getContext('2d', {willReadFrequently: true});
    tc.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);   // one pixel per cell = the cell's average colour
    const d = tc.getImageData(0, 0, cols, rows).data;
    base = new Float32Array(cols * rows * 4);
    for (let i = 0; i < cols * rows; i++) { const r = cc(d[i * 4]), g = cc(d[i * 4 + 1]), b = cc(d[i * 4 + 2]); base.set([r, g, b, (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255], i * 4); }
    small = mk(cols, rows); cells = small.getContext('2d').createImageData(cols, rows);
    blocks = mk(w, h);
    grid = mk(w, h); const gc = grid.getContext('2d'), gap = Math.max(1, Math.round(cs * GAP));   // the gap between cells shows the blurred photo
    for (let x = 1; x <= cols; x++) gc.fillRect(Math.round(x * cs) - gap, 0, gap, h);
    for (let y = 1; y <= rows; y++) gc.fillRect(0, Math.round(y * cs) - gap, w, gap);
    blur = mk(Math.ceil(w / 4), Math.ceil(h / 4)); const bc = blur.getContext('2d');   // bgMode blur 60, drawn at a quarter size (blur 15 there)
    bc.filter = `blur(${15 * dpr}px)`; bc.drawImage(img, sx, sy, sw, sh, -blur.width * 0.1, -blur.height * 0.1, blur.width * 1.2, blur.height * 1.2);
  }
  function draw(now){
    if (!base) return;
    const k = still.matches ? 0 : PULSE * Math.sin(2 * Math.PI * now / PERIOD), px = cells.data;
    for (let y = 0, i = 0; y < rows; y++) for (let x = 0; x < cols; x++, i++) {
      const on = base[i * 4 + 3] + k > BAYER[(y & 3) * 4 + (x & 3)];
      px[i * 4] = base[i * 4]; px[i * 4 + 1] = base[i * 4 + 1]; px[i * 4 + 2] = base[i * 4 + 2]; px[i * 4 + 3] = on ? 255 : 0;
    }
    small.getContext('2d').putImageData(cells, 0, 0);
    const bx = blocks.getContext('2d');
    bx.globalCompositeOperation = 'copy'; bx.imageSmoothingEnabled = false;
    bx.drawImage(small, 0, 0, cols * CELL * dpr, rows * CELL * dpr);
    bx.globalCompositeOperation = 'destination-out'; bx.drawImage(grid, 0, 0);
    ctx.globalCompositeOperation = 'copy'; ctx.drawImage(blur, 0, 0, cv.width, cv.height);
    ctx.globalCompositeOperation = 'source-over'; ctx.drawImage(blocks, 0, 0);
  }
  const shown = () => !document.hidden && cv.getClientRects().length > 0;
  function loop(now){
    raf = 0;
    if (!shown() || still.matches) return;
    if (now - last >= FRAME) { last = now; draw(now); }
    raf = requestAnimationFrame(loop);
  }
  const wake = () => { if (!base) return; draw(performance.now()); if (!raf && shown() && !still.matches) raf = requestAnimationFrame(loop); };
  let rt = 0;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { layout(); wake(); }, 150); });
  document.addEventListener('visibilitychange', wake);
  new MutationObserver(wake).observe(document.body, {attributes: true, attributeFilter: ['data-view']});   // shown again after sign-in or a route change
  still.addEventListener?.('change', wake);
  img.onload = () => { layout(); wake(); };
  img.src = BG_SRC;   // a missing file (the single-file prototype) just leaves the plain black background
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBgPaths); else initBgPaths();
