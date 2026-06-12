// ════════════════════════════════════════════════════════════════
//  TAWAKULL — BOUTIQUE COD (Maroc) · Catalogue multi-produits
//  ────────────────────────────────────────────────────────────────
//  Bach tbidel ay haja f site, bidel GHIR f had l-file (config.js).
//
//  ⚠️  CHECKLIST QBEL MA T-LANCE:
//    [ ] shopify.domain                    → store dyalek f Shopify
//    [ ] kol produit: variantId            → = produit f Shopify (déjà mrebbet ✓)
//    [ ] kol produit: price / compareAt    → = nefs taman f Shopify
//    [ ] kol produit: img                  → 7ot teswir 7a9i9i d produit (sinon kayban emoji)
//    [ ] brand.phone / instagram
//    [ ] reviews.items                     → avis 7A9I9IYIN (3omrek matkdeb!)
//  ────────────────────────────────────────────────────────────────
//  📦 COMMANDES: kol bouton "Commander" kayreddi l-client DIRECT
//     l-checkout d Shopify (paiement à la livraison), produit déjà
//     f panier. Khass GHIR: COD mfa3el f Shopify (Réglages > Paiements).
// ════════════════════════════════════════════════════════════════

// Teswir Unsplash (placeholder). Bidel l-ID wla 7ot URL d teswir dyalek.
// Ila teswir ma tla3ch, kayban emoji + gradient (ma kayb9ach 5awi).
const IMG = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

