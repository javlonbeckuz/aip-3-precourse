"""Pre-measure token counts for the Day 1 tokenizer demo with open tokenizers.

Run (from anywhere):
  uv run --with tiktoken==0.12.0 --with tokenizers python3 -I day-1/_build/tokenizer/measure.py
Paths resolve relative to this file. Downloads tokenizer files into ./cache/ (regenerable, untrusted data:
only JSON and tiktoken rank files are read; no downloaded code is executed).
Writes:
  ../../demos/tokenizer/measurements.js   (window.MEASUREMENTS for the page)
  ../../demos/tokenizer/measurements.json (same data)
  ./expected.json                         (fixtures for test_bpe.mjs)
Claude and Gemini are not measured here: both need an API key (see demos/tokenizer/README.md).
"""
import base64
import datetime
import hashlib
import importlib.metadata
import json
import pathlib
import urllib.request

import tiktoken
from tokenizers import Tokenizer

HERE = pathlib.Path(__file__).resolve().parent
DAY1 = HERE.parent.parent
CACHE = HERE / "cache"
OUT_DIR = DAY1 / "demos" / "tokenizer"

HF = "https://huggingface.co/{repo}/resolve/main/{file}"
HF_TOKENIZERS = [
    # id, label, maker, repo, kind, note
    ("deepseek-v4", "DeepSeek V4 Pro", "DeepSeek", "deepseek-ai/DeepSeek-V4-Pro-0813", "open", "Ochiq vaznli, MIT"),
    ("qwen3.8", "Qwen3.8", "Alibaba", "Qwen/Qwen3.8-27B", "open", "Ochiq vaznli, Apache 2.0"),
    ("glm-5.3", "GLM-5.3", "Z.ai", "zai-org/GLM-5.3", "open", "Ochiq vaznli"),
    ("gemma-4", "Gemma 4", "Google", "google/gemma-4-31B-it", "open", "Google’ning ochiq modeli; Gemma 3 hisobotiga ko‘ra Gemma Gemini 2.0 tokenizatoridan foydalanadi"),
]
KIMI = ("kimi-k3", "Kimi K3", "Moonshot", "moonshotai/Kimi-K3", "open", "Ochiq vaznli, o‘zgartirilgan MIT")
# Pattern copied from moonshotai/Kimi-K3 tokenization_kimi.py (read as text, not executed).
KIMI_PAT = "|".join([
    r"""[\p{Han}]+""",
    r"""[^\r\n\p{L}\p{N}]?[\p{Lu}\p{Lt}\p{Lm}\p{Lo}\p{M}&&[^\p{Han}]]*[\p{Ll}\p{Lm}\p{Lo}\p{M}&&[^\p{Han}]]+(?i:'s|'t|'re|'ve|'m|'ll|'d)?""",
    r"""[^\r\n\p{L}\p{N}]?[\p{Lu}\p{Lt}\p{Lm}\p{Lo}\p{M}&&[^\p{Han}]]+[\p{Ll}\p{Lm}\p{Lo}\p{M}&&[^\p{Han}]]*(?i:'s|'t|'re|'ve|'m|'ll|'d)?""",
    r"""\p{N}{1,3}""",
    r""" ?[^\s\p{L}\p{N}]+[\r\n]*""",
    r"""\s*[\r\n]+""",
    r"""\s+(?!\S)""",
    r"""\s+""",
])


def fetch(repo, file):
    dest = CACHE / repo.replace("/", "_") / file
    if not dest.exists():
        dest.parent.mkdir(parents=True, exist_ok=True)
        with urllib.request.urlopen(HF.format(repo=repo, file=file), timeout=120) as r:
            dest.write_bytes(r.read())
    return dest


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()[:16]


def kimi_encoding(path):
    ranks = {}
    for line in path.read_text().splitlines():
        if not line.strip():
            continue
        tok, rank = line.split()
        ranks[base64.b64decode(tok)] = int(rank)
    return tiktoken.Encoding(name="kimi-k3", pat_str=KIMI_PAT, mergeable_ranks=ranks, special_tokens={})


