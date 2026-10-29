# The real SPA: public/aip/{index.html, app.js, app.css, fonts/, login-pin.webp}, derived from the same sources as the prototype.
#   python build.py --app     (runs the prototype pipeline first, then this)
# It takes the assembled prototype (../index.html) and swaps what the app must not have:
#   - the bundled lesson content (C20), the demo seed, the embedded PDFs, localStorage state  ->  app_state.js (API)
#   - hash routes, the comp bar, ?solo/?review/?today/?selftest and the other test hooks     ->  app_core.js (History API under /aip, login, logout, language, boot)
# The CSP is script-src 'self': app.js is an external file and the page has no inline script. Fonts are local (fetch_fonts.py).
import os, re, shutil, sys
H = os.path.dirname(os.path.abspath(__file__))
COMP = os.path.dirname(H)
OUT = os.path.normpath(os.path.join(COMP, '..', '..', 'public', 'aip'))
rd = lambda p: open(os.path.join(H, p), encoding='utf-8', newline='').read().replace('\r\n', '\n')
html = open(os.path.join(COMP, 'index.html'), encoding='utf-8', newline='').read().replace('\r\n', '\n')

# ---------------------------------------------------------------- split the prototype page
a = html.rindex('<script>'); b = html.rindex('</script>')
js = html[a + 8:b]; html = html[:a] + '<script src="/aip/app.js" defer></script>' + html[b + 9:]
css = re.search(r'<style>(.*?)</style>', html, re.S).group(1)
html = re.sub(r'<style>.*?</style>', '', html, count=1, flags=re.S)

def rep(s, old, new, cnt=1):
    assert s.count(old) == cnt, (s.count(old), old[:100])
    return s.replace(old, new)
def cut(s, start, end, keep_end=True):   # remove s[start .. end)
    i = s.index(start); j = s.index(end, i)
    return s[:i] + s[j:]
def sub1(s, pat, new, flags=re.S):
    out, n = re.subn(pat, lambda m: new, s, count=1, flags=flags); assert n == 1, pat[:80]; return out

