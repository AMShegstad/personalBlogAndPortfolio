import { Flex, Box, Image, HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
// import HomeBlogCard from '../components/HomeBlogCard';
// import HomeProjectCard from '../components/HomeProjectCard';
import cartoonMe from '/assets/images/_cartoonMeAndNox.png';

const Home = () => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white");
  //const background = 'linear-gradient(to right, #f8f9fa, #e9ecef)'; // Example gradient background
  return (
    <Flex direction="column" justifyContent="space-between" width={"100%"} minH="100vh" bg={bg} color={text}>
      {/* Header and Navbar components can be included here if needed */}
      <Box as="main" flex="1" p={4}>
        {/* Main content goes here */}
        {/* <HStack spacing={4} mt={4}>
          <HomeBlogCard />
          <HomeProjectCard />
        </HStack> */}
        <Image rounded="md" width="90%" height="auto" src={cartoonMe} alt="Portrait" borderRadius="sm" fit="cover"/>
      </Box>
    </Flex>
  );
}

export default Home;