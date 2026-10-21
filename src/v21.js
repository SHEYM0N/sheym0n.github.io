  /* =====================================================================
     v21 — ice refraction (Chromium), widget 3D tilt, background parallax
     ===================================================================== */
  (function () {
    /* Real "looking through ice" bending of the text underneath: SVG displacement used as a backdrop filter.
       Chromium only; other browsers keep the frosted-glass look. */
    const brands = (navigator.userAgentData && navigator.userAgentData.brands) || [];
    const chromium = brands.some(b => /Chromium|Google Chrome|Microsoft Edge/i.test(b.brand));
    const strong = (navigator.hardwareConcurrency || 8) >= 4 && (navigator.deviceMemory || 8) >= 4;
    if (false && chromium && strong && qs19.has('ice')) {   /* off by default: far too costly while scrolling; opt-in with ?ice */
      body.appendChild(mk('<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><filter id="ice" filterUnits="userSpaceOnUse" x="-500" y="-500" width="6000" height="6000" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.010 0.018" numOctaves="2" seed="11" result="t"/><feColorMatrix in="t" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 1" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>'));
      root.classList.add('refract');
    }

    /* 3D tilt + moving glare on the three clock widgets (mouse devices) */
    if (finePointer && !reduced) {
      $$('.wg').forEach(w => {
        let t = 0;
        w.addEventListener('pointermove', e => {
          if (lite.on || t) return; t = RAF(() => {
            t = 0; const r = w.getBoundingClientRect(), px = ((e.clientX - r.left) / r.width - .5) * 2, py = ((e.clientY - r.top) / r.height - .5) * 2;
            const ax = -py * 7, ay = px * 7, ang = Math.hypot(ax, ay);
            w.style.setProperty('--rot', ang > .05 ? `${ax.toFixed(2)} ${ay.toFixed(2)} 0 ${ang.toFixed(2)}deg` : '0 0 0 0deg');
            w.style.setProperty('--gx', ((px + 1) * 50).toFixed(0) + '%'); w.style.setProperty('--gy', ((py + 1) * 50).toFixed(0) + '%'); w.style.setProperty('--gr', '240px');
          });
        });
        w.addEventListener('pointerleave', () => { w.style.setProperty('--rot', '0 0 0 0deg'); w.style.removeProperty('--gx'); w.style.removeProperty('--gy'); w.style.removeProperty('--gr'); });
      });
    }

    /* slow parallax: the glass spheres drift as you scroll (one transform, compositor only) */
    const orbs = $('.bg-orbs'); let pt = 0;
    if (orbs && !reduced) addEventListener('scroll', () => {
      if (pt || lite.on) return; pt = RAF(() => { pt = 0; const mx = maxScroll(); orbs.style.transform = `translate3d(0,${(mx > 0 ? -Math.min(1, scrollY / mx) * 70 : 0).toFixed(1)}px,0)`; });
    }, { passive: true });
  })();

  /* =====================================================================
     v30 — playful touches that keep a visit lively (all off under reduced-motion;
     none of them touch the contact details block)
     ===================================================================== */
  (function () {
    if (reduced) return;
    const mkEl = (tag, cls) => { const e = document.createElement(tag); e.className = cls; return e; };

    /* 1 · tap / click burst of little code glyphs (on empty areas only) */
    const layer = mkEl('div', 'fx-layer'); layer.setAttribute('aria-hidden', 'true'); document.body.appendChild(layer);
    const GL = ['{ }', '</>', 'C#', 'Py', 'JS', '=>', '();', '++', 'SQL', '01', 'Kt', '#'], COL = ['#5FE0EA', '#6FA8FF', '#7CFFD4', '#9BE8FF', '#8AB4FF', '#4FD6C8'], WARM = ['#FFC882', '#E9A55B', '#FFD9A6', '#E58A4B', '#F6B77A'];
    let live = 0;
    addEventListener('click', e => {
      const t = e.target;
      if (!t || !t.closest || t.closest('a,button,input,textarea,select,label,summary,[role="button"],.sheet,.pal,#pal,.list-card,.marquee,.tabbar,.site-header')) return;
      if (live > 36 || (e.clientX === 0 && e.clientY === 0)) return;
      const n = finePointer ? 9 : 7;
      for (let i = 0; i < n; i++) {
        const pal = root.getAttribute('data-skin') === 'caramel' ? WARM : COL, s = mkEl('span', 'fx-g'), c = pal[(Math.random() * pal.length) | 0];
        s.textContent = GL[(Math.random() * GL.length) | 0]; s.style.setProperty('--c', c);
        s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px'; layer.appendChild(s); live++;
        const a = (i / n) * Math.PI * 2 + Math.random() * .6, d = 46 + Math.random() * 70;
        const an = s.animate([
          { transform: 'translate(-50%,-50%) scale(.4) rotate(0deg)', opacity: 0 },
          { transform: `translate(calc(-50% + ${(Math.cos(a) * d * .55).toFixed(0)}px),calc(-50% + ${(Math.sin(a) * d * .55 - 8).toFixed(0)}px)) scale(1.1) rotate(${((Math.random() - .5) * 60).toFixed(0)}deg)`, opacity: 1, offset: .3 },
          { transform: `translate(calc(-50% + ${(Math.cos(a) * d).toFixed(0)}px),calc(-50% + ${(Math.sin(a) * d + 26).toFixed(0)}px)) scale(.7) rotate(${((Math.random() - .5) * 120).toFixed(0)}deg)`, opacity: 0 }
        ], { duration: 780 + Math.random() * 260, easing: 'cubic-bezier(.2,.8,.3,1)' });
        an.onfinish = an.oncancel = () => { s.remove(); live--; };
      }
    });

    if (!finePointer) return;

    /* 2 · soft neon spotlight that follows the cursor */
    const spot = mkEl('div', 'fx-spot'); spot.setAttribute('aria-hidden', 'true'); document.body.appendChild(spot);
    let sx = 0, sy = 0, sr = 0;
    addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return; sx = e.clientX; sy = e.clientY; spot.classList.add('on');
      if (!sr) sr = RAF(() => { sr = 0; spot.style.transform = `translate3d(${sx}px,${sy}px,0)`; });
    }, { passive: true });
    document.addEventListener('pointerleave', () => spot.classList.remove('on'));

    /* 3 · background language bubbles drift gently away from / toward the cursor (depth parallax) */
    const lgs = $$('.lg'); let pr = 0, px = 0, py = 0;
    if (lgs.length) addEventListener('pointermove', e => {
      px = e.clientX / innerWidth - .5; py = e.clientY / innerHeight - .5;
      if (pr || lite.on) return;
      pr = RAF(() => { pr = 0; lgs.forEach((g, i) => { const d = (.5 + (i % 5) * .22) * (i % 2 ? -1 : 1); g.style.translate = `${(px * 46 * d).toFixed(1)}px ${(py * 34 * d).toFixed(1)}px`; }); });
    }, { passive: true });

    /* 4 · magnetic primary buttons */
    $$('.btn-primary, .btn-soft').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect(); b.style.translate = `${(((e.clientX - r.left) / r.width - .5) * 12).toFixed(1)}px ${(((e.clientY - r.top) / r.height - .5) * 8).toFixed(1)}px`;
      });
      b.addEventListener('pointerleave', () => {
        const cur = b.style.translate || '0px 0px'; b.style.translate = '';
        b.animate([{ translate: cur }, { translate: '0px 0px' }], { duration: 420, easing: 'cubic-bezier(.2,1.3,.3,1)' });
      });
    });
  })();


  /* =====================================================================
     v32 — smoother scrolling: decorative background motion rests while the page is moving
     ===================================================================== */
  (function () {
    let t = 0, on = false;
    addEventListener('scroll', () => {
      if (!on) { on = true; root.classList.add('is-scrolling'); }
      clearTimeout(t); t = setTimeout(() => { on = false; root.classList.remove('is-scrolling'); }, 140);
    }, { passive: true });
  })();


  /* =====================================================================
     v37 — smoothness kit: nothing animates unless it is on screen (or the tab is visible)
     ===================================================================== */
  (function () {
    document.addEventListener('visibilitychange', () => root.classList.toggle('hid', document.hidden));
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('off', !e.isIntersecting)), { rootMargin: '140px 0px' });
    $$('.marquee, .contact-art, .about-art, .clock-sec, .hero, .tool-grid').forEach(t => io.observe(t));
  })();
