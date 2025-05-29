import { Box, Text, Stack, Input, Button, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FiPlus, FiCopy } from "react-icons/fi";

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DayAvailability {
  enabled: boolean;
  timeSlots: TimeSlot[];
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function AvailabilityStep() {
    const [availability, setAvailability] = useState<Record<string, DayAvailability>>({
        Monday: { enabled: true, timeSlots: [{ startTime: '9:00am', endTime: '5:00pm' }] },
        Tuesday: { enabled: true, timeSlots: [{ startTime: '9:00am', endTime: '5:00pm' }] },
        Wednesday: { enabled: true, timeSlots: [{ startTime: '9:00am', endTime: '5:00pm' }] },
        Thursday: { enabled: true, timeSlots: [{ startTime: '9:00am', endTime: '5:00pm' }] },
        Friday: { enabled: true, timeSlots: [{ startTime: '9:00am', endTime: '5:00pm' }] },
        Saturday: { enabled: false, timeSlots: [] },
        Sunday: { enabled: false, timeSlots: [] }
    });

    const [selectedDay, setSelectedDay] = useState<string>('Friday');

    const handleDayToggle = (day: string) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                enabled: !prev[day].enabled,
                timeSlots: !prev[day].enabled ? [{ startTime: '9:00am', endTime: '5:00pm' }] : []
            }
        }));
    };

    const handleTimeChange = (day: string, slotIndex: number, field: 'startTime' | 'endTime', value: string) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                timeSlots: prev[day].timeSlots.map((slot, index) =>
                    index === slotIndex ? { ...slot, [field]: value } : slot
                )
            }
        }));
    };

    const addTimeSlot = (day: string) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                timeSlots: [...prev[day].timeSlots, { startTime: '9:00am', endTime: '5:00pm' }]
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

    return (
            <Stack gap={4}>
                {DAYS.map((day) => (
                    <Box
                        key={day}
                        p={4}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor={availability[day].enabled ? "gray.100" : "gray.200"}
                        cursor="pointer"
                    >
                        <Stack direction="row" gap={4} align="flex-start">
                            <Stack direction="row" gap={4} align="center">
                                {/* Custom Switch Toggle */}
                                <Box
                                    as="button"
                                    w="12"
                                    h="6"
                                    bg={availability[day].enabled ? "blue.500" : "gray.300"}
                                    borderRadius="full"
                                    position="relative"
                                    transition="all 0.2s"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDayToggle(day);
                                    }}
                                    _focus={{ outline: "2px solid", outlineColor: "blue.300" }}
                                >
                                    <Box
                                        w="5"
                                        h="5"
                                        bg="white"
                                        borderRadius="full"
                                        position="absolute"
                                        top="0.5"
                                        left={availability[day].enabled ? "6" : "0.5"}
                                        transition="all 0.2s"
                                        boxShadow="sm"
                                    />
                                </Box>
                                
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
                                            <Input
                                                value={slot.startTime}
                                                onChange={(e) => handleTimeChange(day, slotIndex, 'startTime', e.target.value)}
                                                size="md"
                                                textAlign="center"
                                                border="1px solid"
                                                borderColor="gray.300"
                                                borderRadius="md"
                                            />
                                            <Text color="gray.500" fontSize="lg">–</Text>
                                            <Input
                                                value={slot.endTime}
                                                onChange={(e) => handleTimeChange(day, slotIndex, 'endTime', e.target.value)}
                                                size="md"
                                                textAlign="center"
                                                border="1px solid"
                                                borderColor="gray.300"
                                                borderRadius="md"
                                            />
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