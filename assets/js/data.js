/* =========================================================
   CappaViva — site verileri (tek yerden yönetilir)
   İleride bu dosyadaki bilgiler yönetim panelinden gelecek.
   ========================================================= */
window.CV = {
  phone: '905354322782',              // WhatsApp (başında + olmadan)
  phoneDisplay: '+90 535 432 27 82',
  email: 'info@cappaviva.com',
    instagram: 'cappaviva',              // Instagram kullanıcı adı (cappaviva)
  partners: [],                        // partner isimleri, ör. ['Otel adı', 'Balon firması'] — doluysa alttaki kayan şeritte görünür
  tursabNo: '',                        // TÜRSAB belge numaranızı yazın, ör. '12345'
  defaultLang: 'en',                   // ziyaretçinin dili desteklenmiyorsa bu dil açılır
  liveRates: true,                     // güncel kurları internetten çek (frankfurter.app)

  /* HERO VİDEOSU
     Videoyu assets/video klasörüne koyun ve yolunu yazın. Boşsa çizim görünür.
     Öneri: MP4 (H.264), sessiz, 10–20 saniye, 1920×1080, 10 MB'den küçük.
     Örnek: heroVideo: 'assets/video/hero.mp4'                            */
  heroVideo: 'assets/video/hero.mp4',

  /* FOTOĞRAFLAR
     Fotoğrafı assets/img klasörüne koyun ve yolunu buraya yazın.
     Boş bırakılan yerlerde geçici çizim görünür.
     Örnek: hero: 'assets/img/hero.jpg'                                   */
  images: {
    hero: '',
    goreme: '', uchisar: '', pasabag: '', kizil: '', avanos: '', derin: '', ihlara: '', ortahisar: '',
    balon: '', kirmizi: '', yesil: '', mix: '', comlektur: '', atv: '', jeep: '', klasik: '', at: '', deve: '',
    'bal-std': '', 'bal-cmf': '', 'bal-vip': '',
    gece: '', comlek: '',
    blog1: '', blog2: '', blog3: '',
        ig1: '', ig2: '', ig3: '', ig4: '', ig5: '', igAvatar: '',   // Instagram bölümü: 5 fotoğraf + profil resmi
    tursab: ''                         // TÜRSAB logosu (png/svg)
  },

  /* KATALOG — fiyatlar EUR, kişi başı. eur boşsa "Teklif al" görünür. */
  catalog: [
    { id: 'balon-std', n: 'b.std.n', cat: 'balloon', eur: 150, old: 180, img: 'bal-std' },
    { id: 'balon-cmf', n: 'b.cmf.n', cat: 'balloon', img: 'bal-cmf' },
    { id: 'balon-vip', n: 'b.vip.n', cat: 'balloon', img: 'bal-vip' },
    { id: 'kirmizi',   n: 't.kirmizi.n',   p: 't.kirmizi.p',   cat: 'daily', eur: 60, old: 75, img: 'kirmizi' },
    { id: 'yesil',     n: 't.yesil.n',     p: 't.yesil.p',     cat: 'daily', img: 'yesil' },
    { id: 'mix',       n: 't.mix.n',       p: 't.mix.p',       cat: 'daily', img: 'mix' },
    { id: 'comlektur', n: 't.comlektur.n', p: 't.comlektur.p', cat: 'daily', img: 'comlektur' },
    { id: 'atv',       n: 't.atv.n',       p: 't.atv.p',       cat: 'adv', eur: 35, old: 45, img: 'atv' },
    { id: 'jeep',      n: 't.jeep.n',      p: 't.jeep.p',      cat: 'adv', eur: 50, img: 'jeep' },
    { id: 'klasik',    n: 't.klasik.n',    p: 't.klasik.p',    cat: 'adv', img: 'klasik' },
    { id: 'at',        n: 't.at.n',        p: 't.at.p',        cat: 'adv', img: 'at' },
    { id: 'deve',      n: 't.deve.n',      p: 't.deve.p',      cat: 'adv', img: 'deve' },
    { id: 'gece',   n: 'w.gece.n',   p: 'w.gece.p',   cat: 'culture' },
    { id: 'sema',   n: 'w.sema.n',   p: 'w.sema.p',   cat: 'culture' },
    { id: 'hamam',  n: 'w.hamam.n',  p: 'w.hamam.p',  cat: 'culture' },
    { id: 'comlek', n: 'w.comlek.n', p: 'w.comlek.p', cat: 'culture' },
    { id: 'yemek',  n: 'w.yemek.n',  p: 'w.yemek.p',  cat: 'culture' },
    { id: 'hali',   n: 'w.hali.n',   p: 'w.hali.p',   cat: 'culture' },
    { id: 'sarap',  n: 'w.sarap.n',  p: 'w.sarap.p',  cat: 'culture' },
    { id: 'foto',   n: 'w.foto.n',   p: 'w.foto.p',   cat: 'culture' },
    { id: 'x-kayseri',  n: 'x.kayseri.n',  p: 'x.private.p', cat: 'transfer' },
    { id: 'x-nevsehir', n: 'x.nevsehir.n', p: 'x.private.p', cat: 'transfer' },
    { id: 'x-shuttle',  n: 'x.shuttle.n',  p: 'x.shuttle.p', cat: 'transfer' },
    { id: 'x-city',     n: 'x.city.n',     p: 'x.city.p',    cat: 'transfer' },
    { id: 'vip',    n: 't.vip.n',    cat: 'special' },
    { id: 'plan1',  n: 'p1.n', cat: 'special' },
    { id: 'plan2',  n: 'p2.n', cat: 'special' },
    { id: 'plan3',  n: 'p3.n', cat: 'special' },
    { id: 'plan4',  n: 'p4.n', cat: 'special' },
    { id: 'myplan', n: 't.myplan.n', cat: 'special' }
  ],

  /* Ana sayfadaki tur kartları (sıra burada) */
  tourTiles: [
    { id: 'balon-std', n: 't.balon.n', p: 't.balon.p', tag: 'f.balloon', f: 'balloon', wide: true, scene: { p: 'dawn', seed: 3, balloons: 26, chim: 1.1 } },
    { id: 'kirmizi', tag: 'f.daily', f: 'daily', scene: { p: 'sunset', seed: 11, chim: 1.6 } },
    { id: 'yesil',   tag: 'f.daily', f: 'daily', scene: { p: 'green', seed: 9, chim: .5, river: true } },
    { id: 'atv',     tag: 'f.adv',   f: 'adv',   scene: { p: 'dusk', seed: 7, chim: 1.2 } },
    { id: 'jeep',    tag: 'f.adv',   f: 'adv',   scene: { p: 'morning', seed: 5, balloons: 4, chim: 1.3 } },
    { id: 'mix',     tag: 'f.daily', f: 'daily', wide: true, scene: { p: 'dawn', seed: 21, balloons: 8, chim: 1.4, castle: true } },
    { id: 'comlektur', tag: 'f.daily', f: 'daily', scene: { p: 'green', seed: 41, chim: .6, river: true } },
    { id: 'klasik',  tag: 'f.adv',   f: 'adv',   scene: { p: 'morning', seed: 43, chim: 1.1 } },
    { id: 'at',      tag: 'f.adv',   f: 'adv',   scene: { p: 'sunset', seed: 72, chim: 1 } },
    { id: 'deve',    tag: 'f.adv',   f: 'adv',   scene: { p: 'dusk', seed: 73, chim: .8 } }
  ],

  destinations: [
    { k: 'goreme',    scene: { p: 'dawn', seed: 61, balloons: 20, chim: 1.3 } },
    { k: 'uchisar',   scene: { p: 'morning', seed: 62, balloons: 3, chim: .8, castle: true } },
    { k: 'pasabag',   scene: { p: 'morning', seed: 63, chim: 2.4 } },
    { k: 'kizil',     scene: { p: 'sunset', seed: 64, chim: 1.5 } },
    { k: 'avanos',    scene: { p: 'green', seed: 65, balloons: 2, chim: .4, river: true } },
    { k: 'derin',     scene: { p: 'night', seed: 66, chim: 1 } },
    { k: 'ihlara',    scene: { p: 'green', seed: 67, chim: .3, river: true } },
    { k: 'ortahisar', scene: { p: 'dawn', seed: 68, balloons: 10, chim: .9, castle: true } }
  ],

  /* Hazır planlar: [saat, başlık anahtarı, açıklama anahtarı] */
  plans: [
    { id: 'plan1', n: 'p1.n', p: 'p1.p', days: [
      [['05:00', 't.balon.n', 't.balon.p'], ['09:30', 't.kirmizi.n', 't.kirmizi.p'], ['17:30', 't.atv.n', 't.atv.p']] ] },
    { id: 'plan2', n: 'p2.n', p: 'p2.p', days: [
      [['05:00', 't.balon.n', 't.balon.p'], ['09:30', 't.kirmizi.n', 't.kirmizi.p'], ['20:00', 'w.gece.n', 'w.gece.p']],
      [['09:30', 't.yesil.n', 't.yesil.p'], ['17:30', 't.jeep.n', 't.jeep.p']] ] },
    { id: 'plan3', n: 'p3.n', p: 'p3.p', days: [
      [['—', 'pl.arrival', 'pl.arrivalP'], ['17:30', 't.atv.n', 't.atv.p']],
      [['05:00', 't.balon.n', 't.balon.p'], ['09:30', 't.kirmizi.n', 't.kirmizi.p'], ['20:00', 'w.gece.n', 'w.gece.p']],
      [['09:30', 't.yesil.n', 't.yesil.p'], ['19:00', 'w.hamam.n', 'w.hamam.p']] ] },
    { id: 'plan4', n: 'p4.n', p: 'p4.p', days: [
      [['—', 'pl.arrival', 'pl.arrivalP'], ['19:00', 'w.sema.n', 'w.sema.p']],
      [['05:00', 't.balon.n', 't.balon.p'], ['09:30', 't.kirmizi.n', 't.kirmizi.p']],
      [['09:30', 't.yesil.n', 't.yesil.p'], ['18:00', 'w.sarap.n', 'w.sarap.p']],
      [['10:00', 'w.comlek.n', 'w.comlek.p'], ['15:00', 'w.yemek.n', 'w.yemek.p'], ['—', 'pl.flex', 'pl.flexP']] ] }
  ],

  /* Para birimleri — canlı kur alınamazsa bu yaklaşık değerler kullanılır */
  currencies: { EUR: 1, USD: 1.17, GBP: 0.87, TRY: 48.5, AUD: 1.78, JPY: 172, CNY: 8.35, KRW: 1630 },

  /* Göreme konumu (gün doğumu hesabı için) */
  geo: { lat: 38.6431, lon: 34.8289, tz: 3 }
};
