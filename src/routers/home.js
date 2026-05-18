import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
    homeController,
    sensorsController,
    trustedDeviceController,
} from '../controllers/home.js';

const router = Router();
router.get('/', ctrlWrapper(homeController));
router.post('/sensors', ctrlWrapper(sensorsController));
router.get('/trusted-device', ctrlWrapper(trustedDeviceController));
export default router;
