const express = require('express');
const router = express.Router();
const { getMusicByGenre } = require('../controllers/musicController');

// @route   GET /api/music?genre=lofi
// @desc    Fetches music videos/playlists based on genre query
// @access  Public
router.get('/', getMusicByGenre);

module.exports = router;