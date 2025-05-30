import { Button, Stack, Box, Input, Field, defineStyle } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import TimezoneInput from "@/components/TimezoneInput";
import { useDispatch } from "react-redux";
import { OnboardingStep } from "@/store/onboardingSlice";
import { setStep } from "@/store/onboardingSlice";

const floatingStyles = defineStyle({
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
})

export default function UserInfoStep() {

    const dispatch = useDispatch();

    return <Stack gap={6}>
        {/* Username Field */}
        <Field.Root>
            <Field.Label css={floatingStyles}>Username</Field.Label>
            <Box position="relative" display="flex" w="full">
                <Box
                    bg="gray.100"
                    border="1px solid"
                    borderColor="gray.200"
                    fontSize="sm"
                    color="blue.600"
                    px={3}
                    py={2.5}
                    borderRightRadius={0}
                    borderTopLeftRadius="md"
                    borderBottomLeftRadius="md"
                    display="flex"
                    alignItems="center"
                >
                    {import.meta.env.VITE_APP_URL_SLUG}/
                </Box>
                <Input
                    className='peer'
                    size="xl"
                    css={{ "--focus-color": "blue" }}
                    borderRadius="md"
                    borderLeftRadius="none"
                    borderLeft="none"
                    borderColor="gray.300"
                />
            </Box>
        </Field.Root>


        {/* Full Name Field */}
        <Field.Root>
            <Field.Label css={floatingStyles}>Full name</Field.Label>
            <Box position="relative" display="flex" w="full">
                <Input
                    className='peer'
                    size="xl"
                    css={{ "--focus-color": "blue" }}
                    borderRadius="md"
                    borderColor="gray.300"
                />
            </Box>
        </Field.Root>

        <TimezoneInput />

        <Button
            type="submit"
            size="xl"
            w="100%"
            borderRadius="md"
            colorPalette="blue"
            // TODO: Replace with calendar settings step
            onClick={() => dispatch(setStep(OnboardingStep.CALENDAR_SETTINGS))}
        >
            Next Step
            <FiArrowRight />
        </Button>
    </Stack>
}