def main():
    src = json.loads((HERE / "sentences.json").read_text(encoding="utf-8"))
    today = datetime.date.today().isoformat()
    tools = []

    o200k = tiktoken.get_encoding("o200k_base")
    cl100k = tiktoken.get_encoding("cl100k_base")
    tools.append({"id": "o200k", "label": "OpenAI GPT-5.x", "maker": "OpenAI", "kind": "frontier",
                  "tokenizer": "tiktoken o200k_base", "note": "GPT-5.x va gpt-oss tokenizatori; GPT-6 tokenizatori e’lon qilinmagan",
                  "count": lambda t: len(o200k.encode(t, disallowed_special=()))})
    tools.append({"id": "cl100k", "label": "OpenAI GPT-4 (2023)", "maker": "OpenAI", "kind": "old",
                  "tokenizer": "tiktoken cl100k_base", "note": "Taqqoslash uchun: 2023-yilgi tokenizator",
                  "count": lambda t: len(cl100k.encode(t, disallowed_special=()))})
    hf_objects = {}
    for tid, label, maker, repo, kind, note in HF_TOKENIZERS:
        path = fetch(repo, "tokenizer.json")
        tok = Tokenizer.from_file(str(path))
        hf_objects[tid] = tok
        tools.append({"id": tid, "label": label, "maker": maker, "kind": kind, "note": note,
                      "tokenizer": f"{repo} tokenizer.json (sha256 {sha(path)})",
                      "count": (lambda tk: lambda t: len(tk.encode(t, add_special_tokens=False).ids))(tok)})
    kpath = fetch(KIMI[3], "tiktoken.model")
    kimi = kimi_encoding(kpath)
    tools.append({"id": KIMI[0], "label": KIMI[1], "maker": KIMI[2], "kind": KIMI[4], "note": KIMI[5],
                  "tokenizer": f"{KIMI[3]} tiktoken.model (sha256 {sha(kpath)})",
                  "count": lambda t: len(kimi.encode(t, disallowed_special=()))})

    results = {"date": today,
               "libraries": {"tiktoken": importlib.metadata.version("tiktoken"), "tokenizers": importlib.metadata.version("tokenizers")},
               "method": "Token count of the plain text, no special tokens, no chat template.",
               "not_measured": [
                   {"label": "Claude (Anthropic)", "why": "Tokenizator ochiq emas; hisoblash API kalit bilan bepul (count_tokens). Repetitsiyada o‘lchanadi."},
                   {"label": "Gemini (Google)", "why": "Gemini 3.x/4 tokenizatori e’lon qilinmagan; countTokens API kalit bilan bepul. Repetitsiyada o‘lchanadi."},
                   {"label": "GPT-6 (OpenAI)", "why": "Tokenizatori e’lon qilinmagan (tiktoken 0.14 da yo‘q)."}],
               "tools": [{k: v for k, v in t.items() if k != "count"} for t in tools],
               "sets": [], "apostrophes": {}}
    for s in src["sets"]:
        row = {"id": s["id"], "label": s["label"], "texts": s["texts"], "counts": {}}
        for t in tools:
            row["counts"][t["id"]] = {lang: t["count"](txt) for lang, txt in s["texts"].items()}
        results["sets"].append(row)
    ap = src["apostrophe_variants"]
    results["apostrophes"] = {"note": ap["note"], "texts": {k: v for k, v in ap.items() if k != "note"},
                              "counts": {t["id"]: {k: t["count"](v) for k, v in ap.items() if k != "note"} for t in tools}}

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    js = json.dumps(results, ensure_ascii=False, indent=1)
    (OUT_DIR / "measurements.json").write_text(js + "\n", encoding="utf-8")
    (OUT_DIR / "measurements.js").write_text("/* Generated by day-1/_build/tokenizer/measure.py. Do not edit. */\nwindow.MEASUREMENTS = " + js + ";\n", encoding="utf-8")

    # fixtures for the JS tests: every text, o200k ids and DeepSeek token strings
    texts = [txt for s in src["sets"] for txt in s["texts"].values()] + [v for k, v in ap.items() if k != "note"] + src["test_strings"]
    ds = hf_objects["deepseek-v4"]
    fixtures = [{"text": t, "o200k": o200k.encode(t, disallowed_special=()), "deepseek": ds.encode(t, add_special_tokens=False).tokens} for t in texts]
    (HERE / "expected.json").write_text(json.dumps(fixtures, ensure_ascii=False, indent=1), encoding="utf-8")

    # console summary
    print("date", today, results["libraries"])
    for s in results["sets"]:
        print("\n" + s["label"])
        for t in results["tools"]:
            c = s["counts"][t["id"]]
            print(f"  {t['label']:22s} uz={c['uz']:4d} ru={c['ru']:4d} en={c['en']:4d}  uz/en={c['uz'] / c['en']:.2f}")
    print("\nApostrophes")
    for t in results["tools"]:
        print("  ", t["label"], results["apostrophes"]["counts"][t["id"]])


if __name__ == "__main__":
    main()
