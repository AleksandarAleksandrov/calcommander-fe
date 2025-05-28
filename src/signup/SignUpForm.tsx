import { useColorModeValue } from "@/components/ui/color-mode";
import SignInWithGoogle from "@/signin/SignInWithGoogle";
import { Button, defineStyle, Heading, HStack, Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Stack, Text, Field } from "@chakra-ui/react";
import { Icon, Flex } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {

    const textColor = useColorModeValue('gray.600', 'gray.300');
    const headingColor = useColorModeValue('gray.800', 'white');

    const floatingStyles = defineStyle({
        pos: "absolute",
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

    const navigate = useNavigate();

    return (
        <Box flex="1" p={12}>
            <Stack gap={6} align="stretch">
                <Stack gap={3} align="flex-start">
                    <Heading
                        size="2xl"
                        color={headingColor}
                        fontWeight="bold"
                        lineHeight="1.2"
                    >
                        Sign up for your {import.meta.env.VITE_APP_NAME} account
                    </Heading>
                    <Text color={textColor} fontSize="md">
                        No fees. No fuss. Just free scheduling.
                    </Text>
                </Stack>

                <Stack gap={4} align="stretch">
                    <Field.Root>
                        <Box pos="relative" w="full">
                            <Input
                                className='peer'
                                type="email"
                                placeholder=''
                                size="xl"
                                css={{ "--focus-color": "blue" }}
                                borderRadius="md"
                                borderColor="gray.300"
                            />
                            <Field.Label css={floatingStyles}>Email</Field.Label>
                        </Box>
                    </Field.Root>

                    <Button
                        type="submit"
                        size="xl"
                        w="100%"
                        borderRadius="md"
                        colorPalette="blue"
                    >
                        Continue
                    </Button>
                </Stack>

                <Stack gap={4}>

                    <HStack w="100%" my={2}>
                        <Box flex="1" h="1px" bg="gray.200" />
                        <Text fontSize="sm" color="gray.500" px={2} flexShrink={0}>
                            OR
                        </Text>
                        <Box flex="1" h="1px" bg="gray.200" />
                    </HStack>

                    <Text color={textColor} fontSize="sm" textAlign="center" maxW="sm" mx="auto">
                        Just sign up and sync your calendar — it’s that easy.
                    </Text>

                    <Stack gap={3} width="full">
                        <SignInWithGoogle />

                    </Stack>

                    <Flex gap={1} width="full" align="center">
                        <Text color={textColor} fontSize="md" lineHeight="1.6" fontWeight="medium">
                            Already have an account?
                        </Text>
                        <Link
                            color="blue.500"
                            fontSize="sm"
                            _hover={{ textDecoration: 'underline' }}
                            onClick={() => navigate('/login')}
                            textAlign="center"
                            fontWeight="bold"
                        >
                            Sign In
                            <Icon as={FaArrowRight} />
                        </Link>
                    </Flex>
                </Stack>
            </Stack>
        </Box>
    )
}