/* ============================================================================
   POSTCRAFT — engine
   ----------------------------------------------------------------------------
   • Every post is DRAWN on a <canvas> (no image assets, no libraries).
   • config.js holds the data; this file holds the drawing routines + the app.
   • `kind` on a template -> a function in DRAWERS below.
   ========================================================================== */
import { CONFIG } from './config.js';

/* ============================ tiny helpers ============================== */
const F = {
  display: "'Bebas Neue', sans-serif",
  sans:    "Poppins, sans-serif",
  head:    "Montserrat, sans-serif",
  serif:   "'Playfair Display', serif",
};

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgba(hex, a) { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})`; }

function setLS(ctx, px) { try { ctx.letterSpacing = `${px}px`; } catch (_) {} }

/* Word-wrap to a max width using the current font. */
function wrap(ctx, text, maxW) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const out = []; let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && line) { out.push(line); line = w; }
    else line = test;
  }
  if (line) out.push(line);
  return out.length ? out : [''];
}
function blockHeight(ctx, text, { font, maxW, lh, ls = 0 }) {
  setLS(ctx, ls); ctx.font = font;
  const n = wrap(ctx, text, maxW).length; setLS(ctx, 0);
  return n * lh;
}
/* Draw centered (or aligned) multi-line text from a top y. Returns height. */
function textBlock(ctx, text, x, top, { font, color, maxW, lh, ls = 0, align = 'center' }) {
  setLS(ctx, ls);
  ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'top';
  const lines = wrap(ctx, text, maxW);
  lines.forEach((ln, i) => ctx.fillText(ln, x, top + i * lh));
  setLS(ctx, 0);
  return lines.length * lh;
}
function fitFont(ctx, text, maxW, start, weight, fam, min) {
  let size = start;
  while (size > min) { ctx.font = `${weight} ${size}px ${fam}`; if (ctx.measureText(text).width <= maxW) break; size -= 4; }
  return size;
}
function rr(ctx, x, y, w, h, r) {
  r = Math.min(r, h / 2, w / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
/* Centered pill. Returns its height. */
function pillC(ctx, cx, top, text, { size, fam = F.head, weight = '700', bg, fg, padX, padY, ls = 0, stroke = null }) {
  setLS(ctx, ls);
  ctx.font = `${weight} ${size}px ${fam}`;
  const tw = ctx.measureText(text).width;
  const w = tw + padX * 2, h = size + padY * 2;
  rr(ctx, cx - w / 2, top, w, h, h / 2);
  if (bg) { ctx.fillStyle = bg; ctx.fill(); }
  if (stroke) { ctx.lineWidth = Math.max(1.5, size * 0.06); ctx.strokeStyle = stroke; ctx.stroke(); }
  ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, cx, top + h / 2 + size * 0.06);
  setLS(ctx, 0);
  return h;
}
/* backgrounds */
function fillV(ctx, W, H, a, b) { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, a); g.addColorStop(1, b); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function fillD(ctx, W, H, a, b) { const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, a); g.addColorStop(1, b); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function fillR(ctx, W, H, cx, cy, r, a, b) { const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, a); g.addColorStop(1, b); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function glow(ctx, W, H, x, y, r, hex, a) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(hex, a)); g.addColorStop(1, rgba(hex, 0)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function frame(ctx, W, H, inset, color, lw) { ctx.lineWidth = lw; ctx.strokeStyle = color; rr(ctx, inset, inset, W - inset * 2, H - inset * 2, inset * 0.5); ctx.stroke(); }

/* stable pseudo-random so decorations don't flicker while editing */
function rng(seed) { return () => { let t = seed += 0x6D2B79F5; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function scatter(ctx, W, H, color, count, rmin, rmax, seed) {
  const r = rng(seed); ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    const x = r() * W, y = r() * H, rad = rmin + r() * (rmax - rmin);
    ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
  }
}

/* ============================== DRAWERS ================================= *
   Each: (ctx, W, H, d, p) where d = field values, p = palette.
   Layouts are vertically centered so they look good in 1:1, 4:5 and 9:16.   */

function megaSale(ctx, W, H, d, p) {
  const s = W / 1080, cx = W / 2, maxW = W * 0.82;
  fillV(ctx, W, H, p.bg, p.bg2);
  glow(ctx, W, H, W * 0.86, H * 0.16, W * 0.7, p.accent, 0.22);
  glow(ctx, W, H, W * 0.1, H * 0.92, W * 0.55, p.accent, 0.1);

  const fHead = `400 ${150 * s}px ${F.display}`, fHL = `400 ${212 * s}px ${F.display}`, fSub = `500 ${30 * s}px ${F.sans}`;
  const badgeS = 23 * s, badgePY = 17 * s, badgeH = badgeS + badgePY * 2;
  const ctaS = 26 * s, ctaPY = 27 * s, ctaH = ctaS + ctaPY * 2;
  const lhHead = 148 * s, lhHL = 188 * s, lhSub = 44 * s;
  const hHead = blockHeight(ctx, d.headline, { font: fHead, maxW, lh: lhHead, ls: 2 * s });
  const hHL = blockHeight(ctx, d.highlight, { font: fHL, maxW, lh: lhHL, ls: 1 * s });
  const hSub = blockHeight(ctx, d.sub, { font: fSub, maxW: maxW * 0.86, lh: lhSub });
  const g = [46 * s, 6 * s, 34 * s, 52 * s];
  const total = badgeH + g[0] + hHead + g[1] + hHL + g[2] + hSub + g[3] + ctaH;
  let y = (H - total) / 2;

  pillC(ctx, cx, y, d.badge, { size: badgeS, bg: p.accent, fg: p.bg, padX: 30 * s, padY: badgePY, ls: 3 * s, weight: '800' }); y += badgeH + g[0];
  textBlock(ctx, d.headline, cx, y, { font: fHead, color: p.fg, maxW, lh: lhHead, ls: 2 * s }); y += hHead + g[1];
  textBlock(ctx, d.highlight, cx, y, { font: fHL, color: p.accent, maxW, lh: lhHL, ls: 1 * s }); y += hHL + g[2];
  textBlock(ctx, d.sub, cx, y, { font: fSub, color: rgba(p.fg, 0.82), maxW: maxW * 0.86, lh: lhSub }); y += hSub + g[3];
  pillC(ctx, cx, y, d.cta, { size: ctaS, bg: p.fg, fg: p.bg, padX: 48 * s, padY: ctaPY, ls: 2 * s, weight: '800' });
}

function flashDeal(ctx, W, H, d, p) {
  const s = W / 1080, cx = W / 2, maxW = W * 0.84;
  fillD(ctx, W, H, p.bg, p.bg2);
  scatter(ctx, W, H, rgba(p.fg, 0.07), 26, 3 * s, 9 * s, 11);
  glow(ctx, W, H, W * 0.5, H * 0.42, W * 0.7, p.accent, 0.16);

  const fEye = `800 ${44 * s}px ${F.head}`, fSub = `500 ${30 * s}px ${F.sans}`;
  const big = `${d.percent}`;
  const pctSize = fitFont(ctx, big, maxW, 400 * s, '400', F.display, 120 * s);
  const fPct = `400 ${pctSize}px ${F.display}`, fWord = `400 ${150 * s}px ${F.display}`;
  const codeS = 24 * s, codePY = 18 * s, codeH = codeS + codePY * 2;
  const hEye = 44 * s, hPct = pctSize * 0.82, hWord = 150 * s * 0.82;
  const hSub = blockHeight(ctx, d.sub, { font: fSub, maxW: maxW * 0.82, lh: 44 * s });
  const g = [34 * s, 0, 30 * s, 46 * s];
  const total = hEye + g[0] + hPct + g[1] + hWord + g[2] + hSub + g[3] + codeH;
  let y = (H - total) / 2;

  textBlock(ctx, d.eyebrow, cx, y, { font: fEye, color: p.accent, maxW, lh: hEye, ls: 8 * s }); y += hEye + g[0];
  textBlock(ctx, big, cx, y, { font: fPct, color: p.fg, maxW, lh: hPct }); y += hPct + g[1];
  textBlock(ctx, d.word, cx, y, { font: fWord, color: p.accent, maxW, lh: hWord, ls: 6 * s }); y += hWord + g[2];
  textBlock(ctx, d.sub, cx, y, { font: fSub, color: rgba(p.fg, 0.9), maxW: maxW * 0.82, lh: 44 * s }); y += hSub + g[3];
  pillC(ctx, cx, y, d.code, { size: codeS, fg: p.fg, padX: 32 * s, padY: codePY, ls: 2 * s, weight: '700', stroke: rgba(p.fg, 0.6) });
}

function quoteSerif(ctx, W, H, d, p) {
  const s = W / 1080, cx = W / 2, maxW = W * 0.74;
  fillV(ctx, W, H, p.bg, p.bg2);
  // big decorative quote mark
  ctx.fillStyle = rgba(p.accent, 0.9); ctx.font = `700 ${320 * s}px ${F.serif}`; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  const markY = H * 0.5 - 320 * s; // placed above center, refined after measuring

  const fQuote = `italic 600 ${62 * s}px ${F.serif}`, fAuth = `700 ${24 * s}px ${F.head}`;
  const lhQ = 80 * s;
  const hQ = blockHeight(ctx, d.quote, { font: fQuote, maxW, lh: lhQ });
  const ruleH = 2 * s, authH = 24 * s;
  const g = [110 * s, 40 * s, 30 * s]; // mark→quote, quote→rule, rule→author
  const total = (140 * s) + g[0] + hQ + g[1] + ruleH + g[2] + authH;
  let y = (H - total) / 2;

  ctx.fillStyle = rgba(p.accent, 0.85); ctx.font = `700 ${300 * s}px ${F.serif}`; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  ctx.fillText('“', cx, y - 40 * s); y += 140 * s + g[0];
  textBlock(ctx, d.quote, cx, y, { font: fQuote, color: p.fg, maxW, lh: lhQ }); y += hQ + g[1];
  ctx.strokeStyle = p.accent; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(cx - 40 * s, y); ctx.lineTo(cx + 40 * s, y); ctx.stroke(); y += ruleH + g[2];
  textBlock(ctx, d.author, cx, y, { font: fAuth, color: rgba(p.fg, 0.72), maxW, lh: authH, ls: 6 * s });
}

function quoteBold(ctx, W, H, d, p) {
  const s = W / 1080, cx = W / 2, maxW = W * 0.8;
  fillD(ctx, W, H, p.bg, p.bg2);
  ctx.fillStyle = rgba(p.fg, 0.06); ctx.font = `800 ${460 * s}px ${F.serif}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('”', cx, H * 0.5);

  const fQuote = `800 ${66 * s}px ${F.sans}`, fAuth = `700 ${24 * s}px ${F.head}`;
  const lhQ = 80 * s, barH = 8 * s, authH = 24 * s;
  const hQ = blockHeight(ctx, d.quote, { font: fQuote, maxW, lh: lhQ });
  const g = [40 * s, 36 * s];
  const total = hQ + g[0] + barH + g[1] + authH;
  let y = (H - total) / 2;

  textBlock(ctx, d.quote, cx, y, { font: fQuote, color: p.fg, maxW, lh: lhQ }); y += hQ + g[0];
  ctx.fillStyle = p.accent; rr(ctx, cx - 60 * s, y, 120 * s, barH, barH / 2); ctx.fill(); y += barH + g[1];
  textBlock(ctx, '— ' + d.author, cx, y, { font: fAuth, color: p.accent, maxW, lh: authH, ls: 4 * s });
}

