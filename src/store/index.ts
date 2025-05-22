import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import loginReducer from './loginSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        login: loginReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;    

export default store;