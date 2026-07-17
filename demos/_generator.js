// ════════════════════════════════════════════════════════════════
//  Générateur de démos — Cabinets dentaires (Rabat)
//  ────────────────────────────────────────────────────────────────
//  node demos/_generator.js   → kaybni kol fichier HTML f demos/
//  Bach tzid cabinet jdid: zid wahed f CABINETS w 3awd t-lance.
// ════════════════════════════════════════════════════════════════
const fs = require('fs');

/* ─── Icônes SVG (inline, bla dépendances) ───────────────────── */
const FILL = new Set(['tooth', 'wa']);
const PATHS = {
  tooth:'<path d="M12 2C9 2 8 4 6 4S3 3 3 6c0 3 1 5 1.5 8S5 22 6.5 22 8 18 9 17s2 1 3 1 1.5-3 2.5-3 1 5 2.5 5 1-5 1.5-8S21 9 21 6c0-3-1-2-3-2s-3-2-6-2z"/>',
  implant:'<path d="M12 2v20M7 7c0 3 2 4 5 4s5-1 5-4"/><circle cx="12" cy="4" r="2"/>',
  braces:'<rect x="3" y="9" width="18" height="6" rx="3"/><path d="M7 9v6M12 9v6M17 9v6"/>',
  sparkle:'<path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>',
  prosthesis:'<path d="M4 14c0-4 3-7 8-7s8 3 8 7M4 14h16M7 14v3M17 14v3"/>',
  child:'<circle cx="9" cy="9" r="3"/><circle cx="16" cy="13" r="2.4"/><path d="M3 21c0-3 3-5 6-5s6 2 6 5"/>',
  face:'<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M8 14s1.5 2 4 2 4-2 4-2"/>',
  gum:'<path d="M5 8c0-2 3-3 7-3s7 1 7 3v2c0 1.5-1 2.5-2.2 2.5S15 13 15 11.5 13.5 10 12 10s-3 .5-3 2-.6 2-1.8 2S5 12.5 5 11z"/><path d="M9 13v4M12 13.5v4.5M15 13v4"/>',
  heart:'<path d="M12 21s-6-4.3-9-8a5 5 0 019-3 5 5 0 019 3c-3 3.7-9 8-9 8z"/>',
  shield:'<path d="M12 2L3 6v6c0 5 9 10 9 10s9-5 9-10V6z"/>',
  scanner:'<path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><circle cx="12" cy="12" r="4"/>',
  team:'<circle cx="12" cy="8" r="4"/><path d="M4 22c0-4 4-6 8-6s8 2 8 6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin:'<path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
  phone:'<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.2-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/>',
  home:'<path d="M3 21V8l9-5 9 5v13M9 21v-6h6v6"/>',
  chair:'<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',
  steri:'<path d="M5 21V5a2 2 0 012-2h7l5 5v13"/><path d="M9 9h4M9 13h6M9 17h6"/>',
  wa:'<path d="M.5 23.5l1.6-5.9a11.4 11.4 0 1110 5.8h0a11.4 11.4 0 01-5.5-1.4L.5 23.5zM6.9 19l.3.2a9.5 9.5 0 004.8 1.3 9.5 9.5 0 10-9.5-9.5c0 1.8.5 3.5 1.4 5l.2.3-1 3.5 3.6-.9z"/><path d="M9.1 6.8c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3 2 3.1 4.9 4.3c2.4 1 2.9.8 3.4.8s1.7-.7 2-1.4c.2-.6.2-1.2.2-1.3l-.6-.3c-.3-.2-1.7-.9-2-1s-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2s0-.4.1-.5l.4-.5.3-.5v-.5c0-.1-.6-1.6-.9-2.3z"/>',
  check:'<path d="M20 6L9 17l-5-5"/>',
};
const ic = (name, size = 24, sw = 2) => {
  const f = FILL.has(name);
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${f?'currentColor':'none'}"${f?'':` stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`}>${PATHS[name]}</svg>`;
};

/* ─── Services par type ──────────────────────────────────────── */
const SERVICES = {
  general:[
    ['tooth','Soins & Prévention','Détartrage, traitement des caries et contrôle régulier de vos dents.'],
    ['implant','Implants dentaires','Remplacez vos dents manquantes par des implants fixes et naturels.'],
    ['braces','Orthodontie & Invisalign','Alignez vos dents avec des appareils ou des gouttières invisibles.'],
    ['sparkle','Esthétique du sourire','Facettes, blanchiment et design du sourire pour un éclat naturel.'],
    ['prosthesis','Prothèses dentaires','Couronnes, bridges et prothèses sur-mesure pour votre confort.'],
    ['child','Dentisterie pédiatrique','Des soins doux et rassurants pour le sourire de vos enfants.'],
  ],
  ortho:[
    ['braces','Orthodontie fixe','Bagues métalliques ou céramiques pour corriger l\'alignement.'],
    ['sparkle','Invisalign / Gouttières','Alignement discret avec des gouttières transparentes.'],
    ['face','Orthopédie dento-faciale','Correction de la croissance et de l\'harmonie du visage.'],
    ['child','Orthodontie de l\'enfant','Suivi et traitement précoce pour les plus jeunes.'],
    ['check','Contention & Suivi','Maintien des résultats et contrôle régulier.'],
    ['tooth','Soins & Prévention','Détartrage et contrôle pour des dents saines.'],
  ],
  paro:[
    ['gum','Parodontologie','Traitement des gencives et du déchaussement dentaire.'],
    ['implant','Implantologie','Pose d\'implants durables pour remplacer vos dents.'],
    ['heart','Greffe gingivale','Restauration des gencives pour protéger vos dents.'],
    ['prosthesis','Prothèses sur implants','Couronnes et bridges fixés sur implants.'],
    ['sparkle','Esthétique du sourire','Blanchiment et harmonie du sourire.'],
    ['tooth','Soins & Prévention','Détartrage et suivi de votre santé bucco-dentaire.'],
  ],
  pedo:[
    ['child','Première visite','Un accueil doux pour la première visite de votre enfant.'],
    ['tooth','Soins des dents de lait','Traitement des caries et soins adaptés aux enfants.'],
    ['shield','Scellement des sillons','Protection des dents des enfants contre les caries.'],
    ['sparkle','Application de fluor','Renforcement de l\'émail pour des dents solides.'],
    ['braces','Orthodontie précoce','Dépistage et suivi de la croissance des dents.'],
    ['heart','Prévention & éducation','Apprendre les bons gestes en s\'amusant.'],
  ],
};
const STATLABEL = { general:'PATIENTS SOIGNÉS', ortho:'SOURIRES ALIGNÉS', paro:'IMPLANTS POSÉS', pedo:'ENFANTS SOIGNÉS' };

