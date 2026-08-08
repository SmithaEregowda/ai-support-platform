import Router from 'express';
import { analyzeWithAI } from '../controllers/ai.controller.js';

const router = Router();

router.post('/analyze', analyzeWithAI);

export default router;