function eventInvite(ctx, W, H, d, p) {
  const s = W / 1080, cx = W / 2, maxW = W * 0.78;
  fillV(ctx, W, H, p.bg, p.bg2);
  frame(ctx, W, H, 56 * s, rgba(p.fg, 0.18), 2 * s);

  const fEye = `700 ${26 * s}px ${F.head}`, fTitle = `600 ${86 * s}px ${F.serif}`, fDate = `800 ${40 * s}px ${F.head}`, fInfo = `400 ${28 * s}px ${F.sans}`;
  const lhTitle = 92 * s;
  const hTitle = blockHeight(ctx, d.title, { font: fTitle, maxW, lh: lhTitle });
  const eyeH = 26 * s, dateH = 40 * s, infoH = 28 * s;
  const g = [34 * s, 40 * s, 40 * s, 18 * s];
  const total = eyeH + g[0] + hTitle + g[1] + dateH + g[2] + infoH + g[3] + infoH;
  let y = (H - total) / 2;

  textBlock(ctx, d.eyebrow, cx, y, { font: fEye, color: p.accent, maxW, lh: eyeH, ls: 10 * s }); y += eyeH + g[0];
  textBlock(ctx, d.title, cx, y, { font: fTitle, color: p.fg, maxW, lh: lhTitle }); y += hTitle + g[1];
  textBlock(ctx, d.date, cx, y, { font: fDate, color: p.fg, maxW, lh: dateH, ls: 4 * s }); y += dateH + g[2];
  textBlock(ctx, d.time, cx, y, { font: fInfo, color: rgba(p.fg, 0.82), maxW, lh: infoH }); y += infoH + g[3];
  textBlock(ctx, d.place, cx, y, { font: fInfo, color: rgba(p.fg, 0.82), maxW, lh: infoH });
}

