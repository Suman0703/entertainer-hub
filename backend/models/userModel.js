const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
   
    movieList: [ 
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


module.exports = mongoose.model('User', UserSchema);