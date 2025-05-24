import {
    Box,
    Flex,
    Text,
    Stack,
    HStack
} from '@chakra-ui/react';
import PlatformLogin from './PlatformLogin';
import ThirdPartLogin from './ThirdPartyLogin';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const navigate = useNavigate();

    return (
        <Flex direction="column" align="center" w="100%">
            <Box mb={8}>
                <Text fontSize="3xl" fontWeight="bold" textAlign="center">
                    Sign in to your account
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
                        
                        <PlatformLogin />

                        <HStack w="100%" my={2}>
                            <Box flex="1" h="1px" bg="gray.200" />
                            <Text fontSize="sm" color="gray.500" px={2} flexShrink={0}>
                                OR
                            </Text>
                            <Box flex="1" h="1px" bg="gray.200" />
                        </HStack>

                        <ThirdPartLogin />
                        
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
                    onClick={() => navigate("/signup")}
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