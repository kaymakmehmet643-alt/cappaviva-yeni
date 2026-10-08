/* =========================================================
   CappaViva — ANA SAYFA PREMIUM EFEKTLER (fx.js) · v3
   - Hero: harf harf açılan başlık, altın ışık dalgası, imleç ışığı,
     film greni, aşağı kaydırınca Apple tarzı köşeleri yuvarlanan kapanış
   - Hero → Güven barı → Destinasyonlar (kartlar sırayla süzülerek gelir)
   - Transfer: tıkladıkça değişen premium vitrin (rota animasyonlu)
   - Turlar: ekrana girerken sırayla yükselir, fareyle 3B eğilir
   - Bölümlere "Hepsini gör" düğmeleri
   - Instagram (@cappaviva) + Partnerimiz ol bölümü
   - Bültenden sonra kayan şerit (partnerler ya da bölgeler)
   ========================================================= */
(function () {
  const hero = document.getElementById('top');
  if (!hero || !window.CVApp) return;
  const A = window.CVApp, $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const lang = () => (window.CVI18N && CVI18N.lang) || 'en';
  const TP = 'turlar.html', DP = 'destinasyonlar.html';

  /* yazılar — 13 dil */
  const L = {
    tr: { all: 'Hepsini gör', allDest: 'Tüm destinasyonlar', allDestP: 'Bölgeler, vadiler, müzeler, kiliseler ve yer altı şehirleri.', allTours: 'Tüm turlar ve fiyatlar', allExp: 'Tüm deneyimler', allTr: 'Tüm transferler', lgWa: 'WhatsApp\'tan sor', dist: 'Mesafe', time: 'Süre', svc: 'Hizmet', priv: 'Kapıdan kapıya, özel araç', shared: 'Paylaşımlı servis', min: 'dk', from: 'Nereden', any: 'Her iki havalimanı', igT: 'Kapadokya, bizim objektifimizden.', igP: 'Her sabah balonların, vadilerin ve misafirlerimizin en güzel anlarını paylaşıyoruz. Takip et, bir sonraki karede sen ol.', igFollow: 'Instagram\'da takip et', igSee: 'Instagram\'da gör' },
    en: { all: 'See all', allDest: 'All destinations', allDestP: 'Towns, valleys, museums, churches and underground cities.', allTours: 'All tours & prices', allExp: 'All experiences', allTr: 'All transfers', lgWa: 'Ask on WhatsApp', dist: 'Distance', time: 'Duration', svc: 'Service', priv: 'Door to door, private vehicle', shared: 'Shared shuttle', min: 'min', from: 'From', any: 'Both airports', igT: 'Cappadocia, through our lens.', igP: 'Every morning we share the best moments of balloons, valleys and our guests. Follow along — and be in the next shot.', igFollow: 'Follow on Instagram', igSee: 'View on Instagram' },
    de: { all: 'Alle ansehen', allDest: 'Alle Reiseziele', allDestP: 'Orte, Täler, Museen, Kirchen und unterirdische Städte.', allTours: 'Alle Touren & Preise', allExp: 'Alle Erlebnisse', allTr: 'Alle Transfers', lgWa: 'Per WhatsApp fragen', dist: 'Entfernung', time: 'Fahrzeit', svc: 'Service', priv: 'Von Tür zu Tür, Privatfahrzeug', shared: 'Shuttle (geteilt)', min: 'Min.', from: 'Ab', any: 'Beide Flughäfen', igT: 'Kappadokien durch unsere Linse.', igP: 'Jeden Morgen teilen wir die schönsten Momente mit Ballons, Tälern und unseren Gästen. Folgen Sie uns – und seien Sie im nächsten Bild.', igFollow: 'Auf Instagram folgen', igSee: 'Auf Instagram ansehen' },
    fr: { all: 'Tout voir', allDest: 'Toutes les destinations', allDestP: 'Villages, vallées, musées, églises et cités souterraines.', allTours: 'Tous les circuits et tarifs', allExp: 'Toutes les expériences', allTr: 'Tous les transferts', lgWa: 'Demander sur WhatsApp', dist: 'Distance', time: 'Durée', svc: 'Service', priv: 'Porte à porte, véhicule privé', shared: 'Navette partagée', min: 'min', from: 'Départ', any: 'Les deux aéroports', igT: 'La Cappadoce à travers notre objectif.', igP: 'Chaque matin, nous partageons les plus beaux moments : montgolfières, vallées et nos voyageurs. Suivez-nous et soyez sur la prochaine photo.', igFollow: 'Suivre sur Instagram', igSee: 'Voir sur Instagram' },
    es: { all: 'Ver todo', allDest: 'Todos los destinos', allDestP: 'Pueblos, valles, museos, iglesias y ciudades subterráneas.', allTours: 'Todos los tours y precios', allExp: 'Todas las experiencias', allTr: 'Todos los traslados', lgWa: 'Preguntar por WhatsApp', dist: 'Distancia', time: 'Duración', svc: 'Servicio', priv: 'Puerta a puerta, vehículo privado', shared: 'Traslado compartido', min: 'min', from: 'Desde', any: 'Ambos aeropuertos', igT: 'Capadocia a través de nuestro objetivo.', igP: 'Cada mañana compartimos los mejores momentos de globos, valles y nuestros huéspedes. Síguenos y sal en la próxima foto.', igFollow: 'Seguir en Instagram', igSee: 'Ver en Instagram' },
    it: { all: 'Vedi tutto', allDest: 'Tutte le destinazioni', allDestP: 'Borghi, valli, musei, chiese e città sotterranee.', allTours: 'Tutti i tour e i prezzi', allExp: 'Tutte le esperienze', allTr: 'Tutti i transfer', lgWa: 'Chiedi su WhatsApp', dist: 'Distanza', time: 'Durata', svc: 'Servizio', priv: 'Porta a porta, auto privata', shared: 'Navetta condivisa', min: 'min', from: 'Da', any: 'Entrambi gli aeroporti', igT: 'La Cappadocia attraverso il nostro obiettivo.', igP: 'Ogni mattina condividiamo i momenti più belli: mongolfiere, valli e i nostri ospiti. Seguici e sii nel prossimo scatto.', igFollow: 'Segui su Instagram', igSee: 'Vedi su Instagram' },
    pt: { all: 'Ver tudo', allDest: 'Todos os destinos', allDestP: 'Vilas, vales, museus, igrejas e cidades subterrâneas.', allTours: 'Todos os passeios e preços', allExp: 'Todas as experiências', allTr: 'Todos os transfers', lgWa: 'Perguntar no WhatsApp', dist: 'Distância', time: 'Duração', svc: 'Serviço', priv: 'Porta a porta, veículo privado', shared: 'Transfer compartilhado', min: 'min', from: 'De', any: 'Ambos os aeroportos', igT: 'A Capadócia pelas nossas lentes.', igP: 'Todas as manhãs compartilhamos os melhores momentos de balões, vales e dos nossos hóspedes. Siga-nos e apareça na próxima foto.', igFollow: 'Seguir no Instagram', igSee: 'Ver no Instagram' },
    ru: { all: 'Смотреть все', allDest: 'Все направления', allDestP: 'Города, долины, музеи, церкви и подземные города.', allTours: 'Все туры и цены', allExp: 'Все впечатления', allTr: 'Все трансферы', lgWa: 'Спросить в WhatsApp', dist: 'Расстояние', time: 'В пути', svc: 'Услуга', priv: 'От двери до двери, личный автомобиль', shared: 'Групповой трансфер', min: 'мин', from: 'Откуда', any: 'Оба аэропорта', igT: 'Каппадокия через наш объектив.', igP: 'Каждое утро мы делимся лучшими моментами: шары, долины и наши гости. Подписывайтесь — и попадите в следующий кадр.', igFollow: 'Подписаться в Instagram', igSee: 'Смотреть в Instagram' },
    ar: { all: 'عرض الكل', allDest: 'كل الوجهات', allDestP: 'البلدات والوديان والمتاحف والكنائس والمدن تحت الأرض.', allTours: 'كل الجولات والأسعار', allExp: 'كل التجارب', allTr: 'كل خدمات النقل', lgWa: 'اسأل عبر واتساب', dist: 'المسافة', time: 'المدة', svc: 'الخدمة', priv: 'من الباب إلى الباب بسيارة خاصة', shared: 'نقل مشترك', min: 'دقيقة', from: 'من', any: 'كلا المطارين', igT: 'كابادوكيا بعدستنا.', igP: 'كل صباح نشارك أجمل لحظات المناطيد والوديان وضيوفنا. تابعنا وكن في الصورة القادمة.', igFollow: 'تابعنا على إنستغرام', igSee: 'شاهد على إنستغرام' },
    fa: { all: 'دیدن همه', allDest: 'همه مقصدها', allDestP: 'شهرها، دره‌ها، موزه‌ها، کلیساها و شهرهای زیرزمینی.', allTours: 'همه تورها و قیمت‌ها', allExp: 'همه تجربه‌ها', allTr: 'همه ترانسفرها', lgWa: 'پرسش در واتس‌اپ', dist: 'مسافت', time: 'مدت', svc: 'خدمت', priv: 'درب به درب با خودروی اختصاصی', shared: 'سرویس اشتراکی', min: 'دقیقه', from: 'از', any: 'هر دو فرودگاه', igT: 'کاپادوکیه از دریچه دوربین ما.', igP: 'هر صبح زیباترین لحظه‌های بالن‌ها، دره‌ها و مهمانانمان را به اشتراک می‌گذاریم. دنبال کنید و در عکس بعدی باشید.', igFollow: 'دنبال کردن در اینستاگرام', igSee: 'دیدن در اینستاگرام' },
    zh: { all: '查看全部', allDest: '全部目的地', allDestP: '城镇、山谷、博物馆、教堂和地下城。', allTours: '全部行程与价格', allExp: '全部体验', allTr: '全部接送', lgWa: 'WhatsApp 咨询', dist: '距离', time: '用时', svc: '服务', priv: '专车门到门', shared: '拼车班车', min: '分钟', from: '出发地', any: '两个机场', igT: '透过我们的镜头看卡帕多奇亚。', igP: '每天清晨，我们分享热气球、山谷和客人们的精彩瞬间。关注我们，下一张照片里就有你。', igFollow: '在 Instagram 关注', igSee: '在 Instagram 查看' },
    ja: { all: 'すべて見る', allDest: 'すべての目的地', allDestP: '町、渓谷、博物館、教会、地下都市。', allTours: 'すべてのツアーと料金', allExp: 'すべての体験', allTr: 'すべての送迎', lgWa: 'WhatsAppで質問', dist: '距離', time: '所要時間', svc: 'サービス', priv: '専用車でドアツードア', shared: '乗り合いシャトル', min: '分', from: '出発', any: '両空港', igT: '私たちのレンズで見るカッパドキア。', igP: '毎朝、気球や渓谷、ゲストの素敵な瞬間をシェアしています。フォローして、次の一枚に登場しませんか。', igFollow: 'Instagramでフォロー', igSee: 'Instagramで見る' },
    ko: { all: '전체 보기', allDest: '모든 여행지', allDestP: '마을, 계곡, 박물관, 교회, 지하 도시.', allTours: '모든 투어와 가격', allExp: '모든 체험', allTr: '모든 픽업 서비스', lgWa: 'WhatsApp으로 문의', dist: '거리', time: '소요 시간', svc: '서비스', priv: '전용 차량 도어 투 도어', shared: '공유 셔틀', min: '분', from: '출발', any: '두 공항 모두', igT: '우리의 렌즈로 본 카파도키아.', igP: '매일 아침 열기구와 계곡, 그리고 손님들의 멋진 순간을 공유합니다. 팔로우하고 다음 사진의 주인공이 되어 보세요.', igFollow: 'Instagram 팔로우', igSee: 'Instagram에서 보기' }
  };
  const u = k => (L[lang()] || L.en)[k] ?? L.en[k];
  const t = k => A.t(k);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const item = id => CV.catalog.find(x => x.id === id);
  const reduce = A.reduce;

  /* ---------- 1) HERO ---------- */
  const sticky = hero.querySelector('.hero-sticky');
  hero.classList.add('fx-on');
  if (!sticky.querySelector('.hero-spot')) {
    sticky.insertAdjacentHTML('beforeend', '<div class="hero-spot" aria-hidden="true"></div><div class="hero-grain" aria-hidden="true"></div>');
    hero.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; const r = sticky.getBoundingClientRect(); sticky.style.setProperty('--sx', (e.clientX - r.left) + 'px'); sticky.style.setProperty('--sy', (e.clientY - r.top) + 'px'); sticky.classList.add('spot-on'); });
    hero.addEventListener('pointerleave', () => sticky.classList.remove('spot-on'));
  }
  /* başlığı harflere böl (her dil değişiminde tekrar) */
  function splitTitle() {
    const el = hero.querySelector('.hero-title > span:first-child'); if (!el) return;
    if (el.querySelector('.ch')) return;
    const txt = el.textContent; el.setAttribute('aria-label', txt);
    /* Arapça ve Farsça harfler birbirine bağlı yazıldığı için bölünmez */
    const parts = /^(ar|fa)$/.test(lang()) ? [txt] : [...txt];
    el.innerHTML = parts.map((c, i) => `<span class="ch" aria-hidden="true" style="--i:${i}">${c === ' ' ? '&nbsp;' : esc(c)}</span>`).join('');
    hero.classList.remove('t-in'); void el.offsetWidth; requestAnimationFrame(() => hero.classList.add('t-in'));
  }

  /* ---------- 2) SIRA: HERO → GÜVEN BARI → DESTİNASYONLAR ---------- */
  const destSec = $('#destinasyonlar');
  if (destSec) {
    destSec.classList.add('fx-dest');
    if ('IntersectionObserver' in window) new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { destSec.classList.add('in'); o.disconnect(); } }), { threshold: .12 }).observe(destSec);
    else destSec.classList.add('in');
  }
  function stagger() { $$('#destTrack .dcard').forEach((c, i) => c.style.setProperty('--d', i)); }

  /* ---------- 3) TRANSFER VİTRİNİ (tıkladıkça değişir) ---------- */
  const XS = [
    { k: 'kayseri', id: 'x-kayseri', ic: 'i-plane', code: 'ASR', fromLbl: 'Kayseri', scene: { p: 'night', seed: 141, chim: 1 }, a: [70, 220], b: [530, 90], path: 'M70 220 C 200 60, 380 260, 530 90', stats: [['dist', '~75 km'], ['time', '~70 MIN'], ['svc', 'priv']] },
    { k: 'nevsehir', id: 'x-nevsehir', ic: 'i-plane', code: 'NAV', fromLbl: 'Nevşehir', scene: { p: 'dawn', seed: 142, balloons: 14, chim: 1.1 }, a: [70, 110], b: [530, 150], path: 'M70 110 C 220 250, 360 40, 530 150', stats: [['dist', '~40 km'], ['time', '~45 MIN'], ['svc', 'priv']] },
    { k: 'shuttle', id: 'x-shuttle', ic: 'i-van', code: 'ASR · NAV', fromLbl: 'any', scene: { p: 'morning', seed: 143, balloons: 4, chim: 1.2 }, a: [70, 160], b: [530, 120], path: 'M70 160 C 190 40, 300 280, 420 140 S 500 100, 530 120', stats: [['from', 'any'], ['svc', 'shared']] },
    { k: 'city', id: 'x-city', ic: 'i-route', code: 'TR', fromLbl: 'Ankara · Konya', scene: { p: 'sunset', seed: 144, chim: 1.3 }, a: [70, 240], b: [530, 80], path: 'M70 240 C 160 200, 260 60, 400 120 S 500 80, 530 80', stats: [['dist', 'Ankara ~300 km'], ['dist', 'Konya ~230 km'], ['svc', 'priv']] }
  ];
  let xsOn = 0;
  const statVal = v => v === 'priv' || v === 'shared' || v === 'any' ? u(v) : v.replace('MIN', u('min'));
  function xsStage(x) {
    const it = item(x.id) || {};
    return `<div class="xs-visual">
        <span class="media" data-img="${x.id}" data-scene='${JSON.stringify(x.scene)}'></span>
        <svg class="xs-route" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <path class="xs-glow" d="${x.path}"/><path class="xs-path" d="${x.path}"/>
          <circle class="xs-dot" cx="${x.a[0]}" cy="${x.a[1]}" r="8"/><circle class="xs-dot end" cx="${x.b[0]}" cy="${x.b[1]}" r="10"><animate attributeName="r" values="9;16;9" dur="2.4s" repeatCount="indefinite"/></circle>
          <text x="${x.a[0] - 14}" y="${x.a[1] - 22}" text-anchor="start">${esc(x.fromLbl === 'any' ? x.code : x.fromLbl === 'Ankara · Konya' ? x.fromLbl : x.code + ' · ' + x.fromLbl)}</text>
          <text x="${x.b[0]}" y="${x.b[1] - 24}" text-anchor="middle" class="end">Göreme</text>
          <circle class="xs-car" r="7"><animateMotion dur="4.5s" repeatCount="indefinite" path="${x.path}"/></circle>
        </svg>
      </div>
      <div class="xs-info">
        <span class="eyebrow">${t('tr.eyebrow')}</span>
        <h3>${esc(t(it.n || x.id))}</h3>
        <p>${esc(t(it.p || 'x.private.p'))}</p>
        <dl class="xs-stats">${x.stats.map(([l, v]) => `<div><dt>${u(l)}</dt><dd>${esc(statVal(v))}</dd></div>`).join('')}</dl>
        <ul class="xs-feat">${[1, 2, 3, 4].map(i => `<li>${esc(t('tr.n' + i))}</li>`).join('')}</ul>
        <div class="xs-acts"><span class="xs-price">${it.eur ? `<b data-eur="${it.eur}">${A.fmt(it.eur)}</b>` : `<b>${t('c.ask')}</b>`}</span><button class="btn btn-primary" type="button" data-book="${x.id}">${t('c.book')}</button></div>
      </div>`;
  }
  function renderTransfer() {
    const host = $('#transfer .tr-grid'); if (!host) return;
    let box = $('#xs');
    if (!box) { host.insertAdjacentHTML('beforebegin', '<div class="xs rv" id="xs"></div>'); box = $('#xs'); host.classList.add('fx-hide'); const nt = $('#transfer .tr-note'); if (nt) nt.classList.add('fx-hide'); }
    box.innerHTML = `<div class="xs-tabs" role="tablist">${XS.map((x, i) => { const it = item(x.id) || {}; return `<button type="button" role="tab" class="xs-tab ${i === xsOn ? 'on' : ''}" data-xs="${i}" aria-selected="${i === xsOn}"><i class="xs-ic"><svg><use href="#${x.ic}"/></svg></i><span><b>${esc(t(it.n || x.id))}</b><small>${esc(x.code)}</small></span><em>0${i + 1}</em></button>`; }).join('')}</div>
      <div class="xs-stage" id="xsStage">${xsStage(XS[xsOn])}</div>`;
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-xs]'); if (!b) return;
    const i = +b.dataset.xs; if (i === xsOn) return; xsOn = i;
    $$('.xs-tab').forEach((x, j) => { x.classList.toggle('on', j === i); x.setAttribute('aria-selected', j === i); });
    const st = $('#xsStage'); st.classList.add('out');
    setTimeout(() => { st.innerHTML = xsStage(XS[i]); A.mount(); st.classList.remove('out'); }, reduce ? 0 : 260);
  });

  /* ---------- 4) HEPSİNİ GÖR DÜĞMELERİ ---------- */
  const seeAll = (id, after, href, label) => {
    const host = $(after); if (!host) return;
    let el = document.getElementById(id);
    if (!el) { host.insertAdjacentHTML('afterend', `<div class="see-all rv" id="${id}"></div>`); el = document.getElementById(id); }
    el.innerHTML = `<a class="see-all-btn" href="${href}"><span>${label}</span><i aria-hidden="true">→</i></a>`;
  };
  function renderSeeAll() {
    const track = $('#destTrack');
    if (track && !track.querySelector('.dcard-all')) {
      const n = window.CVPlaces ? CVPlaces.items.length : '';
      track.insertAdjacentHTML('beforeend', `<a class="dcard dcard-all" href="${DP}"><span class="num">${n}</span><small>${esc(u('all'))}</small><h3>${esc(u('allDest'))}</h3><p>${esc(u('allDestP'))}</p><b class="go" aria-hidden="true">→</b></a>`);
    }
    const head = $('#destinasyonlar .row-head');
    if (head) { let a = head.querySelector('.see-all-mini'); if (!a) { head.insertAdjacentHTML('beforeend', '<a class="see-all-mini"></a>'); a = head.querySelector('.see-all-mini'); } a.href = DP; a.innerHTML = `${esc(u('all'))} <i>→</i>`; }
    seeAll('saTours', '#tgrid', TP, u('allTours'));
    seeAll('saWs', '#atolyeler .ws-grid', TP + '#culture', u('allExp'));
    seeAll('saTr', '#transfer .tr-note', TP + '#transfer', u('allTr'));
  }

  /* ---------- 5) LOCAL GUIDE TANITIMI ---------- */
  function renderGuide() {
    let sec = $('#localguide');
    if (!sec) { const after = $('#atolyeler'); if (!after) return; after.insertAdjacentHTML('afterend', '<section class="lg-tease sec" id="localguide"></section>'); sec = $('#localguide'); }
    sec.innerHTML = `<div class="c lg-grid">
      <div class="lg-media rv-s">
        <div class="media" data-img="guide" data-scene='{"p":"sunset","seed":121,"balloons":5,"chim":1.4,"castle":true}'></div>
        <div class="lg-badge"><span>Local Guide</span><b>VIP</b></div>
        <ul class="lg-checks">${[1, 2, 3, 4].map(i => `<li>${esc(t('lg.' + i))}</li>`).join('')}</ul>
      </div>
      <div class="lg-copy rv">
        <p class="eyebrow">${esc(t('lg.eyebrow'))}</p>
        <h2 class="h2">${esc(t('lg.title'))}</h2>
        <p class="lede">${esc(t('lg.p'))}</p>
        <div class="lg-acts"><button class="btn btn-primary" type="button" data-book="vip">${esc(t('lg.cta'))}</button><a class="btn btn-line" target="_blank" rel="noopener" href="${A.wa(t('lg.eyebrow') + ' — CappaViva')}">${esc(u('lgWa'))}</a></div>
      </div>
    </div>`;
  }

  /* ---------- 6) INSTAGRAM (@cappaviva) + PARTNERİMİZ OL ---------- */
  /* Fotoğraflar: data.js > images içine ig1…ig5 (ve istersen igAvatar) yolunu yazın.
     Fotoğraf yoksa geçici Kapadokya çizimi görünür. */
  const IG_SCENES = [
    { p: 'dawn', seed: 301, balloons: 30, chim: 1.3 },
    { p: 'sunset', seed: 302, chim: 1.6 },
    { p: 'green', seed: 303, chim: .5, river: true },
    { p: 'night', seed: 304, chim: 1.1 },
    { p: 'morning', seed: 305, balloons: 8, chim: 1, castle: true }
  ];
  function renderIG() {
    const sec = $('#ortaklar'); if (!sec) return;
    const user = CV.instagram || 'cappaviva', url = 'https://www.instagram.com/' + user + '/';
    const av = CV.images && CV.images.igAvatar;
    sec.className = 'ig sec';
    sec.innerHTML = `<div class="c ig-grid">
      <div class="ig-intro rv">
        <a class="ig-profile" href="${url}" target="_blank" rel="noopener">
          <span class="ig-ring"><span class="ig-av">CV${av ? `<img src="${esc(av)}" alt="" onerror="this.remove()">` : ''}</span></span>
          <span><b>@${esc(user)}</b><small>Instagram · Göreme</small></span>
        </a>
        <h2 class="h2">${esc(u('igT'))}</h2>
        <p class="lede">${esc(u('igP'))}</p>
        <div class="ig-acts">
          <a class="btn ig-follow" href="${url}" target="_blank" rel="noopener"><svg><use href="#i-ig"/></svg>${esc(u('igFollow'))}</a>
          <a class="btn btn-line" id="ptCta" href="${A.wa(t('pt.eyebrow') + ' — CappaViva')}" target="_blank" rel="noopener"><svg width="18" height="18"><use href="#i-wa"/></svg>${esc(t('pt.cta'))}</a>
        </div>
      </div>
      <div class="ig-feed rv">${IG_SCENES.map((s, i) => `<a class="ig-post" href="${url}" target="_blank" rel="noopener" aria-label="${esc(u('igSee'))}">
          <span class="media" data-img="ig${i + 1}" data-scene='${JSON.stringify(s)}'></span>
          <span class="ig-mini" aria-hidden="true"><svg><use href="#i-ig"/></svg></span>
          <span class="ig-hover" aria-hidden="true"><svg><use href="#i-ig"/></svg><b>${esc(u('igSee'))}</b></span>
        </a>`).join('')}</div>
    </div>`;
  }

  /* ---------- 7) BÜLTENDEN SONRA KAYAN ŞERİT ---------- */
  /* data.js > partners doluysa partner isimleri kayar, boşsa bölge isimleri kalır */
  function renderStrip() {
    const m = $('#marquee'); if (!m) return;
    const list = (CV.partners || []).filter(Boolean); if (!list.length) return;
    const row = `<span class="mq-tag">${esc(t('pt.eyebrow'))}</span>` + list.map((n, i) => i % 2 ? `<span><em>${esc(n)}</em></span>` : `<span>${esc(n)}</span>`).join('<span>✦</span>') + '<span>✦</span>';
    m.innerHTML = row + row;
  }

  /* ---------- 8) TURLAR: sırayla yükselme + fareyle 3B eğilme ---------- */
  let tileIO;
  function setupTiles() {
    const g = $('#tgrid'); if (!g) return;
    const tiles = $$('#tgrid .tile');
    tiles.forEach((x, i) => x.style.setProperty('--d', i % 3));
    if (reduce || !('IntersectionObserver' in window)) { tiles.forEach(x => x.classList.add('in')); return; }
    g.classList.add('fx-tiles');
    if (tileIO) tileIO.disconnect();
    tileIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); tileIO.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
    tiles.forEach(x => tileIO.observe(x));
  }
  let tiltEl = null;
  const untilt = () => { if (tiltEl) { tiltEl.style.removeProperty('--rx'); tiltEl.style.removeProperty('--ry'); tiltEl = null; } };
  if (!reduce) {
    document.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      const el = e.target.closest('#tgrid .tile, .ig-post');
      if (el !== tiltEl) untilt();
      if (!el) return;
      tiltEl = el;
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg');
      el.style.setProperty('--rx', (-y * 7).toFixed(2) + 'deg');
    }, { passive: true });
    document.addEventListener('pointerleave', untilt);
  }

  /* ---------- her çizimde (dil/para birimi değişince de) ---------- */
  function renderFx() { splitTitle(); renderSeeAll(); stagger(); renderTransfer(); renderIG(); renderStrip(); setupTiles(); onScroll(); }
  document.addEventListener('cv:render', renderFx);
  /* sayfa bazen bu dosya yüklenmeden ÖNCE çiziliyor; ilk çizimi kaçırdıysak şimdi yap */
  if (document.querySelector('#destTrack .dcard')) { renderFx(); A.mount(); }

  /* ---------- kaydırma: Apple tarzı hero kapanışı ---------- */
  function onScroll() {
    const span = Math.max(1, hero.offsetHeight - innerHeight), p = Math.min(1, Math.max(0, scrollY / span));
    const c = reduce ? 0 : Math.min(1, Math.max(0, (p - .72) / .28));
    hero.style.setProperty('--hc', c.toFixed(3));
  }
  addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
  addEventListener('resize', onScroll);
})();