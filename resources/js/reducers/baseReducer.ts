import { createSlice } from '@reduxjs/toolkit';
import { baseState } from '../types';

const initialState: baseState = {
    open: false,
    alert: '',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDJiNjU2YzhmYzc2NjIxN2ZkNzFhNGQ1YjZhMzkyZDM3M2EyMDdiOTg0NTg3NDkyNjAyNWY3YWMxMTBhZjIzZWVkNGYwZTQyMzg4NDdhNTMiLCJpYXQiOjE2NDc4NjMzMzAsIm5iZiI6MTY0Nzg2MzMzMCwiZXhwIjoxNjc5Mzk5MzMwLCJzdWIiOiIyNDk2Iiwic2NvcGVzIjpbXX0.muikm2qWM_YzKDea50Yz0wkBigXgfkRa-_8w-ezmBHynXi0I2WaNw4dDzXdRqFql1CSGgqXKDbbEfBCyoXz8Ri9bIf9nurkILRLKg6U_y93n0SObEQLbiie3wJqKhXyEd_rXy1NWq2UG8y6NDTx6VjiTSESKh-kiZ36SiCyaRTEjWVCo3zPo2XFlxf8UoMmC1EDpt8xjmqPVBqSll2EW8NH9qs20a2ST7X0ssq4t_pbQ5YYZP4QTnSoIaldLMphJ2R247chxLIzxcwE4Qd9KiJuxWfMd8UXTCfAF6hZkITg0cX4FXrJA1Syo2l7BpkU31t-1qSX9BatPf9aD5YxQwIJJeKAru-q2NFrKAIuZghKupZzpOeUhGq8J901UT2FB0L05yM4cHr7VZgIXyG-qLaFeCv2FnWhBXvf1Gi4JqE1W09CLNfbYb2swfOuZmuJHxZNECK01UBGNT4dnOQXcEOEegTCETLObcdsE-7mdDtBKVGPY6gRcC7twoiPMtX6oXSadgyRXiDFNldWfZYM8IT34r417bjnrvP_TgQfBlHHGQF2OFQrwZq2lCy45cHO2BafnljTgN2cCOIrAljaf0NG94BPItlEBkvRMx8tHS0o_6AWYkhOkX0hXSMIMwLbWUB02mBeYgDBXfbWmUAfQfEEuw5i-gj-UTiGwSFQLcM4',
    api_address:
        'https://dev.edutecbrasil.com.br/api/conteudo/create-from-game',
    origin: 'https://dev.edutecbrasil.com.br',
    disciplinas: { 'Língua Portuguesa': 10 },
    series: {
        '1° Ano - Ensino Fundamental I': 1,
        '1° Nível - Educação Infantil': 2,
        '2° Ano - Ensino Fundamental I': 3,
        '2° Nível - Educação Infanti I': 4,
        '3° Ano - Ensino Fundamental I': 5,
        '4° Ano - Ensino Fundamental I': 6,
        '5° Ano - Ensino Fundamental I': 7,
        '6° Ano - Ensino Fundamental II': 8,
        '7° Ano - Ensino Fundamental II': 9,
        '8° Ano - Ensino Fundamental II': 10,
        '9° Ano - Ensino Fundamental II': 11,
        Maternal: 12
    }
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
