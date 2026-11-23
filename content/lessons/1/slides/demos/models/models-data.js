/* Dated model sheet data for Day 1 ("Bu hafta AI’da"). Single source for demos/models and demos/side-by-side.
   Prices: USD per 1 million tokens, input / output. Checked 2026-11-03; every row is cited in day-1/sources.md.
   Re-check in the week before each session: prices and names change monthly. */
window.MODELS_DATA = {
  checked: '2026-11-03',
  validFor: '1-dars: 21-noyabr (shanba) / 22-noyabr (yakshanba) 2026',
  groups: [
    {
      id: 'anthropic', maker: 'Anthropic', name: 'Claude', kind: 'frontier', source: 'platform.claude.com/docs/en/about-claude/pricing',
      models: [
        { id: 'claude-haiku-5-5', name: 'Claude Haiku 5.5', tier: 'arzon', in: 0.10, out: 0.50, note: '100 ming tokendan uzun so‘rovda 5 barobar qimmat' },
        { id: 'claude-sonnet-5-5', name: 'Claude Sonnet 5.5', tier: 'muvozanatli', in: 2, out: 10, note: '' },
        { id: 'claude-opus-5-5', name: 'Claude Opus 5.5', tier: 'kuchli', in: 4, out: 20, note: 'Anthropic tavsiya qiladigan asosiy model' },
        { id: 'claude-fable-5-1', name: 'Claude Fable 5.1', tier: 'eng kuchli', in: 10, out: 50, note: '' }
      ]
    },
    {
      id: 'openai', maker: 'OpenAI', name: 'GPT', kind: 'frontier', source: 'developers.openai.com/api/docs/pricing',
      models: [
        { id: 'gpt-6-luna', name: 'GPT-6 Luna', tier: 'arzon', in: 0.10, out: 0.50, note: '' },
        { id: 'gpt-6.1-terra', name: 'GPT-6.1 Terra', tier: 'tez', in: 1, out: 5, note: '' },
        { id: 'gpt-6.1-sol', name: 'GPT-6.1 Sol', tier: 'muvozanatli', in: 2, out: 10, note: '272 ming tokendan uzun so‘rovda qimmatroq' },
        { id: 'gpt-6-astra', name: 'GPT-6 Astra', tier: 'kuchli', in: 10, out: 50, note: '' }
      ]
    },
    {
      id: 'google', maker: 'Google', name: 'Gemini', kind: 'frontier', source: 'aistudio.google.com/docs/pricing',
      models: [
        { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash-Lite', tier: 'arzon', in: 0.30, out: 2.50, note: 'Bepul tarif bor' },
        { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', tier: 'muvozanatli', in: 0.75, out: 3.75, note: '31-dekabrgacha aksiya; 1-yanvardan $1,50 / $7,50' },
        { id: 'gemini-4-argon', name: 'Gemini 4 Argon', tier: 'kuchli', in: 2, out: 10, note: '30-noyabrgacha; 1-dekabrdan $4 / $20' }
      ]
    },
    {
      id: 'open', maker: 'Ochiq vaznli', name: 'Open-weight', kind: 'open', source: 'openrouter.ai/models, huggingface.co',
      models: [
        { id: 'deepseek-v4.1-flash', name: 'DeepSeek V4.1 Flash', tier: 'arzon', in: 0.15, out: 0.60, note: 'DeepSeek, MIT litsenziya' },
        { id: 'deepseek-v4-pro', name: 'DeepSeek V4 Pro', tier: 'kuchli', in: 0.66, out: 1.98, note: 'DeepSeek, MIT litsenziya' },
        { id: 'qwen3.8-27b', name: 'Qwen3.8-27B', tier: 'kichik', in: 0.425, out: 2.55, note: 'Alibaba, Apache 2.0' },
        { id: 'qwen3.8', name: 'Qwen3.8', tier: 'kuchli', in: 2, out: 6, note: 'Alibaba, maxsus litsenziya' },
        { id: 'glm-5.3', name: 'GLM-5.3', tier: 'kuchli', in: 1.40, out: 4.40, note: 'Z.ai, maxsus litsenziya' },
        { id: 'kimi-k3', name: 'Kimi K3', tier: 'kuchli', in: 3, out: 15, note: 'Moonshot, o‘zgartirilgan MIT' }
      ]
    }
  ],
  plans: [
    { name: 'Claude Free', price: '$0', note: 'Artefakt yasash mumkin, havola bilan ulashib bo‘lmaydi' },
    { name: 'Claude Pro', price: '$20 / oy', note: 'Kursning minimal tarifi; 12% QQS bilan taxminan 270 000 so‘m' },
    { name: 'Claude Max', price: '$100 / oy', note: 'Ko‘proq foydalanish limiti' },
    { name: 'Claude Ultra', price: '$200 / oy', note: 'Eng katta limit' }
  ],
  notes: [
    'Claude tariflari 2026-yil 30-oktabrda qayta nomlandi. O‘zbekistonda narxga 12% QQS qo‘shiladi; saytda to‘lang, App Store’da qimmatroq.',
    'OpenRouter narxni ishlab chiqaruvchi narxida oladi; kredit sotib olishda 5,5% to‘lov bor.',
    'Ochiq vaznli model narxi provayderga qarab farq qiladi; jadvalda ishlab chiqaruvchining o‘z narxi.',
    'DeepSeek chati ma’lumotni Xitoyda, Qwen Chat Singapurda saqlaydi.'
  ]
};
