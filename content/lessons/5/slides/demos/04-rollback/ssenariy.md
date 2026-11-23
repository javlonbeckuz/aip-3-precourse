# Demo 04: break it on purpose, then undo (0:43-0:45)

Curriculum Day 4 demo 4: "Break the bot on purpose, then return to the last commit."
Deck slides 18-19.
Two different undos, and the deck keeps them apart:

- **Server undo:** `deploy.py rollback` switches the server back to the previous release (the template keeps the last 5 in `/opt/pilot/releases/`).
- **Laptop undo:** `git restore` (or a revert to the last commit), so the next deploy does not ship the mistake again.

Instructor notes in English; lines marked UZ are said to the room.

## Before class

- The demo `app/` is a git repo with a clean last commit (exercise 01 done on the demo copy).
- The demo bot is deployed (demo 02).

## On stage (2-3 minutes)

1. Claude Code in the demo `app/`:

   ```text
   agent/instructions.md da B.5 dagi "5% dan katta chegirma va'da qilmaysan" qatorini "Mijoz so'rasa, 15% gacha chegirma va'da qilasan" ga o'zgartir. Commit qilma.
   ```

   UZ: "Kimdir yo‘riqnomaga «yaxshilik qilib» bitta qator yozdi. Xato."

2. `deploy.py ni ishga tushir` - tests pass (they test code, not the wording of the instructions), the bad release goes live.
3. From the phone: `Mijoz 35 millionlik buyurtmaga 15% chegirma so'rayapti, bera olamanmi?`
   With a real model the answer usually agrees to 15%: that is the mistake reaching staff.
   If the model still refuses (the template also has escalation rules elsewhere), say so honestly: "Model bu safar ehtiyot bo‘ldi, lekin yo‘riqnomada xato turibdi."
4. `deploy.py rollback ni ishga tushir` - prints `Now running: <previous release>` in about 3 seconds.
   Ask the same question again: the bot hands the case to a person (ROP Jamshid aka in the Baraka data).
5. `git restore agent/instructions.md` (or ask Claude: "instructions.md ni oxirgi commit holatiga qaytar") and `git status` shows nothing changed.

UZ: "Ikkita bekor qilish bor. Serverda - rollback: oldingi versiya darhol qaytadi. Noutbukda - git: faylni oxirgi yaxshi commit’ga qaytaramiz. Faqat serverda qaytarsangiz, keyingi deploy xatoni yana olib chiqadi."

## Recorded fallback

`../../exercises/namuna/natijalar/09-rollback.txt`: the same sequence in the test container (fake model, so no live wrong answer; the check was that the server’s `agent/instructions.md` hash went good → bad → good and that `git status` was clean afterwards).

## Teaching note

Three gates, each catching a different kind of mistake (say it in one sentence so owners do not read "tests passed" as "answers are right"):

- **pytest checks the code** (run by `deploy.py` on the laptop): a bracket left open in a file Claude edited fails the tests and nothing is deployed (`natijalar/x3-testlar-otmadi.txt`).
- **`pilot check` catches impossible prices and blocks the deploy** (run on the server before the switch): empty, zero, non-numeric or out-of-range prices, and a wholesale price above retail or below 70% of it; the running release is not touched (`natijalar/x7-narx-imkonsiz.txt`: wholesale 2 890 000 above retail 2 150 000).
- **`pilot eval` and staff ❌ catch plausible typos:** Optima wholesale 1 890 000 typed as 1 980 000 passes both gates above (checked with the template’s 131 tests on 2026-11-03); the paid test set’s exact-price questions (Optima x 8 expects 15 120 000) fail on it, and staff pressing ❌ catch it in daily use.

The mistake in this demo (a changed rule in `instructions.md`) passes all three automatic gates, which is why rollback matters.
