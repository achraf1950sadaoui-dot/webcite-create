/* ============================================================================
 *  ISMAGI QUIZ GAME  —  version console en langage C
 *  ----------------------------------------------------------------------------
 *  Conversion du jeu web (HTML/CSS/JS) vers un programme C en ligne de commande.
 *
 *  Compilation :  gcc quiz.c -o quiz
 *  Exécution   :  ./quiz            (Linux / macOS)
 *                 quiz.exe          (Windows)
 *
 *  Fonctionnalités reprises du jeu web :
 *    - 3 langues : English / Français / العربية
 *    - 3 niveaux : Facile / Moyen / Difficile  (déverrouillage progressif)
 *    - 3 questions par niveau, 4 choix (A, B, C, D)
 *    - Score, étoiles, messages de résultat, condition de réussite (>= 2/3)
 *    - Rejouer / Niveau suivant / Retour aux niveaux / Quitter
 *
 *  Non repris (impossibles en console standard) : minuteur animé, sons,
 *  animations, dégradés. L'affichage de l'arabe dépend du terminal (UTF-8).
 * ==========================================================================*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* ---- Sur Windows : activer l'UTF-8 et les couleurs ANSI (Windows 10+) ---- */
#ifdef _WIN32
  #include <windows.h>
  static void initConsole(void){
      SetConsoleOutputCP(CP_UTF8);
      HANDLE h = GetStdHandle(STD_OUTPUT_HANDLE);
      DWORD mode;
      if (GetConsoleMode(h, &mode))
          SetConsoleMode(h, mode | 0x0004 /* ENABLE_VIRTUAL_TERMINAL_PROCESSING */);
  }
  #define CLEAR_CMD "cls"
#else
  static void initConsole(void){}
  #define CLEAR_CMD "clear"
#endif

/* ---- Couleurs ANSI ---- */
#define C_RESET  "\033[0m"
#define C_ACCENT "\033[95m"
#define C_GREEN  "\033[92m"
#define C_RED    "\033[91m"
#define C_YELLOW "\033[93m"
#define C_DIM    "\033[90m"
#define C_BOLD   "\033[1m"

/* ---- Constantes du jeu ---- */
#define NUM_LANGS    3
#define NUM_LEVELS   3
#define Q_PER_LEVEL  3
#define NUM_OPTIONS  4
#define PASS_SCORE   2   /* score minimum pour réussir un niveau */

/* Actions renvoyées par l'écran de résultat */
enum { ACT_RETRY, ACT_NEXT, ACT_LEVELS, ACT_QUIT };

/* ============================================================================
 *  STRUCTURES
 * ==========================================================================*/
typedef struct {
    const char *q;
    const char *options[NUM_OPTIONS];
    int         correct;            /* index 0..3 de la bonne réponse */
} Question;

typedef struct {
    const char *name;               /* nom dans le menu de langue */
    const char *chooseLevel;
    const char *levelNames[NUM_LEVELS];
    const char *enterName;
    const char *locked;
    const char *statusLocked, *statusOpen, *statusDone;
    const char *questionWord;
    const char *correctMsg;
    const char *wrongMsg;
    const char *correctAnswerWord;
    const char *scoreWord;
    const char *passMsg;
    const char *failMsg;
    const char *unlockedMsg;
    const char *allDone;
    const char *resultTitles[3];    /* bad, ok, great */
    const char *resultMsgs[3];
    const char *menuRetry, *menuNext, *menuLevels, *menuQuit;
    const char *promptAnswer, *promptChoice;
    const char *invalid, *contMsg, *thanks;
} Lang;

/* ============================================================================
 *  TEXTES (3 langues)
 * ==========================================================================*/
