import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({});
  res.json({ success: true, data: projects });
});

export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) { res.json(project); } else { res.status(404); throw new Error('Project not found'); }
});

export const createProject = asyncHandler(async (req, res) => {
  const { title, description, imageUrl, liveUrl, repoUrl, category } = req.body;
  const project = new Project({ title, description, imageUrl, liveUrl, repoUrl, category });
  const createdProject = await project.save();
  res.status(201).json(createdProject);
});

export const updateProject = asyncHandler(async (req, res) => {
  // Add your update logic here
  res.json({ message: "Project updated" });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});