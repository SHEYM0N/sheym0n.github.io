(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement, body = document.body;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- Project content (shown in the bottom sheet) ---------- */
  const P = {
    trade: {
      icon: 'i-chart', names: ['پویا ترید', 'POYA TRADE'], galleryKind: 'win',
      gallery: ['t-main', 't-alt', 't-hist'],
      fa: {
        kind: 'تحلیل تکنیکال', type: 'ابزار تحلیل بازار',
        tagline: 'تحلیل تکنیکال رمزارزها، به زبان ساده.',
        text: 'پویا ترید یک برنامه‌ی دسکتاپ ویندوز برای تحلیل بازار رمزارزهاست. داده‌ی واقعی قیمت را دریافت می‌کند، اندیکاتورهای اصلی را محاسبه و روی نمودار نشان می‌دهد و نتیجه را به جمله‌هایی روشن تبدیل می‌کند: روند چیست، سیگنال چقدر قوی است و ریسک معامله کجاست. هدف این است که تحلیل برای همه قابل‌فهم شود. برنامه یک ابزار تحلیلی است و توصیه‌ی مالی محسوب نمی‌شود.',
        features: [
          ['i-chart', 'نمودار و اندیکاتورها', 'کندل‌استیک همراه با باند بولینگر، میانگین متحرک، RSI، MACD و ADX.'],
          ['i-gauge', 'روند و قدرت سیگنال', 'جمع‌بندی روند بازار و قدرت سیگنال بر پایه‌ی هم‌جهتی چند اندیکاتور.'],
          ['i-spark', 'الگوها و واگرایی', 'شناسایی الگوهای کندلی مانند چکش، دوجی و انگالفینگ و تشخیص واگرایی قیمت و RSI.'],
          ['i-target', 'مدیریت ریسک', 'حد ضرر پیشنهادی بر پایه‌ی نوسان واقعی بازار و محاسبه‌ی نسبت ریسک به ریوارد.'],
          ['i-list', 'تایم‌فریم‌های متنوع', 'از ۱ دقیقه تا ۱ روز، همراه با حمایت و مقاومت هر بازه.'],
          ['i-book', 'تاریخچه‌ی تحلیل‌ها', 'ذخیره‌ی هر تحلیل و بازبینی دوباره‌ی آن در هر زمان.']
        ],
        shots: ['تحلیل روند در تایم‌فریم یک‌ساعته', 'تحلیل در تایم‌فریم کوتاه', 'تاریخچه‌ی تحلیل‌ها'],
        tags: ['تحلیل تکنیکال', 'داده‌ی واقعی بازار', 'رابط فارسی'],
        kv: [['پلتفرم', 'ویندوز (دسکتاپ)'], ['زبان رابط', 'فارسی'], ['نوع', 'ابزار تحلیل تکنیکال']]
      },
      en: {
        kind: 'Technical analysis', type: 'Market analysis tool',
        tagline: 'Technical analysis for crypto, in plain language.',
        text: 'POYA TRADE is a Windows desktop application for analysing the crypto market. It pulls real price data, calculates the key indicators, draws them on the chart and turns the result into clear sentences: what the trend is, how strong the signal is and where the risk of a trade sits. The goal is to make analysis understandable for everyone. It is an analytical tool and not financial advice.',
        features: [
          ['i-chart', 'Charts & indicators', 'Candlesticks with Bollinger Bands, moving averages, RSI, MACD and ADX.'],
          ['i-gauge', 'Trend & signal strength', 'A summary of market trend and signal strength based on several indicators agreeing.'],
          ['i-spark', 'Patterns & divergence', 'Detects candle patterns such as hammer, doji and engulfing, and price/RSI divergence.'],
          ['i-target', 'Risk management', 'A suggested stop-loss based on real market volatility and a risk-to-reward ratio.'],
          ['i-list', 'Multiple timeframes', 'From 1 minute to 1 day, with support and resistance for each range.'],
          ['i-book', 'Analysis history', 'Every analysis can be saved and reviewed again at any time.']
        ],
        shots: ['One-hour trend analysis', 'Short-timeframe analysis', 'Analysis history'],
        tags: ['Technical analysis', 'Real market data', 'Persian UI'],
        kv: [['Platform', 'Windows (desktop)'], ['Interface', 'Persian'], ['Type', 'Technical analysis tool']]
      }
    },
    stellar: {
      icon: 'i-planet', names: ['استلار ونگارد', 'STELLAR VANGUARD'], galleryKind: 'phone',
      gallery: [1, 2, 3, 4, 5, 6],
      fa: {
        kind: 'بازی اکشن فضایی', type: 'بازی اکشن فضایی',
        tagline: 'نبرد در آسمان، از جو زمین تا مدار.',
        text: 'استلار ونگارد یک بازی اکشن فضایی برای اندروید است. بازیکن با یک ناو از آسمان تا مدار پرواز می‌کند، با شهاب‌سنگ‌ها و دشمنان می‌جنگد و در مسیر با رئیس‌های مرحله روبه‌رو می‌شود. سکه‌ها صرف خرید سلاح، ناو و همرزم در زرادخانه می‌شود و ماموریت‌های روزانه دلیلی برای برگشتن هستند.',
        features: [
          ['i-planet', 'پرواز تا مدار', 'صحنه‌ها از آسمان و جو تا فضا تغییر می‌کنند و ارتفاع روی صفحه نمایش داده می‌شود.'],
          ['i-bolt', 'نبرد با رئیس‌ها', 'هر رئیس با صحنه‌ی معرفی به سبک کمیک و الگوی حمله‌ی مخصوص خودش وارد می‌شود.'],
          ['i-box', 'زرادخانه‌ی فضایی', '۲۰ سلاح، ۱۵ ناو و ۴ همرزم برای شخصی‌سازی ناوگان.'],
          ['i-target', 'توانایی ویژه', 'یک توانایی با زمان انتظار که لحظه‌ی درست استفاده‌ی آن نتیجه‌ی نبرد را عوض می‌کند.'],
          ['i-gauge', 'ماموریت‌های روزانه', 'ماموریت‌های تازه در هر روز، همراه با پاداش سکه.'],
          ['i-palette', 'صدا و فضا', 'رابط نئونی، موسیقی، جلوه‌های صوتی و دیالوگ‌هایی که فضای بازی را می‌سازند.']
        ],
        shots: ['منوی اصلی', 'پرواز در آسمان', 'عبور از ابرها', 'ورود رئیس مرحله', 'زرادخانه‌ی فضایی', 'ماموریت‌های روزانه'],
        tags: ['اندروید', 'اکشن', 'فضایی'],
        kv: [['پلتفرم', 'اندروید'], ['ژانر', 'اکشن فضایی'], ['وضعیت', 'در حال توسعه']]
      },
      en: {
        kind: 'Space action game', type: 'Space action game',
        tagline: 'Combat in the sky, from the atmosphere to orbit.',
        text: 'STELLAR VANGUARD is a space action game for Android. Players fly a ship from the sky up to orbit, fight asteroids and enemies, and meet boss characters along the way. Coins are spent on weapons, ships and companions in the arsenal, and daily missions give players a reason to come back.',
        features: [
          ['i-planet', 'Flight to orbit', 'Scenes shift from sky and atmosphere into space, with an altitude meter on screen.'],
          ['i-bolt', 'Boss battles', 'Each boss arrives with a comic-style introduction and its own attack pattern.'],
          ['i-box', 'Space arsenal', '20 weapons, 15 ships and 4 companions to customise your fleet.'],
          ['i-target', 'Special ability', 'An ability with a cooldown — using it at the right moment changes the fight.'],
          ['i-gauge', 'Daily missions', 'New missions every day, rewarded with coins.'],
          ['i-palette', 'Sound & atmosphere', 'A neon interface, music, sound effects and dialogue that build the world.']
        ],
        shots: ['Main menu', 'Flying through the sky', 'Through the clouds', 'A boss arrives', 'Space arsenal', 'Daily missions'],
        tags: ['Android', 'Action', 'Sci-Fi'],
        kv: [['Platform', 'Android'], ['Genre', 'Space action'], ['Status', 'In development']]
      }
    },
    tarazino: {
      icon: 'i-db', names: ['ترازینو', 'Tarazino'], galleryKind: 'win', gallery: [],
      fa: {
        kind: 'حسابداری فروشگاهی', type: 'حسابداری و انبار',
        tagline: 'حساب‌وکتاب فروشگاه، منظم و در یک جا.',
        text: 'ترازینو برای فروشگاه‌هایی طراحی شده که می‌خواهند خرید، فروش و موجودی را در یک برنامه‌ی منظم نگه دارند. فاکتورها، کالاها، اشخاص و انبار به هم متصل‌اند و داشبورد روزانه وضعیت کسب‌وکار را در یک نگاه نشان می‌دهد.',
        features: [
          ['i-gauge', 'داشبورد روزانه', 'فروش امروز، تعداد فاکتورها و ارزش موجودی در همان صفحه‌ی اول.'],
          ['i-receipt', 'فاکتور خرید و فروش', 'ثبت سریع فاکتور و مرور آخرین فاکتورهای صادرشده.'],
          ['i-box', 'کالاها و موجودی', 'وضعیت موجودی، کالاهای کم‌موجود و تمام‌شده با نمایش تصویری.'],
          ['i-users', 'اشخاص', 'فهرست مشتریان و تأمین‌کنندگان در کنار حساب‌ها.']
        ],
        shots: [], tags: ['حسابداری', 'انبار', 'فروشگاه'],
        kv: [['پلتفرم', 'موبایل و دسکتاپ'], ['حوزه', 'حسابداری فروشگاهی'], ['داده', 'ذخیره‌سازی محلی']]
      },
      en: {
        kind: 'Retail accounting', type: 'Accounting & inventory',
        tagline: 'A shop’s books, orderly and in one place.',
        text: 'Tarazino is built for shops that want purchases, sales and stock managed in one orderly application. Invoices, products, contacts and the warehouse are connected, and the daily dashboard shows the state of the business at a glance.',
        features: [
          ['i-gauge', 'Daily dashboard', 'Today’s sales, invoice count and stock value on the very first screen.'],
          ['i-receipt', 'Sales & purchase invoices', 'Quick invoice entry and a view of the latest invoices issued.'],
          ['i-box', 'Products & stock', 'Stock status with a visual breakdown of low and sold-out items.'],
          ['i-users', 'Contacts', 'Customers and suppliers listed alongside the accounts.']
        ],
        shots: [], tags: ['Accounting', 'Inventory', 'Retail'],
        kv: [['Platform', 'Mobile & desktop'], ['Domain', 'Retail accounting'], ['Data', 'Local storage']]
      }
    }
  };
  const UI = {
    fa: { lang: 'تغییر زبان به انگلیسی', theme: 'تغییر تم', close: 'بستن', inside: 'امکانات برنامه', insideGame: 'امکانات بازی', shots: 'نمایی از برنامه', shotsGame: 'تصاویر بازی', details: 'مشخصات', open: 'مشاهده‌ی پروژه' },
    en: { lang: 'Switch to Persian', theme: 'Toggle theme', close: 'Close', inside: 'Features', insideGame: 'Game features', shots: 'App preview', shotsGame: 'Game screens', details: 'Details', open: 'View project' }
  };


  /* ---------- Live fragments: mount <template>s and scale the app windows ---------- */
  const scaleRO = 'ResizeObserver' in window ? new ResizeObserver(es => es.forEach(e => fit(e.target))) : null;
  function fit(el) { const c = el.firstElementChild; if (c && c.offsetWidth) el.style.setProperty('--s', (el.clientWidth / c.offsetWidth).toFixed(4)); }
  function mount(scope) {
    $$('[data-tpl]', scope).forEach(el => {
      if (el.dataset.done) return; el.dataset.done = '1';
      const t = document.getElementById('tpl-' + el.dataset.tpl); if (!t) return;
      el.appendChild(t.content.cloneNode(true)); mount(el);
    });
    $$('.tscale', scope).forEach(el => { fit(el); if (scaleRO) scaleRO.observe(el); });
  }
  mount(document);
  addEventListener('load', () => $$('.tscale').forEach(fit));

  /* ---------- Language ---------- */
  const langBtn = $('#language'), langText = $('#langText');
  let language = 'fa';
  function splitWords(el) {
    if (!el || reduced) return;
    const text = el.textContent.trim(); el.textContent = '';
    text.split(/\s+/).forEach((w, i, arr) => {
      const s = document.createElement('span'); s.className = 'w'; s.style.setProperty('--i', i); s.textContent = w; el.appendChild(s);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
    });
  }
  function setLanguage(next) {
    language = next;
    const en = next === 'en';
    root.lang = next; root.dir = en ? 'ltr' : 'rtl';
    body.classList.toggle('english', en);
    $$('[data-fa][data-en]').forEach(el => { const v = el.getAttribute(en ? 'data-en' : 'data-fa'); if (v != null) el.innerHTML = v; });
    splitWords($('.hero h1 span'));
    langText.textContent = en ? 'FA' : 'EN';
    langBtn.setAttribute('aria-label', UI[next].lang);
    $('#theme').setAttribute('aria-label', UI[next].theme);
    $('#sheetClose').setAttribute('aria-label', UI[next].close);
    renderIsland(); if (currentProject) fillSheet(currentProject);
    if (typeof renderClock === 'function' && lockDigits) { clockReady = false; renderClock(); }
    try { localStorage.setItem('sheymon-language', next); } catch (_) {}
    requestAnimationFrame(placeIndicator);
  }

  /* ---------- Theme ---------- */
  const themeMeta = $('meta[name="theme-color"]');
  function setTheme(t, save) {
    root.setAttribute('data-theme', t);
    if (themeMeta) themeMeta.setAttribute('content', t === 'dark' ? '#070B14' : '#DCE6FF');
    if (save) { try { localStorage.setItem('sheymon-theme', t); } catch (_) {} }
  }
  $('#theme').addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true));

  /* ---------- Sliding indicator in the header nav ---------- */
  const nav = $('#nav'); let ind = null;
  if (nav) { ind = document.createElement('i'); ind.className = 'nav-ind'; nav.prepend(ind); }
  function placeIndicator() {
    if (!ind) return;
    const a = $('.nav-link.active', nav) || $('.nav-link', nav);
    ind.style.setProperty('--x', a.offsetLeft + 'px'); ind.style.setProperty('--w', a.offsetWidth + 'px');
  }

  /* ---------- Bottom sheet ---------- */
  const sheet = $('#sheet'), backdrop = $('#sheetBackdrop'), closeBtn = $('#sheetClose'), scroller = $('#sheetScroll');
  let currentProject = null, lastFocus = null;
  const iconStyle = { trade: 'var(--i-appicon)', stellar: 'var(--i-sticon)' };
  function fillSheet(id) {
    const d = P[id], t = d[language], game = id === 'stellar';
    const [fa, en] = d.names;
    const ic = $('#sheetIcon');
    if (id === 'tarazino') { ic.className = 'app-ic sq sq-4'; ic.style.removeProperty('--ic'); ic.innerHTML = '<svg class="ic" aria-hidden="true"><use href="#i-db"/></svg>'; }
    else { ic.className = 'app-ic'; ic.innerHTML = ''; ic.style.setProperty('--ic', iconStyle[id]); }
    const vis = $('#sheetVisual'); vis.innerHTML = `<div data-tpl="cover-${id}" role="img" aria-label="${en}"></div>`; mount(vis);
    $('#sheetType').textContent = t.type;
    $('#sheetTitle').innerHTML = language === 'fa'
      ? `<span class="n1">${fa}</span><span class="n2" dir="auto">${en}</span>`
      : `<span class="n1">${en}</span><span class="n2">${fa}</span>`;
    $('#sheetTagline').textContent = t.tagline;
    $('#sheetText').textContent = t.text;
    $('#subInside').textContent = game ? UI[language].insideGame : UI[language].inside;
    $('#subShots').textContent = game ? UI[language].shotsGame : UI[language].shots;
    $('#subDetails').textContent = UI[language].details;
    $('#sheetFeatures').innerHTML = t.features.map(([i, title, desc], k) =>
      `<li style="--k:${k}"><span class="sq sq-${[1, 2, 4, 3][k % 4]}"><svg class="ic" aria-hidden="true"><use href="#${i}"/></svg></span><span class="li-text"><b>${title}</b><small>${desc}</small></span></li>`).join('');
    const wrap = $('#galleryWrap'); wrap.hidden = !d.gallery.length;
    $('#sheetGallery').innerHTML = d.gallery.map((g, i) => {
      const cap = `<figcaption>${t.shots[i] || ''}</figcaption>`;
      return d.galleryKind === 'win'
        ? `<figure class="shot win"><div class="tscale" data-tpl="${g}" style="aspect-ratio:${g === 't-hist' ? '1000/640' : '1500/840'}" role="img" aria-label="${t.shots[i] || ''}"></div>${cap}</figure>`
        : `<figure class="shot phone"><div class="phone-wrap" role="img" aria-label="${t.shots[i] || ''}"><div class="phone" style="--shot:var(--i-g${g})"><div class="screen"></div></div></div>${cap}</figure>`;
    }).join('');
    mount($('#sheetGallery'));
    $('#sheetKV').innerHTML = t.kv.map(([k, v]) => `<div><dt>${k}</dt><dd dir="auto">${v}</dd></div>`).join('');
    $('#sheetTags').innerHTML = t.tags.map(x => `<span class="tag">${x}</span>`).join('');
  }
  function openSheet(id) {
    lastFocus = document.activeElement; currentProject = id;
    fillSheet(id); scroller.scrollTop = 0;
    sheet.style.transform = ''; backdrop.style.opacity = '';
    body.classList.add('sheet-open');
    sheet.setAttribute('aria-hidden', 'false'); backdrop.setAttribute('aria-hidden', 'false');
    setTimeout(() => closeBtn.focus({ preventScroll: true }), 80);
  }
  function closeSheet() {
    if (!body.classList.contains('sheet-open')) return;
    sheet.style.transform = ''; backdrop.style.opacity = '';
    body.classList.remove('sheet-open'); currentProject = null;
    sheet.setAttribute('aria-hidden', 'true'); backdrop.setAttribute('aria-hidden', 'true');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $$('.project').forEach(card => {
    const id = card.dataset.project;
    card.addEventListener('click', () => openSheet(id));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSheet(id); } });
  });
  closeBtn.addEventListener('click', closeSheet); backdrop.addEventListener('click', closeSheet);
  $('.grabber').addEventListener('click', closeSheet);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
  let startY = 0, dy = 0, dragging = false, tracking = false;
  sheet.addEventListener('touchstart', e => { tracking = scroller.scrollTop <= 0; dragging = false; dy = 0; startY = e.touches[0].clientY; }, { passive: true });
  sheet.addEventListener('touchmove', e => {
    if (!tracking) return; dy = e.touches[0].clientY - startY;
    if (dy > 8 && scroller.scrollTop <= 0) { dragging = true; e.preventDefault(); sheet.style.transition = 'none'; sheet.style.transform = `translateY(${dy}px)`; backdrop.style.opacity = String(Math.max(0, 1 - dy / 420)); }
  }, { passive: false });
  sheet.addEventListener('touchend', () => {
    if (!dragging) return; sheet.style.transition = ''; void sheet.offsetHeight;
    if (dy > 120) closeSheet(); else { sheet.style.transform = ''; backdrop.style.opacity = ''; }
    dragging = false; tracking = false;
  });

  /* ---------- Dynamic-Island project switcher ---------- */
  const island = $('#island'), order = ['trade', 'stellar', 'tarazino'];
  let islandIdx = 0, islandOpen = false;
  function renderIsland() {
    const id = order[islandIdx], t = P[id][language];
    $('#islandName').textContent = P[id].names[language === 'fa' ? 0 : 1]; $('#islandKind').textContent = t.kind;
    $('#islandUse').setAttribute('href', '#' + P[id].icon);
    island.setAttribute('aria-label', UI[language].open + ': ' + P[id].names[language === 'fa' ? 0 : 1]);
  }
  function islandStep() {
    if (document.hidden || body.classList.contains('sheet-open')) return;
    if (islandOpen) { island.classList.remove('open'); islandOpen = false; islandIdx = (islandIdx + 1) % order.length; }
    else { renderIsland(); island.classList.add('open'); islandOpen = true; }
  }
  island.addEventListener('click', () => openSheet(order[islandIdx]));
  renderIsland();
  if (!reduced) { setTimeout(islandStep, 1600); setInterval(islandStep, 3400); } else island.classList.add('open');

  /* ---------- Scroll polish: header shadow + hero depth (the tab bar keeps a fixed size) ---------- */
  const header = $('.site-header'), tabbar = $('#tabbar'), heroArt = $('#heroArt'), pill = $('#tabPill');
  const tabs = tabbar ? $$('.tab', tabbar) : [];
  let ticking = false, activeHash = '';
  function setTabPill() {
    if (!pill) return;
    const i = Math.max(0, tabs.findIndex(t => t.classList.contains('active')));
    pill.style.setProperty('--i', i);
  }
  function maxScroll() { return Math.max(0, document.documentElement.scrollHeight - innerHeight); }
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY, max = maxScroll();
      header.classList.toggle('scrolled', y > 8);
      /* the last section can be too short to reach the active band: force it at the page end (ignores iOS overscroll) */
      if (max > 0 && y >= max - 4 && y <= max + 1) setActive('#contact');
      if (!reduced && heroArt && y < 900) heroArt.style.setProperty('--sy', y.toFixed(0));
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Pointer effects (desktop only): hero depth + card tilt/glare ---------- */
  if (finePointer && !reduced) {
    const hero = $('.hero');
    hero.addEventListener('pointermove', e => {
      const r = heroArt.getBoundingClientRect();
      heroArt.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      heroArt.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    });
    hero.addEventListener('pointerleave', () => { heroArt.style.setProperty('--mx', 0); heroArt.style.setProperty('--my', 0); });
    $$('.project').forEach(card => {
      let raf = 0;
      card.addEventListener('pointermove', e => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0; const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          card.style.transition = 'transform .12s linear, box-shadow .35s ease';
          card.style.transform = `perspective(1000px) rotateX(${((.5 - y) * 5).toFixed(2)}deg) rotateY(${((x - .5) * 6).toFixed(2)}deg) translateY(-6px)`;
          card.style.setProperty('--gx', (x * 100).toFixed(1) + '%'); card.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
        });
      });
      card.addEventListener('pointerleave', () => { card.style.transition = ''; card.style.transform = ''; });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); if (en.target.classList.contains('about-card')) countUp(); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    $$('.lock, .section-head, .project, .projects-end, .about-card, .tool, .contact-art, .list-card').forEach(el => {
      if (el.getBoundingClientRect().top < innerHeight * .9) return;
      el.classList.add('reveal');
      const k = el.classList.contains('tool') ? $$('.tool').indexOf(el) % 4 : (el.classList.contains('project') ? $$('.project').indexOf(el) : 0);
      el.style.setProperty('--d', (k * .08).toFixed(2) + 's'); io.observe(el);
    });
  }
  function countUp() {
    const n = $('.w-a b'); if (!n || n.dataset.done) return; n.dataset.done = 1;
    const to = +n.textContent || 3; let v = 0; n.textContent = '0';
    const step = () => { v += 1; n.textContent = v; if (v < to) setTimeout(step, 260); }; setTimeout(step, 300);
  }

  /* ---------- Active section ---------- */
  function setActive(h) {
    if (h === activeHash) return; activeHash = h;
    $$('.nav-link').forEach(l => l.classList.toggle('active', l.hash === h));
    placeIndicator(); setTabPill();
  }
  if ('IntersectionObserver' in window) {
    const io2 = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return;
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) return setActive('#contact');
      setActive('#' + ({ toolkit: 'about', 'clock-sec': 'home' }[en.target.id] || en.target.id));
    }), { rootMargin: '-40% 0px -55% 0px' });
    ['home', 'clock-sec', 'projects', 'about', 'toolkit', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) io2.observe(el); });
  }

  /* ---------- iPhone-style glass clock: the visitor's own local time ---------- */
  const lock = $('#lock'), lockDigits = $$('.t-d', lock), nfs = { fa: new Intl.NumberFormat('fa-IR', { useGrouping: false }), en: new Intl.NumberFormat('en-US', { useGrouping: false }) };
  let clockReady = false;
  function renderClock() {
    const d = new Date(), fa = language === 'fa', loc = fa ? 'fa-IR' : 'en-US', nf = nfs[language];
    let h = d.getHours(); const m = d.getMinutes(), sec = d.getSeconds();
    let ap = ''; if (!fa) { ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; }
    const hs = fa ? String(h).padStart(2, '0') : String(h), ms = String(m).padStart(2, '0');
    const chars = [hs.length > 1 ? hs[0] : '', hs[hs.length - 1], ms[0], ms[1]];
    chars.forEach((c, i) => {
      const el = lockDigits[i], t = c;
      if (el.textContent === t) return;
      el.textContent = t;
      if (clockReady && t) { el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip'); }
    });
    clockReady = true;
    try { $('#lockDate').textContent = new Intl.DateTimeFormat(loc, { weekday: 'long', month: 'long', day: 'numeric' }).format(d); } catch (_) {}
    $('#lockAp').textContent = ap;
    let tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (_) {}
    const part = (opt) => { try { const p = new Intl.DateTimeFormat(loc, { timeZoneName: opt }).formatToParts(d).find(x => x.type === 'timeZoneName'); return p ? p.value : ''; } catch (_) { return ''; } };
    const city = tz.split('/').pop().replace(/_/g, ' ');
    $('#lzCity').textContent = fa ? (part('longGeneric') || city || '—') : (city || '—');
    $('#lzOff').textContent = part('shortOffset') || tz;
    const pct = (h24(d)) / 86400;
    $('#lzRing').style.strokeDashoffset = (113.1 * (1 - pct)).toFixed(2);
    $('#lzPct').textContent = nf.format(Math.round(pct * 100)) + (fa ? '٪' : '%');
  }
  function h24(d) { return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds(); }
  (function tick() { renderClock(); setTimeout(tick, 1000 - (Date.now() % 1000) + 8); })();
  document.addEventListener('visibilitychange', () => { if (!document.hidden) renderClock(); });
  if (finePointer && !reduced) {
    lock.addEventListener('pointermove', e => { const r = lock.getBoundingClientRect(); lock.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3)); lock.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3)); });
    lock.addEventListener('pointerleave', () => { lock.style.setProperty('--mx', 0); lock.style.setProperty('--my', 0); });
  }

  langBtn.addEventListener('click', () => setLanguage(language === 'fa' ? 'en' : 'fa'));
  try { setLanguage(localStorage.getItem('sheymon-language') === 'en' ? 'en' : 'fa'); } catch (_) { setLanguage('fa'); }
  addEventListener('resize', () => { placeIndicator(); setTabPill(); }); placeIndicator(); setTabPill();
})();
