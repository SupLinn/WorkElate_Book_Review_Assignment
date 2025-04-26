// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { db } = require('../utils/db');
const { users } = require('../utils/schema');

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userList = await db.select().from(users).where(users.id.eq(decoded.id));
      if (!userList.length) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      req.user = userList[0]; // Add user to request
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, message: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Admin access only' });
  }
};

module.exports = { protect, adminOnly };
