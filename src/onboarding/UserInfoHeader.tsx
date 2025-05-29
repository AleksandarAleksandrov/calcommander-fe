import { OnboardingStep } from "@/store/onboardingSlice";
import { Heading, Stack, Text } from "@chakra-ui/react";

const stepMapping = {
    [OnboardingStep.USER_INFO]: {
        title: `Welcome to ${import.meta.env.VITE_APP_NAME}!`,
        description: "We just need some basic info to get your profile setup. You'll be able to edit this later."
    }
}

export default function UserInfoHeader({ step }: { step: OnboardingStep }) {
    return (
        <>
            <Stack gap={4} align="center" mb={8}>
                <Heading size="3xl" color="gray.900" textAlign="center">
                    {stepMapping[step].title}
                </Heading>
            </Stack>
            <Stack gap={4} align="center" mb={8}>
                <Text fontSize="sm" color="gray.600" textAlign="left" lineHeight="tall">
                    {stepMapping[step].description}
                </Text>
            </Stack>
        </>
    );
}