# Demo script 4: the formula check (hallucination)

Slot: 1:30-1:34, slide 28.
Bold term: Hallucination.
Files: `demos/formula-check/savdo-oktabr.xlsx` (and `.csv`), answer key `demos/formula-check/javob-kaliti.md`.

## Goal

Owners see that AI gives a confident number with no red error cell, and that the defence is one habit: ask for the formula and the rows it used.

## Steps

1. New chat in claude.ai; attach `savdo-oktabr.xlsx`.
2. Ask (UZ):

```text
Oktabr oyidagi jami savdo qancha?
```

3. Read the answer aloud; write the number on the flipchart.
4. Ask (UZ):

```text
Qanday hisobladingiz? Formulani va qaysi qatorlarni qo‘shganingizni ko‘rsat.
```

5. Open `javob-kaliti.md` and compare.
   The correct October total is in bold there; the file has two traps (three amounts stored as text, one November row at the end).
6. Say (UZ): "Excel xato qilsa, katakni qizil qiladi. AI xato qilsa, chiroyli javob beradi. Shuning uchun har doim so‘rang: formulangni ko‘rsat."

## If the model gets it right

That is still the lesson: the number became trustworthy only because you asked how it was calculated.
Show the "show your work" habit card on slide 29.

## If it fails

No Wi-Fi: open the xlsx in Excel, type `=SUM(E2:E36)` and show that even Excel gives the wrong October total here (16 270 000) without any warning, because three cells are text and one row is November.
The point holds: check where a number comes from.

## Why it matters to an owner

Never trust numbers without checking.
In Kit 1 the same habit catches the misheard "bir uch-to‘rt yuz ming".
