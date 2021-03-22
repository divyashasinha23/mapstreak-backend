const express = require('express');
const router = express.Router();
ServiceController = require('../Controllers/ServiceController');
const Upload = require('../Middleware/upload');
const service = require('../models/ServiceModel');

router.get('/Mapstreak-Services/:id',ServiceController.get_services_by_id);
router.get('/Mapstreak-services/view-services', ServiceController.get_services);
router.post('/Mapstreak-Services',(req,res) =>{
 Upload(req,res, (error => {
     if(error){
         console.log(error);
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
 }))
});



router.get('/Mapstreak-Services',ServiceController.get_services);



module.exports = router;