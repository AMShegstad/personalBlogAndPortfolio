//import { useState } from 'react'
import './styles.css'
import React, { useState, useEffect } from 'react';
import Navbar from './components/Nav';
import { Flex, Box, HStack } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
// import HomeBlogCard from './components/HomeBlogCard';
// import HomeProjectCard from './components/HomeProjectCard';
import Landing from './pages/Landing';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';

const MotionFlex = motion(Flex);

function App() {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLanding(false), 3000); // 3-second splash
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showLanding ? (
        <Landing key="landing" />
      ) : (
        <MotionFlex
          key="main"
          direction="column"
          justifyContent="space-between"
          minH="100vh"
          bg="gray.50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} 
        >
          <Header />
          <Navbar />
          <Box as="main" flex="1" p={4} overflow="scroll">
            <Outlet/>
          </Box>
          <Footer />
        </MotionFlex>
      )}
    </AnimatePresence>
  );
}

export default App;
