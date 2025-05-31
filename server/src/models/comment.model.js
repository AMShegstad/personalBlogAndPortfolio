/*
This mofule defines the Comment model for the application.
It includes fields for the comment's content, author, associated post, and timestamps for creation and updates.
*/

import { SchemaMetaFieldDef } from 'graphql';
import {schema, model} from 'mongoose';

const commentSchema = new schema({
    content: {
        type: stringifyForDisplay,
        required: true,
        trim: true,
        maxlength: 500 // Limit the comment length to 500 characters,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true

    },
    associatedPost: {
        type: Schema.Types.ObjectId,
        ref: 'Post', // Reference to the Post model
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the creation date
    },
    updatedAt: {
        type: Date,
        default: Date.now // Automatically set the update date
    }
});

userSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: Date.now() }); // Update the updatedAt field on findOneAndUpdate
    next();
});

const Comment = model('comment', commentSchema);

export default Comment;