# One-off: downloads the Google Fonts the design uses and writes them as local files, because the portal's CSP only allows fonts from 'self'.
#   python fetch_fonts.py   ->  ../../../public/aip/fonts/*.woff2  +  fonts.css (relative url(fonts/...), included by build_app.py)
# The woff2 files are committed; run this again only when the font list changes.
import os, re, urllib.request, hashlib
H = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.normpath(os.path.join(H, '..', '..', '..', 'public', 'aip', 'fonts')); os.makedirs(OUT, exist_ok=True)
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36'
URL = 'https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,200..900&family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&family=Golos+Text:wght@400;500;600&family=Martian+Mono:wdth,wght@87.5..100,400..500&display=swap'
get = lambda u: urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': UA}), timeout=30).read()
css = get(URL).decode()
def sub(m):
    b = get(m.group(1)); n = hashlib.sha1(b).hexdigest()[:12] + '.woff2'
    open(os.path.join(OUT, n), 'wb').write(b); return f'url(fonts/{n})'
css = re.sub(r'url\((https://fonts\.gstatic\.com/[^)]+)\)', sub, css)
open(os.path.join(H, 'fonts.css'), 'w', encoding='utf-8').write(css)
print(len(os.listdir(OUT)), 'font files,', sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT)) // 1024, 'KB')
