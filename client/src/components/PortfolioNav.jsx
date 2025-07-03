import { Box, Spinner, List, ListItem, Link, useColorModeValue, HStack, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const HEADER_HEIGHT = 80; // Adjust this value to match your Header's height in px

const PortfolioNav = ({ projects, loading, onSelectProject, selectedProjectId }) => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white"); 
  const { isOpen, onToggle } = useDisclosure();

  // Desktop sidebar
  const desktopProjectNav = (
    <HStack
      as="section"
      display={{ base: "none", md: "flex" }}
      flexDirection="column"
      minWidth={"30%"}
      maxWidth={"300px"}
      height={`calc(100vh - ${HEADER_HEIGHT}px)`}
      overflowY="auto"
      zIndex={10}
      boxShadow="md"
      bg={bg}
      color={text}
    >
      <Box as="header" mb={4} p={4}>
        <h1>My Projects</h1>
      </Box>
      <Box as="ul" listStyleType="none" p={2} m={0} width="100%" maxHeight="80vh">
        {loading ? (
          <Spinner />
        ) : (
          <List spacing={2}>
            {projects.map((project) => (
              <ListItem key={project._id || project.path}>
                <Link 
                  as="button" 
                  variant="link"
                  onClick={() => onSelectProject(project)}
                  fontWeight={selectedProjectId === (project._id || project.path) ? "bold" : "normal"}
                  color={selectedProjectId === (project._id || project.path) ? "blue.500" : "inherit"}
                  width="100%"
                  textAlign="left"
                >
                  {project.name}
                </Link>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </HStack>
  )

  const mobileProjectNav = (
    <Box
      display={{ base: "block", md: "none" }}
      width="100%"
      mb={4}
      bg={bg}
      color={text}
      p={4}
      boxShadow="md"
      >
        <Button
          onClick={onToggle}
          width="100%"
          justifyContent="space-between"
          rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          variant="ghost"
          fontWeight="bold"
          fontSize="lg"
          p={4}
          borderRadius="md"
        >
          My Projects
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <Box as="ul" listStyleType="none" p={2} m={0} width="100%">
            {loading ? (
              <Spinner />
            ) : (
              <List spacing={2}>
                {projects.map((project) => (
                  <ListItem key={project._id || project.path}>
                    <Link 
                      as="button" 
                      variant="link"
                      onClick={() => onSelectProject(project)}
                      fontWeight={selectedProjectId === (project._id || project.path) ? "bold" : "normal"}
                      color={selectedProjectId === (project._id || project.path) ? "blue.500" : "inherit"}
                      width="100%"
                      textAlign="left"
                    >
                      {project.name}
                    </Link>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Collapse>
      </Box>
  )

  return (
    <>
      {desktopProjectNav}
      {mobileProjectNav}
    </>
  )
};

export default PortfolioNav;
