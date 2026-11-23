# 2-dars lug‘ati: Claude Code va birinchi jarayon

Qalin yozilgan 7 ta atama darsda jonli ko‘rsatiladi.
Qolganlari - ma’lumotnoma: o‘z ishingizda uchraganda shu yerdan qarang.
Atama tushunarsiz bo‘lsa, Claude’dan so‘rang: «[atama] nima? 5 yoshli bolaga tushuntir».

## Claude va Claude Code

| Atama | Oddiy so‘z bilan | O‘xshatish | Biznes uchun nima |
|---|---|---|---|
| **Harness** | Model atrofidagi dastur: unga fayl o‘qish, buyruq bajarish, brauzer ochish imkonini beradi | Bitta dvigatel, har xil mashina | Vosita tanlovi model tanlovi kabi muhim |
| **Claude ilovasi, Claude desktop, Claude Code** | Bitta miya, uch eshik. Ilova: chat va uzoq vazifalar (sobiq Cowork endi shu oynada). Desktop: shular va Code bo‘limi. Claude Code: kompyuteringizdagi papka ichida ishlaydi | Bir oshpaz: ovqatni olib keladi, oshxonaga kiradi yoki sizning uyingizda pishiradi | Kompaniya ma’lumoti diskda, yuzlab faylda: Claude Code ularni yuklamasdan ochadi |
| Agent (agentlik) | Vazifani qadamlarga bo‘lib, o‘zi bajaradi va natijani tekshiradi | «Desktop’ni tartibga keltir» | U faqat javob bermaydi, ish qiladi |
| Terminal, CLI, Warp | Kompyuter bilan matn orqali gaplashadigan oyna. Warp - qulay terminal: papkani ko‘rsatadi, .md fayllarni chiroyli ochadi | «Bu ham chat oynasi» | Qora ekrandan qo‘rqmaslik |
| Ishchi papka | Claude Code hozir ishlayotgan papka; yo‘li oyna tepasida ko‘rinadi | Ish stoli | Har loyiha o‘z papkasida |
| .md fayl | Oddiy matn, oddiy belgilar bilan bezatilgan (sarlavha, jadval) | Daftar varag‘i | Kursdagi hamma narsa .md da saqlanadi, Claude uni oson o‘qiydi |

## Kompaniya papkasi va xotira

| Atama | Oddiy so‘z bilan | O‘xshatish | Biznes uchun nima |
|---|---|---|---|
| **CLAUDE.md** | Kompaniya papkasidagi qoidalar daftari: Claude har sessiya boshida o‘qiydi | Restoranning oshpazlar uchun ichki qoidalari | Kompaniyangizni bir marta yozasiz, har safar tushuntirmaysiz |
| Global ko‘rsatmalar | Har suhbatga tegishli qoidalar: uzun tire yo‘q, ortiqcha gap yo‘q, xato bo‘lsam ayt, hozir 2026-yil | Shaxsiy kotibga bir marta aytilgan odatlaringiz | Maqtov va eski yil bilan qidirish to‘xtaydi |
| Ichki CLAUDE.md | Pastki papkadagi kichik CLAUDE.md: faqat Claude shu papkada ishlaganda o‘qiladi | Bo‘lim qoidalari kompaniya qoidalari ichida | Asosiy fayl qisqa qoladi |
| `/init` | Claude papkani o‘qib, CLAUDE.md qoralamasini yozadi | Yangi xodim birinchi kuni hujjatlarni o‘qib chiqadi | Tez boshlash; keyin o‘zingiz tuzatasiz |
| Avtomatik xotira | Claude Code tuzatishlaringiz haqida o‘zi qisqa qayd yuritadi; `/memory` da ko‘rinadi | Kotibning o‘z daftarchasi | Foydali, lekin CLAUDE.md o‘rnini bosmaydi: nimani yozishini siz boshqarmaysiz |

## Reja

