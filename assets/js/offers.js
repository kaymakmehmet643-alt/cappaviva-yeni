/* =========================================================
   CappaViva — FIRSATLAR, PREMIUM PAKETLER, POPÜLER ETİKETLERİ
   Menüdeki satış bölümleri buradan yönetilir.
   ÖNEMLİ: Sadece GERÇEK fırsat ve saatleri yazın. Fiyatlar data.js'teki
   katalogdan gelir (eur = şimdiki fiyat, old = eski fiyat).
   ========================================================= */
(function () {
  const O = {
    /* "Popüler" etiketi alacak turlar (data.js katalog kimlikleri) */
    popular: ['balon-std', 'kirmizi', 'atv'],

    /* SON DAKİKA FIRSATLARI
       id    : data.js katalog kimliği (fiyat ve eski fiyat oradan gelir)
       until : o günün rezervasyon kapanış saati (İstanbul saati, her gün tekrar eder)
       day   : 'tomorrow' = yarınki tur için, 'today' = bugünkü tur için            */
    deals: [
      { id: 'balon-std', until: '20:00', day: 'tomorrow' },
      { id: 'kirmizi',   until: '21:00', day: 'tomorrow' },
      { id: 'atv',       until: '14:00', day: 'today' }
    ],

    /* PREMIUM PAKETLER
       items : pakete giren turlar (ayrı ayrı toplam fiyat otomatik hesaplanır)
       eur   : paket fiyatı. Boş (null) bırakırsanız "Teklif al" görünür.
               Fiyat yazarsanız "% tasarruf" rozeti otomatik çıkar.
       pop   : true ise "Popüler" etiketi                                          */
    packages: [
      { k: 'klasik', days: 2, items: ['balon-std', 'kirmizi', 'atv'], eur: null, pop: true,
        tr: ['Kapadokya Klasik', 'İlk kez gelenler için en sevilen üçlü: gün doğumunda balon, Kırmızı Tur ve gün batımında ATV.'],
        en: ['Cappadocia Classic', 'The favourite trio for first-timers: sunrise balloon, Red Tour and sunset ATV.'] },
      { k: 'romantik', days: 2, items: ['balon-vip', 'jeep', 'sarap'], eur: null,
        tr: ['Romantik Kapadokya', 'Sadece ikiniz için özel balon sepeti, gün batımında jeep safari ve şarap tadımı.'],
        en: ['Romantic Cappadocia', 'A private balloon basket just for two, a sunset jeep safari and wine tasting.'] },
      { k: 'aile', days: 3, items: ['balon-std', 'yesil', 'at', 'comlek'], eur: null,
        tr: ['Aile Paketi', 'Balon, Yeşil Tur, at turu ve çocukların bayıldığı çömlek atölyesi; rahat bir tempoda.'],
        en: ['Family Package', 'Balloon, Green Tour, horse riding and the pottery workshop kids love — at a relaxed pace.'] },
      { k: 'vip', days: 3, items: ['vip', 'balon-cmf', 'x-kayseri'], eur: null,
        tr: ['VIP Local Guide', 'Havalimanından itibaren size özel rehber ve araç, Comfort balon uçuşu dahil.'],
        en: ['VIP Local Guide', 'Your own guide and vehicle from the airport onwards, Comfort balloon flight included.'] }
    ],

    /* Menü yazıları — 13 dil */
    L: {
      tr: { next: 'Sonraki tur için', gx: 'Keşfet', ge: 'Deneyimler', gc: 'CappaViva', deals: 'Son Dakika Fırsatları', premium: 'Premium Paketler', hot: 'FIRSAT', pop: 'Popüler', off: '%{n} indirim', closes: 'Rezervasyon kapanışına', tomorrow: 'Yarınki tur için', today: 'Bugünkü tur için', sep: 'Ayrı ayrı: {p}', save: '%{n} tasarruf', days: '{n} gün', dealsP: 'Gerçek indirimler, sınırlı süre. Kapanış saatinden önce yerini ayırt.', premP: 'En sevilen deneyimleri tek pakette topladık; planlamayı bize bırak.', ask: 'Paket fiyatı al', all: 'Tümünü gör', trust: 'Neden CappaViva' },
      en: { next: 'For the next tour', gx: 'Explore', ge: 'Experiences', gc: 'CappaViva', deals: 'Last-Minute Deals', premium: 'Premium Packages', hot: 'DEAL', pop: 'Popular', off: '{n}% off', closes: 'Booking closes in', tomorrow: 'For tomorrow\'s tour', today: 'For today\'s tour', sep: 'Separately: {p}', save: 'Save {n}%', days: '{n} days', dealsP: 'Real discounts, limited time. Reserve before the cut-off.', premP: 'Our favourite experiences in one package — leave the planning to us.', ask: 'Get package price', all: 'See all', trust: 'Why CappaViva' },
      de: { next: 'Für die nächste Tour', gx: 'Entdecken', ge: 'Erlebnisse', gc: 'CappaViva', deals: 'Last-Minute-Angebote', premium: 'Premium-Pakete', hot: 'ANGEBOT', pop: 'Beliebt', off: '{n}% Rabatt', closes: 'Buchungsschluss in', tomorrow: 'Für die Tour morgen', today: 'Für die Tour heute', sep: 'Einzeln: {p}', save: '{n}% sparen', days: '{n} Tage', dealsP: 'Echte Rabatte, begrenzte Zeit. Vor Buchungsschluss reservieren.', premP: 'Unsere beliebtesten Erlebnisse in einem Paket – die Planung übernehmen wir.', ask: 'Paketpreis anfragen', all: 'Alle ansehen', trust: 'Warum CappaViva' },
      fr: { next: 'Pour la prochaine sortie', gx: 'Explorer', ge: 'Expériences', gc: 'CappaViva', deals: 'Offres de dernière minute', premium: 'Forfaits Premium', hot: 'OFFRE', pop: 'Populaire', off: '-{n} %', closes: 'Fin des réservations dans', tomorrow: 'Pour la sortie de demain', today: 'Pour la sortie d\'aujourd\'hui', sep: 'Séparément : {p}', save: 'Économisez {n} %', days: '{n} jours', dealsP: 'De vraies réductions, pour peu de temps. Réservez avant l\'heure limite.', premP: 'Nos expériences préférées en un seul forfait — on s\'occupe de tout.', ask: 'Prix du forfait', all: 'Tout voir', trust: 'Pourquoi CappaViva' },
      es: { next: 'Para el próximo tour', gx: 'Explorar', ge: 'Experiencias', gc: 'CappaViva', deals: 'Ofertas de última hora', premium: 'Paquetes Premium', hot: 'OFERTA', pop: 'Popular', off: '{n}% dto.', closes: 'La reserva cierra en', tomorrow: 'Para el tour de mañana', today: 'Para el tour de hoy', sep: 'Por separado: {p}', save: 'Ahorra {n}%', days: '{n} días', dealsP: 'Descuentos reales por tiempo limitado. Reserva antes del cierre.', premP: 'Nuestras experiencias favoritas en un paquete; nosotros lo organizamos.', ask: 'Precio del paquete', all: 'Ver todo', trust: 'Por qué CappaViva' },
      it: { next: 'Per il prossimo tour', gx: 'Esplora', ge: 'Esperienze', gc: 'CappaViva', deals: 'Offerte last minute', premium: 'Pacchetti Premium', hot: 'OFFERTA', pop: 'Popolare', off: '-{n}%', closes: 'Prenotazioni chiuse tra', tomorrow: 'Per il tour di domani', today: 'Per il tour di oggi', sep: 'Separatamente: {p}', save: 'Risparmi il {n}%', days: '{n} giorni', dealsP: 'Sconti veri, tempo limitato. Prenota prima della chiusura.', premP: 'Le esperienze più amate in un unico pacchetto: pensiamo a tutto noi.', ask: 'Prezzo del pacchetto', all: 'Vedi tutto', trust: 'Perché CappaViva' },
      pt: { next: 'Para o próximo passeio', gx: 'Explorar', ge: 'Experiências', gc: 'CappaViva', deals: 'Ofertas de última hora', premium: 'Pacotes Premium', hot: 'OFERTA', pop: 'Popular', off: '{n}% off', closes: 'Reservas fecham em', tomorrow: 'Para o passeio de amanhã', today: 'Para o passeio de hoje', sep: 'Separado: {p}', save: 'Economize {n}%', days: '{n} dias', dealsP: 'Descontos reais por tempo limitado. Reserve antes do horário limite.', premP: 'As experiências favoritas num só pacote — deixe o planejamento conosco.', ask: 'Preço do pacote', all: 'Ver tudo', trust: 'Por que CappaViva' },
      ru: { next: 'На следующий тур', gx: 'Места', ge: 'Впечатления', gc: 'CappaViva', deals: 'Горящие предложения', premium: 'Премиум-пакеты', hot: 'АКЦИЯ', pop: 'Популярно', off: 'Скидка {n}%', closes: 'Бронирование закроется через', tomorrow: 'На завтрашний тур', today: 'На сегодняшний тур', sep: 'По отдельности: {p}', save: 'Экономия {n}%', days: '{n} дн.', dealsP: 'Настоящие скидки на ограниченное время. Бронируйте до закрытия.', premP: 'Самые любимые впечатления в одном пакете — планирование берём на себя.', ask: 'Узнать цену пакета', all: 'Смотреть все', trust: 'Почему CappaViva' },
      ar: { next: 'للجولة التالية', gx: 'استكشف', ge: 'التجارب', gc: 'CappaViva', deals: 'عروض اللحظة الأخيرة', premium: 'الباقات المميزة', hot: 'عرض', pop: 'الأكثر طلبًا', off: 'خصم {n}%', closes: 'يُغلق الحجز خلال', tomorrow: 'لجولة الغد', today: 'لجولة اليوم', sep: 'منفصلة: {p}', save: 'وفّر {n}%', days: '{n} أيام', dealsP: 'خصومات حقيقية لفترة محدودة. احجز قبل موعد الإغلاق.', premP: 'أجمل التجارب في باقة واحدة — اترك التخطيط لنا.', ask: 'اطلب سعر الباقة', all: 'عرض الكل', trust: 'لماذا CappaViva' },
      fa: { next: 'برای تور بعدی', gx: 'کاوش', ge: 'تجربه‌ها', gc: 'CappaViva', deals: 'پیشنهادهای لحظه آخری', premium: 'پکیج‌های ویژه', hot: 'پیشنهاد', pop: 'محبوب', off: '{n}٪ تخفیف', closes: 'پایان رزرو تا', tomorrow: 'برای تور فردا', today: 'برای تور امروز', sep: 'جداگانه: {p}', save: '{n}٪ صرفه‌جویی', days: '{n} روز', dealsP: 'تخفیف واقعی برای مدت محدود. پیش از پایان رزرو جای خود را بگیرید.', premP: 'محبوب‌ترین تجربه‌ها در یک پکیج؛ برنامه‌ریزی با ما.', ask: 'دریافت قیمت پکیج', all: 'دیدن همه', trust: 'چرا CappaViva' },
      zh: { next: '适用于下一次行程', gx: '探索', ge: '体验', gc: 'CappaViva', deals: '限时特惠', premium: '高端套餐', hot: '特惠', pop: '热门', off: '优惠 {n}%', closes: '预订截止还剩', tomorrow: '适用于明天的行程', today: '适用于今天的行程', sep: '单独购买：{p}', save: '节省 {n}%', days: '{n} 天', dealsP: '真实折扣，限时有效。请在截止前预订。', premP: '最受欢迎的体验一站打包，行程交给我们。', ask: '获取套餐价格', all: '查看全部', trust: '为什么选择 CappaViva' },
      ja: { next: '次回のツアー', gx: '探す', ge: '体験', gc: 'CappaViva', deals: '直前割引', premium: 'プレミアムパッケージ', hot: 'お得', pop: '人気', off: '{n}%オフ', closes: '予約締切まで', tomorrow: '明日のツアー', today: '本日のツアー', sep: '個別料金：{p}', save: '{n}%お得', days: '{n}日間', dealsP: '本当の割引を期間限定で。締切前にご予約ください。', premP: '人気の体験をひとつのパッケージに。計画はお任せください。', ask: 'パッケージ料金を見る', all: 'すべて見る', trust: 'CappaVivaが選ばれる理由' },
      ko: { next: '다음 투어', gx: '둘러보기', ge: '체험', gc: 'CappaViva', deals: '마감 임박 특가', premium: '프리미엄 패키지', hot: '특가', pop: '인기', off: '{n}% 할인', closes: '예약 마감까지', tomorrow: '내일 투어', today: '오늘 투어', sep: '개별 구매: {p}', save: '{n}% 절약', days: '{n}일', dealsP: '진짜 할인, 한정 시간. 마감 전에 예약하세요.', premP: '가장 사랑받는 체험을 한 패키지로. 일정은 저희에게 맡기세요.', ask: '패키지 가격 받기', all: '전체 보기', trust: 'CappaViva를 선택하는 이유' }
    }
  };

  const lang = () => (window.CVI18N && CVI18N.lang) || 'en';
  O.t = (k, v) => { let s = (O.L[lang()] || {})[k] ?? O.L.en[k] ?? k; if (v) s = s.replace(/\{(\w+)\}/g, (m, x) => v[x] ?? m); return s; };
  O.isPop = id => O.popular.includes(id);
  O.pkgName = p => (p[lang()] || p.en)[0];
  O.pkgDesc = p => (p[lang()] || p.en)[1];

  /* kapanış saati bugün geçti mi? */
  O.passed = until => {
    const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const g = k => +p.find(x => x.type === k).value, [h, m] = until.split(':').map(Number);
    return g('hour') * 60 + g('minute') >= h * 60 + m;
  };
  /* İstanbul saatine göre kapanışa kalan süre ("03:12:45") */
  O.left = until => {
    const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).formatToParts(new Date());
    const g = k => +p.find(x => x.type === k).value;
    const now = g('hour') * 3600 + g('minute') * 60 + g('second');
    const [h, m] = until.split(':').map(Number);
    let d = h * 3600 + m * 60 - now; if (d <= 0) d += 86400;
    const pad = n => String(n).padStart(2, '0');
    return pad(Math.floor(d / 3600)) + ':' + pad(Math.floor(d % 3600 / 60)) + ':' + pad(d % 60);
  };
  /* geri sayımlar her saniye güncellenir */
  setInterval(() => document.querySelectorAll('[data-cd]').forEach(el => { el.textContent = O.left(el.dataset.cd); }), 1000);

  window.CVOffers = O;
})();