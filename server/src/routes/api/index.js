import express from 'express';

import userRoutes from './user.routes.js';
import postRoutes from './post.routes.js';
import commentRoutes from './comment.routes.js';
import projectRoutes from './project.routes.js';
import contactRoutes from './contact.routes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/projects', projectRoutes);
router.use('/contact', contactRoutes)

export default router;