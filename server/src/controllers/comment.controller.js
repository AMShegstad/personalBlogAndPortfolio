/*
Controller for handling comment-related operations.

getAllComments
getAllCommentsForPost
getCommentById
createComment
updateComment
deleteComment
*/

import Comment from '../models/comment.model.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({});
        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error('Error fetching comments: ', error);
        res.status(500).json({ success: false, message: 'Error fetching comments', error: error.message });
    }
}

export const getAllCommentsForUser = async (req, res) => {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }
    try {
        const comments = await Comment.find({ author: userId });
        // Always return 200 and an array, even if empty
        return res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error('Error fetching comments for user: ', error);
        res.status(500).json({ success: false, message: 'Error fetching comments for user', error: error.message });
    }
}

export const getAllCommentsForPost = async (req, res) => {
    const postId = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }
    try {
        const comments = await Comment.find({ associatedPost: postId });
        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error('Error fetching comment for post: ', error);
        res.status(500).json({ success: false, message: 'Error fetching comments for post', error: error.message });
    }
}

export const getCommentById = async (req, res) => {
    const commentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(400).json({success: false, message: 'Invalid comment ID'});
    }
    try {
        const comment = await Comment.findById(commentId).populate('author', 'username createdAt');
        if (!comment) {
            return res.status(404).json({success: false, message: 'Comment not found'});
        }
        res.status(200).json({success: true, data: comment});
    } catch (error) {
        console.error('Error fetching comment by ID: ', error);
        res.status(500).json({success: false, message: 'Error fetching comment by ID', error: error.message});
    }
}

export const createComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success: false, errors: errors.array()});
    }
    const { content, author, associatedPost, createdAt, updatedAt } = req.body;

    try {
        const newComment = new Comment({
            content,
            author,
            associatedPost,
            createdAt,
            updatedAt
        })

        const savedComment = await newComment.save();
        console.log('Comment create successfully');
        res.status(201).json({success: true, data: savedComment});
    } catch (error) {
        console.error('Error creating comment: ', error);
        res.status(500).json({success: false, message: 'Error creating comment', error: error.message});
    }
}

export const updateComment = async (req, res) => {
    const commentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(400).json({success: false, message: 'Invalid comment ID'});
    }
    const { content, author, associatedPost, createdAt, updatedAt } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, {
            content,
            author,
            associatedPost,
            createdAt,
            updatedAt
        }, { new: true });

        if (!updatedComment) {
            return res.status(404).json({success: false, message: 'Comment not found'});
        }
        console.log('Comment updated successfully');
        res.status(200).json({success: true, data: updatedComment});
    } catch (error) {
        console.error('Error updating comment: ', error);
        res.status(500).json({success: false, message: 'Error updating comment', error: error.message});
    }
}

export const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(400).json({success: false, message: 'Invalid comment ID'});
    }
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({success: false, message: 'Comment not found'});
        }
        console.log('Comment deleted successfully');
        res.status(200).json({success: true, message: 'Comment deleted successfully'});
    } catch (error) {
        console.error('Error deleting comment: ', error);
        res.status(500).json({success: false, message: 'Error deleting comment', error: error.message});
    }
}

// function isTokenExpired(token) {
//   try {
//     const decoded = jwtDecode(token);
//     if (!decoded.exp) return false;
//     return decoded.exp < Date.now() / 1000;
//   } catch (err) {
//     return false; // <--- Make sure this is false, not true
//   }
// }

