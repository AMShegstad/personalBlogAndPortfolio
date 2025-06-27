//import { useState } from 'react'
import './styles.css'
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Flex, Box, Container, useColorModeValue } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

import Nav from './components/Nav';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './Pages/Landing';
import Home from './Pages/Home';
import About from './Pages/About';
import Portfolio from './Pages/Portfolio';
import Blog from './Pages/Blog';
//import BlogPost from './pages/BlogPost';
import Contact from './Pages/Contact';

const MotionFlex = motion(Flex);

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

// Wrapper component for animated pages
const AnimatedPage = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="page-container"
  >
    {children}
  </motion.div>
);

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const location = useLocation();
  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white");

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
          bg={bg}
          color={text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} 
        >
          <Header />
          <Nav />
          {/* Add padding-top to account for fixed navbar */}
          {/* <Box pt="64px"> Adjust this value based on your nav height */}
            {/* <Header />
          </Box> */}
          <Box as="main" flex="1" p={4}>
            <Container maxW="container.xl" pt={4}> {/* Reduced pt since Header now has space */}
              <AnimatePresence mode="wait" initial={false}>
                <Routes location={location} key={location.pathname}>
                  <Route
                    path="/"
                    element={
                      <AnimatedPage>
                        <Home />
                      </AnimatedPage>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <AnimatedPage>
                        <About />
                      </AnimatedPage>
                    }
                  />
                  <Route
                    path="/portfolio"
                    element={
                      <AnimatedPage>
                        <Portfolio />
                      </AnimatedPage>
                    }
                  />
                  <Route
                    path="/blog"
                    element={
                      <AnimatedPage>
                        <Blog />
                      </AnimatedPage>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <AnimatedPage>
                        <Contact />
                      </AnimatedPage>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </Container>
          </Box>
          <Footer />
        </MotionFlex>
      )}
    </AnimatePresence>
  );
}

export default App;
