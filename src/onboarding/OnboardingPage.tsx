import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Stack,
    Text,
    HStack,
    Flex,
    Spacer,
    Heading,
    Field,
    defineStyle,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import UserInfoStep from './UserInfoStep';
import OnboardingWizardControl from './OnboardingWizardControl';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { OnboardingStep } from '@/store/onboardingSlice';
import UserInfoHeader from './UserInfoHeader';

const floatingStyles = defineStyle({
    pos: "absolute",
    bg: "bg",
    px: "0.5",
    top: "-5",
    insetStart: "2",
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",
    _peerPlaceholderShown: {
        color: "fg.muted",
        top: "3.5",
        insetStart: "3",
    },
    _peerFocusVisible: {
        color: "fg",
        top: "-3",
        insetStart: "2",
    },
});

export default function OnboardingPage() {

    const step = useSelector((state: RootState) => state.onboarding.step);

    return (
        <Box minH="100vh" bg="gray.50" display="flex" flexDirection="column">
            {/* Main Content */}
            <Box flex="1" display="flex" alignItems="flex-start" justifyContent="center" py={8}>
                <Box w="full" maxW="500px" mx={4}>

                    {step === OnboardingStep.USER_INFO && <UserInfoHeader step={step} />}

                    <OnboardingWizardControl step={step} />

                    <Box bg="white" p={8} borderRadius="lg" shadow="sm">
                        {step === OnboardingStep.USER_INFO && <UserInfoStep />}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};