function webinar(ctx, W, H, d, p) {
  const s = W / 1080, cx = W / 2, maxW = W * 0.82;
  fillD(ctx, W, H, p.bg, p.bg2);
  glow(ctx, W, H, W * 0.85, H * 0.85, W * 0.6, p.accent, 0.18);
  glow(ctx, W, H, W * 0.12, H * 0.14, W * 0.5, p.accent, 0.12);

  const fTitle = `800 ${72 * s}px ${F.sans}`, fSpk = `400 ${32 * s}px ${F.sans}`;
  const lhTitle = 82 * s;
  const badgeS = 22 * s, badgePY = 16 * s, badgeH = badgeS + badgePY * 2;
  const whenS = 26 * s, whenPY = 18 * s, whenH = whenS + whenPY * 2;
  const ctaS = 26 * s, ctaPY = 26 * s, ctaH = ctaS + ctaPY * 2;
  const hTitle = blockHeight(ctx, d.title, { font: fTitle, maxW, lh: lhTitle });
  const spkH = 32 * s;
  const g = [42 * s, 28 * s, 46 * s, 34 * s];
  const total = badgeH + g[0] + hTitle + g[1] + spkH + g[2] + whenH + g[3] + ctaH;
  let y = (H - total) / 2;

  // live badge with dot
  ctx.font = `700 ${badgeS}px ${F.head}`; setLS(ctx, 2 * s);
  const tw = ctx.measureText(d.badge).width, dot = badgeS * 0.42, padX = 28 * s, gapDot = 14 * s;
  const bw = tw + padX * 2 + dot * 2 + gapDot, bh = badgeH;
  rr(ctx, cx - bw / 2, y, bw, bh, bh / 2); ctx.fillStyle = rgba(p.accent, 0.16); ctx.fill();
  ctx.lineWidth = 1.5 * s; ctx.strokeStyle = rgba(p.accent, 0.5); ctx.stroke();
  ctx.fillStyle = p.accent; ctx.beginPath(); ctx.arc(cx - bw / 2 + padX + dot, y + bh / 2, dot, 0, Math.PI * 2); ctx.fill();
  ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(d.badge, cx - bw / 2 + padX + dot * 2 + gapDot, y + bh / 2 + badgeS * 0.06);
  setLS(ctx, 0); y += badgeH + g[0];

  textBlock(ctx, d.title, cx, y, { font: fTitle, color: p.fg, maxW, lh: lhTitle }); y += hTitle + g[1];
  textBlock(ctx, d.speaker, cx, y, { font: fSpk, color: rgba(p.fg, 0.8), maxW, lh: spkH }); y += spkH + g[2];
  pillC(ctx, cx, y, d.datetime, { size: whenS, bg: p.accent, fg: p.bg, padX: 32 * s, padY: whenPY, ls: 3 * s, weight: '700' }); y += whenH + g[3];
  pillC(ctx, cx, y, d.cta, { size: ctaS, bg: p.fg, fg: p.bg, padX: 46 * s, padY: ctaPY, ls: 2 * s, weight: '800' });
}

