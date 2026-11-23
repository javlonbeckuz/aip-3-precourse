# Day 1 sources and fact register

Every 2026 fact used in the Day 1 deck, demos, handouts and run sheet is listed here with its source and the date it was checked.
All web checks were made on 2026-11-03 unless a row says otherwise.
Confidence: OFF = read on the official page; DATA = calculated from an official data file; SEC = secondary source only; NV = could not verify.
Model names and prices change monthly: re-check every row marked "dated" in the week before each session (1-dars is 21 Nov for the Saturday group and 22 Nov for the Sunday group).

## Claims the Day 1 material makes

| # | Claim as used in class | Source | Conf. | Where used |
| --- | --- | --- | --- | --- |
| F1 | McKinsey, The state of AI in 2026 (25 Aug 2026): 80% of respondents say AI improved their individual productivity; 37% of respondents attribute at least some EBIT impact to AI; high performers flat at about 6% of respondents; 1,719 participants in 97 nations, surveyed 4 May to 8 June 2026, weighted by GDP | https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai | OFF; wording re-checked verbatim 2026-11-03 against the PDF in the owner's Gemini Notebook "The State of AI 2026: The Road to ROI" (sections Key takeaways and About the research; the PDF text has no page numbers); 36% of respondents work at firms above $1B revenue | Deck slide 2, run sheet 0:02 |
| F2 | The curriculum says "37% of companies"; the survey counts respondents, not companies, and the 80% is individual productivity. Day 1 material uses the survey's own wording | same as F1 | OFF | Deck notes, report decision |
| F3 | Uzbekistan Law ZRU-1125 of 26 Mar 2026 amended the Law "On Personal Data" (in force 27 Mar 2026) and narrowed localisation to biometric, genetic and telecom-subscriber data | https://lex.uz/docs/8099215 (Uzbek) and https://lex.uz/docs/8104580 (Russian); both titles checked 2026-11-03 | OFF | Data-trip page, deck slide 15 |
| F4 | Article 27-1 now: only biometric data, genetic data and data on customers of telecom operators in Uzbekistan must be stored in Uzbekistan; other personal data may go abroad to an adequate country, or under approved standard clauses, binding corporate rules or approved standards | https://lex.uz/docs/4396419 | OFF | Data-trip page, deck slide 15, glossary |
| F5 | Cabinet of Ministers Resolution No. 415 of 29 Jul 2026 (in force 3 Aug 2026) lists 49 countries and territories with adequate protection; Germany unconditionally; the USA only for companies certified under the EU-US Data Privacy Framework; Russia is on it; mainland China, Kazakhstan, Turkey, UAE and India are not; Anthropic's privacy policy does not cite the DPF, so the material never says "the US is included" for Claude | https://lex.uz/ru/docs/8369688 (title checked 2026-11-03) | OFF | Data-trip page, deck slide 15 |
| F6 | Google states it is certified under the Data Privacy Framework; Anthropic and OpenAI privacy policies do not mention it | https://policies.google.com/privacy/frameworks | OFF (Anthropic, OpenAI: NV) | Data-trip page note |
| F7 | DeepSeek privacy policy (10 Feb 2026): data is collected, processed and stored in the People's Republic of China | https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html | OFF | Deck slide 25, side-by-side page, exercise 3 |
| F8 | Qwen Chat (chat.qwen.ai) is operated from Singapore and stores data in Singapore (policy effective 7 Sep 2026) | https://chat.qwen.ai/legal-agreement/privacy-policy | OFF | Side-by-side page, exercise 3 |
| F9 | 27 Jan 2025: Nvidia lost almost $600 billion of market value in one day, shares down 17%, the biggest one-day loss in US history (Bloomberg: $589B; Reuters: $593B) | https://www.cnbc.com/2025/01/27/nvidia-sheds-almost-600-billion-in-market-cap-biggest-drop-ever.html | OFF (Bloomberg, Reuters SEC) | Deck slide 24 ("about $590 billion") |
| F10 | NotebookLM was renamed Gemini Notebook, announced 16 Jul 2026 | https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/ | OFF | Deck, NotebookLM exercise |
| F11 | Gemini Notebook URL: notebooklm.google.com redirects to notebook.google.com; help centre support.google.com/gemininotebook; panels are still Sources, Chat and Studio | https://support.google.com/gemininotebook/answer/16206563 | OFF | NotebookLM exercise |
| F12 | Gemini Notebook sources: PDF, docx, txt, Markdown, CSV, pptx, ePub, audio, images, Google Docs/Slides/Sheets, websites, YouTube with captions, pasted text; up to 500,000 words or 200 MB per source | https://support.google.com/gemininotebook/answer/16215270 | OFF | NotebookLM exercise |
| F13 | Gemini Notebook free plan: 100 notebooks, 50 sources per notebook; usage is compute-based, refreshes every 5 hours up to a weekly cap; no published per-day chat or Audio Overview counts | https://support.google.com/gemininotebook/answer/16213268 | OFF | NotebookLM exercise, instructor notes |
| F14 | Gemini Notebook Studio outputs: Notes, Audio Overview (Deep Dive, Brief, Critique, Debate), Video Overview, Mind Map, Data Table, Reports, Flashcards, Quiz, Slide Deck, Infographic | https://support.google.com/gemininotebook/answer/16212820 | OFF | NotebookLM exercise |
| F15 | Uzbek is not on Gemini Notebook's list of supported output languages (80+ languages; Russian, Turkish and Azerbaijani are); Uzbekistan is a supported country | https://support.google.com/gemininotebook/answer/16261963 | OFF | NotebookLM exercise, run sheet fallback |
| F15a | In practice the chat answered in Uzbek: on 2026-11-03 the Uzbek contradiction prompt, asked in the owner's existing notebook "Baraka Office - bilim bazasi (demo)" (8 sources), returned an Uzbek table of 8 contradictions with citations, including all 4 planted ones | Test run through the Gemini Notebook MCP, read-only query, conversation d63095e0 | Tested once | NotebookLM exercise, slide 32 |
| F16 | Claude artifacts: every plan can create them; "Code execution and file creation" must be on in Settings > Capabilities (exact label confirmed by week-0-setup from support.claude.com/en/articles/12111783); create by asking in chat | https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them | OFF | First build |
| F17 | Claude artifact sharing: Pro, Max and Ultra can share by link ("Anyone with the link"); Free plans cannot share new artifacts by link; a viewer needs a Claude account | https://support.claude.com/en/articles/9547008-share-artifacts | OFF | First build |
| F18 | Gemini app audio upload: up to 10 files per prompt, 100 MB each; total audio 10 minutes on the free plan, 3 hours on Google AI Pro or Ultra; Uzbek is a supported app language | https://support.google.com/gemini/answer/14903178 and https://support.google.com/gemini/answer/13575153 | OFF (Uzbek transcription quality NV) | Kit 1 live demo, homework |
| F19 | Anthropic: Claude 4.7 and later use a newer tokenizer that produces about 30% more tokens for the same text than the previous one | https://platform.claude.com/docs/en/about-claude/pricing | OFF | Tokenizer page note |
| F20 | Anthropic token counting endpoint is free (rate limited) but needs an API key | https://platform.claude.com/docs/en/build-with-claude/token-counting | OFF | Tokenizer page rehearsal steps |
| F21 | tiktoken 0.14.0 (2026-08-17) maps "gpt-5" models to o200k_base; it has no entry for GPT-6; the GPT-6 tokenizer is not published | https://github.com/openai/tiktoken/blob/main/tiktoken/model.py | OFF (GPT-6: NV) | Tokenizer page |
| F22 | Gemma 3 technical report: Gemma uses the same tokenizer as Gemini 2.0 (262k vocabulary, more balanced for non-English languages); whether Gemini 3.x and 4 still use it is not published | https://arxiv.org/abs/2503.19786 | OFF (Gemini 3/4: NV) | Tokenizer page |
| F23 | Petrov et al., NeurIPS 2023: tokenizer length differences between languages reach up to 15x; from the authors' data, Northern Uzbek (Latin) vs English is 2.17x on cl100k_base (GPT-3.5/4), 2.03x on the 2023 Llama tokenizer | https://arxiv.org/abs/2305.15425 and https://github.com/AleksandarPetrov/tokenization-fairness | DATA | Tokenizer page background only; class measures live |
| F25 | Claude has no native image generation in its apps as of 2026 (it can analyse images and draw with code, SVG or external tools); no Anthropic announcement of native image generation found | https://godofprompt.ai/blog/can-claude-generate-images/ and https://www.blockchain-council.org/claude-ai/no-image-with-claude/ | SEC (official Anthropic page not checked) | Glossary, "Platforma" |
| F26 | Labour Code Art. 178: the employer may not pass employee data to third parties (an AI service included) without the employee's written consent; the change-management review's "Art. 176" reference is inaccurate | https://lex.uz/mact/6257288 (via bonus-kits research, `ROOT/bonus-kits/_build/research/web-research-2026-11-03.md`) | OFF via bonus-kits | Slide 15 notes, data-trip page, glossary, handout |
| F27 | Administrative Code Art. 46-2 part 2 (added by ZRU-1115): unlawful processing of personal data with AI, or spreading it online, is fined 50-100 BRV (about 22-44 million so'm at BRV 440,000 so'm from 1 Sep 2026) | https://lex.uz/ru/docs/97664 (via bonus-kits research) | OFF via bonus-kits | Slide 15, data-trip page, glossary, handout |
| F24 | OpenRouter bills inference at the provider's list price; fee on credit purchases (5.5% standard); some free models (about 17-25, limits 20 per minute and 50 per day); per-key credit limits | https://openrouter.ai/pricing | OFF | Model sheet |

