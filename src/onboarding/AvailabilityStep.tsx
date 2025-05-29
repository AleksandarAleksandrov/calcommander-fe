import { Box, Text, Stack, Input, Button, IconButton, Switch, Select, createListCollection, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { FiPlus, FiCopy, FiX } from "react-icons/fi";

interface TimeSlot {
    startTime: string;
    endTime: string;
}

interface DayAvailability {
    enabled: boolean;
    timeSlots: TimeSlot[];
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Generate time options from 00:00 to 23:45 in 15-minute intervals
const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            options.push({ label: timeString, value: timeString });
        }
    }
    return options;
};

const TIME_OPTIONS = generateTimeOptions();
const timeCollection = createListCollection({ items: TIME_OPTIONS });

// Helper function to convert time string to minutes for comparison
const timeToMinutes = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
};

// Helper function to create filtered time options for start time (before end time)
const createStartTimeCollection = (endTime: string) => {
    const endTimeMinutes = timeToMinutes(endTime);
    const filteredOptions = TIME_OPTIONS.filter(option => 
        timeToMinutes(option.value) < endTimeMinutes
    );
    return createListCollection({ items: filteredOptions });
};

// Helper function to create filtered time options for end time (after start time)
const createEndTimeCollection = (startTime: string) => {
    const startTimeMinutes = timeToMinutes(startTime);
    const filteredOptions = TIME_OPTIONS.filter(option => 
        timeToMinutes(option.value) > startTimeMinutes
    );
    return createListCollection({ items: filteredOptions });
};

// Helper function to get filtered start time options for rendering
const getFilteredStartTimeOptions = (endTime: string) => {
    const endTimeMinutes = timeToMinutes(endTime);
    return TIME_OPTIONS.filter(option => 
        timeToMinutes(option.value) < endTimeMinutes
    );
};

// Helper function to get filtered end time options for rendering
const getFilteredEndTimeOptions = (startTime: string) => {
    const startTimeMinutes = timeToMinutes(startTime);
    return TIME_OPTIONS.filter(option => 
        timeToMinutes(option.value) > startTimeMinutes
    );
};

