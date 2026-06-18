# 🔄 Guide : du C (console) au Web (HTML + CSS + JS)

Ce guide compare **`c-version/quiz.c`** (le programme C) avec **`script.js`**
(la logique web), **section par section**, pour comprendre comment convertir
un programme C en application web.

> 💡 طريقة الاستعمال: حل `quiz.c` و `script.js` فـ VS Code، وتبع هاد الجدول.

---

## 0. L'idée la plus importante ⚡

| | C (console) | Web (HTML/CSS/JS) |
|---|---|---|
| **Fichiers** | 1 fichier `quiz.c` | 3 fichiers : `index.html` + `styles.css` + `script.js` |
| **Rôle** | tout (logique + affichage) | HTML = structure · CSS = déco · JS = logique |
| **Affichage** | `printf` dans le terminal | modifier le **DOM** (les éléments HTML) |
| **Saisie** | `scanf` / `fgets` (on attend) | **événements** : clic sur un bouton |
| **Déroulement** | **séquentiel** : ligne après ligne | **événementiel** : on réagit aux clics |

👉 **C** = « affiche ➜ attends la saisie ➜ continue » (ça bloque).
👉 **Web** = « affiche toute l'interface ➜ réagis quand l'utilisateur clique ».

C'est LE changement de mentalité. Tout le reste découle de ça.

---

## 1. Les données (questions) — *presque identiques*

**C** — une `struct` + un tableau à 3 dimensions `[langue][niveau][question]` :
```c
typedef struct {
    const char *q;                    // l'énoncé
    const char *options[NUM_OPTIONS]; // 4 choix
    int         correct;              // index 0..3 de la bonne réponse
} Question;

// ...
{"ISMAGI is located in which country?",
  {"France","Morocco","Spain","Algeria"}, 1},   // 1 = "Morocco"
```

**JS** — un objet `{}` + des tableaux `[]` (pas besoin de déclarer les types) :
```js
const QUESTIONS = {
  en: {
    easy: [
      { q:"ISMAGI is located in which country?",
        options:["France","Morocco","Spain","Algeria"], correct:1 },
      // ...
    ]
  }
};
```

➡️ **La même structure de données.** En C on déclare les types (`const char *`,
`int`), en JS non. En C on indexe par nombre (`[0]`), en JS on peut indexer par
nom (`QUESTIONS.en.easy`).

---

## 2. L'état du jeu (les variables globales)

**C** — variables globales typées :
```c
static int  g_lang = 0;
static char g_user[64] = "Player";
static int  g_unlocked[NUM_LEVELS]  = {1, 0, 0};
static int  g_completed[NUM_LEVELS] = {0, 0, 0};
static int  g_totalScore = 0;
```

**JS** — un seul objet `state` :
```js
let state = {
  username:"", totalScore:0, currentLevel:"easy",
  currentQ:0, score:0,
  unlocked:{ easy:true, medium:false, hard:false },
  completed:{ easy:false, medium:false, hard:false }
};
```

➡️ Même idée. `g_unlocked[0]=1` (C) ≈ `state.unlocked.easy=true` (JS).

---

## 3. Changer d'écran : `clear` ➜ classes CSS

**C** — on **efface** le terminal et on **réimprime** tout :
```c
static void clearScreen(void){ int r = system(CLEAR_CMD); (void)r; }
// puis on re-printf l'écran voulu
```

**JS** — les écrans existent déjà en HTML ; on **montre/cache** avec une classe :
```js
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}
```
```css
.screen        { opacity:0; pointer-events:none; }   /* caché */
.screen.active { opacity:1; pointer-events:all;  }   /* visible */
```

➡️ En C l'écran est **éphémère** (on réimprime). En web les écrans sont des
`<div>` permanents qu'on **affiche ou masque**.

---

## 4. La saisie : `readAnswer()` ➜ clic sur bouton

**C** — on **attend** que l'utilisateur tape une lettre, puis on vérifie :
```c
int ans = readAnswer();              // bloque jusqu'à la saisie
if (ans == q->correct) { score++; }
```

**JS** — on **prépare** les boutons, puis le code « dort » jusqu'au clic :
```js
document.querySelectorAll('.option-btn').forEach((btn, i) => {
  btn.textContent = q.options[i];
  btn.onclick = () => selectAnswer(i);   // <- ça s'exécutera AU CLIC
});

function selectAnswer(index){
  const q = QUESTIONS[lang][state.currentLevel][state.currentQ];
  if (index === q.correct) state.score++;
  // ...
}
```

➡️ **Le point clé.** En C, `readAnswer()` arrête le programme et attend.
En web, on **branche** une fonction sur l'événement `onclick` et on rend la
main ; le navigateur appellera `selectAnswer(i)` quand on clique.

---

## 5. La boucle des questions

**C** — une boucle `for` qui avance toute seule :
```c
for (int i = 0; i < Q_PER_LEVEL; i++){
    const Question *q = &QUESTIONS[g_lang][level][i];
    // afficher la question + options
    int ans = readAnswer();           // attendre
    if (ans == q->correct) score++;   // vérifier
}                                     // i++ et on recommence
return score;
```

