/* Marydoc — interactions */
(function () {
  'use strict';

  var STATES = [
    'Arizona', 'Arkansas', 'California', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Illinois', 'Iowa', 'Louisiana', 'Maine',
    'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Missouri',
    'Montana', 'Nevada', 'New Jersey', 'New Mexico', 'New York',
    'North Dakota', 'Ohio', 'Oklahoma', 'Pennsylvania', 'Texas',
    'Vermont', 'Virginia', 'Washington DC', 'West Virginia'
  ];

  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var input = document.getElementById('stateInput');
  var menu = document.getElementById('stateMenu');
  var goBtn = document.getElementById('goBtn');

  var selected = null;
  var hotIndex = -1;

  /* ── header scroll state ── */
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── mobile drawer ── */
  burger.addEventListener('click', function () {
    var open = drawer.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  function closeDrawer() {
    drawer.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  drawer.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeDrawer();
  });

  /* ── state selector ── */
  function renderMenu(query) {
    var q = (query || '').toLowerCase().trim();
    var list = STATES.filter(function (s) { return s.toLowerCase().indexOf(q) !== -1; });

    menu.innerHTML = '';
    if (!list.length) {
      menu.innerHTML = '<div class="selector__none">No matching state — check our coverage list below.</div>';
    } else {
      list.forEach(function (state, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'selector__opt' + (i === hotIndex ? ' is-hot' : '');
        b.setAttribute('role', 'option');
        b.textContent = state;
        b.addEventListener('click', function () { pick(state); });
        menu.appendChild(b);
      });
    }
    menu.classList.add('is-open');
    input.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    input.setAttribute('aria-expanded', 'false');
    hotIndex = -1;
  }

  function pick(state) {
    selected = state;
    input.value = state;
    closeMenu();
    goBtn.innerHTML = 'Continue — ' + state +
      ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  }

  input.addEventListener('focus', function () { hotIndex = -1; renderMenu(input.value); });
  input.addEventListener('input', function () { hotIndex = -1; selected = null; renderMenu(input.value); });

  input.addEventListener('keydown', function (e) {
    var opts = menu.querySelectorAll('.selector__opt');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!menu.classList.contains('is-open')) return renderMenu(input.value);
      hotIndex = Math.min(hotIndex + 1, opts.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      hotIndex = Math.max(hotIndex - 1, 0);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (hotIndex >= 0 && opts[hotIndex]) pick(opts[hotIndex].textContent);
      else if (opts.length === 1) pick(opts[0].textContent);
      return;
    } else if (e.key === 'Escape') {
      closeMenu();
      return;
    } else {
      return;
    }
    opts.forEach(function (o, i) {
      o.classList.toggle('is-hot', i === hotIndex);
      if (i === hotIndex) o.scrollIntoView({ block: 'nearest' });
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.selector')) closeMenu();
  });

  goBtn.addEventListener('click', function () {
    if (!selected) { input.focus(); renderMenu(''); return; }
    // hook your application funnel URL here:
    alert('Starting evaluation for ' + selected + ' — connect your application URL here.');
  });

  /* ── scroll reveal ── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i % 3) * 0.09 + 's';
    io.observe(el);
  });

  /* ── animated counters ── */
  var counterIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      counterIO.unobserve(en.target);
      var el = en.target;
      var target = parseInt(el.getAttribute('data-count'), 10);
      var t0 = null;
      function tick(t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / 1300, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    counterIO.observe(el);
  });

  /* ── hero carousel ── */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var track = document.getElementById('carouselTrack');
  var nextBtn = document.getElementById('carNext');
  var prevBtn = document.getElementById('carPrev');

  if (track && nextBtn && prevBtn) {
    var idx = 0;
    var autoTimer = null;

    var stepSize = function () {
      var gap = parseFloat(getComputedStyle(track).gap) || 20;
      return track.children[0].getBoundingClientRect().width + gap;
    };
    var maxShift = function () {
      return Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
    };
    var lastIndex = function () {
      return Math.ceil(maxShift() / stepSize());
    };

    var goTo = function (i) {
      var last = lastIndex();
      if (i > last) i = 0;
      if (i < 0) i = last;
      idx = i;
      track.style.transform = 'translateX(' + (-Math.min(i * stepSize(), maxShift())) + 'px)';
    };

    var startAuto = function () {
      if (reduced) return;
      stopAuto();
      autoTimer = setInterval(function () { goTo(idx + 1); }, 5000);
    };
    var stopAuto = function () {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    };

    nextBtn.addEventListener('click', function () { goTo(idx + 1); startAuto(); });
    prevBtn.addEventListener('click', function () { goTo(idx - 1); startAuto(); });
    track.parentElement.parentElement.addEventListener('mouseenter', stopAuto);
    track.parentElement.parentElement.addEventListener('mouseleave', startAuto);
    window.addEventListener('resize', function () { goTo(idx); });

    startAuto();
  }

  /* ── smooth anchor scroll with header offset ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeDrawer();
      var top = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  /* ── nav active state ── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.header__link');
  var navIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var id = '#' + en.target.id;
      navLinks.forEach(function (l) {
        l.classList.toggle('is-active', l.getAttribute('href') === id);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(function (s) { navIO.observe(s); });

})();
