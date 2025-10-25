const axios = require('axios');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/';

function getSearchQuery(genre) {
    // ... (getSearchQuery function remains the same) ...
    switch (genre.toLowerCase()) {
        case 'lofi': return 'lofi chill study beats 24/7';
        case 'piano': return 'calm piano music for focus';
        case 'ambient': return 'ambient sleep relax music long';
        case 'nature': return 'nature sounds for meditation and sleep';
        case 'rain': return 'rain sounds for sleeping long';
        case 'focus': return 'electronic focus music deep concentration';
        case 'classical': return 'classical music for studying concentration';
        case 'jazz': return 'smooth jazz instrumental relax';
        case 'electronic': return 'chill electronic music background';
        default: return 'ambient background music';
    }
}

exports.getMusicByGenre = async (req, res) => {
    const genre = req.query.genre || 'lofi';
    const searchQuery = getSearchQuery(genre);

    if (!YOUTUBE_API_KEY) {
        console.error("CRITICAL: YOUTUBE_API_KEY is missing from environment variables.");
        return res.status(500).json({ msg: 'Server configuration error: API key missing.' });
    }

    try {
        const youtubeSearchUrl = `${YOUTUBE_BASE_URL}search?part=snippet&maxResults=5&q=${encodeURIComponent(searchQuery)}&type=video&key=${YOUTUBE_API_KEY}`;
        console.log(`Attempting to fetch from YouTube: ${youtubeSearchUrl}`); // Log the URL

        const response = await axios.get(youtubeSearchUrl);

        const tracks = response.data.items.map(item => ({
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.high.url,
            embedUrl: `https://www.youtube.com/embed/${item.id.videoId}?autoplay=0&controls=1&mute=1`
        }));

        res.status(200).json(tracks);

    } catch (error) {
        // --- ADDED DETAILED LOGGING ---
        console.error('------- YouTube API Fetch Error -------');
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
            console.error('Data:', JSON.stringify(error.response.data, null, 2)); // Log detailed error from YouTube
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request Error: No response received', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Axios Setup Error:', error.message);
        }
        console.error('------------------------------------');
        
        // Send a more specific message if possible, otherwise generic
        let userMessage = 'Failed to fetch music data from source.';
        if(error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
            userMessage = `API Error: ${error.response.data.error.message}`;
        } else if (error.message.includes('quota')) {
            userMessage = 'API quota likely exceeded.';
        }

        res.status(500).json({ msg: userMessage });
    }
};