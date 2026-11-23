"""Every sentence the bot shows to people, in one place.

Change the wording here, not inside the code.
Staff-facing rules (from the Praktikum change-management review):
- address people with "siz";
- the bot has a function name (AGENT_NAME), never a person's name;
- no "sinov", "nazorat", "optimizatsiya", "bo‘shatilgan": say "loyiha", "tekshirish", "tejalgan".
Typography follows the course kits: o‘ and g‘ with ‘, the tutuq belgisi with ’.
"""

WEEKDAYS = ["dushanba", "seshanba", "chorshanba", "payshanba", "juma", "shanba", "yakshanba"]
MONTHS = [
    "yanvar", "fevral", "mart", "aprel", "may", "iyun",
    "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
]


def day_label(d) -> str:
    """2026-11-03 -> '3-noyabr, seshanba'."""
    return f"{d.day}-{MONTHS[d.month - 1]}, {WEEKDAYS[d.weekday()]}"


# ------------------------------------------------------------ staff / users

START = (
    "Assalomu alaykum! Bu - «{agent}», {company} xodimlari uchun yordamchi.\n"
    "Savolingizni oddiy matn bilan yozing, men ma’lumotlarga qarab javob beraman.\n\n"
    "Har bir javob ostida ✅ yoki ❌ ni bosing: shu bilan yordamchini yaxshilaymiz.\n\n"
    "Savol va javoblar faqat sifatni tekshirish uchun saqlanadi. "
    "Ularni loyiha yetakchisi va rahbar ko‘radi. "
    "Ular hech kimning ishini baholash uchun ishlatilmaydi."
)
START_PUBLIC = (
    "Assalomu alaykum! Bu - {company} yordamchisi «{agent}».\n"
    "Savolingizni yozing. Aniq javob bera olmasam, savolingizni xodimga yuboraman."
)
HELP = (
    "Qanday foydalaniladi:\n"
    "• Savolni oddiy matn bilan yozing.\n"
    "• Javob to‘g‘ri bo‘lsa ✅, xato bo‘lsa ❌ ni bosing.\n"
    "• /yangi - yangi mavzu (oldingi savollar unutiladi).\n"
    "• /id - Telegram ID raqamingiz."
)
HELP_ADMIN = (
    "\n\nRahbar buyruqlari:\n"
    "/holat - bot va ma’lumotlar holati\n"
    "/hisobot - bugungi raqamlar\n"
    "/hafta - haftalik raqamlar fayli (5-to‘plam B shakli uchun)\n"
    "/xatolar - oxirgi xato deb belgilangan javoblar\n"
    "/xarajat - model xarajati va limit\n"
    "/stop - botni darhol to‘xtatish\n"
    "/davom - botni qayta yoqish\n"
    "/ruxsat 123456789 Ism - xodimga kirish berish\n"
    "/taqiq 123456789 - kirishni olib tashlash\n\n"
    "Shaxsiy yordamchi:\n"
    "/eslab_qol fakt - yordamchi shu faktni eslab qoladi\n"
    "/xotira - eslab qolgan faktlar, /unut 2 - 2-faktni o‘chirish\n"
    "/jadval 09:00 savol - har ish kuni shu vaqtda javob yuboradi\n"
    "/jadval - ro‘yxat, /jadval_ochir 1 - 1-ishni o‘chirish\n"
    "/eslat 15:00 matn - shu vaqtda eslatadi\n"
    "/darhol narx qoldiq - shu mavzular darhol, qolgan javoblar tasdiqqa (/darhol - hozirgi rejim)\n\n"
    "Yangi eksport (1C, Excel, CSV): faylni shu chatga yuboring, nomi data/ dagi fayl bilan bir xil bo‘lsin"
)
YOUR_ID = "Sizning Telegram ID raqamingiz: {id}"
NOT_ALLOWED = (
    "Bu bot faqat {company} xodimlari uchun.\n"
    "Sizning Telegram ID raqamingiz: {id}\n"
    "Kirish kerak bo‘lsa, shu raqamni rahbaringizga yuboring."
)
NEW_CHAT = "Yangi suhbat boshlandi. Oldingi savollar unutildi."
NON_TEXT = "Hozircha faqat matnli xabarlarni tushunaman. Savolingizni yozib yuboring."
TOO_LONG = "Xabar juda uzun. Savolni qisqaroq yozing (taxminan {limit} belgigacha)."
PAUSED = "Yordamchi hozir vaqtincha to‘xtatilgan. Savolingizni odatdagidek xodimga yuboring."
ESCALATED = "Bu savolga aniq javobni xodim beradi. Savolingizni unga yubordim."
ESCALATED_LATER = "Bu savolga aniq javobni xodim beradi. Savolingizni unga yubordim, u ish vaqtida javob beradi."
TECH_PROBLEM = "Kechirasiz, hozir avtomatik javob bera olmayman. Savolingizni xodimga yubordim."
PUBLIC_LIMIT = "Bugun uchun savollar soni tugadi. Iltimos, ertaga yozing yoki bizga qo‘ng‘iroq qiling."
WAIT_APPROVAL = "Savolingiz qabul qilindi. Javobni xodim tekshirib, tez orada yuboradi."
FROM_STAFF = "Xodim javobi:\n{text}"

