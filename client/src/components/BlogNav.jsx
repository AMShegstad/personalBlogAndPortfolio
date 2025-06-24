import { Box, Spinner, List, ListItem, Link, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const HEADER_HEIGHT = 80; // Adjust this value to match your Header's height in px

const BlogNav = ({ posts, loading, onSelectPost, selectedPostId }) => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white"); 

  return (
    <Box
      as="section"
      display="flex"
      flexDirection="column"
      minWidth={"25%"}
      maxWidth={"300px"}
      position="fixed"
      top={`250px`}
      left={0}
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
    </Box>
  );
};

export default BlogNav;
