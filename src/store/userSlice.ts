import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk } from "./thunkApiFactory";

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = `${LOGIN}_REQUEST`;
export const LOGIN_SUCCESS = `${LOGIN}_SUCCESS`;
export const LOGIN_FAILURE = `${LOGIN}_FAILURE`;

const userSlice = createSlice({
    name: '@@user',
    initialState: {
        user: null,
        isLoading: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(LOGIN_REQUEST, (state, action) => {
            state.isLoading = true;
        })
        .addCase(LOGIN_SUCCESS, (state, action) => {
            state.isLoading = false;
        })
        .addCase(LOGIN_FAILURE, (state, action) => {
            state.isLoading = false;
        })
    }
});

export interface LoginPayload {
    email: string;
    password: string;
}

export const loginAction = createApiThunk<LoginPayload>(LOGIN, '/login', 'POST');

export const { } = userSlice.actions;
export default userSlice.reducer;