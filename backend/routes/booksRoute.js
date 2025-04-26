const express = require('express');
const { getAllBooks, getBookById, addBook } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');

const router = express.Router();

// Get all books
router.get('/', getAllBooks);

// Get a single book by ID
router.get('/:id', getBookById);

// Add a new book (admin only)
router.post('/', protect, adminMiddleware, addBook);

module.exports = router;
