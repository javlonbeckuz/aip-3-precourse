# Ishni qayta taqsimlash

Praktikum 3.0 · To‘plam 3 / 5 · Tuzuvchi: Xurshid Maroziqov

Tanlangan jarayonni bosqichma-bosqich chizib chiqing, ertaga har bir qadamni kim qilishini hal qiling va agentning ish yo‘riqnomasi va chegaralarini yozing.

## Qanday ishlatiladi

1. A shaklida tanlangan jarayonni boshidan oxirigacha yozing, har bir qatorga bitta harakat.
   «Bugun» ustuniga uni hozir kim qilishini yozing.
   O‘tgan haftadagi bitta real holatni eslab, hech qaysi qadam qolib ketmaganini tekshiring.
2. Ertaga har bir qadamni kim qilishini belgilang: A agent, R robot, I inson.
   Keyin natijani kim tekshirishini, kim qaror qabul qilishini va kim javobgar bo‘lishini yozing.
   Agar bitta katak bo‘sh qolsa, demak jarayon hali tayyor emas.
3. Agent qadamlarini B shakliga - agentning ish yo‘riqnomasiga yig‘ing.
   B.3 dagi har bir manba yoniga qanday ulanishini yozing: API, MCP, eksport (Excel, CSV, Telegram JSON) yoki qo‘lda.
   Agent nima qila olishini, nimani umuman qilmasligini va qachon ishni odamga topshirishini yozing.
4. B shaklini agent bilan ishlaydigan xodimlarga ko‘rsating: istisno holatlarni ular biladi.
   Hamma istisnolarni B.6 ga qo‘shing.
   Jarayon natijasidan 3 ta yaxshi va 3 ta yomon real misol yig‘ing: ular To‘plam 4 dagi B.4 va agentning sinov to‘plami bo‘ladi.
5. B shaklini imzolang va sana qo‘ying.
   Claude Code’da /kit3 uni kit3-agent/instructions.md fayliga - agentning tizim yo‘riqnomasiga (system prompt) aylantiradi.
   Agent v0 shu fayl asosida quriladi.

## Claude Code’da

/kit3.
Natija kit3-agent/ papkasida: A va B shakli hamda instructions.md.

Fayllar kompaniya papkasida:

- A shakli, Jarayon qadamlari: bugun va ertaga: `kit3-agent/form-a-steps.md`
- B shakli, Agentning ish yo‘riqnomasi: `kit3-agent/form-b-agent.md`

## AI chat uchun so‘rov

Claude Code bo‘lmasa: shakl yoki transkriptni so‘rovdan keyin qo‘shib, hammasini Claude, ChatGPT yoki Gemini chatiga joylang.

```text
Siz kichik biznes egasiga qayta ishlangan jarayonni AI agent yo‘riqnomasiga aylantirishda yordam beryapsiz.
Quyida to‘ldirilgan ikkita shakl bor.
A shakli - qadamlar jadvali (A.1 qadam, A.2 ma’lumot, A.3 bugun kim, A.4 ertaga kim A/R/I, A.5 kim tekshiradi, A.6 kim qaror qiladi, A.7 kim javobgar, A.8 izoh).
B shakli - agent yo‘riqnomasi (B.1-B.10).
Beshta ishni bajaring.
1) A.4-A.7 bo‘sh qolgan yoki agent bir qadamni o‘zi qilib o‘zi tekshiradigan joylarni ro‘yxat qiling.
2) B.3 dagi har bir manba uchun ulanish turi yozilganmi, tekshiring: API, MCP, eksport yoki qo‘lda; yozilmaganini so‘rang.
3) B.4 dagi noto‘g‘ri ketganda pul yoki ishonch yo‘qolishi mumkin bo‘lgan ruxsatlarni sanab, ularga chegara taklif qiling.
4) A shakl qadamlaridan kelib chiqib, B.6 da qolib ketgan odamga uzatish holatlarini taklif qiling.
5) B shaklini agent uchun tizim yo‘riqnomasi (system prompt) sifatida qayta yozing, bo‘limlar: Rol, Manbalar, Ruxsat etilgan harakatlar, Taqiqlangan harakatlar, Odamga uzatish, Qayd etish, Ohang va til, Sifat mezoni.
Iloji boricha egasining so‘zlarini saqlab qoling.
Egasi bermagan ruxsatlarni qo‘shmang.
O‘zbek tilida javob bering.
```

## Shakl A: Jarayon qadamlari: bugun va ertaga

Fayl: `kit3-agent/form-a-steps.md`

- Jarayon: 
- Boshlanadi: 
- Tugaydi: 
- Jarayon egasi: 

| # | A.1 Qadam (bitta harakat) | A.2 Ma’lumot | A.3 Bugun: kim | A.4 Ertaga A / R / I | A.5 Kim tekshiradi | A.6 Kim qaror qiladi | A.7 Kim javobgar | A.8 Izoh: kutish, xatolar |
|---|---|---|---|---|---|---|---|---|
| 1 |   |   |   |   |   |   |   |   |
| 2 |   |   |   |   |   |   |   |   |
| 3 |   |   |   |   |   |   |   |   |
| 4 |   |   |   |   |   |   |   |   |
| 5 |   |   |   |   |   |   |   |   |
| 6 |   |   |   |   |   |   |   |   |
| 7 |   |   |   |   |   |   |   |   |
| 8 |   |   |   |   |   |   |   |   |
| 9 |   |   |   |   |   |   |   |   |
| 10 |   |   |   |   |   |   |   |   |

A.4: A agent, R robot, I inson.
Agent hech qachon o‘z qadamini o‘zi tekshirmaydi.

## Shakl B: Agentning ish yo‘riqnomasi

Fayl: `kit3-agent/form-b-agent.md`

- Agent nomi: 
- Jarayon: 

### B.1 Agentning vazifasi: bir gapda


### B.2 Javobgar rahbar


### B.3 Ishlatishi mumkin bo‘lgan manbalar (hujjatlar, narxlar, CRM, jadval)

Eslatma: Har bir manba yoniga qanday ulanishini yozing: API, MCP, eksport yoki qo‘lda.

| Manba | Ulanish: API / MCP / eksport / qo‘lda |
|---|---|
|   |   |
|   |   |
|   |   |

### B.4 O‘zi mustaqil qila oladigan harakatlar


### B.5 Hech qachon qilmaydigan ishlar


### B.6 Qachon odamga uzatadi ... (holat - kimga - qanday)

| Holat | Kimga | Qanday |
|---|---|---|
|   |   |   |
|   |   |   |
|   |   |   |

### B.7 Har bir harakatdan so‘ng nimalarni yozib qo‘yadi


### B.8 Ohang va til


### B.9 Sifat mezoni: natija qachon to‘g‘ri hisoblanadi?


### B.10 Tasdiqladi, sana, keyingi ko‘rib chiqish sanasi
