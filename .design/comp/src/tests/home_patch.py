import os, json
os.chdir(r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\src')
def edit(path, pairs):
    s = open(path, encoding='utf-8').read()
    for a, b in pairs:
        assert s.count(a) == 1, (path, a[:70], s.count(a))
        s = s.replace(a, b)
    open(path, 'w', encoding='utf-8').write(s)
edit('index.pre-proto.html', [
    (".nav{display:grid;grid-template-columns:1fr auto auto;", ".nav{display:grid;grid-template-columns:1fr auto 1fr;"),
    (".nav-links{display:none}", ".nav-links{display:flex}\n.home-btn{display:grid;place-items:center;width:44px;height:44px;border:1px solid var(--white);border-radius:50%;color:var(--white);transition:background .15s,color .15s}/* round home button: same outline circle as the other circle buttons */\n.home-btn:hover,.home-btn[aria-current]{background:var(--white);color:var(--black)}/* current page = filled */"),
    (".nav-r{display:flex;align-items:center;gap:8px}", ".nav-r{display:flex;align-items:center;justify-content:flex-end;gap:8px}"),
    ("  .nav{grid-template-columns:1fr auto 1fr;height:calc(120 * var(--u));", "  .nav{height:calc(120 * var(--u));"),
    ("  .nav-links{display:flex;gap:calc(48 * var(--u));font-size:max(15px,calc(18 * var(--u)))}\n  .nav-links a{padding:11px 0;transition:opacity .15s}.nav-links a:hover{opacity:.7}\n  .nav-links a[aria-current]{text-decoration:underline;text-underline-offset:8px;text-decoration-thickness:1px}\n", "  .home-btn{width:max(44px,calc(48 * var(--u)));height:max(44px,calc(48 * var(--u)))}\n"),
    ("  <symbol id=\"i-menu\"", "  <symbol id=\"i-home\" viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3.2 9.4L10 3.4l6.8 6V16a.6.6 0 0 1-.6.6h-3.4v-4.6H7.2v4.6H3.8a.6.6 0 0 1-.6-.6z\"/></symbol>\n  <symbol id=\"i-menu\""),
])
edit('proto_app.js', [
    ("<nav class=\"nav-links\" aria-label=\"${esc(t('nav.label'))}\"><a href=\"#/dastur\"${active === 'd' ? ' aria-current=\"page\"' : ''}>${T('nav.home')}</a></nav>",
     "<nav class=\"nav-links\" aria-label=\"${esc(t('nav.label'))}\"><a class=\"home-btn\" href=\"#/dastur\" aria-label=\"${esc(t('nav.homebtn'))}\" title=\"${esc(t('nav.homebtn'))}\"${active === 'home' ? ' aria-current=\"page\"' : ''}>${I('home', 20)}</a></nav>"),
    ("html: nav('d') + `\n    <div class=\"page-head main-head", "html: nav('home') + `\n    <div class=\"page-head main-head"),
])
edit('proto_i18n.js', [
    ("'nav.label': 'Boʻlimlar', 'nav.home': 'Dastur',", "'nav.label': 'Boʻlimlar', 'nav.home': 'Dastur', 'nav.homebtn': 'Bosh sahifa',"),
    ("'nav.label': 'aria-label of the top navigation', ", "'nav.label': 'aria-label of the top navigation', 'nav.homebtn': 'aria-label and tooltip (not visible text) of the round home button at the top left', "),
])
for lang, txt in (('ru', 'Главная'), ('en', 'Home')):
    p = f'i18n_{lang}.json'
    d = json.load(open(p, encoding='utf-8'))
    out = {}
    for k, v in d.items():
        out[k] = v
        if k == 'nav.home': out['nav.homebtn'] = txt
    assert 'nav.homebtn' in out
    json.dump(out, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok')
