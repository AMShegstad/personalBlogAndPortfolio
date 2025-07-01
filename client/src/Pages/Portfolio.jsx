import React, { useState, useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import PortfolioNav from '../components/PortfolioNav';
import ProjectCardMain from '../components/ProjectCardMain';
import { NavLink, Outlet } from "react-router-dom";
import { HStack, Link } from "@chakra-ui/react";

const projects = [
  { name: "StatTrick ", path: "Stattrick" },
  { name: "MoffatBay", path: "MoffatBay" },
  { name: "VirtualPEX", path: "VirtualPEX" },
];

const SIDEBAR_WIDTH = "250px"; // or whatever width your sidebar uses

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
    <Box flex="1" p={4} px={10} bg={bg} color={text} display="flex">
      <PortfolioNav
        projects={projects}
        loading={loading}
        onSelectProject={handleSelectProject}
        selectedProjectId={selectedProject?._id}
      />
      <Box transition="margin-left 0.3s" flex="1" display="flex" flexDirection="column">
        <ProjectCardMain project={selectedProject} />
      </Box>
    </Box>
  )
}

export default Portfolio