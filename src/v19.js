  /* =====================================================================
     v19 — contact fly-in · 20 lightweight features · performance governor
     ===================================================================== */
  const RAF = requestAnimationFrame, qs19 = new URLSearchParams(location.search);
  const mk = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const SV = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="3"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>',
    share: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4M8 8l4-4 4 4M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>'
  };
  const T19 = {
    fa: { copy: 'کپی', copied: 'کپی شد', saved: 'مخاطب ذخیره شد', linkCopied: 'لینک سایت کپی شد', top: 'بازگشت به بالا', pal: 'جست‌وجو و دستورها (Ctrl+K)', search: 'جست‌وجو یا اجرای دستور…', none: 'نتیجه‌ای پیدا نشد', hi: ['شب بخیر', 'صبح بخیر', 'ظهر بخیر', 'عصر بخیر', 'شب بخیر'], hello: 'سلام', open: 'در دسترس برای پروژه‌ی جدید', closed: 'فعلاً آفلاین؛ فردا پاسخ می‌دهم', tehran: 'ساعت تهران', build: 'می‌سازیم:', words: ['نرم‌افزار دسکتاپ', 'اپلیکیشن موبایل', 'بازی', 'ابزار تحلیلی'], shareText: 'پورتفولیوی SHEYMON — توسعه‌دهنده‌ی نرم‌افزار و بازی', party: '🎉 سورپرایز!', kbTitle: 'میانبرهای صفحه‌کلید', secs: ['خانه', 'پروژه‌ها', 'درباره من', 'مهارت‌ها', 'ارتباط'], theme: 'تغییر تم', lang: 'تغییر زبان', cEmail: 'کپی ایمیل', cPhone: 'تماس تلفنی', cTg: 'باز کردن تلگرام', vcf: 'ذخیره در مخاطبین', share: 'اشتراک‌گذاری سایت', help: 'میانبرهای صفحه‌کلید', fun: 'یک سورپرایز!', cmdK: 'باز کردن جست‌وجو', jump: 'رفتن به بخش', pages: 'بخش', proj: 'پروژه', act: 'دستور' },
    en: { copy: 'Copy', copied: 'Copied', saved: 'Contact saved', linkCopied: 'Site link copied', top: 'Back to top', pal: 'Search & commands (Ctrl+K)', search: 'Search or run a command…', none: 'No results', hi: ['Good night', 'Good morning', 'Good afternoon', 'Good evening', 'Good night'], hello: 'Hello', open: 'Available for a new project', closed: 'Offline for now — I reply tomorrow', tehran: 'Tehran time', build: 'We build', words: ['desktop software', 'mobile apps', 'games', 'analytical tools'], shareText: 'SHEYMON portfolio — software & game developer', party: '🎉 Surprise!', kbTitle: 'Keyboard shortcuts', secs: ['Home', 'Projects', 'About me', 'Skills', 'Contact'], theme: 'Toggle theme', lang: 'Switch language', cEmail: 'Copy email', cPhone: 'Call by phone', cTg: 'Open Telegram', vcf: 'Save to contacts', share: 'Share this site', help: 'Keyboard shortcuts', fun: 'A surprise!', cmdK: 'Open search', jump: 'Jump to', pages: 'Section', proj: 'Project', act: 'Action' }
  };
  const tt = k => T19[language][k];
  const SECS = ['home', 'projects', 'about', 'toolkit', 'contact'];
  const emailV = ($('a[href^="mailto:"]') || {}).href ? $('a[href^="mailto:"]').getAttribute('href').slice(7) : '';
  const telV = $('a[href^="tel:"]') ? $('a[href^="tel:"]').getAttribute('href').slice(4) : '';
  const tgV = $('a[href*="t.me"]') ? $('a[href*="t.me"]').getAttribute('href') : '';

  /* ---------- performance governor: lite mode for weak devices ---------- */
  const lite = { on: false };
  function setLite(on, save) {
    if (lite.on === on) return; lite.on = on; root.classList.toggle('lite', on);
    if (save) { try { sessionStorage.setItem('sheymon-lite', on ? '1' : '0'); } catch (_) {} }
  }
  (function perf() {
    let start = false;
    try { if (sessionStorage.getItem('sheymon-lite') === '1') start = true; } catch (_) {}
    const mem = navigator.deviceMemory || 8, cores = navigator.hardwareConcurrency || 8, conn = navigator.connection || {};
    if (mem <= 2 || cores <= 2 || conn.saveData || qs19.has('lite')) start = true;
    if (qs19.has('full')) start = false;
    setLite(start, false);
    if (qs19.has('full') || qs19.has('lite')) return;
    let last = 0, bad = 0, n = 0, until = 0, running = false, strikes = 0;
    function frame(t) {
      if (!running) return;
      if (last) { const dt = t - last; if (dt < 400) { n++; if (dt > 34) bad++; } if (n >= 24) {
          if (bad / n > .4 && !lite.on) {
            if (root.classList.contains('refract')) root.classList.remove('refract');   /* stage 1: drop the costly ice refraction */
            else if (++strikes >= 2) setLite(true, true);                              /* stage 2: lite mode (glass bars stay frosted) */
          } else strikes = 0;
          n = 0; bad = 0;
        } }
      last = t;
      if (t < until && !lite.on) RAF(frame); else { running = false; last = 0; n = 0; bad = 0; }
    }
    const watch = ms => { until = performance.now() + ms; if (running || lite.on) return; running = true; last = 0; RAF(frame); };
    addEventListener('load', () => setTimeout(() => watch(3200), 500));
    addEventListener('scroll', () => watch(1500), { passive: true });
  })();
  /* pause heavy animations that are off-screen */
  if ('IntersectionObserver' in window) {
    const po = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('off', !e.isIntersecting)), { rootMargin: '80px' });
    ['.hero-stage', '#lock'].forEach(s => { const el = $(s); if (el) po.observe(el); });
  }

  /* ---------- 8 · toasts ---------- */
  const toasts = mk('<div class="toasts" aria-live="polite" aria-atomic="false"></div>'); body.appendChild(toasts);
  function toast(msg, ic) {
    const t = mk('<div class="toast"><i></i><span></span></div>'); t.firstChild.textContent = ic || '✓'; t.lastChild.textContent = msg;
    toasts.appendChild(t); while (toasts.children.length > 3) toasts.firstChild.remove();
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 380); }, 2300);
    try { navigator.vibrate && navigator.vibrate(8); } catch (_) {}
  }

  /* ---------- 1 · scroll progress, 5 · back-to-top ring, 19 · header auto-hide ---------- */
  const spBar = mk('<div class="sp" aria-hidden="true"></div>'); body.appendChild(spBar);
  const fabs = mk('<div class="fabs"><button class="fab fab-top" id="fabTop" type="button">' + SV.up + '<svg class="ring" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21"/></svg></button></div>');
  body.appendChild(fabs);
  const fabTop = $('#fabTop'), ring = $('.ring', fabTop);
  fabTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  let lastY = scrollY, tk19 = 0;
  addEventListener('scroll', () => {
    if (tk19) return; tk19 = 1;
    RAF(() => {
      tk19 = 0; const y = scrollY, max = maxScroll(), p = max > 0 ? Math.min(1, y / max) : 0;
      spBar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      ring.style.strokeDashoffset = (132 * (1 - p)).toFixed(1);
      fabTop.classList.toggle('show', y > 700);
      if (y > 320 && y > lastY + 8 && !header.matches(':hover,:focus-within')) header.classList.add('away');
      else if (y < lastY - 8 || y < 320) header.classList.remove('away');
      lastY = y;
    });
  }, { passive: true });
  header.addEventListener('focusin', () => header.classList.remove('away'));

  /* ---------- 3 · ripples ---------- */
  document.addEventListener('pointerdown', e => {
    if (lite.on || reduced) return;
    const t = e.target.closest && e.target.closest('.btn,.icon-btn,.row,.nav-link,.tab,.fab,.copy-btn');
    if (!t || t.classList.contains('fab') || t.classList.contains('copy-btn')) return;
    const r = t.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2, s = document.createElement('span');
    s.className = 'ripple'; s.setAttribute('aria-hidden', 'true');
    s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    t.appendChild(s); s.addEventListener('animationend', () => s.remove());
  }, { passive: true });

  /* ---------- 2 · cursor glow, 4 · magnetic buttons, 17 · card spotlight (desktop) ---------- */
  const spots = [];
  $$('.tool, .list-card, .contact-art, .about-card').forEach(c => { const s = document.createElement('i'); s.className = 'spot'; s.setAttribute('aria-hidden', 'true'); c.appendChild(s); spots.push(c); });
  if (finePointer && !reduced) {
    const glow = mk('<div class="cglow" aria-hidden="true"></div>'); body.appendChild(glow); let gx = 0, gy = 0, gt = 0;
    addEventListener('pointermove', e => {
      if (lite.on) return; gx = e.clientX; gy = e.clientY;
      if (!gt) gt = RAF(() => { gt = 0; glow.style.transform = `translate3d(${gx}px,${gy}px,0)`; glow.classList.add('on'); });
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => glow.classList.remove('on'));
    $$('.hero-actions .btn, .header-cta').forEach(b => {
      b.addEventListener('pointermove', e => { if (lite.on) return; const r = b.getBoundingClientRect(); b.style.transform = `translate(${((e.clientX - r.left) / r.width - .5) * 10}px,${((e.clientY - r.top) / r.height - .5) * 8}px)`; });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
    spots.forEach(c => { let t = 0; c.addEventListener('pointermove', e => { if (t || lite.on) return; t = RAF(() => { t = 0; const r = c.getBoundingClientRect(); c.style.setProperty('--sx', (e.clientX - r.left).toFixed(0) + 'px'); c.style.setProperty('--sy', (e.clientY - r.top).toFixed(0) + 'px'); }); }); });
  }

  /* ---------- 13 · side dots ---------- */
  const sdots = mk('<nav class="sdots" aria-label="Sections">' + SECS.map(id => `<a href="#${id}" data-id="${id}"></a>`).join('') + '</nav>'); body.appendChild(sdots);
  function renderDots() { $$('a', sdots).forEach((a, i) => { a.dataset.l = T19[language].secs[i]; a.setAttribute('aria-label', T19[language].secs[i]); }); }
  if ('IntersectionObserver' in window) {
    const dio = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) $$('a', sdots).forEach(a => a.classList.toggle('on', a.dataset.id === en.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
    SECS.forEach(id => { const el = document.getElementById(id); if (el) dio.observe(el); });
  }

  /* ---------- 9 · copy buttons, 10 · save contact, 11 · share ---------- */
  function copyText(v, btn) {
    const done = () => { toast(tt('copied'), '📋'); if (btn) { btn.classList.add('ok'); btn.innerHTML = SV.check; setTimeout(() => { btn.classList.remove('ok'); btn.innerHTML = SV.copy; }, 1400); } };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(v).then(done, fallback); else fallback();
    function fallback() { const a = document.createElement('textarea'); a.value = v; a.style.cssText = 'position:fixed;opacity:0;top:0'; body.appendChild(a); a.select(); try { document.execCommand('copy'); done(); } catch (_) {} a.remove(); }
  }
  const copyBtns = [];
  $$('.list-card .row').forEach(r => {
    const val = $('.row-text b', r).textContent, w = document.createElement('div'); w.className = 'row-wrap';
    r.parentNode.insertBefore(w, r); w.appendChild(r);
    const b = mk('<button class="copy-btn" type="button">' + SV.copy + '</button>'); b.addEventListener('click', () => copyText(val, b)); w.appendChild(b); copyBtns.push(b);
  });
  function saveVcf() {
    const v = ['BEGIN:VCARD', 'VERSION:3.0', 'FN:SHEYMON', 'ORG:SHEYMON', 'TITLE:Software & game developer', 'TEL;TYPE=CELL:' + telV, 'EMAIL:' + emailV, 'URL:' + tgV, 'END:VCARD'].join('\r\n');
    const url = URL.createObjectURL(new Blob([v], { type: 'text/vcard' })), a = document.createElement('a');
    a.href = url; a.download = 'sheymon.vcf'; body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000); toast(tt('saved'), '👤');
  }
  async function shareSite() {
    const data = { title: 'SHEYMON', text: tt('shareText'), url: location.href.split('#')[0].split('?')[0] };
    if (navigator.share) { try { await navigator.share(data); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
    copyText(data.url); 
  }
  const listCard = $('.list-card');
  if (listCard) {
    const act = mk('<div class="card-actions"><button class="btn btn-soft" id="vcfBtn" type="button">' + SV.down + '<span data-fa="ذخیره‌ی مخاطب" data-en="Save contact">ذخیره‌ی مخاطب</span></button><button class="btn btn-soft" id="shareBtn" type="button">' + SV.share + '<span data-fa="اشتراک‌گذاری" data-en="Share">اشتراک‌گذاری</span></button></div>');
    listCard.appendChild(act); $('#vcfBtn').addEventListener('click', saveVcf); $('#shareBtn').addEventListener('click', shareSite);
  }

  /* ---------- 14 · availability, 15 · greeting, 16 · typewriter ---------- */
  const AVAIL = [9, 24];                       /* Tehran hours during which the badge shows "available" */
  const heroCopy = $('.hero-copy');
  const extra = mk('<div class="hero-extra"><div class="greet" id="greet"></div><div class="avail" id="avail"><i class="live"></i><span class="av-t"></span><small class="av-time"></small></div></div>');
  if (heroCopy) heroCopy.insertBefore(extra, heroCopy.firstChild);   /* greeting + availability sit at the very top of the first screen */
  const greetEl = $('#greet'), availEl = $('#avail');
  function renderGreet() {
    const h = new Date().getHours(), slot = h < 5 ? 0 : h < 12 ? 1 : h < 17 ? 2 : h < 21 ? 3 : 4, ic = ['🌙', '☀️', '🌤️', '🌇', '🌙'][slot];
    greetEl.textContent = tt('hello') + '، ' + tt('hi')[slot] + ' ' + ic;
    if (language === 'en') greetEl.textContent = tt('hi')[slot] + ' ' + ic;
  }
  function renderAvail() {
    let hh = 12, mm = '00', txt = '';
    try { const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Tehran', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()); hh = +p.find(x => x.type === 'hour').value % 24; mm = p.find(x => x.type === 'minute').value; txt = String(hh).padStart(2, '0') + ':' + mm; } catch (_) {}
    const on = hh >= AVAIL[0] && hh < AVAIL[1];
    availEl.classList.toggle('off', !on);
    $('.av-t', availEl).textContent = on ? tt('open') : tt('closed');
    $('.av-time', availEl).textContent = txt ? '· ' + tt('tehran') + ' ' + (language === 'fa' ? txt.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) : txt) : '';
  }
  setInterval(() => { if (!document.hidden) { renderAvail(); renderGreet(); } }, 30000);

  /* ---------- 18 · skills marquee ---------- */
  const tg = $('.tool-grid'); let mq = null;
  if (tg) { mq = mk('<div class="marquee" aria-hidden="true"><div class="mq-track"></div></div>'); tg.after(mq); if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('off', !e.isIntersecting))).observe(mq); }
  function renderMarquee() {
    if (!mq) return;
    const items = $$('.tool b').map(b => b.textContent.trim()).concat(Object.keys(P).map(id => P[id].names[language === 'fa' ? 0 : 1]));
    const one = items.map(t => `<span class="mq-item"></span>`).join(''), track = $('.mq-track', mq);
    track.innerHTML = one + one; $$('.mq-item', track).forEach((n, i) => { n.textContent = items[i % items.length]; });
  }

  /* ---------- 20 · confetti easter egg (click the logo 5 times) ---------- */
  function confetti() {
    if (reduced) { toast(tt('party'), '🎉'); return; }
    const cv = document.createElement('canvas'); cv.className = 'confetti'; const dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; body.appendChild(cv); const c = cv.getContext('2d'); c.scale(dpr, dpr);
    const cols = ['#3DC9BC', '#6C8DF2', '#FF9A5C', '#F0708A', '#FFD479', '#FFFFFF'], n = lite.on ? 70 : 150, ps = [];
    for (let i = 0; i < n; i++) ps.push({ x: innerWidth / 2, y: innerHeight * .62, vx: (Math.random() - .5) * 15, vy: -Math.random() * 16 - 5, s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: cols[i % cols.length] });
    const t0 = performance.now(); toast(tt('party'), '🎉');
    (function step(t) {
      const k = (t - t0) / 2600; if (k >= 1) { cv.remove(); return; }
      c.clearRect(0, 0, innerWidth, innerHeight);
      ps.forEach(p => { p.vy += .32; p.x += p.vx; p.y += p.vy; p.vx *= .992; p.r += p.vr; c.save(); c.globalAlpha = 1 - k * k; c.translate(p.x, p.y); c.rotate(p.r); c.fillStyle = p.c; c.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); c.restore(); });
      RAF(step);
    })(t0);
  }
  let logoClicks = 0, logoT = 0;
  $$('.brand, .footer-brand').forEach(b => b.addEventListener('click', () => { logoClicks++; clearTimeout(logoT); logoT = setTimeout(() => { logoClicks = 0; }, 2500); if (logoClicks >= 5) { logoClicks = 0; confetti(); } }));

  /* ---------- 6 · command palette, 12 · keyboard shortcuts ---------- */
  const pal = mk('<div class="pal" id="pal" aria-hidden="true"><div class="pal-box" role="dialog" aria-modal="true"><div class="pal-in">' + SV.search + '<input id="palIn" type="text" autocomplete="off" spellcheck="false" aria-controls="palList"><kbd>Esc</kbd></div><div class="pal-list" id="palList" role="listbox"></div></div></div>');
  body.appendChild(pal);
  const palIn = $('#palIn'), palList = $('#palList'); let palSel = 0, palOpen = false, palPrev = null, palShown = [];
  function goTo19(id) { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }
  function palItems(lng) {
    const L = T19[lng || language], fa = (lng || language) === 'fa', s = L.secs;
    const out = [
      { i: '🏠', t: s[0], g: L.pages, k: '1', run: () => goTo19('home') }, { i: '🗂️', t: s[1], g: L.pages, k: '2', run: () => goTo19('projects') },
      { i: '👤', t: s[2], g: L.pages, k: '3', run: () => goTo19('about') }, { i: '🧰', t: s[3], g: L.pages, run: () => goTo19('toolkit') },
      { i: '✉️', t: s[4], g: L.pages, k: '4', run: () => goTo19('contact') }
    ];
    const pi = { trade: '📈', stellar: '🚀', tarazino: '🗄️' };
    Object.keys(P).forEach(id => out.push({ i: pi[id] || '📦', t: P[id].names[fa ? 0 : 1], g: L.proj, run: () => openSheet(id) }));
    out.push(
      { i: '🌗', t: L.theme, g: L.act, k: 'T', run: () => $('#theme').click() }, { i: '🌐', t: L.lang, g: L.act, k: 'L', run: () => langBtn.click() },
      { i: '📋', t: L.cEmail, g: L.act, run: () => copyText(emailV) }, { i: '📞', t: L.cPhone, g: L.act, run: () => { location.href = 'tel:' + telV; } },
      { i: '💬', t: L.cTg, g: L.act, run: () => window.open(tgV, '_blank', 'noopener') }, { i: '👤', t: L.vcf, g: L.act, run: saveVcf },
      { i: '🔗', t: L.share, g: L.act, run: shareSite }, { i: '⌨️', t: L.help, g: L.act, k: '?', run: () => openPal(true) }, { i: '🎉', t: L.fun, g: L.act, run: confetti }
    );
    return out;
  }
  function renderPal(filter) {
    const f = (filter || '').trim().toLowerCase();
    const other = palItems(language === 'fa' ? 'en' : 'fa'), mine = palItems();
    palShown = mine.filter((x, i) => !f || (x.t + ' ' + x.g + ' ' + other[i].t + ' ' + other[i].g).toLowerCase().includes(f)); palSel = 0;
    palList.innerHTML = ''; if (!palShown.length) { palList.innerHTML = '<div class="pal-empty"></div>'; palList.firstChild.textContent = tt('none'); return; }
    palShown.forEach((x, i) => {
      const b = mk('<button class="pal-it" type="button" role="option" tabindex="-1"><span class="pi"></span><span class="pt"></span><small></small></button>');
      b.children[0].textContent = x.i; b.children[1].textContent = x.t; b.children[2].textContent = x.k || x.g;
      b.addEventListener('click', () => runPal(i)); b.addEventListener('pointermove', () => selPal(i, false)); palList.appendChild(b);
    });
    selPal(0, false);
  }
  function selPal(i, scroll) { palSel = i; $$('.pal-it', palList).forEach((b, k) => { b.classList.toggle('sel', k === i); b.setAttribute('aria-selected', String(k === i)); if (k === i && scroll) b.scrollIntoView({ block: 'nearest' }); }); }
  function runPal(i) { const x = palShown[i]; if (!x) return; closePal(true); setTimeout(x.run, 160); }
  function helpHtml() {
    const rows = [['1 – 4', tt('jump')], ['Ctrl K  /', tt('cmdK')], ['T', tt('theme')], ['L', tt('lang')], ['?', tt('help')], ['Esc', '✕']];
    return '<div class="pal-help"><h3></h3>' + rows.map(r => `<div class="kb"><span></span><span>${r[0].split(/\s{2}/).map(k => k.split(' ').map(x => '<kbd>' + x + '</kbd>').join('')).join(' ')}</span></div>`).join('') + '</div>';
  }
  function openPal(help) {
    if (body.classList.contains('sheet-open')) return;
    if (!palOpen) palPrev = document.activeElement; palOpen = true; pal.classList.add('open'); pal.setAttribute('aria-hidden', 'false');
    palIn.placeholder = tt('search'); palIn.setAttribute('aria-label', tt('search'));
    if (help === true) {
      palList.innerHTML = helpHtml(); $('.pal-help h3', palList).textContent = tt('kbTitle');
      $$('.kb', palList).forEach((k, i) => { k.firstChild.textContent = [tt('jump'), tt('cmdK'), tt('theme'), tt('lang'), tt('help'), '✕'][i]; });
      palShown = []; palIn.value = '';
    } else { palIn.value = ''; renderPal(''); }
    void pal.offsetWidth; palIn.focus({ preventScroll: true });
    setTimeout(() => { if (palOpen && document.activeElement !== palIn) palIn.focus({ preventScroll: true }); }, 140);
  }
  function closePal(skipFocus) { if (!palOpen) return; palOpen = false; pal.classList.remove('open'); pal.setAttribute('aria-hidden', 'true'); if (!skipFocus && palPrev && palPrev.focus) palPrev.focus({ preventScroll: true }); }
  pal.addEventListener('pointerdown', e => { if (e.target === pal) closePal(); });
  palIn.addEventListener('input', () => renderPal(palIn.value));
  palIn.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (palShown.length) selPal((palSel + 1) % palShown.length, true); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (palShown.length) selPal((palSel - 1 + palShown.length) % palShown.length, true); }
    else if (e.key === 'Enter') { e.preventDefault(); runPal(palSel); }
    else if (e.key === 'Tab') e.preventDefault();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && palOpen) { e.preventDefault(); closePal(); return; }
    if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK') { e.preventDefault(); palOpen ? closePal() : openPal(); return; }
    const tgt = e.target, typing = tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA' || tgt.isContentEditable);
    if (typing || palOpen || e.ctrlKey || e.metaKey || e.altKey || body.classList.contains('sheet-open')) return;
    if (e.code === 'Slash') { e.preventDefault(); openPal(e.shiftKey); return; }
    if (e.code === 'Digit1' || e.code === 'Digit2' || e.code === 'Digit3' || e.code === 'Digit4') { goTo19(['home', 'projects', 'about', 'contact'][+e.code.slice(5) - 1]); return; }
    if (e.code === 'KeyT') $('#theme').click(); else if (e.code === 'KeyL') langBtn.click();
  });

  /* ---------- Contact: characters fly in on the way down, fly out on the way up — every time ---------- */
  const fcAll = []; let fcState = 'hidden', fcEver = false, fcVis = 0, fcTok = 0, fcDone = 0, fcRetry = 0;
  if (listCard && !reduced) {
    $$('.row-text b', listCard).forEach(b => {
      const txt = b.textContent; b.setAttribute('aria-label', txt); b.textContent = '';
      [...txt].forEach(ch => { const s = document.createElement('span'); s.className = 'fc'; s.setAttribute('aria-hidden', 'true'); s.textContent = ch; b.appendChild(s); fcAll.push(s); });
    });
    RAF(scatterNow);
  }
  function edgePoint() {
    const W = innerWidth, H = innerHeight, e = (Math.random() * 4) | 0;
    return e === 0 ? [-80 - Math.random() * 140, Math.random() * H] : e === 1 ? [W + 80 + Math.random() * 140, Math.random() * H] : e === 2 ? [Math.random() * W, -80 - Math.random() * 120] : [Math.random() * W, H + 80 + Math.random() * 120];
  }
  /* Resting states live in inline styles (scattered = invisible & far away, assembled = no inline style);
     animations only perform the transition between them, so the state can never get stuck. */
  const poseCss = (fx, fy, fr) => `translate3d(${fx.toFixed(0)}px,${fy.toFixed(0)}px,0) rotate(${fr.toFixed(0)}deg) scale(.3)`;
  function poseFor(r) { const [tx, ty] = edgePoint(); return poseCss(tx - (r.left + r.width / 2), ty - (r.top + r.height / 2), (Math.random() * 2 - 1) * 280); }
  function scatterNow() { const rs = fcAll.map(s => s.getBoundingClientRect()); fcAll.forEach((s, i) => { s.style.opacity = '0'; s.style.transform = poseFor(rs[i]); }); }
  function fcAssemble() {
    if (!fcAll.length || fcState === 'in') return;
    fcState = 'in'; fcEver = true; const tok = ++fcTok; clearTimeout(fcDone); listCard.classList.remove('done');
    fcAll.forEach(s => { s.getAnimations().forEach(a => a.cancel()); s.style.opacity = ''; s.style.transform = ''; });
    const rects = fcAll.map(s => s.getBoundingClientRect()), glow = getComputedStyle(root).getPropertyValue('--glow').trim() || '#7fe';
    fcAll.forEach((s, i) => {
      const d = i * 36;
      const a = s.animate([{ opacity: 0, transform: poseFor(rects[i]) }, { opacity: 1, transform: 'none' }], { duration: 1250, delay: d, easing: 'cubic-bezier(.2,.9,.25,1.1)', fill: 'both' });
      a.onfinish = () => { if (tok === fcTok) a.cancel(); };
      s.animate([{ textShadow: '0 0 0 transparent' }, { textShadow: `0 0 14px ${glow},0 0 30px ${glow}`, color: glow, offset: .35 }, { textShadow: '0 0 0 transparent' }], { duration: 1000, delay: d + 850 });
    });
    fcDone = setTimeout(() => {
      if (fcState !== 'in' || tok !== fcTok) return;
      if (fcAll.some(s => +getComputedStyle(s).opacity < .99) && fcRetry < 2) { fcRetry++; fcState = 'hidden'; scatterNow(); fcAssemble(); return; }
      fcRetry = 0; listCard.classList.add('done');
    }, fcAll.length * 36 + 2300);
  }
  function fcDisperse() {
    if (!fcAll.length || fcState !== 'in') return;
    fcState = 'out'; const tok = ++fcTok; clearTimeout(fcDone); listCard.classList.remove('done');
    const cur = fcAll.map(s => { const c = getComputedStyle(s); return { o: c.opacity, t: c.transform }; });
    fcAll.forEach(s => s.getAnimations().forEach(a => a.cancel()));
    const rects = fcAll.map(s => s.getBoundingClientRect());
    fcAll.forEach((s, i) => {
      const end = poseFor(rects[i]);
      s.style.opacity = cur[i].o; s.style.transform = cur[i].t === 'none' ? '' : cur[i].t;
      const a = s.animate([{ opacity: cur[i].o, transform: cur[i].t === 'none' ? 'none' : cur[i].t }, { opacity: 0, transform: end }], { duration: 850, delay: i * 14, easing: 'cubic-bezier(.55,0,.9,.45)', fill: 'both' });
      a.onfinish = () => { s.style.opacity = '0'; s.style.transform = end; a.cancel(); };
    });
  }
  function fcReset() {
    if (!fcAll.length || fcState === 'hidden') return;
    fcState = 'hidden'; fcTok++; clearTimeout(fcDone); fcAll.forEach(s => s.getAnimations().forEach(a => a.cancel()));
    listCard.classList.remove('done'); scatterNow();
  }
  if (listCard && fcAll.length) {
    let lastY2 = scrollY, dir = 'down', upAcc = 0, tick2 = 0, fcIdle = 0;
    /* the words leave only once the chat box ("Hi! I have an idea…") has come down to the middle of the screen while scrolling up;
       small upward touches before that never interrupt or undo the fly-in */
    const chat = $('.contact-art');
    const chatMid = () => { if (!chat) return upAcc > 40; const r = chat.getBoundingClientRect(); return r.top + r.height / 2 >= innerHeight * .5; };
    const evaluate = () => {
      if (fcVis === 0) { fcReset(); return; }
      if (fcState !== 'in' && fcVis >= .35 && (dir === 'down' || !fcEver)) fcAssemble();
      else if (fcState === 'in' && dir === 'up' && chatMid()) fcDisperse();
    };
    if ('IntersectionObserver' in window) new IntersectionObserver(es => { fcVis = es[es.length - 1].intersectionRatio; evaluate(); }, { threshold: [0, .1, .2, .3, .35, .4, .5, .6, .8, 1] }).observe(listCard);
    else fcAssemble();
    addEventListener('scroll', () => {
      if (tick2) return; tick2 = 1;
      RAF(() => {
        tick2 = 0; const y = scrollY, dy = y - lastY2;
        if (Math.abs(dy) >= 3) { if (dy > 0) { dir = 'down'; upAcc = 0; } else { dir = 'up'; upAcc += -dy; } lastY2 = y; }
        evaluate();
      });
      clearTimeout(fcIdle); fcIdle = setTimeout(evaluate, 160);
    }, { passive: true });
  }

  /* ---------- language-dependent bits ---------- */
  hooks.lang.push(next => {
    renderGreet(); renderAvail(); renderDots(); renderMarquee();
    fabTop.setAttribute('aria-label', tt('top'));
    copyBtns.forEach(b => b.setAttribute('aria-label', tt('copy')));
    if (palOpen) { palIn.placeholder = tt('search'); renderPal(palIn.value); }
  });
