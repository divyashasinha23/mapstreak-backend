const express = require('express');
const router = express.Router();
const MerchantController = require('../Controllers/MerchantController');
const {Auth,currentMerchant} = require('../Middleware/MerchantMiddleware');
const MerchantOrderController = require('../Controllers/MerchantOrderController');
const Upload = require('../Middleware/upload');
const Merchant = require('../models/merchantModel');

//merchant login signup credentials
router.post('/merchant_login',MerchantController.merchant_post_login);
router.post('/merchant_signup',MerchantController.merchant_post_signup);

// view profile of merchant
router.get('/profile',currentMerchant);
router.get('/profile',Auth, MerchantController.get_profile);

//update profile of merchant
router.post('/update-profile', currentMerchant);
router.post('/update-profile',Auth, (req,res) => {
    Upload(req,res, (error => {
        if(error){
            console.log(error)
        }
        else {
            if(req.file === undefined){
                var obj = {
                    full_name: req.body.full_name,
                    address: req.body.address,
                    mobile_no: req.body.mobile_no,
                    email: req.body.email,
                }
                Merchant.findByIdAndUpdate({_id: res.locals.merchant}, obj, (err, item) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.status(201).json({
                            obj,
                            msg:"Profile updated successfully"
                        });
                    }
                });
            }
            else{
                var obj = {
                    full_name: req.body.full_name,
                    address: req.body.address,
                    mobile_no: req.body.mobile_no,
                    email: req.body.email,
                    image: req.file.key,
                    location: req.file.location,
                }
            }
        }
    }));
});

//All orders till now by customers(Not completed yet!)
router.get('/orders',currentMerchant);
router.get('/orders',Auth, MerchantOrderController.get_orders);


module.exports = router;