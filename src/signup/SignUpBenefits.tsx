import { Box, Heading, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { useColorModeValue } from "@/components/ui/color-mode";


export default function SignUpBenefits() {

    const textColor = useColorModeValue('gray.600', 'gray.300');
    const headingColor = useColorModeValue('gray.800', 'white');

    return (
        <Box
            flex="1"
            bg={useColorModeValue('gray.50', 'gray.700')}
            p={12}
            borderLeft="1px solid"
            borderLeftColor={useColorModeValue('gray.200', 'gray.600')}
        >
            <Stack gap={8} align="flex-start" h="full">
                <Stack gap={4} align="flex-start">
                    <Heading
                        size="2xl"
                        color={headingColor}
                        fontWeight="bold"
                    >
                        Create your <Text as="span" fontWeight="bold" color="blue.500">free</Text> account!
                    </Heading>

                    <Text color={textColor} fontSize="md" lineHeight="1.6">
                        Start scheduling smarter with {import.meta.env.VITE_APP_NAME}.
                        Set up your free account and streamline how you connect with clients, teammates, and prospects.
                    </Text>
                </Stack>

                <Stack gap={6} align="flex-start">
                    <Heading
                        size="lg"
                        color={headingColor}
                        fontWeight="semibold"
                    >
                        With {import.meta.env.VITE_APP_NAME}, you can:
                    </Heading>

                    <Stack gap={4} align="flex-start">
                        <HStack gap={3} align="center">
                            <Icon
                                as={FaCheck}
                                color="green.500"
                                boxSize={5}
                                mt={0.5}
                            />
                            <Text color={textColor} fontSize="md">
                                Let others book time with you based on your availability
                            </Text>
                        </HStack>

                        <HStack gap={3} align="center">
                            <Icon
                                as={FaCheck}
                                color="green.500"
                                boxSize={5}
                                mt={0.5}
                            />
                            <Text color={textColor} fontSize="md">
                                Send automatic email reminders and confirmations
                            </Text>
                        </HStack>

                        <HStack gap={3} align="center">
                            <Icon
                                as={FaCheck}
                                color="green.500"
                                boxSize={5}
                                mt={0.5}
                            />
                            <Text color={textColor} fontSize="md">
                                Customize event types (e.g., video calls, phone meetings)
                            </Text>
                        </HStack>

                        <HStack gap={3} align="center">
                            <Icon
                                as={FaCheck}
                                color="green.500"
                                boxSize={5}
                                mt={0.5}
                            />
                            <Text color={textColor} fontSize="md">
                                Share booking links via email, website, or social media
                            </Text>
                        </HStack>

                        <Heading
                            size="lg"
                            fontWeight="medium"
                        >
                            Take the hassle out of scheduling—try it free today!
                        </Heading>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}