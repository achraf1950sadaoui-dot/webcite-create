# 🛠️ Tutoriel pas-à-pas : convertir le quiz C en page Web

Dans ce tuto tu vas **reconstruire** le jeu (mini-version) en HTML + CSS + JS,
en partant de zéro. À chaque étape : **ce qu'on fait**, **le code**, et **le lien
avec le C**.

> ✅ النتيجة النهائية موجودة فنفس الدossier: `index.html`, `style.css`, `script.js`.
> تبع الخطوات وكتب الكود بيدك — هكا غادي تفهم مزيان.

**Pour tester à tout moment :** ouvre `index.html` dans le navigateur
(ou clic-droit → *Open with Live Server* dans VS Code).

---

## Étape 0 — Créer les 3 fichiers

Fais un dossier (ex. `quiz-web`) et crée dedans 3 fichiers vides :

```
quiz-web/
├── index.html
├── style.css
└── script.js
```

> 🔁 En C : **1 seul** fichier `quiz.c`.
> En web : **3** fichiers (structure / déco / logique).

---

## Étape 1 — Le squelette HTML (les 3 écrans)

Dans `index.html`, on crée la page et **3 écrans** : départ, quiz, résultat.
Chaque écran est un `<div class="screen">`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ISMAGI Quiz — Tuto</title>
  <link rel="stylesheet" href="style.css" />   <!-- on branche le CSS -->
</head>
<body>

  <!-- Écran de départ -->
  <div id="screen-start" class="screen active">
    <h1>ISMAGI <span>Quiz</span></h1>
    <button id="btn-start">Start ▶</button>
  </div>

  <!-- Écran du quiz -->
  <div id="screen-quiz" class="screen">
    <div class="bar">
      <span id="counter">Question 1 / 3</span>
      <span id="score">Score: 0</span>
    </div>
    <h2 id="question">…</h2>
    <div id="options">
      <button class="option" data-i="0"></button>
      <button class="option" data-i="1"></button>
      <button class="option" data-i="2"></button>
      <button class="option" data-i="3"></button>
    </div>
  </div>

  <!-- Écran du résultat -->
  <div id="screen-result" class="screen">
    <h2>Résultat 🎉</h2>
    <p id="final-score">…</p>
    <button id="btn-restart">↩ Rejouer</button>
  </div>

  <script src="script.js"></script>   <!-- on branche le JS (à la fin) -->
