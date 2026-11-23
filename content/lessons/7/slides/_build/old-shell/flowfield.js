/* ============================================================================
   FLOWFIELD.js  -  signature streamline engine for the "own-vercel-design" system
   ----------------------------------------------------------------------------
   Draws fluid-dynamics streamlines into a <canvas> by tracing a value-noise
   vector field. Pure code, deterministic (seeded). No image model, no deps.

   USAGE
     <canvas id="f" style="width:1376px;height:468px"></canvas>
     <script src="flowfield.js"></script>
     <script>
       FlowField.render(document.getElementById('f'), {
         mode:'split', T:0.92, freq:5.2, seed:11, dens:172, focus:0.78
       });
     </script>

   OPTIONS
     mode    one of: laminar | turbulent | split | ease | recover | break |
                     obstacle | dissolve | dual | vortex | converge
     T       turbulence strength 0..1   (0 = glassy laminar, 1 = chaotic)
     freq    spatial frequency of the noise (higher = finer, busier curls)
     seed    integer; same seed -> identical image
     dens    number of streamlines (edge modes). vortex/converge ignore it.
     focus   0..1 position of the accent (blue) streamlines along the field
     accent  accent colour (default '#5e8bff')
     base    base streamline colour as "r,g,b" (default '226,228,236')
     alpha   optional override for base line alpha

   SEMANTICS (pick a mode that matches the *idea* the page expresses)
     laminar   calm, ordered, resolved            -> ease, presence, focus
     turbulent agitated, chaotic, overactive       -> stress, noise, overload
     split     left calm / right chaotic           -> contrast of two states
     ease      wavy left, straightening right       -> relaxing into flow
     recover   chaotic left, laminar right          -> disturbance then recovery
     break     laminar with a burst in the middle   -> a local rupture / tension
     obstacle  flow parts around an unseen form     -> non-resistance, Wu-Wei
     dissolve  laminar lines trailing off downstream -> letting go / release
     dual      lively top band, inert bottom band   -> engaged vs indifferent
     vortex    spiral drawn inward to a bright core  -> constriction, fixation
     converge  radial lines pulled to a focal point  -> turning attention inward
   ========================================================================== */
