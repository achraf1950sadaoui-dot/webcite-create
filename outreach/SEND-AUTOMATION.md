# 🤖 Phase 3 — Send & Track Automation

Goal: send personalized outreach at a steady pace and never lose a follow-up —
**without** looking like spam (the fastest way to get blocked and land in junk).

There are two sending routes. Use **Route A** for your first weeks, graduate to
**Route B** when you want volume.

---

## ✅ Tracking (built into the Lead Manager)

`lead-manager.html` now does the tracking half automatically:

- **⏰ Follow-ups due** panel — shows leads whose follow-up date is today or overdue,
  with a one-click ✉ and a "snooze 3 days".
- **✓ Mark sent + schedule follow-up** — in any message, this advances the lead to
  *Contacted* and auto-sets the next follow-up (+3 days for first touch, +4 after D+3).
- **Funnel stats** — Leads · 🔥 Hot · Contacted · Replied · **Won / 3 (weekly goal)**.

So your daily loop is just: open the tool → clear the "due" panel → add new leads →
send today's first touches → mark them sent.

---

## Route A — Claude drafts into your Gmail (no setup) ⭐ start here

Best for your first 2–3 weeks: every email is reviewed by a human (you) before it
sends, which is exactly what keeps you out of spam and looking legitimate.

**How:** paste me a batch of leads (or export the CSV and share it) and say
*"draft these into my Gmail."* I'll create ready-to-review **drafts** in your connected
Gmail — one per lead, personalized (name, area, category, preview link). You open
Gmail → Drafts → glance → hit send.

- Nothing sends without you.
- You can tweak any draft first.
- I can also draft the **follow-ups** for leads due today.

> I will never auto-send cold emails on your behalf without you confirming — that
> protects your domain and your reputation.

---

## Route B — Google Apps Script mail-merge (self-run, at scale)

When you're ready to run it yourself: `gmail-mail-merge.gs` sends from **your own
Gmail** off a **Google Sheet**, with a daily cap and status logging.

**Setup (~5 min):**
1. In the Lead Manager, click **⬇ Export CSV**.
2. New Google Sheet → *File ▸ Import* → upload the CSV.
3. *Extensions ▸ Apps Script* → paste all of `gmail-mail-merge.gs` → Save.
4. Edit the `CONFIG` block (your name, agency, WhatsApp, website, preview base, demo link).
5. Run `prepareDrafts` once, approve the permission prompt.
6. It creates **drafts** in Gmail (safe default). Review → send. When confident, set
   `MODE:'send'` to auto-send up to the daily cap.

It writes back **Send Status**, **Sent Date**, advances **Stage** to *Contacted*, and
sets the next follow-up date — so the Sheet stays your source of truth.

---

## 🔒 Golden rules (do not skip — this is the anti-spam part)

1. **Own-domain email**, warmed up. Never bulk-send cold email from a raw @gmail.
2. **Start small:** 10–20/day, ramp slowly over weeks. Blasting 200 on day one = blacklist.
3. **Personalize every one** (the templates already do — keep it that way).
4. **One clean link**, no attachments, real signature, easy opt-out ("reply 'no'").
5. **Honour opt-outs instantly.** Mark them *Lost* and never email again.
6. **Prefer WhatsApp / Instagram for restaurants** — higher reply rate, and the tool
   generates those messages too.
7. **Follow up twice** (D+3, D+7). Most replies come from follow-ups, not the first email.

---

## The daily 30-minute routine

1. Open Lead Manager → clear the **⏰ Follow-ups due** panel (✉ each, Mark sent).
2. Add 8–10 new leads (see `LEAD-SOURCES.md`), flag the top few for previews.
3. Ask me to build previews + draft emails for today's hot leads (Route A).
4. Send WhatsApp/IG to restaurants straight from the tool.
5. Log every send with **✓ Mark sent** so tomorrow's follow-ups appear automatically.

That's the whole machine: **find → preview → message → send → track → follow up → close.**
