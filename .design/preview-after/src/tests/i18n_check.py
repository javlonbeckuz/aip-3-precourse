# Self-check for i18n_ru.json / i18n_en.json against i18n_uz.json. Run: python -I i18n_check.py
import json, os, re, sys
sys.stdout.reconfigure(encoding="utf-8")
H = os.path.dirname(os.path.abspath(__file__))
load = lambda n: json.load(open(os.path.join(H, n), encoding="utf-8"))
uz = load("i18n_uz.json")
want = {k for k, v in uz.items() if v["translate"]}
assert not any(k.startswith("c.") for k in want)
PARAM = re.compile(r"\{(\w+)\}")
BANNED = re.compile(r"unlock|seamless|journey|elevate|empower|dive in|let's|let’s|supercharge|harness|game.changer|cutting.edge|"
                    r"откройте для себя|погруз|раскройте потенциал|уникальн|инновацион|please|пожалуйста|\bsimply\b|\bjust\b|\beasily\b|просто|—|[\U0001F300-\U0001FAFF]", re.I)
SAMPLE = {"ru": {"date": "26 сентября", "until": "до 12 сентября", "steps": "3/4 шага"},
          "en": {"date": "26 September", "until": "by 12 September", "steps": "3/4 steps"}}
COMMON = {"n": "3", "d": "3", "t": "6", "i": "14", "num": "01", "no": "P3", "id": "07", "pid": "P6", "kind": "video", "total": "40", "size": "37,0 KB"}
FORMS = {"ru": {"one", "few", "many", "other"}, "en": {"one", "other"}}
bad = 0
def err(*a):
    global bad; bad += 1; print("FAIL", *a)
for lang in ("ru", "en"):
    d = load(f"i18n_{lang}.json")
    if set(d) != want: err(lang, "missing", sorted(want - set(d)), "extra", sorted(set(d) - want))
    plural = 0
    for k in want & set(d):
        src, note, v = uz[k]["uz"], uz[k]["note"], d[k]
        forms = v if isinstance(v, dict) else {"_": v}
        if isinstance(v, dict):
            plural += 1
            if set(v) != FORMS[lang]: err(lang, k, "forms", sorted(v))
        for f, s in forms.items():
            if set(PARAM.findall(s)) != set(PARAM.findall(src)): err(lang, k, f, "params", PARAM.findall(s), "vs", PARAM.findall(src))
            if s.count("\n") != src.count("\n"): err(lang, k, f, "line breaks")
            if s.count("!") > src.count("!"): err(lang, k, f, "exclamation")
            if BANNED.search(s): err(lang, k, f, "banned:", BANNED.search(s).group())
            if s != s.strip(" ") and (s[:1] == " ") != (src[:1] == " "): err(lang, k, f, "leading space differs")
            m = re.search(r"≤ ?(\d+) chars", note) or re.search(r"≈ ?(\d+) chars", note)
            if m:
                lim = int(m.group(1))
                filled = PARAM.sub(lambda x: {**COMMON, **SAMPLE[lang]}.get(x.group(1), x.group(0)), s)
                lines = filled.split("\n") if "per line" in note else [filled.replace("\n", " ")]
                ufill = PARAM.sub(lambda x: {**COMMON, **SAMPLE['en']}.get(x.group(1), x.group(0)), src)
                if max(len(l) for l in (ufill.split("\n") if "per line" in note else [ufill.replace("\n", " ")])) > lim: continue  # uz itself exceeds: limit belongs to a sibling key
                over = [l for l in lines if len(l) > lim]
                if over: err(lang, k, f, f"over {lim}:", [(l, len(l)) for l in over])
    print(lang, len(d), "keys,", plural, "plural keys")
print("OK" if not bad else f"{bad} problems")
