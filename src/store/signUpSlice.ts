import { UserExistence } from "./loginSlice";
import { createApiThunk } from "./thunkApiFactory";
import { createSlice } from "@reduxjs/toolkit";

const CHECK_USER_REGISTRATION_EXISTANCE = 'CHECK_USER_REGISTRATION_EXISTANCE';
const CHECK_USER_REGISTRATION_EXISTANCE_REQUEST = 'CHECK_USER_REGISTRATION_EXISTANCE_REQUEST';
const CHECK_USER_REGISTRATION_EXISTANCE_SUCCESS = 'CHECK_USER_REGISTRATION_EXISTANCE_SUCCESS';
const CHECK_USER_REGISTRATION_EXISTANCE_FAILURE = 'CHECK_USER_REGISTRATION_EXISTANCE_FAILURE';

const SIGN_UP = 'SIGN_UP';
const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';  

const INIT_STATE = {
    existanceStatus: UserExistence.NOT_INITIATED,
    isPlatformContinueLoading: false
}

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState: INIT_STATE,
    reducers: {
        clearSignUpState: (state) => {
            state.existanceStatus = UserExistence.NOT_INITIATED;
            state.isPlatformContinueLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CHECK_USER_REGISTRATION_EXISTANCE_REQUEST, (state, action) => {
            state.isPlatformContinueLoading = true;
        })  
        .addCase(CHECK_USER_REGISTRATION_EXISTANCE_SUCCESS, (state, action: any) => {
            switch(action.payload.data.status) {
                case 'PRESENT':
                    state.existanceStatus = UserExistence.PRESENT;
                    break;
                case 'NOT_PRESENT':
                    state.existanceStatus = UserExistence.NOT_PRESENT;
                    break;
                case 'PRESENT_THRU_OAUTH':
                    state.existanceStatus = UserExistence.PRESENT_THRU_OAUTH;
            }
            state.isPlatformContinueLoading = false;
        })
        .addCase(CHECK_USER_REGISTRATION_EXISTANCE_FAILURE, (state, action) => {
            state.isPlatformContinueLoading = false;
        })
        .addCase(SIGN_UP_REQUEST, (state, action) => {
            state.isPlatformContinueLoading = true;
        })
        .addCase(SIGN_UP_SUCCESS, (state, action) => {
            state.isPlatformContinueLoading = false;
        })
        .addCase(SIGN_UP_FAILURE, (state, action) => {
            state.isPlatformContinueLoading = false;
        })
    }
})

export const checkUserRegistrationExistance = createApiThunk<{
    email: string;
}>(CHECK_USER_REGISTRATION_EXISTANCE, '/sign-in', 'GET');

export const signUpAction = createApiThunk<{
    email: string;
    password: string;
}>(SIGN_UP, '/sign-up', 'POST');

export const { clearSignUpState } = signUpSlice.actions;

export default signUpSlice.reducer;
