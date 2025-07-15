// routes/user.routes.js
import express from 'express';
import { getUsers } from '../controllers/auth.controller.js';
import { authenticateToken } from '../controllers/auth.controller.js';

const router = express.Router();

// Protected route to get all users
router.get('/users', authenticateToken, getUsers);

export default router;