## Dated model sheet (prices per 1 million tokens, USD, checked 2026-11-03)

These rows feed `demos/models/` and the "Bu hafta AI’da" sheet only.
They never go on core slides.

| Maker | Model | Input / output | Notes | Source | Conf. |
| --- | --- | --- | --- | --- | --- |
| Anthropic | Claude Haiku 5.5 (`claude-haiku-5-5`) | $0.10 / $0.50 | Up to 100k-token prompts; $0.50 / $2.50 above | https://platform.claude.com/docs/en/about-claude/pricing | OFF |
| Anthropic | Claude Sonnet 5.5 (`claude-sonnet-5-5`) | $2 / $10 | 1M context | same | OFF |
| Anthropic | Claude Opus 5.5 (`claude-opus-5-5`) | $4 / $20 | Anthropic's recommended default | same | OFF |
| Anthropic | Claude Fable 5.1 (`claude-fable-5-1`) | $10 / $50 | Strongest public Claude | same | OFF |
| OpenAI | GPT-6 Luna (`gpt-6-luna`) | $0.10 / $0.50 | Cheap tier | https://developers.openai.com/api/docs/pricing | OFF |
| OpenAI | GPT-6.1 Terra (`gpt-6.1-terra`) | $1 / $5 | Fast tier | same | OFF |
| OpenAI | GPT-6.1 Sol (`gpt-6.1-sol`) | $2 / $10 | Balanced; 2x input above 272k tokens | same | OFF |
| OpenAI | GPT-6 Astra (`gpt-6-astra`) | $10 / $50 | Strong tier | same | OFF |
| Google | Gemini 3.5 Flash-Lite | $0.30 / $2.50 | Free tier exists | https://aistudio.google.com/docs/pricing | OFF |
| Google | Gemini 3.8 Flash | $0.75 / $3.75 | Promotional until 31 Dec 2026, then $1.50 / $7.50 | same | OFF |
| Google | Gemini 4 Argon | $2 / $10 | Until 30 Nov 2026, then $4 / $20 | same | OFF |
| DeepSeek | DeepSeek V4.1 Flash (`deepseek-ai/DeepSeek-V4.1-Flash-1017`) | $0.15 / $0.60 | Open weights, MIT | https://openrouter.ai/models and https://huggingface.co/deepseek-ai | OFF |
| DeepSeek | DeepSeek V4 Pro (`deepseek-ai/DeepSeek-V4-Pro-0813`) | $0.66 / $1.98 | Open weights, MIT | same | OFF |
| Alibaba | Qwen3.8-27B | $0.425 / $2.55 | Open weights, Apache 2.0 | same | OFF |
| Alibaba | Qwen3.8 (2.4T-A95B) | $2 / $6 | Open weights, custom licence (limits for very large service businesses) | same | OFF |
| Moonshot | Kimi K3 | $3 / $15 | Open weights, modified MIT | same | OFF |
| Z.ai | GLM-5.3 | $1.40 / $4.40 | Open weights, custom licence | same | OFF |
| OpenAI | gpt-oss-120b | from $0.022 / $0.08 (cheapest provider) | Open weights, Apache 2.0, Aug 2025 | same | OFF |
| Google | Gemma 4 31B | free `:free` route exists | Open weights, Apache 2.0 | same | OFF |

