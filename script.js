import * as THREE from 'three';
import { CONFIG } from './config.js';

// ════════════════════════════════════════════════════════════════
//  1. APPLY THEME (CSS variables from config)
// ════════════════════════════════════════════════════════════════
(function applyTheme() {
  const r = document.documentElement.style;
  const t = CONFIG.theme;
  r.setProperty('--bg', t.bg);
  r.setProperty('--bg-2', t.bgAlt);
  r.setProperty('--ink', t.ink);
  r.setProperty('--ink-dim', t.inkDim);
  r.setProperty('--green', t.green);
  r.setProperty('--green-dark', t.greenDark);
  r.setProperty('--green-light', t.greenLight);
  r.setProperty('--cream', t.cream);
  r.setProperty('--cream-soft', t.creamSoft);
  r.setProperty('--gold', t.gold);
})();

// ════════════════════════════════════════════════════════════════
//  2. CONTENT BINDING
// ════════════════════════════════════════════════════════════════
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function brandMarkHTML() {
  const { name, accent } = CONFIG.brand;
  if (accent) return [...name].map(c => c === accent ? `<span>${c}</span>` : c).join('');
  const mid = Math.floor(name.length / 2);
  return [...name].map((c, i) => i === mid ? `<span>${c}</span>` : c).join('');
}
const italicize = (text, word) => (!word || !text.includes(word)) ? text : text.replace(word, `<em>${word}</em>`);
const splitWords = (text) => text.split(' ').map(w => `<span class="word"><span>${w}&nbsp;</span></span>`).join('');
const bind = (key, html) => $$(`[data-bind="${key}"]`).forEach(el => { el.innerHTML = html; });

function populate() {
  bind('brand-mark', brandMarkHTML());
  bind('brand-tagline', `· ${CONFIG.brand.tagline}`);

  bind('hero-eyebrow', CONFIG.hero.eyebrow);
  const titleHTML = CONFIG.hero.title.map(line => italicize(line, CONFIG.hero.italicWord)).join('<br/>');
  const wordSplit = titleHTML.split('<br/>').map(line => splitWords(line)).join('<br/>');
  bind('hero-title', wordSplit);
  bind('hero-lede', CONFIG.hero.lede);
  bind('hero-cta-primary', CONFIG.hero.ctaPrimary);
  bind('hero-cta-secondary', CONFIG.hero.ctaSecondary);
  bind('hero-badges', CONFIG.hero.badges.map(b => `<span>${b}</span>`).join(''));

  bind('story-eyebrow', CONFIG.story.eyebrow);
  bind('story-title', italicize(CONFIG.story.title.replace(', ', ',<br/>'), CONFIG.story.italicWord));
  bind('story-body', CONFIG.story.body.map(p => `<p class="body">${p}</p>`).join(''));
  bind('story-stats', CONFIG.story.stats.map(s => `<li><strong>${s.value}</strong><span>${s.label}</span></li>`).join(''));

  bind('menu-eyebrow', CONFIG.menu.eyebrow);
  bind('menu-title', italicize(CONFIG.menu.title, CONFIG.menu.italicWord));

  bind('chef-eyebrow', CONFIG.chef.eyebrow);
  bind('chef-title', italicize(CONFIG.chef.title, CONFIG.chef.italicWord));
  bind('chef-body', CONFIG.chef.body.map(p => `<p class="body">${p}</p>`).join(''));
  bind('chef-name', CONFIG.chef.name);
  bind('chef-quote', `"${CONFIG.chef.quote}"`);

  bind('visit-eyebrow', CONFIG.visit.eyebrow);
  bind('visit-title', italicize(CONFIG.visit.title.replace('. ', '.<br/>'), CONFIG.visit.italicWord));
  bind('visit-grid', CONFIG.visit.cards.map(c => `
    <div class="visit-card">
      <h4>${c.title}</h4>
      <p>${c.lines.join('<br/>')}</p>
    </div>
  `).join(''));

  bind('reserve-eyebrow', CONFIG.reserve.eyebrow);
  bind('reserve-title', italicize(CONFIG.reserve.title.replace(', ', ',<br/>'), CONFIG.reserve.italicWord));
  bind('reserve-submit', CONFIG.reserve.submit);
  bind('reserve-confirm', CONFIG.reserve.confirm);
  bind('reserve-seatings', CONFIG.reserve.seatings.map(s => `<option>${s}</option>`).join(''));

  bind('footer-copyright', CONFIG.footer.copyright);
  bind('footer-motto', CONFIG.footer.motto);

  document.title = `${CONFIG.brand.name} — Luxury Dining, ${CONFIG.brand.tagline}`;
}
populate();

