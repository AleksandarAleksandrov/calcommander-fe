import { Flex, Image, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useGoogleOneTapLogin } from "@react-oauth/google";

export default function ThirdPartLogin() {

    const googleLogin = useGoogleOneTapLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse);
        }
    });

    return (
        <>
            <Button
                w="100%"
                size="xl"
                variant="outline"
                borderRadius="md"
            >
                <Flex align="center" gap={2} onClick={() => googleLogin()}>
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" boxSize="20px" />
                    <Text>Continue with Google</Text>
                </Flex>
            </Button>

            <Button
                w="100%"
                size="xl"
                variant="outline"
                borderRadius="md"
            >
                <Flex align="center" gap={2}>
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg" boxSize="20px" />
                    <Text>Continue with Microsoft</Text>
                </Flex>
            </Button>
        </>
    )
}