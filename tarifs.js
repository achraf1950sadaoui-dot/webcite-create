// ════════════════════════════════════════════════════════════════
//  TAWAKULL — Liste des prix (page imprimable / partageable)
//  Kaya9ra men config.js — ma khass-sh tbidel walo hna.
// ════════════════════════════════════════════════════════════════
import { CONFIG } from './config.js?v=2';

const C = CONFIG;
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = (n) => `${n} DH`;
const setText = (k, v) => $$(`[data-bind="${k}"]`).forEach(el => (el.textContent = v));
const setHTML = (k, v) => $$(`[data-bind="${k}"]`).forEach(el => (el.innerHTML = v));

// ─── Thème (mêmes couleurs que la boutique) ───────────────────
function applyTheme() {
  const t = C.theme, r = document.documentElement.style;
  r.setProperty('--bg', t.bg);            r.setProperty('--bg-alt', t.bgAlt);
  r.setProperty('--ink', t.ink);          r.setProperty('--ink-dim', t.inkDim);
  r.setProperty('--primary', t.primary);  r.setProperty('--primary-dark', t.primaryDark);
  r.setProperty('--accent', t.accent);    r.setProperty('--blush', t.blush);
  r.setProperty('--star', t.star);
}

// ─── Ligne de prix ────────────────────────────────────────────
function priceRow(p) {
  const save = p.compareAt > p.price
    ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
  return `
    <div class="price-row">
      <div class="pr-emoji" style="background:${p.grad || 'var(--bg-alt)'}">${p.emoji || '🧴'}</div>
      <div class="pr-info">
        <div class="pr-name">${p.name}</div>
        <div class="pr-sub">${p.subtitle || ''}</div>
      </div>
      <div class="pr-price">
        <span class="pr-now">${money(p.price)}</span>
        ${p.compareAt > p.price ? `<span class="pr-old">${money(p.compareAt)}</span>` : ''}
        ${save ? `<div class="pr-save">−${save}%</div>` : ''}
      </div>
    </div>`;
}

// ─── Rendu ────────────────────────────────────────────────────
function render() {
  document.title = `${C.brand.name} — Liste des prix`;
  setText('brand-name', C.brand.name);
  setText('brand-tagline', C.brand.tagline);

  // Date (mise à jour automatique)
  const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  setText('price-date', `Tarifs au ${today}`);

  // Liste
  setHTML('price-list', C.products.map(priceRow).join(''));

  // Total (prix promo de la routine complète)
  const total = C.products.reduce((s, p) => s + p.price, 0);
  const totalOld = C.products.reduce((s, p) => s + (p.compareAt > p.price ? p.compareAt : p.price), 0);
  const save = totalOld - total;
  setHTML('price-total',
    `<div><b>Routine complète (${C.products.length} produits)</b>
       <div class="pt-sub">${save > 0 ? `Vous économisez ${money(save)}` : 'Paiement à la livraison'}</div></div>
     <div style="text-align:right">
       <b>${money(total)}</b>
       ${save > 0 ? `<div class="pt-sub" style="text-decoration:line-through">${money(totalOld)}</div>` : ''}
     </div>`);

  // Garanties
  setHTML('price-guarantees', C.guarantees.items.map(g => `${g.icon} ${g.title}`).join(' · '));

  // Contact
  setHTML('price-contact',
    `📞 ${C.brand.phone} &nbsp;·&nbsp; 📷 ${C.brand.instagram}`);

  // Copyright
  setText('price-copyright', C.footer.copyright);
}

applyTheme();
render();
