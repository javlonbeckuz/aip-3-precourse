# Gemini Notebook exercise (1:45-2:10)

Curriculum hands-on exercise 4, "Company knowledge base".
Done when: 3 answers with source citations (and one contradiction found).

## Files

| File | For | Notes |
| --- | --- | --- |
| `mashq.md` | Source of the participant sheet (Uzbek) | Edit this, then run `_build/build_docs.py` |
| `mashq.html` | Participant sheet on screen, with copy buttons | Post the link or file in the cohort Telegram group |
| `mashq.pdf` | Printed sheet, one per person | Built by `_build/build_docs.py` |

The Baraka Office demo documents are in `ROOT/nlm-lead-magnet-video/demo-fayllar/` (5 PDFs and 3 interview transcripts; audio in `audio-intervyular/`).
Mentors post the 5 PDFs and the 3 `.md` transcripts in their table group before the session; do not copy them into this folder.

## What the product looks like now (checked 2026-11-03)

- NotebookLM was renamed Gemini Notebook on 16 Jul 2026; notebooklm.google.com redirects to notebook.google.com (F10, F11 in `../sources.md`).
- The three panels are still Sources, Chat and Studio (F11).
- Sources accept PDF, docx, txt, Markdown, CSV, pptx, ePub, audio, images, Google Docs/Slides/Sheets, websites and YouTube; up to 200 MB or 500,000 words each (F12).
- Free plan: 100 notebooks, 50 sources each, usage refreshes every 5 hours up to a weekly cap; Google no longer publishes per-day chat or audio counts (F13).
- Studio: Audio Overview (Deep Dive, Brief, Critique, Debate), Video Overview, Mind Map, Data Table, Reports, Flashcards, Quiz, Slide Deck, Infographic (F14).
- Uzbek is not on the official output-language list (F15).
  In a test on 2026-11-03 the chat still answered an Uzbek question in Uzbek with citations (F15a).
  Tell the room: chat in Uzbek works in practice; Audio Overview must be Russian or English.

The exact button labels change often and depend on the account language; the sheet names the three panels (Sources, Chat, Studio) and the Studio outputs (Quiz, Audio Overview, Mind Map), which are stable.
Open the product in rehearsal and adjust the sheet if a label moved.

## Live test of the contradiction prompt (2026-11-03)

The owner already has a notebook "Baraka Office - bilim bazasi (demo)" with 8 sources.
I asked the exact Uzbek contradiction prompt from the sheet there (read-only query, no sources changed).
It answered in Uzbek with a table of 8 contradictions and citations:

| # | Topic | Planted? |
| --- | --- | --- |
| 1 | Warranty: KP 36 months vs contract 24/12 months | Yes |
| 2 | Delivery: sales head "3 working days" vs contract 7 (12 for custom) | Yes |
| 3 | Discount: price list 5% / 10% vs sales head "12-15%" | Yes |
| 4 | Free delivery to Tashkent region (KP) vs paid 8 000 so‘m/km (contract) | Yes (part of planted #3 in the README) |
| 5 | Free 3D design only above 15 million vs "free for everyone" | No, a real extra |
| 6 | Sales plan 120 million (KPI rules) vs 100 million (HR) | Yes |
| 7 | Salary dates 5th/15th vs "by the 10th" | Yes |
| 8 | Lateness fine after 4 vs after 3 late days | No, a real extra |

So "4 planted, Gemini Notebook found 8" is a true line for slide 32.
Note the raw audio-transcript sources in that notebook are messy ("barak savdo rahbari jamshid karimov ... ati uch ish kuni"): a live example for the Kit 1 point that Uzbek speech-to-text needs a human check.

## Answer key for the three Baraka questions

1. 20 "Optima" desks (WS-102) at the wholesale price (5+ pieces): 20 × 1 890 000 = 37 800 000 so‘m.
   The order is above 20 million, so an ordinary sales manager may give up to 5% (price list, section 5.1); 10% needs the sales head and full prepayment or 50 million+.
2. Chair mechanisms: 12 months in the contract (4.1); the KP promises 36 months for everything, which is a contradiction.
3. Salary: base pay on the 5th, bonus on the 15th of the next month (KPI rules 2.1); the HR head says both arrive by the 10th, which is a contradiction.

## Mentor checks

- Every answer shown has a citation number, and the participant clicked at least one.
- Excel files go in as CSV or PDF.
- Nobody uploads customer lists, passports or payroll.
- If the room hits the usage limit, switch to Quiz or Mind Map and leave audio for home.
