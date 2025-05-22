import type { RootState } from "@/store";
import { checkUserExistance, loginAction } from "@/store/loginSlice";
import { Button, Input, Field, Box, defineStyle } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    const { isEmailConnected } = useSelector((state: RootState) => state.login);
    const { isEmailPresent } = useSelector((state: RootState) => state.login);

    const dispatch = useDispatch();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleContinue = () => {
        if(!isEmailConnected && !isEmailPresent) {
            dispatch(checkUserExistance({ email }) as any);
        }
        if(isEmailPresent && isEmailConnected) {
            dispatch(loginAction({ email, password }) as any);
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
            {isEmailConnected ? <Field.Root>
                <Box pos="relative" w="full"
                    data-state="open"
                    _open={{
                        animation: "fade-in 500ms ease-out",
                    }}
                >
                    <Input
                        className='peer'
                        type="password"
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