function newArrival(ctx, W, H, d, p) {
  const s = W / 1080, M = W * 0.12, maxW = W * 0.76;
  fillV(ctx, W, H, p.bg, p.bg2);
  glow(ctx, W, H, W * 0.8, H * 0.2, W * 0.55, p.accent, 0.14);

  const fEye = `700 ${26 * s}px ${F.head}`, fName = `600 ${92 * s}px ${F.serif}`, fSub = `400 ${30 * s}px ${F.sans}`, fPrice = `800 ${66 * s}px ${F.head}`;
  const lhName = 94 * s, lhSub = 44 * s;
  const eyeH = 26 * s, ruleH = 2 * s, priceH = 66 * s;
  const hName = blockHeight(ctx, d.name, { font: fName, maxW, lh: lhName });
  const hSub = blockHeight(ctx, d.sub, { font: fSub, maxW: maxW * 0.9, lh: lhSub });
  const g = [26 * s, 28 * s, 30 * s, 40 * s];
  const total = eyeH + g[0] + ruleH + g[1] + hName + g[2] + hSub + g[3] + priceH;
  let y = (H - total) / 2;

  textBlock(ctx, d.eyebrow, M, y, { font: fEye, color: p.accent, maxW, lh: eyeH, ls: 12 * s, align: 'left' }); y += eyeH + g[0];
  ctx.strokeStyle = rgba(p.fg, 0.5); ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(M, y); ctx.lineTo(M + 80 * s, y); ctx.stroke(); y += ruleH + g[1];
  textBlock(ctx, d.name, M, y, { font: fName, color: p.fg, maxW, lh: lhName, align: 'left' }); y += hName + g[2];
  textBlock(ctx, d.sub, M, y, { font: fSub, color: rgba(p.fg, 0.72), maxW: maxW * 0.9, lh: lhSub, align: 'left' }); y += hSub + g[3];
  ctx.font = fPrice; ctx.fillStyle = p.accent; ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText(d.price, M, y);
}

