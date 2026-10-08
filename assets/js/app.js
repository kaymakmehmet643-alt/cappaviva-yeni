/* =========================================================
   CappaViva — ana uygulama (tüm sayfalarda çalışır)
   Menüler, dil/para birimi, bölümler, animasyonlar, yönlendirme.
   ========================================================= */
(function () {
  'use strict';
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, v) => { const x = clamp((v - a) / (b - a)); return x * x * (3 - 2 * x); };
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const I = window.CVI18N, t = (k, v) => I.t(k, v), store = I.store;
  const isRTL = () => document.documentElement.dir === 'rtl';
  /* Hangi sayfadayız? Ana sayfada #home vardır. Diğer sayfalarda bölüm linkleri index.html'e gider. */
  const HOME = !!document.getElementById('home');
  const H = h => (HOME ? h : 'index.html' + h);
  const DP = 'destinasyonlar.html';

  /* ---------- küçük yardımcılar ---------- */
  let tt;
  function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => el.classList.remove('show'), 3200); }
  function copy(text) {
    try { navigator.clipboard.writeText(text).then(() => toast(t('toast.copied')), () => toast(t('toast.copyFail'))); }
    catch (e) { toast(t('toast.copyFail')); }
  }
  const wa = msg => { const m = window.CVMsg ? CVMsg.wrap(msg) : msg; return 'https://wa.me/' + CV.phone + (m ? '?text=' + encodeURIComponent(m) : ''); };

  /* ---------- para birimi ---------- */
  const rates = Object.assign({}, CV.currencies);
  let cur = 'EUR', ratesLive = false, ratesDate = '';
  const SYM = { EUR: '€', USD: '$', GBP: '£', TRY: '₺', AUD: 'A$', JPY: '¥', CNY: '¥', KRW: '₩' };
  const locale = () => (I.lang === 'ar' || I.lang === 'fa') ? I.lang + '-u-nu-latn' : I.lang;
  function fmt(eur) {
    const step = { TRY: 10, JPY: 10, KRW: 1000 }[cur] || 1;
    const v = Math.round(eur * rates[cur] / step) * step;
    try { return new Intl.NumberFormat(locale(), { style: 'currency', currency: cur, maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(v); }
    catch (e) { return SYM[cur] + v; }
  }
  function curForLang(lang) {
    const reg = (navigator.language || '').split('-')[1] || '';
    if (lang === 'en') return reg === 'GB' ? 'GBP' : reg === 'US' ? 'USD' : reg === 'AU' ? 'AUD' : 'EUR';
    return { tr: 'TRY', ja: 'JPY', zh: 'CNY', ko: 'KRW', ar: 'USD', fa: 'USD' }[lang] || 'EUR';
  }
  function setCur(c, manual) {
    if (!rates[c]) return;
    cur = c; if (manual) store.set('cv_cur', c);
    $('#curCode').textContent = SYM[c] + ' ' + c;
    $$('[data-cur-name]').forEach(el => el.textContent = SYM[c] + ' ' + c);
    $$('[data-eur]').forEach(el => { el.textContent = fmt(+el.dataset.eur); });
    renderCurLists(); liveRate(); if ($('#megaIn')) renderMega();
    if (window.CVPlanner) CVPlanner.render();
    if (window.CVBooking) CVBooking.render();
    renderDrawer();
    document.dispatchEvent(new CustomEvent('cv:cur'));
  }
  function renderCurLists() {
    $('#curList').innerHTML = Object.keys(rates).map(c => `<button class="opt" role="menuitemradio" aria-checked="${c === cur}" data-cur="${c}">${SYM[c]} ${c}<small>${c === 'EUR' ? '' : '1 € = ' + rates[c]}</small></button>`).join('');
    $('#curNote').textContent = ratesLive ? t('ft.rateLive', { d: ratesDate }) : t('ft.rateApprox');
  }
  async function fetchRates() {
    if (CV.liveRates === false) return;
    try {
      const ctl = new AbortController(); setTimeout(() => ctl.abort(), 5000);
      const r = await fetch('https://api.frankfurter.app/latest?from=EUR&to=' + Object.keys(rates).filter(c => c !== 'EUR').join(','), { signal: ctl.signal });
      if (!r.ok) return;
      const j = await r.json();
      Object.assign(rates, j.rates || {}); ratesLive = true; ratesDate = j.date || '';
      setCur(cur, false);
    } catch (e) { /* çevrimdışı ya da engelli: yaklaşık kurlar kullanılır */ }
  }

  /* ---------- gün doğumu (Göreme) ---------- */
  function sunriseMin(y, m, d) {
    const { lat, lon, tz } = CV.geo, rad = Math.PI / 180;
    const N = Math.floor(275 * m / 9) - Math.floor((m + 9) / 12) * (1 + Math.floor((y - 4 * Math.floor(y / 4) + 2) / 3)) + d - 30;
    const lh = lon / 15, tt2 = N + (6 - lh) / 24, M = .9856 * tt2 - 3.289;
    let L = (M + 1.916 * Math.sin(M * rad) + .020 * Math.sin(2 * M * rad) + 282.634 + 360) % 360;
    let RA = (Math.atan(.91764 * Math.tan(L * rad)) / rad + 360) % 360;
    RA = (RA + Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90) / 15;
    const sinD = .39782 * Math.sin(L * rad), cosD = Math.cos(Math.asin(sinD));
    const cosH = (Math.cos(90.833 * rad) - sinD * Math.sin(lat * rad)) / (cosD * Math.cos(lat * rad));
    if (cosH > 1 || cosH < -1) return null;
    const H = (360 - Math.acos(cosH) / rad) / 15, T = H + RA - .06571 * tt2 - 6.622;
    let UT = (T - lh) % 24; if (UT < 0) UT += 24;
    return ((UT + tz) % 24) * 60;
  }
  const hhmm = m => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(Math.round(m % 60)).padStart(2, '0');
  function istanbulNow() {
    const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const g = k => +p.find(x => x.type === k).value; return { y: g('year'), m: g('month'), d: g('day'), h: g('hour'), mi: g('minute') };
  }
  let sunStr = '', wx = null;
  const pad = n => String(n).padStart(2, '0');
  const setLive = (k, v) => $$(`[data-live="${k}"]`).forEach(el => { el.textContent = v; });
  function live() {
    const n = istanbulNow();
    setLive('time', pad(n.h) + ':' + pad(n.mi));
    const tm = new Date(Date.UTC(n.y, n.m - 1, n.d + 1));
    const sr = sunriseMin(tm.getUTCFullYear(), tm.getUTCMonth() + 1, tm.getUTCDate());
    if (sr != null) {
      sunStr = hhmm(Math.round(sr)); setLive('sun', sunStr);
      setLive('pick', '~' + hhmm(Math.round((sr - 60) / 5) * 5));
    }
    if (wx) {
      setLive('temp', Math.round(wx.t) + '°C'); setLive('wind', Math.round(wx.w) + ' km/h');
      $$('[data-live-wrap]').forEach(el => { el.hidden = false; });
    }
    liveRate();
  }
  function liveRate() {
    const c = cur === 'EUR' ? 'TRY' : cur;
    setLive('rate', `1 € = ${rates[c]} ${c} · ${ratesLive ? t('ft.rateLive', { d: ratesDate }) : t('ft.rateApprox')}`);
  }
  /* Göreme'de anlık hava (open-meteo.com, ücretsiz, anahtar gerekmez) */
  async function fetchWeather() {
    if (CV.liveRates === false) return;
    try {
      const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${CV.geo.lat}&longitude=${CV.geo.lon}&current=temperature_2m,wind_speed_10m&timezone=Europe%2FIstanbul`);
      if (!r.ok) return;
      const j = await r.json();
      if (j.current) { wx = { t: j.current.temperature_2m, w: j.current.wind_speed_10m }; live(); }
    } catch (e) { /* çevrimdışı: hava bilgisi gizli kalır */ }
  }

  /* ---------- dinamik içerik ---------- */
  const item = id => CV.catalog.find(x => x.id === id);
  function priceHTML(x) {
    return x && x.eur
      ? `<div class="price"><small>${t('c.pp')}</small><div><b data-eur="${x.eur}">${fmt(x.eur)}</b>${x.old ? `<s data-eur="${x.old}">${fmt(x.old)}</s>` : ''}</div></div>`
      : `<div class="price ask"><small>${t('c.price')}</small><b>${t('c.ask')}</b></div>`;
  }
  function renderTours() {
    const f = ($('#filters [aria-pressed="true"]') || {}).dataset?.f || 'all';
    $('#tgrid').innerHTML = CV.tourTiles.map(x => {
      const it = item(x.id);
      return `<article class="tile rv-s ${x.wide ? 'wide' : ''} ${f !== 'all' && x.f !== f ? 'hide' : ''}" data-f="${x.f}" style="view-transition-name:t-${x.id}">
        <div class="media" data-img="${it.img || ''}" data-scene='${JSON.stringify(x.scene)}'></div>
        <div class="tile-top"><span class="tile-tag">${t(x.tag)}</span><h3>${t(x.n || it.n)}</h3><p>${t(x.p || it.p)}</p></div>
        <div class="tile-bot">${priceHTML(it)}<div class="tile-acts">${x.f === 'balloon' ? `<a class="btn btn-glass btn-sm" href="${H('#balon')}">${t('c.details')}</a>` : ''}<button class="btn btn-primary btn-sm" data-book="${x.id}">${t('c.book')}</button></div></div>
      </article>`;
    }).join('');
  }
  function renderDest() {
       $('#destTrack').innerHTML = CV.destinations.map((d, i) => { const pl = window.CVPlaces && CVPlaces.get(d.k); return `<a class="dcard" href="${pl ? CVPlaces.url(pl) : DP + '#d-' + d.k}"><div class="media" data-img="${d.k}" data-scene='${JSON.stringify(d.scene)}'></div><span class="num">${String(i + 1).padStart(2, '0')}</span>${pl ? `<span class="dc-km">${CVPlaces.dist(pl)}</span>` : ''}<div class="dc-body"><small>${t('d.' + d.k + '.k')}</small><h3>${t('d.' + d.k + '.t')}</h3><p>${t('d.' + d.k + '.p')}</p><span class="dc-go" aria-hidden="true">→</span></div></a>`; }).join('');
    const names = CV.destinations.map(d => t('d.' + d.k + '.t'));
    const row = names.map((n, i) => i % 2 ? `<span><em>${n}</em></span>` : `<span>${n}</span>`).join('<span>·</span>');
    $('#marquee').innerHTML = row + '<span>·</span>' + row + '<span>·</span>';
  }
  let planIdx = 0;
  function renderPlan(i) {
    planIdx = i; const p = CV.plans[i];
    const panel = $('#planPanel');
    panel.innerHTML = `<div class="plan-sum"><span class="eyebrow">${t('pl.example')}</span><h3>${t(p.n)}</h3><p>${t(p.p)}</p><button class="btn btn-primary" data-book="${p.id}">${t('pl.cta')}</button><a class="link" href="#planla">${t('pl.custom')}</a></div>
      <div class="plan-days">${p.days.map((d, k) => `<div class="day"><h4>${t('pl.dayN', { n: k + 1 })}</h4><ol>${d.map(x => `<li><time>${x[0]}</time><div><b>${t(x[1])}</b><span>${t(x[2])}</span></div></li>`).join('')}</ol></div>`).join('')}</div>`;
    panel.classList.remove('plan-anim'); void panel.offsetWidth; panel.classList.add('plan-anim');
    const btns = $$('#seg button'); btns.forEach((b, j) => b.setAttribute('aria-selected', j === i));
    const b = btns[i], ind = $('#segInd');
    ind.style.width = b.offsetWidth + 'px'; ind.style.transform = `translateX(${b.offsetLeft}px)`;
  }
  function renderFaq() {
    $('#faqList').innerHTML = [1, 2, 3, 4, 5, 6].map(i => `<details><summary>${t('faq.q' + i)}<i></i></summary><div class="ans">${t('faq.a' + i)}</div></details>`).join('');
  }
  function renderLangLists() {
    $('#langGrid').innerHTML = I.langs.map(l => `<button class="opt" role="menuitemradio" aria-checked="${l.c === I.lang}" data-lang="${l.c}" lang="${l.c}">${l.n}<small>${l.c.toUpperCase()}</small></button>`).join('');
    $('#langCode').textContent = I.lang.toUpperCase();
    $$('[data-lang-name]').forEach(el => el.textContent = I.info(I.lang).n);
  }
  /* ---------- Premium menü içeriği ---------- */
  /* Menü 3 gruptan oluşur: Keşfet / Deneyimler / CappaViva.
     Başlık anahtarı '@' ile başlarsa places.js'ten, '#' ile başlarsa offers.js'ten gelir. */
  const O = window.CVOffers, PL = window.CVPlaces;
  const SECG = [
    ['gx', [['dest', 'nav.dest'], ['vadi', '@vadi'], ['muze', '@muze'], ['kilise', '@kilise'], ['yeralti', '@yeralti']]],
    ['ge', [['deals', '#deals'], ['premium', '#premium'], ['tours', 'nav.tours'], ['balloon', 'nav.balloon'], ['ws', 'ws.eyebrow'], ['transfer', 'dr.transfer'], ['plans', 'dr.plans'], ['guide', 'nav.guide']]],
    ['gc', [['home', 'nav.home', HOME ? '#top' : 'index.html'], ['about', 'nav.about'], ['contact', 'nav.contact']]]
  ].map(([g, list]) => [g, list.filter(([k]) => (k !== 'deals' && k !== 'premium') || O).filter(([, key]) => key[0] !== '@' || PL)]);
  const SL = key => key[0] === '@' ? PL.t(key.slice(1)) : key[0] === '#' ? O.t(key.slice(1)) : t(key);
  let drActive = O ? 'deals' : 'dest';
  const offPct = x => (x && x.eur && x.old ? Math.round((1 - x.eur / x.old) * 100) : 0);
  const BI = id => { const x = item(id), o = offPct(x);
    return `<li><button type="button" data-book="${id}"><span>${t(x.n)}${O && O.isPop(id) ? `<i class="dr-pop">${O.t('pop')}</i>` : ''}</span><em>${o ? `<i class="dr-off">-${o}%</i>` : ''}${x.eur ? fmt(x.eur) : t('c.ask')}</em></button></li>`; };
  const AL = (href, k, extra = '') => `<li><a href="${href}"><span>${t(k)}</span>${extra}</a></li>`;
  const G = (k, inner, p) => `<div class="dr-g"><h6>${t(k)}</h6>${p ? `<p>${t(p)}</p>` : ''}<ul>${inner}</ul></div>`;
  const MAPS = 'https://www.google.com/maps/search/?api=1&query=G%C3%B6reme%2C%20Nev%C5%9Fehir';
  const liveRows = (cls, keys) => keys.map(([k, l, w]) => `<div class="${cls}" ${w ? `data-live-wrap="${l}" ${wx ? '' : 'hidden'}` : ''}><span>${t(k)}</span><b data-live="${l}">—</b></div>`).join('');
  /* kategori listesi: vadiler, müzeler, kiliseler, yer altı şehirleri */
  const placeCat = c => `<div class="dr-g dr-cat"><h6>${PL.t(c)}</h6><p>${PL.t('i.' + c)}</p>
      <ul class="dr-plist">${PL.byCat(c).map((p, i) => `<li style="--i:${i}"><a href="${PL.url(p)}"><span>${PL.name(p)}</span><em>${p.km ? p.km + ' km' : '●'}</em></a></li>`).join('')}</ul>
      <a class="dr-more" href="${DP}#${c}">${O ? O.t('all') : t('mm.all')} →</a></div>`;
  /* son dakika fırsat kartı */
  const dealCard = (d, i) => { const x = item(d.id); if (!x) return ''; const o = offPct(x);
    return `<div class="dr-deal" style="--i:${i}"><div class="dr-deal-top"><span class="dr-hot">${O.t('hot')}</span>${o ? `<span class="dr-save">${O.t('off', { n: o })}</span>` : ''}</div>
      <b>${t(x.n)}</b><small>${O.t(O.passed(d.until) ? 'next' : d.day)} · ${O.t('closes')} <time data-cd="${d.until}">${O.left(d.until)}</time></small>
      <div class="dr-deal-f"><span class="dr-price">${x.eur ? fmt(x.eur) : t('c.ask')}${x.old ? `<s>${fmt(x.old)}</s>` : ''}</span><button class="btn btn-primary btn-sm" type="button" data-book="${d.id}">${t('c.book')}</button></div></div>`; };
  /* premium paket kartı */
  const pkgCard = (p, i) => { const sum = p.items.reduce((s, id) => s + ((item(id) || {}).eur || 0), 0), save = p.eur && sum ? Math.round((1 - p.eur / sum) * 100) : 0, nm = O.pkgName(p);
    return `<div class="dr-pkg" style="--i:${i}"><div class="dr-deal-top"><span class="dr-gold">PREMIUM · ${O.t('days', { n: p.days })}</span>${p.pop ? `<i class="dr-pop">${O.t('pop')}</i>` : ''}${save > 0 ? `<span class="dr-save">${O.t('save', { n: save })}</span>` : ''}</div>
      <b>${nm}</b><p>${O.pkgDesc(p)}</p><div class="dr-tags">${p.items.map(id => `<span>${t((item(id) || { n: id }).n)}</span>`).join('')}</div>
      <div class="dr-deal-f"><span class="dr-price">${p.eur ? fmt(p.eur) + (sum ? `<s>${fmt(sum)}</s>` : '') : `<small>${sum ? O.t('sep', { p: fmt(sum) }) : ''}</small>`}</span>
      <button class="btn btn-primary btn-sm" type="button" data-book="myplan" data-note="Premium: ${nm} (${p.items.map(id => t((item(id) || { n: id }).n)).join(' + ')})">${p.eur ? t('c.book') : O.t('ask')}</button></div></div>`; };
  function subHTML(k) {
    switch (k) {
      case 'deals': return `<div class="dr-g dr-cat"><h6>${O.t('deals')}</h6><p>${O.t('dealsP')}</p></div><div class="dr-cards">${O.deals.map(dealCard).join('')}</div>`;
      case 'premium': return `<div class="dr-g dr-cat"><h6>${O.t('premium')}</h6><p>${O.t('premP')}</p></div><div class="dr-cards">${O.packages.map(pkgCard).join('')}</div>`;
      case 'vadi': case 'muze': case 'kilise': case 'yeralti': return placeCat(k);
      case 'dest': if (PL) {
        return `<div class="dr-g dr-cat"><h6>${t('nav.dest')}</h6><p>${PL.t('sub')}</p></div>` + ['bolge'].map(c => `<div class="dr-g dr-pl"><h6><a href="${DP}#${c}">${PL.t(c)}</a></h6><ul>${PL.byCat(c).map(p => `<li><a href="${PL.url(p)}">${PL.name(p)}</a></li>`).join('')}</ul></div>`).join('')
          + `<div class="dr-g"><ul>${AL(DP, 'mm.all', '<em>→</em>')}</ul><button class="btn btn-primary" type="button" data-book="vip" style="margin-top:16px">${t('lg.cta')}</button></div>`; }
        return G('dest.eyebrow', CV.destinations.map(d => AL(`${DP}#d-${d.k}`, 'd.' + d.k + '.t', `<em>${t('d.' + d.k + '.k')}</em>`)).join('') + AL(DP, 'mm.all', '<em>→</em>'), 'dest.sub');
      case 'tours': return G('dr.daily', ['kirmizi', 'yesil', 'mix', 'comlektur'].map(BI).join('')) + G('dr.adv', ['atv', 'jeep', 'klasik', 'at', 'deve'].map(BI).join(''));
      case 'balloon': return G('dr.balloon', ['balon-std', 'balon-cmf', 'balon-vip'].map(BI).join(''), 'ft.pol1') + `<div class="dr-g"><h6>${t('ft.live')}</h6>${liveRows('dr-row', [['ft.sunrise', 'sun'], ['ft.pickup', 'pick'], ['wx.wind', 'wind', 1]])}</div>`;
      case 'transfer': return G('dr.transfer', ['x-kayseri', 'x-nevsehir', 'x-shuttle', 'x-city'].map(BI).join(''), 'tr.sub');
      case 'plans': return G('dr.plans', CV.plans.map((p, i) => `<li><button type="button" data-book="${p.id}"><span>${t(p.n)}</span><em>${t('pl.t' + (i + 1))}</em></button></li>`).join('') + AL(H('#planla'), 'dr.planner', '<em>→</em>'), 'pl.sub');
      case 'ws': return G('ws.eyebrow', ['gece', 'sema', 'hamam', 'comlek', 'yemek', 'hali', 'sarap', 'foto'].map(BI).join(''));
      case 'guide': if (window.CVGuide) return CVGuide.menu(); return `<div class="dr-g"><h6>${t('lg.eyebrow')}</h6><p class="dr-big">${t('lg.title')}</p><p>${t('lg.p')}</p><ul class="m-checks">${[1, 2, 3, 4].map(i => `<li>${t('lg.' + i)}</li>`).join('')}</ul><button class="btn btn-primary" type="button" data-book="vip" style="margin-top:18px">${t('lg.cta')}</button></div>`;
      case 'about': return G('why.eyebrow', [1, 2, 3, 4].map(i => AL(H('#hakkimizda'), 'why.r' + i + '.n')).join(''), 'why.title') + G('dr.more', AL(H('#ortaklar'), 'pt.eyebrow') + AL(H('#blog'), 'dr.blog') + AL(H('#yorumlar'), 'rv.eyebrow') + AL(H('#sss'), 'dr.faq'));
      case 'contact': return `<div class="dr-g"><h6>${t('nav.contact')}</h6><p>${t('ct.title')} ${t('ct.sub')}</p><ul><li><a href="${wa('')}" target="_blank" rel="noopener"><span>WhatsApp</span><em dir="ltr">${CV.phoneDisplay}</em></a></li><li><a href="${H('#iletisim')}"><span>${t('ct.mail')}</span><em>${CV.email}</em></a></li><li><a href="${H('#iletisim')}"><span>${t('ct.addr')}</span><em>${t('ct.addrV')}</em></a></li><li><a href="${MAPS}" target="_blank" rel="noopener"><span>${t('ct.maps')}</span><em>↗</em></a></li></ul></div>`;
    }
    return '';
  }
  function renderDrawer() {
    let n = 0;
    const main = SECG.map(([g, list]) => `<div class="dr-grp"><h6><span>${O ? O.t(g) : ''}</span></h6><ol>${list.map(([k, key, href]) => { n++; const d = `transition-delay:${.15 + n * .035}s`, cls = k === 'deals' ? ' is-deal' : k === 'premium' ? ' is-prem' : '';
      const badge = k === 'deals' ? `<i class="dr-badge">${O.t('hot')}</i>` : k === 'premium' ? `<i class="dr-badge gold">VIP</i>` : '';
      return k === 'home'
        ? `<li><a class="dr-item" href="${href}" style="${d}"><small>${pad(n)}</small><span>${SL(key)}</span></a></li>`
        : `<li><button class="dr-item${cls} ${k === drActive ? 'on' : ''}" type="button" data-sec="${k}" aria-expanded="false" style="${d}"><small>${pad(n)}</small><span>${SL(key)}</span>${badge}<b class="arr">→</b></button><div class="dr-inline" data-inline="${k}" hidden></div></li>`; }).join('')}</ol></div>`).join('');
    /* üstte kayan fırsat şeridi */
    const ribbon = O ? O.deals.map(d => { const x = item(d.id); const o = offPct(x); return x ? `<span><b>${O.t('hot')}</b>${t(x.n)} · ${x.eur ? fmt(x.eur) : ''}${o ? ` <em>-${o}%</em>` : ''}</span>` : ''; }).join('') : '';
    const top = O && O.deals[0] ? dealCard(O.deals[0], 0) : '';
    $('#drBody').innerHTML = (ribbon ? `<div class="dr-ribbon" aria-hidden="true"><div>${ribbon}${ribbon}${ribbon}</div></div>` : '') + `<nav class="dr-main" aria-label="${t('nav.menu')}">${main}</nav>
      <div class="dr-sub"><div class="dr-sub-in" id="drSub">${subHTML(drActive)}</div></div>
      <aside class="dr-side">
        ${top ? `<div class="dr-feat">${top}</div>` : ''}
        <div class="dr-card"><h6><i></i>${t('ft.live')}</h6>${liveRows('dr-row', [['ft.time', 'time'], ['ft.sunrise', 'sun'], ['ft.pickup', 'pick'], ['wx.temp', 'temp', 1], ['wx.wind', 'wind', 1], ['ft.rate', 'rate']])}</div>
        ${O ? `<div class="dr-card dr-trust"><h6>${O.t('trust')}</h6><ul><li>${t('ft.pol3')}</li><li>${t('ft.pol4')}</li><li>${t('ft.pol2')}</li></ul></div>` : ''}
        <div class="dr-card"><h6>${t('nav.lang')}</h6><div class="dr-chips">${I.langs.map(l => `<button type="button" data-lang="${l.c}" aria-checked="${l.c === I.lang}" lang="${l.c}">${l.n}</button>`).join('')}</div>
        <h6 style="margin-top:8px">${t('nav.cur')}</h6><div class="dr-chips">${Object.keys(rates).map(c => `<button type="button" data-cur="${c}" aria-checked="${c === cur}">${SYM[c]} ${c}</button>`).join('')}</div></div>
      </aside>`;
  }
  function setDrSec(k) {
    if (k === drActive) return; drActive = k;
    $$('.dr-item[data-sec]').forEach(x => x.classList.toggle('on', x.dataset.sec === k));
    const sub = $('#drSub'); sub.innerHTML = subHTML(k); sub.style.animation = 'none'; void sub.offsetWidth; sub.style.animation = ''; live();
  }

  /* ---------- Üst bar açılır menüleri (mega menü) ---------- */
  function paneHTML(k) {
    const list = ids => `<ul class="m-list">${ids.map(id => { const x = item(id); return `<li><button type="button" data-book="${id}"><span>${t(x.n)}</span><em>${x.eur ? fmt(x.eur) : ''}</em></button></li>`; }).join('')}</ul>`;
    const liveL = keys => `<div class="live-list">${liveRows('', keys)}</div>`;
    switch (k) {
      case 'dest': if (window.CVPlaces) { const P = CVPlaces;
        return P.cats.map(c => `<div class="m-pc"><h5><a href="${DP}#${c.k}">${P.t(c.k)}</a></h5><ul class="m-list">${P.byCat(c.k).map(p => `<li><a href="${P.url(p)}"><span>${P.name(p)}</span><em>${p.km ? p.km + ' km' : '●'}</em></a></li>`).join('')}</ul></div>`).join('')
          + `<div class="m-feature"><h5>${t('lg.eyebrow')}</h5><p class="m-title">${t('lg.title')}</p><p>${t('lg.p')}</p><button class="btn btn-primary btn-sm" type="button" data-book="vip">${t('lg.cta')}</button><a class="link" href="${DP}">${P.t('more')}</a></div>`; }
        return `<div><h5>${t('dest.eyebrow')}</h5><p class="m-title">${t('dest.title')}</p><p class="m-p">${t('dest.sub')}</p><a class="link" href="${DP}">${t('mm.all')}</a></div>
        <div class="m-dest-grid">${CV.destinations.map(d => `<a class="m-card" href="${DP}#d-${d.k}"><span class="thumb"><span class="media" data-img="${d.k}" data-scene='${JSON.stringify(d.scene)}'></span></span><b>${t('d.' + d.k + '.t')}</b><small>${t('d.' + d.k + '.k')}</small></a>`).join('')}</div>`;
      case 'tours': return [['dr.daily', ['kirmizi', 'yesil', 'mix', 'comlektur']], ['dr.adv', ['atv', 'jeep', 'klasik', 'at', 'deve']], ['dr.balloon', ['balon-std', 'balon-cmf', 'balon-vip']], ['dr.culture', ['gece', 'sema', 'hamam', 'comlek', 'yemek', 'hali', 'sarap', 'foto']]].map(([h, ids]) => `<div><h5>${t(h)}</h5>${list(ids)}</div>`).join('')
        + `<div class="m-feature"><h5>${t('ai.eyebrow')}</h5><p class="m-title">${t('ai.title')}</p><p>${t('ai.sub')}</p><a class="btn btn-primary btn-sm" href="${H('#planla')}">${t('hero.cta2')}</a><a class="link" href="${H('#turlar')}">${t('mm.allTours')}</a></div>`;
      case 'balloon': return `<div><h5>${t('bal.eyebrow')}</h5><p class="m-title">${t('bal.title')}</p><p class="m-p">${t('t.balon.p')}</p><a class="link" href="${H('#balon')}">${t('c.details')}</a></div>
        <div class="m-tiers">${[['balon-std', 'b.std'], ['balon-cmf', 'b.cmf'], ['balon-vip', 'b.vip']].map(([id, kk]) => { const x = item(id); return `<button class="m-tier" type="button" data-book="${id}"><small>${t(kk + '.k')}</small><b>${t(kk + '.n')}</b><span>${x.eur ? fmt(x.eur) + ' · ' + t('c.pp') : t('c.ask')}</span></button>`; }).join('')}</div>
        <div><h5>${t('ft.live')}</h5>${liveL([['ft.sunrise', 'sun'], ['ft.pickup', 'pick'], ['wx.wind', 'wind', 1], ['wx.temp', 'temp', 1]])}<p class="m-note">${t('ft.pol1')}</p></div>`;
      case 'about': return `<div><h5>${t('why.eyebrow')}</h5><p class="m-title">${t('why.title')}</p><p class="m-p">4.9 ★ · ${t('trust.rating')} · TÜRSAB</p><a class="link" href="${H('#hakkimizda')}">${t('c.details')}</a></div>
        <div class="m-reasons">${[1, 2, 3, 4].map(i => `<div><b>${t('why.r' + i + '.n')}</b><p>${t('why.r' + i + '.p')}</p></div>`).join('')}</div>
        <div><h5>${t('dr.more')}</h5><ul class="m-list">${[['#ortaklar', 'pt.eyebrow'], ['#blog', 'dr.blog'], ['#yorumlar', 'rv.eyebrow'], ['#sss', 'dr.faq']].map(([h, kk]) => `<li><a href="${H(h)}"><span>${t(kk)}</span><em>→</em></a></li>`).join('')}</ul></div>`;
      case 'contact': return `<div><h5>${t('ct.eyebrow')}</h5><p class="m-title">${t('ct.title')}</p><p class="m-p">${t('ct.sub')}</p><a class="btn btn-wa btn-sm" href="${wa('')}" target="_blank" rel="noopener">WhatsApp</a></div>
        <div class="m-ct"><div><span><small>${t('ct.wa')}</small><b>${CV.phoneDisplay}</b></span></div><div><span><small>${t('ct.mail')}</small><b>${CV.email}</b></span></div><div><span><small>${t('ct.addr')}</small><b>${t('ct.addrV')}</b></span><a class="link" href="${MAPS}" target="_blank" rel="noopener">Maps</a></div></div>
        <div><h5>${t('ft.live')}</h5>${liveL([['ft.time', 'time'], ['ft.sunrise', 'sun'], ['wx.temp', 'temp', 1], ['wx.wind', 'wind', 1]])}</div>`;
      case 'guide': if (window.CVGuide) return CVGuide.menu(); return `<div><h5>${t('lg.eyebrow')}</h5><p class="m-title">${t('lg.title')}</p><p class="m-p">${t('lg.p')}</p><button class="btn btn-primary btn-sm" type="button" data-book="vip">${t('lg.cta')}</button></div>
        <ul class="m-checks">${[1, 2, 3, 4].map(i => `<li>${t('lg.' + i)}</li>`).join('')}</ul>
        <div class="m-feature"><h5>${t('ai.eyebrow')}</h5><p class="m-title">${t('ai.title')}</p><p>${t('ai.sub')}</p><a class="btn btn-primary btn-sm" href="${H('#planla')}">${t('hero.cta2')}</a></div>`;
    }
    return '';
  }
  const PANE_CLS = { dest: window.CVPlaces ? 'm-places' : 'm-dest', tours: 'm-cols', balloon: 'm-balloon', about: 'm-about', contact: 'm-contact', guide: 'm-guide' };
  let megaKey = null;
  function renderMega() {
    $('#megaIn').innerHTML = Object.keys(PANE_CLS).map(k => `<div class="mega-pane ${PANE_CLS[k]} ${k === megaKey ? 'on' : ''}" data-pane="${k}">${paneHTML(k)}</div>`).join('');
  }
  function renderMap() {
    const svg = $('#mapSvg'), R = CVScene.RNG(12); let s = '';
    for (let i = 0; i < 9; i++) { let d = `M-20 ${40 + i * 50}`; for (let x = 0; x <= 640; x += 40) d += ` L${x} ${40 + i * 50 + Math.sin(x / 90 + i) * 14 + (R() - .5) * 8}`; s += `<path d="${d}" fill="none" stroke="#22222a" stroke-width="1"/>`; }
    s += `<path d="M-10 70 C 120 40, 220 110, 300 98 S 470 60, 610 90" fill="none" stroke="#2b4a66" stroke-width="5" stroke-linecap="round"/><text x="470" y="62" fill="#4d7aa3" font-size="12" font-weight="700">Kızılırmak</text>`;
    const P = { nev: [150, 215], uch: [238, 222], gor: [292, 205], pas: [280, 160], ava: [300, 108], ort: [322, 248], urg: [382, 252], kay: [180, 340], der: [175, 400], nav: [112, 78], ksr: [585, 165] };
    const road = (a, b) => `<path d="M${P[a]} L${P[b]}" stroke="#35353f" stroke-width="2" fill="none"/>`;
    s += road('nev', 'uch') + road('uch', 'gor') + road('gor', 'ort') + road('ort', 'urg') + road('gor', 'pas') + road('pas', 'ava') + road('nev', 'kay') + road('kay', 'der') + road('nev', 'nav') + `<path d="M${P.urg} L${P.ksr}" stroke="#35353f" stroke-width="2" stroke-dasharray="5 6" fill="none"/>`;
    const town = (k, n, dx = 10, dy = 4) => `<circle cx="${P[k][0]}" cy="${P[k][1]}" r="4" fill="#a1a1a6"/><text x="${P[k][0] + dx}" y="${P[k][1] + dy}" fill="#c7c7cc" font-size="13" font-weight="600">${n}</text>`;
    s += town('nev', 'Nevşehir', -66) + town('uch', 'Uçhisar', -20, 22) + town('pas', 'Paşabağı', -72) + town('ava', 'Avanos') + town('ort', 'Ortahisar', -24, 22) + town('urg', 'Ürgüp') + town('kay', 'Kaymaklı') + town('der', 'Derinkuyu');
    const plane = (k, n, dx, dy) => `<g transform="translate(${P[k][0] - 11} ${P[k][1] - 11})"><circle cx="11" cy="11" r="15" fill="#f08a24" opacity=".16"/><use href="#i-plane" width="22" height="22" style="color:#f08a24"/></g><text x="${P[k][0] + dx}" y="${P[k][1] + dy}" fill="#f5f5f7" font-size="12.5" font-weight="700">${n}</text>`;
    s += plane('nav', 'NAV ✈', 20, 5) + plane('ksr', 'ASR ✈ Kayseri', -86, 34);
    s += `<g transform="translate(${P.gor})"><circle r="10" fill="#f08a24" opacity=".3"><animate attributeName="r" values="8;26;8" dur="2.6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".45;0;.45" dur="2.6s" repeatCount="indefinite"/></circle><circle r="7" fill="#f08a24" stroke="#000" stroke-width="2"/></g><text x="${P.gor[0] + 14}" y="${P.gor[1] - 10}" fill="#fff" font-size="16" font-weight="800">CappaViva · Göreme</text>`;
    svg.innerHTML = s;
  }
  function mountMedia() { $$('.media[data-scene]').forEach(el => CVScene.mount(el)); }

  function renderAll() {
    if (HOME) { renderTours(); renderDest(); renderPlan(planIdx); renderFaq(); }
    renderLangLists(); renderDrawer(); renderMega(); renderCurLists();
    document.dispatchEvent(new CustomEvent('cv:render'));
    $$('[data-eur]').forEach(el => { el.textContent = fmt(+el.dataset.eur); });
    mountMedia(); bindTiles(); if (HOME) setupDest(); live();
    if ($('#bchip')) $('#bchip').textContent = t(['b.std.n', 'b.cmf.n', 'b.vip.n'][tierIdx]);
    if (window.CVPlanner) CVPlanner.render();
    if (window.CVBooking) CVBooking.render();
  }

  /* ---------- sabit bilgiler ---------- */
  $$('[data-phone]').forEach(el => el.textContent = CV.phoneDisplay);
  $$('[data-email]').forEach(el => el.textContent = CV.email);
  $$('[data-wa-link]').forEach(el => el.href = wa(''));
  $$('[data-copy-phone]').forEach(b => b.addEventListener('click', () => copy(CV.phoneDisplay)));
  $$('[data-copy-email]').forEach(b => b.addEventListener('click', () => copy(CV.email)));
  if ($('#tursabNo')) $('#tursabNo').textContent = CV.tursabNo || '—';
    /* Instagram (data.js > instagram) — tüm sayfalardaki Instagram simgeleri profile gider */
  if (CV.instagram) $$('a[aria-label="Instagram"]').forEach(a => { a.href = 'https://www.instagram.com/' + CV.instagram + '/'; a.target = '_blank'; a.rel = 'noopener'; });
  if (CV.images.tursab) $$('[data-tursab-logo]').forEach(el => { el.innerHTML = `<img src="${CV.images.tursab}" alt="TÜRSAB">`; el.style.background = 'transparent'; el.style.padding = '0'; });
  if ($('#newsForm')) $('#newsForm').addEventListener('submit', e => { e.preventDefault(); $('#newsMail').value = ''; toast(t('nl.ok')); });

  /* ---------- HERO ---------- */
  const nav = $('#nav'), pageHero = $('.page-hero');
  const hero = $('#top'), hc = $('#heroCanvas'), hctx = hc ? hc.getContext('2d') : null, copyEl = $('#heroCopy'), msg = $('#heroMsg'), cue = $('#cue');
  const heroO = { seed: 4, balloons: 38, chim: 1.15, horizon: .64, rise: 0, px: 0 };
  let HW = 0, HH = 0, HT, HB, heroP = 0, heroOn = true, dirty = true, last = 0, pxT = 0; const t0 = performance.now();
  /* Hero arka planı: önce video, yoksa fotoğraf, o da yoksa çizim */
  let heroImg = null;
  function useHeroMedia(el) { el.classList.add('hero-img'); el.style.transform = hc.style.transform; hc.replaceWith(el); heroImg = el; }
  const heroVideo = CV.heroVideo || (CV.images && CV.images.heroVideo);
  if (!HOME) { /* ana sayfa değil: hero yok */ }
  else if (heroVideo && !reduce) {
    const v = document.createElement('video');
    v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
    v.preload = 'auto';
    if (CV.images.hero) v.poster = CV.images.hero;
    v.addEventListener('loadeddata', () => { useHeroMedia(v); v.play().catch(() => {}); }, { once: true });
    v.src = heroVideo;
    /* sekme görünmüyorsa videoyu durdur (pil ve veri tasarrufu) */
    document.addEventListener('visibilitychange', () => { if (heroImg === v) document.hidden ? v.pause() : v.play().catch(() => {}); });
  } else if (CV.images.hero) {
    const im = new Image(); im.alt = ''; im.onload = () => useHeroMedia(im); im.src = CV.images.hero;
  }
  function sizeHero() {
    if (!hc || !hc.isConnected) return;
    const w = hc.offsetWidth, h = hc.offsetHeight; if (!w || (w === HW && h === HH)) return;
    HW = w; HH = h; const d = CVScene.DPR(); hc.width = Math.round(w * d); hc.height = Math.round(h * d); hctx.setTransform(d, 0, 0, d, 0, 0);
    HT = CVScene.buildTerrain(w, h, heroO); HB = CVScene.buildBalloons(heroO); dirty = true;
  }
  function heroFrame(now) {
    heroO.px += (pxT - heroO.px) * .06;
    if (heroOn && !heroImg && (dirty || (!reduce && now - last > 40))) {
      heroO.rise = heroP;
      CVScene.drawScene(hctx, HW, HH, heroO, HT, HB, CVScene.mixPre(CVScene.PRE.dawn, CVScene.PRE.morning, Math.min(1, heroP * .85)), reduce ? 0 : (now - t0) / 1000);
      last = now; dirty = false;
    }
    requestAnimationFrame(heroFrame);
  }
  if (HOME) {
    new IntersectionObserver(e => { heroOn = e[0].isIntersecting; }).observe(hero);
    hero.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') pxT = (e.clientX / innerWidth - .5) * 2; });
    sizeHero(); requestAnimationFrame(heroFrame);
  }

   /* ---------- Destinasyonlar: yatay kayan bölüm (yumuşak kayış + 3B kartlar) ---------- */
  const dest = $('#destinasyonlar'), track = $('#destTrack'), dWrap = $('#destWrap'), dBar = $('#destBar');
  let pinDist = 0, destGoal = 0, destNow = 0, destRAF = 0;
  /* her kartın ekran ortasına uzaklığı: ortadaki kart öne çıkar, kenardakiler döner ve küçülür */
  function destFx() {
    if (!track) return;
    const W = innerWidth;
    track.querySelectorAll('.dcard').forEach(c => {
      const r = c.getBoundingClientRect(), p = clamp((r.left + r.width / 2 - W / 2) / (W * .6), -1, 1);
      c.style.setProperty('--p', p.toFixed(3)); c.style.setProperty('--a', Math.abs(p).toFixed(3));
    });
  }
  /* fare tekerleği sert zıplatmasın: kartlar hedefe yağ gibi kayar */
  function destTick() {
    destNow += (destGoal - destNow) * (reduce ? 1 : .09);
    if (Math.abs(destGoal - destNow) < .0005) destNow = destGoal;
    track.style.transform = `translate3d(${(isRTL() ? 1 : -1) * destNow * pinDist}px,0,0)`;
    dBar.style.transform = `scaleX(${.1 + .9 * destNow})`;
    destFx();
    destRAF = destNow === destGoal ? 0 : requestAnimationFrame(destTick);
  }
  function setupDest() {
    if (!dest || !track) return;
    const pin = innerWidth >= 900 && !reduce;
    dest.classList.toggle('pinned', pin);
    if (pin) { pinDist = Math.max(0, track.scrollWidth - innerWidth); dest.style.height = (innerHeight + pinDist) + 'px'; }
    else { dest.style.height = ''; track.style.transform = ''; pinDist = 0; }
    destFx();
  }
  if (dWrap) dWrap.addEventListener('scroll', () => { if (!pinDist) { const m = dWrap.scrollWidth - dWrap.clientWidth; dBar.style.transform = `scaleX(${.1 + .9 * clamp(Math.abs(dWrap.scrollLeft) / (m || 1))})`; destFx(); } }, { passive: true });

  /* ---------- Balon kademeleri ---------- */
  const bMedia = $$('#bvis .media'), tiers = $$('.tier'); let tierIdx = 0;
  const tierIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; tierIdx = +e.target.dataset.i;
    tiers.forEach(x => x.classList.toggle('on', x === e.target));
    bMedia.forEach((m, j) => { m.classList.toggle('on', j === tierIdx); if (j === tierIdx && m._slot) CVScene.paint(m._slot); });
    $('#bchip').textContent = t(['b.std.n', 'b.cmf.n', 'b.vip.n'][tierIdx]);
  }), { rootMargin: '-45% 0px -45% 0px' });
  tiers.forEach(x => tierIO.observe(x));

  /* ---------- kaydırma ---------- */
  const secIds = ['top', 'destinasyonlar', 'turlar', 'balon', 'hakkimizda', 'iletisim'];
  let ticking = false;
  function onScroll() {
    const y = scrollY, vh = innerHeight, bv = document.body.classList.contains('bview-on');
    let heroLimit = -1;
    if (HOME && hero && !bv) {
      const span = hero.offsetHeight - vh; heroP = clamp(y / span); dirty = true;
      const a = smooth(.18, .45, heroP), m = smooth(.42, .6, heroP) * (1 - smooth(.9, 1, heroP));
      copyEl.style.opacity = 1 - a; copyEl.style.transform = `translateY(${-heroP * 80}px) scale(${1 - heroP * .1})`;
      msg.style.opacity = m; msg.style.transform = `translateY(${(1 - smooth(.42, .6, heroP)) * 40}px)`;
      cue.style.opacity = 1 - smooth(0, .08, heroP);
      (heroImg || hc).style.transform = `scale(${1.08 - heroP * .08})`;
      heroLimit = span + vh * .55;
    } else if (!HOME && $('.page-hero')) heroLimit = $('.page-hero').offsetHeight - nav.offsetHeight;
    nav.classList.toggle('on-hero', !bv && y < heroLimit && !document.body.classList.contains('drawer-open'));
    const dh = document.documentElement.scrollHeight - vh; $('#progress').style.transform = `scaleX(${dh > 0 ? y / dh : 0})`;
       if (HOME && pinDist) {
      const top = dest.getBoundingClientRect().top + y;
      destGoal = clamp((y - top) / pinDist);
      if (!destRAF) destRAF = requestAnimationFrame(destTick);
    }
    if (HOME) {
      if (bv) { $$('#navLinks a').forEach(l => l.classList.remove('active')); return; }
      let cur = 'top';
      for (const id of secIds) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < vh * .4) cur = id; }
      $$('#navLinks a').forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur && cur !== 'top'));
    }
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
  let rzT; addEventListener('resize', () => { clearTimeout(rzT); rzT = setTimeout(() => { sizeHero(); setupDest(); if (HOME) renderPlan(planIdx); onScroll(); }, 120); });

  /* ---------- turlar: filtre + ışık efekti ---------- */
  if ($('#filters')) $('#filters').addEventListener('click', e => {
    const b = e.target.closest('[data-f]'); if (!b) return;
    const go = () => { $$('#filters button').forEach(x => x.setAttribute('aria-pressed', x === b)); $$('#tgrid .tile').forEach(tl => tl.classList.toggle('hide', b.dataset.f !== 'all' && tl.dataset.f !== b.dataset.f)); };
    (document.startViewTransition && !reduce) ? document.startViewTransition(go) : go();
  });
  function bindTiles() {
    $$('.tile,.tr,.xcard,.stat,.reason,.post,.day,.pt,.ct-item,.dl-card').forEach(tl => { if (tl._b) return; tl._b = 1; tl.addEventListener('pointermove', e => { const r = tl.getBoundingClientRect(); tl.style.setProperty('--mx', (e.clientX - r.left) + 'px'); tl.style.setProperty('--my', (e.clientY - r.top) + 'px'); }); });
  }
  if ($('#seg')) $('#seg').addEventListener('click', e => { const b = e.target.closest('[data-plan]'); if (b) renderPlan(+b.dataset.plan); });

  /* ---------- sayaçlar ---------- */
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting || reduce) return; cio.unobserve(e.target);
    const el = e.target, to = +el.dataset.count, dec = +(el.dataset.dec || 0), suf = el.dataset.suf || '', t1 = performance.now();
    const f = n => { const k = clamp((n - t1) / 1400), v = to * (1 - Math.pow(1 - k, 3)); el.textContent = (dec ? v.toFixed(dec) : Math.round(v).toLocaleString(locale())) + suf; if (k < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => cio.observe(el));

  /* ---------- açılır menüler (dil / para birimi) ---------- */
  function closePops() { $$('.pop-wrap.open').forEach(p => { p.classList.remove('open'); p.querySelector('.chip-btn').setAttribute('aria-expanded', 'false'); }); }
  function togglePop(wrap) { const o = !wrap.classList.contains('open'); closePops(); wrap.classList.toggle('open', o); wrap.querySelector('.chip-btn').setAttribute('aria-expanded', o); }
  $('#langBtn').addEventListener('click', e => { e.stopPropagation(); togglePop($('#langWrap')); });
  $('#curBtn').addEventListener('click', e => { e.stopPropagation(); togglePop($('#curWrap')); });
  $$('[data-open]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); const w = b.dataset.open === 'lang' ? $('#langWrap') : $('#curWrap'); if (getComputedStyle(w).display === 'none') { openDrawer(); return; } togglePop(w); }));
  document.addEventListener('click', e => {
    if (!e.target.closest('.pop')) closePops();
    const lb = e.target.closest('[data-lang]'); if (lb) { chooseLang(lb.dataset.lang); }
    const cb = e.target.closest('[data-cur]'); if (cb) { setCur(cb.dataset.cur, true); closePops(); toast(t('toast.cur', { c: cb.dataset.cur })); }
  });
  function chooseLang(code) {
    closePops(); hidePrompt();
    const go = () => I.set(code);
    (document.startViewTransition && !reduce) ? document.startViewTransition(go) : go();
  }
  document.addEventListener('cv:lang', () => {
    if (!store.get('cv_cur')) setCur(curForLang(I.lang), false);
    renderAll(); onScroll();
  });

  /* ---------- premium menü ---------- */
  const drawer = $('#drawer');
  function openDrawer() {
    hideMega(true);
    document.body.classList.add('drawer-open', 'lock'); drawer.setAttribute('aria-hidden', 'false'); $('#menuBtn').setAttribute('aria-expanded', 'true');
    closePops(); live(); setTimeout(() => $('#drClose').focus(), 400);
  }
  function closeDrawer() {
    if (!document.body.classList.contains('drawer-open')) return;
    document.body.classList.remove('drawer-open', 'lock'); drawer.setAttribute('aria-hidden', 'true'); $('#menuBtn').setAttribute('aria-expanded', 'false'); onScroll();
  }
  $('#menuBtn').addEventListener('click', openDrawer);
  $('#drClose').addEventListener('click', closeDrawer);
  drawer.addEventListener('click', e => {
    const a = e.target.closest('a[href]'); if (a && a.target !== '_blank') { closeDrawer(); return; }
    const b = e.target.closest('[data-sec]'); if (!b) return;
    const k = b.dataset.sec;
    if (matchMedia('(max-width:900px)').matches) {
      const box = drawer.querySelector(`[data-inline="${k}"]`), open = box.hidden;
      $$('.dr-inline').forEach(x => { x.hidden = true; });
      $$('.dr-item[data-sec]').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-expanded', 'false'); });
      if (open) { box.innerHTML = subHTML(k); box.hidden = false; b.classList.add('on'); b.setAttribute('aria-expanded', 'true'); live(); }
    } else setDrSec(k);
  });
  drawer.addEventListener('mouseover', e => { const b = e.target.closest('[data-sec]'); if (b && matchMedia('(hover:hover) and (min-width:901px)').matches) setDrSec(b.dataset.sec); });

  /* ---------- mega menü: fareyle üzerine gelince açılır ---------- */
  const megaEl = $('#mega'); let megaT;
  const canHover = () => matchMedia('(hover:hover) and (min-width:1241px)').matches;
  function showPane(k) {
    clearTimeout(megaT); megaKey = k;
    $$('#navLinks [data-mega]').forEach(li => li.classList.toggle('open', li.dataset.mega === k));
    $$('.mega-pane').forEach(p => p.classList.toggle('on', p.dataset.pane === k));
    megaEl.classList.add('open'); nav.classList.add('mega-open'); document.body.classList.add('mega-on');
    closePops(); live();
  }
  function hideMega(now) {
    clearTimeout(megaT);
    const f = () => { megaKey = null; megaEl.classList.remove('open'); nav.classList.remove('mega-open'); document.body.classList.remove('mega-on'); $$('#navLinks [data-mega]').forEach(li => li.classList.remove('open')); };
    now ? f() : (megaT = setTimeout(f, 180));
  }
  $$('#navLinks [data-mega]').forEach(li => {
    li.addEventListener('mouseenter', () => { if (canHover()) showPane(li.dataset.mega); });
    li.addEventListener('focusin', () => { if (canHover()) showPane(li.dataset.mega); });
  });
  $$('#navLinks > li:not([data-mega])').forEach(li => li.addEventListener('mouseenter', () => hideMega()));
  $('.nav-tools').addEventListener('mouseenter', () => hideMega());
  nav.addEventListener('mouseleave', () => hideMega());
  megaEl.addEventListener('mouseenter', () => clearTimeout(megaT));
  $('#megaScrim').addEventListener('mouseenter', () => hideMega());
  $('#megaScrim').addEventListener('click', () => hideMega(true));
  megaEl.addEventListener('click', e => { if (e.target.closest('a,button')) hideMega(true); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { hideMega(true); closeDrawer(); closePops(); hidePrompt(); } });

  /* ---------- rezervasyon sayfası (yönlendirme) ---------- */
  const main = $('#home'), bview = $('#bview'); let savedY = 0;
  function showBooking(on, target) {
    const doIt = () => {
      main.hidden = on; bview.hidden = !on; document.body.classList.toggle('bview-on', on);
      if (on) { window.scrollTo(0, 0); }
      else if (target) { const el = document.getElementById(target); if (el) el.scrollIntoView(); else window.scrollTo(0, savedY); }
      else window.scrollTo(0, savedY);
      setupDest(); onScroll();
    };
    (document.startViewTransition && !reduce) ? document.startViewTransition(doIt) : doIt();
  }
  function route() {
    if (!bview) return;
    const h = location.hash.slice(1);
    if (h === 'rezervasyon') { if (bview.hidden) showBooking(true); }
    else if (!bview.hidden) showBooking(false, h || null);
  }
  addEventListener('hashchange', route);
  function openBooking(id, note) {
    closeDrawer(); hideMega(true);
    if (!bview || !window.CVBooking) {
      /* başka sayfadayız: seçimi hatırla, ana sayfadaki rezervasyona git */
      try { sessionStorage.setItem('cv_book', JSON.stringify({ id: id || '', note: note || '' })); } catch (e) {}
      location.href = 'index.html#rezervasyon'; return;
    }
    CVBooking.open(id, note);
    if (bview.hidden) savedY = scrollY;
    if (location.hash !== '#rezervasyon') location.hash = 'rezervasyon'; else route();
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-book]'); if (!b) return;
    e.preventDefault(); openBooking(b.dataset.book || null, b.dataset.note);
  });
  if ($('#bvBack')) $('#bvBack').addEventListener('click', e => { e.preventDefault(); history.pushState(null, '', location.pathname + location.search); showBooking(false); });

  /* ---------- dil sorusu ---------- */
  const lp = $('#lp');
  function hidePrompt() { lp.classList.remove('show'); setTimeout(() => lp.hidden = true, 700); }
  function maybePrompt() {
    if (store.get('cv_lang')) return;
    const d = I.detect(); if (!d || d === I.lang) return;
    const info = I.info(d);
    $('#lpQ').textContent = info.q; $('#lpQ').lang = d; $('#lpQ').dir = info.rtl ? 'rtl' : 'ltr';
    $('#lpYes').textContent = info.y; $('#lpNo').textContent = info.no;
    lp.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => lp.classList.add('show')));
    $('#lpYes').onclick = () => chooseLang(d);
    $('#lpNo').onclick = () => { store.set('cv_lang', I.lang); hidePrompt(); };
  }

  /* ---------- açılış ---------- */
  if ($('#mapSvg')) renderMap();
  const API = { t, fmt, wa, iso, copy, toast, reduce, book: openBooking, mount: mountMedia, bindTiles };
  window.CVApp = API;
  if (window.CVPlanner && $('#bot')) CVPlanner.init($('#bot'), API);
  if (window.CVBooking && bview) CVBooking.init(API);
  const saved = store.get('cv_lang');
  const savedCur = store.get('cv_cur');
  I.set(saved || CV.defaultLang, { save: !!saved }).then(() => {
    if (savedCur && rates[savedCur]) setCur(savedCur, false); else setCur(curForLang(I.lang), false);
    if (bview && location.hash === '#rezervasyon') {
      let pre = null; try { pre = JSON.parse(sessionStorage.getItem('cv_book') || 'null'); sessionStorage.removeItem('cv_book'); } catch (e) {}
      bview.hidden = false; main.hidden = true; document.body.classList.add('bview-on');
      CVBooking.open(pre && pre.id ? pre.id : null, pre && pre.note ? pre.note : undefined);
    }
    onScroll();
    fetchRates(); fetchWeather(); setInterval(fetchWeather, 15 * 60000);
    setInterval(live, 30000);
  });

  const intro = $('#intro');
  let seen = false; try { seen = sessionStorage.getItem('cv_intro') === '1'; sessionStorage.setItem('cv_intro', '1'); } catch (e) {}
  if (!intro || reduce || seen) { if (intro) intro.remove(); setTimeout(maybePrompt, 800); }
  else { setTimeout(() => intro.classList.add('go'), 1250); setTimeout(() => { intro.remove(); maybePrompt(); }, 2300); }
})();