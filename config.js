// ════════════════════════════════════════════════════════════════
//  ISMA RESTAURANT — CONFIG
//  ────────────────────────────────────────────────────────────────
//  Bach tbidel ay haja f site, bidel ghir hna.
//  To rebrand for a new client: change values in this file only.
//
//  ⚠️  CHECKLIST QBEL MA T-DEPLOY  (replace every "[…]" placeholder)
//  ────────────────────────────────────────────────────────────────
//    [ ] brand.name + brand.tagline + brand.domain
//    [ ] hero.eyebrow + hero.badges (use REAL awards only)
//    [ ] visit.cards — address, hours, phone, email
//    [ ] chef.name + chef.body + chef.quote
//    [ ] menu.categories — prices in your local currency
//    [ ] footer.copyright — restaurant name
//  ════════════════════════════════════════════════════════════════

// Unsplash 4K food photos — change these if you want different imagery.
// Format: https://images.unsplash.com/photo-XXX?auto=format&fit=crop&w=2400&q=90
const IMG = (id, w = 2400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=90`;

export const CONFIG = {

  // ─── Brand ─────────────────────────────────────────────────────
  // ⚠️ REPLACE with the real restaurant's brand info before going live.
  brand: {
    name: 'ISMA',                // <-- Restaurant name
    accent: '',                  // optional accent letter to highlight
    tagline: 'DUBAI',            // city / sub-line under brand
    domain: 'your-domain.ae',    // <-- used in emails / copy
  },

  // ─── Theme: bottle green + white ──────────────────────────────
  theme: {
    bg:         '#f7f4ed',   // warm cream
    bgAlt:      '#ffffff',   // pure white
    ink:        '#0a2e23',   // deep ink (text on cream)
    inkDim:     '#5a6e63',   // muted green-grey
    green:      '#0e4d3a',   // bottle green primary
    greenDark:  '#08321f',   // deep bottle green
    greenLight: '#2b6e58',   // lighter accent green
    cream:      '#f7f4ed',
    creamSoft:  '#ede7d8',
    gold:       '#c9a86a',   // tiny gold accent (optional)
    // 3D scene
    sceneFog:   0x0e4d3a,
    sceneBg:    0x08321f,
  },

  // ─── Hero ──────────────────────────────────────────────────────
  hero: {
    eyebrow: '[Neighbourhood, City · Est. YYYY]',
    title: ['Where flavour', 'meets', 'craft.'],
    italicWord: 'craft.',
    lede: 'A bottle-green sanctuary in the heart of Dubai — twenty dining moments from sunrise breakfast to midnight shisha, every dish plated with the same obsession.',
    ctaPrimary: 'Reserve a Table',
    ctaSecondary: 'Explore the Menu',
    // ⚠️ Badges below are PLACEHOLDERS. Use only awards the restaurant
    //    has actually received — never fake press / reviews.
    badges: ['★★★★★', '[Press / award #1]', '[Press / award #2]'],
  },

  // ─── 3D hero food images (load real 4K plates) ────────────────
  // These textures appear on rotating discs in the hero scene.
  // Replace IDs to change which dishes show.
  heroFoodImages: [
    IMG('1565299624946-b28f40a0ae38'),  // pizza
    IMG('1551183053-bf91a1d81141'),     // pasta
    IMG('1546069901-ba9599a7e63c'),     // burger
    IMG('1572715376701-98568319fd0b'),  // grilled
    IMG('1512621776951-a57141f2eefd'),  // salad
    IMG('1551024506-0bccd828d307'),     // dessert
    IMG('1567620905732-2d1ec7ab7445'),  // pancakes
    IMG('1559847844-5315695dadae'),     // coffee
  ],

  // ─── Story ─────────────────────────────────────────────────────
  story: {
    eyebrow: 'Our Philosophy',
    title: 'One kitchen, twenty stories.',
    italicWord: 'twenty stories.',
    body: [
      'ISMA is a restaurant for every hour of the day. From the first cardamom coffee at dawn to the last curl of apple shisha at midnight, our menu is built around the rituals of Dubai life — generous, social, and made for sharing.',
      'No single cuisine. No single hour. Just relentless quality, table after table.',
    ],
    stats: [
      { value: '20',  label: 'Menu sections' },
      { value: '180', label: 'Dishes daily' },
      { value: '16h', label: 'Open 8am — midnight' },
    ],
  },

  // ─── Menu — 20 categories ──────────────────────────────────────
  menu: {
    eyebrow: 'Our Menu',
    title: 'From breakfast to shisha.',
    italicWord: 'to shisha.',
    categories: [
      {
        id: 'breakfast', name: 'Breakfast',
        img: IMG('1525351484163-7529414344d8'),
        dishes: [
          { name: 'Saffron French Toast',  desc: 'Brioche, saffron syrup, mascarpone, pistachio crumble.',     price: 'AED 58' },
          { name: 'Truffle Eggs Benedict', desc: 'Poached eggs, smoked turkey, black truffle hollandaise.',   price: 'AED 72' },
          { name: 'Shakshuka Royale',      desc: 'Slow-cooked tomatoes, lamb merguez, halloumi, sourdough.',  price: 'AED 64' },
          { name: 'Açaí Bowl',             desc: 'Açaí, banana, granola, coconut, fresh seasonal berries.',   price: 'AED 52' },
        ],
      },
      {
        id: 'hot-appetizers', name: 'Hot Appetizers',
        img: IMG('1626200419199-391ae4be7a41'),
        dishes: [
          { name: 'Truffle Arancini',     desc: 'Saffron risotto, mozzarella core, black truffle aioli.',     price: 'AED 64' },
          { name: 'Crispy Calamari',      desc: 'Tempura calamari, smoked paprika, lemon-garlic dip.',       price: 'AED 72' },
          { name: 'Lamb Kibbeh',          desc: 'Bulgur shell, spiced lamb, pomegranate molasses.',          price: 'AED 58' },
          { name: 'Halloumi Saganaki',    desc: 'Pan-seared halloumi, honey, walnuts, fig jam.',             price: 'AED 54' },
        ],
      },
      {
        id: 'cold-appetizers', name: 'Cold Appetizers',
        img: IMG('1544025162-d76694265947'),
        dishes: [
          { name: 'Burrata & Heirloom',   desc: 'Puglian burrata, heirloom tomatoes, basil oil, balsamic.',  price: 'AED 78' },
          { name: 'Tuna Tartare',         desc: 'Yellowfin tuna, avocado, yuzu, sesame, taro chips.',        price: 'AED 88' },
          { name: 'Beef Carpaccio',       desc: 'Black Angus, parmesan, arugula, truffle oil.',              price: 'AED 82' },
          { name: 'Mezze Platter',        desc: 'Hummus, mutabal, muhammara, labneh, warm pita.',            price: 'AED 68' },
        ],
      },
      {
        id: 'soup', name: 'Soup',
        img: IMG('1547592180-85f173990554'),
        dishes: [
          { name: 'Lobster Bisque',       desc: 'Maine lobster, cognac cream, chive oil.',                   price: 'AED 78' },
          { name: 'Truffle Mushroom',     desc: 'Wild mushrooms, black truffle, herb croutons.',             price: 'AED 58' },
          { name: 'Lentil & Cumin',       desc: 'Red lentils, cumin, crispy onions, lemon wedge.',           price: 'AED 42' },
          { name: 'Pho Saigon',           desc: 'Slow-braised beef, rice noodles, herbs, lime.',             price: 'AED 64' },
        ],
      },
      {
        id: 'salade', name: 'Salade',
        img: IMG('1512621776951-a57141f2eefd'),
        dishes: [
          { name: 'Quinoa Avocado',       desc: 'Tri-colour quinoa, avocado, pomegranate, feta, mint.',      price: 'AED 62' },
          { name: 'Caesar ISMA',          desc: 'Romaine, parmesan crisp, anchovy, grilled chicken.',        price: 'AED 68' },
          { name: 'Watermelon Feta',      desc: 'Chilled watermelon, feta, mint, kalamata, white balsamic.', price: 'AED 56' },
          { name: 'Niçoise',              desc: 'Seared tuna, green beans, egg, olives, fingerling potato.', price: 'AED 78' },
        ],
      },
      {
        id: 'main-course', name: 'Main Course',
        img: IMG('1546833999-b9f581a1996d'),
        dishes: [
          { name: 'Wagyu Tenderloin',     desc: 'Australian wagyu MB7, truffle jus, smoked bone marrow.',    price: 'AED 320' },
          { name: 'Chilean Sea Bass',     desc: 'Miso glaze, baby bok choy, ginger-soy reduction.',          price: 'AED 240' },
          { name: 'Lamb Shoulder',        desc: '12-hour braised lamb, freekeh, pomegranate jus.',           price: 'AED 220' },
          { name: 'Saffron Risotto',      desc: 'Carnaroli rice, saffron, parmesan, gold leaf.',             price: 'AED 140' },
          { name: 'Duck à l\'Orange',     desc: 'Confit duck leg, blood orange gastrique, dauphine potato.', price: 'AED 180' },
        ],
      },
      {
        id: 'pasta', name: 'Pasta',
        img: IMG('1551183053-bf91a1d81141'),
        dishes: [
          { name: 'Truffle Tagliatelle',  desc: 'Fresh tagliatelle, black truffle, parmesan, egg yolk.',     price: 'AED 145' },
          { name: 'Lobster Linguine',     desc: 'House linguine, blue lobster, cherry tomato, white wine.',  price: 'AED 195' },
          { name: 'Carbonara Romano',     desc: 'Spaghetti, guanciale, pecorino, black pepper, egg yolk.',   price: 'AED 95'  },
          { name: 'Pesto Genovese',       desc: 'Trofie pasta, basil pesto, green beans, fingerling.',       price: 'AED 85'  },
        ],
      },
      {
        id: 'bbq', name: 'BBQ',
        img: IMG('1558030006-450675393462'),
        dishes: [
          { name: 'Mixed Grill Royal',    desc: 'Lamb chops, beef kofta, shish taouk, lamb kebab.',          price: 'AED 220' },
          { name: 'Tomahawk Steak',       desc: 'Black Angus tomahawk 1.2kg, chimichurri, smoked salt.',     price: 'AED 480' },
          { name: 'Spatchcock Chicken',   desc: 'Whole chicken, ras el hanout marinade, sumac onions.',      price: 'AED 140' },
          { name: 'Beef Short Ribs',      desc: '24h smoked, bourbon BBQ glaze, pickled slaw.',              price: 'AED 195' },
        ],
      },
      {
        id: 'side-dishes', name: 'Side Dishes',
        img: IMG('1604908176997-125f25cc6f3d'),
        dishes: [
          { name: 'Truffle Fries',        desc: 'Hand-cut fries, truffle oil, parmesan, chives.',            price: 'AED 38' },
          { name: 'Charred Broccolini',   desc: 'Tenderstem broccoli, chilli, garlic, lemon zest.',          price: 'AED 32' },
          { name: 'Mac & Cheese',         desc: 'Aged cheddar, gruyère, brioche crumb.',                     price: 'AED 42' },
          { name: 'Saffron Rice',         desc: 'Basmati, saffron, almonds, caramelised onion.',             price: 'AED 28' },
        ],
      },
      {
        id: 'kids', name: 'Kids Menu',
        img: IMG('1571091718767-18b5b1457add'),
        dishes: [
          { name: 'Mini Burger Sliders',  desc: 'Two Angus sliders, cheese, brioche, sweet potato fries.',   price: 'AED 48' },
          { name: 'Chicken Nuggets',      desc: 'Hand-breaded, honey mustard, fries.',                       price: 'AED 38' },
          { name: 'Cheese Pizza',         desc: 'Stone-baked margherita, kids size.',                        price: 'AED 42' },
          { name: 'Penne Pomodoro',       desc: 'Penne, tomato sauce, parmesan.',                            price: 'AED 36' },
        ],
      },
      {
        id: 'desserts', name: 'Desserts',
        img: IMG('1551024506-0bccd828d307'),
        dishes: [
          { name: 'Pistachio Soufflé',    desc: 'Warm soufflé, Aleppo pistachio, vanilla ice cream.',        price: 'AED 64' },
          { name: 'Chocolate Fondant',    desc: 'Valrhona 70%, salted caramel, gold leaf.',                  price: 'AED 58' },
          { name: 'Tiramisu Classico',    desc: 'Mascarpone, espresso, savoiardi, cocoa.',                   price: 'AED 52' },
          { name: 'Knafeh Royale',        desc: 'Kataifi, cheese, rose syrup, crushed pistachio.',           price: 'AED 56' },
          { name: 'Crème Brûlée',         desc: 'Tahitian vanilla, caramelised sugar, berries.',             price: 'AED 48' },
        ],
      },
      {
        id: 'coffee', name: 'Coffee',
        img: IMG('1559847844-5315695dadae'),
        dishes: [
          { name: 'Espresso',             desc: 'Single origin Ethiopia.',                                   price: 'AED 18' },
          { name: 'Cappuccino',           desc: 'Double espresso, steamed milk, velvet foam.',               price: 'AED 24' },
          { name: 'Flat White',           desc: 'Ristretto, micro-foamed milk.',                             price: 'AED 26' },
          { name: 'Arabic Coffee',        desc: 'Cardamom-infused, served with dates.',                      price: 'AED 22' },
        ],
      },
      {
        id: 'lemonades', name: 'Lemonades',
        img: IMG('1556881286-fc6915169721'),
        dishes: [
          { name: 'Classic Lemonade',     desc: 'Fresh lemon, mint, raw sugar, sparkling water.',            price: 'AED 28' },
          { name: 'Strawberry Basil',     desc: 'Strawberry, basil, lemon, agave.',                          price: 'AED 32' },
          { name: 'Rose Cucumber',        desc: 'Rose water, cucumber, lime, soda.',                         price: 'AED 30' },
          { name: 'Passion Mojito',       desc: 'Passion fruit, mint, lime — virgin.',                       price: 'AED 34' },
        ],
      },
      {
        id: 'milkshakes', name: 'Milk Shakes',
        img: IMG('1544145945-f90425340c7e'),
        dishes: [
          { name: 'Oreo Cookie',          desc: 'Vanilla bean ice cream, crushed Oreo, whipped cream.',      price: 'AED 36' },
          { name: 'Pistachio Dream',      desc: 'Pistachio gelato, milk, rose syrup, candied nuts.',         price: 'AED 38' },
          { name: 'Salted Caramel',       desc: 'Caramel ice cream, sea salt, pretzel crumb.',               price: 'AED 36' },
          { name: 'Nutella Banana',       desc: 'Banana, Nutella, vanilla ice cream.',                       price: 'AED 38' },
        ],
      },
      {
        id: 'smoothies', name: 'Fruit Smoothies',
        img: IMG('1505252585461-04db1eb84625'),
        dishes: [
          { name: 'Tropical Sunset',      desc: 'Mango, pineapple, passion fruit, coconut.',                 price: 'AED 32' },
          { name: 'Berry Detox',          desc: 'Blueberry, strawberry, banana, yogurt.',                    price: 'AED 30' },
          { name: 'Green Glow',           desc: 'Spinach, apple, kiwi, ginger, lime.',                       price: 'AED 32' },
          { name: 'Açaí Power',           desc: 'Açaí, banana, almond milk, dates.',                         price: 'AED 36' },
        ],
      },
      {
        id: 'cold-coffee', name: 'Cold Coffee',
        img: IMG('1561882468-9110e03e0f78'),
        dishes: [
          { name: 'Iced Latte',           desc: 'Double espresso, cold milk, ice.',                          price: 'AED 26' },
          { name: 'Cold Brew',            desc: '18-hour cold steeped, served black.',                       price: 'AED 28' },
          { name: 'Affogato',             desc: 'Vanilla gelato drowned in hot espresso.',                   price: 'AED 32' },
          { name: 'Spanish Latte',        desc: 'Condensed milk, espresso, ice.',                            price: 'AED 30' },
        ],
      },
      {
        id: 'tea', name: 'Tea · Designer Teas',
        img: IMG('1576092768241-dec231879fc3'),
        dishes: [
          { name: 'Moroccan Mint',        desc: 'Gunpowder green, fresh mint, raw sugar.',                   price: 'AED 24' },
          { name: 'Rose Earl Grey',       desc: 'Bergamot, rose petals, vanilla cream.',                     price: 'AED 28' },
          { name: 'Karak Chai',           desc: 'Black tea, cardamom, ginger, condensed milk.',              price: 'AED 22' },
          { name: 'Hibiscus Berry',       desc: 'Hibiscus, raspberry, hint of honey.',                       price: 'AED 26' },
          { name: 'Matcha Latte',         desc: 'Ceremonial matcha, oat milk.',                              price: 'AED 32' },
        ],
      },
      {
        id: 'drinks', name: 'Drinks',
        img: IMG('1551538827-9c037cb4f32a'),
        dishes: [
          { name: 'Virgin Mojito',        desc: 'Mint, lime, soda, raw sugar.',                              price: 'AED 28' },
          { name: 'Cucumber Cooler',      desc: 'Cucumber, elderflower, tonic, lime.',                       price: 'AED 32' },
          { name: 'Pomegranate Spritz',   desc: 'Pomegranate, rose, sparkling water.',                       price: 'AED 32' },
          { name: 'San Pellegrino 750ml', desc: 'Sparkling mineral water.',                                  price: 'AED 28' },
        ],
      },
      {
        id: 'fresh', name: 'Fresh Juices',
        img: IMG('1610970881699-44a5587cabec'),
        dishes: [
          { name: 'Orange',               desc: 'Fresh-squeezed Valencia oranges.',                          price: 'AED 24' },
          { name: 'Watermelon Mint',      desc: 'Watermelon, fresh mint.',                                   price: 'AED 26' },
          { name: 'Carrot Ginger',        desc: 'Carrot, apple, ginger, lemon.',                             price: 'AED 28' },
          { name: 'Beetroot Glow',        desc: 'Beetroot, apple, lemon, ginger.',                           price: 'AED 28' },
        ],
      },
      {
        id: 'sheesha', name: 'Sheesha',
        img: IMG('1551801691-f0bce83d4f68'),
        dishes: [
          { name: 'Double Apple',         desc: 'Classic two-apple blend, natural coal.',                    price: 'AED 95'  },
          { name: 'Mint Lemon',           desc: 'Fresh mint, lemon zest, ice tip.',                          price: 'AED 95'  },
          { name: 'Grape Berry',          desc: 'Grape, blueberry, mint.',                                   price: 'AED 105' },
          { name: 'ISMA Signature',       desc: 'House blend, rose, mint, watermelon.',                      price: 'AED 120' },
          { name: 'Premium Fakher',       desc: 'Imported premium blend, your choice of flavour.',           price: 'AED 130' },
        ],
      },
    ],
  },

  // ─── Chef ──────────────────────────────────────────────────────
  // ⚠️ Chef name + bio are PLACEHOLDERS — replace with the real chef's story.
  chef: {
    eyebrow: 'Behind the Counter',
    title: 'Twelve years of obsession.',
    italicWord: 'obsession.',
    name: '[Chef Name]',
    body: [
      '[Short paragraph about the chef — background, training, philosophy. Two or three sentences works best.]',
      '[Second paragraph — what makes this restaurant unique under their leadership.]',
    ],
    quote: '[A short quote from the chef — 1 sentence.]',
  },

  // ─── Visit ─────────────────────────────────────────────────────
  // ⚠️ All address / phone / email below are PLACEHOLDERS.
  //    Replace with the real restaurant's details before publishing.
  visit: {
    eyebrow: 'Find Us',
    title: 'Downtown Dubai. The skyline outside.',
    italicWord: 'The skyline outside.',
    cards: [
      { title: 'Address',  lines: [
          '[Street address line 1]',
          '[Street address line 2]',
          '[City, Emirate, U.A.E.]',
      ] },
      { title: 'Hours',    lines: [
          '[Opening days]',
          '[Opening hours]',
          '<em>[Optional sub-line, e.g. breakfast hours]</em>',
      ] },
      { title: 'Contact',  lines: [
          '[+971 X XXX XXXX]',
          '[reserve@your-domain.ae]',
          '[Parking / valet note]',
      ] },
    ],
  },

  // ─── Reservation ───────────────────────────────────────────────
  reserve: {
    eyebrow: 'Reserve Your Table',
    title: 'Indoor, garden, or sheesha lounge.',
    italicWord: 'or sheesha lounge.',
    submit: 'Request Reservation',
    confirm: 'Thank you. Our concierge will confirm your table within 24 hours.',
    seatings: ['Breakfast (08:00 — 12:00)', 'Lunch (12:00 — 16:00)', 'Dinner (18:00 — 23:00)', 'Late Night (23:00 — 02:00)'],
  },

  // ─── Footer ────────────────────────────────────────────────────
  footer: {
    copyright: '© 2026 [Restaurant Name] · All rights reserved',
    motto: 'Every hour. Every table. The same standard.',
  },

  // ─── Motion ────────────────────────────────────────────────────
  motion: {
    rotateSpeed: 0.12,
    particles: 220,
    cursorEnabled: true,
  },
};
