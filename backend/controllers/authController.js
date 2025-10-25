const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { fullName, username, email, password, age, mobileNumber } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'Username is already taken' });
    }

    user = new User({
      fullName,
      username,
      email,
      password,
      age,
      mobileNumber
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error('Register Error:', err.message);
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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

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

exports.getMe = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ msg: 'User not found' });
  }
  res.status(200).json(req.user);
};

exports.updateProfile = async (req, res) => {
  const { username, email, profilePictureUrl, mobileNumber, fullName } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    let updated = false;

    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username: username });
      if (existingUsername && existingUsername._id.toString() !== userId) {
        return res.status(400).json({ msg: 'Username is already taken' });
      }
      user.username = username;
      updated = true;
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email: email });
      if (existingEmail && existingEmail._id.toString() !== userId) {
        return res.status(400).json({ msg: 'Email is already registered to another account' });
      }
      user.email = email;
      updated = true;
    }

    if (profilePictureUrl !== undefined && profilePictureUrl !== user.profilePictureUrl) {
      user.profilePictureUrl = profilePictureUrl || '../media/profile-placeholder.jpg';
      updated = true;
    }

    if (mobileNumber !== undefined && mobileNumber !== user.mobileNumber) {
      user.mobileNumber = mobileNumber;
      updated = true;
    }

    if (fullName && fullName !== user.fullName) {
      user.fullName = fullName;
      updated = true;
    }

    if (updated) {
      await user.save();
    }

    const updatedUser = await User.findById(userId).select('-password');
    res.status(200).json(updatedUser);

  } catch (err) {
    console.error('Update Profile Error:', err.message);
    if (err.code === 11000) {
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