import { Box, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const ProjectCardMain = () => {

    const bg = useColorModeValue("gray.100", "gray.800");
    const text = useColorModeValue("gray.600", "white"); 

    // if (!project) {
    //   return (
    //     <Box p={8}>
    //       <p>Select a project to view details.</p>
    //     </Box>
    //   );
    // }

  return (
    <Box 
      bg={bg} 
      color={text} 
      flex="1" 
      p={4} 
      px={10} 
      display="flex" 
      flexDirection="column" 
      alignItems="center">
        <Box 
          as="section" 
          p={4} 
          bg="white" 
          borderRadius="md" 
          boxShadow="md">
        <h2>Project Details</h2>
        <p>This is where the project details will be displayed.</p>
      </Box>
    </Box>
  )
}

export default ProjectCardMain