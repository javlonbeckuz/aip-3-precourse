# Tokenizer demo

Slot: 1:06-1:11, slide 19.
Bold term: Token.
The curriculum says "measure it live rather than quote one number"; this page is how.

## Files

| File | What |
| --- | --- |
| `index.html` | The page. Opens offline from the folder (needs `vendor/`, `measurements.js` and `../../assets/`). |
| `tokenizer-offline.html` | Same page as one 4.3 MB file with everything inlined. Post this one in the Telegram group for exercise 2. |
| `vendor/o200k.js` | js-tiktoken 1.0.21 with OpenAI's o200k_base ranks (the GPT-5.x tokenizer), MIT. |
| `vendor/hfbpe.js`, `vendor/deepseek-v4.js` | A small byte-level BPE engine and the DeepSeek V4 Pro tokenizer data (merges and pre-tokenizer rules), MIT. |
| `measurements.js` / `.json` | Pre-measured counts for 7 tokenizers, with tokenizer file hashes, library versions and the date. Generated, do not edit. |

Rebuild everything from `day-1/_build/tokenizer/` (see the README there).

## What the page shows

- The same sentence in Uzbek, Russian and English, with the token count, the ratio to English and every token as a coloured chip.
- A switch between two tokenizers that run in the browser: OpenAI o200k_base (GPT-5.x) and DeepSeek V4 Pro (open-weight).
- A pre-measured table for 7 tokenizers (OpenAI GPT-5.x, OpenAI GPT-4 2023, DeepSeek V4 Pro, Qwen3.8, GLM-5.3, Gemma 4, Kimi K3).
- Boxes for Claude and Gemini counts that the instructor types in after measuring them in rehearsal.
- The apostrophe effect: the same sentence with ‘, ' and ʻ gives slightly different counts.

## Measured on 2026-11-03 (business sentence)

| Tokenizer | Uzbek | Russian | English | Uzbek / English |
| --- | --- | --- | --- | --- |
| OpenAI GPT-5.x (o200k_base) | 44 | 33 | 24 | 1.8x |
| OpenAI GPT-4 2023 (cl100k_base) | 50 | 55 | 24 | 2.1x |
| DeepSeek V4 Pro | 48 | 40 | 24 | 2.0x |
| Qwen3.8 | 51 | 33 | 26 | 2.0x |
| GLM-5.3 | 50 | 34 | 24 | 2.1x |
| Gemma 4 | 49 | 34 | 26 | 1.9x |
| Kimi K3 | 48 | 46 | 24 | 2.0x |

So on these sentences Uzbek needs roughly twice the tokens of English, and the gap depends on the tokenizer (1.8x to 2.3x across the two sentences).
The REALITY draft said "about 30% more" and a 2.0 handout said "2.5-3x"; both are off for these tokenizers, which is why the class measures instead of quoting.
For background, Petrov et al. (NeurIPS 2023) data gives 2.17x for Northern Uzbek vs English on cl100k_base (source F23 in `day-1/sources.md`).

## Measuring Claude and Gemini in rehearsal (10 minutes)

Neither tokenizer is published, but both companies count tokens for free with an API key.
Use the three texts of the selected sentence set exactly as they appear on the page (copy them from the text boxes).

Claude (Anthropic token counting endpoint, free, rate-limited; source F20):

```bash
curl https://api.anthropic.com/v1/messages/count_tokens \
  -H "x-api-key: $ANTHROPIC_API_KEY" -H "anthropic-version: 2023-06-01" -H "content-type: application/json" \
  -d '{"model": "claude-sonnet-5-5", "messages": [{"role": "user", "content": "PASTE THE SENTENCE"}]}'
```

The answer includes a few tokens of message wrapping; count an empty message ("content": ".") once and subtract it.
Anthropic says Claude 4.7 and later produce about 30% more tokens than older Claude models for the same text (F19), so measure the model you will use.

Gemini (countTokens, no charge; source F22 notes the tokenizer is not published for Gemini 3.x and 4):

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:countTokens?key=$GEMINI_API_KEY" \
  -H "content-type: application/json" -d '{"contents": [{"parts": [{"text": "PASTE THE SENTENCE"}]}]}'
```

Type the numbers into the "Repetitsiyada o‘lchanadi" boxes on the page; they stay in that browser on that laptop.
Never paste an API key into the page.
