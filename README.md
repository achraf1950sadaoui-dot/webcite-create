# ISMA — Luxury Dubai Restaurant

A cinematic, single-page website for a fine-dining restaurant. Designed
to feel like a Michelin guide entry, animated like a luxury fragrance ad.

**Live demo:** open `index.html` in any modern browser.

---

## What's inside

- **Hero 3D scene** (Three.js): rotating gold plate, glass cloche that breathes
  open to reveal a saffron-pearl dish, orbiting gold rings, drifting spice
  particles, dune silhouette, cursor parallax, scroll-linked camera dolly.
- **Custom gold cursor** with magnetic buttons and 3D tilt on framed elements.
- **Word-by-word hero title reveal** after preloader.
- **Scroll progress bar** in gold.
- **Sections:** Story · 22-course tasting menu · Chef · Visit (Burj Khalifa
  L124) · Reservation form (client-side confirmation).
- **Fully responsive**, mobile-optimized (custom cursor disables on touch).

---

## One file controls everything

All copy, colors, menu items, hours, contact info — `config.js`.

```js
export const CONFIG = {
  brand: { name: 'ISMA', tagline: 'DUBAI', ... },
  theme: { gold: '#d4af6a', goldBright: '#f1d28a', ... },
  hero:  { eyebrow: '...', title: [...], lede: '...' },
  menu:  { dishes: [ { course, name, desc, price }, ... ] },
  visit: { cards: [ { title, lines: [...] }, ... ] },
  ...
};
```

To rebrand for a new client:

1. Open `config.js`
2. Change `brand.name`, `brand.tagline`, theme colors, dish list, contact info.
3. Refresh the page. Done.

No build step. No framework. Pure HTML + CSS + ES modules.

---

## Tech

- **Three.js** r160 (via jsDelivr CDN)
- **Google Fonts** — Cinzel (display), Cormorant Garamond (serif), Inter (sans)
- **No build, no npm install** — just open `index.html`

---

## Deploy

Drop the folder into:

- **Netlify** — drag & drop the directory
- **Vercel** — `vercel deploy` in the folder
- **GitHub Pages** — push to `gh-pages` branch
- **Any static host** — upload 4 files (`index.html`, `styles.css`,
  `script.js`, `config.js`)

---

## Pricing tiers (suggestion for clients)

| Tier | What's included |
|------|-----------------|
| **Basic** | Site as-is, your branding/colors/menu, deployed to a domain |
| **Pro** | + reservation form connected to email (Formspree/EmailJS), Google Maps embed, Instagram feed |
| **Premium** | + bilingual EN/AR with RTL, full photo gallery, custom 3D scene tailored to the cuisine, custom domain + SSL |
