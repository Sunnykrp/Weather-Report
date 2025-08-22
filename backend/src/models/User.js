import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // e.g. "London"
    country: { type: String },                       // optional ISO country like "GB"
    displayName: { type: String, required: true }    // e.g. "London, GB"
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    cities: { type: [CitySchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
