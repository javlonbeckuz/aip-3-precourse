# Raqamlar tekshiruvi: o‘zbekcha nutqdagi tuzoqlar

/kit1 shu ro‘yxat bo‘yicha transkriptdagi har bir raqamni tekshiradi.
Ovozni matnga aylantiruvchi dasturlar (Gemini va boshqalar) o‘zbekcha taxminiy raqamlarni ko‘pincha noto‘g‘ri yozadi.
Bitta noto‘g‘ri raqam keyin To‘plam 2 dagi baholarga, To‘plam 5 dagi boshlang‘ich holatga va oxirgi hisobga o‘tadi.

## Asosiy misol

Xodim aytdi: «bir uch-to‘rt yuz ming».
Ma’nosi: taxminan 300 000-400 000 so‘m.
Raqam oldidagi «bir» bu yerda «taxminan» degani, 1 soni emas.
Transkriptda chiqishi mumkin: «1 300 000», «1 340 000», «1,3-1,4 mln», «13-400 ming».
To‘g‘ri yozuv: «300 000-400 000 [?]», keyin egasi yoki xodim tasdiqlaydi.

## Shubhali holatlar

| # | Belgi | Misol (transkriptda) | Ehtimoliy ma’nosi | Nima qilish kerak |
|---|---|---|---|---|
| 1 | Boshqa son oldida «bir» | «bir besh daqiqa», «1 500 ming», «bir soatcha» | taxminan 5 daqiqa; taxminan 500 ming; taxminan 1 soat | «taxminan» deb o‘qing, [?] qo‘ying. Istisno: «bir yarim» doim 1,5 degani (4-qatorga qarang) |
| 2 | Ikki raqam yopishgan | «34 daqiqa», «2-2500» | «uch-to‘rt» = 3-4 daqiqa; «ikki-ikki yarim ming» = 2000-2500 | oraliq qilib yozing, [?] qo‘ying |
| 3 | Oraliq | «uch-to‘rt marta», «o‘n-o‘n besh daqiqa» | 3-4; 10-15 | oraliqni saqlang; hisob uchun o‘rtasini oling va buni yozing |
| 4 | «Yarim», «chorak», «bir yarim» | «bir yarim soat», «1 yarim soat», «yarim soat», «chorak soat» | 90 daqiqa; 90 daqiqa; 30 daqiqa; 15 daqiqa | daqiqaga aylantiring, hisobni ko‘rsating; «bir yarim» ni «taxminan yarim» deb o‘qimang |
| 5 | «Ming» va «million» aralashgan | «o‘n besh» (so‘m haqida) | ko‘pincha 15 000 so‘m | kontekstdan aniqlang, [?] qo‘ying |
| 6 | Ruscha son | «sto», «pyatsot», «tisyacha» | 100, 500, 1000 | o‘zbekchaga o‘girib, [?] qo‘ying |
| 7 | Davr noaniq | «kuniga», «haftasiga», «oyiga», «har safar» | haftaga aylantirish kerak | ish haftasidagi kunlar sonini egasidan so‘rang (5 yoki 6) |
| 8 | Hajmga to‘g‘ri kelmaydi | kichik do‘konda «kuniga 1 300 000 ta buyurtma»; bitta vazifaga «kuniga 600 daqiqa» | transkripsiya xatosi | [?] qo‘ying, egasidan so‘rang |
| 9 | Foiz | «o‘ttiz foiz», «30%» | nimaning foizi ekani noaniq | nimaning foizi ekanini yozing |
| 10 | Ism yoki sana raqamga o‘xshaydi | «uchinchi filial», «besh yuzinchi buyurtma» | raqam emas, nom | miqdor deb hisoblamang |

## Raqamlarni bir-biri bilan solishtiring

Bitta raqam boshqasiga mos kelmasa, ikkalasidan biri xato.

- Oylik zarar ÷ oyiga xatolar soni = bitta xato narxi.
  Masalan: haftasiga 3-4 xato ≈ oyiga 13-17 xato; oyiga 1 300 000 so‘m bo‘lsa, bitta xato 76 000-100 000 so‘m; 300 000-400 000 bo‘lsa, 18 000-31 000 so‘m.
  Qaysi biri bu biznesga to‘g‘ri kelishini egasidan so‘rang.
- Kuniga buyurtmalar × bitta buyurtma daqiqasi bir ish kunidan (taxminan 480 daqiqa) oshmasligi kerak.
- Bir xodimning hamma vazifalari yig‘indisi haftasiga taxminan 40-60 soatdan oshsa, qaysidir raqam noto‘g‘ri.

## Haftaga aylantirish

- Kuniga N marta: haftasiga N × [ish kunlari] marta.
  Ish kunlari sonini egasidan bir marta so‘rang va CLAUDE.md da bo‘lsa, o‘shandan oling.
- Oyiga N marta: haftasiga N / 4,3 marta.
- «Har kuni ertalab»: kuniga 1 marta.
- Hisobni har doim yozing: «kuniga 3 × 6 kun = 18».

## Holat belgilari

- `aniq`: xodim aniq raqam aytgan va u gapga mos keladi.
- `[?]`: taxmin, oraliq yoki shubhali; egasi yoki xodim tasdiqlashi kerak.
- `tasdiqlandi (egasi)` yoki `tasdiqlandi (xodim)`: kim tasdiqlaganini yozing.
- `tuzatildi`: eski qiymat va yangi qiymatni ikkalasini ham yozing, masalan «1 300 000 → 300 000-400 000».
