# 1-dars lug‘ati: AI qanday ishlaydi

Birinchi qismdagi 8 ta atamani darsda jonli ko‘rdik.
Ikkinchi qismdagilar ma’lumot uchun: o‘z ishingizda uchrasa, shu yerdan qarang yoki Claude’dan «oddiy so‘z bilan tushuntir» deb so‘rang.
Model nomlari va narxlari bu yerda yo‘q: ular sanasi yozilgan «Bu hafta AI’da» varag‘ida.

**Qanday foydalanish:** har atamada uch qator bor: nima ekani, misol va biznes egasi uchun nega muhimligi.
Xodimingizga tushuntirishda «Misol» qatoridan boshlang.
Misollarning ko‘pi kursdagi o‘quv kompaniyasi «Baraka Office» MChJ hujjatlaridan.

## Darsda ko‘rgan 8 ta asosiy atama

### 1. AI uch qavatli (AI landscape)

**Nima:** Pastda infratuzilma (chiplar, elektr, data markazlar), o‘rtada modellar, tepada platformalar, ya’ni siz ishlatadigan ilovalar.
**Misol:** Nvidia chipni loyihalaydi, TSMC uni ishlab chiqaradi, laboratoriyalar data markazda modelni o‘qitadi, ilovalar sizga sotadi.
**Nega muhim:** Narx va kirish chip ta’minoti va siyosatga qarab o‘zgaradi; yangiliklarni to‘g‘ri o‘qishga yordam beradi.

### 2. Ma’lumotingiz qayerga boradi

**Nima:** Chatga yozgan xabaringiz noutbukdan chiqib, odatda AQSh yoki Yevropadagi data markazga boradi, u yerda GPU javob yozadi va qaytaradi.
**Misol:** Toshkentdagi serveringiz chet eldagi modelni chaqirsa ham, matn baribir chegaradan o‘tadi.
**Nega muhim:** 2026-yildan oddiy shaxsiy ma’lumot ro‘yxatdagi 49 ta davlat va hududga yuborilishi mumkin (VM qarori 415); Germaniya shartsiz ro‘yxatda, AQSh esa faqat Data Privacy Framework sertifikati bor kompaniyalar uchun, Anthropic siyosatida esa DPF ko‘rsatilmagan.
Biometrik, genetik ma’lumot va aloqa abonentlari ma’lumoti faqat O‘zbekistonda qoladi (ZRU-1125).
Xodim ma’lumotini AI xizmatiga faqat yozma roziligi bilan berasiz (Mehnat kodeksi, 178-modda).
AI bilan shaxsiy ma’lumotni noqonuniy qayta ishlash uchun 22-44 mln so‘m jarima bor (MJtK 46-2-modda).
Bu yuridik maslahat emas: yurist tasdiqlashi kerak.
Chatga yozishdan oldin: kerakmi, ismsiz bo‘ladimi, odam rozimi?

### 3. Katta til modeli (LLM)

**Nima:** Matndan o‘rgangan va keyingi eng ehtimolli so‘zni taxmin qiladigan dastur.
**Misol:** «1 dan 10 gacha son ayt» desangiz, ko‘p modellar 7 deydi: tanlamaydi, eng ko‘p uchraydigan javobni aytadi.
**Nega muhim:** Model hisoblamaydi va bilmaydi, taxmin qiladi; raqamni tekshirish sizning ishingiz.

### 4. Token

**Nima:** Model matnni bo‘lib o‘qiydigan bo‘lak; narx ham tokenda hisoblanadi.
**Misol:** Bir xil biznes gapi o‘zbekchada taxminan 44-51 token, inglizchada 24-26 token (2026-yil 3-noyabrda 7 ta tokenizatorda o‘lchangan).
**Nega muhim:** O‘zbekcha so‘rov ko‘proq token oladi, uzun chat qimmatlashadi; farq modelga qarab har xil, shuning uchun o‘lchab ko‘ring.

### 5. Kontekst oynasi (context window)

**Nima:** Model bitta suhbatda ushlab tura oladigan matn hajmi.
**Misol:** Dastarxon: har gapingiz yangi likopcha, to‘lsa chetidagisi tushib ketadi.
**Nega muhim:** Uzun chat sekin-asta xiralashadi; yangi vazifa uchun yangi chat oching.

### 6. Model darajalari va effort

**Nima:** Arzon va tez, muvozanatli, kuchli modellar; effort esa model javobdan oldin qancha o‘ylashi.
**Misol:** Claude’da Haiku arzon, Sonnet muvozanatli, Opus va Fable kuchli; «20 ta o‘zbek milliy taomi» savolida farq ko‘rinadi.
**Nega muhim:** Kuchli model reja tuzish uchun, arzon model saralash uchun; har ishga eng qimmatini qo‘ymang.

### 7. Frontier va ochiq vaznli modellar (frontier vs open-weight)

