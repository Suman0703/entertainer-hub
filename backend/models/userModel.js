const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // CRITICAL: Ensure jwt is imported

const UserSchema = new mongoose.Schema({
    // ... (existing fields) ...
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    // ... (other fields like age, mobileNumber, profilePictureUrl) ...
    movieList: [ // <-- CRITICAL: This array must exist!
        {
            movieId: {
                type: String, 
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            genre: {
                type: String,
                required: true,
            },
            addedAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// ... (methods like UserSchema.pre('save'), getSignedJwtToken, matchPassword) ...

module.exports = mongoose.model('User', UserSchema);