import * as THREE from 'three';
import { CONFIG } from './config.js';

// ════════════════════════════════════════════════════════════════
//  1. THEME — push CSS variables from config
// ════════════════════════════════════════════════════════════════
(function applyTheme() {
  const r = document.documentElement.style;
  const t = CONFIG.theme;
  r.setProperty('--bg', t.bg);
  r.setProperty('--bg-2', t.bgAlt);
  r.setProperty('--ink', t.ink);
  r.setProperty('--ink-dim', t.inkDim);
  r.setProperty('--gold', t.gold);
  r.setProperty('--gold-bright', t.goldBright);
  r.setProperty('--gold-deep', t.goldDeep);
})();

// ════════════════════════════════════════════════════════════════
//  2. CONTENT — populate DOM from config
// ════════════════════════════════════════════════════════════════
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function brandMarkHTML() {
  const { name, accent } = CONFIG.brand;
  if (!accent) {
    // Highlight the middle char if no accent specified
    const mid = Math.floor(name.length / 2);
    return [...name].map((c, i) => i === mid ? `<span>${c}</span>` : c).join('');
  }
  return [...name].map(c => c === accent ? `<span>${c}</span>` : c).join('');
}

function italicize(text, word) {
  if (!word || !text.includes(word)) return text;
  return text.replace(word, `<em>${word}</em>`);
}

function splitWords(text) {
  return text.split(' ').map(w => `<span class="word"><span>${w}&nbsp;</span></span>`).join('');
}

function bind(key, html) {
  $$(`[data-bind="${key}"]`).forEach(el => { el.innerHTML = html; });
}

function populate() {
  // Brand
  bind('brand-mark', brandMarkHTML());
  bind('brand-tagline', `· ${CONFIG.brand.tagline}`);

  // Hero
  bind('hero-eyebrow', CONFIG.hero.eyebrow);
  const titleHTML = CONFIG.hero.title
    .map(line => italicize(line, CONFIG.hero.italicWord))
    .join('<br/>');
  // Apply word-split to whole title for staggered reveal
  const wordSplit = titleHTML
    .split('<br/>')
    .map(line => line.split(' ').map(w => `<span class="word"><span>${w}&nbsp;</span></span>`).join(''))
    .join('<br/>');
  bind('hero-title', wordSplit);
  bind('hero-lede', CONFIG.hero.lede);
  bind('hero-cta-primary', CONFIG.hero.ctaPrimary);
  bind('hero-cta-secondary', CONFIG.hero.ctaSecondary);
  bind('hero-badges', CONFIG.hero.badges.map(b => `<span>${b}</span>`).join(''));

  // Story
  bind('story-eyebrow', CONFIG.story.eyebrow);
  bind('story-title', italicize(CONFIG.story.title.replace(' ', '<br/>'), CONFIG.story.italicWord));
  bind('story-body', CONFIG.story.body.map(p => `<p class="body">${p}</p>`).join(''));
  bind('story-stats', CONFIG.story.stats
    .map(s => `<li><strong>${s.value}</strong><span>${s.label}</span></li>`).join(''));

  // Menu
  bind('menu-eyebrow', CONFIG.menu.eyebrow);
  bind('menu-title', italicize(CONFIG.menu.title, CONFIG.menu.italicWord));
  bind('menu-grid', CONFIG.menu.dishes.map(d => `
    <article class="dish reveal">
      <span class="course">${d.course}</span>
      <h3>${d.name}</h3>
      <p>${d.desc}</p>
      <span class="price">${d.price}</span>
    </article>
  `).join(''));
  bind('menu-footer-summary', CONFIG.menu.footer.summary);
  bind('menu-footer-cta', CONFIG.menu.footer.cta);

  // Chef
  bind('chef-eyebrow', CONFIG.chef.eyebrow);
  bind('chef-title', italicize(CONFIG.chef.title, CONFIG.chef.italicWord));
  bind('chef-body', CONFIG.chef.body.map(p => `<p class="body">${p}</p>`).join(''));
  bind('chef-name', CONFIG.chef.name);
  bind('chef-quote', `"${CONFIG.chef.quote}"`);

  // Visit
  bind('visit-eyebrow', CONFIG.visit.eyebrow);
  bind('visit-title', italicize(CONFIG.visit.title.replace('. ', '.<br/>'), CONFIG.visit.italicWord));
  bind('visit-grid', CONFIG.visit.cards.map(c => `
    <div class="visit-card">
      <h4>${c.title}</h4>
      <p>${c.lines.join('<br/>')}</p>
    </div>
  `).join(''));

  // Reserve
  bind('reserve-eyebrow', CONFIG.reserve.eyebrow);
  bind('reserve-title', italicize(CONFIG.reserve.title.replace('. ', '.<br/>'), CONFIG.reserve.italicWord));
  bind('reserve-submit', CONFIG.reserve.submit);
  bind('reserve-confirm', CONFIG.reserve.confirm);
  bind('reserve-seatings', CONFIG.reserve.seatings.map(s => `<option>${s}</option>`).join(''));

  // Footer
  bind('footer-copyright', CONFIG.footer.copyright);
  bind('footer-motto', CONFIG.footer.motto);

  // Page title from brand
  document.title = `${CONFIG.brand.name} — Luxury Dining, ${CONFIG.brand.tagline}`;
}
populate();

