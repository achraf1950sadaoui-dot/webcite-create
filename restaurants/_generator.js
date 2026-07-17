// ════════════════════════════════════════════════════════════════
//  Générateur de démos — Restaurants (Rabat)
//  node restaurants/_generator.js  → kaybni kol fichier HTML
//  Bach tzid resto jdid: zid wahed f RESTOS w 3awd t-lance.
// ════════════════════════════════════════════════════════════════
const fs = require('fs');

const FILL = new Set(['wa','star','fire','leaf']);
const PATHS = {
  cutlery:'<path d="M7 2v20M5 2v6a2 2 0 002 2 2 2 0 002-2V2M16 2c-1.7 0-3 2-3 5s1.3 4 3 4v11"/>',
  chef:'<path d="M6 15h12v5a1 1 0 01-1 1H7a1 1 0 01-1-1z"/><path d="M7.5 15a4.5 4.5 0 01-1.5-8.7A4 4 0 0113 5a4 4 0 016.9 3 4.5 4.5 0 01-2.4 7"/>',
  wine:'<path d="M8 3h8l-.7 5.5a3.4 3.4 0 01-6.6 0z"/><path d="M12 15v6M8.5 21h7"/>',
  fire:'<path d="M12 2c1 3 4 4 4 8a4 4 0 01-8 0c0-1 .5-2 .5-2s.5 1.5 1.5 1.5C11 9.5 10 6 12 2z"/>',
  fish:'<path d="M3 12c3-5 9-6 13-3 2 1.5 5 3 5 3s-3 1.5-5 3c-4 3-10 2-13-3z"/><path d="M17 11v2"/>',
  leaf:'<path d="M4 20C3 14 6 5 20 4c1 10-4 15-13 14-1 0-2-1-2-2 3-4 6-6 10-7"/>',
  pepper:'<path d="M12 6c0-2 2-3 4-2M12 6c-3 0-6 3-6 7a5 5 0 0010 0c0-3-2-5-4-5z"/>',
  pizza:'<path d="M12 3l9 4-9 14L3 7z"/><path d="M9 8h.01M11 12h.01M14 9h.01"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
  users:'<path d="M17 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.9"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin:'<path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
  phone:'<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.2-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/>',
  truck:'<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="6" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>',
  home:'<path d="M3 21V8l9-5 9 5v13M9 21v-6h6v6"/>',
  cup:'<path d="M18 8h2a2 2 0 010 4h-2M4 8h14v6a4 4 0 01-4 4H8a4 4 0 01-4-4zM6 2v2M10 2v2M14 2v2"/>',
  star:'<path d="M12 2l3 6.5 7 .8-5.2 4.8L18.5 22 12 18.3 5.5 22l1.7-7.9L2 9.3l7-.8z"/>',
  check:'<path d="M20 6L9 17l-5-5"/>',
  wa:'<path d="M.5 23.5l1.6-5.9a11.4 11.4 0 1110 5.8h0a11.4 11.4 0 01-5.5-1.4L.5 23.5zM6.9 19l.3.2a9.5 9.5 0 004.8 1.3 9.5 9.5 0 10-9.5-9.5c0 1.8.5 3.5 1.4 5l.2.3-1 3.5 3.6-.9z"/><path d="M9.1 6.8c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3 2 3.1 4.9 4.3c2.4 1 2.9.8 3.4.8s1.7-.7 2-1.4c.2-.6.2-1.2.2-1.3l-.6-.3c-.3-.2-1.7-.9-2-1s-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2s0-.4.1-.5l.4-.5.3-.5v-.5c0-.1-.6-1.6-.9-2.3z"/>',
};
const ic = (name, size = 24, sw = 2) => {
  const f = FILL.has(name);
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${f?'currentColor':'none'}"${f?'':` stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`}>${PATHS[name]}</svg>`;
};

