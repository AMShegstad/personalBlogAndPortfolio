import React from 'react';
import { Box, Text, HStack, Image, useColorModeValue } from '@chakra-ui/react';
import BlogPostList from '../components/BlogPostList';
import nameAndLogo from '/assets/images/_nameAndLogo.png';
import MainBlogPostCard from '../components/MainBlogPostCard';

const Blog = () => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white"); 

  return (
    <Box as="main" flex="1" p={4} bg={bg} color={text}>
      <HStack>
        <BlogPostList />
        <MainBlogPostCard />
      </HStack>
    </Box>
  )
}

export default Blog