import React, { useState, useEffect } from 'react';
import { Box, useColorModeValue, Flex } from '@chakra-ui/react';
import PortfolioNav from '../components/PortfolioNav';
import ProjectCardMain from '../components/ProjectCardMain';

const Portfolio = () => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white"); 

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data || []);
        setLoading(false);
        if (data.data && data.data.length > 0) setSelectedProject(data.data[0]);
      });
  }, []);

  const handleSelectProject = (project) => setSelectedProject(project);
  
  return (
    // <Box flex="1" p={4} px={10} bg={bg} color={text} display="flex">
    //   <PortfolioNav
    //     projects={projects}
    //     loading={loading}
    //     onSelectProject={handleSelectProject}
    //     selectedProjectId={selectedProject?._id}
    //   />
    //   <Box transition="margin-left 0.3s" flex="1" display="flex" flexDirection="column">
    //     <ProjectCardMain project={selectedProject} />
    //   </Box>
    // </Box>
    <Flex
      flex="1"
      p={4}
      px={10}
      bg={bg}
      color={text}
      display="flex"
      flexDirection={{base: "column", md: "row"}} // column on mobile/tablet, row on desktop
      width="100%"
      minHeight="100vh"
    >
      <Box
        width={{ base: "100%", md: "25%", lg: "300px" }}
        mb={{ base: 4, md: 0 }}
        mr={{ base: 0, md: 4 }}
        zIndex={20}
      >
        <PortfolioNav
          projects={projects}
          loading={loading}
          onSelectProject={handleSelectProject}
          selectedProjectId={selectedProject?._id}
        />
      </Box>
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        transition="margin-left 0.3s"
        width="100%"
        >
        <ProjectCardMain project={selectedProject} />
      </Box>
    </Flex>
  )
}

export default Portfolio