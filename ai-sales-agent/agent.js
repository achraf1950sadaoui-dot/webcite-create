/* ════════════════════════════════════════════════════════════════════
   AI SALES & SUPPORT AGENT  —  l-3eql dyal l-agent
   ────────────────────────────────────────────────────────────────────
   Had l-file fih JUJ modes:
     1) MOCK   → kayكhdem direct, BLA API key (l-demo l-clients).
     2) CLAUDE → kayكhdem b Claude 7a9i9i (khass Anthropic API key).

   Bach trebbet l-agent m3a ay client: bidel GHIR l-object BIZ li ta7t. ⬇️
   ════════════════════════════════════════════════════════════════════ */

// ╔══════════════════════════════════════════════════════════════════╗
// ║   1. CONFIG D L-BUSINESS  — bidel hadi l-kol client jdid          ║
// ╚══════════════════════════════════════════════════════════════════╝
const BIZ = {
  name: "GlowCare",
  type: "متجر skincare (COD)",
  currency: "DH",
  delivery: "24–48h partout au Maroc",
  payment: "Paiement à la livraison (COD) — كتخلص melli توصلك l-commande",
  guarantee: "Satisfait ou remboursé f 7 ayyam",
  orderUrl: "#",                          // 7ot link d checkout / WhatsApp dyalek
  whatsapp: "+212 6XX-XXXXXX",
  products: [
    { name: "Sérum Vitamine C",  price: 149, for: "taches w éclat d l-wajh" },
    { name: "Crème Hydratante",  price: 139, for: "bechra nachfa / hydratation 24h" },
    { name: "Masque Argile",     price: 99,  for: "pores w bechra dohniya" },
    { name: "Sérum Rétinol Nuit",price: 159, for: "anti-rides / anti-âge f-lil" },
  ],
};

// ╔══════════════════════════════════════════════════════════════════╗
// ║   2. RÉGLAGES (kaytsجل f navigateur)                              ║
// ╚══════════════════════════════════════════════════════════════════╝
const S = {
  mode:   localStorage.getItem("ai_mode")    || "mock",
  apiKey: localStorage.getItem("ai_apikey")  || "",
  biz:    localStorage.getItem("ai_bizname") || BIZ.name,
};
BIZ.name = S.biz;

// ╔══════════════════════════════════════════════════════════════════╗
// ║   3. L-MOCK ENGINE  —  AI "مزيف" 9ادر, multilingue (3ربي/fr/en)   ║
// ║   Kaykchef l-loغa + l-niya (intent) w kayrejje3 jwab tabi3i.      ║
// ╚══════════════════════════════════════════════════════════════════╝
function detectLang(t){
  if(/[؀-ۿ]/.test(t)) return "ar";
  // darija 9bel français (3afak l-souq Maghribi)
  if(/\b(salam|chhal|ch7al|bch7al|bghit|wach|wesh|3afak|3andi|3andek|3andkom|dyal|dyali|kifach|taman|labas|chno|kayn|ntlb|nchri)\b/i.test(t)) return "dr";
  if(/\b(bonjour|salut|prix|combien|livraison|comment|merci|disponible|payer|commande)\b/i.test(t)) return "fr";
  return "en";
}

// Match b WORD-BOUNDARY (machi substring) bach "hi" ma ymatchش f "bghit".
// Keyword 3arبي → substring (l-7uruf l-3arبية ma 3andhomش word-boundary wad7).
function matches(t, words){
  return words.some(w=>{
    if(/[؀-ۿ]/.test(w)) return t.includes(w);
    const esc = w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    return new RegExp("(^|[^a-z0-9])"+esc+"($|[^a-z0-9])","i").test(t);
  });
}

const list = (lang)=> BIZ.products.map(p=>
  `• ${p.name} — ${p.price} ${BIZ.currency} (${p.for})`).join("\n");

const ORDER = {
  ar:`بغيتي تطلب؟ صيفط ليا الاسم ديالك، المدينة، و المنتوج اللي بغيتي 👇`,
  fr:`Pour commander : envoyez-moi votre nom, ville et le produit souhaité 👇`,
  dr:`بغيتي تطلب؟ 3afak 3tini smiytek، l-mدينة، w l-produit li bghiti 👇`,
  en:`To order, just send me your name, city and the product you want 👇`,
};

// responses[intent][lang]
const R = {
  greet:{
    ar:`أهلا وسهلا بيك ف ${BIZ.name}! 🌿 كيفاش نقدر نعاونك اليوم؟`,
    fr:`Bonjour et bienvenue chez ${BIZ.name} ! 🌿 Comment puis-je vous aider ?`,
    dr:`Salam! Mrحبا bik f ${BIZ.name} 🌿 Kifach n9der n3awnek?`,
    en:`Hi! Welcome to ${BIZ.name} 🌿 How can I help you today?`,
  },
};

