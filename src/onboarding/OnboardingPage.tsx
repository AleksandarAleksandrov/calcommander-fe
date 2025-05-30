import { Box } from '@chakra-ui/react';
import UserInfoStep from './UserInfoStep';
import OnboardingWizardControl from './OnboardingWizardControl';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { OnboardingStep } from '@/store/onboardingSlice';
import UserInfoHeader from './UserInfoHeader';
import AvailabilityStep from './AvailabilityStep';
import CalendarSettings from './CalendarSettings';

export default function OnboardingPage() {

    const step = useSelector((state: RootState) => state.onboarding.step);

    return (
        <Box minH="100vh" bg="gray.50" display="flex" flexDirection="column">
            {/* Main Content */}
            <Box flex="1" display="flex" alignItems="flex-start" justifyContent="center" py={8}>
                <Box w="full" maxW="600px" mx={4}>

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
    );
};