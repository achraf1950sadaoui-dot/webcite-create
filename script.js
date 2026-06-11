// ════════════════════════════════════════════════════════════════
//  TAWAKULL — Landing page logic
//  Kayre7em config.js 3la l-page + kaysayer commande COD (WhatsApp)
// ════════════════════════════════════════════════════════════════
import { CONFIG } from './config.js';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = (n) => `${n} DH`;
const setText = (k, v) => $$(`[data-bind="${k}"]`).forEach(el => (el.textContent = v));
const setHTML = (k, v) => $$(`[data-bind="${k}"]`).forEach(el => (el.innerHTML = v));
const setAttr = (k, a, v) => $$(`[data-bind="${k}"]`).forEach(el => el.setAttribute(a, v));
const stars = (n) => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));

const C = CONFIG;
let selectedPack = null;

// ─── 1) Couleurs ──────────────────────────────────────────────
function applyTheme() {
  const t = C.theme, r = document.documentElement.style;
  r.setProperty('--bg', t.bg);            r.setProperty('--bg-alt', t.bgAlt);
  r.setProperty('--ink', t.ink);          r.setProperty('--ink-dim', t.inkDim);
  r.setProperty('--primary', t.primary);  r.setProperty('--primary-dark', t.primaryDark);
  r.setProperty('--accent', t.accent);    r.setProperty('--blush', t.blush);
  r.setProperty('--star', t.star);
}

// ─── 2) Contenu ───────────────────────────────────────────────
function render() {
  // Meta + marque
  document.title = `${C.product.name} | ${C.brand.name}`;
  setText('meta-title', document.title);
  setAttr('meta-desc', 'content', `${C.product.subtitle} — Paiement à la livraison au Maroc.`);
  setText('brand-name', C.brand.name);
  setText('brand-tagline', C.brand.tagline);

  // Announce
  const ann = $('.announce');
  if (C.settings.showAnnounce) setText('announce', C.announce);
  else if (ann) ann.style.display = 'none';

  // Hero
  setAttr('hero-img', 'src', C.product.images[0]);
  setHTML('hero-thumbs', C.product.images.map((src, i) =>
    `<img src="${src}" data-i="${i}" class="${i === 0 ? 'active' : ''}" alt="vue ${i + 1}">`).join(''));
  setText('hero-stars', stars(C.product.rating));
  setText('hero-reviews', `${C.product.rating} · ${C.product.reviewsCount} avis`);
  setText('product-name', C.product.name);
  setText('product-subtitle', C.product.subtitle);
  setHTML('product-badges', C.product.badges.map(b => `<li>${b}</li>`).join(''));
  setText('product-price', money(C.product.price));
  if (C.product.compareAt > C.product.price) {
    setText('product-compare', money(C.product.compareAt));
    const off = Math.round((1 - C.product.price / C.product.compareAt) * 100);
    setText('product-save', `−${off}%`);
  }
  setHTML('reassure-mini', C.guarantees.items.slice(0, 3)
    .map(g => `<span>${g.icon} ${g.title}</span>`).join(''));

  // Trust strip
  setHTML('trust-strip', C.guarantees.items.map(g =>
    `<div class="trust-item"><span class="ti-ic">${g.icon}</span><div><b>${g.title}</b><small>${g.text}</small></div></div>`).join(''));

  // Problème
  setText('problem-eyebrow', C.problem.eyebrow);
  setText('problem-title', C.problem.title);
  setHTML('problem-points', C.problem.points.map(p => `<li>${p}</li>`).join(''));
  setText('problem-solution', C.problem.solution);

  // Bénéfices
  setText('benefits-eyebrow', C.benefits.eyebrow);
  setText('benefits-title', C.benefits.title);
  setHTML('benefit-grid', C.benefits.items.map(b =>
    `<div class="benefit"><div class="b-ic">${b.icon}</div><b>${b.title}</b><p>${b.text}</p></div>`).join(''));

  // Résultats
  setText('results-title', C.results.title);
  setAttr('results-img', 'src', C.results.image);
  setHTML('result-stats', C.results.stats.map(s =>
    `<div class="result-stat"><b>${s.value}</b><small>${s.label}</small></div>`).join(''));
  setText('results-caption', C.results.caption);
  setText('results-disclaimer', C.results.disclaimer);

  // Mode d'emploi
  setText('howto-title', C.howto.title);
  setHTML('howto-steps', C.howto.steps.map(s =>
    `<div class="step"><span class="s-n">${s.n}</span><div><b>${s.title}</b><p>${s.text}</p></div></div>`).join(''));

  // Avis
  setText('reviews-title', C.reviews.title);
  setHTML('review-grid', C.reviews.items.map(r =>
    `<div class="review"><div class="review-top"><div class="who">${r.name}<small>${r.city}</small></div>
     <div class="r-stars">${stars(r.stars)}</div></div><p>“${r.text}”</p>
     ${r.verified ? '<span class="verified">Achat vérifié</span>' : ''}</div>`).join(''));

  // Offres / packs
  setText('offers-title', C.offers.title);
  setText('offers-subtitle', C.offers.subtitle);
  setHTML('pack-grid', C.offers.packs.map(p =>
    `<div class="pack ${p.popular ? 'popular' : ''}" data-pack="${p.id}">
       ${p.badge ? `<span class="pack-badge">${p.badge}</span>` : ''}
       <div><div class="p-label">${p.label}</div><div class="p-sub">${money(Math.round(p.price / p.qty))} / unité</div></div>
       <div class="p-right"><div class="p-price">${money(p.price)}</div>
       ${p.compareAt > p.price ? `<div class="p-old">${money(p.compareAt)}</div>` : ''}
       <div class="p-cta">Choisir →</div></div>
     </div>`).join(''));

  // Formulaire
  setText('order-title', C.order.title);
  setText('order-subtitle', C.order.subtitle);
  setText('order-success', C.order.success);
  setText('form-reassure', '🔒 Sans paiement en ligne · Vous payez à la livraison');
  $('[data-bind="order-cities"]').innerHTML =
    `<option value="" disabled selected>Choisir votre ville…</option>` +
    C.order.cities.map(c => `<option>${c}</option>`).join('');
  $('[data-bind="order-packs"]').innerHTML =
    C.offers.packs.map(p => `<option value="${p.id}" ${p.popular ? 'selected' : ''}>${p.label} — ${money(p.price)}</option>`).join('');

  // FAQ
  setText('faq-title', C.faq.title);
  setHTML('faq-list', C.faq.items.map(f =>
    `<div class="faq-item"><div class="faq-q">${f.q}<span class="chev">+</span></div>
     <div class="faq-a"><p>${f.a}</p></div></div>`).join(''));

  // Footer
  setText('footer-note', C.footer.note);
  setText('footer-copyright', C.footer.copyright);
  setHTML('foot-contact',
    `<a href="tel:${C.brand.phone.replace(/[^\d+]/g, '')}">📞 ${C.brand.phone}</a>
     <a href="https://instagram.com/${C.brand.instagram.replace(/[@\[\]]/g, '')}" target="_blank" rel="noopener">📷 ${C.brand.instagram}</a>`);

  // Sticky
  setText('sticky-price', money(C.product.price));
  if (C.product.compareAt > C.product.price) setText('sticky-old', money(C.product.compareAt));
}

