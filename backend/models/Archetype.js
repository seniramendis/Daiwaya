import mongoose from 'mongoose';

const archetypeSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 22,
    },
    titleEn: String,
    titleSi: String,
    descriptionEn: String,
    descriptionSi: String,
    career: String,
    love: String,
    health: String,
    spirituality: String,
    finance: String,
    keywords: [String],
    element: String,
    planet: String,
    color: String,
  },
  { timestamps: true }
);

export default mongoose.model('Archetype', archetypeSchema);
