/*
This file defines routes for handling comments in a RESTful API.
*/
import express from 'express';
import { getAllComments, getCommentById, createComment, updatecomment, deleteComment } from '../../controllers/comment.controller.js';

const router = express.Router();

// Get all comments
router.get('/', getAllComments);
// Get a single comment by ID
router.get('/:id', getCommentById);
// Create a new comment
router.post('/', createComment);
// Update comment by ID
router.put('/:id', updateComment);
// Update comment by ID
router.delete('/:id', deleteComment);

export default router;