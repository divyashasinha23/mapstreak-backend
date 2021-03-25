const express=require('express');
const router=express.Router();
const adminController=require('../Controllers/AdminController');
const {requireAuth_admin, currentAdmin} = require('../Middleware/AdminMiddleware');
const Admin = require('../models/AdminModel');


router.post('/admin_login',adminController.admin_post_login);
router.post('/admin_signup',adminController.admin_post_signup);

router.get('/admin_profile',currentAdmin);
router.get('/admin_profile',requireAuth_admin,adminController.admin_get_profile);
router.get('/admin_profile/:id', adminController.admin_get_profile_by_Id);


// router.post('/update-profile', currentAdmin);
// router.post('/update-profile',requireAuth_admin, adminController.update_profile);



module.exports = router;