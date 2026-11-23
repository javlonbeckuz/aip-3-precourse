# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Not a software project: no code, build, lint, or test commands. It is a set of Markdown files, written in Uzbek (Latin script), for the "Praktikum 3.0" workshop on deciding which business process to automate with AI agents. The fictional example company is «Baraka Office» MChJ, an office-furniture seller. Its figures are illustrative ("shartli misol"). Write new content in Uzbek and match the existing tone and formatting.

## Layout and how the pieces connect

- `hujjatlar/` is the company's source-of-truth corpus (price list/catalog, company presentation, sample contract/warranty, internal rules and KPI regulation). It is the knowledge base that agents answer from. When checking an interview answer, verify it against these files. The staff discuss prices, discounts, delivery times, and who answers what.
- `kit1-interviews/` (Kit 1, "Ish qayerga ketyapti?") holds one `<name>-form-b.md` per employee. Each is a task inventory built from an interview.
- `kit2-scoring/` (Kit 2, "Qaysi jarayondan boshlaymiz?") holds `form-a-scoring.md`, which scores up to 8 processes on criteria A.2–A.9, and `form-b-matrix.md`, which places them on a value (A.8) × ease (A.9) matrix and records the chosen process (B.1) and why (B.2). Both are mostly blank templates. They say to fill them in by hand or with a `/kit2` slash command; no such command exists in this repo yet. Kit 2 is meant to draw its processes from the Kit 1 forms.
- `.stamp` is an empty marker file.

## Conventions inside the Kit 1 forms

- Column codes B.1–B.9 are fixed; keep them when adding rows or files.
- B.4 (weekly hours) = B.2 × B.3 / 60. Show the arithmetic in the cell, e.g. `3,2 (48 × 4 / 60)`. Use a decimal comma.
- B.7 is Q (clear rule) or F (judgment); B.8 is past/o'rta/yuqori; B.9 is A (agent), R (robot), I (human), B (together).
- The total row is cross-checked in both directions (the row sum and the column sum must match) and stamped "✓". Re-verify it after any edit.
- Below the table, a corrections table lists what was fixed after the employee's review. For example, transcript "125" corrected to "about 25", or waiting time excluded because it isn't a task. A "Kuzatuvlar" (observations) section follows.
- Header metadata records the employee, role, department, interview date, and whether the employee reviewed the form.

## Facts that must stay consistent across files

The rules below appear in several files. A change in one should be checked against the others.

- Discount authority: sales manager up to 5% (order > 20M so'm); ROP up to 10% in writing (100% prepayment or > 50M so'm); anything above 10% only the CEO, on tenders > 150M so'm (price list §5).
- Delivery: the contract says 7 working days, but the staff were trained to say "3 days". Madina's form flags this contradiction.
- Free 3D design applies above 15M so'm, within 24 hours.
- Internal contacts (accountant, designer, logistics, IT, HR, ROP) are in the table in `04_Ichki_Tartib_va_KPI_Reglamenti.md` §4.
