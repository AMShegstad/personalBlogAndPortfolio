import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useColorModeValue } from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.cnos.css';

function BlogPostForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');

    const bg = useColorModeValue("gray.100", "gray.800");
    const text = useColorModeValue("gray.600", "white"); 

    const handleSubmit = (e) => {
        e.preventDefault();

        // sending HTML content to server
        const newPost = {
            title,
            subtitle,
            content, // content is in HTML format
        };

        onSubmit(newPost)
    }

    return (
        <Box as="form" onSubmit={handleSubmit} p={4} bg={bg} color={text} borderRadius="lg" boxShadow="md">
            <FormControl isRequired mb={4}>
                <FormLabel>Title</FormLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)}/>
            </FormControl>

            <FormControl isRequired mb={4}>
                <FormLabel>Subtitle</FormLabel>
                <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)}/>
            </FormControl>

            <FormControl isRequired mb={4}>
                <FormLabel>Content</FormLabel>
                <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Write your blog post content here..."
                />
            </FormControl>

            <Button type="submit" colorScheme="blue" mt={4}>
                Submit Post
            </Button>
        </Box>
    )
}

export default BlogPostForm;