import { createSlice } from '@reduxjs/toolkit';
import { userState } from '../types';

const initialState: userState = {
    name: localStorage.getItem('name') ?? 'Gerson Rodriguez Barbacena',
    role: localStorage.getItem('role') ?? 'Professor',
    pfp:
        localStorage.getItem('pfp') ??
        'https://c.tenor.com/_rbT42ogn6MAAAAC/nagatoro-pfp.gif',
    prefeitura_nome:
        localStorage.getItem('prefeitura') ?? 'Prefeitura de São Paulo',
    prefeitura_logo:
        localStorage.getItem('logo') ??
        'https://sp156.s3-sa-east-1.amazonaws.com/logo_cidadeSP.png',
    token: localStorage.getItem('token'),
    api_address: localStorage.getItem('api_address'),
    origin: localStorage.getItem('origin'),
    series: JSON.parse(localStorage.getItem('series') ?? '{ "": 0 }'),
    disciplinas: JSON.parse(localStorage.getItem('disciplinas') ?? '{ "": 0 }')
};

export const baseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        setBaseState: (state) => {
            state = initialState;
        }
    }
});

export const { setBaseState } = baseSlice.actions;
export default baseSlice.reducer;
