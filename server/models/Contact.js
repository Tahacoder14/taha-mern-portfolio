// server/models/Contact.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose; // Destructure Schema and model

const ContactSchema = new Schema({
  name: { type: String, required: [true, 'Please add a name'], trim: true },
  email: { type: String, required: [true, 'Please add an email'], match: [/^\S+@\S+$/i, 'Please add a valid email'] },
  message: { type: String, required: [true, 'Please add a message'] },
  createdAt: { type: Date, default: Date.now },
});

export default model('Contact', ContactSchema);