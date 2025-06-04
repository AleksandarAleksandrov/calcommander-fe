import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk } from "./thunkApiFactory";

const GET_ONBOARDING_DATA = 'GET_ONBOARDING_DATA';
const GET_ONBOARDING_DATA_REQUEST = `${GET_ONBOARDING_DATA}_REQUEST`;
const GET_ONBOARDING_DATA_SUCCESS = `${GET_ONBOARDING_DATA}_SUCCESS`;
const GET_ONBOARDING_DATA_FAILURE = `${GET_ONBOARDING_DATA}_FAILURE`;

export enum OnboardingStep {
    USER_INFO = 'USER_INFO',
    CALENDAR_SETTINGS = 'CALENDAR_SETTINGS',
    AVAILABILITY = 'AVAILABILITY',
    USER_PROFILE = 'USER_PROFILE',
}

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState: {
        step: OnboardingStep.USER_INFO,
        isLoading: true,
        hasInitialized: false,
        calendars: [],
        availability: [],
        userData: {
            slug: '',
            email: '',
            name: '',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    },
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setSlug: (state, action) => {
            state.userData.slug = action.payload;
        },
        setName: (state, action) => {
            state.userData.name = action.payload;
        },
        setTimezone: (state, action) => {
            state.userData.timezone = action.payload;
        },
        setCalendars: (state, action) => {
            state.calendars = action.payload;
        },
        setAvailability: (state, action) => {
            state.availability = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GET_ONBOARDING_DATA_REQUEST, (state, action) => {
                state.isLoading = true;
                state.hasInitialized = true;
            })
            .addCase(GET_ONBOARDING_DATA_SUCCESS, (state, action: any) => {
                state.isLoading = false;
                state.calendars = action.payload.data.calendars;
                state.availability = action.payload.data.availability;
                state.userData = action.payload.data.userData;
            })
            .addCase(GET_ONBOARDING_DATA_FAILURE, (state, action) => {
                state.isLoading = false;
            })

    }
});

export const { setStep, setSlug, setName, setTimezone, setCalendars, setAvailability } = onboardingSlice.actions;

export const getOnboardingData = createApiThunk(GET_ONBOARDING_DATA, '/onboarding');

export default onboardingSlice.reducer;
