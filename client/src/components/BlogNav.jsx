import { 
  Box, Spinner, List, ListItem, Link, useColorModeValue, HStack, VStack, Collapse, Button, useDisclosure, Text 
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import React from "react";

const HEADER_HEIGHT = 80; // Adjust this value to match your Header's height in px

const BlogNav = ({ posts, loading, onSelectPost, selectedPostId }) => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white"); 
  const { isOpen, onToggle } = useDisclosure();

  // Desktop sidebar
  const desktopNav = (
    <HStack
      as="section"
      display={{ base: "none", md: "flex" }}
      flexDirection="column"
      minWidth={"25%"}
      maxWidth={"300px"}
      height={`calc(100vh - ${HEADER_HEIGHT}px)`}
      overflowY="auto"
      zIndex={10}
      boxShadow="md"
      bg={bg}
      color={text}
    >
      <Box as="header" mb={4} p={4}>
        <h1>My Blog Posts</h1>
      </Box>
      <Box as="ul" listStyleType="none" p={2} m={0} width="100%" maxHeight="80vh">
        {loading ? (
          <Spinner />
        ) : (
          <List spacing={2}>
            {posts.map((post) => (
              <ListItem key={post._id}>
                <Link 
                  as="button" 
                  variant="link"
                  onClick={() => onSelectPost(post)}
                  fontWeight={selectedPostId === post._id ? "bold" : "normal"}
                  color={selectedPostId === post._id ? "blue.500" : "inherit"}
                  width="100%"
                  textAlign="left"
                >
                  {post.title}
                </Link>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </HStack>
  );

  // Mobile/tablet dropdown
  const mobileNav = (
    <Box
      display={{ base: "block", md: "none" }}
      width="100%"
      mb={4}
      bg={bg}
      color={text}
      boxShadow="md"
      borderRadius="md"
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
        My Blog Posts
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box as="ul" listStyleType="none" p={2} m={0} width="100%">
          {loading ? (
            <Spinner />
          ) : (
            <List spacing={2}>
              {posts.map((post) => (
                <ListItem key={post._id}>
                  <Link 
                    as="button" 
                    variant="link"
                    onClick={() => {
                      onSelectPost(post);
                      onToggle(); // Optionally close dropdown after selection
                    }}
                    fontWeight={selectedPostId === post._id ? "bold" : "normal"}
                    color={selectedPostId === post._id ? "blue.500" : "inherit"}
                    width="100%"
                    textAlign="left"
                  >
                    {post.title}
                  </Link>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Collapse>
    </Box>
  );

  return (
    <>
      {mobileNav}
      {desktopNav}
    </>
  );
};

export default BlogNav;
