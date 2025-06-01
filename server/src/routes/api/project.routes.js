/* 
This file defines the routes for managing projects in a RESTful API.
*/
import express from 'express';

import { getAllProjects, getProjectById, createProject, updatedProject, deleteProject } from '../../controllers/project.controller.js';

const router = express.Router();

// Get all projects
router.get('/', getAllProjects);
// Get a single project by ID
router.get('/:id', getProjectById);
// Create a new project
router.post('/', createOroject);
// Update project by ID
router.put('/:id', updatedProject);
// Delete project by ID
router.delete('/:id', deleteProject);

export default router;
