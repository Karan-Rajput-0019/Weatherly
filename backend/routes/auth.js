const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
        savedCities: user.savedCities,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User Profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update User Profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        preferences,
      },
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Saved City
router.post("/saved-cities", auth, async (req, res) => {
  try {
    const { city, country } = req.body;
    const user = await User.findById(req.userId);

    // Check if city already saved
    const cityExists = user.savedCities.some(
      (c) => c.city.toLowerCase() === city.toLowerCase()
    );

    if (cityExists) {
      return res.status(400).json({ message: "City already saved" });
    }

    user.savedCities.push({ city, country });
    await user.save();

    res.json({
      message: "City added successfully",
      savedCities: user.savedCities,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Saved Cities
router.get("/saved-cities", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.savedCities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove Saved City
router.delete("/saved-cities/:city", auth, async (req, res) => {
  try {
    const { city } = req.params;
    const user = await User.findById(req.userId);

    user.savedCities = user.savedCities.filter(
      (c) => c.city.toLowerCase() !== city.toLowerCase()
    );

    await user.save();

    res.json({
      message: "City removed successfully",
      savedCities: user.savedCities,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
