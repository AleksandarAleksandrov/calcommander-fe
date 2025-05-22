import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk } from "./thunkApiFactory";


export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = `${LOGIN}_REQUEST`;
export const LOGIN_SUCCESS = `${LOGIN}_SUCCESS`;
export const LOGIN_FAILURE = `${LOGIN}_FAILURE`;

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoading: false,
        isPlatformContinueLoading: false,
        isEmailPresent: false,
        isEmailConnected: false
    },
    reducers:{
        setIsPlatformContinueLoading: (state) => {
            state.isPlatformContinueLoading = true;
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(LOGIN_REQUEST, (state, action) => {
            state.isPlatformContinueLoading = true;
        })
        .addCase(LOGIN_SUCCESS, (state, action) => {
            state.isPlatformContinueLoading = false;
        })
        .addCase(LOGIN_FAILURE, (state, action) => {
            state.isPlatformContinueLoading = false;
        })
    }
})

export interface LoginPayload {
    email: string;
    password: string;
}

export const loginAction = createApiThunk<LoginPayload>(LOGIN, '/login', 'POST');

export const { setIsPlatformContinueLoading } = loginSlice.actions;

export default loginSlice.reducer;