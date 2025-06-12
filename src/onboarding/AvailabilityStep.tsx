import { setAvailabilityAndStep, setAvailability as setStoreAvailability, setOnboardingData } from "@/store/onboardingSlice";
import { OnboardingStep } from "@/store/onboardingSlice";
import { Box, Text, Stack, Button, IconButton, Switch, Select, createListCollection, Portal, Checkbox } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FiPlus, FiCopy, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";

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

// Helper function to convert time string to minutes for comparison
const timeToMinutes = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
};

// Helper function to create filtered time options for start time (before end time and after previous slot)
const createStartTimeCollection = (endTime: string, timeSlots: TimeSlot[], currentSlotIndex: number) => {
    const endTimeMinutes = timeToMinutes(endTime);
    let minStartTimeMinutes = 0; // Default to start of day

    // If this is not the first slot, start time must be after the previous slot's end time
    if (currentSlotIndex > 0) {
        const previousSlot = timeSlots[currentSlotIndex - 1];
        minStartTimeMinutes = timeToMinutes(previousSlot.endTime);
    }

    const filteredOptions = TIME_OPTIONS.filter(option => {
        const optionMinutes = timeToMinutes(option.value);
        // For the first slot (currentSlotIndex === 0), allow 00:00 by using >= instead of >
        return currentSlotIndex === 0 
            ? optionMinutes >= minStartTimeMinutes && optionMinutes < endTimeMinutes
            : optionMinutes > minStartTimeMinutes && optionMinutes < endTimeMinutes;
    });
    return createListCollection({ items: filteredOptions });
};

// Helper function to create filtered time options for end time (after start time)
const createEndTimeCollection = (startTime: string, timeSlots: TimeSlot[], currentSlotIndex: number) => {
    const startTimeMinutes = timeToMinutes(startTime);
    let maxEndTimeMinutes = 24 * 60; // Default to end of day (24:00 in minutes)

    // If there is a next slot, end time must be before the next slot's start time
    if (currentSlotIndex < timeSlots.length - 1) {
        const nextSlot = timeSlots[currentSlotIndex + 1];
        maxEndTimeMinutes = timeToMinutes(nextSlot.startTime);
    }

    const filteredOptions = TIME_OPTIONS.filter(option => {
        const optionMinutes = timeToMinutes(option.value);
        return optionMinutes > startTimeMinutes && optionMinutes < maxEndTimeMinutes;
    });
    return createListCollection({ items: filteredOptions });
};

// Helper function to get filtered start time options for rendering
const getFilteredStartTimeOptions = (endTime: string, timeSlots: TimeSlot[], currentSlotIndex: number) => {
    const endTimeMinutes = timeToMinutes(endTime);
    let minStartTimeMinutes = 0; // Default to start of day

    // If this is not the first slot, start time must be after the previous slot's end time
    if (currentSlotIndex > 0) {
        const previousSlot = timeSlots[currentSlotIndex - 1];
        minStartTimeMinutes = timeToMinutes(previousSlot.endTime);
    }

    return TIME_OPTIONS.filter(option => {
        const optionMinutes = timeToMinutes(option.value);
        // For the first slot (currentSlotIndex === 0), allow 00:00 by using >= instead of >
        return currentSlotIndex === 0 
            ? optionMinutes >= minStartTimeMinutes && optionMinutes < endTimeMinutes
            : optionMinutes > minStartTimeMinutes && optionMinutes < endTimeMinutes;
    });
};

// Helper function to get filtered end time options for rendering
const getFilteredEndTimeOptions = (startTime: string, timeSlots: TimeSlot[], currentSlotIndex: number) => {
    const startTimeMinutes = timeToMinutes(startTime);
    let maxEndTimeMinutes = 24 * 60; // Default to end of day (24:00 in minutes)

    // If there is a next slot, end time must be before the next slot's start time
    if (currentSlotIndex < timeSlots.length - 1) {
        const nextSlot = timeSlots[currentSlotIndex + 1];
        maxEndTimeMinutes = timeToMinutes(nextSlot.startTime);
    }

    return TIME_OPTIONS.filter(option => {
        const optionMinutes = timeToMinutes(option.value);
        return optionMinutes > startTimeMinutes && optionMinutes < maxEndTimeMinutes;
    });
};

