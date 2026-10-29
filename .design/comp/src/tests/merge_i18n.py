# Merge i18n_ru.json / i18n_en.json into proto_i18n.js (I18N.ru / I18N.en). Re-runnable. Nested plural objects {one,few,many,other}
# become the flat keys the runtime reads: "key" (= the "other" form, used when no plural count is passed) and "key#one" / "key#few" / ...
import json, re, os
H = os.path.dirname(os.path.abspath(__file__))
p = os.path.join(H, 'proto_i18n.js')
s = open(p, encoding='utf-8').read()
PATCH = {  # row.mark carries a count now (call site passes pl = total): EN "1/1 prompt" vs "2/4 prompts"; RU wording is number-neutral
    'en': {'row.mark': {'one': '{d}/{t} prompt', 'other': '{d}/{t} prompts'}},
    'ru': {},
}
def flat(d):
    out = {}
    for k, v in d.items():
        if isinstance(v, dict):
            out[k] = v['other']
            for f, txt in v.items(): out[f'{k}#{f}'] = txt
        else: out[k] = v
    return out
for lang in ('ru', 'en'):
    d = json.load(open(os.path.join(H, f'i18n_{lang}.json'), encoding='utf-8')); d.update(PATCH[lang])
    f = flat(d)
    body = '{\n' + ',\n'.join(f'  {json.dumps(k, ensure_ascii=False)}: {json.dumps(v, ensure_ascii=False)}' for k, v in f.items()) + '\n}'
    tag = lang.upper()
    pat = re.compile(r'/\*' + tag + r'\*/.*?/\*END' + tag + r'\*/', re.S)
    new = f'/*{tag}*/{body}/*END{tag}*/'
    if pat.search(s): s = pat.sub(lambda m: new, s)
    else:
        old = f'{lang}: {{}}'
        assert s.count(old) == 1, old
        s = s.replace(old, f'{lang}: {new}')
    print(lang, len(d), 'keys ->', len(f), 'flat entries')
open(p, 'w', encoding='utf-8').write(s)
