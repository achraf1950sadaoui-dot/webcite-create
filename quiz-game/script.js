/* ══════════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════════ */
const T = {
  en: {
    dir:'ltr', langClass:'lang-en',
    loginSubtitle:'Enter your username to begin',
    loginBtn:'Start Game',
    backLang:'← Change language',
    chooseLevel:'Choose Your Level',
    easy:'Easy', medium:'Medium', hard:'Hard',
    qSub:'3 Questions · 10s each',
    progress:'Level Progress',
    qCounter:(c,t)=>`Question ${c} / ${t}`,
    retry:'↩ Retry', nextLevel:'Next Level →', backLevels:'Back to Levels',
    quit:'✕ Quit',
    results:{
      bad:{emoji:'💪', title:'Keep Going!',   msg:'Practice makes perfect. Try again!'},
      ok: {emoji:'👍', title:'Good Job!',     msg:"Nice work — you're getting there!"},
      great:{emoji:'🔥',title:'Excellent!',   msg:'Outstanding knowledge of ISMAGI!'}
    },
    allDone:'🏆 All Done!',
    placeholder:'Username…'
  },
  fr: {
    dir:'ltr', langClass:'lang-fr',
    loginSubtitle:'Entrez votre pseudo pour commencer',
    loginBtn:'Commencer',
    backLang:'← Changer de langue',
    chooseLevel:'Choisissez votre niveau',
    easy:'Facile', medium:'Moyen', hard:'Difficile',
    qSub:'3 Questions · 10s chacune',
    progress:'Progression',
    qCounter:(c,t)=>`Question ${c} / ${t}`,
    retry:'↩ Réessayer', nextLevel:'Niveau suivant →', backLevels:'Retour aux niveaux',
    quit:'✕ Quitter',
    results:{
      bad:{emoji:'💪', title:'Courage !',     msg:'Entraîne-toi encore, tu vas y arriver !'},
      ok: {emoji:'👍', title:'Bien joué !',   msg:'Tu progresses, continue comme ça !'},
      great:{emoji:'🔥',title:'Excellent !',  msg:'Tu connais ISMAGI sur le bout des doigts !'}
    },
    allDone:'🏆 Terminé !',
    placeholder:'Pseudo…'
  },
  ar: {
    dir:'rtl', langClass:'lang-ar',
    loginSubtitle:'أدخل اسمك للبدء',
    loginBtn:'ابدأ اللعبة',
    backLang:'تغيير اللغة →',
    chooseLevel:'اختر مستواك',
    easy:'سهل', medium:'متوسط', hard:'صعب',
    qSub:'3 أسئلة · 10 ثوانٍ لكل سؤال',
    progress:'تقدم المستويات',
    qCounter:(c,t)=>`سؤال ${c} / ${t}`,
    retry:'↩ إعادة المحاولة', nextLevel:'المستوى التالي ←', backLevels:'العودة للمستويات',
    quit:'✕ خروج',
    results:{
      bad:{emoji:'💪', title:'استمر !',       msg:'التدريب يصنع الإتقان، حاول مجدداً !'},
      ok: {emoji:'👍', title:'عمل جيد !',     msg:'أحسنت، واصل التقدم !'},
      great:{emoji:'🔥',title:'ممتاز !',      msg:'معرفتك بـ ISMAGI رائعة !'}
    },
    allDone:'🏆 أنهيت جميع المستويات!',
    placeholder:'اسم المستخدم…'
  }
};

