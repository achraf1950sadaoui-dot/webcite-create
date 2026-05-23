import * as THREE from 'three';

// ---------- Preloader ----------
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('done'), 900);
});

// ---------- Nav scroll ----------
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ---------- 3D Scene ----------
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x08070a, 0.07);

const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.4, 6.2);
camera.lookAt(0, 0.4, 0);

// ----- Lighting -----
const ambient = new THREE.AmbientLight(0x3a2a1a, 0.55);
scene.add(ambient);

const keyLight = new THREE.SpotLight(0xfff0c8, 4.5, 18, Math.PI / 5, 0.45, 1.2);
keyLight.position.set(2.5, 5.5, 3.5);
scene.add(keyLight);

const goldFill = new THREE.PointLight(0xd4af6a, 2.2, 10, 1.4);
goldFill.position.set(-3, 1.5, 2);
scene.add(goldFill);

const rim = new THREE.PointLight(0xf1d28a, 1.6, 8, 1.6);
rim.position.set(0, 0.8, -3);
scene.add(rim);

// Ground reflection bounce
const groundLight = new THREE.HemisphereLight(0x2a1d10, 0x000000, 0.4);
scene.add(groundLight);

// ----- Materials -----
const goldMat = new THREE.MeshStandardMaterial({
  color: 0xd4af6a,
  metalness: 1.0,
  roughness: 0.18,
  emissive: 0x2a1a08,
  emissiveIntensity: 0.4,
});

const goldBrightMat = new THREE.MeshStandardMaterial({
  color: 0xf1d28a,
  metalness: 1.0,
  roughness: 0.12,
  emissive: 0x3a2810,
  emissiveIntensity: 0.6,
});

const darkMarbleMat = new THREE.MeshStandardMaterial({
  color: 0x1a1410,
  metalness: 0.4,
  roughness: 0.25,
});

const glassMat = new THREE.MeshPhysicalMaterial({
  color: 0xf6e6c0,
  metalness: 0,
  roughness: 0.05,
  transmission: 0.92,
  thickness: 0.5,
  ior: 1.45,
  transparent: true,
  opacity: 0.55,
  side: THREE.DoubleSide,
  envMapIntensity: 1.4,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
});

// ----- Group that holds the dining piece (we'll rotate it) -----
const piece = new THREE.Group();
scene.add(piece);

// Marble base (round table-top look)
const base = new THREE.Mesh(
  new THREE.CylinderGeometry(2.2, 2.4, 0.18, 96),
  darkMarbleMat
);
base.position.y = -0.6;
piece.add(base);

// Gold trim ring on base
const trimRing = new THREE.Mesh(
  new THREE.TorusGeometry(2.18, 0.025, 24, 128),
  goldBrightMat
);
trimRing.rotation.x = Math.PI / 2;
trimRing.position.y = -0.51;
piece.add(trimRing);

// Decorative inner ring (etched detail)
const innerRing = new THREE.Mesh(
  new THREE.TorusGeometry(1.75, 0.012, 18, 128),
  goldMat
);
innerRing.rotation.x = Math.PI / 2;
innerRing.position.y = -0.5;
piece.add(innerRing);

// The plate
const plate = new THREE.Mesh(
  new THREE.CylinderGeometry(1.25, 1.15, 0.06, 96),
  goldMat
);
plate.position.y = -0.45;
piece.add(plate);

// Plate rim (raised edge)
const plateRim = new THREE.Mesh(
  new THREE.TorusGeometry(1.22, 0.04, 18, 128),
  goldBrightMat
);
plateRim.rotation.x = Math.PI / 2;
plateRim.position.y = -0.42;
piece.add(plateRim);

// Plate inner well (slight depression)
const plateWell = new THREE.Mesh(
  new THREE.CylinderGeometry(1.05, 1.05, 0.02, 96),
  new THREE.MeshStandardMaterial({ color: 0x0d0a08, metalness: 0.6, roughness: 0.3 })
);
plateWell.position.y = -0.41;
piece.add(plateWell);

// "Food" composition — a small pyramid of garnishes + saffron sphere
const dishCenter = new THREE.Group();
dishCenter.position.y = -0.32;
piece.add(dishCenter);

const saffronSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.18, 32, 32),
  new THREE.MeshStandardMaterial({
    color: 0xff8b1a,
    metalness: 0.2,
    roughness: 0.35,
    emissive: 0x8a3a04,
    emissiveIntensity: 0.4,
  })
);
dishCenter.add(saffronSphere);

// Gold leaf shards around the food
for (let i = 0; i < 7; i++) {
  const shard = new THREE.Mesh(
    new THREE.PlaneGeometry(0.12 + Math.random() * 0.08, 0.06 + Math.random() * 0.04),
    new THREE.MeshStandardMaterial({
      color: 0xf1d28a,
      metalness: 1,
      roughness: 0.15,
      side: THREE.DoubleSide,
      emissive: 0x3a2810,
      emissiveIntensity: 0.5,
    })
  );
  const a = (i / 7) * Math.PI * 2;
  const r = 0.32 + Math.random() * 0.15;
  shard.position.set(Math.cos(a) * r, 0.05 + Math.random() * 0.18, Math.sin(a) * r);
  shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
  dishCenter.add(shard);
}

