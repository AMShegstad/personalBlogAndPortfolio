/* 
This file defines routes for handling blog posts in a RESTful API.
*/
import express from 'express';
// Import necessary modules
import { getAllPosts, getPostById, createPost, updatePost, deletePost} from '../../controllers/post.controller.js';

const router = express.Router();

// Get All Posts
router.get('/', getAllPosts);
// Get a single post by ID
router.get('/:id', getPostById);
// Create a new post
router.post('/', createPost);
// Update Post by ID
router.put('/:id', updatePost);
// Delete Post by ID
router.delete('/:id', deletePost);

export default router;