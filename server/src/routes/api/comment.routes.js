/*
This file defines routes for handling comments in a RESTful API.
*/
import express from 'express';
import { 
    getAllComments, 
    getAllCommentsForPost, 
    getAllCommentsForUser, 
    getCommentById, 
    createComment, 
    updateComment, 
    deleteComment 
} from '../../controllers/comment.controller.js';

const router = express.Router();

// Get all comments
router.get('/', getAllComments);
// Get all comments for a specific post
router.get('/post/:postId', getAllCommentsForPost);
// Get all comments for a specific user
router.get('/user/:userID', getAllCommentsForUser);
// Get a single comment by ID
router.get('/:id', getCommentById);
// Create a new comment
router.post('/', createComment);
// Update comment by ID
router.put('/:id', updateComment);
// Update comment by ID
router.delete('/:id', deleteComment);

export default router;