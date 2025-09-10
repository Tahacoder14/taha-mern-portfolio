import asyncHandler from 'express-async-handler';
import Contact from '../models/Contact.js';

export const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  const contactMessage = await Contact.create({ name, email, message });
  res.status(201).json({
    success: true,
    data: contactMessage,
  });
});