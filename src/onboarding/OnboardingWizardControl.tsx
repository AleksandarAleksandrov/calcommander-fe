import { Box, Text, Stack } from "@chakra-ui/react";

export default function OnboardingWizardControl() {
    return <>
        <Stack gap={2} mb={6}>
            <Text fontSize="sm" color="gray.600" alignSelf="flex-start">
                Step 1 of 4
            </Text>
            <Box w="full" h="2" bg="gray.200" borderRadius="full">
                <Box
                    w="25%"
                    h="full"
                    bg="blue.500"
                    borderRadius="full"
                    transition="width 0.3s ease"
                />
            </Box>
        </Stack>
    </>
}