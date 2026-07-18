# Démos — Location de voitures (Rabat)

Démos pour agences de location de voitures **sans site web**. Kol wahed ملف HTML
واحد مستقل : flotte (catégories + prix), **réservation par dates qui part sur
WhatsApp** (lieu, départ, retour, catégorie), avis, Google Maps.

| # | Fichier | Agence | Quartier | Téléphone |
|---|---|---|---|---|
| 1 | `ste-gold-car.html` | Ste Gold Car | Agdal | 06 99 24 36 08 |
| 2 | `too-much-cars.html` | Too Much Cars | Nahda | 06 61 79 59 40 |
| 3 | `drive-for-luxury.html` | Drive for Luxury (premium) | Rabat | 07 07 19 10 99 |
| 4 | `amstel-car.html` | Amstel Car | Rabat | 06 64 77 13 71 |
| 5 | `irak-car.html` | Irak Car | Agdal | 06 61 43 87 87 |
| 6 | `ks-location-voiture.html` | KS Location Voiture | Aéroport Rabat-Salé | 06 67 69 66 14 |
| 7 | `croisiere-car.html` | Croisière Car | Agdal | 05 37 69 70 69 |
| 8 | `rayino-car.html` | Rayino Car | Rabat | à compléter (Insta) |

## ⚡ Bach ykhdem
Le numéro WhatsApp (`212661370031`) est déjà activé. Pour changer : `const WHATSAPP` en haut du `<script>`, ou dans `_generator.js`.

## 🚀 Déploiement
Upload le fichier sur [tiiny.site](https://tiiny.site) / Netlify → tu obtiens un lien à envoyer à l'agence.

## ✏️ Personnalisi
- **Flotte & prix** → section "Notre flotte" (les prix sont des exemples).
- **Adresse / Téléphone / Horaires** → section *Contact & Accès*.
- **Google Maps** → `<iframe ... output=embed>`.
- **Couleurs** → `:root { --primary: ... }`.

> 🛠️ **Générateur :** `node location-voiture/_generator.js`. Zid une agence f l-array `AGENCES` w 3awd t-lance.

## 📌 Note
Flotte, prix et avis sont des **exemples** — à valider avec l'agence. ⚠️ Vérifie sur Google que l'agence n'a pas déjà un site avant de démarcher (beaucoup en ont un).