export default function AvailabilityStep() {
    const [availability, setAvailability] = useState<Record<string, DayAvailability>>({
        Monday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
        Tuesday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
        Wednesday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
        Thursday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
        Friday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
        Saturday: { enabled: false, timeSlots: [] },
        Sunday: { enabled: false, timeSlots: [] }
    });

    const handleDayToggle = (day: string) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                enabled: !prev[day].enabled,
                timeSlots: !prev[day].enabled ? [{ startTime: '09:00', endTime: '17:00' }] : []
            }
        }));
    };

    const handleTimeChange = (day: string, slotIndex: number, field: 'startTime' | 'endTime', value: string[]) => {
        const selectedValue = value[0]; // Extract the first (and only) value from the array
        
        setAvailability(prev => {
            const currentSlot = prev[day].timeSlots[slotIndex];
            let newStartTime = currentSlot.startTime;
            let newEndTime = currentSlot.endTime;
            
            if (field === 'startTime') {
                newStartTime = selectedValue;
                // If new start time is >= current end time, set end time to next available slot
                if (timeToMinutes(selectedValue) >= timeToMinutes(currentSlot.endTime)) {
                    const nextTimeOptions = TIME_OPTIONS.filter(option => 
                        timeToMinutes(option.value) > timeToMinutes(selectedValue)
                    );
                    if (nextTimeOptions.length > 0) {
                        newEndTime = nextTimeOptions[0].value;
                    }
                }
            } else {
                newEndTime = selectedValue;
                // If new end time is <= current start time, set start time to previous available slot
                if (timeToMinutes(selectedValue) <= timeToMinutes(currentSlot.startTime)) {
                    const prevTimeOptions = TIME_OPTIONS.filter(option => 
                        timeToMinutes(option.value) < timeToMinutes(selectedValue)
                    );
                    if (prevTimeOptions.length > 0) {
                        newStartTime = prevTimeOptions[prevTimeOptions.length - 1].value;
                    }
                }
            }
            
            return {
                ...prev,
                [day]: {
                    ...prev[day],
                    timeSlots: prev[day].timeSlots.map((slot, index) =>
                        index === slotIndex ? { startTime: newStartTime, endTime: newEndTime } : slot
                    )
                }
            };
        });
    };

    const addTimeSlot = (day: string) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                timeSlots: [...prev[day].timeSlots, { startTime: '09:00', endTime: '17:00' }]
            }
        }));
    };

    const copyTimeSlot = (day: string, slotIndex: number) => {
        const timeSlot = availability[day].timeSlots[slotIndex];
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                timeSlots: [...prev[day].timeSlots, { ...timeSlot }]
            }
        }));
    };

    const deleteTimeSlot = (day: string, slotIndex: number) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                timeSlots: prev[day].timeSlots.filter((_, index) => index !== slotIndex)
            }
        }));
    };

    return (
        <Stack gap={4}>
            {DAYS.map((day) => (
                <Box
                    key={day}
                    p={4}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor={availability[day].enabled ? "gray.100" : "gray.200"}
                >
                    <Stack direction="row" gap={4} align="flex-start">
                        <Stack direction="row" gap={4} align="center">
                            {/* Custom Switch Toggle */}

                            <Switch.Root
                                size="lg"
                                checked={availability[day].enabled}
                                colorPalette="blue"
                                onCheckedChange={() => {
                                    handleDayToggle(day);
                                }}>
                                <Switch.HiddenInput />
                                <Switch.Control />
                            </Switch.Root>

                            <Text
                                fontSize="md"
                                fontWeight="medium"
                                width="90px"
                                color={availability[day].enabled ? "gray.800" : "gray.400"}
                            >
                                {day}
                            </Text>
                        </Stack>

                        {availability[day].enabled && (
                            <Stack gap={2} align="stretch" flex={1}>
                                {availability[day].timeSlots.map((slot, slotIndex) => (
                                    <Stack key={slotIndex} direction="row" gap={3} align="center">
                                        <Select.Root
                                            value={[slot.startTime]}
                                            onValueChange={(details) => handleTimeChange(day, slotIndex, 'startTime', details.value)}
                                            collection={createStartTimeCollection(slot.endTime)}
                                            size="md"
                                            positioning={{ strategy: "absolute" }}
                                        >
                                            <Select.Trigger
                                                textAlign="center"
                                                border="1px solid"
                                                borderColor="gray.300"
                                                borderRadius="md"
                                                cursor="pointer"
                                            >
                                                <Select.ValueText placeholder="Select time" />
                                            </Select.Trigger>
                                            <Portal>
                                                <Select.Positioner>
                                                    <Select.Content
                                                        bg="white"
                                                        border="1px solid"
                                                        borderColor="gray.200"
                                                        borderRadius="md"
                                                        boxShadow="lg"
                                                        width="80px"
                                                        maxH="200px"
                                                        overflowY="auto"
                                                        zIndex={1000}
                                                    >
                                                        {getFilteredStartTimeOptions(slot.endTime).map((time) => (
                                                            <Select.Item key={time.value} item={time}>
                                                                <Select.ItemText>{time.label}</Select.ItemText>
                                                            </Select.Item>
                                                        ))}
                                                    </Select.Content>
                                                </Select.Positioner>
                                            </Portal>
                                        </Select.Root>
                                        <Text color="gray.500" fontSize="lg">–</Text>
                                        <Select.Root
                                            value={[slot.endTime]}
                                            onValueChange={(details) => handleTimeChange(day, slotIndex, 'endTime', details.value)}
                                            collection={createEndTimeCollection(slot.startTime)}
                                            size="md"
                                            positioning={{ strategy: "absolute" }}
                                        >
                                            <Select.Trigger
                                                textAlign="center"
                                                border="1px solid"
                                                borderColor="gray.300"
                                                borderRadius="md"
                                                cursor="pointer"
                                            >
                                                <Select.ValueText placeholder="Select time" />
                                            </Select.Trigger>
                                            <Portal>
                                                <Select.Positioner>
                                                    <Select.Content
                                                        bg="white"
                                                        border="1px solid"
                                                        borderColor="gray.200"
                                                        borderRadius="md"
                                                        boxShadow="lg"
                                                        maxH="200px"
                                                        width="80px"
                                                        overflowY="auto"
                                                        zIndex={1000}
                                                    >
                                                        {getFilteredEndTimeOptions(slot.startTime).map((time) => (
                                                            <Select.Item key={time.value} item={time}>
                                                                <Select.ItemText>{time.label}</Select.ItemText>
                                                            </Select.Item>
                                                        ))}
                                                    </Select.Content>
                                                </Select.Positioner>
                                            </Portal>
                                        </Select.Root>
                                        <IconButton
                                            aria-label="Add time slot"
                                            size="sm"
                                            variant="ghost"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addTimeSlot(day);
                                            }}
                                        >
                                            <FiPlus />
                                        </IconButton>

                                        <IconButton
                                            aria-label="Delete time slot"
                                            size="sm"
                                            disabled={availability[day].timeSlots.length === 1}
                                            variant="ghost"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteTimeSlot(day, slotIndex);
                                            }}
                                        >
                                            <FiX />
                                        </IconButton>
                                        
                                        <IconButton
                                            aria-label="Copy time slot"
                                            size="sm"
                                            variant="ghost"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                copyTimeSlot(day, slotIndex);
                                            }}
                                        >
                                            <FiCopy />
                                        </IconButton>
                                    </Stack>
                                ))}
                            </Stack>
                        )}
                    </Stack>
                </Box>
            ))}

            <Button
                size="lg"
                bg="gray.800"
                color="white"
                mt={6}
                py={6}
                fontSize="lg"
                fontWeight="medium"
                _hover={{ bg: "gray.700" }}
            >
                Next Step →
            </Button>
        </Stack>
    );
}   