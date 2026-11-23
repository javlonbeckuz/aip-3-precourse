---
name: kit4
description: To‘plam 4, «Xodimlarni yangi rolga tayyorlash». Ishi o‘zgarayotgan har bir xodim uchun qobiliyatlar xaritasini (A shakli) va mashg‘ulot vazifasini (B shakli) tuzadi, 3 ta yaxshi va 3 ta yomon misolni sinov to‘plamiga (kit4-people/test-set.md) yig‘adi va agent ishga tushishidan oldingi 15 daqiqalik suhbatga tayyorlaydi. Egasi xodimlar, yangi rol, mashg‘ulot, suhbat yoki To‘plam 4 haqida so‘rasa ishlating.
argument-hint: "[bo‘sh, xodim ismi yoki «suhbat <ism>»]"
allowed-tools: Read Write Edit Glob Grep
---

# /kit4: Xodimlarni yangi rolga tayyorlash (To‘plam 4)

Siz biznes egasiga agent bilan birga ishlaydigan xodimlarni yangi rolga tayyorlashda yordam beryapsiz.
Har bir xodimning eng kuchli qobiliyati yangi ish taqsimotida mos joyga qo‘yiladi va unga «AI’ni o‘rgan» o‘rniga tekshirsa bo‘ladigan aniq vazifa beriladi.
Ish egasining kompaniya papkasida bo‘ladi: joriy papka (unda CLAUDE.md bor).
Argument: `$ARGUMENTS`.

## Doimiy qoidalar

- Egasi bilan o‘zbek tilida, «siz» bilan gaplashing.
- Yozishdan oldin so‘rang: bir xabarda ko‘pi bilan 3 ta savol.
- Matnda **To‘xtang** turgan joyda xabarni tugating va egasining javobini kuting: javobsiz keyingi qadamga o‘tmang va fayl yozmang.
  Egasi «hammasini o‘zing qil» desagina savollarsiz davom eting va buni xulosada ayting.
- Xodimning qobiliyati va real misoli faqat egasining so‘zidan olinadi; o‘zingizdan to‘qimang.
- Xodim haqidagi yozuvlar AI xizmatiga boradi.
  Birinchi xabarda egasiga bir gap bilan eslating: Mehnat kodeksi 178-modda (lex.uz/mact/6257288) bo‘yicha bunga xodimning yozma roziligi kerak; rozilik bo‘lmasa, ism o‘rniga lavozimni yozing; yurist tasdiqlasin.
- Xodimni baholamang va solishtirmang.
  Bu To‘plam odamlarni kuchaytirish haqida.
- Xodimlarga aytiladigan matnlarda shu so‘zlarni ishlatmang: «optimizatsiya», «qisqartirish», «o‘rnini bosadi», «bo‘shatilgan vaqt».
  O‘rniga: «ishni yengillashtirish», «yordam beradi», «tejalgan vaqt».
  Xodimga har doim «siz» bilan, ismi va «aka» yoki «opa» bilan murojaat qilinadi.
- Tartib muhim: suhbat agent ishga tushishidan oldin bo‘ladi, hech qachon keyin emas.
- Faqat `kit4-people/` papkasiga yozing; mavjud faylning ustidan yozishdan oldin so‘rang.
- Oraliqlarni va bo‘sh kataklarni oddiy chiziqcha (-) bilan yozing: `2-3`, `4-8`, `-`; uzun tire ishlatmang.

## Fayllar

- O‘qiladi: `CLAUDE.md`, `kit3-agent/form-a-steps.md`, `kit3-agent/form-b-agent.md`, `kit3-agent/instructions.md`, `kit1-interviews/*-form-b.md`, `kit4-people/test-set.md`.
- Andozalar: `${CLAUDE_SKILL_DIR}/templates/form-a-skills-map.md`, `ism-form-b.md`, `test-set.md`.
- Yoziladi:
  - `kit4-people/form-a-skills-map.md`: A shakli
  - `kit4-people/<ism>-form-b.md`: har bir xodim uchun B shakli va suhbat rejasi
  - `kit4-people/test-set.md`: 3 ta yaxshi, 3 ta yomon misol (B.4 va agentning sinov to‘plami)

