import React from "react";
import { 
  Box, 
  Flex, 
  HStack, 
  Text, 
  Spacer,
  Center
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  //const currentPage = useLocation().pathname;
  //const { toggleColorMode } = useColorMode();
  let loggedIn = false;

  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white");

  const logout = () => {
    // Logic to handle logout
    loggedIn = false;
    console.log("User logged out");
  }

  const renderButtons = () => {
    if (loggedIn) {
      return (
        <HStack spacing={4}>
          <Text fontWeight="bold" cursor="pointer" px={3} onClick={logout}>
            Logout
          </Text>
        </HStack>
      );
    }
    return (
      <HStack spacing={4}>
        {/* Add login/register buttons here if needed */}
      </HStack>
    );
  };

  return (
    <Box width="100%" bg={bg} px={3} py={3} shadow="md" color={text} backgroundColor={bg}>
      <Flex align="center">
        <Center>
        {/* Left-aligned tabs */}
        <HStack spacing={6}>
          <Text as={Link} to="/" fontWeight="bold" cursor="pointer" px={3}>
            Home
          </Text>
          <Text as={Link} to="/About" fontWeight="bold" cursor="pointer" px={3}>
            About Me
          </Text>
          <Text as={Link} to="/blog" fontWeight="bold" cursor="pointer" px={3}>
            Blog
          </Text>
          <Text as={Link} to="/portfolio" fontWeight="bold" cursor="pointer" px={3}>
            Projects
          </Text>
          <Text as={Link} to="/contact" fontWeight="bold" cursor="pointer" px={3}>
            Contact Me
          </Text>
        </HStack>
        </Center>

        {/* Pushes button to the right */}
        <Spacer />

        {/* {renderButtons()} */}

        {/* Right-aligned button */}
        <HStack spacing={4}>
          <ColorModeButton />
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;