/* =========================================================
   CappaViva — TÜM TURLAR sayfası (turlar.html)
   Turlar data.js'teki katalogdan, fırsatlar ve paketler
   offers.js'ten gelir. Fiyat değişince burası da değişir.
   ========================================================= */
(function () {
  const A = window.CVApp, O = window.CVOffers, root = document.getElementById('toursPage');
  if (!A || !root) return;
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const t = k => A.t(k), pad = n => String(n).padStart(2, '0');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = k => t(k) !== k;

  /* kategoriler: [kimlik, başlık anahtarı, sayfa çapası, yedek çizim] */
  const CATS = [
    ['balloon', 'dr.balloon', 'balloon', { p: 'dawn', balloons: 26, chim: 1.1 }],
    ['daily', 'dr.daily', 'daily', { p: 'sunset', chim: 1.4 }],
    ['adv', 'dr.adv', 'adv', { p: 'dusk', chim: 1.2 }],
    ['culture', 'dr.culture', 'culture', { p: 'night', chim: .8 }],
    ['transfer', 'dr.transfer', 'transfer', { p: 'morning', chim: .6 }]
  ];
  const list = c => CV.catalog.filter(x => x.cat === c);
  const tile = id => (CV.tourTiles || []).find(x => x.id === id) || {};
  const name = x => t(tile(x.id).n || x.n);
  const desc = x => {
    const k = tile(x.id).p || x.p; if (k && has(k)) return t(k);
    const base = x.n.replace(/\.n$/, '');
    return [1, 2, 3].map(i => base + '.' + i).filter(has).map(t).join(' · ');
  };
  const off = x => (x.eur && x.old ? Math.round((1 - x.eur / x.old) * 100) : 0);
  const scene = (x, c, i) => JSON.stringify(tile(x.id).scene || Object.assign({ seed: 300 + i * 7 }, c[3]));

  function card(x, c, i) {
    const o = off(x), pop = O && O.isPop(x.id);
    return `<article class="tc-card rv" id="t-${x.id}">
      <div class="tc-media"><span class="media" data-img="${x.img || x.id}" data-scene='${scene(x, c, i)}'></span>
        <div class="tc-badges">${o ? `<span class="tc-off">-${o}%</span>` : ''}${pop ? `<span class="tc-pop">★ ${O.t('pop')}</span>` : ''}</div></div>
      <div class="tc-body">
        <small class="dl-tag">${t(c[1])}</small>
        <h3>${esc(name(x))}</h3>
        <p>${esc(desc(x))}</p>
        <div class="tc-foot">
          <div class="tc-price">${x.eur ? `<b data-eur="${x.eur}">${A.fmt(x.eur)}</b>${x.old ? `<s data-eur="${x.old}">${A.fmt(x.old)}</s>` : ''}<small>${t('c.pp')}</small>` : `<b>${t('c.ask')}</b>`}</div>
          <div class="tc-acts"><a class="btn btn-line btn-sm" target="_blank" rel="noopener" href="${A.wa(name(x) + ' — CappaViva')}" aria-label="WhatsApp"><svg width="16" height="16"><use href="#i-wa"/></svg></a><button class="btn btn-primary btn-sm" type="button" data-book="${x.id}">${t('c.book')}</button></div>
        </div>
      </div>
    </article>`;
  }

  function render() {
    document.title = t('nav.tours') + ' · CappaViva';
    const total = CATS.reduce((s, c) => s + list(c[0]).length, 0);
    const tabs = (O ? [['deals', O.t('deals'), O.deals.length]] : []).concat(CATS.map(c => [c[2], t(c[1]), list(c[0]).length])).concat(O ? [['premium', O.t('premium'), O.packages.length]] : []);

    root.innerHTML = `
    <section class="page-hero" aria-labelledby="tpTitle">
      <span class="media" data-img="hero" data-scene='{"p":"dawn","seed":4,"balloons":34,"chim":1.2}'></span>
      <div class="page-hero-shade"></div>
      <div class="c page-hero-in">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">${t('nav.home')}</a><span aria-hidden="true">/</span><span>${t('nav.tours')}</span></nav>
        <p class="eyebrow">${t('mm.allTours')} · ${total}</p>
        <h1 id="tpTitle">${esc(t('tours.title'))}</h1>
        <p class="page-lede">${esc(t('tours.sub'))}</p>
        <div class="ph-cats">${CATS.map(c => `<a href="#${c[2]}"><b>${pad(list(c[0]).length)}</b><span>${t(c[1])}</span></a>`).join('')}</div>
      </div>
    </section>

    <nav class="dp-tabs" id="tpTabs" aria-label="Categories"><div class="c dp-tabs-in">${tabs.map(([k, l, n]) => `<a href="#${k}" data-tab="${k}">${esc(l)}<small>${n}</small></a>`).join('')}</div></nav>

    ${O ? `<section class="tp-dark" id="deals"><div class="c">
      <div class="dp-head rv"><span class="dp-num">%</span><div><h2 class="h2">${O.t('deals')}</h2><p class="lede">${O.t('dealsP')}</p></div></div>
      <div class="tp-deals">${O.deals.map(d => { const x = CV.catalog.find(y => y.id === d.id); if (!x) return ''; const o = off(x);
        return `<div class="dr-deal rv"><div class="dr-deal-top"><span class="dr-hot">${O.t('hot')}</span>${o ? `<span class="dr-save">${O.t('off', { n: o })}</span>` : ''}</div>
          <b>${esc(name(x))}</b><small>${O.t(O.passed(d.until) ? 'next' : d.day)} · ${O.t('closes')} <time data-cd="${d.until}">${O.left(d.until)}</time></small>
          <div class="dr-deal-f"><span class="dr-price">${x.eur ? `<span data-eur="${x.eur}">${A.fmt(x.eur)}</span>` : t('c.ask')}${x.old ? `<s data-eur="${x.old}">${A.fmt(x.old)}</s>` : ''}</span><button class="btn btn-primary btn-sm" type="button" data-book="${d.id}">${t('c.book')}</button></div></div>`; }).join('')}</div>
    </div></section>` : ''}

    ${CATS.map((c, ci) => `<section class="dp-sec ${ci % 2 ? 'alt' : ''}" id="${c[2]}">
      <div class="c">
        <div class="dp-head rv"><span class="dp-num">${pad(ci + 1)}</span><div><h2 class="h2">${t(c[1])}</h2></div><span class="dp-count">${list(c[0]).length}</span></div>
        <div class="tc-grid">${list(c[0]).map((x, i) => card(x, c, i)).join('')}</div>
      </div>
    </section>`).join('')}

    ${O ? `<section class="tp-dark" id="premium"><div class="c">
      <div class="dp-head rv"><span class="dp-num">★</span><div><h2 class="h2">${O.t('premium')}</h2><p class="lede">${O.t('premP')}</p></div></div>
      <div class="tp-pkgs">${O.packages.map(p => { const items = p.items.map(id => CV.catalog.find(y => y.id === id)).filter(Boolean), sum = items.reduce((s, x) => s + (x.eur || 0), 0), save = p.eur && sum ? Math.round((1 - p.eur / sum) * 100) : 0, nm = O.pkgName(p);
        return `<div class="dr-pkg rv"><div class="dr-deal-top"><span class="dr-gold">PREMIUM · ${O.t('days', { n: p.days })}</span>${p.pop ? `<i class="dr-pop">${O.t('pop')}</i>` : ''}${save > 0 ? `<span class="dr-save">${O.t('save', { n: save })}</span>` : ''}</div>
          <b>${esc(nm)}</b><p>${esc(O.pkgDesc(p))}</p><div class="dr-tags">${items.map(x => `<span>${esc(name(x))}</span>`).join('')}</div>
          <div class="dr-deal-f"><span class="dr-price">${p.eur ? `<span data-eur="${p.eur}">${A.fmt(p.eur)}</span>${sum ? `<s data-eur="${sum}">${A.fmt(sum)}</s>` : ''}` : `<small>${sum ? O.t('sep', { p: A.fmt(sum) }) : ''}</small>`}</span>
          <button class="btn btn-primary btn-sm" type="button" data-book="myplan" data-note="Premium: ${esc(nm)} (${items.map(x => esc(name(x))).join(' + ')})">${p.eur ? t('c.book') : O.t('ask')}</button></div></div>`; }).join('')}</div>
    </div></section>` : ''}

    <section class="cta-band">
      <div class="c cta-in rv">
        <div><p class="eyebrow">${t('ai.eyebrow')}</p><h2 class="h2">${esc(t('ai.title'))}</h2><p class="lede">${esc(t('ai.sub'))}</p></div>
        <div class="row"><a class="btn btn-primary" href="index.html#planla">${t('hero.cta2')}</a><button class="btn btn-line" type="button" data-book="vip">${t('lg.cta')}</button></div>
      </div>
    </section>`;

    A.mount(); A.bindTiles && A.bindTiles();
    spy();
  }

  let io;
  function spy() {
    if (io) io.disconnect();
    if (!('IntersectionObserver' in window)) return;
    io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      $$('#tpTabs [data-tab]').forEach(a => a.classList.toggle('on', a.dataset.tab === e.target.id));
      const on = $('#tpTabs .on'); if (on && matchMedia('(max-width:900px)').matches) on.parentNode.scrollTo({ left: on.offsetLeft - 16, behavior: 'smooth' });
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('#toursPage > section[id]').forEach(s => io.observe(s));
  }
  /* başka sayfadan turlar.html#culture gibi gelinirse o bölüme git */
  function focusHash() { const h = location.hash.slice(1); const el = h && document.getElementById(h); if (el) setTimeout(() => el.scrollIntoView(), 80); }

  document.addEventListener('cv:render', render);
  render();
  setTimeout(focusHash, 400);
})();