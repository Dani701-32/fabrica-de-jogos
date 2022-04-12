import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import gameApi from './services/games';
import portalApi from './services/portal';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [gameApi.reducerPath]: gameApi.reducer,
        [portalApi.reducerPath]: portalApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gameApi.middleware, portalApi.middleware)
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
