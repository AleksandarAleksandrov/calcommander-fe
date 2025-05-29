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
    const [formData, setFormData] = useState({
        username: 'janesmith',
        fullName: 'Jane Smith',
        timezone: 'America/Los_Angeles',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleNextStep = () => {
        // Handle next step logic here
        console.log('Form data:', formData);
    };

    return (
        <Box minH="100vh" bg="gray.50" display="flex" flexDirection="column">
            {/* Main Content */}
            <Box flex="1" display="flex" alignItems="center" justifyContent="center" py={8}>
                <Box w="full" maxW="400px" mx={4}>
                    {/* Progress Indicator */}
                    <Stack gap={4} align="center" mb={8}>
                        <Heading size="xl" color="gray.900" textAlign="center">
                            Welcome to Cal.com!
                        </Heading>
                        <Text fontSize="sm" color="gray.600" textAlign="center" lineHeight="tall">
                            We just need some basic info to get your profile setup.
                            <br />
                            You'll be able to edit this later.
                        </Text>
                    </Stack>
                    <Stack gap={2} mb={6}>

                        <Text fontSize="sm" color="gray.600" alignSelf="flex-start">
                            Step 1 of 4
                        </Text>
                        <Box w="full" h="2" bg="gray.200" borderRadius="full">
                            <Box
                                w="25%"
                                h="full"
                                bg="gray.900"
                                borderRadius="full"
                                transition="width 0.3s ease"
                            />
                        </Box>
                    </Stack>

                    <Box bg="white" p={8} borderRadius="lg" shadow="sm">
                        <UserInfoStep />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default OnboardingPage; 