// ════════════════════════════════════════════════════════════════
//  3. PRELOADER
// ════════════════════════════════════════════════════════════════
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('done');
    // Trigger hero title reveal after preloader
    setTimeout(() => $('.split')?.classList.add('in'), 300);
  }, 900);
});

// ════════════════════════════════════════════════════════════════
//  4. NAV + SCROLL PROGRESS
// ════════════════════════════════════════════════════════════════
const nav = $('.nav');
const progressBar = $('.scroll-progress span');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = Math.min(100, (window.scrollY / max) * 100);
  progressBar.style.width = pct + '%';
}, { passive: true });

// ════════════════════════════════════════════════════════════════
//  5. REVEAL ON SCROLL (also for .dish, .visit-card)
// ════════════════════════════════════════════════════════════════
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal, .dish, .visit-card').forEach((el) => io.observe(el));

// ════════════════════════════════════════════════════════════════
//  6. CUSTOM CURSOR + MAGNETIC BUTTONS
// ════════════════════════════════════════════════════════════════
if (CONFIG.motion.cursorEnabled && window.matchMedia('(hover:hover)').matches) {
  const dot = $('.cursor-dot');
  const ring = $('.cursor-ring');
  const pos = { x: window.innerWidth/2, y: window.innerHeight/2, rx: 0, ry: 0 };

  window.addEventListener('mousemove', e => {
    pos.x = e.clientX; pos.y = e.clientY;
    dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%)`;
  });

  function loop() {
    pos.rx += (pos.x - pos.rx) * 0.18;
    pos.ry += (pos.y - pos.ry) * 0.18;
    ring.style.transform = `translate(${pos.rx}px, ${pos.ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  $$('a, button, .dish, .visit-card, input, select').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
  });

  // Magnetic buttons
  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // Tilt on portrait/frame
  $$('.tilt').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - .5;
      const cy = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(1000px) rotateX(${-cy * 6}deg) rotateY(${cx * 6}deg)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  // Dish radial highlight
  $$('.dish').forEach(d => {
    d.addEventListener('mousemove', e => {
      const r = d.getBoundingClientRect();
      d.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      d.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });
}

// ════════════════════════════════════════════════════════════════
//  7. 3D SCENE
// ════════════════════════════════════════════════════════════════
const canvas = $('#scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(CONFIG.theme.sceneFog, 0.065);

const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.4, 7.5);
camera.lookAt(0, 0.4, 0);

// ── Environment (procedural for reflections) ───────────────────
const pmrem = new THREE.PMREMGenerator(renderer);
const envScene = new THREE.Scene();
const envLight = new THREE.PointLight(0xf1d28a, 10, 10);
envLight.position.set(2, 3, 2);
envScene.add(envLight);
const envLight2 = new THREE.PointLight(0xd4af6a, 8, 10);
envLight2.position.set(-3, -1, -2);
envScene.add(envLight2);
envScene.background = new THREE.Color(0x1a1410);
const envMap = pmrem.fromScene(envScene, 0.04).texture;
scene.environment = envMap;

// ── Lights ─────────────────────────────────────────────────────
scene.add(new THREE.AmbientLight(0x3a2a1a, 0.5));

const keyLight = new THREE.SpotLight(0xfff0c8, 6, 20, Math.PI / 5, 0.45, 1.2);
keyLight.position.set(2.5, 6.5, 3.5);
scene.add(keyLight);

const goldFill = new THREE.PointLight(0xd4af6a, 2.6, 12, 1.4);
goldFill.position.set(-3, 1.5, 2);
scene.add(goldFill);

const rim = new THREE.PointLight(0xf1d28a, 2, 10, 1.6);
rim.position.set(0, 0.8, -3);
scene.add(rim);

scene.add(new THREE.HemisphereLight(0x2a1d10, 0x000000, 0.4));

// ── Materials ──────────────────────────────────────────────────
const goldMat = new THREE.MeshStandardMaterial({
  color: CONFIG.theme.plateGold, metalness: 1.0, roughness: 0.18,
  emissive: 0x2a1a08, emissiveIntensity: 0.4, envMapIntensity: 1.5,
});

const goldBrightMat = new THREE.MeshStandardMaterial({
  color: 0xf1d28a, metalness: 1.0, roughness: 0.1,
  emissive: 0x3a2810, emissiveIntensity: 0.6, envMapIntensity: 1.8,
});

const darkMarbleMat = new THREE.MeshStandardMaterial({
  color: 0x1a1410, metalness: 0.5, roughness: 0.25, envMapIntensity: 1.2,
});

const glassMat = new THREE.MeshPhysicalMaterial({
  color: CONFIG.theme.domeTint, metalness: 0, roughness: 0.04,
  transmission: 0.92, thickness: 0.5, ior: 1.45,
  transparent: true, opacity: 0.55, side: THREE.DoubleSide,
  envMapIntensity: 1.6, clearcoat: 1, clearcoatRoughness: 0.04,
});

// ── Piece group ────────────────────────────────────────────────
const piece = new THREE.Group();
scene.add(piece);

// Marble base
const base = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.4, 0.18, 96), darkMarbleMat);
base.position.y = -0.6;
piece.add(base);

// Gold trim ring
const trimRing = new THREE.Mesh(new THREE.TorusGeometry(2.18, 0.025, 24, 128), goldBrightMat);
trimRing.rotation.x = Math.PI / 2; trimRing.position.y = -0.51;
piece.add(trimRing);

// Inner etched ring
const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.012, 18, 128), goldMat);
innerRing.rotation.x = Math.PI / 2; innerRing.position.y = -0.5;
piece.add(innerRing);

