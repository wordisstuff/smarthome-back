import { Router } from 'express';

const router = Router();

router.use('/valves', valvesRouter);
export default router;