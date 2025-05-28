import { PasswordInput } from "@/components/ui/password-input";
import type { RootState } from "@/store";
import { UserExistence } from "@/store/loginSlice";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { defineStyle } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUserRegistrationExistance, clearSignUpState, signUpAction } from "@/store/signUpSlice";
import { setAuthData } from "@/utils/auth";
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

export default function PlatformSignUp() {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isPlatformContinueLoading } = useSelector((state: RootState) => state.signUp);
    const { existanceStatus } = useSelector((state: RootState) => state.signUp);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleContinue = async () => {
        if(existanceStatus === UserExistence.NOT_INITIATED) {
            dispatch(checkUserRegistrationExistance({ email }) as any);
        }
        if(existanceStatus === UserExistence.NOT_PRESENT) {
            await dispatch(signUpAction({ email, password }) as any);
            dispatch(clearSignUpState());
            navigate("/verify-email");
        }
        
    }

    return (
        <form onSubmit={handleSubmit}>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Field.Label css={floatingStyles}>Email</Field.Label>
                    </Box>
                </Field.Root>

                {existanceStatus === UserExistence.NOT_PRESENT ? <Field.Root>
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
                            minLength={6}
                        />
                        <Field.Label css={floatingStyles}>Password</Field.Label>
                    </Box>
                </Field.Root> : null}

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
            </Stack>
        </form>
    )
}