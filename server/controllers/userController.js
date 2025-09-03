const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// =================================================================
//                      CONTROLLER FUNCTIONS
// =================================================================

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
exports.getUsers = asyncHandler(async (req, res) => {
  // Find all users in the database and exclude their passwords from the result
  const users = await User.find({}).select('-password');
  res.json(users);
});

/**
 * @desc    Delete a user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // A simple safety check to prevent an admin from deleting themselves
    if (user.role === 0) {
      res.status(400);
      throw new Error('Cannot delete an admin user.');
    }
    await user.deleteOne();
    res.json({ message: 'User removed successfully.' });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @desc    Update a user's role
 * @route   PUT /api/users/:id/role
 * @access  Private/Admin
 */
exports.updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // Toggle the user's role: if they are an admin (0), make them a user (1), and vice-versa
    user.role = user.role === 0 ? 1 : 0;
    
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});