/* ─── Spécialités par cuisine ─────────────────────────────────── */
const SPECS = {
  moroccan:[["cutlery","Tajines & Couscous","Les grands classiques marocains, mijotés avec soin."],["leaf","Produits du terroir","Des ingrédients frais et de saison."],["chef","Cadre traditionnel","Une ambiance authentique et chaleureuse."]],
  italian:[["cutlery","Pâtes fraîches","Préparées maison, chaque jour."],["fire","Pizzas au feu de bois","Une pâte fine et croustillante."],["wine","Saveurs d'Italie","Antipasti, vins et desserts italiens."]],
  sushi:[["fish","Poisson frais","Sélectionné chaque matin."],["cutlery","Sushis faits minute","Préparés sous vos yeux."],["leaf","Cuisine japonaise","Makis, sushis, ramen et plus."]],
  grill:[["fire","Grillades au charbon","Des viandes grillées à la perfection."],["cutlery","Viandes sélectionnées","Qualité et fraîcheur garanties."],["chef","Générosité","Des assiettes copieuses et savoureuses."]],
  tapas:[["cutlery","Tapas variées","Un voyage de saveurs à partager."],["wine","Vins & cocktails","Une belle carte de boissons."],["chef","Ambiance conviviale","Le lieu idéal pour se retrouver."]],
  turkish:[["fire","Kebabs & grillades","Adana, Iskender et brochettes."],["chef","Recettes authentiques","Les vraies saveurs de Turquie."],["cup","Pâtisseries turques","Baklava, künefe et thé."]],
  gastro:[["chef","Cuisine raffinée","Des plats travaillés avec passion."],["leaf","Produits de saison","Le meilleur du marché, chaque jour."],["wine","Cadre élégant","Une expérience gastronomique complète."]],
  cafe:[["cup","Café de spécialité","Torréfaction soignée et latte art."],["leaf","Brunch & healthy","Produits frais et options veggie."],["chef","Pâtisseries maison","Des douceurs préparées sur place."]],
};
/* ─── Menus par cuisine ───────────────────────────────────────── */
const MENUS = {
  moroccan:[
    ["Entrées",[["Harira traditionnelle","Soupe marocaine aux légumes","45 DH"],["Briouates au fromage","Feuilletés croustillants","55 DH"],["Salade marocaine","Fraîche et parfumée","40 DH"]]],
    ["Plats",[["Tajine de veau aux pruneaux","Mijoté fondant","95 DH"],["Couscous royal","Semoule & viandes","110 DH"],["Pastilla au poulet","Sucré-salé","90 DH"]]],
    ["Desserts",[["Pâtisseries marocaines","Assortiment maison","45 DH"],["Thé à la menthe","Servi à la marocaine","25 DH"]]],
  ],
  italian:[
    ["Antipasti",[["Bruschetta","Tomate & basilic","55 DH"],["Carpaccio de bœuf","Parmesan & roquette","85 DH"],["Burrata","Crémeuse à souhait","95 DH"]]],
    ["Pâtes & Pizzas",[["Spaghetti bolognaise","Sauce maison","85 DH"],["Pizza Margherita","Feu de bois","75 DH"],["Risotto aux champignons","Crémeux","95 DH"]]],
    ["Desserts",[["Tiramisu","Le vrai, maison","50 DH"],["Panna cotta","Coulis de fruits","45 DH"]]],
  ],
  sushi:[
    ["Entrées",[["Edamame","Fèves de soja","40 DH"],["Gyoza","Raviolis japonais","55 DH"],["Soupe miso","Traditionnelle","35 DH"]]],
    ["Sushis & Makis",[["California roll (x8)","Avocat & surimi","75 DH"],["Sushi saumon (x6)","Saumon frais","80 DH"],["Plateau assorti (x18)","À partager","180 DH"]]],
    ["Plats chauds",[["Ramen","Bouillon maison","85 DH"],["Wok de nouilles","Légumes & sauce","75 DH"]]],
  ],
  grill:[
    ["Entrées",[["Salade César","Poulet & parmesan","55 DH"],["Soupe du jour","Selon le marché","35 DH"]]],
    ["Grillades",[["Entrecôte grillée","Sauce au choix","140 DH"],["Brochettes mixtes","Viandes marinées","110 DH"],["Côtelettes d'agneau","Grillées au charbon","130 DH"]]],
    ["Accompagnements",[["Frites maison","Croustillantes","30 DH"],["Légumes grillés","De saison","40 DH"]]],
  ],
  tapas:[
    ["Tapas",[["Assortiment de tapas","À partager","90 DH"],["Croquetas","Jambon ou poulet","55 DH"],["Patatas bravas","Sauce épicée","45 DH"]]],
    ["Planches",[["Planche de charcuterie","Sélection fine","120 DH"],["Planche de fromages","Affinés","110 DH"]]],
    ["Desserts",[["Churros","Chocolat chaud","45 DH"],["Crème catalane","Caramélisée","45 DH"]]],
  ],
  turkish:[
    ["Entrées",[["Mezze assortis","Sélection turque","70 DH"],["Houmous","Pois chiches & sésame","40 DH"],["Börek","Feuilleté au fromage","50 DH"]]],
    ["Grillades",[["Adana kebab","Épicé & grillé","95 DH"],["Iskender","Sur pain & yaourt","110 DH"],["Brochettes mixtes","Viandes marinées","105 DH"]]],
    ["Desserts",[["Baklava","Miel & pistache","50 DH"],["Künefe","Fromage & sirop","55 DH"]]],
  ],
  gastro:[
    ["Entrées",[["Velouté de saison","Crémeux & parfumé","55 DH"],["Foie gras maison","Chutney de fruits","120 DH"],["Salade gourmande","Fraîcheur & saveurs","65 DH"]]],
    ["Plats signature",[["Filet de bœuf","Sauce & garniture","160 DH"],["Poisson du marché","Selon arrivage","150 DH"],["Suprême de volaille","Crémeux aux morilles","120 DH"]]],
    ["Desserts",[["Fondant au chocolat","Cœur coulant","55 DH"],["Assiette gourmande","Sélection du chef","60 DH"]]],
  ],
  cafe:[
    ["Brunch & Petit-déj",[["Brunch complet","Œufs, pancakes, jus frais","95 DH"],["Œufs Benedict","Sur muffin toasté","65 DH"],["Avocado toast","Pain complet & graines","55 DH"]]],
    ["Salades & Plats",[["Salade César","Poulet grillé & parmesan","65 DH"],["Buddha bowl","Healthy & coloré","70 DH"],["Croque-monsieur","Jambon & fromage","50 DH"]]],
    ["Douceurs & Boissons",[["Pâtisseries maison","Sélection du jour","35 DH"],["Cappuccino","Grains torréfiés","28 DH"],["Jus détox","Pressé minute","35 DH"]]],
  ],
};

const REVIEWS = [
  ["S","Sofia B.","Rabat","Une adresse incroyable ! Cuisine savoureuse et service au top. On reviendra sans hésiter."],
  ["A","Amine K.","Rabat","Cadre agréable et plats généreux. La réservation en ligne est super pratique, réponse immédiate."],
  ["L","Leila M.","Rabat","Un vrai régal, tout était parfait. Ambiance chaleureuse, je recommande à 100%."],
  ["Y","Younes R.","Rabat","Excellent rapport qualité-prix, produits frais. L'équipe est aux petits soins."],
  ["N","Nada T.","Rabat","Coup de cœur ! Des saveurs authentiques et un accueil adorable. À tester absolument."],
  ["O","Omar F.","Rabat","Service rapide et plats délicieux. Parfait pour un dîner en famille ou entre amis."],
];

