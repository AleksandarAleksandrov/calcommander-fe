import { Box, Text, Stack } from "@chakra-ui/react";
import { OnboardingStep } from "@/store/onboardingSlice";

export default function OnboardingWizardControl({ step }: { step: OnboardingStep }) {
    return <>
        <Stack gap={2} mb={6}>
            <Text fontSize="sm" color="gray.600" alignSelf="flex-start">
                Step {Object.keys(OnboardingStep).indexOf(step) + 1} of {Object.keys(OnboardingStep).length}
            </Text>
            <Box w="full" h="2" bg="gray.200" borderRadius="full">
                <Box
                    w={`${((Object.keys(OnboardingStep).indexOf(step) + 1) / (Object.keys(OnboardingStep).length)) * 100}%`}
                    h="full"
                    bg="blue.500"
                    borderRadius="full"
                    transition="width 0.3s ease"
                />
            </Box>
        </Stack>
    </>
}