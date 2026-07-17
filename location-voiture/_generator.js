// ════════════════════════════════════════════════════════════════
//  Générateur de démos — Location de voitures (Rabat)
//  node location-voiture/_generator.js
//  Bach tzid agence: zid wahed f AGENCES w 3awd t-lance.
// ════════════════════════════════════════════════════════════════
const fs = require('fs');
const WHATSAPP = "212661370031"; // ⚠️ ra9m WhatsApp (212 + bla 0)

const FILL = new Set(['wa','star']);
const PATHS = {
  car:'<path d="M3 13l1.8-5.4A2 2 0 016.7 6h10.6a2 2 0 011.9 1.4L21 13v5a1 1 0 01-1 1h-1.2a1.8 1.8 0 01-3.6 0H8.8a1.8 1.8 0 01-3.6 0H4a1 1 0 01-1-1z"/><path d="M3 13h18"/>',
  suv:'<path d="M2 14l1.5-6A2 2 0 015.4 6.5H18a2 2 0 011.9 1.4L22 14v4a1 1 0 01-1 1h-1.2a1.8 1.8 0 01-3.6 0H7.8a1.8 1.8 0 01-3.6 0H3a1 1 0 01-1-1z"/><path d="M2 14h20M9 6.5V14"/>',
  van:'<path d="M2 6h11v11H2zM13 9h4l4 4v4h-8"/><circle cx="6" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
  key:'<circle cx="8" cy="9" r="4"/><path d="M11 12l8 8M17 18l2-2M15 20l2-2"/>',
  shield:'<path d="M12 2L3 6v6c0 5 9 10 9 10s9-5 9-10V6z"/><path d="M9 12l2 2 4-4"/>',
  gauge:'<path d="M4 19a9 9 0 1116 0"/><path d="M12 15l4-4"/><circle cx="12" cy="15" r="1.2"/>',
  truck:'<path d="M1 5h13v9H1zM14 8h3.5L21 11.5V14h-7"/><circle cx="5" cy="17" r="1.7"/><circle cx="17" cy="17" r="1.7"/>',
  headset:'<path d="M4 14v-2a8 8 0 0116 0v2"/><path d="M4 14a2 2 0 012-2h1v6H6a2 2 0 01-2-2zM20 14a2 2 0 00-2-2h-1v6h1a2 2 0 002-2z"/><path d="M17 18v1a3 3 0 01-3 3h-2"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin:'<path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
  phone:'<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.2-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/>',
  road:'<path d="M4 20L8 4M20 20L16 4M12 6v2M12 11v2M12 16v2"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
  star:'<path d="M12 2l3 6.5 7 .8-5.2 4.8L18.5 22 12 18.3 5.5 22l1.7-7.9L2 9.3l7-.8z"/>',
  check:'<path d="M20 6L9 17l-5-5"/>',
  wa:'<path d="M.5 23.5l1.6-5.9a11.4 11.4 0 1110 5.8h0a11.4 11.4 0 01-5.5-1.4L.5 23.5zM6.9 19l.3.2a9.5 9.5 0 004.8 1.3 9.5 9.5 0 10-9.5-9.5c0 1.8.5 3.5 1.4 5l.2.3-1 3.5 3.6-.9z"/><path d="M9.1 6.8c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3 2 3.1 4.9 4.3c2.4 1 2.9.8 3.4.8s1.7-.7 2-1.4c.2-.6.2-1.2.2-1.3l-.6-.3c-.3-.2-1.7-.9-2-1s-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2s0-.4.1-.5l.4-.5.3-.5v-.5c0-.1-.6-1.6-.9-2.3z"/>',
};
const ic = (n, s=24, sw=2) => { const f=FILL.has(n); return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${f?'currentColor':'none'}"${f?'':` stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`}>${PATHS[n]}</svg>`; };

const FLEET = [
  ['car','Citadine / Économique','Idéale en ville, économe en carburant.','dès 250 DH/j'],
  ['car','Berline','Confort et espace pour tous vos trajets.','dès 350 DH/j'],
  ['suv','SUV / 4×4','Pour la route, la famille et l\'aventure.','dès 600 DH/j'],
  ['suv','Premium / Luxe','Véhicules haut de gamme pour vos occasions.','dès 1200 DH/j'],
  ['van','Monospace / Utilitaire','Pour les groupes et les grands volumes.','dès 450 DH/j'],
  ['key','Longue durée','Tarifs dégressifs pour les locations longues.','sur devis'],
];
const WHYS = [
  ['truck','Livraison gratuite','À l\'aéroport, à votre hôtel ou domicile.'],
  ['shield','Assurance incluse','Roulez l\'esprit tranquille, tous risques.'],
  ['gauge','Kilométrage illimité','Partez loin sans compter les kilomètres.'],
  ['headset','Assistance 24/7','Une équipe disponible à tout moment.'],
];
const REVIEWS = [
  ['H','Hamza R.','Rabat','Voiture propre et récente, livraison à l\'aéroport à l\'heure. Service impeccable, je recommande !'],
  ['I','Imane K.','Rabat','Réservation super simple sur WhatsApp, tarifs corrects et équipe très pro. À refaire sans hésiter.'],
  ['O','Omar B.','Salé','Excellent rapport qualité-prix, assurance incluse et zéro mauvaise surprise. Merci !'],
  ['S','Sara M.','Rabat','Prise en charge rapide, voiture nickel. La réservation en ligne m\'a fait gagner du temps.'],
  ['Y','Yassir T.','Rabat','Agence sérieuse et réactive. SUV impeccable pour notre virée en famille. Top !'],
  ['N','Nabil F.','Rabat','Service au top, livraison gratuite et voiture récente. Rien à redire, je reviendrai.'],
];

function render(c, idx){
  const t = c.theme;
  const rev = [REVIEWS[idx%6], REVIEWS[(idx+2)%6], REVIEWS[(idx+4)%6]];
  const map = encodeURIComponent(c.mapQuery);
  const cats = FLEET.map(f=>`<option>${f[1]}</option>`).join('');
  return `<!doctype html>
<!--
  DÉMO · ${c.name} (Location de voitures · Rabat)
  ⚠️ BACH TBIDEL: 1) [${WHATSAPP}] = ra9m WhatsApp   2) Flotte/prix   3) Adresse/Tel/Horaires   4) Google Maps (q=...)
-->
<html lang="fr">
<head>
<meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${c.name} — Location de voitures à Rabat | Réservation en ligne</title>
<meta name="description" content="${c.name} : location de voitures à Rabat — ${c.metaDesc}. Livraison aéroport, assurance incluse. Réservez en ligne en 30 secondes." />
<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
<style>
:root{--primary:${t.p};--primary-d:${t.pd};--primary-l:${t.pl};--accent:${t.a};--ink:${t.ink};--muted:${t.muted};--bg:${t.bg};--surface:#fff;--line:${t.line};--star:#f5a623;--wa:#25d366;--radius:16px;--shadow:0 18px 50px -22px ${t.pd}66;--maxw:1140px}
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{font-family:'Poppins',system-ui,sans-serif;color:var(--ink);background:var(--bg);line-height:1.6;-webkit-font-smoothing:antialiased}
h1,h2,h3,.disp{font-family:'Plus Jakarta Sans','Poppins',sans-serif;line-height:1.13;font-weight:800;letter-spacing:-.02em}
a{color:inherit;text-decoration:none}img{max-width:100%;display:block}
.container{max-width:var(--maxw);margin:0 auto;padding:0 22px}
.eyebrow{color:var(--primary);font-weight:700;font-size:.8rem;letter-spacing:.16em;text-transform:uppercase}
.section{padding:76px 0}.section-head{max-width:640px;margin:0 auto 44px;text-align:center}
.section-head h2{font-size:clamp(1.7rem,4vw,2.6rem);margin:10px 0}.section-head p{color:var(--muted)}.muted{color:var(--muted)}
.btn{display:inline-flex;align-items:center;gap:9px;border:0;cursor:pointer;font-family:inherit;font-weight:700;font-size:.98rem;padding:14px 26px;border-radius:10px;transition:.2s;white-space:nowrap}
.btn-primary{background:var(--primary);color:#fff;box-shadow:0 12px 26px -12px var(--primary)}.btn-primary:hover{background:var(--primary-d);transform:translateY(-2px)}
.btn-accent{background:var(--accent);color:#161009}.btn-accent:hover{filter:brightness(1.06);transform:translateY(-2px)}
.btn-ghost{background:#fff;color:var(--ink);border:1.5px solid var(--line)}.btn-ghost:hover{border-color:var(--primary)}
.btn-wa{background:var(--wa);color:#fff}.btn-wa:hover{filter:brightness(.95);transform:translateY(-2px)}.btn.lg{padding:17px 32px;font-size:1.05rem}
header.nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.nav-in{display:flex;align-items:center;justify-content:space-between;height:72px}
.brand{display:flex;align-items:center;gap:11px;font-weight:800}.brand .logo{width:44px;height:44px;border-radius:11px;background:linear-gradient(135deg,var(--primary),var(--primary-d));display:grid;place-items:center;color:var(--accent);box-shadow:var(--shadow)}
.brand b{font-size:1.06rem;line-height:1.05}.brand small{display:block;color:var(--muted);font-weight:600;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase}
.nav-links{display:flex;align-items:center;gap:24px}.nav-links a.lnk{font-weight:600;color:var(--muted);font-size:.95rem}.nav-links a.lnk:hover{color:var(--primary)}
.burger{display:none;background:none;border:0;cursor:pointer;padding:8px}.burger span{display:block;width:24px;height:2.5px;background:var(--ink);border-radius:3px;margin:5px 0}
.hero{position:relative;overflow:hidden;background:radial-gradient(900px 520px at 85% -10%,${t.p}22,transparent 60%),radial-gradient(700px 500px at -5% 110%,${t.a}22,transparent 55%),linear-gradient(180deg,#fff,var(--bg))}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:46px;align-items:center;padding:60px 0 70px}
.hero .pill{display:inline-flex;align-items:center;gap:8px;background:var(--primary-l);color:var(--primary-d);font-weight:700;font-size:.82rem;padding:8px 15px;border-radius:999px;margin-bottom:20px}
.hero h1{font-size:clamp(2.2rem,5.4vw,3.7rem)}.hero h1 .hl{color:var(--primary)}
.hero .lede{color:var(--muted);font-size:1.12rem;margin:18px 0 28px;max-width:520px}
.hero-cta{display:flex;gap:14px;flex-wrap:wrap}.hero-mini{display:flex;gap:22px;margin-top:30px;flex-wrap:wrap}
.hero-mini div{display:flex;align-items:center;gap:9px;font-weight:600;font-size:.92rem}.hero-mini svg{color:var(--primary)}
.hero-card{position:relative;background:#fff;border:1px solid var(--line);border-radius:22px;padding:24px;box-shadow:var(--shadow)}
.hero-plate{width:100%;height:230px;border-radius:14px;background:linear-gradient(150deg,var(--primary),var(--primary-d));display:grid;place-items:center;position:relative;overflow:hidden}
.hero-plate svg{width:150px;height:150px;color:var(--accent);opacity:.96;filter:drop-shadow(0 10px 20px rgba(0,0,0,.3))}
.hero-plate::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 30% 22%,rgba(255,255,255,.16),transparent 46%)}
.hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px;text-align:center}
.hero-stats b{display:block;font-family:'Plus Jakarta Sans';font-size:1.4rem;color:var(--primary-d)}.hero-stats span{font-size:.68rem;color:var(--muted);font-weight:600}
.float-badge{position:absolute;bottom:-16px;left:-16px;background:#fff;border:1px solid var(--line);box-shadow:var(--shadow);border-radius:12px;padding:11px 15px;display:flex;align-items:center;gap:10px;font-weight:700;font-size:.85rem}
.float-badge .dot{width:34px;height:34px;border-radius:9px;background:var(--accent);display:grid;place-items:center;color:#161009}
.strip{background:var(--ink)}.strip-in{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:24px 0}
.strip-item{display:flex;align-items:center;gap:12px;color:#fff}.strip-item svg{color:var(--accent);flex:none}
.strip-item b{display:block;font-size:.95rem}.strip-item small{color:rgba(255,255,255,.6);font-size:.77rem}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.car-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:26px;transition:.25s;position:relative;overflow:hidden}
.car-card:hover{transform:translateY(-6px);box-shadow:var(--shadow);border-color:var(--accent)}
.car-ic{width:80px;height:56px;border-radius:12px;background:var(--primary-l);color:var(--primary-d);display:grid;place-items:center;margin-bottom:16px}
.car-card h3{font-size:1.15rem;margin-bottom:6px}.car-card p{color:var(--muted);font-size:.92rem;margin-bottom:14px}
.price{display:inline-flex;align-items:baseline;gap:4px;background:var(--primary);color:#fff;font-weight:700;padding:7px 14px;border-radius:999px;font-size:.9rem}
.why{background:var(--surface)}.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.why-item{text-align:center;padding:14px}.why-ic{width:66px;height:66px;border-radius:50%;margin:0 auto 16px;background:linear-gradient(135deg,var(--primary-l),#fff);border:1px solid var(--line);display:grid;place-items:center;color:var(--primary-d)}
.why-item h3{font-size:1.04rem;margin-bottom:6px}.why-item p{color:var(--muted);font-size:.9rem}
.book{background:linear-gradient(160deg,var(--primary-d),var(--primary))}
.book-grid{display:grid;grid-template-columns:1fr 1.05fr;gap:46px;align-items:center}
.book-left h2{font-size:clamp(1.8rem,4vw,2.6rem);color:#fff}.book-left p{color:rgba(255,255,255,.86);margin:16px 0 26px;font-size:1.05rem}
.book-pts{list-style:none;display:grid;gap:14px}.book-pts li{display:flex;align-items:center;gap:13px;font-weight:600;color:#fff}
.book-pts .chk{width:30px;height:30px;border-radius:8px;background:var(--accent);display:grid;place-items:center;flex:none;color:#161009}
.book-form{background:#fff;border-radius:18px;padding:30px;box-shadow:0 30px 60px -24px rgba(0,0,0,.55)}
.book-form h3{color:var(--ink);font-size:1.3rem;margin-bottom:4px}.book-form .sub{color:var(--muted);font-size:.9rem;margin-bottom:18px}
.field{margin-bottom:14px}.field label{display:block;color:var(--ink);font-weight:600;font-size:.85rem;margin-bottom:6px}
.field input,.field select{width:100%;padding:13px 15px;border:1.5px solid var(--line);border-radius:10px;font-family:inherit;font-size:.95rem;color:var(--ink);background:#fcfcfb;transition:.2s}
.field input:focus,.field select:focus{outline:0;border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-l)}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}.book-form .btn{width:100%;justify-content:center;margin-top:6px}
.book-form .note{text-align:center;color:var(--muted);font-size:.78rem;margin-top:12px}
.rev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.rev-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:26px}
.stars{color:var(--star);font-size:1.05rem;letter-spacing:2px;margin-bottom:12px}.rev-card p{font-size:.95rem;margin-bottom:16px}
.rev-who{display:flex;align-items:center;gap:12px}.rev-av{width:42px;height:42px;border-radius:50%;background:var(--primary-l);color:var(--primary-d);display:grid;place-items:center;font-weight:800}
.rev-who b{font-size:.95rem}.rev-who small{color:var(--muted);display:block;font-size:.78rem}
.g-badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--line);border-radius:999px;padding:9px 18px;font-weight:600;font-size:.9rem;box-shadow:var(--shadow);margin-top:30px}
.info-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:36px}.info-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:30px}
.info-row{display:flex;gap:14px;padding:15px 0;border-bottom:1px solid var(--line)}.info-row:last-child{border:0}
.info-row .ic{width:44px;height:44px;border-radius:11px;background:var(--primary-l);color:var(--primary-d);display:grid;place-items:center;flex:none}
.info-row b{display:block;font-size:.97rem}.info-row span{color:var(--muted);font-size:.9rem}
.hours{list-style:none}.hours li{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px dashed var(--line);font-size:.93rem}.hours li:last-child{border:0}.hours .op{color:var(--primary-d);font-weight:600}
.map-wrap{border-radius:var(--radius);overflow:hidden;border:1px solid var(--line);min-height:340px}.map-wrap iframe{width:100%;height:100%;min-height:340px;border:0;display:block}
footer{background:var(--ink);color:#fff;padding:54px 0 26px}.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:30px;margin-bottom:34px}
.foot-grid p{color:rgba(255,255,255,.6);font-size:.92rem;margin-top:12px;max-width:300px}.foot-grid h4{font-size:.82rem;text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin-bottom:14px}
.foot-grid a{display:block;color:rgba(255,255,255,.75);padding:5px 0;font-size:.93rem}.foot-grid a:hover{color:#fff}
.foot-bot{border-top:1px solid rgba(255,255,255,.12);padding-top:20px;text-align:center;color:rgba(255,255,255,.5);font-size:.84rem}
.wa-float{position:fixed;right:18px;bottom:18px;z-index:60;width:60px;height:60px;border-radius:50%;background:var(--wa);display:grid;place-items:center;box-shadow:0 12px 30px -8px rgba(37,211,102,.7);animation:pulse 2.4s infinite}
.wa-float svg{width:32px;height:32px;color:#fff}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(37,211,102,.5)}70%{box-shadow:0 0 0 16px rgba(37,211,102,0)}100%{box-shadow:0 0 0 0 rgba(37,211,102,0)}}
@media(max-width:920px){.hero-grid,.book-grid,.info-grid{grid-template-columns:1fr}.svc-grid,.why-grid,.rev-grid{grid-template-columns:1fr 1fr}.strip-in{grid-template-columns:1fr 1fr}.foot-grid{grid-template-columns:1fr 1fr}.hero-card{max-width:440px}}
@media(max-width:620px){.nav-links{position:fixed;inset:72px 0 auto 0;background:#fff;flex-direction:column;gap:0;padding:10px 22px 22px;border-bottom:1px solid var(--line);transform:translateY(-135%);transition:.3s;align-items:stretch}.nav-links.open{transform:translateY(0)}.nav-links a.lnk{padding:13px 0;border-bottom:1px solid var(--line)}.nav-links .btn{margin-top:10px;justify-content:center}.burger{display:block}.svc-grid,.why-grid,.rev-grid,.strip-in,.row2,.foot-grid{grid-template-columns:1fr}.section{padding:52px 0}}
</style>
</head>
<body>
<header class="nav"><div class="container nav-in">
  <a href="#top" class="brand"><span class="logo">${ic('car',22)}</span><span><b>${c.name}</b><small>${c.brandSmall}</small></span></a>
  <nav class="nav-links" id="menu">
    <a class="lnk" href="#flotte">Nos voitures</a><a class="lnk" href="#pourquoi">Pourquoi nous</a><a class="lnk" href="#avis">Avis</a><a class="lnk" href="#infos">Contact</a>
    <a class="btn btn-primary" href="#resa">Réserver</a>
  </nav>
  <button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
</div></header>
<main id="top">
<section class="hero"><div class="container hero-grid">
  <div>
    <span class="pill">● ${c.pill}</span>
    <h1>${c.h1a}<span class="hl">${c.h1b}</span>${c.h1c}</h1>
    <p class="lede">${c.sub}</p>
    <div class="hero-cta"><a href="#resa" class="btn btn-primary lg">🚗 Réserver une voiture</a><a href="#flotte" class="btn btn-ghost lg">Voir la flotte</a></div>
    <div class="hero-mini"><div>${ic('check',18)} Livraison aéroport</div><div>${ic('check',18)} Assurance incluse</div><div>${ic('check',18)} Sans surprise</div></div>
  </div>
  <div><div class="hero-card">
    <div class="hero-plate">${ic('car',150)}</div>
    <div class="hero-stats"><div><b>4.7★</b><span>AVIS CLIENTS</span></div><div><b>24/7</b><span>ASSISTANCE</span></div><div><b>0 DH</b><span>LIVRAISON</span></div></div>
    <div class="float-badge"><span class="dot">${ic('calendar',18,2.2)}</span> Réservation en ligne</div>
  </div></div>
</div></section>
<section class="strip"><div class="container strip-in">
  <div class="strip-item">${ic('truck',26)}<div><b>Livraison gratuite</b><small>Aéroport &amp; domicile</small></div></div>
  <div class="strip-item">${ic('shield',26)}<div><b>Assurance incluse</b><small>Tous risques</small></div></div>
  <div class="strip-item">${ic('gauge',26)}<div><b>Km illimité</b><small>Roulez sans compter</small></div></div>
  <div class="strip-item">${ic('clock',26)}<div><b>24/7</b><small>Réservation &amp; assistance</small></div></div>
</div></section>
<section class="section" id="flotte"><div class="container">
  <div class="section-head"><span class="eyebrow">Notre flotte</span><h2>Une voiture pour chaque besoin</h2><p>Des véhicules récents et entretenus, de la citadine au 4×4.</p></div>
  <div class="svc-grid">${FLEET.map(f=>`<div class="car-card"><div class="car-ic">${ic(f[0],40)}</div><h3>${f[1]}</h3><p>${f[2]}</p><span class="price">${f[3]}</span></div>`).join('')}</div>
  <p style="text-align:center;color:var(--muted);font-size:.85rem;margin-top:26px">⚠️ Tarifs donnés à titre d'exemple — à personnaliser.</p>
</div></section>
<section class="section why" id="pourquoi"><div class="container">
  <div class="section-head"><span class="eyebrow">Pourquoi nous choisir</span><h2>La location sans tracas</h2></div>
  <div class="why-grid">${WHYS.map(w=>`<div class="why-item"><div class="why-ic">${ic(w[0],30,1.8)}</div><h3>${w[1]}</h3><p>${w[2]}</p></div>`).join('')}</div>
</div></section>
<section class="section book" id="resa"><div class="container book-grid">
  <div class="book-left">
    <span class="eyebrow" style="color:var(--accent)">Réservation en ligne</span>
    <h2>Réservez votre voiture en 30 secondes</h2>
    <p>Choisissez les dates et la catégorie : votre demande arrive directement sur notre WhatsApp, avec confirmation et devis immédiats.</p>
    <ul class="book-pts">
      <li><span class="chk">${ic('check',16,3)}</span> Devis immédiat, sans engagement</li>
      <li><span class="chk">${ic('check',16,3)}</span> Confirmation rapide par WhatsApp</li>
      <li><span class="chk">${ic('check',16,3)}</span> Livraison où vous voulez</li>
    </ul>
  </div>
  <form class="book-form" onsubmit="return resa(event)">
    <h3>Demande de réservation</h3><p class="sub">${c.name} · Rabat</p>
    <div class="field"><label>Lieu de prise en charge</label><input name="lieu" placeholder="Aéroport, agence, hôtel..." /></div>
    <div class="row2"><div class="field"><label>Date de départ</label><input name="dd" type="date" /></div><div class="field"><label>Date de retour</label><input name="dr" type="date" /></div></div>
    <div class="field"><label>Catégorie souhaitée</label><select name="cat">${cats}</select></div>
    <div class="row2"><div class="field"><label>Nom complet</label><input name="nom" required placeholder="Votre nom" /></div><div class="field"><label>Téléphone</label><input name="tel" required type="tel" placeholder="06 ..." /></div></div>
    <button class="btn btn-wa" type="submit">${ic('wa',20)} Demander mon devis</button>
    <p class="note">🔒 Vos données restent confidentielles · Aucun paiement en ligne</p>
  </form>
</div></section>
<section class="section why" id="avis"><div class="container">
  <div class="section-head"><span class="eyebrow">Ils nous font confiance</span><h2>Avis de nos clients</h2></div>
  <div class="rev-grid">${rev.map(r=>`<div class="rev-card"><div class="stars">★★★★★</div><p>"${r[3]}"</p><div class="rev-who"><span class="rev-av">${r[0]}</span><div><b>${r[1]}</b><small>Client · ${r[2]}</small></div></div></div>`).join('')}</div>
  <div style="text-align:center"><span class="g-badge">${ic('star',18)} Note moyenne 4,7/5 sur Google</span></div>
</div></section>
<section class="section" id="infos"><div class="container">
  <div class="section-head"><span class="eyebrow">Contact &amp; Accès</span><h2>Nous trouver &amp; réserver</h2></div>
  <div class="info-grid">
    <div class="info-card">
      <div class="info-row"><span class="ic">${ic('pin',20)}</span><div><b>Adresse</b><span>${c.address}, Rabat</span></div></div>
      <div class="info-row"><span class="ic">${ic('phone',20)}</span><div><b>Téléphone</b><span>${c.phone}</span></div></div>
      <div class="info-row"><span class="ic">${ic('wa',20)}</span><div><b>WhatsApp</b><span>Réservation &amp; devis rapides</span></div></div>
      <h4 style="margin:22px 0 6px;font-size:.82rem;letter-spacing:.1em;text-transform:uppercase;color:var(--primary-d)">Horaires</h4>
      <ul class="hours"><li><span>Lundi – Dimanche</span> <span class="op">08:00 – 20:00</span></li><li><span>Assistance téléphonique</span> <span class="op">24h/24</span></li></ul>
    </div>
    <div class="map-wrap"><iframe loading="lazy" title="Localisation ${c.name}" src="https://maps.google.com/maps?q=${map}&t=&z=14&ie=UTF8&iwloc=&output=embed"></iframe></div>
  </div>
</div></section>
</main>
<footer><div class="container">
  <div class="foot-grid">
    <div><a href="#top" class="brand" style="color:#fff"><span class="logo">${ic('car',22)}</span><span><b>${c.name}</b><small style="color:rgba(255,255,255,.5)">${c.brandSmall}</small></span></a><p>${c.footerNote}</p></div>
    <div><h4>Location</h4><a href="#flotte">Notre flotte</a><a href="#pourquoi">Pourquoi nous</a><a href="#avis">Avis clients</a></div>
    <div><h4>Contact</h4><a href="#infos">${c.address}, Rabat</a><a href="#infos">${c.phone}</a><a href="#resa">Réserver une voiture</a></div>
  </div>
  <div class="foot-bot">© 2026 ${c.name} · Location de voitures à Rabat — Tous droits réservés</div>
</div></footer>
<a class="wa-float" id="waFloat" href="#" target="_blank" aria-label="WhatsApp">${ic('wa',32)}</a>
<script>
const WHATSAPP = "${WHATSAPP}";
function resa(e){e.preventDefault();var f=e.target;
  var t="Bonjour ${c.name.replace(/"/g,'')}, je souhaite réserver une voiture.\\n\\n👤 Nom : "+f.nom.value.trim()+"\\n📞 Téléphone : "+f.tel.value.trim()+"\\n🚗 Catégorie : "+f.cat.value+"\\n📍 Prise en charge : "+(f.lieu.value.trim()||"à préciser")+"\\n📅 Départ : "+(f.dd.value||"à convenir")+"\\n📅 Retour : "+(f.dr.value||"à convenir");
  window.open("https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(t),"_blank");return false;}
document.getElementById("waFloat").href="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent("Bonjour, je souhaite réserver une voiture chez ${c.name.replace(/"/g,'')}.");
var b=document.getElementById("burger"),m=document.getElementById("menu");
b.addEventListener("click",function(){m.classList.toggle("open")});
m.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){m.classList.remove("open")})});
</script>
</body>
</html>`;
}

const AGENCES = [
  { slug:"ste-gold-car.html", name:"Ste Gold Car", brandSmall:"Location de voitures · Agdal",
    pill:"Location de voitures · Agdal", h1a:"Votre voiture, ", h1b:"en toute simplicité", h1c:"",
    sub:"Location de voitures récentes à Agdal, Rabat : citadines, berlines, SUV et premium. Livraison gratuite et assurance incluse. Réservez en ligne.",
    metaDesc:"citadines, berlines, SUV et véhicules premium", address:"Agdal", phone:"06 99 24 36 08", mapQuery:"Agdal, Rabat",
    footerNote:"Location de voitures récentes à Agdal, Rabat. Livraison &amp; assurance incluses.",
    theme:{p:"#1a1a1a",pd:"#000000",pl:"#f0ece2",a:"#c9a227",ink:"#1a1a1a",muted:"#6b6b6b",bg:"#f7f7f6",line:"#e6e4e0"} },

  { slug:"too-much-cars.html", name:"Too Much Cars", brandSmall:"Location de voitures · Nahda",
    pill:"Location de voitures · Quartier Nahda", h1a:"La route ", h1b:"vous appartient", h1c:"",
    sub:"Location de voitures 24/7 au quartier Nahda, Rabat. Une large flotte, des tarifs clairs et un service rapide. Réservez votre voiture en ligne.",
    metaDesc:"citadines, SUV et utilitaires 24/7", address:"Quartier Nahda", phone:"06 61 79 59 40", mapQuery:"Hay Nahda, Rabat",
    footerNote:"Location de voitures 24/7 au quartier Nahda, Rabat.",
    theme:{p:"#dc2626",pd:"#991b1b",pl:"#fde8e8",a:"#f59e0b",ink:"#2a1414",muted:"#7a5555",bg:"#fdf6f6",line:"#f5dcdc"} },

  { slug:"drive-for-luxury.html", name:"Drive for Luxury", brandSmall:"Location premium · Rabat",
    pill:"Location premium & luxe · Rabat", h1a:"Le luxe sur ", h1b:"quatre roues", h1c:"",
    sub:"Location de voitures premium et de luxe à Rabat : berlines haut de gamme, SUV et sportives. Chauffeur possible. Réservez votre véhicule d'exception en ligne.",
    metaDesc:"voitures de luxe, berlines premium et SUV", address:"27 rue Azkaza, bureau 10", phone:"07 07 19 10 99", mapQuery:"Rue Azkaza, Rabat",
    footerNote:"Location de voitures premium &amp; de luxe à Rabat. Le haut de gamme, en toute simplicité.",
    theme:{p:"#1f2937",pd:"#0b0f17",pl:"#eceef1",a:"#c9a227",ink:"#1f2937",muted:"#5f6674",bg:"#f7f8f9",line:"#e4e7ec"} },

  { slug:"amstel-car.html", name:"Amstel Car", brandSmall:"Location de voitures · Rabat",
    pill:"Location de voitures · Rabat", h1a:"Louez malin, ", h1b:"roulez serein", h1c:"",
    sub:"Location de voitures à prix malin à Rabat : véhicules fiables, assurance incluse et kilométrage illimité. Livraison gratuite. Réservez en ligne.",
    metaDesc:"citadines, berlines et SUV à prix malin", address:"Rabat", phone:"06 64 77 13 71", mapQuery:"Rabat centre",
    footerNote:"Location de voitures à prix malin à Rabat. Fiable et sans surprise.",
    theme:{p:"#1d4ed8",pd:"#1e3a8a",pl:"#e7eefc",a:"#f59e0b",ink:"#14213d",muted:"#586a8c",bg:"#f6f9fe",line:"#e3ebfa"} },

  { slug:"rabat-rent-car.html", name:"Rabat Rent Car", brandSmall:"Location de voitures · Rabat",
    pill:"Location de voitures · Rabat", h1a:"Votre agence de ", h1b:"location", h1c:" à Rabat",
    sub:"Location courte, moyenne et longue durée à Rabat. Une flotte variée, des prix compétitifs et un service réactif. Réservez votre voiture en ligne.",
    metaDesc:"location courte, moyenne et longue durée", address:"Rabat", phone:"07 71 76 75 66", mapQuery:"Rabat",
    footerNote:"Location de voitures courte, moyenne &amp; longue durée à Rabat.",
    theme:{p:"#0369a1",pd:"#075985",pl:"#e2f2fd",a:"#ea580c",ink:"#0c2b3d",muted:"#4f6b80",bg:"#f5fafe",line:"#dcecf9"} },

  { slug:"seven-points-rent-car.html", name:"Seven Points Rent Car", brandSmall:"Location de voitures · Rabat",
    pill:"Location de voitures · Rabat", h1a:"Le bon prix, ", h1b:"la bonne voiture", h1c:"",
    sub:"Location de voitures et 4×4 à Rabat, Salé et aéroport, au meilleur prix garanti. Réservez votre véhicule en ligne, simple et rapide.",
    metaDesc:"voitures et 4×4 au meilleur prix", address:"Rabat", phone:"à compléter", mapQuery:"Rabat",
    footerNote:"Location de voitures &amp; 4×4 à Rabat, Salé et aéroport, au meilleur prix.",
    theme:{p:"#0f766e",pd:"#115e59",pl:"#e0f4f2",a:"#f59e0b",ink:"#0c2e2b",muted:"#4f7772",bg:"#f4fbfa",line:"#daedeb"} },
];

AGENCES.forEach((c,i)=>{ fs.writeFileSync(__dirname+'/'+c.slug, render(c,i)); console.log('✓ généré:', c.slug); });
console.log('\\n'+AGENCES.length+' démos location-voiture générées.');