/* ══════════════════════════════════════════
   QUESTIONS (3 languages)
══════════════════════════════════════════ */
const QUESTIONS = {
  en:{
    easy:[
      {q:"What does ISMAGI stand for?",options:["Institut Supérieur de Management, d'Administration et de Génie Informatique","International School of Management and AI","Institute of Sport and Gaming","Information System Modern Academy"],correct:0},
      {q:"ISMAGI is located in which country?",options:["France","Morocco","Spain","Algeria"],correct:1},
      {q:"ISMAGI is mainly focused on:",options:["Medicine","Engineering and Computer Science","Art","Agriculture"],correct:1}
    ],
    medium:[
      {q:"Which field is strongly taught at ISMAGI?",options:["Computer Science","Literature","Law","Music"],correct:0},
      {q:"ISMAGI prepares students mainly for:",options:["Sports careers","IT and engineering careers","Farming jobs","Fashion design"],correct:1},
      {q:"What level of studies is ISMAGI associated with?",options:["Primary school","Higher education","Kindergarten","Middle school"],correct:1}
    ],
    hard:[
      {q:"ISMAGI is part of which type of institution?",options:["Private higher education institution","Primary school","High school","Training center only"],correct:0},
      {q:"ISMAGI is related to:",options:["Digital sciences and engineering","Cooking","Tourism only","Driving school"],correct:0},
      {q:"Students at ISMAGI usually study:",options:["Programming and networks","Painting only","Agriculture only","Sports only"],correct:0}
    ]
  },
  fr:{
    easy:[
      {q:"Que signifie ISMAGI ?",options:["Institut Supérieur de Management, d'Administration et de Génie Informatique","École Internationale de Management et d'IA","Institut du Sport et du Gaming","Système d'Information Académique Moderne"],correct:0},
      {q:"Dans quel pays se trouve ISMAGI ?",options:["France","Maroc","Espagne","Algérie"],correct:1},
      {q:"ISMAGI est principalement axé sur :",options:["La médecine","L'ingénierie et l'informatique","Les arts","L'agriculture"],correct:1}
    ],
    medium:[
      {q:"Quel domaine est fortement enseigné à ISMAGI ?",options:["L'informatique","La littérature","Le droit","La musique"],correct:0},
      {q:"ISMAGI prépare les étudiants principalement pour :",options:["Des carrières sportives","Des carrières en IT et ingénierie","Des emplois agricoles","La mode"],correct:1},
      {q:"À quel niveau d'études ISMAGI est-il associé ?",options:["École primaire","Enseignement supérieur","Maternelle","Collège"],correct:1}
    ],
    hard:[
      {q:"ISMAGI fait partie de quel type d'établissement ?",options:["Établissement privé d'enseignement supérieur","École primaire","Lycée","Centre de formation uniquement"],correct:0},
      {q:"ISMAGI est lié à :",options:["Les sciences numériques et l'ingénierie","La cuisine","Le tourisme uniquement","L'auto-école"],correct:0},
      {q:"Les étudiants d'ISMAGI étudient généralement :",options:["La programmation et les réseaux","La peinture uniquement","L'agriculture uniquement","Le sport uniquement"],correct:0}
    ]
  },
  ar:{
    easy:[
      {q:"ماذا يعني اختصار ISMAGI؟",options:["Institut Supérieur de Management, d'Administration et de Génie Informatique","المدرسة الدولية للإدارة والذكاء الاصطناعي","معهد الرياضة والألعاب","نظام المعلومات الأكاديمية الحديثة"],correct:0},
      {q:"في أي دولة يقع ISMAGI؟",options:["فرنسا","المغرب","إسبانيا","الجزائر"],correct:1},
      {q:"يركز ISMAGI بشكل رئيسي على:",options:["الطب","الهندسة وعلوم الحاسوب","الفنون","الزراعة"],correct:1}
    ],
    medium:[
      {q:"أي مجال يُدرَّس بشكل قوي في ISMAGI؟",options:["علوم الحاسوب","الأدب","القانون","الموسيقى"],correct:0},
      {q:"يُعِدّ ISMAGI الطلاب بشكل رئيسي لـ:",options:["مسيرات رياضية","مسيرات في تكنولوجيا المعلومات والهندسة","وظائف زراعية","تصميم الأزياء"],correct:1},
      {q:"بأي مستوى دراسي يرتبط ISMAGI؟",options:["المدرسة الابتدائية","التعليم العالي","رياض الأطفال","المدرسة الإعدادية"],correct:1}
    ],
    hard:[
      {q:"ISMAGI جزء من أي نوع من المؤسسات؟",options:["مؤسسة تعليم عالٍ خاصة","مدرسة ابتدائية","ثانوية","مركز تدريب فقط"],correct:0},
      {q:"يرتبط ISMAGI بـ:",options:["العلوم الرقمية والهندسة","الطهي","السياحة فقط","مدرسة تعليم قيادة"],correct:0},
      {q:"يدرس طلاب ISMAGI عادةً:",options:["البرمجة والشبكات","الرسم فقط","الزراعة فقط","الرياضة فقط"],correct:0}
    ]
  }
};

