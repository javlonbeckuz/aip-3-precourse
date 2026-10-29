import re, sys
SP=r'C:\Users\User\AppData\Local\Temp\claude\C--Users-User-vs-code-HEAD-projects-praktikum3-precourse-platform\d552fe71-64f5-44b0-80fb-64ee4d82d435\scratchpad'
p=r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\index.html'
s=open(SP+r'\index.pre-proto.html',encoding='utf-8').read()   # always rebuild from the pre-prototype comp
i18n=open(SP+r'\proto_i18n.js',encoding='utf-8').read(); data=open(SP+r'\proto_data.js',encoding='utf-8').read(); app=open(SP+r'\proto_app.js',encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(s.count(old),old[:90])
    s=s.replace(old,new)

# ---------- CSS
css=r'''
/* ===== prototype additions (routes, exercise/vazifa/library/hermes/slide/file screens) ===== */
.ns{display:inline-block;margin-left:6px;padding:1px 8px;border:1px solid currentColor;border-radius:999px;font:500 11px/1.4 var(--font-body);text-transform:uppercase;letter-spacing:.02em;vertical-align:middle;white-space:nowrap}/* "namuna" = placeholder content that 2.0 never showed */
.s1 .tx{white-space:pre-line}
.rules{display:grid;gap:6px;margin:12px 0 24px;padding-left:22px;list-style:decimal;font-size:15px;color:var(--text-2)}
.grp+.grp{margin-top:24px}
.ex-files .grp{display:block}
.s1-end{display:flex;flex-wrap:wrap;align-items:center;gap:16px;margin-top:24px}
.endb{min-height:44px;padding:0 18px;border:1.5px solid var(--ink);border-radius:999px;font:500 15px/1 var(--font-body);color:var(--ink)}
.endb[aria-pressed="true"]{background:var(--ink);color:var(--lilac)}
.endb.dark{border-color:var(--white);color:var(--white);margin-top:20px}.endb.dark[aria-pressed="true"]{background:var(--white);color:var(--black)}
.s1 .steps,.steps{display:grid;gap:4px;margin:2px 0 0;padding-left:20px;list-style:decimal;font-size:15px}
.s1 .steps li{display:list-item;padding:0;border:0;min-height:0;grid-template-columns:none}
.s1-pdf.quiet{font-weight:400}
.s1 .body>.s1-pdf{margin-top:0}
.s1 .body>.steps{border-top:0;margin-top:2px;max-width:none}
.headline.long{font-size:clamp(24px,7.4cqi,34px)}
@container (min-width:900px){.headline.long{font-size:calc(52 * var(--u));line-height:calc(66 * var(--u))}}
.s1-more{margin-top:24px;border-top:1px solid rgb(0 0 0 / .3)}
.s1-more>summary{display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px;min-height:56px;font:500 15px/1.3 var(--font-body);cursor:pointer;list-style:none}
.s1-more>summary::-webkit-details-marker{display:none}.s1-sub{font-weight:400;color:var(--ink-2)}
.s1 details>summary{list-style:none;cursor:pointer}.s1 details>summary::-webkit-details-marker{display:none}
.s1 details>summary .tt::after{content:"+";margin-left:10px;font-weight:400}.s1 details[open]>summary .tt::after{content:"–"}
.s1 li.done details>summary .tt::before{content:"✓ ";font-weight:600}
.lk2{text-decoration:underline;text-underline-offset:4px}
.xtag.big{font-size:.5em;padding:.2em .8em;vertical-align:middle}
.goal{color:var(--text-1)}.caution{color:var(--text-1)}
.ef-hint b{font-weight:600;color:var(--text-1)}
.lib-bar{display:grid;gap:12px;margin:16px 0 0;max-width:760px}
.lib-bar input{height:48px;padding:0 16px;border:1px solid var(--line-ui);border-radius:999px;background:transparent;color:var(--white);font:400 16px var(--font-body)}
.lib-bar input::placeholder{color:var(--text-2)}
.lib-chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px}
.lib-chip{flex:none;min-height:44px;padding:0 16px;border:1px solid var(--line-ui);border-radius:999px;font:500 13px/1 var(--font-body);white-space:nowrap;color:var(--text-1)}
.lib-chip[aria-pressed="true"]{background:var(--white);color:var(--black);border-color:var(--white)}
.lib-n{min-height:20px;font-size:14px;color:var(--text-2)}
.lib-empty{margin-top:16px;font-size:16px}
.s1 li[hidden]{display:none}
/* slide viewer */
.slv{display:grid;gap:16px;min-height:min(100svh,880px);padding:16px;grid-template-rows:auto 1fr auto}
.slv-bar{display:flex;align-items:center;justify-content:space-between;gap:12px}
.slv-x,.slv-all{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 4px;font:500 14px/1 var(--font-body)}
.slv-all{padding:0 16px;border:1px solid var(--line-ui);border-radius:999px}
.slv-ct{font:500 16px/1 var(--font-mono)}.slv-ct:focus{outline:none}
.slv-stage{display:grid;place-items:center;min-height:300px;background:#0b0b0b;border:1px solid var(--line);border-radius:15px;cursor:pointer;user-select:none}
.slv-ph{display:grid;gap:12px;justify-items:center;padding:24px;text-align:center}
.slv-num{font:400 clamp(80px,22cqi,200px)/.85 var(--font-display);font-stretch:125%;letter-spacing:-.03em}
.slv-t{font:500 clamp(15px,3cqi,22px)/1.3 var(--font-display);font-stretch:125%;text-transform:uppercase}
.slv-note{max-width:40ch;font-size:14px;color:var(--text-2)}
.slv-foot{display:flex;align-items:center;justify-content:space-between;gap:12px}
.slv-btn{display:grid;place-items:center;width:52px;height:52px;border:1px solid var(--white);border-radius:50%}
.slv-btn.off{opacity:.3;border-color:var(--line-ui)}
.slv-seen{display:inline-flex;align-items:center;gap:6px;font:500 14px/1 var(--font-body);text-transform:uppercase}
.slv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:6px;margin-top:16px;max-height:50svh;overflow:auto}
.slv-grid a{display:grid;place-items:center;min-height:44px;border:1px solid var(--line-ui);border-radius:8px;font:500 13px/1 var(--font-mono)}
.slv-grid a[aria-current]{background:var(--white);color:var(--black)}
.sheet:has(.slv-grid){width:min(100%,560px)}
/* comp bar: jump menu + demo controls */
.comp-bar select{height:28px;max-width:260px;padding:0 6px;border:1px solid #2a2a2a;border-radius:4px;background:#050505;font:inherit;color:#9a9a9a}
'''
rep("@media (prefers-reduced-motion:reduce){*,*::before,*::after{transition-duration:0s!important;animation:none!important}}", css+"\n@media (prefers-reduced-motion:reduce){*,*::before,*::after{transition-duration:0s!important;animation:none!important}}")

# ---------- comp bar
a=s.index('<nav class="comp-bar"'); b=s.index('</nav>',a)+6
s=s[:a]+'''<nav class="comp-bar" aria-label="Komp ekranlari">
  <strong>AI Praktikum · komp</strong>
  <button type="button" data-go="gate" aria-pressed="true">Kirish</button>
  <button type="button" data-go="dastur" aria-pressed="false">Asosiy</button>
  <button type="button" data-go="dars" aria-pressed="false">1-dars</button>
  <button type="button" data-go="ex" aria-pressed="false">Mashq 06</button>
  <button type="button" data-go="type" aria-pressed="false">Shrift</button>
  <button type="button" data-go="all" aria-pressed="false">Hammasi</button>
  <select id="jump" aria-label="Ekranga oʻtish (barcha yoʻllar)"><option value="">Ekranga oʻtish…</option></select>
  <button type="button" id="u4" aria-pressed="false">4-dars: ochish</button>
  <button type="button" id="rst">Reset demo</button>
  <button type="button" id="w375" aria-pressed="false">375 px</button>
</nav>'''+s[b:]

# ---------- screens: dynamic app section replaces dastur / dars / ex
a=s.index('<!-- ================= b · MAIN'); b=s.index('<!-- ================= f · TYPE')
s=s[:a]+'<!-- ================= app · every route below #/dastur is rendered here from the data object ================= -->\n<section class="screen" data-screen="dastur" id="s-app" aria-label="Ilova"></section>\n\n'+s[b:]
rep('<section class="screen" data-screen="type" aria-labelledby="t-type">','<section class="screen" data-screen="type" id="s-type" aria-labelledby="t-type">')
rep('<a class="wordmark" href="#s-dastur">AI Praktikum 3.0</a>','<a class="wordmark" href="#/dastur">AI Praktikum 3.0</a>')
rep('<a class="nm-out" href="#s-gate">Chiqish</a>','<a class="nm-out" href="#/kirish">Chiqish</a>')
rep('<a class="nl-go" href="#s-dars">','<a class="nl-go" href="#/dars/3">')

# ---------- script
a=s.index('// Display layer: Mona Sans lacks'); b=s.index('// Gate: takes')
core='''// Display layer: Mona Sans lacks U+02BB (ʻ) and U+02BC (ʼ); Golos + Martian lack U+02BB.
// Render the same-shaped U+2018/U+2019; copy maps back (production: copy from raw data). Runs on the page and again on every rendered route.
function okina(root){
  const map = s => s.replace(/ʻ/g,'‘').replace(/ʼ/g,'’');
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode: n => /^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT});
  for (let n; (n = w.nextNode());) if (/[ʻʼ]/.test(n.nodeValue)) n.nodeValue = map(n.nodeValue);
  root.querySelectorAll('[aria-label],[placeholder],[title]').forEach(el => {
    for (const a of ['aria-label','placeholder','title']) if (el.hasAttribute(a)) el.setAttribute(a, map(el.getAttribute(a)));
  });
}
okina(document.body); document.title = document.title.replace(/ʻ/g,'‘').replace(/ʼ/g,'’');

// Views are hash routes (#/dastur, #/dars/1, ...): see the router at the end. Here: the comp bar and the in-page link rules.
const bar = document.querySelector('.comp-bar');
function closeMenu(){
  const m = document.getElementById('nmenu'); if (m.hidden) return;
  m.hidden = true; document.querySelectorAll('[aria-controls="nmenu"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
}
bar.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.id === 'w375') return b.setAttribute('aria-pressed', document.body.classList.toggle('is-375'));
  if (b.id === 'u4') { S.setU4(!S.u4()); return render(); }
  if (b.id === 'rst') { S.reset(); try { localStorage.removeItem(NL_KEY); } catch {} return render(); }
  if (b.dataset.go) go(b.dataset.go);
});
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const h = a.getAttribute('href');
  if (h === '#') return e.preventDefault();
  if (/^#\\/dars\\/3(\\/|$|\\?)/.test(h) && a.closest('#s-app,#nl')) hideNewLesson(); // a lesson opened from home or from the popup = seen
  if (h === location.hash) { e.preventDefault(); render(); } // same route again: just re-render
});

'''
s=s[:a]+core+s[b:]
rep("if (q.get('view')) go(q.get('view'));\n","")
# persistence + robustness in the prompt-done code
rep("  const c = li.querySelector('.chip'); c.classList.toggle('off', !on);","  if (li.dataset.key) S.tick(li.dataset.key, on);\n  const c = li.querySelector('.chip'); c.classList.toggle('off', !on);")
rep("  setDone(li, false); hideToast(); li.querySelector('.cp').focus();","  setDone(li, false); hideToast(); (li.querySelector('.cp') || li.querySelector('.chip')).focus(); refreshCounts();")
rep("    setDone(li, on); on ? showToast(li) : undoLi === li && hideToast();","    setDone(li, on); refreshCounts(); on ? showToast(li) : undoLi === li && hideToast();")
rep("  if (fresh) { setDone(li, true); showToast(li); }","  if (fresh) { setDone(li, true); refreshCounts(); showToast(li); }")
# selftest -> function
a=s.index("// ?selftest (with ?view=ex)"); b=s.index("// New-lesson popup")
st=s[a:b]
st=st.replace("if (q.has('selftest') && !navigator.clipboard) document.body.dataset.test = 'skipped: no navigator.clipboard (non-secure origin)';\nelse if (q.has('selftest')) {","function runSelftest(){\nif (!q.has('selftest')) return;\nif (!navigator.clipboard) document.body.dataset.test = 'skipped: no navigator.clipboard (non-secure origin)';\nelse {")
st=st.replace("  li.querySelector('.cp').click();","  if (li.classList.contains('done')) setDone(li, false); // start from a known state (ticks persist between page loads)\n  li.querySelector('.cp').click();")
assert "known state" in st
st=st.rstrip()+"\n}\n\n"
s=s[:a]+st+s[b:]
rep("if (q.has('newlesson') && document.body.dataset.view !== 'gate') showNewLesson(true);\n","")
# tabs IIFE -> initGT(root)
a=s.index("// Dars folder tabs: slide the goo indicator"); b=s.index("// Login wordmark:")
t=s[a:b]
t=t.replace("(function(){\n  const root = document.getElementById('dg'); if (!root) return;","function initGT(root){")
t=t.rstrip()
assert t.endswith("})();")
t=t[:-5]+"}\n"
t=t.replace("(0 Slaydlar, 1 Amaliyot, 2 Vazifa)","(index of the tab: 0 first ... in lesson 1: Slaydlar, Amaliyot, Vazifa)")
s=s[:a]+t+"\n"+i18n+"\n"+data+"\n"+app+"\n"+s[b:]
# boot
boot='''
// ===================== boot =====================
(function boot(){
  const jump = document.getElementById('jump');
  jump.append(...ROUTES().map(h => Object.assign(document.createElement('option'), {value: h, textContent: h.replace('#/', '')})));
  jump.addEventListener('change', () => { if (jump.value) location.hash = jump.value; });
  if (!location.hash) history.replaceState(null, '', ROUTE_OF[q.get('view')] || '#/kirish'); // ?view=dastur|dars|ex|type|all|gate (review links)
  render();
  if (q.has('newlesson') && document.body.dataset.view !== 'gate') showNewLesson(true);
  runSelftest();
})();
'''
a=s.rindex('</script>')
s=s[:a]+boot+s[a:]
import assemble_post
s=assemble_post.post(s)
open(p,'w',encoding='utf-8').write(s)
print('assembled', len(s))
