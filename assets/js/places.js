/* =========================================================
   CappaViva — DESTİNASYONLAR (bölgeler, vadiler, müzeler,
   kiliseler, yer altı şehirleri)
   Yeni yer eklemek: aşağıdaki "items" listesine bir satır ekleyin.
   k    : benzersiz kısa ad (sayfa bağlantısı #d-k olur, fotoğraf anahtarı da budur)
   c    : kategori (bolge, vadi, muze, kilise, yeralti)
   km   : Göreme'ye yaklaşık uzaklık
   tours: bu yere uğrayan turlar (data.js'teki tur kimlikleri)
   tr/en: [isim, kısa açıklama]  — diğer diller İngilizceyi kullanır
   i18n : true ise isim/açıklama dil dosyalarından (d.k.t / d.k.p) gelir
   Fotoğraf: data.js > images içine  k: 'assets/img/dosya.jpg'  yazın.
   ========================================================= */
(function () {
  const cats = [
    { k: 'bolge',   ic: 'i-pin'   },
    { k: 'vadi',    ic: 'i-route' },
    { k: 'muze',    ic: 'i-star'  },
    { k: 'kilise',  ic: 'i-shield'},
    { k: 'yeralti', ic: 'i-globe' }
  ];

  const items = [
    /* ---------- BÖLGELER / KASABALAR ---------- */
    { k: 'goreme', page: true, c: 'bolge', km: 0, tours: ['kirmizi', 'mix', 'balon-std'], i18n: true, scene: { p: 'dawn', seed: 61, balloons: 20, chim: 1.3 } },
    { k: 'uchisar', c: 'bolge', km: 4, tours: ['kirmizi', 'mix'], i18n: true, scene: { p: 'morning', seed: 62, balloons: 3, chim: .8, castle: true } },
    { k: 'ortahisar', c: 'bolge', km: 6, tours: ['vip', 'jeep'], i18n: true, scene: { p: 'dawn', seed: 68, balloons: 10, chim: .9, castle: true } },
    { k: 'urgup', c: 'bolge', km: 8, tours: ['kirmizi', 'vip'], scene: { p: 'sunset', seed: 81, chim: 1.2 },
      tr: ['Ürgüp', 'Şarap evleri, taş konaklar ve Üç Güzeller peribacalarıyla bölgenin zarif kasabası.'],
      en: ['Ürgüp', 'Elegant town of wine houses, stone mansions and the famous Three Beauties fairy chimneys.'] },
    { k: 'avanos', c: 'bolge', km: 10, tours: ['comlektur', 'kirmizi'], i18n: true, scene: { p: 'green', seed: 65, balloons: 2, chim: .4, river: true } },
    { k: 'cavusin', c: 'bolge', km: 3, tours: ['kirmizi', 'atv'], scene: { p: 'morning', seed: 82, chim: 1.4, castle: true },
      tr: ['Çavuşin', 'Kaya yüzüne oyulmuş terk edilmiş evleri ve kiliseleriyle masalsı bir tepe köyü.'],
      en: ['Çavuşin', 'A hillside village of abandoned cave houses and churches carved into the rock face.'] },
    { k: 'mustafapasa', c: 'bolge', km: 12, tours: ['vip', 'jeep'], scene: { p: 'dusk', seed: 83, chim: .7 },
      tr: ['Mustafapaşa', 'Eski adıyla Sinasos: Rum konakları, taş işçiliği ve sakin Arnavut kaldırımlı sokaklar.'],
      en: ['Mustafapaşa', 'Once called Sinasos: Greek mansions, fine stone carving and quiet cobbled lanes.'] },

    /* ---------- VADİLER ---------- */
    { k: 'kizil', c: 'vadi', km: 5, tours: ['atv', 'at', 'jeep'], i18n: true, scene: { p: 'sunset', seed: 64, chim: 1.5 } },
    { k: 'gullu', c: 'vadi', km: 4, tours: ['at', 'atv'], scene: { p: 'sunset', seed: 84, chim: 1.1 },
      tr: ['Güllüdere Vadisi', 'Pembe kaya katmanları ve gizli kiliseleriyle yürüyüşçülerin gözdesi.'],
      en: ['Rose Valley', 'Pink-hued rock layers and hidden churches — a favourite hiking trail.'] },
    { k: 'guvercin', c: 'vadi', km: 2, tours: ['kirmizi', 'mix'], scene: { p: 'morning', seed: 85, balloons: 6, chim: .9 },
      tr: ['Güvercinlik Vadisi', 'Kayalara oyulmuş binlerce güvercinlikle Uçhisar\'a uzanan yeşil vadi.'],
      en: ['Pigeon Valley', 'A green valley dotted with thousands of carved dovecotes, leading up to Uçhisar.'] },
    { k: 'ask', c: 'vadi', km: 3, tours: ['atv', 'at'], scene: { p: 'dawn', seed: 86, balloons: 14, chim: 2.2 },
      tr: ['Aşk Vadisi', 'Göğe uzanan dev peribacalarıyla bölgenin en fotojenik vadilerinden.'],
      en: ['Love Valley', 'Towering, sky-high fairy chimneys — one of the most photogenic valleys.'] },
    { k: 'pasabag', c: 'vadi', km: 5, tours: ['kirmizi', 'mix'], i18n: true, scene: { p: 'morning', seed: 63, chim: 2.4 } },
    { k: 'devrent', c: 'vadi', km: 8, tours: ['kirmizi', 'jeep'], scene: { p: 'dusk', seed: 87, chim: 1.8 },
      tr: ['Devrent (Hayal) Vadisi', 'Hayvan şekilli kayalarıyla ünlü vadi — meşhur deve kayası burada.'],
      en: ['Devrent (Imagination) Valley', 'Famous for animal-shaped rocks, including the well-known camel rock.'] },
    { k: 'zemi', c: 'vadi', km: 2, tours: ['at'], scene: { p: 'green', seed: 88, chim: .8 },
      tr: ['Zemi Vadisi', 'Göreme\'nin hemen yanında, kalabalıktan uzak sessiz bir yürüyüş vadisi.'],
      en: ['Zemi Valley', 'A quiet, crowd-free hiking valley right next to Göreme.'] },
    { k: 'ihlara', c: 'vadi', km: 85, tours: ['yesil', 'mix'], i18n: true, scene: { p: 'green', seed: 67, chim: .3, river: true } },
    { k: 'soganli', c: 'vadi', km: 45, tours: ['vip'], scene: { p: 'green', seed: 89, chim: .6 },
      tr: ['Soğanlı Vadisi', 'Kaya kiliseleri ve el yapımı bez bebekleriyle ünlü, kalabalıktan uzak vadi.'],
      en: ['Soğanlı Valley', 'Off-the-beaten-path valley of rock-cut churches, famous for its handmade dolls.'] },

    /* ---------- MÜZELER ---------- */
    { k: 'gam', c: 'muze', km: 1, tours: ['kirmizi', 'mix'], scene: { p: 'morning', seed: 90, balloons: 4, chim: 1.2 },
      tr: ['Göreme Açık Hava Müzesi', 'UNESCO listesindeki kaya kiliseleri ve freskleriyle Kapadokya\'nın kalbi.'],
      en: ['Göreme Open-Air Museum', 'UNESCO-listed rock-cut churches and frescoes — the heart of Cappadocia.'] },
    { k: 'zelve', c: 'muze', km: 6, tours: ['kirmizi'], scene: { p: 'sunset', seed: 91, chim: 1.6 },
      tr: ['Zelve Açık Hava Müzesi', '1950\'lere dek yaşanan, üç vadiye yayılmış terk edilmiş kaya kenti.'],
      en: ['Zelve Open-Air Museum', 'An abandoned rock town spread over three valleys, inhabited until the 1950s.'] },
    { k: 'nevmuze', c: 'muze', km: 13, tours: ['vip'], scene: { p: 'dusk', seed: 92, chim: .5 },
      tr: ['Nevşehir Müzesi', 'Bölgenin Hititlerden Osmanlı\'ya uzanan tarihini anlatan arkeoloji müzesi.'],
      en: ['Nevşehir Museum', 'Archaeology museum tracing the region from the Hittites to the Ottomans.'] },
    { k: 'guray', c: 'muze', km: 10, tours: ['comlektur'], scene: { p: 'night', seed: 93, chim: .6, river: true },
      tr: ['Güray Seramik Müzesi', 'Avanos\'ta yer altına oyulmuş, dünyanın en büyük yer altı seramik müzesi.'],
      en: ['Güray Ceramics Museum', 'The world\'s largest underground ceramics museum, carved beneath Avanos.'] },

    /* ---------- KİLİSELER ---------- */
    { k: 'tokali', c: 'kilise', km: 1, tours: ['kirmizi', 'mix'], scene: { p: 'dusk', seed: 94, chim: 1 },
      tr: ['Tokalı Kilise', 'Göreme\'nin en büyük kilisesi; göz alıcı lacivert freskleriyle ünlü.'],
      en: ['Tokalı Church', 'Göreme\'s largest church, with dazzling deep-blue frescoes.'] },
    { k: 'karanlik', c: 'kilise', km: 1, tours: ['kirmizi', 'mix'], scene: { p: 'night', seed: 95, chim: 1.1 },
      tr: ['Karanlık Kilise', 'Az ışık aldığı için renkleri ilk günkü gibi korunmuş freskler.'],
      en: ['Dark Church', 'Little daylight kept its frescoes vivid — the best-preserved in Göreme.'] },
    { k: 'elmali', c: 'kilise', km: 1, tours: ['kirmizi'], scene: { p: 'morning', seed: 96, chim: 1 },
      tr: ['Elmalı Kilise', 'Dört sütun üzerinde kubbeli küçük kilise ve 11. yüzyıl freskleri.'],
      en: ['Apple Church', 'A small domed church on four columns with 11th-century frescoes.'] },
    { k: 'vaftizci', c: 'kilise', km: 3, tours: ['kirmizi', 'atv'], scene: { p: 'sunset', seed: 97, chim: 1.3, castle: true },
      tr: ['Vaftizci Yahya Kilisesi', 'Çavuşin köyünün tepesinde, Kapadokya\'nın bilinen en eski kiliselerinden.'],
      en: ['Church of St John the Baptist', 'Among Cappadocia\'s oldest known churches, high above Çavuşin village.'] },
    { k: 'konstantin', c: 'kilise', km: 12, tours: ['vip'], scene: { p: 'dawn', seed: 98, chim: .6 },
      tr: ['Aziz Konstantin ve Helena Kilisesi', 'Mustafapaşa\'da, taş işçiliğiyle göz kamaştıran 18. yüzyıl Rum kilisesi.'],
      en: ['Church of St Constantine & Helena', 'An 18th-century Greek church in Mustafapaşa, admired for its stone carving.'] },
    { k: 'selime', c: 'kilise', km: 80, tours: ['yesil'], scene: { p: 'sunset', seed: 99, chim: 1.4, castle: true },
      tr: ['Selime Katedrali', 'Ihlara Vadisi\'nin bitişinde, kayaya oyulmuş dev bir manastır kompleksi.'],
      en: ['Selime Cathedral', 'A vast rock-cut monastery complex at the end of the Ihlara Valley.'] },

    /* ---------- YER ALTI ŞEHİRLERİ ---------- */
    { k: 'derin', c: 'yeralti', km: 30, tours: ['yesil', 'mix'], i18n: true, scene: { p: 'night', seed: 66, chim: 1 } },
    { k: 'kaymakli', c: 'yeralti', km: 20, tours: ['yesil', 'mix'], scene: { p: 'night', seed: 100, chim: .8 },
      tr: ['Kaymaklı Yer Altı Şehri', 'Dar tünellerle bağlanan katları, ahırları ve şaraphaneleriyle yer altı kenti.'],
      en: ['Kaymaklı Underground City', 'Narrow tunnels linking levels of stables, storerooms and wineries.'] },
    { k: 'ozkonak', c: 'yeralti', km: 25, tours: ['comlektur'], scene: { p: 'night', seed: 101, chim: .5 },
      tr: ['Özkonak Yer Altı Şehri', 'Avanos yakınında; katlar arası havalandırma ve konuşma kanallarıyla ünlü.'],
      en: ['Özkonak Underground City', 'Near Avanos, known for its clever ventilation and "talking" pipes between floors.'] },
    { k: 'mazi', c: 'yeralti', km: 27, tours: ['vip'], scene: { p: 'night', seed: 102, chim: .7 },
      tr: ['Mazı Yer Altı Şehri', 'Kalabalıktan uzak, dar geçitli ve otantik bir yer altı şehri.'],
      en: ['Mazı Underground City', 'An authentic, crowd-free underground city with narrow passages.'] }
  ];

  /* Sayfa yazıları — 13 dil */
  const L = {
    tr: { bolge: 'Bölgeler', vadi: 'Vadiler', muze: 'Müzeler', kilise: 'Kiliseler', yeralti: 'Yer Altı Şehirleri',
      'i.bolge': 'Peribacalarının arasına kurulmuş, her biri ayrı karakterde kasabalar.', 'i.vadi': 'Yürüyüş, ATV ve at turlarının geçtiği renkli vadiler.', 'i.muze': 'Kapadokya\'nın binlerce yıllık hikâyesini anlatan müzeler.', 'i.kilise': 'Kayaya oyulmuş, freskleriyle büyüleyen kiliseler.', 'i.yeralti': 'Yerin katlarca altına inen gizemli şehirler.',
      all: 'Tümü', title: 'Kapadokya\'yı keşfet.', sub: 'Bölgeler, vadiler, müzeler, kiliseler ve yer altı şehirleri — hepsi tek sayfada.', n: '{n} yer', km: 'Göreme\'ye ~{n} km', center: 'Göreme merkez', tours: 'Uğrayan turlar', guide: 'Rehberle gez', more: 'Tümünü gör' },
    en: { bolge: 'Towns & Regions', vadi: 'Valleys', muze: 'Museums', kilise: 'Churches', yeralti: 'Underground Cities',
      'i.bolge': 'Towns set among the fairy chimneys, each with its own character.', 'i.vadi': 'Colourful valleys crossed by hiking, ATV and horse-riding tours.', 'i.muze': 'Museums telling Cappadocia\'s story across thousands of years.', 'i.kilise': 'Rock-cut churches with breathtaking frescoes.', 'i.yeralti': 'Mysterious cities reaching many floors below ground.',
      all: 'All', title: 'Discover Cappadocia.', sub: 'Towns, valleys, museums, churches and underground cities — all on one page.', n: '{n} places', km: '~{n} km from Göreme', center: 'Göreme centre', tours: 'Visited on', guide: 'Explore with a guide', more: 'See all' },
    de: { bolge: 'Orte & Regionen', vadi: 'Täler', muze: 'Museen', kilise: 'Kirchen', yeralti: 'Unterirdische Städte',
      'i.bolge': 'Orte zwischen den Feenkaminen – jeder mit eigenem Charakter.', 'i.vadi': 'Farbige Täler für Wanderungen, ATV- und Reittouren.', 'i.muze': 'Museen, die Kappadokiens jahrtausendealte Geschichte erzählen.', 'i.kilise': 'In den Fels gehauene Kirchen mit atemberaubenden Fresken.', 'i.yeralti': 'Geheimnisvolle Städte, viele Stockwerke unter der Erde.',
      all: 'Alle', title: 'Entdecke Kappadokien.', sub: 'Orte, Täler, Museen, Kirchen und unterirdische Städte – alles auf einer Seite.', n: '{n} Orte', km: '~{n} km von Göreme', center: 'Zentrum Göreme', tours: 'Enthalten in', guide: 'Mit Guide erkunden', more: 'Alle ansehen' },
    fr: { bolge: 'Villes & régions', vadi: 'Vallées', muze: 'Musées', kilise: 'Églises', yeralti: 'Cités souterraines',
      'i.bolge': 'Des villages nichés parmi les cheminées de fée, chacun avec son caractère.', 'i.vadi': 'Des vallées colorées pour la randonnée, le quad et l\'équitation.', 'i.muze': 'Des musées qui racontent des millénaires d\'histoire.', 'i.kilise': 'Des églises troglodytes aux fresques saisissantes.', 'i.yeralti': 'Des cités mystérieuses sur plusieurs niveaux sous terre.',
      all: 'Tout', title: 'Découvrez la Cappadoce.', sub: 'Villes, vallées, musées, églises et cités souterraines — tout sur une page.', n: '{n} lieux', km: '~{n} km de Göreme', center: 'Centre de Göreme', tours: 'Au programme de', guide: 'Visiter avec un guide', more: 'Tout voir' },
    es: { bolge: 'Pueblos y regiones', vadi: 'Valles', muze: 'Museos', kilise: 'Iglesias', yeralti: 'Ciudades subterráneas',
      'i.bolge': 'Pueblos entre chimeneas de hadas, cada uno con su carácter.', 'i.vadi': 'Valles de colores para senderismo, quad y paseos a caballo.', 'i.muze': 'Museos que cuentan miles de años de historia.', 'i.kilise': 'Iglesias excavadas en la roca con frescos impresionantes.', 'i.yeralti': 'Ciudades misteriosas de varios pisos bajo tierra.',
      all: 'Todo', title: 'Descubre Capadocia.', sub: 'Pueblos, valles, museos, iglesias y ciudades subterráneas: todo en una página.', n: '{n} lugares', km: '~{n} km de Göreme', center: 'Centro de Göreme', tours: 'Incluido en', guide: 'Visitar con guía', more: 'Ver todo' },
    it: { bolge: 'Borghi e regioni', vadi: 'Valli', muze: 'Musei', kilise: 'Chiese', yeralti: 'Città sotterranee',
      'i.bolge': 'Borghi tra i camini delle fate, ognuno con il suo carattere.', 'i.vadi': 'Valli colorate per trekking, quad e passeggiate a cavallo.', 'i.muze': 'Musei che raccontano millenni di storia.', 'i.kilise': 'Chiese rupestri con affreschi mozzafiato.', 'i.yeralti': 'Città misteriose su più livelli sottoterra.',
      all: 'Tutti', title: 'Scopri la Cappadocia.', sub: 'Borghi, valli, musei, chiese e città sotterranee: tutto in una pagina.', n: '{n} luoghi', km: '~{n} km da Göreme', center: 'Centro di Göreme', tours: 'Incluso in', guide: 'Visita con una guida', more: 'Vedi tutto' },
    pt: { bolge: 'Vilas e regiões', vadi: 'Vales', muze: 'Museus', kilise: 'Igrejas', yeralti: 'Cidades subterrâneas',
      'i.bolge': 'Vilas entre as chaminés de fada, cada uma com seu caráter.', 'i.vadi': 'Vales coloridos para caminhadas, quadriciclo e cavalgadas.', 'i.muze': 'Museus que contam milhares de anos de história.', 'i.kilise': 'Igrejas escavadas na rocha com afrescos deslumbrantes.', 'i.yeralti': 'Cidades misteriosas com vários andares sob a terra.',
      all: 'Todos', title: 'Descubra a Capadócia.', sub: 'Vilas, vales, museus, igrejas e cidades subterrâneas — tudo numa página.', n: '{n} lugares', km: '~{n} km de Göreme', center: 'Centro de Göreme', tours: 'Incluído em', guide: 'Visitar com guia', more: 'Ver tudo' },
    ru: { bolge: 'Города и районы', vadi: 'Долины', muze: 'Музеи', kilise: 'Церкви', yeralti: 'Подземные города',
      'i.bolge': 'Городки среди «каменных грибов», у каждого свой характер.', 'i.vadi': 'Цветные долины для прогулок, квадроциклов и конных туров.', 'i.muze': 'Музеи, рассказывающие тысячелетнюю историю края.', 'i.kilise': 'Пещерные церкви с потрясающими фресками.', 'i.yeralti': 'Таинственные города на много этажей под землёй.',
      all: 'Все', title: 'Откройте Каппадокию.', sub: 'Города, долины, музеи, церкви и подземные города — всё на одной странице.', n: 'Мест: {n}', km: '~{n} км от Гёреме', center: 'Центр Гёреме', tours: 'В турах', guide: 'С гидом', more: 'Смотреть все' },
    ar: { bolge: 'البلدات والمناطق', vadi: 'الوديان', muze: 'المتاحف', kilise: 'الكنائس', yeralti: 'المدن تحت الأرض',
      'i.bolge': 'بلدات بين المداخن الخرافية، لكل منها طابعها الخاص.', 'i.vadi': 'وديان ملوّنة لرحلات المشي والدراجات الرباعية وركوب الخيل.', 'i.muze': 'متاحف تروي آلاف السنين من تاريخ كابادوكيا.', 'i.kilise': 'كنائس منحوتة في الصخر بجداريات مذهلة.', 'i.yeralti': 'مدن غامضة تمتد طوابق عديدة تحت الأرض.',
      all: 'الكل', title: 'اكتشف كابادوكيا.', sub: 'البلدات والوديان والمتاحف والكنائس والمدن تحت الأرض — كلها في صفحة واحدة.', n: '{n} مكانًا', km: '~{n} كم من غوريمه', center: 'مركز غوريمه', tours: 'ضمن جولات', guide: 'استكشف مع مرشد', more: 'عرض الكل' },
    fa: { bolge: 'شهرها و مناطق', vadi: 'دره‌ها', muze: 'موزه‌ها', kilise: 'کلیساها', yeralti: 'شهرهای زیرزمینی',
      'i.bolge': 'شهرک‌هایی میان دودکش‌های پریان، هر کدام با حال‌وهوای خود.', 'i.vadi': 'دره‌های رنگارنگ برای پیاده‌روی، موتور چهارچرخ و سوارکاری.', 'i.muze': 'موزه‌هایی که هزاران سال تاریخ کاپادوکیه را روایت می‌کنند.', 'i.kilise': 'کلیساهای صخره‌ای با نقاشی‌های دیواری خیره‌کننده.', 'i.yeralti': 'شهرهای رازآلود با طبقات فراوان زیر زمین.',
      all: 'همه', title: 'کاپادوکیه را کشف کنید.', sub: 'شهرها، دره‌ها، موزه‌ها، کلیساها و شهرهای زیرزمینی — همه در یک صفحه.', n: '{n} مکان', km: '~{n} کیلومتر تا گورمه', center: 'مرکز گورمه', tours: 'در تورهای', guide: 'گشت با راهنما', more: 'دیدن همه' },
    zh: { bolge: '城镇与地区', vadi: '山谷', muze: '博物馆', kilise: '教堂', yeralti: '地下城',
      'i.bolge': '坐落在精灵烟囱之间、各具特色的小镇。', 'i.vadi': '适合徒步、ATV 和骑马的彩色山谷。', 'i.muze': '讲述卡帕多奇亚千年历史的博物馆。', 'i.kilise': '凿岩而建、壁画震撼的教堂。', 'i.yeralti': '深入地下多层的神秘城市。',
      all: '全部', title: '探索卡帕多奇亚。', sub: '城镇、山谷、博物馆、教堂和地下城——尽在一页。', n: '{n} 个地点', km: '距格雷梅约 {n} 公里', center: '格雷梅中心', tours: '包含在', guide: '跟随导游游览', more: '查看全部' },
    ja: { bolge: '町とエリア', vadi: '渓谷', muze: '博物館', kilise: '教会', yeralti: '地下都市',
      'i.bolge': '妖精の煙突の間に広がる、個性豊かな町。', 'i.vadi': 'ハイキング、ATV、乗馬で巡るカラフルな渓谷。', 'i.muze': 'カッパドキアの数千年の歴史を伝える博物館。', 'i.kilise': '岩をくり抜いた、壮麗なフレスコ画の教会。', 'i.yeralti': '地下深く何層にも続く神秘の都市。',
      all: 'すべて', title: 'カッパドキアを発見。', sub: '町、渓谷、博物館、教会、地下都市 — すべてを1ページで。', n: '{n}か所', km: 'ギョレメから約{n}km', center: 'ギョレメ中心', tours: '含まれるツアー', guide: 'ガイドと巡る', more: 'すべて見る' },
    ko: { bolge: '마을과 지역', vadi: '계곡', muze: '박물관', kilise: '교회', yeralti: '지하 도시',
      'i.bolge': '요정의 굴뚝 사이에 자리한 개성 있는 마을들.', 'i.vadi': '하이킹, ATV, 승마 투어가 지나는 다채로운 계곡.', 'i.muze': '카파도키아의 수천 년 역사를 들려주는 박물관.', 'i.kilise': '바위를 깎아 만든, 프레스코화가 아름다운 교회.', 'i.yeralti': '땅속 여러 층으로 이어지는 신비한 도시.',
      all: '전체', title: '카파도키아를 발견하세요.', sub: '마을, 계곡, 박물관, 교회, 지하 도시 — 한 페이지에.', n: '{n}곳', km: '괴레메에서 약 {n}km', center: '괴레메 중심', tours: '포함 투어', guide: '가이드와 둘러보기', more: '전체 보기' }
  };

  const lang = () => (window.CVI18N && CVI18N.lang) || 'en';
  const t = (k, v) => { let s = (L[lang()] || {})[k] ?? L.en[k] ?? k; if (v) s = s.replace(/\{(\w+)\}/g, (m, x) => v[x] ?? m); return s; };
  const tt = k => (window.CVI18N ? CVI18N.t(k) : k);
  const name = p => p.i18n ? tt('d.' + p.k + '.t') : (p[lang()] || p.en)[0];
  const desc = p => p.i18n ? tt('d.' + p.k + '.p') : (p[lang()] || p.en)[1];
  const dist = p => p.km === 0 ? t('center') : t('km', { n: p.km });
  const byCat = c => items.filter(p => p.c === c);

  const url = p => p.page ? 'destinasyon.html?d=' + p.k : 'destinasyonlar.html#d-' + p.k;
  const get = k => items.find(p => p.k === k);

  window.CVPlaces = { cats, items, L, t, name, desc, dist, byCat, url, get };})();