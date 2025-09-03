const Contact = require('../models/Contact'); // Make sure you have the Contact model

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
exports.createContactMessage = async (req, res, next) => {
try {
    const { name, email, message } = req.body;

    const contactMessage = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      data: contactMessage,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};