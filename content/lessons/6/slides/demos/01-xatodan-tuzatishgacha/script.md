# Demo 1: error log to fix, with a regression on the way

Day 5, 1:00-1:10 (10 minutes), right before exercises 1-3.
Bold term taught: **Test set (evals)**; also regression, few-shot examples.
Curriculum: "Error log to fix. Take a real participant's error, change instructions.md, re-run the test set, redeploy" (`praktikum-3-curriculum.md:587`).

## What the room should see

Baraka's week-one errors travel the whole loop in ten minutes: reproduce, classify, test first (red), the data fix, a tempting wide fix that breaks two old tests (regression), the precise fix (green), the freshness check, redeploy.
The point is not the tool; it is the habit: "no fix without a test, no deploy without all tests".

## Materials

| What | Path |
| --- | --- |
| The error list the owner saw on Sunday morning | `../../exercises/namuna/baraka-1-hafta/xatolar.txt` |
| Agent files before and after, and the diff | `../../exercises/namuna/yaxshilash/agent-v1/`, `agent-v2/`, `farq.diff` |
| The four recorded eval runs | `../../exercises/namuna/yaxshilash/eval-1-oldin.txt` ... `eval-4-keyin.txt` |
| Offline live runner (real `pilot eval`, fake model, no internet) | `../../_build/sim/live_eval.py` |
| Your real demo bot (real model) | your copy of `pilot-template` with the v1 files (run sheet, "Two days before", step 2) |

## Steps

| Min | Do | Say |
| --- | --- | --- |
| 0 | Phone on the projector: send `/xatolar` to the demo bot (or open `xatolar.txt`). Point at the two 15 Dec entries: 5 and 6 pieces priced at retail. | UZ: «Mana jurnaldagi ikki xato: 5 va 6 donaga chakana narx. Ulgurji narx 5 donadan.» |
| 1 | Terminal: `uv run pilot ask "Optima stolidan 5 ta kerak, narxi?"` | UZ: «Birinchi qadam: xatoni takrorlash. Takrorlanmasa, sababini topa olmaymiz.» |
| 2 | Classify the seven entries on the 5-step card: B.4 not precise enough (3), stale 1C file (2), the KP sales deck contradicting the rules (2). Seven entries, four causes. | UZ: «Yetti xato, to‘rt sabab. Hech biri modelning aqlida emas.» |
| 3 | Open `evals/test-set.toml`, add the four tests from the error log (paste from `test-set-v2.toml`). Run `uv run pilot eval --judge`: **7 / 12**. Point at `kafolat-kreslo`: it has existed since Day 3 and fails too. | UZ: «Avval test. Qizil bo‘lishi kerak. Qarang: kafolat testi 3-darsdan beri bor edi; KP qo‘shilgandan keyin hech kim testlarni ishga tushirmagan.» |
| 4 | Remove the KP source from `agent/sources.toml`, add one line to `agent/memory.md` (shartlar faqat qoidalar hujjatidan). Run again: **9 / 12**. | UZ: «Ma’lumot tuzatildi: KP - reklama, qoida manbasi emas. Ikki xato yo‘qoldi.» |
| 5 | The tempting fix: B.4 becomes «har doim ulgurji narx». Run: **9 / 12** again, but read the names: `chakana-start-2` and `chakana-ergopro-3` are red now; both passed since Day 3. | UZ: «Raqam o‘zgarmadi, lekin boshqa testlar yiqildi. Bu regressiya: 2 ta Start stoliga ham ulgurji narx. Faqat jami raqamga qarasangiz, ko‘rmaysiz.» |
| 7 | Undo, write the precise rule (1-4 dona chakana; 5 dona ham ulgurji) and add two examples to `examples.md` (5 pieces; 18 mln = no discount). Run: **12 / 12**. | UZ: «Aniq qoida va ikkita to‘g‘ri namuna. Hammasi yashil, eskilari ham.» |
| 8 | Last, the data freshness: `max_age_hours = 25` in `sources.toml`, then `uv run pilot check` and `uv run pilot ask "ErgoPro omborda bormi?"` (hands over on Saturday's file). Not `pilot eval`: on a Sunday the stock tests would hand over too. | UZ: «Ma’lumot yangiligini oxirida qo‘yamiz va check bilan tekshiramiz.» |
| 9 | `uv run python deploy/deploy.py` (or show `pilot-template/samples/deploy-output.txt`). Fill the B.13 cells. | UZ: «Endi serverga. Va jurnalga: nimani o‘zgartirdik.» |

## Offline live version (no internet, no keys)

Run `simulate.py` once beforehand (run sheet), then each stage is one command:

```text
uv run --no-project --with httpx --with openpyxl --with python-dotenv --with tzdata python day-5/_build/sim/live_eval.py v1 ask "Optima stolidan 5 ta kerak, narxi?"
uv run --no-project --with httpx --with openpyxl --with python-dotenv --with tzdata python day-5/_build/sim/live_eval.py v1 eval
... live_eval.py kp eval
... live_eval.py regressiya eval
... live_eval.py v2 eval
... live_eval.py v2 eski-fayl ask "ErgoPro omborda bormi?"
```

These are the real `pilot ask` and `pilot eval` commands of the template; only the model is a set of rules (`_build/sim/brain.py`).
Say so if anyone asks: «Bu yerda model o‘rnida qoidalar turibdi, internetsiz ko‘rsatish uchun.»

## With the real model

Real models fail different tests from the fake one.
If your real run shows 9 / 12 at step 3 instead of 7 / 12, say it and carry on: the method is the point.
Write the real numbers on the board, not the handout's.

## Fallback

Open the four recorded files side by side: `eval-1-oldin.txt`, `eval-2-kp-olib-tashlandi.txt`, `eval-3-regressiya.txt`, `eval-4-keyin.txt`, and `farq.diff`.

## Questions you will get

- «Nega kodni o‘zgartirmadik?» UZ: «Birinchi haftadagi xatolarning ko‘pi matnda: fakt, qoida, ma’lumot. Kod - oxirgi navbatda.»
- «Kuchliroq model qo‘ysak-chi?» UZ: «Kuchli model ham eski 1C faylini yangilamaydi va KP bilan shartnomaning qaysi biri to‘g‘riligini bilmaydi. Modelni test to‘plami bilan solishtiramiz: `pilot eval --tier strong`.»
- «Har safar qancha turadi?» UZ: «12 ta test taxminan 6 sent.»
