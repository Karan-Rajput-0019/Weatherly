const UserService = require('../services/userService');
const jwt = require('jsonwebtoken');

const generateToken = userId =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    const existing = await UserService.findByEmail(email);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const user = await UserService.create({ name, email, password });
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await UserService.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isValid = await UserService.comparePassword(
      password,
      user.password
    );
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user.id);
    const preferences = user.preferences
      ? JSON.parse(user.preferences)
      : {};

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        preferences
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await UserService.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const preferences = user.preferences
      ? JSON.parse(user.preferences)
      : {};

    res.json({
      success: true,
      user: {
        ...user,
        preferences
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, avatar, preferences, defaultLocation } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (preferences) updateData.preferences = JSON.stringify(preferences);
    if (defaultLocation)
      updateData.default_location = JSON.stringify(defaultLocation);

    const user = await UserService.update(req.userId, updateData);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        ...user,
        preferences: user.preferences
          ? JSON.parse(user.preferences)
          : {}
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful. Remove token on client.'
  });
};
