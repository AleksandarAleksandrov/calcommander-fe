import { Box, Image } from '@chakra-ui/react';
import { SignInForm } from './SignInForm';

import womanHoldingPuzzlePiece from '@/assets/images/woman_holding_puzzle_piece.png';
import manHoldingPuzzlePiece from '@/assets/images/man_holding_puzzle_piece.png';

export default function SignInPage() {

  return (
    <Box
      minH="100vh"
      display="grid"
      gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr 1fr" }}
      bg="gray.50"
      p={4}
    >
      <Box
        display={{ base: "none", lg: "flex" }}
        justifyContent="center"
        alignItems="center"
      >
        <Image src={womanHoldingPuzzlePiece} maxW="20vw" />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <SignInForm />
      </Box>
      <Box 
        display={{ base: "none", lg: "flex" }}
        justifyContent="center"
        alignItems="center"
      >
        <Image src={manHoldingPuzzlePiece} maxW="20vw" />
      </Box>
    </Box>
  );
}; 