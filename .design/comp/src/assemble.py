import re, sys
import os
H = os.path.dirname(os.path.abspath(__file__))        # .design/comp/src : every input lives here
p = os.path.join(os.path.dirname(H), 'index.html')    # output: .design/comp/index.html
rd = lambda n: open(os.path.join(H, n), encoding='utf-8').read()
s = rd('index.pre-proto.html')   # always rebuild from the pre-prototype comp
i18n, data, app = rd('proto_i18n.js'), rd('proto_data.js'), rd('proto_app.js')
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
.ef-hint{white-space:pre-line}/* 2.0 notes carry their own line breaks (numbered steps) */
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
.slv{display:grid;gap:16px;min-height:min(100svh,880px);padding:16px;grid-template-rows:auto auto auto;align-content:start;min-width:0}
.slv-bar{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0}
.slv-x,.slv-all{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 4px;font:500 14px/1 var(--font-body);white-space:nowrap}
.slv-all{padding:0 16px;border:1px solid var(--line-ui);border-radius:999px}
.slv-ct{min-width:0;font:500 16px/1 var(--font-mono)}.slv-ct:focus{outline:none}
.slv-stage{position:relative;display:grid;place-items:center;box-sizing:border-box;width:min(100%,calc((100svh - 160px) * 16 / 9));max-height:calc(100svh - 160px);aspect-ratio:16/9;margin-inline:auto;overflow:hidden;background:#0b0b0b;border:1px solid var(--line);border-radius:15px;cursor:pointer;user-select:none}
.slv-ph{position:absolute;inset:0;display:grid;align-content:center;gap:8px;justify-items:center;padding:12px;text-align:center}
.slv-num{font:400 clamp(44px,14cqi,160px)/.85 var(--font-display);font-stretch:125%;letter-spacing:-.03em}
.slv-t{font:500 clamp(13px,2.4cqi,22px)/1.3 var(--font-display);font-stretch:125%;text-transform:uppercase}
.slv-note{max-width:40ch;font-size:13px;color:var(--text-2)}
.slv-foot{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;min-width:0}
.slv-foot .play{white-space:nowrap;min-width:0}
.slv-btn{display:grid;place-items:center;width:52px;height:52px;border:1px solid var(--white);border-radius:50%}
.slv-btn.off{opacity:.3;border-color:var(--line-ui)}
.slv-seen{justify-self:center;display:inline-flex;align-items:center;gap:6px;font:500 14px/1 var(--font-body);text-transform:uppercase}
@container (max-width:359px){.slv-seen .sw{display:none}.slv-all{padding:0 12px;font-size:13px}.slv-x{gap:4px}.slv{padding:12px}}
.slv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:6px;margin-top:16px;max-height:50svh;overflow:auto}
.slv-grid a{display:grid;place-items:center;min-height:44px;border:1px solid var(--line-ui);border-radius:8px;font:500 13px/1 var(--font-mono)}
.slv-grid a[aria-current]{background:var(--white);color:var(--black)}
.sheet:has(.slv-grid){width:min(100%,560px)}
/* comp bar: jump menu + demo controls */
.comp-bar select{height:28px;max-width:260px;padding:0 6px;border:1px solid #2a2a2a;border-radius:4px;background:#050505;font:inherit;color:#9a9a9a}
'''
css += rd('prep_c.css')
css += rd('polish.css')
rep("@media (prefers-reduced-motion:reduce){*,*::before,*::after{transition-duration:0s!important;animation:none!important}}", css+"\n@media (prefers-reduced-motion:reduce){*,*::before,*::after{transition-duration:0s!important;animation:none!important}}")

# ---------- comp bar
a=s.index('<nav class="comp-bar"'); b=s.index('</nav>',a)+6
s=s[:a]+'''<nav class="comp-bar" aria-label="Komp ekranlari">
  <strong>AI Praktikum · komp</strong>
  <button type="button" data-go="gate" aria-pressed="true">Kirish</button>
  <button type="button" data-go="dastur" aria-pressed="false">Asosiy</button>
  <button type="button" data-go="dars" aria-pressed="false">01-dars</button>
  <button type="button" data-go="ex" aria-pressed="false">Boʻsh dars</button>
  <button type="button" data-go="type" aria-pressed="false">Shrift</button>
  <button type="button" data-go="all" aria-pressed="false">Hammasi</button>
  <select id="jump" aria-label="Ekranga oʻtish (barcha yoʻllar)"><option value="">Ekranga oʻtish…</option></select>
  <select id="today" aria-label="Demo sana"><option value="">Sana…</option><option value="before">Kursdan oldin · 14-noyabr</option><option value="day1">01-dars kuni · 21-noyabr</option><option value="story">04-dars · 5-dekabr</option><option value="over">Kurs tugadi · 5-yanvar</option></select>
  <button type="button" id="rst">Reset demo</button>
  <button type="button" id="w375" aria-pressed="false">375 px</button>
</nav>'''+s[b:]

# ---------- screens: dynamic app section replaces dastur / dars / ex
a=s.index('<!-- ================= b · MAIN'); b=s.index('<!-- ================= f · TYPE')
s=s[:a]+'<!-- ================= app · every route below #/dastur is rendered here from the data object ================= -->\n<section class="screen" data-screen="dastur" id="s-app"></section>\n\n'+s[b:]
rep('<section class="screen" data-screen="type" aria-labelledby="t-type">','<section class="screen" data-screen="type" id="s-type">')
rep('<a class="wordmark" href="#s-dastur">AI Praktikum 3.0</a>','<a class="wordmark" href="#/dastur">AI Praktikum 3.0</a>')
# login wordmark: one span per letter, --d = distance from the centre of the word (the CSS wave delays by it); the link keeps the whole text as its name
def wordmark(text):
    c = (len(text) - 1) / 2
    return ''.join(f'<span class="wm-l{" wm-s" if ch == " " else ""}" aria-hidden="true" data-c="{ch if ch != " " else chr(160)}" style="--d:{abs(i - c):.1f}"><span class="wm-g">{ch if ch != " " else chr(160)}</span></span>' for i, ch in enumerate(text))
rep('<a class="wordmark" href="#/dastur">AI Praktikum 3.0</a>', '<span class="wordmark" role="img" aria-label="AI Praktikum 3.0">' + wordmark('AI Praktikum 3.0') + '</span>')
rep('<a class="nm-out" href="#s-gate">Chiqish</a>','<a class="nm-out" href="#/kirish">Chiqish</a>')
rep('<a class="nl-go" href="#s-dars">','<a class="nl-go" href="#/dars/3">')

# ---------- script
a=s.index('// Display layer: Mona Sans lacks'); b=s.index('// Gate: takes')
core='''// Display layer: Mona Sans lacks U+02BB (ʻ) and U+02BC (ʼ); Golos + Martian lack U+02BB.
// Render the same-shaped U+2018/U+2019; copying uses the raw string (data-raw), never the display text. Runs on the page and again on every rendered route.
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
//#PROTO:begin barconst
const bar = document.querySelector('.comp-bar');
//#PROTO:end barconst
function closeMenu(){
  const m = document.getElementById('nmenu'); if (m.hidden) return;
  m.hidden = true; document.querySelectorAll('[aria-controls="nmenu"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
}
//#PROTO:begin barclick
bar.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.id === 'w375') return b.setAttribute('aria-pressed', document.body.classList.toggle('is-375'));
  if (b.id === 'rst') { S.reset(); try { localStorage.removeItem(NL_KEY); } catch {} return render(); }
  if (b.dataset.go) go(b.dataset.go);
});//#PROTO:end barclick

