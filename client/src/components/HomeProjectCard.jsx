import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import nameAndLogo from '/assets/images/_nameAndLogo.png'; // Adjust the path as necessary

const HomeProjectCard = () => {
  return (
<Box maxWidth="45%" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="md">
      <Image rounded="md" height="300px" src={nameAndLogo} alt="Portrait" borderRadius="sm" fit="cover"/>
      <Box fontWeight="bold" fontSize="xl" mb={2}>
        Either Recent or Random Project
      </Box>
      <Box>
        Project Subtitle: Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatem non vero! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni porro placeat accusamus sint voluptate omnis unde quia nihil ad optio dicta obcaecati aliquam qui a inventore, harum tenetur debitis ut!
      </Box>

    </Box>
  )
}

export default HomeProjectCard