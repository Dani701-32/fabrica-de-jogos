import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import gameApi from './services/games';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [gameApi.reducerPath]: gameApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gameApi.middleware)
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
