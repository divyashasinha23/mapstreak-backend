const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const Auth = require('../Middleware/UserMiddleware');
const Upload = require('../Middleware/upload');
const User = require('../models/User');

//login and signup credentials
router.post('/login',UserController.post_login);
router.post('/signup',UserController.post_signup);

//view profile of user

router.get('/profile',Auth,UserController.get_profile);
// router.get('/profile/:id', UserController.get_profile_by_id);

//update user profile
// router.post('/update-profile', current_User);
// router.post('/update-profile', requireAuth, UserController.update_profile);

router.post('/update-profile', Auth,   (req,res) => {
   Upload(req,res, (error => {
   if(error){
       console.log(error);
   }
   else{
      if(req.file === undefined){
         var obj = {
            name: req.body.name,
            email : req.body.email,
            mobile_no : req.body.mobile_no,
            }
      
             User.findOneAndUpdate({_id: res.locals.user}, obj, (err,item) => {
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
   else{
      var obj = {
      name: req.body.name,
      email : req.body.email,
      mobile_no : req.body.mobile_no,
      image : req.file.key,
      location : req.file.location
      }

       User.findOneAndUpdate({_id: res.locals.user}, obj, (err,item) => {
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
   }
}));
});


router.post('/forgot-password',UserController.post_forgotpassword);
router.post('/reset-password', Auth, UserController.post_resetpassword);






module.exports = router;