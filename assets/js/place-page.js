/* =========================================================
   CappaViva — Destinasyon DETAY sayfası (destinasyon.html?d=goreme)
   İçerik place-details.js'ten, yer bilgisi places.js'ten gelir.
   ========================================================= */
(function () {
  const P = window.CVPlaces, A = window.CVApp, D = window.CVDetails || {};
  const root = document.getElementById('placePage');
  if (!P || !A || !root) return;
  const key = new URLSearchParams(location.search).get('d') || '';
  const place = P.get(key), det = D[key];
  if (!place || !det) { location.replace('destinasyonlar.html'); return; }

  /* sayfa yazıları — 13 dil */
  const UI = {
    tr: { about: 'Tanıyalım', todo: 'Burada ne yapılır?', tours: 'Buraya uğrayan turlarımız', when: 'Ne zaman gidilir?', practical: 'Pratik bilgiler', tips: 'Local rehberin önerileri', gallery: 'Galeri', map: 'Harita', nearby: 'Yakındaki yerler', faq: 'Sık sorulan sorular', reviews: 'Misafirlerimiz ne diyor', ctaT: '{n} planını birlikte yapalım.', ctaP: 'Tarihini ve kişi sayını yaz, sana özel programı WhatsApp\'tan gönderelim.', from: 'Başlangıç', quick: 'Hızlı rezervasyon', save: '%{n} indirim' },
    en: { about: 'Overview', todo: 'Things to do', tours: 'Tours that visit here', when: 'When to go', practical: 'Practical info', tips: 'Local guide tips', gallery: 'Gallery', map: 'Map', nearby: 'Nearby places', faq: 'FAQ', reviews: 'What our guests say', ctaT: 'Let\'s plan your {n} trip together.', ctaP: 'Send us your dates and group size — we\'ll send a tailor-made plan on WhatsApp.', from: 'From', quick: 'Quick booking', save: '{n}% off' },
    de: { about: 'Überblick', todo: 'Was man hier erlebt', tours: 'Touren mit diesem Ort', when: 'Beste Reisezeit', practical: 'Praktische Infos', tips: 'Tipps vom Local Guide', gallery: 'Galerie', map: 'Karte', nearby: 'In der Nähe', faq: 'Häufige Fragen', reviews: 'Das sagen unsere Gäste', ctaT: 'Planen wir Ihre {n}-Reise gemeinsam.', ctaP: 'Schreiben Sie uns Datum und Personenzahl – wir senden Ihnen ein persönliches Programm per WhatsApp.', from: 'Ab', quick: 'Schnell buchen', save: '{n}% Rabatt' },
    fr: { about: 'Présentation', todo: 'À faire sur place', tours: 'Nos circuits qui y passent', when: 'Quand y aller', practical: 'Infos pratiques', tips: 'Conseils du guide local', gallery: 'Galerie', map: 'Carte', nearby: 'À proximité', faq: 'Questions fréquentes', reviews: 'L\'avis de nos voyageurs', ctaT: 'Préparons ensemble votre séjour à {n}.', ctaP: 'Envoyez-nous vos dates et le nombre de personnes — nous vous enverrons un programme sur mesure sur WhatsApp.', from: 'Dès', quick: 'Réservation rapide', save: '-{n} %' },
    es: { about: 'Presentación', todo: 'Qué hacer', tours: 'Nuestros tours que pasan aquí', when: 'Cuándo ir', practical: 'Información práctica', tips: 'Consejos del guía local', gallery: 'Galería', map: 'Mapa', nearby: 'Lugares cercanos', faq: 'Preguntas frecuentes', reviews: 'Lo que dicen nuestros huéspedes', ctaT: 'Planifiquemos juntos tu viaje a {n}.', ctaP: 'Envíanos tus fechas y número de personas; te mandamos un plan a medida por WhatsApp.', from: 'Desde', quick: 'Reserva rápida', save: '{n}% dto.' },
    it: { about: 'Panoramica', todo: 'Cosa fare', tours: 'I nostri tour che passano qui', when: 'Quando andare', practical: 'Informazioni pratiche', tips: 'Consigli della guida locale', gallery: 'Galleria', map: 'Mappa', nearby: 'Nei dintorni', faq: 'Domande frequenti', reviews: 'Cosa dicono i nostri ospiti', ctaT: 'Organizziamo insieme il tuo viaggio a {n}.', ctaP: 'Inviaci date e numero di persone: ti mandiamo un programma su misura su WhatsApp.', from: 'Da', quick: 'Prenotazione rapida', save: '-{n}%' },
    pt: { about: 'Visão geral', todo: 'O que fazer', tours: 'Nossos passeios que passam aqui', when: 'Quando ir', practical: 'Informações práticas', tips: 'Dicas do guia local', gallery: 'Galeria', map: 'Mapa', nearby: 'Lugares próximos', faq: 'Perguntas frequentes', reviews: 'O que dizem nossos hóspedes', ctaT: 'Vamos planejar juntos sua viagem a {n}.', ctaP: 'Envie suas datas e número de pessoas — mandamos um roteiro sob medida pelo WhatsApp.', from: 'A partir de', quick: 'Reserva rápida', save: '{n}% off' },
    ru: { about: 'Обзор', todo: 'Чем заняться', tours: 'Наши туры с посещением', when: 'Когда ехать', practical: 'Полезная информация', tips: 'Советы местного гида', gallery: 'Галерея', map: 'Карта', nearby: 'Рядом', faq: 'Частые вопросы', reviews: 'Отзывы гостей', ctaT: 'Спланируем вашу поездку в {n} вместе.', ctaP: 'Напишите даты и число гостей — пришлём персональную программу в WhatsApp.', from: 'От', quick: 'Быстрое бронирование', save: 'Скидка {n}%' },
    ar: { about: 'نظرة عامة', todo: 'ماذا تفعل هنا', tours: 'جولاتنا التي تمر من هنا', when: 'متى تزور', practical: 'معلومات عملية', tips: 'نصائح المرشد المحلي', gallery: 'معرض الصور', map: 'الخريطة', nearby: 'أماكن قريبة', faq: 'الأسئلة الشائعة', reviews: 'ماذا يقول ضيوفنا', ctaT: 'لنخطط رحلتك إلى {n} معًا.', ctaP: 'أرسل لنا التواريخ وعدد الأشخاص وسنرسل لك برنامجًا خاصًا عبر واتساب.', from: 'ابتداءً من', quick: 'حجز سريع', save: 'خصم {n}%' },
    fa: { about: 'معرفی', todo: 'چه کارهایی انجام دهیم', tours: 'تورهای ما که از اینجا می‌گذرند', when: 'بهترین زمان سفر', practical: 'اطلاعات کاربردی', tips: 'پیشنهادهای راهنمای محلی', gallery: 'گالری', map: 'نقشه', nearby: 'مکان‌های نزدیک', faq: 'پرسش‌های متداول', reviews: 'مهمانان ما چه می‌گویند', ctaT: 'سفر {n} را با هم برنامه‌ریزی کنیم.', ctaP: 'تاریخ و تعداد نفرات را بفرستید؛ برنامه اختصاصی را در واتس‌اپ می‌فرستیم.', from: 'از', quick: 'رزرو سریع', save: '{n}٪ تخفیف' },
    zh: { about: '概览', todo: '游玩推荐', tours: '途经此地的行程', when: '最佳时间', practical: '实用信息', tips: '本地导游建议', gallery: '图库', map: '地图', nearby: '附近景点', faq: '常见问题', reviews: '客人评价', ctaT: '一起规划您的{n}之旅。', ctaP: '告诉我们日期和人数，我们会通过 WhatsApp 发送专属行程。', from: '起价', quick: '快速预订', save: '优惠 {n}%' },
    ja: { about: '概要', todo: 'ここでできること', tours: 'ここを訪れるツアー', when: 'ベストシーズン', practical: '実用情報', tips: '地元ガイドのおすすめ', gallery: 'ギャラリー', map: '地図', nearby: '周辺スポット', faq: 'よくある質問', reviews: 'お客様の声', ctaT: '{n}の旅を一緒に計画しましょう。', ctaP: '日程と人数を送ってください。WhatsAppでオーダーメイドのプランをお送りします。', from: '料金', quick: 'かんたん予約', save: '{n}%オフ' },
    ko: { about: '소개', todo: '즐길 거리', tours: '이곳을 방문하는 투어', when: '여행 적기', practical: '여행 정보', tips: '현지 가이드 팁', gallery: '갤러리', map: '지도', nearby: '주변 명소', faq: '자주 묻는 질문', reviews: '고객 후기', ctaT: '{n} 여행을 함께 계획해요.', ctaP: '날짜와 인원을 보내주시면 WhatsApp으로 맞춤 일정을 보내드립니다.', from: '최저', quick: '빠른 예약', save: '{n}% 할인' }
  };
  const lang = () => (window.CVI18N && CVI18N.lang) || 'en';
  const u = (k, v) => { let s = (UI[lang()] || {})[k] ?? UI.en[k]; if (v) s = s.replace(/\{(\w+)\}/g, (m, x) => v[x] ?? m); return s; };
  const C = () => det[lang()] || det.en;                       // içerik (dil yoksa İngilizce)
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const media = (img, scene) => `<span class="media" data-img="${img}" data-scene='${JSON.stringify(scene)}'></span>`;
  const item = id => CV.catalog.find(x => x.id === id) || { n: id };
  const tile = id => (CV.tourTiles || []).find(x => x.id === id) || {};
  const tName = id => A.t(tile(id).n || item(id).n);
  const tDesc = id => { const k = tile(id).p || item(id).p; return k ? A.t(k) : ''; };
  const price = id => { const x = item(id); return x.eur ? `<b data-eur="${x.eur}">${A.fmt(x.eur)}</b>${x.old ? `<s data-eur="${x.old}">${A.fmt(x.old)}</s>` : ''}` : `<b>${A.t('c.ask')}</b>`; };
  const off = id => { const x = item(id); return x.eur && x.old ? Math.round((1 - x.eur / x.old) * 100) : 0; };

  function render() {
    const c = C(), tr = det.tr || c, nm = P.name(place);
    document.title = nm + ' · CappaViva';
    const secs = [['about', 1], ['todo', 1], ['tours', 1], ['when', 1], ['practical', 1], ['gallery', 1], ['nearby', 1], ['faq', 1]];

    root.innerHTML = `
    <section class="page-hero pd-hero" aria-labelledby="pdTitle">
      ${media(key, place.scene)}
      <div class="page-hero-shade"></div>
      <div class="c page-hero-in">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">${A.t('nav.home')}</a><span aria-hidden="true">/</span><a href="destinasyonlar.html">${A.t('nav.dest')}</a><span aria-hidden="true">/</span><span>${esc(nm)}</span></nav>
        <p class="eyebrow">${P.t(place.c)}</p>
        <h1 id="pdTitle">${esc(nm)}</h1>
        <p class="page-lede">${esc(c.tagline)}</p>
        <div class="pd-facts">
          ${c.facts.map(([l, v]) => `<div><small>${esc(l)}</small><b>${esc(v)}</b></div>`).join('')}
          <div><small>${A.t('ft.sunrise')}</small><b data-live="sun">—</b></div>
        </div>
      </div>
    </section>

    <nav class="dp-tabs" id="pdTabs" aria-label="Sections"><div class="c dp-tabs-in">${secs.map(([k]) => `<a href="#${k}" data-tab="${k}">${u(k)}</a>`).join('')}</div></nav>

    <section class="pd-sec" id="about">
      <div class="c pd-about">
        <div class="pd-text rv">
          <p class="eyebrow">${u('about')}</p>
          <h2 class="h2">${esc(nm)}</h2>
          ${c.intro.map(p => `<p>${esc(p)}</p>`).join('')}
        </div>
        <aside class="pd-quick rv">
          <h3>${u('quick')}</h3>
          ${det.tours.map(id => `<button type="button" class="pd-q" data-book="${id}"><span>${tName(id)}</span><em>${price(id)}</em></button>`).join('')}
          <a class="btn btn-wa" href="${A.wa(nm + ' — CappaViva')}" target="_blank" rel="noopener"><svg width="18" height="18"><use href="#i-wa"/></svg>WhatsApp</a>
          <div class="pd-live"><span>${A.t('ft.pickup')}</span><b data-live="pick">—</b></div>
        </aside>
      </div>
    </section>

    <section class="pd-sec alt" id="todo">
      <div class="c">
        <div class="sec-head rv"><p class="eyebrow">${esc(nm)}</p><h2 class="h2">${u('todo')}</h2></div>
        <div class="pd-todo">${c.todo.map((x, i) => `<article class="pd-t rv"><div class="pd-t-m">${media(key + '-t' + (i + 1), x.scene || (tr.todo[i] || {}).scene || place.scene)}<i class="pd-t-no">${pad(i + 1)}</i></div><h3>${esc(x.n)}</h3><p>${esc(x.p)}</p></article>`).join('')}</div>
      </div>
    </section>

    <section class="pd-sec" id="tours">
      <div class="c">
        <div class="sec-head rv"><p class="eyebrow">CappaViva</p><h2 class="h2">${u('tours')}</h2></div>
        <div class="pd-tours">${det.tours.map(id => `<article class="pd-tour rv">
          <div class="pd-tour-m">${media(item(id).img || id, tile(id).scene || place.scene)}${off(id) ? `<span class="pd-off">${u('save', { n: off(id) })}</span>` : ''}</div>
          <div class="pd-tour-b"><h3>${tName(id)}</h3><p>${esc(tDesc(id))}</p>
            <div class="pd-tour-f"><span class="pd-price">${item(id).eur ? `<small>${u('from')}</small>${price(id)}<small>${A.t('c.pp')}</small>` : price(id)}</span><button class="btn btn-primary btn-sm" type="button" data-book="${id}">${A.t('c.book')}</button></div></div>
        </article>`).join('')}</div>
      </div>
    </section>

    <section class="pd-sec alt" id="when">
      <div class="c">
        <div class="sec-head rv"><p class="eyebrow">${esc(nm)}</p><h2 class="h2">${u('when')}</h2></div>
        <div class="pd-when">${c.when.map(([s, m, p], i) => `<div class="pd-w rv s${i}"><small>${esc(m)}</small><h3>${esc(s)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
      </div>
    </section>

    <section class="pd-sec" id="practical">
      <div class="c pd-prac">
        <div class="rv"><p class="eyebrow">${esc(nm)}</p><h2 class="h2">${u('practical')}</h2>
          <dl class="pd-dl">${c.practical.map(([t, p]) => `<div><dt>${esc(t)}</dt><dd>${esc(p)}</dd></div>`).join('')}</dl></div>
        <aside class="pd-tips rv"><p class="eyebrow">${A.t('lg.eyebrow')}</p><h3>${u('tips')}</h3>
          <ol>${c.tips.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
          <button class="btn btn-primary" type="button" data-book="vip" data-note="${esc(nm)}">${A.t('lg.cta')}</button></aside>
      </div>
    </section>

    <section class="pd-sec alt" id="gallery">
      <div class="c">
        <div class="sec-head rv"><p class="eyebrow">${esc(nm)}</p><h2 class="h2">${u('gallery')}</h2></div>
        <div class="pd-gal">${det.gallery.map((g, i) => `<figure class="rv g${i}">${media(g.img, g.scene)}</figure>`).join('')}</div>
      </div>
    </section>

    <section class="pd-sec" id="nearby">
      <div class="c">
        <div class="pd-map rv">
          <div><p class="eyebrow">${u('map')}</p><h2 class="h2">${u('nearby')}</h2>
            <a class="link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(det.map)}" target="_blank" rel="noopener">${A.t('ct.maps')}</a></div>
          <iframe title="${esc(nm)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${encodeURIComponent(det.map)}&z=13&output=embed"></iframe>
        </div>
        <div class="pd-near">${det.nearby.map(k => { const p = P.get(k); if (!p) return ''; return `<a class="pd-n rv" href="${P.url(p)}"><span class="pd-n-m">${media(p.k, p.scene)}</span><small>${P.t(p.c)} · ${P.dist(p)}</small><b>${esc(P.name(p))}</b></a>`; }).join('')}</div>
      </div>
    </section>

    ${det.reviews && det.reviews.length ? `<section class="pd-sec alt" id="reviews"><div class="c"><div class="sec-head rv"><h2 class="h2">${u('reviews')}</h2></div>
      <div class="pd-rev">${det.reviews.map(r => `<blockquote class="rv"><span class="st">${'★'.repeat(r.s || 5)}</span><p>${esc(r.t)}</p><cite>${esc(r.n)}</cite></blockquote>`).join('')}</div></div></section>` : ''}

    <section class="pd-sec alt faq" id="faq">
      <div class="c pd-faq">
        <div class="rv"><p class="eyebrow">${esc(nm)}</p><h2 class="h2">${u('faq')}</h2></div>
        <div class="faq-list">${c.faq.map(([q, a]) => `<details><summary>${esc(q)}<i></i></summary><div class="ans">${esc(a)}</div></details>`).join('')}</div>
      </div>
    </section>

    <section class="cta-band">
      <div class="c cta-in rv">
        <div><p class="eyebrow">${A.t('ai.eyebrow')}</p><h2 class="h2">${esc(u('ctaT', { n: nm }))}</h2><p class="lede">${u('ctaP')}</p></div>
        <div class="row"><a class="btn btn-wa" href="${A.wa(nm + ' — CappaViva')}" target="_blank" rel="noopener"><svg width="18" height="18"><use href="#i-wa"/></svg>WhatsApp</a><a class="btn btn-primary" href="index.html#planla">${A.t('hero.cta2')}</a><a class="btn btn-line" href="destinasyonlar.html">${A.t('mm.all')}</a></div>
      </div>
    </section>

    <div class="pd-bar" id="pdBar"><div><small>${esc(nm)} · ${u('from')}</small>${price(det.tours.find(id => item(id).eur) || det.tours[0])}</div><button class="btn btn-primary" type="button" data-book="${det.tours[0]}">${A.t('c.book')}</button></div>`;

    document.body.classList.add('has-pdbar');
    A.mount(); A.bindTiles && A.bindTiles();
    spy();
  }

  /* bölüm sekmeleri: kaydırdıkça ilgili sekme yanar */
  let io;
  function spy() {
    if (io) io.disconnect();
    if (!('IntersectionObserver' in window)) return;
    io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      $$('#pdTabs [data-tab]').forEach(a => a.classList.toggle('on', a.dataset.tab === e.target.id));
      const on = $('#pdTabs .on'); if (on && matchMedia('(max-width:900px)').matches) on.parentNode.scrollTo({ left: on.offsetLeft - 16, behavior: 'smooth' });
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('.pd-sec').forEach(s => io.observe(s));
  }

  /* telefonda alttaki rezervasyon çubuğu: başlık geçilince görünür */
  addEventListener('scroll', () => { const b = $('#pdBar'), h = $('.pd-hero'); if (b && h) b.classList.toggle('show', scrollY > h.offsetHeight * .6); }, { passive: true });

  document.addEventListener('cv:render', render);   // dil değişince app.js yeniden çizer, biz de çizeriz
  render();
})();