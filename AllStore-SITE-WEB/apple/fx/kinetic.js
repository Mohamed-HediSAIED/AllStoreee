/**
 * kinetic — DOM-level kinetic typography and scroll reveals.
 * No WebGL. Pairs with ambient-mesh to create the Obsidian Liquid feel.
 *
 * Targets:
 *   - [data-fx-kinetic]        → split text word-by-word, animate in on mount
 *   - .fx-reveal                → fades in when entering viewport
 *   - [data-fx-marquee]         → populates an auto-scrolling marquee track
 */

function splitWords(el) {
  if (el.dataset.fxSplit === 'done') return;
  // Preserve <br> as line breaks, tokenize rest into words.
  const html = el.innerHTML.replace(/<br\s*\/?>/gi, '\n');
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const raw = tmp.textContent;

  const frag = document.createDocumentFragment();
  const tokens = raw.split(/(\s+|\n)/).filter((t) => t !== '');
  let i = 0;

  tokens.forEach((tok) => {
    if (tok === '\n') {
      frag.appendChild(document.createElement('br'));
    } else if (/^\s+$/.test(tok)) {
      const space = document.createElement('span');
      space.className = 'fx-space';
      frag.appendChild(space);
    } else {
      const span = document.createElement('span');
      span.className = 'fx-word';
      span.style.transitionDelay = `${i * 80}ms`;
      span.textContent = tok;
      frag.appendChild(span);
      i++;
    }
  });

  el.innerHTML = '';
  el.appendChild(frag);
  el.classList.add('fx-kinetic');
  el.dataset.fxSplit = 'done';
}

function initKineticHeadings() {
  document.querySelectorAll('[data-fx-kinetic]').forEach((el) => {
    splitWords(el);
    setTimeout(() => el.classList.add('fx-in'), 40);
  });
}

function initRevealObserver() {
  const nodes = document.querySelectorAll('.fx-reveal');
  if (!nodes.length || !('IntersectionObserver' in window)) {
    nodes.forEach((n) => n.classList.add('fx-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('fx-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  nodes.forEach((n) => io.observe(n));
}

function initMarquee() {
  document.querySelectorAll('[data-fx-marquee]').forEach((el) => {
    if (el.dataset.fxMarqueeInit === 'done') return;
    const words = (el.getAttribute('data-fx-marquee') || '').split('·').map((s) => s.trim()).filter(Boolean);
    if (!words.length) return;

    const track = document.createElement('div');
    track.className = 'fx-marquee-track';

    const buildRun = () => {
      const frag = document.createDocumentFragment();
      words.forEach((w, i) => {
        const span = document.createElement('span');
        span.className = 'fx-marquee-item';
        span.textContent = w;
        frag.appendChild(span);
        const dot = document.createElement('span');
        dot.className = 'fx-marquee-sep';
        frag.appendChild(dot);
      });
      return frag;
    };

    track.appendChild(buildRun());
    track.appendChild(buildRun());
    el.classList.add('fx-marquee');
    el.innerHTML = '';
    el.appendChild(track);
    el.dataset.fxMarqueeInit = 'done';
  });
}

function initBackToTop() {
  if (document.getElementById('fx-back-to-top')) return;

  const btn = document.createElement('button');
  btn.id = 'fx-back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Retour en haut de la page');
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(btn);

  const SHOW_AT = 500;
  let visible = false;

  const update = () => {
    const show = window.scrollY > SHOW_AT;
    if (show === visible) return;
    visible = show;
    btn.classList.toggle('fx-btt-visible', show);
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function boot() {
  initKineticHeadings();
  initRevealObserver();
  initMarquee();
  initBackToTop();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

export { initKineticHeadings, initRevealObserver, initMarquee, initBackToTop };
