/*
This mofule defines the Comment model for the application.
It includes fields for the comment's content, author, associated post, and timestamps for creation and updates.
*/

//import { SchemaMetaFieldDef } from 'graphql';
import { Schema, model} from 'mongoose';

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
         // Limit the comment length to 500 characters,
            },
            author: {
                type: Schema.Types.ObjectId,
                ref: 'User', // Reference to the User model
                required: true,
                // The default cannot be set here, as it depends on the authenticated user.
                // Set the author field in your controller/service when creating a comment, e.g.:
                // comment.author = req.user._id;
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

commentSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: Date.now() }); // Update the updatedAt field on findOneAndUpdate
    next();
});

const Comment = model('comment', commentSchema);

export default Comment;