// Plate
const plate = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.15, 0.06, 96), goldMat);
plate.position.y = -0.45;
piece.add(plate);

// Plate rim
const plateRim = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.04, 18, 128), goldBrightMat);
plateRim.rotation.x = Math.PI / 2; plateRim.position.y = -0.42;
piece.add(plateRim);

// Plate well
const plateWell = new THREE.Mesh(
  new THREE.CylinderGeometry(1.05, 1.05, 0.02, 96),
  new THREE.MeshStandardMaterial({ color: 0x0d0a08, metalness: 0.6, roughness: 0.3 })
);
plateWell.position.y = -0.41;
piece.add(plateWell);

// Dish composition
const dishCenter = new THREE.Group();
dishCenter.position.y = -0.32;
piece.add(dishCenter);

const saffronSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.18, 32, 32),
  new THREE.MeshStandardMaterial({
    color: CONFIG.theme.saffron, metalness: 0.2, roughness: 0.35,
    emissive: 0x8a3a04, emissiveIntensity: 0.4,
  })
);
dishCenter.add(saffronSphere);

// Gold leaf shards
for (let i = 0; i < 9; i++) {
  const shard = new THREE.Mesh(
    new THREE.PlaneGeometry(0.12 + Math.random() * 0.08, 0.06 + Math.random() * 0.04),
    new THREE.MeshStandardMaterial({
      color: 0xf1d28a, metalness: 1, roughness: 0.15, side: THREE.DoubleSide,
      emissive: 0x3a2810, emissiveIntensity: 0.5,
    })
  );
  const a = (i / 9) * Math.PI * 2;
  const r = 0.32 + Math.random() * 0.18;
  shard.position.set(Math.cos(a) * r, 0.05 + Math.random() * 0.22, Math.sin(a) * r);
  shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
  dishCenter.add(shard);
}

