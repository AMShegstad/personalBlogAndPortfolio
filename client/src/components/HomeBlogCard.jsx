import React from 'react'
import { Box, Image, useColorModeValue } from '@chakra-ui/react'
import profpic from '/assets/images/profpic3.JPG';

const HomeBlogCard = () => {
    const bg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box maxWidth="45%" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg={bg} boxShadow="md">
      <Image rounded="md" height="300px" src={profpic} alt="Portrait" borderRadius="sm" fit="cover"/>
      <Box fontWeight="bold" fontSize="xl" mb={2}>
        Most Recent Blog Post Title
      </Box>
      <Box>
        Blog Subtitle Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatem non vero! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni porro placeat accusamus sint voluptate omnis unde quia nihil ad optio dicta obcaecati aliquam qui a inventore, harum tenetur debitis ut!
      </Box>

    </Box>
  )
}

export default HomeBlogCard