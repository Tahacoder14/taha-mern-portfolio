/**
 * @fileoverview authMiddleware.js
 * This file contains middleware functions for handling JWT authentication and authorization.
 * It includes a 'protect' middleware to verify tokens and an 'admin' middleware to check for admin roles.
 * It also exports robust, application-wide error handling middleware ('notFound' and 'errorHandler').
 */

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// =================================================================
//                      AUTHENTICATION & AUTHORIZATION
// =================================================================

/**
 * @desc    Middleware to protect routes by verifying a user's JWT.
 *          If the token is valid, it attaches the user's data (minus password) to the request object.
 * @access  Private
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for the token in the 'Authorization' header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGciOiJIUz...")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the ID embedded in the token and attach to request
      req.user = await User.findById(decoded.id).select('-password');
      
      return next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  // If no token is found at all
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

/**
 * @desc    Middleware to authorize admin users.
 *          This should be used AFTER the 'protect' middleware.
 * @access  Private/Admin
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 0) {
    next(); // User is an admin, proceed
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};


// =================================================================
//                      APPLICATION-WIDE ERROR HANDLING
// =================================================================

/**
 * @desc    Middleware to handle 404 Not Found errors for routes that don't exist.
 *          This should be placed after all other valid routes.
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the next middleware (errorHandler)
};

/**
 * @desc    A global error handler middleware that catches all errors.
 *          It provides a consistent JSON error response format.
 *          This should be the VERY LAST middleware used in the application.
 */
export const errorHandler = (err, req, res, next) => {
  // Sometimes an error comes in with a 200 status code, default it to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Specific check for Mongoose's 'CastError' (e.g., invalid ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Send a clean, structured JSON response
  res.status(statusCode).json({
    message: message,
    // Only show the stack trace in development mode for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};