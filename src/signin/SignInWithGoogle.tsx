import { Flex, Image, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { clearLoginState } from "@/store/loginSlice";
import { useNavigate } from "react-router-dom";
import { setAuthData } from "@/utils/auth";

export default function SignInWithGoogle() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        ux_mode: 'redirect',
        redirect_uri: 'http://localhost:3000/google-callback',
        scope: "email profile https://www.googleapis.com/auth/calendar",
        flow: 'auth-code'
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