import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import projectRoutes from '../routes/api/project.routes.js';
import Project from '../models/project.model.js';

let app, mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });
    
    app = express();
    app.use(express.json());
    app.use('/api/projects', projectRoutes);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
})

afterEach(async () => {
    await Project.deleteMany({});
})

describe('Project API Tests', () => {
    // Return an empty array when no projects exist
    it('should return an empty array when no projects exist', async () => {
        const res = await request(app).get('/api/projects');
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual([]);
    });

    // Return a 404 error when trying to get a project by an invalid ID
    it('should return a 400 error when trying to get a project by an invalid ID', async () => {
        const invalidId = '123invalidid456';
        const res = await request(app).get(`/api/projects/${invalidId}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error).toBeDefined();
    });

    // Return a 201 status when successfully fetching a single project by ID.
    it('should return a 404 error when trying to get a project that does not exist', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/api/projects/${nonExistentId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error).toBeDefined();
    });

    // Return a 201 when successfully creating a new project
    it('should create a new project', async () => {
        const newProject = {
            name: 'CreateProject Test',
            description: 'This is a test project description.',
            stack: ['JavaScript', 'Node.js', 'Express'],
            imageURL: 'https://example.com/image.png',
            githubLink: 'https://github.com/testuser/testproject',
            liveLink: 'https://example.com/live-demo'
        };
        const res = await request(app).post('/api/projects').send(newProject);
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('_id');
        expect(res.body.data.name).toBe(newProject.name);
        expect(res.body.data.description).toBe(newProject.description);
    });

    // Return a 500 status when trying to create a project without a name.
    it('should return a 500 status when trying to create a project without a name', async () => {
        const newProject = {
            description: 'This is a test project description.',
            stack: ['JavaScript', 'Node.js', 'Express'],
            imageURL: 'https://example.com/image.png',
            githubLink: 'https://github.com/testuser/testproject',
            liveLink: 'https://example.com/live-demo'
        };
        const res = await request(app).post('/api/projects').send(newProject);
        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error).toBeDefined();
    });

    // Return a 500 status when trying to create a project withouth a description.
    it('should return a 500 status when trying to create a project without a description', async () => {
        const newProject = {
            name: 'Test Project 4',
            stack: ['JavaScript', 'Node.js', 'Express'],
            imageURL: 'https://example.com/image.png',
            githubLink: 'https://github.com/testuser/testproject',
        }
        const res = await request(app).post('/api/projects').send(newProject);
        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
    });

    // Return a 500 status when trying to create a project without a stack.
    it('should return a 500 status when trying to create a project without a stack', async () => {
        const newProject = {
            name: 'Test Project 5',
            description: 'This is a test project description.',
            imageURL: 'https://example.com/image.png',
            githubLink: 'https://github.com/testuser/testproject',
            liveLink: 'https://example.com/live-demo'
        };
        const res = await request(app).post('/api/projects').send(newProject);
        expect(res.statusCode).toBe(500);
        expect(res.body.success).toBe(false);
    })

    // Return a 200 status when successfully updating a project.
    it('should return a 200 status when successfully updating a project', async () => {
        const newProject = {
            name: 'Test Project 6',
            description: 'This is a test project description.',
            stack: ['JavaScript', 'Node.js', 'Express'],
            imageURL: 'https://example.com/image.png',
            githubLink: 'https://github.com/testuser/testproject',
            liveLink: 'https://example.com/live-demo'
        };
        const createdProject = await request(app).post('/api/projects').send(newProject);
        console.log('POST /api/projects response:', createdProject.body); // Debug log
        expect(createdProject.statusCode).toBe(201); // Ensure project was created
        expect(createdProject.body.data).toBeDefined(); // Ensure data exists
        const projectId = createdProject.body.data._id;

        const updatedProject = {
            name: 'Updated Test Project 6',
            description: 'This is an updated test project description.',
            stack: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
            imageURL: 'https://example.com/updated-image.png',
            githubLink: 'https://github.com/testuser/updated-testproject',
            liveLink: 'https://example.com/updated-live-demo'
        };
        const res = await request(app).put(`/api/projects/${projectId}`).send(updatedProject);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe(updatedProject.name);
    });

    // Return a 400 status when trying to update a project with an invalid ID.
    it('should return a 400 status when trying to update a project with an invalid ID', async () => {
        const invalidId = '123invalidId456';
        const updatedProject = {
            name: 'Updated Test Project',
            description: 'This is an updated test project description.',
            stack: ['JavaScript', 'Node.js', 'Express'],
            imageURL: 'http://example.com/updated-image.png',
            githubLink: 'github.com/testuser/updated-testproject',
            liveLink: 'http://example.com/updated-live-demo'
        };
        const res = await request(app).put(`/api/projects/${invalidId}`).send(updatedProject);
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error).toBeDefined();
    });

    // Return a 500 status when trying to update a project that does not exist.
    it('should return a 404 status when trying to update a project that does not exist', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const updatedProject = {
            name: 'Updated Test Project 2',
            description: 'This is an updated test project description.',
            stack: ['JavaScript', 'Node.js', 'Express'],
            imageURL: 'https://example.com/updated-image.png',
            githubLink: 'https://github.com/testuser/updated-testproject',
            liveLink: 'https://example.com/updated-live-demo'
        };
        const res = await request(app).put(`/api/projects/${nonExistentId}`).send(updatedProject);
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error).toBeDefined();
    })

    // Return a 200 status when successfully deleting a project. 
    it('should return a 200 status when successfully deleting a project', async () => {
        const newProject = {
            name: 'Test Project 7',
            description: 'This is a test project description.',
            stack: ['JavaScript', 'Node.js', 'Express'],
            imageURL: 'https://example.com/image.png',
            githubLink: 'https://github.com/testuser/testproject',
            liveLink: 'https://example.com/live-demo'
        };
        const createdProject = await request(app).post('/api/projects').send(newProject);
        const projectId = createdProject.body.data._id;

        const res = await request(app).delete(`/api/projects/${projectId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Project deleted successfully');
    });

    // Return a 400 status when trying to delete a project with an invalid ID.
    it('should return a 400 status when trying to delete a project with an invalid ID', async () => {
        const invalidId = '123invalidId456';
        const res = await request(app).delete(`/api/projects/${invalidId}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message || res.body.error).toBeDefined();
    });
});