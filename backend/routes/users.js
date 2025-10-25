const express = require('express');
const { 
    addMovieToList, 
    getMovieList, 
    removeMovieFromList 
} = require('../controllers/userController');

const router = express.Router();

// You might already have a general auth middleware in auth.js,
// which could be used here too if 'protect' is separated.
// For now, it's defined within userController.js for simplicity.

router.post('/movie-list', addMovieToList);
router.get('/movie-list', getMovieList);
router.delete('/movie-list/:movieId', removeMovieFromList);

module.exports = router;