const LETTERS = ["A","B","C","D"];
const TIME_PER_Q = 10;

let lang = 'en';
let state = {
  username:"", totalScore:0, currentLevel:"easy",
  currentQ:0, score:0, timer:null, timeLeft:TIME_PER_Q,
  answered:false,
  unlocked:{easy:true,medium:false,hard:false},
  completed:{easy:false,medium:false,hard:false}
};

/* ══ AUDIO ══ */
let audioCtx;
function getCtx(){ if(!audioCtx) audioCtx=new(window.AudioContext||window.webkitAudioContext)(); return audioCtx; }
function tone(freq,type,dur,vol,delay){
  vol=vol||0.3; delay=delay||0;
  try{
    const c=getCtx(),o=c.createOscillator(),g=c.createGain();
    o.connect(g);g.connect(c.destination);
    o.type=type;o.frequency.value=freq;
    g.gain.setValueAtTime(vol,c.currentTime+delay);
    g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+delay+dur);
    o.start(c.currentTime+delay);o.stop(c.currentTime+delay+dur);
  }catch(e){}
}
const sfx={
  click:function(){tone(900,'sine',0.07,0.2);},
  correct:function(){tone(523,'sine',0.12,0.3);tone(659,'sine',0.12,0.3,0.13);tone(784,'sine',0.18,0.3,0.26);},
  wrong:function(){tone(250,'sawtooth',0.18,0.25);tone(180,'sawtooth',0.2,0.25,0.18);},
  start:function(){[261,329,392,523].forEach(function(f,i){tone(f,'sine',0.2,0.25,i*0.15);});},
  levelup:function(){[523,659,784,1046].forEach(function(f,i){tone(f,'sine',0.22,0.3,i*0.12);});}
};

/* ══ SCREEN ══ */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active');});
  var el=document.getElementById('screen-'+id);
  requestAnimationFrame(function(){requestAnimationFrame(function(){if(el)el.classList.add('active');});});
}

/* ══ SET LANGUAGE ══ */
function setLang(l){
  sfx.click();
  lang = l;
  var t = T[l];
  // direction & font
  document.documentElement.setAttribute('lang', l);
  document.documentElement.setAttribute('dir', t.dir);
  document.body.className = t.langClass;

  // login screen text
  document.getElementById('login-subtitle').textContent = t.loginSubtitle;
  document.getElementById('btn-login-text').textContent = t.loginBtn;
  document.getElementById('username-input').placeholder = t.placeholder;
  document.querySelector('.back-lang').textContent = t.backLang;

  // level labels
  document.getElementById('lbl-choose').textContent = t.chooseLevel;
  document.getElementById('lbl-easy').textContent = t.easy;
  document.getElementById('lbl-medium').textContent = t.medium;
  document.getElementById('lbl-hard').textContent = t.hard;
  document.getElementById('lbl-easy-sub').textContent = t.qSub;
  document.getElementById('lbl-medium-sub').textContent = t.qSub;
  document.getElementById('lbl-hard-sub').textContent = t.qSub;
  document.getElementById('lbl-progress').textContent = t.progress;
  document.getElementById('step-easy').textContent = t.easy;
  document.getElementById('step-medium').textContent = t.medium;
  document.getElementById('step-hard').textContent = t.hard;

  // buttons
  document.getElementById('btn-quit').textContent = t.quit;
  document.getElementById('btn-retry').textContent = t.retry;
  document.getElementById('btn-levels').textContent = t.backLevels;

  showScreen('login');
}

