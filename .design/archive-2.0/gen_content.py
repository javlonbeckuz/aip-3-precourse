# Regenerates the "C20" block of proto_data.js from the 2.0 API dump (.design/ref-2.0-api/lessons_uz.json): the Uzbek course content of lessons 1-4.
# Only names and sizes of files are taken (never the server paths). build.py runs it first. Edit the dump, not the block.
import json, os, re
H = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(H, '..', '..', 'ref-2.0-api', 'lessons_uz.json'), encoding='utf-8'))['lessons']
def size(f):
    n = f['size']; ext = f['name'].rsplit('.', 1)[-1].upper()
    return f"{ext} · {n} B" if n < 1024 else f"{ext} · {n / 1024:.1f} KB".replace('.', ',')
fl = lambda f: {'slug': f['slug'], 'name': f['name'], 'size': size(f)}
assert all(D[i]['n'] == i for i in range(5)), 'lesson order of the dump changed'
L1, L2, L4 = D[1], D[2], D[4]
assert [m['art'] for m in L1['materials']] == ['sources', 'prompts', 'book'], 'materials order of the dump changed'
pr, pk = L1['prompts'], L1['praktikum']
items = [i for g in pr['groups'] for i in g['items']]
assert pr['rules'][2] == 'Har promptdan oldin faqat kerakli manbaalarni belgilang, qolganini oʻchiring.', 'rule 3 of the sheet changed in the dump'
pr['rules'][2] = 'Har promptdan oldin faqat kerakli manbalarni belgilang, qolganlarining belgisini olib tashlang (oʻchirmang).'   # "oʻchiring" also means delete: ux-audit #19
vz = {'lede': pr['lede'], 'footnote': pr['footnote'], 'rules': pr['rules'], 'files': [fl(f) for f in L1['materials'][0]['files']], 'zip': fl(L1['materials'][0]['bundle']),
      'guide': fl(L1['materials'][2]['files'][0]), 'items': [{'id': i['id'], 'title': i['title'], 'src': i['sources'], 'text': i['text']} for i in items]}
def ex(e):
    return {'num': e['num'], 'tag': e['tag'], 'title': e['title'], 'note': e['note'], 'brief': fl(e['yoriqnoma']), 'pdf': fl(e['promptsPdf']),
            'sources': [fl(s) for s in e['sources'] + e['extras']],
            'prompts': [{'id': p['id'], 'where': p['target'].replace('Chat / zaxira', 'Chat (Studio ishlamasa)'), 'title': p['title'], 'text': p['text']} for p in e['prompts']]}
am = {'title': pk['title'].rstrip('.'), 'lead': pk['lead'], 'rules': pk['rules'], 'guide': fl(pk['guide']), 'closing': fl(pk['closing']),
      'ex': {e['num'].lower(): ex(e) for e in pk['exercises']}}
p2 = L2['praktikum']; lib, a = [], 1
for si, e in enumerate(p2['exercises']):
    b = a + len(e['prompts']) - 1
    assert f"{a:02}–{b:02}" == e['tag'], ('library range', a, b, e['tag'])
    lib.append({'k': 'gtsro'[si], 'a': a, 'b': b, 'key': e['key'], 'num': e['num'], 'note': e['note'], 'title': e['title'], 'prompts': [{'id': p['id'], 'title': p['title'], 'text': p['text']} for p in e['prompts']]}); a = b + 1
p4 = L4['praktikum']
hermes = {'lead': p4['lead'], 'rules': p4['rules'], 'cards': [{'id': e['num'], 'bonus': e['tag'] == 'Bonus', 'title': e['title'], 'natija': e['note'],
          'notes': [{'t': n['title'], 'x': n['text']} for n in e['notes']], 'prompts': [{'title': p['title'], 'text': p['text']} for p in e['prompts']]} for e in p4['exercises']]}
_bn = L4['bookNote'].split('. ', 1)   # "Title. Note"
book = {'title': _bn[0], 'note': _bn[1] if len(_bn) > 1 else ''}
C20 = {'vz': vz, 'am': am, 'lib': {'rules': p2['rules'], 'sections': lib}, 'hw': {'2': L2['homework'], '3': D[3]['homework']}, 'hermes': hermes, 'book': book}
assert L2['homework'] == D[3]['homework']
# slugs, ids, numbers and keys go into href / id / data-* without escaping: only [A-Za-z0-9-] may pass (file names are escaped where they are shown)
SAFE = re.compile(r'[A-Za-z0-9-]+')
def ids(o):
    if isinstance(o, dict):
        for k, v in o.items():
            if k in ('slug', 'id', 'num', 'key', 'k') and isinstance(v, str): yield v
            yield from ids(v)
    elif isinstance(o, list):
        for v in o: yield from ids(v)
bad = [x for x in ids(C20) if not SAFE.fullmatch(x)]
assert not bad, ('unsafe identifiers in the dump', bad)
for s in lib: assert s['b'] - s['a'] + 1 == len(s['prompts'])
blk = '/*C20:begin*/ let C20 = ' + json.dumps(C20, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/') + '; /*C20:end*/'
p = os.path.join(H, 'proto_data.js'); s = open(p, encoding='utf-8', newline='').read()
m = re.search(r'/\*C20:begin\*/.*?/\*C20:end\*/', s, re.S)
assert m, 'marker missing in proto_data.js'
open(p, 'w', encoding='utf-8', newline='').write(s[:m.start()] + blk + s[m.end():])
print('C20:', len(blk), 'chars,', len(items), 'vz prompts,', sum(len(s['prompts']) for s in lib), 'library prompts,', len(hermes['cards']), 'hermes cards')
