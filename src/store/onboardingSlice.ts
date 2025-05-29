import { createSlice } from "@reduxjs/toolkit";

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
    },
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },
    },
});

export const { setStep } = onboardingSlice.actions;

export default onboardingSlice.reducer;
