import { OnboardingStep } from "@/store/onboardingSlice";
import { Heading, Stack, Text } from "@chakra-ui/react";

const stepMapping = {
    [OnboardingStep.USER_INFO]: {
        title: `Welcome to ${import.meta.env.VITE_APP_NAME}!`,
        description: [
            "We just need some basic info to get your profile setup.",
            "You can always update this information later in your profile settings."
        ]
    },
    [OnboardingStep.CALENDAR_SETTINGS]: {
        title: `Keep Your Calendar in Sync`,
        description: [
            " We’ll detect busy slots and scheduled events automatically once connected."
        ]
    },
    [OnboardingStep.AVAILABILITY]: {
        title: `Define Your Availability`,
        description: [
            "Select the days and hours you're open for appointments.",
            "This can be adjusted at any time from the availability page."
        ]
    }
}

export default function UserInfoHeader({ step }: { step: OnboardingStep }) {
    return (
        <>
            <Stack align="center" mb={2}>
                <Heading size="2xl" color="gray.900" textAlign="center">
                    {stepMapping[step].title}
                </Heading>
            </Stack>
            <Stack gap={4} align="left" mb={4}>
                <Text fontSize="sm" color="gray.600" textAlign="left" lineHeight="tall">
                    {stepMapping[step].description.map((line, index) => (
                        <Text key={index}>{line}</Text>
                    ))}
                </Text>
            </Stack>
        </>
    );
}