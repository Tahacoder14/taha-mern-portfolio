import express from 'express';
import { getProjects, createProject, deleteProject, getProjectById, updateProject } from '../controllers/projectController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProjects).post(protect, admin, createProject);
router.route('/:id').get(getProjectById).put(protect, admin, updateProject).delete(protect, admin, deleteProject);
router.get('/projects', (req, res) => {
  console.log('Fetching projects for user:', req.user); // Debug logged user from JWT
  // Replace with MongoDB query
  res.json({ data: [{ _id: '1', title: 'Test Project' }] });
});

export default router;