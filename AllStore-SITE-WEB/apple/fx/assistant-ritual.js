/**
 * assistant-ritual — ceremonial beat when the user submits their order.
 * Wraps window.submitOrder to play a 600ms iridescent pulse + scale on the
 * assistant card before proceeding to step 8 (confirmation + WhatsApp link).
 *
 * Preserves the 7-step order flow and WhatsApp redirect logic.
 * Never reads/writes products-data.js constants or order state.
 */

const RITUAL_MS = 600;

function playRitual() {
  const targets = [
    document.querySelector('.assistant-card'),
    document.querySelector('.step-panel.visible'),
  ].filter(Boolean);

  targets.forEach((el) => {
    el.classList.add('fx-ritual');
    setTimeout(() => el.classList.remove('fx-ritual'), RITUAL_MS + 40);
  });
}

function boot() {
  const original = window.submitOrder;
  if (typeof original !== 'function') return;
  if (original.__fxRitualWrapped) return;

  const wrapped = function () {
    const args = arguments;
    try { playRitual(); } catch (_) {}
    setTimeout(() => {
      try { original.apply(this, args); } catch (e) { console.warn('[fx ritual] submitOrder failed', e); }
    }, RITUAL_MS);
  };
  wrapped.__fxRitualWrapped = true;
  window.submitOrder = wrapped;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

export default boot;
