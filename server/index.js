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
connectDB();
let isConnected = false; // To prevent multiple connections in serverless environment
async function initDB() {
  try{
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');

  }
  catch(error){
    console.error('MongoDB connection error:', error);
  }
}

const app = express();

// =================================================================
//                         CORE MIDDLEWARE
// =================================================================

// Setup a professional CORS policy to allow requests from specific origins.
// This is a critical security feature for your live application.
const allowedOrigins = [
  'http://localhost:3000',                  // Your local React development server
  'https://taha-mern-portfolio-qu5j.vercel.app/',   // YOUR FINAL LIVE VERCEL URL
];

app.use((req, res, next) => {
  if (!isConnected) {
    initDB();
  }
  next();
});

const corsOptions = {
  origin: function (origin, callback) {
    // The `!origin` check allows tools like Postman and server-to-server requests.
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Configure Express to parse large JSON request bodies for image uploads.
app.use(express.json({ limit: '50mb' }));

// =================================================================
//                         MOUNT API ROUTES
// =================================================================

// A simple root endpoint for the API to confirm it's running when visited directly.
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Taha Portfolio API' });
});

// All application routes are mounted under the '/api' prefix.
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// =================================================================
//                      ERROR HANDLING MIDDLEWARE
// =================================================================
// These MUST be the last middleware functions used by the app.
app.use(notFound);   // Catches requests to non-existent API routes.
app.use(errorHandler); // Catches all other errors and sends a clean JSON response.


// =================================================================
//                      EXPORT FOR VERCEL
// =================================================================

// In a serverless environment like Vercel, you export the configured app.
// Vercel handles the HTTP server creation and listening for requests.
// The app.listen() call is NOT needed and will cause issues in production.
export default app;