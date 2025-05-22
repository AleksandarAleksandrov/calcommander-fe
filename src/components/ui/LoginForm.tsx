import { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Input,
    Text,
    Stack,
    HStack,
    Image,
    defineStyle,
    Field,
} from '@chakra-ui/react';

interface LoginFormProps {
    onSubmit?: (email: string) => void;
    onGoogleLogin?: () => void;
    onMicrosoftLogin?: () => void;
    onSignUp?: () => void;
}

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

export const LoginForm = ({
    onSubmit,
    onGoogleLogin,
    onMicrosoftLogin,
    onSignUp,
}: LoginFormProps) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(email);
    };

    return (
        <Flex direction="column" align="center" w="100%">
            <Box mb={8}>
                <Text fontSize="3xl" fontWeight="bold" textAlign="center">
                    Log in to your account
                </Text>
            </Box>

            <Box
                w={{ base: "90%", sm: "450px" }}
                p={8}
                borderRadius="lg"
                bg="white"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.100"
            >
                <form onSubmit={handleSubmit}>
                    <Stack gap={6}>
                        <Field.Root>
                            <Box pos="relative" w="full">
                                <Input
                                    className='peer'
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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

                        <HStack w="100%" my={2}>
                            <Box flex="1" h="1px" bg="gray.200" />
                            <Text fontSize="sm" color="gray.500" px={2} flexShrink={0}>
                                OR
                            </Text>
                            <Box flex="1" h="1px" bg="gray.200" />
                        </HStack>

                        <Button
                            w="100%"
                            size="xl"
                            variant="outline"
                            borderRadius="md"
                            onClick={onGoogleLogin}
                        >
                            <Flex align="center" gap={2}>
                                <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" boxSize="20px" />
                                <Text>Continue with Google</Text>
                            </Flex>
                        </Button>

                        <Button
                            w="100%"
                            size="xl"
                            variant="outline"
                            borderRadius="md"
                            onClick={onMicrosoftLogin}
                        >
                            <Flex align="center" gap={2}>
                                <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg" boxSize="20px" />
                                <Text>Continue with Microsoft</Text>
                            </Flex>
                        </Button>
                    </Stack>
                </form>
            </Box>

            <Flex mt={8}>
                <Text color="gray.600">Don't have an account?</Text>
                <Text
                    ml={2}
                    color="blue.500"
                    fontWeight="medium"
                    cursor="pointer"
                    onClick={onSignUp}
                    display="flex"
                    alignItems="center"
                >
                    Sign up for free
                    <Box as="span" ml={1}>→</Box>
                </Text>
            </Flex>
        </Flex>
    );
}; 