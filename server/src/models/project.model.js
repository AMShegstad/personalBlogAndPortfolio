/*
The following code defines a Mongoose schema and model for a portfolio project.
It includes fields for the project name, description, image URL, GitHub link, live demo link, and timestamps for creation and updates.
*/
import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100 // Limit the project name length to 100 characters
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500 // Limit the project description length to 500 characters
    },
    stack: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
                return v.length > 0; // Ensure at least one stack item is provided
            }
        }
    },
    imageURL: {
        type: String,
        required: false,
    },
    githubLink: {
        type: String,
        required: false,
        match: [/^https?:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/, 'Please enter a valid GitHub link']
    },
    liveLink: {
        type: String,
        required: false,
        match: [/^https?:\/\/[^\s/$.?#].[^\s]*$/, 'Please enter a valid URL']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    gitHubClicks: {
        type: Number,
        default: 0
    },
    liveLinkClicks: {
        type: Number,
        default: 0
    }
})

projectSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: Date.now() }); // Update the updatedAt field on findOneAndUpdate
    next();
});

const Project = model('Project', projectSchema);

export default Project;