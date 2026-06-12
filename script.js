// ════════════════════════════════════════════════════════════════
//  TAWAKULL — Boutique logic
//  Kayre7em config.js 3la l-page. Kol produit → checkout Shopify (COD).
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

// Lien checkout Shopify (cart permalink) — produit pré-ajouté au panier
const checkoutUrl = (variantId, qty = 1) =>
  `https://${C.shopify.domain}/cart/${variantId}:${qty}`;

// ─── 1) Couleurs ──────────────────────────────────────────────
function applyTheme() {
  const t = C.theme, r = document.documentElement.style;
  r.setProperty('--bg', t.bg);            r.setProperty('--bg-alt', t.bgAlt);
  r.setProperty('--ink', t.ink);          r.setProperty('--ink-dim', t.inkDim);
  r.setProperty('--primary', t.primary);  r.setProperty('--primary-dark', t.primaryDark);
  r.setProperty('--accent', t.accent);    r.setProperty('--blush', t.blush);
  r.setProperty('--star', t.star);
}

// ─── 2) Carte produit ─────────────────────────────────────────
function productCard(p) {
  const save = p.compareAt > p.price
    ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
  return `
    <article class="pcard reveal">
      <div class="pc-media" style="background:${p.grad || 'var(--bg-alt)'}">
        <span class="pc-emoji">${p.emoji || '🧴'}</span>
        ${p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'">` : ''}
        ${p.badge ? `<span class="pc-badge">${p.badge}</span>` : ''}
        ${save ? `<span class="pc-save">−${save}%</span>` : ''}
      </div>
      <div class="pc-body">
        <div class="pc-stars">${stars(p.rating || 5)} <small>(${p.reviews || 0})</small></div>
        <h3 class="pc-name">${p.name}</h3>
        <p class="pc-sub">${p.subtitle || ''}</p>
        <div class="pc-price">
          <span class="pc-now">${money(p.price)}</span>
          ${p.compareAt > p.price ? `<span class="pc-old">${money(p.compareAt)}</span>` : ''}
        </div>
        <a class="btn-primary full magnetic" href="${checkoutUrl(p.variantId)}" rel="nofollow">🛒 Commander</a>
      </div>
    </article>`;
}

// ─── 3) Contenu ───────────────────────────────────────────────
function render() {
  // Meta + marque
  document.title = `${C.brand.name} — ${C.brand.tagline}`;
  setText('meta-title', document.title);
  setAttr('meta-desc', 'content', `${C.catalog.subtitle} — Paiement à la livraison au Maroc.`);
  setText('brand-name', C.brand.name);
  setText('brand-tagline', C.brand.tagline);

  // Announce
  const ann = $('.announce');
  if (C.settings.showAnnounce) setText('announce', C.announce);
  else if (ann) ann.style.display = 'none';

  // Hero
  setText('hero-eyebrow', C.hero.eyebrow);
  setText('hero-title', C.hero.title);
  setText('hero-subtitle', C.hero.subtitle);
  setText('hero-cta', C.hero.cta);
  setAttr('hero-img', 'src', C.hero.image);
  setHTML('reassure-mini', C.guarantees.items.slice(0, 3)
    .map(g => `<span>${g.icon} ${g.title}</span>`).join(''));

  // Trust strip
  setHTML('trust-strip', C.guarantees.items.map(g =>
    `<div class="trust-item"><span class="ti-ic">${g.icon}</span><div><b>${g.title}</b><small>${g.text}</small></div></div>`).join(''));

  // Catalogue
  setText('catalog-title', C.catalog.title);
  setText('catalog-subtitle', C.catalog.subtitle);
  setHTML('product-grid', C.products.map(productCard).join(''));

  // Pourquoi nous
  setText('benefits-eyebrow', C.benefits.eyebrow);
  setText('benefits-title', C.benefits.title);
  setHTML('benefit-grid', C.benefits.items.map(b =>
    `<div class="benefit"><div class="b-ic">${b.icon}</div><b>${b.title}</b><p>${b.text}</p></div>`).join(''));

  // Avis
  setText('reviews-title', C.reviews.title);
  setHTML('review-grid', C.reviews.items.map(r =>
    `<div class="review"><div class="review-top"><div class="who">${r.name}<small>${r.city}</small></div>
     <div class="r-stars">${stars(r.stars)}</div></div><p>“${r.text}”</p>
     ${r.verified ? '<span class="verified">Achat vérifié</span>' : ''}</div>`).join(''));

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
}

// ─── 4) FAQ accordéon ─────────────────────────────────────────
function setupFaq() {
  $('[data-bind="faq-list"]').addEventListener('click', (e) => {
    const q = e.target.closest('.faq-q'); if (!q) return;
    const item = q.parentElement;
    const a = item.querySelector('.faq-a');
    item.classList.toggle('open');
    a.style.maxHeight = item.classList.contains('open') ? a.scrollHeight + 'px' : 0;
  });
}

// ─── 5) Sticky CTA + reveal au scroll ─────────────────────────
function setupScroll() {
  const sticky = $('.sticky-cta');
  const onScroll = () => sticky.classList.toggle('show', window.scrollY > 500);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  $$('.section, .hero-info, .hero-media, .trust-strip, .pcard').forEach(el => { el.classList.add('reveal'); io.observe(el); });
}

// ─── Init ─────────────────────────────────────────────────────
applyTheme();
render();
setupFaq();
setupScroll();
