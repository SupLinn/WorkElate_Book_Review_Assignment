const { db } = require('../utils/db');
const { users } = require('../utils/schema');

// Middleware to check if user is admin
const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch the user from database
    const userList = await db.select().from(users).where(users.id.eq(userId));
    const user = userList[0];

    if (!user || !user.isAdmin) {
      return res.status(403).json({ success: false, message: 'Admin access denied' });
    }

    next(); // user is admin, continue
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error checking admin role' });
  }
};

module.exports = { adminMiddleware };
