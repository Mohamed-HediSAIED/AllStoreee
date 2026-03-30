(function () {
  if (sessionStorage.getItem('introSeen')) return;

  /* ── Styles ── */
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;1,200&family=Poppins:wght@300;400&display=swap');

    #lx-intro {
      position:fixed; inset:0; z-index:999999;
      background:#06050a;
      display:flex; align-items:center; justify-content:center;
      overflow:hidden;
    }

    #lx-canvas { position:absolute; inset:0; width:100%; height:100%; z-index:1; }

    #lx-vig {
      position:absolute; inset:0; z-index:2; pointer-events:none;
      background:radial-gradient(ellipse 75% 75% at 50% 50%, transparent 20%, rgba(0,0,0,.9) 100%);
      animation:lxBreathe 5s ease-in-out infinite;
    }
    @keyframes lxBreathe {
      0%,100% { opacity:.9; }
      50%      { opacity:.75; }
    }

    /* Horizontal accent lines */
    #lx-lt, #lx-lb {
      position:absolute; left:0; right:0; height:1px; z-index:5;
      background:linear-gradient(90deg,
        transparent 0%,
        rgba(233,194,67,.3) 8%,
        rgba(233,194,67,.85) 50%,
        rgba(233,194,67,.3) 92%,
        transparent 100%);
      transform:scaleX(0); transform-origin:center;
      transition:transform 1.1s cubic-bezier(.16,1,.3,1);
    }
    #lx-lt { top:calc(50% - 215px); }
    #lx-lb { top:calc(50% + 215px); }
    #lx-lt.on, #lx-lb.on { transform:scaleX(1); }

    /* Center block */
    #lx-ui {
      position:relative; z-index:6;
      text-align:center;
      display:flex; flex-direction:column; align-items:center;
    }


    /* Wordmark */
    #lx-word {
      font-family:'Cormorant Garamond',serif; font-weight:200;
      font-size:clamp(50px,9.5vw,116px);
      color:#ffffff; letter-spacing:.3em; padding-right:.3em;
      line-height:1; white-space:nowrap;
    }
    .lx-c {
      display:inline-block;
      opacity:0; transform:translateY(18px);
      transition:opacity .6s ease, transform .75s cubic-bezier(.16,1,.3,1);
    }
    .lx-c.on { opacity:1; transform:translateY(0); }

    /* Divider */
    #lx-div {
      width:0; height:1px;
      background:linear-gradient(90deg, transparent, rgba(233,194,67,.8), transparent);
      margin:22px auto;
      transition:width 1s cubic-bezier(.16,1,.3,1);
    }
    #lx-div.on { width:320px; }

    /* Tagline */
    #lx-tag {
      font-family:'Poppins',sans-serif; font-size:9px; font-weight:400;
      letter-spacing:.55em; padding-right:.55em;
      color:rgba(233,194,67,.75); text-transform:uppercase;
      opacity:0; transform:translateY(8px);
      transition:opacity .75s ease, transform .75s ease;
    }
    #lx-tag.on { opacity:1; transform:translateY(0); }

    /* Cities */
    #lx-cities {
      margin-top:13px;
      font-family:'Poppins',sans-serif; font-size:8px; font-weight:300;
      letter-spacing:.4em; padding-right:.4em;
      color:rgba(255,255,255,.17); text-transform:uppercase;
      opacity:0; transform:translateY(5px);
      transition:opacity .75s ease .15s, transform .75s ease .15s;
    }
    #lx-cities.on { opacity:1; transform:translateY(0); }

    /* Enter button */
    #lx-enter {
      position:fixed; bottom:46px; left:50%; transform:translateX(-50%);
      font-family:'Poppins',sans-serif; font-size:10px; font-weight:300;
      letter-spacing:.5em; padding-right:.5em;
      color:rgba(255,255,255,.28); text-transform:uppercase;
      z-index:20; cursor:pointer;
      opacity:0; transition:opacity .9s ease, color .35s;
      display:flex; flex-direction:column; align-items:center; gap:9px;
    }
    #lx-enter.on { opacity:1; }
    #lx-enter:hover { color:rgba(233,194,67,.9); }
    #lx-eline {
      width:0; height:1px; background:rgba(233,194,67,.55);
      transition:width .8s cubic-bezier(.16,1,.3,1) .15s;
    }
    #lx-enter.on #lx-eline { width:130px; }

    /* Exit — barres qui se referment */
    .lx-mask {
      position:absolute; left:0; right:0; height:50%; background:#06050a; z-index:7;
      transform:scaleY(0);
      transition:transform .78s cubic-bezier(.76,0,.24,1);
    }
    .lx-mask.top    { top:0;    transform-origin:top center; }
    .lx-mask.bottom { bottom:0; transform-origin:bottom center; }
    .lx-mask.close  { transform:scaleY(1); }
  `;
  document.head.appendChild(style);

  /* ── DOM ── */
  const intro = document.createElement('div');
  intro.id = 'lx-intro';
  intro.innerHTML = `
    <canvas id="lx-canvas"></canvas>
    <div id="lx-vig"></div>
    <div id="lx-lt"></div>
    <div id="lx-lb"></div>
    <div id="lx-ui">
      <div id="lx-word"></div>
      <div id="lx-div"></div>
      <div id="lx-tag">Sourcing d'Exception &nbsp;·&nbsp; 24 / 7</div>
      <div id="lx-cities">Paris &nbsp;·&nbsp; Nice</div>
    </div>
    <div id="lx-enter">Entrer dans l'univers<span id="lx-eline"></span></div>
  `;
  document.body.appendChild(intro);
  document.body.style.overflow = 'hidden';


  /* Build wordmark letter spans */
  const wordEl = document.getElementById('lx-word');
  'ALLSTORE'.split('').forEach(c => {
    const s = document.createElement('span');
    s.className = 'lx-c'; s.textContent = c;
    wordEl.appendChild(s);
  });

  /* ── Three.js particles ── */
  const three = document.createElement('script');
  three.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  three.onload = buildScene;
  document.head.appendChild(three);

  function buildScene() {
    const canvas = document.getElementById('lx-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const cam   = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, .1, 400);
    cam.position.set(0, 0, 80);

    /* Gold dust particles */
    const N = 3000;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r  = 20 + Math.pow(Math.random(), .45) * 78;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      pos[i*3]   = r * Math.sin(ph) * Math.cos(th);
      pos[i*3+1] = r * Math.sin(ph) * Math.sin(th);
      pos[i*3+2] = r * Math.cos(ph) - 8;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xe9c243, size: .11, transparent: true, opacity: 0,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    /* Three orbiting rings */
    const mkRing = (r, op, rx, ry, spd) => {
      const m = new THREE.MeshBasicMaterial({
        color: 0xe9c243, transparent: true, opacity: 0, blending: THREE.AdditiveBlending
      });
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(r, .016, 3, 200), m);
      mesh.rotation.x = rx; mesh.rotation.y = ry;
      scene.add(mesh);
      return { mesh, m, op, spd };
    };
    const rings = [
      mkRing(26, .18,  .5,  0,    .0018),
      mkRing(36, .09, -.3,  .8,  -.0012),
      mkRing(18, .14,  .2, -.5,   .0026),
    ];

    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = (e.clientX / innerWidth  - .5) * 2;
      my = (e.clientY / innerHeight - .5) * 2;
    });
    window.addEventListener('resize', () => {
      cam.aspect = innerWidth / innerHeight;
      cam.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });

    let alive = true;
    const clock = new THREE.Clock();
    (function tick() {
      if (!alive) return;
      requestAnimationFrame(tick);
      const t    = clock.getElapsedTime();
      const fade = Math.min(t / 1.4, 1);

      mat.opacity = fade * .38;
      rings.forEach(r => {
        r.m.opacity = fade * r.op;
        r.mesh.rotation.z += r.spd;
      });
      rings[1].mesh.rotation.y = .8 + t * .055;

      pts.rotation.y = t * .05  + mx * .022;
      pts.rotation.x = t * .024 + my * .016;

      /* Smooth parallax cam */
      cam.position.x += (mx * 2 - cam.position.x) * .035;
      cam.position.y += (-my * 1.5 - cam.position.y) * .035;
      cam.lookAt(0, 0, 0);

      renderer.render(scene, cam);
    })();

    intro.addEventListener('killScene', () => { alive = false; renderer.dispose(); });
  }

  /* ── Timeline (total visible ≈ 1.9s, auto-exit 2.7s) ── */
  const chars = document.querySelectorAll('.lx-c');

  // t=100 : accent lines
  setTimeout(() => {
    document.getElementById('lx-lt').classList.add('on');
    document.getElementById('lx-lb').classList.add('on');
  }, 100);

  // t=280 : letters stagger (8 × 55ms = 440ms, done at ~720ms)
  setTimeout(() => {
    chars.forEach((c, i) => setTimeout(() => c.classList.add('on'), i * 55));
  }, 280);

  // t=800 : divider
  setTimeout(() => document.getElementById('lx-div').classList.add('on'), 800);

  // t=980 : tagline + cities
  setTimeout(() => {
    document.getElementById('lx-tag').classList.add('on');
    document.getElementById('lx-cities').classList.add('on');
  }, 980);

  // t=1400 : enter button
  setTimeout(() => document.getElementById('lx-enter').classList.add('on'), 1400);

  /* ── Exit — barres dorées qui se referment ── */
  let exited = false;
  function exitIntro() {
    if (exited) return;
    exited = true;
    sessionStorage.setItem('introSeen', '1');
    document.body.style.overflow = '';

    // 1. Masques noirs derrière les barres
    const mT = document.createElement('div'); mT.className = 'lx-mask top';
    const mB = document.createElement('div'); mB.className = 'lx-mask bottom';
    intro.appendChild(mT);
    intro.appendChild(mB);

    // 2. Fade rapide du contenu centre + bouton
    const ui    = document.getElementById('lx-ui');
    const enter = document.getElementById('lx-enter');
    if (ui)    { ui.style.transition = 'opacity .25s ease'; ui.style.opacity = '0'; }
    if (enter) { enter.style.transition = 'opacity .2s ease'; enter.style.opacity = '0'; }

    // 3. Barres dorées + masques convergent vers le centre
    requestAnimationFrame(() => requestAnimationFrame(() => {
      mT.classList.add('close');
      mB.classList.add('close');
      const lt = document.getElementById('lx-lt');
      const lb = document.getElementById('lx-lb');
      if (lt) { lt.style.transition = 'top .78s cubic-bezier(.76,0,.24,1)'; lt.style.top = '50%'; }
      if (lb) { lb.style.transition = 'top .78s cubic-bezier(.76,0,.24,1)'; lb.style.top = '50%'; }
    }));

    // 4. Cleanup — site révélé
    setTimeout(() => {
      intro.dispatchEvent(new Event('killScene'));
      intro.remove();
    }, 900);
  }

  document.getElementById('lx-enter').addEventListener('click', exitIntro);
  // Also allow any key or scroll to exit
  document.addEventListener('keydown', exitIntro, { once: true });
  document.addEventListener('wheel', exitIntro, { once: true, passive: true });
  // Touch support for mobile
  document.addEventListener('touchstart', exitIntro, { once: true, passive: true });
  setTimeout(exitIntro, 3500); // auto-exit 3.5s
})();
