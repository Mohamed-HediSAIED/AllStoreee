/**
 * pdp-polish — subtle enhancements for product detail pages (.pdp layout).
 *  - h1 word-by-word reveal on load (delegates to kinetic.js via [data-fx-kinetic])
 *  - CTA (.pdp-btn-cart) ritual pulse on click before navigating away
 *
 * No WebGL. No animated background. No scroll-linked shaders.
 * Preserves all existing DOM IDs and inline onclick handlers.
 */

import { initKineticHeadings } from './kinetic.js';

const RITUAL_MS = 420;

function flagKineticHeading() {
  const pdp = document.querySelector('.pdp');
  if (!pdp) return;
  const h1 = pdp.querySelector('h1, .pdp-title, .pdp-name');
  if (h1 && !h1.hasAttribute('data-fx-kinetic')) {
    h1.setAttribute('data-fx-kinetic', '');
  }
  initKineticHeadings();
}

function wrapCtaRitual() {
  document.querySelectorAll('.pdp .pdp-btn-cart').forEach((btn) => {
    if (btn.dataset.fxRitualWrapped === 'done') return;
    btn.dataset.fxRitualWrapped = 'done';

    btn.addEventListener('click', function (ev) {
      if (btn.dataset.fxRitualPlaying === '1') return;
      const inlineHandler = btn.getAttribute('onclick');
      const href = btn.tagName === 'A' ? btn.getAttribute('href') : null;

      if (!inlineHandler && !href) return;

      ev.preventDefault();
      ev.stopImmediatePropagation();
      btn.dataset.fxRitualPlaying = '1';
      btn.classList.add('fx-ritual');

      setTimeout(() => {
        btn.classList.remove('fx-ritual');
        btn.dataset.fxRitualPlaying = '';
        if (href) {
          window.location.href = href;
        } else if (inlineHandler) {
          try {
            new Function(inlineHandler).call(btn);
          } catch (e) {
            console.warn('[fx pdp] inline handler failed', e);
          }
        }
      }, RITUAL_MS);
    }, true);
  });
}

function boot() {
  flagKineticHeading();
  wrapCtaRitual();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

export default boot;
