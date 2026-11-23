# Demo 3: an empty Excel arrives, the agent hands it over instead of writing zero

Day 5, 1:54-1:57 (3 minutes), before exercise 6.
Bold term taught: **Escalation path**; also human in the loop.
Curriculum: "Escalation. An empty Excel arrives; the agent sends it to the responsible person instead of writing zero" (`praktikum-3-curriculum.md:589`).

## What the room should see

An agent that does not know must say so and give the case to a named person, through a named channel.
Silent wrong answers ("0 dona") are worse than "I don't know".

## Materials

| What | Path |
| --- | --- |
| Thursday 17 Dec in the owner's chat: alert at 08:00, failed job at 08:30 | `../../exercises/namuna/baraka-1-hafta/rahbar-telegrami.txt` |
| The same morning in the head of sales' chat: the hand-over and the reply | `../../exercises/namuna/baraka-1-hafta/jamshid-telegrami.txt` |
| The five Kit 3 B.6 cases tested on Sunday with `pilot ask` (no change to B.1) | `../../exercises/namuna/yaxshilash/eskalatsiya-sinovi.txt` |
| Offline live run with an empty 1C file | `../../_build/sim/live_eval.py v2 bosh-fayl ask "ErgoPro omborda bormi?"` |

## Steps

1. Read the Thursday timeline:
   08:00 the 1C export arrives empty; 08:00 the owner gets «⚠️ Ma’lumot manbasi muammosi: Ombor qoldig‘i (1C eksport): jadvalda qatorlar yo‘q»; 08:30 the low-stock job says it could not answer; 09:10 a call-centre operator asks «ErgoPro omborda nechta bor?» and the case goes to Jamshid aka, who answers after calling the warehouse; 10:40 Otabek aka exports again.
   UZ: «Bot ‹0 dona› demadi. Bilmasligini aytdi va savolni mas’ul odamga berdi.»
2. Live (offline): the `live_eval.py ... bosh-fayl ask` command prints «ODAMGA: ombor fayli bilan muammo (... jadvalda qatorlar yo‘q) ...».
   With your real bot: do it on the laptop copy only, never on the server's real file.
3. Show the hand-over message format in Jamshid aka's chat, and that the reply went back to the manager («Xodim javobi: ...»).
4. Close with the three-part rule on the slide: holat - kimga - qanday.
   UZ: «Har bir holat uchun bitta soxta savolni pilot ask bilan bering: B.1 buzilmaydi. Botga yuborsangiz: yakshanba guruhida xodimga dushanba 9:00 da, shanba guruhida darhol boradi.»

## Fallback

Read the two chat files; the times and texts are the same as the live run.