export const CONFIG = {

  // ─── Brand ─────────────────────────────────────────────────────
  brand: {
    name: 'TAWAKULL',
    tagline: 'Soins de la peau',
    phone: '[+212 6XX-XXXXXX]',      // ⚠️ ra9m dyalek
    instagram: '[@tawakull.ma]',      // ⚠️ instagram dyalek
    domain: 'tawakull.ma',
  },

  // ─── Couleurs (palette beauté naturelle) ──────────────────────
  theme: {
    bg:          '#faf6f2',
    bgAlt:       '#ffffff',
    ink:         '#2b2420',
    inkDim:      '#7a6f67',
    primary:     '#2e7d5b',
    primaryDark: '#1f5a41',
    accent:      '#c9a86a',
    blush:       '#ecc9c3',
    star:        '#f5a623',
  },

  // ─── Barre d'annonce ──────────────────────────────────────────
  announce: "🔥 LIVRAISON GRATUITE aujourd'hui · Paiement à la livraison partout au Maroc",

  // ─── Shopify (checkout direct · COD) ──────────────────────────
  shopify: {
    domain: 'xpt7tm-ue.myshopify.com',   // ⚠️ store dyalek
  },

  // ─── HERO (accueil boutique) ──────────────────────────────────
  hero: {
    eyebrow: 'Soins naturels · Maroc',
    title: "Révélez l'éclat naturel de votre peau",
    subtitle: 'Une routine complète de soins efficaces, livrés chez vous. Paiement à la livraison, satisfait ou remboursé sous 7 jours.',
    cta: '🛍️ Découvrir la boutique',
    image: IMG('1620916566398-39f1143ab7be', 1200),
  },

  // ─── CATALOGUE (titre de section) ─────────────────────────────
  catalog: {
    title: 'Notre boutique',
    subtitle: '9 soins essentiels pour une peau éclatante — paiement à la livraison',
  },

  // ─── PRODUITS (9) ⚠️ kol wa7ed mrebbet m3a variantId f Shopify ─
  products: [
    { id: 'serum-vitc', name: 'Sérum Éclat Vitamine C', subtitle: 'Anti-taches · Éclat · 30ml',
      price: 149, compareAt: 249, variantId: '43837137190978',
      img: IMG('1620916566398-39f1143ab7be'), emoji: '🍊', grad: 'linear-gradient(135deg,#f9d976,#f39f86)',
      badge: 'Bestseller', rating: 4.8, reviews: 213 },

    { id: 'creme-hydra', name: 'Crème Hydratante Acide Hyaluronique', subtitle: 'Hydratation 24h · 50ml',
      price: 139, compareAt: 219, variantId: '43848406794306',
      img: IMG('1556228578-8c89e6adf883'), emoji: '💧', grad: 'linear-gradient(135deg,#a1c4fd,#c2e9fb)',
      badge: 'Coup de cœur', rating: 4.7, reviews: 156 },

    { id: 'nettoyant', name: 'Nettoyant Visage Mousse Douce', subtitle: 'Nettoie en douceur · 150ml',
      price: 89, compareAt: 149, variantId: '43848406827074',
      img: IMG('1612817288484-6f916006741a'), emoji: '🫧', grad: 'linear-gradient(135deg,#a8edea,#bdf0d6)',
      badge: 'Essentiel', rating: 4.6, reviews: 98 },

    { id: 'masque', name: 'Masque Purifiant Argile & Charbon', subtitle: 'Pores nets · 100ml',
      price: 99, compareAt: 169, variantId: '43848406859842',
      img: IMG('1608248543803-ba4f8c70ae0b'), emoji: '🌑', grad: 'linear-gradient(135deg,#4b4b4b,#7d7d7d)',
      badge: 'Nouveau', rating: 4.7, reviews: 74 },

    { id: 'contour-yeux', name: 'Contour des Yeux Anti-Cernes', subtitle: 'Anti-cernes & poches · 15ml',
      price: 119, compareAt: 199, variantId: '43848406892610',
      img: IMG('1570172619644-dfd03ed5d881'), emoji: '👁️', grad: 'linear-gradient(135deg,#cda7ef,#e6d3f8)',
      badge: '', rating: 4.6, reviews: 61 },

    { id: 'solaire', name: 'Crème Solaire SPF50', subtitle: 'Haute protection · 50ml',
      price: 109, compareAt: 179, variantId: '43848406925378',
      img: IMG('1556228720-195a672e8a03'), emoji: '☀️', grad: 'linear-gradient(135deg,#fbd07c,#f8b64c)',
      badge: 'Indispensable', rating: 4.8, reviews: 132 },

    { id: 'retinol', name: 'Sérum Rétinol Anti-Âge Nuit', subtitle: 'Anti-rides nuit · 30ml',
      price: 159, compareAt: 269, variantId: '43848406958146',
      img: IMG('1571875257727-256c39da42af'), emoji: '🌙', grad: 'linear-gradient(135deg,#6a7fdb,#9aa7e8)',
      badge: 'Anti-âge', rating: 4.9, reviews: 187 },

    { id: 'micellaire', name: 'Eau Micellaire Démaquillante', subtitle: 'Démaquille 3-en-1 · 400ml',
      price: 79, compareAt: 129, variantId: '43848406990914',
      img: IMG('1598440947619-2c35fc9aa908'), emoji: '💦', grad: 'linear-gradient(135deg,#89f7fe,#b3ecf5)',
      badge: 'Format XL', rating: 4.6, reviews: 89 },

    { id: 'gommage', name: 'Gommage Exfoliant AHA/BHA', subtitle: 'Peau lisse & douce · 50ml',
      price: 99, compareAt: 169, variantId: '43848407023682',
      img: IMG('1596755389378-c31d21fd1273'), emoji: '✨', grad: 'linear-gradient(135deg,#f6a6c1,#f9cdda)',
      badge: 'Nouveau', rating: 4.7, reviews: 53 },
  ],

  // ─── Pourquoi nous (valeur de marque) ─────────────────────────
  benefits: {
    eyebrow: 'Pourquoi TAWAKULL',
    title: 'Des soins en qui vous pouvez avoir confiance',
    items: [
      { icon: '✨', title: 'Formules efficaces',      text: 'Des actifs concentrés, des résultats visibles.' },
      { icon: '🌿', title: 'Ingrédients naturels',     text: 'Doux pour la peau, sans parabènes.' },
      { icon: '🧪', title: 'Testés dermatologiquement', text: 'Convient à tous les types de peau.' },
      { icon: '🇲🇦', title: 'Pensés pour le Maroc',     text: 'Adaptés à votre peau et votre climat.' },
    ],
  },

  // ─── Avis clients ⚠️ REMPLACE par de VRAIS avis ───────────────
  reviews: {
    title: 'Elles ont testé, elles adorent',
    note: '⚠️ EXEMPLES. Mets de vrais avis de tes clientes — ne jamais inventer.',
    items: [
      { name: 'Salma', city: 'Casablanca', stars: 5, text: 'Le sérum Vitamine C a vraiment atténué mes taches. Teint plus lumineux 😍', verified: true },
      { name: 'Imane', city: 'Rabat',      stars: 5, text: 'J\'ai pris la routine complète, textures agréables et livraison rapide !', verified: true },
      { name: 'Hajar', city: 'Marrakech',  stars: 4, text: 'Bons produits, paiement à la livraison, très pratique. Merci !', verified: true },
    ],
  },

  // ─── Garanties / réassurance ──────────────────────────────────
  guarantees: {
    items: [
      { icon: '🚚', title: 'Livraison 24–48h', text: 'Partout au Maroc' },
      { icon: '💵', title: 'Paiement à la livraison', text: 'Vous payez à la réception' },
      { icon: '↩️', title: 'Satisfait ou remboursé', text: 'Sous 7 jours' },
      { icon: '🔒', title: 'Commande sécurisée', text: 'Sans engagement' },
    ],
  },

  // ─── FAQ ──────────────────────────────────────────────────────
  faq: {
    title: 'Questions fréquentes',
    items: [
      { q: 'Comment se passe le paiement ?', a: 'Paiement à la livraison (cash). Vous payez le livreur à la réception de votre commande.' },
      { q: 'En combien de temps je reçois ?', a: 'Entre 24h et 48h selon votre ville, partout au Maroc.' },
      { q: 'Puis-je commander plusieurs produits ?', a: 'Oui ! Ajoutez chaque produit à votre commande, vous payez le tout à la livraison.' },
      { q: 'Les produits conviennent à quel type de peau ?', a: 'À tous les types de peau, y compris les peaux sensibles.' },
    ],
  },

  // ─── Footer ───────────────────────────────────────────────────
  footer: {
    note: 'Soins de la peau au Maroc · Paiement à la livraison',
    copyright: '© 2026 TAWAKULL · Tous droits réservés',
  },

  // ─── Réglages ─────────────────────────────────────────────────
  settings: {
    showAnnounce: true,
  },
};
