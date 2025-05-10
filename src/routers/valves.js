import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { valveController } from '../controllers/valves.js';

const router = Router();
router.get('/', ctrlWrapper(valveController));
export default router;
