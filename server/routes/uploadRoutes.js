/**
 * @fileoverview uploadRoutes.js
 * Defines the dedicated API endpoint for handling local image uploads using Multer.
 * This route is protected, saves the file to the server's '/uploads' directory,
 * and returns the public path to the saved file.
 */

import path from 'path'; // Node.js built-in path module
import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * --- Multer Storage Configuration ---
 * This tells Multer where and how to save the uploaded files.
 */
const storage = multer.diskStorage({
  // Set the destination directory where files will be saved.
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Saves files in a folder named 'uploads'
  },
  // Generate a unique filename to avoid naming conflicts.
  filename(req, file, cb) {
    // Creates a filename like: '2023-09-13T103000Z-image.png'
    const uniqueSuffix = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

/**
 * --- Multer File Filter ---
 * This function ensures that only image files are accepted.
 */
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only! (jpg, jpeg, png)'), false);
  }
}

// Initialize multer with the storage and file filter configurations.
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

/**
 * @route   POST /api/upload
 * @desc    Upload a single image file locally to the server.
 * @access  Private
 */
router.post(
  '/',
  protect, // Protect the route
  upload.single('image'), // Use multer to process the 'image' field
  (req, res) => {
    // If the upload is successful, `req.file` will contain the file info.
    if (!req.file) {
      res.status(400);
      throw new Error('No file uploaded or file type is incorrect.');
    }

    // Send back a success response with the public path to the file.
    // The path will look like '/uploads/image-1694601000000.png'
    res.status(201).json({
      message: 'Image uploaded successfully',
      imageUrl: `/${req.file.path.replace(/\\/g, "/")}`, // Format the path for web use
    });
  }
);

export default router;