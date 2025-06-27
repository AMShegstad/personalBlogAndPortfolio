import apiRoutes from './api/index.js';
import { Router } from 'express';

const router = express.Router();

router.use('/api', apiRoutes);

export default router;