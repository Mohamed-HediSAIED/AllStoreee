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

function initWaFab() {
  if (document.getElementById('fx-wa-fab')) return;
  // Hide on assistant.html — user is already in the order flow.
  const path = (window.location.pathname || '').toLowerCase();
  if (path.indexOf('assistant') !== -1) return;

  const msg = encodeURIComponent("Bonjour AllStore, j'ai une question");
  const href = 'https://wa.me/33626587984?text=' + msg;

  const a = document.createElement('a');
  a.id = 'fx-wa-fab';
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.setAttribute('aria-label', 'Nous contacter sur WhatsApp');
  a.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/></svg>';
  document.body.appendChild(a);
}

function boot() {
  initKineticHeadings();
  initRevealObserver();
  initMarquee();
  initBackToTop();
  initWaFab();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

export { initKineticHeadings, initRevealObserver, initMarquee, initBackToTop };