static const Lang LANGS[NUM_LANGS] = {
  /* ---------- EN ---------- */
  {
    .name="English", .chooseLevel="Choose Your Level",
    .levelNames={"Easy","Medium","Hard"},
    .enterName="Enter your username",
    .locked="This level is locked! Pass the previous level first.",
    .statusLocked="LOCKED", .statusOpen="PLAY", .statusDone="DONE",
    .questionWord="Question",
    .correctMsg="Correct!", .wrongMsg="Wrong!",
    .correctAnswerWord="Correct answer:",
    .scoreWord="Score",
    .passMsg="Level passed!",
    .failMsg="You need at least 2 correct answers to pass. Try again!",
    .unlockedMsg="Next level unlocked!",
    .allDone="All levels completed! You are an ISMAGI expert!",
    .resultTitles={"Keep Going!","Good Job!","Excellent!"},
    .resultMsgs={"Practice makes perfect. Try again!",
                 "Nice work - you're getting there!",
                 "Outstanding knowledge of ISMAGI!"},
    .menuRetry="Retry this level", .menuNext="Next level",
    .menuLevels="Back to levels", .menuQuit="Quit",
    .promptAnswer="Your answer (A-D)", .promptChoice="Your choice",
    .invalid="Invalid choice, try again.",
    .contMsg="Press Enter to continue...", .thanks="Thanks for playing"
  },
  /* ---------- FR ---------- */
  {
    .name="Français", .chooseLevel="Choisissez votre niveau",
    .levelNames={"Facile","Moyen","Difficile"},
    .enterName="Entrez votre pseudo",
    .locked="Niveau verrouille ! Reussissez d'abord le niveau precedent.",
    .statusLocked="VERROUILLE", .statusOpen="JOUER", .statusDone="TERMINE",
    .questionWord="Question",
    .correctMsg="Correct !", .wrongMsg="Faux !",
    .correctAnswerWord="Bonne reponse :",
    .scoreWord="Score",
    .passMsg="Niveau reussi !",
    .failMsg="Il faut au moins 2 bonnes reponses pour reussir. Reessayez !",
    .unlockedMsg="Niveau suivant debloque !",
    .allDone="Tous les niveaux termines ! Tu connais ISMAGI par coeur !",
    .resultTitles={"Courage !","Bien joue !","Excellent !"},
    .resultMsgs={"Entraine-toi encore, tu vas y arriver !",
                 "Tu progresses, continue comme ca !",
                 "Tu connais ISMAGI sur le bout des doigts !"},
    .menuRetry="Rejouer ce niveau", .menuNext="Niveau suivant",
    .menuLevels="Retour aux niveaux", .menuQuit="Quitter",
    .promptAnswer="Votre reponse (A-D)", .promptChoice="Votre choix",
    .invalid="Choix invalide, reessayez.",
    .contMsg="Appuyez sur Entree pour continuer...", .thanks="Merci d'avoir joue"
  },
  /* ---------- AR ---------- */
  {
    .name="العربية", .chooseLevel="اختر مستواك",
    .levelNames={"سهل","متوسط","صعب"},
    .enterName="أدخل اسمك",
    .locked="هذا المستوى مقفل! اجتز المستوى السابق أولاً.",
    .statusLocked="مقفل", .statusOpen="العب", .statusDone="منجز",
    .questionWord="سؤال",
    .correctMsg="إجابة صحيحة!", .wrongMsg="إجابة خاطئة!",
    .correctAnswerWord="الإجابة الصحيحة:",
    .scoreWord="النتيجة",
    .passMsg="نجحت في المستوى!",
    .failMsg="تحتاج إلى إجابتين صحيحتين على الأقل للنجاح. حاول مجدداً!",
    .unlockedMsg="تم فتح المستوى التالي!",
    .allDone="أنهيت جميع المستويات! أنت خبير في ISMAGI!",
    .resultTitles={"استمر!","عمل جيد!","ممتاز!"},
    .resultMsgs={"التدريب يصنع الإتقان، حاول مجدداً!",
                 "أحسنت، واصل التقدم!",
                 "معرفتك بـ ISMAGI رائعة!"},
    .menuRetry="إعادة هذا المستوى", .menuNext="المستوى التالي",
    .menuLevels="العودة للمستويات", .menuQuit="خروج",
    .promptAnswer="إجابتك (A-D)", .promptChoice="اختيارك",
    .invalid="اختيار غير صالح، حاول مجدداً.",
    .contMsg="اضغط Enter للمتابعة...", .thanks="شكراً على اللعب"
  }
};

