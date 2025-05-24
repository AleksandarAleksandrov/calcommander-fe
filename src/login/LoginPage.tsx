import { Box } from '@chakra-ui/react';
import { LoginForm } from './LoginForm';

export default function LoginPage() {

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      p={4}
    >
      <LoginForm
      />
    </Box>
  );
}; 