// ════════════════════════════════════════════════════════════════
//  3. MENU — category tabs + filtered dish display
// ════════════════════════════════════════════════════════════════
const cats = CONFIG.menu.categories;
const menuTabs = $('[data-bind="menu-tabs"]');
const menuHero = $('[data-bind="menu-hero"]');
const menuDishes = $('[data-bind="menu-dishes"]');

// Build tabs
menuTabs.innerHTML = cats.map((c, i) =>
  `<button class="menu-tab${i === 0 ? ' active' : ''}" data-cat="${c.id}">${c.name}</button>`
).join('');

// Build hero image slots (one per category, fade between)
const heroLabel = $('.menu-hero-label');
const heroImgsHTML = cats.map((c, i) =>
  `<div class="menu-hero-img${i === 0 ? ' active' : ''}" data-cat="${c.id}" style="background-image:url('${c.img}')"></div>`
).join('');
menuHero.insertAdjacentHTML('afterbegin', heroImgsHTML);

function renderCategory(catId) {
  const cat = cats.find(c => c.id === catId);
  if (!cat) return;

  // tabs
  $$('.menu-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === catId));

  // hero image
  $$('.menu-hero-img').forEach(img => img.classList.toggle('active', img.dataset.cat === catId));

  // label
  $('[data-bind="menu-active-id"]').textContent = `Section · ${String(cats.indexOf(cat) + 1).padStart(2, '0')}`;
  $('[data-bind="menu-active-name"]').textContent = cat.name;

  // dishes
  menuDishes.innerHTML = cat.dishes.map(d => `
    <div class="dish-row">
      <div class="info">
        <h4>${d.name}</h4>
        <p>${d.desc}</p>
      </div>
      <div class="dots"></div>
      <div class="price">${d.price}</div>
    </div>
  `).join('');

  // stagger reveal
  requestAnimationFrame(() => {
    $$('.dish-row').forEach((row, i) => {
      setTimeout(() => row.classList.add('in'), i * 80);
    });
  });
}
renderCategory(cats[0].id);

menuTabs.addEventListener('click', (e) => {
  const btn = e.target.closest('.menu-tab');
  if (!btn) return;
  renderCategory(btn.dataset.cat);
});

// ════════════════════════════════════════════════════════════════
//  4. PRELOADER + HERO REVEAL
// ════════════════════════════════════════════════════════════════
window.addEventListener('load', () => {
  setTimeout(() => {
    $('#preloader').classList.add('done');
    setTimeout(() => $('.split')?.classList.add('in'), 300);
  }, 1000);
});

// ════════════════════════════════════════════════════════════════
//  5. NAV + SCROLL PROGRESS + dark-section cursor invert
// ════════════════════════════════════════════════════════════════
const nav = $('.nav');
const progressBar = $('.scroll-progress span');
const darkSections = $$('.section.dark, .hero');

function updateScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = Math.min(100, (window.scrollY / max) * 100) + '%';

  // detect if cursor is over a dark section
  const cy = window.innerHeight / 2;
  let onDark = false;
  for (const sec of darkSections) {
    const r = sec.getBoundingClientRect();
    if (r.top < cy && r.bottom > cy) { onDark = true; break; }
  }
  document.body.classList.toggle('on-dark', onDark);
}
window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

