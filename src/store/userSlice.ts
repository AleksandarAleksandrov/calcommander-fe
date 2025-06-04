import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk } from "./thunkApiFactory";

export const USER_ME = 'USER_ME';
export const USER_ME_REQUEST = `${USER_ME}_REQUEST`;
export const USER_ME_SUCCESS = `${USER_ME}_SUCCESS`;
export const USER_ME_FAILURE = `${USER_ME}_FAILURE`;

const userSlice = createSlice({
    name: '@@user',
    initialState: {
        user: null,
        hasCompletedOnboarding: false,
        isLoading: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(USER_ME_REQUEST, (state) => {
            state.isLoading = true;
        });
        builder.addCase(USER_ME_SUCCESS, (state, action: any) => {
            state.user = action.payload.data;
            state.isLoading = false;
        });
        builder.addCase(USER_ME_FAILURE, (state) => {
            state.isLoading = false;
        });
    }
});

export const getUserMe = createApiThunk(USER_ME, '/users/me');

export default userSlice.reducer;