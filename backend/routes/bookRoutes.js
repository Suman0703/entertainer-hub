const express = require('express');
const router = express.Router();
const { addBook, getBooks, getBookById } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware'); 
const multer = require('multer'); 
const path = require('path');     

// Define storage location and file naming logic for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public_pdfs'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize Multer upload handler
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            cb(new Error('Only .pdf files are allowed!')); 
        }
    }
});

router.post('/', upload.single('bookPdf'), addBook); 

router.get('/', getBooks);

router.get('/:id', getBookById);

module.exports = router;
