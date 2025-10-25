const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// CRITICAL: Serve Static Files (PDFs and Review Photos)
app.use('/pdfs', express.static(path.join(__dirname, 'public_pdfs')));
app.use('/reviews', express.static(path.join(__dirname, 'public_reviews')));

// Define Routes
app.get('/', (req, res) => res.send('FunShelf API is running...'));
app.use('/api/auth', require('./routes/authRoutes')); // Correctly loads authRoutes.js
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/users', require('./routes/users'));
app.use('/api/music', require('./routes/musicRoutes')); // <-- NEW Music Route

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} 🔥`));