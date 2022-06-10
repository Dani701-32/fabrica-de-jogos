import { createSlice } from '@reduxjs/toolkit';
import { userState } from '../types';

const initialState: Partial<userState> = {
    token: window.localStorage.getItem('token'),
    origin: window.localStorage.getItem('origin'),
};

export const baseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        setBaseState: (state) => {
            state = initialState;
        },
    },
});

export const { setBaseState } = baseSlice.actions;
export default baseSlice.reducer;
