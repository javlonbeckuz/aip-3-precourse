/* Glass folder — vanilla port of the "Glass Folder Cards" React component, re-skinned for AI Praktikum 3.0.
   Kept from the original: the 340x272 stage and its two fixed SVG paths, the three layers (back panel with generated art,
   the files, a frosted front panel hinged at the bottom), the spring/ease curves, the shared + cached art painter
   (domain-warped noise, shaded as a liquid surface, queued over frames), the entrance assemble, a11y (aria-expanded,
   inert closed files, Esc / outside press closes).
   Dropped: the "+" key and the file-drop animation, the "···" menu, the light tone, per-file art, the image prop.
   Changed: width follows the host (ResizeObserver -> --k), pointer parallax is mouse-only and subtler, hover lean only
   where hover exists, taller fan steps so every sheet is a >=44px target, a "locked" peek mode.

   mountGlassFolder(host, {label, meta, pill, pillTone:'now'|'', pillIcon:'check'|'lock'|'', art:'live'|'prep'|'done'|'open'|'none'|recipe,
     seed, accent, locked, files:[{name, meta, href, done, select}], target, appear, appearDelay, onOpenChange, onFileSelect})
   -> { el, open(), close(), toggle(), isOpen, setSelected(i), patchFile(i,{meta,done}), destroy() } */
