# Démos — Restaurants (Rabat)

10 sites de démonstration pour restaurants de Rabat **sans site web**. Kol wahed
**ملف HTML واحد مستقل** (menu + réservation de table qui part directement sur
WhatsApp + Google Maps + galerie), prêt à envoyer.

| # | Fichier | Restaurant | Quartier | Téléphone | Cuisine |
|---|---|---|---|---|---|
| 1 | `lendroit-agdal.html` | L'Endroit | Agdal | 06 61 37 12 89 | Lounge |
| 2 | `sushi-house-hay-riad.html` | Sushi House | Hay Riad | 05 37 56 67 53 | Japonais |
| 3 | `lart-du-gout-hay-riad.html` | L'Art du Goût | Hay Riad | 05 37 71 53 00 | Gastro |
| 4 | `finzi-souissi.html` | Finzi | Souissi | 05 37 75 81 61 | Italien |
| 5 | `bbq-steak-house-hay-riad.html` | BBQ Steak House | Hay Riad | 05 37 56 42 51 | Grill |
| 6 | `le-petit-beur.html` | Le Petit Beur | Centre-ville | 05 37 73 13 22 | Marocain |
| 7 | `gardenia-agdal.html` | Gardenia | Agdal | 05 37 77 76 00 | Gastro |
| 8 | `la-cerveceria-agdal.html` | La Cervecería | Agdal | 05 37 67 56 77 | Tapas |
| 9 | `turkit-agdal.html` | Turkit | Agdal | 05 37 77 61 88 | Turc |
| 10 | `coq-magic-agdal.html` | Coq Magic | Agdal | 05 37 77 77 78 | Grill |

## ⚡ 1 seul truc bach ykhdem : ra9m WhatsApp
F kol fichier, f `<script>`, bidel : `const WHATSAPP = "212XXXXXXXXX";` (212 + ra9m bla 0).

## 🚀 Partagi le lien
Upload l-fichier f [tiiny.site](https://tiiny.site) → khod le lien → sift-o l-resto f WhatsApp.

## ✏️ Personnalisi
- **Menu & prix** → dans le `<style>`/HTML (section "Le menu") — les prix sont des exemples.
- **Adresse / Téléphone / Horaires** → section *Infos & Accès*.
- **Google Maps** → l-`<iframe src="...output=embed">`.
- **Couleurs** → `:root { --primary: ... }`.

> 🛠️ **Générateur :** toutes les démos sont produites par `_generator.js`.
> Bach tzid resto jdid : zid wahed f l-array `RESTOS` (choisis `cuisine`:
> moroccan / italian / sushi / grill / tapas / turkish / gastro) w lance
> `node restaurants/_generator.js`.

## 📌 Note
Menu, prix et avis sont des **exemples** — à valider avec le restaurant avant mise en ligne.
