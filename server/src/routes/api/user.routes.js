/* 
This file defines the routes for managing users in a RESTful API.
*/
import express from 'express';
import { body } from 'express-validator';

import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../controllers/user.controller.js';

const router = express.Router();

// Get all users
router.get('/', getAllUsers);
// Get a single user by ID
router.get('/:id', getUserById);
// Create a new user
router.post(
  '/',
  [
    body('email').isEmail().withMessage('Please enter a valid e-mail address'),
    body('password').notEmpty().withMessage('Password is required'),
    body('username').notEmpty().withMessage('Username is required')
  ],
  createUser
);
// Update user by ID
router.put('/:id', updateUser);
// Delete user by ID
router.delete('/:id', deleteUser);

export default router;
