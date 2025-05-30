import { OnboardingStep, setStep } from "@/store/onboardingSlice";
import {
    Box,
    Text,
    Flex,
    Stack,
    Button,
    Select,
    createListCollection,
    Portal
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

export default function CalendarSettings() {

    const dispatch = useDispatch();
    const currentDay = new Date().getDate();

    const calendarOptions = createListCollection({
        items: [
            { label: "amaleksandrov94@gmail.com", value: "amaleksandrov94@gmail.com" }
        ]
    });

    return (
        <>
            {/* Your calendar section */}
            <Box mb={8}>
                <Text fontSize="xl" fontWeight="semibold" mb={4} color="gray.800">
                    Your calendar
                </Text>

                <Box
                    p={4}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    bg="gray.50"
                >
                    <Flex justify="space-between" align="center">
                        <Flex align="center" gap={3}>
                            <Box
                                w={8}
                                h={8}
                                bg="blue.500"
                                borderRadius="md"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                color="white"
                                fontSize="xs"
                                fontWeight="bold"
                            >
                                {currentDay}
                            </Box>
                            <Box>
                                <Text fontWeight="medium" color="gray.800">Google</Text>
                                <Text fontSize="sm" color="gray.600">
                                    amaleksandrov94@gmail.com
                                </Text>
                            </Box>
                        </Flex>
                        <Box bg="green.100" color="green.800" px={3} py={1}
                            border="1px solid"
                            borderRadius="md" fontSize="sm">
                            Connected
                        </Box>
                    </Flex>
                </Box>

                <Text
                    color="blue.500"
                    fontSize="sm"
                    mt={3}
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                >
                    Use a different calendar
                </Text>
            </Box>

            {/* Check for conflicts section */}
            <Box mb={8}>
                <Text fontSize="lg" fontWeight="semibold" mb={2} color="gray.800">
                    Check for conflicts
                </Text>
                <Text fontSize="sm" color="gray.600" mb={4}>
                    Select calendar(s) to check for conflicts to prevent double bookings.
                </Text>

                <Flex justify="space-between" align="center">
                    <Text fontSize="sm" color="gray.700">
                        amaleksandrov94@gmail.com
                    </Text>
                    <Text
                        color="blue.500"
                        fontSize="sm"
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                    >
                        Edit
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

                <Select.Root
                    collection={calendarOptions}
                    defaultValue={["amaleksandrov94@gmail.com"]}
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
                        _hover={{ borderColor: "gray.400" }}
                        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #4285F4" }}
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
                        <input
                            type="checkbox"
                            defaultChecked
                            style={{
                                marginTop: '2px',
                                accentColor: '#3182CE',
                                width: '16px',
                                height: '16px'
                            }}
                        />
                        <Text fontSize="sm" color="gray.700">
                            Automatically sync cancellations and reschedules from this calendar to Calendly
                        </Text>
                    </Flex>
                </Box>
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
        </>
    )
}