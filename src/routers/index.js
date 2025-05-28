import { Router } from 'express';
import valvesRouter from './valves.js';
import homeRouter from './home.js';

const router = Router();

router.use('/valves', valvesRouter);
router.use('/home', homeRouter);
export default router;
