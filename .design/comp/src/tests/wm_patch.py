import os, re
os.chdir(r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\src')
# ---- assemble.py: the gate wordmark becomes per-letter spans (aria-hidden) with the full text on the link
a = open('assemble.py', encoding='utf-8').read()
old = """rep('<a class="wordmark" href="#s-dastur">AI Praktikum 3.0</a>','<a class="wordmark" href="#/dastur">AI Praktikum 3.0</a>')"""
assert a.count(old) == 1
new = old + """
# login wordmark: one span per letter, --d = distance from the centre of the word (the CSS wave delays by it); the link keeps the whole text as its name
def wordmark(text):
    c = (len(text) - 1) / 2
    return ''.join(f'<span class="wm-l" aria-hidden="true" data-c="{ch if ch != " " else chr(160)}" style="--d:{abs(i - c):.1f}"><span class="wm-g">{ch if ch != " " else chr(160)}</span></span>' for i, ch in enumerate(text))
rep('<a class="wordmark" href="#/dastur">AI Praktikum 3.0</a>', '<a class="wordmark" href="#/dastur" aria-label="AI Praktikum 3.0">' + wordmark('AI Praktikum 3.0') + '</a>')"""
a = a.replace(old, new)
open('assemble.py', 'w', encoding='utf-8').write(a)
# ---- pre-proto: CSS + drop the blur script and the ?wmtest hook
s = open('index.pre-proto.html', encoding='utf-8').read()
old = ".wm-l{display:inline-block}/* wordmark letters, blurred by cursor distance (script) */"
assert s.count(old) == 1
s = s.replace(old, """/* login wordmark: a weight wave that ripples out from the middle (no script, no mouse). Each letter's slot is as wide as that letter at the heaviest weight
   (the invisible ::after copy), so the word never changes width and nothing around it moves; only the glyph inside its slot breathes. Negative delays: it is already mid-wave on load */
.wm-l{display:inline-grid;contain:layout}
.wm-l::after{content:attr(data-c);grid-area:1/1;font-weight:800;visibility:hidden}
.wm-g{grid-area:1/1;justify-self:center;animation:wm-wave 1.35s ease-in-out infinite alternate;animation-delay:calc(var(--d) * .1s - 8s)}
@keyframes wm-wave{from{font-weight:300}to{font-weight:800}}
@media (prefers-reduced-motion:reduce){.wm-g{animation:none}}""")
a = s.index('// Login wordmark: letters near the cursor blur'); b = s.index('</script>', a)
s = s[:a] + "// Login wordmark: the weight wave is CSS only (.wm-l / .wm-g, markup built in assemble.py); nothing to run here.\n" + s[b:]
open('index.pre-proto.html', 'w', encoding='utf-8').write(s)
print('ok')
