/* ═══════════════════════════════════════════════════════════════════
   ALLSTORE 24/7 — LUXURY IMMERSIVE ENGINE
   3D transitions · Smooth scroll · Parallax depth · Cinematic reveals
═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════
     1. SMOOTH SCROLL WITH INERTIA (desktop)
  ══════════════════════════════════════════════════════════════ */
  const isMobile = window.matchMedia('(max-width:768px)').matches || 'ontouchstart' in window;

  /* Smooth scroll disabled — use native scroll for reliability */

  /* ══════════════════════════════════════════════════════════════
     2. PAGE TRANSITIONS — DISABLED
  ══════════════════════════════════════════════════════════════ */
  (function () {
    // Remove transition overlay if present
    const transEl = document.getElementById('lux-transition');
    if (transEl) transEl.remove();
    const oldWipe = document.getElementById('wipe');
    if (oldWipe) oldWipe.remove();
  })();

  /* ══════════════════════════════════════════════════════════════
     3. CINEMATIC SCROLL REVEAL WITH 3D DEPTH
  ══════════════════════════════════════════════════════════════ */
  (function () {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach((el) => observer.observe(el));
  })();

  /* ══════════════════════════════════════════════════════════════
     4. HERO CINEMATIC TEXT REVEAL — Letter by letter
  ══════════════════════════════════════════════════════════════ */
  (function () {
    const heroH1 = document.querySelector('.hero h1') || document.querySelector('.ap-hero-title');
    if (!heroH1) return;

    // Split text nodes into spans for animation
    function splitText(el) {
      const nodes = [...el.childNodes];
      nodes.forEach(node => {
        if (node.nodeType === 3 && node.textContent.trim()) {
          const frag = document.createDocumentFragment();
          node.textContent.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'lux-char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${0.6 + i * 0.035}s`;
            frag.appendChild(span);
          });
          node.replaceWith(frag);
        } else if (node.nodeType === 1 && (node.tagName === 'EM' || node.tagName === 'STRONG')) {
          const text = node.textContent;
          node.textContent = '';
          const baseDelay = node.tagName === 'EM' ? 0.9 : 1.4;
          text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'lux-char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${baseDelay + i * 0.03}s`;
            node.appendChild(span);
          });
        }
      });
    }

    splitText(heroH1);
    heroH1.classList.add('lux-text-ready');
  })();

  /* ══════════════════════════════════════════════════════════════
     5. PARALLAX DEPTH — Hero image subtle zoom on scroll
  ══════════════════════════════════════════════════════════════ */
  (function () {
    const heroImg = document.querySelector('.ap-hero-img');
    const heroContent = document.querySelector('.ap-hero-content');
    if (!heroImg || isMobile) return;

    window.addEventListener('scroll', () => {
      const s = window.scrollY;
      const vh = window.innerHeight;
      if (s > vh) return;

      const progress = s / vh;
      heroImg.style.transform = `scale(${1.05 + progress * 0.15})`;
      heroImg.style.opacity = 1 - progress * 0.5;

      if (heroContent) {
        heroContent.style.transform = `translateY(${s * 0.3}px)`;
        heroContent.style.opacity = 1 - progress * 1.2;
      }
    }, { passive: true });
  })();

  /* ══════════════════════════════════════════════════════════════
     6. FLOATING GOLD PARTICLES — Hero ambient effect
  ══════════════════════════════════════════════════════════════ */
  (function () {
    const hero = document.querySelector('.hero') || document.querySelector('.ap-hero-full');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'lux-particles';
    hero.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let w, h;
    function resize() {
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const N = isMobile ? 12 : 20;

    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -Math.random() * 0.25 - 0.05,
        opacity: Math.random() * 0.3 + 0.05,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233, 194, 67, ${alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ══════════════════════════════════════════════════════════════
     7. CURSOR TRAIL — Disabled for minimalist design
  ══════════════════════════════════════════════════════════════ */

  /* ══════════════════════════════════════════════════════════════
     8. 3D PRODUCT CARD LEVITATION
  ══════════════════════════════════════════════════════════════ */
  (function () {
    if (isMobile) return;

    document.querySelectorAll('.pc, .ac, .temoignage-card, .b-card, .ap-card, .ap-temo-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform = `
          perspective(1000px)
          rotateY(${x * 4}deg)
          rotateX(${-y * 4}deg)
          translateZ(8px)
        `;
        card.style.transition = 'transform 0.15s ease-out';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.6s ease';
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  })();

  /* ══════════════════════════════════════════════════════════════
     9. MOBILE SWIPE — Simplified for minimalist design
  ══════════════════════════════════════════════════════════════ */

  /* ══════════════════════════════════════════════════════════════
     10. SCROLL PROGRESS BAR — Gold line at top
  ══════════════════════════════════════════════════════════════ */
  (function () {
    const bar = document.createElement('div');
    bar.id = 'lux-scroll-progress';
    document.body.appendChild(bar);

    function updateBar() {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
      requestAnimationFrame(updateBar);
    }
    requestAnimationFrame(updateBar);
  })();

  /* ══════════════════════════════════════════════════════════════
     10b. INFINITE CAROUSEL — Roller effect for collections
  ══════════════════════════════════════════════════════════════ */
  (function () {
    document.querySelectorAll('.ap-collection').forEach(section => {
      const scroll = section.querySelector('.ap-coll-scroll');
      const track = section.querySelector('.ap-coll-track');
      if (!scroll || !track) return;

      const cards = Array.from(track.querySelectorAll('.ap-card'));
      const origCount = cards.length;
      if (origCount < 2) return;

      // Remove any existing clones (prevent double-init)
      track.querySelectorAll('[aria-hidden="true"]').forEach(c => c.remove());

      // Clone cards: append and prepend full set
      cards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
      cards.slice().reverse().forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.insertBefore(clone, track.firstChild);
      });

      const gap = parseFloat(getComputedStyle(track).gap) || 24;

      function getCardW() {
        const first = track.querySelector('.ap-card');
        return first ? first.offsetWidth + gap : 300;
      }

      function oneSetW() { return origCount * getCardW(); }

      // Check boundaries and jump if needed
      function checkBounds() {
        const setW = oneSetW();
        const sl = scroll.scrollLeft;
        if (sl >= setW * 2 - scroll.offsetWidth) {
          scroll.scrollLeft = sl - setW;
          return true;
        }
        if (sl <= 0) {
          scroll.scrollLeft = sl + setW;
          return true;
        }
        return false;
      }

      // Position to the real (middle) set of cards
      setTimeout(() => {
        scroll.scrollLeft = oneSetW();
      }, 50);

      // Smooth scroll with integrated boundary check (setTimeout-based for reliability)
      let animating = false;
      function smoothScrollBy(delta, dur) {
        if (animating) return;
        animating = true;
        const duration = dur || 400;
        const startPos = scroll.scrollLeft;
        const startT = Date.now();

        function step() {
          const elapsed = Date.now() - startT;
          const t = Math.min(elapsed / duration, 1);
          const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          scroll.scrollLeft = startPos + delta * ease;

          if (t < 1) {
            setTimeout(step, 16);
          } else {
            checkBounds();
            animating = false;
          }
        }
        setTimeout(step, 16);
      }

      // For native touch/scroll: check bounds when scrolling stops
      let scrollTimer = null;
      scroll.addEventListener('scroll', () => {
        if (animating) return;
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          checkBounds();
        }, 80);
      }, { passive: true });

      // Arrow handlers
      const prevBtn = section.querySelector('.ap-coll-prev');
      const nextBtn = section.querySelector('.ap-coll-next');

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          smoothScrollBy(getCardW());
        });
      }
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          smoothScrollBy(-getCardW());
        });
      }

      // Drag to scroll (desktop)
      if (!isMobile) {
        let isDown = false, startX, scrollL, hasMoved = false, velocity = 0, lastX = 0, lastTime = 0;

        scroll.addEventListener('mousedown', e => {
          isDown = true; hasMoved = false;
          scroll.classList.add('is-dragging');
          startX = e.pageX;
          scrollL = scroll.scrollLeft;
          lastX = e.pageX; lastTime = Date.now();
          velocity = 0;
        });

        scroll.addEventListener('mousemove', e => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX;
          const walk = (startX - x) * 1.5;
          scroll.scrollLeft = scrollL + walk;
          const now = Date.now();
          const dt = now - lastTime;
          if (dt > 0) { velocity = (lastX - x) / dt; }
          lastX = x; lastTime = now;
          if (Math.abs(walk) > 30) hasMoved = true;
        });

        const stopDrag = () => {
          if (!isDown) return;
          isDown = false;
          scroll.classList.remove('is-dragging');
          if (Math.abs(velocity) > 0.3) {
            smoothScrollBy(velocity * 300, 600);
          }
        };
        scroll.addEventListener('mouseup', stopDrag);
        scroll.addEventListener('mouseleave', stopDrag);

        scroll.addEventListener('click', e => {
          if (hasMoved) {
            // Only block if not clicking a link
            if (!e.target.closest('a[href]')) {
              e.preventDefault();
              e.stopPropagation();
            } else if (Math.abs(scroll.scrollLeft - scrollL) > 50) {
              // Block link only for real drags (>50px scroll distance)
              e.preventDefault();
              e.stopPropagation();
            }
          }
        }, true);
      }
    });
  })();

  /* ══════════════════════════════════════════════════════════════
     11. SECTION STAGGER ENTRANCE — 3D flip-in for grids
  ══════════════════════════════════════════════════════════════ */
  (function () {
    const grids = document.querySelectorAll('.temoignages-grid, .boutique-grid, .grid-svc, .val-grid, .ap-temo-grid');
    grids.forEach(grid => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const children = entry.target.children;
          Array.from(children).forEach((child, i) => {
            child.style.opacity = '0';
            child.style.transform = 'perspective(800px) rotateX(15deg) translateY(60px)';
            setTimeout(() => {
              child.style.transition = 'all 0.8s cubic-bezier(0.16,1,0.3,1)';
              child.style.opacity = '1';
              child.style.transform = 'perspective(800px) rotateX(0deg) translateY(0)';
            }, i * 120);
          });
        });
      }, { threshold: 0.1 });
      observer.observe(grid);
    });
  })();

  /* ══════════════════════════════════════════════════════════════
     12. MAGNETIC HOVER — Enhanced for luxury buttons
  ══════════════════════════════════════════════════════════════ */
  if (!isMobile) {
    (function () {
      document.querySelectorAll('.btn, .btn-glow, .wa-btn, .btn-primary, .filter-btn, .b-btn-cart').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
          btn.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
          btn.style.transition = 'transform 0.15s ease-out';
        });

        btn.addEventListener('mouseleave', () => {
          btn.style.transform = '';
          btn.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
        });
      });
    })();
  }

  /* ══════════════════════════════════════════════════════════════
     13. EYEBROW LINES — Animated reveal with dash
  ══════════════════════════════════════════════════════════════ */
  (function () {
    document.querySelectorAll('.eyebrow').forEach(ey => {
      ey.classList.add('lux-eyebrow');
    });
  })();

  /* ══════════════════════════════════════════════════════════════
     14. IMAGE REVEAL — Curtain effect on images
  ══════════════════════════════════════════════════════════════ */
  (function () {
    document.querySelectorAll('.ci, .svc-img, .split-card').forEach(imgWrap => {
      imgWrap.classList.add('lux-img-reveal');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('lux-img-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      observer.observe(imgWrap);
    });
  })();

  /* ══════════════════════════════════════════════════════════════
     15. COUNTER ANIMATION — Premium counting with easing
  ══════════════════════════════════════════════════════════════ */
  (function () {
    const counters = document.querySelectorAll('.foot-stat-n[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 2200;
        const start = performance.now();

        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          // Luxury ease-out-expo
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          el.textContent = Math.round(ease * target);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  })();

})();
