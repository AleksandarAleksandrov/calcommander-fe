import type { RootState } from "@/store";
import { checkUserExistance, loginAction, UserExistence } from "@/store/loginSlice";
import { Button, Input, Field, Box, defineStyle, Text } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

export default function PlatformLogin() {

    const { isPlatformContinueLoading } = useSelector((state: RootState) => state.login);
    const { existanceStatus } = useSelector((state: RootState) => state.login);
    const { loginFailed } = useSelector((state: RootState) => state.login);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    if(existanceStatus === UserExistence.NOT_PRESENT) {
        navigate("/signup");
    } else if(existanceStatus === UserExistence.PRESENT_THRU_OAUTH) {
        navigate("/signup/complete-native-auth");
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleContinue = async () => {
        if(existanceStatus === UserExistence.NOT_INITIATED) {
            dispatch(checkUserExistance({ email }) as any);
        }
        if(existanceStatus === UserExistence.PRESENT) {
            const {jwt, expiresAt} = await dispatch(loginAction({ email, password }) as any);
            
            if(jwt && expiresAt) {
                localStorage.setItem("jwt", jwt);
                localStorage.setItem("expiresAt", expiresAt);
                navigate("/");
            }
        }
    }

    return (
        <>
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
            {existanceStatus === UserExistence.PRESENT ? <Field.Root>
                <Box pos="relative" w="full"
                    data-state="open"
                    _open={{
                        animation: "fade-in 500ms ease-out",
                    }}
                >
                    <PasswordInput
                        className='peer'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=''
                        size="xl"
                        css={{ "--focus-color": "blue" }}
                        borderRadius="md"
                        borderColor="gray.300"
                    />
                    <Field.Label css={floatingStyles}>Password</Field.Label>
                </Box>
            </Field.Root> : null}
            {loginFailed && (
                <Text color="red.500" fontSize="sm" alignSelf="flex-start" 
                textStyle="sm" css={{ marginTop: "-1.0rem", marginBottom: "-0.5rem" }}>
                    Wrong email or password
                </Text>
            )}
            <Button
                type="submit"
                size="xl"
                w="100%"
                borderRadius="md"
                colorPalette="blue"
                onClick={handleContinue}
                loading={isPlatformContinueLoading}
            >
                Continue
            </Button>
        </>
    )
}