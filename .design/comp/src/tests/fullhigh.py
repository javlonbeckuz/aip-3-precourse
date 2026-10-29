import sys, os
d = sys.argv[1]
a = '.solo .frame{max-width:none}/* every screen fills the window; --u is capped at the 1440 design size instead */'
b = a + '\n.solo .site{min-height:100svh}/* short screens still fill the window height: the background never stops mid-screen */'
for p in [os.path.expanduser('~/vs code/HEAD projects/praktikum3-precourse-platform/.design/comp/index.html'), os.path.join(d, 'index.pre-proto.html')]:
    s = open(p, encoding='utf-8').read(); assert s.count(a) == 1
    open(p, 'w', encoding='utf-8').write(s.replace(a, b)); print('ok', os.path.basename(p))
