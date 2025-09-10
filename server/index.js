/**
 * @fileoverview index.js
 * The main entry point for the backend server application.
 * Initializes Express, connects to MongoDB, sets up middleware,
 * mounts API routes, and implements global error handling.
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import all route handlers
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Import the new error handling middleware
import { notFound, errorHandler } from './middleware/authMiddleware.js';

// Initialize configuration
dotenv.config();
connectDB();

const app = express();

// =================================================================
//                         CORE MIDDLEWARE
// =================================================================

// Setup a specific CORS policy for better security
const corsOptions = {
  // Allow both your local dev server and your future live Vercel URL
  origin: [
    "http://localhost:3000",
    "https://taha-mern-portfolio.vercel.app/" // <-- ADD YOUR FINAL VERCEL URL HERE
  ],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Configure Express to parse JSON request bodies with a larger limit for image uploads
app.use(express.json({ limit: '50mb' }));

// =================================================================
//                         MOUNT API ROUTES
// =================================================================

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// =================================================================
//                      ERROR HANDLING MIDDLEWARE
// =================================================================
// These MUST be the last middleware that are used.
app.use(notFound);   // Catches requests to non-existent routes
app.use(errorHandler); // Catches all other errors

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running successfully on port ${PORT}`));