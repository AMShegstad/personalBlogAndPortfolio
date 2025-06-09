import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'

const Portfolio = () => {

  const bg = useColorModeValue("gray.50", "gray.900");
  const text = useColorModeValue("gray.800", "gray.100");
  
  return (
    <Box bg={bg} color={text}>Portfolio</Box>
  )
}

export default Portfolio