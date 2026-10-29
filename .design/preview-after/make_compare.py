# Builds compare.html (before/after page for the approved audit looks) from shots/manifest.json.
import html
import json
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))
m = json.load(open('shots/manifest.json', encoding='utf-8'))
items = [e for e in m if e.get('files')]

NICE = {1: "Fill the empty lesson tabs", 2: "“Keyingi qadam” as the main action", 5: "Remove the background grid",
        6: "Use the desktop width on inner pages", 7: "Give lesson 4’s dark card an edge", 8: "Fix the library grid",
        10: "Smooth tab slide"}
WHY = {
    1: "Every tab gets one layout: a big numeral (the slide position) and the action bottom-right, instead of an empty slab.",
    2: "The one next action becomes the outline pill. On desktop it fills the empty right column; on phones it is full width. On a live-lesson day it sits under the ring.",
    5: "The faint 5% grid and floor gradient go, so the stage is pure black like the reference. It is subtle in a screenshot: look behind the ring and the cards.",
    6: "From 1200 px, sub-pages use the lesson page’s two-column split: header left, files right. Phones don’t change.",
    7: "A 1 px hairline follows the folder and tab shape, so the dark card stops disappearing into the black. The colour stays.",
    8: "Five cards fill a 2+3 grid with no hole, in lesson 2’s grey. On phones only the colour changes.",
    10: "Frames at 0, 100, 200 and 300 ms of a tab switch. The blur filter is off while the indicator moves, which removes the stutter on slower laptops and on Safari.",
}


def pair(f, w, label):
    b, a = f.get(f'before{w}'), f.get(f'after{w}')
    if not b:
        return ''
    e = html.escape(label)
    return (f'<div class="pair w{w}"><figure><figcaption>Before</figcaption><img src="shots/{b}" alt="Before: {e}, {w}px" loading="lazy"></figure>'
            f'<figure class="aft"><figcaption>After</figcaption><img src="shots/{a}" alt="After: {e}, {w}px" loading="lazy"></figure></div>')


secs, files = [], {}
for e in items:
    n = e['n']
    t = NICE.get(n, e['title'])
    body = ''
    for note, f in [('', e['files'])] + [(x['note'], x['files']) for x in e.get('extras', [])]:
        if note:
            body += f'<p class="sub">{html.escape(note)}</p>'
        body += pair(f, 1440, t) + pair(f, 390, t)
        for fn in f.values():
            files[f'shots/{fn}'] = f'shots/{fn}'
    secs.append(f'<section class="item" id="look-{n:02d}"><header><span class="no">{n:02d}</span><div><h2>{html.escape(t)}</h2>'
                f'<p class="where">{html.escape(e["route"])}</p><p class="why">{html.escape(WHY.get(n, ""))}</p></div></header>{body}</section>')

jump = ''.join(f'<a href="#look-{e["n"]:02d}">{e["n"]:02d}</a>' for e in items)
tpl = open('compare_tpl.html', encoding='utf-8').read()
open('compare.html', 'w', encoding='utf-8').write(tpl.replace('__JUMP__', jump).replace('__SECS__', '\n'.join(secs)))
json.dump(files, open('files_map.json', 'w'), indent=0)
print(len(files), 'images')
