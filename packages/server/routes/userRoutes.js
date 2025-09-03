const express = require('express');
const router = express.Router();

// Import controller functions for user logic
const {
  getUsers,
  deleteUser,
  updateUserRole,
} = require('../controllers/userController');

// Import middleware for route protection and role checking
const { protect, admin } = require('../middleware/authMiddleware');

// =================================================================
//                            API ROUTES
// =================================================================

/**
 * @route   GET /api/users
 * @desc    Get all users from the database.
 * @access  Private/Admin
 *
 * This route is protected by two middleware functions:
 * 1. `protect`: Ensures the user is logged in (has a valid token).
 * 2. `admin`: Ensures the logged-in user has an admin role (role: 0).
 */
router.route('/').get(protect, admin, getUsers);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a specific user by their unique ID.
 * @access  Private/Admin
 *
 * This route is also protected by the `protect` and `admin` middleware.
 */
router.route('/:id').delete(protect, admin, deleteUser);
router.route('/:id/role').put(protect, admin, updateUserRole);


module.exports = router;