BTN_OK = "✅ To‘g‘ri"
BTN_BAD = "❌ Xato"
BTN_SEND = "✅ Yuborish"
BTN_REJECT = "❌ Rad etish"

FEEDBACK_THANKS = "Rahmat!"
FEEDBACK_ASK_NOTE = (
    "Rahmat, bu xatolar jurnaliga yozildi.\n"
    "Nima noto‘g‘ri edi? Bitta xabar bilan qisqa yozing (yoki /bekor)."
)
FEEDBACK_NOTE_SAVED = "Yozib qo‘ydim. Rahmat - shu bilan yordamchi yaxshilanadi."
FEEDBACK_NOTE_SKIPPED = "Mayli. Xato baribir jurnalga yozildi."
ALREADY_HANDLED = "Bu allaqachon belgilangan."

# ------------------------------------------------------------ reviewer / escalation

APPROVAL_REQUEST = (
    "📝 Javob loyihasi #{id}\n"
    "Kimdan: {name}\n"
    "Savol: {question}\n\n"
    "Javob:\n{answer}\n\n"
    "To‘g‘ri bo‘lsa «Yuborish» ni bosing.\n"
    "O‘zgartirmoqchi bo‘lsangiz, shu xabarga to‘g‘ri javobni reply qilib yozing."
)
APPROVED = "✅ #{id} yuborildi."
REJECTED = "❌ #{id} rad etildi. To‘g‘ri javobni shu xabarga reply qilib yozsangiz, bot uni yuboradi."
EDITED_SENT = "✅ Sizning javobingiz #{id} yuborildi."
ESCALATION_NOTICE = (
    "🙋 Odamga uzatildi #{id}\n"
    "Kimdan: {name}\n"
    "Savol: {question}\n"
    "Sabab: {reason}\n\n"
    "Javob berish uchun shu xabarga reply qiling - bot javobingizni yuboradi."
)
RELAY_UNKNOWN = "Bu xabar kimga tegishli ekanini topa olmadim. Javobni to‘g‘ridan-to‘g‘ri yuboring."

MEMORY_USAGE = "Masalan: /eslab_qol Menejerlar «140 lik stol» deganda Optima stolini (WS-102) nazarda tutadi"
MEMORY_SAVED = "🧠 Eslab qoldim. Endi har bir javobda hisobga olaman. Ro‘yxat: /xotira"
MEMORY_EMPTY = "Telefondan qo‘shilgan fakt yo‘q. Qo‘shish: /eslab_qol fakt"
MEMORY_LIST = "🧠 Telefondan qo‘shilgan faktlar (o‘chirish: /unut raqam):"
FORGET_USAGE = "Masalan: /unut 2 (raqamlar /xotira ro‘yxatida)"
FORGOTTEN = "O‘chirildi: {text}"
JOBS_LIST = "⏰ Jadvaldagi ishlar (har ish kuni):"
JOBS_EMPTY = "Hozircha yo‘q. Qo‘shish: /jadval 09:00 savol"
JOB_USAGE = "Masalan: /jadval 09:00 Ombordan 15 donadan kam qolgan mahsulotlar ro‘yxatini yubor"
JOB_ADDED = "✅ Har ish kuni soat {time} da javob yuboraman: «{prompt}». Ro‘yxat: /jadval"
JOB_REMOVE_USAGE = "Masalan: /jadval_ochir 1 (raqamlar /jadval ro‘yxatida)"
JOB_REMOVED = "O‘chirildi: «{prompt}»"
REMIND_USAGE = "Masalan: /eslat 15:00 Jamshid aka bilan tender bo‘yicha gaplashish"
REMIND_SET = "🔔 Eslataman: {day} soat {time} da."
REMINDER = "🔔 Eslatma: {text}"

UPLOAD_UNKNOWN = (
    "Bu faylni qayerga qo‘yishni bilmayman: «{name}».\n"
    "Fayl nomi ma’lumot manbalaridan biriga teng bo‘lsin: {names}"
)
UPLOAD_TOO_BIG = "Fayl juda katta (20 MB dan ortiq). Eksportni kichikroq qiling yoki deploy.py data dan foydalaning."
UPLOAD_REJECTED = "❌ «{source}» yangilanmadi: faylda xato bor. Eski ma’lumot ishlashda davom etadi.\n{details}"
UPLOAD_OK = "✅ «{source}» yangilandi: {size}. Keyingi savoldan boshlab yangi ma’lumot ishlatiladi."

REASON_BUDGET = "model xarajati limiti tugadi"
REASON_ERROR = "texnik xato: {error}"
REASON_DEFAULT = "yordamchi aniq javob topmadi"

# ------------------------------------------------------------ owner / admin

