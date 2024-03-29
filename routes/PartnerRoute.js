const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const Partner = require('../models/partnerModel');
const fs = require('fs');
const PartnerController = require('../Controllers/PartnerController');
var {Auth, currentUser} = require('../Middleware/MerchantMiddleware');

var path;

var multer = require('multer');
 


var Storage= multer.diskStorage({
    destination: (req, file, cb) => {
                cb(null, 'uploads')
            },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
  });
  
  var upload = multer({
    storage:Storage
  }).single('image');



router.post('/partnerwithus', PartnerController.post_form)
            // var obj = {
            //                             outletName: req.body.outletName,
            //                             state: req.body.state,
            //                             city: req.body.city,
            //                             primary_location: req.body.primary_location,
            //                             pincode: req.body.pincode,
            //                             outlettype: {
            //                                 Cloud_kitchen: req.body.outlettype1 ? true : false,
            //                                 Resturent: req.body.outlettype2 ? true : false,
            //                                 others: req.body.outlettype3 ? true : false,
            //                             },
            //                             contact_person:req.body.contactperson,
            //                             name:req.body.name,
            //                             phone_no: req.body.phone_no,
            //                             type_of_cusines: req.body.type_of_cusines,
            //                             services: {
            //                                 delivery: req.body.services1 ? true : false,
            //                                 walkin: req.body.services2 ? true : false,
            //                             },
            //                             specify: req.body.specify,
            //                             time_from: req.body.time_from,
            //                             time_to: req.body.time_to,
                                        
            //         }
                
            //        const partner = await Partner.create(obj, (err,item)=>{
            //             if(err){
            //                 console.log(err);
            //             }
            //             else{
            //                res.json({
            //                    outletName: req.body.outletName,
            //                    _id: partner._id
            //                })
                            
            //             }
            //         });
                  
            //     });
            

  
module.exports = router;