/* ============================================================================
 *  QUESTIONS  [langue][niveau][question]
 * ==========================================================================*/
static const Question QUESTIONS[NUM_LANGS][NUM_LEVELS][Q_PER_LEVEL] = {
  /* ===================== EN ===================== */
  {
    { /* easy */
      {"What does ISMAGI stand for?",
        {"Institute of Science Mathematics and Applied Computer Science",
         "International School of Management and AI",
         "Institute of Sport and Gaming",
         "Information System Modern Academy"}, 0},
      {"ISMAGI is located in which country?",
        {"France","Morocco","Spain","Algeria"}, 1},
      {"ISMAGI is mainly focused on:",
        {"Medicine","Engineering and Computer Science","Art","Agriculture"}, 1}
    },
    { /* medium */
      {"Which field is strongly taught at ISMAGI?",
        {"Computer Science","Literature","Law","Music"}, 0},
      {"ISMAGI prepares students mainly for:",
        {"Sports careers","IT and engineering careers","Farming jobs","Fashion design"}, 1},
      {"What level of studies is ISMAGI associated with?",
        {"Primary school","Higher education","Kindergarten","Middle school"}, 1}
    },
    { /* hard */
      {"ISMAGI is part of which type of institution?",
        {"Private higher education institution","Primary school","High school","Training center only"}, 0},
      {"ISMAGI is related to:",
        {"Digital sciences and engineering","Cooking","Tourism only","Driving school"}, 0},
      {"Students at ISMAGI usually study:",
        {"Programming and networks","Painting only","Agriculture only","Sports only"}, 0}
    }
  },
  /* ===================== FR ===================== */
  {
    { /* easy */
      {"Que signifie ISMAGI ?",
        {"Institut des Sciences Mathematiques et Informatique Appliquee",
         "Ecole Internationale de Management et d'IA",
         "Institut du Sport et du Gaming",
         "Systeme d'Information Academique Moderne"}, 0},
      {"Dans quel pays se trouve ISMAGI ?",
        {"France","Maroc","Espagne","Algerie"}, 1},
      {"ISMAGI est principalement axe sur :",
        {"La medecine","L'ingenierie et l'informatique","Les arts","L'agriculture"}, 1}
    },
    { /* medium */
      {"Quel domaine est fortement enseigne a ISMAGI ?",
        {"L'informatique","La litterature","Le droit","La musique"}, 0},
      {"ISMAGI prepare les etudiants principalement pour :",
        {"Des carrieres sportives","Des carrieres en IT et ingenierie","Des emplois agricoles","La mode"}, 1},
      {"A quel niveau d'etudes ISMAGI est-il associe ?",
        {"Ecole primaire","Enseignement superieur","Maternelle","College"}, 1}
    },
    { /* hard */
      {"ISMAGI fait partie de quel type d'etablissement ?",
        {"Etablissement prive d'enseignement superieur","Ecole primaire","Lycee","Centre de formation uniquement"}, 0},
      {"ISMAGI est lie a :",
        {"Les sciences numeriques et l'ingenierie","La cuisine","Le tourisme uniquement","L'auto-ecole"}, 0},
      {"Les etudiants d'ISMAGI etudient generalement :",
        {"La programmation et les reseaux","La peinture uniquement","L'agriculture uniquement","Le sport uniquement"}, 0}
    }
  },
  /* ===================== AR ===================== */
  {
    { /* easy */
      {"ماذا يعني اختصار ISMAGI؟",
        {"معهد العلوم والرياضيات وعلوم الحاسوب التطبيقية",
         "المدرسة الدولية للإدارة والذكاء الاصطناعي",
         "معهد الرياضة والألعاب",
         "نظام المعلومات الأكاديمية الحديثة"}, 0},
      {"في أي دولة يقع ISMAGI؟",
        {"فرنسا","المغرب","إسبانيا","الجزائر"}, 1},
      {"يركز ISMAGI بشكل رئيسي على:",
        {"الطب","الهندسة وعلوم الحاسوب","الفنون","الزراعة"}, 1}
    },
    { /* medium */
      {"أي مجال يُدرَّس بشكل قوي في ISMAGI؟",
        {"علوم الحاسوب","الأدب","القانون","الموسيقى"}, 0},
      {"يُعِدّ ISMAGI الطلاب بشكل رئيسي لـ:",
        {"مسيرات رياضية","مسيرات في تكنولوجيا المعلومات والهندسة","وظائف زراعية","تصميم الأزياء"}, 1},
      {"بأي مستوى دراسي يرتبط ISMAGI؟",
        {"المدرسة الابتدائية","التعليم العالي","رياض الأطفال","المدرسة الإعدادية"}, 1}
    },
    { /* hard */
      {"ISMAGI جزء من أي نوع من المؤسسات؟",
        {"مؤسسة تعليم عالٍ خاصة","مدرسة ابتدائية","ثانوية","مركز تدريب فقط"}, 0},
      {"يرتبط ISMAGI بـ:",
        {"العلوم الرقمية والهندسة","الطهي","السياحة فقط","مدرسة تعليم قيادة"}, 0},
      {"يدرس طلاب ISMAGI عادةً:",
        {"البرمجة والشبكات","الرسم فقط","الزراعة فقط","الرياضة فقط"}, 0}
    }
  }
};

