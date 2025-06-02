import { Box, HStack, VStack, Image } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <Box
      as="header"
      bg="gray.100"
      px={4}
      py={3}
      shadow="md"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack>
        <VStack align="start">
          <Box fontWeight="bold" fontSize="xl">
            Alexander Shegstad
          </Box>
          <Box fontSize="sm" color="gray.600">
            Software Developer
          </Box>
        </VStack>
        <Image rounded="md" src="#" alt="Portrait" />
      </HStack>
    </Box>
  );
};

export default Header;
