import { useState, useEffect, useCallback, useRef } from 'react';

const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map();

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h =>
    String(h).replace(/^"|"$/g, '').trim()
  );

  return lines.slice(1).map(line => {
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
      const raw = values[i];
      obj[h] = (raw != null ? String(raw) : '').replace(/^"|"$/g, '').trim();
    });
    return obj;
  }).filter(row => Object.values(row).some(v => v !== ''));
}

export function useSheetData(url, fallback = []) {
  const fallbackRef = useRef(fallback);

  const [data, setData] = useState(() => fallbackRef.current);
  const [loading, setLoading] = useState(!!url);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('local');

  const fetchData = useCallback(async () => {
    if (!url) {
      setData(fallbackRef.current);
      setLoading(false);
      setSource('local');
      return;
    }

    // Check cache first
    const cached = cache.get(url);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      setData(cached.data);
      setSource('sheet');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const text = await res.text();

      // Google redirects to login page (HTML) when sheet is not public
      if (text.trim().startsWith('<') || text.includes('accounts.google.com')) {
        throw new Error(
          'SHEET_NOT_PUBLIC: Google Sheet is not publicly accessible. ' +
          'Go to Google Sheets → File → Share → Publish to web → Publish.'
        );
      }

      const parsed = parseCSV(text);

      if (parsed.length === 0) {
        throw new Error('Sheet has no data rows. Check column headers match exactly.');
      }

      console.log(`[useSheetData] ✅ Loaded ${parsed.length} rows from sheet:`, url.split('sheet=')[1]);
      cache.set(url, { data: parsed, ts: Date.now() });
      setData(parsed);
      setSource('sheet');
    } catch (err) {
      const isPublicError = err.message.includes('SHEET_NOT_PUBLIC') || err.message.includes('Failed to fetch');
      if (isPublicError) {
        console.error(
          '[useSheetData] ❌ Sheet access blocked.\n' +
          '👉 Fix: Open your Google Sheet → File → Share → Publish to web → Select sheet → Publish\n' +
          'URL attempted:', url
        );
      } else {
        console.error('[useSheetData] ❌ Error:', err.message);
      }
      setError(err.message);
      setData(fallbackRef.current);
      setSource('local');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    if (!url) return;
    const interval = setInterval(fetchData, CACHE_TTL);
    return () => clearInterval(interval);
  }, [fetchData, url]);

  return { data, loading, error, source, refetch: fetchData };
}