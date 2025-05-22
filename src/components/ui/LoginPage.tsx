import { Box } from '@chakra-ui/react';
import { LoginForm } from './LoginForm';

export const LoginFormExample = () => {
  const handleSubmit = (email: string) => {
    console.log('Login with email:', email);
    // Handle email login logic here
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google');
    // Handle Google login logic here
  };

  const handleMicrosoftLogin = () => {
    console.log('Login with Microsoft');
    // Handle Microsoft login logic here
  };

  const handleSignUp = () => {
    console.log('Navigate to sign up page');
    // Handle navigation to sign up page
  };

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
        onSubmit={handleSubmit}
        onGoogleLogin={handleGoogleLogin}
        onMicrosoftLogin={handleMicrosoftLogin}
        onSignUp={handleSignUp}
      />
    </Box>
  );
}; 