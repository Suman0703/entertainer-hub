const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile } = require('../controllers/authController'); // Add updateProfile
const { protect } = require('../middleware/authMiddleware'); // Import our middleware

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
// GET /api/auth/me - Get current logged in user's profile
router.get('/me', protect, getMe); // 'protect' runs before 'getMe'

// PUT /api/auth/me - Update current logged in user's profile
router.put('/me', protect, updateProfile); // 'protect' runs before 'updateProfile'

module.exports = router;