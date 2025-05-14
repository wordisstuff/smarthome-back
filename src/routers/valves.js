import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { valveController, valveStatusController } from '../controllers/valves.js';

const router = Router();
router.get('/', ctrlWrapper(valveController));
router.get('/status', ctrlWrapper(valveStatusController));
export default router;
