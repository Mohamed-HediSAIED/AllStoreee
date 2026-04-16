/**
 * scroll-drift — horizontal scroller velocity → skew/scaleX on card images.
 * Applies to .als-hscroll, .als-rare-grid, .als-coll-grid (any scroll snap row).
 * Cheap: one rAF per active container, CSS var drives the transforms.
 */

const SELECTOR = '.als-hscroll, .als-rare-grid, .als-coll-grid';
const MAX_VEL = 1500;        // px/s beyond which we clamp
const DECAY = 0.86;          // per-frame multiplier when idle

function attach(row) {
  if (row.dataset.fxScrollInit === 'done') return;
  row.dataset.fxScrollInit = 'done';
  row.classList.add('fx-scroll-drift');

  let lastX = row.scrollLeft;
  let lastT = performance.now();
  let vel = 0;       // signed px/s
  let smooth = 0;    // smoothed value used for display
  let rafId = null;

  const tick = () => {
    const now = performance.now();
    const dt = Math.max(1, now - lastT);
    lastT = now;

    smooth += (vel - smooth) * 0.25;
    vel *= DECAY;

    const norm = Math.max(-1, Math.min(1, smooth / MAX_VEL));
    row.style.setProperty('--fx-vel', norm.toFixed(3));

    if (Math.abs(smooth) > 1 || Math.abs(vel) > 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      row.style.setProperty('--fx-vel', '0');
      rafId = null;
    }
  };

  row.addEventListener('scroll', () => {
    const now = performance.now();
    const dx = row.scrollLeft - lastX;
    const dt = Math.max(1, now - lastT);
    const instant = (dx / dt) * 1000;
    vel = vel * 0.4 + instant * 0.6;
    lastX = row.scrollLeft;
    lastT = now;
    if (rafId == null) rafId = requestAnimationFrame(tick);
  }, { passive: true });
}

function boot() {
  document.querySelectorAll(SELECTOR).forEach(attach);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

export default boot;
