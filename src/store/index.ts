import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/userReducer';

const rootReducer = combineReducers({
    user: userReducer,
});

export const store = configureStore({
    reducer: rootReducer
});

export default store;