function render(c, idx){
  const t = c.theme, specs = SPECS[c.cuisine], menu = MENUS[c.cuisine];
  const rev = [REVIEWS[idx%6], REVIEWS[(idx+2)%6], REVIEWS[(idx+4)%6]];
  const map = encodeURIComponent(c.mapQuery);
  const menuHtml = menu.map(cat=>`<div class="menu-cat"><h3>${cat[0]}</h3>${cat[1].map(it=>`<div class="menu-item"><div><b>${it[0]}</b><span>${it[1]}</span></div><em>${it[2]}</em></div>`).join('')}</div>`).join('');
  return `<!doctype html>
<!--
  DÉMO · ${c.name} (Rabat)
  ⚠️ BACH TBIDEL: 1) [212661370031] = ra9m WhatsApp (212 + ra9m bla 0)
     2) Menu / Téléphone / Adresse / Horaires   3) Google Maps (iframe q=...)
-->
<html lang="fr">
<head>
<meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${c.name} — Restaurant à Rabat | Réservation en ligne</title>
<meta name="description" content="${c.name}, ${c.metaDesc} à Rabat. Réservez votre table en ligne en quelques secondes." />
<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800;900&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
:root{--primary:${t.p};--primary-d:${t.pd};--primary-l:${t.pl};--accent:${t.a};--ink:${t.ink};--muted:${t.muted};--bg:${t.bg};--surface:#fff;--line:${t.line};--star:#f5a623;--wa:#25d366;--radius:16px;--shadow:0 18px 50px -22px ${t.pd}66;--maxw:1140px}
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{font-family:'Poppins',system-ui,sans-serif;color:var(--ink);background:var(--bg);line-height:1.6;-webkit-font-smoothing:antialiased}
h1,h2,h3,.disp{font-family:'Playfair Display',serif;line-height:1.12;font-weight:800}
a{color:inherit;text-decoration:none}img{max-width:100%;display:block}
.container{max-width:var(--maxw);margin:0 auto;padding:0 22px}
.eyebrow{color:var(--primary);font-weight:700;font-size:.78rem;letter-spacing:.2em;text-transform:uppercase;font-family:'Poppins'}
.section{padding:76px 0}.section-head{max-width:640px;margin:0 auto 44px;text-align:center}
.section-head h2{font-size:clamp(1.8rem,4vw,2.7rem);margin:10px 0}.section-head p{color:var(--muted)}.muted{color:var(--muted)}
.btn{display:inline-flex;align-items:center;gap:9px;border:0;cursor:pointer;font-family:'Poppins';font-weight:600;font-size:.98rem;padding:14px 26px;border-radius:10px;transition:.2s;white-space:nowrap}
.btn-primary{background:var(--primary);color:#fff;box-shadow:0 12px 26px -12px var(--primary)}.btn-primary:hover{background:var(--primary-d);transform:translateY(-2px)}
.btn-accent{background:var(--accent);color:#1a1408}.btn-accent:hover{filter:brightness(1.06);transform:translateY(-2px)}
.btn-ghost{background:transparent;color:var(--ink);border:1.5px solid var(--line)}.btn-ghost:hover{border-color:var(--primary)}
.btn-wa{background:var(--wa);color:#fff}.btn-wa:hover{filter:brightness(.95);transform:translateY(-2px)}.btn.lg{padding:17px 34px;font-size:1.05rem}
header.nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.9);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.nav-in{display:flex;align-items:center;justify-content:space-between;height:72px}
.brand{display:flex;align-items:center;gap:11px}.brand .logo{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--primary),var(--primary-d));display:grid;place-items:center;color:var(--accent);box-shadow:var(--shadow)}
.brand b{font-family:'Playfair Display';font-size:1.12rem;line-height:1}.brand small{display:block;color:var(--muted);font-weight:500;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;margin-top:2px}
.nav-links{display:flex;align-items:center;gap:24px}.nav-links a.lnk{font-weight:500;color:var(--muted);font-size:.95rem}.nav-links a.lnk:hover{color:var(--primary)}
.burger{display:none;background:none;border:0;cursor:pointer;padding:8px}.burger span{display:block;width:24px;height:2.5px;background:var(--ink);border-radius:3px;margin:5px 0}
.hero{position:relative;overflow:hidden;background:radial-gradient(900px 520px at 85% -10%,${t.p}22,transparent 60%),radial-gradient(700px 500px at -5% 110%,${t.a}22,transparent 55%),linear-gradient(180deg,#fff,var(--bg))}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:46px;align-items:center;padding:64px 0 72px}
.hero .pill{display:inline-flex;align-items:center;gap:8px;background:var(--primary-l);color:var(--primary-d);font-weight:600;font-size:.82rem;padding:8px 15px;border-radius:999px;margin-bottom:20px;font-family:'Poppins'}
.hero h1{font-size:clamp(2.3rem,5.6vw,4rem);font-weight:900}.hero h1 .hl{color:var(--primary);font-style:italic}
.hero .lede{color:var(--muted);font-size:1.12rem;margin:18px 0 28px;max-width:520px}
.hero-cta{display:flex;gap:14px;flex-wrap:wrap}.hero-mini{display:flex;gap:22px;margin-top:30px;flex-wrap:wrap}
.hero-mini div{display:flex;align-items:center;gap:9px;font-weight:500;font-size:.92rem}.hero-mini svg{color:var(--primary)}
.hero-card{position:relative;background:#fff;border:1px solid var(--line);border-radius:22px;padding:24px;box-shadow:var(--shadow)}
.hero-plate{width:100%;height:238px;border-radius:16px;background:linear-gradient(150deg,var(--primary),var(--primary-d));display:grid;place-items:center;position:relative;overflow:hidden}
.hero-plate svg{width:120px;height:120px;color:var(--accent);opacity:.96;filter:drop-shadow(0 10px 20px rgba(0,0,0,.28))}
.hero-plate::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 30% 22%,rgba(255,255,255,.18),transparent 46%)}
.hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px;text-align:center}
.hero-stats b{display:block;font-family:'Playfair Display';font-size:1.4rem;color:var(--primary-d)}.hero-stats span{font-size:.68rem;color:var(--muted);font-weight:600;letter-spacing:.04em}
.float-badge{position:absolute;bottom:-16px;left:-16px;background:#fff;border:1px solid var(--line);box-shadow:var(--shadow);border-radius:12px;padding:11px 15px;display:flex;align-items:center;gap:10px;font-weight:600;font-size:.85rem}
.float-badge .dot{width:34px;height:34px;border-radius:9px;background:var(--accent);display:grid;place-items:center;color:#1a1408}
.strip{background:var(--ink)}.strip-in{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:24px 0}
.strip-item{display:flex;align-items:center;gap:12px;color:#fff}.strip-item svg{color:var(--accent);flex:none}
.strip-item b{display:block;font-size:.95rem;font-family:'Playfair Display'}.strip-item small{color:rgba(255,255,255,.6);font-size:.77rem}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.svc-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:30px 26px;transition:.25s;text-align:center}
.svc-card:hover{transform:translateY(-6px);box-shadow:var(--shadow);border-color:var(--accent)}
.svc-ic{width:62px;height:62px;border-radius:50%;background:var(--primary-l);color:var(--primary-d);display:grid;place-items:center;margin:0 auto 18px}
.svc-card h3{font-size:1.2rem;margin-bottom:8px}.svc-card p{color:var(--muted);font-size:.95rem}
.menu{background:var(--surface)}
.menu-wrap{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
.menu-cat h3{font-size:1.35rem;color:var(--primary-d);padding-bottom:12px;margin-bottom:8px;border-bottom:2px solid var(--primary-l)}
.menu-item{display:flex;justify-content:space-between;gap:12px;align-items:baseline;padding:12px 0;border-bottom:1px dashed var(--line)}
.menu-item:last-child{border:0}.menu-item b{font-family:'Poppins';font-weight:600;font-size:.98rem;display:block}
.menu-item span{color:var(--muted);font-size:.83rem}.menu-item em{color:var(--primary);font-weight:700;font-style:normal;font-family:'Playfair Display';white-space:nowrap}
.menu-note{text-align:center;color:var(--muted);font-size:.85rem;margin-top:30px}
.book{background:linear-gradient(160deg,var(--primary-d),var(--primary))}
.book-grid{display:grid;grid-template-columns:1fr 1.05fr;gap:46px;align-items:center}
.book-left h2{font-size:clamp(1.9rem,4vw,2.7rem);color:#fff}.book-left p{color:rgba(255,255,255,.86);margin:16px 0 26px;font-size:1.05rem}
.book-pts{list-style:none;display:grid;gap:14px}.book-pts li{display:flex;align-items:center;gap:13px;font-weight:500;color:#fff}
.book-pts .chk{width:30px;height:30px;border-radius:8px;background:var(--accent);display:grid;place-items:center;flex:none;color:#1a1408}
.book-form{background:#fff;border-radius:18px;padding:30px;box-shadow:0 30px 60px -24px rgba(0,0,0,.55)}
.book-form h3{color:var(--ink);font-size:1.35rem;margin-bottom:4px}.book-form .sub{color:var(--muted);font-size:.9rem;margin-bottom:18px}
.field{margin-bottom:14px}.field label{display:block;color:var(--ink);font-weight:600;font-size:.85rem;margin-bottom:6px}
.field input,.field select,.field textarea{width:100%;padding:13px 15px;border:1.5px solid var(--line);border-radius:10px;font-family:inherit;font-size:.96rem;color:var(--ink);background:#fcfcfb;transition:.2s}
.field input:focus,.field select:focus,.field textarea:focus{outline:0;border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-l)}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}.book-form .btn{width:100%;justify-content:center;margin-top:6px}
.book-form .note{text-align:center;color:var(--muted);font-size:.78rem;margin-top:12px}
.gal-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.gal-tile{aspect-ratio:1;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#fff;text-align:center;padding:16px;font-weight:600;font-size:.9rem;position:relative;overflow:hidden;font-family:'Playfair Display'}
.gal-tile svg{width:44px;height:44px;opacity:.95}.gal-tile::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 30% 20%,rgba(255,255,255,.2),transparent 50%)}
.g1{background:linear-gradient(140deg,${t.p},${t.pd})}.g2{background:linear-gradient(140deg,${t.a},${t.pd})}.g3{background:linear-gradient(140deg,${t.pd},var(--ink))}.g4{background:linear-gradient(140deg,${t.p}dd,${t.a})}
.rev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.rev-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:26px}
.stars{color:var(--star);font-size:1.05rem;letter-spacing:2px;margin-bottom:12px}.rev-card p{font-size:.96rem;margin-bottom:16px}
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
.foot-grid p{color:rgba(255,255,255,.6);font-size:.92rem;margin-top:12px;max-width:300px}.foot-grid h4{font-size:.82rem;text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin-bottom:14px;font-family:'Poppins'}
.foot-grid a{display:block;color:rgba(255,255,255,.75);padding:5px 0;font-size:.93rem}.foot-grid a:hover{color:#fff}
.foot-bot{border-top:1px solid rgba(255,255,255,.12);padding-top:20px;text-align:center;color:rgba(255,255,255,.5);font-size:.84rem}
.wa-float{position:fixed;right:18px;bottom:18px;z-index:60;width:60px;height:60px;border-radius:50%;background:var(--wa);display:grid;place-items:center;box-shadow:0 12px 30px -8px rgba(37,211,102,.7);animation:pulse 2.4s infinite}
.wa-float svg{width:32px;height:32px;color:#fff}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(37,211,102,.5)}70%{box-shadow:0 0 0 16px rgba(37,211,102,0)}100%{box-shadow:0 0 0 0 rgba(37,211,102,0)}}
@media(max-width:920px){.hero-grid,.book-grid,.info-grid{grid-template-columns:1fr}.svc-grid,.menu-wrap,.rev-grid{grid-template-columns:1fr 1fr}.strip-in{grid-template-columns:1fr 1fr}.foot-grid{grid-template-columns:1fr 1fr}.hero-card{max-width:440px}}
@media(max-width:620px){.nav-links{position:fixed;inset:72px 0 auto 0;background:#fff;flex-direction:column;gap:0;padding:10px 22px 22px;border-bottom:1px solid var(--line);transform:translateY(-135%);transition:.3s;align-items:stretch}.nav-links.open{transform:translateY(0)}.nav-links a.lnk{padding:13px 0;border-bottom:1px solid var(--line)}.nav-links .btn{margin-top:10px;justify-content:center}.burger{display:block}.svc-grid,.menu-wrap,.rev-grid,.gal-grid,.strip-in,.row2,.foot-grid{grid-template-columns:1fr}.section{padding:52px 0}}
</style>
</head>
<body>
<header class="nav"><div class="container nav-in">
  <a href="#top" class="brand"><span class="logo">${ic('cutlery',22)}</span><span><b>${c.name}</b><small>${c.brandSmall}</small></span></a>
  <nav class="nav-links" id="menu">
    <a class="lnk" href="#specs">Le restaurant</a><a class="lnk" href="#menu">Menu</a><a class="lnk" href="#avis">Avis</a><a class="lnk" href="#infos">Infos &amp; Accès</a>
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
    <div class="hero-cta"><a href="#resa" class="btn btn-primary lg">📅 Réserver une table</a><a href="#menu" class="btn btn-ghost lg">Voir le menu</a></div>
    <div class="hero-mini"><div>${ic('check',18)} Produits frais</div><div>${ic('check',18)} Fait maison</div><div>${ic('check',18)} Réservation en ligne</div></div>
  </div>
  <div><div class="hero-card">
    <div class="hero-plate">${ic('cutlery',120)}</div>
    <div class="hero-stats"><div><b>4.6★</b><span>AVIS GOOGLE</span></div><div><b>100%</b><span>FAIT MAISON</span></div><div><b>7j/7</b><span>OUVERT</span></div></div>
    <div class="float-badge"><span class="dot">${ic('calendar',18,2.2)}</span> Réservation en ligne</div>
  </div></div>
</div></section>
<section class="strip"><div class="container strip-in">
  <div class="strip-item">${ic('chef',26)}<div><b>${c.stripCuisine}</b><small>Cuisine soignée</small></div></div>
  <div class="strip-item">${ic('calendar',26)}<div><b>Réservation</b><small>En ligne, 24h/24</small></div></div>
  <div class="strip-item">${ic('truck',26)}<div><b>Livraison</b><small>Glovo &amp; sur place</small></div></div>
  <div class="strip-item">${ic('clock',26)}<div><b>7j/7</b><small>Midi &amp; soir</small></div></div>
</div></section>
<section class="section" id="specs"><div class="container">
  <div class="section-head"><span class="eyebrow">Notre restaurant</span><h2>${c.specTitle}</h2><p>${c.specSub}</p></div>
  <div class="svc-grid">${specs.map(s=>`<div class="svc-card"><div class="svc-ic">${ic(s[0],28)}</div><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join('')}</div>
