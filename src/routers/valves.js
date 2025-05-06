import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { valve1Controller, valve2Controller } from '../controllers/valves.js';

const router = Router();
router.get('/1', ctrlWrapper(valve1Controller));
router.get('/2', ctrlWrapper(valve2Controller));
export default router;