/* ─── Avis (exemples — à remplacer par de vrais avis) ────────── */
const REVIEWS = [
  ['Y','Yassine B.','Rabat','Accueil très professionnel et soins indolores. Je recommande vivement ce cabinet.'],
  ['S','Salma E.','Rabat','Équipe à l\'écoute et cabinet impeccable. La prise de RDV en ligne est super pratique.'],
  ['M','Mehdi A.','Rabat','Travail sérieux et résultats au top. Explications claires à chaque étape.'],
  ['N','Nadia F.','Rabat','Cabinet propre et moderne, personnel souriant. Réponse en quelques minutes.'],
  ['K','Karim L.','Rabat','Excellente prise en charge, totalement indolore. Ravi du résultat.'],
  ['H','Hajar M.','Rabat','Très bonne expérience, médecin à l\'écoute. Réservation en ligne très simple.'],
];

/* ─── Template ───────────────────────────────────────────────── */
function render(c, idx) {
  const t = c.theme;
  const svc = SERVICES[c.type];
  const rev = [REVIEWS[idx%6], REVIEWS[(idx+2)%6], REVIEWS[(idx+4)%6]];
  const opts = ['Consultation / Contrôle', ...svc.map(s=>s[1]), 'Urgence dentaire']
    .map(o=>`<option>${o}</option>`).join('');
  const samedi = idx%2 ? '09:00 – 13:00' : '10:00 – 18:00';
  const map = encodeURIComponent(c.mapQuery);
  return `<!doctype html>
<!--
  DÉMO · ${c.name} (Rabat)
  ⚠️ BACH TBIDEL: 1) [212661370031] = ra9m WhatsApp (212 + ra9m bla 0)
     2) Téléphone/Adresse/Horaires (section Infos)  3) Google Maps (iframe q=...)
-->
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${c.name} — Dentiste à Rabat | RDV en ligne</title>
<meta name="description" content="${c.name} à Rabat : ${c.metaDesc} Prenez rendez-vous en ligne 24h/24." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<style>
:root{
  --primary:${t.p}; --primary-d:${t.pd}; --primary-l:${t.pl};
  --accent:${t.a}; --ink:${t.ink}; --muted:${t.muted};
  --bg:${t.bg}; --surface:#fff; --line:${t.line};
  --star:#f5a623; --wa:#25d366;
  --radius:18px; --shadow:0 18px 50px -22px ${t.pd}55; --maxw:1140px;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Poppins',system-ui,sans-serif;color:var(--ink);background:var(--bg);line-height:1.6;-webkit-font-smoothing:antialiased}
h1,h2,h3,.display{font-family:'Plus Jakarta Sans','Poppins',sans-serif;line-height:1.14;font-weight:800;letter-spacing:-.02em}
a{color:inherit;text-decoration:none}img{max-width:100%;display:block}
.container{max-width:var(--maxw);margin:0 auto;padding:0 22px}
.eyebrow{color:var(--primary-d);font-weight:700;font-size:.8rem;letter-spacing:.14em;text-transform:uppercase}
.section{padding:78px 0}
.section-head{max-width:660px;margin:0 auto 44px;text-align:center}
.section-head h2{font-size:clamp(1.7rem,4vw,2.5rem);margin:10px 0}
.section-head p{color:var(--muted)}.muted{color:var(--muted)}
.btn{display:inline-flex;align-items:center;gap:9px;border:0;cursor:pointer;font-family:inherit;font-weight:700;font-size:.98rem;padding:14px 24px;border-radius:999px;transition:.2s;white-space:nowrap}
.btn-primary{background:var(--primary);color:#fff;box-shadow:0 12px 26px -12px var(--primary)}
.btn-primary:hover{background:var(--primary-d);transform:translateY(-2px)}
.btn-accent{background:var(--accent);color:#fff}.btn-accent:hover{filter:brightness(1.05);transform:translateY(-2px)}
.btn-ghost{background:#fff;color:var(--ink);border:1.5px solid var(--line)}.btn-ghost:hover{border-color:var(--primary)}
.btn-wa{background:var(--wa);color:#fff}.btn-wa:hover{filter:brightness(.95);transform:translateY(-2px)}
.btn.lg{padding:17px 32px;font-size:1.05rem}
header.nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.86);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.nav-in{display:flex;align-items:center;justify-content:space-between;height:70px}
.brand{display:flex;align-items:center;gap:11px;font-weight:800}
.brand .logo{width:42px;height:42px;border-radius:13px;background:linear-gradient(135deg,var(--primary),var(--primary-d));display:grid;place-items:center;color:#fff;box-shadow:var(--shadow)}
.brand b{font-size:1.02rem;line-height:1.05}
.brand small{display:block;color:var(--muted);font-weight:600;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase}
.nav-links{display:flex;align-items:center;gap:26px}
.nav-links a.lnk{font-weight:600;color:var(--muted);font-size:.95rem}.nav-links a.lnk:hover{color:var(--primary-d)}
.burger{display:none;background:none;border:0;cursor:pointer;padding:8px}
.burger span{display:block;width:24px;height:2.5px;background:var(--ink);border-radius:3px;margin:5px 0}
.hero{position:relative;overflow:hidden;background:radial-gradient(900px 520px at 88% -10%,${t.p}26,transparent 60%),radial-gradient(700px 500px at -5% 110%,${t.a}1f,transparent 55%),linear-gradient(180deg,#fff,var(--bg))}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:46px;align-items:center;padding:64px 0 72px}
.hero .pill{display:inline-flex;align-items:center;gap:8px;background:var(--primary-l);color:var(--primary-d);font-weight:700;font-size:.82rem;padding:8px 15px;border-radius:999px;margin-bottom:20px}
.hero h1{font-size:clamp(2.1rem,5.2vw,3.4rem)}.hero h1 .hl{color:var(--primary)}
.hero .lede{color:var(--muted);font-size:1.12rem;margin:18px 0 28px;max-width:520px}
.hero-cta{display:flex;gap:14px;flex-wrap:wrap}
.hero-mini{display:flex;gap:22px;margin-top:30px;flex-wrap:wrap}
.hero-mini div{display:flex;align-items:center;gap:9px;font-weight:600;font-size:.92rem}.hero-mini svg{color:var(--primary)}
.hero-card{position:relative;background:#fff;border:1px solid var(--line);border-radius:26px;padding:26px;box-shadow:var(--shadow)}
.hero-card .tooth{width:100%;height:230px;border-radius:18px;background:linear-gradient(135deg,var(--primary),var(--primary-d));display:grid;place-items:center;position:relative;overflow:hidden}
.hero-card .tooth svg{width:130px;height:130px;color:#fff;opacity:.95;filter:drop-shadow(0 10px 20px rgba(0,0,0,.2))}
.hero-card .tooth::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.25),transparent 45%)}
.hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:18px;text-align:center}
.hero-stats b{display:block;font-family:'Plus Jakarta Sans';font-size:1.4rem;color:var(--primary-d)}
.hero-stats span{font-size:.7rem;color:var(--muted);font-weight:600}
.float-badge{position:absolute;bottom:-16px;left:-16px;background:#fff;border:1px solid var(--line);box-shadow:var(--shadow);border-radius:14px;padding:11px 15px;display:flex;align-items:center;gap:10px;font-weight:700;font-size:.86rem}
.float-badge .dot{width:34px;height:34px;border-radius:10px;background:var(--accent);display:grid;place-items:center;color:#fff}
.trust{background:var(--ink)}
.trust-in{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:26px 0}
.trust-item{display:flex;align-items:center;gap:12px;color:#fff}.trust-item svg{color:var(--accent);flex:none}
.trust-item b{display:block;font-size:.96rem}.trust-item small{color:rgba(255,255,255,.6);font-size:.78rem}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.svc-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:30px 26px;transition:.25s}
.svc-card:hover{transform:translateY(-6px);box-shadow:var(--shadow);border-color:transparent}
.svc-ic{width:58px;height:58px;border-radius:16px;background:var(--primary-l);color:var(--primary-d);display:grid;place-items:center;margin-bottom:18px}
.svc-card h3{font-size:1.15rem;margin-bottom:8px}.svc-card p{color:var(--muted);font-size:.95rem}
.why{background:#fff}
.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.why-item{text-align:center;padding:14px}
.why-ic{width:66px;height:66px;border-radius:50%;margin:0 auto 16px;background:linear-gradient(135deg,var(--primary-l),#fff);border:1px solid var(--line);display:grid;place-items:center;color:var(--primary-d)}
.why-item h3{font-size:1.04rem;margin-bottom:6px}.why-item p{color:var(--muted);font-size:.9rem}
.booking{background:linear-gradient(160deg,var(--primary-d),var(--primary))}
.book-grid{display:grid;grid-template-columns:1fr 1.05fr;gap:46px;align-items:center}
.book-left h2{font-size:clamp(1.8rem,4vw,2.6rem);color:#fff}
.book-left p{color:rgba(255,255,255,.85);margin:16px 0 26px;font-size:1.05rem}
.book-pts{list-style:none;display:grid;gap:14px}
.book-pts li{display:flex;align-items:center;gap:13px;font-weight:600;color:#fff}
.book-pts .chk{width:30px;height:30px;border-radius:9px;background:rgba(255,255,255,.18);display:grid;place-items:center;flex:none;color:#fff}
.book-form{background:#fff;border-radius:22px;padding:30px;box-shadow:0 30px 60px -24px rgba(0,0,0,.5)}
.book-form h3{color:var(--ink);font-size:1.3rem;margin-bottom:4px}
.book-form .sub{color:var(--muted);font-size:.9rem;margin-bottom:18px}
.field{margin-bottom:14px}.field label{display:block;color:var(--ink);font-weight:600;font-size:.85rem;margin-bottom:6px}
.field input,.field select,.field textarea{width:100%;padding:13px 15px;border:1.5px solid var(--line);border-radius:12px;font-family:inherit;font-size:.96rem;color:var(--ink);background:#fcfffe;transition:.2s}
.field input:focus,.field select:focus,.field textarea:focus{outline:0;border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-l)}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.book-form .btn{width:100%;justify-content:center;margin-top:6px}
.book-form .note{text-align:center;color:var(--muted);font-size:.78rem;margin-top:12px}
.gal-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.gal-tile{aspect-ratio:1;border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#fff;text-align:center;padding:18px;font-weight:700;font-size:.92rem;position:relative;overflow:hidden}
.gal-tile svg{width:46px;height:46px;opacity:.95}
.gal-tile::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 30% 20%,rgba(255,255,255,.22),transparent 50%)}
.g1{background:linear-gradient(140deg,${t.p},${t.pd})}.g2{background:linear-gradient(140deg,${t.p}cc,${t.p})}
.g3{background:linear-gradient(140deg,${t.a},${t.a}cc)}.g4{background:linear-gradient(140deg,${t.pd},var(--ink))}
.rev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.rev-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:26px}
.stars{color:var(--star);font-size:1.05rem;letter-spacing:2px;margin-bottom:12px}
.rev-card p{font-size:.96rem;margin-bottom:16px}
.rev-who{display:flex;align-items:center;gap:12px}
.rev-av{width:42px;height:42px;border-radius:50%;background:var(--primary-l);color:var(--primary-d);display:grid;place-items:center;font-weight:800}
.rev-who b{font-size:.95rem}.rev-who small{color:var(--muted);display:block;font-size:.78rem}
.g-badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--line);border-radius:999px;padding:9px 18px;font-weight:700;font-size:.9rem;box-shadow:var(--shadow);margin-top:30px}
.info-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:36px;align-items:stretch}
.info-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:30px}
.info-row{display:flex;gap:14px;padding:15px 0;border-bottom:1px solid var(--line)}.info-row:last-child{border:0}
.info-row .ic{width:44px;height:44px;border-radius:13px;background:var(--primary-l);color:var(--primary-d);display:grid;place-items:center;flex:none}
.info-row b{display:block;font-size:.97rem}.info-row span{color:var(--muted);font-size:.9rem}
.hours{list-style:none}.hours li{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px dashed var(--line);font-size:.93rem}
.hours li:last-child{border:0}.hours .cl{color:#d7574e;font-weight:600}.hours .op{color:var(--primary-d);font-weight:600}
.map-wrap{border-radius:var(--radius);overflow:hidden;border:1px solid var(--line);min-height:340px}
.map-wrap iframe{width:100%;height:100%;min-height:340px;border:0;display:block}
footer{background:var(--ink);color:#fff;padding:54px 0 26px}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:30px;margin-bottom:34px}
.foot-grid p{color:rgba(255,255,255,.6);font-size:.92rem;margin-top:12px;max-width:300px}
.foot-grid h4{font-size:.82rem;text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin-bottom:14px}
.foot-grid a{display:block;color:rgba(255,255,255,.75);padding:5px 0;font-size:.93rem}.foot-grid a:hover{color:#fff}
.foot-bot{border-top:1px solid rgba(255,255,255,.12);padding-top:20px;text-align:center;color:rgba(255,255,255,.5);font-size:.84rem}
.wa-float{position:fixed;right:18px;bottom:18px;z-index:60;width:60px;height:60px;border-radius:50%;background:var(--wa);display:grid;place-items:center;box-shadow:0 12px 30px -8px rgba(37,211,102,.7);animation:pulse 2.4s infinite}
.wa-float svg{width:32px;height:32px;color:#fff}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(37,211,102,.5)}70%{box-shadow:0 0 0 16px rgba(37,211,102,0)}100%{box-shadow:0 0 0 0 rgba(37,211,102,0)}}
@media(max-width:920px){.hero-grid,.book-grid,.info-grid{grid-template-columns:1fr}.svc-grid,.why-grid,.rev-grid{grid-template-columns:1fr 1fr}.trust-in{grid-template-columns:1fr 1fr}.foot-grid{grid-template-columns:1fr 1fr}.hero-card{max-width:440px}}
@media(max-width:620px){.nav-links{position:fixed;inset:70px 0 auto 0;background:#fff;flex-direction:column;gap:0;padding:10px 22px 22px;border-bottom:1px solid var(--line);transform:translateY(-130%);transition:.3s;align-items:stretch}.nav-links.open{transform:translateY(0)}.nav-links a.lnk{padding:13px 0;border-bottom:1px solid var(--line)}.nav-links .btn{margin-top:10px;justify-content:center}.burger{display:block}.svc-grid,.why-grid,.rev-grid,.gal-grid,.trust-in,.row2,.foot-grid{grid-template-columns:1fr}.section{padding:54px 0}}
</style>
</head>
<body>
<header class="nav"><div class="container nav-in">
  <a href="#top" class="brand"><span class="logo">${ic('tooth',22)}</span><span><b>${c.name}</b><small>${c.brandSmall}</small></span></a>
  <nav class="nav-links" id="menu">
    <a class="lnk" href="#services">Services</a><a class="lnk" href="#pourquoi">Pourquoi nous</a>
    <a class="lnk" href="#avis">Avis</a><a class="lnk" href="#infos">Infos &amp; Accès</a>
    <a class="btn btn-primary" href="#rdv">Prendre RDV</a>
  </nav>
  <button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
</div></header>
<main id="top">
<section class="hero"><div class="container hero-grid">
  <div>
    <span class="pill">● ${c.pill}</span>
    <h1>${c.h1a}<span class="hl">${c.h1b}</span>${c.h1c}</h1>
    <p class="lede">${c.sub}</p>
    <div class="hero-cta"><a href="#rdv" class="btn btn-primary lg">📅 Prendre rendez-vous</a><a href="#services" class="btn btn-ghost lg">Nos services</a></div>
    <div class="hero-mini">
      <div>${ic('check',18,2.2)} Sans douleur</div><div>${ic('check',18,2.2)} Stérilisation rigoureuse</div><div>${ic('check',18,2.2)} Facilités de paiement</div>
    </div>
  </div>
  <div><div class="hero-card">
    <div class="tooth">${ic('tooth',130)}</div>
    <div class="hero-stats">
      <div><b>${c.years}+</b><span>ANS D'EXPÉRIENCE</span></div>
      <div><b>${c.patients}</b><span>${STATLABEL[c.type]}</span></div>
      <div><b>4.9★</b><span>SATISFACTION</span></div>
    </div>
    <div class="float-badge"><span class="dot">${ic('clock',18,2.4)}</span> RDV en ligne 24h/24</div>
  </div></div>
</div></section>
<section class="trust"><div class="container trust-in">
  <div class="trust-item">${ic('shield',26)}<div><b>Hygiène certifiée</b><small>Stérilisation aux normes</small></div></div>
  <div class="trust-item">${ic('scanner',26)}<div><b>Équipement 3D</b><small>Radio panoramique</small></div></div>
  <div class="trust-item">${ic('team',26)}<div><b>Équipe experte</b><small>Praticiens diplômés</small></div></div>
  <div class="trust-item">${ic('clock',26)}<div><b>Urgences</b><small>Prise en charge rapide</small></div></div>
</div></section>
<section class="section" id="services"><div class="container">
  <div class="section-head"><span class="eyebrow">Nos services</span><h2>${c.svcTitle}</h2><p>Une prise en charge complète, de la prévention aux traitements avancés.</p></div>
  <div class="svc-grid">${svc.map(s=>`<div class="svc-card"><div class="svc-ic">${ic(s[0],28)}</div><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join('')}</div>
