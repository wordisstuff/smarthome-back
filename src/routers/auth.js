import { Router } from 'express';
import { jsonParser } from '../constants/constants.js';
import { loginUserSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { signinUserController } from '../controllers/auth.js';

const router = Router();

router.post(
    '/signup',
    jsonParser,
    validateBody(loginUserSchema),
    ctrlWrapper(registerUserController),
);

router.post(
    '/signin',
    jsonParser,
    validateBody(loginUserSchema),
    ctrlWrapper(signinUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));