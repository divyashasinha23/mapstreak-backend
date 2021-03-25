//Updates of Tiffin Services, Menu 
//All updates that are done by Admin and vendor

const express = require('express');
const { Auth,currentMerchant } = require('../Middleware/MerchantMiddleware');
const Upload = require('../Middleware/upload');
const Tiffin = require('../models/tiffinServiceModel');
const Merchant = require('../models/merchantModel');
const router = express.Router();

// Updates can be performed by merchant or Admin
router.get('/update-tiffin-service/:userid', (req,res) => {
    const user = Tiffin.findOne({$or: [{Merchant: req.params.userid}, {Admin: req.params.userid}]});
    if(user){
        res.json({
            data:user
        });
    }
    else{
        throw Error("Seems like you are not logged in/ Permision Denied");
    }

});
router.post('/update-tiffin-service', currentMerchant);
router.post('/update-tiffin-service/:id', Auth, async (req,res) => {
    try{
    const user = await Merchant.findById(res.locals.merchant);
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
})

module.exports = router;