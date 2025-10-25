const Review = require('../models/reviewModel'); // CRITICAL: Check this relative path!

// @desc    Submit a new book review
// @route   POST /api/reviews
// @access  Public 
exports.submitReview = async (req, res) => {
    // ADDED bookTitle to destructuring
    const { reviewerName, reviewerEmail, rating, reviewText, bookTitle } = req.body;
    
    try {
        // Simple Captcha Check (17 + 43 = 60, as per your frontend)
        const captchaInput = parseInt(req.body.captchaInput);
        if (captchaInput !== 60) {
            return res.status(400).json({ msg: 'CAPTCHA validation failed.' });
        }

        // Basic Check for required fields
        if (!bookTitle || !reviewerName || !reviewerEmail || !rating || !reviewText) {
             return res.status(400).json({ msg: 'Missing required fields: Book Title, Name, Email, Rating, and Review.' });
        }

        // Determine photo URL if a file was uploaded by Multer
        let photoUrl = null;
        if (req.file) {
            // Construct the public URL path for the photo
            // Assuming the server runs on port 5000 and serves static files from /reviews
            photoUrl = `http://localhost:5000/reviews/${req.file.filename}`;
        }
        
        // CRITICAL: New instance of the Review Model
        const newReview = new Review({
            bookTitle, // <-- Added
            reviewerName,
            reviewerEmail,
            rating: parseInt(rating),
            reviewText,
            photoUrl: photoUrl,
        });

        const review = await newReview.save();
        res.status(201).json({ msg: 'Review submitted successfully!', review });

    } catch (err) {
        console.error('Submit Review Error:', err.message);
        // Handle MongoDB/Validation errors
        if (err.name === 'ValidationError') {
             const messages = Object.values(err.errors).map(val => val.message);
             return res.status(400).json({ msg: messages.join(', ') });
        }
        res.status(500).send('Server error');
    }
};

// @desc    Get all reviews for a book/site (Optional)
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res) => {
    try {
        // CRITICAL: Mongoose static method used on the Review Model
        const reviews = await Review.find().sort({ submittedAt: -1 });
        res.status(200).json(reviews);
    } catch (err) {
        console.error('Get Reviews Error:', err.message);
        res.status(500).send('Server error');
    }
};