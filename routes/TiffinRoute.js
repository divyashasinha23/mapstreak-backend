const express = require('express');
const router = express.Router();
const TiffinContoller = require('../Controllers/TiffinController');
const {Auth, currentMerchant} = require('../Middleware/MerchantMiddleware');
const Upload = require('../Middleware/upload');
const Merchant = require('../models/merchantModel');
const Tiffin = require('../models/tiffinServiceModel');


//Merchant or Admin can post a tiffinservice
router.get('/Tiffin-service', currentMerchant);
router.get('/Tiffin-service', Auth, async(res,req)=> {
     try{
        const user = await Merchant.findById(res.locals.merchant);
        if(user){
            res.json({
                user,
            });
        }
        else{
            throw Error('Seems like you are not logged in/ Permision Denied');
        }
     }
     catch(err){
         console.log(err);
     }
});
router.post('/add-Tiffin-service', currentMerchant);
router.post('/add-Tiffin-service' , Auth, async(req,res) => {
    try{
     const user = await Merchant.findById(res.locals.merchant);
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
         throw Error('Seems like you are not logged in/ Permision Denied');
     }
   
}
catch(err){
 console.log(err);
} 
});

//tiffinservice view in User Application
router.get('/tiffinservices', TiffinContoller.get_tiffin);


module.exports = router;
