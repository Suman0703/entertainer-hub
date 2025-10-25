const Book = require('../models/bookModel');

// @desc    Add a new book
// @route   POST /api/books
// @access  Private 
exports.addBook = async (req, res) => {
    // File details are now in req.file, other fields are in req.body
    const { title, genre, description, coverImageUrl } = req.body;
    
    // Check if the file upload was successful
    if (!req.file) {
        return res.status(400).json({ msg: 'No PDF file uploaded or file type is incorrect (only PDF allowed).' });
    }
    
    // Construct the public URL path for the PDF
    // We configured the server to use '/pdfs' for the public_pdfs directory
    const publicPdfPath = `/pdfs/${req.file.filename}`;

    try {
        // Simple validation
        if (!title || !genre) {
            return res.status(400).json({ msg: 'Please provide title and genre' });
        }

        const newBook = new Book({
            title,
            genre,
            description,
            coverImageUrl,
            pdfUrl: `http://localhost:5000${publicPdfPath}`, // <-- UPDATED: Store the full public URL
        });

        const book = await newBook.save();
        res.status(201).json(book);

    } catch (err) {
        console.error('Add Book Error:', err.message);
        // Handle validation errors (e.g., invalid genre)
        if (err.name === 'ValidationError') {
             return res.status(400).json({ msg: err.message });
        }
        res.status(500).send('Server error');
    }
};

// @desc    Get books, optionally filtered by genre
// @route   GET /api/books
// @route   GET /api/books?genre=Fiction
// @access  Public
exports.getBooks = async (req, res) => {
    try {
        const query = {};
        if (req.query.genre) {
            // Case-insensitive genre search
            query.genre = new RegExp(`^${req.query.genre}$`, 'i');
        }

        const books = await Book.find(query).sort({ addedAt: -1 }); // Sort by newest first

        res.status(200).json(books);

    } catch (err) {
        console.error('Get Books Error:', err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get a single book by ID (optional, useful for detail pages)
// @route   GET /api/books/:id
// @access  Public
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        res.status(200).json(book);

    } catch (err) {
        console.error('Get Book By ID Error:', err.message);
        if (err.kind === 'ObjectId') {
             return res.status(404).json({ msg: 'Book not found' });
        }
        res.status(500).send('Server error');
    }
};
