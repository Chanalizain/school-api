// routes/auth.routes.js
import express from 'express';
import { register, login, authenticateToken, getUsers } from '../controllers/auth.controller.js'; 

const router = express.Router();

// Q1: Create POST /register route
router.post('/register', register);

// Q1: Create POST /login route
router.post('/login', login);

// Q2: Apply JWT Middleware to protect /users route
router.get('/users', authenticateToken, getUsers);

export default router;