const express=require('express');
const router=express.Router();
const adminController=require('../Controllers/AdminController');
const {requireAuth_admin, currentAdmin} = require('../Middleware/AdminMiddleware');
const Admin = require('../models/AdminModel');
const Upload = require('../Middleware/upload')

router.post('/admin_login',adminController.admin_post_login);
router.post('/admin_signup',adminController.admin_post_signup);

router.get('/admin_profile',currentAdmin);
router.get('/admin_profile',requireAuth_admin,adminController.admin_get_profile);
router.get('/admin_profile/:id', adminController.admin_get_profile_by_Id);


router.post('/update-admin_profile', currentAdmin);
router.post('/update-admin_profile',requireAuth_admin, adminController.update_admin_profile);

router.post('/update-admin-profile/:id', (req,res) => {
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
       
              Admin.findOneAndUpdate({_id: req.params.id}, obj, (err,item) => {
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
    
       }
 
        Admin.findOneAndUpdate({_id: req.params.id}, obj, (err,item) => {
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
 







module.exports = router;