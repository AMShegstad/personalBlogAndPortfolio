import React from 'react';
import { Box, Flex, Button, HStack, Text, Spacer } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box width="100%" bg="gray.100" px={3} py={3} shadow="md">
      <Flex align="center">
        {/* Left-aligned tabs */}
        <HStack spacing={6}>
          <Text fontWeight="bold" cursor="pointer" px={3}>Home</Text>
          <Text fontWeight="bold" cursor="pointer" px={3}>Blog</Text>
          <Text fontWeight="bold" cursor="pointer" px={3}>Projects</Text>
          <Text fontWeight="bold" cursor="pointer" px={3}>Contact Me</Text>
        </HStack>

        {/* Pushes button to the right */}
        <Spacer />

        {/* Right-aligned button */}
        <Button colorScheme="blue" variant="solid">
          Login / Create
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;