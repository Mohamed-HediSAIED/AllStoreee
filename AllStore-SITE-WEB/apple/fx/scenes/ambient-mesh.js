/**
 * ambient-mesh — iridescent curl-noise gradient behind all pages.
 * Full-viewport plane + fragment shader. Slow organic breathing.
 */

const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */`
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform vec3 uC4;

  // hash + simplex-ish noise (compact, cheap)
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
  }

  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
    vec3 n = h*h*h*h * vec3(dot(a, hash2(i)), dot(b, hash2(i+o)), dot(c, hash2(i+1.0)));
    return dot(n, vec3(70.0));
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 1.6;
    p.x *= uRes.x / uRes.y;

    float t = uTime * 0.06;
    // flow field — offset p by itself through noise for curl-like motion
    vec2 q = vec2(fbm(p + t), fbm(p - t + 3.7));
    vec2 r = vec2(fbm(p + q + vec2(1.7, 9.2) + t * 0.5),
                  fbm(p + q + vec2(8.3, 2.8) - t * 0.5));
    float n = fbm(p + r);

    // 4-color band based on n
    float s = smoothstep(-0.6, 1.0, n);
    vec3 col = mix(uC1, uC2, smoothstep(0.0, 0.4, s));
    col = mix(col, uC3, smoothstep(0.35, 0.7, s));
    col = mix(col, uC4, smoothstep(0.75, 1.0, s));

    // radial vignette to keep edges dark (luxury)
    float d = distance(uv, vec2(0.5));
    float vig = smoothstep(0.85, 0.25, d);
    col *= 0.55 + 0.6 * vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function cssVarToRgb(name, fallback) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  const hex = raw.startsWith('#') ? raw.slice(1) : raw;
  const full = hex.length === 3
    ? hex.split('').map((c) => c + c).join('')
    : hex;
  const int = parseInt(full, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}

export default async function ambientMesh({ THREE, scene, lowPower }) {
  const geom = new THREE.PlaneGeometry(2, 2);
  const mat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uC1: { value: new THREE.Vector3(...cssVarToRgb('--fx-iri-1', '#1fb6ff')) },
      uC2: { value: new THREE.Vector3(...cssVarToRgb('--fx-iri-2', '#6a4cff')) },
      uC3: { value: new THREE.Vector3(...cssVarToRgb('--fx-iri-3', '#ff6a9c')) },
      uC4: { value: new THREE.Vector3(...cssVarToRgb('--fx-iri-4', '#ffb34c')) },
    },
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.frustumCulled = false;
  scene.add(mesh);

  const throttle = lowPower ? 2 : 1;
  let frame = 0;

  return {
    update(t) {
      frame++;
      if (frame % throttle !== 0) return;
      mat.uniforms.uTime.value = t;
    },
    resize(w, h) {
      mat.uniforms.uRes.value.set(w, h);
    },
  };
}
