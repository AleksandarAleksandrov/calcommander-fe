import { createSlice } from "@reduxjs/toolkit";
import { createApiThunk } from "./thunkApiFactory";

const GET_ONBOARDING_DATA = 'GET_ONBOARDING_DATA';
const GET_ONBOARDING_DATA_REQUEST = `${GET_ONBOARDING_DATA}_REQUEST`;
const GET_ONBOARDING_DATA_SUCCESS = `${GET_ONBOARDING_DATA}_SUCCESS`;
const GET_ONBOARDING_DATA_FAILURE = `${GET_ONBOARDING_DATA}_FAILURE`;

const ADD_CALENDAR = 'ADD_CALENDAR';
const ADD_CALENDAR_REQUEST = `${ADD_CALENDAR}_REQUEST`;
const ADD_CALENDAR_SUCCESS = `${ADD_CALENDAR}_SUCCESS`;
const ADD_CALENDAR_FAILURE = `${ADD_CALENDAR}_FAILURE`;

export enum OnboardingStep {
    USER_INFO = 'USER_INFO',
    CALENDAR_SETTINGS = 'CALENDAR_SETTINGS',
    AVAILABILITY = 'AVAILABILITY'
}

const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState: {
        step: OnboardingStep.USER_INFO,
        isLoading: true,
        hasInitialized: false,
        calendars: [],
        availability: {
            Monday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
            Tuesday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
            Wednesday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
            Thursday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
            Friday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
            Saturday: { enabled: false, timeSlots: [] },
            Sunday: { enabled: false, timeSlots: [] },
        },
        userData: {
            slug: '',
            email: '',
            name: '',
            primaryCalendarId: '',
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
        setUserDataAndStep: (state, action) => {
            const { slug, name, timezone, step } = action.payload;
            state.userData.slug = slug;
            state.userData.name = name;
            state.userData.timezone = timezone;
            state.step = step;
        },
        setCalendarsAndStep: (state, action) => {
            const { calendars, step } = action.payload;
            state.calendars = calendars;
            state.step = step;
        },
        setAvailabilityAndStep: (state, action) => {
            const { availability, step } = action.payload;
            state.availability = availability;
            state.step = step;
        },
        setPrimaryCalendarId: (state, action) => {
            state.userData.primaryCalendarId = action.payload;
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
                state.availability = !Object.keys(action.payload.data.availability.availability).length ? {
                    Monday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
                    Tuesday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
                    Wednesday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
                    Thursday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
                    Friday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
                } : action.payload.data.availability;
                state.userData = action.payload.data.userData;
            })
            .addCase(GET_ONBOARDING_DATA_FAILURE, (state, action) => {
                state.isLoading = false;
            })
            .addCase(ADD_CALENDAR_REQUEST, (state, action) => {

            })
            .addCase(ADD_CALENDAR_SUCCESS, (state, action) => {
                state.isLoading = false;
                state.calendars = [...state.calendars, action.payload.data];
            });
    }
});

export const { setStep, setSlug, setName, setTimezone, setUserDataAndStep, setCalendarsAndStep, setAvailability, setPrimaryCalendarId, setAvailabilityAndStep } = onboardingSlice.actions;

export const getOnboardingData = createApiThunk(GET_ONBOARDING_DATA, '/onboarding');

export const addCalendar = createApiThunk(ADD_CALENDAR, '/calendars', 'POST');

export default onboardingSlice.reducer;