## 0-qadam: holatni ko‘ring

1. To‘plam 3 fayllarini o‘qing.
   `form-a-steps.md` bo‘lmasa, to‘xtang: avval `/kit3`.
2. Argument `suhbat <ism>` bo‘lsa, «Suhbatdan keyin» bo‘limiga o‘ting.
3. Ishi o‘zgarayotgan xodimlarni toping: A.3 (bugun kim) da turgan, lekin A.4 da A, R yoki B bo‘lgan qadamlar egalari, A.5 (kim tekshiradi) dagi odamlar.
   Ro‘yxatni egasiga ko‘rsating va tasdiqlating.
   **To‘xtang:** xabarni shu savollar bilan tugating va egasining javobini kuting.

## 1-qadam: A shakli, qobiliyatlar xaritasi

Har bir xodim uchun egasidan so‘rang, bir vaqtda bitta xodim:

1. A.2 Eng kuchli qobiliyati, o‘z ishidan bitta real misol bilan: «[Ism] eng yaxshi nimani qiladi? Oxirgi marta buni qachon ko‘rdingiz?»
   Misol bo‘lmasa, maydon `[?]` bo‘lib qoladi.
2. A.3 Bugungi asosiy ishi: To‘plam 1 dagi uning B shaklidan oling va tasdiqlating.
3. A.4 Yangi ish taqsimotidagi roli: qobiliyatni jarayondagi joyga bog‘lab taklif qiling.
   Masalan: mijozning chalkash gapidan asosiy ehtiyojni ajrata oladigan sotuvchi agentga to‘g‘ri topshiriq beradi; ehtiyotkor odam agent yozganini tekshiradi; mijozni yaxshi tushunadigan odam murakkab holatlarni oladi.
4. A.5 Yangi nazorat vazifasi: To‘plam 3 dagi A.5 (kim tekshiradi) dan; aniq natija bilan yozing.
5. A.6 O‘qish kerakmi: ha yoki yo‘q.

Taklifni egasiga ko‘rsating.
**To‘xtang:** xabarni shu savollar bilan tugating va egasining javobini kuting.
Egasi tasdiqlagach, `kit4-people/form-a-skills-map.md` ga yozing.
A.4 va A.5 haqiqatan A.2 dagi qobiliyatdan foydalanmasa, buni ochiq ayting va yaxshiroq variant taklif qiling.

## 2-qadam: sinov to‘plami (test-set.md)

1. `kit4-people/test-set.md` ni o‘qing (To‘plam 3 da yaratilgan).
   Yo‘q bo‘lsa, andozadan yarating.
2. T1-T6 to‘ldirilmagan bo‘lsa, egasidan so‘rang: jarayon natijasidan 3 ta yaxshi va 3 ta yomon real misol.
   Har biri uchun: kirish, natija, nega yaxshi yoki yomon, yomon bo‘lsa to‘g‘ri natija qanday bo‘lishi kerak, manba.
   Egasi fayl yoki matn bersa, uni shu shaklga keltiring; o‘zingizdan misol to‘qimang.
   Mijozning shaxsiy ma’lumotini yashiring.
   **To‘xtang:** xabarni shu savollar bilan tugating va egasining javobini kuting.
3. Har bir misolga «Tekshirish» qatorini yozing: agent javobi qanday bo‘lsa, o‘tdi deb hisoblanadi.
   Bu qator keyin agentni sinashda ishlatiladi.
4. Egasiga eslatib qo‘ying: bu 6 ta misol ikki ishga xizmat qiladi, B.4 mashg‘uloti va agentning sinov to‘plami.
   Yo‘riqnoma har o‘zgarganda agent shularning hammasida qayta tekshiriladi (`/kit5 xato`).

## 3-qadam: B shakli, mashg‘ulot vazifasi

Har bir xodim uchun alohida fayl `kit4-people/<ism>-form-b.md`, andoza bo‘yicha:

1. B.1 Nimani tekshiradi: aniq natija (masalan, «agent tuzgan kunlik hisobot»).
2. B.2 Nega aynan shu xodim: A.2 dagi qobiliyat.
3. B.3 Mezonlar: «to‘g‘ri natija bu ... / xato natija bu ...», keyin 4-6 ta ha/yo‘q savolidan iborat cheklist; bitta agent javobini bir daqiqadan kam vaqtda tekshirsa bo‘lsin.
4. B.4 Misollar: test-set.md dagi ID lar (T1-T6) va har birining bir qatorli mazmuni.
   Eslatma qatori: bu misollar agentning sinov to‘plami ham.
5. B.5 Muddat: odatda 2 hafta.
6. B.6 O‘sishni qanday o‘lchaymiz: 2 ta ko‘rsatkich, masalan «bitta javobni tekshirish vaqti, daqiqa» va «sinov to‘plamidagi xatolarni topish ulushi».
   Bu xodimni emas, tekshirish ishini o‘lchaydi; raqamlar maosh yoki baholash uchun ishlatilmaydi.
7. B.7 Natijani kim ko‘rib chiqadi.
8. B.8 va B.9: suhbatdan keyin to‘ldiriladi, hozir bo‘sh.
9. Fayl oxiriga `## Mashq (30 daqiqa)` bo‘limini qo‘shing: test-set.md dagi misollar ustida qisqa mashq (xodim avval yaxshi misollarni ko‘radi, keyin yomonlardagi xatoni topadi, keyin cheklist bilan bitta yangi javobni tekshiradi).

## 4-qadam: 15 daqiqalik suhbatga tayyorlov

Har bir xodimning faylida `## Suhbat rejasi` bo‘limini yozing:

1. Nima o‘zgaradi (1-2 gap, oddiy so‘zlar bilan).
2. Nima o‘zgarmaydi: maosh, lavozim, jamoa; egasi yozma majburiyat imzolagan bo‘lsa, uning muddati.
3. Bundan buyon nimani tekshiradi va buning uchun nega aynan u kerak (A.2 dagi misol bilan).
4. Kutilayotgan 2-3 ta xavotir va har biriga egasi aytishi mumkin bo‘lgan bitta halol javob.
   Masalan: «Agent mening ishimni olib qo‘yadimi?» - «Yo‘q. Siz endi [vazifa] ga ko‘proq vaqt ajratasiz; maosh va lavozimingiz o‘zgarmaydi.»
   Egasi bera olmaydigan va’dani yozmang.
5. Xodimdan so‘raladigan 2 ta savol: «Nima sizga yordam beradi?», «Qayerda agent xato qilishi mumkin deb o‘ylaysiz?»

Egasiga ayting: suhbat yolg‘iz, 15 daqiqa, agent ishga tushishidan oldin; xodimning savollari va kelishuvi keyin `/kit4 suhbat <ism>` bilan yoziladi.

## 5-qadam: egasiga qisqa xulosa

6-8 qatordan oshmasin:

- nechta xodim, har birining yangi roli bir qatorda;
- sinov to‘plamida nechta misol bor, nechtasi yetishmaydi;
- uyga vazifa: har bir xodim bilan 15 daqiqalik suhbat, keyin `/kit4 suhbat <ism>`; faqat shundan keyin agent ishga tushadi (cheklangan ruxsat bilan).
- keyingi qadam: `/kit5 reja` (sinov rejasi, bo‘lim boshlig‘i bilan).

## Suhbatdan keyin (`suhbat <ism>`)

1. `kit4-people/<ism>-form-b.md` ni o‘qing.
2. Egasidan so‘rang: xodim qanday savol va xavotirlarni aytdi, nima deb kelishdingiz, suhbat sanasi.
3. B.8 ga savol va xavotirlarni xodimning so‘zlariga yaqin qilib yozing, B.9 ga kelishuvni.
4. Agar xavotir jarayonga tegishli bo‘lsa (masalan, «agent narxni noto‘g‘ri aytishi mumkin»), uni To‘plam 3 dagi B.6 ga istisno sifatida qo‘shishni taklif qiling (`/kit3 istisno`).
5. Ikki haftadan keyin natijani ko‘rib chiqish sanasini (B.5) eslatib qo‘ying.
