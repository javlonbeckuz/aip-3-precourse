# Ixtiyoriy karta: Hermes’ni pilot yonida o‘rnatish

Bu karta majburiy emas.
Kursdagi shaxsiy AI yordamchingiz - o‘z pilot botingiz: u serverda ishlaydi, telefoningizga 9:00 da hisobot yuboradi va qiyin savolni mas’ul odamga beradi.
Hermes - ikkinchi, faqat Sizga xizmat qiladigan yordamchi.
Darsda mentorlar Hermes bo‘yicha yordam bermaydi: buni qo‘llab-quvvatlash oyida yoki vebinarda qiling.

Holat: kurs egasining qarori (3-noyabr): Hermes - ixtiyoriy namoyish; bu karta kursdan keyin o‘zingiz o‘rnatish uchun.

## Kerak bo‘ladi

- [ ] Pilot barqaror: 5-darsdan keyin hamma testlar o‘tadi, 2-hafta raqamlari yozilgan.
- [ ] Mentor bergan Hermes versiyasi raqami: __________ (bosh mentor shu versiyani sinagan).
- [ ] **Yangi** Telegram bot (BotFather, `/newbot`): pilotning tokenini ishlatmang.
  Bitta token faqat bitta joyda ishlaydi; ikkinchi dastur ulansa, pilot boti to‘xtaydi (409 Conflict).
- [ ] OpenRouter’da Hermes uchun alohida kalit, oylik limit bilan ($5-10).
- [ ] Serveringizda bo‘sh joy: 4 GB xotirali server ikkalasini ko‘taradi (`decisions/04-always-on-assistant.md`).
- [ ] 60-90 daqiqa vaqt.

## Qanday o‘rnatiladi

Claude Code’ga yozing:

```text
Serverimga Hermes Agent o'rnatmoqchiman, pilot botim yonida.
Rasmiy hujjat: https://hermes-agent.nousresearch.com/docs
Qoidalar:
- pilot botiga, uning papkasiga va xizmatiga tegma;
- Hermes alohida Linux foydalanuvchisi nomidan ishlasin, sudo'siz;
- versiya: [mentor bergan versiya], yangilashni mendan so'ramasdan qilma;
- Telegram'da faqat mening ID raqamimga javob bersin;
- model OpenRouter orqali, alohida kalit bilan; kalitni men o'zim kiritaman, sen ko'rma.
Har bir buyruqdan oldin nima qilishini bir gapda ayt. Xato chiqsa, skrinshotni men yuboraman.
```

Keyin, Telegram’da Hermes’ga:

1. **SOUL.md va AGENTS.md:** «Menga 10 ta savol ber va javoblarimdan SOUL.md (sening xarakteringni va chegaralaringni) va AGENTS.md (biznesim haqidagi faktlar) yoz.»
   Chegaralar albatta bo‘lsin: pul o‘tkazmaydi, xodim yoki mijozga Sizning nomingizdan yozmaydi, faqat qoralama tayyorlaydi.
2. **Bitta ish:** «Har ish kuni 9:00 da [fayl] dan 3 qatorli xulosa yubor.»
   Pilot botingizning kunlik hisobotini Hermes o‘qiy oladigan faylga yozdirish uchun Claude Code’dan so‘rang.
3. **Xotira:** «Buni xotirangga saqla: dushanba 10:00 da savdo yig‘ilishi.»
   Keyin `/new` yuboring va so‘rang: «Dushanba nima bor?»
4. **Qayta yuklash sinovi:** serverni qayta yuklang (Claude Code yordamida) va ikkala botga yozing: ikkalasi ham javob berishi kerak.

## Baraka Office namunasi

Fayllar: `../04-xotira-fayllari/hermes-namuna/`.

- SOUL.md: ismi «Hisobchi», direktor Rustamov S.A. ning yordamchisi, «Siz» bilan, avval xulosa, uchta chegara.
- AGENTS.md: kompaniya faktlari (zavod, showroom, 64 xodim, chegirma qoidalari) va ikkita fayl: `~/biznes/hisobot.md`, `~/biznes/ombor/`.
- Ish: har ish kuni 9:00 da `hisobot.md` dan 3 qator.
- USER.md (205 belgi) va MEMORY.md (244 belgi): cheklovlardan ancha kichik (1 375 va 2 200).

## Yomon namuna

> Hermes’ga pilot botining tokenini berdim, xodimlarni ham qo‘shdim, toki ular ham undan foydalansin.

**Nimasi yomon:**

- Bir token ikki joyda: pilot boti to‘xtadi, xodimlar javobsiz qoldi.
- Hermes serverda buyruq bajara oladi: xodim unga «papkadagi fayllarni ko‘rsat» desa, ko‘rsatishi mumkin.
  Xodimlar terminalga kirish huquqi bor agent bilan hech qachon gaplashmasligi kerak.

**To‘g‘rilangan:** Hermes - alohida bot, alohida kalit, faqat Sizning ID raqamingiz.
Xodimlar faqat pilot botida.

## Tayyor, agar

- [ ] Hermes o‘z boti orqali faqat Sizga javob beradi; ikkinchi akkauntga javob bermaydi.
- [ ] Pilot boti avvalgidek ishlayapti (`/holat`).
- [ ] 9:00 dagi ish keldi va unda kompaniyangiz ma’lumoti bor.
- [ ] Server qayta yuklangandan keyin ikkala bot ham javob beradi.
- [ ] Versiya raqami yozib qo‘yilgan, avtomatik yangilanish o‘chiq.
