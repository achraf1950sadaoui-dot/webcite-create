/************************************************************************
 *  GMAIL MAIL-MERGE — Dubai web-client outreach
 *  Sends personalized cold emails from YOUR OWN Gmail, from a Google Sheet.
 *  Safe by default: creates DRAFTS you review before sending.
 *  ---------------------------------------------------------------------
 *  SETUP (5 min):
 *   1. Export your leads from the Lead Manager (⬇ Export CSV).
 *   2. Create a Google Sheet, File > Import > upload the CSV.
 *      Header row must contain: Business Name, Category, Area, Email,
 *      Website Status, Stage  (extra columns are fine).
 *   3. Extensions > Apps Script. Paste this whole file. Save.
 *   4. Edit the CONFIG below (your name, agency, WhatsApp, website, preview base).
 *   5. Run  prepareDrafts  once. Approve the Gmail permission prompt.
 *   6. Open Gmail > Drafts, review, and send (or set MODE='send' to auto-send).
 ************************************************************************/

const CONFIG = {
  SHEET_NAME:   'Sheet1',            // tab name that holds your leads
  MODE:         'draft',             // 'draft' (review first) or 'send' (auto-send)
  DAILY_CAP:    20,                  // start LOW (10-20). Ramp up over weeks. Protects your domain.
  SENDER_NAME:  'Your Name',
  AGENCY:       'Your Agency',
  MY_WHATSAPP:  '+971 5X XXX XXXX',
  MY_WEBSITE:   'youragency.ae',
  PREVIEW_BASE: '',                  // e.g. 'https://youragency.ae/preview/'  (blank = [preview link])
  DEMO_LINK:    'https://youragency.ae/demo',  // your live demo-restaurant URL
  ONLY_HOT:     false,               // true = only email rows with Fit Score >= 70
};

/* ── column header → index (case-insensitive, trimmed) ── */
function _cols(sheet){
  const hdr = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0].map(h=>String(h).trim().toLowerCase());
  const find = names => { for(const n of names){const i=hdr.indexOf(n.toLowerCase()); if(i>=0)return i;} return -1; };
  return {
    name:  find(['business name','name']),
    cat:   find(['category']),
    area:  find(['area']),
    email: find(['email']),
    web:   find(['website status','website']),
    score: find(['fit score','score']),
    stage: find(['stage']),
    status:find(['send status']),     // created by this script
    sent:  find(['sent date']),       // created by this script
    next:  find(['next action','next']),
  };
}

/* ── ensure the script's own tracking columns exist ── */
function _ensureCols(sheet, c){
  let last = sheet.getLastColumn();
  if(c.status < 0){ sheet.getRange(1,++last).setValue('Send Status'); c.status = last-1; }
  if(c.sent   < 0){ sheet.getRange(1,++last).setValue('Sent Date');   c.sent   = last-1; }
  return c;
}

function _slug(x){return String(x||'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');}
function _previewLink(name){return CONFIG.PREVIEW_BASE ? CONFIG.PREVIEW_BASE.replace(/\/?$/,'/')+_slug(name) : '[preview link]';}
function _catWords(cat){
  cat=String(cat||'').toLowerCase();
  if(cat.indexOf('restaurant')>=0||cat.indexOf('cafe')>=0) return {show:'menu', act:'reservations'};
  if(cat.indexOf('salon')>=0||cat.indexOf('spa')>=0||cat.indexOf('clinic')>=0||cat.indexOf('dental')>=0) return {show:'services', act:'bookings'};
  if(cat.indexOf('gym')>=0||cat.indexOf('fitness')>=0) return {show:'classes & memberships', act:'sign-ups'};
  return {show:'services', act:'enquiries'};
}
function _sign(){
  return CONFIG.SENDER_NAME + (CONFIG.AGENCY?' · '+CONFIG.AGENCY:'') + ' · Dubai\n📱 ' + CONFIG.MY_WHATSAPP + (CONFIG.MY_WEBSITE?' · '+CONFIG.MY_WEBSITE:'');
}