function answer(text){
  const lang = detectLang(text);
  const t = text.toLowerCase();
  const has = (...w)=> matches(t, w);

  // ── intents ──
  if(has("salam","bonjour","salut","hi","hello","ahla","أهلا","مرحبا","labas","cv"))
    return pick(lang, R.greet);

  if(has("prix","taman","chhal","ch7al","bch7al","combien","price","cost","how much","ثمن","بشحال","كم","سعر"))
    return pick(lang,{
      ar:`هاهي الأثمنة:\n${list(lang)}\n\n${ORDER.ar}`,
      fr:`Voici nos prix :\n${list(lang)}\n\n${ORDER.fr}`,
      dr:`Hahuma l-asmane:\n${list(lang)}\n\n${ORDER.dr}`,
      en:`Here are our prices:\n${list(lang)}\n\n${ORDER.en}`,
    });

  if(has("livraison","delivery","tawsil","توصيل","shipping","ch7al kayt3ttل","combien de temps"))
    return pick(lang,{
      ar:`التوصيل ${BIZ.delivery} ✅`,
      fr:`Livraison : ${BIZ.delivery} ✅`,
      dr:`L-livraison: ${BIZ.delivery} ✅`,
      en:`Delivery: ${BIZ.delivery} ✅`,
    });

  if(has("cod","paiement","payer","khelles","khلص","cash","الدفع","comment je paye","kifach nkhelles"))
    return pick(lang,{
      ar:`${BIZ.payment} 💵 آمن 100%.`,
      fr:`${BIZ.payment} 💵 100% sûr.`,
      dr:`${BIZ.payment} 💵 Aman 100%.`,
      en:`Cash on delivery — you pay when it arrives 💵 100% safe.`,
    });

  if(has("commander","order","tlb","ntlb","نطلب","اطلب","acheter","buy","nchri"))
    return pick(lang, ORDER);

  if(has("dispo","stock","متوفر","available","kayn","wach 3andkom","mتوفر"))
    return pick(lang,{
      ar:`نعم متوفر و جاهز للتوصيل ✅ أشمن منتوج بغيتي؟`,
      fr:`Oui, en stock et prêt à livrer ✅ Quel produit souhaitez-vous ?`,
      dr:`Iyeh متوفر w جاهز l-tawsil ✅ Achmen produit bghiti?`,
      en:`Yes, in stock and ready to ship ✅ Which product would you like?`,
    });

  if(has("taches","rides","acné","bouton","bechra","skin","peau","dry","nachfa","حب الشباب","تجاعيد","conseil","recommand","ach n3ml"))
    return pick(lang,{
      ar:`على حساب البشرة ديالك نقترح:\n${list(lang)}\nشنو هي المشكلة اللي عندك (تاكوس، نشفان، حب الشباب...)؟`,
      fr:`Selon votre peau, je recommande :\n${list(lang)}\nQuel est votre besoin (taches, sécheresse, acné...) ?`,
      dr:`3la 7sab l-bechra dyalek n9ter7:\n${list(lang)}\nAch hiya l-mochkila (ta9es, nachfan, 7ب chباب...)؟`,
      en:`Based on your skin, I recommend:\n${list(lang)}\nWhat's your main concern (spots, dryness, acne...)?`,
    });

  if(has("merci","choukran","thanks","شكرا","thx","barakal"))
    return pick(lang,{
      ar:`بلا جميل! 😊 إلا بغيتي شي حاجة أخرى أنا هنا.`,
      fr:`Avec plaisir ! 😊 Je reste à votre disposition.`,
      dr:`Bla jmil! 😊 Ila bghiti chi haja akhra ana hna.`,
      en:`You're welcome! 😊 I'm here if you need anything else.`,
    });

  // ── fallback (machi 3aref) → kayreddi l-conversation l-bi3 ──
  return pick(lang,{
    ar:`سؤال زوين! 👍 عندنا:\n${list(lang)}\n${ORDER.ar}`,
    fr:`Bonne question ! 👍 Nous avons :\n${list(lang)}\n${ORDER.fr}`,
    dr:`Su'al zwin! 👍 3andna:\n${list(lang)}\n${ORDER.dr}`,
    en:`Good question! 👍 Here's what we offer:\n${list(lang)}\n${ORDER.en}`,
  });
}
const pick = (lang, obj)=> obj[lang] || obj.en || obj.fr;

// ╔══════════════════════════════════════════════════════════════════╗
// ║   4. CLAUDE 7A9I9I (optionnel) — système prompt mn BIZ            ║
// ╚══════════════════════════════════════════════════════════════════╝
function systemPrompt(){
  return `Nta agent dyal l-mabi3at w support dyal "${BIZ.name}", ${BIZ.type}.
Jaweb b nefs loغa dyal l-client (darija/3arبية/français/english).
Kun lطif, mukhtaser, w dima حاول tدفع l-client bach yطlب.

L-produits:
${BIZ.products.map(p=>`- ${p.name}: ${p.price} ${BIZ.currency} (${p.for})`).join("\n")}

Livraison: ${BIZ.delivery}
Paiement: ${BIZ.payment}
Garantie: ${BIZ.guarantee}
Bach yطlب: ${ORDER.dr}

3omrek matخtare3 produits wla asmane machi mawjudين.`;
}

