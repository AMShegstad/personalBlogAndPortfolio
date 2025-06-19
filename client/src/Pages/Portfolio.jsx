import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import ProjectNav from '../components/PortfolioNav';
import { NavLink, Outlet } from "react-router-dom";
import { HStack, Link } from "@chakra-ui/react";

const projects = [
  { name: "StatTrick ", path: "Stattrick" },
  { name: "MoffatBay", path: "MoffatBay" },
  { name: "VirtualPEX", path: "VirtualPEX" },
];

const Portfolio = () => {

  const bg = useColorModeValue("gray.50", "gray.900");
  const text = useColorModeValue("gray.800", "gray.100");
  
  return (
    <>
    <Box bg={bg} color={text} p={8}>
      <HStack spacing={6} mb={8} as="nav" justifyContent="center">
        {projects.map((proj) => (
          <Link
            as={NavLink}
            key={proj.path}
            to={proj.path}
            _activeLink={{ fontWeight: "bold", color: "blue.400" }}
          >
            {proj.name}
          </Link>
        ))}
      </HStack>
      <Box>
        <Outlet />
      </Box>
    </Box> 
    <ProjectNav />
    </>
  )
}

export default Portfolio