import { Box, HStack, VStack, Image, Spacer } from "@chakra-ui/react";
import React from "react";
import profpic from '/assets/images/profpic3.JPG'; // Adjust the path as necessar
import cartoonMe from '/assets/images/_cartoonMeAndNox.png';

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
      <HStack align="center" spacing={4} justify="center" width="full">
        <VStack align="center">
          <Box fontWeight="bold" fontSize="2xl" height="100px" color="gray.900" px={2} rounded="md">
            Alexander Shegstad 
            <Box fontWeight="bold" color="green.700" fontSize="md">
              Software Developer
            </Box>
          </Box>
          <Spacer/>
        </VStack>
        <Image rounded="md" height={36} src={cartoonMe} alt="Portrait" borderRadius="full" fit="cover" />
      </HStack>
    </Box>
  );
};

export default Header;
