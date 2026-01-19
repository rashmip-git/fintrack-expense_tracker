const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate JWT token
function signToken(user) {
  return jwt.sign(
    { id: user._id }, 
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

// -------------------- SIGNUP --------------------
exports.signup = async (req, res, next) => {
  try {
    // Validate request inputs (if express-validator is used)
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user
    const user = await User.create({ username, email, password });

    // Generate token
    const token = signToken(user);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    next(err);
  }
};


// -------------------- LOGIN --------------------
exports.login = async (req, res, next) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;


    // Find user and include password
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = signToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    next(err);
  }
};


// Export methods together
module.exports = {
  signup: exports.signup,
  login: exports.login
};
