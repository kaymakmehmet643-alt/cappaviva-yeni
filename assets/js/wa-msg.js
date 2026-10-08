/* =========================================================
   CappaViva — PREMIUM WHATSAPP MESAJLARI (wa-msg.js)
   Sitedeki bütün WhatsApp mesajlarını şık, simgeli ve düzenli
   hale getirir: rezervasyon, plan asistanı, sorular, sayfalar.
   Yazıları değiştirmek için aşağıdaki T sözlüğünü düzenleyin.
   ========================================================= */
(function () {
  const T = {
    tr: { hi: 'Merhaba CappaViva 👋', ask: '*{s}* hakkında bilgi almak istiyorum.', help: 'Kapadokya seyahatim için yardımcı olabilir misiniz?', bookIn: 'Rezervasyon talebimi iletiyorum:', bookOut: 'Uygunluğu teyit edebilir misiniz? Teşekkürler 🙏', planIn: 'Plan asistanında oluşturduğum plan:', planOut: 'Bu planı benim için ayarlayabilir misiniz? 🙏', thanks: 'Şimdiden teşekkürler 🙏', lang: 'Dil' },
    en: { hi: 'Hello CappaViva 👋', ask: 'I\'d like some information about *{s}*.', help: 'Could you help me plan my Cappadocia trip?', bookIn: 'Here is my booking request:', bookOut: 'Could you confirm availability? Thank you 🙏', planIn: 'Here is the plan I created with your planner:', planOut: 'Could you arrange this plan for me? 🙏', thanks: 'Thanks in advance 🙏', lang: 'Language' },
    de: { hi: 'Hallo CappaViva 👋', ask: 'Ich hätte gern Informationen zu *{s}*.', help: 'Können Sie mir bei meiner Kappadokien-Reise helfen?', bookIn: 'Hier ist meine Buchungsanfrage:', bookOut: 'Können Sie die Verfügbarkeit bestätigen? Danke 🙏', planIn: 'Hier ist der Plan, den ich erstellt habe:', planOut: 'Können Sie diesen Plan für mich organisieren? 🙏', thanks: 'Vielen Dank im Voraus 🙏', lang: 'Sprache' },
    fr: { hi: 'Bonjour CappaViva 👋', ask: 'J\'aimerais des informations sur *{s}*.', help: 'Pouvez-vous m\'aider à organiser mon voyage en Cappadoce ?', bookIn: 'Voici ma demande de réservation :', bookOut: 'Pouvez-vous confirmer la disponibilité ? Merci 🙏', planIn: 'Voici le programme que j\'ai créé :', planOut: 'Pouvez-vous organiser ce programme pour moi ? 🙏', thanks: 'Merci d\'avance 🙏', lang: 'Langue' },
    es: { hi: 'Hola CappaViva 👋', ask: 'Me gustaría información sobre *{s}*.', help: '¿Pueden ayudarme a planificar mi viaje a Capadocia?', bookIn: 'Esta es mi solicitud de reserva:', bookOut: '¿Pueden confirmar la disponibilidad? Gracias 🙏', planIn: 'Este es el plan que creé:', planOut: '¿Pueden organizar este plan para mí? 🙏', thanks: 'Gracias de antemano 🙏', lang: 'Idioma' },
    it: { hi: 'Ciao CappaViva 👋', ask: 'Vorrei informazioni su *{s}*.', help: 'Potete aiutarmi a organizzare il mio viaggio in Cappadocia?', bookIn: 'Ecco la mia richiesta di prenotazione:', bookOut: 'Potete confermare la disponibilità? Grazie 🙏', planIn: 'Ecco il programma che ho creato:', planOut: 'Potete organizzare questo programma per me? 🙏', thanks: 'Grazie in anticipo 🙏', lang: 'Lingua' },
    pt: { hi: 'Olá CappaViva 👋', ask: 'Gostaria de informações sobre *{s}*.', help: 'Podem me ajudar a planejar minha viagem à Capadócia?', bookIn: 'Este é o meu pedido de reserva:', bookOut: 'Podem confirmar a disponibilidade? Obrigado 🙏', planIn: 'Este é o roteiro que criei:', planOut: 'Podem organizar este roteiro para mim? 🙏', thanks: 'Desde já, obrigado 🙏', lang: 'Idioma' },
    ru: { hi: 'Здравствуйте, CappaViva 👋', ask: 'Хочу узнать подробнее: *{s}*.', help: 'Поможете спланировать поездку в Каппадокию?', bookIn: 'Моя заявка на бронирование:', bookOut: 'Подтвердите, пожалуйста, наличие мест. Спасибо 🙏', planIn: 'Программа, которую я составил(а):', planOut: 'Сможете организовать эту программу для меня? 🙏', thanks: 'Заранее спасибо 🙏', lang: 'Язык' },
    ar: { hi: 'مرحبًا CappaViva 👋', ask: 'أرغب في معلومات عن *{s}*.', help: 'هل يمكنكم مساعدتي في تخطيط رحلتي إلى كابادوكيا؟', bookIn: 'هذا طلب الحجز الخاص بي:', bookOut: 'هل يمكنكم تأكيد التوفر؟ شكرًا 🙏', planIn: 'هذا البرنامج الذي صمّمته:', planOut: 'هل يمكنكم ترتيب هذا البرنامج لي؟ 🙏', thanks: 'شكرًا مقدمًا 🙏', lang: 'اللغة' },
    fa: { hi: 'سلام CappaViva 👋', ask: 'درباره *{s}* اطلاعات می‌خواهم.', help: 'می‌توانید در برنامه‌ریزی سفرم به کاپادوکیه کمک کنید؟', bookIn: 'درخواست رزرو من:', bookOut: 'لطفاً ظرفیت را تأیید کنید. ممنون 🙏', planIn: 'برنامه‌ای که ساختم:', planOut: 'می‌توانید این برنامه را برایم هماهنگ کنید؟ 🙏', thanks: 'پیشاپیش ممنون 🙏', lang: 'زبان' },
    zh: { hi: '您好 CappaViva 👋', ask: '我想了解 *{s}* 的信息。', help: '可以帮我规划卡帕多奇亚之旅吗？', bookIn: '这是我的预订申请：', bookOut: '请帮我确认是否有空位，谢谢 🙏', planIn: '这是我用行程助手制定的计划：', planOut: '可以帮我安排这个行程吗？🙏', thanks: '提前感谢 🙏', lang: '语言' },
    ja: { hi: 'こんにちは CappaViva 👋', ask: '*{s}* について教えてください。', help: 'カッパドキア旅行の計画を手伝っていただけますか？', bookIn: '予約リクエストです：', bookOut: '空き状況をご確認いただけますか？よろしくお願いします 🙏', planIn: 'プランナーで作成したプランです：', planOut: 'このプランの手配をお願いできますか？🙏', thanks: 'よろしくお願いします 🙏', lang: '言語' },
    ko: { hi: '안녕하세요 CappaViva 👋', ask: '*{s}*에 대해 알고 싶어요.', help: '카파도키아 여행 계획을 도와주실 수 있나요?', bookIn: '예약 요청드립니다:', bookOut: '예약 가능 여부를 확인해 주시겠어요? 감사합니다 🙏', planIn: '플래너로 만든 일정입니다:', planOut: '이 일정으로 준비해 주실 수 있나요? 🙏', thanks: '미리 감사드립니다 🙏', lang: '언어' }
  };
  const lang = () => (window.CVI18N && CVI18N.lang) || 'en';
  const m = (k, v) => { let s = (T[lang()] || T.en)[k] ?? T.en[k]; if (v) s = s.replace(/\{(\w+)\}/g, (x, y) => v[y] ?? x); return s; };
  const t = k => (window.CVI18N ? CVI18N.t(k) : k);
  const sign = () => `🌐 ${m('lang')}: ${lang().toUpperCase()}`;
  const CAT = { balloon: '🎈', daily: '🗺️', adv: '🚙', culture: '🏺', transfer: '🚐', special: '⭐' };
  const catEmoji = name => { const x = (window.CV && CV.catalog || []).find(c => t(c.n) === name); return x ? (CAT[x.cat] || '✨') : '✨'; };

  /* rezervasyon mesajı: "Etiket: değer" satırlarını simgeli hale getirir */
  function booking(lines) {
    const map = [['msg.exp', null], ['msg.date', '📅'], ['msg.guests', '👥'], ['msg.hotel', '🏨'], ['msg.name', '👤'], ['msg.phone', '📱'], ['msg.email', '✉️'], ['msg.total', '💶'], ['msg.note', '📝']];
    const out = [m('hi'), m('bookIn'), ''];
    lines.slice(1).forEach(l => {
      if (/^\[[A-Z]{2}\]$/.test(l)) return;
      if (l === t('msg.pickup')) { out.push('🚐 ' + l.replace(/:\s*/, ': ')); return; }
      const f = map.find(([k]) => l.startsWith(t(k) + ':'));
      if (!f) { out.push(l); return; }
      const label = t(f[0]), val = l.slice(label.length + 1).trim();
      out.push(`${f[1] || catEmoji(val)} *${label}:* ${val}`);
    });
    out.push('', m('bookOut'), sign());
    return out.join('\n');
  }
  /* plan asistanı mesajı */
  function plan(lines) {
    const out = [m('hi'), '✨ *' + m('planIn') + '*'];
    lines.slice(1).forEach(l => {
      if (/^\[[A-Z]{2}\]$/.test(l)) return;
      if (l.startsWith('• ')) { const s = l.slice(2), i = s.indexOf(' ('); out.push(i > 0 ? `📅 *${s.slice(0, i)}*${s.slice(i)}` : `📅 *${s}*`); return; }
      if (/^\s{2}\S/.test(l)) { const p = l.trim().split(/\s{2,}/); out.push(p.length > 1 ? `   ▸ ${p[0]} · ${p.slice(1).join(' ')}` : '   ▸ ' + l.trim()); return; }
      if (l.startsWith(t('ai.people'))) { out.push('👥 ' + l); return; }
      if (l.startsWith(t('ai.total'))) { const k = t('ai.total'); out.push(`💶 *${k}:*${l.slice(k.length + 1)}`); return; }
      out.push(l);
    });
    out.push('', m('planOut'), sign());
    return out.join('\n');
  }

  window.CVMsg = {
    t: m,
    hello: () => [m('hi'), m('help'), '', sign()].join('\n'),
    ask: s => [m('hi'), m('ask', { s }), m('thanks'), '', sign()].join('\n'),
    say: s => [m('hi'), String(s || '').trim(), '', sign()].join('\n'),
    /* sitedeki her WhatsApp bağlantısı buradan geçer */
    wrap(msg) {
      msg = String(msg || '').trim();
      if (!msg) return this.hello();
      if (msg.startsWith(m('hi'))) return msg;                       /* zaten düzenlenmiş */
      const lines = msg.split('\n');
      if (lines[0] === t('msg.hello')) return booking(lines);
      if (lines[0] === t('ai.msgHead')) return plan(lines);
      if (lines.length === 1) return this.ask(msg.replace(/\s*[—-]\s*CappaViva$/, ''));
      return [m('hi'), ...lines.filter(l => !/^\[[A-Z]{2}\]$/.test(l)), '', sign()].join('\n');
    }
  };
})();