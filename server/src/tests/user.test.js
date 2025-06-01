import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import userRoutes from '../routes/api/user.routes.js';
import User from '../models/user.model.js';

let app, mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });

    app = express();
    app.use(express.json());
    app.use('/api/users', userRoutes);
});

afterAll(async() => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User API Tests', () => {
    // Return an empty array when no users exist
    it('should return an empty array when no users exist', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual([]);
    });

    // Return a 404 error when trying to get a user by an invalid ID
    it('should return a 400 error when trying to get a user by an invalid ID', async () => {
        const invalidId = '123invalidid456';
        const res = await request(app).get(`/api/users/${invalidId}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error).toBeDefined();
    });
    
    // Return a 201 when successfully creating a new user
    it('should create a new user', async () => {
        const newUser = {
            email: 'testUser1@jest.test',
            password: 'testPassword123!',
            username: 'testUser1',
            name: 'Test User1',
            adminStatus: false
        };
        const res = await request(app).post('/api/users').send(newUser);
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('_id');
    });

    // Return a 400 error when trying to create a user with an invalid email
    it('should return a 400 error when trying to create a user with an invalid email', async () => {
        const newUser = {
            email: 'invalidEmail', // Invalid email
            password: 'testPassword123!',
            username: 'emailTestUser',
            name: 'Email Test User',
            adminStatus: false
        };
        const res = await request(app).post('/api/users').send(newUser);
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.errors).toBeDefined();
    });

    // Return a 400 error when trying to create a user with an invalid password
    it('should return a 400 error when trying to create a user with an invalid password', async () => {
        const newUser = {
            email: 'testUser2@jest.test',
            password: '', // Invalid password
            username: 'testUser2',
            name: 'Test User2',
            adminStatus: false
        }
        const res = await (request(app).post('/api/users').send(newUser));
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.errors).toBeDefined();
    });

    // Return a 400 error when trying to create a user with an invalid username
    it('should return a 400 error when trying to create a user with an invalid username', async () => {
         const newUser = {
            email: 'testUser3@jest.test',
            password: 'testPassword123!',
            username: '',
            name: 'Test User3',
            adminStatus: false
        }
        const res = await request(app).post('/api/users').send(newUser);
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.errors).toBeDefined();
    });

    // AdminStatus should default to false when not provided
    if('should default adminStatus to false when not provided', async () => {
        const newUser = {
            email: 'testUser4@jest.test',
            password: 'testPassword123!',
            username: 'testUser4',
            name: 'Test User4',
        };
        const res = await request(app).post('/api/users').send(newUser);
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.adminStatus).toBe(false);
    });

    // Visits count should default to 1 when not provided
    it('should default visits count to 1 when not provided', async () => {
        const newUser = {
            email: 'testUser5@jest.test',
            password: 'testPassword123!',
            username: 'testUser5',
            name: 'Test User5',
            adminStatus: false
        };
        const res = await request(app).post('/api/users').send(newUser);
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.visits).toBe(1);
    });

    // Return a 200 status when fetching a single user by ID
    it('should return a 200 status when successfully fetching a user by ID', async () => {
        const newUser = {
            email: 'testUser6@jest.test',
            password: 'testPassword123!',
            username: 'testUser6',
            name: 'Test User6',
            adminStatus: false
        };
        const createdUser = await request(app).post('/api/users').send(newUser);
        console.log('POST /api/users response:', createdUser.body); // Debug log
        expect(createdUser.statusCode).toBe(201); // Ensure user was created
        expect(createdUser.body.data).toBeDefined(); // Ensure data exists
        const userId = createdUser.body.data._id;
        const res = await request(app).get(`/api/users/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('_id', userId);
    });

    // // Return a 400 error when trying to fetch a user by an invalid ID
    // it('should return a 400 error when trying to fetch a user by an invalid ID', async () => {
    //     const invalidID = '123invalidID456';
    //     const res = await request(app).get(`/api/users/'${invalidID}`);
    //     expect(res.statusCode).toBe(400);
    //     expect(res.body.success).toBe(false);
    //     expect(res.body.message || res.body.error).toBeDefined();
    // });

    // Return a 200 status when successfully updating a user
    it('should return a 200 status when successfully updating a user', async () => {
        const unique = Date.now();
        const newUser = {
            email: `testUser${unique}@jest.test`,
            password: 'testPassword123!',
            username: `testUser${unique}`,
            name: 'Test User6',
            adminStatus: false
        };
        const createdUser = await request(app).post('/api/users').send(newUser);
        console.log('POST /api/users response:', createdUser.body); // Debug log
        expect(createdUser.statusCode).toBe(201);
        expect(createdUser.body.data).toBeDefined();
        const userId = createdUser.body.data._id;
        const updatedUser = {
            email: `updatedTestUser${unique}@jest.test`,
            password: 'testPassword123!',
            username: `updatedTestUser${unique}`,
            name: 'Updated Test User6',
            adminStatus: false
        };
        const res = await request(app).put(`/api/users/${userId}`).send(updatedUser);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.email).toBe(updatedUser.email);
        expect(res.body.data.username).toBe(updatedUser.username);
        expect(res.body.data.name).toBe(updatedUser.name);
    });

    // Return a 404 error when trying to update a user that does not exist
    it('should return a 404 error when trying to update a user that does not exist', async () => {
        const nonExistentUserId = new mongoose.Types.ObjectId();
        const updatedUser = {
            email: 'testUser7@jest.test',
            password: 'testPassword123!',
            username: 'testUser7',
            name: 'Test User7',
            adminStatus: false
        };
        const res = await request(app).put(`/api/users/${nonExistentUserId}`).send(updatedUser);
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error).toBeDefined();
    });

    // Return a 200 status when successfully deleting a user


    // Return a 400 status when trying to delete a user with an invalid ID
})