# ---------------------------------------------------------------- HTML shell
html = sub1(html, r'<title>.*?</title>', '<title>AI Praktikum 3.0</title><link rel="icon" href="data:,">')
html = re.sub(r'<link rel="preconnect"[^>]*>\s*', '', html)
html = sub1(html, r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>', '<link rel="stylesheet" href="/aip/app.css">')
html = sub1(html, r'<nav class="comp-bar".*?</nav>\s*', '')
html = sub1(html, r'<!-- =+ f · TYPE.*?-->\s*<section class="screen" data-screen="type".*?</section>\s*', '')
html = sub1(html, r'<aside class="nl" id="nl".*?</aside>\s*', '')
html = re.sub(r'<p class="screen-tag"[^>]*>.*?</p>\s*', '', html, flags=re.S)
html = rep(html, '<body data-view="gate">', '<body class="solo" data-view="gate" data-booting>')
html = sub1(html, r'<picture class="gate-bg">.*?</picture>', '<picture class="gate-bg"><img src="/aip/login-pin.webp" alt="" width="1984" height="2400" fetchpriority="high"></picture>')
# the name menu shows the student's own data and logs out
html = rep(html, '<p class="nm-name">Student</p>', '<p class="nm-name" id="nm-name"></p>')
html = sub1(html, r'<dd class="mono">AIP-7KQ2XM</dd>', '<dd class="mono" id="nm-id"></dd>')
html = sub1(html, r'<dd data-i18n="menu.group_value">[^<]*</dd>', '<dd id="nm-group"></dd>')
html = sub1(html, r'<dd data-i18n="menu.mentor_value">[^<]*</dd>', '<dd id="nm-mentor"></dd>')
html = sub1(html, r'<dd data-i18n="menu.course_value">[^<]*</dd>', '<dd id="nm-course"></dd>')
html = rep(html, '<a class="nm-out" href="#/kirish" data-i18n="menu.logout">Chiqish</a>', '<button class="nm-out" type="button" id="logout" data-i18n="menu.logout">Chiqish</button>')
assert '<script>' not in html and 'onclick=' not in html and 'fonts.googleapis' not in html
assert not re.search(r'(?:src|href)="(?!/|#|data:|https://)', html), 'a relative url in the shell'

# ---------------------------------------------------------------- JS: content, state and test hooks out
def drop(s, name, repl=''):   # remove the prototype-only block //#PROTO:begin NAME .. //#PROTO:end NAME (markers live in the sources; each must exist exactly once)
    b, e = f'//#PROTO:begin {name}', f'//#PROTO:end {name}'
    assert s.count(b) == 1 and s.count(e) == 1, ('marker', name, s.count(b), s.count(e))
    i = s.index(b); j = s.index(e) + len(e); j += 1 if s[j:j + 1] == '\n' else 0
    return s[:i] + repl + s[j:]
for name in ('barconst', 'barclick', 'linkhandler', 'selftest', 'prepfile', 'filepage', 'reviewbar', 'setlang', 'i18nexport'):
    js = drop(js, name)
js = drop(js, 'popup', "const nl = {hidden: true, contains: () => false};   // stub: the page has no new-lesson popup (the server has no 'new since your last visit' signal yet)\nfunction showNewLesson(){}\nfunction hideNewLesson(){}\n")
assert '//#PROTO' not in js, 'an unpaired PROTO marker'
js = rep(js, "const q = new URLSearchParams(location.search);\nif (q.has('solo')) document.body.classList.add('solo');", "const q = new URLSearchParams();   // the app has no query switches")
# login: client-side format checks only, the server decides
assert js.count('function tryLogin(){') == 1 and js.count('function onGidInput') == 1
i = js.index('function tryLogin(){'); j = js.index('function onGidInput', i)
js = js[:i] + """function tryLogin(){
  if (gid.readOnly) return;   // a login is under way
  const c = idCode(gid.value);
  if (c.length > 6) return gateMsg(['gate.err.toolong'], 'err');
  if (c && !ID_CHARS.test(c)) return gateMsg(['gate.err.badchars'], 'err');
  if (c.length < 2) return gateMsg(['gate.err.short', {n: 6 - c.length, pl: 6 - c.length}], 'err');
  doLogin(c);
}
""" + js[j:]
js = rep(js, "  if (view === 'gate' && !document.getElementById('nl').hidden) document.getElementById('nl').hidden = true;\n", '')
js = sub1(js, r"  // review deep link: \?view=dars&tabtest.*?\n  if \(q\.has\('tabtest'\)\) tabs\[\+q\.get\('tabtest'\)\]\?\.click\(\);\n", '')
# language comes from the cookie the API reads
js = sub1(js, r"const LANG_KEY = 'aip3\.lang';\nlet LANG = \(\(\) => \{.*?\n  let v = null; try \{ v = localStorage\.getItem\(LANG_KEY\); \} catch \{\} return LANGS\.includes\(v\) \? v : 'uz'; \}\)\(\);", "let LANG = cookieLang();")
# data: no bundled content
js = sub1(js, r'/\*C20:begin\*/.*?/\*C20:end\*/', 'let C20 = {};   // filled from GET /me (app_state.js): the bundle holds no lesson text')
js = sub1(js, r'/\*PDF:begin\*/.*?/\*PDF:end\*/', '')
js = sub1(js, r'/\*SEED:begin\*/.*?/\*SEED:end\*/', '')
js = rep(js, 'let SAMPLE_FILES = true, C20_TRANSLATED = false;', 'let SAMPLE_FILES = false, C20_TRANSLATED = false;')   # course material stays Uzbek in every UI language (rules, leads, footnotes included)
js = sub1(js, r'let PREP = \{\n  items: \[.*?\n\};', 'let PREP = {items: []};   // from the API (lesson 0)')
# no lesson text in the bundle: the keys below hold course or lesson text (content, prep, lesson metadata, Vazifa material headings); the app registers them from the API
STRIP = re.compile(r'^(c\..*|prep\.(\d\..*|intro)|lesson\.\d\.(title|sub|lede|t\d+)|vz1\.(g1|g1_note|g1_hint|zip|g2|g2_note|g2_cta|g3|g3_note|sheet\.lede|sheet\.rule|more|more_sub|sheet\.meta))$')
assert js.count('// ===================== i18n: UZ') == 1 and js.count('// ===================== PROTOTYPE: data') == 1
i = js.index('// ===================== i18n: UZ'); j = js.index('// ===================== PROTOTYPE: data')
seg = js[i:j]; removed = [0]
def drop_key(m):
    if STRIP.match(m.group(1).split('#')[0]): removed[0] += 1; return ''
    return m.group(0)
seg = re.sub(r"'([\w.#]+)': '(?:[^'\\]|\\.)*',? ?", drop_key, seg)                      # the uz dictionary: packed single-quoted entries
seg = re.sub(r'\n[ \t]*"([\w.#]+)": "(?:[^"\\]|\\.)*",?(?=\n)', drop_key, seg)          # ru / en: one JSON-style entry per line
left = re.findall(r"""['"](c\.[\w.]+|prep\.\d\.[\w.]+|prep\.intro|lesson\.\d\.(?:title|sub|lede|t\d+))['"]\s*:""", seg)
assert removed[0] > 200 and not left, ('strip', removed[0], left[:5])
js = js[:i] + seg + js[j:]
js = sub1(js, r'//#STATE:begin.*?//#STATE:end\n', rd('app_state.js') + '\n')
js = sub1(js, r'//#GATE:begin.*?//#GATE:end\n', '')
js = rep(js, "const NSTAG = () => ` <span class=\"ns\">${T('common.namuna')}</span>`;", "const NSTAG = () => '';   // no sample markers in the real app")
# routing: real URLs
js = rep(js, "function go(v){ const h = ROUTE_OF[v] || v; if (location.hash === h) render(); else location.hash = h; }", "function go(v){ navTo(ROUTE_OF[v] || v); }")
js, n1 = re.subn(r"history\.replaceState\(null, '', ([^)]+)\)", r"replaceRoute(\1)", js)
n2 = js.count('location.hash'); js = js.replace('location.hash', 'ROUTE()')
n3 = js.count("location.replace(b.getAttribute('href'))"); js = js.replace("location.replace(b.getAttribute('href'))", "goReplace(b.dataset.r)")
n4 = js.count('location.replace('); js = js.replace('location.replace(', 'goReplace(')
assert n1 >= 3 and n2 >= 8 and n3 == 1 and n4 == 2, ('routing replaces', n1, n2, n3, n4)   # the counts of today's templates; the asserts below prove none is left
assert 'location.hash' not in js and 'location.replace(' not in js and "replaceState(null" not in js
js = rep(js, "window.addEventListener('hashchange', () => render());\n", '')
js = rep(js, """closest('a[href^="#/"]'); if (!a || a.dataset.slnav) return; mem[ROUTE()] = {y: scrollY, from: a.getAttribute('href')}""", """closest('a[data-r]'); if (!a || a.dataset.slnav) return; mem[ROUTE()] = {y: scrollY, from: a.dataset.r}""")
js = rep(js, """`#s-app a[href="${CSS.escape(m.from)}"]`""", """`#s-app a[data-r="${CSS.escape(m.from)}"]`""")
js = rep(js, "function resolve(r){\n", "function resolve(r){\n  if (!AUTH) return {view: 'gate'};   // signed out: every route is the gate (the address stays, so a login lands on it)\n  return resolve0(r);\n}\nfunction resolve0(r){\n")
js = rep(js, "  if (!a || a === 'kirish') return r.parts.length > 1 ? null : {view: 'gate'};\n  if (a === 'shrift') return {view: 'type'};\n  if (a === 'all') return {view: 'all'};\n", "  if (!a || a === 'kirish') return r.parts.length > 1 ? null : {redirect: '#/dastur'};\n")
js = rep(js, "  if (a === 'fayl') return has(FILES, b) && !c ? {view: 'app', page: filePage(b)} : null;\n", "")
# render: no review bar, no type screen
js = rep(js, """  document.querySelectorAll('[data-go]').forEach(x => x.setAttribute('aria-pressed', ROUTE_OF[x.dataset.go] === (ROUTE() || '#/kirish')));
  const jump = document.getElementById('jump'); if (jump) jump.value = ROUTES().includes(ROUTE()) ? ROUTE() : '';
  document.getElementById('u4').setAttribute('aria-pressed', S.u4());
  if (todaySel) todaySel.value = Object.keys(TODAY_PRESETS).find(k => isoMs(TODAY_PRESETS[k]) === TODAY) || '';
""", '')
js = rep(js, "  document.getElementById('s-type').classList.toggle('is-on', view === 'type' || view === 'all');\n", '')
js = rep(js, "  el.innerHTML = `<p class=\"screen-tag\">${esc(page.tag)}</p><div class=\"frame\"><div class=\"site\">${body}</div></div>`;\n  okina(el); markMissing(el);", "  el.innerHTML = `<div class=\"frame\"><div class=\"site\">${body}</div></div>`;\n  convertLinks(el); okina(el); markMissing(el);")
# slides: the real still and clip
js = sub1(js, r'<div class="slv-ph">.*?<span class="slv-note">\$\{T\(\'sl\.note\'\)\}</span></div>', '${slideStage(n, i)}')
# boot and the app's own routes/login/language
assert js.count('// ===================== boot =====================') == 1
i = js.index('// ===================== boot ====================='); js = js[:i] + rd('app_core.js')
left = [(bad, js[max(0, m.start() - 70):m.start() + 70].replace(chr(10), ' ')) for bad in ('TODAY', 'localStorage', 'SEED', 'aip3.demo', 'tabtest', 'runSelftest', "q.has('solo')", 'u4(', 'setU4', 'comp-bar', 'selftest') for m in re.finditer(re.escape(bad), js)]
if left: sys.exit('build_app: prototype leftovers in app.js: ' + repr(left[:5]))
assert 'let C20 = {}' in js

# ---------------------------------------------------------------- CSS: the prototype's, plus the fonts and the few app-only rules
fonts = open(os.path.join(H, 'fonts.css'), encoding='utf-8').read()
DEAD = re.compile(r'\.(comp-bar|screen-tag|nl|type-grid)\b')   # the comp bar, captions, the new-lesson popup and the type screen are not in the app
kept = [ln for ln in css.split('\n') if not ('{' in ln and DEAD.search(ln.split('{', 1)[0]))]
print('css: dropped', len(css.split('\n')) - len(kept), 'dead prototype rules')
css = fonts + '\n'.join(kept) + '\n' + rd('app_extra.css')
os.makedirs(os.path.join(OUT, 'fonts'), exist_ok=True)
open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8', newline='\n').write(html)
open(os.path.join(OUT, 'app.js'), 'w', encoding='utf-8', newline='\n').write(js)
open(os.path.join(OUT, 'app.css'), 'w', encoding='utf-8', newline='\n').write(css)
shutil.copyfile(os.path.join(COMP, 'login-pin.webp'), os.path.join(OUT, 'login-pin.webp'))
print('app:', OUT, '| index.html', len(html) // 1024, 'KB, app.js', len(js) // 1024, 'KB, app.css', len(css) // 1024, 'KB')
