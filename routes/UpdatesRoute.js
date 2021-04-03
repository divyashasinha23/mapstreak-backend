//Updates of Tiffin Services, Menu 
//All updates are done by Merchant

const express = require('express');
const require_Auth = require('../Middleware/MerchantMiddleware');
const Upload = require('../Middleware/upload');
const Tiffin = require('../models/tiffinServiceModel');
const Merchant = require('../models/merchantModel');
const UpdateController = require('../Controllers/UpdateController');
const router = express.Router();

// Updates can be performed by merchant or Admin



//update by tiffinservice id
router.post('/update-tiffin-service/:id', require_Auth, async (req,res) => {
    try{
    const user = await Merchant.findById(req.merchant);
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

router.get('/delete-tiffin-service/:id', require_Auth, UpdateController.delete_tiffin_service);

module.exports = router;