| Atama | Oddiy so‘z bilan | O‘xshatish | Biznes uchun nima |
|---|---|---|---|
| **Reja rejimi (plan mode)** | Claude faqat o‘ylaydi, savol beradi va reja yozadi; siz tasdiqlamaguncha hech narsani o‘zgartirmaydi. Shift+Tab yoki `/plan` | Qurilishdan oldin loyiha | Rejasiz qurish - 9 qavatli binoga keyin quvur o‘tkazish |
| **PRD** | Mahsulot talablari hujjati: nima quriladi, kim uchun, nima kiradi va kirmaydi, ma’lumot manbalari, o‘lchov, xavflar | Binoning loyiha chizmasi; texnik topshiriq (TZ) | Sizga dastur sotayotganlardan ham shuni so‘rang |
| Vazifalar ro‘yxati | PRD ni kichik dasturchi tushunadigan kichik qadamlarga bo‘lish | Poydevor, devor, tom | Keyin bir nechta agent parallel ishlashi mumkin |

## Skill va xavfsizlik

| Atama | Oddiy so‘z bilan | O‘xshatish | Biznes uchun nima |
|---|---|---|---|
| **Skill** | Saqlangan, qayta ishlatiladigan yo‘riqnoma fayli (`.claude/skills/<nom>/SKILL.md`); `/nomi` bilan chaqiriladi | Restoranning texnologik kartasi | Takror ish har safar bir xil bajariladi |
| Frontmatter | SKILL.md tepasidagi ikki `---` orasidagi qism: nom va qachon ishlatilishi | Kartaning sarlavhasi | Claude skill’ni qachon uyg‘otishni shundan biladi |
| Plagin (plugin) | Bir nechta skill, buyruq va ulanishning bitta paketi | Franshiza paketi | Butun imkoniyatni birdan o‘rnatish |
| Skill orqali zararli buyruq (prompt injection) | Begona skill ichiga yashirilgan buyruq: kalitlarni o‘g‘irlash, fayl o‘chirish | Tekshirilmagan odamga ofis kalitini berish | O‘rnatishdan oldin Claude’ga o‘qiting; mashhur skill ham xavfsiz bo‘lishi shart emas |

## To‘plam 2

| Atama | Oddiy so‘z bilan |
|---|---|
| Jarayon | Boshlanishi va natijasi bor vazifalar zanjiri; bir nechta xodimning vazifasi kirishi mumkin |
| Qiymat (A.8) | A.2 takrorlanishi + A.3 ketadigan vaqt + A.7 mijozga ta’siri; 3 dan 15 gacha |
| Osonlik (A.9) | A.4 aniq qoidasi bor + A.5 ma’lumot raqamli + A.6 xatosi arzon; 3 dan 15 gacha |
| Qiymat va osonlik matritsasi | Har jarayon bitta nuqta; ikkalasi ham 9 dan katta bo‘lsa - «Birinchi sinov» |
| Boshlang‘ich holat (baseline) | AI’gacha bo‘lgan raqamlar: haftasiga nechta so‘rov, necha daqiqa, nechta xato; tarixdan yoki 5 kun jonli |

## Odatlar

| Odat | Nima qilasiz |
|---|---|
| **Skrinshot qilib so‘rang** | Qotib qoldingizmi? Xatoni skrinshot qiling va avval Claude’dan so‘rang (macOS Ctrl+V, Windows Alt+V) |
| AI yo‘q deb tasavvur qiling | So‘rashdan oldin: AI bo‘lmasa, bu ishni kimlar qilardi? Claude’dan shular nomidan savol so‘rang |
| 5 yoshli bolaga tushuntir | Har yangi atamani oddiy so‘z bilan so‘rang |

Buyruqlar va tugmalar: «Claude Code shpargalkasi» varag‘ida.
Manbalar 2026-11-03 da tekshirildi: code.claude.com/docs (memory, skills, permission-modes, plugins/security), support.claude.com (16761823, 8241126).
