import { Box, createListCollection, defineStyle, Field, Input, Text } from "@chakra-ui/react";
import { Portal } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { useState, useMemo, memo, useCallback, useEffect } from "react";

// Move all utility functions and static data outside the component
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
    } catch {
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

// Move styles outside component
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

// Get all supported timezones (with fallback for older browsers) - cache this globally
let cachedTimezones: string[] | null = null;
const getAllTimezones = (): string[] => {
    if (cachedTimezones) return cachedTimezones;
    
    try {
        // Try to use the modern API
        if ('supportedValuesOf' in Intl) {
            cachedTimezones = (Intl as any).supportedValuesOf('timeZone');
            return cachedTimezones!;
        }
    } catch {
        console.warn('Intl.supportedValuesOf not supported, using fallback timezone list');
    }

    // Fallback list of common timezones
    cachedTimezones = [
        'America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York',
        'America/Halifax', 'Pacific/Honolulu', 'America/Anchorage', 'UTC',
        'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo',
        'Australia/Sydney', 'Asia/Kolkata', 'Asia/Dubai', 'Asia/Shanghai',
        'Asia/Singapore', 'Asia/Seoul', 'Africa/Cairo', 'Africa/Johannesburg',
        'America/Sao_Paulo', 'America/Mexico_City', 'America/Toronto',
        'Europe/Rome', 'Europe/Madrid', 'Europe/Amsterdam', 'Europe/Stockholm',
        'Asia/Bangkok', 'Asia/Hong_Kong', 'Pacific/Auckland', 'America/Lima'
    ];
    return cachedTimezones;
};

interface TimezoneItem {
    label: string;
    value: string;
    searchText: string;
    time: string;
}

interface TimezoneInputProps {
    value?: string;
    onChange?: (timezone: string) => void;
}

// Create timezone collection globally and cache it
let cachedTimezoneCollection: any = null;
const createTimezoneCollection = () => {
    if (cachedTimezoneCollection) return cachedTimezoneCollection;
    
    const allTimezones = getAllTimezones();
    const locale = getBrowserLocale();
    
    const timezoneItems: TimezoneItem[] = allTimezones.map((tz: string) => ({
        label: `${tz.replace(/_/g, ' ')} (${getTimezoneDisplayName(tz)})`,
        value: tz,
        searchText: `${tz} ${getTimezoneDisplayName(tz)}`.toLowerCase(),
        time: new Date(new Date().toLocaleString(locale, { timeZone: tz })).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
    }));

    cachedTimezoneCollection = createListCollection({
        items: timezoneItems.sort((a: TimezoneItem, b: TimezoneItem) => a.label.localeCompare(b.label))
    });
    
    return cachedTimezoneCollection;
};

// Cache current timezone and locale
const CURRENT_TIMEZONE = getCurrentTimezone();
const BROWSER_LOCALE = getBrowserLocale();

function TimezoneInput({ value, onChange }: TimezoneInputProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentTime, setCurrentTime] = useState(() => getCurrentTime());
    
    useEffect(() => {
        const updateTime = () => {
            const newTime = getCurrentTime();
            setCurrentTime(newTime);
        };
        updateTime();
        const interval = setInterval(updateTime, 1_000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    // Get cached timezone collection
    const timezones = useMemo(() => createTimezoneCollection(), []);

    // Filter timezones based on search query - memoized for performance
    const filteredTimezones = useMemo(() => {
        if (!searchQuery.trim()) return timezones;

        const query = searchQuery.toLowerCase();
        const filteredItems = timezones.items.filter((item: TimezoneItem) =>
            item.searchText.includes(query)
        );

        return createListCollection({ items: filteredItems });
    }, [timezones, searchQuery]);

    // Memoize selected timezone calculation
    const selectedTimezone = useMemo(() => {
        return value || (timezones.items.find((tz: TimezoneItem) => tz.value === CURRENT_TIMEZONE)?.value || CURRENT_TIMEZONE);
    }, [value, timezones.items]);

    // Memoize change handlers
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleValueChange = useCallback((details: { value: string[] }) => {
        onChange?.(details.value[0]);
    }, [onChange]);

    // Memoize current timezone display
    const currentTimezoneDisplay = useMemo(() => 
        `${CURRENT_TIMEZONE} ${getTimezoneDisplayName(CURRENT_TIMEZONE, BROWSER_LOCALE)}`, 
        []
    );

    return (
        <Field.Root>
            <Field.Label css={floatingStyles}>Timezone</Field.Label>
            <Select.Root
                collection={filteredTimezones}
                value={[selectedTimezone]}
                onValueChange={handleValueChange}
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
                                    onChange={handleSearchChange}
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
                Current time: {currentTime} · ({currentTimezoneDisplay})
            </Text>
        </Field.Root>
    )
}

export default memo(TimezoneInput);