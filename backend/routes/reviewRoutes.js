const express = require('express');
const router = express.Router();
const { submitReview, getReviews } = require('../controllers/reviewController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public_reviews'));
    },
    filename: function (req, file, cb) {
        
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// 2. Initialize Multer handler
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
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

router.post('/', upload.single('reviewPhoto'), submitReview); 

router.get('/', getReviews);

module.exports = router;