import createHttpError from 'http-errors';
import Sessions from '../db/models/session.js';

export const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(createHttpError(401, 'Authorization header is missing'));
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return next(createHttpError(401, 'Invalid authorization format'));
    }

    const session = await Sessions.findOne({ accessToken: token });

    if (!session) {
        return next(createHttpError(401, 'Session not found'));
    }

    if (new Date() > session.accessTokenValidUntil) {
        return next(createHttpError(401, 'Access token expired'));
    }

    req.userId = session.userId;
    req.session = session;

    next();
};