// Pearl droplets
for (let i = 0; i < 16; i++) {
  const pearl = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0xf6e6c0, metalness: 0.8, roughness: 0.2,
      emissive: 0x1a1408, emissiveIntensity: 0.4,
    })
  );
  const a = Math.random() * Math.PI * 2;
  const r = 0.18 + Math.random() * 0.4;
  pearl.position.set(Math.cos(a) * r, -0.02 + Math.random() * 0.04, Math.sin(a) * r);
  dishCenter.add(pearl);
}

// ── Cloche ─────────────────────────────────────────────────────
const cloche = new THREE.Group();
cloche.position.y = -0.35;
piece.add(cloche);

const dome = new THREE.Mesh(
  new THREE.SphereGeometry(1.0, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2),
  glassMat
);
cloche.add(dome);

const domeRim = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.025, 18, 128), goldBrightMat);
domeRim.rotation.x = Math.PI / 2;
cloche.add(domeRim);

const finialBase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.06, 32), goldMat);
finialBase.position.y = 1.0;
cloche.add(finialBase);

const finialStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.08, 16), goldMat);
finialStem.position.y = 1.06;
cloche.add(finialStem);

const finialBall = new THREE.Mesh(new THREE.SphereGeometry(0.1, 32, 32), goldBrightMat);
finialBall.position.y = 1.18;
cloche.add(finialBall);

const finialTop = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.08, 24), goldBrightMat);
finialTop.position.y = 1.28;
cloche.add(finialTop);

const clocheBaseY = cloche.position.y;

// ── Orbiting gold rings (around the cloche, decorative) ────────
const orbitRings = [];
for (let i = 0; i < 3; i++) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.5 + i * 0.25, 0.005, 12, 128),
    new THREE.MeshStandardMaterial({
      color: 0xf1d28a, metalness: 1, roughness: 0.15,
      transparent: true, opacity: 0.35 - i * 0.08,
      emissive: 0xd4af6a, emissiveIntensity: 0.5,
    })
  );
  ring.rotation.x = Math.PI / 2 + (i - 1) * 0.1;
  ring.rotation.z = i * 0.4;
  piece.add(ring);
  orbitRings.push({ mesh: ring, speed: 0.15 + i * 0.08, axis: i });
}

// ── Dune backdrop ──────────────────────────────────────────────
const dune = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 10, 100, 10),
  new THREE.MeshStandardMaterial({ color: 0x1a0e08, metalness: 0.2, roughness: 0.9, side: THREE.DoubleSide })
);
{
  const pos = dune.geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i);
    const wave = Math.sin(x * 0.4) * 0.6 + Math.sin(x * 0.15 + 1.2) * 1.4;
    pos.setZ(i, wave * (1 - Math.abs(y) / 5));
  }
  pos.needsUpdate = true;
  dune.geometry.computeVertexNormals();
}
dune.position.set(0, -1.7, -10);
dune.rotation.x = -0.18;
scene.add(dune);

// ── Gold particles ─────────────────────────────────────────────
const particleCount = CONFIG.motion.particles;
const particleGeo = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const seeds = new Float32Array(particleCount);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3]     = (Math.random() - 0.5) * 16;
  positions[i * 3 + 1] = Math.random() * 7 - 1.5;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 9 - 1;
  seeds[i] = Math.random() * Math.PI * 2;
}
particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMat = new THREE.PointsMaterial({
  color: 0xf1d28a, size: 0.038, sizeAttenuation: true,
  transparent: true, opacity: 0.9,
  blending: THREE.AdditiveBlending, depthWrite: false,
});
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// ── Halo ───────────────────────────────────────────────────────
const haloMat = new THREE.MeshBasicMaterial({
  color: 0xd4af6a, transparent: true, opacity: 0.18,
  blending: THREE.AdditiveBlending, depthWrite: false,
});
const halo = new THREE.Mesh(new THREE.SphereGeometry(3.2, 32, 32), haloMat);
halo.position.set(0, 0.6, -3);
scene.add(halo);

