import Archetype from '../models/Archetype.js';

export const getArchetypes = async (req, res) => {
  try {
    const archetypes = await Archetype.find().sort({ number: 1 });
    res.json(archetypes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch archetypes', error: error.message });
  }
};

export const getArchetype = async (req, res) => {
  try {
    const archetype = await Archetype.findOne({ number: parseInt(req.params.id, 10) });

    if (!archetype) {
      return res.status(404).json({ message: 'Archetype not found' });
    }

    res.json(archetype);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch archetype', error: error.message });
  }
};

export const createArchetype = async (req, res) => {
  try {
    const {
      number,
      titleEn,
      titleSi,
      descriptionEn,
      descriptionSi,
      career,
      love,
      health,
      spirituality,
      finance,
      keywords,
      element,
      planet,
      color,
    } = req.body;

    if (!number || !titleEn || !titleSi) {
      return res.status(400).json({ message: 'Number, titleEn, and titleSi are required' });
    }

    const archetype = new Archetype({
      number,
      titleEn,
      titleSi,
      descriptionEn,
      descriptionSi,
      career,
      love,
      health,
      spirituality,
      finance,
      keywords,
      element,
      planet,
      color,
    });

    await archetype.save();
    res.status(201).json({ message: 'Archetype created', archetype });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create archetype', error: error.message });
  }
};

export const updateArchetype = async (req, res) => {
  try {
    const archetype = await Archetype.findOneAndUpdate(
      { number: parseInt(req.params.id, 10) },
      req.body,
      { new: true }
    );

    if (!archetype) {
      return res.status(404).json({ message: 'Archetype not found' });
    }

    res.json({ message: 'Archetype updated', archetype });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update archetype', error: error.message });
  }
};
