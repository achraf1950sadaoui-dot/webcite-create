# TAWAKULL — Landing Page Skincare (COD Maroc)

Page de vente **single-product** optimisée pour la conversion + **paiement à
la livraison (COD)**, pensée pour le marché marocain et le trafic publicitaire
(Facebook / Instagram / TikTok Ads).

**Aperçu :** ouvre `index.html` f ay navigateur.

---

## Wach kayn f had l-page

- **Hero** : galerie d teswir, prix + prix barré, note (étoiles), CTA.
- **Bandeau de confiance** : livraison, COD, satisfait ou remboursé.
- **Problème → Solution** : accroche émotionnelle.
- **Bénéfices** · **Avant/Après** · **Mode d'emploi** · **Avis clients**.
- **Offres / Packs** (1, 2, 3 unités) → kayzid l-panier moyen (AOV).
- **Formulaire COD** : Nom · Téléphone · Ville · Adresse · Offre.
  - Validation d ra9m marocain (06/07…).
  - Commande katmchi l-**WhatsApp** dyalek (b automatique), w/wla l-**Google Sheet**.
- **FAQ** · **CTA collant** f mobile · **minuterie** d'urgence.

---

## ⚙️ Wahed file kaytre7em 3la kolchi : `config.js`

Bdel GHIR f `config.js` :

```js
product: { name, subtitle, images:[…], price, compareAt }   // produit + asmane
offers:  { packs:[ {label, qty, price, compareAt} ] }        // packs
order:   { whatsapp:'2126XXXXXXXX', sheetEndpoint:'', cities:[…] }
reviews: { items:[…] }    // ⚠️ avis 7A9I9IYIN ghir
theme:   { primary, accent, … }   // couleurs
```

### ⚠️ Checklist qbel ma t-lance
- [ ] `product` : ism, teswir 7a9i9i, asmane (men TrendTrack).
- [ ] `order.whatsapp` : ra9m WhatsApp dyalek (format `2126XXXXXXXX`).
- [ ] `reviews.items` : avis d clients 7a9i9iyin (matkdebch).
- [ ] `brand.phone` / `instagram`.

---

## 📦 Commandes (COD) — kifach kaymchiw

1. **WhatsApp (par défaut, bla backend)** : ملي العميل يصيفط، كتفتح WhatsApp
   عندك بالطلب كامل (نوم/تيليفون/مدينة/عنوان/الأوفر).
2. **Google Sheet (optionnel)** : 7ot URL d Google Apps Script f
   `order.sheetEndpoint` → kol commande katsjjel f Sheet automatiquement.
3. **Shopify (backend)** : دير الطلبات اللي توصلك فـ Shopify (Brouillon/Order)
   باش تستافد من tracking, COD app, و إحصائيات.

---

## 🚀 Déploiement

Static site (HTML/CSS/JS, bla build) — 7ot l-4 files f:

- **Netlify** — drag & drop d dossier
- **Vercel** — `vercel deploy`
- **GitHub Pages** — push l-branche `gh-pages`
- ay hébergeur static

---

## 🛠️ Tech

- HTML + CSS + JavaScript (ES modules) — **bla framework, bla npm**.
- Google Fonts : Playfair Display · Cormorant · Inter.
- Mobile-first, responsive, rapide (mohim l-conversion f ads).
