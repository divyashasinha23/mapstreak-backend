const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const {requireAuth, current_User} = require('../Middleware/UserMiddleware');
const Upload = require('../Middleware/upload');
const User = require('../models/User');


router.post('/login',UserController.post_login);
// console.log(req.file);
router.post('/signup',UserController.post_signup);
router.get('/profile',current_User);
router.get('/profile',requireAuth,UserController.get_profile);
router.get('/profile/:id', UserController.get_profile_by_id);
router.post('/update-profile', current_User);
router.post('/update-profile', UserController.update_profile);
router.post('/update-profile/:id',   (req,res) => {
   Upload(req,res, (error => {
   if(error){
       console.log(error);
   }
   else{
      var obj = {
      name: req.body.name,
      email : req.body.email,
      mobile_no : req.body.mobile_no,
     image : req.file.key,
     location : req.file.location
      }

       User.findOneAndUpdate({_id: req.params.id}, obj, (err,item) => {
        if(err){
            console.log(err);
             }
             else{
             res.status(201).json({
                obj,
                msg:"profile updated successfully"
             })
                             
            }
      });
   }

}));
});






router.post('/forgot-password',UserController.post_forgotpassword);
router.post('/reset-password',current_User);
router.post('/reset-password', requireAuth, UserController.post_resetpassword);






module.exports = router;