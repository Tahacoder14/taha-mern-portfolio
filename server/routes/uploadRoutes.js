// server/routes/uploadRoutes.js

import express from 'express'; // Must have this import
const multer = import('multer');
const { storage } = import('../config/cloudinary'); // Critical: Imports Cloudinary storage config
const { protect } = import('../middleware/authMiddleware'); // Middleware to protect the route
const router = express.Router();

// Initialize multer with the Cloudinary storage engine.
// THIS IS THE MOST IMPORTANT PART.
const upload = multer({ storage: storage });

/**
 * @route   POST /api/upload
 * @desc    Upload an image to Cloudinary
 * @access  Private (Requires user to be logged in)
 */
router.post('/', protect, upload.single('image'), (req, res) => {
  // `upload.single('image')` middleware tries to process the upload.
  // If successful, the file info will be in `req.file`.

  // After the middleware, check if the file exists. If not, multer failed.
  if (!req.file) {
    res.status(400);
    throw new Error('File upload failed. Please check the file type and try again.');
  }

  // If the upload is successful, send back a 201 status and the secure URL
  res.status(201).json({
    message: 'Image uploaded successfully',
    imageUrl: req.file.path, // `req.file.path` contains the URL from Cloudinary
  });
});

export default router;