function launch(ctx, W, H, d, p) {
  const s = W / 1080, M = W * 0.12, maxW = W * 0.78;
  fillD(ctx, W, H, p.bg, p.bg2);
  glow(ctx, W, H, W * 0.85, H * 0.9, W * 0.6, p.accent, 0.16);

  const fName = `800 ${72 * s}px ${F.sans}`, fFeat = `500 ${31 * s}px ${F.sans}`;
  const lhName = 80 * s, lhFeat = 56 * s;
  const badgeS = 22 * s, badgePY = 16 * s, badgeH = badgeS + badgePY * 2;
  const ctaS = 26 * s, ctaPY = 26 * s, ctaH = ctaS + ctaPY * 2;
  const feats = String(d.feat).split('\n').map(t => t.trim()).filter(Boolean);
  const hName = blockHeight(ctx, d.name, { font: fName, maxW, lh: lhName });
  const hFeat = feats.length * lhFeat;
  const g = [40 * s, 38 * s, 46 * s];
  const total = badgeH + g[0] + hName + g[1] + hFeat + g[2] + ctaH;
  let y = (H - total) / 2;

  // left-aligned badge pill
  ctx.font = `800 ${badgeS}px ${F.head}`; setLS(ctx, 3 * s);
  const tw = ctx.measureText(d.badge).width, bw = tw + 56 * s, bh = badgeH;
  rr(ctx, M, y, bw, bh, bh / 2); ctx.fillStyle = p.accent; ctx.fill();
  ctx.fillStyle = p.bg; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(d.badge, M + 28 * s, y + bh / 2 + badgeS * 0.06);
  setLS(ctx, 0); y += badgeH + g[0];

  textBlock(ctx, d.name, M, y, { font: fName, color: p.fg, maxW, lh: lhName, align: 'left' }); y += hName + g[1];
  feats.forEach((f, i) => {
    const fy = y + i * lhFeat;
    ctx.fillStyle = p.accent; ctx.beginPath(); ctx.arc(M + 8 * s, fy + lhFeat * 0.4, 8 * s, 0, Math.PI * 2); ctx.fill();
    ctx.font = fFeat; ctx.fillStyle = rgba(p.fg, 0.9); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(f, M + 34 * s, fy + lhFeat * 0.4);
  });
  y += hFeat + g[2];
  ctx.font = `800 ${ctaS}px ${F.head}`; setLS(ctx, 2 * s);
  const cw = ctx.measureText(d.cta).width + 92 * s;
  rr(ctx, M, y, cw, ctaH, ctaH / 2); ctx.fillStyle = p.fg; ctx.fill();
  ctx.fillStyle = p.bg; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(d.cta, M + 46 * s, y + ctaH / 2 + ctaS * 0.06);
  setLS(ctx, 0);
}

function tips(ctx, W, H, d, p) {
  const s = W / 1080, M = W * 0.12, maxW = W * 0.76;
  fillV(ctx, W, H, p.bg, p.bg2);
  glow(ctx, W, H, W * 0.85, H * 0.12, W * 0.5, p.accent, 0.16);

  const fKick = `800 ${36 * s}px ${F.head}`, fTitle = `700 ${52 * s}px ${F.sans}`, fNum = `800 ${30 * s}px ${F.head}`, fItem = `500 ${30 * s}px ${F.sans}`, fHandle = `500 ${26 * s}px ${F.sans}`;
  const items = String(d.items).split('\n').map(t => t.trim()).filter(Boolean);
  const lhTitle = 62 * s, lhItem = 66 * s;
  const kickH = 36 * s;
  const hTitle = blockHeight(ctx, d.title, { font: fTitle, maxW, lh: lhTitle });
  const hItems = items.length * lhItem;
  const g = [22 * s, 48 * s];
  const total = kickH + g[0] + hTitle + g[1] + hItems;
  let y = (H - total) / 2 - 20 * s;

  textBlock(ctx, `${d.count} TIPS`, M, y, { font: fKick, color: p.accent, maxW, lh: kickH, ls: 6 * s, align: 'left' }); y += kickH + g[0];
  textBlock(ctx, d.title, M, y, { font: fTitle, color: p.fg, maxW, lh: lhTitle, align: 'left' }); y += hTitle + g[1];
  items.forEach((it, i) => {
    const iy = y + i * lhItem;
    ctx.font = fNum; ctx.fillStyle = p.accent; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(String(i + 1).padStart(2, '0'), M, iy + lhItem * 0.4);
    ctx.font = fItem; ctx.fillStyle = rgba(p.fg, 0.92); ctx.fillText(it, M + 64 * s, iy + lhItem * 0.4);
  });
  // handle bottom-left
  ctx.font = fHandle; ctx.fillStyle = rgba(p.fg, 0.55); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  ctx.fillText(d.handle, M, H - 70 * s);
}

