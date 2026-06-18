/* ============================================================
   1) LES DONNÉES
   Converties depuis le tableau C : QUESTIONS[...] = { ... }
   En C : struct { const char *q; const char *options[4]; int correct; }
   En JS : un objet { q:"...", options:[...], correct:0 }
============================================================ */
const QUESTIONS = [
  { q: "What does ISMAGI stand for?",
    options: ["Institute of Science Mathematics and Applied Computer Science",
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

/* ============================================================
   2) L'ÉTAT DU JEU  (comme les variables globales en C)
   En C : int current; int score; ...
============================================================ */
let current  = 0;       // index de la question courante
let score    = 0;       // score
let answered = false;   // a-t-on déjà répondu à cette question ?

/* ============================================================
   3) RACCOURCIS vers les éléments HTML
============================================================ */
const screens       = document.querySelectorAll('.screen');
const optionButtons = document.querySelectorAll('.option');

/* ============================================================
   4) CHANGER D'ÉCRAN   (remplace system("clear") + réimpression)
============================================================ */
function showScreen(id) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}

/* ============================================================
   5) AFFICHER UNE QUESTION   (remplace les printf de la question)
============================================================ */
function loadQuestion() {
  answered = false;
  const item = QUESTIONS[current];

  document.getElementById('counter').textContent  = "Question " + (current + 1) + " / " + QUESTIONS.length;
  document.getElementById('score').textContent    = "Score: " + score;
  document.getElementById('question').textContent = item.q;

  optionButtons.forEach((btn, i) => {
    btn.textContent = item.options[i];
    btn.className = 'option';   // enlève les couleurs de la question précédente
  });
}

/* ============================================================
   6) RÉPONDRE   (remplace readAnswer() + la vérification)
   En C on ATTEND la saisie ; ici on RÉAGIT au clic.
============================================================ */
optionButtons.forEach(btn => {
  btn.onclick = () => {
    if (answered) return;            // on ne répond qu'une fois
    answered = true;

    const i = Number(btn.dataset.i); // quel bouton ? (0..3)
    const item = QUESTIONS[current];

    if (i === item.correct) {        // if (ans == q->correct) en C
      btn.classList.add('correct');
      score++;
    } else {
      btn.classList.add('incorrect');
      optionButtons[item.correct].classList.add('correct'); // montrer la bonne
    }

    setTimeout(nextQuestion, 1000);  // passer à la suite après 1 seconde
  };
});

/* ============================================================
   7) QUESTION SUIVANTE   (remplace la boucle for + i++)
============================================================ */
function nextQuestion() {
  current++;
  if (current >= QUESTIONS.length) endQuiz();   // plus de questions
  else loadQuestion();
}

/* ============================================================
   8) FIN DU QUIZ   (remplace showResult en C)
============================================================ */
function endQuiz() {
  document.getElementById('final-score').textContent =
    "Score: " + score + " / " + QUESTIONS.length;
  showScreen('result');
}

/* ============================================================
   9) BOUTONS Start / Rejouer
============================================================ */
function startQuiz() {
  current = 0;
  score = 0;
  loadQuestion();
  showScreen('quiz');
}
document.getElementById('btn-start').onclick   = startQuiz;
document.getElementById('btn-restart').onclick = startQuiz;
