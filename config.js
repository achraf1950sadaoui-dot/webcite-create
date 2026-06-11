// ════════════════════════════════════════════════════════════════
//  TAWAKULL — SKINCARE LANDING PAGE (Page de vente COD · Maroc)
//  ────────────────────────────────────────────────────────────────
//  Bach tbidel ay haja f site, bidel GHIR f had l-file.
//  Wa7ed file kaytre7em 3la kolchi (texte, asmane, couleurs, produit).
//
//  ⚠️  CHECKLIST QBEL MA T-LANCE  (bidel kol "[…]" / placeholder):
//  ────────────────────────────────────────────────────────────────
//    [ ] shopify.domain / variantId           → store + produit dyalek f Shopify
//    [ ] product.name / subtitle / images     → produit dyalek l-7a9i9i (teswir!)
//    [ ] product.price / compareAt / offers    → asmane (= nefs taman f Shopify!)
//    [ ] reviews.items                         → avis 7A9I9IYIN (3omrek matkdeb avis!)
//    [ ] brand.phone / instagram / domain
//  ────────────────────────────────────────────────────────────────
//  📦 COMMANDES: kaymchiw DIRECT l-checkout d Shopify (paiement à la
//     livraison). Khass f Shopify: (1) COD mfa3el, (2) produit publié
//     f "Online Store", (3) stock kaysmer l-bi3 (ou inventory OFF).
//  ════════════════════════════════════════════════════════════════

// Images Unsplash (placeholder). Bidel l-IDs wla 7ot teswir d produit dyalek.
const IMG = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

export const CONFIG = {

  // ─── Brand ─────────────────────────────────────────────────────
  brand: {
    name: 'TAWAKULL',
    tagline: 'Soins de la peau',
    phone: '[+212 6XX-XXXXXX]',        // ⚠️ ra9m dyalek
    instagram: '[@tawakull.ma]',        // ⚠️ instagram dyalek
    domain: 'tawakull.ma',
  },

  // ─── Couleurs (palette beauté naturelle) ──────────────────────
  theme: {
    bg:          '#faf6f2',  // crème
    bgAlt:       '#ffffff',  // blanc
    ink:         '#2b2420',  // texte foncé
    inkDim:      '#7a6f67',  // texte secondaire
    primary:     '#2e7d5b',  // vert botanique
    primaryDark: '#1f5a41',
    accent:      '#c9a86a',  // or doux
    blush:       '#ecc9c3',  // rose poudré
    star:        '#f5a623',  // étoiles avis
  },

  // ─── Barre d'annonce (urgence) ────────────────────────────────
  announce: "🔥 Offre limitée — LIVRAISON GRATUITE aujourd'hui · Paiement à la livraison",

  // ─── Shopify (checkout direct · COD) ──────────────────────────
  //  L-bouton "Commander" kayreddi l-client DIRECT l-checkout d Shopify
  //  b l-produit déjà f panier. ⚠️ ila bdelti l-produit, bdel variantId.
  shopify: {
    domain: 'xpt7tm-ue.myshopify.com',   // ⚠️ store dyalek
    variantId: '43837137190978',          // ⚠️ Sérum Éclat à la Vitamine C 30ml
  },

  // ─── PRODUIT  ⚠️ khass ykoun nefs l-produit f Shopify ─────────
  product: {
    name: 'Sérum Éclat à la Vitamine C',
    subtitle: 'Sérum 30ml · Anti-taches · Éclat · Anti-âge — tous types de peau',
    rating: 4.8,
    reviewsCount: 213,
    // ⚠️ 7ot teswir 7a9i9i d produit dyalek (l-luwla = principale)
    images: [
      IMG('1620916566398-39f1143ab7be'),
      IMG('1612817288484-6f916006741a'),
      IMG('1608248543803-ba4f8c70ae0b'),
    ],
    price: 149,        // ✅ prix réel (= nefs taman f Shopify)
    compareAt: 249,    // ⚠️ prix barré (marketing) — 7ot l-prix régulier wla 0 bach yt7iyyed
    currency: 'MAD',
    badges: ['100% Naturel', 'Résultats en 2 semaines', 'Sans parabènes'],
  },

  // ─── Le problème (accroche émotionnelle) ──────────────────────
  problem: {
    eyebrow: 'Ce problème vous parle ?',
    title: 'Taches, teint terne, peau fatiguée ?',
    points: [
      'Des taches brunes qui ne partent pas malgré les crèmes.',
      'Un teint terne et sans éclat, surtout le matin.',
      'Une peau qui marque vite la fatigue et le stress.',
      'Vous avez tout essayé… sans résultat durable.',
    ],
    solution: "Le Sérum Éclat Vitamine C agit en profondeur pour unifier, illuminer et raffermir votre peau — visible dès 2 semaines.",
  },

  // ─── Bénéfices ────────────────────────────────────────────────
  benefits: {
    eyebrow: 'Pourquoi vous allez l’adorer',
    title: 'Des résultats qui se voient',
    items: [
      { icon: '✨', title: 'Éclat immédiat',  text: 'Ravive les peaux ternes dès la première semaine.' },
      { icon: '🌑', title: 'Anti-taches',     text: 'Atténue les taches brunes et unifie le teint.' },
      { icon: '🛡️', title: 'Protection',      text: 'Antioxydant : protège de la pollution et des UV.' },
      { icon: '💧', title: 'Hydratation',     text: 'Peau repulpée, douce et lisse au quotidien.' },
    ],
  },

  // ─── Avant / Après ────────────────────────────────────────────
  results: {
    title: 'Avant · Après',
    note: '⚠️ Remplace par une VRAIE photo de résultat (jamais truquée).',
    image: IMG('1556228578-8c89e6adf883'),
    caption: 'Résultat moyen constaté après 4 semaines d’utilisation quotidienne.',
    stats: [
      { value: '93%', label: 'peau plus lumineuse*' },
      { value: '87%', label: 'taches atténuées*' },
      { value: '2 sem', label: 'premiers résultats' },
    ],
    disclaimer: '*Auto-évaluation. Remplace par tes vrais chiffres ou supprime.',
  },

  // ─── Mode d'emploi ────────────────────────────────────────────
  howto: {
    title: 'Simple, en 3 étapes',
    steps: [
      { n: '1', title: 'Nettoyez', text: 'Sur peau propre et sèche, matin et/ou soir.' },
      { n: '2', title: 'Appliquez', text: '3 à 4 gouttes, massez délicatement le visage.' },
      { n: '3', title: 'Hydratez', text: 'Suivez de votre crème + protection solaire le matin.' },
    ],
  },

  // ─── Avis clients  ⚠️ REMPLACE par de VRAIS avis ──────────────
  reviews: {
    title: 'Elles ont testé, elles adorent',
    note: '⚠️ Ce sont des EXEMPLES. Mets de vrais avis de tes clientes — ne jamais inventer.',
    items: [
      { name: 'Salma', city: 'Casablanca', stars: 5, text: 'Après 3 semaines mes taches se sont vraiment atténuées. Teint plus lumineux 😍', verified: true },
      { name: 'Imane', city: 'Rabat',      stars: 5, text: 'Texture légère, ça pénètre vite et ça ne graisse pas. Je recommande !', verified: true },
      { name: 'Hajar', city: 'Marrakech',  stars: 4, text: 'Bon produit, livraison rapide et paiement à la livraison. Merci !', verified: true },
    ],
  },

  // ─── Offres / Packs (zid l-panier moyen) ──────────────────────
  offers: {
    title: 'Choisissez votre offre',
    subtitle: 'Plus vous prenez, plus vous économisez',
    //  ⚠️ price = qty × prix unitaire Shopify (149) bach ytwafe9 m3a checkout.
    //  Bach tzid remise réelle 3la packs, dir discount f Shopify w 7ot code hna.
    packs: [
      { id: '1u', label: '1 Unité',  qty: 1, price: 149, compareAt: 249, badge: '' },
      { id: '2u', label: 'Pack 2',   qty: 2, price: 298, compareAt: 498, badge: 'Économisez 200 DH' },
      { id: '3u', label: 'Pack 3',   qty: 3, price: 447, compareAt: 747, badge: 'Le + populaire', popular: true },
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
      { q: 'Convient à quel type de peau ?', a: 'À tous les types de peau, y compris les peaux sensibles.' },
      { q: 'Quand vais-je voir des résultats ?', a: 'Les premiers résultats sont généralement visibles dès 2 semaines.' },
    ],
  },

  // ─── Commande (→ Shopify checkout · COD) ──────────────────────
  order: {
    title: 'Commandez maintenant',
    subtitle: 'Choisissez votre offre — paiement à la livraison',
    ctaLabel: '🛒 Commander',   // texte du bouton (le total s'ajoute automatiquement)
    note: 'Vous allez être redirigé vers notre page de commande sécurisée. Paiement à la livraison.',
  },

  // ─── Footer ───────────────────────────────────────────────────
  footer: {
    note: 'Soins de la peau au Maroc · Paiement à la livraison',
    copyright: '© 2026 TAWAKULL · Tous droits réservés',
  },

  // ─── Réglages ─────────────────────────────────────────────────
  settings: {
    countdownMinutes: 15,   // minuterie d'urgence (0 = désactivé)
    showAnnounce: true,
  },
};