function testimonial(ctx, W, H, d, p) {
  const s = W / 1080, cx = W / 2, maxW = W * 0.76;
  fillV(ctx, W, H, p.bg, p.bg2);
  glow(ctx, W, H, W * 0.5, H * 0.15, W * 0.6, p.accent, 0.14);

  const fStars = `400 ${46 * s}px ${F.sans}`, fQuote = `italic 500 ${46 * s}px ${F.serif}`, fName = `700 ${30 * s}px ${F.sans}`, fRole = `400 ${24 * s}px ${F.sans}`;
  const lhQ = 62 * s, starsH = 46 * s, avatar = 64 * s, nameH = 30 * s, roleH = 24 * s;
  const hQ = blockHeight(ctx, d.quote, { font: fQuote, maxW, lh: lhQ });
  const g = [46 * s, 52 * s, 22 * s, 12 * s];
  const total = starsH + g[0] + hQ + g[1] + avatar + g[2] + nameH + g[3] + roleH;
  let y = (H - total) / 2;

  textBlock(ctx, '★★★★★', cx, y, { font: fStars, color: p.accent, maxW, lh: starsH, ls: 6 * s }); y += starsH + g[0];
  textBlock(ctx, '“' + d.quote + '”', cx, y, { font: fQuote, color: p.fg, maxW, lh: lhQ }); y += hQ + g[1];
  // avatar circle with initials
  const initials = String(d.name).split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
  ctx.fillStyle = p.accent; ctx.beginPath(); ctx.arc(cx, y + avatar / 2, avatar / 2, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = p.bg; ctx.font = `700 ${avatar * 0.42}px ${F.head}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(initials, cx, y + avatar / 2 + avatar * 0.02);
  y += avatar + g[2];
  textBlock(ctx, d.name, cx, y, { font: fName, color: p.fg, maxW, lh: nameH }); y += nameH + g[3];
  textBlock(ctx, d.role, cx, y, { font: fRole, color: rgba(p.fg, 0.6), maxW, lh: roleH, ls: 2 * s });
}

function comingSoon(ctx, W, H, d, p) {
  const s = W / 1080, cx = W / 2, maxW = W * 0.86;
  fillR(ctx, W, H, W * 0.5, H * 0.4, W * 0.9, p.bg2, p.bg);
  // concentric rings
  ctx.strokeStyle = rgba(p.fg, 0.06); ctx.lineWidth = 2 * s;
  for (let i = 1; i <= 3; i++) { ctx.beginPath(); ctx.arc(cx, H * 0.5, W * 0.18 * i, 0, Math.PI * 2); ctx.stroke(); }
  glow(ctx, W, H, cx, H * 0.5, W * 0.5, p.accent, 0.14);

  const fEye = `700 ${30 * s}px ${F.head}`, fHead = `400 ${180 * s}px ${F.display}`, fDate = `700 ${30 * s}px ${F.head}`, fHandle = `500 ${26 * s}px ${F.sans}`;
  const lhHead = 168 * s;
  const eyeH = 30 * s, dateH = 30 * s, lineH = 3 * s;
  const hHead = blockHeight(ctx, d.headline, { font: fHead, maxW, lh: lhHead, ls: 2 * s });
  const g = [30 * s, 44 * s, 40 * s];
  const total = eyeH + g[0] + hHead + g[1] + lineH + g[2] + dateH;
  let y = (H - total) / 2;

  textBlock(ctx, d.eyebrow, cx, y, { font: fEye, color: p.accent, maxW, lh: eyeH, ls: 10 * s }); y += eyeH + g[0];
  textBlock(ctx, d.headline, cx, y, { font: fHead, color: p.fg, maxW, lh: lhHead, ls: 2 * s }); y += hHead + g[1];
  ctx.strokeStyle = p.accent; ctx.lineWidth = lineH; ctx.beginPath(); ctx.moveTo(cx - 70 * s, y); ctx.lineTo(cx + 70 * s, y); ctx.stroke(); y += lineH + g[2];
  textBlock(ctx, d.date, cx, y, { font: fDate, color: rgba(p.fg, 0.82), maxW, lh: dateH, ls: 6 * s });
}

function motivation(ctx, W, H, d, p) {
  const s = W / 1080, cx = W / 2, maxW = W * 0.86;
  fillD(ctx, W, H, p.bg, p.bg2);
  glow(ctx, W, H, cx, H * 0.42, W * 0.55, p.accent, 0.2);
  ctx.fillStyle = rgba(p.fg, 0.05); ctx.beginPath(); ctx.arc(cx, H * 0.42, W * 0.34, 0, Math.PI * 2); ctx.fill();

  const wordSize = fitFont(ctx, d.word, maxW, 300 * s, '400', F.display, 90 * s);
  const fWord = `400 ${wordSize}px ${F.display}`, fSub = `400 ${34 * s}px ${F.sans}`, fHandle = `500 ${26 * s}px ${F.sans}`;
  const wordH = wordSize * 0.82, lhSub = 48 * s;
  const hSub = blockHeight(ctx, d.sub, { font: fSub, maxW: maxW * 0.8, lh: lhSub });
  const g = [40 * s];
  const total = wordH + g[0] + hSub;
  let y = (H - total) / 2;

  textBlock(ctx, d.word, cx, y, { font: fWord, color: p.fg, maxW, lh: wordH, ls: 4 * s }); y += wordH + g[0];
  textBlock(ctx, d.sub, cx, y, { font: fSub, color: rgba(p.fg, 0.9), maxW: maxW * 0.8, lh: lhSub });
  ctx.font = fHandle; ctx.fillStyle = rgba(p.fg, 0.6); ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.fillText(d.handle, cx, H - 80 * s);
}

const DRAWERS = { megaSale, flashDeal, quoteSerif, quoteBold, eventInvite, webinar, newArrival, launch, tips, testimonial, comingSoon, motivation };

/* Convert a template's field array into a plain {key:value} object. */
function valuesOf(fields) { return Object.fromEntries(fields.map(f => [f.key, f.value])); }

/* Draw a template into a canvas context at W×H. */
function drawTemplate(ctx, W, H, kind, d, p) {
  ctx.save();
  ctx.clearRect(0, 0, W, H);
  (DRAWERS[kind] || (() => {}))(ctx, W, H, d, p);
  ctx.restore();
}

/* =============================== APP ==================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const setText = (name, txt) => $$(`[data-bind="${name}"]`).forEach(el => (el.textContent = txt));

function paintStatic() {
  const C = CONFIG;
  setText('brand-name', C.brand.name);
  setText('brand-tag', C.brand.tagline);
  $$('[data-bind="order-cta"]').forEach(a => { a.textContent = C.brand.orderLabel; a.setAttribute('href', C.brand.orderUrl); });

  setText('hero-eyebrow', C.hero.eyebrow);
  setText('hero-title', C.hero.title);
  setText('hero-lede', C.hero.lede);
  setText('hero-cta-1', C.hero.ctaPrimary);
  setText('hero-cta-2', C.hero.ctaSecondary);
  $('[data-bind="hero-stats"]').innerHTML = C.hero.stats.map(s => `<li><b>${s.n}</b><span>${s.label}</span></li>`).join('');

  setText('steps-eyebrow', C.steps.eyebrow);
  setText('steps-title', C.steps.title);
  $('[data-bind="steps-grid"]').innerHTML = C.steps.items.map(s =>
    `<div class="step"><div class="n">${s.n}</div><h3>${s.title}</h3><p>${s.text}</p></div>`).join('');

  setText('pricing-eyebrow', C.pricing.eyebrow);
  setText('pricing-title', C.pricing.title);
  setText('pricing-note', C.pricing.note);
  $('[data-bind="tiers"]').innerHTML = C.pricing.tiers.map(t => `
    <div class="tier ${t.featured ? 'featured' : ''}">
      ${t.featured ? '<span class="badge-pop">Most popular</span>' : ''}
      <h3>${t.name}</h3>
      <div class="tier-tag">${t.tag}</div>
      <div class="price">${t.price}<span> / pack</span></div>
      <ul>${t.features.map(f => `<li>${f}</li>`).join('')}</ul>
      <a class="btn ${t.featured ? 'btn-primary' : 'btn-ghost'} full" href="${C.brand.orderUrl}">${t.cta}</a>
    </div>`).join('');

  const year = new Date().getFullYear();
  setText('footer-copy', `© ${year} ${C.brand.name}`);
  setText('footer-motto', C.footer.motto);
}

/* Render an HTMLCanvas to a square thumbnail for a template. */
function renderThumb(canvas, tpl, size) {
  canvas.width = size; canvas.height = size;
  const p = CONFIG.palettes[tpl.palette];
  drawTemplate(canvas.getContext('2d'), size, size, tpl.kind, valuesOf(tpl.fields), p);
}

function buildHeroStrip() {
  const host = $('[data-bind="hero-strip"]'); if (!host) return;
  const pick = ['mega-sale', 'quote-bold', 'event-invite', 'new-arrival', 'tips', 'motivation', 'webinar', 'coming-soon'];
  pick.forEach(id => {
    const tpl = CONFIG.templates.find(t => t.id === id); if (!tpl) return;
    const c = document.createElement('canvas');
    renderThumb(c, tpl, 264);
    host.appendChild(c);
  });
}

let activeCat = 'All';
function buildFilters() {
  const host = $('[data-bind="filters"]');
  host.innerHTML = CONFIG.categories.map(c =>
    `<button class="chip ${c === activeCat ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
  $$('.chip', host).forEach(btn => btn.addEventListener('click', () => {
    activeCat = btn.dataset.cat;
    $$('.chip', host).forEach(b => b.classList.toggle('active', b === btn));
    buildGallery();
  }));
}

const revealObserver = ('IntersectionObserver' in window) ? new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 }) : null;

