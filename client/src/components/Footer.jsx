import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'

const Footer = () => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white"); 

  return (
    <Box
      as="footer"
      bg={bg}
      color={text}
      px={4}
      py={3}
      shadow="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="full"
    >
      <p style={{ color: 'gray.700' }}>
        © {new Date().getFullYear()} Alexander Shegstad. All rights reserved.
      </p>
    </Box>
  )
}

export default Footer