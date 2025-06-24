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
import sanitizeHtml from 'sanitize-html';

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
        console.log('Post fetched successfully');
        res.status(200).json({success: true, data: selectedPost});
    } catch (error) {
        console.error('Error fetching post by ID: ', error);
    }
};

export const createPost = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success: false, errors: error.array() });
    }

    const { title, subtitle, content, author, comments, likes, views, createdAt, updatedAt } = req.body;

    // Sanitize the HTML content before saving
    const sanitizedContent = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'h1', 'h2', 'p' ]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: [ 'src', 'alt', 'title', 'width', 'height' ]
        }
    });

    try {
        const newPost = new Post({
            title,
            subtitle,
            content: sanitizedContent,
            author,
            comments,
            likes,
            views,
            createdAt,
            updatedAt
        });

        const savedPost = await newPost.save();
        console.log('Post created successfully');
        res.status(201).json({ success: true, data: savedPost });
    } catch (error) {
        console.error('Error creating post: ', error);
        res.status(500).json({ success: false, message: 'Error creating post', error: error.message });
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({success: false, message: 'Invalid post ID'});
    }

    const { title, subtitle, content, author, comments, likes, views, createdAt, updatedAt } = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, {
            title,
            subtitle,
            content,
            author,
            comments,
            likes,
            views,
            createdAt,
            updatedAt
        }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({success: false, message: 'Post not found'});
        }

        console.log('Post updated successfully');
        res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
        console.error('Error updating post: ', error);
        res.status(500).json({success: false, message: 'Error updating post', error: error.message});
    }
}

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({success: false, message: 'Invalid post ID'});
    }

    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({success: false, message: 'Post not found'});
        }
        console.log('Post deleted successfully');
        res.status(200).json({success: true, message: 'Post deleted successfully'});
    } catch (error) {
        console.error('Error deleting post: ', error);
        res.status(500).json({success: false, message: 'Error deleting post', error: error.message});
    }
}