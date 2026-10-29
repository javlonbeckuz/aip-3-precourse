import json, re, sys
from PIL import Image
import numpy as np
SP = 'C:/Users/User/AppData/Local/Temp/claude/C--Users-User-vs-code-HEAD-projects-praktikum3-precourse-platform/d552fe71-64f5-44b0-80fb-64ee4d82d435/scratchpad'
MODE = sys.argv[1] if len(sys.argv) > 1 else 'out'
d = json.load(open(SP + '/glow/contrast_' + MODE + '.json', encoding='utf-8'))
def lum(c):
    c = np.array(c) / 255.0; c = np.where(c <= .03928, c / 12.92, ((c + .055) / 1.055) ** 2.4); return .2126 * c[..., 0] + .7152 * c[..., 1] + .0722 * c[..., 2]
bad = {}; allx = []
for e in d:
    im = np.array(Image.open(SP + '/' + e['name'] + '.png').convert('RGB')).astype(float)
    for x in e['els']:
        m = re.match(r'rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)', x['c'])
        if not m: continue
        col = np.array([float(m.group(i)) for i in (1, 2, 3)]); a = float(m.group(4) or 1)
        x0, x1, y0, y1 = [int(round(v)) for v in (x['x0'], x['x1'], x['y0'], x['y1'])]
        reg = im[max(0, y0):y1, max(0, x0):x1]
        if reg.size == 0: continue
        L = lum(reg); i = np.unravel_index(L.argmax(), L.shape); bg = reg[i]
        if MODE == 'in':
            # worst case inside a card: the bg pixel farthest in luminance from the text colour
            lt = lum(col); i = np.unravel_index(np.abs(L - lt).argmin(), L.shape); bg = reg[i]
        a = a * x.get('op', 1)
        fg = col * a + bg * (1 - a)
        l1, l2 = lum(fg), lum(bg); cr = (max(l1, l2) + .05) / (min(l1, l2) + .05)
        allx.append((e['W'], e['L'], e['r'], x['cls'], x['t'], cr, [int(v) for v in bg], x['c']))
        if cr < 4.5: bad.setdefault((e['W'], e['L']), []).append((round(float(cr), 2), e['r'], x['cls'], x['t'], x['c'], [int(v) for v in bg]))
for k, v in bad.items():
    print(k, len(v))
    for i in sorted(v)[:10]: print('  ', i)
for W in (1440, 390, 320):
    cs = [z[5] for z in allx if z[0] == W]; print(W, 'samples', len(cs), 'min', round(float(min(cs)), 2))
mn = min(allx, key=lambda z: z[5]); print('overall min', mn)
