/* =========================================================
   Görsel alanları: fotoğraf varsa fotoğraf, yoksa geçici çizim.
   Çizimler kodla üretilen Kapadokya sahneleridir (peribacaları + balonlar).
   ========================================================= */
(function () {
  const H2R = h => { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; };
  const MIX = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const RGBA = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
  const RNG = s => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  const RAW = {
    dawn:    { sky: ['#191b3a', '#4a3466', '#c8677a', '#f5a96b'], sun: '#ffc68c', sunX: .7, sunY: .66, sunR: .95, land: ['#94707c', '#5d4453', '#2c2030'], stars: .15 },
    morning: { sky: ['#4f86cc', '#96bbe6', '#ead7c9', '#fbe6cd'], sun: '#fff2d8', sunX: .72, sunY: .36, sunR: .75, land: ['#dcbca6', '#b3876f', '#6e4b3e'], stars: 0 },
    sunset:  { sky: ['#221a47', '#7a3159', '#dd603c', '#f8a54c'], sun: '#ffb271', sunX: .28, sunY: .7, sunR: 1, land: ['#a95d48', '#6c3128', '#341816'], stars: 0 },
    dusk:    { sky: ['#0e1229', '#282b57', '#5c4576', '#c0747c'], sun: '#f3a495', sunX: .2, sunY: .72, sunR: .55, land: ['#58445c', '#33263b', '#18121d'], stars: .45 },
    night:   { sky: ['#04060e', '#0b1130', '#1a2352', '#383663'], sun: '#9fb0ff', sunX: .8, sunY: .18, sunR: .28, land: ['#2a2c46', '#17182a', '#0a0a13'], stars: 1 },
    green:   { sky: ['#6fa0d4', '#b0cde6', '#e2ece6', '#eef2e6'], sun: '#fff8e2', sunX: .62, sunY: .3, sunR: .6, land: ['#b3bfa2', '#72906a', '#33502f'], stars: 0 }
  };
  const PRE = {};
  for (const k in RAW) { const r = RAW[k]; PRE[k] = { sky: r.sky.map(H2R), sun: H2R(r.sun), land: r.land.map(H2R), sunX: r.sunX, sunY: r.sunY, sunR: r.sunR, stars: r.stars }; }
  const L1 = (a, b, t) => a + (b - a) * t;
  const mixPre = (a, b, t) => ({ sky: a.sky.map((c, i) => MIX(c, b.sky[i], t)), sun: MIX(a.sun, b.sun, t), land: a.land.map((c, i) => MIX(c, b.land[i], t)), sunX: L1(a.sunX, b.sunX, t), sunY: L1(a.sunY, b.sunY, t), sunR: L1(a.sunR, b.sunR, t), stars: L1(a.stars, b.stars, t) });

  const BCOL = [['#d9534f', '#f3e9dc'], ['#e8a15a', '#2f4f6b'], ['#3a9a8c', '#e3c16f'], ['#f2b134', '#c8423b'], ['#6d5a93', '#f1c75a'], ['#d97757', '#efe9d8'], ['#3b7fb8', '#f4f2ec'], ['#86a94a', '#26374f'], ['#e2665f', '#f0c35a'], ['#cf6f9c', '#f2de7a']].map(p => p.map(H2R));

  let GRAIN = null;
  function grain() {
    if (GRAIN) return GRAIN;
    const c = document.createElement('canvas'); c.width = c.height = 140;
    const x = c.getContext('2d'), d = x.createImageData(140, 140);
    for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
    x.putImageData(d, 0, 0); return (GRAIN = c);
  }

  function buildTerrain(w, h, o) {
    const R = RNG(o.seed * 9973 + 17), L = 4, hor = o.horizon ?? .6, layers = [];
    for (let i = 0; i < L; i++) {
      const k = i / (L - 1), base = h * (hor + k * .2 + (o.big ? .06 : 0)), amp = h * (.016 + k * .03);
      const ph = [R() * 6.3, R() * 6.3, R() * 6.3], fr = [1.4 + R(), 3 + R() * 2, 7 + R() * 4];
      const hill = x => { const u = x / w; return Math.sin(u * fr[0] + ph[0]) * amp * .6 + Math.sin(u * fr[1] + ph[1]) * amp * .3 + Math.sin(u * fr[2] + ph[2]) * amp * .1; };
      const p = new Path2D(); p.moveTo(-10, h + 10);
      for (let x = -10; x <= w + 10; x += 6) p.lineTo(x, base - hill(x));
      p.lineTo(w + 10, h + 10); p.closePath();
      const c = new Path2D(), caps = new Path2D(); let top = base - amp, win = null;
      const n = Math.round((o.chim ?? 1) * (3 + i * 4) * (w / 620 + .45));
      for (let j = 0; j < n; j++) {
        const cx = R() * w, by = base - hill(cx) + 4, ch = h * (.035 + k * .075) * (.55 + R() * .9), bw = ch * (.3 + R() * .14);
        c.moveTo(cx - bw * 1.25, by);
        c.bezierCurveTo(cx - bw * .95, by - ch * .3, cx - bw * .5, by - ch * .72, cx - bw * .3, by - ch * .9);
        c.quadraticCurveTo(cx, by - ch * 1.06, cx + bw * .3, by - ch * .9);
        c.bezierCurveTo(cx + bw * .5, by - ch * .72, cx + bw * .95, by - ch * .3, cx + bw * 1.25, by); c.closePath();
        if (R() < .5) { const rx = bw * (.36 + R() * .12), ry = ch * .05 + 1, cy = by - ch * .95; caps.moveTo(cx + rx, cy); caps.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); }
        top = Math.min(top, by - ch);
      }
      if (o.castle && i === 1) {
        const cx = w * (.3 + R() * .35), W = w * .2 + h * .14, Hc = h * .27;
        c.moveTo(cx - W / 2, base + 4);
        c.bezierCurveTo(cx - W * .46, base - Hc * .7, cx - W * .22, base - Hc * 1.04, cx - W * .02, base - Hc);
        c.bezierCurveTo(cx + W * .06, base - Hc * 1.1, cx + W * .14, base - Hc * 1.06, cx + W * .2, base - Hc * .92);
        c.bezierCurveTo(cx + W * .36, base - Hc * .8, cx + W * .44, base - Hc * .4, cx + W / 2, base + 4); c.closePath();
        win = []; for (let q = 0; q < 26; q++) { const u = (R() - .5) * W * .62, v = Hc * (.18 + R() * .66), ww = 2 + R() * 3.5; win.push([cx + u, base - v, ww, ww * 1.5]); }
        top = Math.min(top, base - Hc * 1.1);
      }
      layers.push({ p, c, caps, top, base, win });
    }
    return { layers };
  }

  function buildBalloons(o) {
    const R = RNG(o.seed * 31 + 7), arr = [], hor = o.horizon ?? .6;
    for (let i = 0; i < (o.balloons || 0); i++) {
      const d = Math.pow(R(), .75);
      arr.push({ x: R() * 1.04 - .02, y: hor - (.04 + R() * .46) * (1 - d * .62), d, c: BCOL[(R() * BCOL.length) | 0], ph: R() * 6.28, glow: R() < .3 });
    }
    if (o.big) arr.push({ x: .64, y: .34, d: 0, big: true, c: BCOL[3], ph: 1, glow: true });
    return arr.sort((a, b) => b.d - a.d);
  }

  function drawBalloon(ctx, w, h, b, o, pre, time) {
    const rise = o.rise || 0, px = o.px || 0;
    const r = b.big ? h * .17 : h * (.011 + Math.pow(1 - b.d, 2.2) * .064);
    const y = h * b.y - rise * h * (.16 + (1 - b.d) * .34) + Math.sin(time * .7 + b.ph) * r * .12;
    const x = w * b.x + Math.sin(time * .23 + b.ph) * r * .25 + rise * w * .03 * (b.x - .5) + px * (1 - b.d) * w * .025;
    const hz = pre.sky[3], fade = .12 + b.d * .6;
    const c1 = MIX(MIX(b.c[0], hz, fade), [22, 16, 32], .14), c2 = MIX(MIX(b.c[1], hz, fade), [22, 16, 32], .14);
    if (r < 3.4) { ctx.fillStyle = RGBA(c1); ctx.beginPath(); ctx.ellipse(x, y, r * .9, r, 0, 0, 7); ctx.fill(); return; }
    const env = new Path2D();
    env.moveTo(x - r * .32, y + r * .92);
    env.bezierCurveTo(x - r * 1.08, y + r * .3, x - r * 1.02, y - r * 1.02, x, y - r * 1.02);
    env.bezierCurveTo(x + r * 1.02, y - r * 1.02, x + r * 1.08, y + r * .3, x + r * .32, y + r * .92);
    env.closePath();
    ctx.save(); ctx.fillStyle = RGBA(c1); ctx.fill(env); ctx.clip(env);
    ctx.fillStyle = RGBA(c2);
    const E = [-1.25, -.75, -.25, .25, .75, 1.25];
    for (let s = 0; s < E.length; s += 2) {
      const a = E[s], bb = E[s + 1]; ctx.beginPath(); ctx.moveTo(x, y - r * 1.02);
      ctx.quadraticCurveTo(x + a * r * 1.25, y - r * .12, x + a * r * .32, y + r * .95);
      ctx.lineTo(x + bb * r * .32, y + r * .95);
      ctx.quadraticCurveTo(x + bb * r * 1.25, y - r * .12, x, y - r * 1.02); ctx.fill();
    }
    const sh = ctx.createRadialGradient(x - r * .35, y - r * .45, 0, x - r * .1, y - r * .1, r * 1.45);
    sh.addColorStop(0, 'rgba(255,255,255,.22)'); sh.addColorStop(.42, 'rgba(255,255,255,0)'); sh.addColorStop(1, 'rgba(0,0,0,.45)');
    ctx.fillStyle = sh; ctx.fillRect(x - r * 1.2, y - r * 1.2, r * 2.4, r * 2.4);
    if (b.glow && pre.sunY > .55) { const gg = ctx.createRadialGradient(x, y + r * .9, 0, x, y + r * .9, r * .55); gg.addColorStop(0, 'rgba(255,170,70,.7)'); gg.addColorStop(1, 'rgba(255,120,40,0)'); ctx.fillStyle = gg; ctx.fillRect(x - r, y, r * 2, r * 1.2); }
    ctx.restore();
    ctx.fillStyle = RGBA(MIX(c1, [0, 0, 0], .45));
    ctx.beginPath(); ctx.moveTo(x - r * .32, y + r * .91); ctx.lineTo(x + r * .32, y + r * .91); ctx.lineTo(x + r * .2, y + r * 1.08); ctx.lineTo(x - r * .2, y + r * 1.08); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = RGBA(MIX([40, 30, 30], hz, fade), .8); ctx.lineWidth = Math.max(.5, r * .022);
    ctx.beginPath(); ctx.moveTo(x - r * .2, y + r * 1.08); ctx.lineTo(x - r * .11, y + r * 1.32); ctx.moveTo(x + r * .2, y + r * 1.08); ctx.lineTo(x + r * .11, y + r * 1.32); ctx.stroke();
    ctx.fillStyle = RGBA(MIX([70, 48, 34], hz, fade)); ctx.fillRect(x - r * .13, y + r * 1.3, r * .26, r * .19);
  }

  function drawScene(ctx, w, h, o, T, B, pre, time) {
    const hor = o.horizon ?? .6, hz = pre.sky[3];
    const g = ctx.createLinearGradient(0, 0, 0, h * (hor + .06));
    g.addColorStop(0, RGBA(pre.sky[0])); g.addColorStop(.45, RGBA(pre.sky[1])); g.addColorStop(.8, RGBA(pre.sky[2])); g.addColorStop(1, RGBA(pre.sky[3]));
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    if (pre.stars > .02) { const R = RNG(o.seed + 5); for (let i = 0; i < 180; i++) { const x = R() * w, y = R() * h * hor * .92, a = R() * pre.stars * (1 - y / (h * hor)), s = R() < .08 ? 1.7 : 1; ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`; ctx.fillRect(x, y, s, s); } }
    const sx = w * pre.sunX, sy = h * pre.sunY, sr = Math.max(w, h) * pre.sunR * .7;
    const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
    sg.addColorStop(0, RGBA(pre.sun, .85)); sg.addColorStop(.16, RGBA(pre.sun, .34)); sg.addColorStop(1, RGBA(pre.sun, 0));
    ctx.fillStyle = sg; ctx.fillRect(0, 0, w, h);
    if (pre.sunY < hor + .02) { ctx.fillStyle = RGBA(MIX(pre.sun, [255, 255, 255], .55), .95); ctx.beginPath(); ctx.arc(sx, sy, Math.min(w, h) * .026, 0, 7); ctx.fill(); }
    const L = T.layers.length; let bi = 0;
    for (let i = 0; i < L; i++) {
      const k = i / (L - 1), dl = 1 - k, thr = 1 - (i + 1) / (L + .5);
      while (bi < B.length && B[bi].d >= thr) { drawBalloon(ctx, w, h, B[bi], o, pre, time); bi++; }
      const lay = T.layers[i], base = MIX(MIX(pre.land[0], pre.land[2], k), hz, dl * .5);
      const lg = ctx.createLinearGradient(0, lay.top, 0, h);
      lg.addColorStop(0, RGBA(MIX(base, hz, .14))); lg.addColorStop(1, RGBA(MIX(base, [0, 0, 0], .32)));
      ctx.fillStyle = lg; ctx.fill(lay.p); ctx.fill(lay.c);
      ctx.strokeStyle = RGBA(pre.sun, .16 * (1 - dl * .5)); ctx.lineWidth = 1; ctx.stroke(lay.p);
      ctx.fillStyle = RGBA(MIX(MIX(base, pre.sun, .12), hz, dl * .2)); ctx.fill(lay.caps);
      if (lay.win) { ctx.fillStyle = RGBA(MIX(base, [0, 0, 0], .6)); for (const r of lay.win) ctx.fillRect(r[0], r[1], r[2], r[3]); }
      if (i < L - 1) { const my = lay.base, mg = ctx.createLinearGradient(0, my - h * .05, 0, my + h * .08); mg.addColorStop(0, RGBA(hz, 0)); mg.addColorStop(.6, RGBA(hz, .3 * dl + .05)); mg.addColorStop(1, RGBA(hz, 0)); ctx.fillStyle = mg; ctx.fillRect(0, my - h * .05, w, h * .13); }
    }
    if (o.river) {
      const R = RNG(o.seed + 99), y0 = h * .9, rv = new Path2D(); rv.moveTo(-20, y0);
      for (let x = -20; x <= w + 20; x += 10) rv.lineTo(x, y0 + Math.sin(x / w * 6) * h * .025);
      ctx.lineCap = 'round'; ctx.strokeStyle = RGBA(MIX(pre.sky[1], [255, 255, 255], .2), .85); ctx.lineWidth = h * .03; ctx.stroke(rv);
      ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = h * .006; ctx.stroke(rv);
      for (let q = 0; q < 60; q++) { const x = R() * w, y = y0 - h * .03 + R() * h * .1, s = h * (.008 + R() * .014); ctx.fillStyle = RGBA(MIX(pre.land[2], [30, 70, 30], .5), .9); ctx.beginPath(); ctx.ellipse(x, y, s * 1.2, s, 0, 0, 7); ctx.fill(); }
    }
    while (bi < B.length) { drawBalloon(ctx, w, h, B[bi], o, pre, time); bi++; }
    const vg = ctx.createRadialGradient(w / 2, h * .55, Math.min(w, h) * .3, w / 2, h * .55, Math.max(w, h) * .85);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.34)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = .06; ctx.globalCompositeOperation = 'overlay'; ctx.fillStyle = ctx.createPattern(grain(), 'repeat'); ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }

  const DPR = () => Math.min(window.devicePixelRatio || 1, 2);

  /* ---- görsel alanları ---- */
  const slots = [];
  function paint(s) {
    const w = s.cv.offsetWidth, h = s.cv.offsetHeight;
    if (!w || !h || (w === s.w && h === s.h)) return;
    const d = DPR(); s.cv.width = Math.round(w * d); s.cv.height = Math.round(h * d);
    const ctx = s.cv.getContext('2d'); ctx.setTransform(d, 0, 0, d, 0, 0);
    drawScene(ctx, w, h, s.o, buildTerrain(w, h, s.o), buildBalloons(s.o), s.o.pre, 0);
    s.w = w; s.h = h;
  }
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver(es => es.forEach(e => {
    const s = slots.find(x => x.el === e.target); if (!s) return; s.near = e.isIntersecting; if (s.near) paint(s);
  }), { rootMargin: '900px 900px' }) : null;

  function mount(el) {
    if (el._slot) return el._slot;
    const o = JSON.parse(el.dataset.scene || '{}'); o.pre = PRE[o.p] || PRE.dawn;
    const cv = document.createElement('canvas'); cv.setAttribute('aria-hidden', 'true'); el.appendChild(cv);
    const key = el.dataset.img, src = key && window.CV && CV.images && CV.images[key];
    if (src) { const img = new Image(); img.alt = ''; img.decoding = 'async'; img.loading = 'lazy'; img.onload = () => el.classList.add('has-img'); img.src = src; el.appendChild(img); }
    const s = { el, cv, o, w: 0, h: 0, near: !io };
    slots.push(s); el._slot = s;
    if (io) io.observe(el); else paint(s);
    return s;
  }
  let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => slots.forEach(s => s.near && paint(s)), 180); });

  window.CVScene = { PRE, mixPre, buildTerrain, buildBalloons, drawScene, mount, paint, DPR, RNG };
})();
