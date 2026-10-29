import sys, os
d = sys.argv[1]
pairs = [
 ('@container (min-width:900px){.site{--u:calc(100cqi / 1440)}}',
  '@container (min-width:900px){.site{--u:calc(min(100cqi, 1440px) / 1440)}}/* full-bleed, but sizes stop growing past their 1440 design size */'),
 ('.solo [data-screen="gate"] .frame{max-width:none}/* only the login photo is full-bleed; the other screens keep the 1440 cap, so --u stops growing on wide monitors */',
  '.solo .frame{max-width:none}/* every screen fills the window; --u is capped at the 1440 design size instead */'),
]
for p in [os.path.expanduser('~/vs code/HEAD projects/praktikum3-precourse-platform/.design/comp/index.html'), os.path.join(d, 'index.pre-proto.html')]:
    s = open(p, encoding='utf-8').read()
    for a, b in pairs:
        assert s.count(a) == 1, (os.path.basename(p), a[:50])
        s = s.replace(a, b)
    open(p, 'w', encoding='utf-8').write(s); print('ok', os.path.basename(p))
