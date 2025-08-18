import { env } from '../utils/env.js';

export const FIFTEEN_MINUTES = 900000;
export const TWO_HOURS = 7200000;
export const ONE_DAY = 86400000;

const VARS = {
    PORT: 'PORT',
    USER: 'MONGODB_USER',
    PASSWORD: 'MONGODB_PASSWORD',
    URL: 'MONGODB_URL',
    DB: 'MONGODB_DB',
};

export const authDb = {
    port: env(VARS.PORT, 3000),
    secret: env('MY_SYCRET'),
    user: env(VARS.USER),
    pwd: env(VARS.PASSWORD),
    url: env(VARS.URL),
    db: env(VARS.DB),
    mac: [process.env['MAC_1'], process.env['MAC_2']],
};