**Nima:** Frontier: eng kuchli modellar, faqat ishlab chiqaruvchining ilovasi yoki API orqali (Claude, GPT, Gemini).
Ochiq vaznli: o‘qitilgan model fayli e’lon qilingan, uni o‘z serveringizda ishlatish mumkin (DeepSeek, Qwen, Kimi, GLM).
**Misol:** 2025-yil 27-yanvarda DeepSeek chiqqanda Nvidia bir kunda taxminan 590 milliard dollar bozor qiymatini yo‘qotdi.
**Nega muhim:** Ochiq vaznli model oddiy saralash va qoralama uchun ko‘pincha yetarli va arzon, ma’lumotni o‘z serveringizda saqlash mumkin; murakkab fikrlash va o‘zbek tilida frontier hali kuchliroq.
DeepSeek saytidagi chat ma’lumotni Xitoyda saqlaydi: «ochiq» degani sayt maxfiy degani emas.

### 8. Gallyutsinatsiya

**Nima:** AI’ning ishonch bilan aytgan noto‘g‘ri javobi.
**Misol:** Excel xato qilsa, katak qizil bo‘ladi; AI xato qilsa, chiroyli javob beradi.
**Nega muhim:** Raqamni tekshirmasdan ishonmang; har doim «qanday hisobladingiz, formulani ko‘rsat» deb so‘rang.

<!-- pagebreak -->

## Ma’lumot uchun atamalar

### Data markaz, GPU, hisoblash quvvati (compute)

Minglab GPU chipli binolar: modellar shu yerda o‘qitiladi va ishlaydi.
Hisoblash quvvati (compute) bu ijaraga olingan chip vaqti.
Bitta kuchli modelni o‘qitish uchun o‘n minglab GPU oylab ishlaydi: shuning uchun kuchli model so‘z bo‘yicha pullik, chip arzonlashgani sari narx tushyapti.

### Kirish, chiqish, fikrlash va kesh tokenlari

Kirish: siz yuborgan matn.
Chiqish: model yozgan javob.
Fikrlash: javobdan oldingi «o‘ylash».
Kesh: qayta o‘qilgan matn.
Chiqish va fikrlash eng qimmat qismi; kesh ancha arzon.

### Xiralashish zonasi (dumb zone)

Kontekst oynasi to‘lishidan ancha oldin javob sifati tushadigan holat.
Aniq foiz yo‘q: model va vazifaga bog‘liq.
Yechim: yangi vazifa, yangi chat; Claude Code’da /compact (2-darsda).

### Platforma

Model atrofidagi ilova: ChatGPT, Claude, Gemini, ElevenLabs, Higgsfield.
Model bu dvigatel, platforma bu mashina.
Ishga qarab tanlang: masalan, Claude o‘zi rasm chizmaydi, rasm uchun boshqa vosita kerak.

### Bilim chegarasi va veb-qidiruv (knowledge cutoff)

Modelning bilimi ma’lum sanada to‘xtaydi; veb-qidiruv bugungi ma’lumotni olib keladi.
Bugungi narx, kurs yoki yangilik kerak bo‘lsa, qidiruvni yoqing.

### RAG (manbaga tayanish)

AI faqat siz bergan hujjatlardan javob beradi va manbani ko‘rsatadi.
Misol: kompaniya qoidalari yuklangan Gemini Notebook (avvalgi nomi NotebookLM).
Ichki bilim bazasi uchun xavfsiz yo‘l.

### Artefakt

Claude chat ichida yasab beradigan ishlaydigan sahifa: kalkulyator, taklif, jadval.
Settings → Capabilities bo‘limida «Code execution and file creation» yoqilgan bo‘lishi kerak.

### Tokenizator

Matnni tokenlarga bo‘ladigan dastur; har bir model oilasida o‘ziniki.
Shuning uchun bir xil gap turli modellarda turli sonda token bo‘ladi.

### Prompt asoslari

To‘rt qism: maqsad, qisqa kontekst, cheklovlar (nima qilmaslik), javob formati.
«Marketing reja tuz» o‘rniga to‘rt qismli topshiriq bir xil modeldan ancha yaxshi javob oladi.

### Uch marta takrorlash

Birinchi javob qoralama.
Ikkinchi marta xatoni ko‘rsating, uchinchi marta aniqlashtiring; baholashni uchinchisidan keyin qiling.

### Transkripsiya (ovozdan matnga)

Audio yozuvni matnga aylantirish.
O‘zbekcha raqamlarda adashadi: «bir uch-to‘rt yuz ming» 1 300 000 bo‘lib chiqishi mumkin.
Har bir transkriptdagi raqamni odam audio bilan tekshiradi.

### OpenRouter

Ko‘p modelni bitta hisob orqali ishlatish xizmati; ishlab chiqaruvchi narxida hisoblaydi.
Frontier va ochiq vaznli modellarni yonma-yon sinash uchun qulay (3-darsda kalit ochamiz).
