import React from 'react';
import { Box, Spinner, Stack, Text } from '@chakra-ui/react';

interface LoadingProps {
  message?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  message = "Loading...", 
  size = "xl",
  color = "blue.solid"
}) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="white"
      zIndex={1000}
      _dark={{
        backgroundColor: "gray.800"
      }}
    >
      <Stack gap={6} alignItems="center">
        <Spinner
          color={color}
          size={size}
          borderWidth="4px"
          css={{ 
            "--spinner-track-color": "colors.gray.200",
            "--spinner-size": "4rem",
            "--spinner-thickness": "6px",
            "@media (min-width: 768px)": {
              "--spinner-size": "5rem",
              "--spinner-thickness": "8px"
            }
          }}
        />
        <Text
          fontSize="lg"
          fontWeight="medium"
          color="blue.solid"
          _dark={{
            color: "gray.300"
          }}
        >
          {message}
        </Text>
      </Stack>
    </Box>
  );
};

export default Loading; 