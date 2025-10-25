const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a book title'],
        trim: true,
    },
    genre: {
        type: String,
        required: [true, 'Please add a genre'],
        enum: [ // Define allowed genres based on your frontend pages
            'Fiction', 'Mystery', 'Romance', 'Fantasy', 'Sci-Fi',
            'Drama', 'Comedy', 'Horror', // Add any others
        ],
        trim: true,
    },
    description: {
        type: String,
        required: false, // Optional
    },
    coverImageUrl: {
        type: String,
        required: false, // Optional - URL to a cover image
    },
    pdfUrl: {
        type: String,
        required: [true, 'Please add the URL/path to the PDF'],
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Book', BookSchema);