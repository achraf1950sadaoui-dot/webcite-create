# ISMAGI Quiz Game 🎓

Jeu de quiz (multi-langues : 🇬🇧 English · 🇫🇷 Français · 🇲🇦 العربية) 3la ISMAGI.
3 niveaux (Easy / Medium / Hard), timer, score, étoiles, w sauvegarde
dyal l-progrès f `localStorage`.

> **Note :** had l-projet (project dyal medrassa) séparé 3la TAWAKULL li
> f la racine d repo. Kaytkhdem b wahdo f had dossier `quiz-game/`.

---

## 📁 Structure d les fichiers

```
quiz-game/
├── index.html   ← structure d les écrans (langue, login, niveaux, quiz, résultat)
├── styles.css   ← kol l-design / couleurs / animations
└── script.js    ← logique : questions, traductions, timer, score, sauvegarde
```

Bdel l-HTML wahdo? `index.html`. Bdel l-couleurs? Variables CSS f l-loul
d `styles.css` (`:root { … }`). Zid/bdel les questions? `QUESTIONS` f
`script.js`. Zid/bdel les textes d les langues? `T` f `script.js`.

---

## ▶️ Kifach t-lance l-jeu

Hadi static site (HTML + CSS + JS, **bla build, bla npm**). 3andek 2 ṭ-ṭro9:

**1) B simplicité :** dير double-click 3la `index.html` → kayt7l f navigateur.

**2) F VS Code (recommandé) :** b extension **Live Server** :
1. Ḥet l-extension *Live Server* (Ritwick Dey) f VS Code.
2. Clic-droit 3la `index.html` → **Open with Live Server**.
3. Kayt7l 3la `http://127.0.0.1:5500/quiz-game/` w kayt-reload automatique
   mnin t-sauvegardi ay fichier.

> Audio (les sons) khassu interaction d l-user (click) bach ykhdem — 3adi.

---

## ✏️ Bach t-bdel les questions

F `script.js`, l-objet `QUESTIONS` fih 3 langues × 3 niveaux. Kol question :

```js
{ q: "Texte d su'al?", options: ["A","B","C","D"], correct: 0 }
```

`correct` = index d jawab ṣaḥiḥ (0 = A, 1 = B, 2 = C, 3 = D).
⚠️ Khellik kayn nefs 3adad d les questions f kol langue bach ma yṭra7ch bug.

---

## 🛠️ Tech

- HTML + CSS + JavaScript (vanilla, bla framework).
- Google Fonts : Outfit · Space Mono · Cairo (3la l-3arabiya).
- Web Audio API l les effets sonores.
- `localStorage` bach yssjjel l-username w l-progrès.
