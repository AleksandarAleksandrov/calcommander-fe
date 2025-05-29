import { Button, Stack, Text, Box, Input, Field, defineStyle, Select, Portal, createListCollection } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";

const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
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

const animeMovies = createListCollection({
    items: [
        { label: "Spirited Away", value: "spirited_away" },
        { label: "My Neighbor Totoro", value: "my_neighbor_totoro" },
        { label: "Akira", value: "akira" },
        { label: "Princess Mononoke", value: "princess_mononoke" },
        { label: "Grave of the Fireflies", value: "grave_of_the_fireflies" },
        { label: "Howl's Moving Castle", value: "howls_moving_castle" },
        { label: "Ghost in the Shell", value: "ghost_in_the_shell" },
        { label: "Naruto", value: "naruto" },
        { label: "Hunter x Hunter", value: "hunter_x_hunter" },
        { label: "The Wind Rises", value: "the_wind_rises" },
        { label: "Kiki's Delivery Service", value: "kikis_delivery_service" },
        { label: "Perfect Blue", value: "perfect_blue" },
        {
            label: "The Girl Who Leapt Through Time",
            value: "the_girl_who_leapt_through_time",
        },
        { label: "Weathering with You", value: "weathering_with_you" },
        { label: "Ponyo", value: "ponyo" },
        { label: "5 Centimeters per Second", value: "5_centimeters_per_second" },
        { label: "A Silent Voice", value: "a_silent_voice" },
        { label: "Paprika", value: "paprika" },
        { label: "Wolf Children", value: "wolf_children" },
        { label: "Redline", value: "redline" },
        {
            label: "The Tale of the Princess Kaguya",
            value: "the_tale_of_the_princess_kaguya",
        },
    ],
})

export default function UserInfoStep() {
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
            collection={animeMovies}
            defaultValue={["spirited_away"]}
            className='peer'
            size="lg"
            css={{ "--focus-color": "blue" }}
            borderRadius="md"
            borderColor="gray.300"
        >
            <Select.HiddenSelect />
            <Select.Label>Select fav. anime</Select.Label>
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Select anime" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.ClearTrigger />
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {animeMovies.items.map((anime) => (
                            <Select.Item item={anime} key={anime.value}>
                                {anime.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
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
