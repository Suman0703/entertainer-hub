const express = require('express');
const { 
    addMovieToList, 
    getMovieList, 
    removeMovieFromList 
} = require('../controllers/userController');

const router = express.Router();

router.post('/movie-list', addMovieToList);
router.get('/movie-list', getMovieList);
router.delete('/movie-list/:movieId', removeMovieFromList);

module.exports = router;