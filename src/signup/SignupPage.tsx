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
  Link
} from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { FaGoogle, FaMicrosoft, FaCheck } from 'react-icons/fa';

export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');

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
              <Input
                placeholder="Enter your email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg={useColorModeValue('white', 'gray.700')}
                border="1px solid"
                borderColor={useColorModeValue('gray.300', 'gray.600')}
                _hover={{
                  borderColor: useColorModeValue('gray.400', 'gray.500')
                }}
                _focus={{
                  borderColor: 'blue.500',
                  boxShadow: '0 0 0 1px #3182ce'
                }}
              />

              <Button
                colorPalette="blue"
                size="lg"
                width="full"
                fontWeight="semibold"
                _hover={{ transform: 'translateY(-1px)', boxShadow: 'lg' }}
                transition="all 0.2s"
              >
                Sign up
              </Button>
            </Stack>

            <Stack gap={4}>
              <Text color={textColor} fontSize="sm" textAlign="center">
                OR
              </Text>
              
              <Text color={textColor} fontSize="sm" textAlign="center" maxW="sm" mx="auto">
                Easily connect your calendar by signing up with your Google, Microsoft
                Office 365, or Outlook account.
              </Text>

              <Stack gap={3} width="full">
                <Button
                  variant="outline"
                  size="lg"
                  width="full"
                  fontWeight="medium"
                  bg="blue.500"
                  color="white"
                  border="none"
                  _hover={{
                    bg: 'blue.600',
                    transform: 'translateY(-1px)',
                    boxShadow: 'md'
                  }}
                  transition="all 0.2s"
                >
                  <Flex align="center" gap={2}>
                    <Icon as={FaGoogle} />
                    <Text>Sign up with Google</Text>
                  </Flex>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  width="full"
                  fontWeight="medium"
                  bg="gray.700"
                  color="white"
                  border="none"
                  _hover={{
                    bg: 'gray.800',
                    transform: 'translateY(-1px)',
                    boxShadow: 'md'
                  }}
                  transition="all 0.2s"
                >
                  <Flex align="center" gap={2}>
                    <Icon as={FaMicrosoft} />
                    <Text>Sign up with Microsoft</Text>
                  </Flex>
                </Button>
              </Stack>

              <Link
                color="blue.500"
                fontSize="sm"
                fontWeight="medium"
                _hover={{ textDecoration: 'underline' }}
                textAlign="center"
              >
                Log In
              </Link>
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