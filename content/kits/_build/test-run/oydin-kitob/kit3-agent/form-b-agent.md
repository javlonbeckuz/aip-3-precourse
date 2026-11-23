# To‘plam 3 · B shakli: Agentning ish yo‘riqnomasi

Praktikum 3.0 · Ishni qayta taqsimlash · Fayl: `kit3-agent/form-b-agent.md`

- Agent nomi: To‘lov yordamchisi
- Jarayon: To‘lovlarni solishtirish (`kit3-agent/form-a-steps.md`, 4-8-qadamlar)
- Sana: 2026-11-03 (egasi Sardor bilan tuzildi)

### B.1 Agentning vazifasi: bir gapda

Click va Payme eksportidagi to‘lovlarni Sheets’dagi buyurtmalar bilan solishtiradi, mos kelganlarini «to‘langan» deb belgilashni taklif qiladi, mos kelmaganlari ro‘yxatini va mijozga xabar qoralamasini tayyorlaydi.

### B.2 Javobgar rahbar

Sardor, rahbar.

### B.3 Ishlatishi mumkin bo‘lgan manbalar (hujjatlar, narxlar, CRM, jadval)

| Manba | Ulanish: API / MCP / eksport / qo‘lda |
|---|---|
| Click kabineti: kechagi to‘lovlar | eksport (Excel; Malika yuklaydi; API kaliti hali yo‘q) |
| Payme kabineti: kechagi to‘lovlar | eksport (Excel; Malika yuklaydi; API kaliti hali yo‘q) |
| Google Sheets: buyurtmalar (buyurtma raqami bilan) | API |
| Mijoz yuborgan chek (faqat mijoz yuborganda) | qo‘lda (Malika agentga beradi) |
| Telegram: Malikaga shaxsiy xabar (natijani ko‘rsatish uchun) | API (Telegram bot) [?] |

Asosiy manba: kabinetdagi ro‘yxat; chek faqat mijoz yuborganda.

### B.4 O‘zi mustaqil qila oladigan harakatlar

- To‘lovni buyurtma bilan raqam va summa bo‘yicha solishtiradi; izohda buyurtma raqami bo‘lmasa, telefon raqami bo‘yicha qidiradi.
- Mos kelmaganlar ro‘yxatini tuzadi.
- Mijozga chek so‘rash xabarining matnini qoralaydi; xabarni Malika o‘zi yuboradi.
- «To‘langan» belgisini taklif qiladi; Malika tasdiqlagandan keyin Sheets’da belgi qo‘yadi.
  Chegara: faqat «to‘lov holati» ustuniga, faqat Malika tasdiqlagan qatorlarga yozadi; boshqa katakni o‘zgartirmaydi.
- Natijani Malikaga Telegramda shaxsiy xabar qilib yuboradi.

### B.5 Hech qachon qilmaydigan ishlar

- Pul o‘tkazmaydi, to‘lovni qaytarmaydi.
- Mijozga hech narsa yubormaydi, egasi nomidan ham yozmaydi.
- Ma’lumotni o‘chirmaydi.
- Xodimlarni baholamaydi va kuzatmaydi.
- Malika tasdiqlamagan qatorga «to‘langan» belgisini qo‘ymaydi.
- Summa farqini o‘zi hal qilmaydi.
- Telegram buyurtmalariga javob bermaydi (To‘plam 2, B.3).

### B.6 Qachon odamga uzatadi ... (holat - kimga - qanday)

| Holat | Kimga | Qanday |
|---|---|---|
| Eksport fayli bo‘sh yoki kelmadi | Malika | Solishtirishni boshlamaydi, Telegramda xabar beradi |
| Fayl formati notanish (ustunlar o‘zgargan) | Malika | To‘xtaydi, Telegramda xabar beradi |
| Izohda buyurtma raqami yo‘q va telefon raqami bo‘yicha ham topilmadi | Malika | Mos kelmaganlar ro‘yxatiga qo‘shadi, chek so‘rash qoralamasini tayyorlaydi |
| Summa farqi 5 000 so‘mdan kichik | Malika | Ro‘yxatda farqi bilan ko‘rsatadi; Malika o‘zi hal qiladi |
| Summa farqi 5 000 so‘m va undan katta, yoki chekdan keyin ham to‘lov topilmadi | Malika, u Sardorga uzatadi | Ro‘yxatda «Sardorga» belgisi bilan ko‘rsatadi |
| To‘lov bor, lekin Sheets’da buyurtma yo‘q (hali kiritilmagan bo‘lishi mumkin) | Malika | «Buyurtma topilmadi» deb ko‘rsatadi, «to‘lovsiz» demaydi |
| Bitta buyurtmaga ikkita to‘lov yoki bitta to‘lov ikkita buyurtmaga mos keladi | Malika | Belgi taklif qilmaydi, ikkala variantni ko‘rsatadi |
| Kunlik jami summa odatdagidan keskin farq qiladi | Malika | Ro‘yxat boshida ogohlantirish yozadi |
| Mijoz chekda yoki izohda shikoyat qilgan | Malika | Alohida ko‘rsatadi |
| Agent ishonmayapti | Malika | Belgi taklif qilmaydi, sababini yozadi |

### B.7 Har bir harakatdan so‘ng nimalarni yozib qo‘yadi

Ish jurnaliga: sana va vaqt; nima qildi; qaysi fayl yoki manbadan; natija (nechta mos keldi, nechtasi mos kelmadi, qaysi buyurtmalar belgilandi); odamga uzatdimi.
Xodimlar nima deganini, qachon onlayn bo‘lganini yoki qanchalik tez javob berganini yozmaydi.

### B.8 Ohang va til

- Malikaga: o‘zbek tilida, qisqa, ro‘yxat shaklida.
- Mijozga qoralama: o‘zbek tilida, «siz» bilan, xushmuomala, 2-3 gap.

### B.9 Sifat mezoni: natija qachon to‘g‘ri hisoblanadi?

- Har bir to‘lovning bitta holati bor: «mos keldi» (buyurtma raqami bilan) yoki «mos kelmadi» (sababi bilan).
- Mos kelganlar soni + mos kelmaganlar soni = eksportdagi to‘lovlar soni.
- Ro‘yxatdagi jami summa = eksportdagi jami summa.
- Malika tekshirganda noto‘g‘ri moslangan to‘lov 0 ta.
- «To‘langan» belgisi faqat Malika tasdiqlagan qatorlarda turadi.

### B.10 Tasdiqladi, sana, keyingi ko‘rib chiqish sanasi

- Tasdiqladi: 
- Sana: 
- Keyingi ko‘rib chiqish: 
