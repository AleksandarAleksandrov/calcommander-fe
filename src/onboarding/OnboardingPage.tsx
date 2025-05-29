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

const OnboardingPage: React.FC = () => {


    return (
        <Box minH="100vh" bg="gray.50" display="flex" flexDirection="column">
            {/* Main Content */}
            <Box flex="1" display="flex" alignItems="flex-start" justifyContent="center" py={8}>
                <Box w="full" maxW="500px" mx={4}>
                    {/* Progress Indicator */}
                    <Stack gap={4} align="center" mb={8}>
                        <Heading size="3xl" color="gray.900" textAlign="center">
                            Welcome to {import.meta.env.VITE_APP_NAME}!
                        </Heading>
                    </Stack>
                    <Stack gap={4} align="center" mb={8}>
                        <Text fontSize="sm" color="gray.600" textAlign="left" lineHeight="tall">
                            We just need some basic info to get your profile setup.
                            <br />
                            You'll be able to edit this later.
                        </Text>
                    </Stack>

                    <OnboardingWizardControl />

                    <Box bg="white" p={8} borderRadius="lg" shadow="sm">
                        <UserInfoStep />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default OnboardingPage; 