import React, { useEffect, useState } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import BlogNav from '../components/BlogNav';
import MainBlogPostCard from '../components/MainBlogPostCard';

const BLOG_NAV_WIDTH = "25%"; // or use the same minWidth as BlogNav, e.g. "300px"

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
    <Box as="main" flex="1" p={4} bg={bg} color={text}>
      <BlogNav
        posts={posts}
        loading={loading}
        onSelectPost={handleSelectPost}
        selectedPostId={selectedPost?._id}
      />
      <Box ml={BLOG_NAV_WIDTH} transition="margin-left 0.3s">
        <MainBlogPostCard post={selectedPost} />
      </Box>
    </Box>
  );
};

export default Blog;