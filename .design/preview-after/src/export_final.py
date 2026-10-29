# Regenerate the single-file deliverable from comp/index.html (build.py runs this):  python export_final.py
import base64, re, os
comp = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))                          # .design/preview-after
out = os.path.join(comp, 'AI-Praktikum-3.0-after.html')   # PREVIEW COPY: never the real root final.html
ASSETS = os.path.join(os.path.dirname(comp), 'comp')   # login-pin.webp lives in the real comp folder
s = open(os.path.join(comp, 'index.html'), encoding='utf-8').read()
webp = base64.b64encode(open(os.path.join(ASSETS, 'login-pin.webp'), 'rb').read()).decode()
pic = re.search(r'<picture class="gate-bg">.*?</picture>', s, re.S).group(0)
img = re.search(r'<img [^>]*>', pic).group(0)
new = '<picture class="gate-bg">' + re.sub(r'src="[^"]*"', 'src="data:image/webp;base64,' + webp + '"', img) + '</picture>'
s = s.replace(pic, new)
TITLE = '<title>AI Praktikum · dizayn komp (reference match)</title>'
assert s.count(TITLE) == 1, 'the comp <title> changed: update export_final.py'
s = s.replace(TITLE, '<title>AI Praktikum 3.0</title>')
# the deliverable opens as the real site: no comp bar / screen captions (solo mode); ?review brings the review tools back
solo = "if (q.has('solo')) document.body.classList.add('solo');"
assert s.count(solo) == 1
s = s.replace(solo, "if (!q.has('review')) document.body.classList.add('solo');")
# nothing else may point at a local file (template-literal hrefs like ${href} are JS, not files)
left = [x for x in re.findall(r'(?:src|href|srcset)="([^"]+)"', s) if not re.match(r'(https?:|data:|#|mailto:|[$][{])', x)]
assert not left, left
open(out, 'w', encoding='utf-8').write(s)
print(out, round(os.path.getsize(out) / 1024), 'KB')
