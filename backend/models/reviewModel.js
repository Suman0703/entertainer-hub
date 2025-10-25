const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        // Assuming you might link this to a specific Book document later
        required: false, 
    },
    bookTitle: { // <-- New required field
        type: String,
        required: [true, 'The book title is required'],
        trim: true,
    },
    reviewerName: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
    },
    reviewerEmail: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    rating: {
        type: Number,
        required: [true, 'Please provide a star rating'],
        min: 1,
        max: 5,
    },
    reviewText: {
        type: String,
        required: [true, 'Review content cannot be empty'],
    },
    photoUrl: {
        type: String,
        required: false, // Optional
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

// CRITICAL: Mongoose.model compiles the schema into a reusable model constructor.
module.exports = mongoose.model('Review', ReviewSchema);