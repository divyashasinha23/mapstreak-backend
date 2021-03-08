const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

const {requireAuth, current_User} = require('../Middleware/UserMiddleware');


router.post('/login',UserController.post_login);
router.post('/signup',UserController.post_signup);
router.get('/profile',current_User);
router.get('/profile',requireAuth,UserController.get_profile);
router.get('/profile/:id', UserController.get_profile_by_id);
router.post('/update-profile', current_User);
router.post('/update-profile',requireAuth, UserController.update_profile);
router.post('/update-profile/:id', UserController.update_profile_by_id);
router.post('/forgot-password',UserController.post_forgotpassword);
router.post('/reset-password',current_User);
router.post('/reset-password', requireAuth, UserController.post_resetpassword);


module.exports = router;