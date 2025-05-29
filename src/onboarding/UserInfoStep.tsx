import { Button, Stack, Text, Box, Input, Field, defineStyle, Select, Portal, createListCollection } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";

const getBrowserLocale = () => {
    console.log(navigator.languages);
    return navigator.language || 
           navigator.languages?.[0] || 
           'en-US';
};

const getCurrentTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const getTimezoneDisplayName = (timezone: string, locale: string = 'en-US') => {
    try {
        const formatter = new Intl.DateTimeFormat(locale, {
            timeZoneName: 'long',
            timeZone: timezone
        });
        const parts = formatter.formatToParts(new Date());
        const timeZoneName = parts.find(part => part.type === 'timeZoneName')?.value;
        return timeZoneName || timezone;
    } catch (error) {
        return timezone;
    }
};

const uses12HourFormat = (locale: string) => {
    // Locales that typically use 12-hour format
    const twelveHourLocales = ['en-US', 'en-CA', 'en-AU', 'en-NZ', 'en-PH'];
    return twelveHourLocales.some(l => locale.startsWith(l.split('-')[0]) && 
                                    (locale === l || locale.startsWith('en')));
};

const getCurrentTime = () => {
    const now = new Date();
    const locale = getBrowserLocale();
    const hour12 = uses12HourFormat(locale);
    
    return now.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: hour12,
    });
};

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


console.log(Intl.supportedValuesOf('timeZone'));

const timezones = createListCollection({
    items: [
        // Major timezones - you can expand this list as needed
        { label: "Pacific Time (PT)", value: "America/Los_Angeles" },
        { label: "Mountain Time (MT)", value: "America/Denver" },
        { label: "Central Time (CT)", value: "America/Chicago" },
        { label: "Eastern Time (ET)", value: "America/New_York" },
        { label: "Atlantic Time", value: "America/Halifax" },
        { label: "Hawaii Time", value: "Pacific/Honolulu" },
        { label: "Alaska Time", value: "America/Anchorage" },
        { label: "UTC", value: "UTC" },
        { label: "London (GMT/BST)", value: "Europe/London" },
        { label: "Paris (CET/CEST)", value: "Europe/Paris" },
        { label: "Berlin (CET/CEST)", value: "Europe/Berlin" },
        { label: "Tokyo (JST)", value: "Asia/Tokyo" },
        { label: "Sydney (AEST/AEDT)", value: "Australia/Sydney" },
        { label: "Mumbai (IST)", value: "Asia/Kolkata" },
        { label: "Dubai (GST)", value: "Asia/Dubai" },
        { label: "Shanghai (CST)", value: "Asia/Shanghai" },
        { label: "Singapore (SGT)", value: "Asia/Singapore" },
        { label: "Seoul (KST)", value: "Asia/Seoul" },
    ],
});

export default function UserInfoStep() {
    const currentTimezone = getCurrentTimezone();
    const locale = getBrowserLocale();
    
    // Check if current timezone exists in our list, otherwise use it as default
    const defaultTimezone = timezones.items.find(tz => tz.value === currentTimezone)?.value || currentTimezone;

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
                    cal.com/
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

        {/* Timezone Field */}
        <Select.Root
            collection={timezones}
            defaultValue={[defaultTimezone]}
            className='peer'
            size="lg"
            css={{ "--focus-color": "blue" }}
            borderRadius="md"
            borderColor="gray.300"
        >
            <Select.HiddenSelect />
            <Select.Label>Timezone</Select.Label>
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Select timezone" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.ClearTrigger />
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {timezones.items.map((timezone) => (
                            <Select.Item item={timezone} key={timezone.value}>
                                {timezone.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        <Text fontSize="xs" color="gray.500" mt={1}>
        Detected timezone: {getTimezoneDisplayName(currentTimezone, locale)}
        </Text>
        <Text fontSize="xs" color="gray.500" mt={1}>
            Current time {getCurrentTime()}
        </Text>
        </Select.Root>


        {/* Next Step Button */}
        <Button
            type="submit"
            size="xl"
            w="100%"
            borderRadius="md"
            colorPalette="blue"
        >
            Next Step
            <FiArrowRight />
        </Button>
    </Stack>
}
