# Tokenizer build

Rebuilds `day-1/demos/tokenizer/` (vendor bundles, pre-measured counts, single-file version).
All paths resolve relative to the scripts; run from any folder.

| Step | Command (from `day-1/`) | Writes |
| --- | --- | --- |
| 1. Measure with Python reference tokenizers | `uv run --with tiktoken --with tokenizers python3 -I _build/tokenizer/measure.py` | `demos/tokenizer/measurements.js`, `measurements.json`, `_build/tokenizer/expected.json` |
| 2. Install JS deps (once) | `cd _build/tokenizer && npm install` | `node_modules/` |
| 3. Bundle for the browser | `node _build/tokenizer/build.mjs` | `demos/tokenizer/vendor/*.js` |
| 4. Test JS against Python | `node _build/tokenizer/test_bpe.mjs` | nothing; exit 1 on any mismatch |
| 5. Single-file page | `python3 _build/inline_page.py` | `demos/tokenizer/tokenizer-offline.html` |

`measure.py` downloads tokenizer files from Hugging Face into `cache/` (regenerable; only JSON and tiktoken rank files are read, no downloaded code runs).
The sentences live in `sentences.json`; change them there and rerun steps 1, 3, 4, 5.
Last run: 2026-11-03, tiktoken 0.14.0, tokenizers 0.23.3, js-tiktoken 1.0.21, esbuild 0.25.10; 22/22 test texts identical between browser and Python.
