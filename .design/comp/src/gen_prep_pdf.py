# Embeds the lesson-0 guide PDFs (../files/prep-{uz,ru}.pdf, made elsewhere; never edited here) into the PREP_PDF block of proto_data.js, so the one-file
# deliverable can still download them. Per language: {size: "PDF · 1,2 KB", b64}; a missing file is simply left out (the app then shows a sample row: TODO until the PDF lands).
# Over ~3 MB of base64 in total: the PDFs are not embedded, the app links to files/prep-xx.pdf next to the HTML instead (a double-clicked single file would then need that folder).
import base64, json, os, re
H = os.path.dirname(os.path.abspath(__file__)); F = os.path.join(H, '..', 'files')
out, total, raw = {}, 0, {}
for l in ('uz', 'ru'):
    p = os.path.join(F, f'prep-{l}.pdf')
    if os.path.exists(p): raw[l] = open(p, 'rb').read()
total = sum(len(v) for v in raw.values()) * 4 // 3
link = total > 3 * 1024 * 1024
if link: raise SystemExit('prep PDFs are over 3 MB of base64: the single-file export cannot link files/ (export_final refuses local files). Shrink the PDFs or decide how to ship them.')
for l, b in raw.items():
    n = len(b); sl = len(re.findall(rb'/Type\s*/Page[^s]', b)); assert sl > 0, f'prep-{l}.pdf: no pages found'
    out[l] = {'slides': sl, 'size': (f'{n} B' if n < 1024 else f'{n / 1024:.1f} KB' if n < 1024 * 1024 else f'{n / 1048576:.1f} MB').replace('.', ','), **({'url': f'files/prep-{l}.pdf'} if link else {'b64': base64.b64encode(b).decode()})}
blk = '/*PDF:begin*/ const PREP_PDF = ' + json.dumps(out, separators=(',', ':')) + '; /*PDF:end*/'
p = os.path.join(H, 'proto_data.js'); s = open(p, encoding='utf-8', newline='').read()
m = re.search(r'/\*PDF:begin\*/.*?/\*PDF:end\*/', s, re.S); assert m
open(p, 'w', encoding='utf-8', newline='').write(s[:m.start()] + blk + s[m.end():])
print('PREP_PDF:', {l: (v['slides'], v['size']) for l, v in out.items()}, '| missing:', [l for l in ('uz', 'ru') if l not in out], '| base64 total', total, 'bytes', '(LINK MODE)' if link else '')
