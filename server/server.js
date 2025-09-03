// server/server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// --- Import All Necessary Route Files ---
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
// NOTE: The uploadRoutes file should be deleted and is not imported here.

dotenv.config();
connectDB();
const app = express();

// --- Core Middleware ---
app.use(cors());
// CRITICAL: Increase the limit to handle large Base64 strings from the image upload
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- Mount All Routers ---
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running successfully on port ${PORT}`));