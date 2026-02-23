import { useState, useEffect, useCallback } from 'react';

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
      // Guard: ensure value is always a string before calling replace
      const raw = values[i];
      obj[h] = (raw != null ? String(raw) : '').replace(/^"|"$/g, '').trim();
    });
    return obj;
  }).filter(row => Object.values(row).some(v => v !== ''));
}

export function useSheetData(url, fallback = []) {
  // Never pass null/undefined to cache.get
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(!!url); // only loading if url exists
  const [error, setError] = useState(null);
  const [source, setSource] = useState('local');

  const fetchData = useCallback(async () => {
    // No URL = sheets disabled, use fallback immediately
    if (!url) {
      setData(fallback);
      setLoading(false);
      setSource('local');
      return;
    }

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
      console.warn('[useSheetData] failed, using fallback:', err.message);
      setError(err.message);
      setData(fallback);
      setSource('local');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    fetchData();
    if (!url) return;
    const interval = setInterval(fetchData, CACHE_TTL);
    return () => clearInterval(interval);
  }, [fetchData, url]);

  return { data, loading, error, source, refetch: fetchData };
}