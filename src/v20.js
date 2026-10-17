  /* =====================================================================
     v20 — iOS widgets clock (analog hands), hero replay
     ===================================================================== */
  function syncSec(el, s) {
    el.classList.remove('run'); void el.offsetWidth;
    el.style.setProperty('--sd', (-s).toFixed(2) + 's'); el.classList.add('run'); el._sy = Date.now();
  }
  function analogTick(d) {
    const h = d.getHours() % 12, m = d.getMinutes(), s = d.getSeconds() + d.getMilliseconds() / 1000, nowT = Date.now();
    $$('.an').forEach(a => {
      a.style.setProperty('--rh', ((h + m / 60) * 30).toFixed(2) + 'deg');
      a.style.setProperty('--rm', ((m + s / 60) * 6).toFixed(2) + 'deg');
      if (!a._sy || nowT - a._sy > 300000) syncSec(a, s);
    });
  }
  hooks.tick.push(d => analogTick(d));
  analogTick(new Date());

  /* hero entrance replays every time the visitor scrolls back to the top */
  (function () {
    const heroEl = $('.hero');
    if (!heroEl || reduced || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(es => es.forEach(e => heroEl.classList.toggle('rst', !e.isIntersecting))).observe(heroEl);
  })();
