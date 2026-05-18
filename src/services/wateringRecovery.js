import WateringSession from '../db/models/wateringSession.js';
import { valveTogle } from './valves.js';

const restoredTimers = new Map();

export const restoreWateringTimers = async () => {
    const activeSessions = await WateringSession.find({ status: 'active' });

    if (!activeSessions.length) {
        console.log('💧 No active watering sessions to restore');
        return;
    }

    console.log(`💧 Restoring ${activeSessions.length} watering session(s)`);

    for (const session of activeSessions) {
        const now = Date.now();
        const endsAt = new Date(session.endsAt).getTime();
        const timeLeft = endsAt - now;

        if (timeLeft <= 0) {
            console.log(
                `⛔ Valve ${session.relay} session expired. Turning off.`,
            );

            await valveTogle({
                relay: session.relay,
                state: false,
            });

            await WateringSession.findByIdAndUpdate(session._id, {
                status: 'completed',
                stoppedAt: new Date(),
            });

            continue;
        }

        console.log(
            `✅ Restored valve ${session.relay}. Time left: ${Math.round(
                timeLeft / 1000,
            )} sec`,
        );

        await valveTogle({
            relay: session.relay,
            state: true,
        });

        const timerId = setTimeout(async () => {
            await valveTogle({
                relay: session.relay,
                state: false,
            });

            await WateringSession.findByIdAndUpdate(session._id, {
                status: 'completed',
                stoppedAt: new Date(),
            });

            restoredTimers.delete(session.relay);

            console.log(
                `✅ Valve ${session.relay} auto stopped after recovery`,
            );
        }, timeLeft);

        restoredTimers.set(session.relay, timerId);
    }
};
