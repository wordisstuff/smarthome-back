import { authDb } from '../constants/index.js';

export const homeController = async (req, res) => {
    res.status(200).json({});
};
export const sensorsController = async (req, res) => {
    const { soil_status, light, token, temp } = req.body;
    if (token !== authDb.secret) return res.status(403).send('Access denied');
    console.log('Дані з ESP32:', soil_status, light, temp);
    res.status(200).json({});
};
