import { Box, Image } from '@chakra-ui/react';
import { SignInForm } from './SignInForm';

import womanHoldingPuzzlePiece from '@/assets/images/woman_holding_puzzle_piece.png';
import manHoldingPuzzlePiece from '@/assets/images/man_holding_puzzle_piece.png';

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
        alignItems="start"
      >
        <Image src={womanHoldingPuzzlePiece} alt="logo" />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <SignInForm />
      </Box>
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="start"
      >
        <Image src={manHoldingPuzzlePiece} alt="logo" />
      </Box>
    </Box>
  );
}; 