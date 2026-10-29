import sys, os
d = sys.argv[1]
old = """<a href="#/dars/1/amaliyot"${active === 'a' ? ' aria-current="page"' : ''}>Amaliyot</a>"""
for p in [os.path.expanduser('~/vs code/HEAD projects/praktikum3-precourse-platform/.design/comp/index.html'), os.path.join(d, 'proto_app.js')]:
    s = open(p, encoding='utf-8').read(); n = s.count(old)
    open(p, 'w', encoding='utf-8').write(s.replace(old, '')); print(os.path.basename(p), 'removed', n)
