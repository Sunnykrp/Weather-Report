import WeatherCache from '../models/WeatherCache.js';

const ttlMinutes = parseInt(process.env.CACHE_TTL_MINUTES || '10', 10);

export async function getCached(cityKey) {
  const doc = await WeatherCache.findOne({ cityKey }).lean();
  if (!doc) return null;
  // If exists, it hasn't hit TTL yet (Mongo deletes expired docs automatically)
  return doc.data;
}

export async function setCached(cityKey, data) {
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
  await WeatherCache.findOneAndUpdate(
    { cityKey },
    { data, updatedAt: new Date(), expiresAt },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}