Claude consumer plans (https://claude.com/pricing, OFF; 30 Oct 2026 names per the owner's decision): Free $0; Pro $20 per month ($17 billed annually); Max $100 per month; Ultra $200 per month.
In Uzbekistan 12% VAT is added (about 270,000 so'm a month for Pro); App Store prices are higher, so pay on the website; Visa and Mastercard work, Uzcard and Humo are unconfirmed.

## Token measurements

Pre-measured token counts for the tokenizer demo are produced by `_build/tokenizer/measure.py` and stored in `demos/tokenizer/measurements.json` with tokenizer IDs, library versions and the date.
Claude and Gemini counts are not pre-measured, because both need an API key; the rehearsal steps for measuring them live are in `demos/tokenizer/README.md`.

## Curriculum statements kept as they are

- "Haiku invents shavlama" (model ladder demo): an observation from the 2.0 class, not re-run in this build; the instructor re-runs it in rehearsal and captures screenshots.
- "Bir uch-to‘rt yuz ming becomes 1,300,000": 2.0 Day 1 transcript, 01:11:14 (evidence review, section B).
- "Excel shows a red error, AI never does": 2.0 Day 1 transcript, 01:03:00 (evidence review, section B).
- The "dumb zone": 2.0 used 40% in one place and 60% in another; Day 1 material gives no percentage.
