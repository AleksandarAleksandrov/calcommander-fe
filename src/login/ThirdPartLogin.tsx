import { Flex, Image, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";

export default function ThirdPartLogin() {
    return (
        <>
            <Button
                w="100%"
                size="xl"
                variant="outline"
                borderRadius="md"
            >
                <Flex align="center" gap={2}>
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" boxSize="20px" />
                    <Text>Continue with Google</Text>
                </Flex>
            </Button>

            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
            />;


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