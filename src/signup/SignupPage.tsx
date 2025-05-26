import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  Stack,
  HStack,
  Icon,
  Link,
  Field,
  defineStyle,
  Image
} from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { FaGoogle, FaMicrosoft, FaCheck, FaArrowRight } from 'react-icons/fa';

export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');

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


  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      p={4}
    >
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align="stretch"
        justify="center"
        gap={0}
        maxW="4xl"
        mx="auto"
        bg={cardBg}
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="xl"
      >
        {/* Left Panel - Sign Up Form */}
        <Box flex="1" p={12}>
          <Stack gap={6} align="stretch">
            <Stack gap={3} align="flex-start">
              <Heading
                size="2xl"
                color={headingColor}
                fontWeight="bold"
                lineHeight="1.2"
              >
                Sign up for your Invity account
              </Heading>
              <Text color={textColor} fontSize="md">
                Always free! No credit card required.
              </Text>
            </Stack>

            <Stack gap={4} align="stretch">
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
            </Stack>

            <Stack gap={4}>

              <HStack w="100%" my={2}>
                <Box flex="1" h="1px" bg="gray.200" />
                <Text fontSize="sm" color="gray.500" px={2} flexShrink={0}>
                  OR
                </Text>
                <Box flex="1" h="1px" bg="gray.200" />
              </HStack>

              <Text color={textColor} fontSize="sm" textAlign="center" maxW="sm" mx="auto">
                Easily connect your calendar by signing up with your Google, Microsoft
                Office 365, or Outlook account.
              </Text>

              <Stack gap={3} width="full">
                <Button
                  w="100%"
                  size="xl"
                  variant="outline"
                  borderRadius="md"
                  // colorPalette="blue"
                >
                  <Flex align="center" gap={2} onClick={() => googleLogin()}>
                    <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" boxSize="20px" />
                    <Text>Continue with Google</Text>
                  </Flex>
                </Button>

              </Stack>

              <Flex gap={1} width="full" align="center">
                <Text color={textColor} fontSize="md" lineHeight="1.6" fontWeight="medium">
                  Already have an account?
                </Text>
              <Link
                color="blue.500"
                fontSize="sm"
                _hover={{ textDecoration: 'underline' }}
                textAlign="center"
                fontWeight="bold"
              >
                  Log In
                  <Icon as={FaArrowRight} />
                </Link>
              </Flex>
            </Stack>
          </Stack>
        </Box>

        {/* Right Panel - Benefits */}
        <Box
          flex="1"
          bg={useColorModeValue('gray.50', 'gray.700')}
          p={12}
          borderLeft="1px solid"
          borderLeftColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <Stack gap={8} align="flex-start" h="full">
            <Stack gap={4} align="flex-start">
              <Heading
                size="xl"
                color={headingColor}
                fontWeight="bold"
              >
                Create your free account
              </Heading>

              <Text color={textColor} fontSize="md" lineHeight="1.6">
                Easily schedule with clients and recruits with a free
                Calendly account. First-time signups get a free 14-day trial
                of our Teams plan!
              </Text>
            </Stack>

            <Stack gap={6} align="flex-start">
              <Heading
                size="lg"
                color={headingColor}
                fontWeight="semibold"
              >
                This Teams trial includes upgrades like:
              </Heading>

              <Stack gap={4} align="flex-start">
                <HStack gap={3} align="flex-start">
                  <Icon
                    as={FaCheck}
                    color="green.500"
                    boxSize={5}
                    mt={0.5}
                  />
                  <Text color={textColor} fontSize="md">
                    Ability to book meetings as a team with clients and more
                  </Text>
                </HStack>

                <HStack gap={3} align="flex-start">
                  <Icon
                    as={FaCheck}
                    color="green.500"
                    boxSize={5}
                    mt={0.5}
                  />
                  <Text color={textColor} fontSize="md">
                    Unlimited event types (30-min video call, 15-min phone call)
                  </Text>
                </HStack>

                <HStack gap={3} align="flex-start">
                  <Icon
                    as={FaCheck}
                    color="green.500"
                    boxSize={5}
                    mt={0.5}
                  />
                  <Text color={textColor} fontSize="md">
                    Remove Calendly branding
                  </Text>
                </HStack>

                <HStack gap={3} align="flex-start">
                  <Icon
                    as={FaCheck}
                    color="green.500"
                    boxSize={5}
                    mt={0.5}
                  />
                  <Text color={textColor} fontSize="md">
                    Ability to charge for meetings with PayPal and Stripe — {' '}
                    <Text as="span" fontWeight="semibold" color={headingColor}>
                      plus more
                    </Text>
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignupPage; 