/* ============================================================================
 *  ÉTAT GLOBAL
 * ==========================================================================*/
static int  g_lang = 0;
static char g_user[64] = "Player";
static int  g_unlocked[NUM_LEVELS]  = {1, 0, 0};
static int  g_completed[NUM_LEVELS] = {0, 0, 0};
static int  g_totalScore = 0;

#define L() (&LANGS[g_lang])

/* ============================================================================
 *  OUTILS D'ENTRÉE / AFFICHAGE
 * ==========================================================================*/
static void clearScreen(void){ int r = system(CLEAR_CMD); (void)r; }

/* Lit une ligne complète sans déborder du tampon. */
static void readLine(char *buf, int size){
    if (fgets(buf, size, stdin) == NULL){ buf[0] = '\0'; return; }
    size_t n = strlen(buf);
    if (n > 0 && buf[n-1] == '\n') buf[n-1] = '\0';
}

/* Lit un entier saisi par l'utilisateur ; renvoie -1 si la saisie est invalide. */
static int readInt(void){
    char buf[64];
    printf("\n  %s: ", L()->promptChoice);
    readLine(buf, sizeof buf);
    char *p = buf;
    while (*p == ' ' || *p == '\t') p++;
    if (*p < '0' || *p > '9') return -1;
    return atoi(p);
}

/* Lit une réponse A-D (lettre ou chiffre 1-4) ; renvoie un index 0..3. */
static int readAnswer(void){
    char buf[64];
    for (;;){
        printf("  %s: ", L()->promptAnswer);
        readLine(buf, sizeof buf);
        char *p = buf;
        while (*p == ' ' || *p == '\t') p++;
        char c = *p;
        if (c >= '1' && c <= '4') return c - '1';
        if (c >= 'a' && c <= 'd') return c - 'a';
        if (c >= 'A' && c <= 'D') return c - 'A';
        printf(C_RED "  %s\n" C_RESET, L()->invalid);
    }
}

