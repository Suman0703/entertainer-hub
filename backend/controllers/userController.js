const User = require('../models/userModel'); // Assuming your user model is here
const jwt = require('jsonwebtoken'); // To decode user from token

// --- IMPORTANT: Placeholder for Authentication ---
// NOTE: This is a duplicate of the protect logic you have in authMiddleware.js. 
// We are including it here temporarily to make the controller runnable. 
// In a clean project, this function should be imported from authMiddleware.js.
const protect = (req, res, next) => {
    let token;
    // Check if token exists in header and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        // Find the user model to find by ID
        return res.status(401).json({ msg: 'Not authorized, no token' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user by ID and attach it to the request object
        req.user = decoded.user.id; // Assuming JWT payload stores { user: { id: userId } }
        next();
    } catch (err) {
        console.error('Token verification error:', err.message);
        return res.status(401).json({ msg: 'Not authorized, token failed' });
    }
};


// @desc    Add a movie to user's list
// @route   POST /api/users/movie-list
// @access  Private (requires authentication)
exports.addMovieToList = [protect, async (req, res) => {
    const { movieId, title, genre } = req.body; // Expect these from frontend
    const userId = req.user; // User ID comes from the protect middleware

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if movie already exists in the list to prevent duplicates
        const existingMovie = user.movieList.find(item => item.movieId === movieId);
        if (existingMovie) {
            return res.status(400).json({ msg: 'Movie already in your list' });
        }

        user.movieList.push({ movieId, title, genre });
        await user.save();

        res.status(200).json({ msg: 'Movie added to list', movieList: user.movieList });

    } catch (error) {
        console.error('Error adding movie to list:', error.message);
        res.status(500).send('Server error');
    }
}];

// @desc    Get user's movie list
// @route   GET /api/users/movie-list
// @access  Private (requires authentication)
exports.getMovieList = [protect, async (req, res) => {
    const userId = req.user;

    try {
        const user = await User.findById(userId).select('movieList'); // Only fetch movieList

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ movieList: user.movieList });

    } catch (error) {
        console.error('Error fetching movie list:', error.message);
        res.status(500).send('Server error');
    }
}];

// @desc    Remove a movie from user's list
// @route   DELETE /api/users/movie-list/:movieId
// @access  Private (requires authentication)
exports.removeMovieFromList = [protect, async (req, res) => {
    const { movieId } = req.params; // MovieId to remove from list
    const userId = req.user;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Filter out the movie to be removed
        user.movieList = user.movieList.filter(item => item.movieId !== movieId);
        await user.save();

        res.status(200).json({ msg: 'Movie removed from list', movieList: user.movieList });

    } catch (error) {
        console.error('Error removing movie from list:', error.message);
        res.status(500).send('Server error');
    }
}];