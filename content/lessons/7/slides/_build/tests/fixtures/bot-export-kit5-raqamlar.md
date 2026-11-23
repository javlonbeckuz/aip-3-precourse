# Sinov raqamlari: Savdo yordamchisi

Davr: 2026-10-28 - 2026-11-03.
Yaratildi: 2026-11-03 02:39 (bot jurnalidan).

| Kod | Ko‘rsatkich | Agentgacha | Oxirgi 7 kun | O‘zgarish |
|---|---|---|---|---|
| B.1 | Bajarilgan so‘rovlar | 120 | 5 | -115 (-96%) |
| B.2 | O‘rtacha vaqt, daqiqa | 6 | qo‘lda |  |
| B.3 | Xato javoblar | 9 | 1 | -8 (-89%) |
| B.4 | Takroriy so‘rovlar | 15 | qo‘lda |  |
| B.5 | To‘liq hal qilingan so‘rovlar | 100 | 2 | -98 (-98%) |
| B.6 | Yakunlangan bitimlar yoki buyurtmalar | qo‘lda | qo‘lda |  |
| B.7 | Xodimning tekshirishga sarflagan vaqti, soat | 3 | qo‘lda |  |
| B.14 | Topilgan pul, so‘m | qo‘lda | qo‘lda |  |
| B.8 | Mijoz shikoyatlari | 2 | qo‘lda |  |
| + | Qo‘shimcha: odamga uzatilgan so‘rovlar |  | 1 |  |
| + | Qo‘shimcha: model xarajati, $ |  | 0.02 |  |

## Xarajatlar

| Kod | Xarajat | Qiymat |
|---|---|---|
| B.9 | Obuna | model (OpenRouter): $0.02 oxirgi haftada; VPS va boshqa obunalar: qo‘lda |
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
| 2026-11-03 | Savol: Start stoli 2 dona necha pul? / Javob: «Start» xodim stoli 120x60 (WS-101), 2 dona - chakana narx: 1 450 000 x 2 = 2 900 000 so‘m. / Izoh: Mijoz 2 ta emas, 5 ta deb aytgan edi, ulgurji narx kerak | Bekzod | |

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