</div></section>
<section class="section menu" id="menu"><div class="container">
  <div class="section-head"><span class="eyebrow">Notre carte</span><h2>Le menu</h2><p>Une sélection de nos spécialités. Carte complète sur place.</p></div>
  <div class="menu-wrap">${menuHtml}</div>
  <p class="menu-note">⚠️ Menu &amp; prix donnés à titre d'exemple — à personnaliser.</p>
</div></section>
<section class="section book" id="resa"><div class="container book-grid">
  <div class="book-left">
    <span class="eyebrow" style="color:var(--accent)">Réservation en ligne</span>
    <h2>Réservez votre table en 30 secondes</h2>
    <p>Indiquez la date, l'heure et le nombre de personnes. Votre demande arrive directement sur notre WhatsApp — confirmation immédiate.</p>
    <ul class="book-pts">
      <li><span class="chk">${ic('check',16,3)}</span> Disponible 24h/24, 7j/7</li>
      <li><span class="chk">${ic('check',16,3)}</span> Confirmation rapide par WhatsApp</li>
      <li><span class="chk">${ic('check',16,3)}</span> Sans frais, sans compte</li>
    </ul>
  </div>
  <form class="book-form" onsubmit="return resa(event)">
    <h3>Réserver une table</h3><p class="sub">${c.name} · Rabat</p>
    <div class="field"><label>Nom complet</label><input name="nom" required placeholder="Votre nom" /></div>
    <div class="row2"><div class="field"><label>Téléphone</label><input name="tel" required type="tel" placeholder="06 ..." /></div><div class="field"><label>Personnes</label><input name="pers" type="number" min="1" value="2" /></div></div>
    <div class="row2"><div class="field"><label>Date</label><input name="date" type="date" /></div><div class="field"><label>Heure</label><input name="heure" type="time" /></div></div>
    <div class="field"><label>Message (optionnel)</label><textarea name="note" rows="2" placeholder="Occasion, préférences..."></textarea></div>
    <button class="btn btn-wa" type="submit">${ic('wa',20)} Confirmer ma réservation</button>
    <p class="note">🔒 Vos données restent confidentielles · Aucun paiement en ligne</p>
  </form>
