import { Box, useColorModeValue, Heading, Text, Link, Image, Stack } from '@chakra-ui/react'
import React from 'react'

const ProjectCardMain = ({ project }) => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white"); 

  if (!project) {
    return (
      <Box p={8}>
        <Text>Select a project to view details.</Text>
      </Box>
    );
  }

  return (
    <Box 
      bg={bg} 
      color={text} 
      flex="1" 
      p={4} 
      px={10} 
      display="flex" 
      flexDirection="column" 
      alignItems="center"
    >
      <Box 
        as="section" 
        p={4}
        bg={bg}
        color={text}
        borderRadius="md" 
        boxShadow="md"
        width="100%"
        maxWidth="600px"
      >
        <Stack spacing={4} align="center">
          {project.imageLink && (
            <Image 
              src={project.imageLink} 
              alt={project.name} 
              borderRadius="md" 
              maxH="300px" 
              objectFit="contain"
              mb={4}
            />
          )}
          <Heading as="h2" size="lg">{project.name}</Heading>
          <Text>{project.description}</Text>
          <Stack direction="row" spacing={4}>
            {project.githubLink && (
              <Link href={project.githubLink} color="blue.500" isExternal>
                GitHub
              </Link>
            )}
            {project.liveLink && (
              <Link href={project.liveLink} color="green.500" isExternal>
                Live Demo
              </Link>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export default ProjectCardMain