</div></section>
<section class="section why" id="pourquoi"><div class="container">
  <div class="section-head"><span class="eyebrow">Pourquoi nous choisir</span><h2>Un cabinet pensé pour votre confort</h2></div>
  <div class="why-grid">
    <div class="why-item"><div class="why-ic">${ic('scanner',30,1.8)}</div><h3>Technologie de pointe</h3><p>Scanner 3D et radiographie numérique pour des diagnostics précis.</p></div>
    <div class="why-item"><div class="why-ic">${ic('shield',30,1.8)}</div><h3>Hygiène irréprochable</h3><p>Protocole de stérilisation strict pour votre sécurité.</p></div>
    <div class="why-item"><div class="why-ic">${ic('heart',30,1.8)}</div><h3>Soins sans douleur</h3><p>Techniques douces et accompagnement des patients anxieux.</p></div>
    <div class="why-item"><div class="why-ic">${ic('clock',30,1.8)}</div><h3>RDV rapides</h3><p>Réservation en ligne 24h/24 et rappels par WhatsApp.</p></div>
  </div>
</div></section>
<section class="section booking" id="rdv"><div class="container book-grid">
  <div class="book-left">
    <span class="eyebrow" style="color:var(--accent)">Rendez-vous en ligne</span>
    <h2>Réservez votre rendez-vous en 30 secondes</h2>
    <p>Choisissez le motif, remplissez vos coordonnées et confirmez. Votre demande arrive directement sur notre WhatsApp — confirmation rapide.</p>
    <ul class="book-pts">
      <li><span class="chk">${ic('check',16,3)}</span> Disponible 24h/24, même le week-end</li>
      <li><span class="chk">${ic('check',16,3)}</span> Confirmation rapide par WhatsApp</li>
      <li><span class="chk">${ic('check',16,3)}</span> Rappel automatique avant le RDV</li>
    </ul>
  </div>
  <form class="book-form" onsubmit="return book(event)">
    <h3>Demande de rendez-vous</h3><p class="sub">${c.name} · Rabat</p>
    <div class="field"><label>Nom complet</label><input name="nom" required placeholder="Votre nom" /></div>
    <div class="row2"><div class="field"><label>Téléphone</label><input name="tel" required type="tel" placeholder="06 ..." /></div><div class="field"><label>Date souhaitée</label><input name="date" type="date" /></div></div>
    <div class="field"><label>Motif de consultation</label><select name="service">${opts}</select></div>
    <div class="field"><label>Message (optionnel)</label><textarea name="note" rows="2" placeholder="Précisez votre demande..."></textarea></div>
    <button class="btn btn-wa" type="submit">${ic('wa',20)} Confirmer mon rendez-vous</button>
    <p class="note">🔒 Vos données restent confidentielles · Aucun paiement en ligne</p>
  </form>
