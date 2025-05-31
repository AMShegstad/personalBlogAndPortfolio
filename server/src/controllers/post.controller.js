/* 
Methods for handling post-related operations.

getAllPosts: Fetches all psots from the database.
getPostById: Retreives a specific post by its ID.
createPost: Adds a new post to the database.
updatePost: Modifies an existing post by its ID.
deletePost: Removes a post from the database by its ID.
*/

import Post from '../models/post.model.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

export const getAllPosts = async (req, res) => {
    try { 
        const posts = await Post.find({});
        console.log('Posts fetched successfully');
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error('Error fetching posts: ', error);
        res.status(500).json({success: false, message: 'Error fetching posts', error: error.message });
    }
}

export const getPostById = async (req, res) => {
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({success: false, message: 'Invalid post ID'});
    }
    try {
        const selectedPost = await Post.findById(postId);
        if (!selectedPost) {
            return res.status(404).json({success: false, message: 'Post not found'});
        }
    } catch (error) {
        console.error('Error fetching post by ID: ', error);
    }
};