</body>
</html>
```

> 🔁 En C, l'écran n'existe pas « à l'avance » : on le crée avec des `printf`.
> En web, **tous les écrans existent dans le HTML** ; on en montrera un seul à la fois.
> `id="..."` = une étiquette pour retrouver l'élément depuis le JS.

---

## Étape 2 — Un peu de CSS

Dans `style.css`. Le plus important : **un seul écran visible** grâce à la
classe `.active`.

```css
* { box-sizing: border-box; margin: 0; font-family: sans-serif; }
body { background:#0d0f1a; color:#e8eaf6; text-align:center; padding:40px 16px; }

/* La règle clé : caché par défaut, visible si .active */
.screen { display: none; }
.screen.active { display: block; }

h1 span { color:#6c63ff; }
button {
  font-size:1rem; padding:14px 22px; margin:6px; border:none;
  border-radius:10px; cursor:pointer; background:#1e2238; color:#e8eaf6;
}
#btn-start, #btn-restart { background:#6c63ff; color:#fff; font-weight:bold; }

.bar { display:flex; justify-content:space-between; max-width:520px; margin:0 auto; color:#7b83b0; }
#options { display:grid; grid-template-columns:1fr 1fr; gap:10px; max-width:520px; margin:0 auto; }
.option { text-align:left; min-height:60px; }

/* Couleurs des réponses = remplacent les couleurs ANSI du C */
.option.correct   { background:#22d3a0; color:#fff; }
.option.incorrect { background:#ff4d6d; color:#fff; }
```

> 🔁 En C : couleurs avec des codes ANSI (`\033[92m`).
> En web : **tout le style est en CSS**.

Teste : ouvre `index.html` → tu vois l'écran de départ. ✅

---

## Étape 3 — Les données (les questions) en JS

À partir d'ici, tout se passe dans `script.js`.
On convertit le tableau C en tableau d'objets JS.

```js
const QUESTIONS = [
  { q: "What does ISMAGI stand for?",
    options: ["Institut Supérieur de Management, d'Administration et de Génie Informatique",
              "International School of Management and AI",
              "Institute of Sport and Gaming",
              "Information System Modern Academy"],
    correct: 0 },
  { q: "ISMAGI is located in which country?",
    options: ["France", "Morocco", "Spain", "Algeria"],
    correct: 1 },
  { q: "ISMAGI is mainly focused on:",
    options: ["Medicine", "Engineering and Computer Science", "Art", "Agriculture"],
    correct: 1 }
];
```

> 🔁 En C :
> ```c
> { "ISMAGI is located in which country?",
>   {"France","Morocco","Spain","Algeria"}, 1 }
> ```
> Même chose, mais en JS pas besoin d'écrire les types.

---

## Étape 4 — L'état + changer d'écran

```js
// L'état du jeu (= les variables globales en C)
let current  = 0;       // question courante
let score    = 0;
let answered = false;   // a-t-on déjà répondu ?

// Raccourcis vers les éléments HTML
const screens       = document.querySelectorAll('.screen');
const optionButtons = document.querySelectorAll('.option');

// Montrer un écran (et cacher les autres)
function showScreen(id) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}
```

> 🔁 En C : `system("clear")` puis on réimprime l'écran voulu.
> En web : `showScreen('quiz')` enlève `.active` partout et le met sur le bon `<div>`.

---

## Étape 5 — Afficher une question

C'est ici qu'on remplace les `printf` de la question.

```js
function loadQuestion() {
  answered = false;
  const item = QUESTIONS[current];

  document.getElementById('counter').textContent  = "Question " + (current + 1) + " / " + QUESTIONS.length;
  document.getElementById('score').textContent    = "Score: " + score;
  document.getElementById('question').textContent = item.q;   // <- printf de l'énoncé

  optionButtons.forEach((btn, i) => {
    btn.textContent = item.options[i];   // <- printf des options
    btn.className = 'option';            // reset des couleurs
  });
}
```

> 🔁 En C :
> ```c
> printf("%s\n", q->q);
> for (int o=0;o<4;o++) printf(" %c) %s\n", 'A'+o, q->options[o]);
> ```
> `printf(...)` ➜ `element.textContent = ...`.

---

## Étape 6 — Répondre (le clic)

**Le cœur de la conversion.** En C on **attend** la saisie ; en web on **réagit**
au clic. On branche `onclick` sur chaque bouton **une seule fois** :

```js
optionButtons.forEach(btn => {
  btn.onclick = () => {
    if (answered) return;             // on ne répond qu'une fois
    answered = true;

    const i = Number(btn.dataset.i);  // numéro du bouton cliqué (0..3)
    const item = QUESTIONS[current];

    if (i === item.correct) {         // == if (ans == q->correct) en C
      btn.classList.add('correct');
      score++;
    } else {
      btn.classList.add('incorrect');
      optionButtons[item.correct].classList.add('correct'); // montrer la bonne
    }

    setTimeout(nextQuestion, 1000);   // avancer après 1 s
  };
});
```

> 🔁 En C :
> ```c
> int ans = readAnswer();           // le programme S'ARRÊTE ici et attend
> if (ans == q->correct) score++;
> ```
> En web, le code ne s'arrête pas : la fonction `() => {...}` sera appelée
> **par le navigateur** quand on clique. C'est ça l'« événementiel ».

---

## Étape 7 — Question suivante (la boucle)

```js
function nextQuestion() {
  current++;
  if (current >= QUESTIONS.length) endQuiz();   // plus de questions
  else loadQuestion();                          // sinon : la suivante
}
```

> 🔁 En C, la boucle `for (i=0; i<3; i++)` avançait toute seule.
> En web, il n'y a pas de boucle qui attend : on avance **à la main** après
> chaque réponse. La boucle devient une chaîne :
> `loadQuestion → (clic) → nextQuestion → loadQuestion …`

---

## Étape 8 — La fin + le résultat

```js
function endQuiz() {
  document.getElementById('final-score').textContent =
    "Score: " + score + " / " + QUESTIONS.length;
  showScreen('result');
}
```

> 🔁 = `showResult()` en C (on affiche le score final et on change d'écran).

---

## Étape 9 — Les boutons Start / Rejouer

```js
function startQuiz() {
  current = 0;
  score = 0;
  loadQuestion();
  showScreen('quiz');
}
document.getElementById('btn-start').onclick   = startQuiz;
document.getElementById('btn-restart').onclick = startQuiz;
```

> 🔁 En C : la fonction `main()` lançait le jeu. Ici, c'est le **clic sur Start**
> qui démarre `loadQuestion()` et affiche l'écran du quiz.

---

## Étape 10 — Tester 🎮

1. Ouvre `index.html` dans le navigateur.
2. Clique **Start** → réponds aux 3 questions → écran **Résultat** → **Rejouer**.

✅ Tu viens de convertir un programme C console en application web !

### Pour aller plus loin (comme la grande version)
- 🌍 **Plusieurs langues** → un objet `T = { en:{...}, fr:{...}, ar:{...} }` + un écran de choix.
- 🪜 **Niveaux** (easy/medium/hard) + déverrouillage → comme `state.unlocked` du jeu complet.
- ⏱️ **Minuteur** → `setInterval(() => { timeLeft--; ... }, 1000)`.
- 🔊 **Sons** → Web Audio API.
- 💾 **Sauvegarde** → `localStorage.setItem(...)`.

> 👉 Compare ce mini-jeu avec le jeu complet (`../script.js`) pour voir comment
> on ajoute chaque fonctionnalité. Et relis `../GUIDE-C-vers-WEB.md` pour la
> correspondance détaillée C ↔ Web.

---

### 🧠 La phrase à retenir
> La **logique** est la même qu'en C. Ce qui change : on passe d'un programme
> **séquentiel** (affiche → attend) à une interface **événementielle**
> (affiche tout → réagit aux clics).
