/* =========================================================
   CappaViva — LOCAL GUIDE (guide.js)
   1) Ana sayfada kısa, premium "rehber kartı"
   2) local-rehber.html: misafire bir dost gibi anlatılan
      Kapadokya'nın incelikleri (ulaşım, döviz, tuvalet, gün doğumu…)
   Yeni ipucu eklemek: aşağıdaki "cats" içindeki listeye satır ekleyin.
   ========================================================= */
(function () {
  const G = {
    /* REHBER BİLGİLERİ — kendi bilgilerinizle değiştirin */
    profile: {
      name: 'Mehmet',                          // kartta görünecek isim
      photo: 'assets/img/guide.jpg',           // fotoğrafınız (yoksa zarif bir harf rozeti görünür)
      langs: ''                                // konuştuğunuz diller, ör. 'Türkçe · English' (boşsa görünmez)
    },
    /* ÖNERDİĞİNİZ OTELLER — boşsa bu kutu görünmez.
       Örnek: { n: 'Otel adı', area: 'Göreme', note: { tr: 'Balon manzaralı teras', en: 'Terrace with balloon views' } } */
    hotels: [],

    cats: [
      { k: 'ulasim', ic: '🚌', tr: 'Ulaşım & kolay yollar', en: 'Getting around', tips: [
        { tr: ['Havalimanından Göreme\'ye', 'Kayseri (ASR) ve Nevşehir (NAV) havalimanlarından en rahat yol önceden ayarlanmış transferdir. Uçuş saatine göre çalışan ortak servisler de var; havalimanında taksi pahalıya gelebilir.'], en: ['From the airport to Göreme', 'The easiest way from Kayseri (ASR) and Nevşehir (NAV) airports is a pre-booked transfer. Shared shuttles also run according to flight times; airport taxis can be expensive.'] },
        { tr: ['Kasabalar arası otobüs', 'Nevşehir–Uçhisar–Göreme–Avanos ve Ürgüp–Göreme–Avanos arasında gün boyunca belediye otobüsleri ve minibüsler çalışır. Akşam son seferler erken biter; saatleri otelinize sorun.'], en: ['Buses between towns', 'Municipal buses and minibuses run during the day between Nevşehir–Uçhisar–Göreme–Avanos and Ürgüp–Göreme–Avanos. Last services leave early in the evening; ask your hotel for times.'] },
        { tr: ['Taksi', 'Göreme merkezinde taksi durağı var. Kısa mesafede taksimetreyi açtırın, uzun mesafede fiyatı binmeden konuşun.'], en: ['Taxis', 'There is a taxi rank in central Göreme. Ask for the meter on short rides and agree the price before longer trips.'] },
        { tr: ['Yürüyerek', 'Göreme–Uçhisar arası Güvercinlik Vadisi\'nden, Göreme–Çavuşin arası Aşk Vadisi çevresinden yürünebilir. Su, şapka ve çevrimdışı harita şart.'], en: ['On foot', 'You can walk Göreme–Uçhisar through Pigeon Valley and Göreme–Çavuşin around Love Valley. Bring water, a hat and an offline map.'] },
        { tr: ['Araç ya da scooter', 'Kiralamak özgürlük sağlar; ancak vadi yolları tozlu ve virajlıdır. Kask takın, karanlıkta sürmekten kaçının.'], en: ['Car or scooter', 'Renting gives freedom, but valley roads are dusty and winding. Wear a helmet and avoid riding after dark.'] }
      ] },
      { k: 'para', ic: '💱', tr: 'Para, döviz & bahşiş', en: 'Money, exchange & tipping', tips: [
        { tr: ['Döviz en iyi nerede bozulur?', 'Genelde kasaba merkezlerindeki döviz bürolarında; havalimanı ve otel kurları çoğu zaman daha kötüdür. Alış-satış farkına bakın, komisyon olup olmadığını sorun.'], en: ['Where to exchange money', 'Usually at exchange offices in town centres; airport and hotel rates are often worse. Compare buy/sell rates and ask about commission.'] },
        { tr: ['ATM kullanırken', 'Banka ATM\'lerini tercih edin. Ekranda "kendi para biriminizle çekim" önerilirse reddedip TL olarak çekin; kur farkı daha az olur.'], en: ['Using ATMs', 'Prefer bank ATMs. If the screen offers conversion to your home currency, decline and withdraw in Turkish lira — the rate is better.'] },
        { tr: ['Kart mı nakit mi?', 'Restoran ve mağazaların çoğu kart kabul eder; otobüs, tuvalet ve küçük dükkanlar için yanınızda biraz bozuk TL bulundurun.'], en: ['Card or cash?', 'Most restaurants and shops accept cards; keep some small lira for buses, toilets and little shops.'] },
        { tr: ['Bahşiş', 'Restoranlarda %5–10 bahşiş yaygındır. Rehber ve şoförlere bahşiş zorunlu değildir; memnun kaldıysanız takdir edilir.'], en: ['Tipping', 'A 5–10% tip is common in restaurants. Tipping guides and drivers is optional but appreciated if you were happy.'] },
        { tr: ['Pazarlık', 'Halı, seramik ve hediyelik eşyada pazarlık normaldir; restoranlarda ve fiyatı yazılı yerlerde yapılmaz.'], en: ['Bargaining', 'Bargaining is normal for carpets, ceramics and souvenirs — not in restaurants or where prices are displayed.'] }
      ] },
      { k: 'pratik', ic: '🚻', tr: 'Tuvalet, su & pratik bilgiler', en: 'Toilets, water & essentials', tips: [
        { tr: ['Umumi tuvaletler', 'Göreme otogarında ve müzelerin girişinde tuvalet vardır, genelde küçük bir ücret alınır. Kafe ve restoranlarda müşteri olarak kullanabilirsiniz; yanınızda bozuk para olsun.'], en: ['Public toilets', 'There are toilets at Göreme bus station and at museum entrances, usually for a small fee. Cafés and restaurants let customers use theirs — keep some coins handy.'] },
        { tr: ['Su', 'Musluk suyu yerine şişe su tercih edin. Vadi yürüyüşlerinde kişi başı en az 1 litre su alın.'], en: ['Water', 'Prefer bottled water to tap water. Take at least 1 litre per person on valley hikes.'] },
        { tr: ['Eczane & acil durum', 'Kasabalarda eczane bulunur; gece açık olan "nöbetçi eczane" kapılardaki listede yazar. Acil durumlarda 112\'yi arayın.'], en: ['Pharmacy & emergencies', 'Every town has pharmacies; the one open at night ("nöbetçi eczane") is listed on their doors. In an emergency call 112.'] },
        { tr: ['İnternet', 'Havalimanı ya da Nevşehir\'deki operatör mağazalarından turist hattı veya eSIM alabilirsiniz. Otel ve kafelerin çoğunda Wi-Fi vardır.'], en: ['Internet', 'Get a tourist SIM or eSIM at the airport or operator stores in Nevşehir. Most hotels and cafés have Wi-Fi.'] },
        { tr: ['Ne giymeli?', 'Sabahlar yazın bile serindir; balon için katmanlı giyinin. Yazın öğleler sıcak, kışın kar ve buzlanma olabilir. Rahat ayakkabı şart.'], en: ['What to wear', 'Mornings are cool even in summer — dress in layers for the balloon. Summer afternoons are hot; winter can bring snow and ice. Comfortable shoes are a must.'] }
      ] },
      { k: 'gunes', ic: '🌅', tr: 'Gün doğumu & gün batımı', en: 'Sunrise & sunset', live: true, tips: [
        { tr: ['Balonları izlemek', 'Uçmayacaksanız da gün doğumunda Göreme\'nin üstündeki tepelere çıkın; yüzlerce balon tam önünüzden yükselir. Gün doğumundan 30–45 dakika önce orada olun.'], en: ['Watching the balloons', 'Even if you don\'t fly, climb the hills above Göreme at sunrise — hundreds of balloons rise right in front of you. Be there 30–45 minutes before sunrise.'] },
        { tr: ['En sevilen noktalar', 'Göreme\'nin üstündeki gün batımı tepesi, Uçhisar Kalesi çevresi ve Aşk Vadisi seyir noktası balon sabahlarının klasikleri.'], en: ['Favourite viewpoints', 'The sunset hill above Göreme, the area around Uçhisar Castle and the Love Valley viewpoint are balloon-morning classics.'] },
        { tr: ['Gün batımı', 'Kızılçukur (Kırmızı Vadi) seyir noktası ve Uçhisar Kalesi gün batımının en güzel yerleri. Akşamüstü kalabalık olur, erken gidin.'], en: ['Sunset', 'The Red Valley viewpoint and Uçhisar Castle are the best sunset spots. They get busy, so go early.'] },
        { tr: ['Balon iptal olursa', 'Uçuşlar rüzgâra bağlıdır ve her sabah resmi izinle yapılır. Balonu konaklamanızın ilk sabahına koyarsanız iptalde sonraki sabahlar yedek olur.'], en: ['If the balloon is cancelled', 'Flights depend on wind and need official permission each morning. Book your first morning so the next mornings can serve as backup.'] }
      ] },
      { k: 'kalis', ic: '🏨', tr: 'Nerede kalmalı?', en: 'Where to stay', hotels: true, tips: [
        { tr: ['Göreme', 'Hareketli merkez: restoranlar, turların çoğunun çıkış noktası ve balonlara en yakın kasaba. İlk kez gelenler için ideal.'], en: ['Göreme', 'The lively centre: restaurants, most tour departures and the town closest to the balloons. Ideal for first-timers.'] },
        { tr: ['Uçhisar', 'Sakin, manzaralı ve romantik. Çiftler ve balayı için çok sevilir.'], en: ['Uçhisar', 'Quiet, scenic and romantic. A favourite with couples and honeymooners.'] },
        { tr: ['Ürgüp', 'Şık taş konaklar, şarap evleri ve iyi restoranlar. Konforu ve sakinliği sevenler için.'], en: ['Ürgüp', 'Stylish stone mansions, wine houses and good restaurants. For those who love comfort and calm.'] },
        { tr: ['Avanos', 'Nehir kenarı, çömlek atölyeleri ve yerel hayat. Ailelere ve uzun konaklamalara uygun.'], en: ['Avanos', 'Riverside, pottery workshops and local life. Great for families and longer stays.'] },
        { tr: ['Mağara otel ipucu', 'Mağara odalar serin ve özeldir; merdiven çok olabilir. Hareket kısıtlılığınız varsa giriş katı oda isteyin.'], en: ['Cave hotel tip', 'Cave rooms are cool and special but can involve many stairs. Ask for a ground-floor room if you have limited mobility.'] }
      ] },
      { k: 'plan', ic: '🗓️', tr: 'Hangi tur, hangi gün?', en: 'Which tour, which day?', tips: [
        { tr: ['1. gün', 'Sabah balon (iptalde yedek gün kalsın diye), öğleden sonra dinlenme ya da Göreme\'de yürüyüş, akşam gün batımı.'], en: ['Day 1', 'Balloon in the morning (so you keep backup days), rest or a Göreme walk in the afternoon, sunset in the evening.'] },
        { tr: ['2. gün', 'Kırmızı Tur: Göreme Açık Hava Müzesi, Uçhisar, Paşabağı ve Avanos — bölgenin kuzeyi.'], en: ['Day 2', 'Red Tour: Göreme Open-Air Museum, Uçhisar, Paşabağı and Avanos — the north of the region.'] },
        { tr: ['3. gün', 'Yeşil Tur: yer altı şehri, Ihlara Vadisi yürüyüşü ve Selime — güneyi. Uzun bir gün, rahat ayakkabı giyin.'], en: ['Day 3', 'Green Tour: an underground city, the Ihlara Valley walk and Selime — the south. A long day; wear comfy shoes.'] },
        { tr: ['Ek günler', 'Gün batımında ATV, jeep ya da at turu; akşam Türk gecesi veya semazen gösterisi; çömlek ve yemek atölyeleri.'], en: ['Extra days', 'Sunset ATV, jeep or horse ride; a Turkish night or whirling dervish show; pottery and cooking workshops.'] }
      ] },
      { k: 'lezzet', ic: '🍲', tr: 'Yeme & içme', en: 'Food & drink', tips: [
        { tr: ['Testi kebabı', 'Kapalı toprak testide pişen yöresel yemek; masada testi kırılarak servis edilir. Pişmesi uzun sürdüğü için bazı yerler önceden sipariş ister.'], en: ['Pottery kebab', 'A local stew cooked in a sealed clay pot and cracked open at the table. It takes long to cook, so some places ask you to order ahead.'] },
        { tr: ['Yöresel tatlar', 'Mantı, gözleme, bölgenin kuru meyveleri ve üzüm pekmezini mutlaka deneyin.'], en: ['Local flavours', 'Try mantı dumplings, gözleme flatbread, local dried fruit and grape molasses.'] },
        { tr: ['Şarap', 'Volkanik toprak bağcılığa çok uygundur; yerel üzümlerden yapılan şarapları Ürgüp\'teki tadım evlerinde deneyin.'], en: ['Wine', 'The volcanic soil is perfect for vines; taste wines from local grapes at Ürgüp\'s tasting houses.'] },
        { tr: ['Balonlara karşı kahvaltı', 'Mağara otellerin teraslarında balonları izleyerek kahvaltı, bölgenin en unutulmaz anlarından.'], en: ['Breakfast with balloons', 'Breakfast on a cave-hotel terrace watching the balloons is one of the region\'s most memorable moments.'] }
      ] },
      { k: 'kural', ic: '🤝', tr: 'Kurallar & incelikler', en: 'Etiquette & rules', tips: [
        { tr: ['Drone', 'Bölgede drone uçurmak izne tabidir ve balon saatlerinde kesinlikle uçurulmamalıdır; hem tehlikeli hem cezalıdır.'], en: ['Drones', 'Flying a drone here requires permission and must never be done during balloon hours — it\'s dangerous and fined.'] },
        { tr: ['Peribacaları', 'Peribacalarına ve kaya kiliselere tırmanmayın; yumuşak tüf kaya kolayca aşınır ve tehlikelidir.'], en: ['Fairy chimneys', 'Don\'t climb fairy chimneys or rock churches; the soft tuff erodes easily and can be dangerous.'] },
        { tr: ['Freskler', 'Göreme Açık Hava Müzesi\'ndeki kiliselerin içinde fotoğraf çekmek yasaktır; freskleri korumak için kurala uyun.'], en: ['Frescoes', 'Photography is not allowed inside the churches of the Göreme Open-Air Museum — please respect it to protect the frescoes.'] },
        { tr: ['Camiler', 'Ziyarette omuz ve dizleri örten kıyafet giyin, kadınlar başlarını örtsün; namaz vakitlerinde ziyaretten kaçının.'], en: ['Mosques', 'Cover shoulders and knees, women cover their hair, and avoid visiting during prayer times.'] },
        { tr: ['Özel mülk', 'Kaya evlerin çoğu hâlâ birinin evi ya da deposudur; "girilmez" tabelalarına ve çitlere saygı gösterin.'], en: ['Private property', 'Many rock houses are still someone\'s home or storeroom — respect "no entry" signs and fences.'] }
      ] }
    ],

    /* sayfa yazıları — 13 dil */
    L: {
      tr: { waQ: 'Local Guide sayfanızı okudum, bir sorum var 🙂', eyebrow: 'Local Guide · Göreme', title: 'Kapadokya\'yı bir dostun gibi anlatıyorum.', p: 'Kolay yollar, döviz nerede bozulur, tuvaletler nerede, balonlar nereden izlenir… Bir arkadaşınıza anlatır gibi, bütün incelikleri tek sayfada topladım.', read: 'Rehberi oku', ask: 'Rehberine sor', q1: 'Döviz en iyi nerede bozulur?', q2: 'Tuvaletler nerede?', q3: 'Balonlar nereden izlenir?', pTitle: 'Kapadokya\'nın incelikleri', pSub: 'Bir yerlinin gözünden, misafirlerimize arkadaşça önerilerimiz.', hotels: 'Önerdiğimiz oteller', live: 'Şu an Göreme\'de', ctaT: 'Aklına takılan bir şey mi var?', ctaP: 'Yaz, bir dost gibi cevaplayalım. Rota, saat, otel ya da sadece en iyi kahvaltı yeri.', tips: 'ipucu' },
      en: { waQ: 'I read your Local Guide and have a question 🙂', eyebrow: 'Local Guide · Göreme', title: 'Cappadocia, told by a friend.', p: 'Easy routes, where to change money, where the toilets are, where to watch the balloons… Everything I\'d tell a friend, on one page.', read: 'Read the guide', ask: 'Ask your guide', q1: 'Where to change money?', q2: 'Where are the toilets?', q3: 'Where to watch the balloons?', pTitle: 'Cappadocia, the insider way', pSub: 'Friendly tips for our guests, through a local\'s eyes.', hotels: 'Hotels we recommend', live: 'Right now in Göreme', ctaT: 'Something on your mind?', ctaP: 'Write to us and we\'ll answer like a friend — routes, timing, hotels or just the best breakfast spot.', tips: 'tips' },
      de: { waQ: 'Ich habe Ihren Local Guide gelesen und habe eine Frage 🙂', eyebrow: 'Local Guide · Göreme', title: 'Kappadokien, erzählt von einem Freund.', p: 'Einfache Wege, wo man Geld wechselt, wo die Toiletten sind, wo man die Ballons sieht … alles auf einer Seite.', read: 'Guide lesen', ask: 'Frag deinen Guide', q1: 'Wo Geld wechseln?', q2: 'Wo sind Toiletten?', q3: 'Wo die Ballons sehen?', pTitle: 'Kappadokien wie ein Einheimischer', pSub: 'Freundliche Tipps für unsere Gäste, aus der Sicht eines Einheimischen.', hotels: 'Unsere Hotelempfehlungen', live: 'Gerade in Göreme', ctaT: 'Noch Fragen?', ctaP: 'Schreib uns – wir antworten wie ein Freund: Routen, Zeiten, Hotels oder das beste Frühstück.', tips: 'Tipps' },
      fr: { waQ: 'J\'ai lu votre Local Guide et j\'ai une question 🙂', eyebrow: 'Local Guide · Göreme', title: 'La Cappadoce racontée par un ami.', p: 'Itinéraires faciles, où changer de l\'argent, où sont les toilettes, d\'où voir les montgolfières… Tout sur une seule page.', read: 'Lire le guide', ask: 'Demander à votre guide', q1: 'Où changer de l\'argent ?', q2: 'Où sont les toilettes ?', q3: 'D\'où voir les montgolfières ?', pTitle: 'La Cappadoce comme un local', pSub: 'Des conseils amicaux pour nos voyageurs, vus par un habitant.', hotels: 'Nos hôtels recommandés', live: 'En ce moment à Göreme', ctaT: 'Une question ?', ctaP: 'Écrivez-nous, on vous répond comme un ami : itinéraires, horaires, hôtels ou le meilleur petit-déjeuner.', tips: 'conseils' },
      es: { waQ: 'He leído su Local Guide y tengo una pregunta 🙂', eyebrow: 'Local Guide · Göreme', title: 'Capadocia contada por un amigo.', p: 'Rutas fáciles, dónde cambiar dinero, dónde hay baños, desde dónde ver los globos… Todo en una página.', read: 'Leer la guía', ask: 'Pregunta a tu guía', q1: '¿Dónde cambiar dinero?', q2: '¿Dónde hay baños?', q3: '¿Dónde ver los globos?', pTitle: 'Capadocia como un local', pSub: 'Consejos amistosos para nuestros huéspedes, desde los ojos de un local.', hotels: 'Hoteles que recomendamos', live: 'Ahora en Göreme', ctaT: '¿Tienes alguna duda?', ctaP: 'Escríbenos y te respondemos como un amigo: rutas, horarios, hoteles o el mejor desayuno.', tips: 'consejos' },
      it: { waQ: 'Ho letto la vostra Local Guide e ho una domanda 🙂', eyebrow: 'Local Guide · Göreme', title: 'La Cappadocia raccontata da un amico.', p: 'Percorsi facili, dove cambiare i soldi, dove sono i bagni, da dove vedere le mongolfiere… Tutto in una pagina.', read: 'Leggi la guida', ask: 'Chiedi alla tua guida', q1: 'Dove cambiare i soldi?', q2: 'Dove sono i bagni?', q3: 'Da dove vedere le mongolfiere?', pTitle: 'La Cappadocia come un locale', pSub: 'Consigli amichevoli per i nostri ospiti, con gli occhi di chi vive qui.', hotels: 'Hotel che consigliamo', live: 'Ora a Göreme', ctaT: 'Hai qualche dubbio?', ctaP: 'Scrivici e ti rispondiamo come un amico: percorsi, orari, hotel o la migliore colazione.', tips: 'consigli' },
      pt: { waQ: 'Li o seu Local Guide e tenho uma pergunta 🙂', eyebrow: 'Local Guide · Göreme', title: 'A Capadócia contada por um amigo.', p: 'Rotas fáceis, onde trocar dinheiro, onde ficam os banheiros, de onde ver os balões… Tudo numa página.', read: 'Ler o guia', ask: 'Pergunte ao seu guia', q1: 'Onde trocar dinheiro?', q2: 'Onde ficam os banheiros?', q3: 'De onde ver os balões?', pTitle: 'A Capadócia como um local', pSub: 'Dicas amigáveis para os nossos hóspedes, pelos olhos de um local.', hotels: 'Hotéis que recomendamos', live: 'Agora em Göreme', ctaT: 'Alguma dúvida?', ctaP: 'Escreva-nos e respondemos como um amigo: rotas, horários, hotéis ou o melhor café da manhã.', tips: 'dicas' },
      ru: { waQ: 'Я прочитал(а) ваш Local Guide, у меня есть вопрос 🙂', eyebrow: 'Local Guide · Göreme', title: 'Каппадокия глазами друга.', p: 'Простые маршруты, где выгодно менять деньги, где туалеты, откуда смотреть на шары… Всё на одной странице.', read: 'Читать гид', ask: 'Спросить гида', q1: 'Где менять деньги?', q2: 'Где туалеты?', q3: 'Откуда смотреть шары?', pTitle: 'Каппадокия как для своих', pSub: 'Дружеские советы для наших гостей от местного жителя.', hotels: 'Отели, которые мы советуем', live: 'Сейчас в Гёреме', ctaT: 'Остались вопросы?', ctaP: 'Напишите нам — ответим по-дружески: маршруты, время, отели или лучший завтрак.', tips: 'советов' },
      ar: { waQ: 'قرأت دليلكم المحلي ولدي سؤال 🙂', eyebrow: 'Local Guide · Göreme', title: 'كابادوكيا كما يرويها صديق.', p: 'طرق سهلة، أين تصرف العملة، أين دورات المياه، ومن أين تشاهد المناطيد… كل شيء في صفحة واحدة.', read: 'اقرأ الدليل', ask: 'اسأل مرشدك', q1: 'أين أصرف العملة؟', q2: 'أين دورات المياه؟', q3: 'من أين أشاهد المناطيد؟', pTitle: 'كابادوكيا بعين أهلها', pSub: 'نصائح ودّية لضيوفنا من منظور ابن المنطقة.', hotels: 'فنادق ننصح بها', live: 'الآن في غوريمه', ctaT: 'هل لديك سؤال؟', ctaP: 'اكتب لنا وسنجيبك كصديق: الطرق والمواعيد والفنادق أو أفضل مكان للفطور.', tips: 'نصيحة' },
      fa: { waQ: 'راهنمای محلی شما را خواندم و سؤالی دارم 🙂', eyebrow: 'Local Guide · Göreme', title: 'کاپادوکیه از زبان یک دوست.', p: 'مسیرهای آسان، کجا ارز تبدیل کنیم، سرویس بهداشتی کجاست، بالن‌ها را از کجا ببینیم… همه در یک صفحه.', read: 'خواندن راهنما', ask: 'از راهنمایت بپرس', q1: 'کجا ارز تبدیل کنیم؟', q2: 'سرویس بهداشتی کجاست؟', q3: 'بالن‌ها را از کجا ببینیم؟', pTitle: 'کاپادوکیه مثل یک محلی', pSub: 'توصیه‌های دوستانه برای مهمانان ما از نگاه یک محلی.', hotels: 'هتل‌های پیشنهادی ما', live: 'همین حالا در گورمه', ctaT: 'سؤالی داری؟', ctaP: 'برایمان بنویس تا مثل یک دوست جواب دهیم: مسیر، زمان، هتل یا بهترین صبحانه.', tips: 'نکته' },
      zh: { waQ: '我看了你们的 Local Guide，有个问题想问 🙂', eyebrow: 'Local Guide · Göreme', title: '像朋友一样为你讲述卡帕多奇亚。', p: '轻松路线、哪里换汇、厕所在哪、从哪看热气球……一页全知道。', read: '阅读攻略', ask: '咨询你的向导', q1: '哪里换汇最好？', q2: '厕所在哪里？', q3: '从哪里看热气球？', pTitle: '本地人的卡帕多奇亚', pSub: '以本地人的视角，为客人准备的贴心建议。', hotels: '我们推荐的酒店', live: '此刻的格雷梅', ctaT: '还有疑问？', ctaP: '给我们留言，我们像朋友一样回答：路线、时间、酒店，或者最好的早餐地点。', tips: '条建议' },
      ja: { waQ: 'Local Guide を読みました。質問があります 🙂', eyebrow: 'Local Guide · Göreme', title: '友人のように語るカッパドキア。', p: '楽な行き方、両替するならどこ、トイレの場所、気球が見える場所…すべてを1ページに。', read: 'ガイドを読む', ask: 'ガイドに聞く', q1: '両替するならどこ？', q2: 'トイレはどこ？', q3: '気球はどこから見る？', pTitle: '地元流カッパドキアの楽しみ方', pSub: '地元の目線で、ゲストのための親しみやすいアドバイス。', hotels: 'おすすめのホテル', live: 'いまのギョレメ', ctaT: '気になることは？', ctaP: 'お気軽にどうぞ。ルート、時間、ホテル、最高の朝食スポットまで友人のようにお答えします。', tips: '件のヒント' },
      ko: { waQ: 'Local Guide를 읽었는데 질문이 있어요 🙂', eyebrow: 'Local Guide · Göreme', title: '친구처럼 들려주는 카파도키아.', p: '쉬운 길, 환전은 어디서, 화장실 위치, 열기구 감상 명소… 모든 것을 한 페이지에.', read: '가이드 읽기', ask: '가이드에게 묻기', q1: '환전은 어디서?', q2: '화장실은 어디에?', q3: '열기구는 어디서 볼까?', pTitle: '현지인처럼 즐기는 카파도키아', pSub: '현지인의 시선으로 전하는 친근한 팁.', hotels: '추천 호텔', live: '지금 괴레메는', ctaT: '궁금한 점이 있나요?', ctaP: '편하게 물어보세요. 루트, 시간, 호텔, 최고의 아침 식사 장소까지 친구처럼 답해 드려요.', tips: '개의 팁' }
    }
  };

  const lang = () => (window.CVI18N && CVI18N.lang) || 'en';
  const u = k => (G.L[lang()] || G.L.en)[k] ?? G.L.en[k];
  const loc = o => o[lang()] || o.en;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const PAGE = 'local-rehber.html';
  const photo = () => (window.CV && CV.images && CV.images.guide) || G.profile.photo;
  window.CVGuide = G;

  /* üst menüdeki "Local Guide" artık rehber sayfasını açar */
  $$('#navLinks a.guide').forEach(a => { a.href = PAGE; a.removeAttribute('data-book'); });

  /* portre: fotoğraf yüklenemezse zarif harf rozeti */
  const portrait = cls => `<div class="${cls}"><span class="gp-mono" aria-hidden="true">${esc((G.profile.name || 'C')[0])}</span><img src="${esc(photo())}" alt="${esc(G.profile.name)}" loading="lazy" onerror="this.remove()"></div>`;

  const total = () => G.cats.reduce((s, c) => s + c.tips.length, 0);
  const T = k => (window.CVApp ? CVApp.t(k) : k);
  /* rehbere WhatsApp'tan soru: "Merhaba CappaViva 👋 / Local Guide sayfanızı okudum…" */
  const waAsk = () => window.CVApp ? CVApp.wa(window.CVMsg ? CVMsg.say(u('waQ')) : u('waQ')) : '#';

  /* ---------- 1) ANA SAYFA KARTI (kısa ve premium) ---------- */
  function renderTeaser() {
    const after = $('#atolyeler'); if (!after) return;
    let sec = $('#localguide');
    if (!sec) { after.insertAdjacentHTML('afterend', '<section id="localguide"></section>'); sec = $('#localguide'); }
    sec.className = 'gt-sec';
    const A = window.CVApp;
    sec.innerHTML = `<div class="c"><div class="gt-card rv">
      <div class="gt-left">
        <div class="gt-frame">${portrait('gt-photo')}<span class="gt-badge"><i>✓</i>Local · Göreme</span></div>
        <div class="gt-who"><b>${esc(G.profile.name)}</b><span>Local Guide · CappaViva</span>${G.profile.langs ? `<small>${esc(G.profile.langs)}</small>` : ''}</div>
      </div>
      <div class="gt-right">
        <p class="gt-eye"><span>Local Guide</span><em>${total()} ${esc(u('tips'))}</em><em class="gt-sun">🌅 <b data-live="sun">—</b></em></p>
        <h2>${esc(u('title'))}</h2>
        <p class="gt-p">${esc(u('p'))}</p>
        <div class="gt-qs">${[['q1', 'para', '💱'], ['q2', 'pratik', '🚻'], ['q3', 'gunes', '🌅']].map(([q, k, ic]) => `<a href="${PAGE}#${k}"><i>${ic}</i><span>${esc(u(q))}</span><b aria-hidden="true">→</b></a>`).join('')}</div>
        <div class="gt-acts"><a class="btn btn-primary" href="${PAGE}">${esc(u('read'))} <span aria-hidden="true">→</span></a>${A ? `<a class="btn btn-glass" target="_blank" rel="noopener" href="${waAsk()}"><svg width="17" height="17"><use href="#i-wa"/></svg>${esc(u('ask'))}</a>` : ''}</div>
      </div></div></div>`;
  }

  /* ---------- menüdeki "Local Guide" bölümü (üst menü + büyük menü) ---------- */
  G.menu = function () {
    return `<div class="gm-a">
        <div class="gm-who">${portrait('gm-photo')}<div><b>${esc(G.profile.name)}</b><small>Local Guide · Göreme</small></div></div>
        <p class="gm-t">${esc(u('title'))}</p><p class="gm-p">${esc(u('pSub'))}</p>
        <a class="btn btn-primary btn-sm" href="${PAGE}">${esc(u('read'))} →</a>
      </div>
      <div class="gm-b">${G.cats.map(c => `<a href="${PAGE}#${c.k}"><i>${c.ic}</i><span>${esc(loc(c))}</span><em>${c.tips.length}</em></a>`).join('')}</div>`;
  };

  /* ---------- 2) REHBER SAYFASI ---------- */
  function renderPage() {
    const root = $('#guidePage'); if (!root) return;
    const A = window.CVApp;
    document.title = u('pTitle') + ' · CappaViva';
    root.innerHTML = `
    <section class="page-hero gp-hero" aria-labelledby="gpTitle">
      <span class="media" data-img="guideHero" data-scene='{"p":"dawn","seed":222,"balloons":22,"chim":1.3}'></span>
      <div class="page-hero-shade"></div>
      <div class="c page-hero-in gp-hero-in">
        <div>
          <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">${esc(T('nav.home'))}</a><span aria-hidden="true">/</span><span>Local Guide</span></nav>
          <p class="eyebrow">${esc(u('eyebrow'))} · ${total()} ${esc(u('tips'))}</p>
          <h1 id="gpTitle">${esc(u('pTitle'))}</h1>
          <p class="page-lede">${esc(u('pSub'))}</p>
        </div>
        <div class="gp-card">${portrait('gp-photo')}<div><b>${esc(G.profile.name)}</b><span>Local Guide · Göreme</span>${G.profile.langs ? `<small>${esc(G.profile.langs)}</small>` : ''}</div>
          ${A ? `<a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waAsk()}">WhatsApp</a>` : ''}</div>
      </div>
    </section>
    <nav class="dp-tabs" id="gpTabs" aria-label="Topics"><div class="c dp-tabs-in">${G.cats.map(c => `<a href="#${c.k}" data-tab="${c.k}">${c.ic} ${esc(loc(c))}</a>`).join('')}</div></nav>
    ${G.cats.map((c, ci) => `<section class="gp-sec ${ci % 2 ? 'alt' : ''}" id="${c.k}">
      <div class="c gp-grid">
        <div class="gp-head rv"><span class="gp-ic">${c.ic}</span><h2 class="h2">${esc(loc(c))}</h2><span class="dp-count">${c.tips.length} ${esc(u('tips'))}</span>
          ${c.live ? `<div class="gp-live"><div><small>${A ? A.t('ft.sunrise') : ''}</small><b data-live="sun">—</b></div><div><small>${A ? A.t('ft.pickup') : ''}</small><b data-live="pick">—</b></div></div>` : ''}</div>
        <div class="gp-tips">${c.tips.map((tp, i) => { const [h, p] = loc(tp); return `<article class="gp-tip rv"><span class="gp-n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`; }).join('')}
          ${c.hotels && G.hotels.length ? `<article class="gp-tip gp-hotels rv"><h3>${esc(u('hotels'))}</h3><ul>${G.hotels.map(h => `<li><b>${esc(h.n)}</b><span>${esc(h.area || '')}</span>${h.note ? `<small>${esc(loc(h.note))}</small>` : ''}</li>`).join('')}</ul></article>` : ''}
        </div>
      </div>
    </section>`).join('')}
    <section class="cta-band">
      <div class="c cta-in rv">
        <div><p class="eyebrow">Local Guide</p><h2 class="h2">${esc(u('ctaT'))}</h2><p class="lede">${esc(u('ctaP'))}</p></div>
        <div class="row">${A ? `<a class="btn btn-wa" target="_blank" rel="noopener" href="${waAsk()}"><svg width="18" height="18"><use href="#i-wa"/></svg>WhatsApp</a><a class="btn btn-primary" href="turlar.html">${esc(A.t('mm.allTours'))}</a>` : ''}</div>
      </div>
    </section>`;
    if (A) { A.mount(); }
    spy();
  }
  let io;
  function spy() {
    if (io) io.disconnect();
    if (!('IntersectionObserver' in window)) return;
    io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      $$('#gpTabs [data-tab]').forEach(a => a.classList.toggle('on', a.dataset.tab === e.target.id));
      const on = $('#gpTabs .on'); if (on && matchMedia('(max-width:900px)').matches) on.parentNode.scrollTo({ left: on.offsetLeft - 16, behavior: 'smooth' });
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('.gp-sec').forEach(s => io.observe(s));
  }
  function focusHash() { const h = location.hash.slice(1); const el = h && document.getElementById(h); if (el) setTimeout(() => el.scrollIntoView(), 80); }

  document.addEventListener('cv:render', () => { renderTeaser(); renderPage(); });
  if ($('#guidePage')) setTimeout(focusHash, 500);
})();