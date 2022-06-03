import { createSlice } from '@reduxjs/toolkit';
import { userState } from '../types';

const initialState: Partial<userState> = {
    token: localStorage.getItem('token'),
    origin: localStorage.getItem('origin'),
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
