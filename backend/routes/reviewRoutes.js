const express = require('express');
const router = express.Router();
const { submitReview, getReviews } = require('../controllers/reviewController');
const multer = require('multer');
const path = require('path');

// --- 3A: Multer Setup for Review Photos ---
// 1. Define storage location: backend/public_reviews
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // You MUST create this directory: backend/public_reviews
        cb(null, path.join(__dirname, '../public_reviews'));
    },
    filename: function (req, file, cb) {
        // Standard naming convention: fieldname-timestamp.ext
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// 2. Initialize Multer handler
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size (e.g., 5MB)
    fileFilter: (req, file, cb) => {
        // Check file type: only allow images
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(null, false);
            cb(new Error('Only image files (JPEG, PNG, GIF) are allowed!')); 
        }
    }
});

// --- 3B: Define Routes ---
// @route   POST /api/reviews
// @desc    Submit review and handle photo upload
// Middleware: upload.single('reviewPhoto') MUST match the 'name' attribute in your HTML input
router.post('/', upload.single('reviewPhoto'), submitReview); 

// @route   GET /api/reviews
// @desc    Get all reviews
router.get('/', getReviews);

module.exports = router;