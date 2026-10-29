# Regenerate the single-file deliverable from comp/index.html:  python export_final.py
import base64, re, os
comp = r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp'
out = r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\AI-Praktikum-3.0-final.html'
s = open(os.path.join(comp, 'index.html'), encoding='utf-8').read()
webp = base64.b64encode(open(os.path.join(comp, 'login-pin.webp'), 'rb').read()).decode()
pic = re.search(r'<picture class="gate-bg">.*?</picture>', s, re.S).group(0)
img = re.search(r'<img [^>]*>', pic).group(0)
new = '<picture class="gate-bg">' + re.sub(r'src="[^"]*"', 'src="data:image/webp;base64,' + webp + '"', img) + '</picture>'
s = s.replace(pic, new)
s = s.replace('<title>AI Praktikum · dizayn komp (reference match)</title>', '<title>AI Praktikum 3.0</title>')
# the deliverable opens as the real site: no comp bar / screen captions (solo mode); ?review brings the review tools back
solo = "if (q.has('solo')) document.body.classList.add('solo');"
assert s.count(solo) == 1
s = s.replace(solo, "if (!q.has('review')) document.body.classList.add('solo');")
# nothing else may point at a local file (template-literal hrefs like ${href} are JS, not files)
left = [x for x in re.findall(r'(?:src|href|srcset)="([^"]+)"', s) if not re.match(r'(https?:|data:|#|mailto:|[$][{])', x)]
assert not left, left
open(out, 'w', encoding='utf-8').write(s)
print(out, round(os.path.getsize(out) / 1024), 'KB')
