import { Button, Input, Field, Box, defineStyle } from "@chakra-ui/react";
import { useState } from "react";

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

    const [email, setEmail] = useState("");

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
            <Button
                type="submit"
                size="xl"
                w="100%"
                borderRadius="md"
                colorPalette="blue"
            >
                Continue
            </Button>
        </>
    )
}