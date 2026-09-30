/* =========================================================
   Çok dilli sistem: 13 dil, tarayıcı dilini algılar ve sorar.
   Yeni dil eklemek: assets/js/lang/xx.js dosyası + aşağıdaki listeye bir satır.
   ========================================================= */
(function () {
  const LANGS = [
    { c: 'tr', n: 'Türkçe',    q: 'Bu siteyi Türkçe görüntülemek ister misiniz?', y: 'Türkçe\'ye geç', no: 'Hayır, teşekkürler' },
    { c: 'en', n: 'English',   q: 'Would you like to view this site in English?', y: 'Switch to English', no: 'No, thanks' },
    { c: 'de', n: 'Deutsch',   q: 'Möchten Sie diese Seite auf Deutsch ansehen?', y: 'Auf Deutsch wechseln', no: 'Nein, danke' },
    { c: 'fr', n: 'Français',  q: 'Voulez-vous afficher ce site en français ?', y: 'Passer au français', no: 'Non, merci' },
    { c: 'es', n: 'Español',   q: '¿Quieres ver este sitio en español?', y: 'Cambiar a español', no: 'No, gracias' },
    { c: 'it', n: 'Italiano',  q: 'Vuoi vedere questo sito in italiano?', y: 'Passa all\'italiano', no: 'No, grazie' },
    { c: 'pt', n: 'Português', q: 'Quer ver este site em português?', y: 'Mudar para português', no: 'Não, obrigado' },
    { c: 'ru', n: 'Русский',   q: 'Хотите открыть сайт на русском?', y: 'Перейти на русский', no: 'Нет, спасибо' },
    { c: 'ar', n: 'العربية',   q: 'هل تريد عرض هذا الموقع باللغة العربية؟', y: 'التبديل إلى العربية', no: 'لا، شكرًا', rtl: true },
    { c: 'fa', n: 'فارسی',     q: 'آیا می‌خواهید این سایت را به فارسی ببینید؟', y: 'تغییر به فارسی', no: 'نه، ممنون', rtl: true },
    { c: 'zh', n: '中文',       q: '要以中文浏览本网站吗？', y: '切换到中文', no: '不用了，谢谢' },
    { c: 'ja', n: '日本語',     q: 'このサイトを日本語で表示しますか？', y: '日本語に切り替える', no: 'いいえ、結構です' },
    { c: 'ko', n: '한국어',     q: '이 사이트를 한국어로 보시겠어요?', y: '한국어로 전환', no: '괜찮아요' }
  ];

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  const I = window.CVI18N = {
    langs: LANGS,
    lang: 'en',
    store,
    info(c) { return LANGS.find(l => l.c === c); },
    t(key, vars) {
      const L = window.CV_LANG || {};
      let s = (L[I.lang] && L[I.lang][key]) ?? (L.en && L.en[key]) ?? key;
      if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] ?? m));
      return s;
    },
    load(code) {
      return new Promise(res => {
        if ((window.CV_LANG || {})[code]) return res(true);
        const s = document.createElement('script');
        s.charset = 'utf-8';
        s.src = 'assets/js/lang/' + code + '.js';
        s.onload = () => res(true);
        s.onerror = () => res(false);
        document.head.appendChild(s);
      });
    },
    async set(code, opts = {}) {
      if (!I.info(code)) code = 'en';
      const ok = await I.load(code);
      if (!ok) code = 'en';
      I.lang = code;
      const root = document.documentElement;
      root.lang = code;
      root.dir = I.info(code).rtl ? 'rtl' : 'ltr';
      if (opts.save !== false) store.set('cv_lang', code);
      I.apply();
      document.dispatchEvent(new CustomEvent('cv:lang', { detail: code }));
    },
    apply(root = document) {
      root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = I.t(el.dataset.i18n); });
      root.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = I.t(el.dataset.i18nPh); });
      root.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', I.t(el.dataset.i18nAria)); });
    },
    /* Ziyaretçinin tarayıcı dili (desteklenen ilk dil) */
    detect() {
      const list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
      for (const l of list) {
        const b = String(l).toLowerCase().split('-')[0];
        if (I.info(b)) return b;
      }
      return null;
    }
  };
})();
