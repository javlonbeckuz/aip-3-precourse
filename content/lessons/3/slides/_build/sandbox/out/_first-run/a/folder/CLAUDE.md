# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is not a code project.
There is no build, lint, or test tooling, and the directory is not a git repository.
It is a set of Uzbek-language Markdown files for "Praktikum 3.0" (a workshop on deciding which business process to hand to an AI agent).
All content is about a fictional-but-realistic office furniture company, "Baraka Office" MChJ.
The kit files say so explicitly: "shartli misol, raqamlar usulni ko'rsatish uchun" (hypothetical example, numbers only illustrate the method).

## Layout

- `hujjatlar/` - the company's source documents (numbered 01-04): price list and catalog, corporate proposal (KP), sample contract and warranty, internal rules and KPI regulation.
  These are the ground truth for facts such as prices, payment terms (70% advance, 30% within 15 bank days, 0.4% daily penalty), warranty (36 months), and working hours.
- `kit1-interviews/` - Kit 1, "Ish qayerga ketyapti?" (where does the work go).
  One B-form per employee (`<name>-form-b.md`) listing that person's weekly tasks.
- `kit2-scoring/` - Kit 2, "Qaysi jarayondan boshlaymiz?" (which process do we start with).
  `form-a-scoring.md` scores up to 8 processes on criteria A.2-A.9 (1-5 scale).
  `form-b-matrix.md` places those processes on a value (A.8) vs ease (A.9) matrix and records the chosen first process.
- `.stamp` - opaque marker file, leave it alone.

## Data flow between kits

Kit 1 output feeds Kit 2.
Tasks from the interview B-forms are grouped into processes, which become rows (A.1) in the Kit 2 A-form.
The Kit 2 B-form then maps each row to one of four quadrants: first trial, useful but needs planning, easy but small gain, leave alone for now.
The Kit 2 headers mention a `/kit2` command that fills the forms interactively, but no such command exists in this directory.

## Conventions for the interview B-forms

- Column order is fixed: B.1 task (starts with a verb), B.2 times per week, B.3 minutes each time, B.4 weekly hours, B.5 data source, B.6 output destination, B.7 Q/F, B.8 cost of error, B.9 tomorrow A/R/I/B.
- B.4 is always computed as `B.2 × B.3 / 60`, rounded to 1 decimal. The formula is written inside the cell, for example `3,2 (48 × 4 / 60)`.
- The totals row sums B.4 and is stated to be double-checked (`Jami 2 marta qo'shib tekshirildi ... ✓`). Recompute it whenever a row changes.
- B.7: `Q` = clear rule, `F` = judgment or experience.
- B.8: `past`, `o'rta`, `yuqori`, followed by a short reason.
- B.9: `A` = agent, `R` = robot (plain automation), `I` = human, `B` = together.
- Each form header records the interview date, the date the form was built, and whether the employee reviewed it. Corrections made by the employee are noted there (see `madina-form-b.md`).
- Numbers use a decimal comma (`3,2`) and thousands separated by spaces (`1 450 000 so'm`).

## Cross-file consistency

The interview forms reference facts from `hujjatlar/` (price-list PDF, AmoCRM, 1C stock, the 10-minute lead assignment rule, people such as Rustamov S.A. as director and Murodova Dilnoza as HR head).
When editing one, check the others so names, roles, and rules stay aligned.

## Writing rules for this repo

- Content is in Uzbek (Latin script). Keep it that way, including the apostrophe style already used in each file (plain `'` in `hujjatlar/`, typographic `‘` and `’` in the kit files).
- Keep each full sentence on its own line.
- Do not use the em dash. Use a plain dash.