</div></section>
<section class="section"><div class="container">
  <div class="section-head"><span class="eyebrow">Ambiance</span><h2>Un cadre qui donne envie</h2></div>
  <div class="gal-grid">
    <div class="gal-tile g1">${ic('cutlery',44,1.6)}Nos plats</div>
    <div class="gal-tile g2">${ic('wine',44,1.6)}Notre bar</div>
    <div class="gal-tile g3">${ic('home',44,1.6)}La salle</div>
    <div class="gal-tile g4">${ic('chef',44,1.6)}En cuisine</div>
  </div>
</div></section>
<section class="section menu" id="avis"><div class="container">
  <div class="section-head"><span class="eyebrow">Ils ont adoré</span><h2>Avis de nos clients</h2></div>
  <div class="rev-grid">${rev.map(r=>`<div class="rev-card"><div class="stars">★★★★★</div><p>"${r[3]}"</p><div class="rev-who"><span class="rev-av">${r[0]}</span><div><b>${r[1]}</b><small>Client · ${r[2]}</small></div></div></div>`).join('')}</div>
  <div style="text-align:center"><span class="g-badge">${ic('star',18)} Note moyenne 4,6/5 sur Google</span></div>
</div></section>
<section class="section" id="infos"><div class="container">
  <div class="section-head"><span class="eyebrow">Infos &amp; Accès</span><h2>Nous trouver &amp; réserver</h2></div>
  <div class="info-grid">
    <div class="info-card">
      <div class="info-row"><span class="ic">${ic('pin',20)}</span><div><b>Adresse</b><span>${c.address}, Rabat</span></div></div>
      <div class="info-row"><span class="ic">${ic('phone',20)}</span><div><b>Téléphone</b><span>${c.phone}</span></div></div>
      <div class="info-row"><span class="ic">${ic('truck',20)}</span><div><b>Livraison</b><span>Disponible sur Glovo</span></div></div>
      <h4 style="margin:22px 0 6px;font-size:.82rem;letter-spacing:.1em;text-transform:uppercase;color:var(--primary-d)">Horaires</h4>
      <ul class="hours"><li><span>Lundi – Jeudi</span> <span class="op">12:00 – 23:00</span></li><li><span>Vendredi – Dimanche</span> <span class="op">12:00 – 00:00</span></li></ul>
    </div>
    <div class="map-wrap"><iframe loading="lazy" title="Localisation ${c.name}" src="https://maps.google.com/maps?q=${map}&t=&z=15&ie=UTF8&iwloc=&output=embed"></iframe></div>
  </div>
</div></section>
</main>
<footer><div class="container">
  <div class="foot-grid">
    <div><a href="#top" class="brand" style="color:#fff"><span class="logo">${ic('cutlery',22)}</span><span><b>${c.name}</b><small style="color:rgba(255,255,255,.5)">${c.brandSmall}</small></span></a><p>${c.footerNote}</p></div>
    <div><h4>Le restaurant</h4><a href="#specs">Notre cuisine</a><a href="#menu">Le menu</a><a href="#avis">Avis clients</a></div>
    <div><h4>Contact</h4><a href="#infos">${c.address}, Rabat</a><a href="#infos">${c.phone}</a><a href="#resa">Réserver une table</a></div>
  </div>
  <div class="foot-bot">© 2026 ${c.name} · Rabat — Tous droits réservés</div>
