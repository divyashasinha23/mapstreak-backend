const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const authRequire = require('../Middleware/ForgetPasswordMiddleware');


router.post('/login',UserController.post_login);
router.post('/signup',UserController.post_signup);
router.post('/forgot-password',UserController.post_forgotpassword);
router.post('/reset-password', authRequire, UserController.post_resetpassword);


module.exports = router;