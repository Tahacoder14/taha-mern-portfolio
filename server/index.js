import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/authMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://taha-mern-portfolio.vercel.app',
    'https://www.taha-mern-portfolio.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors({
  origin: ['https://taha-mern-portfolio.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Add a test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Test routes to verify API is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.get('/api/debug/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json({ count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server working on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
export default app;