import React, { useEffect, useState } from 'react';
import { Box, useColorModeValue, Flex } from '@chakra-ui/react';
import BlogNav from '../components/BlogNav';
import MainBlogPostCard from '../components/MainBlogPostCard';

const Blog = () => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white"); 

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data || []);
        setLoading(false);
        if (data.data && data.data.length > 0) setSelectedPost(data.data[0]);
      });
  }, []);

  const handleSelectPost = (post) => setSelectedPost(post);

  return (
    <Flex
      flex="1"
      p={4}
      px={10}
      bg={bg}
      color={text}
      display="flex"
      flexDirection={{ base: "column", md: "row" }} // column on mobile/tablet, row on desktop
      width="100%"
      minHeight="100vh"
    >
      <Box
        width={{ base: "100%", md: "25%", lg: "300px" }}
        mb={{ base: 4, md: 0 }}
        mr={{ base: 0, md: 4 }}
        zIndex={20}
      >
        <BlogNav
          posts={posts}
          loading={loading}
          onSelectPost={handleSelectPost}
          selectedPostId={selectedPost?._id}
        />
      </Box>
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        transition="margin-left 0.3s"
        width="100%"
      >
        <MainBlogPostCard post={selectedPost} />
      </Box>
    </Flex>
  );
};

export default Blog;