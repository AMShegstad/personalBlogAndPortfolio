import { Box, HStack, VStack, Image, Spacer, useColorModeValue } from "@chakra-ui/react";
import React from "react";
//port profpic from '/assets/images/profpic3.JPG'; // Adjust the path as necessar
import cartoonMe from '/assets/images/_cartoonMeAndNox.png';
// Use the public folder path directly in the <Image src> prop instead of importing
import codingCert from '/assets/images/codingCert.png';


const Header = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("gray.800", "gray.100");

  return (
    <Box
      as="header"
      bg={bg}
      color={color}
      px={4}
      py={2}
      pt={"70px"}
      shadow="md"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack align="center" spacing={4} justify="center" width="full">
        <VStack align="center">
          <Box fontWeight="bold" fontSize="2xl" height="100px" px={2} rounded="md">
            Alexander Shegstad 
            <Box fontWeight="bold" color="green.700" fontSize="md">
              Software Developer
            </Box>
          </Box>
          <Spacer/>
        </VStack>
        <Image rounded="md" height={36} src={cartoonMe} alt="Portrait" borderRadius="full" fit="cover" />
        <Image rounded="md" height={36} src={codingCert} alt="Bootcamp Certificate" borderRadius="full" fit="cover" />
      </HStack>
    </Box>
  );
};

export default Header;
