// ════════════════════════════════════════════════════════════════
//  TAWAKULL — SKINCARE LANDING PAGE (Page de vente COD · Maroc)
//  ────────────────────────────────────────────────────────────────
//  Bach tbidel ay haja f site, bidel GHIR f had l-file.
//  Wa7ed file kaytre7em 3la kolchi (texte, asmane, couleurs, produit).
//
//  ⚠️  CHECKLIST QBEL MA T-LANCE  (bidel kol "[…]" / placeholder):
//  ────────────────────────────────────────────────────────────────
//    [ ] product.name / subtitle / images   → produit dyalek l-7a9i9i (TrendTrack)
//    [ ] product.price / compareAt / offers  → asmane dyalek
//    [ ] order.whatsapp                       → ra9m WhatsApp dyalek (COD)
//    [ ] order.sheetEndpoint                  → (optionnel) Google Sheet / API
//    [ ] reviews.items                        → avis 7A9I9IYIN (3omrek matkdeb avis!)
//    [ ] brand.phone / instagram / domain
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

  // ─── PRODUIT  ⚠️ bidel b produit dyalek mn TrendTrack ─────────
  product: {
    name: 'Sérum Éclat Vitamine C',
    subtitle: 'Anti-taches · Éclat · Anti-âge — pour tous types de peau',
    rating: 4.8,
    reviewsCount: 213,
    // ⚠️ 7ot teswir 7a9i9i d produit dyalek (l-luwla = principale)
    images: [
      IMG('1620916566398-39f1143ab7be'),
      IMG('1612817288484-6f916006741a'),
      IMG('1608248543803-ba4f8c70ae0b'),
    ],
    price: 299,        // ⚠️ taman l-bi3
    compareAt: 499,    // ⚠️ taman m-chettb (prix barré) — khass ykoun >= price
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
    packs: [
      { id: '1u', label: '1 Unité',  qty: 1, price: 299, compareAt: 499, badge: '' },
      { id: '2u', label: 'Pack 2',   qty: 2, price: 499, compareAt: 998, badge: 'Économisez 199 DH' },
      { id: '3u', label: 'Pack 3',   qty: 3, price: 649, compareAt: 1497, badge: 'Le + populaire', popular: true },
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

  // ─── Formulaire de commande (COD) ─────────────────────────────
  order: {
    title: 'Commandez maintenant',
    subtitle: 'Remplissez le formulaire — on vous rappelle pour confirmer',
    // ⚠️ MOUHIM: 7ot ra9m WhatsApp dyalek (format dwali bla "+" wla "00")
    //    Mital: 212612345678
    whatsapp: '212600000000',
    // (Optionnel) Google Apps Script / API URL bach tsjjel commandes f Sheet.
    // Khelliها '' ila ma3endekch — ghadi tmchi l-commande l-WhatsApp directement.
    sheetEndpoint: '',
    cities: [
      'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès',
      'Oujda', 'Kénitra', 'Tétouan', 'Salé', 'Mohammedia', 'El Jadida', 'Nador',
      'Béni Mellal', 'Khouribga', 'Settat', 'Safi', 'Berrechid', 'Autre ville',
    ],
    success: 'Merci ! 🎉 Votre commande est enregistrée. Notre équipe vous appelle pour confirmer.',
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
