import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk } from "./thunkApiFactory";
import { act } from "react";


export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = `${LOGIN}_REQUEST`;
export const LOGIN_SUCCESS = `${LOGIN}_SUCCESS`;
export const LOGIN_FAILURE = `${LOGIN}_FAILURE`;

export const CHECK_USER_EXISTANCE = 'CHECK_USER_EXISTANCE';
export const CHECK_USER_EXISTANCE_REQUEST = `${CHECK_USER_EXISTANCE}_REQUEST`;
export const CHECK_USER_EXISTANCE_SUCCESS = `${CHECK_USER_EXISTANCE}_SUCCESS`;
export const CHECK_USER_EXISTANCE_FAILURE = `${CHECK_USER_EXISTANCE}_FAILURE`;

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isPlatformContinueLoading: false,
        isEmailPresent: false,
        isEmailConnected: false
    },
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(LOGIN_REQUEST, (state, action) => {
                state.isPlatformContinueLoading = true;
            })
            .addCase(LOGIN_SUCCESS, (state, action) => {
                state.isPlatformContinueLoading = false;
            })
            .addCase(LOGIN_FAILURE, (state, action) => {
                state.isPlatformContinueLoading = false;
            })
            .addCase(CHECK_USER_EXISTANCE_REQUEST, (state, action) => {
                state.isPlatformContinueLoading = true;
            })
            .addCase(CHECK_USER_EXISTANCE_SUCCESS, (state, action:any) => {
                switch(action.payload.data.status) {
                    case 'PRESENT':
                        state.isEmailConnected = true;
                        state.isEmailPresent = true;
                        break;
                    case 'NOT_PRESENT':
                        state.isEmailPresent = false;
                        break;
                    case 'PRESENT_THRU_OAUTH':
                        state.isEmailConnected = false;
                        state.isEmailPresent = true;
                }
                state.isPlatformContinueLoading = false;
            })
            .addCase(CHECK_USER_EXISTANCE_FAILURE, (state, action) => {
                state.isPlatformContinueLoading = false;
            })
    }
})

export const checkUserExistance = createApiThunk<{
    email: string;
}>(CHECK_USER_EXISTANCE, '/login', 'GET');

export const loginAction = createApiThunk<{
    email: string;
    password: string;
}>(LOGIN, '/login', 'POST');

export default loginSlice.reducer;