/* ── the "preview already built" email (highest converting) ── */
function _buildEmail(name, cat, area){
  const cw = _catWords(cat), link = _previewLink(name), where = area ? (' in '+area) : '';
  const subject = `A new website for ${name} (built it for you)`;
  const body =
`Hi ${name} team,

I came across ${name}${where} and noticed there's no website yet — just Instagram. So I built you a quick preview of what one could look like:

👉 ${link}

It's mobile-ready, takes ${cw.act} straight to WhatsApp, and shows your ${cw.show}. Free to look — if you like it, I can have the real one live this week.

Want me to walk you through it?

${_sign()}

Not interested? Reply "no" and I won't follow up.`;
  return {subject, body};
}

/* ══════════════════════════════════════════════════════════════════
 *  MAIN — run this. Creates drafts (or sends) for eligible rows.
 * ════════════════════════════════════════════════════════════════ */
function prepareDrafts(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.getSheets()[0];
  let c = _cols(sheet);
  if(c.name < 0 || c.email < 0){ throw new Error('Sheet needs at least "Business Name" and "Email" columns.'); }
  c = _ensureCols(sheet, c);

  const lastRow = sheet.getLastRow();
  if(lastRow < 2){ SpreadsheetApp.getUi().alert('No leads found.'); return; }
  const data = sheet.getRange(2,1,lastRow-1,sheet.getLastColumn()).getValues();

  let done = 0, skipped = 0;
  for(let r=0; r<data.length; r++){
    if(done >= CONFIG.DAILY_CAP) break;
    const row = data[r];
    const name  = row[c.name], email = String(row[c.email]||'').trim();
    const status= c.status>=0 ? String(row[c.status]||'').trim() : '';
    const stage = c.stage>=0 ? String(row[c.stage]||'').trim() : '';
    const score = c.score>=0 ? parseFloat(row[c.score]) : NaN;

    // skip rules: no email, already handled, already replied/won, or (if ONLY_HOT) cold score
    if(!email || email.indexOf('@')<0){ skipped++; continue; }
    if(status){ skipped++; continue; }
    if(['Replied','Call booked','Won','Lost'].indexOf(stage)>=0){ skipped++; continue; }
    if(CONFIG.ONLY_HOT && !(score>=70)){ skipped++; continue; }

    const msg = _buildEmail(name, row[c.cat], row[c.area]);
    const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const sheetRow = r + 2;

    try{
      if(CONFIG.MODE === 'send'){
        GmailApp.sendEmail(email, msg.subject, msg.body, {name: CONFIG.SENDER_NAME});
        sheet.getRange(sheetRow, c.status+1).setValue('Sent');
      }else{
        GmailApp.createDraft(email, msg.subject, msg.body, {name: CONFIG.SENDER_NAME});
        sheet.getRange(sheetRow, c.status+1).setValue('Draft created');
      }
      sheet.getRange(sheetRow, c.sent+1).setValue(today);
      if(c.stage>=0 && (stage==='New'||stage==='Preview built'||stage==='')) sheet.getRange(sheetRow, c.stage+1).setValue('Contacted');
      if(c.next>=0){ const d=new Date(); d.setDate(d.getDate()+3); sheet.getRange(sheetRow, c.next+1).setValue(Utilities.formatDate(d,Session.getScriptTimeZone(),'yyyy-MM-dd')); }
      done++;
    }catch(e){
      sheet.getRange(sheetRow, c.status+1).setValue('ERROR: '+e.message);
    }
  }
  SpreadsheetApp.getUi().alert(`${CONFIG.MODE==='send'?'Sent':'Drafted'} ${done} email(s). Skipped ${skipped}. Daily cap: ${CONFIG.DAILY_CAP}.`);
}

/* Optional: add a custom menu so you can run it from the sheet toolbar. */
function onOpen(){
  SpreadsheetApp.getUi().createMenu('Outreach')
    .addItem(CONFIG.MODE==='send' ? 'Send emails (cap)' : 'Create drafts (cap)', 'prepareDrafts')
    .addToUi();
}
