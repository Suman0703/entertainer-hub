const Review = require('../models/reviewModel');

exports.submitReview = async (req, res) => {
    const { reviewerName, reviewerEmail, rating, reviewText, bookTitle } = req.body;
    
    try {
        const captchaInput = parseInt(req.body.captchaInput);
        if (captchaInput !== 60) {
            return res.status(400).json({ msg: 'CAPTCHA validation failed.' });
        }

        if (!bookTitle || !reviewerName || !reviewerEmail || !rating || !reviewText) {
             return res.status(400).json({ msg: 'Missing required fields: Book Title, Name, Email, Rating, and Review.' });
        }

        let photoUrl = null;
        if (req.file) {
            photoUrl = `http://localhost:5000/reviews/${req.file.filename}`;
        }
        
        const newReview = new Review({
            bookTitle,
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
        if (err.name === 'ValidationError') {
             const messages = Object.values(err.errors).map(val => val.message);
             return res.status(400).json({ msg: messages.join(', ') });
        }
        res.status(500).send('Server error');
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ submittedAt: -1 });
        res.status(200).json(reviews);
    } catch (err) {
        console.error('Get Reviews Error:', err.message);
        res.status(500).send('Server error');
    }
};