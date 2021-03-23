const express=require('express');
const router=express.Router();
const adminController=require('../Controllers/AdminController');
const {requireAuth_admin, currentAdmin} = require('../Middleware/AdminMiddleware');
const Admin = require('../models/AdminModel');


router.post('/admin_login',adminController.admin_post_login);
router.post('/admin_signup',adminController.admin_post_signup);

router.get('/profile',currentAdmin);
router.get('/profile',requireAuth_admin,adminController.get_profile);
router.post('/update-profile', currentAdmin);
router.post('/update-profile',requireAuth_admin, adminController.update_profile);



module.exports = router;