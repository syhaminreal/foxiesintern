const express = require('express');
const {
  getUserByIdController,
  registerController,
  loginController,
  verifyMailController,
  forgetPasswordController,
  resetPasswordController,
  getAllUser,
  logoutController,
  sendOtpController,
  verifyOtpController,
} = require('../controllers/authController');
const {
  validateRegistrationRules,
} = require('../middlewares/validationMiddlewere');
const {
  authenticatedRoutes,
  authorize,
} = require('../middlewares/authMiddleware');
const loginLimiter = require('../middlewares/loginLimiter');
const router = express.Router();

// To Get the Collection Of User
router.get('/users', authenticatedRoutes, authorize('admin'), getAllUser);

// To get the user profile
router.get('/user', authenticatedRoutes, getUserByIdController);

// Register API
router.post('/register', validateRegistrationRules, registerController);

// Register API
router.post('/login', loginLimiter, loginController);

// Eamil Verication API
router.post('/mail-verification', verifyMailController);

// Forget Password API
router.post('/forget-password', forgetPasswordController);

// Reset Password API
router.post('/reset-password', authenticatedRoutes, resetPasswordController);

// To get the user profile
router.post('/get-phone-otp', sendOtpController);

// To verify the phone Number
router.post('/verify-phone', verifyOtpController);

router.post('/logout', authenticatedRoutes, logoutController);

module.exports = router;