**JS** — pas de boucle qui attend : on **avance à la main** après chaque clic :
```js
function loadQuestion(){            // afficher la question courante
  const q = QUESTIONS[lang][state.currentLevel][state.currentQ];
  document.getElementById('question-text').textContent = q.q;
  // brancher les boutons (voir §4)
}
function selectAnswer(index){      // au clic : vérifier...
  if (index === q.correct) state.score++;
  setTimeout(nextQ, 1100);         // ...puis avancer
}
function nextQ(){
  state.currentQ++;
  if (state.currentQ >= 3) endLevel();   // fini
  else loadQuestion();                   // sinon question suivante
}
```

➡️ La boucle `for` du C devient une **chaîne** :
`loadQuestion → (clic) selectAnswer → nextQ → loadQuestion …`

---

## 6. Score, réussite, déverrouillage — *logique identique*

**C :**
```c
if (passed){                                   // passed = (score >= 2)
    g_completed[level] = 1;
    if (level + 1 < NUM_LEVELS) g_unlocked[level + 1] = 1;
}
```

**JS :**
```js
if (passed){                                   // passed = score >= 2
  state.completed[level] = true;
  if (level === 'easy')   state.unlocked.medium = true;
  if (level === 'medium') state.unlocked.hard   = true;
}
```

➡️ Exactement la même règle (`if`, comparaisons). Seule la façon de nommer les
niveaux change (nombre `0,1,2` en C ↔ texte `'easy','medium','hard'` en JS).

---

## 7. Les étoiles ⭐

**C** — on imprime des caractères :
```c
int stars = (score * 3 + total / 2) / total;   // arrondi 0..3
for (int s = 0; s < stars; s++) printf("* ");
```

**JS** — on remplit le texte d'un élément :
```js
const stars = Math.round((score/total)*3);
document.getElementById('result-stars').textContent =
    '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
```

➡️ Même calcul. En JS, `Math.round()` et `"x".repeat(n)` existent déjà ;
en C on fait l'arrondi à la main avec des entiers.

---

## 8. Ce que le Web a EN PLUS (et que le C n'avait pas)

| Fonctionnalité | Web (JS) | En C il faudrait… |
|---|---|---|
| **Minuteur 10s** | `setInterval(..., 1000)` | du code POSIX (`alarm`/threads), compliqué |
| **Sons** | Web Audio API | une bibliothèque externe |
| **Animations / couleurs** | CSS | codes ANSI (limités) |
| **Sauvegarde** | `localStorage` | écrire/lire un **fichier** (`fopen`) |

Exemple du minuteur (web only) :
```js
state.timer = setInterval(() => {
  state.timeLeft--;
  if (state.timeLeft <= 0){ clearInterval(state.timer); timeUp(); }
}, 1000);
```
Et la sauvegarde :
```js
localStorage.setItem('iq_prog', JSON.stringify({
  unlocked: state.unlocked, completed: state.completed, totalScore: state.totalScore
}));
```

---

## 9. Recette : convertir un programme C en web (checklist)

1. **HTML** — crée un `<div class="screen">` pour chaque écran
   (langue, login, niveaux, quiz, résultat).
2. **Données** — copie les questions/traductions en objets/tableaux JS.
3. **État** — regroupe les variables globales dans un objet `state`.
4. **Logique** — réécris chaque fonction C en JS (la syntaxe `if/for/while`
   est quasi identique).
5. **Affichage** — remplace chaque `printf(...)` par
   `element.textContent = ...` (ou `.innerHTML`).
6. **Saisie** — remplace chaque `scanf`/`readAnswer` par un `<input>` /
   `<button onclick="...">` + une fonction.
7. **Écrans** — remplace `clear` + réimpression par `showScreen()` + classe CSS.
8. **Déco** — mets les couleurs/mise en page dans `styles.css`.
9. **Bonus** — ajoute timer (`setInterval`), sons, `localStorage`.

---

## 10. Aide-mémoire rapide

| Concept | C | JavaScript |
|---|---|---|
| Afficher | `printf("%s", x);` | `el.textContent = x;` |
| Lire | `fgets(buf, n, stdin);` | `input.value` / clic |
| Condition | `if (a == b)` | `if (a === b)` |
| Boucle | `for (int i=0;i<n;i++)` | `for (let i=0;i<n;i++)` ou `.forEach()` |
| Tableau | `int t[3];` | `let t = [];` |
| Struct / objet | `struct {...}` | `{ clé: valeur }` |
| Fonction | `int f(int x){...}` | `function f(x){...}` |
| Texte | `const char *` | `"..."` (string) |
| Vrai/Faux | `1` / `0` | `true` / `false` |

---

### 📌 En résumé
La **logique** (questions, score, niveaux, règles) est **la même** des deux côtés
— c'est juste écrit différemment. Ce qui change vraiment, c'est :
**console séquentielle** (C) ➜ **interface événementielle** (Web).
