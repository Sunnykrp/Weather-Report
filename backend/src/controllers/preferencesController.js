import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';
import { normalizeCityKey, makeDisplayName } from '../utils/normalizeCity.js';

export const createUser = asyncHandler(async (req, res) => {
  const { userId } = req.body || {};
  if (!userId) return res.status(400).json({ ok: false, error: { message: 'userId required' } });

  const existing = await User.findOne({ userId });
  if (existing) return res.json({ ok: true, data: existing });

  const doc = await User.create({
    userId,
    cities: [] // empty by default
  });
  res.status(201).json({ ok: true, data: doc });
});

export const getPreferences = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ userId }).lean();
  if (!user) return res.status(404).json({ ok: false, error: { message: 'User not found' } });
  res.json({ ok: true, data: user.cities });
});

export const addCity = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { name, country } = req.body || {};
  if (!name) return res.status(400).json({ ok: false, error: { message: 'name is required' } });

  const user = await User.findOne({ userId });
  if (!user) return res.status(404).json({ ok: false, error: { message: 'User not found' } });

  const cityKey = normalizeCityKey(name, country);
  const exists = user.cities.some(
    c => normalizeCityKey(c.name, c.country) === cityKey
  );
  if (exists) return res.status(409).json({ ok: false, error: { message: 'City already added' } });

  const displayName = makeDisplayName(name, country);
  user.cities.push({ name, country, displayName });
  await user.save();
  res.status(201).json({ ok: true, data: user.cities });
});

export const removeCity = asyncHandler(async (req, res) => {
  const { userId, cityKey } = req.params;
  const user = await User.findOne({ userId });
  if (!user) return res.status(404).json({ ok: false, error: { message: 'User not found' } });

  const filtered = user.cities.filter(
    c => normalizeCityKey(c.name, c.country) !== cityKey.toLowerCase()
  );

  user.cities = filtered;
  await user.save();
  res.json({ ok: true, data: user.cities });
});
