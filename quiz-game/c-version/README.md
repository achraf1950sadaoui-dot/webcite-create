# ISMAGI Quiz Game — version C (console)

نسخة د لعبة ISMAGI Quiz بـ **لغة C**، كتخدم فالـ terminal/console.
هادي conversion د النسخة web (HTML/JS) لبرنامج C.

## مزايا اللعبة

- 3 لغات: **English / Français / العربية**
- 3 مستويات: **Facile / Moyen / Difficile** (كيتفتحو واحد بواحد)
- 3 أسئلة فكل مستوى، 4 اختيارات (A, B, C, D)
- Score، نجوم، رسائل نتيجة، وشرط النجاح (2/3 على الأقل)
- Rejouer / Niveau suivant / Retour / Quitter

---

## ▶️ كيفاش تـcompiliه وتـlanciه

### بـ gcc مباشرة
```bash
gcc quiz.c -o quiz      # compilation
./quiz                  # exécution (Linux / macOS)
```

على **Windows** (MinGW):
```bash
gcc quiz.c -o quiz.exe
quiz.exe
```

### ولا بـ Makefile (أسهل)
```bash
make        # كيـcompiliه
make clean  # كيمسح الملفات لي تصنعو
```

---

## 📝 ملاحظات مهمة

- النسخة web فيها **minuteur متحرّك، أصوات، أنيميشن** — هادو ما كيـ
  reproductiwch فالـ console عادية، فمحيّدينهم بقصد. اللوجيك ديال اللعبة
  (الأسئلة، الscore، الأقفال) بقا نفسو.
- **العربية**: كتبان مزيان فالـ terminals لي كيدعمو UTF-8 (Linux/macOS، و
  Windows Terminal). الترتيب RTL ممكن ما يكونش مثالي حسب الـ terminal، ولكن
  النص كامل كاين. (الكود كيفعّل UTF-8 + الألوان أوتوماتيكياً على Windows 10+.)
- باش تبدّل/تزيد الأسئلة: شوف الجدول `QUESTIONS` فـ `quiz.c`. كل سؤال هو:
  ```c
  {"نص السؤال؟", {"A","B","C","D"}, 0}   // الرقم = index ديال الجواب الصح (0=A)
  ```

---

## 🛠️ Tech

- C standard (C99) — بلا أي مكتبة خارجية.
- كيـcompiliو ب أي compiler (gcc, clang, MSVC مع تعديل بسيط).
