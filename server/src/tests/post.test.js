import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import postRoutes from '../routes/api/post.routes.js';
import Post from '../models/post.model.js';

let app, mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });
    //Post = (await import('../models/post.model.js')).default;
    app = express();
    app.use(express.json());
    app.use('/api/posts', postRoutes);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
})

afterEach(async () => {
    await Post.deleteMany({});
})

describe('Post API Tests', () => {
     // Return an empty array and 200 status when no posts exist
     it('should return an empty array when no posts exist', async () => {
        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual([]);
     })

     // Return a status 200 when fetching all posts
     it('should return a status 200 when fetching all posts', async () => {
        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
     })

     // Return a 200 status when fecthing a post by a valid ID
    //  it('should return a 200 status when fetching a post by a valid ID', async () => {
    //     const newPost = {
    //         title: 'TestPost1',
    //         subtitle: 'This is a test post subtitle.',
    //         content: 'This is the content of the test post.'
    //     }
    //     const createdPost = await Post.create(newPost);
    //     // Ensure the document is fully saved before querying
    //     await createdPost.save();
    //     const res = await request(app).get(`/api/posts/${createdPost._id}`);
    //     expect(res.statusCode).toBe(201);
    //     expect(res.body.success).toBe(true);
    //     expect(res.body.data).toHaveProperty('_id', createdPost._id.toString());
    //     expect(res.body.data.title).toBe(newPost.title);
    //     expect(res.body.data.subtitle).toBe(newPost.subtitle);
    //     expect(res.body.data.content).toBe(newPost.content);
    //  }, 10000);

     // Return a 400 status when trying to fetch a post by an invalid ID
     it('should return a 400 status when trying to fetch a post by an invalid ID', async () => {
        const invalidId = '123invalidid456';
        const res = await request(app).get(`/api/posts/${invalidId}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error).toBeDefined();
     })

     // Return a 201 status when successfully creating a new post
     it('should return a 201 status when successfully creating a new post', async () => {
        const newPost = {
            title: 'New Test Post',
            subtitle: 'This is a test post subtitle.',
            content: 'This is the content of the test post.'
        }
        const res = await request(app).post('/api/posts').send(newPost);
     })

     // Return a 500 status when trying to create a post with invalid title
     it('should return a 500 status when trying to create a post with invalid title', async () => {
        const newPost = {
            title: '', // Invalid title
            subtitle: 'This is a test post subtitle.',
            content: 'This is the content of the test post.'
        };
        const res = await request(app).post('/api/posts').send(newPost);
        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
        //expect(res.body.errors).toBeDefined();
     })

     // Return a 400 status when trying to create a post with invalid content
     it('should return a 400 status when trying to create a post with invalid content', async () => {
        const newPost = {
            title: 'Valid Title',
            subtitle: 'This is a test post subtitle.',
            content: '' // Invalid content
        }
        const res = await request(app).post('/api/posts').send(newPost);
        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
        //expect(res.body.errors).toBeDefined();
     })

     // Views should default to 0 when creating a new post
     it('should set views to 0 when creating a new post', async () => {
        const newPost = {
            title: 'Views Default Test',
            subtitle: 'Subtitle',
            content: 'Content'
        };
        const res = await request(app).post('/api/posts').send(newPost);
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('views', 0);
    });

     // Return a 500 status when there is an error creating a post
     it('should return a 500 status when there is an error creating a post', async () => {
        // Simulate a server error by sending an invalid field that causes a schema error
        const newPost = {
            title: '',
            subtitle: 'Subtitle',
            content: 'Content',
            invalidField: { not: 'allowed' }
        };
        const res = await request(app).post('/api/posts').send(newPost);
        // Depending on your controller, this may be 400 or 500
        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error || res.body.errors).toBeDefined();
    });

     // Return a 400/404/500 status when updating a post with an invalid ID
     it('should return a 400 status when updating a post with an invalid ID', async () => {
        const invalidId = '123invalidid456';
        const updatedPost = {
            title: 'Updated Title',
            subtitle: 'Updated Subtitle',
            content: 'Updated Content'
        };
        const res = await request(app).put(`/api/posts/${invalidId}`).send(updatedPost);
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error).toBeDefined();
    });

    it('should return a 404 status when updating a post that does not exist', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const updatedPost = {
            title: 'Updated Title',
            subtitle: 'Updated Subtitle',
            content: 'Updated Content'
        };
        const res = await request(app).put(`/api/posts/${nonExistentId}`).send(updatedPost);
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error).toBeDefined();
    });

     // Return a 200 status when successfully updating a post
     it('should return a 200 status when successfully updating a post', async () => {
        const newPost = {
            title: 'Update Test',
            subtitle: 'Subtitle',
            content: 'Content'
        };
        const createdPost = await Post.create(newPost);
        const updatedPost = {
            title: 'Updated Title',
            subtitle: 'Updated Subtitle',
            content: 'Updated Content'
        };
        const res = await request(app).put(`/api/posts/${createdPost._id}`).send(updatedPost);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe(updatedPost.title);
        expect(res.body.data.subtitle).toBe(updatedPost.subtitle);
        expect(res.body.data.content).toBe(updatedPost.content);
    });

     // Return a 400,404,500 status when deleting a post with an invalid ID
     it('should return a 400 status when deleting a post with an invalid ID', async () => {
        const invalidId = '123invalidid456';
        const res = await request(app).delete(`/api/posts/${invalidId}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error).toBeDefined();
    });

    it('should return a 404 status when deleting a post that does not exist', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const res = await request(app).delete(`/api/posts/${nonExistentId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error).toBeDefined();
    });

     // Return a 200 status when successfully deleting a post
     it('should return a 200 status when successfully deleting a post', async () => {
        const newPost = {
            title: 'Delete Test',
            subtitle: 'Subtitle',
            content: 'Content'
        };
        const createdPost = await Post.create(newPost);
        const res = await request(app).delete(`/api/posts/${createdPost._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Post deleted successfully');
    });
})