static void pauseEnter(void){
    char buf[16];
    printf("\n  " C_DIM "%s" C_RESET, L()->contMsg);
    readLine(buf, sizeof buf);
}

static void banner(void){
    printf("  " C_BOLD C_ACCENT "ISMAGI QUIZ" C_RESET "\n");
    printf(C_DIM "  ===========\n" C_RESET);
}

/* ============================================================================
 *  ÉCRANS
 * ==========================================================================*/
static void chooseLanguage(void){
    char buf[32];
    for (;;){
        clearScreen();
        printf(C_ACCENT C_BOLD "  ISMAGI QUIZ\n\n" C_RESET);
        printf("  Choose your language / Choisissez votre langue / اختر لغتك\n\n");
        printf("   1) English\n");
        printf("   2) Francais\n");
        printf("   3) %s\n", LANGS[2].name);   /* العربية */
        printf("\n  > ");
        readLine(buf, sizeof buf);
        char *p = buf; while (*p == ' ') p++;
        if (*p == '1'){ g_lang = 0; return; }
        if (*p == '2'){ g_lang = 1; return; }
        if (*p == '3'){ g_lang = 2; return; }
    }
}

static void askUsername(void){
    clearScreen();
    banner();
    printf("\n  %s: ", L()->enterName);
    readLine(g_user, sizeof g_user);
    if (g_user[0] == '\0') strcpy(g_user, "Player");
}

/* Affiche le menu des niveaux. Renvoie l'index choisi (0..2) ou -1 pour quitter. */
static int showLevelsMenu(void){
    for (;;){
        clearScreen();
        banner();
        printf("  %s%s%s   |   %s: %s%d%s\n\n",
               C_DIM, g_user, C_RESET,
               L()->scoreWord, C_YELLOW, g_totalScore, C_RESET);
        printf("  %s%s%s\n\n", C_BOLD, L()->chooseLevel, C_RESET);

        for (int i = 0; i < NUM_LEVELS; i++){
            const char *tag; const char *col;
            if (g_completed[i]){ tag = L()->statusDone;   col = C_GREEN;  }
            else if (g_unlocked[i]){ tag = L()->statusOpen; col = C_ACCENT; }
            else { tag = L()->statusLocked; col = C_DIM; }
            printf("   %d) %-12s %s[%s]%s\n", i + 1, L()->levelNames[i], col, tag, C_RESET);
        }
        printf("   %d) %s\n", NUM_LEVELS + 1, L()->menuQuit);

        int c = readInt();
        if (c >= 1 && c <= NUM_LEVELS){
            int idx = c - 1;
            if (!g_unlocked[idx]){
                printf(C_RED "\n  %s\n" C_RESET, L()->locked);
                pauseEnter();
                continue;
            }
            return idx;
        }
        if (c == NUM_LEVELS + 1) return -1;
        /* sinon : choix invalide -> on réaffiche le menu */
    }
}

/* Joue un niveau et renvoie le score obtenu (0..3). */
static int playLevel(int level){
    int score = 0;
    for (int i = 0; i < Q_PER_LEVEL; i++){
        const Question *q = &QUESTIONS[g_lang][level][i];
        clearScreen();
        banner();
        printf("  %s%s%s — %s\n", C_DIM, L()->levelNames[level], C_RESET, g_user);
        printf("  %s%s %d / %d%s    %s: %s%d%s\n\n",
               C_ACCENT, L()->questionWord, i + 1, Q_PER_LEVEL, C_RESET,
               L()->scoreWord, C_YELLOW, score, C_RESET);

        printf("  %s%s%s\n\n", C_BOLD, q->q, C_RESET);
        for (int o = 0; o < NUM_OPTIONS; o++)
            printf("     %c) %s\n", 'A' + o, q->options[o]);
        printf("\n");

        int ans = readAnswer();
        if (ans == q->correct){
            score++;
            printf(C_GREEN "\n  %s\n" C_RESET, L()->correctMsg);
        } else {
            printf(C_RED "\n  %s" C_RESET " %s %c) %s\n",
                   L()->wrongMsg, L()->correctAnswerWord,
                   'A' + q->correct, q->options[q->correct]);
        }
        pauseEnter();
    }
    return score;
}

