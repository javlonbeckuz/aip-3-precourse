# 4-mashq. To‘plam 5 A: sinov rejasi (1:50-2:20, 30 daqiqa)

**Natija:** `kompaniya/kit5-pilot/plan.md` - bitta raqamli maqsad, sanalar, chegaralar, muvaffaqiyat mezonlari, to‘xtatish sharti, kim tekshiradi, haftalik ko‘rib chiqish.
Reja bo‘lim boshlig‘i bilan agent ishga tushishidan **oldin** kelishiladi.

## Nega kerak

Sinov (pilot) - cheklangan, muddatli, real sinov: 2 hafta, bitta jarayon, bir necha xodim.
Rejasiz sinov 6-darsda «yaxshi bo‘ldi shekilli» degan taassurot bilan tugaydi.
Reja bilan esa 6-darsda (26 yoki 27-dekabr) bitta savolga javob berasiz: maqsadga yetdikmi, ha yoki yo‘q.

## Boshlashdan oldin kerak

| Nima | Qayerda |
|---|---|
| Boshlang‘ich raqamlar («Agentgacha») | `kit5-pilot/baseline.md` (2-darsdan keyin) |
| Agent yo‘riqnomasi: nima qila oladi (B.4) va qila olmaydi (B.5), kimga uzatadi (B.6) | `kit3-agent/instructions.md` |
| Kim botga yozadi, kim tekshiradi | Boshingizda: bugun yozamiz |
| Loyiha yetakchisi (2-darsdan keyin rozilik bergan xodim) | `kit5-pilot/briefing.md` |

## Qadamlar

### 1. Namunani o‘qing (5 daqiqa, juftlikda)

Ikki faylni yonma-yon oching:

- Yaxshi: `namuna/kompaniya/kit5-pilot/plan.md` (Baraka Office, izohlar bilan).
- Yomon: `namuna/yomon/plan-yomon.md`.

Yomon rejaning har bandida nima xato ekanini sherigingizga ayting.
Keyin faylning oxiridagi javob bilan solishtiring.

### 2. O‘z rejangiz (17 daqiqa)

Warp’da `kompaniya` papkasini oching (app emas!), `claude` deb yozing va yuboring:

```text
/kit5 reja
```

Skill sizdan A.1-A.9 ni bittalab so‘raydi.
`/kit5` ishlamasa, shu topshiriq matnini yuboring:

```text
kit5-pilot/baseline.md va kit3-agent/instructions.md ni o'qi.
Men bilan birga kit5-pilot/plan.md ni To'plam 5 A shakli bo'yicha to'ldir (A.1-A.9). Bir xabarda ko'pi bilan 3 ta savol ber.
Qoidalar:
- A.2 maqsad bitta raqam, baseline.md dagi raqamdan: "... dan ... gacha", birligi bilan.
- A.3: 6-darsgacha (26 yoki 27-dekabr) kamida 2 to'liq hafta; ishga tushirish dushanbadan kechikmasin.
- A.5 instructions.md dagi B.4 va B.5 dan ko'p ruxsat bermasin. 1-hafta: agent qoralama yozadi, odam har javobni tasdiqlaydi.
- A.7 aniq hodisa bo'lsin, "ko'p xato" emas; kim to'xtatadi va qanday.
- A.8 da agent o'zini o'zi tekshirmaydi.
Oxirida plan.md ni yoz va A.2, A.7 ni menga qayta o'qib ber.
```

Mentor stol bo‘ylab yuradi va uchta narsani tekshiradi: A.2 da birlik bormi, A.7 aniq hodisami, A.8 da odam ismi bormi.

### 3. Rejadan bot sozlamasiga (3 daqiqa, uyda ham bo‘ladi)

Rejaning A.4, A.5, A.7, A.8 bandlari botning `.env` qatorlariga aylanadi.
Baraka namunasidagi «Rejadan bot sozlamasiga» jadvalini o‘qing.
Bugun `.env` ga tegmaysiz: xodimlar bilan suhbatdan keyin, uy vazifasida o‘zgartirasiz.

## Har bir maydon qayerdan keladi

| Maydon | Qayerdan | Odatiy xato |
|---|---|---|
| A.1 | To‘plam 2 B.1 (jarayon nomi), `instructions.md` (agent nomi) | Jarayon o‘rniga bo‘lim nomi |
| A.2 | `baseline.md` dagi bitta ko‘rsatkich | Raqamsiz fe’l: «tezlashtirish», «yaxshilash» |
| A.3 | Taqvim: dushanba, 14-dekabr | «Bot tayyor bo‘lgach» |
| A.4 | To‘plam 3 A (kim bugun shu ishni qiladi) | «Hamma» |
| A.5 | `instructions.md` B.4 va B.5 | Yo‘riqnomadan ko‘p ruxsat |
| A.6 | `baseline.md` + maqsad | «Mamnun bo‘lsa» |
| A.7 | Xatoning narxi (To‘plam 1 B.8: «yuqori» deb belgilangan vazifalar) | «Juda ko‘p xato bo‘lsa» |
| A.8 | To‘plam 3 A.5 (kim tekshiradi) | «Agent o‘zi» |
| A.9 | Bo‘lim boshlig‘i taqvimi | «Vaqt bo‘lganda» |

Birliklarni aralashtirmang: kunlik va haftalik raqam bitta qatorda bo‘lmasin (FAQ R-02).

## Tayyor bo‘ldi, agar

- [ ] `kit5-pilot/plan.md` saqlangan, A.1-A.9 bo‘sh emas.
- [ ] A.2 - bitta raqam, birligi bilan, `baseline.md` dagi raqamdan boshlanadi.
- [ ] A.7 - aniq hodisa va kim `/stop` qiladi.
- [ ] A.8 - odam ismi bilan, agent emas.
- [ ] Bo‘lim boshlig‘i bilan uchrashuv vaqti belgilangan (ishga tushirishdan oldin).
- [ ] Mentor tekshirdi: kod 4.9.
