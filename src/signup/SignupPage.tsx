import { useColorModeValue } from '@/components/ui/color-mode';
import SignUpBenefits from './SignUpBenefits';
import SignUpForm from './SignUpForm';
import { Box } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

export default function SignupPage() {

  const cardBg = useColorModeValue('white', 'gray.800');

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
        <SignUpForm />

        <SignUpBenefits />
        
      </Flex>
    </Box>
  );
}