</div></section>
<section class="section"><div class="container">
  <div class="section-head"><span class="eyebrow">Notre cabinet</span><h2>Un environnement moderne &amp; rassurant</h2></div>
  <div class="gal-grid">
    <div class="gal-tile g1">${ic('home',46,1.6)}Accueil chaleureux</div>
    <div class="gal-tile g2">${ic('chair',46,1.6)}Salles de soins</div>
    <div class="gal-tile g3">${ic('scanner',46,1.6)}Imagerie 3D</div>
    <div class="gal-tile g4">${ic('steri',46,1.6)}Stérilisation</div>
  </div>
</div></section>
<section class="section why" id="avis"><div class="container">
  <div class="section-head"><span class="eyebrow">Ils nous font confiance</span><h2>Ce que disent nos patients</h2></div>
  <div class="rev-grid">${rev.map(r=>`<div class="rev-card"><div class="stars">★★★★★</div><p>"${r[3]}"</p><div class="rev-who"><span class="rev-av">${r[0]}</span><div><b>${r[1]}</b><small>Patient · ${r[2]}</small></div></div></div>`).join('')}</div>
  <div style="text-align:center"><span class="g-badge">${ic('check',18,3)} Note moyenne 4,9/5 sur Google</span></div>
</div></section>
<section class="section" id="infos"><div class="container">
  <div class="section-head"><span class="eyebrow">Infos &amp; Accès</span><h2>Nous trouver &amp; nous contacter</h2></div>
  <div class="info-grid">
    <div class="info-card">
      <div class="info-row"><span class="ic">${ic('pin',20)}</span><div><b>Adresse</b><span>${c.address}, Rabat</span></div></div>
      <div class="info-row"><span class="ic">${ic('phone',20)}</span><div><b>Téléphone</b><span>${c.phone}</span></div></div>
      <div class="info-row"><span class="ic">${ic('wa',20)}</span><div><b>WhatsApp</b><span>Réponse rapide · Prise de RDV</span></div></div>
      <h4 style="margin:22px 0 6px;font-size:.82rem;letter-spacing:.1em;text-transform:uppercase;color:var(--primary-d)">Horaires d'ouverture</h4>
      <ul class="hours"><li><span>Lundi – Vendredi</span> <span class="op">09:00 – 19:00</span></li><li><span>Samedi</span> <span class="op">${samedi}</span></li><li><span>Dimanche</span> <span class="cl">Fermé</span></li></ul>
    </div>
    <div class="map-wrap"><iframe loading="lazy" title="Localisation ${c.name}" src="https://maps.google.com/maps?q=${map}&t=&z=14&ie=UTF8&iwloc=&output=embed"></iframe></div>
  </div>
