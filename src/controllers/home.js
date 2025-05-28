import { authDb } from '../constants';

export const homeController = async (req, res) => {
    res.status(200).json({});
};
export const sensorsController = async (req, res) => {
    const { soil, light, token } = req.body;
    if (token !== authDb.secret) return res.status(403).send('Access denied');
    console.log('Дані з ESP32:', soil, light);
    res.status(200).json({});
};
