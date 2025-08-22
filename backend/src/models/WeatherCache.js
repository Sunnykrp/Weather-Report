import mongoose from 'mongoose';

const WeatherCacheSchema = new mongoose.Schema(
  {
    cityKey: { type: String, required: true, unique: true }, // normalized city key
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    updatedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

// TTL index: delete when expiresAt is older than now
WeatherCacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('WeatherCache', WeatherCacheSchema);
