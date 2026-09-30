/* =========================================================
   CappaViva — WhatsApp özel asistan penceresi
   Yeşil, yanıp sönen gerçek WhatsApp düğmesi. Birkaç saniye sonra
   kendiliğinden açılır (bilgisayarda, oturum başına 1 kez).
   ========================================================= */
(function () {
  const OPEN_AFTER = 6000; /* kaç milisaniye sonra kendiliğinden açılsın (6000 = 6 saniye) */

  const TX = {
    tr: { title: 'Özel Asistanınız', sub: 'WhatsApp\'tan hemen yardımcı olalım', hi: 'Merhaba! Ben CappaViva özel asistanınız. Kapadokya planınız için size nasıl yardımcı olabilirim?', q: ['Balon uçuşu fiyatları nedir?', 'Belirli bir tarih için yer var mı?', 'Otelden alıyor musunuz?', 'Özel tur veya rehber istiyorum'], cta: 'Tıkla, WhatsApp\'tan iletişime geç', hello: 'Merhaba CappaViva, bilgi almak istiyorum.', book: 'Rezervasyon formu', teaser: 'Sorunuz mu var? Bize yazın.' },
    en: { title: 'Your Personal Assistant', sub: 'Let us help you on WhatsApp', hi: 'Hello! I\'m your CappaViva personal assistant. How can I help with your Cappadocia plans?', q: ['How much is a balloon flight?', 'Is there space on a specific date?', 'Do you pick up from hotels?', 'I\'d like a private tour or guide'], cta: 'Tap to chat with us on WhatsApp', hello: 'Hello CappaViva, I\'d like some information.', book: 'Booking form', teaser: 'Any questions? Write to us.' },
    de: { title: 'Ihr persönlicher Assistent', sub: 'Wir helfen Ihnen per WhatsApp', hi: 'Hallo! Ich bin Ihr persönlicher CappaViva-Assistent. Wie kann ich bei Ihrer Kappadokien-Reise helfen?', q: ['Was kostet eine Ballonfahrt?', 'Gibt es an einem bestimmten Datum Plätze?', 'Holen Sie vom Hotel ab?', 'Ich möchte eine Privattour oder einen Guide'], cta: 'Jetzt per WhatsApp schreiben', hello: 'Hallo CappaViva, ich hätte gern Informationen.', book: 'Buchungsformular', teaser: 'Fragen? Schreiben Sie uns.' },
    fr: { title: 'Votre assistant personnel', sub: 'Nous vous aidons sur WhatsApp', hi: 'Bonjour ! Je suis votre assistant personnel CappaViva. Comment puis-je vous aider pour votre voyage en Cappadoce ?', q: ['Quel est le prix d\'un vol en montgolfière ?', 'Reste-t-il de la place à une date précise ?', 'Venez-vous nous chercher à l\'hôtel ?', 'Je souhaite une visite ou un guide privé'], cta: 'Discuter avec nous sur WhatsApp', hello: 'Bonjour CappaViva, je souhaite des informations.', book: 'Formulaire de réservation', teaser: 'Une question ? Écrivez-nous.' },
    es: { title: 'Tu asistente personal', sub: 'Te ayudamos por WhatsApp', hi: '¡Hola! Soy tu asistente personal de CappaViva. ¿Cómo puedo ayudarte con tu viaje a Capadocia?', q: ['¿Cuánto cuesta el vuelo en globo?', '¿Hay plazas para una fecha concreta?', '¿Recogen en el hotel?', 'Quiero un tour o guía privado'], cta: 'Escríbenos por WhatsApp', hello: 'Hola CappaViva, quiero información.', book: 'Formulario de reserva', teaser: '¿Tienes dudas? Escríbenos.' },
    it: { title: 'Il tuo assistente personale', sub: 'Ti aiutiamo su WhatsApp', hi: 'Ciao! Sono il tuo assistente personale CappaViva. Come posso aiutarti con il viaggio in Cappadocia?', q: ['Quanto costa il volo in mongolfiera?', 'C\'è posto in una data precisa?', 'Venite a prendermi in hotel?', 'Vorrei un tour o una guida privata'], cta: 'Scrivici su WhatsApp', hello: 'Ciao CappaViva, vorrei alcune informazioni.', book: 'Modulo di prenotazione', teaser: 'Domande? Scrivici.' },
    pt: { title: 'Seu assistente pessoal', sub: 'Ajudamos você pelo WhatsApp', hi: 'Olá! Sou seu assistente pessoal da CappaViva. Como posso ajudar na sua viagem à Capadócia?', q: ['Quanto custa o voo de balão?', 'Tem vaga para uma data específica?', 'Vocês buscam no hotel?', 'Quero um passeio ou guia particular'], cta: 'Fale conosco pelo WhatsApp', hello: 'Olá CappaViva, gostaria de informações.', book: 'Formulário de reserva', teaser: 'Dúvidas? Fale conosco.' },
    ru: { title: 'Ваш личный помощник', sub: 'Поможем в WhatsApp', hi: 'Здравствуйте! Я ваш личный помощник CappaViva. Чем помочь с поездкой в Каппадокию?', q: ['Сколько стоит полёт на шаре?', 'Есть ли места на определённую дату?', 'Вы забираете из отеля?', 'Хочу индивидуальный тур или гида'], cta: 'Написать нам в WhatsApp', hello: 'Здравствуйте, CappaViva! Хочу узнать подробности.', book: 'Форма бронирования', teaser: 'Есть вопросы? Напишите нам.' },
    ar: { title: 'مساعدك الشخصي', sub: 'نساعدك عبر واتساب', hi: 'مرحبًا! أنا مساعدك الشخصي من CappaViva. كيف يمكنني مساعدتك في رحلتك إلى كابادوكيا؟', q: ['كم سعر رحلة المنطاد؟', 'هل توجد أماكن في تاريخ معيّن؟', 'هل تقلّوننا من الفندق؟', 'أريد جولة خاصة أو مرشدًا'], cta: 'اضغط وتواصل معنا عبر واتساب', hello: 'مرحبًا CappaViva، أرغب في الاستفسار.', book: 'نموذج الحجز', teaser: 'لديك سؤال؟ راسلنا.' },
    fa: { title: 'دستیار شخصی شما', sub: 'در واتساپ کمکتان می‌کنیم', hi: 'سلام! من دستیار شخصی CappaViva هستم. برای سفر به کاپادوکیه چطور می‌توانم کمک کنم؟', q: ['قیمت پرواز با بالن چقدر است؟', 'برای تاریخ مشخصی جا دارید؟', 'از هتل سوارمان می‌کنید؟', 'تور یا راهنمای خصوصی می‌خواهم'], cta: 'کلیک کنید و در واتساپ پیام دهید', hello: 'سلام CappaViva، می‌خواهم اطلاعات بگیرم.', book: 'فرم رزرو', teaser: 'سؤالی دارید؟ به ما پیام دهید.' },
    zh: { title: '您的专属助理', sub: '通过WhatsApp为您服务', hi: '您好！我是CappaViva专属助理。请问卡帕多奇亚之旅有什么可以帮您？', q: ['热气球飞行多少钱？', '某个日期还有名额吗？', '可以酒店接送吗？', '我想要私人行程或向导'], cta: '点击通过WhatsApp联系我们', hello: '您好CappaViva，我想咨询一下。', book: '预订表单', teaser: '有问题吗？联系我们。' },
    ja: { title: '専属アシスタント', sub: 'WhatsAppでサポートします', hi: 'こんにちは！CappaVivaの専属アシスタントです。カッパドキア旅行について何でもご相談ください。', q: ['気球の料金はいくらですか？', '特定の日に空きはありますか？', 'ホテル送迎はありますか？', '貸切ツアーやガイドを希望します'], cta: 'タップしてWhatsAppで相談', hello: 'こんにちはCappaViva、問い合わせをしたいです。', book: '予約フォーム', teaser: 'ご質問はお気軽に。' },
    ko: { title: '전용 어시스턴트', sub: 'WhatsApp으로 도와드려요', hi: '안녕하세요! CappaViva 전용 어시스턴트입니다. 카파도키아 여행, 무엇을 도와드릴까요?', q: ['열기구 가격은 얼마인가요?', '특정 날짜에 자리가 있나요?', '호텔 픽업이 되나요?', '프라이빗 투어나 가이드를 원해요'], cta: '눌러서 WhatsApp으로 문의하기', hello: '안녕하세요 CappaViva, 문의드리고 싶어요.', book: '예약 양식', teaser: '궁금한 점이 있나요? 문의하세요.' }
  };

  const G = '#25d366';
  const CSS = `
  .waf{position:fixed;inset-inline-end:22px;bottom:calc(22px + env(safe-area-inset-bottom,0px));z-index:75;width:64px;height:64px;border-radius:50%;border:0;cursor:pointer;background:${G};color:#fff;display:grid;place-items:center;box-shadow:0 14px 34px -10px rgba(37,211,102,.9),0 4px 12px rgba(0,0,0,.15);animation:wafBeat 1.6s ease-in-out infinite;isolation:isolate;transition:transform .3s}
  .waf::before,.waf::after{content:"";position:absolute;inset:0;border-radius:50%;background:${G};z-index:-1;animation:wafRing 1.8s ease-out infinite}
  .waf::after{animation-delay:.9s}
  .waf svg{width:32px;height:32px}
  .waf .x{display:none;font-size:26px;line-height:1}
  .waf.open{animation:none}.waf.open::before,.waf.open::after{animation:none;opacity:0}
  .waf.open svg{display:none}.waf.open .x{display:block}
  .waf .dot{position:absolute;top:2px;right:2px;width:18px;height:18px;border-radius:50%;background:#ff3b30;color:#fff;font:800 11px/18px Manrope,system-ui,sans-serif;text-align:center;box-shadow:0 0 0 2px #fff}
  .waf.open .dot,.waf.seen .dot{display:none}
  @keyframes wafRing{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.9);opacity:0}}
  @keyframes wafBeat{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
  .waf-tip{position:fixed;inset-inline-end:98px;bottom:calc(38px + env(safe-area-inset-bottom,0px));z-index:75;background:#fff;color:#1c1916;font:600 14px/1.3 Manrope,system-ui,sans-serif;padding:10px 14px;border-radius:14px;box-shadow:0 12px 30px -10px rgba(0,0,0,.3);max-width:220px;opacity:0;transform:translateY(8px);transition:.4s cubic-bezier(.22,.8,.2,1);pointer-events:none}
  .waf-tip.show{opacity:1;transform:none;pointer-events:auto;cursor:pointer}
  .waw{position:fixed;inset-inline-end:22px;bottom:calc(100px + env(safe-area-inset-bottom,0px));z-index:76;width:min(370px,calc(100vw - 32px));background:#efeae2;color:#1c1916;border-radius:26px;overflow:hidden;box-shadow:0 40px 90px -20px rgba(0,0,0,.5);font-family:Manrope,system-ui,sans-serif;transform-origin:bottom right;transform:scale(.85) translateY(20px);opacity:0;pointer-events:none;transition:transform .45s cubic-bezier(.22,.8,.2,1),opacity .3s}
  [dir=rtl] .waw{transform-origin:bottom left}
  .waw.open{transform:none;opacity:1;pointer-events:auto}
  .waw-head{position:relative;display:flex;align-items:center;gap:12px;padding:18px 16px 16px;background:linear-gradient(135deg,#075e54,#128c7e);color:#fff;overflow:hidden}
  .waw-head::after{content:"";position:absolute;right:-40px;top:-60px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.18),transparent 65%)}
  .waw-av{width:46px;height:46px;border-radius:50%;background:#fff;color:${G};display:grid;place-items:center;flex:none;position:relative}
  .waw-av svg{width:26px;height:26px}
  .waw-av::after{content:"";position:absolute;right:0;bottom:1px;width:12px;height:12px;border-radius:50%;background:${G};border:2px solid #fff}
  .waw-head b{display:block;font-size:16.5px;letter-spacing:-.01em}
  .waw-head small{font-size:12.5px;opacity:.85}
  .waw-x{position:relative;z-index:1;margin-inline-start:auto;width:32px;height:32px;border-radius:50%;border:0;background:rgba(255,255,255,.18);color:#fff;font-size:18px;cursor:pointer}
  .waw-body{padding:16px;display:grid;gap:10px;max-height:min(380px,52vh);overflow:auto;background:#efeae2 radial-gradient(rgba(0,0,0,.035) 1px,transparent 1px) 0 0/14px 14px}
  .waw-typing{display:inline-flex;gap:5px;padding:13px 16px;background:#fff;border-radius:18px 18px 18px 6px;width:max-content}
  .waw-typing i{width:7px;height:7px;border-radius:50%;background:#9aa3a8;animation:wawDot 1.1s infinite}
  .waw-typing i:nth-child(2){animation-delay:.15s}.waw-typing i:nth-child(3){animation-delay:.3s}
  @keyframes wawDot{0%,60%,100%{transform:none;opacity:.4}30%{transform:translateY(-4px);opacity:1}}
  .waw-msg{background:#fff;border-radius:18px 18px 18px 6px;padding:12px 14px;font-size:14.5px;font-weight:500;line-height:1.45;box-shadow:0 1px 1px rgba(0,0,0,.08);animation:wawIn .45s cubic-bezier(.22,.8,.2,1) both}
  .waw-msg small{display:block;text-align:end;font-size:11px;color:#8a9297;margin-top:4px}
  [dir=rtl] .waw-msg{border-radius:18px 18px 6px 18px}
  .waw-q{display:grid;gap:8px}
  .waw-q button{text-align:start;border:0;cursor:pointer;background:#fff;box-shadow:inset 0 0 0 1.5px #d6e9dd;border-radius:14px;padding:11px 13px;font-family:inherit;font-size:14px;font-weight:700;line-height:1.3;color:#075e54;display:flex;justify-content:space-between;gap:10px;align-items:center;animation:wawIn .45s cubic-bezier(.22,.8,.2,1) both;transition:background .2s,box-shadow .2s,transform .2s}
  .waw-q button::after{content:"›";font-size:18px;opacity:.6}
  [dir=rtl] .waw-q button::after{content:"‹"}
  .waw-q button:hover{background:#f3fbf6;box-shadow:inset 0 0 0 1.5px ${G};transform:translateX(2px)}
  @keyframes wawIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .waw-foot{padding:14px 16px 16px;background:#fff;display:grid;gap:10px}
  .waw-cta{display:flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:10px 18px;text-align:center;line-height:1.25;border-radius:999px;border:0;cursor:pointer;background:${G};color:#fff;font:800 14.5px Manrope,system-ui,sans-serif;box-shadow:0 12px 26px -12px rgba(37,211,102,.9);position:relative;overflow:hidden;transition:transform .25s}
  .waw-cta:hover{transform:translateY(-1px)}
  .waw-cta::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.35) 50%,transparent 70%);transform:translateX(-120%);animation:wawShine 2.8s ease-in-out infinite}
  @keyframes wawShine{60%,100%{transform:translateX(120%)}}
  .waw-cta svg{width:22px;height:22px;flex:none;position:relative;z-index:1}
  .waw-cta span{position:relative;z-index:1}
  .waw-book{font-size:13px;font-weight:700;color:#a5561f;text-decoration:none;text-align:center}
  body.drawer-open .waf,body.drawer-open .waw,body.drawer-open .waf-tip{opacity:0;pointer-events:none}
  @media (max-width:560px){.waf{width:60px;height:60px;inset-inline-end:16px}.waw{inset-inline-end:16px;bottom:calc(90px + env(safe-area-inset-bottom,0px))}.waf-tip{inset-inline-end:86px}}
  `;

  const WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.5.1-.6.8-.8.9-.3.2-.5 0a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2 4.7 4.7 0 0 0 1 2.5 10.7 10.7 0 0 0 4.1 3.6c1.5.7 2.1.7 2.9.6a2.4 2.4 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z"/></svg>';

  const style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
  const btn = document.createElement('button'); btn.className = 'waf'; btn.type = 'button'; btn.setAttribute('aria-label', 'WhatsApp'); btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = WA + '<span class="x" aria-hidden="true">×</span><span class="dot">1</span>';
  const tip = document.createElement('div'); tip.className = 'waf-tip';
  const box = document.createElement('div'); box.className = 'waw'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'WhatsApp');
  document.body.append(box, tip, btn);

  const store = { get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };
  const L = () => TX[(window.CVI18N && CVI18N.lang) || 'en'] || TX.en;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const now = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
  let typed = false, typeT;

  function render() {
    const x = L();
    tip.textContent = x.teaser;
    box.innerHTML = `
      <div class="waw-head"><span class="waw-av">${WA}</span><div><b>CappaViva · ${esc(x.title)}</b><small>${esc(x.sub)}</small></div><button class="waw-x" type="button" aria-label="×">×</button></div>
      <div class="waw-body" id="wawBody"></div>
      <div class="waw-foot"><button class="waw-cta" type="button">${WA}<span>${esc(x.cta)}</span></button><a class="waw-book" href="#rezervasyon" data-book="">${esc(x.book)} →</a></div>`;
    fillBody(typed);
  }

  function fillBody(instant) {
    const x = L(), body = box.querySelector('#wawBody');
    const full = () => {
      body.innerHTML = `<div class="waw-msg">${esc(x.hi)}<small>${now()}</small></div><div class="waw-q">${x.q.map((q, i) => `<button type="button" style="animation-delay:${.08 + i * .08}s">${esc(q)}</button>`).join('')}</div>`;
    };
    clearTimeout(typeT);
    if (instant) return full();
    body.innerHTML = '<div class="waw-typing"><i></i><i></i><i></i></div>';
    typeT = setTimeout(() => { typed = true; full(); }, 1200);
  }

  function sendToWhatsApp(text) {
    const lang = ((window.CVI18N && CVI18N.lang) || 'en').toUpperCase();
    const url = 'https://wa.me/' + (window.CV ? CV.phone : '905354322782') + '?text=' + encodeURIComponent(text + '\n[' + lang + ']');
    const w = window.open(url, '_blank', 'noopener');
    if (!w) location.href = url;
  }

  function setOpen(o) {
    box.classList.toggle('open', o); btn.classList.toggle('open', o); btn.setAttribute('aria-expanded', o);
    tip.classList.remove('show');
    if (o) { btn.classList.add('seen'); store.set('cv_waw', '1'); if (!typed) fillBody(false); }
  }

  btn.addEventListener('click', () => setOpen(!box.classList.contains('open')));
  tip.addEventListener('click', () => setOpen(true));
  box.addEventListener('click', e => {
    if (e.target.closest('.waw-x')) return setOpen(false);
    if (e.target.closest('.waw-book')) return setOpen(false);
    if (e.target.closest('.waw-cta')) return sendToWhatsApp(L().hello);
    const q = e.target.closest('.waw-q button'); if (q) sendToWhatsApp(q.textContent);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  document.addEventListener('cv:lang', render);

  render();

  /* Kendiliğinden açılma: bilgisayarda pencere açılır, telefonda küçük balon çıkar (oturum başına 1 kez) */
  if (!store.get('cv_waw')) {
    setTimeout(() => {
      if (box.classList.contains('open') || document.body.classList.contains('drawer-open') || document.body.classList.contains('bview-on')) return;
      if (matchMedia('(min-width:700px)').matches) setOpen(true);
      else { tip.classList.add('show'); setTimeout(() => tip.classList.remove('show'), 9000); }
    }, OPEN_AFTER);
  }
})();