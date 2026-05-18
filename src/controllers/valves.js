import { valveStatus, valveTogle } from '../services/valves.js';
import WateringSession from '../db/models/wateringSession.js';

const activeTimers = new Map();

export const valveController = async (req, res) => {
    const { data } = await valveTogle(req.body);
    res.status(200).json({ data });
};

export const valveStatusController = async (req, res) => {
    const { data } = await valveStatus();

    const activeSessions = await WateringSession.find({
        status: 'active',
    });

    res.status(200).json({
        data,
        activeSessions,
    });
};

export const valveTimerController = async (req, res) => {
    const { relay, minutes } = req.body;

    const allowedMinutes = [5, 10, 15, 20];

    if (!relay) {
        return res.status(400).json({ message: 'relay is required' });
    }

    if (!allowedMinutes.includes(Number(minutes))) {
        return res.status(400).json({
            message: 'minutes must be one of: 5, 10, 15, 20',
        });
    }

    if (activeTimers.has(relay)) {
        clearTimeout(activeTimers.get(relay));
    }

    await WateringSession.updateMany(
        { relay, status: 'active' },
        {
            status: 'stopped',
            stoppedAt: new Date(),
        },
    );

    const startedAt = new Date();
    const endsAt = new Date(startedAt.getTime() + Number(minutes) * 60 * 1000);

    const session = await WateringSession.create({
        relay,
        durationMinutes: Number(minutes),
        startedAt,
        endsAt,
        status: 'active',
    });

    await valveTogle({ relay, state: true });

    const timerId = setTimeout(
        async () => {
            await valveTogle({ relay, state: false });

            await WateringSession.findByIdAndUpdate(session._id, {
                status: 'completed',
                stoppedAt: new Date(),
            });

            activeTimers.delete(relay);
        },
        Number(minutes) * 60 * 1000,
    );

    activeTimers.set(relay, timerId);

    res.status(200).json({
        message: `Valve ${relay} started for ${minutes} minutes`,
        data: {
            relay,
            minutes: Number(minutes),
            state: true,
            sessionId: session._id,
            startedAt,
            endsAt,
        },
    });
};

export const valveStopController = async (req, res) => {
    const { relay } = req.body;

    if (!relay) {
        return res.status(400).json({ message: 'relay is required' });
    }

    if (activeTimers.has(relay)) {
        clearTimeout(activeTimers.get(relay));
        activeTimers.delete(relay);
    }

    const { data } = await valveTogle({ relay, state: false });

    await WateringSession.updateMany(
        { relay, status: 'active' },
        {
            status: 'stopped',
            stoppedAt: new Date(),
        },
    );

    res.status(200).json({
        message: `Valve ${relay} stopped`,
        data: {
            relay,
            state: false,
            esp: data,
        },
    });
};
