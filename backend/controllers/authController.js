const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
exports.register = async (req, res) => {
  const { fullName, username, email, password, age, mobileNumber } = req.body;

  try {
    // Check if user already exists by email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    // Check if username is taken
    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'Username is already taken' });
    }

    // Create a new user instance
    user = new User({
      fullName,
      username,
      email,
      password,
      age,
      mobileNumber
      // profilePictureUrl defaults automatically
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Create a JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Token expires in 5 hours
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error('Register Error:', err.message);
    // Check for duplicate key error specifically
    if (err.code === 11000) {
      if (err.keyPattern && err.keyPattern.email) {
        return res.status(400).json({ msg: 'User with this email already exists' });
      }
      if (err.keyPattern && err.keyPattern.username) {
        return res.status(400).json({ msg: 'Username is already taken' });
      }
    }
    res.status(500).send('Server error');
  }
};

// @desc    Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists - include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign and return the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get logged-in user's data
// PROTECTED route - middleware sets req.user
exports.getMe = async (req, res) => {
  // req.user is set by the protect middleware, exclude password implicitly
  // Now includes profilePictureUrl by default
  if (!req.user) {
    return res.status(404).json({ msg: 'User not found' }); // Should not happen if middleware works
  }
  res.status(200).json(req.user);
};

// @desc    Update user profile details (username, email, profile picture url, mobile, fullname)
// PROTECTED route - middleware sets req.user
exports.updateProfile = async (req, res) => {
  // Destructure allowed fields from req.body
  const { username, email, profilePictureUrl, mobileNumber, fullName } = req.body; // Added fullName
  const userId = req.user.id; // Get user ID from middleware

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // --- Update Logic ---
    let updated = false;

    // Check if new username is provided and if it's different and unique
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username: username });
      if (existingUsername && existingUsername._id.toString() !== userId) {
        return res.status(400).json({ msg: 'Username is already taken' });
      }
      user.username = username;
      updated = true;
    }

    // Check if new email is provided and if it's different and unique
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email: email });
      if (existingEmail && existingEmail._id.toString() !== userId) {
        return res.status(400).json({ msg: 'Email is already registered to another account' });
      }
      user.email = email;
      updated = true;
    }

    // Update profile picture URL if provided and different
    // Allow setting it to empty string to potentially remove it (if frontend logic supports this)
    if (profilePictureUrl !== undefined && profilePictureUrl !== user.profilePictureUrl) {
      user.profilePictureUrl = profilePictureUrl || '../media/profile-placeholder.jpg'; // Use default if empty
      updated = true;
    }

    // Update mobile number if provided (allows clearing if empty string is sent)
    if (mobileNumber !== undefined && mobileNumber !== user.mobileNumber) {
      user.mobileNumber = mobileNumber;
      updated = true;
    }

    // Update full name if provided and different
    if (fullName && fullName !== user.fullName) {
      user.fullName = fullName;
      updated = true;
    }

    // --- Save if changes were made ---
    if (updated) {
      await user.save();
    }

    // Return updated user data (excluding password)
    const updatedUser = await User.findById(userId).select('-password');
    res.status(200).json(updatedUser);

  } catch (err) {
    console.error('Update Profile Error:', err.message);
    if (err.code === 11000) { // Handle potential duplicate key errors during save
      if (err.keyPattern && err.keyPattern.email) {
        return res.status(400).json({ msg: 'Email is already registered to another account' });
      }
      if (err.keyPattern && err.keyPattern.username) {
        return res.status(400).json({ msg: 'Username is already taken' });
      }
    }
    res.status(500).send('Server error');
  }
};