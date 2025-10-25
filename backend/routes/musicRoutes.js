const express = require('express');
const router = express.Router();
const { getMusicByGenre } = require('../controllers/musicController');

router.get('/', getMusicByGenre);

module.exports = router;