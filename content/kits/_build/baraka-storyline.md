# Baraka Office storyline for the kit examples

Internal note for everyone writing kit guides and examples (`kits/qollanma/`, `kits/namunalar/`, `kits/skills/kitN/example/`).
Facts follow `ROOT/_build/overnight-2026-11-03/BARAKA-CANON.md`; the canonical files win if anything here disagrees.
The filled examples in `kits/namunalar/baraka-office/` come from real `/kit1`-`/kit5` runs on the company folder in `kits/_build/baraka-run/baraka-office/`, then get margin notes.

## Company

- "Baraka Office" MChJ, office furniture manufacturer with its own factory (Sergeli, 3,500 m2) and a showroom (Chilonzor, 400 m2); B2B "turnkey" office fit-out; founded 2019; 64 staff (`ROOT/department-labs/hr/data/baraka-xodimlar.csv`).
- Revenue Jan-Oct 2026: 15.85 bln so'm incl. 12% VAT; about 0.9-1.0 bln so'm of won deals a month; gross margin 30.3%.
- Week: Mon-Fri 09:00-18:00 with a 1-hour lunch (8 h), Sat 09:00-15:00 (6 h), Sunday off: 46 working hours, 6 working days (`demo-fayllar/04_Ichki_Tartib_va_KPI_Reglamenti.md`).
- Sales manager base pay 4,500,000 so'm a month; hourly rate about 4,500,000 / (46 x 4.33) = 4,500,000 / 199 = 22,600 so'm.
- Owner and person running the kits: Rustamov S.A. (B01, bosh direktor); do not invent his first name.

## People in the examples (HR roster ids)

| Id | Name | Role | Part in the story |
|---|---|---|---|
| B01 | Rustamov S.A. | Bosh direktor | runs the kits, signs |
| B02 | Jamshid Karimov | Savdo bo‘limi rahbari (ROP) | department head; agrees Kit 2 scores and Kit 5 plan; approves discounts 5-10% |
| B04 | Malika Rashidova | Savdo menejeri (since 2021) | Kit 1 interview 1; pilot lead, checks the bot's answers |
| B13 | Zarina Abdullayeva | Call-markaz operatori | Kit 1 interview 2 |
| B24 / B25 | Nodira Karimova / Shoira To‘xtayeva | Bosh buxgalter / Buxgalter | confirm advance payments |
| B53 | Umid Salimov | Omborchi | answers stock questions by phone today |

## Sales process (from `demo-fayllar/06_Intervyu_Savdo_ROP_Jamshid.md` and the CRM export)

Lead (Instagram, Telegram, call centre) -> qualification call -> free measurement (zamer) or 3D -> showroom or office meeting -> commercial proposal (KP) and contract -> 70% advance -> order to the factory.
CRM: amoCRM, export `ROOT/department-labs/sales/data/crm-eksport-amocrm.csv` (852 deals, Jul-Nov 2026).
About 105 KPs a month across 8 managers (Oct 2026: Malika 20, Bekzod 20); 110 of 429 KPs (26%) have no follow-up contact recorded; 124 won deals, median budget 19.17 mln so'm.
Price list: `ROOT/department-labs/sales/data/prays-list.csv` (WS-101 "Start" stol 1,450,000; CH-202 "ErgoPro X5" 2,850,000; PK-10 "Startap 10" 34,500,000 ...).
Rules: `ROOT/department-labs/sales/data/savdo-qoidalari.json` (VAT 12%; seller discount up to 5% on orders from 20 mln, ROP up to 10% from 50 mln; 70% advance; delivery 7 working days standard, 12 individual; warranty 24 months body, 12 months mechanism).
Deliberate contradictions (teaching material, never "fix" them): Jamshid tells sellers "3 working days" delivery and "12-15% discount on 30-40 mln orders"; the price list says 5% / 10% and the contract says 7 days; marketing's KP says 36-month warranty and free regional delivery.

## The kit story (aligned to BARAKA-CANON.md "Baraka's pilot story", 02:27)

- Kit 1 (after lesson 1): Rustamov tells the sales team in the Monday meeting and in the "Baraka Savdo" Telegram group why the interviews happen; Jamshid interviews Malika Rashidova (B04, sales manager) and Zarina Abdullayeva (B13, call centre), and Rustamov interviews Jamshid (B02, head of sales).
  The common thread: managers and operators lose time finding price, wholesale price, discount authority, stock and delivery terms (asking Jamshid in Telegram, calling the warehouse, opening the 14-page price list), and Jamshid is interrupted all day answering the same questions.
  Malika's transcript holds the number traps: «uch-to‘rt marta» transcribed «34 marta», «bir uch-to‘rt yuz ming» transcribed «1 300 000», «bir yarim soat» (90 minutes, not a trap).
- Kit 2 (lesson 2): candidates include answering managers' and operators' questions on price, stock, discount and delivery; drafting commercial offers (KP tayyorlash); the daily sales report from amoCRM.
  Pilot #1, the winner: the Q&A assistant "Savdo yordamchisi"; KP drafting is process #2, chosen on lesson 6 for after the course.
- Kits 3-5 follow `ROOT/pilot-template/`: Kit 3 B = `pilot-template/agent/instructions.md` (sources: price list CSV export, rules document by hand, 1C stock CSV export each morning; escalation to Jamshid); Kit 4 test set = `pilot-template/evals/test-set.toml`; Kit 5 Agentgacha = `pilot-template/kit5-baseline.toml` (B1 120, B2 6, B3 9, B4 15, B5 100, B7 3, B8 2) and weeks 1-2 = `pilot-template/samples/kit5-2-hafta.md` (B1 115/134, B3 7/2, B5 104/125, error log entries).
- Kit 4 people: Malika (catches price and spec errors; checks the bot's answers) and Zarina (call centre, asks the bot most often), prepared before go-live.
