import React from "react";
import { Box, Heading, Text, Image, useColorModeValue } from "@chakra-ui/react";
import nameAndLogo from "/assets/images/_nameAndLogo.png";

const MainBlogPostCard = ({ post }) => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const text = useColorModeValue("gray.600", "white");

  if (!post) {
    return (
      <Box p={8}>
        <Text>Select a post to view details.</Text>
      </Box>
    );
  }

  return (
    <Box
      as="section"
      p={4}
      borderRadius="md"
      boxShadow="md"
      width="100%"
      bg={bg}
      color={text}
    >
      <Text
        fontSize={{ base: "md", md: "lg", lg: "lg" }}
        fontWeight="bold"
        mb={4}
      >
        Selected Blog Post
      </Text>
      <Image
        src={nameAndLogo}
        alt=""
        height="300px"
        float="left"
        marginRight={5}
        borderRadius="lg"
      />
      <Heading mb={4}>{post.title}</Heading>
      <Box 
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: post.content }}
      fontSize={{ base: "sm", md: "md", lg: "md"}}
      ></Box>
      {/* Add more post details as needed */}
    </Box>
  );
};

export default MainBlogPostCard;