// ════════════════════════════════════════════════════════════════
//  6. REVEAL ON SCROLL
// ════════════════════════════════════════════════════════════════
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal, .visit-card').forEach((el) => io.observe(el));

// ════════════════════════════════════════════════════════════════
//  7. CURSOR + MAGNETIC + TILT
// ════════════════════════════════════════════════════════════════
if (CONFIG.motion.cursorEnabled && window.matchMedia('(hover:hover)').matches) {
  const dot = $('.cursor-dot');
  const ring = $('.cursor-ring');
  const pos = { x: window.innerWidth/2, y: window.innerHeight/2, rx: 0, ry: 0 };

  window.addEventListener('mousemove', e => {
    pos.x = e.clientX; pos.y = e.clientY;
    dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%)`;
  });
  (function loop(){
    pos.rx += (pos.x - pos.rx) * 0.18;
    pos.ry += (pos.y - pos.ry) * 0.18;
    ring.style.transform = `translate(${pos.rx}px, ${pos.ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();

  document.addEventListener('mouseover', e => {
    if (e.target.matches('a, button, .menu-tab, .visit-card, input, select')) {
      dot.classList.add('hover'); ring.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.matches('a, button, .menu-tab, .visit-card, input, select')) {
      dot.classList.remove('hover'); ring.classList.remove('hover');
    }
  });

  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  $$('.tilt').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - .5;
      const cy = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(1000px) rotateX(${-cy * 5}deg) rotateY(${cx * 5}deg)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

// ════════════════════════════════════════════════════════════════
//  8. 3D HERO SCENE — REAL FOOD PHOTOS (4K) ON ROTATING PLATES
// ════════════════════════════════════════════════════════════════
const canvas = $('#scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(CONFIG.theme.sceneFog, 0.045);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0.4, 8);

// ── Procedural environment (for plate reflections) ──────────────
const pmrem = new THREE.PMREMGenerator(renderer);
const envScene = new THREE.Scene();
envScene.background = new THREE.Color(0x0e4d3a);
const envL1 = new THREE.PointLight(0xffffff, 30, 20); envL1.position.set(2, 4, 2); envScene.add(envL1);
const envL2 = new THREE.PointLight(0xc9a86a, 20, 20); envL2.position.set(-3, 2, -2); envScene.add(envL2);
scene.environment = pmrem.fromScene(envScene, 0.04).texture;

// ── Lights ──────────────────────────────────────────────────────
scene.add(new THREE.AmbientLight(0xf7f4ed, 0.6));

const key = new THREE.SpotLight(0xffffff, 8, 30, Math.PI/4, 0.5, 1.5);
key.position.set(3, 7, 4); scene.add(key);

const greenFill = new THREE.PointLight(0x2b6e58, 3, 15, 1.4);
greenFill.position.set(-4, 1, 2); scene.add(greenFill);

const gold = new THREE.PointLight(0xc9a86a, 2.4, 12, 1.6);
gold.position.set(2, -1, 3); scene.add(gold);

scene.add(new THREE.HemisphereLight(0x2b6e58, 0x08321f, 0.5));

// ── Food texture loader ────────────────────────────────────────
const loader = new THREE.TextureLoader();
loader.crossOrigin = 'anonymous';
const foodURLs = CONFIG.heroFoodImages;

function loadTex(url) {
  return new Promise((resolve) => {
    loader.load(
      url,
      (tex) => { tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8; resolve(tex); },
      undefined,
      () => resolve(null), // fallback to null on error
    );
  });
}

// ── Plate factory ───────────────────────────────────────────────
function makePlate(texture, radius = 1) {
  const group = new THREE.Group();

  // Outer rim (white china with subtle gold accent feel)
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(radius, radius * 0.04, 24, 96),
    new THREE.MeshStandardMaterial({
      color: 0xf7f4ed, metalness: 0.15, roughness: 0.25, envMapIntensity: 1.2,
    })
  );
  rim.rotation.x = Math.PI / 2;
  group.add(rim);

  // Plate base (white)
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius * 0.94, 0.05, 96),
    new THREE.MeshStandardMaterial({
      color: 0xf7f4ed, metalness: 0.05, roughness: 0.35, envMapIntensity: 1.0,
    })
  );
  base.position.y = -0.025;
  group.add(base);

  // Food disc (textured) sitting on plate
  if (texture) {
    const foodMat = new THREE.MeshStandardMaterial({
      map: texture, metalness: 0.0, roughness: 0.6, envMapIntensity: 0.6,
    });
    const food = new THREE.Mesh(
      new THREE.CircleGeometry(radius * 0.82, 96),
      foodMat
    );
    food.rotation.x = -Math.PI / 2;
    food.position.y = 0.005;
    group.add(food);
  } else {
    // Fallback green inner
    const inner = new THREE.Mesh(
      new THREE.CircleGeometry(radius * 0.82, 96),
      new THREE.MeshStandardMaterial({ color: 0x0e4d3a, roughness: 0.5 })
    );
    inner.rotation.x = -Math.PI / 2;
    inner.position.y = 0.005;
    group.add(inner);
  }

  return group;
}

// ── Build scene once textures are ready ─────────────────────────
const heroGroup = new THREE.Group();
scene.add(heroGroup);

// Center hero plate (large, swaps texture over time)
const centerPlate = makePlate(null, 1.6);
centerPlate.position.set(0, 0, 0);
heroGroup.add(centerPlate);

// Orbiting smaller plates
const orbitPlates = [];
const ORBIT_COUNT = 5;
const ORBIT_RADIUS = 3.4;
for (let i = 0; i < ORBIT_COUNT; i++) {
  const plate = makePlate(null, 0.65);
  const angle = (i / ORBIT_COUNT) * Math.PI * 2;
  plate.userData.baseAngle = angle;
  plate.userData.speed = 0.15 + Math.random() * 0.08;
  plate.userData.tiltAmp = 0.25 + Math.random() * 0.15;
  plate.userData.tiltPhase = Math.random() * Math.PI * 2;
  orbitPlates.push(plate);
  heroGroup.add(plate);
}

// Load all textures and apply
(async () => {
  const textures = await Promise.all(foodURLs.map(loadTex));

  // Apply to orbit plates
  orbitPlates.forEach((plate, i) => {
    const tex = textures[(i + 1) % textures.length];
    if (tex) {
      const foodMesh = plate.children[2]; // [rim, base, food]
      if (foodMesh && foodMesh.material) {
        foodMesh.material.map = tex;
        foodMesh.material.needsUpdate = true;
      }
    }
  });

  // Apply first texture to center, then rotate textures every few seconds
  let centerIdx = 0;
  function swapCenterTexture() {
    const tex = textures[centerIdx % textures.length];
    if (tex) {
      const foodMesh = centerPlate.children[2];
      if (foodMesh && foodMesh.material) {
        foodMesh.material.map = tex;
        foodMesh.material.needsUpdate = true;
      }
    }
    centerIdx++;
  }
  swapCenterTexture();
  setInterval(swapCenterTexture, 4500);
})();

// ── Floating cream particles (subtle dust) ──────────────────────
const N = CONFIG.motion.particles;
const pGeo = new THREE.BufferGeometry();
const pos = new Float32Array(N * 3);
const seeds = new Float32Array(N);
for (let i = 0; i < N; i++) {
  pos[i*3]   = (Math.random() - 0.5) * 18;
  pos[i*3+1] = Math.random() * 8 - 2;
  pos[i*3+2] = (Math.random() - 0.5) * 10 - 2;
  seeds[i] = Math.random() * Math.PI * 2;
}
pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
  color: 0xf7f4ed, size: 0.025, sizeAttenuation: true,
  transparent: true, opacity: 0.55,
  blending: THREE.AdditiveBlending, depthWrite: false,
}));
scene.add(particles);