</div></section>
</main>
<footer><div class="container">
  <div class="foot-grid">
    <div><a href="#top" class="brand" style="color:#fff"><span class="logo">${ic('tooth',22)}</span><span><b>${c.name}</b><small style="color:rgba(255,255,255,.5)">${c.brandSmall}</small></span></a><p>${c.footerNote}</p></div>
    <div><h4>Services</h4>${svc.slice(0,4).map(s=>`<a href="#services">${s[1]}</a>`).join('')}</div>
    <div><h4>Contact</h4><a href="#infos">${c.address}, Rabat</a><a href="#infos">${c.phone}</a><a href="#rdv">Prendre rendez-vous</a></div>
  </div>
  <div class="foot-bot">© 2026 ${c.name} · Rabat — Tous droits réservés</div>
</div></footer>
<a class="wa-float" id="waFloat" href="#" target="_blank" aria-label="WhatsApp">${ic('wa',32)}</a>
<script>
/* ⚠️ BIDEL HAD RA9M b ra9m WhatsApp (212 + ra9m bla 0) */
const WHATSAPP = "212661370031";
function book(e){e.preventDefault();var f=e.target;
  var t="Bonjour ${c.name.replace(/"/g,'')}, je souhaite prendre rendez-vous.\\n\\n👤 Nom : "+f.nom.value.trim()+"\\n📞 Téléphone : "+f.tel.value.trim()+"\\n🦷 Motif : "+f.service.value+"\\n📅 Date souhaitée : "+(f.date.value||"à convenir");
  if(f.note.value.trim())t+="\\n📝 Message : "+f.note.value.trim();
  window.open("https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(t),"_blank");return false;}
document.getElementById("waFloat").href="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent("Bonjour, je souhaite un rendez-vous au ${c.name.replace(/"/g,'')}.");
var b=document.getElementById("burger"),m=document.getElementById("menu");
b.addEventListener("click",function(){m.classList.toggle("open")});
m.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){m.classList.remove("open")})});
</script>
</body>
</html>`;
}

/* ─── Les cabinets (#3 → #10) ────────────────────────────────── */
const CABINETS = [
  { slug:'centre-dentaire-zrarqi.html', name:'Centre Dentaire Zrarqi', brandSmall:'Centre Dentaire · Rabat',
    type:'general', pill:'Centre dentaire · Rabat', h1a:'Votre ', h1b:'sourire', h1c:', notre priorité',
    sub:'Soins, implants, orthodontie et esthétique au centre de Rabat. Prenez rendez-vous en ligne, 24h/24.',
    svcTitle:'Tous vos soins dentaires en un seul lieu', metaDesc:'soins, implants, orthodontie et esthétique du sourire.',
    address:'3 avenue Moulay Youssef', phone:'05 37 70 98 36', mapQuery:'3 avenue Moulay Youssef, Rabat',
    years:18, patients:'6 000+', footerNote:'Votre santé bucco-dentaire, notre priorité, au cœur de Rabat.',
    theme:{p:'#2563eb',pd:'#1d4ed8',pl:'#e8effd',a:'#f59e0b',ink:'#14213d',muted:'#5a6b8c',bg:'#f6f9fe',line:'#e4ecfb'} },

  { slug:'abdedine-dental-clinic.html', name:'Abdedine Dental Clinic', brandSmall:'Dental Clinic · Rabat',
    type:'general', pill:'Clinique dentaire · Rabat', h1a:'Une clinique dentaire ', h1b:'moderne', h1c:' à Rabat',
    sub:'Une équipe et un plateau technique modernes pour tous vos soins dentaires. Réservez en ligne en 30 secondes.',
    svcTitle:'Des soins complets dans un cadre moderne', metaDesc:'soins, implants, orthodontie et esthétique dentaire.',
    address:'16 rue Jabal Moussa', phone:'05 37 67 46 16', mapQuery:'16 rue Jabal Moussa, Rabat',
    years:12, patients:'5 000+', footerNote:'Une clinique dentaire moderne au service de votre sourire à Rabat.',
    theme:{p:'#0891b2',pd:'#0e7490',pl:'#e2f5fa',a:'#fb7185',ink:'#0c2e36',muted:'#4f7884',bg:'#f4fbfc',line:'#ddeff3'} },

  { slug:'dr-mrani-alaoui-aziz.html', name:'Dr Mrani Alaoui Aziz', brandSmall:'Orthodontiste · Rabat',
    type:'ortho', pill:'Orthodontie · Orthopédie dento-faciale', h1a:'Des dents ', h1b:'parfaitement alignées', h1c:'',
    sub:'Spécialiste de l\'alignement à Rabat : appareils, Invisalign et orthopédie dento-faciale. Prenez rendez-vous en ligne.',
    svcTitle:'L\'orthodontie pour tous les âges', metaDesc:'orthodontie, Invisalign et orthopédie dento-faciale.',
    address:'19 rue Haroun Ar Rachid', phone:'05 37 67 03 98', mapQuery:'19 rue Haroun Ar Rachid, Rabat',
    years:15, patients:'3 500+', footerNote:'Spécialiste de l\'orthodontie et de l\'alignement dentaire à Rabat.',
    theme:{p:'#7c3aed',pd:'#6927d4',pl:'#f0e9fd',a:'#f59e0b',ink:'#241a3d',muted:'#6b5e86',bg:'#faf8fe',line:'#ece4fb'} },

  { slug:'dr-mahmoud-abdelhamid.html', name:'Dr Mahmoud Abdelhamid', brandSmall:'Chirurgien-Dentiste · Rabat',
    type:'general', pill:'Cabinet dentaire · Rabat', h1a:'Votre santé dentaire ', h1b:'entre de bonnes mains', h1c:'',
    sub:'Soins, implants et esthétique du sourire dans un cabinet de confiance à Rabat. Réservez en ligne, 24h/24.',
    svcTitle:'Tous vos soins dentaires en un seul lieu', metaDesc:'soins, implants, orthodontie et esthétique dentaire.',
    address:'Avenue Hassan II, résidence Essaâda', phone:'05 37 72 44 11', mapQuery:'Avenue Hassan II, Rabat',
    years:20, patients:'7 000+', footerNote:'Des soins dentaires de qualité, en toute confiance, à Rabat.',
    theme:{p:'#059669',pd:'#047857',pl:'#e3f7ef',a:'#f59e0b',ink:'#0c3027',muted:'#50776c',bg:'#f4fcf9',line:'#dcf0e7'} },

  { slug:'dr-cherkaoui-deqaqi-idriss.html', name:'Dr Cherkaoui Deqaqi Idriss', brandSmall:'Chirurgien-Dentiste · Rabat',
    type:'general', pill:'Cabinet dentaire · Rabat', h1a:'Des soins dentaires ', h1b:'de confiance', h1c:' à Rabat',
    sub:'Une prise en charge complète et attentive pour toute la famille. Prenez rendez-vous en ligne en quelques clics.',
    svcTitle:'Une prise en charge dentaire complète', metaDesc:'soins, implants, orthodontie et esthétique dentaire.',
    address:'Avenue Hassan II, angle rue Bayrouth', phone:'05 37 73 13 83', mapQuery:'Avenue Hassan II angle rue Bayrouth, Rabat',
    years:16, patients:'5 500+', footerNote:'Des soins dentaires de confiance pour toute la famille à Rabat.',
    theme:{p:'#4f46e5',pd:'#4338ca',pl:'#eceafc',a:'#f59e0b',ink:'#1e1b40',muted:'#5f5a8a',bg:'#f7f7fe',line:'#e6e4fb'} },

  { slug:'dr-lboukili-laila.html', name:'Dr Lboukili Laïla', brandSmall:'Parodontologie · Implantologie',
    type:'paro', pill:'Parodontologie · Implantologie', h1a:'Gencives saines, ', h1b:'implants durables', h1c:'',
    sub:'Spécialiste des gencives et des implants à Rabat. Parodontologie, greffes et implantologie. Réservez en ligne.',
    svcTitle:'L\'expertise des gencives et des implants', metaDesc:'parodontologie, implantologie et greffe gingivale.',
    address:'2 rue Honeïn', phone:'05 37 67 33 90', mapQuery:'2 rue Honein, Rabat',
    years:14, patients:'2 500+', footerNote:'Spécialiste de la parodontologie et de l\'implantologie à Rabat.',
    theme:{p:'#e11d48',pd:'#be123c',pl:'#fde7ec',a:'#0ea5a4',ink:'#3d1320',muted:'#8a5764',bg:'#fef6f7',line:'#fadce2'} },

  { slug:'dr-abdelkader-bennani.html', name:'Dr Abdelkader Bennani', brandSmall:'Chirurgien-Dentiste · El Akkari',
    type:'general', pill:'Cabinet dentaire · El Akkari, Rabat', h1a:'Un ', h1b:'sourire sain', h1c:' pour toute la famille',
    sub:'Soins, implants et esthétique du sourire à El Akkari, Rabat. Prenez rendez-vous en ligne, à tout moment.',
    svcTitle:'Tous vos soins dentaires en un seul lieu', metaDesc:'soins, implants, orthodontie et esthétique dentaire.',
    address:'65 avenue Sidi Mohamed Ben Abdellah, El Akkari', phone:'05 37 69 06 32', mapQuery:'65 avenue Sidi Mohamed Ben Abdellah, El Akkari, Rabat',
    years:22, patients:'8 000+', footerNote:'Des soins dentaires pour toute la famille à El Akkari, Rabat.',
    theme:{p:'#0d9488',pd:'#0f766e',pl:'#e1f6f3',a:'#f59e0b',ink:'#0c302c',muted:'#4f7771',bg:'#f4fcfa',line:'#dcefec'} },

  { slug:'dr-alaoui-youssef.html', name:'Dr Alaoui Youssef', brandSmall:'Chirurgien-Dentiste · Hassan',
    type:'general', pill:'Cabinet dentaire · Hassan, Rabat', h1a:'Votre dentiste ', h1b:'de confiance', h1c:' à Rabat',
    sub:'Soins, implants et esthétique du sourire au quartier Hassan, Rabat. Réservez votre rendez-vous en ligne.',
    svcTitle:'Tous vos soins dentaires en un seul lieu', metaDesc:'soins, implants, orthodontie et esthétique dentaire.',
    address:'14 rue Mekka, Hassan', phone:'05 37 20 48 94', mapQuery:'14 rue Mekka, Hassan, Rabat',
    years:17, patients:'6 500+', footerNote:'Votre dentiste de confiance au quartier Hassan, Rabat.',
    theme:{p:'#1d4ed8',pd:'#1e40af',pl:'#e7eefc',a:'#f59e0b',ink:'#14213d',muted:'#586a8c',bg:'#f6f9fe',line:'#e3ebfa'} },

  { slug:'dr-elouadghiri-elidrissi.html', name:'Dr ElOuadghiri ElIdrissi', brandSmall:'Chirurgien-Dentiste · Agdal',
    type:'general', pill:'Cabinet dentaire · Agdal, Rabat', h1a:'Votre santé dentaire ', h1b:'en confiance', h1c:', à Agdal',
    sub:'Soins, implants et esthétique du sourire à Agdal, Rabat. Prenez rendez-vous en ligne, 24h/24.',
    svcTitle:'Tous vos soins dentaires en un seul lieu', metaDesc:'soins, implants, orthodontie et esthétique dentaire.',
    address:'66 av. Al Amir Fal Ould Oumeir, Agdal', phone:'05 37 77 70 42', mapQuery:'66 avenue Al Amir Fal Ould Oumeir, Agdal, Rabat',
    years:19, patients:'6 500+', footerNote:'Des soins dentaires de qualité, en toute confiance, à Agdal.',
    theme:{p:'#0284c7',pd:'#0369a1',pl:'#e2f2fd',a:'#f59e0b',ink:'#0c2b3d',muted:'#4f6b80',bg:'#f5fafe',line:'#dcecf9'} },

  { slug:'centre-dentaire-agdal-smile.html', name:'Centre Dentaire Agdal Smile', brandSmall:'Centre Dentaire · Agdal',
    type:'general', pill:'Esthétique du sourire · Agdal', h1a:'Un sourire ', h1b:'éclatant', h1c:', à Agdal',
    sub:'Esthétique du sourire, blanchiment et soins dans un cabinet moderne à Agdal. Réservez en ligne.',
    svcTitle:'Le sourire dont vous rêvez', metaDesc:'esthétique, blanchiment, implants et soins dentaires.',
    address:'59 av. Al Amir Fal Ould Oumeir, Agdal', phone:'05 37 68 39 39', mapQuery:'59 avenue Al Amir Fal Ould Oumeir, Agdal, Rabat',
    years:11, patients:'4 500+', footerNote:'Esthétique du sourire et soins modernes au cœur d\'Agdal.',
    theme:{p:'#db2777',pd:'#be185d',pl:'#fce7f1',a:'#0ea5a4',ink:'#3d1226',muted:'#8a5670',bg:'#fef6fa',line:'#fadbe9'} },

  { slug:'dr-adil-walali-loudiyi.html', name:'Dr Adil Walali Loudiyi', brandSmall:'Orthodontiste · Agdal',
    type:'ortho', pill:'Orthodontie · Agdal, Rabat', h1a:'Des dents ', h1b:'bien alignées', h1c:', à tout âge',
    sub:'Appareils, Invisalign et orthopédie dento-faciale à Agdal, Rabat. Prenez rendez-vous en ligne.',
    svcTitle:'L\'orthodontie pour tous les âges', metaDesc:'orthodontie, Invisalign et orthopédie dento-faciale.',
    address:'30 av. Michlifen, Agdal', phone:'05 37 67 12 16', mapQuery:'30 avenue Michlifen, Agdal, Rabat',
    years:16, patients:'3 800+', footerNote:'Spécialiste de l\'orthodontie et de l\'alignement dentaire à Agdal.',
    theme:{p:'#9333ea',pd:'#7e22ce',pl:'#f3e8fd',a:'#f59e0b',ink:'#2a153d',muted:'#6b5686',bg:'#faf7fe',line:'#eddcfb'} },

  { slug:'dr-mohammed-himmiche.html', name:'Dr Mohammed Himmiche', brandSmall:'Chirurgien-Dentiste · Agdal',
    type:'general', pill:'Cabinet dentaire · Agdal, Rabat', h1a:'Votre dentiste ', h1b:'de confiance', h1c:', à Agdal',
    sub:'Soins, implants et esthétique dentaire à Agdal, Rabat. Réservez votre rendez-vous en ligne.',
    svcTitle:'Tous vos soins dentaires en un seul lieu', metaDesc:'soins, implants, orthodontie et esthétique dentaire.',
    address:'45 av. Ibn Sina, Résidence Warda, Agdal', phone:'05 37 67 28 55', mapQuery:'45 avenue Ibn Sina, Agdal, Rabat',
    years:21, patients:'7 500+', footerNote:'Votre dentiste de confiance à Agdal, Rabat.',
    theme:{p:'#15803d',pd:'#166534',pl:'#e4f5e7',a:'#f59e0b',ink:'#0e2e17',muted:'#4f7359',bg:'#f5fcf6',line:'#dcefdf'} },

  { slug:'dr-hind-lahrizi.html', name:'Dr Hind Lahrizi', brandSmall:'Chirurgien-Dentiste · Rabat',
    type:'general', pill:'Cabinet dentaire · Rabat', h1a:'Des soins dentaires ', h1b:'tout en douceur', h1c:'',
    sub:'Une prise en charge complète et attentive à Rabat. Prenez rendez-vous en ligne en quelques clics.',
    svcTitle:'Une prise en charge dentaire complète', metaDesc:'soins, implants, orthodontie et esthétique dentaire.',
    address:'328 av. Hassan II', phone:'05 37 20 40 15', mapQuery:'328 avenue Hassan II, Rabat',
    years:14, patients:'5 000+', footerNote:'Des soins dentaires tout en douceur à Rabat.',
    theme:{p:'#0e7490',pd:'#155e63',pl:'#e0f4f7',a:'#f59e0b',ink:'#0c2e33',muted:'#4f757c',bg:'#f4fbfc',line:'#daedf1'} },

  { slug:'cabinet-dentaire-al-massira.html', name:'Cabinet Dentaire Al Massira', brandSmall:'Cabinet dentaire · Rabat',
    type:'general', pill:'Cabinet dentaire · Al Massira', h1a:'Votre sourire ', h1b:'en de bonnes mains', h1c:', à Al Massira',
    sub:'Tous vos soins dentaires au quartier Al Massira, Rabat. Réservez en ligne, 24h/24.',
    svcTitle:'Tous vos soins dentaires en un seul lieu', metaDesc:'soins, implants, orthodontie et esthétique dentaire.',
    address:'767 av. Al Massira, Amal 1', phone:'05 37 29 44 44', mapQuery:'767 avenue Al Massira, Rabat',
    years:13, patients:'4 800+', footerNote:'Vos soins dentaires au quartier Al Massira, Rabat.',
    theme:{p:'#6366f1',pd:'#4f46e5',pl:'#eaeafd',a:'#f59e0b',ink:'#1e1b40',muted:'#5f5a8a',bg:'#f7f7fe',line:'#e6e5fb'} },

  { slug:'cabinet-dentaire-ibn-sina.html', name:'Cabinet Dentaire Ibn Sina', brandSmall:'Cabinet dentaire · Rabat',
    type:'general', pill:'Cabinet dentaire · Rabat', h1a:'Votre cabinet dentaire ', h1b:'de confiance', h1c:' à Rabat',
    sub:'Soins, implants et esthétique du sourire à Rabat. Prenez rendez-vous en ligne facilement.',
    svcTitle:'Tous vos soins dentaires en un seul lieu', metaDesc:'soins, implants, orthodontie et esthétique dentaire.',
    address:'Av. Ibn Sina, Complexe Mly', phone:'05 37 73 65 48', mapQuery:'avenue Ibn Sina, Rabat',
    years:18, patients:'6 000+', footerNote:'Des soins dentaires de qualité à Rabat.',
    theme:{p:'#0d9488',pd:'#0f766e',pl:'#e1f6f3',a:'#f59e0b',ink:'#0c302c',muted:'#4f7771',bg:'#f4fcfa',line:'#dcefec'} },

  { slug:'cabinet-dentaire-ghandi.html', name:'Cabinet Dentaire Ghandi', brandSmall:'Parodontologie · Rabat',
    type:'paro', pill:'Parodontologie · Rabat', h1a:'Des gencives ', h1b:'saines', h1c:', un sourire durable',
    sub:'Traitement des gencives et implantologie à Rabat. Parodontologie et soins spécialisés. RDV en ligne.',
    svcTitle:'L\'expertise des gencives et des implants', metaDesc:'parodontologie, implantologie et soins des gencives.',
    address:'6 rue Ghandi', phone:'05 37 26 30 26', mapQuery:'6 rue Ghandi, Rabat',
    years:15, patients:'2 800+', footerNote:'Spécialiste des gencives et de l\'implantologie à Rabat.',
    theme:{p:'#9f1239',pd:'#881337',pl:'#fce7ec',a:'#0ea5a4',ink:'#3d1320',muted:'#8a5764',bg:'#fef6f7',line:'#fadce2'} },

  { slug:'cabinet-parodontologie-agdal.html', name:'Cabinet Parodontologie Agdal', brandSmall:'Paro · Implanto · Agdal',
    type:'paro', pill:'Parodontologie · Implantologie · Agdal', h1a:'Parodontologie & ', h1b:'implants', h1c:', à Agdal',
    sub:'Parodontologie, greffes et implants à Agdal, Rabat. Une expertise dédiée à vos gencives. RDV en ligne.',
    svcTitle:'L\'expertise des gencives et des implants', metaDesc:'parodontologie, implantologie et greffe gingivale.',
    address:'49 av. Fal Ould Oumeir, Agdal', phone:'05 37 77 51 87', mapQuery:'49 avenue Fal Ould Oumeir, Agdal, Rabat',
    years:17, patients:'3 200+', footerNote:'Parodontologie et implantologie à Agdal, Rabat.',
    theme:{p:'#047857',pd:'#065f46',pl:'#e2f5ee',a:'#f59e0b',ink:'#0c3027',muted:'#50776c',bg:'#f4fcf9',line:'#dcf0e7'} },

  { slug:'cabinet-dentaire-pediatrique.html', name:'Cabinet Dentaire Pédiatrique', brandSmall:'Dentiste pour enfants · Rabat',
    type:'pedo', pill:'Dentiste pour enfants · Rabat', h1a:'Le sourire de vos ', h1b:'enfants', h1c:', en confiance',
    sub:'Cabinet dentaire pour enfants à Rabat : des soins doux et rassurants. Prenez rendez-vous en ligne.',
    svcTitle:'Des soins dentaires adaptés aux enfants', metaDesc:'soins dentaires pour enfants, prévention et première visite.',
    address:'Rabat', phone:'05 37 70 50 40', mapQuery:'Rabat',
    years:12, patients:'4 000+', footerNote:'Le sourire de vos enfants entre de bonnes mains, à Rabat.',
    theme:{p:'#0ea5e9',pd:'#0284c7',pl:'#e2f4fd',a:'#fb923c',ink:'#0c2b3d',muted:'#4f6b80',bg:'#f5fafe',line:'#dcecf9'} },
];

CABINETS.forEach((c, i) => {
  fs.writeFileSync(__dirname + '/' + c.slug, render(c, i));
  console.log('✓ généré:', c.slug);
});
console.log('\\n' + CABINETS.length + ' démos générées dans demos/');
