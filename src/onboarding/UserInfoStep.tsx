import { Button, Stack, Box, Input, Field, defineStyle } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import TimezoneInput from "@/components/TimezoneInput";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useCallback, memo, useEffect } from "react";
import { OnboardingStep, setName, setSlug, setTimezone } from "@/store/onboardingSlice";
import { setStep } from "@/store/onboardingSlice";
import type { RootState } from "@/store";

// Move styles outside component to prevent recreation on every render
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
});

// Memoized selector to prevent unnecessary re-renders
const selectUserData = (state: RootState) => state.onboarding.userData;

function UserInfoStep() {
    const dispatch = useDispatch();
    
    // Use single selector for better performance
    const userData = useSelector(selectUserData);
    
    // Local state for form data
    const [username, setUsername] = useState(userData.slug || '');
    const [fullName, setFullName] = useState(userData.name || '');
    const [timezone, setTimezoneValue] = useState(userData.timezone || '');

    // Sync local state with store data when it changes
    useEffect(() => {
        setUsername(userData.slug || '');
        setFullName(userData.name || '');
        setTimezoneValue(userData.timezone || '');
    }, [userData.slug, userData.name, userData.timezone]);

    // Memoize the URL slug to prevent unnecessary re-calculations
    const urlSlug = useMemo(() => import.meta.env.VITE_APP_URL_SLUG, []);

    // Memoize the next step handler
    const handleNextStep = useCallback(() => {
        // Dispatch all updates to the store at once
        dispatch(setSlug(username));
        dispatch(setName(fullName));
        dispatch(setTimezone(timezone));
        dispatch(setStep(OnboardingStep.CALENDAR_SETTINGS));
    }, [dispatch, username, fullName, timezone]);

    // Memoize change handlers to prevent unnecessary re-renders of child components
    const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }, []);

    const handleFullNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
    }, []);

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
                    {urlSlug}/
                </Box>
                <Input
                    className='peer'
                    size="xl"
                    css={{ "--focus-color": "blue" }}
                    borderRadius="md"
                    borderLeftRadius="none"
                    borderLeft="none"
                    borderColor="gray.300"
                    value={username}
                    onChange={handleUsernameChange}
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
                    value={fullName}
                    onChange={handleFullNameChange}
                />
            </Box>
        </Field.Root>

        <TimezoneInput 
            value={timezone}
            onChange={setTimezoneValue}
        />

        <Button
            type="submit"
            size="xl"
            w="100%"
            borderRadius="md"
            colorPalette="blue"
            onClick={handleNextStep}
        >
            Next Step
            <FiArrowRight />
        </Button>
    </Stack>
}

// Export memoized component to prevent unnecessary re-renders
export default memo(UserInfoStep);
