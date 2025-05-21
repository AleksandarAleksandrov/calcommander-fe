import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./userActions";

export interface UserState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    } | null
}

export const initialUserState: UserState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
}

export const userReducer = (state: UserState = initialUserState, action: any) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true };
        case LOGIN_SUCCESS:
            localStorage.setItem('accessToken', action.payload.accessToken);
            return { ...state, isAuthenticated: true, isLoading: false };
        case LOGIN_FAILURE:
            return { ...state, isAuthenticated: false, user: null, isLoading: false };
        default:
            return state;
    }
}