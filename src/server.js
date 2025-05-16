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
   const allowedOrigins = [
  'http://localhost:5173',
  'http://10.0.0.70:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
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
