const express = require('express');
const router = express.Router();
ServiceController = require('../Controllers/ServiceController');
const Upload = require('../Middleware/upload');
const service = require('../models/ServiceModel');

router.get('/Mapstreak-Services/:id',ServiceController.get_services_by_id);
router.post('/Mapstreak-Services',(req,res) =>{
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
router.get('/Mapstreak-Services',ServiceController.get_services);

//update services using service id
router.post('/Mapstreak-Services-Update/:id',   (req,res) => {
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
 
 router.get('/delete-service/:id', ServiceController.delete_service);



module.exports = router;