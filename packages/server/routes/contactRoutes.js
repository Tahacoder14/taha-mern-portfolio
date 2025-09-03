// server/routes/contactRoutes.js

const express = require('express');
const { createContactMessage } = require('../controllers/contactController');
const router = express.Router();

// A placeholder route for now
// router.get('/', (req, res) => {
// res.send('Contact route is working');
// });
router.post('/', createContactMessage);
module.exports = router;