/* ══ LOGIN ══ */
document.getElementById('btn-login').addEventListener('click', function(){
  sfx.click();
  var val = document.getElementById('username-input').value.trim();
  if(!val){
    var inp = document.getElementById('username-input');
    inp.style.borderColor='var(--red)';
    setTimeout(function(){inp.style.borderColor='';},1000);
    return;
  }
  state.username = val;
  localStorage.setItem('iq_user', val);
  var saved = localStorage.getItem('iq_prog');
  if(saved){
    try{
      var p=JSON.parse(saved);
      state.unlocked=p.unlocked||state.unlocked;
      state.completed=p.completed||state.completed;
      state.totalScore=p.totalScore||0;
    }catch(e){}
  }
  sfx.start();
  document.getElementById('header-username').textContent = state.username;
  document.getElementById('header-score').textContent = state.totalScore;
  renderLevels();
  showScreen('levels');
});

document.getElementById('username-input').addEventListener('keydown',function(e){
  if(e.key==='Enter') document.getElementById('btn-login').click();
});

window.addEventListener('load',function(){
  var u=localStorage.getItem('iq_user');
  if(u) document.getElementById('username-input').value=u;
});

/* ══ LEVELS ══ */
function renderLevels(){
  var t = T[lang];
  ['easy','medium','hard'].forEach(function(lvl){
    var card=document.getElementById('level-'+lvl);
    var status=document.getElementById('status-'+lvl);
    var step=document.getElementById('step-'+lvl);
    card.classList.remove('locked','completed');
    step.classList.remove('active','done');
    if(!state.unlocked[lvl]){
      card.classList.add('locked');
      status.innerHTML='<span class="lock-icon">🔒</span>';
    } else if(state.completed[lvl]){
      card.classList.add('completed');
      status.innerHTML='<span class="lock-icon">✅</span>';
      step.classList.add('done');
    } else {
      status.innerHTML='<span class="lock-icon unlocked">▶</span>';
      step.classList.add('active');
    }
  });
  document.getElementById('line-1').classList.toggle('done',state.completed.easy);
  document.getElementById('line-2').classList.toggle('done',state.completed.medium);
  document.getElementById('header-score').textContent=state.totalScore;
}

['easy','medium','hard'].forEach(function(lvl){
  document.getElementById('level-'+lvl).addEventListener('click',function(){
    if(!state.unlocked[lvl]) return;
    sfx.click();
    startLevel(lvl);
  });
});

/* ══ QUIZ ══ */
function startLevel(level){
  state.currentLevel=level;
  state.currentQ=0;
  state.score=0;
  state.answered=false;
  var t=T[lang];
  var labels={easy:t.easy,medium:t.medium,hard:t.hard};
  document.getElementById('quiz-level-tag').textContent=labels[level];
  document.getElementById('quiz-score').textContent=state.totalScore;
  showScreen('quiz');
  setTimeout(loadQuestion,300);
}

function loadQuestion(){
  var qs=QUESTIONS[lang][state.currentLevel];
  var q=qs[state.currentQ];
  var total=qs.length;
  state.answered=false;
  state.timeLeft=TIME_PER_Q;

  document.getElementById('question-counter').textContent=T[lang].qCounter(state.currentQ+1,total);
  document.getElementById('quiz-progress-bar').style.width=((state.currentQ/total)*100)+'%';

  var qCard=document.getElementById('question-card');
  qCard.style.animation='none'; void qCard.offsetHeight; qCard.style.animation='';
  document.getElementById('question-text').textContent=q.q;

  document.querySelectorAll('.option-btn').forEach(function(btn,i){
    btn.className='option-btn';
    btn.disabled=false;
    btn.style.animation='none'; void btn.offsetHeight; btn.style.animation='';
    btn.innerHTML='<span class="letter">'+LETTERS[i]+'</span>'+q.options[i];
    btn.onclick=function(){ selectAnswer(i); };
  });

  startTimer();
}

function startTimer(){
  clearInterval(state.timer);
  var C=2*Math.PI*20;
  var ring=document.getElementById('timer-ring-fill');
  var disp=document.getElementById('timer-display');
  state.timeLeft=TIME_PER_Q;
  ring.classList.remove('warning','danger');
  ring.style.strokeDashoffset=0;
  disp.textContent=TIME_PER_Q;
  state.timer=setInterval(function(){
    state.timeLeft--;
    disp.textContent=state.timeLeft;
    ring.style.strokeDashoffset=C*(1-state.timeLeft/TIME_PER_Q);
    if(state.timeLeft<=5&&state.timeLeft>2) ring.classList.add('warning');
    if(state.timeLeft<=2){ring.classList.remove('warning');ring.classList.add('danger');}
    if(state.timeLeft<=0){clearInterval(state.timer);timeUp();}
  },1000);
}

