(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const body = document.body;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Project content (shown in the bottom sheet) ---------- */
  const P = {
    trade: {
      icon: 'i-chart', cover: 'trade-cover.webp', names: ['پویا ترید', 'POYA TRADE'], galleryKind: 'win',
      gallery: ['trade-1.webp', 'trade-2.webp', 'trade-3.webp'],
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
      icon: 'i-planet', cover: 'stellar-cover.webp', names: ['استلار ونگارد', 'STELLAR VANGUARD'], galleryKind: 'phone',
      gallery: ['game-1.webp', 'game-2.webp', 'game-3.webp', 'game-4.webp', 'game-5.webp', 'game-6.webp'],
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
      icon: 'i-db', cover: 'project-tarazino.svg', names: ['ترازینو', 'Tarazino'], galleryKind: 'win', gallery: [],
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

  /* ---------- Language ---------- */
  const langBtn = $('#language'), langText = $('#langText');
  let language = 'fa';
  function setLanguage(next) {
    language = next;
    const en = next === 'en';
    root.lang = next; root.dir = en ? 'ltr' : 'rtl';
    body.classList.toggle('english', en);
    $$('[data-fa][data-en]').forEach(el => {
      const v = el.getAttribute(en ? 'data-en' : 'data-fa');
      if (v != null) el.innerHTML = v;
    });
    langText.textContent = en ? 'FA' : 'EN';
    langBtn.setAttribute('aria-label', UI[next].lang);
    $('#theme').setAttribute('aria-label', UI[next].theme);
    $('#sheetClose').setAttribute('aria-label', UI[next].close);
    renderIsland(); if (currentProject) fillSheet(currentProject);
    try { localStorage.setItem('sheymon-language', next); } catch (_) {}
  }

  /* ---------- Theme ---------- */
  const themeMeta = $('meta[name="theme-color"]');
  function setTheme(t, save) {
    root.setAttribute('data-theme', t);
    if (themeMeta) themeMeta.setAttribute('content', t === 'dark' ? '#110D09' : '#FBF8F3');
    if (save) { try { localStorage.setItem('sheymon-theme', t); } catch (_) {} }
  }
  $('#theme').addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true));
  try {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('sheymon-theme')) setTheme(e.matches ? 'dark' : 'light', false);
    });
  } catch (_) {}

  /* ---------- Bottom sheet ---------- */
  const sheet = $('#sheet'), backdrop = $('#sheetBackdrop'), closeBtn = $('#sheetClose'), scroller = $('#sheetScroll');
  let currentProject = null, lastFocus = null;

  function fillSheet(id) {
    const d = P[id], t = d[language], game = id === 'stellar';
    const [fa, en] = d.names;
    const vis = $('#sheetVisual'); vis.innerHTML = `<img src="${d.cover}" alt="${en}" width="1200" height="800">`;
    $('#sheetType').textContent = t.type;
    $('#sheetTitle').innerHTML = language === 'fa'
      ? `<span class="n1">${fa}</span><span class="n2" dir="auto">${en}</span>`
      : `<span class="n1">${en}</span><span class="n2">${fa}</span>`;
    $('#sheetTagline').textContent = t.tagline;
    $('#sheetText').textContent = t.text;
    $('#subInside').textContent = game ? UI[language].insideGame : UI[language].inside;
    $('#subShots').textContent = game ? UI[language].shotsGame : UI[language].shots;
    $('#subDetails').textContent = UI[language].details;
    $('#sheetFeatures').innerHTML = t.features.map(([ic, title, desc], i) =>
      `<li><span class="sq sq-${[1, 2, 4, 3][i % 4]}"><svg class="ic" aria-hidden="true"><use href="#${ic}"/></svg></span><span class="li-text"><b>${title}</b><small>${desc}</small></span></li>`).join('');
    const wrap = $('#galleryWrap');
    wrap.hidden = !d.gallery.length;
    $('#sheetGallery').innerHTML = d.gallery.map((src, i) =>
      `<figure class="shot ${d.galleryKind}"><img src="${src}" alt="${t.shots[i] || ''}" loading="lazy" decoding="async"><figcaption>${t.shots[i] || ''}</figcaption></figure>`).join('');
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
  closeBtn.addEventListener('click', closeSheet);
  backdrop.addEventListener('click', closeSheet);
  $('.grabber').addEventListener('click', closeSheet);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

  // drag down to dismiss (touch)
  let startY = 0, dy = 0, dragging = false, tracking = false;
  sheet.addEventListener('touchstart', e => {
    tracking = scroller.scrollTop <= 0; dragging = false; dy = 0; startY = e.touches[0].clientY;
  }, { passive: true });
  sheet.addEventListener('touchmove', e => {
    if (!tracking) return;
    dy = e.touches[0].clientY - startY;
    if (dy > 8 && scroller.scrollTop <= 0) {
      dragging = true; e.preventDefault();
      sheet.style.transition = 'none';
      sheet.style.transform = `translateY(${dy}px)`;
      backdrop.style.opacity = String(Math.max(0, 1 - dy / 420));
    }
  }, { passive: false });
  sheet.addEventListener('touchend', () => {
    if (!dragging) return;
    sheet.style.transition = ''; void sheet.offsetHeight;
    if (dy > 120) closeSheet(); else { sheet.style.transform = ''; backdrop.style.opacity = ''; }
    dragging = false; tracking = false;
  });

  /* ---------- Dynamic-Island project switcher ---------- */
  const island = $('#island'), order = ['trade', 'tarazino', 'stellar'];
  let islandIdx = 0, islandOpen = false, islandTimer = null;
  function renderIsland() {
    const id = order[islandIdx], t = P[id][language];
    $('#islandName').textContent = language === 'fa' ? P[id].names[0] : P[id].names[1]; $('#islandKind').textContent = t.kind;
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
  if (!reduced) { setTimeout(islandStep, 1400); islandTimer = setInterval(islandStep, 3400); }
  else { island.classList.add('open'); }

  /* ---------- Scroll-driven polish ---------- */
  const header = $('.site-header'), heroArt = $('.hero-art');
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 8);
      if (!reduced && y < 900 && innerWidth > 820) root.style.setProperty('--py', (y * 0.07).toFixed(1));
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Reveal on scroll (spring) ---------- */
  if ('IntersectionObserver' in window && !reduced) {
    const targets = $$('.section-head, .project, .projects-end, .about-card, .tool, .contact-art, .list-card');
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((el, i) => {
      if (el.getBoundingClientRect().top < innerHeight * .9) return;   // already visible: don't hide
      el.classList.add('reveal');
      const sib = el.classList.contains('tool') ? $$('.tool').indexOf(el) % 4 : (el.classList.contains('project') ? $$('.project').indexOf(el) : 0);
      el.style.setProperty('--d', (sib * 0.08).toFixed(2) + 's');
      io.observe(el);
    });
  }

  /* ---------- Active section in nav + tab bar ---------- */
  if ('IntersectionObserver' in window) {
    const links = $$('.nav-link');
    const mark = hash => links.forEach(l => l.classList.toggle('active', l.hash === hash));
    const io2 = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) mark('#' + (en.target.id === 'toolkit' ? 'about' : en.target.id)); }), { rootMargin: '-40% 0px -55% 0px' });
    ['home', 'projects', 'about', 'toolkit', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) io2.observe(el); });
  }

  langBtn.addEventListener('click', () => setLanguage(language === 'fa' ? 'en' : 'fa'));
  try { setLanguage(localStorage.getItem('sheymon-language') === 'en' ? 'en' : 'fa'); } catch (_) { setLanguage('fa'); }
})();
