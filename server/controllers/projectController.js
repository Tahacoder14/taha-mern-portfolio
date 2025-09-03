// server/controllers/projectController.js

const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({});
  res.json({ success: true, data: projects });
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
exports.createProject = asyncHandler(async (req, res) => {
  const { title, description, imageUrl, liveUrl, repoUrl, category } = req.body;
  const project = new Project({ title, description, imageUrl, liveUrl, repoUrl, category });
  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
exports.deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});