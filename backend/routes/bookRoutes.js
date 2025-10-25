const express = require('express');
const router = express.Router();
const { addBook, getBooks, getBookById } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware'); 
const multer = require('multer'); 
const path = require('path');     

// Define storage location and file naming logic for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Saves files to backend/public_pdfs
        cb(null, path.join(__dirname, '../public_pdfs'));
    },
    filename: function (req, file, cb) {
        // Creates a unique file name: fieldname-timestamp.ext (e.g., pdf-1700000000000.pdf)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize Multer upload handler
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size (e.g., 10MB)
    fileFilter: (req, file, cb) => {
        // Check file type: only allow PDF files
        if (file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            // Pass an Error object for consistent error handling
            cb(new Error('Only .pdf files are allowed!')); 
        }
    }
});

// @route   POST /api/books
// @desc    Add a new book, handles file upload via Multer middleware
// @access  Private 
router.post('/', upload.single('bookPdf'), addBook); 

// @route   GET /api/books
// @desc    Get all books or filter by genre (e.g., /api/books?genre=Fiction)
// @access  Public
router.get('/', getBooks);

// @route   GET /api/books/:id
// @desc    Get a single book by its ID
// @access  Public
router.get('/:id', getBookById);

module.exports = router;