// ── Soft halo behind hero plate ─────────────────────────────────
const halo = new THREE.Mesh(
  new THREE.SphereGeometry(3.6, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0x2b6e58, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false })
);
halo.position.set(0, 0.2, -2);
scene.add(halo);

// ── Mouse parallax ──────────────────────────────────────────────
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
window.addEventListener('mousemove', e => {
  mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ── Scroll factor ──────────────────────────────────────────────
let scrollFactor = 0;
window.addEventListener('scroll', () => {
  const heroH = window.innerHeight;
  scrollFactor = Math.min(1, window.scrollY / heroH);
}, { passive: true });

// ── Intro camera tween ─────────────────────────────────────────
let introT = 0;
const introDur = 2.2;
const introStartZ = 12;
const introEndZ = 7.2;
camera.position.z = introStartZ;

// ── Animate ────────────────────────────────────────────────────
const clock = new THREE.Clock();
function animate() {
  const dt = clock.getDelta();
  const t = clock.getElapsedTime();

  mouse.x += (mouse.tx - mouse.x) * 0.04;
  mouse.y += (mouse.ty - mouse.y) * 0.04;

  // Intro tween
  if (introT < introDur) {
    introT += dt;
    const k = Math.min(1, introT / introDur);
    const eased = 1 - Math.pow(1 - k, 3);
    camera.position.z = introStartZ + (introEndZ - introStartZ) * eased;
  }

  // Parallax + scroll dolly
  camera.position.x = mouse.x * 0.5;
  camera.position.y = 0.4 + mouse.y * -0.3 + scrollFactor * 0.8;
  camera.position.z += scrollFactor * 0.6;
  camera.lookAt(0, -scrollFactor * 0.6, 0);

  // Hero group gentle wobble + auto-rotation around vertical
  heroGroup.rotation.y = t * 0.05;

  // Center plate spin
  centerPlate.rotation.y = t * CONFIG.motion.rotateSpeed;
  centerPlate.position.y = Math.sin(t * 0.6) * 0.15;
  centerPlate.rotation.z = Math.sin(t * 0.4) * 0.05;

  // Orbiting plates
  orbitPlates.forEach((plate) => {
    const a = plate.userData.baseAngle + t * plate.userData.speed;
    plate.position.x = Math.cos(a) * ORBIT_RADIUS;
    plate.position.z = Math.sin(a) * ORBIT_RADIUS * 0.6 - 0.5;
    plate.position.y = Math.sin(t * 0.8 + plate.userData.tiltPhase) * plate.userData.tiltAmp - 0.2;
    plate.rotation.y = -t * 0.6;
    plate.rotation.x = Math.sin(t * 0.5 + plate.userData.tiltPhase) * 0.18;
    plate.rotation.z = Math.cos(t * 0.4 + plate.userData.tiltPhase) * 0.12;
  });

  // Particle drift
  const ppos = particles.geometry.attributes.position;
  for (let i = 0; i < N; i++) {
    const idx = i * 3;
    ppos.array[idx + 1] += 0.006 + Math.sin(t + seeds[i]) * 0.002;
    ppos.array[idx]     += Math.sin(t * 0.5 + seeds[i]) * 0.002;
    if (ppos.array[idx + 1] > 6) ppos.array[idx + 1] = -2;
  }
  ppos.needsUpdate = true;

  // Halo pulse
  halo.scale.setScalar(1 + Math.sin(t * 0.7) * 0.07);

  // Only render when hero is visible (perf)
  if (scrollFactor < 1.1) renderer.render(scene, camera);

  requestAnimationFrame(animate);
}
animate();