STOPPED = "⏸ Yordamchi to‘xtatildi. Xodimlarga «vaqtincha to‘xtatilgan» deb javob beradi.\nQayta yoqish: /davom"
RESUMED = "▶️ Yordamchi yana ishlayapti."
ADMIN_ONLY = "Bu buyruq faqat rahbar uchun."
ALLOW_USAGE = "Masalan: /ruxsat 123456789 Dilnoza"
ALLOWED = "✅ {id} ({name}) endi botdan foydalana oladi."
REMOVED = "🚫 {id} endi botdan foydalana olmaydi."
REMOVE_USAGE = "Masalan: /taqiq 123456789"
NO_ERRORS = "Bu davrda xato deb belgilangan javob yo‘q."
MODE_LABELS = {"direct": "darhol javob beradi", "approve": "javobni odam tasdiqlaydi",
               "topics": "mavzuga qarab (ba’zi javoblarni odam tasdiqlaydi)"}
APPROVAL_TOPICS = "mavzuga qarab - darhol: {direct}; tasdiqqa: {rest} va mavzusi aniqlanmagan javoblar"
APPROVAL_NOW = ("✅ Javob rejimi: {mode}.\n"
                "O‘zgartirish: /darhol narx qoldiq (faqat shu mavzular darhol), /darhol hammasi, /darhol yo‘q, "
                "/darhol standart (.env va agent/approval.toml dagisi)")
APPROVAL_USAGE = ("Masalan: /darhol narx qoldiq. Mavzular (agent/approval.toml): {topics}. "
                  "Yoki: /darhol hammasi, /darhol yo‘q, /darhol standart")
STARTED = "🟢 «{agent}» ishga tushdi.\nModel: {model}.\nRejim: {mode}."
SAMPLE_ALERT = (
    "⚠️ Bot hali Baraka Office namunasi bilan ishlayapti: {files}.\n"
    "Bu fayllarni o‘zingiznikiga almashtiring (qo‘llanma, 1.3-qadam)."
)
BUDGET_ALERT = (
    "⚠️ Model xarajati limiti tugadi: {which} ${spent:.2f} / ${cap:.2f}.\n"
    "Savollar xodimga uzatilyapti. Limitni .env faylida o‘zgartirish mumkin."
)
BUDGET_WARN = "⚠️ Oylik limitning {pct}% ishlatildi (${spent:.2f} / ${cap:.2f})."
DATA_ALERT = "⚠️ Ma’lumot manbasi muammosi: {detail}"
CONFLICT_ALERT = (
    "⚠️ Shu bot tokeni bilan boshqa dastur ham ishlayapti (409 Conflict).\n"
    "Bitta token faqat bitta joyda ishlaydi: noutbukdagi botni to‘xtating."
)
SPEND = (
    "💵 Xarajat (model, OpenRouter)\n"
    "Bugun: ${today:.2f} / limit ${daily:.2f}\n"
    "Shu oy: ${month:.2f} / limit ${monthly:.2f}"
)
SPEND_KEY = "\nOpenRouter kaliti: shu oy ${usage_monthly:.2f}, qolgan limit {remaining}."

STATUS = (
    "ℹ️ Holat\n"
    "Yordamchi: {agent} ({state})\n"
    "Model: {model} ({tier})\n"
    "Javob rejimi: {mode}\n"
    "Kirish: {access}\n"
    "Ma’lumotlar:\n{sources}"
)

# ------------------------------------------------------------ reports (owner only)

DAILY_REPORT = (
    "📊 Kunlik hisobot: {day}\n"
    "«{agent}»\n\n"
    "• So‘rovlar: {requests}\n"
    "• Javob berildi: {answered}\n"
    "• Odamga uzatildi: {escalated}\n"
    "• Xato deb belgilandi: {wrong}\n"
    "• To‘liq hal qilindi: {resolved}\n"
    "• Texnik xatolar: {errors}\n"
    "• Xarajat: ${cost:.2f} (shu oy ${month_cost:.2f} / limit ${monthly_cap:.2f})"
)
JOB_FAILED = "⏰ {name}: bu safar javob tayyorlab bo‘lmadi ({reason}). Ma’lumot fayllarini tekshiring: /holat"
WEEKLY_CAPTION = "📈 Haftalik raqamlar: {start} - {end}. Faylni 5-to‘plam B shakliga ko‘chiring."
REPORT_NOTES = "\n\nDiqqat:\n{notes}"
NOTE_PAUSED = "• Yordamchi hozir to‘xtatilgan (/davom)."
NOTE_BUDGET = "• Oylik limitning {pct}% ishlatildi."
NOTE_ERRORS = "• Texnik xatolar bor: jurnalni ko‘ring."
NOTE_DATA = "• {detail}"
NOTE_WRONG = "• Xato javoblar ro‘yxati: /xatolar"
NOTE_SEND_FAILED = "• {n} ta xabar internet uzilgani sababli yetib bormadi (3 marta urinildi): logni ko‘ring"
