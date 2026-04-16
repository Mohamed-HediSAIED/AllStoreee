/**
 * FxStage — single persistent canvas renderer behind all pages.
 *
 * Phase 0: foundation only. Activated via ?fx=1 query param for QA.
 * Later phases enable by default once stable.
 *
 * Business rule: never imports products-data.js. Never touches order flow DOM.
 */

const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

const FxStage = (() => {
  const state = {
    enabled: false,
    renderer: null,
    scene: null,
    camera: null,
    canvas: null,
    fallback: null,
    rafId: null,
    activeScenes: new Map(),
    sceneRegistry: new Map(),
    reducedMotion: false,
    lowPower: false,
    booted: false,
  };

  function detectCapabilities() {
    state.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowCores = (navigator.hardwareConcurrency || 4) < 4;
    const narrow = window.innerWidth < 768;
    state.lowPower = lowCores || narrow;
  }

  function isEnabled() {
    try {
      const flag = new URLSearchParams(window.location.search).get('fx');
      if (flag === '0') return false;
    } catch (_) {}
    return true;
  }

  function injectNodes() {
    if (!document.getElementById('fx-stage-fallback')) {
      const fb = document.createElement('div');
      fb.id = 'fx-stage-fallback';
      document.body.prepend(fb);
      state.fallback = fb;
    } else {
      state.fallback = document.getElementById('fx-stage-fallback');
    }

    if (state.reducedMotion) {
      requestAnimationFrame(() => state.fallback.classList.add('fx-ready'));
      return false;
    }

    if (!document.getElementById('fx-stage')) {
      const c = document.createElement('canvas');
      c.id = 'fx-stage';
      c.setAttribute('aria-hidden', 'true');
      document.body.prepend(c);
      state.canvas = c;
    } else {
      state.canvas = document.getElementById('fx-stage');
    }
    document.body.classList.add('fx-active');
    return true;
  }

  function loadThree() {
    if (window.THREE) return Promise.resolve(window.THREE);
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = THREE_CDN;
      s.async = true;
      s.onload = () => resolve(window.THREE);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function initRenderer() {
    const THREE = window.THREE;
    const dpr = Math.min(window.devicePixelRatio || 1, state.lowPower ? 1 : 1.5);
    state.renderer = new THREE.WebGLRenderer({
      canvas: state.canvas,
      antialias: false,
      alpha: true,
      powerPreference: state.lowPower ? 'low-power' : 'high-performance',
    });
    state.renderer.setPixelRatio(dpr);
    state.renderer.setSize(window.innerWidth, window.innerHeight, false);
    state.renderer.setClearColor(0x000000, 0);

    state.scene = new THREE.Scene();
    state.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    window.addEventListener('resize', onResize, { passive: true });
  }

  function onResize() {
    if (!state.renderer) return;
    state.renderer.setSize(window.innerWidth, window.innerHeight, false);
    state.activeScenes.forEach((inst) => inst.resize && inst.resize(window.innerWidth, window.innerHeight));
  }

  function register(name, factory) {
    state.sceneRegistry.set(name, factory);
  }

  async function mountScenesFromDOM() {
    const main = document.querySelector('[data-fx-scene]') || document.body;
    const names = (main.getAttribute('data-fx-scene') || 'ambient-mesh').split(/\s+/).filter(Boolean);

    for (const name of names) {
      const factory = state.sceneRegistry.get(name);
      if (!factory) {
        try {
          const mod = await import(`./scenes/${name}.js`);
          if (mod && typeof mod.default === 'function') {
            state.sceneRegistry.set(name, mod.default);
          }
        } catch (e) {
          console.warn(`[FxStage] scene "${name}" failed to load`, e);
          continue;
        }
      }
      const f = state.sceneRegistry.get(name);
      if (f) {
        try {
          const inst = await f({ THREE: window.THREE, scene: state.scene, camera: state.camera, lowPower: state.lowPower });
          state.activeScenes.set(name, inst || {});
        } catch (e) {
          console.warn(`[FxStage] scene "${name}" init failed`, e);
        }
      }
    }
  }

  function startLoop() {
    const clock = new window.THREE.Clock();
    const loop = () => {
      state.rafId = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();
      const dt = clock.getDelta();
      state.activeScenes.forEach((inst) => inst.update && inst.update(t, dt));
      state.renderer.render(state.scene, state.camera);
    };
    loop();
  }

  async function boot() {
    if (state.booted) return;
    state.booted = true;

    state.enabled = isEnabled();
    detectCapabilities();

    if (!state.enabled) {
      return;
    }

    const shouldRenderWebGL = injectNodes();
    if (!shouldRenderWebGL) return;

    try {
      await loadThree();
      initRenderer();
      await mountScenesFromDOM();
      state.canvas.classList.add('fx-ready');
      state.fallback && state.fallback.classList.add('fx-ready');
      startLoop();
    } catch (e) {
      console.warn('[FxStage] boot failed, falling back to CSS gradient', e);
      state.fallback && state.fallback.classList.add('fx-ready');
    }
  }

  return { boot, register, state };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FxStage.boot());
} else {
  FxStage.boot();
}

export default FxStage;
window.AllStoreFx = FxStage;
