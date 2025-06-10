import { addCalendar, OnboardingStep, setStep } from "@/store/onboardingSlice";
import {
    Box,
    Text,
    Flex,
    Stack,
    Button,
    Select,
    createListCollection,
    Portal,
    Checkbox,
    IconButton
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import type { RootState } from "@/store";
import { useGoogleLogin } from "@react-oauth/google";

const selectCalendars = (state: RootState) => state.onboarding.calendars;

export default function CalendarSettings() {

    const dispatch = useDispatch();

    const googleLogin = useGoogleLogin({
        ux_mode: 'popup',
        scope: "https://www.googleapis.com/auth/calendar",
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
           dispatch(addCalendar({credential: codeResponse.code}));
        }
    });
    
    const storeCalendars = useSelector(selectCalendars);

    const currentDay = new Date().getDate();
    const MAX_CALENDARS = 7;

    // State to manage calendars
    const [calendars, setCalendars] = useState(JSON.parse(JSON.stringify(storeCalendars)));

    // State for delete confirmation dialog
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; calendarId: number | null }>({
        isOpen: false,
        calendarId: null
    });

    // Function to show delete confirmation
    const showDeleteConfirmation = (calendarId: number) => {
        setDeleteDialog({ isOpen: true, calendarId });
    };

    // Function to close delete confirmation
    const closeDeleteConfirmation = () => {
        setDeleteDialog({ isOpen: false, calendarId: null });
    };

    // Function to delete a calendar
    const deleteCalendar = () => {
        if (deleteDialog.calendarId !== null) {
            setCalendars(calendars.filter((calendar: any) => calendar.id !== deleteDialog.calendarId));
            closeDeleteConfirmation();
        }
    };

    const calendarOptions = createListCollection({
        items: calendars.map(calendar => ({
            label: calendar.userEmail,
            value: calendar.userEmail
        }))
    });

    return (
        <>
            {/* Your calendar section */}
            <Box mb={8}>
                <Text fontSize="xl" fontWeight="semibold" mb={4} color="gray.800">
                    Your calendar(s)
                </Text>

                <Stack gap={3} mb={4}>
                    {calendars.length > 0 ? (
                        calendars.map((calendar) => (
                            <Box
                                key={calendar.id}
                                p={4}
                                border="1px solid"
                                borderColor="gray.200"
                                borderRadius="md"
                                bg="gray.50"
                            >
                                <Flex justify="space-between" align="center">
                                    <Flex align="center" gap={3}>
                                        <Box
                                            w={11}
                                            h={11}
                                            bg="blue.500"
                                            borderRadius="md"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            color="white"
                                            fontSize="md"
                                            fontWeight="bold"
                                        >
                                            {currentDay}
                                        </Box>
                                        <Box>
                                            <Text fontWeight="medium" color="gray.800">{calendar.provider}</Text>
                                            <Text fontSize="sm" color="gray.600">
                                                {calendar.userName}
                                            </Text>
                                            <Text fontSize="sm" color="gray.600">
                                                {calendar.userEmail}
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Flex align="center" gap={2}>
                                        <Box bg="bg.success" color="gray.600" px={3} py={1}
                                            border="1px solid"
                                            borderColor="green.400"
                                            borderRadius="md" fontSize="sm">
                                            {calendar.status === "ACTIVE" ? "Connected" : "Disconnected"}
                                        </Box>
                                        <IconButton
                                            aria-label="Delete calendar"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => showDeleteConfirmation(calendar.id)}
                                        >
                                            <FiTrash2 size={16} />
                                        </IconButton>
                                    </Flex>
                                </Flex>

                                <Stack mt={3}>
                                    <Flex key={calendar.id} justify="flex-start" align="center" gap={3}>
                                        <Checkbox.Root
                                            defaultChecked
                                            colorPalette="blue"
                                            background="white"
                                            size="md"
                                        >
                                            <Checkbox.HiddenInput />
                                            <Checkbox.Control />
                                        </Checkbox.Root>
                                        <Text fontSize="sm" color="gray.700">
                                            Check for conflicts to prevent double bookings
                                        </Text>
                                    </Flex>
                                </Stack>
                            </Box>
                        ))
                    ) : (
                        <Box
                            p={6}
                            border="2px dashed"
                            borderColor="gray.300"
                            borderRadius="md"
                            bg="gray.50"
                            textAlign="center"
                        >
                            <Text color="gray.500" fontSize="sm">
                                No calendars connected. Click "Add calendar" below to get started.
                            </Text>
                        </Box>
                    )}
                </Stack>

                <Flex direction="row" gap={3} align="baseline">
                    <Button
                        mt={3}
                        type="submit"
                        size="sm"
                        borderRadius="md"
                        colorPalette="blue"
                        flex="0 0 auto"
                        onClick={() => googleLogin()}
                        disabled={calendars.length >= MAX_CALENDARS}
                    >
                        Add calendar
                    </Button>
                    <Text fontSize="sm" color="gray.700">
                        You can add up to {MAX_CALENDARS} calendars
                    </Text>
                </Flex>
            </Box>

            {/* Add to calendar section */}
            <Box mb={8}>
                <Text fontSize="lg" fontWeight="semibold" mb={2} color="gray.800">
                    Add to calendar
                </Text>
                <Text fontSize="sm" color="gray.600" mb={4}>
                    Select the calendar you would like to add new events to as they're scheduled.
                </Text>

                {calendars.length > 0 ? (
                    <>
                        <Select.Root
                            collection={calendarOptions}
                            defaultValue={[calendars[0]?.userEmail]}
                            className='peer'
                            size="lg"
                            css={{ "--focus-color": "blue" }}
                            borderRadius="md"
                            borderLeftRadius="none"
                            borderLeft="none"
                            borderColor="gray.300"
                        >
                            <Select.Trigger
                                bg="white"
                                borderColor="gray.300"
                            >
                                <Select.ValueText placeholder="Select calendar" />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content
                                        bg="white"
                                        border="1px solid"
                                        borderColor="gray.200"
                                        borderRadius="md"
                                        boxShadow="lg"
                                        zIndex={1000}
                                    >
                                        {calendarOptions.items.map((option) => (
                                            <Select.Item key={option.value} item={option}>
                                                <Select.ItemText>{option.label}</Select.ItemText>
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                        {/* Sync options */}
                        <Box paddingTop={3}>
                            <Flex align="start" gap={3}>
                                <Checkbox.Root
                                    defaultChecked
                                    colorPalette="blue"
                                    size="md"
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                </Checkbox.Root>
                                <Text fontSize="sm" color="gray.700">
                                    Automatically sync cancellations and reschedules from this calendar to {import.meta.env.VITE_APP_NAME}
                                </Text>
                            </Flex>
                        </Box>
                    </>
                ) : (
                    <Text fontSize="sm" color="gray.500" fontStyle="italic">
                        No calendars available. Add a calendar to configure this setting.
                    </Text>
                )}
            </Box>

            <Stack direction="row" gap={4} w="100%">
                <Button
                    size="xl"
                    variant="outline"
                    borderRadius="md"
                    flex="0 0 auto"
                    minW="120px"
                    onClick={() => dispatch(setStep(OnboardingStep.USER_INFO))}
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    size="xl"
                    borderRadius="md"
                    colorPalette="blue"
                    flex="1"
                    onClick={() => dispatch(setStep(OnboardingStep.AVAILABILITY))}
                >
                    Next Step →
                </Button>
            </Stack>

            {/* Delete Confirmation Dialog */}
            {deleteDialog.isOpen && (
                <Portal>
                    <Box
                        position="fixed"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bg="blackAlpha.600"
                        zIndex={1400}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        onClick={closeDeleteConfirmation}
                    />
                    <Box
                        position="fixed"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        bg="white"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.200"
                        p={6}
                        boxShadow="xl"
                        maxW="400px"
                        w="90%"
                        zIndex={1500}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Stack gap={4}>
                            <Box>
                                <Text fontSize="lg" fontWeight="semibold" color="gray.800" mb={2}>
                                    Delete Calendar
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                    Are you sure you want to delete this calendar? This action cannot be undone.
                                </Text>
                            </Box>
                            
                            <Stack direction="row" gap={3} justify="flex-end">
                                <Button
                                    size="md"
                                    variant="outline"
                                    borderRadius="md"
                                    onClick={closeDeleteConfirmation}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="md"
                                    colorPalette="red"
                                    borderRadius="md"
                                    onClick={deleteCalendar}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Portal>
            )}
        </>
    )
}