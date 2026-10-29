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

// ---- Background Paths (user request 2026-10-19; vanilla port of the React/framer-motion component): two layers of 36 curves, drawn slowly along their paths.
// pathLength="1" lets CSS animate stroke-dasharray / dashoffset; the duration of every path is seeded (20-30s), so the build is deterministic.
function initBgPaths(){
  if (document.querySelector('.bgp')) return;
  const NS = 'http://www.w3.org/2000/svg', TICK = 12, step = matchMedia('(max-width:599px)').matches ? 3 : 1;   // all 36 paths on desktop, every 3rd on phones: see the cost numbers in tokens.md
  const rnd = seed => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const box = document.createElement('div'); box.className = 'bgp'; box.setAttribute('aria-hidden', 'true');
  for (const p of [1, -1]) {
    const svg = document.createElementNS(NS, 'svg'), r = rnd(p > 0 ? 1234 : 5678);
    svg.setAttribute('viewBox', '0 0 696 316'); svg.setAttribute('fill', 'none'); svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    for (let i = 0; i < 36; i++) {
      const dur = 20 + r() * 10, len = 0.3 + r() * 0.7; if (i % step) continue;   // the random stream advances for every i, so the kept paths look the same on every device
      const a = 380 - i * 5 * p, b = 189 + i * 6, c = 312 - i * 5 * p, d = 216 - i * 6, e = 152 - i * 5 * p, f = 343 - i * 6, g = 616 - i * 5 * p, h = 470 - i * 6, k = 684 - i * 5 * p, m = 875 - i * 6;
      const el = document.createElementNS(NS, 'path');
      el.setAttribute('d', `M-${a} -${b}C-${a} -${b} -${c} ${d} ${e} ${f}C${g} ${h} ${k} ${m} ${k} ${m}`);
      el.setAttribute('stroke', 'currentColor'); el.setAttribute('stroke-width', (0.5 + i * 0.03).toFixed(2)); el.setAttribute('stroke-opacity', (0.1 + i * 0.03).toFixed(2));
      el.setAttribute('pathLength', '1'); el.style.strokeDasharray = `${len.toFixed(2)} 1`; const n = Math.round(dur * TICK); el.style.animationDuration = (n / TICK) + 's'; el.style.animationTimingFunction = `steps(${n})`;   // every path steps on one shared clock: TICK repaints a second (smooth linear cost 2x the main thread)
      svg.append(el);
    }
    box.append(svg);
  }
  document.body.prepend(box);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBgPaths); else initBgPaths();
