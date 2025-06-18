import React from 'react';
import { 
  Box, 
  Flex, 
  HStack, 
  Link as ChakraLink, 
  useColorMode, 
  IconButton,
  useColorModeValue,
  Container,
  Spacer
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

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
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <MotionLink
            as={RouterLink}
            to="/"
            fontSize="xl"
            fontWeight="bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
          </MotionLink>

          <HStack spacing={8} justify={"center"}>
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
          </HStack>
        </Flex>
      </Container>
    </MotionBox>
  );
}

export default PortfolioNav;