const Book = require('../models/bookModel');

exports.addBook = async (req, res) => {
    const { title, genre, description, coverImageUrl } = req.body;
    
    if (!req.file) {
        return res.status(400).json({ msg: 'No PDF file uploaded or file type is incorrect (only PDF allowed).' });
    }
    
    const publicPdfPath = `/pdfs/${req.file.filename}`;

    try {
        if (!title || !genre) {
            return res.status(400).json({ msg: 'Please provide title and genre' });
        }

        const newBook = new Book({
            title,
            genre,
            description,
            coverImageUrl,
            pdfUrl: `http://localhost:5000${publicPdfPath}`, 
        });

        const book = await newBook.save();
        res.status(201).json(book);

    } catch (err) {
        console.error('Add Book Error:', err.message);
        if (err.name === 'ValidationError') {
             return res.status(400).json({ msg: err.message });
        }
        res.status(500).send('Server error');
    }
};

exports.getBooks = async (req, res) => {
    try {
        const query = {};
        if (req.query.genre) {
            query.genre = new RegExp(`^${req.query.genre}$`, 'i');
        }

        const books = await Book.find(query).sort({ addedAt: -1 }); 

        res.status(200).json(books);

    } catch (err) {
        console.error('Get Books Error:', err.message);
        res.status(500).send('Server error');
    }
};

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