(function (global) {
  'use strict';

  function smooth(a, b, x) { x = Math.min(1, Math.max(0, (x - a) / (b - a))); return x * x * (3 - 2 * x); }

  // seeded 2-octave value noise -> 0..1
  function makeNoise(seed) {
    function h(i, j) { var v = Math.sin(i * 127.1 + j * 311.7 + seed * 0.731) * 43758.5453; return v - Math.floor(v); }
    function vn(x, y) {
      var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
      var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      var a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1);
      return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
    }
    return function (x, y) {
      return vn(x, y) * 0.6 + vn(x * 2.07 + 5.1, y * 2.07 + 1.7) * 0.3 + vn(x * 4.19 + 9.3, y * 4.19 + 3.1) * 0.1;
    };
  }

  // clamp throughput modes so streamlines keep advancing and stay in the band
  var CLAMP = { turbulent: 1.15, split: 1.20, break: 1.28, recover: 1.20, ease: 1.18, dual: 1.05, laminar: 0.9, dissolve: 0.9 };

  function buildAngle(P) {
    var fbm = makeNoise(P.seed), TAU = Math.PI * 2, m = P.mode, cap = CLAMP[m];
    var raw = function (nx, ny) {
      switch (m) {
        case 'laminar': return (fbm(nx * 1.3, ny * 2.0) - 0.5) * 0.55 * P.T;
        case 'turbulent': {
          var f = P.freq;
          return (fbm(nx * f, ny * f) - 0.5) * TAU * 0.95 * P.T + (fbm(nx * f * 0.5 + 3, ny * f * 0.5 + 7) - 0.5) * Math.PI * 0.5 * P.T;
        }
        case 'split': {
          var t = smooth(0.40, 0.60, nx);
          var lam = (fbm(nx * 1.6, ny * 2.2) - 0.5) * 0.5 * 0.14;
          var turb = (fbm(nx * 5.2, ny * 5.0) - 0.5) * TAU * 0.9 * P.T;
          return lam * (1 - t) + turb * t;
        }
        case 'ease': {
          var ampE = 1 - smooth(0.08, 0.96, nx);
          return (fbm(nx * 3.0, ny * 3.2) - 0.5) * 2.4 * P.T * ampE;
        }
        case 'recover': {
          var ampR = 1 - smooth(0.14, 0.82, nx);
          return (fbm(nx * P.freq, ny * P.freq) - 0.5) * TAU * 0.9 * P.T * ampR;
        }
        case 'break': {
          var bump = Math.exp(-Math.pow((nx - 0.5) / 0.13, 2));
          var base = (fbm(nx * 2.0, ny * 2.4) - 0.5) * 0.3 * 0.5;
          var burst = (fbm(nx * 7.0 + 2, ny * 7.0) - 0.5) * TAU * 0.9 * P.T * bump;
          return base + burst;
        }
        case 'obstacle': {
          var dx = nx - 0.5, dy = ny - 0.5, r = Math.hypot(dx, dy), rc = 0.16;
          var push = Math.exp(-Math.pow((r - rc) / 0.17, 2)), dir = dy >= 0 ? 1 : -1;
          return dir * push * 0.95 + (fbm(nx * 2, ny * 2) - 0.5) * 0.14 * P.T;
        }
        case 'dissolve': return (fbm(nx * 1.6, ny * 2.0) - 0.5) * 0.55 * P.T;
        case 'dual':
          if (ny < 0.5) return (fbm(nx * 2.4, ny * 3.0) - 0.5) * 1.5 * 0.55;
          return (fbm(nx * 1.4, ny * 1.8) - 0.5) * 0.05;
        case 'vortex': {
          var vx = nx - 0.5, vy = ny - 0.5, vr = Math.hypot(vx, vy) + 1e-3;
          return Math.atan2(vy, vx) + Math.PI * 0.5 + 0.95 * (0.5 - Math.min(vr, 0.5)) + (fbm(nx * 4, ny * 4) - 0.5) * 0.6 * P.T;
        }
        case 'converge': {
          var cx = nx - 0.5, cy = ny - 0.5;
          return Math.atan2(-cy, -cx) + (fbm(nx * 4, ny * 4) - 0.5) * 0.5 * P.T;
        }
      }
      return 0;
    };
    if (cap === undefined) return raw;
    return function (nx, ny) { var a = raw(nx, ny); return a > cap ? cap : (a < -cap ? -cap : a); };
  }

  function render(canvas, opts) {
    var P = Object.assign({
      mode: 'laminar', T: 0.3, freq: 5, seed: 7, dens: 168, focus: 0.5,
      accent: '#5e8bff', base: '226,228,236', alpha: null
    }, opts || {});

    // logical size comes from CSS box; fall back to attribute size
    var rect = canvas.getBoundingClientRect();
    var W = Math.round(rect.width) || canvas.width || 1376;
    var H = Math.round(rect.height) || canvas.height || 468;
    var dpr = global.devicePixelRatio || 1;
    canvas.width = W * dpr; canvas.height = H * dpr;
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';

    var ang = buildAngle(P), step = 2.3;
    var gridMode = (P.mode === 'vortex' || P.mode === 'converge');
    var accRGB = hexToRgb(P.accent);

    function trace(x, y, dir, maxSteps) {
      var pts = [[x, y]];
      for (var s = 0; s < maxSteps; s++) {
        var a = ang(x / W, y / H);
        x += Math.cos(a) * step * dir; y += Math.sin(a) * step * dir;
        if (x < -30 || x > W + 30 || y < -50 || y > H + 50) break;
        pts.push([x, y]);
      }
      return pts;
    }
    function stroke(pts, color, lw, glow) {
      if (pts.length < 2) return;
      ctx.strokeStyle = color; ctx.lineWidth = lw;
      if (glow) { ctx.shadowColor = 'rgba(' + accRGB + ',0.8)'; ctx.shadowBlur = 7; } else { ctx.shadowBlur = 0; }
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
    }
    var baseCol = function (a) { return 'rgba(' + P.base + ',' + a + ')'; };
    var accCol = function (a) { return 'rgba(' + accRGB + ',' + a + ')'; };

    if (!gridMode) {
      var dens = P.dens, focusIdx = Math.round(P.focus * dens), jitter = makeNoise(P.seed + 99);
      for (var sIdx = 0; sIdx < dens; sIdx++) {
        var y0 = (sIdx + 0.5) / dens * H + (jitter(sIdx * 0.3, 0.5) - 0.5) * 4;
        var maxSteps = Math.ceil(W / step * 1.7);
        if (P.mode === 'dissolve') { var cut = 0.42 + jitter(sIdx, 0.7) * 0.45; maxSteps = Math.ceil(W * cut / step * 1.4); }
        var pts = trace(-12, y0, 1, maxSteps);
        var isAcc = Math.abs(sIdx - focusIdx) <= 2;
        var a = (P.alpha != null) ? P.alpha : 0.150;
        if (P.alpha == null) {
          if (P.mode === 'turbulent') a = 0.115;
          else if (P.mode === 'split') a = 0.135;
          else if (P.mode === 'break' || P.mode === 'recover') a = 0.125;
          else if (P.mode === 'dissolve') a = 0.20;
          else if (P.mode === 'laminar') a = 0.17;
        }
        if (P.mode === 'dual' && y0 > H * 0.5) { if (sIdx % 2 === 0) continue; a = 0.06; }
        if (isAcc) stroke(pts, accCol(0.9), 1.7, true);
        else stroke(pts, baseCol(a), 1.05, false);
      }
    } else {
      var cols = 58, rows = 24;
      for (var gx = 0; gx < cols; gx++) for (var gy = 0; gy < rows; gy++) {
        var x0 = (gx + 0.5) / cols * W, gy0 = (gy + 0.5) / rows * H;
        var fwd = trace(x0, gy0, 1, 150), bwd = trace(x0, gy0, -1, 150);
        var path = bwd.slice().reverse().concat(fwd.slice(1));
        var rr = Math.hypot(x0 / W - 0.5, gy0 / H - 0.5);
        if (rr < 0.12) stroke(path, accCol(0.85), 1.6, true);
        else stroke(path, baseCol(0.13), 1.0, false);
      }
    }
    ctx.shadowBlur = 0;
  }

  function hexToRgb(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? parseInt(m[1], 16) + ',' + parseInt(m[2], 16) + ',' + parseInt(m[3], 16) : '120,158,255';
  }

  global.FlowField = { render: render };
})(typeof window !== 'undefined' ? window : this);
