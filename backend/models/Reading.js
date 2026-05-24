import mongoose from 'mongoose';

const readingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    timeOfBirth: {
      type: String,
      default: '00:00',
    },
    numbers: {
      day: Number,
      month: Number,
      year: Number,
      anchor: Number,
      lifePath: Number,
      root: Number,
      timePulse: Number,
      soulNumber: Number,
      expressionNumber: Number,
      personalityNumber: Number,
      nameVibration: Number,
      center: Number,
    },
    archetypeId: {
      type: Number,
      min: 1,
      max: 22,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    shareToken: {
      type: String,
      unique: true,
      sparse: true,
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model('Reading', readingSchema);
