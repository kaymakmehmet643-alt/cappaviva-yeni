/* =========================================================
   CappaViva — AYDINLIK / KARANLIK MOD (theme.js)
   - Ziyaretçi seçmediyse cihazının ayarını (gece/gündüz) takip eder
   - Seçimi hatırlar (bir dahaki ziyarette aynı mod açılır)
   - Düğmeye basınca yeni renkler düğmeden daire şeklinde yayılır
   Bu dosya <head> içinde yüklenir ki sayfa yanlış renkte yanıp sönmesin.
   ========================================================= */
(function () {
  const KEY = 'cv_theme', root = document.documentElement;

  /* düğmenin üzerine gelince çıkan yazı — 13 dil [aydınlığa geç, karanlığa geç] */
  const N = {
    tr: ['Aydınlık moda geç', 'Karanlık moda geç'],
    en: ['Switch to light mode', 'Switch to dark mode'],
    de: ['Heller Modus', 'Dunkler Modus'],
    fr: ['Mode clair', 'Mode sombre'],
    es: ['Modo claro', 'Modo oscuro'],
    it: ['Modalità chiara', 'Modalità scura'],
    pt: ['Modo claro', 'Modo escuro'],
    ru: ['Светлая тема', 'Тёмная тема'],
    ar: ['الوضع الفاتح', 'الوضع الداكن'],
    fa: ['حالت روشن', 'حالت تاریک'],
    zh: ['浅色模式', '深色模式'],
    ja: ['ライトモード', 'ダークモード'],
    ko: ['라이트 모드', '다크 모드']
  };

  const store = {
    get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  };
  const mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  const sys = () => (mq && mq.matches ? 'dark' : 'light');
  const cur = () => (root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  const lang = () => (window.CVI18N && CVI18N.lang) || root.lang || 'en';
  const label = v => { const l = N[lang()] || N.en; return v === 'dark' ? l[0] : l[1]; };

  /* telefonda tarayıcının üst çubuğu da temaya uysun */
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) { meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }

  function apply(v) {
    root.setAttribute('data-theme', v);
    meta.content = v === 'dark' ? '#0b0d17' : '#f4efe7';
    document.querySelectorAll('.th-btn').forEach(b => {
      b.setAttribute('aria-pressed', String(v === 'dark'));
      b.setAttribute('aria-label', label(v));
      b.title = label(v);
    });
  }

  /* sayfa çizilmeden ÖNCE doğru renkleri ayarla */
  apply(store.get() || sys());

  /* ziyaretçi hiç seçmediyse, cihaz gece moduna geçince site de geçer */
  if (mq) {
    const onSys = () => { if (!store.get()) apply(sys()); };
    mq.addEventListener ? mq.addEventListener('change', onSys) : mq.addListener(onSys);
  }

  /* düğmeye basınca: yeni tema düğmeden daire şeklinde yayılır */
  function toggle(btn) {
    const next = cur() === 'dark' ? 'light' : 'dark';
    store.set(next);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduce) {
      root.classList.add('th-fade');
      apply(next);
      setTimeout(() => root.classList.remove('th-fade'), 650);
      return;
    }
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add('th-vt');
    const vt = document.startViewTransition(() => apply(next));
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 800, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
    const done = () => root.classList.remove('th-vt');
    vt.finished.then(done, done);
  }

  /* güneş ↔ ay simgesi */
  const ICON = '<svg viewBox="0 0 24 24" aria-hidden="true">'
    + '<g class="th-sun"><circle cx="12" cy="12" r="4.4" fill="currentColor"/>'
    + '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M12 1.8v2.4M12 19.8v2.4M4.8 4.8l1.7 1.7M17.5 17.5l1.7 1.7M1.8 12h2.4M19.8 12h2.4M4.8 19.2l1.7-1.7M17.5 6.5l1.7-1.7"/></g>'
    + '<path class="th-moon" fill="currentColor" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  /* düğmeyi üst bara (dil düğmesinin soluna) yerleştir — tüm sayfalarda otomatik */
  function mount() {
    const tools = document.querySelector('.nav-tools');
    if (tools && !tools.querySelector('.th-btn')) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'th-btn';
      b.innerHTML = ICON;
      b.addEventListener('click', () => toggle(b));
      tools.insertBefore(b, tools.firstChild);
    }
    apply(cur());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
  document.addEventListener('cv:lang', () => apply(cur()));

  window.CVTheme = { get: cur, set(v) { store.set(v); apply(v); } };
})();