(function () {
  'use strict';

  // ---------------------------------------------------------------- art recipes (project palette only) --------
  // Dark-weighted so the glass text stays legible; the hue sits in the middle stops, highlights are short.
  var RECIPES = {
    // live lesson: blue #0A14FC folding through black
    live: { style: 'marble', colors: ['#000000', '#03053a', '#0A14FC', '#02021c', '#0610c9', '#0A14FC', '#7d89ff'], scale: 0.64, warp: 3.2, angle: -0.5, gloss: 0.4, veins: 0.5 },
    // prep (lesson 0): yellow #FDC959
    prep: { style: 'marble', colors: ['#050400', '#1c1503', '#7d5f12', '#0c0900', '#C79A2E', '#FDC959', '#ffeab2'], scale: 0.66, warp: 3.2, angle: 0.5, gloss: 0.4, veins: 0.5 },
    // done: grey / silver #E0E0E0
    done: { style: 'streak', colors: ['#050505', '#17171a', '#5d5d63', '#0e0e10', '#26262a', '#8f8f96', '#E0E0E0'], scale: 0.7, warp: 1.8, angle: -0.62, gloss: 0.3, veins: 0 },
    // open: lilac #B4A1D1
    open: { style: 'marble', colors: ['#050309', '#1a1229', '#5f4e80', '#0b0713', '#9884b8', '#B4A1D1', '#e9e0f7'], scale: 0.7, warp: 3.4, angle: 0.8, gloss: 0.4, veins: 0.45 },
    // prompt cards: a quieter lilac, almost only shade
    lilac: { style: 'marble', colors: ['#06040a', '#150e22', '#3c2f58', '#0a0711', '#6b5a8e', '#B4A1D1', '#d9ccee'], scale: 0.75, warp: 3.2, angle: 0.4, gloss: 0.25, veins: 0.3 }
  };

  // ---------------------------------------------------------------- art painter (ported as is) ---------------
  function hexToRgb(hex) {
    var h = String(hex).trim().replace(/^#/, '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = /^[0-9a-f]{6}$/i.test(h) ? parseInt(h, 16) : 0x808080;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rng(seed) { // mulberry32
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hashString(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
    return h >>> 0;
  }
  function makeFbm(seed) {
    var r = rng(seed), perm = new Uint8Array(512), grad = new Float32Array(512), p = [], i;
    for (i = 0; i < 256; i++) p.push(i);
    for (i = 255; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = p[i]; p[i] = p[j]; p[j] = t; }
    for (i = 0; i < 512; i++) perm[i] = p[i & 255];
    for (i = 0; i < 256; i++) { var a = r() * Math.PI * 2; grad[i * 2] = Math.cos(a); grad[i * 2 + 1] = Math.sin(a); }
    function noise(x, y) {
      var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, X = xi & 255, Y = yi & 255;
      var h00 = perm[X + perm[Y]] * 2, h10 = perm[X + 1 + perm[Y]] * 2, h01 = perm[X + perm[Y + 1]] * 2, h11 = perm[X + 1 + perm[Y + 1]] * 2;
      var d00 = grad[h00] * xf + grad[h00 + 1] * yf, d10 = grad[h10] * (xf - 1) + grad[h10 + 1] * yf;
      var d01 = grad[h01] * xf + grad[h01 + 1] * (yf - 1), d11 = grad[h11] * (xf - 1) + grad[h11 + 1] * (yf - 1);
      var u = xf * xf * xf * (xf * (xf * 6 - 15) + 10), v = yf * yf * yf * (yf * (yf * 6 - 15) + 10);
      return d00 + u * (d10 - d00) + v * (d01 - d00 + u * (d11 - d01 - d10 + d00));
    }
    return function (x, y, octaves) {
      var sum = 0, amp = 0.5;
      for (var k = 0; k < octaves; k++) {
        sum += amp * noise(x, y);
        var nx = 1.6 * x + 1.2 * y + 7.1;
        y = -1.2 * x + 1.6 * y + 3.3;
        x = nx;
        amp *= 0.5;
      }
      return sum;
    };
  }
  function createArtJob(width, height, recipe, seed) {
    var w = Math.max(1, Math.round(width)), h = Math.max(1, Math.round(height));
    var colors = recipe.colors.length >= 2 ? recipe.colors : ['#111111', '#eeeeee'];
    var stops = colors.map(function (c, i) { return { t: i / (colors.length - 1), c: hexToRgb(c) }; });
    var scale = recipe.scale != null ? recipe.scale : 0.7, warp = recipe.warp != null ? recipe.warp : 3;
    var gloss = recipe.gloss != null ? recipe.gloss : 0.4, veins = recipe.veins || 0, streak = recipe.style === 'streak';
    var fbm = makeFbm(seed * 977 + 13), r = rng(seed + 1);
    var ox = r() * 50, oy = r() * 50, angle = (recipe.angle || 0) + (r() - 0.5) * 0.5;
    var ca = Math.cos(angle), sa = Math.sin(angle), m = Math.min(w, h);
    // half-resolution field + Catmull-Rom upsample: a quarter of the noise, same slope for the lighting
    var gw = Math.ceil(w / 2) + 3, gh = Math.ceil(h / 2) + 3;
    var G = new Float32Array(gw * gh), GQ = new Float32Array(gw * gh), F = new Float32Array(w * h), Q = new Float32Array(w * h);
    var pixels = new Uint8ClampedArray(w * h * 4), row = 0;

    function field(gy) {
      for (var gx = 0; gx < gw; gx++) {
        var u = ((gx - 1) * 2 - w / 2) / m, v = ((gy - 1) * 2 - h / 2) / m;
        var px = (u * ca - v * sa) * scale, py = (u * sa + v * ca) * scale;
        if (streak) { px *= 0.14; py *= 2.2; }
        px += ox; py += oy;
        var qx = fbm(px, py, 3), qy = fbm(px + 5.2, py + 1.3, 3);
        var rx = fbm(px + warp * qx + 1.7, py + warp * qy + 9.2, 3), ry = fbm(px + warp * qx + 8.3, py + warp * qy + 2.8, 3);
        G[gy * gw + gx] = fbm(px + warp * rx, py + warp * ry, 4);
        GQ[gy * gw + gx] = Math.sqrt(qx * qx + qy * qy);
      }
    }
    function cr(a, b, c, d) { return (-a + 9 * b + 9 * c - d) / 16; }
    // every stage after the noise field is chunked by rows too, so no single step is a long task
    var T = null;
    function upT(a, b) {
      for (var gy = a; gy < b; gy++) {
        var rr = gy * gw;
        for (var x = 0; x < w; x++) {
          var c = (x >> 1) + 1;
          T[gy * w + x] = x & 1 ? cr(G[rr + c - 1], G[rr + c], G[rr + c + 1], G[rr + c + 2]) : G[rr + c];
        }
      }
    }
    function upF(a, b) {
      for (var y = a; y < b; y++) {
        var cy = (y >> 1) + 1;
        for (var x = 0; x < w; x++) {
          F[y * w + x] = y & 1 ? cr(T[(cy - 1) * w + x], T[cy * w + x], T[(cy + 1) * w + x], T[(cy + 2) * w + x]) : T[cy * w + x];
          var gx = (x >> 1) + 1, q0 = GQ[cy * gw + gx];
          var qx = x & 1 ? (q0 + GQ[cy * gw + gx + 1]) / 2 : q0;
          var q1 = y & 1 ? (x & 1 ? (GQ[(cy + 1) * gw + gx] + GQ[(cy + 1) * gw + gx + 1]) / 2 : GQ[(cy + 1) * gw + gx]) : qx;
          Q[y * w + x] = (qx + q1) / 2;
        }
      }
    }
    var lo = 0, kk = 1, lx = -0.55, ly = -0.65, lz = 0.52, slope = 0;
    function prepColor() { // percentiles from a sample, once
      var sample = [], stride = Math.max(1, Math.floor(F.length / 4096));
      for (var i = 0; i < F.length; i += stride) sample.push(F[i]);
      sample.sort(function (a, b) { return a - b; });
      lo = sample[Math.floor(sample.length * 0.02)];
      var hi = sample[Math.floor(sample.length * 0.98)];
      kk = 1 / (hi - lo || 1); slope = kk * m * 0.012;
    }
    function colorRows(a0, b0) {
      for (var y = a0; y < b0; y++) {
        for (var x = 0; x < w; x++) {
          var i = y * w + x;
          var t = (F[i] - lo) * kk; t = t < 0 ? 0 : t > 1 ? 1 : t;
          var j = 1; while (j < stops.length - 1 && stops[j].t < t) j++;
          var a = stops[j - 1], b = stops[j], f = (t - a.t) / (b.t - a.t || 1);
          f = f < 0 ? 0 : f > 1 ? 1 : f; f = f * f * (3 - 2 * f);
          var gx = (F[x < w - 1 ? i + 1 : i] - F[x > 0 ? i - 1 : i]) * slope;
          var gy = (F[y < h - 1 ? i + w : i] - F[y > 0 ? i - w : i]) * slope;
          var nd = (-gx * lx - gy * ly + lz) / Math.sqrt(gx * gx + gy * gy + 1);
          var spec = Math.pow(nd > 0 ? nd : 0, 24) * gloss * 255;
          var silk = 1 + 0.035 * Math.sin(t * 150 + Q[i] * 24);
          var vein = veins * Math.max(0, 1 - Math.abs(Q[i] - 0.42) * 14) * 0.6;
          var lit = (0.82 + 0.28 * nd) * silk * (1 - vein);
          pixels[i * 4] = (a.c[0] + (b.c[0] - a.c[0]) * f) * lit + spec;
          pixels[i * 4 + 1] = (a.c[1] + (b.c[1] - a.c[1]) * f) * lit + spec;
          pixels[i * 4 + 2] = (a.c[2] + (b.c[2] - a.c[2]) * f) * lit + spec;
          pixels[i * 4 + 3] = 255;
        }
      }
    }
    var stage = 0, pos = 0, PIX = 16; // pixel stages take PIX rows per field row of budget
    function step(rows) {
      rows = Math.max(1, rows);
      if (stage === 0) {
        var end = Math.min(gh, row + rows);
        while (row < end) field(row++);
        if (row >= gh) { stage = 1; pos = 0; T = new Float32Array(w * gh); }
        return false;
      }
      var n = rows * PIX;
      if (stage === 1) { var e1 = Math.min(gh, pos + n); upT(pos, e1); pos = e1; if (pos >= gh) { stage = 2; pos = 0; } return false; }
      if (stage === 2) { var e2 = Math.min(h, pos + n); upF(pos, e2); pos = e2; if (pos >= h) { T = null; prepColor(); stage = 3; pos = 0; } return false; }
      var e3 = Math.min(h, pos + n); colorRows(pos, e3); pos = e3;
      return pos >= h;
    }
    return { width: w, height: h, pixels: pixels, step: step };
  }

  // One shared painter: every folder queues its art here; it spends ~7ms a frame, so a row of folders never janks.
  var artCache = new Map(), queue = [], pumping = false;
  function pump() {
    if (pumping) return;
    pumping = true;
    var tick = function () {
      var until = performance.now() + 7;
      while (queue.length && performance.now() < until) {
        var head = queue[0];
        if (head.job.step(4)) {
          queue.shift();
          var c = document.createElement('canvas');
          c.width = head.job.width; c.height = head.job.height;
          c.getContext('2d').putImageData(new ImageData(head.job.pixels, c.width, c.height), 0, 0);
          head.done(c);
        }
      }
      if (queue.length) requestAnimationFrame(tick); else pumping = false;
    };
    requestAnimationFrame(tick);
  }
  function paint(recipe, seed, w, h, priority) {
    var key = JSON.stringify([recipe, seed, w, h]), p = artCache.get(key);
    if (!p) {
      p = new Promise(function (done) {
        var at = queue.length; // never jump the job already in progress
        while (at > 1 && queue[at - 1].priority > priority) at--;
        queue.splice(at, 0, { job: createArtJob(w, h, recipe, seed), priority: priority, done: done });
        pump();
      });
      artCache.set(key, p);
      // bounded cache (insertion order): the source canvases of the newest 16 keys stay, so a panel that asks again later (a section reusing its folder's art) is a hit
      if (artCache.size > 16) artCache.delete(artCache.keys().next().value);
    }
    return p;
  }
  // paint into a <canvas>; w,h are the CSS box, density the pixels per CSS px (quantised so resizes reuse the cache)
  function bindArt(canvas, art, seed, w, h, density, priority) {
    var recipe = typeof art === 'string' ? RECIPES[art] : art;
    if (!recipe) return;
    var pw = Math.round(w * density), ph = Math.round(h * density), tok = (canvas._gfTok = (canvas._gfTok || 0) + 1);
    paint(recipe, seed, pw, ph, priority || 0).then(function (src) {
      if (canvas._gfTok !== tok || !canvas.isConnected) return;
      canvas.width = src.width; canvas.height = src.height;
      canvas.getContext('2d').drawImage(src, 0, 0);
      canvas.setAttribute('data-ready', '');
    });
  }
  function quantDensity(k) {
    var d = k * Math.min(1.5, window.devicePixelRatio || 1);
    return Math.round(Math.min(1.25, Math.max(0.75, d)) * 4) / 4;
  }

  // ---------------------------------------------------------------- geometry (own units: 340 x 272) -------------
  var W = 340, H = 272, HEADROOM = 54, FRONT_TOP = 74, FRONT_H = H - FRONT_TOP, MAX_VISIBLE = 4;
  var BACK_PATH = 'M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z';
  var FRONT_PATH = 'M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 ' + (FRONT_H - 22) +
    'A22 22 0 0 1 318 ' + FRONT_H + 'L22 ' + FRONT_H + 'A22 22 0 0 1 0 ' + (FRONT_H - 22) + 'Z';
  function fanSlot(i, n) { return n <= 1 ? 0 : (i / (n - 1)) * 2 - 1; }

  // ---------------------------------------------------------------- css ---------------------------------------
  var CSS = [
    '.gf-root{--gf-px:0;--gf-py:0;--k:1;--gf-ease:cubic-bezier(.2,.8,.2,1);--gf-spring:cubic-bezier(.34,1.36,.5,1);',
    '--gf-hinge:0deg;--gf-lift:42px;--gf-spread:0px;--gf-fan:0deg;--gf-stack:15px;--gf-stack-open:50px;--gf-spread-open:40px;',
    '--gf-ink:#f5f5f7;--gf-ink-soft:rgba(245,245,247,.72);--gf-accent:#fff;',
    'position:relative;display:block;width:100%;aspect-ratio:' + W + '/' + (H + HEADROOM) + ';isolation:isolate;',
    'font-family:var(--font-body,"Golos Text",system-ui,sans-serif);-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent;text-align:left}',
    '.gf-root[data-open]{z-index:6}',
    '@media (hover:hover) and (pointer:fine){.gf-root:hover{--gf-hinge:-11deg;--gf-lift:-34px;--gf-spread:8px;--gf-fan:1.4deg;--gf-stack:10px}}',
    '.gf-root:has(.gf-hit:focus-visible){--gf-hinge:-11deg;--gf-lift:-34px;--gf-spread:8px;--gf-fan:1.4deg;--gf-stack:10px}',
    '.gf-root[data-open]{--gf-hinge:-24deg;--gf-lift:-84px;--gf-spread:var(--gf-spread-open);--gf-fan:5deg;--gf-stack:var(--gf-stack-open)}',
    '.gf-root[data-locked]{--gf-ink:#9a9a9a;--gf-ink-soft:#8d8d92}',
    /* section mode: the folder opens FULLY like the fan version (hinge -24deg, files rise and fan, names visible); the page expands a real section too.
       The files are decorative here (aria-hidden + inert; the section's rows carry the links). Wider perspective keeps the lean inside phone margins.
       Closed: no live blur (a pre-blurred copy of the art sits in the front). Open: exactly this one front gets the live backdrop, so the frost shows the rising files. */
    '.gf-root[data-mode="section"]{cursor:pointer;--gf-persp:1100px}',
    '.gf-root[data-mode="section"][data-open]{--gf-lift:-70px;--gf-stack:32px;--gf-fan:4deg}',
    '.gf-root[data-mode="section"] .gf-front{-webkit-backdrop-filter:none;backdrop-filter:none}',
    '.gf-root[data-mode="section"][data-open] .gf-front{-webkit-backdrop-filter:blur(22px) saturate(1.5);backdrop-filter:blur(22px) saturate(1.5)}',
    '.gf-root[data-mode="section"] .gf-art--front{transition:opacity .5s var(--gf-ease),transform 1.1s var(--gf-ease)}.gf-root[data-mode="section"][data-open] .gf-art--front{opacity:0}',
    '.gf-root[data-mode="section"] .gf-sheet{cursor:pointer}',

    '.gf-stage{position:absolute;left:0;top:0;width:340px;height:272px;transform-origin:0 0;transform:translateY(calc(' + HEADROOM + 'px * var(--k))) scale(var(--k))}',
    '.gf-tilt{position:absolute;inset:0;transform:perspective(1400px) rotateX(calc(var(--gf-py) * -1.6deg)) rotateY(calc(var(--gf-px) * 2.2deg));transition:transform .9s var(--gf-ease)}',
    '.gf-shadow{position:absolute;left:18px;right:18px;bottom:-6px;height:60px;border-radius:40px;background:rgba(0,0,0,.7);filter:blur(22px);transform:translateX(calc(var(--gf-px) * -6px));transition:transform .9s var(--gf-ease),opacity .9s var(--gf-ease)}',

    '.gf-back{position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#2a2a2e 0%,#121214 100%)}',
    '.gf-root[data-locked] .gf-back{background:linear-gradient(180deg,#232326 0%,#0e0e10 100%)}',
    '.gf-art{position:absolute;left:-12px;top:-12px;max-width:none;transform:translate(calc(var(--gf-px) * -5px),calc(var(--gf-py) * -4px)) scale(1.02);transition:transform 1.1s var(--gf-ease),opacity 1.2s var(--gf-ease),filter 1.2s var(--gf-ease);opacity:0;filter:blur(14px) saturate(.6)}',
    '.gf-art[data-ready]{opacity:1;filter:none}',
    '.gf-art--front{left:-12px;top:-86px;filter:blur(22px) saturate(1.5)}.gf-art--front[data-ready]{filter:blur(22px) saturate(1.5)}',
    '.gf-back-sheen{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(255,255,255,.12) 0%,rgba(255,255,255,0) 22%),radial-gradient(120% 80% at 80% 0%,rgba(255,255,255,.09),rgba(255,255,255,0) 60%)}',
    '.gf-rim{position:absolute;left:0;top:0;max-width:none;overflow:visible;pointer-events:none;fill:none}',
    '.gf-back-rim{width:340px;height:272px}.gf-back-rim path{stroke:rgba(255,255,255,.16);stroke-width:1}',

    /* files */
    '.gf-files{position:absolute;inset:0;z-index:5;pointer-events:none;clip-path:inset(-400px -400px 10px -400px)}',
    '.gf-sheet-slot{display:contents}',
    '.gf-sheet{all:unset;box-sizing:border-box;display:block;position:absolute;left:34px;top:96px;width:272px;height:184px;border-radius:16px;overflow:hidden;cursor:pointer;pointer-events:auto;',
    'background:linear-gradient(180deg,#2c2c30 0%,#17171a 100%);color:#f5f5f7;',
    'box-shadow:inset 0 1px 0 var(--gf-accent-line,rgba(255,255,255,.18)),0 0 0 .5px rgba(255,255,255,.1),0 12px 28px -8px rgba(0,0,0,.7);',
    'transform-origin:50% 100%;',
    'transform:translate(calc(var(--gf-jx) + var(--gf-slot) * var(--gf-spread)),calc(var(--gf-lift) + var(--gf-depth) * var(--gf-stack) * -1)) rotate(calc(var(--gf-jr) + var(--gf-slot) * var(--gf-fan)));',
    'transition:transform .75s var(--gf-spring) calc(var(--gf-depth) * 40ms),box-shadow .4s var(--gf-ease),translate .9s var(--gf-ease),opacity .9s var(--gf-ease),filter .2s}',
    '@media (hover:hover) and (pointer:fine){.gf-root[data-open] a.gf-sheet:hover,.gf-root[data-open] button.gf-sheet:hover{',
    'transform:translate(calc(var(--gf-jx) + var(--gf-slot) * var(--gf-spread)),calc(var(--gf-lift) + var(--gf-depth) * var(--gf-stack) * -1 - 14px)) rotate(calc(var(--gf-slot) * var(--gf-fan) * .6));',
    'box-shadow:inset 0 1px 0 var(--gf-accent-line,rgba(255,255,255,.3)),0 0 0 .5px rgba(255,255,255,.18),0 22px 40px -12px rgba(0,0,0,.85);transition-delay:0s}}',
    '.gf-root[data-open] a.gf-sheet:active,.gf-root[data-open] button.gf-sheet:active{filter:brightness(1.12);transition-duration:.1s}',
    '.gf-sheet:focus-visible{outline:2px solid #fff;outline-offset:2px}',
    '.gf-sheet[data-selected]{box-shadow:inset 0 1px 0 var(--gf-accent,#fff),0 0 0 1.5px var(--gf-accent,#fff),0 12px 28px -8px rgba(0,0,0,.7)}',
    '.gf-sheet.is-off{cursor:default;background:linear-gradient(180deg,#1e1e21 0%,#131315 100%);color:#8d8d92}',
    '.gf-sheet-head{position:absolute;left:16px;right:56px;top:9px;display:grid;gap:3px;min-width:0}',
    '.gf-sheet-name{display:flex;align-items:center;gap:6px;min-width:0;font:500 max(13px,calc(12px / var(--k)))/1.15 var(--font-display,"Mona Sans","Roboto Flex",sans-serif);font-stretch:125%;letter-spacing:-.005em;text-transform:uppercase;white-space:nowrap}',
    '.gf-sheet-name>span{overflow:hidden;text-overflow:ellipsis}',
    '.gf-sheet-name svg{flex:none;width:13px;height:13px;color:var(--gf-accent,#fff)}',
    '.gf-sheet-meta{font:400 max(11px,calc(11.5px / var(--k)))/1.2 var(--font-mono,"Martian Mono",ui-monospace,monospace);font-stretch:87.5%;letter-spacing:.01em;color:rgba(245,245,247,.7);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.gf-sheet.is-off .gf-sheet-meta,.gf-sheet.is-off .gf-sheet-name svg{color:#8d8d92}',
    '.gf-sheet--nogo .gf-sheet-head{right:16px}',
    '.gf-sheet-go{position:absolute;right:12px;top:8px;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;border:1px solid rgba(255,255,255,.28);color:#fff}',
    '.gf-sheet-go svg{width:14px;height:14px}',
    '.gf-lines{position:absolute;left:16px;right:16px;top:60px;display:flex;flex-direction:column;gap:9px}',
    '.gf-lines i{display:block;height:5px;border-radius:3px;background:rgba(255,255,255,.07)}.gf-lines i:first-child{height:9px;margin-bottom:4px;background:rgba(255,255,255,.12)}',

    /* front glass */
    '.gf-front{position:absolute;left:0;top:74px;width:340px;height:198px;z-index:10;-webkit-backdrop-filter:blur(22px) saturate(1.5);backdrop-filter:blur(22px) saturate(1.5);',
    'transform-origin:50% 100%;transform:perspective(var(--gf-persp,760px)) rotateX(var(--gf-hinge));transition:transform .8s var(--gf-spring),translate 1s var(--gf-ease),opacity 1s var(--gf-ease)}',
    '.gf-tint{position:absolute;inset:0;background:linear-gradient(180deg,rgba(18,18,20,.3) 0%,rgba(14,14,16,.68) 42%,rgba(8,8,10,.95) 100%)}',
    '.gf-root[data-locked] .gf-tint{background:linear-gradient(180deg,rgba(18,18,20,.5) 0%,rgba(12,12,14,.8) 42%,rgba(8,8,10,.96) 100%)}',
    '.gf-spec{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;opacity:.14;background:radial-gradient(260px 200px at calc(50% + var(--gf-px) * 40%) calc(30% + var(--gf-py) * 34%),rgba(255,255,255,.5),rgba(255,255,255,0) 70%)}',
    '.gf-front-rim{width:340px;height:198px;opacity:.55}.gf-front-rim path{stroke-width:2.4;transition:stroke-width .3s var(--gf-ease)}',
    '.gf-hit{all:unset;position:absolute;inset:0;z-index:1;cursor:pointer}',
    '.gf-hit:focus-visible{outline:2px solid #fff;outline-offset:-4px}',
    '.gf-hit:focus-visible~.gf-label .gf-title{text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:4px}',
    '.gf-front:has(.gf-hit:focus-visible) .gf-front-rim{opacity:1}.gf-front:has(.gf-hit:focus-visible) .gf-front-rim path{stroke-width:5}',
    '.gf-label{position:absolute;z-index:2;left:26px;right:26px;bottom:24px;display:flex;flex-direction:column;align-items:flex-start;gap:5px;pointer-events:none;color:var(--gf-ink)}',
    '.gf-meta{font:400 max(11px,calc(11.5px / var(--k)))/1.2 var(--font-mono,"Martian Mono",ui-monospace,monospace);font-stretch:87.5%;letter-spacing:.02em;text-transform:uppercase;color:var(--gf-ink-soft)}',
    '.gf-title{max-width:100%;font:500 max(17px,calc(14.5px / var(--k)))/1.22 var(--font-display,"Mona Sans","Roboto Flex",sans-serif);font-stretch:125%;letter-spacing:-.005em;text-transform:uppercase;overflow-wrap:anywhere}',
    '.gf-pill{display:inline-flex;align-items:center;gap:6px;min-height:30px;margin-top:5px;padding:4px 12px;border:1px solid currentColor;border-radius:999px;font:500 max(12px,calc(12px / var(--k)))/1.2 var(--font-body,"Golos Text",system-ui,sans-serif);text-transform:uppercase;letter-spacing:.01em}',
    '.gf-pill svg{width:13px;height:13px}',
    '.gf-pill--now{background:#f5f5f7;border-color:#f5f5f7;color:#000}',
    '.gf-chev{position:absolute;z-index:2;right:22px;top:44px;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.34);color:var(--gf-ink);pointer-events:none;transition:transform .6s var(--gf-spring)}',
    '.gf-chev svg{width:16px;height:16px}',
    '.gf-root[data-open] .gf-chev{transform:rotate(180deg)}',

    /* entrance: the folder assembles itself */
    '.gf-root:not([data-entered]) .gf-back,.gf-root:not([data-entered]) .gf-back-rim{translate:0 22px;opacity:0}',
    '.gf-root:not([data-entered]) .gf-sheet{translate:0 -120px;opacity:0}',
    '.gf-root:not([data-entered]) .gf-front{translate:0 46px;opacity:0}',
    '.gf-root:not([data-entered]) .gf-shadow{opacity:0}',
    '.gf-back,.gf-back-rim{transition:translate 1s var(--gf-ease),opacity .9s var(--gf-ease)}',
    '.gf-root[data-entered] .gf-sheet{transition-delay:calc(var(--gf-depth) * 40ms),0s,calc(.18s + var(--gf-depth) * 90ms),calc(.18s + var(--gf-depth) * 90ms),0s}',
    '.gf-root[data-entered] .gf-front{transition-delay:0s,.42s,.42s}',

    /* materials: no blur -> solid smoked fill */
    '@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){.gf-tint{background:linear-gradient(180deg,rgba(26,26,29,.9) 0%,rgba(12,12,14,.96) 45%,#08080a 100%)!important}}',
    '@media (prefers-reduced-transparency:reduce){.gf-front{-webkit-backdrop-filter:none;backdrop-filter:none}.gf-tint{background:linear-gradient(180deg,#1b1b1e 0%,#0e0e10 45%,#08080a 100%)!important}}',
    '@media (prefers-contrast:more){.gf-front-rim{opacity:1}.gf-sheet{box-shadow:0 0 0 1px rgba(255,255,255,.5)}}',
    /* reduced motion: open/close change state instantly, no hinge/fan/parallax animation */
    '@media (prefers-reduced-motion:reduce){.gf-root *,.gf-root *::before,.gf-root *::after{transition-duration:0s!important;transition-delay:0s!important;animation:none!important}.gf-tilt{transform:none}.gf-art{transform:none}}'
  ].join('\n');

  var cssDone = false;
  function injectCSS() {
    if (cssDone) return;
    cssDone = true;
    var s = document.createElement('style');
    s.setAttribute('data-glass-folder', '');
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  // ---------------------------------------------------------------- component ---------------------------------
  var uidN = 0;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  // Mona Sans lacks U+02BB / U+02BC: show the same-shaped quotes (the project's display layer does the same)
  var disp = function (s) { return String(s == null ? '' : s).replace(/ʻ/g, '‘').replace(/ʼ/g, '’'); };
  var ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8.5 7H17v8.5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 14 6-6 6 6"/></svg>'
  };
  var reduceMQ = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  function mountGlassFolder(host, opts) {
    injectCSS();
    var o = Object.assign({ label: '', meta: '', pill: '', pillTone: '', pillIcon: '', art: 'none', seed: 3, accent: '#ffffff', locked: false, files: [], target: null, appear: true, appearDelay: 0, mode: 'fan', controls: null }, opts || {});
    var uid = 'gf' + (++uidN);
    var peek = o.mode === 'section'; // the folder only leans open; the page expands a real section (aria-controls) instead of fanning sheets
    var files = o.files.slice();
    var visStart = Math.max(0, files.length - MAX_VISIBLE);
    var visible = files.slice(visStart);

    var root = document.createElement('div');
    root.className = 'gf-root';
    if (o.locked) root.setAttribute('data-locked', '');
    if (peek) root.setAttribute('data-mode', 'section');
    root.style.setProperty('--gf-accent', o.accent);
    root.style.setProperty('--gf-accent-line', o.accent + '8c');

    var names = files.map(function (f) { return disp(f.name); }).join(', ');
    var aria = disp(o.label) + (o.meta ? ', ' + disp(o.meta) : '') + (o.pill ? '. ' + disp(o.pill) : '') + (o.locked ? '. Ichida: ' + names : '');

    var sheetHtml = visible.map(function (f, v) {
      var jit = rng(hashString(f.name) + visStart + v);
      var jx = ((jit() - 0.5) * 10).toFixed(2), jr = ((jit() - 0.5) * 3.2).toFixed(2);
      var style = '--gf-slot:' + fanSlot(v, visible.length).toFixed(3) + ';--gf-depth:' + (visible.length - 1 - v) + ';--gf-jx:' + jx + 'px;--gf-jr:' + jr + 'deg;z-index:' + (v + 1);
      var inner =
        '<span class="gf-lines" aria-hidden="true"><i style="width:86%"></i><i style="width:92%"></i><i style="width:64%"></i><i style="width:88%"></i></span>' +
        '<span class="gf-sheet-head"><span class="gf-sheet-name">' + (o.locked ? ICON.lock : f.done ? ICON.check : '') + '<span>' + esc(disp(f.name)) + '</span></span>' +
        (f.meta ? '<span class="gf-sheet-meta">' + esc(disp(f.meta)) + '</span>' : '') + '</span>' +
        (f.go === false || o.locked || peek ? '' : '<span class="gf-sheet-go" aria-hidden="true">' + ICON.arrow + '</span>');
      var attrs = 'class="gf-sheet' + (o.locked ? ' is-off' : '') + (f.go === false || o.locked || peek ? ' gf-sheet--nogo' : '') + '" style="' + style + '" data-i="' + (visStart + v) + '"';
      var el = o.locked || peek ? '<div ' + attrs + '>' + inner + '</div>'
        : f.href ? '<a ' + attrs + ' href="' + esc(f.href) + '"' + (o.target ? ' target="' + o.target + '" rel="noopener"' : '') + '>' + inner + '</a>'
        : '<button type="button" ' + attrs + '>' + inner + '</button>';
      return '<div role="listitem" class="gf-sheet-slot">' + el + '</div>';
    }).join('');

    root.innerHTML =
      '<div class="gf-stage"><div class="gf-tilt">' +
      '<div class="gf-shadow" aria-hidden="true"></div>' +
      '<div class="gf-back" style="clip-path:path(\'' + BACK_PATH + '\')" aria-hidden="true">' +
      (o.art !== 'none' ? '<canvas class="gf-art" width="1" height="1" style="width:' + (W + 24) + 'px;height:' + (H + 24) + 'px"></canvas>' : '') +
      '<div class="gf-back-sheen"></div></div>' +
      '<svg class="gf-rim gf-back-rim" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true"><path d="' + BACK_PATH + '"/></svg>' +
      '<div class="gf-front" style="clip-path:path(\'' + FRONT_PATH + '\')">' +
      (peek && o.art !== 'none' ? '<canvas class="gf-art gf-art--front" width="1" height="1" aria-hidden="true" style="width:' + (W + 24) + 'px;height:' + (H + 24) + 'px"></canvas>' : '') +
      '<div class="gf-tint" aria-hidden="true"></div><div class="gf-spec" aria-hidden="true"></div>' +
      '<svg class="gf-rim gf-front-rim" viewBox="0 0 ' + W + ' ' + FRONT_H + '" aria-hidden="true"><defs><linearGradient id="' + uid + '-rim" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".35" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient></defs>' +
      '<path d="' + FRONT_PATH + '" stroke="url(#' + uid + '-rim)"/></svg>' +
      '<button type="button" class="gf-hit" aria-expanded="false" aria-controls="' + (o.controls || uid + '-files') + '" aria-label="' + esc(aria) + '"></button>' +
      '<span class="gf-chev" aria-hidden="true">' + ICON.chev + '</span>' +
      '<div class="gf-label" aria-hidden="true">' +
      (o.meta ? '<span class="gf-meta">' + esc(disp(o.meta)) + '</span>' : '') +
      '<span class="gf-title">' + esc(disp(o.label)) + '</span>' +
      (o.pill ? '<span class="gf-pill' + (o.pillTone === 'now' ? ' gf-pill--now' : '') + '">' + (o.pillIcon ? ICON[o.pillIcon] : '') + esc(disp(o.pill)) + '</span>' : '') +
      '</div></div>' +
      '<div class="gf-files" id="' + uid + '-files" role="list" aria-label="' + esc(disp(o.label)) + ': fayllar"' + (peek ? ' aria-hidden="true"' : '') + ' inert>' + sheetHtml + '</div>' +
      '</div></div>';
    host.appendChild(root);

    var hit = root.querySelector('.gf-hit'), filesEl = root.querySelector('.gf-files');
    var canvas = root.querySelector('.gf-back canvas.gf-art'), canvases = root.querySelectorAll('canvas.gf-art');
    var paintAll = function () { canvases.forEach(function (c) { bindArt(c, o.art, o.seed, W + 24, H + 24, density, 0); }); };
    var isOpen = false, k = 1, density = 1, painted = false, cleanups = [];

    // ---- size: everything scales with the host width
    function measure() {
      var w = root.clientWidth || host.clientWidth || W;
      k = w / W;
      root.style.setProperty('--k', k.toFixed(4));
      // tall enough steps that every sheet is a >=44px target even where the fan's rotation thins it, and a fan that stays inside narrow screens
      root.style.setProperty('--gf-stack-open', Math.max(44, Math.ceil(50 / k)) + 'px');
      root.style.setProperty('--gf-spread-open', (k < 1.1 ? 28 : 40) + 'px');
      var d = peek ? 1 : quantDensity(k); // section mode: one fixed density, so the section reuses this folder's art from the cache
      if (canvas && painted && d !== density) { density = d; paintAll(); }
      density = d;
    }
    measure();
    var ro = new ResizeObserver(measure);
    ro.observe(root);
    cleanups.push(function () { ro.disconnect(); });

    // ---- paint when near the viewport (not for folders far below the fold)
    if (canvas) {
      var io1 = new IntersectionObserver(function (es) {
        if (!es.some(function (e) { return e.isIntersecting; })) return;
        io1.disconnect(); painted = true;
        paintAll();
      }, { rootMargin: '300px' });
      io1.observe(root);
      cleanups.push(function () { io1.disconnect(); });
    }

    // ---- entrance: assemble the first time the folder is on screen (instant under reduced motion)
    if (!o.appear || reduceMQ.matches) root.setAttribute('data-entered', '');
    else {
      var t = 0;
      var io2 = new IntersectionObserver(function (es) {
        if (!es.some(function (e) { return e.isIntersecting; })) return;
        io2.disconnect();
        t = setTimeout(function () { root.setAttribute('data-entered', ''); }, o.appearDelay);
      }, { threshold: 0.25 });
      io2.observe(root);
      cleanups.push(function () { io2.disconnect(); clearTimeout(t); });
    }

    // ---- pointer: light + parallax follow a mouse (never touch/pen, never under reduced motion)
    var raf = 0, px = 0, py = 0;
    function write() { raf = 0; root.style.setProperty('--gf-px', px.toFixed(3)); root.style.setProperty('--gf-py', py.toFixed(3)); }
    function onMove(e) {
      if (e.pointerType !== 'mouse' || reduceMQ.matches) return;
      var r = root.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1; py = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(write);
    }
    function onLeave() { px = 0; py = 0; if (!raf) raf = requestAnimationFrame(write); }
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);

    // ---- open / close
    function onKey(e) { if (e.key === 'Escape') { setOpen(false); hit.focus(); } }
    function onDown(e) { if (!root.contains(e.target)) setOpen(false); }
    function reveal() { // keep the whole fan on screen: scroll up if its top would sit under the sticky bar
      var n = visible.length, s = Math.max(44, Math.ceil(50 / k));
      var topPx = root.getBoundingClientRect().top + (HEADROOM + 96 - 84 - (n - 1) * s - 16) * k;
      var bottomPx = root.getBoundingClientRect().bottom;
      var margin = 64, dy = 0;
      if (topPx < margin) dy = topPx - margin;
      else if (bottomPx > innerHeight - 8) dy = Math.min(bottomPx - innerHeight + 16, topPx - margin);
      if (dy) scrollBy({ top: dy, behavior: reduceMQ.matches ? 'auto' : 'smooth' });
    }
    function setOpen(next, silent) {
      if (next === isOpen) return;
      isOpen = next;
      root.toggleAttribute('data-open', next);
      hit.setAttribute('aria-expanded', String(next));
      if (!peek) {
        if (!o.locked) filesEl.toggleAttribute('inert', !next);
        if (next) {
          document.addEventListener('keydown', onKey);
          document.addEventListener('pointerdown', onDown);
          reveal();
        } else {
          document.removeEventListener('keydown', onKey);
          document.removeEventListener('pointerdown', onDown);
        }
      }
      if (o.onOpenChange && !silent) o.onOpenChange(next, api);
    }
    hit.addEventListener('click', function () { setOpen(!isOpen); });
    if (peek) root.addEventListener('click', function (e) { if (!hit.contains(e.target)) hit.click(); }); // the whole folder is the target, not just the front glass
    filesEl.addEventListener('click', function (e) {
      var s = e.target.closest('.gf-sheet');
      if (!s || o.locked) return;
      var i = +s.getAttribute('data-i');
      if (s.getAttribute('href') === '#') e.preventDefault();
      if (o.onFileSelect) o.onFileSelect(files[i], i, e);
    });

    var api = {
      el: root,
      open: function () { setOpen(true); }, close: function () { setOpen(false); }, toggle: function () { setOpen(!isOpen); },
      set: function (v, silent) { setOpen(!!v, silent); }, focus: function () { hit.focus(); },
      get isOpen() { return isOpen; },
      setPill: function (text) { var p = root.querySelector('.gf-pill'); if (p) p.lastChild.textContent = disp(text); },
      setSelected: function (i) {
        filesEl.querySelectorAll('.gf-sheet').forEach(function (s) {
          var on = +s.getAttribute('data-i') === i;
          s.toggleAttribute('data-selected', on);
          if (on) s.setAttribute('aria-pressed', 'true'); else s.setAttribute('aria-pressed', 'false');
        });
      },
      patchFile: function (i, patch) {
        Object.assign(files[i], patch);
        var s = filesEl.querySelector('.gf-sheet[data-i="' + i + '"]');
        if (!s) return;
        var nm = s.querySelector('.gf-sheet-name');
        var ic = nm.querySelector('svg');
        if ('done' in patch) { if (patch.done && !ic) nm.insertAdjacentHTML('afterbegin', ICON.check); else if (!patch.done && ic) ic.remove(); }
        if ('meta' in patch) { var m = s.querySelector('.gf-sheet-meta'); if (m) m.textContent = disp(patch.meta); }
      },
      destroy: function () {
        setOpen(false);
        cleanups.forEach(function (c) { c(); });
        root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave);
        cancelAnimationFrame(raf); root.remove();
      }
    };
    return api;
  }

  // ---------------------------------------------------------------- shared glass panel: baked-blur art + smoked tint ----------
  // decorate(el, 'recipe', seed, w, h): prepends <canvas.g-art> (painted near the viewport, shared + cached, blurred once by a static CSS filter)
  // and <div.g-glass> (tint only; there is no backdrop-filter, so panels cost no live blur). Art 'none' = a solid smoked fill (data-glass-flat).
  // el gets .g-host (position, radius, clip, opaque base).
  var GCSS = [
    /* One live material per screen at most: the frost is baked. The art canvas is blurred ONCE (a static filter, rasterised once, not a backdrop-filter),
       and .g-glass is only the smoked tint + top highlight. Flat panels (no art) are a solid smoked fill. */
    '.g-host{position:relative;isolation:isolate;overflow:hidden;border-radius:var(--g-r,22px);background:#0c0c0f;box-shadow:0 0 0 1px rgba(255,255,255,.1),0 28px 44px -28px #000}',
    '.g-art{position:absolute;left:-24px;top:-24px;z-index:-2;width:calc(100% + 48px);height:calc(100% + 48px);object-fit:cover;opacity:0;transition:opacity 1s cubic-bezier(.2,0,0,1);pointer-events:none}',
    '.g-art[data-ready]{opacity:1;filter:blur(18px) saturate(1.4)}',
    '.g-glass{position:absolute;inset:0;z-index:-1;pointer-events:none;',
    'background:linear-gradient(180deg,rgba(18,16,26,.72) 0%,rgba(10,9,15,.84) 48%,rgba(7,6,10,.93) 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.2),inset 0 0 0 1px rgba(255,255,255,.04)}',
    '.g-host[data-glass-flat]{background:linear-gradient(180deg,#1b1924 0%,#0c0b11 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 0 0 1px rgba(255,255,255,.1),0 28px 44px -28px #000}',
    '@media (prefers-reduced-motion:reduce){.g-art{transition:none}}'
  ].join(String.fromCharCode(10));
  function decorate(el, art, seed, w, h) {
    if (!document.querySelector('style[data-glass-panels]')) {
      var st = document.createElement('style'); st.setAttribute('data-glass-panels', ''); st.textContent = GCSS; document.head.appendChild(st);
    }
    el.classList.add('g-host');
    if (!art || art === 'none') { el.setAttribute('data-glass-flat', ''); return null; }
    var g = document.createElement('div'); g.className = 'g-glass'; g.setAttribute('aria-hidden', 'true');
    el.prepend(g);
    var c = document.createElement('canvas'); c.className = 'g-art'; c.width = 1; c.height = 1; c.setAttribute('aria-hidden', 'true');
    el.prepend(c);
    new IntersectionObserver(function (es, io) {
      if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); bindArt(c, art, seed || 1, w || 364, h || 296, 1, 1); }
    }, { rootMargin: '300px' }).observe(el);
    return c;
  }
  // Apple-style spring (damping ratio, response in s) as a CSS linear() easing + a JS function, so animations and the
  // scroll that goes with them follow the same curve and can be re-targeted from their current value.
  function spring(zeta, response, n) {
    var w0 = 2 * Math.PI / response, wd = w0 * Math.sqrt(Math.max(1e-6, 1 - zeta * zeta)), T = zeta >= 1 ? 6 / w0 : 5 / (zeta * w0); // T: time to settle within ~1%
    var raw = function (x) {
      if (zeta >= 1) return 1 - Math.exp(-w0 * x) * (1 + w0 * x);
      return 1 - Math.exp(-zeta * w0 * x) * (Math.cos(wd * x) + (zeta * w0 / wd) * Math.sin(wd * x));
    }, end = raw(T);
    var f = function (t) { t = Math.min(1, Math.max(0, t)); return raw(t * T) / end; }; // normalised: exactly 1 at t=1, no last-frame jump
    var pts = []; n = n || 36;
    for (var i = 0; i <= n; i++) pts.push(i === n ? 1 : +f(i / n).toFixed(4));
    return { fn: f, duration: Math.round(T * 1000), css: 'linear(' + pts.join(',') + ')' };
  }

  window.GlassFolder = { decorate: decorate, spring: spring, mount: mountGlassFolder, paint: bindArt, recipes: RECIPES, quantDensity: quantDensity };
  window.mountGlassFolder = mountGlassFolder;
})();
