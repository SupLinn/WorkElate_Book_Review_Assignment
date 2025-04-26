// backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../utils/db');
const { users } = require('../utils/schema');
const { eq } = require('drizzle-orm');

// Create a token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route   POST /users/register
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const newUser = await db.insert(users).values({
      username,
      email,
      passwordHash: hashedPassword,
    }).returning();

    const token = createToken(newUser[0].id);

    res.status(201).json({ success: true, token, userId: newUser[0].id });
  } catch (error) {
    next(error);
  }
};

// @route   POST /users/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userList = await db.select().from(users).where(eq(users.email, email));
    const user = userList[0];

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid Credentials' });
    }

    const token = createToken(user.id);

    res.status(200).json({ success: true, token, userId: user.id });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
