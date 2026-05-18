import { model, Schema } from 'mongoose';

const wateringSessionSchema = new Schema(
    {
        relay: { type: Number, required: true },
        status: {
            type: String,
            enum: ['active', 'completed', 'stopped', 'failed'],
            default: 'active',
        },
        startedAt: { type: Date, required: true },
        endsAt: { type: Date, required: true },
        stoppedAt: { type: Date, default: null },
        durationMinutes: { type: Number, required: true },
    },
    { timestamps: true, versionKey: false },
);

const WateringSession = model('watering_sessions', wateringSessionSchema);

export default WateringSession;
