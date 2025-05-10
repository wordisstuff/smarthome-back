import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { pinoSettings } from './constants/constants.js';
import { notFindMiddleware } from './middlewares/notFindMiddleware.js';

import Router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { authDb } from './constants/index.js';

export const setupServer = () => {
    const app = express();

    app.use(pino(pinoSettings));
    app.use(cors({ origin: '', credentials: true }));
    app.use(cookieParser());
    app.use(express.json());
    app.use(Router);

    app.use(notFindMiddleware);
    app.use(errorHandler);

    const PORT = authDb.port;

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};
