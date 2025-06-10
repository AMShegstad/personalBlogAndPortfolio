// components/PostCarousel.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Image,
  Heading,
  Button,
  VStack,
  HStack,
  Skeleton,
  useColorModeValue,
} from '@chakra-ui/react';

export default function PostCarousel() {
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const bg = useColorModeValue('gray.100', 'gray.700');
  const text = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts/latest');
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const nextPost = () => {
    setIndex((prev) => (prev + 1) % posts.length);
  };

  const prevPost = () => {
    setIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const truncateWords = (str, numWords = 20) =>
    str.split(' ').slice(0, numWords).join(' ') + '...';

  if (loading) {
    return <Skeleton height="300px" />;
  }

  const post = posts[index];

  return (
    <Box bg={bg} p={6} borderRadius="lg" boxShadow="lg" maxW="600px" mx="auto">
      <VStack spacing={4} align="start">
        <Heading size="md" color={text}>{post.title}</Heading>
        {post.image && (
          <Image src={post.image} alt={post.title} borderRadius="md" />
        )}
        <Text color={text}>{truncateWords(post.content)}</Text>
        <HStack spacing={4} pt={2}>
          <Button onClick={prevPost} size="sm" variant="outline">
            Previous
          </Button>
          <Button onClick={nextPost} size="sm" variant="solid" colorScheme="blue">
            Next
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
