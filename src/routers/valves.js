import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
    valveController,
    valveStatusController,
    valveTimerController,
    valveStopController,
} from '../controllers/valves.js';
import { trustedDevice } from '../middlewares/trustedDevice.js';

const router = Router();
router.post('/timer', trustedDevice, ctrlWrapper(valveTimerController));
router.post('/stop', trustedDevice, ctrlWrapper(valveStopController));
router.get('/status', trustedDevice, ctrlWrapper(valveStatusController));
router.post('/', trustedDevice, ctrlWrapper(valveController));

export default router;
