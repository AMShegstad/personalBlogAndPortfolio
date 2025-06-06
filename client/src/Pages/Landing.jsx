import React from 'react';
import { Box, Heading, Text, VStack, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Logo from '/assets/images/_nameAndLogo.png'; // Adjust the path as necessary

const MotionBox = motion(Box);

const LandingPage = () => {
  return (
    <MotionBox
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="black"
      color="white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 1.5 }}
      backgroundColor={"#F4F2EE"}
      overflow={"hidden"}
    >
        <Image src={Logo} alt="Logo"/>
    </MotionBox>
  );
};

export default LandingPage;
