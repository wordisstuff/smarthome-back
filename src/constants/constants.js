import express from 'express';

export const schemaObjectString = { type: String, required: true };

export const pinoSettings = {
    transport: {
        target: 'pino-pretty',
    },
};

export const jsonParser = express.json();