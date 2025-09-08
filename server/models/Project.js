const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  liveUrl: String,
  repoUrl: String,
  category: { // <-- ADD THIS FIELD
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Website', 'AI Agentic', 'UI/UX'], // Predefined categories
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);