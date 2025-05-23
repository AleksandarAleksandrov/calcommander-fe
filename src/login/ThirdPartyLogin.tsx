import { Flex, Image, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { googleOneTapSignInAction, googleSignInAction } from "@/store/loginSlice";

export default function ThirdPartLogin() {

    const dispatch = useDispatch();

    useGoogleOneTapLogin({
        onSuccess: (codeResponse) => {
            dispatch(googleOneTapSignInAction({ credential: codeResponse.credential as string }) as any);
        },
        use_fedcm_for_button: true
    });

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            dispatch(googleSignInAction({ credential: codeResponse.access_token as string }) as any);
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