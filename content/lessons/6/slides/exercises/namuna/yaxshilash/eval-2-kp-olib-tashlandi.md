# Test natijalari: 9 / 12 o‘tdi

Sana: 2026-12-20 11:12. Model: google/gemini-3.8-flash. Xarajat: $0.0559.

| Natija | Test | Sabab |
|---|---|---|
| ✅ | ulgurji-optima-8 | - |
| ✅ | chakana-start-2 | - |
| ✅ | chakana-ergopro-3 | - |
| ✅ | kafolat-kreslo | - |
| ✅ | chegirma-15-foiz | - |
| ✅ | yetkazish-3-kun | - |
| ✅ | tannarx-yashirin | - |
| ✅ | qoldiq-ergopro | - |
| ❌ | ulgurji-5-dona | javobda «9 450 000» yo‘q; javobda bo‘lmasligi kerak bo‘lgan «10 750 000» bor |
| ❌ | ulgurji-6-dona | javobda «7 680 000» yo‘q; javobda bo‘lmasligi kerak bo‘lgan «8 700 000» bor |
| ❌ | chegirma-18-mln | javobda «20 000 000» yo‘q; javobda bo‘lmasligi kerak bo‘lgan «5% gacha bera olasiz» bor |
| ✅ | yetkazish-chirchiq | - |

## ✅ ulgurji-optima-8

Savol: Optima stolidan 8 ta kerak, qancha bo'ladi?

Javob (answered):

> «Optima» ergonomik stol 140x70 (WS-102), 8 dona - ulgurji narx: 1 890 000 x 8 = 15 120 000 so‘m.

Manba: yaxshi misol: ROP tekshirgan javob

## ✅ chakana-start-2

Savol: Start stoli 2 dona necha pul?

Javob (answered):

> «Start» xodim stoli 120x60 (WS-101), 2 dona - chakana narx: 1 450 000 x 2 = 2 900 000 so‘m.

Manba: yaxshi misol

## ✅ chakana-ergopro-3

Savol: ErgoPro X5 kreslo 3 dona qancha bo'ladi?

Javob (answered):

> «ErgoPro X5» menejer kreslosi (CH-202), 3 dona - chakana narx: 2 850 000 x 3 = 8 550 000 so‘m.

Manba: yaxshi misol: aniq narx (prays-listdagi xato raqamni ushlash uchun)

## ✅ kafolat-kreslo

Savol: ErgoPro kreslo mexanizmiga kafolat necha oy?

Javob (answered):

> Kafolat: Kreslo mexanizmi, gazlift, g‘ildiraklar va harakatlanuvchi furnitura: 12 oy.

Manba: yomon misol: KP da 36 oy deb yozilgan, shartnomada 12 oy

## ✅ chegirma-15-foiz

Savol: Mijoz 35 millionlik buyurtmaga 15% chegirma so'rayapti, bera olamanmi?

Javob (escalated):

> ODAMGA: 15% chegirma menejer vakolatidan (5%) yuqori.

Manba: yomon misol: menejer 15% va'da qilgan, qoidada 5% gacha

## ✅ yetkazish-3-kun

Savol: Mijozga 3 kunda yetkazib beramiz desam bo'ladimi?

Javob (answered):

> Yo‘q, 3 kun deb va’da bermang. Muddat: 70% (yoki 100%) oldindan to‘lov tushgan kundan 7 ish kuni. Tezroq kerak bo‘lsa, ROP bilan kelishing.

Manba: yomon misol: sotuvchilar 3 kun deb va'da bergan

## ✅ tannarx-yashirin

Savol: ErgoPro kreslosining tannarxi qancha?

Javob (answered):

> «ErgoPro X5» menejer kreslosi (CH-202), 1 dona - chakana narx: 2 850 000 x 1 = 2 850 000 so‘m.

Manba: xavfsizlik: tannarx modelga ko'rsatilmaydi

## ✅ qoldiq-ergopro

Savol: ErgoPro kreslo omborda nechta bor?

Javob (answered):

> Omborda (1C, tayyor mahsulot):
> - CH-202 Кресло ErgoPro X5 (синхромеханизм): 150 dona

Manba: yaxshi misol: 1C eksportidan (01.11.2026 holatiga)

## ❌ ulgurji-5-dona

Savol: Optima stolidan 5 ta kerak, narxi?

Javob (answered):

> «Optima» 5 dona: 2 150 000 x 5 = 10 750 000 so‘m.

Manba: xatolar jurnali, 2026-12-15: 5 dona chakana narxda hisoblangan (Malika)

## ❌ ulgurji-6-dona

Savol: Start stoli 6 ta qancha bo‘ladi?

Javob (answered):

> «Start» 6 dona: 1 450 000 x 6 = 8 700 000 so‘m.

Manba: xatolar jurnali, 2026-12-15: 6 dona chakana narxda hisoblangan (Madina)

## ❌ chegirma-18-mln

Savol: 18 mln lik buyurtmaga chegirma bera olamanmi?

Javob (answered):

> Ha, 5% gacha bera olasiz.

Manba: xatolar jurnali, 2026-12-16: 18 mln da chegirma yo‘q, agent «ha» degan (Malika)

## ✅ yetkazish-chirchiq

Savol: Chirchiqqa yetkazish bepulmi?

Javob (answered):

> Yo‘q: Toshkent viloyatiga yetkazish halqa yo‘ldan har 1 km uchun 8 000 so‘m.
> Masofani ayting, hisoblab beraman.

Manba: xatolar jurnali, 2026-12-17: KP dagi «viloyatga bepul» aytilgan, shartnomada 8 000 so‘m/km; tasdiqlashda ushlandi (Malika)
