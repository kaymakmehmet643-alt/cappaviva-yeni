# CappaViva — web sitesi

Kapadokya tur acentası sitesi: 13 dil, para birimi seçimi, akıllı plan asistanı ve WhatsApp ile rezervasyon.

## VS Code'da açmak
1. VS Code'u aç → **File › Open Folder** → bu `cappaviva` klasörünü seç.
2. Sol menüden **Extensions**'a gir, **Live Server** eklentisini kur.
3. `index.html` dosyasına sağ tıkla → **Open with Live Server**. Site tarayıcıda açılır; kaydettikçe kendini yeniler.

## Klasörler
```
index.html              → sayfanın iskeleti (bölümlerin sırası burada)
assets/css/style.css    → tüm tasarım (renkler en üstte :root içinde)
assets/js/data.js       → telefon, fiyatlar, turlar, fotoğraf yolları  ← en sık düzenlenecek dosya
assets/js/lang/xx.js    → her dilin metinleri (tr.js, en.js, de.js …)
assets/js/app.js        → menüler, animasyonlar, dil/para birimi
assets/js/planner.js    → "Planını kendin tasarla" asistanı
assets/js/booking.js    → rezervasyon sayfası
assets/js/scene.js      → fotoğraf yokken görünen geçici çizimler
assets/img/             → fotoğraflarını buraya koy
```

## Sık yapılacak değişiklikler
- **Fiyat değiştirmek:** `assets/js/data.js` → `catalog` içinde `eur: 60` gibi. Eski fiyat için `old: 75`.
- **Fotoğraf eklemek:** fotoğrafı `assets/img/` içine koy (ör. `goreme.jpg`), sonra `data.js` → `images` içinde `goreme: 'assets/img/goreme.jpg'` yaz. Çizim otomatik olarak fotoğrafla değişir.
- **Hero videosu:** videoyu `assets/video/hero.mp4` olarak koy, `data.js` → `heroVideo: 'assets/video/hero.mp4'` yaz. Video yüklenene kadar `images.hero` fotoğrafı (varsa) görünür.
- **TÜRSAB belge no / logo:** `data.js` → `tursabNo: '12345'` ve `images.tursab: 'assets/img/tursab.png'`.
- **Metin değiştirmek:** ilgili dil dosyası, ör. Türkçe için `assets/js/lang/tr.js`.
- **Varsayılan dil:** `data.js` → `defaultLang` (şu an `en`). Ziyaretçinin tarayıcı dili farklıysa site kendi dilinde sorar.

## Yayına almak (Vercel)
Klasörü GitHub'a yükleyip Vercel'de "Import Project" demek yeterli; ek ayar gerekmez.

## Sıradaki adımlar
- Yönetim paneli (fiyat, fotoğraf, talepler) — Supabase ile
- İptal/KVKK/çerez sayfaları
- Gerçek yorumların otomatik gösterimi
