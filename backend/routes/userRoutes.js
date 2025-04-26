const userRouter = require('express').Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

// userRouter.get('/:id', (req, res) => {
//     const { id } = req.params;
//     return res.json({
//         message: "This is user route with param",
//         useId: id
//     })
// })

// userRouter.get('/', (req, res) => {
//     return res.json({
//         message: "This is user route without param",
//     })
// })

// userRouter.post('/', )

// Registration and Login
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Example protected route (get own profile)
userRouter.get('/profile', protect, (req, res) => {
    res.json({ success: true, user: req.user });
  });

userRouter.get('/:id',  getUserProfile);
userRouter.put('/:id',  updateUserProfile);
// userRouter.get('/:id', protect, getUserProfile);
// userRouter.put('/:id', protect, updateUserProfile);


module.exports = userRouter;