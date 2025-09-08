// server/routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const { getProjects, createProject, deleteProject } = require('../controllers/projectController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route to get projects
router.route('/').get(getProjects);

// Admin-only routes to create and delete projects
router.route('/').post(protect, admin, createProject);
router.route('/:id').delete(protect, admin, deleteProject);

module.exports = router;