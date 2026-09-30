/* =========================================================
   Akıllı plan asistanı — ziyaretçinin cevaplarına göre
   gün gün program oluşturur (kural tabanlı, internet gerekmez).
   ========================================================= */
(function () {
  const ACT = {
    'balon-std': { n: 't.balon.n', p: 't.balon.p', slot: 'dawn', i: ['balloon'], eur: 150 },
    kirmizi:  { n: 't.kirmizi.n', p: 't.kirmizi.p', slot: 'day', i: ['history', 'nature'], eur: 60 },
    yesil:    { n: 't.yesil.n', p: 't.yesil.p', slot: 'day', i: ['history', 'nature'] },
    mix:      { n: 't.mix.n', p: 't.mix.p', slot: 'day', i: ['history', 'nature'] },
    comlektur:{ n: 't.comlektur.n', p: 't.comlektur.p', slot: 'day', i: ['workshop'] },
    atv:      { n: 't.atv.n', p: 't.atv.p', slot: 'sunset', i: ['adv'], eur: 35 },
    jeep:     { n: 't.jeep.n', p: 't.jeep.p', slot: 'sunset', i: ['adv', 'photo', 'nature'], eur: 50 },
    at:       { n: 't.at.n', p: 't.at.p', slot: 'sunset', i: ['adv', 'nature'] },
    klasik:   { n: 't.klasik.n', p: 't.klasik.p', slot: 'sunset', i: ['photo', 'adv'] },
    foto:     { n: 'w.foto.n', p: 'w.foto.p', slot: 'sunset', i: ['photo'] },
    deve:     { n: 't.deve.n', p: 't.deve.p', slot: 'sunset', i: ['adv'] },
    comlek:   { n: 'w.comlek.n', p: 'w.comlek.p', slot: 'pm', i: ['workshop'] },
    yemek:    { n: 'w.yemek.n', p: 'w.yemek.p', slot: 'pm', i: ['food', 'workshop'] },
    hali:     { n: 'w.hali.n', p: 'w.hali.p', slot: 'pm', i: ['workshop', 'history'] },
    sarap:    { n: 'w.sarap.n', p: 'w.sarap.p', slot: 'pm', i: ['food'] },
    gece:     { n: 'w.gece.n', p: 'w.gece.p', slot: 'eve', i: ['night', 'food'] },
    sema:     { n: 'w.sema.n', p: 'w.sema.p', slot: 'eve', i: ['night', 'history'] },
    hamam:    { n: 'w.hamam.n', p: 'w.hamam.p', slot: 'eve', i: ['relax'] }
  };
  const TIME = { dawn: '05:00', day: '09:30', pm: '14:30', sunset: '17:30', eve: '20:00' };
  const INTS = ['balloon', 'history', 'adv', 'nature', 'food', 'workshop', 'night', 'photo'];
  const ICON = { balloon: 'i-balloon', history: 'i-spin', adv: 'i-route', nature: 'i-route', food: 'i-wine', workshop: 'i-chef', night: 'i-star', photo: 'i-cam' };

  const S = { step: 0, date: '', days: 3, arrive: 'am', ints: new Set(['balloon', 'history']), pace: 'mid', group: 'couple', people: 2, result: null, err: '' };
  let root, A;

  function build() {
    const has = k => S.ints.has(k), fam = S.group === 'family';
    const pick = (ids) => ids.filter(id => ACT[id].i.some(has));
    const dayQ = pick(['kirmizi', 'yesil', 'comlektur']);
    if (S.days === 1 && has('history') && has('nature')) dayQ.splice(0, dayQ.length, 'mix');
    let sunQ = pick(['atv', 'jeep', 'at', 'klasik', 'foto', 'deve']);
    let tipFam = false;
    if (fam && sunQ.includes('atv')) { sunQ = sunQ.filter(x => x !== 'atv'); if (!sunQ.includes('at')) sunQ.unshift('at'); tipFam = true; }
    const pmQ = pick(['comlek', 'yemek', 'hali', 'sarap']);
    const eveQ = pick(['gece', 'sema']);
    if (S.pace === 'slow' || S.group === 'couple') eveQ.push('hamam');
    const cap = { slow: 2, mid: 3, fast: 4 }[S.pace];
    let balloonDone = !has('balloon'), balloonDay = -1;
    const days = [];
    for (let d = 0; d < S.days; d++) {
      const first = d === 0 && S.days > 1, last = d === S.days - 1 && S.days > 1;
      const items = []; let count = 0; let dayUsed = false;
      const add = (id, slot) => { items.push({ id, t: TIME[slot], ...ACT[id] }); count++; };
      let slots = ['dawn', 'day', 'sunset', 'eve', 'pm'];
      if (first) {
        items.push({ id: 'transfer', t: { am: '10:00', pm: '14:00', ev: '19:00' }[S.arrive], n: 'pl.arrival', p: 'pl.arrivalP' });
        slots = S.arrive === 'am' ? ['pm', 'sunset', 'eve'] : S.arrive === 'pm' ? ['sunset', 'eve'] : [];
      }
      if (last) slots = ['dawn', 'day'];
      for (const sl of slots) {
        if (count >= cap) break;
        if (sl === 'dawn' && !balloonDone) { add('balon-std', 'dawn'); balloonDone = true; balloonDay = d; continue; }
        if (sl === 'day' && dayQ.length) { add(dayQ.shift(), 'day'); dayUsed = true; continue; }
        if (sl === 'sunset' && sunQ.length) { add(sunQ.shift(), 'sunset'); continue; }
        if (sl === 'eve' && eveQ.length) { add(eveQ.shift(), 'eve'); continue; }
        if (sl === 'pm' && !dayUsed && pmQ.length) { add(pmQ.shift(), 'pm'); continue; }
      }
      if (!count && !(first && S.arrive === 'ev')) items.push({ id: 'free', t: '16:00', n: 'pl.free', p: 'pl.freeP' });
      if (last) items.push({ id: 'dep', t: '—', n: 'ai.dep', p: 'ai.depP' });
      const ord = t => t === '—' ? 99 : parseInt(t, 10);
      items.sort((a, b) => ord(a.t) - ord(b.t));
      days.push(items);
    }
    const acts = days.flat().filter(x => ACT[x.id]);
    const total = acts.reduce((s, x) => s + (x.eur ? x.eur * S.people : 0), 0);
    const quote = acts.some(x => !x.eur);
    const tips = [];
    if (balloonDay >= 0 && balloonDay < S.days - 1) tips.push('ai.tipBalloon');
    if (tipFam) tips.push('ai.tipFamily');
    return { days, n: acts.length, total, quote, tips };
  }

  function dateOf(i) {
    if (!S.date) return '';
    const d = new Date(S.date + 'T12:00:00'); d.setDate(d.getDate() + i);
    try { return d.toLocaleDateString(CVI18N.lang, { weekday: 'short', day: 'numeric', month: 'short' }); } catch (e) { return ''; }
  }

  function planText() {
    const t = A.t, r = S.result; const lines = [t('ai.msgHead')];
    r.days.forEach((items, i) => {
      lines.push('', '• ' + t('pl.dayN', { n: i + 1 }) + (S.date ? ' (' + dateOf(i) + ')' : ''));
      items.forEach(x => lines.push('  ' + x.t + '  ' + t(x.n)));
    });
    lines.push('', t('ai.people') + ': ' + S.people + ' · ' + t(S.group === 'couple' ? 'g.couple' : S.group === 'family' ? 'g.family' : S.group === 'friends' ? 'g.friends' : 'g.solo'));
    if (r.total) lines.push(t('ai.total') + ': ' + A.fmt(r.total) + (r.quote ? ' ' + t('ai.plusQuote') : ''));
    lines.push('[' + CVI18N.lang.toUpperCase() + ']');
    return lines.join('\n');
  }

  function head() {
    return `<div class="bot-head"><span class="bot-av"><svg><use href="#i-spark"/></svg></span><div><b>CappaViva AI</b><small>${A.t('ai.eyebrow')}</small></div><span class="bot-steps">${[0, 1, 2, 3].map(i => `<i class="${i <= Math.min(S.step, 3) ? 'on' : ''}"></i>`).join('')}</span></div>`;
  }
  const chip = (attr, val, on, label, icon) => `<button class="chip" type="button" data-${attr}="${val}" aria-pressed="${on}">${icon ? `<svg width="16" height="16" style="vertical-align:-3px;margin-inline-end:6px"><use href="#${icon}"/></svg>` : ''}${label}</button>`;

  function render() {
    if (!root) return;
    const t = A.t; let body = '', acts = '';
    if (S.step === 0) {
      body = `<div class="bubble">${t('ai.hi')}</div><div class="ans-area"><div class="two"><div class="fld"><label for="aiDate">${t('ai.date')}</label><input id="aiDate" type="date" value="${S.date}" min="${A.iso(new Date())}"></div><div class="fld"><span class="lbl" id="aiDaysL">${t('ai.days')}</span><div class="stepper" role="group" aria-labelledby="aiDaysL"><button type="button" data-days="-1" aria-label="-">−</button><output class="tnum">${S.days}</output><button type="button" data-days="1" aria-label="+">+</button></div></div></div></div>`;
    } else if (S.step === 1) {
      body = `<div class="bubble">${t('ai.q2')}</div><div class="ans-area"><div class="chips">${chip('arrive', 'am', S.arrive === 'am', t('ai.am'))}${chip('arrive', 'pm', S.arrive === 'pm', t('ai.pm'))}${chip('arrive', 'ev', S.arrive === 'ev', t('ai.ev'))}</div></div>`;
    } else if (S.step === 2) {
      body = `<div class="bubble">${t('ai.q3')}</div><div class="ans-area"><div class="chips">${INTS.map(k => chip('int', k, S.ints.has(k), t('i.' + k), ICON[k])).join('')}</div></div>`;
    } else if (S.step === 3) {
      body = `<div class="bubble">${t('ai.q4')}</div><div class="ans-area"><div class="fld"><span class="lbl">${t('ai.pace')}</span><div class="chips">${['slow', 'mid', 'fast'].map(k => chip('pace', k, S.pace === k, t('pc.' + k))).join('')}</div></div><div class="fld"><span class="lbl">${t('ai.who')}</span><div class="chips">${['couple', 'family', 'friends', 'solo'].map(k => chip('group', k, S.group === k, t('g.' + k))).join('')}</div></div><div class="fld" style="max-width:220px"><span class="lbl" id="aiPplL">${t('ai.people')}</span><div class="stepper" role="group" aria-labelledby="aiPplL"><button type="button" data-ppl="-1" aria-label="-">−</button><output class="tnum">${S.people}</output><button type="button" data-ppl="1" aria-label="+">+</button></div></div></div>`;
    } else if (S.step === 4) {
      body = `<div class="bubble">${t('ai.thinking')}</div><div class="typing"><i></i><i></i><i></i></div>`;
    } else {
      const r = S.result;
      body = `<div class="bubble">${t('ai.ready', { d: S.days, n: r.n })}</div><div class="res">${r.days.map((items, i) => `<div class="res-day" style="animation-delay:${i * 90}ms"><h4>${t('pl.dayN', { n: i + 1 })}<span>${dateOf(i)}</span></h4><ol>${items.map(x => `<li><time>${x.t}</time><div><b>${t(x.n)}</b><span>${t(x.p)}</span></div><span class="pp">${x.eur ? A.fmt(x.eur) : (ACT[x.id] ? t('c.ask') : '')}</span></li>`).join('')}</ol></div>`).join('')}
        ${r.tips.map(k => `<p class="tip">${t(k)}</p>`).join('')}
        <div class="res-sum"><div><small>${t('ai.total')} · ${S.people} × </small><b>${r.total ? A.fmt(r.total) : t('c.ask')}</b>${r.quote && r.total ? `<small>${t('ai.plusQuote')}</small>` : ''}</div></div></div>`;
    }
    if (S.step < 4) {
      acts = `${S.step > 0 ? `<button class="btn btn-sm" type="button" data-nav="back" style="color:var(--ink-2)">${t('ai.back')}</button>` : '<span></span>'}<span class="bot-err" id="aiErr">${S.err}</span><button class="btn btn-dark" type="button" data-nav="next">${S.step === 3 ? `<svg width="16" height="16"><use href="#i-spark"/></svg>${t('ai.make')}` : t('ai.next')}</button>`;
    } else if (S.step === 5) {
      acts = `<button class="btn btn-sm" type="button" data-nav="again" style="color:var(--ink-2)">${t('ai.again')}</button><span style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${A.wa(planText())}"><svg width="16" height="16"><use href="#i-wa"/></svg>${t('ai.send')}</a><button class="btn btn-primary btn-sm" type="button" data-nav="book">${t('ai.book')}</button></span>`;
    }
    root.innerHTML = head() + `<div class="bot-body">${body}</div>` + (acts ? `<div class="bot-acts">${acts}</div>` : '');
  }

  function onClick(e) {
    const b = e.target.closest('button'); if (!b || !root.contains(b)) return;
    const d = b.dataset;
    if (d.days) { S.days = Math.max(1, Math.min(10, S.days + +d.days)); return render(); }
    if (d.ppl) { S.people = Math.max(1, Math.min(30, S.people + +d.ppl)); return render(); }
    if (d.arrive) { S.arrive = d.arrive; return render(); }
    if (d.int) { S.ints.has(d.int) ? S.ints.delete(d.int) : S.ints.add(d.int); S.err = ''; return render(); }
    if (d.pace) { S.pace = d.pace; return render(); }
    if (d.group) { S.group = d.group; return render(); }
    if (d.nav === 'back') { S.step--; S.err = ''; return render(); }
    if (d.nav === 'again') { S.step = 0; S.result = null; return render(); }
    if (d.nav === 'book') { return A.book('myplan', planText()); }
    if (d.nav === 'next') {
      if (S.step === 0) { const v = root.querySelector('#aiDate').value; if (!v) { S.err = A.t('ai.needDate'); return render(); } S.date = v; }
      if (S.step === 2 && !S.ints.size) { S.err = A.t('ai.needInt'); return render(); }
      S.err = '';
      if (S.step === 3) {
        S.step = 4; render();
        setTimeout(() => { S.result = build(); S.step = 5; render(); root.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, A.reduce ? 50 : 1300);
        return;
      }
      S.step++; render();
    }
  }

  window.CVPlanner = {
    init(el, api) {
      root = el; A = api;
      root.addEventListener('click', onClick);
      root.addEventListener('change', e => { if (e.target.id === 'aiDate') { S.date = e.target.value; S.err = ''; } });
      render();
    },
    render
  };
})();
