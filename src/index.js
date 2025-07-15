import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import express from 'express';
// Import your database instance
import db from './models/index.js'; // Assuming your models/index.js exports the db object

// Import your routes
import studentRoutes from './routes/student.routes.js';
import courseRoutes from './routes/course.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import authRoutes from './routes/auth.routes.js'; // Import your auth routes
import userRoutes from './routes/user.routes.js';

import { serveSwagger, setupSwagger } from './config/swagger.js';



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

// Swagger documentation setup
app.use('/docs', serveSwagger, setupSwagger);

// --- API Routes ---
// Mount your authentication routes
app.use('/auth', authRoutes); // Mount auth routes
app.use('/', userRoutes); // or app.use('/api', userRoutes);

// Mount other resource routes (if you have them and want to keep them)
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/teachers', teacherRoutes);
// app.use('/users', userRoutes); // Uncomment if you have a separate user routes file for profile management

// Root route
app.get('/', (req, res) => res.send('Welcome to School API!'));

// --- Database Synchronization and Server Start ---
// Function to connect to DB and start server
async function startServer() {
    try {
        // Authenticate the database connection
        await db.sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Synchronize all models with the database.
        // { force: false } means it will not drop tables if they exist.
        // Set to { force: true } ONLY FOR DEVELOPMENT if you want to drop and recreate tables on every server restart.
        // In production, use Sequelize Migrations for schema changes.
        await db.sequelize.sync({ force: false });
        console.log('All models were synchronized successfully (tables created/updated).');

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log(`Auth Register: POST http://localhost:${PORT}/auth/register`);
            console.log(`Auth Login: POST http://localhost:${PORT}/auth/login`);
            console.log(`Get Users (Protected): GET http://localhost:${PORT}/users`);
            console.log(`API Docs: http://localhost:${PORT}/docs`);
        });
    } catch (error) {
        console.error('Unable to connect to the database or start server:', error);
        process.exit(1); // Exit the process if database connection fails
    }
}

startServer();