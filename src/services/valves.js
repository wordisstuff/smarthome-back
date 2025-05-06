import { valvesApi } from "../utils/axios";
import { env } from "../utils/env";


export const valveTogle = async (valve)=> await  valvesApi.get(`/valve${valve}?token=${env('MY_SYCRET')}`)