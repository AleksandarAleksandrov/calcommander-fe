import { Flex, Image, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { clearLoginState, googleOneTapSignInAction, googleSignInAction } from "@/store/loginSlice";
import { useNavigate } from "react-router-dom";
import { setAuthData } from "@/utils/auth";

export default function ThirdPartLogin() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useGoogleOneTapLogin({
        onSuccess: async (codeResponse) => {
            const {jwt, expiresAt} = await dispatch(googleOneTapSignInAction({ credential: codeResponse.credential as string }) as any);
            setLocalStorage(jwt, expiresAt);
        },
        cancel_on_tap_outside: false,
        // auto_select: true
    });

    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const {jwt, expiresAt} = await dispatch(googleSignInAction({ credential: codeResponse.access_token as string }) as any);
            setLocalStorage(jwt, expiresAt);
        }
    });

    const setLocalStorage = (jwt: string, expiresAt: string) => {
        if(jwt && expiresAt) {
            setAuthData(jwt, expiresAt);
            dispatch(clearLoginState());
            navigate("/");
        }
    }   

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
        </>
    )
}