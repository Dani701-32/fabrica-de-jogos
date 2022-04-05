import { configureStore } from '@reduxjs/toolkit';
import baseReducer from './reducers/baseReducer';
import gameApi from './services/games';

export const store = configureStore({
    reducer: {
        base: baseReducer,
        [gameApi.reducerPath]: gameApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gameApi.middleware)
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
