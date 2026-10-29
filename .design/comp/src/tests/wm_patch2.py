import os
os.chdir(r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\src')
a = open('assemble.py', encoding='utf-8').read()
old = '<span class="wm-l" aria-hidden="true" data-c='
assert a.count(old) == 1
a = a.replace(old, '<span class="wm-l{" wm-s" if ch == " " else ""}" aria-hidden="true" data-c=')
open('assemble.py', 'w', encoding='utf-8').write(a)
s = open('index.pre-proto.html', encoding='utf-8').read()
i = s.index('.wm-g{grid-area:1/1;'); j = s.index('@media (prefers-reduced-motion:reduce){.wm-g{animation:none}}', i)
j2 = j + len('@media (prefers-reduced-motion:reduce){.wm-g{animation:none}}')
kf = []
for p in range(0, 101, 5):
    t = p / 100; e = t * t * (3 - 2 * t); w = round((300 + 500 * e) / 25) * 25
    kf.append(f'{p}%{{font-weight:{w}}}')
new = (".wm-g{grid-area:1/1;justify-self:center;animation:wm-wave 1.35s step-end infinite alternate;animation-delay:calc(var(--d) * .1s - 8s)}\n"
       "/* ease-in-out, 300 to 800, in 25-unit steps: every frame re-uses a handful of font instances (smooth weights would build 16 new ones per frame: ~30% of the main thread) */\n"
       "@keyframes wm-wave{" + ''.join(kf) + "}\n"
       ".wm-s .wm-g{animation:none}/* a space has nothing to weigh */\n"
       "@media (prefers-reduced-motion:reduce){.wm-g{animation:none}}")
s = s[:i] + new + s[j2:]
open('index.pre-proto.html', 'w', encoding='utf-8').write(s)
print('ok')
