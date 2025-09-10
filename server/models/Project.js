// server/models/Project.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose; // Destructure Schema and model

const ProjectSchema = new Schema({
  title: { type: String, required: [true, 'Please add a title'], trim: true },
  description: { type: String, required: [true, 'Please add a description'] },
  imageUrl: { type: String, required: true },
  liveUrl: String,
  repoUrl: String,
  category: { type: String, required: [true, 'Please add a category'], enum: ['Website', 'AI Agentic', 'UI/UX'] },
  createdAt: { type: Date, default: Date.now },
});

export default model('Project', ProjectSchema);