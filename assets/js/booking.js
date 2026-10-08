/* =========================================================
   Rezervasyon sayfası — 4 adım: deneyim, tarih & kişi,
   bilgiler, onay (WhatsApp mesajı). Online ödeme yok.
   ========================================================= */
(function () {
  const CATS = [['balloon', 'f.balloon'], ['daily', 'f.daily'], ['adv', 'f.adv'], ['culture', 'dr.culture'], ['transfer', 'dr.transfer'], ['special', 'bk.special']];
  const S = { step: 0, sel: '', cat: 'balloon', date: '', month: null, ad: 2, ch: 0, pickup: true, hotel: '', name: '', phone: '', email: '', note: '', err: '', msg: '' };
  let A, card, sum, steps;

  const item = id => (window.CV.catalog || []).find(x => x.id === id);

  function stepsBar() {
    const L = ['bk.s1', 'bk.s2', 'bk.s3', 'bk.s4'];
    steps.innerHTML = L.map((k, i) => `<button class="bv-step ${i < S.step ? 'done' : ''} ${i === S.step ? 'cur' : ''}" type="button" data-go="${i}" ${i > S.step ? 'disabled' : ''}><i></i>${i + 1}. ${A.t(k)}</button>`).join('');
  }

  function cal() {
    const lang = CVI18N.lang, today = new Date(); today.setHours(0, 0, 0, 0);
    if (!S.month) { const dimNow = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); S.month = new Date(today.getFullYear(), today.getMonth() + (today.getDate() > dimNow - 3 ? 1 : 0), 1); }
    const m = S.month, first = new Date(m.getFullYear(), m.getMonth(), 1), start = (first.getDay() + 6) % 7;
    const dim = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    const mon = new Date(2024, 0, 1);
    let wd = ''; for (let i = 0; i < 7; i++) { const d = new Date(mon); d.setDate(1 + i); wd += `<span class="wd">${d.toLocaleDateString(lang, { weekday: 'narrow' })}</span>`; }
    let cells = ''; for (let i = 0; i < start; i++) cells += '<span></span>';
    for (let d = 1; d <= dim; d++) {
      const dt = new Date(m.getFullYear(), m.getMonth(), d), iso = A.iso(dt), past = dt < today;
      cells += `<button type="button" data-day="${iso}" ${past ? 'disabled' : ''} class="${+dt === +today ? 'today' : ''}" aria-pressed="${S.date === iso}">${d.toLocaleString(lang)}</button>`;
    }
    const prevOff = m <= new Date(today.getFullYear(), today.getMonth(), 1);
    return `<div class="cal"><div class="cal-head"><b>${m.toLocaleDateString(lang, { month: 'long', year: 'numeric' })}</b><span class="cal-nav"><button type="button" data-mon="-1" ${prevOff ? 'disabled' : ''} aria-label="‹"><svg style="transform:scaleX(-1)"><use href="#i-arrow"/></svg></button><button type="button" data-mon="1" aria-label="›"><svg><use href="#i-arrow"/></svg></button></span></div><div class="cal-grid">${wd}${cells}</div></div>`;
  }

  const stepper = (k, v, label) => `<div class="fld"><span class="lbl" id="lb-${k}">${label}</span><div class="stepper" role="group" aria-labelledby="lb-${k}"><button type="button" data-st="${k}:-1" aria-label="-">−</button><output class="tnum">${v}</output><button type="button" data-st="${k}:1" aria-label="+">+</button></div></div>`;

  function panel() {
    const t = A.t; let h = '';
    if (S.step === 0) {
      const list = (CV.catalog || []).filter(x => x.cat === S.cat);
      h = `<h2>${t('bk.pick')}</h2><div class="cat-tabs">${CATS.map(([c, k]) => `<button type="button" data-cat="${c}" aria-pressed="${S.cat === c}">${t(k)}</button>`).join('')}</div>
      <div class="exp-list" role="radiogroup">${list.map(x => `<button type="button" class="exp" role="radio" data-sel="${x.id}" aria-checked="${S.sel === x.id}"><span style="min-width:0"><b>${t(x.n)}</b><small>${x.eur ? A.fmt(x.eur) + ' · ' + t('c.pp') : t('bk.quote')}</small></span><span class="rad"></span></button>`).join('')}</div>`;
    } else if (S.step === 1) {
      h = `<h2>${t('bk.s2')}</h2>${cal()}<div class="two">${stepper('ad', S.ad, t('bk.adults'))}${stepper('ch', S.ch, t('bk.children'))}</div>
      <label class="check"><input type="checkbox" id="bkPick" ${S.pickup ? 'checked' : ''}>${t('bk.pickup')}</label>
      <div class="fld"><label for="bkHotel">${t('bk.hotel')}</label><input id="bkHotel" type="text" value="${esc(S.hotel)}" placeholder="${t('bk.hotelPh')}"></div>`;
    } else if (S.step === 2) {
      h = `<h2>${t('bk.s3')}</h2><div class="fld"><label for="bkName">${t('bk.name')}</label><input id="bkName" type="text" autocomplete="name" value="${esc(S.name)}"></div>
      <div class="two"><div class="fld"><label for="bkPhone">${t('bk.phone')}</label><input id="bkPhone" type="tel" autocomplete="tel" value="${esc(S.phone)}" dir="ltr"></div><div class="fld"><label for="bkEmail">${t('bk.email')}</label><input id="bkEmail" type="email" autocomplete="email" value="${esc(S.email)}" dir="ltr"></div></div>
      <div class="fld"><label for="bkNote">${t('bk.note')}</label><textarea id="bkNote" placeholder="${t('bk.notePh')}">${esc(S.note)}</textarea></div>`;
    } else {
      h = `<h2>${t('bk.doneT')}</h2><p style="color:var(--ink-2);font-weight:500">${t('bk.doneP')}</p><div class="bk-msg">${esc(S.msg)}</div>
      <div class="bv-acts" style="justify-content:flex-start"><a class="btn btn-wa" target="_blank" rel="noopener" href="${A.wa(S.msg)}"><svg width="20" height="20"><use href="#i-wa"/></svg>${t('bk.openWa')}</a><button class="btn btn-line" type="button" data-copy-msg>${t('bk.copy')}</button><button class="btn" type="button" data-go="2" style="color:var(--ink-2)">${t('bk.edit')}</button></div>
      <p style="font-size:13.5px;color:var(--ink-2)">${t('bk.fallback', { p: CV.phoneDisplay })}</p>`;
    }
    if (S.step < 3) {
      h += `<p class="bv-err" ${S.err ? '' : 'hidden'}>${S.err}</p><div class="bv-acts">${S.step > 0 ? `<button class="btn" type="button" data-go="${S.step - 1}" style="color:var(--ink-2)">${t('bk.prev')}</button>` : '<span></span>'}<button class="btn btn-dark" type="button" data-next>${S.step === 2 ? `<svg width="18" height="18"><use href="#i-wa"/></svg>${t('bk.prepare')}` : t('bk.next')}</button></div>`;
    }
    card.innerHTML = `<div class="bv-panel">${h}</div>`;
  }

  function dateLabel() {
    if (!S.date) return A.t('bk.none');
    return new Date(S.date + 'T12:00:00').toLocaleDateString(CVI18N.lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
  function guests() { return A.t('msg.adults', { n: S.ad }) + (S.ch ? ', ' + A.t('msg.children', { n: S.ch }) : ''); }
  function total() { const x = item(S.sel); return x && x.eur ? x.eur * S.ad : 0; }

  function summary() {
    const t = A.t, x = item(S.sel), tot = total();
    sum.innerHTML = `<h3>${t('bk.sum')}</h3>
      <div class="sum-row"><span>${t('msg.exp')}</span><b>${x ? t(x.n) : t('bk.none')}</b></div>
      <div class="sum-row"><span>${t('msg.date')}</span><b>${dateLabel()}</b></div>
      <div class="sum-row"><span>${t('msg.guests')}</span><b>${guests()}</b></div>
      ${S.hotel ? `<div class="sum-row"><span>${t('msg.hotel')}</span><b>${esc(S.hotel)}</b></div>` : ''}
      <div class="sum-total"><small>${t('bk.total')}</small><b class="tnum">${tot ? A.fmt(tot) : t('bk.quote')}</b></div>
      <p class="sum-note">${S.ch ? t('bk.childNote') : t('ft.pol4')}</p>`;
  }

  function message() {
    const t = A.t, x = item(S.sel), tot = total();
    const L = [t('msg.hello'), t('msg.exp') + ': ' + t(x.n), t('msg.date') + ': ' + dateLabel(), t('msg.guests') + ': ' + guests()];
    if (S.pickup) L.push(t('msg.pickup'));
    if (S.hotel) L.push(t('msg.hotel') + ': ' + S.hotel);
    L.push(t('msg.name') + ': ' + S.name);
    if (S.phone) L.push(t('msg.phone') + ': ' + S.phone);
    if (S.email) L.push(t('msg.email') + ': ' + S.email);
    if (tot) L.push(t('msg.total') + ': ' + A.fmt(tot));
    if (S.note) L.push(t('msg.note') + ': ' + S.note);
    L.push('[' + CVI18N.lang.toUpperCase() + ']');
    return L.join('\n');
  }

  function esc(s) { return String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  function readInputs() {
    const v = id => { const el = card.querySelector('#' + id); return el ? el.value : null; };
    const h = v('bkHotel'); if (h !== null) S.hotel = h.trim();
    const pk = card.querySelector('#bkPick'); if (pk) S.pickup = pk.checked;
    const n = v('bkName'); if (n !== null) S.name = n.trim();
    const p = v('bkPhone'); if (p !== null) S.phone = p.trim();
    const e = v('bkEmail'); if (e !== null) S.email = e.trim();
    const no = v('bkNote'); if (no !== null) S.note = no.trim();
  }

  function render() { if (!card) return; stepsBar(); panel(); summary(); }

  function onClick(e) {
    const b = e.target.closest('button'); if (!b) return;
    const d = b.dataset;
    if (d.cat) { S.cat = d.cat; return render(); }
    if (d.sel) { S.sel = d.sel; S.err = ''; return render(); }
    if (d.mon) { readInputs(); S.month = new Date(S.month.getFullYear(), S.month.getMonth() + +d.mon, 1); return render(); }
    if (d.day) { readInputs(); S.date = d.day; S.err = ''; return render(); }
    if (d.st) { readInputs(); const [k, v] = d.st.split(':'); if (k === 'ad') S.ad = Math.max(1, Math.min(40, S.ad + +v)); else S.ch = Math.max(0, Math.min(20, S.ch + +v)); return render(); }
    if (d.go !== undefined) { readInputs(); S.step = +d.go; S.err = ''; render(); return top(); }
    if ('copyMsg' in d) return A.copy(S.msg);
    if ('next' in d) {
      readInputs();
      if (S.step === 0 && !S.sel) { S.err = A.t('bk.errTour'); return render(); }
      if (S.step === 1 && !S.date) { S.err = A.t('bk.errDate'); return render(); }
      if (S.step === 2 && !S.name) { S.err = A.t('bk.errName'); return render(); }
      S.err = '';
      if (S.step === 2) S.msg = window.CVMsg ? CVMsg.wrap(message()) : message();
      S.step++; render(); top();
    }
  }
  function top() { const v = document.getElementById('bview'); if (v) window.scrollTo({ top: 0, behavior: A.reduce ? 'auto' : 'smooth' }); }

  window.CVBooking = {
    init(api) {
      A = api; card = document.getElementById('bvCard'); sum = document.getElementById('sumCard'); steps = document.getElementById('bvSteps');
      document.getElementById('bview').addEventListener('click', onClick);
      card.addEventListener('input', () => { readInputs(); summary(); });
      render();
    },
    open(id, note, pre) { if (pre && pre.date) { S.date = pre.date; const d = new Date(pre.date + 'T12:00:00'); S.month = new Date(d.getFullYear(), d.getMonth(), 1); } if (pre && pre.ad) S.ad = pre.ad;
      if (id && item(id)) { S.sel = id; S.cat = item(id).cat; S.step = 1; }
      else if (!S.sel) S.step = 0;
      if (note) S.note = note;
      S.err = '';
      render();
    },
    render
  };
})();
