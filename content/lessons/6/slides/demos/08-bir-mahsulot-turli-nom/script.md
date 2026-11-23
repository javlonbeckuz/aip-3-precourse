# Demo 8: one product, four names; one customer, two names

Day 5, 2:36-2:40 (4 minutes), before exercise 7.
Bold term taught: **Data governance / master data**.
Curriculum: "‹Umidjon aka›, ‹Umidjon sinfdosh›, ‹U. Karimov› in three systems. Agents fail on messy data before they fail on intelligence" (`praktikum-3-curriculum.md:580`).

## What the room should see

Four of Baraka's seven week-one errors were data, not intelligence: a stale export (twice) and the sales deck contradicting the contract (twice).
And the course's own Baraka data has the same disease between departments.

## Materials

| What | Path |
| --- | --- |
| The names table (Uzbek, for the screen) | `nomlar-jadvali.md` |
| Price list, 1C export | `pilot-template/data/narxlar.csv`, `pilot-template/data/ombor-1c.csv` |
| CRM export and 1C receivables (other labs, read only) | `department-labs/sales/data/crm-eksport-amocrm.csv`, `department-labs/finance-ops/data/baraka-office/1c-receivables-2026-11-01.csv` |

## Steps

1. Put `nomlar-jadvali.md` on the screen.
   Read the Optima row: «Optima», «140 lik stol», WS-102, «Стол Optima 140x70 (ЛДСП 25мм, П-каркас)».
   UZ: «Bitta stol, to‘rtta nom. Agent bularning birini bilmasa, boshqa stolni hisoblaydi.»
2. Senator row: one code in the price list, two codes in the warehouse (black CH-203 and brown CH-203-BR), and «boss kreslo» in the managers' mouths.
   UZ: «Bitta nom, ikki narsa: rangini so‘ramasa, qoldiq noto‘g‘ri chiqadi.»
3. Customer row: «Ziyo Ta'lim markazi» in 1C receivables, «Ziyo Ta'lim MChJ» in the CRM.
   UZ: «Bir mijozmi, ikkimi? Agent bilmaydi. STIR bilan buxgalter aniqlaydi. Bitta mijoz - bitta kalit.»
4. The KP row: one rule, two documents (KP «3 yil kafolat», contract «mexanizmga 12 oy»); Baraka removed the KP from the agent's sources.
5. The rule on the slide: pick one key per thing (product code, customer STIR) and one source per rule, write the other names into `agent/memory.md`, and ask a person when unsure.

## Fallback

Nothing to fail: the table is a file.
