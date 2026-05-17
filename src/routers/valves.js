import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
    valveController,
    valveStatusController,
    valveTimerController,
    valveStopController,
} from '../controllers/valves.js';

const router = Router();

router.post('/', authenticate, ctrlWrapper(valveController));
router.post('/timer', authenticate, ctrlWrapper(valveTimerController));
router.post('/stop', authenticate, ctrlWrapper(valveStopController));
router.get('/status', authenticate, ctrlWrapper(valveStatusController));

export default router;
