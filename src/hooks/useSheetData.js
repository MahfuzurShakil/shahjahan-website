/**
 * useSheetData.js
 * ─────────────────────────────────────────────────────────────────
 * Fetches live data from a Google Sheet published as CSV.
 *
 * HOW IT WORKS:
 *  1. You publish a Google Sheet tab as CSV (File → Share → Publish to web)
 *  2. Google gives you a URL like:
 *       https://docs.google.com/spreadsheets/d/SHEET_ID/gviz/tq?tqx=out:csv&sheet=SHEET_NAME
 *  3. This hook fetches that CSV, parses it, and returns structured data.
 *  4. The website auto-refreshes every 5 minutes in the background.
 *
 * FALLBACK:
 *  If the sheet is unreachable (offline / sheet not published yet),
 *  it falls back to the local staticData.js — so the site never breaks.
 * ─────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from 'react';

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache
const cache = new Map();

/**
 * Parse CSV text → array of objects using first row as headers
 */
function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h =>
    h.replace(/^"|"$/g, '').trim()
  );

  return lines.slice(1).map(line => {
    // Handle quoted fields with commas inside
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQuotes = !inQuotes;
      } else if (line[i] === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += line[i];
      }
    }
    values.push(current.trim());

    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (values[i] || '').replace(/^"|"$/g, '').trim();
    });
    return obj;
  }).filter(row => Object.values(row).some(v => v !== ''));
}

/**
 * Build Google Sheets CSV export URL
 * @param {string} sheetId  - the long ID from the sheet URL
 * @param {string} sheetName - tab name (e.g. "news", "gallery")
 */
export function buildSheetUrl(sheetId, sheetName) {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
}

/**
 * Main hook
 * @param {string} url        - full CSV export URL
 * @param {Array}  fallback   - local fallback data
 */
export function useSheetData(url, fallback = []) {
  const [data, setData] = useState(() => {
    // Try memory cache first for instant render
    const cached = cache.get(url);
    if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
    return fallback;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('local'); // 'local' | 'sheet'

  const fetchData = useCallback(async () => {
    if (!url) {
      setLoading(false);
      return;
    }

    // Check memory cache
    const cached = cache.get(url);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      setData(cached.data);
      setSource('sheet');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const parsed = parseCSV(text);

      cache.set(url, { data: parsed, ts: Date.now() });
      setData(parsed);
      setSource('sheet');
      setError(null);
    } catch (err) {
      console.warn('[useSheetData] Sheet fetch failed, using fallback:', err.message);
      setError(err.message);
      setSource('local');
      // Keep current data (either cached or fallback)
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchData, CACHE_TTL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading, error, source, refetch: fetchData };
}
