import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk } from "./thunkApiFactory";


export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = `${LOGIN}_REQUEST`;
export const LOGIN_SUCCESS = `${LOGIN}_SUCCESS`;
export const LOGIN_FAILURE = `${LOGIN}_FAILURE`;

export const CHECK_USER_EXISTANCE = 'CHECK_USER_EXISTANCE';
export const CHECK_USER_EXISTANCE_REQUEST = `${CHECK_USER_EXISTANCE}_REQUEST`;
export const CHECK_USER_EXISTANCE_SUCCESS = `${CHECK_USER_EXISTANCE}_SUCCESS`;
export const CHECK_USER_EXISTANCE_FAILURE = `${CHECK_USER_EXISTANCE}_FAILURE`;

export const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
export const GOOGLE_LOGIN_REQUEST = `${GOOGLE_LOGIN}_REQUEST`;
export const GOOGLE_LOGIN_SUCCESS = `${GOOGLE_LOGIN}_SUCCESS`;
export const GOOGLE_LOGIN_FAILURE = `${GOOGLE_LOGIN}_FAILURE`;

export enum UserExistence {
    /**
     * User is not checked yet
     */
    NOT_INITIATED,
    /**
     * User is present with email and password
     */
    PRESENT,
    /**
     * User is not found by email
     */
    NOT_PRESENT,
    /**
     * User is present with email but not with password. User came from oauth provider.
     */
    PRESENT_THRU_OAUTH
}

const INIT_STATE = {
    existanceStatus: UserExistence.NOT_INITIATED,
    isPlatformContinueLoading: false,
    loginFailed: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState: INIT_STATE,
    reducers:{
        clearLoginState: (state) => {
            state.existanceStatus = UserExistence.NOT_INITIATED;
            state.isPlatformContinueLoading = false;
            state.loginFailed = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(LOGIN_REQUEST, (state, action) => {
                state.isPlatformContinueLoading = true;
            })
            .addCase(LOGIN_SUCCESS, (state, action) => {
                state.isPlatformContinueLoading = false;
                state.loginFailed = false;
                state.existanceStatus = UserExistence.NOT_INITIATED;
            })
            .addCase(LOGIN_FAILURE, (state, action) => {
                state.isPlatformContinueLoading = false;
                state.loginFailed = true;
            })
            .addCase(CHECK_USER_EXISTANCE_REQUEST, (state, action) => {
                state.isPlatformContinueLoading = true;
            })
            .addCase(CHECK_USER_EXISTANCE_SUCCESS, (state, action:any) => {
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
            .addCase(CHECK_USER_EXISTANCE_FAILURE, (state, action) => {
                state.isPlatformContinueLoading = false;
            })
    }
})

export const checkUserExistance = createApiThunk<{
    email: string;
}>(CHECK_USER_EXISTANCE, '/sign-in', 'GET');

export const loginAction = createApiThunk<{
    email: string;
    password: string;
}>(LOGIN, '/sign-in', 'POST');

export const googleOneTapSignInAction = createApiThunk<{
    credential: string;
}>(GOOGLE_LOGIN, '/sign-in/google/one-tap', 'POST');

export const googleSignInAction = createApiThunk<{
    credential: string;
}>(GOOGLE_LOGIN, '/sign-in/google', 'POST');

export const { clearLoginState } = loginSlice.actions;

export default loginSlice.reducer;