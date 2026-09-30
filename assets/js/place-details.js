/* =========================================================
   CappaViva — DESTİNASYON DETAY İÇERİKLERİ
   Her yerin detay sayfası metinleri burada.
   Yeni bir yere detay sayfası açmak için:
     1) Aşağıya o yerin kısa adıyla (ör. uchisar: { ... }) bir blok ekleyin
     2) places.js'te o yerin satırına  page: true,  yazın
   tr ve en yazılır; diğer diller İngilizceyi kullanır.
   Fotoğraflar: data.js > images içine 'goreme-1': 'assets/img/goreme-1.jpg' gibi.
   ========================================================= */
window.CVDetails = {
  goreme: {
    tours: ['balon-std', 'kirmizi', 'mix'],          // bu sayfada satılan turlar
    nearby: ['gam', 'uchisar', 'cavusin', 'guvercin', 'ask', 'zelve'],
    map: 'Göreme, Nevşehir',
    gallery: [                                        // 6 kare: fotoğraf anahtarı + yedek çizim
      { img: 'goreme-1', scene: { p: 'dawn', seed: 201, balloons: 30, chim: 1.4 } },
      { img: 'goreme-2', scene: { p: 'sunset', seed: 202, chim: 1.8 } },
      { img: 'goreme-3', scene: { p: 'morning', seed: 203, balloons: 8, chim: 1.1, castle: true } },
      { img: 'goreme-4', scene: { p: 'dusk', seed: 204, chim: 1.5 } },
      { img: 'goreme-5', scene: { p: 'night', seed: 205, chim: 1 } },
      { img: 'goreme-6', scene: { p: 'green', seed: 206, chim: .7 } }
    ],
    /* Misafir yorumları — SADECE gerçek yorumlarınızı ekleyin (Google / TripAdvisor).
       Örnek: { n: 'Anna, Almanya', s: 5, t: 'Harika bir gündü...' }  Boşsa bölüm görünmez. */
    reviews: [],

    tr: {
      tagline: 'Balonların, peribacalarının ve kaya kiliselerinin kalbi.',
      facts: [['Önerilen süre', '2–3 gün'], ['En iyi mevsim', 'Nisan–Haziran · Eylül–Ekim'], ['Havalimanı', 'Nevşehir ~40 km · Kayseri ~75 km'], ['UNESCO', 'Dünya Mirası (1985)']],
      intro: [
        'Göreme, Kapadokya\'nın tam ortasında, peribacalarının arasına kurulmuş küçük bir kasaba. Kayalara oyulmuş evleri, mağara otelleri ve her sabah gökyüzünü dolduran yüzlerce balonuyla bölgenin kalbi burası.',
        'Kasabanın hemen yanındaki Göreme Açık Hava Müzesi, fresklerle süslü kaya kiliseleriyle UNESCO Dünya Mirası listesinde. Etraftaki Güvercinlik, Kılıçlar ve Aşk vadileri de yürüyüşten ATV\'ye kadar her türlü keşfe açık.',
        'Göreme\'yi merkez alırsanız Uçhisar, Çavuşin, Avanos ve Ürgüp\'e birkaç dakikada ulaşırsınız — bu yüzden misafirlerimizin çoğu burada konaklıyor.'
      ],
      todo: [
        { n: 'Göreme Açık Hava Müzesi', p: 'Fresklerle dolu kaya kiliseleri ve manastırlar. Kapadokya\'nın en önemli durağı.', scene: { p: 'morning', seed: 211, balloons: 3, chim: 1.2 } },
        { n: 'Gün doğumunda balon', p: 'Yüzlerce balonla birlikte peribacalarının üzerinde yaklaşık bir saat.', scene: { p: 'dawn', seed: 212, balloons: 28, chim: 1.1 } },
        { n: 'Gün batımı tepesi', p: 'Kasabanın üstündeki tepelerden vadilerin kızıla döndüğü anı izleyin.', scene: { p: 'sunset', seed: 213, chim: 1.6 } },
        { n: 'Vadi yürüyüşleri', p: 'Güvercinlik, Kılıçlar ve Aşk vadilerinde kolay ve orta seviye rotalar.', scene: { p: 'green', seed: 214, chim: 1 } },
        { n: 'Mağara oteller ve kasaba', p: 'Kayaya oyulmuş odalar, teras kahvaltıları ve sakin sokaklar.', scene: { p: 'dusk', seed: 215, chim: .9, castle: true } },
        { n: 'Yerel lezzetler', p: 'Testi kebabı, mantı ve bölgenin şarapları. Akşamların vazgeçilmezi.', scene: { p: 'night', seed: 216, chim: .8 } }
      ],
      when: [
        ['İlkbahar', 'Nisan–Mayıs', 'Yeşillenen vadiler, ılık günler. Yürüyüş ve balon için en güzel dönemlerden.'],
        ['Yaz', 'Haziran–Ağustos', 'Uzun günler, sıcak öğleden sonralar. Sabah erken ve akşamüstü gezmek en iyisi.'],
        ['Sonbahar', 'Eylül–Kasım', 'Altın renkli vadiler ve serin sabahlar. Fotoğrafçıların favorisi.'],
        ['Kış', 'Aralık–Mart', 'Karla kaplı peribacaları masal gibi. Soğuk olur; hava nedeniyle balon iptalleri artar.']
      ],
      practical: [
        ['Ulaşım', 'Nevşehir Kapadokya Havalimanı yaklaşık 45 dakika, Kayseri Havalimanı yaklaşık 1 saat 10 dakika. Havalimanı transferimiz var.'],
        ['Müze saatleri', 'Göreme Açık Hava Müzesi genelde yaz döneminde 08:00–19:00, kış döneminde 08:00–17:00 arası açık. Saatler dönemsel değişebilir.'],
        ['Giriş', 'Müze girişi biletli; Müzekart geçerli. Güncel ücret için muze.gov.tr adresine bakın. Karanlık Kilise ek bilet ister.'],
        ['Ne giyilir', 'Rahat yürüyüş ayakkabısı şart. Sabahlar yazın bile serin olur; balon için yanınıza bir ceket alın.'],
        ['Yürüyüş', 'Kasaba ve müze düz ve kolay. Vadi yürüyüşleri 1–3 saat; su ve şapka almayı unutmayın.']
      ],
      tips: [
        'Açık Hava Müzesi\'ne açılış saatinde girin; tur grupları genelde saat 10\'dan sonra gelir.',
        'Balona binmeseniz bile gün doğumunda kasabanın üstündeki tepelere çıkın; yüzlerce balonu izlemek ücretsiz ve unutulmaz.',
        'Karanlık Kilise için ek bilet alın; freskleri Göreme\'nin en iyi korunmuş olanları.',
        'Testi kebabının pişmesi uzun sürer; bazı restoranlar önceden sipariş ister, öğlen arayıp ayırtın.'
      ],
      faq: [
        ['Göreme\'de kaç gün kalmalıyım?', 'En az 2 gece öneriyoruz: bir sabah balon, bir gün Kırmızı Tur, bir gün de Yeşil Tur veya vadi yürüyüşü için.'],
        ['Balon her gün uçuyor mu?', 'Hayır, uçuşlar rüzgar ve hava durumuna bağlıdır ve her sabah resmi izinle yapılır. Bu yüzden balonu konaklamanızın ilk sabahına koymanızı öneriyoruz; iptal olursa sonraki sabah yedek olur.'],
        ['Açık Hava Müzesi rehbersiz gezilir mi?', 'Evet, ama fresklerdeki hikâyeleri rehberle dinlemek deneyimi bambaşka yapar. Kırmızı Tur\'da rehber ve giriş planlaması bizde.'],
        ['Göreme\'de nerede kalmalıyım?', 'Mağara oteller Göreme\'nin en özel deneyimi. Otelinizi söyleyin, turlarımızda otelden alıp bırakıyoruz.'],
        ['Çocuklarla uygun mu?', 'Evet. Müze, kasaba ve kolay vadi yürüyüşleri ailelere çok uygun. Balonda yaş ve boy sınırı için bize yazın.']
      ]
    },

    en: {
      tagline: 'The heart of balloons, fairy chimneys and rock-cut churches.',
      facts: [['Suggested stay', '2–3 days'], ['Best season', 'Apr–Jun · Sep–Oct'], ['Airports', 'Nevşehir ~40 km · Kayseri ~75 km'], ['UNESCO', 'World Heritage (1985)']],
      intro: [
        'Göreme is a small town set among the fairy chimneys, right in the middle of Cappadocia. With its rock-carved homes, cave hotels and hundreds of balloons filling the sky every morning, this is the heart of the region.',
        'Next to the town, the Göreme Open-Air Museum — with its fresco-covered rock churches — is a UNESCO World Heritage Site. The surrounding Pigeon, Sword and Love valleys are open to every kind of exploring, from hiking to ATV rides.',
        'Stay in Göreme and you are only minutes from Uçhisar, Çavuşin, Avanos and Ürgüp — which is why most of our guests base themselves here.'
      ],
      todo: [
        { n: 'Göreme Open-Air Museum', p: 'Rock-cut churches and monasteries full of frescoes. Cappadocia\'s most important stop.' },
        { n: 'Sunrise balloon flight', p: 'About an hour above the fairy chimneys, together with hundreds of balloons.' },
        { n: 'Sunset hill', p: 'Watch the valleys turn red from the hills above town.' },
        { n: 'Valley hikes', p: 'Easy and moderate trails through Pigeon, Sword and Love valleys.' },
        { n: 'Cave hotels & the town', p: 'Rock-carved rooms, terrace breakfasts and quiet streets.' },
        { n: 'Local flavours', p: 'Pottery kebab, mantı and local wines — the essence of Göreme evenings.' }
      ],
      when: [
        ['Spring', 'April–May', 'Green valleys and mild days. One of the best times for hiking and balloons.'],
        ['Summer', 'June–August', 'Long days and hot afternoons. Explore early in the morning and late in the day.'],
        ['Autumn', 'September–November', 'Golden valleys and crisp mornings. A photographer\'s favourite.'],
        ['Winter', 'December–March', 'Snow-covered fairy chimneys look magical. Cold, with more weather-related balloon cancellations.']
      ],
      practical: [
        ['Getting there', 'Nevşehir Cappadocia Airport is about 45 minutes away, Kayseri Airport about 1 hour 10 minutes. We offer airport transfers.'],
        ['Museum hours', 'The Göreme Open-Air Museum is usually open 08:00–19:00 in summer and 08:00–17:00 in winter. Hours may change by season.'],
        ['Entry', 'The museum is ticketed; the Müzekart pass is valid. Check muze.gov.tr for current prices. The Dark Church needs an extra ticket.'],
        ['What to wear', 'Comfortable walking shoes are a must. Mornings are cool even in summer — bring a jacket for the balloon.'],
        ['Walking', 'The town and museum are flat and easy. Valley hikes take 1–3 hours; bring water and a hat.']
      ],
      tips: [
        'Enter the Open-Air Museum right at opening time; tour groups usually arrive after 10 am.',
        'Even if you don\'t fly, climb the hills above town at sunrise — watching hundreds of balloons is free and unforgettable.',
        'Get the extra ticket for the Dark Church; its frescoes are the best preserved in Göreme.',
        'Pottery kebab takes a long time to cook; some restaurants ask you to order ahead, so call at lunchtime.'
      ],
      faq: [
        ['How many days should I stay in Göreme?', 'We recommend at least 2 nights: one morning for the balloon, one day for the Red Tour and one for the Green Tour or a valley hike.'],
        ['Do balloons fly every day?', 'No. Flights depend on wind and weather and need official permission each morning. That\'s why we suggest booking the balloon on your first morning, so the next mornings serve as a backup.'],
        ['Can I visit the Open-Air Museum without a guide?', 'Yes, but hearing the stories behind the frescoes with a guide makes it a different experience. On our Red Tour the guide and entry planning are on us.'],
        ['Where should I stay in Göreme?', 'Cave hotels are Göreme\'s most special experience. Tell us your hotel — our tours include hotel pick-up and drop-off.'],
        ['Is it suitable for children?', 'Yes. The museum, town and easy valley walks are great for families. Write to us about age and height limits for the balloon.']
      ]
    }
  }
};