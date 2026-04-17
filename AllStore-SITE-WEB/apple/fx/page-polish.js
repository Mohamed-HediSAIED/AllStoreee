/**
 * page-polish — subtle enhancements for secondary pages.
 *   - word-by-word reveal on hero titles (.ap-title, .ct-title, .suivi-title,
 *     .faq-title, .livraison-title, .legal-title)
 *   - primary CTA ritual pulse (420ms) before navigation/submit
 *
 * No WebGL. No animated background. Preserves existing DOM, IDs, handlers.
 */

import { initKineticHeadings } from './kinetic.js';

const HEADING_SELECTORS = [
  '.ap-title',
  '.ct-title',
  '.suivi-title',
  '.faq-title',
  '.livraison-title',
  '.legal-title',
].join(',');

const CTA_SELECTORS = [
  '.ap-cta-btn--primary',
  '.ct-submit',
  '.suivi-btn',
  '.faq-cta-btn--primary',
  '.livraison-cta-btn--primary',
].join(',');

const RITUAL_MS = 420;

function flagKineticHeadings() {
  document.querySelectorAll(HEADING_SELECTORS).forEach((el) => {
    if (!el.hasAttribute('data-fx-kinetic')) {
      el.setAttribute('data-fx-kinetic', '');
    }
  });
  initKineticHeadings();
}

function wrapCtaRitual() {
  document.querySelectorAll(CTA_SELECTORS).forEach((btn) => {
    if (btn.dataset.fxRitualWrapped === 'done') return;
    btn.dataset.fxRitualWrapped = 'done';

    btn.addEventListener('click', function (ev) {
      if (btn.dataset.fxRitualPlaying === '1') return;

      const inlineHandler = btn.getAttribute('onclick');
      const href = btn.tagName === 'A' ? btn.getAttribute('href') : null;
      const isSubmit = btn.type === 'submit' || btn.tagName === 'BUTTON';

      // Only intercept when there is a clear destination/handler to replay.
      if (!inlineHandler && !href && !isSubmit) return;

      ev.preventDefault();
      ev.stopImmediatePropagation();
      btn.dataset.fxRitualPlaying = '1';
      btn.classList.add('fx-ritual');

      setTimeout(() => {
        btn.classList.remove('fx-ritual');
        btn.dataset.fxRitualPlaying = '';
        if (href && href !== '#') {
          window.location.href = href;
        } else if (inlineHandler) {
          try {
            new Function(inlineHandler).call(btn);
          } catch (e) {
            console.warn('[fx page] inline handler failed', e);
          }
        } else if (isSubmit) {
          // Let the browser submit the form naturally via a fresh click
          const cloned = btn.cloneNode(true);
          cloned.dataset.fxRitualWrapped = 'done';
          cloned.dataset.fxRitualPlaying = '';
          btn.replaceWith(cloned);
          cloned.click();
        }
      }, RITUAL_MS);
    }, true);
  });
}

function boot() {
  flagKineticHeadings();
  wrapCtaRitual();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

export default boot;
