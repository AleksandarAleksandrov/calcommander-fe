import { Box, createListCollection, defineStyle, Field, Input, Text } from "@chakra-ui/react";
import { Portal } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { useMemo } from "react";

const getBrowserLocale = () => {
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
            timeZoneName: 'shortOffset',
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

// Get all supported timezones (with fallback for older browsers)
const getAllTimezones = (): string[] => {
    try {
        // Try to use the modern API
        if ('supportedValuesOf' in Intl) {
            return (Intl as any).supportedValuesOf('timeZone');
        }
    } catch (error) {
        console.warn('Intl.supportedValuesOf not supported, using fallback timezone list');
    }

    // Fallback list of common timezones
    return [
        'America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York',
        'America/Halifax', 'Pacific/Honolulu', 'America/Anchorage', 'UTC',
        'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo',
        'Australia/Sydney', 'Asia/Kolkata', 'Asia/Dubai', 'Asia/Shanghai',
        'Asia/Singapore', 'Asia/Seoul', 'Africa/Cairo', 'Africa/Johannesburg',
        'America/Sao_Paulo', 'America/Mexico_City', 'America/Toronto',
        'Europe/Rome', 'Europe/Madrid', 'Europe/Amsterdam', 'Europe/Stockholm',
        'Asia/Bangkok', 'Asia/Hong_Kong', 'Pacific/Auckland', 'America/Lima'
    ];
};

interface TimezoneItem {
    label: string;
    value: string;
    searchText: string;
    time: string;
}

const createTimezoneCollection = () => {
    const allTimezones = getAllTimezones();
    const timezoneItems: TimezoneItem[] = allTimezones.map((tz: string) => ({
        label: `${tz.replace(/_/g, ' ')} (${getTimezoneDisplayName(tz)})`,
        value: tz,
        searchText: `${tz} ${getTimezoneDisplayName(tz)}`.toLowerCase(),
        time: new Date(new Date().toLocaleString(getBrowserLocale(), { timeZone: tz })).toLocaleTimeString(getBrowserLocale(), { hour: '2-digit', minute: '2-digit' })
    }));

    return createListCollection({
        items: timezoneItems.sort((a: TimezoneItem, b: TimezoneItem) => a.label.localeCompare(b.label))
    });
};

export default function TimezoneInput() {
    const currentTimezone = getCurrentTimezone();
    const locale = getBrowserLocale();
    const [searchQuery, setSearchQuery] = useState("");

    const timezones = useMemo(() => createTimezoneCollection(), []);

    // Filter timezones based on search query
    const filteredTimezones = useMemo(() => {
        if (!searchQuery.trim()) return timezones;

        const query = searchQuery.toLowerCase();
        const filteredItems = timezones.items.filter((item: TimezoneItem) =>
            item.searchText.includes(query)
        );

        return createListCollection({ items: filteredItems });
    }, [timezones, searchQuery]);

    // Check if current timezone exists in our list, otherwise use it as default
    const defaultTimezone = timezones.items.find((tz: TimezoneItem) => tz.value === currentTimezone)?.value || currentTimezone;
    

    return (
        <Field.Root>
            <Field.Label css={floatingStyles}>Timezone</Field.Label>
            <Select.Root
                collection={filteredTimezones}
                defaultValue={[defaultTimezone]}
                className='peer'
                size="lg"
                css={{ "--focus-color": "blue" }}
                borderRadius="md"
                borderLeftRadius="none"
                borderLeft="none"
                borderColor="gray.300"
            >
                <Select.HiddenSelect />
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
                            <Box p={2} borderBottom="1px solid" borderColor="gray.200">
                                <Input
                                    placeholder="Search timezones"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className='peer'
                                    size="xl"
                                    css={{ "--focus-color": "blue" }}
                                    borderRadius="md"
                                    borderColor="gray.300"
                                />
                            </Box>
                            <Box maxH="200px" overflowY="auto">
                                {filteredTimezones.items.length > 0 ? (
                                    filteredTimezones.items.map((timezone: TimezoneItem) => (
                                        <Select.Item item={timezone} key={timezone.value}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" w="100%">
                                                <Text>{timezone.label}</Text>
                                                <Text fontSize="sm" color="gray.500">{timezone.time}</Text>
                                            </Box>
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))
                                ) : (
                                    <Box p={3} textAlign="center" color="gray.500" fontSize="sm">
                                        No timezones found
                                    </Box>
                                )}
                            </Box>
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
            <Text fontSize="xs" color="gray.500" mt={1}>
                Current time: {getCurrentTime()} · ({getCurrentTimezone()} {getTimezoneDisplayName(getCurrentTimezone(), locale)})
            </Text>
        </Field.Root>
    )
}