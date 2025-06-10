import { Box, Image } from '@chakra-ui/react';
import UserInfoStep from './UserInfoStep';
import OnboardingWizardControl from './OnboardingWizardControl';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '@/store';
import { OnboardingStep, getOnboardingData } from '@/store/onboardingSlice';
import UserInfoHeader from './UserInfoHeader';
import AvailabilityStep from './AvailabilityStep';
import CalendarSettings from './CalendarSettings';

// Import images
import onboardingCharacter from '@/assets/images/onboarding_character.png';
import womanHoldingCalendar from '@/assets/images/woman_holding_calendar.png';
import womanPointingClock from '@/assets/images/woman_pointing_clock.png';

export default function OnboardingPage() {

    const step = useSelector((state: RootState) => state.onboarding.step);
    const hasInitialized = useSelector((state: RootState) => state.onboarding.hasInitialized);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!hasInitialized) {
            dispatch(getOnboardingData() as any);
        }
    }, [hasInitialized, dispatch]);

    // Map steps to images
    const getStepImage = () => {
        switch (step) {
            case OnboardingStep.USER_INFO:
                return onboardingCharacter;
            case OnboardingStep.CALENDAR_SETTINGS:
                return womanHoldingCalendar;
            case OnboardingStep.AVAILABILITY:
                return womanPointingClock;
            default:
                return onboardingCharacter;
        }
    };

    return (
        <Box minH="100vh" bg="gray.50" display="flex" flexDirection="column">

            <Box flex="1" display="flex" alignItems="center" justifyContent="center" py={8}>
                <Box
                    flex="1"
                    w="25%"
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    minH="50vh"
                >
                    <Image
                        src={getStepImage()}
                        alt="Onboarding illustration"
                        maxW="120%"
                        maxH="80vh"
                        objectFit="contain"
                        transition="opacity 0.3s ease-in-out, transform 0.3s ease-in-out"
                        opacity={1}
                        transform="scale(1)"
                        _hover={{
                            transform: "scale(1.02)"
                        }}
                    />
                </Box>

                <Box w="75%" mr={4} display="flex" gap={2}>
                    <Box
                        flex="3"
                        w="75%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="flex-start"
                        paddingRight="15%"
                    >
                        <Box w="full" maxW="600px">
                            {step === OnboardingStep.USER_INFO && <UserInfoHeader step={step} />}
                            {step === OnboardingStep.CALENDAR_SETTINGS && <UserInfoHeader step={step} />}
                            {step === OnboardingStep.AVAILABILITY && <UserInfoHeader step={step} />}

                            <OnboardingWizardControl step={step} />

                            <Box bg="white" p={6} borderRadius="lg" shadow="sm">
                                {step === OnboardingStep.USER_INFO && <UserInfoStep />}
                                {step === OnboardingStep.CALENDAR_SETTINGS && <CalendarSettings />}
                                {step === OnboardingStep.AVAILABILITY && <AvailabilityStep />}
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
};