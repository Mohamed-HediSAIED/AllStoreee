/* ════════════════════════════════════════════════════════════════════
   APPLE THEME SWITCH — dark/light toggle avec persistence
   - Lit localStorage.getItem('apple-theme')
   - Applique data-theme="dark|light" sur <html>
   - Si pas de préférence, suit prefers-color-scheme OS
   - Expose window.toggleAppleTheme()
   ════════════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  var STORAGE_KEY = 'apple-theme';
  var root = document.documentElement;

  // Applique un thème explicite : 'dark' | 'light' | null (auto)
  function applyTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
  }

  // Récupère le thème stocké (ou null)
  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  // Stocke un thème
  function storeTheme(theme) {
    try {
      if (theme) {
        localStorage.setItem(STORAGE_KEY, theme);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {}
  }

  // Détermine le thème "effectif" actuel (dark/light)
  function getCurrentTheme() {
    var stored = getStoredTheme();
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Toggle public
  function toggleAppleTheme() {
    var current = getCurrentTheme();
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    storeTheme(next);

    // Émet un événement custom pour que d'autres scripts puissent réagir
    window.dispatchEvent(new CustomEvent('apple-theme-change', { detail: { theme: next } }));

    // Met à jour les icônes/attributs si présents
    updateToggleIcons(next);
  }

  // Reset : revenir au choix système
  function resetAppleTheme() {
    applyTheme(null);
    storeTheme(null);
    var effective = getCurrentTheme();
    window.dispatchEvent(new CustomEvent('apple-theme-change', { detail: { theme: effective } }));
    updateToggleIcons(effective);
  }

  // Mise à jour des icônes (sun/moon) sur les boutons toggle
  function updateToggleIcons(theme) {
    var buttons = document.querySelectorAll('[data-apple-theme-toggle]');
    buttons.forEach(function(btn) {
      btn.setAttribute('aria-label',
        theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre');
      btn.setAttribute('data-current-theme', theme);
    });
  }

  // Init : applique le thème stocké au démarrage
  var stored = getStoredTheme();
  if (stored) {
    applyTheme(stored);
  }

  // Écoute les changements système (seulement si pas de choix manuel)
  if (window.matchMedia) {
    var mql = window.matchMedia('(prefers-color-scheme: dark)');
    var mqlHandler = function(e) {
      if (!getStoredTheme()) {
        // Pas de préférence manuelle : suit le système
        var effective = e.matches ? 'dark' : 'light';
        updateToggleIcons(effective);
        window.dispatchEvent(new CustomEvent('apple-theme-change', { detail: { theme: effective } }));
      }
    };
    if (mql.addEventListener) mql.addEventListener('change', mqlHandler);
    else if (mql.addListener) mql.addListener(mqlHandler);
  }

  // Branche les boutons [data-apple-theme-toggle] automatiquement
  document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('[data-apple-theme-toggle]');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleAppleTheme();
      });
    });
    updateToggleIcons(getCurrentTheme());
  });

  // Expose l'API publique
  window.toggleAppleTheme = toggleAppleTheme;
  window.resetAppleTheme = resetAppleTheme;
  window.getAppleTheme = getCurrentTheme;
})();
