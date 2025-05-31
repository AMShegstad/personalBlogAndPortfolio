/*
Methods/functions for managing project data to be used in the application.

getAllProjects: fetches all projects from the database.
getProjectById: retrieves a specific project by its ID.
createProject: adds a new project to the database.
updateProject: modifies an existing project by its ID.
removeProject: deletes a project from the database by its ID.
*/

import Project from '../models/project.model.js';
import { validationResult } from 'express-validator';

//import { request, response} from 'express';
import Project from '../models/project.model.js';
import mongoose from 'mongoose';

export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        console.log('Projects fetched successfully');
        res.status(200).json({success: true, data: projects})
    } catch (error) {
        console.error('Error fetching projects: ', error);
        res.status(500).json({success: false, message: 'Error fetching projects', error: error.message});
    }
}

export const getProjectById = async (req, res) => {
    try{
        const projectId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(projectId)){
            return res.status(400).json({success: false, message: 'Invalid project ID'});
        }
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({success: false, message: 'Project not found'});
        }
    } catch (error) {
        console.error('Error fetching project by ID: ', error);
        res.status(500).json({success: false, message: 'Error fetching project by ID', error: error.message});
    }
}

export const createProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success: false, errors: errors.array()});
    }
    const { name, description, stack, imageURL, githubLink, liveLink } = req.body;
    try {
        const newProject = new Project({
            name,
            description,
            stack,
            imageURL,
            githubLink,
            liveLink
        })

        const savedProject = await newProject.save();
        console.log('Project created successfully');
        res.status(201).json({success: true, data:savedProject});
    } catch (error) {
        console.error('Error creating project: ', error);
        res.status(500).json({success: false, message: 'Error creating project', error: error.message});
    }
}

export const updateProject = async (req, res) => {
    const projectId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({success: false, message: 'Invalid project ID'});
    }
    const { name, description, stack, imageURL, githubLink, liveLink } = req.body;
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            projectId, { 
                name, 
                description, 
                stack, 
                imageURL, 
                githubLink, 
                liveLink 
            }, { new: true }
        );
        if (!updatedProject) {
            return res.status(404).json({success: false, message: 'Project not found'});
        }
        console.log('Project updated successfully');
        res.status(200).json({success: true, data: updatedProject});
    } catch (error) {
        console.error('Error updating project: ', error);
        res.status(500).json({success: false, message: 'Error updating project', error: error.message});
    }
}

export const removeProject = async (req, res) => {
    const projectId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({success: false, message: 'Invalid project ID'});
    }
    try {
        const deletedProject = await Project.findByIdAndDelete(projectId);
        if (!deletedProject) {
            return res.status(404).json({success: false, message: 'Project not found'});
        }
        console.log('Project deleted successfully');
        res.status(200).json({success: true, message: 'Project deleted successfully'});
    } catch (error) {
        console.error('Error deleting project: ', error);
        res.status(500).json({success: false, message: 'Error deleting project', error: error.message});
    }
}