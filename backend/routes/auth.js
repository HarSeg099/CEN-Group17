const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logout, getUserProfile } = require('../controllers/usersController');

const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile)

//router.route('/api/v1/user/:id').get(isAuthenticatedUser, getUserDetails)



module.exports = router;