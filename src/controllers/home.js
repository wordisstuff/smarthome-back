import { authDb } from '../constants/index.js';
import { valveTogle } from '../services/valves.js';

export const homeController = async (req, res) => {
    res.status(200).json({});
};
export const sensorsController = async (req, res) => {
    const { soil_status, light, token, temp } = req.body;
    console.log(req.body);
    if (token !== authDb.secret) return res.status(403).send('Access denied');
    console.log('Дані з ESP32:', soil_status, light, temp);
    console.log(
        soil_status === 'dry',
        soil_status === 'wet' || soil_status === 'in_water',
    );
    if (soil_status === 'dry') {
        await valveTogle({ relay: 1, state: true });
    }
    if (soil_status === 'wet' || soil_status === 'in_water') {
        await valveTogle({ relay: 1, state: false });
    }
    res.status(200).json({});
};
