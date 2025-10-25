const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile } = require('../controllers/authController'); 
const { protect } = require('../middleware/authMiddleware'); // Import our middleware

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe); 

router.put('/me', protect, updateProfile); 

module.exports = router;