# B shakli, sinov raqamlari (numbers.md): qanday to‘ldirish

B shakli - sinovning haftalik raqamlari, xarajatlari, natijasi, xatolar jurnali va qarori.
«Agentgacha» ustuni 2-darsdan keyin, har bir hafta ustuni hafta oxirida, yakuniy hisob va qaror 6-darsda to‘ldiriladi.

## Boshlashdan oldin kerak bo‘ladi

- `baseline.md` (Agentgacha raqamlari) va `plan.md` (maqsad, to‘xtatish sharti).
- Agentning ish jurnali (Baraka botida har kuni yoziladi, haftalik fayl `/hafta` bilan) yoki Telegram, CRM eksporti.
- Soatbay haq (CLAUDE.md): Baraka misolida 35 700 so‘m (oklad / 200 soat, savollarga kim javob berishiga qarab o‘rtacha).
- Xarajatlar: obuna, server, model hisobi, sozlashga ketgan vaqt.

## Har bir maydon

| Kod | Maydon | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| - | Jarayon, Sinov sanalari, Soatbay haq | Sarlavha | plan.md, CLAUDE.md | Narx, qoldiq, chegirma va muddat savoli; 2026-12-14 - 2026-12-26 (dushanba-shanba); 35 700 so‘m |
| B.1 | Bajarilgan so‘rovlar | Haftasiga nechta | Bot jurnali | Agentgacha 120; 1-hafta 132; 2-hafta 138 |
| B.2 | O‘rtacha vaqt, daqiqa | Bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz | Jonli yozuv (har hafta 10 ta holat, soat bilan) | 6; 2,5; 2,0 |
| B.3 | Xato javoblar | Haftasiga nechta | Bot jurnali, xodim belgilari (❌) | 9; 7; 3 |
| B.4 | Takroriy so‘rovlar | Bir xil savol qayta | Telegram | 15; 12; 8 |
| B.5 | To‘liq hal qilingan so‘rovlar | Oxirigacha javob berilgan | Bot jurnali | 100; 104; 121 |
| B.6 | Yakunlangan bitimlar | Yopilgan bitimlar | CRM | - : o‘lchanmadi, savolni bitim bilan bog‘lab bo‘lmadi (`baseline.md`) |
| B.7 | Tekshirish vaqti, soat | Haftasiga hamma xodimlar tekshirishga sarflagan vaqt, butun ish uchun bitta raqam | Loyiha yetakchisi | 0; 4,5; 2,0 (agentgacha tekshiradigan agent javobi yo‘q) |
| B.14 | Topilgan pul, so‘m | Oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul | «Topilgan pul tafsiloti» jadvali | 0; 0; 680 000 (faqat isbotlangani) |
| B.8 | Mijoz shikoyatlari | Haftasiga nechta | Telegram, CRM «shikoyat» tegi | 2; 2; 1 |
| B.9 | Obuna | Model, server, dasturlar; oylik summa × 2 / 4,3 (2 hafta uchun) | Hisob-fakturalar, panel | Oyiga 504 500 (server 200 000, OpenRouter 37 000, Claude 267 500); 2 haftada 504 500 × 2 / 4,3 = 234 651 so‘m |
| B.10 | Integratsiya va sozlash | Sozlashga ketgan pul va vaqt, bir martalik | Siz | Egasi 14 soat × 125 000 + Sardorbek 3 soat × 45 000 = 1 750 000 + 135 000 = 1 885 000 so‘m |
| B.11 | Tekshirish puli | B.7 × soatbay haq | Hisob | (4,5 + 2,0) × 35 700 = 6,5 × 35 700 = 232 050 so‘m |
| B.12 | Jami | B.9 + B.10 + B.11 | Hisob | 234 651 + 1 885 000 + 232 050 = 2 351 701 so‘m |
| B.15 | Tejalgan vaqt, soat/hafta | (B.2 agentgacha - B.2 sinovda) × B.1 / 60 - (B.7 sinovda - B.7 agentgacha) | Hisob | 1-hafta (6 - 2,5) × 132 / 60 - 4,5 = 7,7 - 4,5 = 3,2; 2-hafta (6 - 2,0) × 138 / 60 - 2,0 = 9,2 - 2,0 = 7,2; oraliq 3,2-7,2 |
| B.16 | Bitta bajarilgan ish narxi | agent: B.12 / B.5 yig‘indisi; inson: B.2 agentgacha / 60 × soatbay haq | Hisob | agent: 2 351 701 / (104 + 121) = 10 452 so‘m (sozlashsiz 2 074); inson: 6 / 60 × 35 700 = 3 570 so‘m |
| B.13 | Xatolar jurnali | Sana, nima bo‘ldi, kim topdi, nimani o‘zgartirdik | /kit5 xato | 2026-12-15: 5 ta Optima stolga chakana narx aytdi (5 donadan ulgurji); yo‘riqnoma tuzatildi, 5-darsda `ulgurji-5-dona` testi qo‘shildi |
| - | O‘zgarish | Oxirgi hafta - agentgacha, foizda ham | Hisob | B.5: 121 - 100 = +21 (+21,0%) |
| - | Qaror, Sababi | Davom etish, o‘zgartirish yoki to‘xtatish; sabab bitta gapda | Egasi | Davom etish: A.6 ning beshala mezoni 2-haftada bajarildi va to‘xtatish sharti bo‘lmadi |

