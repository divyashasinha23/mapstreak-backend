const express = require('express');
const router = express.Router();
const TiffinContoller = require('../Controllers/TiffinController');
const require_Auth = require('../Middleware/MerchantMiddleware');
const Upload = require('../Middleware/upload');
const Merchant = require('../models/merchantModel');
const Tiffin = require('../models/tiffinServiceModel');



//Merchant can post a tiffinservice
router.get('/Tiffin-service', require_Auth, async(res,req)=> {
     try{
        const user = await Merchant.findById(req.merchant);
        if(user){
           const all_tiffin_services = await Tiffin.find(user);
           if(all_tiffin_services !== 0){
               res.status(200).json({
                   data: all_tiffin_services,
               });
           } 
           else{
               res.status(200).json({
                   msg: "You do not have any active tiffin service yet"
               });
           }
        }
        else{
            throw Error('Seems like you are not logged in/ Permision Denied');
        }
     }
     catch(err){
         console.log(err);
     }
});

router.post('/add-Tiffin-service' , require_Auth, async(req,res) => {
    try{
        
    const user = await Merchant.findById(req.merchant._id);
     if(user){
        Upload(req,res, (error => {
            if(error){
                console.log(error);
            }
            else{
                if(req.file === undefined){
                    var obj = {
                        _id: req.body._id,
                        Merchant: req.body.Merchant,
                        name: req.body.name,
                        address:req.body.address,
                        cusines:req.body.cusines,
                        Time:req.body.Time,
                        Discount:req.body.Discount,
                        numReviews:req.body.numReviews,
                        isOpen:req.body.isOpen,
                        Rating: req.body.Rating
                    }
        
                    Tiffin.create(obj, (err,item) => {
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
                else{
                    var obj = {
                        _id: req.body._id,
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
    
                    Tiffin.create(obj, (err,item) => {
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
        }))
     }   
     else{
         res.send('Seems like you are not logged in/ Permision Denied');
     }
   
}
catch(err){
 console.log(err);
} 
});

//tiffinservice view in User Application
router.get('/tiffinservices', TiffinContoller.get_tiffin);


module.exports = router;
