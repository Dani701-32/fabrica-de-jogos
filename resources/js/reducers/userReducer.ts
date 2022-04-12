import { createSlice } from '@reduxjs/toolkit';
import { userState } from '../types';

const initialState: userState = {
    name: localStorage.getItem('name') ?? '',
    role: localStorage.getItem('role') ?? '',
    token: localStorage.getItem('token'),
    api_address: localStorage.getItem('api_address'),
    origin: localStorage.getItem('origin'),
    series: JSON.parse(localStorage.getItem('series') ?? "{ '': 0 }"),
    disciplinas: JSON.parse(localStorage.getItem('disciplinas') ?? "{ '': 0 }")
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