</div></footer>
<a class="wa-float" id="waFloat" href="#" target="_blank" aria-label="WhatsApp">${ic('wa',32)}</a>
<script>
/* ⚠️ BIDEL HAD RA9M b ra9m WhatsApp (212 + ra9m bla 0) */
const WHATSAPP = "212661370031";
function resa(e){e.preventDefault();var f=e.target;
  var t="Bonjour ${c.name.replace(/"/g,'')}, je souhaite réserver une table.\\n\\n👤 Nom : "+f.nom.value.trim()+"\\n📞 Téléphone : "+f.tel.value.trim()+"\\n👥 Personnes : "+f.pers.value+"\\n📅 Date : "+(f.date.value||"à convenir")+"\\n🕐 Heure : "+(f.heure.value||"à convenir");
  if(f.note.value.trim())t+="\\n📝 Message : "+f.note.value.trim();
  window.open("https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(t),"_blank");return false;}
document.getElementById("waFloat").href="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent("Bonjour, je souhaite réserver une table au ${c.name.replace(/"/g,'')}.");
var b=document.getElementById("burger"),m=document.getElementById("menu");
b.addEventListener("click",function(){m.classList.toggle("open")});
m.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){m.classList.remove("open")})});
</script>
</body>
</html>`;
}

/* ─── Les 10 restaurants (bla website) ───────────────────────── */
const RESTOS = [
  { slug:"lendroit-agdal.html", name:"L'Endroit", brandSmall:"Restaurant & Lounge · Agdal", cuisine:"gastro",
    pill:"Restaurant & Lounge · Agdal", h1a:"L'endroit où ", h1b:"l'on se retrouve", h1c:"",
    sub:"Un restaurant-lounge convivial au cœur d'Agdal. Cuisine soignée, ambiance chaleureuse, ouvert 7j/7. Réservez votre table en ligne.",
    specTitle:"Une table, une ambiance", specSub:"Un cadre élégant et une cuisine généreuse à Agdal.", stripCuisine:"Cuisine & Lounge",
    metaDesc:"restaurant & lounge", address:"28 rue Jabal Oukaïmeden, Agdal", phone:"06 61 37 12 89", mapQuery:"28 rue Jabal Oukaimeden, Agdal, Rabat",
    footerNote:"Restaurant & lounge au cœur d'Agdal, Rabat. Ouvert 7j/7.",
    theme:{p:"#1f2937",pd:"#111827",pl:"#eceef1",a:"#c9a227",ink:"#1f2937",muted:"#5f6674",bg:"#f7f8f9",line:"#e4e7ec"} },

  { slug:"sushi-house-hay-riad.html", name:"Sushi House", brandSmall:"Sushi & Japonais · Hay Riad", cuisine:"sushi",
    pill:"Sushi & Cuisine japonaise · Hay Riad", h1a:"L'art du ", h1b:"sushi", h1c:", à Hay Riad",
    sub:"Sushis, makis et spécialités japonaises préparés minute avec du poisson frais, à Hay Riad. Réservez ou commandez en ligne.",
    specTitle:"La fraîcheur avant tout", specSub:"Une cuisine japonaise authentique à Hay Riad.", stripCuisine:"Cuisine japonaise",
    metaDesc:"restaurant japonais & sushi", address:"Hay Riad", phone:"05 37 56 67 53", mapQuery:"Sushi House Hay Riad, Rabat",
    footerNote:"Sushis & cuisine japonaise faits minute à Hay Riad, Rabat.",
    theme:{p:"#111827",pd:"#030712",pl:"#e8eaed",a:"#dc2626",ink:"#111827",muted:"#5a6270",bg:"#f7f8f9",line:"#e2e5ea"} },

  { slug:"lart-du-gout-hay-riad.html", name:"L'Art du Goût", brandSmall:"Restaurant · Hay Riad", cuisine:"gastro",
    pill:"Cuisine gastronomique · Hay Riad", h1a:"L'art du ", h1b:"goût", h1c:", à chaque assiette",
    sub:"Une cuisine raffinée et créative dans un cadre élégant à Hay Riad. Produits de saison, plats signature. Réservez votre table en ligne.",
    specTitle:"Le goût du raffinement", specSub:"Une expérience gastronomique à Hay Riad.", stripCuisine:"Gastronomie",
    metaDesc:"restaurant gastronomique", address:"377 rue Al Kharroub, Mag 23, Hay Riad", phone:"05 37 71 53 00", mapQuery:"377 rue Al Kharroub, Hay Riad, Rabat",
    footerNote:"Cuisine gastronomique et raffinée à Hay Riad, Rabat.",
    theme:{p:"#134e4a",pd:"#0c3a37",pl:"#e0f0ee",a:"#c9a227",ink:"#0c2e2b",muted:"#4f7772",bg:"#f4fbfa",line:"#daedea"} },

  { slug:"finzi-souissi.html", name:"Finzi", brandSmall:"Restaurant italien · Souissi", cuisine:"italian",
    pill:"Cuisine italienne · Souissi", h1a:"La vraie cuisine ", h1b:"italienne", h1c:", à Souissi",
    sub:"Pâtes fraîches, pizzas au feu de bois et saveurs d'Italie dans un cadre chaleureux à Souissi. Réservez votre table en ligne.",
    specTitle:"L'Italie dans l'assiette", specSub:"Des recettes italiennes authentiques à Souissi.", stripCuisine:"Cuisine italienne",
    metaDesc:"restaurant italien", address:"Av. Mohammed VI, complexe Prestige, Souissi", phone:"05 37 75 81 61", mapQuery:"Restaurant Finzi Souissi, Rabat",
    footerNote:"La vraie cuisine italienne à Souissi, Rabat.",
    theme:{p:"#15803d",pd:"#166534",pl:"#e6f5ea",a:"#dc2626",ink:"#14281a",muted:"#4f7359",bg:"#f6fcf7",line:"#dcefdf"} },

  { slug:"bbq-steak-house-hay-riad.html", name:"BBQ Steak House", brandSmall:"Steakhouse & Grill · Hay Riad", cuisine:"grill",
    pill:"Steakhouse & Grill · Hay Riad", h1a:"L'art de la ", h1b:"grillade", h1c:", à Hay Riad",
    sub:"Des viandes sélectionnées grillées au charbon, généreuses et savoureuses, à Hay Riad. Réservez votre table en ligne.",
    specTitle:"Le royaume de la grillade", specSub:"Viandes grillées et générosité à Hay Riad.", stripCuisine:"Steakhouse & Grill",
    metaDesc:"steakhouse & grill", address:"Hay Riad, sect. 17 lot 3 imm. 15", phone:"05 37 56 42 51", mapQuery:"BBQ Steak House Hay Riad, Rabat",
    footerNote:"Steakhouse & grillades au charbon à Hay Riad, Rabat.",
    theme:{p:"#b45309",pd:"#92400e",pl:"#fbeede",a:"#dc2626",ink:"#3a2410",muted:"#8a6f4f",bg:"#fdf9f3",line:"#f2e6d5"} },

  { slug:"le-petit-beur.html", name:"Le Petit Beur", brandSmall:"Cuisine marocaine · Centre-ville", cuisine:"moroccan",
    pill:"Cuisine marocaine · Centre-ville", h1a:"Le goût ", h1b:"authentique", h1c:" du Maroc",
    sub:"Tajines, couscous et spécialités marocaines dans un cadre traditionnel au centre-ville de Rabat. Réservez votre table en ligne.",
    specTitle:"La tradition marocaine", specSub:"Les saveurs authentiques du Maroc, au centre-ville.", stripCuisine:"Cuisine marocaine",
    metaDesc:"restaurant marocain", address:"Derrière l'Hôtel Balima, Centre-ville", phone:"05 37 73 13 22", mapQuery:"Le Petit Beur, Rabat",
    footerNote:"Cuisine marocaine authentique au centre-ville de Rabat.",
    theme:{p:"#c2410c",pd:"#9a3412",pl:"#fdeee6",a:"#eab308",ink:"#3d2012",muted:"#8a6b57",bg:"#fdf9f4",line:"#f2e5d8"} },

  { slug:"gardenia-agdal.html", name:"Gardenia", brandSmall:"Restaurant · Agdal", cuisine:"gastro",
    pill:"Restaurant gastronomique · Agdal", h1a:"Une parenthèse ", h1b:"gourmande", h1c:", à Agdal",
    sub:"Un restaurant au design raffiné et à l'ambiance contemporaine à Agdal. Cuisine soignée et produits de saison. Réservez en ligne.",
    specTitle:"L'élégance à table", specSub:"Une cuisine raffinée dans un cadre contemporain à Agdal.", stripCuisine:"Gastronomie",
    metaDesc:"restaurant gastronomique", address:"Agdal", phone:"05 37 77 76 00", mapQuery:"Gardenia restaurant Agdal, Rabat",
    footerNote:"Restaurant gastronomique au cadre raffiné à Agdal, Rabat.",
    theme:{p:"#166534",pd:"#14532d",pl:"#e5f4e9",a:"#c9a227",ink:"#0e2e1a",muted:"#4f7359",bg:"#f5fcf7",line:"#dcefdf"} },

  { slug:"la-cerveceria-agdal.html", name:"La Cervecería", brandSmall:"Tapas & Bar · Agdal", cuisine:"tapas",
    pill:"Tapas & Bar · Agdal", h1a:"Tapas & ", h1b:"convivialité", h1c:", à Agdal",
    sub:"Un bar à tapas convivial à Agdal : planches à partager, vins et cocktails dans une ambiance animée. Réservez votre table en ligne.",
    specTitle:"L'esprit tapas", specSub:"Des saveurs à partager dans une ambiance animée.", stripCuisine:"Tapas & Bar",
    metaDesc:"bar à tapas", address:"Agdal", phone:"05 37 67 56 77", mapQuery:"La Cerveceria Agdal, Rabat",
    footerNote:"Bar à tapas convivial à Agdal, Rabat.",
    theme:{p:"#9f1239",pd:"#7f1d3a",pl:"#fce7ec",a:"#eab308",ink:"#3d1320",muted:"#8a5764",bg:"#fef6f7",line:"#fadce2"} },

  { slug:"turkit-agdal.html", name:"Turkit", brandSmall:"Cuisine turque · Agdal", cuisine:"turkish",
    pill:"Cuisine turque · Agdal", h1a:"Saveurs de ", h1b:"Turquie", h1c:", à Agdal",
    sub:"Kebabs, grillades et spécialités turques authentiques à Agdal. Une cuisine généreuse et parfumée. Réservez ou commandez en ligne.",
    specTitle:"Le voyage en Turquie", specSub:"Les vraies saveurs turques à Agdal.", stripCuisine:"Cuisine turque",
    metaDesc:"restaurant turc", address:"Agdal", phone:"05 37 77 61 88", mapQuery:"Turkit restaurant Agdal, Rabat",
    footerNote:"Cuisine turque authentique à Agdal, Rabat.",
    theme:{p:"#0f766e",pd:"#115e59",pl:"#e0f4f2",a:"#c2410c",ink:"#0c2e2b",muted:"#4f7772",bg:"#f4fbfa",line:"#daedeb"} },

  { slug:"coq-magic-agdal.html", name:"Coq Magic", brandSmall:"Grillades & Rôtisserie · Agdal", cuisine:"grill",
    pill:"Grillades & Rôtisserie · Agdal", h1a:"La rôtisserie ", h1b:"gourmande", h1c:", à Agdal",
    sub:"Poulet rôti, grillades et plats généreux à emporter ou sur place, à Agdal. Rapide, savoureux, 7j/7. Commandez ou réservez en ligne.",
    specTitle:"Le goût de la rôtisserie", specSub:"Des grillades généreuses et savoureuses à Agdal.", stripCuisine:"Grillades & Rôtisserie",
    metaDesc:"grillades & rôtisserie", address:"Angle av. Fal Ould Oumeir & av. Oqba Ibn Naafi, Agdal", phone:"05 37 77 77 78", mapQuery:"Coq Magic Agdal, Rabat",
    footerNote:"Grillades & rôtisserie généreuses à Agdal, Rabat.",
    theme:{p:"#ea580c",pd:"#c2410c",pl:"#fdeee2",a:"#166534",ink:"#3a1f0e",muted:"#8a6a52",bg:"#fdf9f4",line:"#f4e6d8"} },

  { slug:"la-terrazza-hay-riad.html", name:"La Terrazza", brandSmall:"Méditerranéen · Hay Riad", cuisine:"gastro",
    pill:"Cuisine méditerranéenne · Hay Riad", h1a:"Une ", h1b:"terrasse", h1c:" aux saveurs de la Méditerranée",
    sub:"Cuisine méditerranéenne et marocaine dans un cadre élégant à Hay Riad. Ouvert midi & soir. Réservez votre table en ligne.",
    specTitle:"L'esprit méditerranéen", specSub:"Des saveurs fraîches et ensoleillées à Hay Riad.", stripCuisine:"Méditerranéen",
    metaDesc:"restaurant méditerranéen", address:"Espace Les Laurier, av. Annakhil, Hay Riad", phone:"06 66 89 56 35", mapQuery:"La Terrazza, Avenue Annakhil, Hay Riad, Rabat",
    footerNote:"Cuisine méditerranéenne dans un cadre élégant à Hay Riad, Rabat.",
    theme:{p:"#0e7490",pd:"#155e63",pl:"#e0f4f7",a:"#e0a92e",ink:"#0c2e33",muted:"#4f757c",bg:"#f4fbfc",line:"#daedf1"} },

  { slug:"boqueria-fina-agdal.html", name:"Boquería Fina", brandSmall:"Tapas & Espagnol · Agdal", cuisine:"tapas",
    pill:"Tapas & Cuisine espagnole · Agdal", h1a:"L'Espagne ", h1b:"à partager", h1c:", à Agdal",
    sub:"Un bar-restaurant animé au cœur d'Agdal : tapas, saveurs espagnoles et méditerranéennes, vins et cocktails. Réservez en ligne.",
    specTitle:"L'art de partager", specSub:"Tapas et saveurs espagnoles dans une ambiance animée.", stripCuisine:"Tapas & Espagnol",
    metaDesc:"bar à tapas espagnol", address:"Agdal", phone:"06 61 69 05 97", mapQuery:"Boqueria Fina, Agdal, Rabat",
    footerNote:"Bar à tapas et cuisine espagnole au cœur d'Agdal, Rabat.",
    theme:{p:"#b91c1c",pd:"#991b1b",pl:"#fbe8e8",a:"#eab308",ink:"#3a1414",muted:"#8a5757",bg:"#fdf6f6",line:"#f5dcdc"} },

  { slug:"boho-cafe-hassan.html", name:"Boho Café", brandSmall:"Café & Brunch · Hassan", cuisine:"cafe",
    pill:"Café & Brunch · Hassan", h1a:"Le ", h1b:"brunch", h1c:" dans un esprit bohème",
    sub:"Un café-restaurant cosy à Hassan : brunch, café de spécialité et pâtisseries maison dans une ambiance bohème. Réservez votre table en ligne.",
    specTitle:"L'esprit boho", specSub:"Un lieu cosy pour le café, le brunch et les douceurs.", stripCuisine:"Café & Brunch",
    metaDesc:"café & brunch", address:"10 rue El Yamama, Hassan", phone:"06 90 03 61 70", mapQuery:"Boho Cafe, rue El Yamama, Rabat",
    footerNote:"Café, brunch et pâtisseries dans un esprit bohème à Hassan, Rabat.",
    theme:{p:"#c2410c",pd:"#9a3412",pl:"#fdeee6",a:"#4f7359",ink:"#3d2415",muted:"#8a6b57",bg:"#fdf9f4",line:"#f2e5d8"} },

  { slug:"la-scene-hassan.html", name:"La Scène", brandSmall:"Restaurant · Hassan", cuisine:"gastro",
    pill:"Restaurant · Hassan", h1a:"Entrez ", h1b:"en scène", h1c:", à Hassan",
    sub:"Une cuisine soignée dans un cadre élégant et animé à Hassan, Rabat. Idéal pour un dîner entre amis ou en famille. Réservez en ligne.",
    specTitle:"Le goût du spectacle", specSub:"Une cuisine raffinée dans une ambiance vivante à Hassan.", stripCuisine:"Restaurant",
    metaDesc:"restaurant", address:"12 rue Halab, Hassan", phone:"06 66 55 79 21", mapQuery:"La Scene restaurant, rue Halab, Rabat",
    footerNote:"Cuisine soignée et ambiance élégante à Hassan, Rabat.",
    theme:{p:"#1f2937",pd:"#111827",pl:"#eceef1",a:"#c9a227",ink:"#1f2937",muted:"#5f6674",bg:"#f7f8f9",line:"#e4e7ec"} },

  { slug:"sushi-youzar-hay-riad.html", name:"Sushi Youzar", brandSmall:"Sushi & Japonais · Hay Riad", cuisine:"sushi",
    pill:"Sushi & Cuisine japonaise · Hay Riad", h1a:"Le ", h1b:"sushi", h1c:" comme vous l'aimez",
    sub:"Sushis, makis et spécialités japonaises préparés avec du poisson frais, à Hay Riad. Livraison & sur place. Commandez ou réservez en ligne.",
    specTitle:"Fraîcheur & précision", specSub:"Une cuisine japonaise soignée à Hay Riad.", stripCuisine:"Cuisine japonaise",
    metaDesc:"restaurant japonais & sushi", address:"Av. Abderrahim Bouabid, Hay Riad", phone:"À compléter", mapQuery:"Sushi Youzar, Avenue Abderrahim Bouabid, Rabat",
    footerNote:"Sushis & cuisine japonaise à Hay Riad, Rabat.",
    theme:{p:"#0f172a",pd:"#020617",pl:"#e8eaef",a:"#dc2626",ink:"#0f172a",muted:"#5a6172",bg:"#f7f8fa",line:"#e3e6ec"} },

  { slug:"il-giardino-agdal.html", name:"Il Giardino", brandSmall:"Restaurant italien · Agdal", cuisine:"italian",
    pill:"Cuisine italienne · Agdal", h1a:"Un ", h1b:"jardin", h1c:" de saveurs italiennes",
    sub:"Pizzas, pâtes et spécialités italiennes avec de bons produits, dans un cadre agréable avec terrasse à Agdal. Réservez votre table en ligne.",
    specTitle:"La dolce vita", specSub:"Des recettes italiennes généreuses à Agdal.", stripCuisine:"Cuisine italienne",
    metaDesc:"restaurant italien", address:"Agdal", phone:"À compléter", mapQuery:"Il Giardino restaurant Agdal, Rabat",
    footerNote:"Cuisine italienne généreuse dans un cadre agréable à Agdal, Rabat.",
    theme:{p:"#4d7c0f",pd:"#3f6212",pl:"#eef6e0",a:"#dc2626",ink:"#20280e",muted:"#5f7345",bg:"#f9fcf3",line:"#e6efd5"} },
];

RESTOS.forEach((c,i)=>{ fs.writeFileSync(__dirname+'/'+c.slug, render(c,i)); console.log('✓ généré:', c.slug); });
console.log('\\n'+RESTOS.length+' démos restaurants générées.');
