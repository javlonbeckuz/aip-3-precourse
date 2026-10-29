import re, json, os
os.chdir(r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\src')
def rd(p): return open(p, encoding='utf-8').read()
def wr(p, s): open(p, 'w', encoding='utf-8').write(s)
# --- dictionary: course material keys become c.* (Uzbek only)
s = rd('proto_i18n.js')
KEYS = ['hw.free', 'am1.title', 'book.title', 'book.note', 'ex.extra_06', 'hermes.caution'] + ['sect.' + c for c in 'gtsro']
a = s.index('}, ru: /*RU*/'); b = s.index('}/*ENDEN*/')
head, mid, tail = s[:a], s[a:b], s[b:]
for k in KEYS:
    head = head.replace(f"'{k}':", f"'c.{k}':")
    tail = tail.replace(f"'{k}':", f"'c.{k}':")
old = r"""const T = (key, p) => { const [v, fb] = lookup(key, p); let s = fmt(esc(v), p, true).replace(/\n/g, '<br>');   // HTML text: the template and every parameter are escaped; "\n" -> <br>
  if (!fb && LANG !== 'uz') s = s.split(BOOK_UZ).join(`<span lang="uz-Latn">${BOOK_UZ}</span>`);
  return fb && isReview() ? MS + s + ME : s; };"""
new = r"""const T = (key, p) => { const [v, fb] = lookup(key, p); let tpl = esc(v);   // HTML text: the template and every parameter are escaped; "\n" -> <br>
  if (!fb && LANG !== 'uz') tpl = tpl.split(BOOK_UZ).join(`<span lang="uz-Latn">${BOOK_UZ}</span>`);   // the book's name quoted inside a translated sentence (parameters bring their own tags)
  const s = fmt(tpl, p, true).replace(/\n/g, '<br>');
  return fb && isReview() ? MS + s + ME : s; };"""
assert tail.count(old) == 1 or mid.count(old) == 1 or head.count(old) == 1, 'T'
s = head + mid + tail
s = s.replace(old, new)
s = s.replace("const cxh = (key, uz, f = esc)", "const cu = key => cx(key, I18N.uz[key]), cuh = key => cxh(key, I18N.uz[key]);   // course material kept in the dictionary as c.* (Uzbek in every language): plain text / HTML with the lang tag\nconst cxh = (key, uz, f = esc)")
wr('proto_i18n.js', s)
for l in ('ru', 'en'):
    d = json.load(open(f'i18n_{l}.json', encoding='utf-8'))
    for k in KEYS:
        assert k in d, (l, k); del d[k]
    json.dump(d, open(f'i18n_{l}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
s = rd('proto_data.js'); assert s.count("extra: 'ex.extra_06'") == 1; s = s.replace("extra: 'ex.extra_06'", "extra: 'c.ex.extra_06'"); wr('proto_data.js', s)
s = rd('proto_app.js')
def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (s.count(a), a); s = s.replace(a, b)
rep("const exExtraT = k => EX[k].extra ? t(EX[k].extra) : '';", "const exExtra = (k, h) => { const x = EX[k].extra; if (!x) return ''; return x.startsWith('c.') ? (h ? cuh(x) : cu(x)) : (h ? esc(t(x)) : t(x)); };   // c.* = a 2.0 label (Uzbek, tagged); otherwise our own wording")
rep("const sectName = s => t('sect.' + s.k);", "const sectName = s => cu('c.sect.' + s.k), sectNameH = s => cuh('c.sect.' + s.k);")
rep("const exSub = k => { if (k === '03') return exDone('03a') ? t('ex.sub_03a') : exDone('03b') ? t('ex.sub_03b') : ''; return exExtraT(k); };", "const exSubH = k => { if (k === '03') return esc(exDone('03a') ? t('ex.sub_03a') : exDone('03b') ? t('ex.sub_03b') : ''); return exExtra(k, true); };")
rep("esc(exSub(k))", "exSubH(k)", 2)
rep("esc(sectName(s)), '', {n: num2(s.a)", "sectNameH(s), '', {n: num2(s.a)")
rep("${esc(sectName(s))} · ${s.a}–${s.b}", "${sectNameH(s)} · ${s.a}–${s.b}")
rep("T('hw.free')", "cuh('c.hw.free')", 2)
rep("T('am1.title')", "cuh('c.am1.title')", 2)
rep("T('pane.kt.label', {title: t('book.title')})", "T('pane.kt.label', {title: HT(cuh('c.book.title'))})")
rep("T('book.note')", "cuh('c.book.note')", 2)
rep("${T('book.title')}. ", "${cuh('c.book.title')}. ")
rep("T('hermes.caution')", "cuh('c.hermes.caution')", 2)
rep("const extra = exExtraT(k), meta = extra ? t('ex.meta_extra', {num: e.num, extra}) : t('ex.meta', {num: e.num});", "const meta = EX[k].extra ? T('ex.meta_extra', {num: e.num, extra: HT(exExtra(k, true))}) : T('ex.meta', {num: e.num});")
rep("e.parent ? T('ex.back_pick') : T('ex.back'), esc(meta))", "e.parent ? T('ex.back_pick') : T('ex.back'), meta)")
wr('proto_app.js', s)
print('ok')