export default function AvailabilityStep() {
    const dispatch = useDispatch();
    const storeAvailability = useSelector((state: RootState) => state.onboarding.availability);
    const userData = useSelector((state: RootState) => state.onboarding.userData);
    const calendars = useSelector((state: RootState) => state.onboarding.calendars);

    // Initialize with default availability to prevent undefined errors
    const getDefaultAvailability = (): Record<string, DayAvailability> => ({
        Monday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
        Tuesday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
        Wednesday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
        Thursday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
        Friday: { enabled: true, timeSlots: [{ startTime: '09:00', endTime: '17:00' }] },
        Saturday: { enabled: false, timeSlots: [] },
        Sunday: { enabled: false, timeSlots: [] }
    });

    const [availability, setAvailability] = useState<Record<string, DayAvailability>>(storeAvailability || getDefaultAvailability());

    const [copyDialog, setCopyDialog] = useState<{ isOpen: boolean; sourceDay: string; position?: { top: number; left: number } }>({
        isOpen: false,
        sourceDay: ''
    });
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

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
            const timeSlots = prev[day].timeSlots;
            let newStartTime = currentSlot.startTime;
            let newEndTime = currentSlot.endTime;

            if (field === 'startTime') {
                newStartTime = selectedValue;
                // If new start time is >= current end time, set end time to next available slot
                if (timeToMinutes(selectedValue) >= timeToMinutes(currentSlot.endTime)) {
                    // Get valid end time options considering next slots
                    const validEndOptions = getFilteredEndTimeOptions(selectedValue, timeSlots, slotIndex);
                    if (validEndOptions.length > 0) {
                        newEndTime = validEndOptions[0].value;
                    }
                }
            } else {
                newEndTime = selectedValue;
                // If new end time is <= current start time, set start time to previous available slot
                if (timeToMinutes(selectedValue) <= timeToMinutes(currentSlot.startTime)) {
                    // Get valid start time options considering previous slots
                    const validStartOptions = getFilteredStartTimeOptions(selectedValue, timeSlots, slotIndex);
                    if (validStartOptions.length > 0) {
                        newStartTime = validStartOptions[validStartOptions.length - 1].value;
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
        setAvailability(prev => {
            const existingSlots = prev[day].timeSlots;
            let defaultStartTime = '09:00';
            let defaultEndTime = '17:00';
            
            // If there are existing slots, set start time after the last slot's end time
            if (existingSlots.length > 0) {
                const lastSlot = existingSlots[existingSlots.length - 1];
                const lastEndTimeMinutes = timeToMinutes(lastSlot.endTime);
                
                // Find the next available time slot after the last end time
                const availableStartTimes = TIME_OPTIONS.filter(option => 
                    timeToMinutes(option.value) > lastEndTimeMinutes
                );
                
                if (availableStartTimes.length > 0) {
                    defaultStartTime = availableStartTimes[0].value;
                    
                    // Calculate 1 hour after start time
                    const startTimeMinutes = timeToMinutes(defaultStartTime);
                    const oneHourLaterMinutes = startTimeMinutes + 60;
                    
                    // Find all available end times after start time
                    const availableEndTimes = TIME_OPTIONS.filter(option => 
                        timeToMinutes(option.value) > startTimeMinutes
                    );
                    
                    if (availableEndTimes.length > 0) {
                        // Try to find a time that's 1 hour later
                        const oneHourLaterOption = availableEndTimes.find(option =>
                            timeToMinutes(option.value) >= oneHourLaterMinutes
                        );
                        
                        if (oneHourLaterOption) {
                            // Use the first time that's at least 1 hour later
                            defaultEndTime = oneHourLaterOption.value;
                        } else {
                            // Use the maximum available time if less than 1 hour left
                            defaultEndTime = availableEndTimes[availableEndTimes.length - 1].value;
                        }
                    } else {
                        // If no end times available, can't add a new slot
                        return prev;
                    }
                } else {
                    // If no more start times available, can't add a new slot
                    return prev;
                }
            } else {
                // For the first slot, still try to set end time to 1 hour after start
                const startTimeMinutes = timeToMinutes(defaultStartTime);
                const oneHourLaterMinutes = startTimeMinutes + 60;
                
                const oneHourLaterOption = TIME_OPTIONS.find(option =>
                    timeToMinutes(option.value) >= oneHourLaterMinutes
                );
                
                if (oneHourLaterOption) {
                    defaultEndTime = oneHourLaterOption.value;
                } else {
                    // Fallback to last available time
                    const availableEndTimes = TIME_OPTIONS.filter(option => 
                        timeToMinutes(option.value) > startTimeMinutes
                    );
                    if (availableEndTimes.length > 0) {
                        defaultEndTime = availableEndTimes[availableEndTimes.length - 1].value;
                    }
                }
            }
            
            return {
                ...prev,
                [day]: {
                    ...prev[day],
                    timeSlots: [...prev[day].timeSlots, { startTime: defaultStartTime, endTime: defaultEndTime }]
                }
            };
        });
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

    const openCopyDialog = (sourceDay: string, event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        const dropdownWidth = 250; // minW of dropdown
        const dropdownHeight = 350; // estimated height with new buttons
        
        // Calculate position relative to viewport + scroll offset
        let top = rect.bottom + scrollTop + 8;
        let left = rect.left + scrollLeft;

        // Ensure dropdown doesn't go off screen horizontally
        if (left + dropdownWidth > window.innerWidth + scrollLeft) {
            left = rect.right + scrollLeft - dropdownWidth; // Align to right edge of button
        }

        // Ensure dropdown doesn't go off screen vertically
        if (rect.bottom + dropdownHeight > window.innerHeight) {
            top = rect.top + scrollTop - dropdownHeight - 8; // Position above if no space below
        }

        // Ensure minimum margins from screen edges
        left = Math.max(16, Math.min(left, window.innerWidth + scrollLeft - dropdownWidth - 16));
        top = Math.max(16, top);

        setCopyDialog({
            isOpen: true,
            sourceDay,
            position: { top, left }
        });
        setSelectedDays([]);
    };

    const closeCopyDialog = () => {
        setCopyDialog({ isOpen: false, sourceDay: '', position: undefined });
        setSelectedDays([]);
    };

    const handleDaySelection = (day: string, checked: boolean) => {
        if (checked) {
            setSelectedDays(prev => {
                const newSelectedDays = [...prev, day];
                return newSelectedDays;
            });
        } else {
            setSelectedDays(prev => {
                const newSelectedDays = prev.filter(d => d !== day);
                return newSelectedDays;
            });
        }
    };

    const handleSelectWorkdays = () => {
        // Select Monday through Friday, excluding the source day
        const workdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const availableWorkdays = workdays.filter(day => day !== copyDialog.sourceDay);
        setSelectedDays(availableWorkdays);
    };

    const handleSelectAllWeek = () => {
        // Select all days except the source day
        const availableDays = DAYS.filter(day => day !== copyDialog.sourceDay);
        setSelectedDays(availableDays);
    };

    const executeCopy = () => {
        const sourceSlots = availability[copyDialog.sourceDay].timeSlots;
        setAvailability(prev => {
            const updated = { ...prev };
            selectedDays.forEach(day => {
                updated[day] = {
                    enabled: true,
                    timeSlots: [...sourceSlots]
                };
            });
            return updated;
        });
        closeCopyDialog();
    };

    return (
        <Stack gap={4}>
            {DAYS.map((day) => {
                // Safety check to prevent undefined errors
                const dayAvailability = availability[day] || { enabled: false, timeSlots: [] };
                
                return (
                    <Box
                        key={day}
                        p={4}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor={dayAvailability.enabled ? "gray.100" : "gray.200"}
                    >
                                            <Stack direction="row" gap={4} align="flex-start">
                            <Stack direction="row" gap={4} align="center">
                                {/* Custom Switch Toggle */}

                                <Switch.Root
                                    size="lg"
                                    checked={dayAvailability.enabled}
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
                                    color={dayAvailability.enabled ? "gray.800" : "gray.400"}
                                >
                                    {day}
                                </Text>
                            </Stack>

                            {dayAvailability.enabled && (
                                <Stack gap={2} align="stretch" flex={1}>
                                    {dayAvailability.timeSlots.map((slot, slotIndex) => (
                                    <Stack key={slotIndex} direction="row" gap={3} align="center">
                                        <Select.Root
                                            value={[slot.startTime]}
                                            onValueChange={(details) => handleTimeChange(day, slotIndex, 'startTime', details.value)}
                                            collection={createStartTimeCollection(slot.endTime, dayAvailability.timeSlots, slotIndex)}
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
                                                        {getFilteredStartTimeOptions(slot.endTime, dayAvailability.timeSlots, slotIndex).map((time) => (
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
                                            collection={createEndTimeCollection(slot.startTime, dayAvailability.timeSlots, slotIndex)}
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
                                                        {getFilteredEndTimeOptions(slot.startTime, dayAvailability.timeSlots, slotIndex).map((time) => (
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
                                            visibility={slotIndex === dayAvailability.timeSlots.length - 1 ? "visible" : "hidden"}
                                            disabled={(() => {
                                                const lastSlot = dayAvailability.timeSlots[dayAvailability.timeSlots.length - 1];
                                                const availableAfterLastSlot = TIME_OPTIONS.filter(option =>
                                                    timeToMinutes(option.value) > timeToMinutes(lastSlot.endTime)
                                                );
                                                return availableAfterLastSlot.length < 2; // Need at least 2 slots (start + end)
                                            })()}
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
                                            disabled={dayAvailability.timeSlots.length === 1}
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
                                            visibility={slotIndex === 0 ? "visible" : "hidden"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openCopyDialog(day, e);
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
                );
            })}

            <Stack direction="row" gap={4} w="100%">
                <Button
                    size="xl"
                    variant="outline"
                    borderRadius="md"
                    flex="0 0 auto"
                    minW="120px"
                    onClick={() => dispatch(setAvailabilityAndStep({ availability, step: OnboardingStep.CALENDAR_SETTINGS }))}
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    size="xl"
                    borderRadius="md"
                    colorPalette="blue"
                    flex="1"
                    onClick={() => {
                        const onboardingPayload = {
                            userData,
                            calendars,
                            availability
                        };
                        dispatch(setOnboardingData(onboardingPayload) as any);
                    }}
                >
                    Finish
                </Button>
            </Stack>

            {/* Copy Dropdown */}
            {copyDialog.isOpen && (
                <Portal>
                    <Box
                        position="fixed"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        zIndex={1400}
                        onClick={closeCopyDialog}
                    />
                    <Box
                        position="absolute"
                        top={`${copyDialog.position?.top}px`}
                        left={`${copyDialog.position?.left}px`}
                        bg="white"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.200"
                        p={4}
                        boxShadow="lg"
                        minW="250px"
                        zIndex={1500}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Stack direction="row" align="center" justify="space-between" mb={3}>
                            <Text fontSize="sm" fontWeight="semibold">
                                Copy availability to...
                            </Text>
                        </Stack>
                        
                        {/* Workdays and All Week buttons */}
                        <Stack direction="row" gap={2} mb={3}>
                            <Button
                                size="sm"
                                variant="outline"
                                borderRadius="md"
                                flex="1"
                                onClick={handleSelectWorkdays}
                            >
                                Workdays
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                borderRadius="md"
                                flex="1"
                                onClick={handleSelectAllWeek}
                            >
                                All Week
                            </Button>
                        </Stack>
                        
                        {/* Separator line */}
                        <Box 
                            height="1px" 
                            bg="gray.200" 
                            mb={3}
                        />
                        
                        <Stack gap={2} mb={4}>
                            {DAYS.map((day) => (
                                <Checkbox.Root
                                    colorPalette="blue"
                                    key={day}
                                    disabled={day === copyDialog.sourceDay}
                                    checked={selectedDays.includes(day)}
                                    onCheckedChange={(details) => handleDaySelection(day, !!details.checked)}
                                    size="sm"
                                >
                                    <Checkbox.HiddenInput color="blue" />
                                    <Checkbox.Control />
                                    <Checkbox.Label
                                        fontSize="sm"
                                        color={day === copyDialog.sourceDay ? "gray.400" : "gray.800"}
                                    >
                                        {day}
                                    </Checkbox.Label>
                                </Checkbox.Root>
                            ))}
                        </Stack>
                        <Stack direction="row" gap={2} justify="space-between">
                            <Button
                                size="sm"
                                colorPalette="blue"
                                borderRadius="md"
                                disabled={selectedDays.length === 0}
                                onClick={executeCopy}
                            >
                                Copy
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                borderRadius="md"
                                onClick={closeCopyDialog}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </Box>
                </Portal>
            )}
        </Stack>
    );
}   