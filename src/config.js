/**
 * config.js
 * ─────────────────────────────────────────────────────────────────
 * Central configuration for all external services.
 *
 * HOW TO SETUP (read carefully):
 *
 * ── GOOGLE SHEETS ────────────────────────────────────────────────
 * 1. Open your Google Sheet
 * 2. Copy the ID from the URL:
 *    https://docs.google.com/spreadsheets/d/[ THIS PART ]/edit
 * 3. Paste it as SHEET_ID below
 * 4. Each sheet tab name must match the sheetName values below
 * 5. File → Share → Publish to web → Select tab → CSV → Publish
 *    Do this for EACH tab (news, gallery, videos)
 *
 * ── FORMSPREE (Contact Form → Email) ────────────────────────────
 * 1. Go to https://formspree.io → Sign up free
 * 2. Create a new form → copy the form ID (looks like: xpzvwkrg)
 * 3. Paste it as FORMSPREE_ID below
 *
 * ── WHATSAPP ─────────────────────────────────────────────────────
 * Just update the phone number in format: 8801XXXXXXXXX
 * (country code 880, no + sign, no spaces)
 * ─────────────────────────────────────────────────────────────────
 */

// ⬇️ PASTE YOUR GOOGLE SHEET ID HERE (between the quotes)
const SHEET_ID = '1IlVg7ZPvx72_ts8ww7WiVb75stoX1YapMsy4ar4uciY';

export const CONFIG = {

  // ── Google Sheets ──────────────────────────────────────────────
  sheets: {
    // Set enabled: true AFTER you publish each tab to web
    news: {
      enabled: false,
      url: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=news`,
    },
    gallery: {
      enabled: false,
      url: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=gallery`,
    },
    videos: {
      enabled: false,
      url: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=videos`,
    },
    voter: {
      enabled: false,
      url: `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=voters`,
    },
  },

  // ── Formspree (Contact Form → Email) ──────────────────────────
  // Get your ID from https://formspree.io (free signup)
  formspree: {
    id: 'mlgwojpq', // e.g. 'xpzvwkrg'
    get url() { return `https://formspree.io/f/${this.id}`; },
  },

  // ── WhatsApp ───────────────────────────────────────────────────
  whatsapp: {
    number: '8801867780753', // Format: 8801711234567
    get link() { return `https://wa.me/${this.number}`; },
    get messageLink() {
      const msg = encodeURIComponent('আসসালামু আলাইকুম, আমি ওয়েবসাইট থেকে যোগাযোগ করছি।');
      return `https://wa.me/${this.number}?text=${msg}`;
    },
  },

  // ── Site Meta ──────────────────────────────────────────────────
  site: {
    name: 'শাহজাহান চৌধুরী',
    title: 'আলহাজ্ব শাহজাহান চৌধুরী | সংসদ সদস্য কক্সবাজার-৪',
    description: 'কক্সবাজার-৪ (উখিয়া-টেকনাফ) আসনের জাতীয় সংসদ সদস্য',
    url: 'https://shahjahanmp.com', // update after domain purchase
  },
};
