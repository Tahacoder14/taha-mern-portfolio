/**
 * @fileoverview index.js
 * The main entry point for the backend server application.
 * This file is architected to run as a Vercel Serverless Function.
 * It initializes the Express application, connects to MongoDB, sets up professional
 * CORS and error handling middleware, and mounts all API routes.
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// --- Import All Route Handlers ---
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

// --- Import Professional Error Handling Middleware ---
import { notFound, errorHandler } from './middleware/authMiddleware.js';
import { mongoose } from 'mongoose';

// Initialize configuration
dotenv.config();
const app = express();

// Connect to MongoDB once during initialization (not per request)
let isConnected = false;
if (!isConnected) {
  connectDB().then(() => {
    isConnected = true;
    console.log('MongoDB connected');
  }).catch((error) => {
    console.error('MongoDB connection error:', error);
  });
}

// =================================================================
//                         CORE MIDDLEWARE
// =================================================================

// Setup a professional CORS policy to allow requests from specific origins.
const allowedOrigins = [
  'https://taha-mern-portfolio-qu5j.vercel.app', // Remove trailing slash for exact match
  'http://localhost:3000',                       // Local development
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true, // Include if using cookies/auth tokens
};

app.use(cors(corsOptions));

// Configure Express to parse large JSON request bodies for image uploads.
app.use(express.json({ limit: '50mb' }));

// =================================================================
//                         MOUNT API ROUTES
// =================================================================

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Taha Portfolio API' });
});

app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// =================================================================
//                      ERROR HANDLING MIDDLEWARE
// =================================================================
app.use(notFound);
app.use(errorHandler);

// =================================================================
//                      EXPORT FOR VERCEL
// =================================================================
export default app;