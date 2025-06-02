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

let app, mongoServer, testPost, testUser;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });

    // Create test data
    const postForComments = {
        title: 'Test Post for Comments',
        subtitle: 'This is a test post subtitle for comments.',
        content: 'This is the content of the test post for comments.',
    };
    testPost = await Post.create(postForComments);

    const userForComments = {
        email: 'testUser@test.com',
        password: 'testPassword',
        username: 'testUser',
        name: 'Test User',
        adminStatus: false,
    };
    testUser = await User.create(userForComments);

    // Setup app and middleware BEFORE routes
    app = express();
    app.use(express.json());

    // Middleware to mock user and post for every request
    app.use((req, res, next) => {
        req.user = { _id: testUser._id };
        req.post = { _id: testPost._id };
        next();
    });

    // Mount routes after middleware
    app.use('/api/comments', commentRoutes);
});

afterAll(async () => {
    await Post.deleteMany({});
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Comment.deleteMany({});
});

describe('Comment API Tests', () => {
    it('should return the _id of the test post and of the test user', async () => {
        expect(testPost).toBeDefined();
        expect(testPost._id).toBeDefined();
        expect(testUser).toBeDefined();
        expect(testUser._id).toBeDefined();
    })
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
            author: testUser._id,
            associatedPost: testPost._id,
        };
        savedComment = await Comment.create(newComment);
        const res = await request(app).get('/api/comments');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].content).toBe(savedComment.content);
    });

    // Testing getAllCommentsForUser
    it('should return a 400 error when trying to get comments for an invalid user ID', async () => {
        const invalidUserId = '123invalidUserId456';
        const res = await request(app).get(`/api/comments/user/${invalidUserId}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should return an empty array when no comments exist for a user', async () => {
        const newComment = {
            content: 'This is a test comment.',
            author: testUser._id,
            associatedPost: testPost._id,
        };
        const savedComment = await Comment.create(newComment); // <-- add const
        const validUserId = testUser._id; // Use the test user ID
        const res = await request(app).get(`/api/comments/user/${validUserId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual([]);
    })

    // Testing getAllCommentsForPost
    it('should return a 200 status when fetching comments for a valid post ID', async () => {
        const newComment = {
            content: 'This is a test comment for the post.',
            author: testUser._id,
            associatedPost: testPost._id,
        };
        await Comment.create(newComment);
        const validPostId = testPost._id;
        const res = await request(app).get(`/api/comments/post/${validPostId}`)
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].content).toBe(newComment.content);
    })

    // Testing getCommentById
    it('should return a 200 status and the correct comment when fetching by valid comment ID', async () => {
        const newComment = {
            content: 'Fetching by ID test comment.',
            author: testUser._id,
            associatedPost: testPost._id,
        };
        const created = await Comment.create(newComment);
        const res = await request(app).get(`/api/comments/${created._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('_id', created._id.toString());
        expect(res.body.data.content).toBe(newComment.content);
    });

    it('should return a 400 error when fetching a comment by an invalid ID', async () => {
        const invalidId = '123invalidId456';
        const res = await request(app).get(`/api/comments/${invalidId}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should return a 404 error when fetching a comment by a non-existent ID', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/api/comments/${nonExistentId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });

    // Testing createComment
    it('should create a comment successfully using the testPost ID', async () => {
        const newComment = {
            content: 'This is a test comment.',
            author: testUser._id,
            associatedPost: testPost._id,
        };
        const res = await request(app).post('/api/comments').send(newComment);
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('_id');
        expect(res.body.data.content).toBe(newComment.content);
        expect(res.body.data.associatedPost.toString()).toBe(testPost._id.toString());
    });


    // Testing updateComment
    it('should update a comment successfully', async () => {
        const comment = await Comment.create({
            content: 'Original content',
            author: testUser._id,
            associatedPost: testPost._id,
        });
        const updatedContent = { content: 'Updated content' };
        const res = await request(app)
            .put(`/api/comments/${comment._id}`)
            .send(updatedContent);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.content).toBe(updatedContent.content);
    });

    it('should return a 400 error when updating a comment with an invalid ID', async () => {
        const res = await request(app)
            .put('/api/comments/invalidid123')
            .send({ content: 'Should not work' });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should return a 404 error when updating a non-existent comment', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const res = await request(app)
            .put(`/api/comments/${nonExistentId}`)
            .send({ content: 'Should not work' });
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });

    // Testing deleteComment
    it('should delete a comment successfully', async () => {
        const comment = await Comment.create({
            content: 'To be deleted',
            author: testUser._id,
            associatedPost: testPost._id,
        });
        const res = await request(app).delete(`/api/comments/${comment._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toMatch(/deleted/i);
    });

    it('should return a 400 error when deleting a comment with an invalid ID', async () => {
        const res = await request(app).delete('/api/comments/invalidid123');
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should return a 404 error when deleting a non-existent comment', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const res = await request(app).delete(`/api/comments/${nonExistentId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });

    // it('should return a 200 status when fetching all comments', async () => {
//     const newComment = {
//         content: 'This is a test comment.',
//         author: testUser._id,
//         associatedPost: testPost._id,
//     };
//     const savedComment = await Comment.create(newComment); // <-- add const
//     const res = await request(app).get('/api/comments');
//     expect(res.statusCode).toBe(200);
//     expect(res.body.success).toBe(true);
//     expect(Array.isArray(res.body.data)).toBe(true);
//     expect(res.body.data.length).toBe(1);
//     expect(res.body.data[0].content).toBe(savedComment.content);
// });
})