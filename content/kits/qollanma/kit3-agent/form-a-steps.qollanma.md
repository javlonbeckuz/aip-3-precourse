# A shakli, jarayon qadamlari bugun va ertaga: qanday to‘ldirish

A shakli - tanlangan jarayonning har bir qadami: bugun kim qiladi, ertaga kim qiladi, kim tekshiradi, kim qaror qiladi, kim javobgar.
3-darsda mentor bilan to‘ldiriladi, uyga vazifada o‘tgan haftadagi bitta real holat bilan tekshiriladi.

## Boshlashdan oldin kerak bo‘ladi

- To‘plam 2 dagi tanlov: `kit2-scoring/form-b-matrix.md`, B.1.
- To‘plam 1 dagi shu jarayonga kirgan vazifalar.
- O‘tgan haftadagi bitta real holat: Baraka misolida 2026-12-01 da Madinaga kelgan savol: «Optima stoldan 8 ta kerak, qancha bo‘ladi, omborda bormi, juma kuniga keltira olasizlarmi?» (to‘g‘ri hisob: ulgurji, 1 890 000 × 8 = 15 120 000 so‘m).
- Jarayonni bajaradigan xodim bilan 15 daqiqa.

## Har bir maydon

| Kod | Maydon | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| - | Jarayon | To‘plam 2 dagi tanlov | B.1 | Narx, qoldiq, chegirma va muddat savoli (agent: «Savdo yordamchisi») |
| - | Boshlanadi | Jarayon qaysi hodisadan boshlanadi | Real holat | Mijoz Telegram, Instagram yoki telefonda narx, qoldiq, chegirma yoki muddat haqida so‘raydi |
| - | Tugaydi | Qaysi natija bilan tugaydi | Real holat | Mijozga to‘g‘ri javob ketdi yoki savol mas’ul odamga o‘tdi (KP tayyorlash bu jarayonga kirmaydi) |
| - | Jarayon egasi | Natija uchun mas’ul rahbar | O‘zingiz | Jamshid Karimov (B02) |
| A.1 | Qadam | Bitta harakat, fe’l bilan | Real holatni boshidan aytib berish | 10 ta qadam; masalan 3-qadam: «Mahsulotni prays-listdan topish va narxni aytish: 1-4 dona chakana, 5+ dona ulgurji» |
| A.2 | Ma’lumot | Qadam uchun nima kerak | Real holat | Prays-list 2026 (CSV eksport), chegirma qoidalari (hujjat), 1C eksport (fayl, har kuni 08:00) |
| A.3 | Bugun: kim | Hozir kim qiladi | Real holat | Operator va menejerlar, 14 sahifalik PDF’dan; qoldiqni Otabek akadan Telegram’da so‘rashadi; 5% dan katta chegirmani Jamshid aka |
| A.4 | Ertaga A / R / I | A agent, R robot, I inson | Siz hal qilasiz | 5 ta qadam agentga (3, 4, 5, 6, 8: narx, summa, qoldiq, chegirma vakolati, muddat); 7-qadam (5% dan katta chegirma, tender): I, Jamshid aka; 9-qadam (mijozga aytish): I |
| A.5 | Kim tekshiradi | Natijani boshqa kim ko‘radi | Siz hal qilasiz | Operator yoki menejer mijozga aytishdan oldin o‘qiydi; chegirma qadamini Jamshid aka haftasiga bir marta ish jurnalidan ko‘radi |
| A.6 | Kim qaror qiladi | Shubha bo‘lsa kim hal qiladi | Siz hal qilasiz | 5% dan katta chegirma: Jamshid aka; 1C fayli eski bo‘lsa: Otabek aka; 7 ish kunidan tez so‘ralsa: Jamshid aka, Otabek aka bilan |
| A.7 | Kim javobgar | Xato uchun kim javob beradi | Siz hal qilasiz | Jamshid aka; ombor qoldig‘i qadamida Otabek aka |
| A.8 | Izoh: kutish, xatolar | Qayerda kutiladi, qanday xato bo‘ladi | To‘plam 1 «Kuzatuvlar», real holat | Bugun javob kutish 15-40 daqiqa; PDF’da qidirish 3-5 daqiqa, ulgurji narxda tez-tez adashiladi; sotuvchilar «3 kunda» degan, shartnomada 7 ish kuni |

Qoida: agent hech qachon o‘z qadamini o‘zi tekshirmaydi.
A.4 da «A» bo‘lgan qatorda A.5 ga agent yozilmaydi.

## Ko‘p uchraydigan xatolar

1. Bitta qatorda bir nechta harakat: «narx va chegirmani topib aytish».
   Tuzatish: har bir harakatni alohida qatorga yozing, aks holda kim nima qilishi aralashadi.
2. Bo‘sh kataklar qolgan.
   Tuzatish: bo‘sh katak jarayon hali tayyor emasligini bildiradi; hammasini to‘ldiring.
3. Agent o‘z qadamini o‘zi tekshiradi.
   Tuzatish: tekshiruvchi doim odam yoki boshqa alohida agent.
4. Real holat bilan solishtirilmagan, jarayon «qog‘ozdagidek» yozilgan.
   Tuzatish: o‘tgan haftadagi bitta qo‘ng‘iroqni boshidan oxirigacha aytib bering va qolib ketgan qadamlarni qo‘shing.
5. Pul yoki mijozga xabar qadamiga «A» qo‘yilgan.
   Tuzatish: bunday qadamda «A qoralaydi, I yuboradi» deb yozing.

## Tayyor bo‘lganini qanday bilasiz

Mentor 4-darsning boshida tekshiradi:

- [ ] Hech bir katak bo‘sh emas.
- [ ] O‘tgan haftadagi bitta real holat qadamlar bo‘yicha boshidan oxirigacha tekshirilgan.
- [ ] Agent hech qayerda o‘zini o‘zi tekshirmaydi.
- [ ] Har bir qadamda javobgar bor.

## Claude Code bilan

```text
/kit3
```

/kit3 To‘plam 1 va 2 fayllaridan qoralama tuzadi, keyin sizdan real holatni so‘rab, qadamlarni to‘g‘rilaydi.

## Namuna

- To‘ldirilgan namuna: [Baraka Office, form-a-steps.md](../../namunalar/baraka-office/kit3-agent/form-a-steps.md)
- Yomon misollar: [yomon-misollar.md](../../namunalar/yomon-misollar.md)
- Skill namunasi: [skills/kit3/example/](../../skills/kit3/example/) (`suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