// model rخis w sari3 — mزيان l-support agent (high volume).
// Tقder tبدلو l-'claude-sonnet-4-6' wla 'claude-opus-4-8' l-jawda akbar.
const CLAUDE_MODEL = "claude-haiku-4-5-20251001";

async function askClaude(history){
  const res = await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",
    headers:{
      "content-type":"application/json",
      "x-api-key": S.apiKey,
      "anthropic-version":"2023-06-01",
      "anthropic-dangerous-direct-browser-access":"true",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 500,
      system: systemPrompt(),
      messages: history,
    }),
  });
  if(!res.ok){ throw new Error("API "+res.status); }
  const data = await res.json();
  return data.content[0].text;
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║   5. UI  —  rبط kulchi m3a l-page                                 ║
// ╚══════════════════════════════════════════════════════════════════╝
const $ = (id)=> document.getElementById(id);
const history = [];  // l-historique l-Claude

function bindNames(){ document.querySelectorAll('[data-bind="biz-name"]').forEach(e=> e.textContent=BIZ.name); }

function addMsg(text, who){
  const d=document.createElement("div");
  d.className="msg "+who;
  d.textContent=text;
  $("chatBody").appendChild(d);
  $("chatBody").scrollTop=$("chatBody").scrollHeight;
}
function typing(on){
  let t=$("typingDots");
  if(on && !t){
    t=document.createElement("div"); t.id="typingDots"; t.className="typing";
    t.innerHTML="<span></span><span></span><span></span>";
    $("chatBody").appendChild(t); $("chatBody").scrollTop=$("chatBody").scrollHeight;
  } else if(!on && t){ t.remove(); }
}

async function handleUser(text){
  addMsg(text,"user");
  history.push({role:"user",content:text});
  typing(true);
  let reply;
  try{
    if(S.mode==="claude" && S.apiKey){ reply= await askClaude(history); }
    else { await wait(550+Math.random()*500); reply= answer(text); }
  }catch(e){
    reply="⚠️ Mochkil m3a l-API. Te'akked mn l-key. (Mode démo kayكhdem bla key.)";
  }
  typing(false);
  addMsg(reply,"bot");
  history.push({role:"assistant",content:reply});
}
const wait=(ms)=> new Promise(r=>setTimeout(r,ms));

const QUICK = ["Chhal taman? 💰","Livraison? 🚚","Wach COD? 💵","Bghit nطlب 🛒"];
function renderQuick(){
  $("quickReplies").innerHTML="";
  QUICK.forEach(q=>{
    const b=document.createElement("button"); b.textContent=q;
    b.onclick=()=>{ handleUser(q); $("quickReplies").innerHTML=""; };
    $("quickReplies").appendChild(b);
  });
}

// ── événements ──
window.addEventListener("DOMContentLoaded",()=>{
  bindNames();
  $("chatToggle").onclick=()=>{ $("chatWindow").hidden=false; $("chatToggle").hidden=true;
    if(!$("chatBody").children.length){ addMsg(pick("dr",R.greet),"bot"); renderQuick(); } };
  $("chatClose").onclick=()=>{ $("chatWindow").hidden=true; $("chatToggle").hidden=false; };
  $("chatForm").onsubmit=(e)=>{ e.preventDefault(); const v=$("chatInput").value.trim();
    if(!v) return; $("chatInput").value=""; $("quickReplies").innerHTML=""; handleUser(v); };

  // réglages
  $("settingsBtn").onclick=()=>{ $("settingsPanel").hidden=!$("settingsPanel").hidden; };
  $("setBizName").value=BIZ.name; $("setMode").value=S.mode; $("setApiKey").value=S.apiKey;
  $("apiKeyWrap").hidden = S.mode!=="claude";
  $("setMode").onchange=(e)=>{ $("apiKeyWrap").hidden = e.target.value!=="claude"; };
  $("saveSettings").onclick=()=>{
    BIZ.name=$("setBizName").value||"GlowCare"; S.mode=$("setMode").value; S.apiKey=$("setApiKey").value;
    localStorage.setItem("ai_bizname",BIZ.name);
    localStorage.setItem("ai_mode",S.mode);
    localStorage.setItem("ai_apikey",S.apiKey);
    bindNames(); $("settingsPanel").hidden=true;
    addMsg("✅ Réglages 7fdо. Mode: "+(S.mode==="claude"?"Claude 7a9i9i":"Démo"),"bot");
  };
});
