const express = require('express');
const router = express.Router();
const MerchantController = require('../Controllers/MerchantController');
const {Auth,currentMerchant} = require('../Middleware/MerchantMiddleware');
const MerchantOrderController = require('../Controllers/MerchantOrderController');

router.post('/merchant_login',MerchantController.merchant_post_login);
router.post('/merchant_signup',MerchantController.merchant_post_signup);

router.get('/profile',currentMerchant);
router.get('/profile',Auth,MerchantController.get_profile);
router.post('/update-profile', currentMerchant);
router.post('/update-profile',Auth, MerchantController.update_profile);
router.get('/orders',currentMerchant);
router.get('/orders',Auth, MerchantOrderController.get_orders);


module.exports = router;