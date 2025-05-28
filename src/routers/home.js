import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { homeController } from '../controllers/home.js';

const router = Router();
router.get('/', ctrlWrapper(homeController));
router.post('/sensors', ctrlWrapper(sensorsController));
export default router;
