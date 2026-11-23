# Sinov raqamlari: Savdo yordamchisi

Davr: 2026-12-14 - 2026-12-26.
Yaratildi: 2026-12-26 20:00 (bot jurnalidan).

| Kod | Ko‘rsatkich | Agentgacha | 1-hafta | 2-hafta (6 kun) | O‘zgarish |
|---|---|---|---|---|---|
| B.1 | Bajarilgan so‘rovlar | 120 | 132 | 138 | +12 (+10%) |
| B.2 | O‘rtacha vaqt, daqiqa | 6 | qo‘lda | qo‘lda |  |
| B.3 | Xato javoblar | 9 | 7 | 3 | -2 (-22%) |
| B.4 | Takroriy so‘rovlar | 15 | qo‘lda | qo‘lda |  |
| B.5 | To‘liq hal qilingan so‘rovlar | 100 | 104 | 121 | +4 (+4%) |
| B.6 | Yakunlangan bitimlar yoki buyurtmalar | qo‘lda | qo‘lda | qo‘lda |  |
| B.7 | Xodimning tekshirishga sarflagan vaqti, soat | 0 | qo‘lda | qo‘lda |  |
| B.14 | Topilgan pul, so‘m | qo‘lda | qo‘lda | qo‘lda |  |
| B.8 | Mijoz shikoyatlari | 2 | qo‘lda | qo‘lda |  |
| + | Qo‘shimcha: odamga uzatilgan so‘rovlar |  | 21 | 14 |  |
| + | Qo‘shimcha: model xarajati, $ |  | 0.67 | 0.70 |  |

## Xarajatlar

| Kod | Xarajat | Qiymat |
|---|---|---|
| B.9 | Obuna | model (OpenRouter): $0.70 oxirgi haftada; VPS va boshqa obunalar: qo‘lda |
| B.10 | Integratsiya va sozlash | qo‘lda |
| B.11 | Tekshirish soati x soatbay haq | qo‘lda |
| B.12 | Jami | qo‘lda |

## Natija

| Kod | Ko‘rsatkich | Hisob |
|---|---|---|
| B.15 | Tejalgan vaqt, soat/hafta | (B.2 agentgacha - B.2 sinovda) x B.1 / 60 - B.7 |
| B.16 | Bitta bajarilgan ish narxi: agent / inson | agent: B.12 / B.5 yig‘indisi; inson: B.2 agentgacha / 60 x soatbay haq |

## Xatolar jurnali (B.13)

| Sana | Nima bo‘ldi | Kim topdi | Nimani o‘zgartirdik |
|---|---|---|---|
| 2026-12-15 | Savol: Optima stolidan 5 ta kerak, narxi? / Javob: «Optima» 5 dona: 2 150 000 x 5 = 10 750 000 so‘m. / Izoh: 5 donadan ulgurji narx (1 890 000) bo‘lishi kerak edi | Malika | |
| 2026-12-15 | Savol: Start stoli 6 ta qancha bo‘ladi? / Javob: «Start» 6 dona: 1 450 000 x 6 = 8 700 000 so‘m. / Izoh: 6 dona - ulgurji narx (1 280 000) kerak edi | Madina | |
| 2026-12-16 | Savol: ErgoPro omborda bormi? / Javob: Ha, omborda bor (1C). / Izoh: Ombor fayli 31 soat eski edi, mahsulot sotilgan ekan | Madina | |
| 2026-12-16 | Savol: 18 mln lik buyurtmaga chegirma bera olamanmi? / Javob: Ha, 5% gacha bera olasiz. / Izoh: Qoida: 20 000 000 so‘mdan oshsa; 18 mln da chegirma yo‘q | Malika | |
| 2026-12-17 | Savol: Chirchiqqa yetkazish bepulmi? / Javob: Ha, Toshkent viloyatiga yetkazish bepul. / Izoh: KP dagi gap; shartnomada 8 000 so‘m/km; mijozga ketishidan oldin tasdiqlashda ushlandi | Malika | |
| 2026-12-17 | Savol: Kreslo kafolati qancha? / Javob: Barcha kreslolarga 3 yil kafolat. / Izoh: KP dagi gap; shartnomada mexanizmga 12 oy | Jamshid aka | |
| 2026-12-18 | Savol: Senator kreslo omborda bormi? / Javob: Ha, bor (1C). / Izoh: Ombor fayli yana eski edi | Madina | |
| 2026-12-22 | Savol: Optima 8 dona jami qancha? / Javob: 1 890 000 x 8 = 15 120 000 so‘m. / Izoh: Narx QQS bilan ekanini aytmadi; menejer mijozga aytishdan oldin so‘radi | Malika | |
| 2026-12-23 | Savol: Staf mesh narxi qancha? / Javob: «ErgoPro X5»: 2 850 000 so‘m. / Izoh: «Staf mesh» deb yozilgan savolga boshqa kreslo narxini aytdi; Madina mijozga aytishdan oldin sezdi | Madina | |
| 2026-12-24 | Savol: 12 mln lik buyurtmaga 3D chizma bepulmi? / Javob: Ha, 3D chizma bepul. / Izoh: Qoida: 15 000 000 so‘mdan oshsa; 12 mln da 500 000 so‘m; mijozga aytilmadi | Jamshid aka | |

## Raqamlar qanday hisoblandi

- B.1: botga kelgan barcha savollar (bot javob bergan, odamga uzatilgan va bot to‘xtatilgan paytda kelganlar).
- B.3: ❌ bosilgan, rad etilgan yoki xodim tuzatgan javoblar.
- B.5: bot javob bergan va xato deb belgilanmagan savollar.
- Model xarajati: xodim savollari, jadvaldagi ishlar va shu serverdagi pilot ask/eval buyruqlari.
  Noutbukda ishlatilgan buyruqlar bu yerga kirmaydi: aniq jami - botga /xarajat (OpenRouter kaliti bo‘yicha).
- «Agentgacha» ustuni kit5-baseline.toml faylidan olinadi.
- «O‘zgarish»: oxirgi to‘liq hafta minus «Agentgacha».
- B.2: bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz (tekshirish B.7 da).
- B.14: oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul; har bir summaning manbasini yozing.
- «qo‘lda» deb yozilgan qatorlarni Siz to‘ldirasiz: bot ularni o‘lchay olmaydi.
- Bu faylni kit5-pilot/numbers.md ga ko‘chiring (5-to‘plam B shakli).
- Hisobot faqat jami raqamlarni ko‘rsatadi: kim qancha savol berganini ko‘rsatmaydi.
