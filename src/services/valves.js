import { authDb } from '../constants/index.js';
import { valvesApi } from '../utils/axios.js';

export const valveTogle = async params => {
    console.log(params);
    return await valvesApi.get(
        `/valve${params.relay}?state=${params.state}&token=${authDb.secret}`,
    );
};
