/*
The following code defines a Mongoose schema and model for a blog post.
It includes fields for the title, subtitle, content, author, and timestamps for creation and updates.

I also need to add functionality for comments, which will be a sub-document within the post schema.
*/

import { Schema, model } from 'mongoose';
// import Comment from './comment.model.js';
// import User from './user.model.js';

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100 // Limit the title length to 100 characters
    },
    subtitle: {
        type: String,
        required: false,
        trim: true,
        maxlength: 200 // Limit the subtitle length to 200 characters
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5000 // Limit the content length to 5000 characters
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model for likes
    }],
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});