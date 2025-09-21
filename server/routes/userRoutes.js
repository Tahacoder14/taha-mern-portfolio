// server/routes/userRoutes.js

// STEP 1: Import the entire 'express' library
import express from 'express';

// STEP 2: Import the controller and middleware functions, ensuring the .js extension is present
import { getUsers, deleteUser, updateUserRole } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// STEP 3: Create the router object by calling the Router() method ON the express object
const router = express.Router();

// --- API ROUTES ---

// GET /api/users
router.route('/').get(protect, admin, getUsers);

// DELETE /api/users/:id
router.route('/:id').delete(protect, admin, deleteUser);

// PUT /api/users/:id/role
router.route('/:id/role').put(protect, admin, updateUserRole);

router.get('/users', (req, res) => {
  console.log('Fetching users for user:', req.user); // Debug logged user from JWT
  // Replace with MongoDB query
    res.json([{ _id: '1', email: 'test@example.com' }]);
});
// STEP 4: Export the router as the default export
export default router;