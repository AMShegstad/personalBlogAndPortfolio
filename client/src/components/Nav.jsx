import React from 'react';
import { 
  Box,
  Button, 
  Flex, 
  HStack, 
  Link as ChakraLink, 
  useColorMode, 
  IconButton,
  useColorModeValue,
  Container,
  Spacer,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useAuth } from '../utils/AuthContext'; // Assuming you have an AuthContext for login state management
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";


const MotionBox = motion(Box);
const MotionLink = motion(ChakraLink);

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handling login functionality
  const { isLoggedIn, login, logout } = useAuth(); 
  
  const bg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <MotionBox
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={bg}
      backdropFilter="blur(10px)"
      borderBottom="1px"
      borderColor={borderColor}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Container maxW="container.xl">
        <Flex h={16} justifyContent="center" mx="auto">
          <MotionLink
            as={RouterLink}
            to="/"
            fontSize="xl"
            fontWeight="bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
          </MotionLink>

          <HStack spacing={8} justify={"center"} display={{ base: "none", md: "flex" }}>
            {navItems.map((item) => (
              <MotionLink
              justifyContent="center"
                display="flex"
                key={item.path}
                as={RouterLink}
                to={item.path}
                px={3}
                py={2}
                rounded="md"
                position="relative"
                className="navbar-link"
                color={location.pathname === item.path ? 'blue.500' : 'inherit'}
                fontWeight={location.pathname === item.path ? 'semibold' : 'normal'}
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {location.pathname === item.path && (
                  <MotionBox
                    position="absolute"
                    bottom="-1px"
                    left={0}
                    right={0}
                    h="2px"
                    bg="blue.500"
                    borderRadius="full"
                    layoutId="underline"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </MotionLink>
            ))}
            <Spacer />

            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              as={motion.button}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            />
            <Button onClick={isLoggedIn ? logout : login}>
              {isLoggedIn ? <IoMdLogOut /> : <IoMdLogIn />}
            </Button>
          </HStack>
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="ghost"
            display={{ base: "flex", md: "none" }}
          />
        </Flex>
      </Container>

      {/* Mobile Navigation - Drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              {navItems.map((item) => (
                <ChakraLink
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  onClick={onClose}
                  width="100%"
                  py={2}
                  px={4}
                  borderRadius="md"
                  _hover={{ bg: 'blue.500', color: 'white' }}
                  display="block"
                  fontWeight={location.pathname === item.path ? 'semibold' : 'normal'}
                  color={location.pathname === item.path ? 'blue.500' : 'inherit'}
                >
                  {item.name}
                </ChakraLink>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  );
}

export default Nav;