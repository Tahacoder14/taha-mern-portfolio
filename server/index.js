/**
 * @fileoverview index.js
 * The main entry point for the backend server application.
 * This version is specifically configured for the 'Multer-only' strategy,
 * where images are uploaded directly to the server's filesystem.
 */

import path from 'path'; // The built-in Node.js 'path' module is required for this setup.
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// --- Import All Route Handlers ---
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'; // The Multer upload route

// --- Import Error Handling Middleware ---
import { notFound, errorHandler } from './middleware/authMiddleware.js';

// Initialize configuration
dotenv.config();
connectDB();

const app = express();

// =================================================================
//                         CORE MIDDLEWARE
// =================================================================

// Setup a professional CORS policy to allow requests from specific origins
const allowedOrigins = [
  'http://localhost:3000',                // YOUR LOCAL REACT DEV SERVER
  'https://taha-mern-portfolio-qu5j.vercel.app/',   // YOUR FINAL LIVE VERCEL URL
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// JSON parsing middleware for handling request bodies
app.use(express.json());


// =================================================================
//                 STATIC FOLDER CONFIGURATION (CRITICAL)
// =================================================================

// This is the key part for the Multer setup. It makes the 'uploads' folder
// accessible to the public, so browsers can request and display the images.
const __dirname = path.resolve(); // This gets the absolute path of your project's root directory.
app.use('/uploads', express.static(path.join(__dirname, 'server/uploads')));


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
app.use('/api/upload', uploadRoutes);


// =================================================================
//                      ERROR HANDLING MIDDLEWARE
// =================================================================
// These must be the last middleware functions that are used by the app.
app.use(notFound);   // Catches requests to non-existent routes
app.use(errorHandler); // Catches all other errors and sends a clean JSON response

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running successfully on port ${PORT}`));