# To‘plam 5 · A shakli: Sinov rejasi

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/plan.md`

- Jarayon: narx, qoldiq, chegirma va muddat savoli (To‘plam 2, 1-jarayon)
- Sinov egasi: kompaniya egasi
- Loyiha yetakchisi: Malika
- Bo‘lim boshlig‘i: Jamshid Karimov, savdo bo‘limi rahbari - rozi (egasining so‘zi, 2026-12-13)
- Sana: 2026-12-13

### A.1 Jarayon va agent

Savdo yordamchisi boti (`kit3-agent/instructions.md`).
Savollar: narx, qoldiq, chegirma, yetkazish muddati.

### A.2 Maqsad, bitta raqamda (... dan ... gacha)

Bitta savolga javob topish vaqti (B.2): 6 daqiqadan 3 daqiqagacha.
Boshlang‘ich 6 daqiqa: `baseline.md`, Malikaning jonli yozuvi, 01.12-05.12, 12 holat (oraliq 2-15).
Maqsad: 6 - 3 = 3 daqiqa kam, ya’ni (3 - 6) / 6 × 100 = -50%.

### A.3 Sanalar: boshlanishi - tugashi (2-4 hafta)

2026-12-14 (dushanba) - 2026-12-27 (yakshanba), 2 hafta.

| Hafta | Ish kunlari | Ko‘rib chiqish |
|---|---|---|
| 1-hafta | 14.12-19.12 (dush-shan, 6 ish kuni) | 19.12, shanba, 14:00 |
| 2-hafta | 21.12-26.12 (dush-shan, 6 ish kuni) | 26.12, shanba, 14:00 |

14-dekabr ertalab To‘plam 4 suhbatlari (Malika, Zarina) bo‘ladi; bot shu suhbatlardan keyin ishga tushadi.
2 hafta - qoidadagi eng kam muddat; 6-darsgacha aynan 2 to‘liq hafta ma’lumot bo‘ladi.

### A.4 Qamrov: qaysi mijozlar, so‘rovlar yoki buyurtmalar

- Savdo bo‘limining narx, qoldiq, chegirma va muddat savollari.
- Botdan faqat Malika va Zarina foydalanadi.
- Boshqa menejerlar savolni Malika yoki Zarina orqali beradi.
- Qamrovdan tashqari: tender, shikoyat, 5% dan katta chegirma va `instructions.md` B.6 dagi boshqa holatlar - ular Jamshid akaga uzatiladi.

### A.5 Chegaralar: agent qila oladi / qila olmaydi

`instructions.md` B.4 va B.5 bilan solishtirildi: reja yo‘riqnomadan ko‘p ruxsat bermaydi.
Ikki hafta ham «qoralama yozadi, odam tasdiqlaydi» tartibida: har bir javobni savol bergan xodim tekshiradi va mijozga o‘zi aytadi.
Bitta qadamni bo‘shatish faqat haftalik ko‘rib chiqishda kelishilsa, shu faylga yoziladi.

- 2026-12-19 ko‘rib chiqish: 2-hafta ham shunday qoladi - bot qoralama yozadi, har bir javobni savol bergan xodim tasdiqlaydi; hech bir qadam bo‘shatilmadi (egasining qarori).
- 2026-12-27 yakun: qaror «o‘zgartirish».
  Yana 2 hafta (3-4-hafta) faqat qoralama; hech bir qadam bo‘shatilmaydi.
  Qo‘shimcha: dastur tekshiruvi (chegirma foizi > 5% va 1C fayli sanasi), uni IT-administrator qiladi.
  Ishga tushishdan oldin T1-T17 sinovi.
  3-4-hafta sanalari [?] (egasi belgilaydi).

Qila oladi (B.4):
- narx (1-4 dona chakana, 5+ ulgurji) va summa = narx × dona soni;
- 1C qoldig‘i va fayl sanasi;
- chegirma faqat qoida doirasida: 20 000 000 so‘mdan katta buyurtmaga 5% gacha;
- muddat: 7 ish kuni, maxsus o‘lchamdagi MDF/shpon 12 ish kuni; yetkazish, montaj va 3D shartlari `qoidalar.md` bo‘yicha;
- javobni faqat savol bergan xodimga yozadi.

Qila olmaydi (B.5):
- mijozga hech narsa yozmaydi, kompaniya nomidan yozmaydi;
- 5% dan katta chegirma va’da qilmaydi (100% oldindan to‘lov bo‘lsa ham);
- og‘zaki qoidalarni aytmaydi («3 kunda yetkazamiz», «12-15% chegirma»);
- tannarxni aytmaydi; pul o‘tkazmaydi; ma’lumotni o‘zgartirmaydi; xodimlarni baholamaydi.

Jamshid akaga uzatadi (B.6): 5% dan katta chegirma, tender, shikoyat va B.6 jadvalidagi qolgan holatlar (prays-listda yo‘q mahsulot, 1C muammosi, tannarx savoli va boshqalar).

### A.6 Muvaffaqiyat mezonlari

| Ko‘rsatkich | Agentgacha | Mezon | Qachon tekshiriladi |
|---|---|---|---|
| B.2 Bitta savolga vaqt | 6 daqiqa | 3 daqiqa yoki kam | 2-hafta oxiri (26.12) |
| B.3 Xato javoblar | 9 ta / hafta | har haftada 3 tadan oshmaydi | har shanba |
| B.8 Mijoz shikoyatlari | 2 ta / hafta | har haftada 2 tadan oshmaydi | har shanba |

B.8 mezoni agentgacha holatdan yomon bo‘lmaslikni bildiradi (2 = 2).

### A.7 To‘xtatish sharti: agar ... bo‘lsa, darhol to‘xtatamiz

Quyidagilardan biri bo‘lsa, darhol `/stop`:
1. Bot mijozga biror narsa yozsa (bitta holat yetarli).
2. Bot 5% dan katta chegirma va’da qilsa va bu javob xodimga yetib borsa (bitta holat yetarli).

`/stop` ni Malika, Zarina yoki Jamshid aka bera oladi; to‘xtatgani uchun hech kim ayblanmaydi.

Kamchilik (2026-12-23): 2-shart bajarildi, lekin `/stop` berilmadi, chunki xodim ❌ bosgan va mijozga hech narsa ketmagan edi.
Qoida aniqlashtirildi (egasi, 2026-12-27): shart bajarilsa, mijozga yetgan-yetmaganidan qat’i nazar `/stop` beriladi.
Keyin `/kit5 xato`: B.13 jurnaliga yoziladi, yo‘riqnoma tuzatiladi, sinov to‘plamida qayta tekshiriladi.

### A.8 Agent javoblarini kim va qanchalik tez-tez tekshiradi

- Har bir javobni savol bergan xodim (Malika yoki Zarina) tekshiradi; noto‘g‘ri bo‘lsa ❌ bosadi.
- Jamshid aka ish jurnalini har kuni ko‘radi.
- B.7 (tekshirish soati) haftasiga butun vazifa uchun bitta raqam yoziladi, xodim bo‘yicha emas.

### A.9 Haftalik ko‘rib chiqish: kun, vaqt, kim qatnashadi

- Har shanba 14:00: 19.12 va 26.12 (ish vaqti ichida; shanba ish kuni 15:00 da tugaydi, egasining qarori, 2026-12-13).
- Qatnashadi: kompaniya egasi, Jamshid Karimov, Malika.
- Kun tartibi: hafta raqamlari (`/kit5 hafta N`), A.7 tekshiruvi, xatolar jurnali, keyingi hafta ruxsatlari.

## Xarajat: loyiha yetakchisi

Malikaning qo‘shimcha haqi: haftasiga 200 000 so‘m, natijadan qat’i nazar (`briefing.md`, egasining so‘zi).
2 hafta: 2 × 200 000 = 400 000 so‘m (tekshirish: 200 000 + 200 000 = 400 000).
Egasining qarori bilan sinov xarajatiga (`numbers.md`, B.12) kiritiladi.

## B.2 sinovda qanday o‘lchanadi

Egasi bilan kelishildi (2026-12-13):
- Malika har hafta har bir savol turidan (narx, qoldiq, chegirma, muddat) 3 ta holatni o‘lchaydi: 4 × 3 = 12 holat, agentgacha kabi.
- Har bir holatning daqiqasi alohida yoziladi, shunda o‘rtacha va oraliqni qayta tekshirsa bo‘ladi.
- Ish o‘lchanadi, odam emas: kim tezroq ishlagani yozilmaydi.
- Bot qoralamasini tekshirish vaqti B.2 ga kirmaydi, u B.7 ga yoziladi.

## Ochiq qolganlar

- B.6 yakunlangan bitimlar: agentgacha va sinovda [?] qoladi.
  Egasining qarori (2026-12-13): bu pilotda asosiy ko‘rsatkich emas.