// ── Reflective floor disc (subtle gloss on marble below) ───────
const floor = new THREE.Mesh(
  new THREE.CircleGeometry(6, 64),
  new THREE.MeshStandardMaterial({
    color: 0x0a0709, metalness: 0.95, roughness: 0.35,
    envMapIntensity: 0.8,
  })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.71;
scene.add(floor);

// ── Mouse parallax ─────────────────────────────────────────────
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
window.addEventListener('mousemove', (e) => {
  mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ── Resize ─────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ── Camera intro animation (zoom in from preloader) ────────────
let introT = 0;
const introDuration = 2.4;
const introStartZ = 11;
const introEndZ = 6.2;
camera.position.z = introStartZ;

// ── Scroll-linked camera dolly ─────────────────────────────────
let scrollFactor = 0;
window.addEventListener('scroll', () => {
  const heroH = window.innerHeight;
  scrollFactor = Math.min(1, window.scrollY / heroH);
}, { passive: true });

// ── Animate ────────────────────────────────────────────────────
const clock = new THREE.Clock();
function animate() {
  const dt = clock.getDelta();
  const t = clock.getElapsedTime();

  // Mouse smoothing
  mouse.x += (mouse.tx - mouse.x) * 0.04;
  mouse.y += (mouse.ty - mouse.y) * 0.04;

  // Intro tween
  if (introT < introDuration) {
    introT += dt;
    const k = Math.min(1, introT / introDuration);
    const eased = 1 - Math.pow(1 - k, 3);
    camera.position.z = introStartZ + (introEndZ - introStartZ) * eased;
  }

  // Parallax + scroll dolly
  const baseZ = camera.position.z;
  camera.position.x = mouse.x * 0.5;
  camera.position.y = 1.4 + mouse.y * -0.25 + scrollFactor * 0.6;
  camera.position.z = baseZ + scrollFactor * 1.2;
  camera.lookAt(0, 0.2 - scrollFactor * 0.4, 0);

  // Piece rotation
  piece.rotation.y = t * CONFIG.motion.rotateSpeed;

  // Cloche reveal
  const period = CONFIG.motion.cloche.period;
  const lift = (Math.sin((t / period) * Math.PI * 2) + 1) * 0.5;
  cloche.position.y = clocheBaseY + lift * CONFIG.motion.cloche.lift;
  glassMat.opacity = 0.5 + (1 - lift) * 0.18;

  // Dish slow rotation
  dishCenter.rotation.y = -t * 0.4;
  saffronSphere.position.y = Math.sin(t * 1.5) * 0.025;

  // Orbit rings counter-rotate
  orbitRings.forEach((r, i) => {
    r.mesh.rotation.z += dt * r.speed * (i % 2 === 0 ? 1 : -1);
    r.mesh.rotation.x = Math.PI / 2 + Math.sin(t * 0.4 + i) * 0.15;
  });

  // Particle drift
  const pos = particles.geometry.attributes.position;
  for (let i = 0; i < particleCount; i++) {
    const idx = i * 3;
    pos.array[idx + 1] += 0.005 + Math.sin(t + seeds[i]) * 0.002;
    pos.array[idx] += Math.sin(t * 0.5 + seeds[i]) * 0.002;
    if (pos.array[idx + 1] > 5.5) pos.array[idx + 1] = -1.5;
  }
  pos.needsUpdate = true;

  // Halo pulse
  halo.scale.setScalar(1 + Math.sin(t * 0.8) * 0.06);
  haloMat.opacity = 0.16 + Math.sin(t * 0.8) * 0.05;

  // Hide canvas when scrolled past hero (perf)
  if (scrollFactor < 1) renderer.render(scene, camera);

  requestAnimationFrame(animate);
}
animate();
