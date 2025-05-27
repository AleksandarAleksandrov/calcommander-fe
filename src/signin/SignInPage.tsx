import { Box, Image } from '@chakra-ui/react';
import { SignInForm } from './SignInForm';
import womanPointingCalendar from '@/assets/images/woman_pointing_at_calendar.png';

export default function SignInPage() {

  return (
    <Box
      minH="100vh"
      display="grid"
      gridTemplateColumns="1fr 1fr 1fr"
      bg="gray.50"
      p={4}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={womanPointingCalendar} alt="logo"/>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <SignInForm/>
      </Box>
      <Box />
    </Box>
  );
}; 