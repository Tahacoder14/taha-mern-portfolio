import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Route handlers
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Middleware
import { notFound, errorHandler } from './middleware/authMiddleware.js';

dotenv.config();
connectDB();

const app = express();

// CORS configuration for both local development and production
const allowedOrigins = [
  'http://localhost:3000',
  'https://taha-mern-portfolio-qu5j.vercel.app', // Your production frontend URL
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// Body parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// --- SERVER LISTENING LOGIC ---
const PORT = process.env.PORT || 5000;

// This check prevents the app from trying to listen twice on Vercel
if (process.env.NODE_ENV !== 'test') { // A common check to avoid issues
  app.listen(PORT, () => console.log(`Server running successfully on port ${PORT}`));
}

// Export the app for Vercel
export default app;