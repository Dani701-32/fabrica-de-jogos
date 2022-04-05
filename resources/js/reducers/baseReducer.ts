import { createSlice } from '@reduxjs/toolkit';
import { baseState } from '../types';

const initialState: baseState = {
    open: false,
    alert: '',
    token: localStorage.getItem('token'),
    api_address: localStorage.getItem('api_address'),
    origin: localStorage.getItem('origin'),
    series: localStorage['series']
        ? JSON.parse(localStorage.getItem('series') as string)
        : { '': 0 },
    disciplinas: localStorage['series']
        ? JSON.parse(localStorage.getItem('disciplinas') as string)
        : { '': 0 }
};

export const baseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload;
        },
        setAlert: (state, action) => {
            state.alert = action.payload;
        },
        setBaseState: (state) => {
            state = initialState;
        }
    }
});

export const { setOpen, setAlert, setBaseState } = baseSlice.actions;
export default baseSlice.reducer;