// ─── 3) Pack sélectionné → résumé + total ─────────────────────
function pickPack(id) {
  selectedPack = C.offers.packs.find(p => p.id === id) || C.offers.packs[0];
  const p = selectedPack;
  setHTML('order-summary',
    `<img src="${C.product.images[0]}" alt=""><div><div class="os-name">${C.product.name}</div>
     <small class="muted">${p.label} · ${p.qty} unité${p.qty > 1 ? 's' : ''}</small></div>
     <span class="os-price">${money(p.price)}</span>`);
  setHTML('order-total', `<span>Total à payer</span><span class="ot-val">${money(p.price)}</span>`);
  const sel = $('[data-bind="order-packs"]');
  if (sel && sel.value !== id) sel.value = id;
  $$('.pack').forEach(el => el.classList.toggle('popular', el.dataset.pack === id));
}

// ─── 4) Téléphone Maroc ───────────────────────────────────────
function normPhone(raw) {
  let d = (raw || '').replace(/\D/g, '');
  if (d.startsWith('212')) d = '0' + d.slice(3);
  else if (d.startsWith('00212')) d = '0' + d.slice(5);
  else if (d.length === 9 && /^[5-7]/.test(d)) d = '0' + d;
  return d;
}
const validPhone = (raw) => /^0[5-7]\d{8}$/.test(normPhone(raw));

