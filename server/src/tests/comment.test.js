import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import commentRoutes from '../routes/api/comment.routes.js';
import Comment from '../models/comment.model.js';
import Post from '../models/post.model.js';
import postRoutes from '../routes/api/post.routes.js';
import { expect, it } from 'vitest';
import User from '../models/user.model.js';
import userRoutes from '../routes/api/user.routes.js';

let app, mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });
    
    app = express();
    app.use(express.json());
    app.use('/api/comments', commentRoutes);

    const postForComments = {
        title: 'Test Post for Comments',
        subtitle: 'This is a test post subtitle for comments.',
        content: 'This is the content of the test post for comments.',
    }

    await Post.create(postForComments);
    const testPost = await Post.findOne({ title: 'Test Post for Comments' });
    app.use((req, res, next) => {
        req.post = { _id: testPost._id }; // Mock post for testing
        next();
    });

    const userForComments = {
        email: 'testUser@test.com',
        password: 'testPassword',
        username: 'testUser',
        name: 'Text User',
        adminStatus: false,
    }
    await User.create(userForComments);
    const testUser = await User.findOne({ username: 'testUser' });
    app.use((req, next) => {
        req.user = { _id: testUser._id }; // Mock user for testing
        next();
    });
});

afterAll(async () => {
    Post.deleteMany({});
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Comment.deleteMany({});
});

describe('Comment API Tests', () => {
    // Testing getAllComments
    it('should return an empty array when no comments exist', async () => {
        const res = await request(app).get('/api/comments');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toEqual([]);
    }, 20000); // Increased timeout to 20 seconds

    it('should return a 200 status when fetching all comments', async () => {
        const newComment = {
            content: 'This is a test comment.',
        }
        newComment.author = req.user._id;
        const res = await request(app).get('/api/comments');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    // Testing getAllCommentsForUser
    it('should return a 400 error when trying to get comments for an invalid user ID', async () => {
        const invalidUserId = '123invalidUserId456';
        const res = await request(app).get(`/api/comments/user/${invalidUserId}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should return an empty array when no comments exist for a user', async () => {
        const validUserId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/api/comments/user/${validUserId}`);
        expect(res.statusCode).toBe(201);
        expect(res.body.data).toEqual([]);
    })

    // Testing getAllCommentsForPost
    it('should return a 200 status when fetching comments for a valid post ID', async () => {
        const newPost = {
            title: 'Test Post',
            subtitle: 'This is a test post subtitle.',
            content: 'This is the content of the test post.',
        }
        const createdPost = await Post.create(newPost);
        const validPostId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/api/comments/post/${validPostId}`)
    })

    // Testing getCommentById


    // Testing createComment
    it('should crate a comment successfully using the testPost ID', async () => {
        const newComment = {
            content: 'This is a test comment.'
        }
        newComment.author = req.user._id;
        newComment.associatedPost = testPost._id; // Use the test post ID
        const res = await request(app).post('/api/comments').send(newComment);
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('_id');
        expect(res.body.data.content).toBe(newComment.content);
        expect(res.body.data.associatedPost.toString()).toBe(testPost._id.toString());
    });


    // Testing updateComment


    // Testing deleteComment
})