// ─────────────────────────────────────────────────────────────────
// config.js — Central configuration for all external services
// ─────────────────────────────────────────────────────────────────

// ── Google Sheets ─────────────────────────────────────────────────
// Paste your Sheet ID here (the long string from the Sheet URL)
// const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

const SHEET_ID = '1IlVg7ZPvx72_ts8ww7WiVb75stoX1YapMsy4ar4uciY';

const SHEET_BASE = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=`;

// ── WhatsApp ──────────────────────────────────────────────────────
// Format: 880 + number without leading 0
// Example: 01711234567 → 8801711234567
const WA_NUMBER = '8801867780753';
const WA_GREETING = encodeURIComponent('আসসালামু আলাইকুম, আমি ওয়েবসাইট থেকে যোগাযোগ করছি।');

// ── Formspree ─────────────────────────────────────────────────────
// Sign up free at https://formspree.io → create form → copy ID
const FORMSPREE_ID = 'mlgwojpq';

// ─────────────────────────────────────────────────────────────────
export const CONFIG = {

  sheets: {
    news:    { enabled: false, url: SHEET_BASE + 'news' },
    gallery: { enabled: false, url: SHEET_BASE + 'gallery' },
    videos:  { enabled: false, url: SHEET_BASE + 'videos' },
    voter:   { enabled: false, url: SHEET_BASE + 'voters' },
  },

  formspree: {
    id:  FORMSPREE_ID,
    url: `https://formspree.io/f/${FORMSPREE_ID}`,
  },

  whatsapp: {
    number:      WA_NUMBER,
    link:        `https://wa.me/${WA_NUMBER}`,
    messageLink: `https://wa.me/${WA_NUMBER}?text=${WA_GREETING}`,
  },

  site: {
    name:        'শাহজাহান চৌধুরী',
    title:       'আলহাজ্ব শাহজাহান চৌধুরী | সংসদ সদস্য কক্সবাজার-৪',
    description: 'কক্সবাজার-৪ (উখিয়া-টেকনাফ) আসনের জাতীয় সংসদ সদস্য',
    url:         'https://shahjahanmp.com',
  },
};