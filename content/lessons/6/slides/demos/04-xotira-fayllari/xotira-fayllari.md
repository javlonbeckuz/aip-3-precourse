# Xotira fayllari: agentning xulqi oddiy matnda yoziladi

5-dars, 0:46-0:52.
Agent nima qilishi, nimani bilishi va nimani eslab qolishi - hammasi oddiy matn fayllarida.
Siz ularni o‘qiy olasiz, o‘zgartira olasiz va o‘zgarishni test bilan tekshira olasiz.

## Pilot botingizda va Hermes’da

| Vazifasi | Pilot boti (`kompaniya/app/`) | Hermes (ixtiyoriy) | Kim yozadi |
|---|---|---|---|
| Agent kim, qanday gapiradi, nimani hech qachon qilmaydi | `agent/instructions.md` (To‘plam 3 B: B.1, B.5, B.8) | `~/.hermes/SOUL.md` | Siz |
| Biznes qoidalari va faktlar | `agent/instructions.md` (B.3, B.4, B.6) va `data/` | `AGENTS.md` (ish papkasida) | Siz |
| To‘g‘ri javob namunalari | `agent/examples.md` | - (Hermes o‘zi «skill» yozadi) | Siz yoki ROP |
| Xatolardan saboqlar, taxalluslar | `agent/memory.md` | `~/.hermes/memories/MEMORY.md` | Siz (pilot), agent o‘zi (Hermes) |
| Siz haqingizda | - | `~/.hermes/memories/USER.md` | Agent, Siz «eslab qol» deganda |
| Telefondan qo‘shilgan faktlar | `/eslab_qol` → serverda `runtime/memory.md` | «Buni xotirangga saqla: ...» | Siz, telefondan |
| Nima bo‘ldi (ish jurnali) | `runtime/journal/<sana>.jsonl` | `~/.hermes/` dagi sessiyalar | Dastur o‘zi |

Muhim farq: ish jurnali xotira emas.
Xotira - agent har savolda o‘qiydigan qisqa faktlar.
Jurnal - nima bo‘lganining to‘liq yozuvi (To‘plam 3 B.7, «audit izi»): uni Siz va Claude Code o‘qiysiz, agent emas.

## Xotira ataylab kichik

Hermes’da MEMORY.md 2 200 belgi, USER.md 1 375 belgi bilan cheklangan (hermes-agent.nousresearch.com, 2026-11-03 da tekshirildi).
Xotira suhbat boshida bir marta o‘qiladi; yangi faktlar keyingi suhbatdan ishlaydi (`/new`).
Pilot botida esa fayllar har bir savolda qayta o‘qiladi: `memory.md` ni o‘zgartirsangiz, keyingi savoldan ishlaydi.

Nega kichik: daftari bor odam kabi.
Hamma narsani yozib qo‘yadigan yordamchi kerakli narsani topa olmaydi.
Har bir fakt modelga har safar yuboriladi: katta xotira - sekinroq va qimmatroq javob.

## Baraka Office namunasi

`agent/memory.md`, 5-darsdan keyin (`../../exercises/namuna/yaxshilash/agent-v2/memory.md`):

```text
- 2026-12-13: Ombor fayli har kuni soat 08:00 da 1C dan yangilanadi (Otabek aka).
- 2026-12-20: Narx, chegirma, kafolat va yetkazish shartlari faqat prays-list va qoidalar hujjatidan; KP (taqdimot) - reklama, unga tayanma.
```

Har bir qatorda sana va bitta fakt.
Ikkinchi qator va KP ni manbalardan olib tashlash 1-haftadagi ikkita xatoni yo‘qotdi (`eval-2-kp-olib-tashlandi.txt`: 7 / 12 dan 9 / 12 ga).

Telefondan (namunaning 2-haftasi, chorshanba 23-dekabr 16:45), ROP yozdi:

```text
/eslab_qol Menejerlar «Staf mesh» yoki «stafmesh» deb yozsa, bu «Staff Mesh» xodim kreslosi (CH-201)
```

Ertasi kuni 10:05 dagi «Staf mesh 4 ta qancha?» savoliga agent Staff Mesh narxini aytdi va xodim ✅ bosdi (`../../exercises/namuna/baraka-2-hafta/jurnal/2026-12-24.jsonl`).

Hermes uchun Baraka namunasi: `hermes-namuna/` (SOUL.md, AGENTS.md, USER.md, MEMORY.md).

## Yomon namuna

```text
memory.md:
Biz eng yaxshi mebel kompaniyasimiz. Mijozlarga doim yaxshi munosabatda bo‘l.
Narxlar haqida ehtiyot bo‘l. Chegirma masalasida diqqatli bo‘l.
[va prays-listning to‘liq nusxasi, 14 qator]
```

**Nimasi yomon:** fakt yo‘q, faqat istaklar («ehtiyot bo‘l» agentning xulqini o‘zgartirmaydi); prays-list ikki joyda turibdi va biri eskiradi.
**To‘g‘rilangan:** har bir qator - sana va bitta tekshirsa bo‘ladigan fakt; narxlar faqat `data/` da.
