/* Voices of Autumn — language toggle, mobile menu, partner logos and partner popup. */
(function () {
  'use strict';

  var ZH = window.VOA_ZH || {};
  var root = document.documentElement;
  var LANG_KEY = 'voa-lang';
  var POPUP_KEY = 'voa-popup-seen';

  // Partner logos shown on the home page and in the popup.
  // When partners change, update this list and partners.html.
  // popup: false keeps a logo out of the popup (Community Friends tier).
  var PARTNERS = [
    { name: 'TransGlobal', logo: 'images/partners/transglobal.png', w: 460, h: 190 },
    { name: 'Tredyffrin Republicans', logo: 'images/partners/tredyffrin-republicans.png', w: 460, h: 454 },
    { name: 'MyPhillyLawyer', logo: 'images/partners/myphillylawyer.jpg', w: 460, h: 127 },
    { name: 'Auchel World / Grand Prospects Financial & Insurance Services', logo: 'images/partners/auchel-gpfs.jpg', w: 600, h: 431 },
    { name: 'Asian Plate', logo: 'images/partners/asian-plate.jpg', w: 440, h: 438 },
    { name: 'All About Coconut', logo: 'images/partners/all-about-coconut.png', w: 440, h: 379 },
    { name: 'CHUMS Poke & Skewer', logo: 'images/partners/chums.jpg', w: 360, h: 353 },
    { name: 'Kabuki Japanese Steakhouse', logo: 'images/partners/kabuki.png', w: 420, h: 112 },
    { name: 'O-CHA', text: 'O-CHA' }, // no logo yet: shows the name as a text tile
    { name: 'A Plus Dental Care', logo: 'images/partners/aplus-dental.jpg', w: 420, h: 374, popup: false }
  ];

  function storage(type) {
    return {
      get: function (k) { try { return window[type].getItem(k); } catch (e) { return null; } },
      set: function (k, v) { try { window[type].setItem(k, v); } catch (e) { /* private mode */ } }
    };
  }
  var local = storage('localStorage');
  var session = storage('sessionStorage');

  /* ---------- partner logo strips ---------- */
  function fillStrips() {
    document.querySelectorAll('[data-partner-strip]').forEach(function (box) {
      var inPopup = !!box.closest('dialog');
      box.innerHTML = PARTNERS.filter(function (p) { return !inPopup || p.popup !== false; }).map(function (p) {
        var inner = p.logo
          ? '<img src="' + p.logo + '" alt="' + p.name + '" width="' + p.w + '" height="' + p.h + '" loading="lazy">'
          : '<span class="strip-word">' + p.text + '</span>';
        return '<a class="strip-logo" href="partners.html" title="' + p.name + '">' + inner + '</a>';
      }).join('');
    });
  }

  /* ---------- partner popup (once per browser session, not on the partners page) ---------- */
  var popup = null;
  function buildPopup() {
    if (document.body.getAttribute('data-page') === 'partners') return;
    if (session.get(POPUP_KEY) === '1') return;
    if (typeof HTMLDialogElement !== 'function') return;

    popup = document.createElement('dialog');
    popup.className = 'popup';
    popup.setAttribute('aria-labelledby', 'popup-h');
    popup.innerHTML =
      '<div class="popup-box">' +
        '<div class="popup-top">' +
          '<button type="button" class="lang-btn" data-lang-toggle title="Switch language / 切换语言">中文</button>' +
          '<button type="button" class="popup-x" data-close aria-label="Close" data-i18n-attr="aria-label:pop.close">×</button>' +
        '</div>' +
        '<h2 id="popup-h" data-i18n="pop.h">Become a Voices of Autumn partner</h2>' +
        '<p data-i18n="pop.p">Your support keeps the concert free for every family. Partners are featured on our website, in the program, and on stage, in English and Chinese.</p>' +
        '<div class="partner-strip compact" data-partner-strip></div>' +
        '<div class="popup-actions">' +
          '<a class="btn" href="partners.html" data-seen autofocus data-i18n="pop.go">See partnership options</a>' +
          '<button type="button" class="btn btn-outline" data-close data-i18n="pop.later">Maybe later</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(popup);

    function markSeen() { session.set(POPUP_KEY, '1'); }
    popup.addEventListener('close', markSeen);
    popup.addEventListener('click', function (e) {
      if (e.target === popup || e.target.closest('[data-close]')) popup.close();
      else if (e.target.closest('a')) markSeen();
    });
  }
  function showPopup() {
    if (!popup) return;
    setTimeout(function () {
      if (!popup.open && document.visibilityState !== 'hidden') popup.showModal();
    }, 700);
  }

  /* ---------- language ---------- */
  var current = 'en';
  var originals = new WeakMap();

  function apply(lang) {
    var zh = lang === 'zh';
    document.querySelectorAll('[data-i18n],[data-i18n-html],[data-i18n-attr]').forEach(function (el) {
      var o = originals.get(el);
      if (!o) {
        o = { text: el.textContent, html: el.innerHTML, attrs: {} };
        originals.set(el, o);
      }
      var key = el.getAttribute('data-i18n');
      var hkey = el.getAttribute('data-i18n-html');
      if (key) el.textContent = zh && ZH[key] != null ? ZH[key] : o.text;
      else if (hkey) el.innerHTML = zh && ZH[hkey] != null ? ZH[hkey] : o.html;

      var attrs = el.getAttribute('data-i18n-attr');
      if (attrs) {
        attrs.split(';').forEach(function (pair) {
          var bits = pair.split(':');
          var name = bits[0].trim();
          var k = (bits[1] || '').trim();
          if (!(name in o.attrs)) o.attrs[name] = el.getAttribute(name);
          el.setAttribute(name, zh && ZH[k] != null ? ZH[k] : o.attrs[name]);
        });
      }
    });

    root.lang = zh ? 'zh-Hans' : 'en';
    document.querySelectorAll('[data-lang-toggle]').forEach(function (b) {
      b.textContent = zh ? 'English' : '中文';
      b.setAttribute('lang', zh ? 'en' : 'zh-Hans');
    });
    current = lang;
    document.dispatchEvent(new CustomEvent('voa:lang', { detail: lang }));
    root.classList.remove('i18n-wait');
  }

  function initialLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'zh' || q === 'en') {
      local.set(LANG_KEY, q);
      return q;
    }
    return local.get(LANG_KEY) === 'zh' ? 'zh' : 'en';
  }

  function setLang(lang) {
    local.set(LANG_KEY, lang);
    // keep a shared ?lang= link in sync so a reload doesn't flip it back
    var url = new URL(location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    }
    apply(lang);
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-lang-toggle]')) setLang(current === 'zh' ? 'en' : 'zh');
  });

  /* ---------- tab row: fade the right edge while more tabs are off-screen (phones) ---------- */
  function initTabs() {
    var row = document.querySelector('.nav-links');
    if (!row) return;
    function update() {
      var scrolls = row.scrollWidth > row.clientWidth + 1;
      row.classList.toggle('scrolls', scrolls);
      row.classList.toggle('at-end', !scrolls || row.scrollLeft + row.clientWidth >= row.scrollWidth - 2);
    }
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    document.addEventListener('voa:lang', update);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
    update();
  }

  buildPopup();
  fillStrips();
  initTabs();
  apply(initialLang());
  showPopup();
})();
