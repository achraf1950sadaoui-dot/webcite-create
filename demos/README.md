# Démos — Cabinets dentaires (Rabat)

3 sites de démonstration, prêts à envoyer aux prospects. Kol wahed **ملف HTML
واحد مستقل** (bla build, bla dépendances) — tقدر تـouvri ay wahed f navigateur
directement, wla tـdéployih.

| # | Fichier | Cabinet | Téléphone | Thème |
|---|---|---|---|---|
| 1 | `centre-dentaire-souissi.html` | Centre Dentaire Souissi | 05 37 75 74 74 | Turquoise |
| 2 | `cabinet-dr-driss-bhija.html` | Dr Driss Bhija | 05 37 73 66 71 | Navy / gold |
| – | `centre-dentaire-agdal.html` | Centre Dentaire Agdal | (Facebook) | Vert menthe |
| 3 | `centre-dentaire-zrarqi.html` | Centre Dentaire Zrarqi | 05 37 70 98 36 | Bleu |
| 4 | `abdedine-dental-clinic.html` | Abdedine Dental Clinic | 05 37 67 46 16 | Cyan |
| 5 | `dr-mrani-alaoui-aziz.html` | Dr Mrani Alaoui Aziz (ortho) | 05 37 67 03 98 | Violet |
| 6 | `dr-mahmoud-abdelhamid.html` | Dr Mahmoud Abdelhamid | 05 37 72 44 11 | Émeraude |
| 7 | `dr-cherkaoui-deqaqi-idriss.html` | Dr Cherkaoui Deqaqi Idriss | 05 37 73 13 83 | Indigo |
| 8 | `dr-lboukili-laila.html` | Dr Lboukili Laïla (paro/implanto) | 05 37 67 33 90 | Rose |
| 9 | `dr-abdelkader-bennani.html` | Dr Abdelkader Bennani | 05 37 69 06 32 | Sarcelle |
| 10 | `dr-alaoui-youssef.html` | Dr Alaoui Youssef | 05 37 20 48 94 | Bleu roi |
| 11 | `dr-elouadghiri-elidrissi.html` | Dr ElOuadghiri ElIdrissi | 05 37 77 70 42 | Bleu ciel |
| 12 | `centre-dentaire-agdal-smile.html` | Centre Dentaire Agdal Smile | 05 37 68 39 39 | Magenta |
| 13 | `dr-adil-walali-loudiyi.html` | Dr Adil Walali Loudiyi (ortho) | 05 37 67 12 16 | Violet |
| 14 | `dr-mohammed-himmiche.html` | Dr Mohammed Himmiche | 05 37 67 28 55 | Vert |
| 15 | `dr-hind-lahrizi.html` | Dr Hind Lahrizi | 05 37 20 40 15 | Cyan foncé |
| 16 | `cabinet-dentaire-al-massira.html` | Cabinet Dentaire Al Massira | 05 37 29 44 44 | Indigo |
| 17 | `cabinet-dentaire-ibn-sina.html` | Cabinet Dentaire Ibn Sina | 05 37 73 65 48 | Sarcelle |
| 18 | `cabinet-dentaire-ghandi.html` | Cabinet Dentaire Ghandi (paro) | 05 37 26 30 26 | Bordeaux |
| 19 | `cabinet-parodontologie-agdal.html` | Cabinet Parodontologie Agdal | 05 37 77 51 87 | Vert forêt |
| 20 | `cabinet-dentaire-pediatrique.html` | Cabinet Dentaire Pédiatrique | 05 37 70 50 40 | Bleu enfant |

> 🛠️ **Générateur :** les démos #3→#10 sont produites par `_generator.js`.
> Bach tzid cabinet jdid : zid wahed f l-array `CABINETS` w lance `node demos/_generator.js`.

---

## ⚡ 1 seul truc bach ykhdem : ra9m WhatsApp

F kol fichier, l-fou9 f `<script>`, bidel had l-ligne :

```js
const WHATSAPP = "212XXXXXXXXX";   // 212 + ra9m bla 0
```

**Mثal :** ra9m `0661234567` → ولّي `212661234567`.

> 💡 **F le démo** : 7ot ra9m **DYALEK**. Mli le dentiste y-jerreb "Prendre RDV",
> la demande katji f WhatsApp dyalek → kat-prouvi le système **w** kat-jib-lek
> le lead. Mli y-chri, bدّل l-ra9m dyalo.

---

## 🚀 2) Bach tـpartagi le lien (tiiny.site)

1. Sir l-[tiiny.site](https://tiiny.site).
2. Upload **fichier HTML wahed** (مثلا `centre-dentaire-souissi.html`).
3. Khod le lien (ex: `https://xxx.tiiny.site`) → **سيفطو f WhatsApp** l-dentiste.
4. 3awd nefs l-7aja l-kol démo (3 uploads = 3 liens).

**Hébergeurs أخرى :** Netlify (drag & drop), Vercel, GitHub Pages.

---

## ✏️ 3) Bach tـpersonnalisi kثر (optionnel)

Ka-tqdr tـbدّل directement f l-fichier (cherche b Ctrl+F) :

- **Adresse / Téléphone / Horaires** → section *Infos pratiques*.
- **Google Maps** → l-`<iframe src="...output=embed">`, بدّل `q=...` b l-adresse.
- **Avis** → ⚠️ بدّلهم b avis **7A9I9IYIN** (Google) — 3omrek matkdeb.
- **Couleurs** → f `:root { --primary: ... }` f le `<style>`.
- **Teswir** → had design khedam bla teswir, walakin tقدر تزيد ديال l-cabinet.

---

## 📌 Note
Hadو **démos** — l-contenu (chiffres, avis, horaires) خاص يتأكد/يتبدل m3a
l-cabinet 7a9i9i قبل ما يولي رسمي.
