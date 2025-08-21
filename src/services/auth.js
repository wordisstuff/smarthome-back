import Sessions from '../db/models/session.js';
import User from '../db/models/user.js';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import createSession from '../utils/createSession.js';

export const findUserByEmail = email => User.findOne({ email });

export const registerUser = async data => {
    const aceptedEmails = authDb.emails
    const { email} = data;

    if (!aceptedEmails.some(email) ) throw createHttpError(401, 'Unauthorized');
    
    const user = await findUserByEmail(email);
    if (user) throw createHttpError(409, 'Email in use!');
   
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const photoUrl = gravatar.url(userData.email);
    return await User.create({
        ...userData,
        password: hashedPassword,
        verifyToken,
        photo: photoUrl,
    });
};

export const signinUser = async data => {
    const user = await findUserByEmail(data.email);
    if (!user) throw createHttpError(404, 'User not found');

    const isEqual = await bcrypt.compare(data.password, user.password);
    if (!isEqual) throw createHttpError(401, 'Unauthorized');

    await Sessions.deleteOne({ userId: user._id });

    const newSession = await createSession(user._id, user.verifyByEmail);
    console.log('newSession', newSession);

    return { user, session: newSession };
};

export const logoutUser = sessionId => {
    return Sessions.deleteOne({ _id: sessionId });
};
