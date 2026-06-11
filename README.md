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
shopify: { domain:'xxx.myshopify.com', variantId:'123…' }    // store + produit
product: { name, subtitle, images:[…], price, compareAt }    // = nefs taman Shopify
offers:  { packs:[ {label, qty, price, compareAt} ] }         // packs (price = qty × prix)
reviews: { items:[…] }    // ⚠️ avis 7A9I9IYIN ghir
theme:   { primary, accent, … }   // couleurs
```

### ⚠️ Checklist qbel ma t-lance
- [ ] `shopify.domain` / `variantId` : store + produit dyalek f Shopify.
- [ ] `product` : ism, teswir 7a9i9i, asmane (= nefs taman f Shopify).
- [ ] `reviews.items` : avis d clients 7a9i9iyin (matkdebch).
- [ ] `brand.phone` / `instagram`.
- [ ] F Shopify : COD mfa3el · produit publié f "Online Store" · stock kaysmer l-bi3.

---

## 📦 Commandes (COD) — kaymchiw DIRECT l-Shopify

ملي العميل يكليكي **«Commander»**، كيتّرّدّد لـ **checkout د Shopify** والمنتوج
ديجا فالـ panier. كيكمّل المعلومات ديالو (نوم/مدينة/عنوان) وكيختار **الدفع عند
الاستلام**، والكوماندة كتبان مباشرة فـ **Shopify → Orders** (مع tracking,
إحصائيات, و apps د التوصيل COD).

> الربط كيتدار عبر *cart permalink* : `https://STORE.myshopify.com/cart/VARIANT:QTY`
> شوف `shopify` و `offers.packs` فـ `config.js`.

**باش يخدم checkout (مرة وحدة فـ Shopify):**
1. **Settings → Payments → (Manuel) Cash on Delivery** : فعّلو.
2. **Produit publié** فـ "Online Store" (sales channel).
3. **Stock** : خلّي المخزون كيسمح بالبيع (ولا طفّي inventory tracking).

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
