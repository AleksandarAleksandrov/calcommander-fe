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

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

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
                        {/* Header */}

                        {/* Form */}
                        <Stack gap={6}>
                            {/* Username Field */}
                            <Field.Root>
                                <Field.Label fontSize="sm" fontWeight="medium" color="gray.700">
                                    Username
                                </Field.Label>
                                <Box position="relative" display="flex">
                                    <Box
                                        bg="gray.100"
                                        border="1px solid"
                                        borderColor="gray.200"
                                        fontSize="sm"
                                        color="gray.600"
                                        px={3}
                                        py={2.5}
                                        borderRightRadius={0}
                                        borderTopLeftRadius="md"
                                        borderBottomLeftRadius="md"
                                        display="flex"
                                        alignItems="center"
                                    >
                                        cal.com/
                                    </Box>
                                    <Input
                                        value={formData.username}
                                        onChange={(e) => handleInputChange('username', e.target.value)}
                                        border="1px solid"
                                        borderColor="gray.200"
                                        borderLeftRadius={0}
                                        borderLeft="none"
                                        _focus={{
                                            borderColor: "gray.400",
                                            boxShadow: "0 0 0 1px var(--chakra-colors-gray-400)",
                                        }}
                                        flex="1"
                                    />
                                </Box>
                            </Field.Root>

                            {/* Full Name Field */}
                            <Field.Root>
                                <Field.Label fontSize="sm" fontWeight="medium" color="gray.700">
                                    Full name
                                </Field.Label>
                                <Input
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    border="1px solid"
                                    borderColor="gray.200"
                                    _focus={{
                                        borderColor: "gray.400",
                                        boxShadow: "0 0 0 1px var(--chakra-colors-gray-400)",
                                    }}
                                />
                            </Field.Root>

                            {/* Timezone Field */}
                            <Field.Root>
                                <Field.Label fontSize="sm" fontWeight="medium" color="gray.700">
                                    Timezone
                                </Field.Label>
                                <Box position="relative">
                                    <select
                                        value={formData.timezone}
                                        onChange={(e) => handleInputChange('timezone', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px 12px',
                                            border: '1px solid #E2E8F0',
                                            borderRadius: '6px',
                                            fontSize: '16px',
                                            backgroundColor: 'white',
                                            appearance: 'none',
                                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                            backgroundPosition: 'right 8px center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '16px',
                                        }}
                                    >
                                        <option value="America/Los_Angeles">America/Los_Angeles</option>
                                        <option value="America/New_York">America/New_York</option>
                                        <option value="America/Chicago">America/Chicago</option>
                                        <option value="America/Denver">America/Denver</option>
                                        <option value="Europe/London">Europe/London</option>
                                        <option value="Europe/Paris">Europe/Paris</option>
                                        <option value="Asia/Tokyo">Asia/Tokyo</option>
                                        <option value="Australia/Sydney">Australia/Sydney</option>
                                    </select>
                                </Box>
                                <Text fontSize="xs" color="gray.500" mt={1}>
                                    Current time {getCurrentTime()}
                                </Text>
                            </Field.Root>

                            {/* Next Step Button */}
                            <Button
                                onClick={handleNextStep}
                                bg="gray.900"
                                color="white"
                                w="full"
                                size="lg"
                                _hover={{
                                    bg: "gray.800",
                                }}
                                _active={{
                                    bg: "gray.900",
                                }}
                                mt={4}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={2}
                            >
                                Next Step
                                <FiArrowRight />
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default OnboardingPage; 