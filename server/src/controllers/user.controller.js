/*
Methods for managing user data in the application.
*/

import User from '../models/user.model.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}) || [];
        console.log('Users fetched successfully');
        res.status(200).json({success: true, data: users});
    } catch (error) {
        console.error('Error fetching users: ', error);
        res.status(500).json({success: false, message: 'Error fetching users', error: error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({success: false, message: 'Invalid user ID'});
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }
        console.log('User fetched successfully');
        res.status(200).json({success: true, data: user});
    } catch (error) {
        console.error('Error fetching user by ID: ', error);
        res.status(500).json({success: false, message: 'Error fetching userby ID', error: error.message});
    }
}

export const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { email, password, username, name, adminStatus } = req.body;
        const newUser = new User({ email, password, username, name, adminStatus });
        const savedUser = await newUser.save();
        console.log('User created successfully');
        res.status(201).json({ success: true, data: savedUser });
    } catch (error) {
        // Handle duplicate key error (e.g., unique email/username)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate field value',
                error: error.keyValue
            });
        }
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(error.errors).map(e => ({
                    msg: e.message,
                    param: e.path,
                    value: e.value
                }))
            });
        }
        // Other errors
        console.error('Error creating user: ', error);
        res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
    }
}

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({success: false, message: 'Invalid user ID'});
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, username, password, name, adminStatus, comments, visits } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            email,
            username,
            password,
            name,
            adminStatus,
            comments,
            visits
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({success: false, message: 'User not found'});
        }

        console.log('User updated successfully');
        res.status(200).json({success: true, data: updatedUser});
    } catch (error) {
        console.error('Error updating user: ', error);
        res.status(500).json({success: false, message: 'Error updating user', error: error.message});
    }
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({success: false, message: 'Invalid user ID'});
    }

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({success: false, message: 'User not found'});
        }
        console.log('User deleted successfully');
        res.status(200).json({success: true, message: 'User deleted successfully'});
    } catch (error) {
        console.error('Error deleting user: ', error);
        res.status(500).json({success: false, message: 'Error deleting user', error: error.message});
    }
}

export const updateUserVisits = async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({success: false, message: 'Invalid user ID'});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { $inc: { visits: 1 } }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({success: false, message: 'User not found'});
        }
        console.log('User visits updated successfully');
        res.status(200).json({success: true, data: updatedUser});
    } catch (error) {
        console.error('Error updating user visits: ', error);
        res.status(500).json({success: false, message: 'Error updating user visits', error: error.message});
    }
}