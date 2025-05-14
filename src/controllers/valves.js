import { valveStatus, valveTogle } from '../services/valves.js';

export const valveController = async (req, res) => {
    const { data } = await valveTogle(req.body);
    res.status(200).json({ data });
};


export const valveStatusController = async (req, res) => {
    const { data } = await valveStatus();
    res.status(200).json({ data });
};
