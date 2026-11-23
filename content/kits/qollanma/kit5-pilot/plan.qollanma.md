# A shakli, sinov rejasi (plan.md): qanday to‘ldirish

Sinov rejasi - 2-4 haftalik sinovning chegaralari: bitta raqamli maqsad, sanalar, agent nima qila oladi, qachon to‘xtatiladi.
4-darsda, agent ishga tushishidan oldin bo‘lim boshlig‘i bilan to‘ldiriladi.

## Boshlashdan oldin kerak bo‘ladi

- Boshlang‘ich raqamlar (`baseline.md`, `numbers.md` dagi «Agentgacha» ustuni).
- Agentning tizim yo‘riqnomasi (`kit3-agent/instructions.md`): B.4 va B.5.
- Bo‘lim boshlig‘i bilan 20 daqiqa.
- To‘plam 4 dagi 15 daqiqalik suhbatlar rejalashtirilgan bo‘lishi.

## Har bir maydon

| Kod | Maydon | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| - | Jarayon | Tanlangan jarayon | To‘plam 2, B.1 | Narx, qoldiq, chegirma va muddat savollariga javob |
| - | Sinov egasi | Sinov uchun javob beradigan rahbar | O‘zingiz | Kompaniya egasi (Rustamov S.A., B01); loyiha yetakchisi Malika |
| - | Bo‘lim boshlig‘i | Rejaga rozi bo‘lgan boshliq | Bo‘lim boshlig‘i | Jamshid Karimov (B02), rozi, 2026-12-14 |
| - | Sana | Reja tuzilgan kun | Taqvim | 2026-12-13 |
| A.1 | Jarayon va agent | Jarayon nomi va agent nomi | instructions.md | Xodim savolni «Savdo yordamchisi» botiga yozadi; bot prays-list, qoidalar va 1C eksportidan javob qoralaydi; mijozga xodim o‘zi aytadi |
| A.2 | Maqsad, bitta raqamda | «... dan ... gacha» | baseline.md | B.2: bitta savolga javob topish 6 daqiqadan 2 daqiqagacha, tekshirish vaqtisiz |
| A.3 | Sanalar | Boshlanishi - tugashi, 2-4 hafta | Taqvim | 2026-12-14 (dushanba) - 2026-12-26 (shanba), 2 hafta, 12 ish kuni; 27-dekabr 6-dars |
| A.4 | Qamrov | Qaysi mijozlar, so‘rovlar | Siz | Botga 4 kishi yozadi (Madina, Malika, Zarina, Bekzod); faqat 4 mavzu; KP, tender va 150 mln dan katta buyurtma kirmaydi |
| A.5 | Chegaralar | Agent nima qila oladi / qila olmaydi | instructions.md, B.4 va B.5 | 1-hafta: har bir javobni Malika tasdiqlaydi; 2-hafta: kelishilgandan keyin xodim javobni o‘zi o‘qib, ✅ yoki ❌ bosadi |
| A.6 | Muvaffaqiyat mezonlari | Raqam bilan | baseline.md | 2-haftada: B.2 2 daqiqa yoki kam; B.3 5 yoki kam; B.7 3 soat yoki kam; B.1 kamida 60; B.8 2 yoki kam |
| A.7 | To‘xtatish sharti | Qaysi hodisada darhol to‘xtatiladi | Siz | Bot javobi orqali mijozga noto‘g‘ri narx, 5% dan katta chegirma yoki 7 ish kunidan qisqa muddat aytilsa (bitta holat ham) yoki bir kunda 3 ta ❌: darhol /stop |
| A.8 | Kim va qanchalik tez-tez tekshiradi | Tekshiruvchi va tartib | To‘plam 4, A.5 | 1-hafta: Malika har bir qoralamani 5 daqiqa ichida tasdiqlaydi; har kuni 17:30 da ❌ larni ko‘radi; Jamshid aka uzatilgan holatlarga o‘sha kuni javob beradi |
| A.9 | Haftalik ko‘rib chiqish | Kun, vaqt, kim qatnashadi | Siz | Har shanba 16:00, 30 daqiqa (19.12 va 26.12): Rustamov S.A., Jamshid Karimov, Malika |

Rejadagi chegaralar yo‘riqnomadan keng bo‘lmasin: A.5 B.4 va B.5 bilan solishtiriladi.
Maqsad bitta raqam: ko‘p maqsad yozilsa, oxirida hech biri isbotlanmaydi.

## Ko‘p uchraydigan xatolar

1. Maqsad raqamsiz: «javoblar yaxshilansin».
   Tuzatish: «6 daqiqadan 2 daqiqagacha» kabi bitta raqam yozing.
2. Boshlang‘ich raqam yo‘q, maqsad esa bor.
   Tuzatish: avval `/kit5 baseline`; aks holda maqsadni o‘lchab bo‘lmaydi.
3. To‘xtatish sharti yo‘q yoki noaniq: «muammo bo‘lsa».
   Tuzatish: aniq hodisani yozing va kim to‘xtatishini ayting (/stop).
4. Birinchi haftadan agentga to‘liq ruxsat berilgan.
   Tuzatish: birinchi hafta faqat qoralama, odam tasdiqlaydi; keyin bitta qadamni bo‘shatish haftalik ko‘rib chiqishda kelishiladi.
5. Bo‘lim boshlig‘i rejani ko‘rmagan.
   Tuzatish: u rozi bo‘lmaguncha agent ishga tushmaydi.

## Tayyor bo‘lganini qanday bilasiz

Mentor 5-darsning boshida tekshiradi:

- [ ] A.1-A.9 to‘ldirilgan, maqsad bitta raqam.
- [ ] Bo‘lim boshlig‘i rozi bo‘lgan.
- [ ] To‘plam 4 suhbatlari agent ishga tushishidan oldin bo‘lgan.
- [ ] Sinov kamida 2 to‘liq hafta.

## Claude Code bilan

```text
/kit5 reja
```

/kit5 boshlang‘ich raqamlar va yo‘riqnomani o‘qib, har bir maydonni siz bilan to‘ldiradi va reja yo‘riqnomadan ko‘proq ruxsat bermasligini tekshiradi.

## Namuna

- To‘ldirilgan namuna: [Baraka Office, plan.md](../../namunalar/baraka-office/kit5-pilot/plan.md)
- Yomon misollar: [yomon-misollar.md](../../namunalar/yomon-misollar.md)
- Skill namunasi: [skills/kit5/example/](../../skills/kit5/example/) (`suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
