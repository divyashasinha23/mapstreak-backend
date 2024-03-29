const express=require('express');
const router=express.Router();
const adminController=require('../Controllers/AdminController');
const requireAuth_admin  = require('../Middleware/AdminMiddleware');
const Admin = require('../models/AdminModel');
const Upload = require('../Middleware/upload')

// ADMIN PERSONAL ACCOUNT INFORMATION// 


//admin login and signup credentials
router.post('/admin_login',adminController.admin_post_login);
router.post('/admin_signup',adminController.admin_post_signup);

//view admin profile
// router.get('/admin_profile',currentAdmin);
router.get('/admin_profile',requireAuth_admin ,adminController.admin_get_profile);


//update admin profile
// router.post('/update-admin_profile', currentAdmin);
router.post('/update-admin-profile', requireAuth_admin, (req,res) => {
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
       
              Admin.findOneAndUpdate({_id: res.locals.admin._id}, obj, (err,item) => {
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
       location: req.file.location,
    
       }
 
        Admin.findOneAndUpdate({_id: res.locals.admin._id}, obj, (err,item) => {
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



                                  //ADMIN ACCESS ON MERCHANT'S APP//
 

//update and remove access on merchnat's tiffinservices.
// router.post('/delete-tiffinservice/:id',currentAdmin);
router.post('/delete-tiffinservice/:id', requireAuth_admin, adminController.delete_tiffinservice);

//update tiffinservice by id
// router.post('/update-tiffinservice', currentAdmin);
router.post('/update-tiffinservice/:id', requireAuth_admin, async (req,res) => {
    try{
    const user = await Admin.findById(res.locals.admin);
    Upload(req,res, (error => {
    if(error){
        console.log(error);
    }
    else{
        if(req.file === undefined){
            var obj = {
                Merchant: req.body.Merchant,
                name: req.body.name,
                address:req.body.address,
                cusines:req.body.cusines,
                Time:req.body.Time,
                Discount:req.body.Discount,
                numReviews:req.body.numReviews,
                isOpen:req.body.isOpen,
                Rating: req.body.Rating,
            }

            Tiffin.findOneAndUpdate({_id: req.params.id}, obj, (err,item) => {
                if(err){
                    console.log(err);
                     }
                     else{
                     res.status(201).json({
                        obj,
                        msg:"Service updated successfully"
                     })
                                     
                    }
            });
        }
        else{
            var obj = {
                Merchant: req.body.Merchant,
                name: req.body.name,
                address:req.body.address,
                cusines:req.body.cusines,
                Time:req.body.Time,
                Discount:req.body.Discount,
                numReviews:req.body.numReviews,
                isOpen:req.body.isOpen,
                Rating: req.body.Rating,
                image : req.file.key,
                location : req.file.location,
            }

            Tiffin.findOneAndUpdate({_id: req.params.id}, obj, (err,item) => {
                if(err){
                    console.log(err);
                     }
                     else{
                     res.status(201).json({
                        obj,
                        msg:"Service Added"
                     })
                                     
                    }
            });
        }
    }
    }));
}
catch(err){
    console.log(err);
}
});


//view all tiffinservices
router.get('/all-tiffinservices', adminController.view_tiffinservice);

//view all services
router.get('/all-services', adminController.view_services);




module.exports = router;