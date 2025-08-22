import axios from 'axios';
import { makeDisplayName } from '../utils/normalizeCity.js';

// Helpers to aggregate 3-hourly forecast into 5 days
function aggregateForecast(list) {
  // Group by date (YYYY-MM-DD), compute min, max, pick icon around 12:00 if available
  const byDate = {};
  for (const item of list) {
    const dt = new Date(item.dt * 1000);
    const dateKey = dt.toISOString().slice(0, 10);
    if (!byDate[dateKey]) byDate[dateKey] = [];
    byDate[dateKey].push(item);
  }
  const days = Object.keys(byDate).sort();
  const out = days.slice(0, 5).map((d) => {
    const entries = byDate[d];
    let min = Infinity, max = -Infinity;
    let noonEntry = null;
    let icon = null;
    for (const e of entries) {
      const t = e.main.temp;
      if (t < min) min = t;
      if (t > max) max = t;
      const hour = new Date(e.dt * 1000).getUTCHours();
      if (hour === 12) noonEntry = e;
    }
    const rep = noonEntry || entries[Math.floor(entries.length / 2)];
    const description = rep.weather?.[0]?.description || 'N/A';
    icon = rep.weather?.[0]?.icon || '01d';
    return { date: d, min: Math.round(min), max: Math.round(max), description, icon };
  });
  return out;
}

export async function fetchWeatherForCity(city, country) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    const e = new Error('OPENWEATHER_API_KEY not set');
    e.status = 500;
    throw e;
  }

  const q = country ? `${city},${country}` : city;

  const base = 'https://api.openweathermap.org/data/2.5';
  const params = { q, units: 'metric', appid: apiKey };

  const [currentRes, forecastRes] = await Promise.all([
    axios.get(`${base}/weather`, { params }),
    axios.get(`${base}/forecast`, { params })
  ]);

  const current = currentRes.data;
  const forecast = forecastRes.data;

  const locationName = makeDisplayName(current.name, country, current.sys?.country);
  const currentPayload = {
    location: locationName,
    coord: current.coord,
    temperature: Math.round(current.main.temp),
    feelsLike: Math.round(current.main.feels_like),
    humidity: current.main.humidity,
    windSpeed: current.wind?.speed ?? null,
    conditions: current.weather?.[0]?.description || 'N/A',
    icon: current.weather?.[0]?.icon || '01d',
    fetchedAt: new Date().toISOString()
  };

  const daily = aggregateForecast(forecast.list);

  return {
    cityKey: q.toLowerCase(),
    current: currentPayload,
    forecast: daily
  };
}
