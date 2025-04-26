const { db } = require('../utils/db');
const { users } = require('../utils/schema');
const { eq } = require('drizzle-orm')

const getUserProfile = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const userList = await db.select().from(users).where(eq(users.id, Number(userId)));
    if (!userList.length) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { passwordHash, ...userInfo } = userList[0];
    res.json({ success: true, data: userInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { username, bio } = req.body;

    const updatedUser = await db.update(users)
      .set({ username, bio })
      .where(eq(users.id, Number(userId)))
      .returning();

    res.json({ success: true, userId: updatedUser[0].id, email: updatedUser[0].email, bio: updatedUser[0].bio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile };
