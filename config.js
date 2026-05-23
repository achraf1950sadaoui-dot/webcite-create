// ════════════════════════════════════════════════════════════════
//  ISMA RESTAURANT — CONFIG
//  ────────────────────────────────────────────────────────────────
//  Bach tbidel ay haja f site, bidel ghir hna. Maykhassek tdkhol
//  l index.html wla styles.css.
//  ────────────────────────────────────────────────────────────────
//  To rebrand for a new client: change values in this file only.
// ════════════════════════════════════════════════════════════════

export const CONFIG = {

  // ─── Brand ─────────────────────────────────────────────────────
  brand: {
    name: 'ISMA',           // 3-5 char wordmark works best
    accent: '',             // optional accent char inside the name, e.g. 'I'
    tagline: 'DUBAI',
    domain: 'isma-dubai.ae',
    established: 'Est. 2024',
  },

  // ─── Theme (CSS variables get pushed at runtime) ──────────────
  theme: {
    bg:         '#08070a',
    bgAlt:      '#0e0c10',
    ink:        '#f4ecdc',
    inkDim:     '#a89c84',
    gold:       '#d4af6a',
    goldBright: '#f1d28a',
    goldDeep:   '#8a6a2e',
    // 3D scene
    sceneFog:   0x08070a,
    plateGold:  0xd4af6a,
    domeTint:   0xf6e6c0,
    saffron:    0xff8b1a,
  },

  // ─── Hero ──────────────────────────────────────────────────────
  hero: {
    eyebrow: 'Burj Khalifa District · Est. 2024',
    title: ['Where the desert', 'meets', 'gold.'], // last word italicized
    italicWord: 'gold',
    lede: 'A twenty-two course tasting menu inspired by the dunes of the Empty Quarter, the spice routes of the Gulf, and the audacity of modern Dubai.',
    ctaPrimary: 'Reserve a Table',
    ctaSecondary: 'Discover the Menu',
    badges: ['★★★★★', "Condé Nast 2025", "World's 50 Best"],
  },

  // ─── Story ─────────────────────────────────────────────────────
  story: {
    eyebrow: 'Our Philosophy',
    title: 'An ode to the seven emirates.',
    italicWord: 'seven emirates.',
    body: [
      'ISMA — a name whispered between dunes — is the culinary vision of Chef Yasmin Al-Hashimi. Each course is a study in contrast: the heat of the dunes and the chill of the Gulf, the heritage of bedouin spice and the precision of Parisian technique.',
      'Twelve tables. One chef\'s counter. Zero compromises.',
    ],
    stats: [
      { value: '22', label: 'Courses' },
      { value: '14', label: "Sommeliers' picks" },
      { value: '1',  label: 'Michelin star · 2025' },
    ],
  },

  // ─── Menu ──────────────────────────────────────────────────────
  menu: {
    eyebrow: 'Signature Tasting',
    title: 'A menu, told as a story.',
    italicWord: 'told as a story.',
    dishes: [
      { course: 'I · Awakening',  name: 'Saffron & Pearl',       desc: 'Hammour ceviche, Iranian saffron pearls, finger lime, gold leaf.',          price: 'AED 240' },
      { course: 'VII · Desert',   name: 'Smoked Camel Tartare',  desc: 'Aged camel loin, sumac, black lime emulsion, charred flatbread.',          price: 'AED 320' },
      { course: 'XII · Gulf',     name: 'Lobster Machboos',      desc: 'Omani blue lobster, aged basmati, dried lime, bisque foam.',               price: 'AED 480' },
      { course: 'XVII · Fire',    name: 'Wagyu A5 · Oud Smoke',  desc: 'Japanese A5 wagyu, oud-wood smoke, date jus, truffle labneh.',             price: 'AED 720' },
      { course: 'XX · Garden',    name: 'Rose & Pistachio',      desc: 'Damascus rose sorbet, Aleppo pistachio, candied rose petals.',             price: 'AED 180' },
      { course: 'XXII · Farewell',name: 'The Golden Date',       desc: 'Medjool date filled with 24k gold ganache, cardamom coffee.',              price: 'AED 120' },
    ],
    footer: {
      summary: 'Full tasting · <strong>AED 1,850</strong> per guest · wine pairing +AED 950',
      cta: 'Reserve',
    },
  },

  // ─── Chef ──────────────────────────────────────────────────────
  chef: {
    eyebrow: 'Behind the Counter',
    title: 'Twelve years of obsession.',
    italicWord: 'obsession.',
    name: 'Chef Yasmin Al-Hashimi',
    body: [
      "Trained at L'Arpège in Paris and Noma in Copenhagen, Chef Yasmin returned to Dubai with a singular question: what would the cuisine of the Arabian peninsula taste like if it had never paused to look elsewhere?",
      'ISMA is the answer — a kitchen rooted in ancestral spice, sharpened by Nordic discipline, and plated with Parisian restraint.',
    ],
    quote: 'We do not chase trends. We chase memory.',
  },

  // ─── Visit ─────────────────────────────────────────────────────
  visit: {
    eyebrow: 'Find Us',
    title: 'The 124th floor. The skyline below.',
    italicWord: 'The skyline below.',
    cards: [
      { title: 'Address',  lines: ['Burj Khalifa, Level 124', '1 Sheikh Mohammed bin Rashid Blvd', 'Downtown Dubai, U.A.E.'] },
      { title: 'Hours',    lines: ['Tuesday — Sunday', 'Seatings at 18:30 & 21:00', '<em>Closed Mondays</em>'] },
      { title: 'Contact',  lines: ['+971 4 888 1908', 'reserve@isma-dubai.ae', 'Valet & helipad available'] },
    ],
  },

  // ─── Reservation ───────────────────────────────────────────────
  reserve: {
    eyebrow: 'Reserve Your Table',
    title: 'Two seatings. Twelve tables.',
    italicWord: 'Twelve tables.',
    submit: 'Request Reservation',
    confirm: 'Thank you. Our concierge will confirm your table within 24 hours.',
    seatings: ['18:30 — First Seating', '21:00 — Second Seating'],
  },

  // ─── Footer ────────────────────────────────────────────────────
  footer: {
    copyright: '© 2026 ISMA Dubai · All rights reserved',
    motto: 'Crafted in the desert · Plated in gold',
  },

  // ─── Animation tuning ──────────────────────────────────────────
  motion: {
    rotateSpeed: 0.18,      // piece auto-rotation speed
    cloche: {
      lift: 0.55,           // how high the cloche rises (units)
      period: 5.5,          // seconds for full breathe cycle
    },
    particles: 280,         // gold dust count
    cursorEnabled: true,    // custom gold cursor
  },
};
