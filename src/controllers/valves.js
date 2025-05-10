import { valveTogle } from '../services/valves.js';

export const valveController = async (req, res) => {
    const params = req.body;
    console.log('par', params);
    const { data } = await valveTogle(params);

    res.status(200).json({ data });
};