function timeUp(){
  if(state.answered) return;
  state.answered=true;
  sfx.wrong();
  var q=QUESTIONS[lang][state.currentLevel][state.currentQ];
  var btns=document.querySelectorAll('.option-btn');
  btns.forEach(function(b){b.disabled=true;});
  btns[q.correct].classList.add('correct');
  var qCard=document.getElementById('question-card');
  qCard.classList.add('animate-shake');
  setTimeout(function(){qCard.classList.remove('animate-shake');nextQ();},1200);
}

function selectAnswer(index){
  if(state.answered) return;
  state.answered=true;
  clearInterval(state.timer);
  sfx.click();
  var q=QUESTIONS[lang][state.currentLevel][state.currentQ];
  var btns=document.querySelectorAll('.option-btn');
  btns.forEach(function(b){b.disabled=true;});
  if(index===q.correct){
    btns[index].classList.add('correct','animate-pulse');
    state.score++;state.totalScore++;
    document.getElementById('quiz-score').textContent=state.totalScore;
    sfx.correct();
  } else {
    btns[index].classList.add('incorrect');
    btns[q.correct].classList.add('correct');
    sfx.wrong();
    var qCard=document.getElementById('question-card');
    qCard.classList.add('animate-shake');
    setTimeout(function(){qCard.classList.remove('animate-shake');},400);
  }
  setTimeout(nextQ,1100);
}

function nextQ(){
  state.currentQ++;
  if(state.currentQ>=QUESTIONS[lang][state.currentLevel].length) endLevel();
  else loadQuestion();
}

function endLevel(){
  var total=QUESTIONS[lang][state.currentLevel].length;
  var score=state.score;
  var level=state.currentLevel;
  document.getElementById('quiz-progress-bar').style.width='100%';
  var passed=score>=2;
  if(passed){
    state.completed[level]=true;
    if(level==='easy')   state.unlocked.medium=true;
    if(level==='medium') state.unlocked.hard=true;
  }
  saveProgress();

  var t=T[lang];
  var pct=score/total;
  var r;
  if(pct<=0.4) r=t.results.bad;
  else if(pct<=0.7) r=t.results.ok;
  else r=t.results.great;

  document.getElementById('result-emoji').textContent=r.emoji;
  document.getElementById('result-title').textContent=r.title;
  document.getElementById('result-msg').textContent=r.msg;
  document.getElementById('result-score').textContent=score;
  document.getElementById('result-total').textContent='/ '+total;

  var stars=Math.round((score/total)*3);
  document.getElementById('result-stars').textContent='⭐'.repeat(stars)+'☆'.repeat(3-stars);

  var btnNext=document.getElementById('btn-next-level');
  var nextMap={easy:'medium',medium:'hard',hard:null};
  var nextLvl=nextMap[level];

  if(nextLvl&&state.unlocked[nextLvl]){
    btnNext.style.display='';
    btnNext.textContent=t.nextLevel;
    btnNext.onclick=function(){sfx.click();startLevel(nextLvl);};
    sfx.levelup();
  } else if(!nextLvl){
    btnNext.style.display='';
    btnNext.textContent=t.allDone;
    btnNext.onclick=function(){sfx.click();renderLevels();showScreen('levels');};
    sfx.levelup();
  } else {
    btnNext.style.display='none';
    sfx.wrong();
  }
  showScreen('result');
}

document.getElementById('btn-retry').addEventListener('click',function(){sfx.click();startLevel(state.currentLevel);});
document.getElementById('btn-levels').addEventListener('click',function(){sfx.click();renderLevels();showScreen('levels');});
document.getElementById('btn-quit').addEventListener('click',function(){sfx.click();clearInterval(state.timer);renderLevels();showScreen('levels');});

function saveProgress(){
  localStorage.setItem('iq_prog',JSON.stringify({
    unlocked:state.unlocked,completed:state.completed,totalScore:state.totalScore
  }));
}
