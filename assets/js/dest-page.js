/* =========================================================
   CappaViva — Destinasyonlar sayfası
   Kategorileri (bölgeler, vadiler, müzeler, kiliseler, yer altı
   şehirleri) ve kartları places.js'teki listeden çizer.
   ========================================================= */
(function () {
  const P = window.CVPlaces, A = window.CVApp;
  if (!P || !A || !document.getElementById('dpSections')) return;
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const tourName = id => { const x = CV.catalog.find(c => c.id === id); return x ? A.t(x.n) : id; };

  function card(p, i) {
    const nm = P.name(p);
    return `<article class="dl-card rv" id="d-${p.k}">
      <div class="dl-media"><span class="media" data-img="${p.k}" data-scene='${JSON.stringify(p.scene)}'></span><span class="dl-no">${pad(i + 1)}</span><span class="dl-km">${P.dist(p)}</span></div>
      <div class="dl-body">
        <small class="dl-tag">${P.t(p.c)}</small>
        <h3>${p.page ? `<a href="${P.url(p)}">${esc(nm)}</a>` : esc(nm)}</h3>
        <p>${esc(P.desc(p))}</p>
        <div class="dl-tours"><small>${P.t('tours')}</small><div class="dl-chips">${p.tours.map(id => `<button type="button" data-book="${id}">${tourName(id)}</button>`).join('')}</div></div>
        <div class="dl-acts">${p.page ? `<a class="btn btn-primary btn-sm" href="${P.url(p)}">${A.t('c.details')}</a>` : ''}
          <button class="btn btn-dark btn-sm" type="button" data-book="vip" data-note="${esc(nm)}">${P.t('guide')}</button>
          <a class="btn btn-line btn-sm" href="${A.wa(nm + ' — CappaViva')}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </article>`;
  }

  function render() {
    $$('[data-pt]').forEach(el => { el.textContent = P.t(el.dataset.pt); });
    document.title = A.t('nav.dest') + ' · CappaViva';

    $('#dpStats').innerHTML = P.cats.map((c, i) => `<a href="#${c.k}"><b>${pad(P.byCat(c.k).length)}</b><span>${P.t(c.k)}</span></a>`).join('');

    $('#dpTabs').innerHTML = `<div class="c dp-tabs-in"><a href="#top-dp" data-tab="all" class="on">${P.t('all')}<small>${P.items.length}</small></a>${P.cats.map(c => `<a href="#${c.k}" data-tab="${c.k}">${P.t(c.k)}<small>${P.byCat(c.k).length}</small></a>`).join('')}</div>`;

    $('#dpSections').innerHTML = P.cats.map((c, ci) => {
      const list = P.byCat(c.k);
      return `<section class="dp-sec ${ci % 2 ? 'alt' : ''}" id="${c.k}" aria-labelledby="h-${c.k}">
        <div class="c">
          <div class="dp-head rv">
            <span class="dp-num">${pad(ci + 1)}</span>
            <div><h2 class="h2" id="h-${c.k}">${P.t(c.k)}</h2><p class="lede">${P.t('i.' + c.k)}</p></div>
            <span class="dp-count">${P.t('n', { n: list.length })}</span>
          </div>
          <div class="dl-grid">${list.map(card).join('')}</div>
        </div>
      </section>`;
    }).join('');

    A.mount(); A.bindTiles && A.bindTiles();
    spy();
  }

  /* aktif sekme: kaydırırken hangi kategorideysek o yanar */
  let io;
  function spy() {
    if (io) io.disconnect();
    if (!('IntersectionObserver' in window)) return;
    io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const k = e.target.id;
      $$('#dpTabs [data-tab]').forEach(a => a.classList.toggle('on', a.dataset.tab === k));
      const on = $('#dpTabs .on'); if (on && on.scrollIntoView && matchMedia('(max-width:900px)').matches) on.parentNode.scrollTo({ left: on.offsetLeft - 16, behavior: 'smooth' });
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('.dp-sec').forEach(s => io.observe(s));
  }

  /* "Tümü" sekmesi sayfanın başına götürür */
  document.addEventListener('click', e => {
    const a = e.target.closest('#dpTabs [data-tab="all"]'); if (!a) return;
    e.preventDefault(); window.scrollTo({ top: $('#dpTabs').offsetTop - 70, behavior: 'smooth' });
  });

  /* başka sayfadan #d-goreme gibi bir bağlantıyla gelinirse o karta git ve parlat */
  function focusHash() {
    const h = decodeURIComponent(location.hash.slice(1)); if (!h) return;
    const el = document.getElementById(h); if (!el) return;
    setTimeout(() => {
      el.scrollIntoView({ block: h.startsWith('d-') ? 'center' : 'start' });
      if (h.startsWith('d-')) { el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }
    }, 60);
  }
  addEventListener('hashchange', focusHash);

  document.addEventListener('cv:lang', render);
  render();
  setTimeout(focusHash, 300);
})();