// Pearl droplets (caviar-like accents)
for (let i = 0; i < 14; i++) {
  const pearl = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0xf6e6c0,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x1a1408,
      emissiveIntensity: 0.4,
    })
  );
  const a = Math.random() * Math.PI * 2;
  const r = 0.18 + Math.random() * 0.35;
  pearl.position.set(Math.cos(a) * r, -0.02 + Math.random() * 0.04, Math.sin(a) * r);
  dishCenter.add(pearl);
}

// ----- The Cloche (glass dome) -----
const cloche = new THREE.Group();
cloche.position.y = -0.35;
piece.add(cloche);

const dome = new THREE.Mesh(
  new THREE.SphereGeometry(1.0, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2),
  glassMat
);
dome.position.y = 0;
cloche.add(dome);

// Dome gold rim
const domeRim = new THREE.Mesh(
  new THREE.TorusGeometry(1.0, 0.025, 18, 128),
  goldBrightMat
);
domeRim.rotation.x = Math.PI / 2;
cloche.add(domeRim);

// Dome handle/finial
const finialBase = new THREE.Mesh(
  new THREE.CylinderGeometry(0.08, 0.12, 0.06, 32),
  goldMat
);
finialBase.position.y = 1.0;
cloche.add(finialBase);

const finialBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.09, 32, 32),
  goldBrightMat
);
finialBall.position.y = 1.12;
cloche.add(finialBall);

// Cloche slowly rises and falls (reveal effect)
const clocheBaseY = cloche.position.y;

// ----- Background: Burj-skyline silhouette + dunes -----
const dune = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 8, 80, 8),
  new THREE.MeshStandardMaterial({
    color: 0x1a0e08,
    metalness: 0.2,
    roughness: 0.9,
    side: THREE.DoubleSide,
  })
);
{
  const pos = dune.geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const wave = Math.sin(x * 0.4) * 0.6 + Math.sin(x * 0.15 + 1.2) * 1.2;
    pos.setZ(i, wave * (1 - Math.abs(y) / 4));
  }
  pos.needsUpdate = true;
  dune.geometry.computeVertexNormals();
}
dune.position.set(0, -1.5, -8);
dune.rotation.x = -0.15;
scene.add(dune);

// ----- Gold particles (floating spice dust) -----
const particleCount = 220;
const particleGeo = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const seeds = new Float32Array(particleCount);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3]     = (Math.random() - 0.5) * 14;
  positions[i * 3 + 1] = Math.random() * 6 - 1;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
  seeds[i] = Math.random() * Math.PI * 2;
}
particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMat = new THREE.PointsMaterial({
  color: 0xf1d28a,
  size: 0.035,
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.85,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// ----- Distant glow orb (warm halo behind the cloche) -----
const haloMat = new THREE.MeshBasicMaterial({
  color: 0xd4af6a,
  transparent: true,
  opacity: 0.18,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
const halo = new THREE.Mesh(new THREE.SphereGeometry(2.8, 32, 32), haloMat);
halo.position.set(0, 0.6, -3);
scene.add(halo);

// ----- Mouse parallax -----
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
window.addEventListener('mousemove', (e) => {
  mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ----- Resize -----
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ----- Animate -----
const clock = new THREE.Clock();
function animate() {
  const t = clock.getElapsedTime();

  // Smooth mouse follow
  mouse.x += (mouse.tx - mouse.x) * 0.04;
  mouse.y += (mouse.ty - mouse.y) * 0.04;

  // Gentle camera parallax
  camera.position.x = mouse.x * 0.45;
  camera.position.y = 1.4 + mouse.y * -0.25;
  camera.lookAt(0, 0.2, 0);

  // Rotate the piece slowly
  piece.rotation.y = t * 0.22;

  // Cloche breathing reveal (lifts up gently)
  const lift = (Math.sin(t * 0.6) + 1) * 0.5; // 0..1
  cloche.position.y = clocheBaseY + lift * 0.45;
  glassMat.opacity = 0.5 + (1 - lift) * 0.15;

  // Dish center gentle float
  dishCenter.rotation.y = -t * 0.4;
  saffronSphere.position.y = Math.sin(t * 1.5) * 0.02;

  // Particle drift
  const pos = particles.geometry.attributes.position;
  for (let i = 0; i < particleCount; i++) {
    const idx = i * 3;
    pos.array[idx + 1] += 0.004 + Math.sin(t + seeds[i]) * 0.002;
    pos.array[idx] += Math.sin(t * 0.5 + seeds[i]) * 0.002;
    if (pos.array[idx + 1] > 5) pos.array[idx + 1] = -1.2;
  }
  pos.needsUpdate = true;

  // Halo pulse
  halo.scale.setScalar(1 + Math.sin(t * 0.8) * 0.05);
  haloMat.opacity = 0.16 + Math.sin(t * 0.8) * 0.04;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
