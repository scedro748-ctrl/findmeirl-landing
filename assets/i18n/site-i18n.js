(function () {
  var STORAGE_KEY = 'findmeirl_site_lang';
  var SUPPORTED = ['en', 'de', 'fr', 'it'];
  var DEFAULT = 'en';

  var LEGAL_HREF = {
    privacy: {
      en: 'privacy.html',
      de: 'privacy_de.html',
      fr: 'privacy_fr.html',
      it: 'privacy_it.html',
    },
    terms: {
      en: 'terms.html',
      de: 'terms_de.html',
      fr: 'terms_fr.html',
      it: 'terms_it.html',
    },
  };

  function legalHref(kind, lang) {
    var L = normalizeLang(lang);
    var m = LEGAL_HREF[kind];
    if (!m) return '#';
    return m[L] || m[DEFAULT];
  }

  function updateLegalLinkHrefs() {
    document.querySelectorAll('a[data-legal-link]').forEach(function (a) {
      var kind = a.getAttribute('data-legal-link');
      if (!LEGAL_HREF[kind]) return;
      var file = legalHref(kind, currentLang);
      a.setAttribute('href', file);
      if (a.hasAttribute('data-legal-sync-href')) {
        try {
          a.textContent = new URL(file, window.location.href).href;
        } catch (_) {
          a.textContent = file;
        }
      }
    });
  }

  function maybeRedirectLegalDocument() {
    var doc = document.body && document.body.getAttribute('data-legal-doc');
    var docLangRaw = document.body && document.body.getAttribute('data-legal-lang');
    if (!doc || !docLangRaw) return false;
    var L = normalizeLang(currentLang);
    var want = normalizeLang(docLangRaw);
    if (L === want) return false;
    var target = legalHref(doc, L);
    var currentFile = window.location.pathname.split('/').pop() || '';
    if (currentFile === target) return false;
    window.location.replace(target);
    return true;
  }

  function normalizeLang(code) {
    if (!code) return DEFAULT;
    var c = String(code).toLowerCase().split('-')[0];
    return SUPPORTED.indexOf(c) !== -1 ? c : DEFAULT;
  }

  function getNested(obj, path) {
    if (!obj || !path) return null;
    var parts = path.split('.');
    var o = obj;
    for (var i = 0; i < parts.length; i++) {
      if (o == null || typeof o !== 'object') return null;
      o = o[parts[i]];
    }
    return typeof o === 'string' ? o : o == null ? null : String(o);
  }

  var dict = null;
  var currentLang = DEFAULT;

  function apply(root) {
    if (!dict) return;
    root = root || document;

    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var fullTr =
        document.body && document.body.hasAttribute('data-legal-full-translation');
      if (fullTr && key === 'legal.bindingNote') {
        el.classList.add('hidden');
        return;
      }
      var val = getNested(dict, key);
      if (el.hasAttribute('data-i18n-toggle-hidden')) {
        var show = val != null && String(val).trim() !== '';
        el.classList.toggle('hidden', !show);
      }
      if (val != null) el.textContent = val;
    });

    root.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      var val = getNested(dict, key);
      if (val != null) el.innerHTML = val;
    });

    root.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = getNested(dict, key);
      if (val != null) el.setAttribute('placeholder', val);
    });

    root.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria-label');
      var val = getNested(dict, key);
      if (val != null) el.setAttribute('aria-label', val);
    });

    var page =
      document.body && document.body.getAttribute('data-i18n-page')
        ? document.body.getAttribute('data-i18n-page')
        : '';

    if (page !== 'privacy' && page !== 'terms') {
      var mt = getNested(dict, 'meta.title');
      if (mt) document.title = mt;

      var md = getNested(dict, 'meta.description');
      if (md) {
        var m = document.querySelector('meta[name="description"]');
        if (m) m.setAttribute('content', md);
      }
    }

    if (page === 'privacy') {
      var pmt = getNested(dict, 'legal.priv.metaTitle');
      if (pmt) document.title = pmt;
      var pmd = getNested(dict, 'legal.priv.metaDesc');
      if (pmd) {
        var pm = document.querySelector('meta[name="description"]');
        if (pm) pm.setAttribute('content', pmd);
      }
    } else if (page === 'terms') {
      var tmt = getNested(dict, 'legal.tos.metaTitle');
      if (tmt) document.title = tmt;
      var tmd = getNested(dict, 'legal.tos.metaDesc');
      if (tmd) {
        var tm = document.querySelector('meta[name="description"]');
        if (tm) tm.setAttribute('content', tmd);
      }
    }

    document.documentElement.setAttribute('lang', currentLang);

    document.querySelectorAll('.site-lang-select').forEach(function (sel) {
      sel.value = currentLang;
    });

    updateLegalLinkHrefs();
    if (maybeRedirectLegalDocument()) return;

    window.dispatchEvent(
      new CustomEvent('findme:locale-changed', {
        detail: { lang: currentLang, dict: dict, t: window.findmeI18n.t },
      })
    );
  }

  function setLang(lang, skipApply) {
    var L = normalizeLang(lang);
    var url = 'assets/i18n/' + L + '.json?v=1';
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(function (data) {
        dict = data;
        currentLang = L;
        try {
          localStorage.setItem(STORAGE_KEY, L);
        } catch (_) {}
        if (!skipApply) apply(document);
      })
      .catch(function (err) {
        console.error('[findme i18n]', err);
        if (L !== DEFAULT) return setLang(DEFAULT);
      });
  }

  function t(k) {
    return getNested(dict, k) || '';
  }

  function init() {
    var initial = DEFAULT;
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) initial = stored;
      else {
        var nav = (navigator.language || '').toLowerCase().split('-')[0];
        if (SUPPORTED.indexOf(nav) !== -1) initial = nav;
      }
    } catch (_) {}

    document.querySelectorAll('.site-lang-select').forEach(function (sel) {
      sel.addEventListener('change', function (e) {
        var v = e.target.value;
        document.querySelectorAll('.site-lang-select').forEach(function (s) {
          s.value = v;
        });
        setLang(v);
      });
    });

    window.findmeI18n._setLangInternal = setLang;
    setLang(initial);
  }

  window.findmeI18n = {
    init: init,
    setLang: function (lang) {
      return setLang(lang);
    },
    getLang: function () {
      return currentLang;
    },
    t: t,
    apply: apply,
    getDict: function () {
      return dict;
    },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
