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

// ----------------------------------------------------
// CRITICAL: Serve Static Files (PDFs and Review Photos)
// ----------------------------------------------------
// 1. Serve PDF files
app.use('/pdfs', express.static(path.join(__dirname, 'public_pdfs'))); 
// 2. Serve Review Photos (accessible via /reviews/photo.jpg)
app.use('/reviews', express.static(path.join(__dirname, 'public_reviews')));

// Define Routes
app.get('/', (req, res) => res.send('FunShelf API is running...'));

// --- FIX ---
// Corrected from './routes/auth' to './routes/authRoutes'
app.use('/api/auth', require('./routes/authRoutes')); 

// Include other new routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/users', require('./routes/users')); // New user route for movie list

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} 🔥`));
