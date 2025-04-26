const { db } = require('../utils/db');
const { reviews } = require('../utils/schema');

const getReviewsByBook = async (req, res) => {
  try {
    const bookId = Number(req.query.bookId);
    const reviewList = await db.select().from(reviews).where(reviews.bookId.eq(bookId));
    res.json({ success: true, data: reviewList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addReview = async (req, res) => {
  try {
    const { bookId, userId, rating, reviewText } = req.body;
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const newReview = await db.insert(reviews).values({
      bookId,
      userId,
      rating,
      reviewText,
    }).returning();

    res.status(201).json({ success: true, data: newReview[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getReviewsByBook, addReview };
