import { Box } from '@chakra-ui/react';
import { SignInForm } from './SignInForm';

export default function SignInPage() {

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      p={4}
    >
      <SignInForm
      />
    </Box>
  );
}; 