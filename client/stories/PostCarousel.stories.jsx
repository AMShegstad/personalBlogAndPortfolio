import React from 'react';
import { Box, Text } from '@chakra-ui/react';

// Simple mock component for testing
const SimplePostCarousel = () => {
  return (
    <Box p={6} borderRadius="lg" boxShadow="lg" maxW="600px" mx="auto" bg="gray.100">
      <Text>PostCarousel Component Preview</Text>
      <Text fontSize="sm" color="gray.600">
        This is a placeholder for the PostCarousel component
      </Text>
    </Box>
  );
};

export default {
  title: 'Components/PostCarousel',
  component: SimplePostCarousel,
};

export const Default = {};