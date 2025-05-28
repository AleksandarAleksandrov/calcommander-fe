import { useColorModeValue } from '@/components/ui/color-mode';
import SignUpBenefits from './SignUpBenefits';
import SignUpForm from './SignUpForm';
import { Box, Image } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

import manCalendarMirror from '@/assets/images/man_calendar_mirror.png';
import womanCreateAccount from '@/assets/images/woman_create_account.png';

export default function SignupPage() {

  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr 1fr" }}
      p={4}
    >

      <Box
        display={{ base: "none", lg: "flex" }}
        justifyContent="center"
        alignItems="center"
      >
        <Image src={manCalendarMirror} maxW="18vw"/>
      </Box>

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
        <SignUpForm />

        <SignUpBenefits />

      </Flex>

      <Box
        display={{ base: "none", lg: "flex" }}
        justifyContent="center"
        alignItems="center"
      >
        <Image src={womanCreateAccount} maxW="18vw"/>
      </Box>

    </Box>
  );
}
