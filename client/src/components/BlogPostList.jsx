import { Box } from "@chakra-ui/react";
import React from "react";

const BlogPostList = () => {
  return (
    <Box as="section" display="flex" flexDirection="column" minWidth="25%" overflow="scroll">
      <Box as="header" mb={4}>
        <h1>My Blog Posts</h1>
      </Box>
      <Box as="ul" listStyleType="none" p={0} m={0} width="100%" maxHeight="80vh">
        {/* Example blog post items */}
        <Box as="li" mb={4}>
          <h3>Blog Post Title 1</h3>
          <p>Summary of the first blog post.</p>
        </Box>
        <Box as="li" mb={4}>
          <h3>Blog Post Title 2</h3>
          <p>Summary of the second blog post.</p>
        </Box>
        <Box as="li" mb={4}>
          <h3>Blog Post Title 2</h3>
          <p>Summary of the second blog post.</p>
        </Box>
        <Box as="li" mb={4}> 
          <h3>Blog Post Title 2</h3>
          <p>Summary of the second blog post.</p>
        </Box>
        <Box as="li" mb={4}>
          <h3>Blog Post Title 2</h3>
          <p>Summary of the second blog post.</p>
        </Box>
                <Box as="li" mb={4}>
          <h3>Blog Post Title 2</h3>
          <p>Summary of the second blog post.</p>
        </Box>
                <Box as="li" mb={4}>
          <h3>Blog Post Title 2</h3>
          <p>Summary of the second blog post.</p>
        </Box>
                <Box as="li" mb={4}>
          <h3>Blog Post Title 2</h3>
          <p>Summary of the second blog post.</p>
        </Box>
                <Box as="li" mb={4}>
          <h3>Blog Post Title 2</h3>
          <p>Summary of the second blog post.</p>
        </Box>
                <Box as="li" mb={4}>
          <h3>Blog Post Title 2</h3>
          <p>Summary of the second blog post.</p>
        </Box>
                <Box as="li" mb={4}>
          <h3>Blog Post Title 2</h3>
          <p>Summary of the second blog post.</p>
        </Box>
                <Box as="li" mb={4}>
          <h3>Blog Post Title 2</h3>
          <p>Summary of the second blog post.</p>
        </Box>
        {/* Add more blog posts as needed */}
      </Box>
    </Box>
  );
};

export default BlogPostList;
