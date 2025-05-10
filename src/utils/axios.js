import axios from 'axios';

// const valvesURLA = "'https://"

export const valvesApi = axios.create({
    baseURL: `http://10.0.0.31/`,
    withCredentials: true,
});
