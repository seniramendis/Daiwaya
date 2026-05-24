import express from 'express';
import {
  getArchetypes,
  getArchetype,
  createArchetype,
  updateArchetype,
} from '../controllers/archetypeController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getArchetypes);
router.get('/:id', getArchetype);

// Admin routes
router.post('/', verifyToken, verifyAdmin, createArchetype);
router.put('/:id', verifyToken, verifyAdmin, updateArchetype);

export default router;
