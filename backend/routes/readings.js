import express from 'express';
import {
  createReading,
  getReadings,
  getReading,
  getReadingByShareToken,
  updateReading,
  deleteReading,
} from '../controllers/readingController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.post('/', verifyToken, createReading);
router.get('/', verifyToken, getReadings);
router.get('/:id', verifyToken, getReading);
router.put('/:id', verifyToken, updateReading);
router.delete('/:id', verifyToken, deleteReading);

// Public share route
router.get('/share/:token', getReadingByShareToken);

export default router;
