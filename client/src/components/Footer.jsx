import React from 'react'
import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.100"
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