// ─── 5) Commande (validation + WhatsApp + Sheet) ──────────────
function setupForm() {
  const form = $('#cod-form');
  const fieldOf = (name) => form.querySelector(`[name="${name}"]`).closest('.field');
  const setErr = (name, msg) => {
    const f = fieldOf(name);
    f.classList.toggle('invalid', !!msg);
    const e = f.querySelector('.err'); if (e) e.textContent = msg || '';
  };

  $('[data-bind="order-packs"]').addEventListener('change', (e) => pickPack(e.target.value));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    let ok = true;
    if (!d.name || d.name.trim().length < 3) { setErr('name', 'Entrez votre nom complet'); ok = false; } else setErr('name');
    if (!validPhone(d.phone)) { setErr('phone', 'Numéro marocain invalide (ex: 0612345678)'); ok = false; } else setErr('phone');
    if (!d.city) { setErr('city', 'Choisissez votre ville'); ok = false; } else setErr('city');
    if (!d.pack) { setErr('pack', 'Choisissez une offre'); ok = false; } else setErr('pack');
    if (!d.address || d.address.trim().length < 5) { setErr('address', 'Entrez votre adresse'); ok = false; } else setErr('address');
    if (!ok) { form.querySelector('.field.invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }

    const pack = C.offers.packs.find(p => p.id === d.pack) || selectedPack;
    const order = {
      produit: C.product.name, offre: pack.label, quantite: pack.qty, total: pack.price,
      nom: d.name.trim(), tel: normPhone(d.phone), ville: d.city,
      adresse: d.address.trim(), remarque: d.note || '', date: new Date().toISOString(),
    };

    // (a) Enregistrer dans Google Sheet / API si configuré
    if (C.order.sheetEndpoint) {
      fetch(C.order.sheetEndpoint, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order),
      }).catch(() => {});
    }

    // (b) Envoyer la commande au marchand via WhatsApp
    const msg =
      `🛒 *Nouvelle commande ${C.brand.name}*\n` +
      `Produit : ${order.produit}\n` +
      `Offre : ${order.offre} (${order.quantite} u.)\n` +
      `Total : ${money(order.total)}\n` +
      `————————\n` +
      `👤 ${order.nom}\n📞 ${order.tel}\n📍 ${order.ville} — ${order.adresse}\n` +
      (order.remarque ? `📝 ${order.remarque}\n` : '');
    window.open(`https://wa.me/${C.order.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');

    // (c) Confirmation sur la page
    $('[data-bind="order-success"]').classList.add('show');
    $('[data-bind="order-success"]').scrollIntoView({ behavior: 'smooth', block: 'center' });
    form.querySelector('button[type="submit"]').textContent = '✅ Commande envoyée';
  });
}

// ─── 6) Galerie ───────────────────────────────────────────────
function setupGallery() {
  $('[data-bind="hero-thumbs"]').addEventListener('click', (e) => {
    const t = e.target.closest('img'); if (!t) return;
    $('[data-bind="hero-img"]').src = C.product.images[+t.dataset.i];
    $$('.hero-thumbs img').forEach(i => i.classList.toggle('active', i === t));
  });
}

// ─── 7) Packs cliquables ──────────────────────────────────────
function setupPacks() {
  $('[data-bind="pack-grid"]').addEventListener('click', (e) => {
    const card = e.target.closest('.pack'); if (!card) return;
    pickPack(card.dataset.pack);
    $('#commander').scrollIntoView({ behavior: 'smooth' });
  });
}

// ─── 8) FAQ accordéon ─────────────────────────────────────────
function setupFaq() {
  $('[data-bind="faq-list"]').addEventListener('click', (e) => {
    const q = e.target.closest('.faq-q'); if (!q) return;
    const item = q.parentElement;
    const a = item.querySelector('.faq-a');
    item.classList.toggle('open');
    a.style.maxHeight = item.classList.contains('open') ? a.scrollHeight + 'px' : 0;
  });
}

// ─── 9) Countdown (urgence) ───────────────────────────────────
function setupCountdown() {
  const box = $('[data-bind="countdown"]');
  const mins = C.settings.countdownMinutes;
  if (!box || !mins) return;
  box.hidden = false;
  const end = Date.now() + mins * 60000;
  const tick = () => {
    const s = Math.max(0, Math.floor((end - Date.now()) / 1000));
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    setText('countdown-time', `${m}:${ss}`);
    if (s <= 0) clearInterval(iv);
  };
  tick(); const iv = setInterval(tick, 1000);
}

// ─── 10) Sticky CTA + reveal ──────────────────────────────────
function setupScroll() {
  const sticky = $('.sticky-cta');
  const onScroll = () => sticky.classList.toggle('show', window.scrollY > 620);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  $$('.section, .hero-info, .hero-gallery, .trust-strip').forEach(el => { el.classList.add('reveal'); io.observe(el); });
}

// ─── Init ─────────────────────────────────────────────────────
applyTheme();
render();
pickPack((C.offers.packs.find(p => p.popular) || C.offers.packs[0]).id);
setupForm();
setupGallery();
setupPacks();
setupFaq();
setupCountdown();
setupScroll();
