import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import loginReducer from './loginSlice';
import signUpReducer from './signUpSlice';
import onboardingReducer from './onboardingSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        login: loginReducer,
        signUp: signUpReducer,
        onboarding: onboardingReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;    

export default store;