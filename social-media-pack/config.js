/* ============================================================================
   POSTCRAFT — Social Media Template Studio
   ----------------------------------------------------------------------------
   ONE FILE CONTROLS EVERYTHING.
   Add / edit templates, palettes, copy and pricing here. No build step.
   Each template has a `kind` that maps to a drawing routine in script.js.
   ========================================================================== */

export const CONFIG = {

  /* ---- Brand of the studio (the page itself) ---------------------------- */
  brand: {
    name: 'POSTCRAFT',
    tagline: 'TEMPLATE STUDIO',
    // Where your "Hire me / Order" button points. Drop your Fiverr gig URL here.
    orderUrl: '#pricing',
    orderLabel: 'Get the pack',
    email: 'you@example.com',          // ← change to your contact
  },

  /* ---- Hero copy -------------------------------------------------------- */
  hero: {
    eyebrow: '12 EDITABLE TEMPLATES · 3 SIZES · INSTANT PNG',
    title: 'Scroll-stopping social posts in seconds.',
    lede: 'A pack of ready-made, fully editable templates for Instagram, Facebook & TikTok. Pick a design, swap the words, change the colors, download. No design skills needed.',
    ctaPrimary: 'Browse templates',
    ctaSecondary: 'See pricing',
    stats: [
      { n: '12', label: 'Designs' },
      { n: '10', label: 'Color themes' },
      { n: '3', label: 'Export sizes' },
    ],
  },

  /* ---- "How it works" --------------------------------------------------- */
  steps: {
    eyebrow: 'HOW IT WORKS',
    title: 'From blank to posted in three steps.',
    items: [
      { n: '01', title: 'Pick a design', text: 'Browse the gallery and choose the template that fits your message.' },
      { n: '02', title: 'Make it yours', text: 'Edit every line of text, switch the color theme and the post size live.' },
      { n: '03', title: 'Download & post', text: 'Export a crisp PNG (HD optional) ready for Instagram, Facebook or TikTok.' },
    ],
  },

  /* ---- Export sizes ----------------------------------------------------- */
  formats: [
    { id: 'square',   label: 'Square 1:1',   w: 1080, h: 1080, note: 'Feed post' },
    { id: 'portrait', label: 'Portrait 4:5', w: 1080, h: 1350, note: 'Max reach' },
    { id: 'story',    label: 'Story 9:16',   w: 1080, h: 1920, note: 'Stories / Reels' },
  ],

  /* ---- Color themes (swappable on any template) ------------------------- *
     bg/bg2 = background gradient · fg = text · accent = highlight           */
  palettes: {
    midnight: { name: 'Midnight', bg: '#0b1020', bg2: '#1b2548', fg: '#ffffff', accent: '#ffd166' },
    sunset:   { name: 'Sunset',   bg: '#ff5e62', bg2: '#ff9966', fg: '#ffffff', accent: '#fff4cc' },
    grape:    { name: 'Grape',    bg: '#4b1d8f', bg2: '#c33aa6', fg: '#ffffff', accent: '#ffd6f5' },
    ocean:    { name: 'Ocean',    bg: '#0f2027', bg2: '#2c5364', fg: '#ffffff', accent: '#64e0c8' },
    forest:   { name: 'Forest',   bg: '#0b3d2e', bg2: '#1e6b4f', fg: '#ffffff', accent: '#b9f6ca' },
    mono:     { name: 'Mono',     bg: '#111111', bg2: '#2a2a2a', fg: '#ffffff', accent: '#f5d90a' },
    electric: { name: 'Electric', bg: '#06080f', bg2: '#141a33', fg: '#ffffff', accent: '#6ee7ff' },
    cream:    { name: 'Cream',    bg: '#f4efe6', bg2: '#e7dccb', fg: '#241d14', accent: '#d2691e' },
    blush:    { name: 'Blush',    bg: '#ffe3ec', bg2: '#ffc2d4', fg: '#5a1f33', accent: '#ff4d8d' },
    coral:    { name: 'Coral',    bg: '#fff0eb', bg2: '#ffd9c9', fg: '#3a1d12', accent: '#ff5a36' },
  },

  /* Order of filter chips in the gallery */
  categories: ['All', 'Promo', 'Quote', 'Event', 'Product', 'Business', 'Minimal'],

  /* ---- The templates ---------------------------------------------------- *
     `kind` -> drawing routine in script.js
     `fields` -> the editable text (auto-builds the editor form)            */
  templates: [

    /* ---------- PROMO ---------- */
    {
      id: 'mega-sale', name: 'Mega Sale', category: 'Promo', kind: 'megaSale', palette: 'midnight',
      fields: [
        { key: 'badge',     label: 'Badge',    type: 'text',     value: 'LIMITED TIME ONLY' },
        { key: 'headline',  label: 'Headline', type: 'text',     value: 'MEGA SALE' },
        { key: 'highlight', label: 'Big offer',type: 'text',     value: '50% OFF' },
        { key: 'sub',       label: 'Subtext',  type: 'textarea', value: 'On everything — this weekend only.' },
        { key: 'cta',       label: 'Button',   type: 'text',     value: 'SHOP NOW' },
      ],
    },
    {
      id: 'flash-deal', name: 'Flash Deal', category: 'Promo', kind: 'flashDeal', palette: 'sunset',
      fields: [
        { key: 'eyebrow', label: 'Top line', type: 'text',     value: 'FLASH SALE' },
        { key: 'percent', label: 'Percent',  type: 'text',     value: '70%' },
        { key: 'word',    label: 'Word',     type: 'text',     value: 'OFF' },
        { key: 'sub',     label: 'Subtext',  type: 'textarea', value: 'Ends tonight at midnight. Don’t miss it.' },
        { key: 'code',    label: 'Promo code',type: 'text',    value: 'USE CODE: FLASH70' },
      ],
    },

    /* ---------- QUOTE ---------- */
    {
      id: 'quote-serif', name: 'Elegant Quote', category: 'Quote', kind: 'quoteSerif', palette: 'cream',
      fields: [
        { key: 'quote',  label: 'Quote',  type: 'textarea', value: 'Great things never came from comfort zones.' },
        { key: 'author', label: 'Author', type: 'text',     value: 'ANONYMOUS' },
      ],
    },
    {
      id: 'quote-bold', name: 'Bold Quote', category: 'Quote', kind: 'quoteBold', palette: 'grape',
      fields: [
        { key: 'quote',  label: 'Quote',  type: 'textarea', value: 'Dream it. Believe it. Build it.' },
        { key: 'author', label: 'Author', type: 'text',     value: 'YOUR NAME' },
      ],
    },

    /* ---------- EVENT ---------- */
    {
      id: 'event-invite', name: 'Event Invite', category: 'Event', kind: 'eventInvite', palette: 'ocean',
      fields: [
        { key: 'eyebrow', label: 'Top line', type: 'text', value: 'YOU’RE INVITED' },
        { key: 'title',   label: 'Title',    type: 'text', value: 'Summer Gala Night' },
        { key: 'date',    label: 'Date',     type: 'text', value: 'SAT · JUNE 21' },
        { key: 'time',    label: 'Time',     type: 'text', value: '8:00 PM' },
        { key: 'place',   label: 'Location', type: 'text', value: 'The Grand Rooftop' },
      ],
    },
    {
      id: 'webinar', name: 'Live Webinar', category: 'Event', kind: 'webinar', palette: 'electric',
      fields: [
        { key: 'badge',    label: 'Badge',    type: 'text', value: 'LIVE WEBINAR' },
        { key: 'title',    label: 'Title',    type: 'text', value: 'Grow Your Brand on Social' },
        { key: 'speaker',  label: 'Speaker',  type: 'text', value: 'with Sara Bennani' },
        { key: 'datetime', label: 'When',     type: 'text', value: 'JUNE 12 · 6 PM GMT' },
        { key: 'cta',      label: 'Button',   type: 'text', value: 'REGISTER FREE' },
      ],
    },

    /* ---------- PRODUCT ---------- */
    {
      id: 'new-arrival', name: 'New Arrival', category: 'Product', kind: 'newArrival', palette: 'mono',
      fields: [
        { key: 'eyebrow', label: 'Top line',    type: 'text',     value: 'NEW ARRIVAL' },
        { key: 'name',    label: 'Product name',type: 'text',     value: 'The Aura Watch' },
        { key: 'sub',     label: 'Description',  type: 'textarea', value: 'Minimal design. Endless battery. Timeless.' },
        { key: 'price',   label: 'Price',        type: 'text',     value: '$199' },
      ],
    },
    {
      id: 'launch', name: 'Product Launch', category: 'Product', kind: 'launch', palette: 'forest',
      fields: [
        { key: 'badge', label: 'Badge',    type: 'text',     value: 'JUST LAUNCHED' },
        { key: 'name',  label: 'Name',     type: 'text',     value: 'Bloom App 2.0' },
        { key: 'feat',  label: 'Features (one per line)', type: 'textarea', value: 'Faster than ever\nDark mode included\nFree for 30 days' },
        { key: 'cta',   label: 'Button',   type: 'text',     value: 'TRY IT NOW' },
      ],
    },

    /* ---------- BUSINESS ---------- */
    {
      id: 'tips', name: 'Tips List', category: 'Business', kind: 'tips', palette: 'blush',
      fields: [
        { key: 'count',  label: 'Count',  type: 'text',     value: '5' },
        { key: 'title',  label: 'Title',  type: 'text',     value: 'Tips to Grow on Instagram' },
        { key: 'items',  label: 'Items (one per line)', type: 'textarea', value: 'Post at peak hours\nWrite hooks that stop the scroll\nReply to every comment\nUse 3–5 niche hashtags\nStay consistent for 90 days' },
        { key: 'handle', label: 'Handle', type: 'text',     value: '@yourbrand' },
      ],
    },
    {
      id: 'testimonial', name: 'Testimonial', category: 'Business', kind: 'testimonial', palette: 'coral',
      fields: [
        { key: 'quote', label: 'Quote', type: 'textarea', value: 'Honestly the best service I’ve used this year. Fast, friendly and worth every penny.' },
        { key: 'name',  label: 'Name',  type: 'text',     value: 'Yasmine K.' },
        { key: 'role',  label: 'Role',  type: 'text',     value: 'Verified customer' },
      ],
    },

    /* ---------- MINIMAL ---------- */
    {
      id: 'coming-soon', name: 'Coming Soon', category: 'Minimal', kind: 'comingSoon', palette: 'electric',
      fields: [
        { key: 'eyebrow',  label: 'Top line', type: 'text', value: 'SOMETHING BIG IS' },
        { key: 'headline', label: 'Headline', type: 'text', value: 'COMING SOON' },
        { key: 'date',     label: 'Date',     type: 'text', value: 'LAUNCHING · 06 . 2026' },
        { key: 'handle',   label: 'Handle',   type: 'text', value: '@yourbrand' },
      ],
    },
    {
      id: 'motivation', name: 'One Word', category: 'Minimal', kind: 'motivation', palette: 'sunset',
      fields: [
        { key: 'word',   label: 'Big word', type: 'text',     value: 'FOCUS' },
        { key: 'sub',    label: 'Subtext',  type: 'textarea', value: 'Discipline beats motivation. Show up every single day.' },
        { key: 'handle', label: 'Handle',   type: 'text',     value: '@yourbrand' },
      ],
    },
  ],

  /* ---- Pricing (your Fiverr tiers) ------------------------------------- */
  pricing: {
    eyebrow: 'PRICING',
    title: 'Pick a package.',
    note: 'Prices are a suggestion — set your own on Fiverr.',
    tiers: [
      {
        name: 'Basic', price: '$15', tag: '5 posts',
        features: ['5 custom posts from any template', 'Your text, colors & logo', '1 size (square)', 'PNG delivery', '2-day delivery'],
        cta: 'Order Basic', featured: false,
      },
      {
        name: 'Standard', price: '$35', tag: '12 posts',
        features: ['12 custom posts', 'All 3 sizes (post / portrait / story)', 'Custom color theme to match your brand', 'HD export', 'Source studio included', '3-day delivery'],
        cta: 'Order Standard', featured: true,
      },
      {
        name: 'Premium', price: '$75', tag: 'Brand kit',
        features: ['30 custom posts', 'Custom templates designed for you', 'Full editable studio + your fonts', 'Content calendar (captions + hashtags)', 'Unlimited revisions', '5-day delivery'],
        cta: 'Order Premium', featured: false,
      },
    ],
  },

  footer: {
    motto: 'Designed to be edited. Built to be posted.',
  },
};