/* Affiche le résultat et le menu de fin. Renvoie une action (ACT_*). */
static int showResult(int level, int score){
    int total  = Q_PER_LEVEL;
    int passed = (score >= PASS_SCORE);
    int tier   = (score >= 3) ? 2 : (score >= 2) ? 1 : 0;
    int stars  = (score * 3 + total / 2) / total;     /* arrondi 0..3 */

    if (passed){
        g_completed[level] = 1;
        if (level + 1 < NUM_LEVELS) g_unlocked[level + 1] = 1;
    }
    g_totalScore += score;

    clearScreen();
    banner();
    printf("\n  %s%s%s\n", C_BOLD, L()->resultTitles[tier], C_RESET);
    printf("  %s\n\n", L()->resultMsgs[tier]);
    printf("  %s: %s%d%s / %d\n", L()->scoreWord, C_ACCENT, score, C_RESET, total);

    printf("  ");
    for (int s = 0; s < stars; s++)        printf(C_YELLOW "* " C_RESET);
    for (int s = stars; s < 3; s++)        printf(C_DIM    "- " C_RESET);
    printf("\n\n");

    if (passed){
        printf(C_GREEN "  %s\n" C_RESET, L()->passMsg);
        if (level + 1 < NUM_LEVELS) printf(C_GREEN "  %s\n" C_RESET, L()->unlockedMsg);
        else                        printf(C_YELLOW "  %s\n" C_RESET, L()->allDone);
    } else {
        printf(C_RED "  %s\n" C_RESET, L()->failMsg);
    }
    printf("\n");

    /* Menu de fin construit dynamiquement */
    int hasNext = passed && (level + 1 < NUM_LEVELS);
    int n = 0, optRetry, optNext = -1, optLevels, optQuit;
    optRetry = ++n;  printf("   %d) %s\n", optRetry, L()->menuRetry);
    if (hasNext){ optNext = ++n; printf("   %d) %s\n", optNext, L()->menuNext); }
    optLevels = ++n; printf("   %d) %s\n", optLevels, L()->menuLevels);
    optQuit   = ++n; printf("   %d) %s\n", optQuit,   L()->menuQuit);

    for (;;){
        int c = readInt();
        if (c == optRetry)            return ACT_RETRY;
        if (hasNext && c == optNext)  return ACT_NEXT;
        if (c == optLevels)           return ACT_LEVELS;
        if (c == optQuit)             return ACT_QUIT;
        printf(C_RED "  %s\n" C_RESET, L()->invalid);
    }
}

/* ============================================================================
 *  PROGRAMME PRINCIPAL
 * ==========================================================================*/
int main(void){
    initConsole();
    chooseLanguage();
    askUsername();

    int running = 1;
    while (running){
        int level = showLevelsMenu();
        if (level < 0) break;                 /* Quitter */

        int playing = 1;
        while (playing){
            int score = playLevel(level);
            int action = showResult(level, score);
            switch (action){
                case ACT_RETRY:                       break;   /* rejouer même niveau */
                case ACT_NEXT:   level++;             break;   /* niveau suivant */
                case ACT_LEVELS: playing = 0;         break;   /* retour menu niveaux */
                case ACT_QUIT:   playing = 0; running = 0; break;
            }
        }
    }

    clearScreen();
    banner();
    printf("\n  %s, %s%s%s !\n", L()->thanks, C_ACCENT, g_user, C_RESET);
    printf("  %s: %s%d%s\n\n", L()->scoreWord, C_YELLOW, g_totalScore, C_RESET);
    return 0;
}
