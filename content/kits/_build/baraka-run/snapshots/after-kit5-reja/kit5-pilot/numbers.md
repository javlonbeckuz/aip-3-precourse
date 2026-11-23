# To‘plam 5 · B shakli: Sinov raqamlari

Praktikum 3.0 · Sinov va hisob-kitob · Fayl: `kit5-pilot/numbers.md`

Shu faylni to‘ldiring yoki Claude Code’da /kit5 ni ishga tushiring: u siz bilan birga to‘ldiradi.

- Jarayon: narx, qoldiq, chegirma va muddat savoli («Savdo yordamchisi»)
- Sinov sanalari: 2026-12-14 - 2026-12-27, 2 hafta (`plan.md`); 3-hafta va 4-hafta ustunlari ishlatilmaydi
- Soatbay haq, so‘m: 22 600 (CLAUDE.md: menejer okladi 4 500 000 / 199 soat)
- Loyiha yetakchisi: Malika

| Ko‘rsatkich | Agentgacha | 1-hafta | 2-hafta | 3-hafta | 4-hafta | O‘zgarish |
|---|---|---|---|---|---|---|
| B.1 Bajarilgan so‘rovlar | 120 |   |   |   |   |   |
| B.2 O‘rtacha vaqt, daqiqa | 6 |   |   |   |   |   |
| B.3 Xato javoblar | 9 |   |   |   |   |   |
| B.4 Takroriy so‘rovlar | 15 |   |   |   |   |   |
| B.5 To‘liq hal qilingan so‘rovlar | 100 |   |   |   |   |   |
| B.6 Yakunlangan bitimlar yoki buyurtmalar | [?] |   |   |   |   |   |
| B.7 Xodimning tekshirishga sarflagan vaqti, soat | 3 |   |   |   |   |   |
| B.14 Topilgan pul, so‘m | 0 |   |   |   |   |   |
| B.8 Mijoz shikoyatlari | 2 |   |   |   |   |   |

B.2 - bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz (tekshirish B.7 da).
B.14 - oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul.

## Hisoblar

Agentgacha ustuni (manbalar batafsil: `kit5-pilot/baseline.md`):

- B.1 = 120 savol / 1 hafta = 120. Manba: «Baraka Savdo» eksporti, 30.11-05.12, tarix.
- B.2 = 6 daqiqa (12 holat, oraliq 2-15). Manba: Malikaning jonli yozuvi, 01.12-05.12.
- B.3 = 9 (100 tekshirilgan javobdan: 9 / 100 × 100 = 9%). Manba: Jamshid akaning tekshiruvi, 30.11-05.12.
- B.4 = 15 (15 / 120 × 100 = 12,5%). Manba: eksport, 30.11-05.12.
- B.5 = 100 (100 / 120 × 100 = 83,3%). Manba: eksport, 30.11-05.12.
- B.6 = [?]. Sanalmaydi: egasining qarori (2026-12-13), bu pilotda asosiy ko‘rsatkich emas.
- B.7 = 3 soat. Manba: egasining so‘zi. Izoh: Jamshid aka agent yo‘q paytda ham javoblarni tekshiradi, shuning uchun egasining qarori bilan 0 emas, 3 yozildi. Puli: 3 × 22 600 = 67 800 so‘m/hafta.
- B.8 = 2. Manba: egasi, 30.11-05.12.
- B.14 = 0 (agentgacha).

Yakunda e’tibor bering: agentgacha B.7 = 3 bo‘lgani uchun B.15 dagi «- B.7 sinovda» o‘rniga «- (B.7 sinovda - 3)» olish halolroq bo‘ladi.
Aks holda Jamshid akaning hozir ham ketayotgan 3 soati agentning xarajatiga yozilib qoladi.
Qaysi formulani olishni yakun bosqichida egasi bilan kelishamiz.

### Xarajatlar

| Xarajat | So‘m |
|---|---|
| B.9 Obuna |   |
| B.10 Integratsiya va sozlash |   |
| B.11 Tekshirish soati x soatbay haq |   |
| Loyiha yetakchisi qo‘shimcha haqi | 400 000 |
| B.12 Jami |   |

Izoh: loyiha yetakchisiga qo‘shimcha haq, haftasiga 200 000 so‘m, natijadan qat’i nazar (briefing.md, egasining so‘zi).
2 haftada: 2 × 200 000 = 400 000 so‘m (tekshirish: 200 000 + 200 000 = 400 000).
Egasining qarori bilan (2026-12-13, `plan.md`) B.12 ga qo‘shiladi: B.12 = B.9 + B.10 + B.11 + 400 000.

### Natija

| Ko‘rsatkich | Hisob | Natija |
|---|---|---|
| B.15 Tejalgan vaqt, soat/hafta | (B.2 agentgacha - B.2 sinovda) x B.1 / 60 - B.7 |   |
| B.16 Bitta bajarilgan ish narxi: agent / inson | agent: B.12 / B.5 yig‘indisi; inson: B.2 agentgacha / 60 x soatbay haq | agent: - / inson: 6 / 60 × 22 600 = 2 260 so‘m |

### Topilgan pul tafsiloti (B.14)

| Sana | Nima bo‘ldi | Summa, so‘m | Qanday hisobladik |
|---|---|---|---|
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |

### Xatolar jurnali

| B.13 Sana | Nima bo‘ldi | Kim topdi | Nimani o‘zgartirdik |
|---|---|---|---|
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |

### Qaror

- [ ] Davom etish
- [ ] O‘zgartirish
- [ ] To‘xtatish

Sababi:
