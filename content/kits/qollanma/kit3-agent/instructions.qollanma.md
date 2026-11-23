# instructions.md, agentning tizim yo‘riqnomasi: qanday to‘ldirish

`instructions.md` - B shaklining agent o‘qiydigan nusxasi (system prompt): agent har safar shu matnga amal qiladi.
3-darsda /kit3 B shakli asosida yozadi; 5-darsda har bir agent xatosidan keyin tuzatiladi.

## Boshlashdan oldin kerak bo‘ladi

- Imzolangan B shakli (`form-b-agent.md`).
- A shakli: odamga uzatish holatlarini tekshirish uchun.
- Sinov to‘plami (`kit4-people/test-set.md`): o‘zgarishdan keyin agentni tekshirish uchun.

## Har bir bo‘lim

| Kod | Bo‘lim | Oddiy so‘z bilan nima | Javob qayerdan olinadi | Baraka Office misoli |
|---|---|---|---|---|
| B.1 | Rol | Agent kim va vazifasi nima, «sen» bilan | B.1 | «Sen «Baraka Office» MChJ ning Savdo yordamchisisan» |
| B.2 | Javobgar rahbar | Bilmagan holatda kimga beradi | B.2 | «Savdo bo‘limi rahbari (ROP) Jamshid Karimov» |
| B.3 | Manbalar | Faqat shu manbalar, ulanish turi bilan | B.3 | Prays-list 2026 (eksport: CSV fayl), qoidalar (qo‘lda: hujjat, .md), ombor qoldig‘i (eksport: 1C dan CSV, har kuni ertalab); «Internetdan yoki xotirangdan narx olmaysan» |
| B.4 | Ruxsat etilgan harakatlar | Faqat shular | B.4 | 1-4 dona chakana, 5 va undan ko‘p ulgurji narx; summani bir qatorda (narx x dona = summa); 20 000 000 so‘mdan katta buyurtmaga 5% gacha chegirma vakolati; qoldiqni 1C fayli sanasi bilan |
| B.5 | Taqiqlangan harakatlar | Hech qachon | B.5 + andozadagi taqiqlar | 5% dan katta chegirma va 7 ish kunidan qisqa muddat va’da qilmaydi; tannarxni aytmaydi |
| B.6 | Odamga uzatish | Holat - kimga - qanday jadvali | B.6 | 5% dan katta chegirma; 7 ish kunidan tezroq yetkazish; tender yoki 150 000 000 so‘mdan katta buyurtma; topilmagan mahsulot yoki eski ombor fayli; shikoyat - ROP Jamshid aka, bot orqali |
| B.7 | Qayd etish | Ish jurnaliga nima yoziladi; xodimlar haqida nima yozilmaydi | B.7 | Savol, javob, manba, uzatish sababi; xodim qachon onlayn bo‘lgani yozilmaydi |
| B.8 | Ohang va til | Qanday yozadi | B.8 | O‘zbek tilida, «siz» bilan, qisqa |
| B.9 | Sifat mezoni | Tekshirsa bo‘ladigan qoida | B.9 | Narx prays-listga mos, chegirma va muddat qoidaga zid emas, javob 6 qatordan oshmaydi |
| B.10 | Tasdiq | Kim tasdiqladi, qachon, keyingi ko‘rib chiqish | B.10 | Jamshid Karimov (ROP); keyingi ko‘rib chiqish sinovning 1-haftasidan keyin |

Kursning tayyor boti (`pilot-template/`) shu faylni har bir savolda o‘qiydi; Baraka namunasi aynan `pilot-template/agent/instructions.md` bilan bir xil.
Bot faylni boshidan oxirigacha o‘qiydi, shuning uchun unga izoh yozmang: Baraka namunasining izohlari alohida faylda (`instructions.izoh.md`).
Keyinroq andozadagi «Namunalar» bo‘limiga test-set.md dagi 2-3 ta yaxshi javob qo‘yilishi mumkin; Baraka namunasida bu bo‘lim yo‘q.

## Ko‘p uchraydigan xatolar

1. Yo‘riqnoma bir gapdan iborat: «Sen yaxshi yordamchisan, mijozlarga yordam ber».
   Tuzatish: andozadagi hamma bo‘limni to‘ldiring; eng muhimlari B.5 va B.6.
2. B shaklida yo‘q ruxsat qo‘shilgan.
   Tuzatish: B shakli bilan satrma-satr solishtiring; egasi bermagan ruxsat bo‘lmasin.
3. Qarama-qarshi qoidalar ikkalasi ham yozilgan (3 kun va 7 kun).
   Tuzatish: bittasini tanlang, ikkinchisini odamga uzatish holati qiling.
4. Agent xatosidan keyin yo‘riqnoma o‘zgartirildi, lekin xatolar jurnaliga yozilmadi va sinov to‘plamida tekshirilmadi.
   Tuzatish: har bir o‘zgarish B.13 ning «Nimani o‘zgartirdik» ustuniga yoziladi va hamma misollarda qayta sinaladi.
5. B shakli yangilanmay qoldi.
   Tuzatish: o‘zgarish B.4, B.5 yoki B.6 ga tegsa, `form-b-agent.md` ni ham yangilang, xodimlar eskisini o‘qimasin.

## Tayyor bo‘lganini qanday bilasiz

- [ ] Har bir bo‘lim B shaklidagi kodga mos.
- [ ] Agentga «sen» bilan, buyruq shaklida yozilgan.
- [ ] B shaklida yo‘q ruxsat yo‘q.
- [ ] Faylda izoh yoki «[...]» qolmagan: bot uni butunlay o‘qiydi.
- [ ] Agent v0 shu fayl bilan 5 ta o‘tgan real holatda sinalgan.

## Claude Code bilan

```text
/kit3
```

Agent xato qilganda:

```text
/kit5 xato
```

## Namuna

- To‘ldirilgan namuna: [Baraka Office, instructions.md](../../namunalar/baraka-office/kit3-agent/instructions.md)
- Yomon misollar: [yomon-misollar.md](../../namunalar/yomon-misollar.md) (kuchsiz tizim yo‘riqnomasi va to‘g‘ri varianti)
- Skill namunasi: [skills/kit3/example/](../../skills/kit3/example/) (`suhbat.md` - aniq so‘rovlar va to‘liq javoblar)
- Namunaga izohlar: [instructions.izoh.md](../../namunalar/baraka-office/kit3-agent/instructions.izoh.md)
- Sinov davomidagi o‘zgarishlar: [Baraka Office, numbers.md](../../namunalar/baraka-office/kit5-pilot/numbers.md) (xatolar jurnali, «Nimani o‘zgartirdik» ustuni)
