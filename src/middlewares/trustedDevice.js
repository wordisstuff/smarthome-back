import createHttpError from 'http-errors';
import { checkDevice } from '../utils/checkDevice.js';

export const trustedDevice = async (req, res, next) => {
    const isTrusted = await checkDevice();

    if (!isTrusted) {
        return next(
            createHttpError(403, 'Trusted device not found in local network'),
        );
    }

    next();
};
