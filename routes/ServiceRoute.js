// Admin roles

const express = require('express');
const router = express.Router();
ServiceController = require('../Controllers/ServiceController');
const Upload = require('../Middleware/upload');
const service = require('../models/ServiceModel');
const requireAuth_admin = require('../Middleware/AdminMiddleware');

router.get('/Mapstreak-Services/:id',ServiceController.get_services_by_id);


//admin can post services
// router.post('/Mapstreak-Services', currentAdmin)
router.post('/Mapstreak-Services', requireAuth_admin, (req,res) =>{
 Upload(req,res, (error => {
     if(error){
         console.log(error);
     }
     else {
         if(req.file === undefined){
            var obj = {
                _id: req.body._id,
                text: req.body.text,
                coupon_company: req.body.coupon_company
            }
   
                service.create(obj, (err,item) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.status(201).json({
                            obj
                        });
                    }
                });
         }
     else{
         var obj = {
             _id: req.body._id,
             text: req.body.text,
             image : req.file.key,
             location : req.file.location,
             coupon_company: req.body.coupon_company
         }

             service.create(obj, (err,item) => {
                 if(err){
                     console.log(err);
                 }
                 else{
                     res.status(201).json({
                         obj
                     });
                 }
             });
         
     }
    }
 }))
});

//All services will be viewed in User App.
router.get('/Mapstreak-Services',ServiceController.get_services);

//update services using service id (Admin Roles)
// router.post('/Mapstreak-Services-Update/:id', currentAdmin);
router.post('/Mapstreak-Services-Update/:id', requireAuth_admin,   (req,res) => {
    Upload(req,res, (error => {
    if(error){
        console.log(error);
    }
    else{
       if(req.file === undefined){
          var obj = {
             text: req.body.text,
             coupon_company: req.body.coupon_company
             }
       
              service.findOneAndUpdate({_id: req.params.id}, obj, (err,item) => {
               if(err){
                   console.log(err);
                    }
                    else{
                    res.status(201).json({
                       obj,
                       msg:"updated successfully"
                    })
                                    
                   }
             });
       }
    else{
       var obj = {
        text: req.body.text,
        image : req.file.key,
        location : req.file.location,
        coupon_company: req.body.coupon_company
       }
 
        service.findOneAndUpdate({_id: req.params.id}, obj, (err,item) => {
         if(err){
             console.log(err);
              }
              else{
              res.status(201).json({
                 obj,
                 msg:"updated successfully"
              })
                              
             }
       });
    }
    }
 }));
 });
 
 //delete the services by service ID(Admin roles)
//  router.get('/delete-service/:id', currentAdmin);
 router.get('/delete-service/:id', requireAuth_admin, ServiceController.delete_service);



module.exports = router;