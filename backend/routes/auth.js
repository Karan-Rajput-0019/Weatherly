const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const {name, email, password} = req.body;
    const exists = await User.findOne({email});
    if (exists) return res.status(400).json({msg: "Email already exists"});
    const user = await User.create({name, email, password});
    res.status(201).json({msg: "Signup success"});
  } catch (err) { res.status(500).json({msg: err.message}); }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({msg: "Invalid credentials"});
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({msg: "Invalid credentials"});
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
    res.json({token, user: {name: user.name, email: user.email}});
  } catch (err) { res.status(500).json({msg: err.message}); }
});

// Auth Middleware
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({msg: "Missing token"});
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({msg:"Invalid token"});
  }
}

// Profile (protected)
router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({msg: "User not found"});
  res.json({name: user.name, email:user.email});
});

module.exports = router;