//#PROTO:begin linkhandler
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const h = a.getAttribute('href');
  if (h === '#') return e.preventDefault();
  if (/^#\\/dars\\/3(\\/|$|\\?)/.test(h) && a.closest('#s-app,#nl')) hideNewLesson(); // a lesson opened from home or from the popup = seen
  if (h === location.hash) { e.preventDefault(); render(); } // same route again: just re-render
});//#PROTO:end linkhandler


'''
s=s[:a]+core+s[b:]
rep("if (q.get('view')) go(q.get('view'));\n","")
# persistence + robustness in the prompt-done code
rep("  const c = li.querySelector('.chip'); c.classList.toggle('off', !on);","  if (li.dataset.key) S.tick(li.dataset.key, on);\n  const c = li.querySelector('.chip'); if (!c) return;\n  c.classList.toggle('off', !on);")
rep("  setDone(li, false); hideToast(); li.querySelector('.cp').focus();","  setDone(li, false); hideToast(); (li.querySelector('.cp') || li.querySelector('.chip')).focus(); refreshCounts();")
rep("    setDone(li, on); on ? showToast(li) : undoLi === li && hideToast();","    setDone(li, on); refreshCounts(); on ? showToast(li) : undoLi === li && hideToast();")
rep("  if (fresh) { setDone(li, true); showToast(li); }","  if (fresh) { setDone(li, true); refreshCounts(); showToast(li); }")
rep("  if (!force && nlSeen().includes(NL_LESSON)) return;", "  if (!force && (nlSeen().includes(NL_LESSON) || liveLesson() !== 3)) return;   // the popup is about lesson 3: only while it is live")
# selftest -> function
a=s.index("// ?selftest (with ?view=ex)"); b=s.index("// New-lesson popup")
st=s[a:b]
st=st.replace("if (q.has('selftest') && !navigator.clipboard) document.body.dataset.test = 'skipped: no navigator.clipboard (non-secure origin)';\nelse if (q.has('selftest')) {","function runSelftest(){\nif (!q.has('selftest')) return;\nif (!navigator.clipboard) document.body.dataset.test = 'skipped: no navigator.clipboard (non-secure origin)';\nelse {")
st=st.replace("  li.querySelector('.cp').click();","  if (li.classList.contains('done')) setDone(li, false); // start from a known state (ticks persist between page loads)\n  li.querySelector('.cp').click();")
assert "known state" in st
st="//#PROTO:begin selftest\n"+st.rstrip()+"\n}\n//#PROTO:end selftest\n\n"
s=s[:a]+st+s[b:]
rep("// New-lesson popup (top-left)", "//#PROTO:begin popup\n// New-lesson popup (top-left)")
rep("// Name menu (ID, group", "//#PROTO:end popup\n// Name menu (ID, group")
rep("if (q.has('newlesson') && document.body.dataset.view !== 'gate') showNewLesson(true);\n","")
# tabs IIFE -> initGT(root)
a=s.index("// Dars folder tabs: slide the goo indicator"); b=s.index("// Login wordmark:")
t=s[a:b]
t = rd('tabs.js').rstrip() + chr(10)   # folder tabs: one crossfade, no awaited exit, no goo filter while the indicator slides (audit 2026-10-19)
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
