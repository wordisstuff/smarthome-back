import { Router } from 'express';
import valvesRouter from './valves.js';

const router = Router();

router.use('/valves', valvesRouter);
export default router;
