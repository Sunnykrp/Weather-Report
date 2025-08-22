import asyncHandler from '../middleware/asyncHandler.js';
import { normalizeCityKey } from '../utils/normalizeCity.js';
import { getCached, setCached } from '../services/cacheService.js';
import { fetchWeatherForCity } from '../services/openWeatherService.js';

export const getWeather = asyncHandler(async (req, res) => {
  const { city, country } = req.query;
  if (!city) {
    return res.status(400).json({ ok: false, error: { message: 'city is required' } });
  }
  const cityKey = normalizeCityKey(city, country);

  // 1) Try cache
  const cached = await getCached(cityKey);
  if (cached) return res.json({ ok: true, cached: true, data: cached });

  // 2) Fetch from API
  const fresh = await fetchWeatherForCity(city, country);
  await setCached(cityKey, fresh);
  return res.json({ ok: true, cached: false, data: fresh });
});

export const getBatchWeather = asyncHandler(async (req, res) => {
  // /api/weather/batch?cities=London|GB,Paris|FR,Boston
  const { cities } = req.query;
  if (!cities) {
    return res.status(400).json({ ok: false, error: { message: 'cities is required' } });
  }
  const parts = String(cities).split(',').map(s => s.trim()).filter(Boolean);
  const results = [];

  for (const p of parts) {
    const [name, country] = p.split('|').map((x) => x?.trim());
    const key = normalizeCityKey(name, country);
    const cached = await getCached(key);
    if (cached) {
      results.push({ city: p, cached: true, data: cached });
      continue;
    }
    try {
      const fresh = await fetchWeatherForCity(name, country);
      await setCached(key, fresh);
      results.push({ city: p, cached: false, data: fresh });
    } catch (e) {
      results.push({ city: p, error: e.message });
    }
  }
  res.json({ ok: true, results });
});
