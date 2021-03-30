const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logout, getUserProfile, updateProfile } = require('../controllers/authController');
const {isAuthenticatedUser} = require('../middlewares/auth')
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

module.exports = router;