function buildGallery() {
  const host = $('[data-bind="gallery"]');
  host.innerHTML = '';
  const list = CONFIG.templates.filter(t => activeCat === 'All' || t.category === activeCat);
  list.forEach((tpl, i) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.style.transitionDelay = `${(i % 6) * 60}ms`;
    card.innerHTML = `
      <div class="card-thumb"><canvas></canvas><div class="open"><span>Customize</span></div></div>
      <div class="card-foot"><b>${tpl.name}</b><span class="cat">${tpl.category}</span></div>`;
    renderThumb($('canvas', card), tpl, 540);
    card.addEventListener('click', () => openEditor(tpl));
    host.appendChild(card);
    if (revealObserver) revealObserver.observe(card); else card.classList.add('in');
  });
  // Safety net: never leave a card invisible if the observer never fires.
  setTimeout(() => $$('.card', host).forEach(c => c.classList.add('in')), 1000);
}

/* ----------------------------- Editor ---------------------------------- */
const editor = {
  el: $('#editor'), tpl: null, values: null, palette: null, formatId: 'square',
};

function openEditor(tpl) {
  editor.tpl = tpl;
  editor.values = valuesOf(tpl.fields);
  editor.palette = tpl.palette;
  editor.formatId = 'square';
  $('#editor-name').textContent = tpl.name;
  buildFormatSeg();
  buildSwatches();
  buildFields();
  renderPreview();
  editor.el.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeEditor() { editor.el.hidden = true; document.body.style.overflow = ''; }

function buildFormatSeg() {
  const seg = $('#format-seg');
  seg.innerHTML = CONFIG.formats.map(f =>
    `<button data-fmt="${f.id}" class="${f.id === editor.formatId ? 'active' : ''}">${f.label}<small>${f.note}</small></button>`).join('');
  $$('button', seg).forEach(b => b.addEventListener('click', () => {
    editor.formatId = b.dataset.fmt;
    $$('button', seg).forEach(x => x.classList.toggle('active', x === b));
    renderPreview();
  }));
}
function buildSwatches() {
  const host = $('#palette-swatches');
  host.innerHTML = Object.entries(CONFIG.palettes).map(([id, p]) =>
    `<button class="swatch ${id === editor.palette ? 'active' : ''}" data-pal="${id}" title="${p.name}"
       style="background:linear-gradient(135deg, ${p.bg}, ${p.bg2})"><i style="background:${p.accent}"></i></button>`).join('');
  $$('.swatch', host).forEach(b => b.addEventListener('click', () => {
    editor.palette = b.dataset.pal;
    $$('.swatch', host).forEach(x => x.classList.toggle('active', x === b));
    renderPreview();
  }));
}
function buildFields() {
  const host = $('#fields');
  host.innerHTML = editor.tpl.fields.map(f => {
    const v = editor.values[f.key].replace(/"/g, '&quot;');
    const input = f.type === 'textarea'
      ? `<textarea data-key="${f.key}" rows="2">${editor.values[f.key]}</textarea>`
      : `<input type="text" data-key="${f.key}" value="${v}" />`;
    return `<div class="field"><label>${f.label}</label>${input}</div>`;
  }).join('');
  $$('[data-key]', host).forEach(inp => inp.addEventListener('input', () => {
    editor.values[inp.dataset.key] = inp.value;
    renderPreview();
  }));
}

function currentFormat() { return CONFIG.formats.find(f => f.id === editor.formatId); }

function renderPreview() {
  const fmt = currentFormat();
  const canvas = $('#preview');
  canvas.width = fmt.w; canvas.height = fmt.h;
  drawTemplate(canvas.getContext('2d'), fmt.w, fmt.h, editor.tpl.kind, editor.values, CONFIG.palettes[editor.palette]);
  $('#editor-dims').textContent = `${fmt.w}×${fmt.h}`;
}

function download() {
  const fmt = currentFormat();
  const k = $('#hd-toggle').checked ? 2 : 1;
  const out = document.createElement('canvas');
  out.width = fmt.w * k; out.height = fmt.h * k;
  drawTemplate(out.getContext('2d'), fmt.w * k, fmt.h * k, editor.tpl.kind, editor.values, CONFIG.palettes[editor.palette]);
  out.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${editor.tpl.id}-${fmt.id}${k > 1 ? '-hd' : ''}.png`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, 'image/png');
}

/* ----------------------------- wire up --------------------------------- */
function bindEvents() {
  $$('[data-close]').forEach(el => el.addEventListener('click', closeEditor));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !editor.el.hidden) closeEditor(); });
  $('#download-btn').addEventListener('click', download);
}

async function init() {
  paintStatic();
  bindEvents();
  const gallery = $('[data-bind="gallery"]');
  gallery.innerHTML = '<p class="loading-note">Loading templates…</p>';

  // Canvas can't draw a webfont until it's loaded — wait for them first.
  const need = [
    `400 32px ${F.display}`, `800 32px ${F.sans}`, `700 32px ${F.sans}`, `600 32px ${F.sans}`, `500 32px ${F.sans}`, `400 32px ${F.sans}`,
    `800 32px ${F.head}`, `700 32px ${F.head}`, `700 32px ${F.serif}`, `600 32px ${F.serif}`, `italic 600 32px ${F.serif}`, `italic 500 32px ${F.serif}`,
  ];
  try { await Promise.all(need.map(f => document.fonts.load(f).catch(() => {}))); await document.fonts.ready; } catch (_) {}

  buildHeroStrip();
  buildFilters();
  buildGallery();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
