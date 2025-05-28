import { authDb } from '../constants/index.js';
import { valvesApi } from '../utils/axios.js';

export const valveTogle = async params => {
    console.log('params', params);
    const state = params.state === true ? 'on' : 'off';
    console.log('state', state);
    return await valvesApi.get(
        `/valve${params.relay}?state=${state}&token=${authDb.secret}`,
    );
};
export const valveStatus = async () => {
    return await valvesApi.get(`/status?token=${authDb.secret}`);
};