Baraka raqamlari kursning tayyor boti bilan bir xil: `pilot-template/kit5-baseline.toml` va `pilot-template/samples/kit5-2-hafta.md` (shartli raqamlar).
B.15 ning oxiridagi «- (B.7 sinovda - B.7 agentgacha)» qismi faqat qo‘shimcha tekshirish vaqtini ayiradi: agentgacha ham ketgan tekshirish agentga yozilmaydi.
Baraka misolida agentgacha B.7 = 0, shuning uchun formula oddiy «- B.7 sinovda» ga teng.
Tekshiruv uchun ikkinchi yo‘l: 138 ta savol eski tezlikda 6 × 138 / 60 = 13,8 soat olardi, endi 2,0 × 138 / 60 + 2,0 = 6,6 soat; 13,8 - 6,6 = 7,2.

## Topilgan pul

Topilgan pul - agent tufayli saqlab qolingan yoki tezroq olingan pul.
Har bir holat alohida yoziladi: sana, nima bo‘ldi, summa, qanday hisoblandi.
Baraka misolida isbotlangani bitta holat: 2026-12-23, mijoz 34 000 000 so‘mlik buyurtmaga 12% chegirma so‘radi, bot qoidani aytib Jamshid akaga uzatdi, 10% 100% oldindan to‘lov bilan berildi.
Hisob: 34 000 000 × (12% - 10%) = 680 000 so‘m; isboti amoCRM bitim kartasi, Jamshid akaning yozma ruxsati va to‘lov tushgani.
Isbotlanmagani: 2026-12-25, mijoz qolgan 4 ta kreslo o‘rniga «Staff Mesh» oldi, 4 × 1 350 000 = 5 400 000 so‘m [?]; bu tushum, foyda emas, va mijoz botsiz ham olarmidi, noma’lum.
Isbotlanmagan summa `[?]` bilan alohida yoziladi va yig‘indiga kirmaydi.
Oylik raqam doim taxmin: 680 000 / 2 × 4,3 = 1 462 000 so‘m «taxmin» deb yoziladi, «isbotlangan» emas, chunki bitta holat har 2 haftada takrorlanishi noma’lum.

## Ko‘p uchraydigan xatolar

1. Tekshirish vaqti (B.7) hisobga olinmagan.
   Tuzatish: B.15 dan qo‘shimcha tekshirish vaqtini (B.7 sinovda - B.7 agentgacha) ayiring va B.11 ni xarajatga qo‘shing.
2. B.2 ga tekshirish vaqti ham qo‘shilgan.
   Tuzatish: B.2 faqat bajarish vaqti; tekshirish B.7 da alohida, aks holda bitta mehnat ikki marta sanaladi.
3. Topilgan pul ikki marta sanalgan yoki tushum foyda deb yozilgan.
   Tuzatish: har bir holatni tafsilot jadvaliga bir marta yozing; isbotlanganini ajrating.
4. «Tejalgan vaqt» naqd pul deb ko‘rsatilgan.
   Tuzatish: xodimning maoshi o‘zgarmaydi; tejalgan vaqt boshqa ishga ketsagina foyda beradi.
5. Xodimlar bir-biri bilan solishtirilgan: «Malika ko‘p tekshirdi, Bekzod kam».
   Tuzatish: jadvaldagi B.7 butun ish uchun bitta raqam; hisobda tekshirish qayerga ketgani yozilishi mumkin (qoralamalarni tasdiqlash 2,5 soat, uzatishlarni ko‘rish 2 soat), lekin odamlar baholanmaydi.
6. To‘xtatish sharti tekshirilmagan.
   Tuzatish: har hafta A.7 ni tekshiring; bajarilgan bo‘lsa, birinchi gapda ayting.

## Tayyor bo‘lganini qanday bilasiz

Mentor 6-darsning boshida tekshiradi:

- [ ] Har bir qatorda agentgacha, 1-hafta, 2-hafta va o‘zgarish bor.
- [ ] Xarajatlar B.9-B.12 to‘ldirilgan, B.11 = B.7 × soatbay haq.
- [ ] Xatolar jurnalida tuzatishlar yozilgan, sinov to‘plami o‘tgan.
- [ ] B.14 da isbotlangan va isbotlanmagan summa ajratilgan.
- [ ] Qaror belgilangan, sababi bitta gapda.

## Claude Code bilan

Har hafta oxirida:

```text
/kit5 hafta 1
```

Agent xato qilganda:

```text
/kit5 xato
```

6-darsda:

```text
/kit5 yakun
```

## Namuna

- To‘ldirilgan namuna: [Baraka Office, numbers.md](../../namunalar/baraka-office/kit5-pilot/numbers.md)
- Yomon misollar: [yomon-misollar.md](../../namunalar/yomon-misollar.md) (boshlang‘ich raqamsiz natija)
- Skill namunasi: [skills/kit5/example/](../../skills/kit5/example/) (`suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
