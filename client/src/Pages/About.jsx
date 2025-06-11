import React, { useEffect, useRef } from 'react'
import { Text, Flex, Box, useColorModeValue } from '@chakra-ui/react'
import SkillChart from '../components/SkillChart';
import AboutContent from '../components/AboutContent';

const About = () => {
  //const chartRef = useRef(null);

  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white");

  return (
    <Flex direction="column" as="main" flex="1" p={4} bg={bg} color={text}>
      <AboutContent /> 
      <SkillChart />
    </Flex>
  );
}

export default About;