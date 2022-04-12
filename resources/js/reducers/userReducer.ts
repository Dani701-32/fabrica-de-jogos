import { createSlice } from '@reduxjs/toolkit';
import { userState } from '../types';

const initialState: Partial<userState> = {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDZkNGRmNzkyODI4ODJhOGRjZWVjM2E1ZWNhZDMzNjYxOWI5YzNmYWI0Yjc3OWI0NjU0YjJhMjQyNWZmNjgxN2M4NmNhZDNjYmUzOGJlOTQiLCJpYXQiOjE2NDk0MjE2NjMsIm5iZiI6MTY0OTQyMTY2MywiZXhwIjoxNjgwOTU3NjYzLCJzdWIiOiIyNDY5Iiwic2NvcGVzIjpbXX0.hiwBCkrM5aRhYeaZu62gMeLiPHVTNqfPUgXJKqpLg6MiDFVk3m-SKBfh7WwDisTCnjIkUN2D3D1w-r9Uxi9CF-ttKCX9y3PD3WcW7RCiiY49HS7B9JQa7l1otPFBr4xo0pmRy1CKKrkFSv3aAxLdkaM6W6T31C6XoGHksl6_53xJSzVPDIH20dZHdFplLPRmEAQPwZiDPlcMA5dNr82fsfUaeXt8_4PWslZ4j87LLmA5IFxRd1G_u8aV4PqJJh2dFE7gUQKgBOadOSgLcUPY0NUWXdEygOKTXLD04xVNuWeIWUqL-_RNeBGgMTdDSlFXLnvGQOxdC-BO2_z0I0ebY1KoFY1QZ4Xdg1tjov2nTnUIYGEdnmz7TzU-keehN3mmVbGkYsL9XzOKEmER-THQaZ7X2QXj_yAx1FMpRkfXQQqkef6qYb5n6YaGsccA2wBwY1D2h7dvtJudjnryzhM-2Rj27YGpwoEG2Q8G6NpFD3iMvsl3HoM0m5B4xH1Hd75MUXtWfJLJXWsdZfFiuuv1OKbCIvGTedkxyJdXg7Tiu3wLTamot0mX8QCKvE2riJeiFFJ89oxHx8LUxq-mOZXW7rx6L7lgkzORqTukprwpo6tlGPh7ks9dOfhu8A-UBt6T46kdXJYY70DMIK6tansLeXFwv7aCNj-wsSDAI5CvKHk',
    origin: 'https://dev.edutecbrasil.com.br'
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
