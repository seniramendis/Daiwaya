import Reading from '../models/Reading.js';
import User from '../models/User.js';
import { generateReading } from '../utils/numerology.js';
import crypto from 'crypto';

export const createReading = async (req, res) => {
  try {
    const { subjectName, dateOfBirth, timeOfBirth } = req.body;

    if (!subjectName || !dateOfBirth) {
      return res.status(400).json({ message: 'Subject name and date of birth are required' });
    }

    // Generate numerology reading
    const numbers = generateReading({
      fullName: subjectName,
      dateOfBirth,
      timeOfBirth: timeOfBirth || '00:00',
    });

    // Create reading
    const reading = new Reading({
      userId: req.userId,
      subjectName,
      dateOfBirth: new Date(dateOfBirth),
      timeOfBirth: timeOfBirth || '00:00',
      numbers,
      archetypeId: numbers.center,
    });

    await reading.save();

    // Update user readings count
    await User.findByIdAndUpdate(req.userId, { $inc: { readingsCount: 1 } });

    res.status(201).json({
      message: 'Reading created successfully',
      reading,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create reading', error: error.message });
  }
};

export const getReadings = async (req, res) => {
  try {
    const readings = await Reading.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch readings', error: error.message });
  }
};

export const getReading = async (req, res) => {
  try {
    const reading = await Reading.findById(req.params.id);

    if (!reading) {
      return res.status(404).json({ message: 'Reading not found' });
    }

    // Check ownership or public access
    if (reading.userId.toString() !== req.userId && !reading.isPublic) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(reading);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reading', error: error.message });
  }
};

export const getReadingByShareToken = async (req, res) => {
  try {
    const reading = await Reading.findOne({ shareToken: req.params.token });

    if (!reading || !reading.isPublic) {
      return res.status(404).json({ message: 'Reading not found' });
    }

    res.json(reading);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reading', error: error.message });
  }
};

export const updateReading = async (req, res) => {
  try {
    const { notes, isPublic } = req.body;
    const reading = await Reading.findById(req.params.id);

    if (!reading) {
      return res.status(404).json({ message: 'Reading not found' });
    }

    if (reading.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (notes !== undefined) reading.notes = notes;
    if (isPublic !== undefined) {
      reading.isPublic = isPublic;
      if (isPublic && !reading.shareToken) {
        reading.shareToken = crypto.randomBytes(16).toString('hex');
      }
    }

    await reading.save();
    res.json({ message: 'Reading updated successfully', reading });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update reading', error: error.message });
  }
};

export const deleteReading = async (req, res) => {
  try {
    const reading = await Reading.findById(req.params.id);

    if (!reading) {
      return res.status(404).json({ message: 'Reading not found' });
    }

    if (reading.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Reading.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reading deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete reading', error: error.message });
  }
};
