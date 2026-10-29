# One-command build:  python build.py [--app]   (--app also builds the real SPA into public/aip/, see build_app.py)   (from anywhere; every path is relative to this file)
#   gen_prep_pdf.py ../files/prep-{uz,ru,en}.pdf -> the PREP_PDF block of proto_data.js (embedded, so the single file still downloads the guide)
#   gen_uz.mjs      I18N.uz (+ c.* content) -> i18n_uz.json, so the check never goes stale
#   merge_i18n.py   i18n_ru.json / i18n_en.json -> I18N.ru / I18N.en inside proto_i18n.js
#   assemble.py     index.pre-proto.html + proto_*.js (+ assemble_post.py) -> ../index.html
#   export_final.py ../index.html -> <project root>/AI-Praktikum-3.0-final.html (single file, image inlined)
#   i18n_check.py   RU/EN against UZ (keys, {params}, plural forms, line breaks, length limits, banned words, [<>&"])
import os, subprocess, sys
H = os.path.dirname(os.path.abspath(__file__))
STEPS = [[sys.executable, 'gen_prep_pdf.py'], ['node', 'gen_uz.mjs'], [sys.executable, 'merge_i18n.py'], [sys.executable, 'assemble.py'], [sys.executable, 'export_final.py'], [sys.executable, 'i18n_check.py']]
for cmd in STEPS:
    print('>>', ' '.join(os.path.basename(c) if i == 0 else c for i, c in enumerate(cmd)), flush=True)
    r = subprocess.run(cmd, cwd=H, env={**os.environ, 'PYTHONIOENCODING': 'utf-8'})
    if r.returncode: sys.exit(f'build failed at: {" ".join(cmd[1:])}')
if '--app' in sys.argv:
    r = subprocess.run([sys.executable, 'build_app.py'], cwd=H, env={**os.environ, 'PYTHONIOENCODING': 'utf-8'})
    if r.returncode: sys.exit('build failed at: build_app.py')
print('build OK')
