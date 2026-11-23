# «Agentgacha» raqamlari (`kit5-baseline.toml`) va haftalik fayl: qo‘llanma

`kit5-baseline.toml` - 5-to‘plam B shaklidagi «Agentgacha» ustuni: agent ishga tushgunga qadar bir haftalik raqamlar.
Bot har dushanba yuboradigan haftalik fayl shu raqamlarni sinov haftalari bilan yonma-yon qo‘yadi.
Boshlang‘ich raqam bo‘lmasa, natija o‘rniga faqat taassurot qoladi.

## Raqamlar qayerdan olinadi

2-dars uy vazifasida yig‘ilgan boshlang‘ich holat:

| Kod | Ko‘rsatkich | Qayerdan |
|---|---|---|
| B1 | Bajarilgan so‘rovlar, haftasiga | Telegram chat eksporti, Excel, CRM tarixi: oxirgi 2-4 haftaning o‘rtachasi |
| B2 | O‘rtacha vaqt, daqiqa | Bitta so‘rovga odam sarflagan vaqt, tekshirishsiz; tarix bo‘lmasa, 3 ta holatni soat bilan o‘lchang |
| B3 | Xato javoblar | Qaytarilgan buyurtmalar, tuzatilgan hisob-fakturalar, mijoz shikoyatlari |
| B4 | Takroriy so‘rovlar | Bir xil savol qayta so‘ralgani (chat eksportidan) |
| B5 | To‘liq hal qilingan so‘rovlar | Qo‘shimcha savolsiz yopilgan so‘rovlar |
| B7 | Tekshirishga sarflagan vaqt, soat | Rahbar yoki tekshiruvchi haftasiga qancha vaqt sarflaydi |
| B8 | Mijoz shikoyatlari | Shikoyatlar jurnali yoki chat |

Bilmagan qatoringizni yozmang: hisobotda «qo‘lda» deb chiqadi.
Taxmin qilib yozmang: noto‘g‘ri boshlang‘ich raqam butun natijani buzadi.

## Qanday to‘ldiriladi

Claude Code’ga yozing:

```text
../kit5-pilot/ dagi boshlang'ich raqamlarimni kit5-baseline.toml ga yoz.
Har qatorda izoh: raqam qayerdan olingani. Bilmagan qatorimni o'chir.
```

## To‘ldirilgan namuna: Baraka Office savdo bo‘limi (shartli raqamlar)

```toml
B1 = 120   # Bajarilgan so'rovlar (haftasiga)
B2 = 6     # O'rtacha vaqt, daqiqa (bitta savolga javob topish)
B3 = 9     # Xato javoblar
B4 = 15    # Takroriy so'rovlar
B5 = 100   # To'liq hal qilingan so'rovlar
B7 = 0     # Xodimning tekshirishga sarflagan vaqti, soat (agentgacha tekshiradigan narsa yo‘q edi)
B8 = 2     # Mijoz shikoyatlari
```

Nega shunday:
- B1 = 120: menejerlar va call-markaz narx, qoldiq, chegirma va muddat bo‘yicha haftasiga taxminan 120 ta savolga javob izlagan (Telegram tarixi, 2-28-noyabr, 4 haftaning o‘rtachasi).
- B2 = 6: menejer prays-list, shartnoma va 1C’ni ochib javob topishga o‘rtacha 6 daqiqa sarflagan (jonli o‘lchov).
- B3 = 9: noto‘g‘ri chegirma yoki muddat aytilgan holatlar (ROP tuzatgan).
- B7 = 0: agentgacha hech kim javoblarni alohida tekshirmagan; sinovda tekshirish vaqti paydo bo‘ladi va hisobga olinadi.
- B6 yozilmagan: savolni bitim bilan bog‘lab bo‘lmadi, shuning uchun o‘lchanmadi.

## Haftalik faylni o‘qish

Har dushanba (yoki botga `/hafta` yozsangiz) Markdown va CSV fayl keladi.
Namuna: `samples/kit5-2-hafta.md` (ikki haftalik sinov) va qo‘lda to‘ldirilgan varianti: `PARTICIPANT_GUIDE.uz.md`, 5.5-bo‘lim.

| Ustun | Ma’nosi |
|---|---|
| Agentgacha | `kit5-baseline.toml` dan |
| 1-hafta, 2-hafta | `PILOT_START_DATE` dan boshlab har 7 kun; tugamagan hafta «2-hafta (3 kun)» deb yoziladi |
| O‘zgarish | Oxirgi to‘liq hafta minus «Agentgacha» |
| qo‘lda | Bot bu raqamni o‘lchay olmaydi: Siz yozasiz (B.2, B.4, B.6, B.7, B.8, B.14, xarajatlar) |

Bot o‘zi sanaydi:
- B.1 - botga kelgan barcha savollar;
- B.3 - ❌ bosilgan, rad etilgan yoki tekshiruvchi tuzatgan javoblar;
- B.5 - bot javob bergan va xato deb belgilanmagan savollar;
- odamga uzatilgan savollar va model xarajati (xodim savollari, jadvaldagi ishlar va serverda ishlatilgan `pilot ask`/`pilot eval`; noutbukdagi sinovlar kirmaydi, aniq jami - botga `/xarajat`);
- B.13 xatolar jurnali: sana, savol, javob, izoh, kim topdi.
  «Nimani o‘zgartirdik» ustunini Siz to‘ldirasiz.

Faylni `kit5-pilot/numbers.md` ga ko‘chiring va «qo‘lda» qatorlarni to‘ldiring.

## Ko‘p uchraydigan xatolar

| Xato | Natija | To‘g‘risi |
|---|---|---|
| B1 ni oylik raqam bilan yozish | O‘zgarish -75% bo‘lib chiqadi | Haftalik raqam |
| `PILOT_START_DATE` qo‘yilmagan | Faylda faqat «Oxirgi 7 kun» ustuni | `.env` ga go-live kunini yozing |
| B.2 ga tekshirish vaqtini ham qo‘shish | Tejalgan vaqt ikki marta sanaladi | Tekshirish faqat B.7 da |
| Yarim haftani to‘liq hafta bilan solishtirish | Yolg‘on pasayish | Bot buni o‘zi hisobga oladi: tugamagan hafta belgilanadi |

Bajarildi, agar: haftalik faylda «Agentgacha» ustunida Siz bilgan barcha raqamlar bor.
