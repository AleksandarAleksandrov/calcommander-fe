import { Flex, Image, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";

export default function SignInWithGoogle() {

    const googleLogin = useGoogleLogin({
        ux_mode: 'redirect',
        redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
        scope: "email profile https://www.googleapis.com/auth/calendar",
        flow: 'auth-code'
    });

    return (
        <>
            <Button
                w="100%"
                size="xl"
                variant="outline"
                borderRadius="md"
                onClick={() => googleLogin()}
            >
                <Flex align="center" gap={2}>
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" boxSize="20px" />
                    <Text>Continue with Google</Text>
                </Flex>
            </Button>
        </>
    )
}